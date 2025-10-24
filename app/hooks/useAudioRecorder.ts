import { useEffect, useRef, useState, useCallback } from "react";

interface UseAudioRecorderOptions {
  onRecordingComplete?: (blob: Blob, duration: number) => void;
  onError?: (error: Error) => void;
}

export function useAudioRecorder(options: UseAudioRecorderOptions = {}) {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const startTimeRef = useRef<number>(0);
  const [isRecording, setIsRecording] = useState(false);

  const start = useCallback(async () => {
    try {
      let audioContext: AudioContext;
      let destination: MediaStreamAudioDestinationNode;

      if (audioContextRef.current?.state === "closed") {
        audioContextRef.current = null;
      }

      if (!audioContextRef.current) {
        audioContext = new (window.AudioContext ||
          (window as any).webkitAudioContext)();
        destination = audioContext.createMediaStreamDestination();
        const analyser = audioContext.createAnalyser();
        analyser.connect(destination);

        audioContextRef.current = audioContext;
        analyserRef.current = analyser;
      } else {
        audioContext = audioContextRef.current;
        destination = audioContext.createMediaStreamDestination();
        const analyser = audioContext.createAnalyser();
        analyser.connect(destination);
        analyserRef.current = analyser;
      }

      if (audioContext.state === "suspended") {
        await audioContext.resume();
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: false,
            noiseSuppression: false,
            autoGainControl: false,
          },
        });

        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyserRef.current!);
        analyserRef.current!.connect(destination);
        sourceRef.current = source;
      } catch (micError) {
        console.warn("Microphone access denied, using silent audio context", micError);
      }

      const mediaRecorder = new MediaRecorder(destination.stream, {
        mimeType: "audio/webm;codecs=opus",
      });

      chunksRef.current = [];
      startTimeRef.current = Date.now();

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const duration = (Date.now() - startTimeRef.current) / 1000;
        const blob = new Blob(chunksRef.current, {
          type: "audio/webm;codecs=opus",
        });
        options.onRecordingComplete?.(blob, duration);

        if (sourceRef.current) {
          sourceRef.current.mediaStream.getTracks().forEach((track) => {
            track.stop();
          });
          sourceRef.current = null;
        }
      };

      mediaRecorder.onerror = (event) => {
        const error = new Error(`MediaRecorder error: ${event.error}`);
        options.onError?.(error);
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      options.onError?.(err);
      setIsRecording(false);
    }
  }, [options]);

  const stop = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  }, [isRecording]);

  const cancel = useCallback(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    if (sourceRef.current) {
      sourceRef.current.mediaStream.getTracks().forEach((track) => {
        track.stop();
      });
      sourceRef.current = null;
    }
    chunksRef.current = [];
    setIsRecording(false);
  }, []);

  const getFrequencyData = useCallback(() => {
    if (!analyserRef.current) return null;
    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);
    return dataArray;
  }, []);

  useEffect(() => {
    return () => {
      cancel();
      if (audioContextRef.current?.state !== "closed") {
        audioContextRef.current?.close();
      }
    };
  }, [cancel]);

  return {
    isRecording,
    start,
    stop,
    cancel,
    getFrequencyData,
  };
}
