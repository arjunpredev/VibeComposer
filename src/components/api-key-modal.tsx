import { useEffect, useState } from "react";
import { useStore } from "../store/useStore";
import Anthropic from "@anthropic-ai/sdk";

export function ApiKeyModal() {
	const { apiKey, setApiKey, clearApiKey } = useStore();
	const [inputValue, setInputValue] = useState("");
	const [isValidating, setIsValidating] = useState(false);
	const [error, setError] = useState("");
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		if (!apiKey) {
			setIsOpen(true);
		} else {
			setIsOpen(false);
		}
	}, [apiKey]);

	useEffect(() => {
		function handleOpenModal() {
			setIsOpen(true);
		}

		window.addEventListener("openApiKeyModal", handleOpenModal);
		return () => window.removeEventListener("openApiKeyModal", handleOpenModal);
	}, []);

	async function validateApiKey(key: string): Promise<boolean> {
		try {
			setIsValidating(true);
			setError("");

			const anthropic = new Anthropic({
				apiKey: key,
				dangerouslyAllowBrowser: true,
			});

			await anthropic.messages.create({
				model: "claude-haiku-4-5",
				max_tokens: 10,
				messages: [
					{
						role: "user",
						content: "test",
					},
				],
			});

			return true;
		} catch (err) {
			const errorMessage =
				err instanceof Error ? err.message : "Invalid API key";
			setError(errorMessage);
			return false;
		} finally {
			setIsValidating(false);
		}
	}

	async function handleSave() {
		if (!inputValue.trim()) return;

		const isValid = await validateApiKey(inputValue.trim());
		if (isValid) {
			setApiKey(inputValue.trim());
			setInputValue("");
			setIsOpen(false);
		}
	}

	function handleRemove() {
		clearApiKey();
		setInputValue("");
		setError("");
	}

	function handleKeyDown(e: React.KeyboardEvent) {
		if (e.key === "Enter" && !isValidating && inputValue.trim()) {
			handleSave();
		} else if (e.key === "Escape" && apiKey) {
			setIsOpen(false);
		}
	}

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
			<div className="bg-black border border-white/20 p-6 rounded-lg w-full max-w-2xl mx-4 space-y-4 max-h-[90vh] overflow-y-auto">
				<img
					src="/vibe-composer.png"
					alt="Vibe Composer"
					className="w-[200px] mx-auto"
				/>
				<p className="text-lg text-white/90">
					<span className="font-semibold">Vibe Composer</span> is an experience
					built by{" "}
					<a
						href="https://pre.dev"
						target="_blank"
						rel="noopener noreferrer"
						className="font-bold text-blue-100 hover:text-white/70 transition-colors"
					>
						pre.dev
					</a>{" "}
					that combines <b>Live Coding</b> with <b>Vibe Coding</b> to create
					music.
				</p>
				<p className="text-xs text-white/60">
					To start, paste in your API key from{" "}
					<a
						href="https://console.anthropic.com/settings/keys"
						target="_blank"
						rel="noopener noreferrer"
						className="font-bold text-white hover:text-white/80 underline transition-colors"
					>
						console.anthropic.com/settings/keys
					</a>{" "}
					to enable AI music creation.
				</p>

				{apiKey && (
					<div className="flex items-center gap-2 p-3 bg-green-600/20 border border-green-600/50 rounded">
						<span className="text-green-400">● Active</span>
						<button
							onClick={handleRemove}
							className="ml-auto px-3 py-1 text-sm bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-600/50 rounded transition-colors"
						>
							Remove
						</button>
					</div>
				)}

				{!apiKey && !isValidating && (
					<div>
						<input
							type="password"
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
							onKeyDown={handleKeyDown}
							placeholder="sk-ant-..."
							className="w-full px-3 py-2 bg-black border border-white/20 focus:border-white/50 focus:outline-none rounded text-white"
							autoFocus
							disabled={isValidating}
						/>
					</div>
				)}

				{error && (
					<div className="p-3 bg-red-600/20 border border-red-600/50 rounded text-sm text-red-400 max-h-48 overflow-y-auto break-words">
						{error}
					</div>
				)}

				<p className="text-xs text-white/50">
					Your API key is stored locally in your browser and never sent to our
					servers.
				</p>

				<div className="flex gap-2 justify-end">
					{apiKey && (
						<button
							onClick={() => setIsOpen(false)}
							className="px-4 py-2 text-sm border border-white/20 hover:bg-white/10 transition-colors rounded"
							disabled={isValidating}
						>
							Cancel
						</button>
					)}
					<button
						onClick={handleSave}
						disabled={!inputValue.trim() || isValidating}
						className="px-4 py-2 text-sm bg-white text-black hover:bg-white/90 disabled:bg-white/20 disabled:text-white/50 disabled:cursor-not-allowed transition-colors rounded"
					>
						{isValidating ? "Validating..." : "Save"}
					</button>
				</div>

				<p className="text-xs text-white/50 text-center">
					Don't trust us?{" "}
					<a
						href="https://github.com/arjunpredev/VibeComposer"
						target="_blank"
						rel="noopener noreferrer"
						className="text-white/70 hover:text-white transition-colors underline"
					>
						Fork it yourself on GitHub
					</a>
				</p>
			</div>
		</div>
	);
}
