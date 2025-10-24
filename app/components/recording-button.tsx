import { useState, useEffect, useRef } from "react";
import { useStore } from "~/store/useStore";
import { useAudioRecorder } from "~/hooks/useAudioRecorder";
import { formatTime } from "~/utils/time-format";

export function RecordingButton() {
	const {
		isRecording,
		recordingDuration,
		startRecording,
		stopRecording,
		setRecordingBlob,
		setRecordingDuration,
		currentRecording,
		discardRecording,
	} = useStore();

	const [isWebAudioReady, setIsWebAudioReady] = useState(false);
	const [showActions, setShowActions] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [hasMicPermission, setHasMicPermission] = useState<boolean | null>(
		null
	);
	const audioRef = useRef<HTMLAudioElement>(null);
	const blobUrlRef = useRef<string | null>(null);

	const { start: startMediaRecorder, stop: stopMediaRecorder } =
		useAudioRecorder({
			onRecordingComplete: (blob, duration) => {
				setRecordingBlob(blob, duration);
				stopRecording();
			},
			onError: (error) => {
				console.error("Recording error:", error);
				stopRecording();
			},
		});

	useEffect(() => {
		try {
			const audioContext = new (window.AudioContext ||
				(window as any).webkitAudioContext)();
			if (
				audioContext.state === "running" ||
				audioContext.state === "suspended"
			) {
				setIsWebAudioReady(true);
			}
			audioContext.close();
		} catch {
			setIsWebAudioReady(false);
		}
	}, []);

	useEffect(() => {
		const checkMicPermission = async () => {
			try {
				const permission = await navigator.permissions.query({
					name: "microphone" as PermissionName,
				});
				setHasMicPermission(permission.state === "granted");

				permission.addEventListener("change", () => {
					setHasMicPermission(permission.state === "granted");
				});
			} catch {
				setHasMicPermission(null);
			}
		};

		checkMicPermission();
	}, []);

	useEffect(() => {
		let timer: ReturnType<typeof setInterval>;
		if (isRecording) {
			timer = setInterval(() => {
				setRecordingDuration(recordingDuration + 1);
			}, 1000);
		}
		return () => clearInterval(timer);
	}, [isRecording, recordingDuration, setRecordingDuration]);

	useEffect(() => {
		if (currentRecording && currentRecording.blob) {
			if (blobUrlRef.current) {
				URL.revokeObjectURL(blobUrlRef.current);
			}
			blobUrlRef.current = URL.createObjectURL(currentRecording.blob);
			if (audioRef.current) {
				audioRef.current.src = blobUrlRef.current;
			}
		}
		return () => {
			if (blobUrlRef.current) {
				URL.revokeObjectURL(blobUrlRef.current);
				blobUrlRef.current = null;
			}
		};
	}, [currentRecording]);

	const handleStartRecording = async () => {
		console.log(
			"handleStartRecording called, hasMicPermission:",
			hasMicPermission
		);

		if (!isWebAudioReady) {
			console.log("Web Audio not ready");
			return;
		}

		try {
			// Always request permission if not explicitly granted yet, or retry if denied
			if (hasMicPermission !== true) {
				console.log("Requesting microphone permission...");
				const tempStream = await navigator.mediaDevices.getUserMedia({
					audio: true,
				});
				console.log("Permission granted, stopping temp stream");
				// Stop the temporary stream immediately
				tempStream.getTracks().forEach((track) => track.stop());
				setHasMicPermission(true);
				// After permission is granted, we'll start recording
				// We need to wait a moment for state to update
				setTimeout(async () => {
					console.log("Starting recording after permission");
					startRecording();
					await startMediaRecorder();
				}, 50);
				return;
			}

			// Permission already granted, start recording immediately
			console.log("Permission already granted, starting recording");
			startRecording();
			await startMediaRecorder();
		} catch (error) {
			console.error("Recording error:", error);
			setHasMicPermission(false);
			stopRecording();
		}
	};

	const handleStopRecording = () => {
		stopMediaRecorder();
		stopRecording();
		setShowActions(true);
	};

	const handleDownload = async () => {
		if (!currentRecording) return;
		try {
			const url = URL.createObjectURL(currentRecording.blob);
			const link = document.createElement("a");
			link.href = url;
			const timestamp = new Date().toISOString().split("T")[0];
			link.download = `strudel-${timestamp}-${formatTime(currentRecording.duration).replace(":", "-")}.webm`;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			URL.revokeObjectURL(url);
			setShowActions(false);
		} catch (error) {
			console.error("Download error:", error);
		}
	};

	const handleDiscard = () => {
		discardRecording?.();
		setShowActions(false);
		setIsPlaying(false);
	};

	const handlePlayPause = () => {
		if (audioRef.current) {
			if (isPlaying) {
				audioRef.current.pause();
				setIsPlaying(false);
			} else {
				audioRef.current.play();
				setIsPlaying(true);
			}
		}
	};

	useEffect(() => {
		if (!isPlaying || !audioRef.current) return;

		let animationId: number;

		const updateProgress = () => {
			if (audioRef.current) {
				setCurrentTime(audioRef.current.currentTime);
			}
			animationId = requestAnimationFrame(updateProgress);
		};

		animationId = requestAnimationFrame(updateProgress);
		return () => cancelAnimationFrame(animationId);
	}, [isPlaying]);

	const handlePlayEnded = () => {
		setIsPlaying(false);
		setCurrentTime(0);
	};

	return (
		<div className="relative">
			{!isRecording && !currentRecording ? (
				<button
					onClick={handleStartRecording}
					className="px-2.5 py-1 bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/30 transition-colors text-xs text-white/90 rounded"
					title={
						!isWebAudioReady ? "Web Audio API not available" : "Start recording"
					}
				>
					● Record
				</button>
			) : isRecording ? (
				<button
					onClick={handleStopRecording}
					className="px-2.5 py-1 bg-red-900/40 border border-red-500/60 hover:bg-red-900/60 transition-colors text-xs text-red-300 rounded animate-pulse"
				>
					■ {formatTime(recordingDuration)}
				</button>
			) : (
				<div className="relative">
					<button
						onClick={() => setShowActions(!showActions)}
						className="px-2.5 py-1 bg-green-900/40 border border-green-500/60 hover:bg-green-900/60 transition-colors text-xs text-green-300 rounded"
					>
						✓{" "}
						{currentRecording ? formatTime(currentRecording.duration) : "0:00"}
					</button>

					{showActions && (
						<div className="absolute top-full right-0 mt-1 bg-black border border-white/20 rounded shadow-lg z-50 min-w-max w-48">
							<button
								onClick={handlePlayPause}
								className="relative w-full px-4 py-2.5 text-left text-xs text-white/80 hover:bg-white/10 border-b border-white/10 overflow-hidden group"
							>
								<div
									className="absolute inset-0 bg-green-900/30"
									style={{
										width: currentRecording
											? `${(currentTime / currentRecording.duration) * 100}%`
											: "0%",
									}}
								/>
								<span className="relative z-10 block">
									{isPlaying ? "⏸ Pause" : "▶ Play"}
								</span>
								<span className="relative z-10 text-xs text-white/60">
									{formatTime(currentTime)} /{" "}
									{currentRecording
										? formatTime(currentRecording.duration)
										: "0:00"}
								</span>
							</button>
							<button
								onClick={handleDownload}
								className="block w-full px-4 py-2.5 text-left text-xs text-white/80 hover:bg-white/10 border-b border-white/10"
							>
								↓ Download
							</button>
							<button
								onClick={handleDiscard}
								className="block w-full px-4 py-2.5 text-left text-xs text-white/80 hover:bg-white/10"
							>
								✕ Discard
							</button>
						</div>
					)}

					{currentRecording && (
						<audio ref={audioRef} onEnded={handlePlayEnded} />
					)}
				</div>
			)}
		</div>
	);
}
