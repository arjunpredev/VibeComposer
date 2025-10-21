import { useState, useRef, useEffect } from "react";
import { useStore } from "../store/useStore";
import Anthropic from "@anthropic-ai/sdk";

export function Chat() {
	const { apiKey, messages, addMessage, clearMessages, updateStrudelCode } =
		useStore();
	const [input, setInput] = useState("");
	const [isStreaming, setIsStreaming] = useState(false);
	const [streamingContent, setStreamingContent] = useState("");
	const messagesEndRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (messagesEndRef.current) {
			const container = messagesEndRef.current.parentElement;
			if (container) {
				container.scrollTop = container.scrollHeight;
			}
		}
	}, [messages]);

	async function handleSendMessage() {
		if (!input.trim() || !apiKey || isStreaming) return;

		const userMessage = {
			role: "user" as const,
			content: input.trim(),
			timestamp: Date.now(),
		};

		addMessage(userMessage);
		setInput("");
		setIsStreaming(true);
		setStreamingContent("");

		try {
			const anthropic = new Anthropic({
				apiKey: apiKey,
				dangerouslyAllowBrowser: true,
			});

			const systemPrompt = `You are a Strudel code assistant. Strudel is a live coding environment for making music. You ONLY respond with valid Strudel code blocks. Never include explanations, markdown formatting, or any text outside of the code. Just return raw Strudel code that can be directly executed.

Example response format:
setcps(1)
n("<0 1 2 3 4>*8").scale('G4 minor')
.s("gm_lead_6_voice")
.clip(sine.range(.2,.8).slow(8))

Do not wrap your response in markdown code blocks or add any commentary.`;

			const stream = await anthropic.messages.stream({
				model: "claude-3-5-haiku-20241022",
				max_tokens: 1024,
				messages: [
					...messages.map((m) => ({
						role: m.role,
						content: m.content,
					})),
					{
						role: "user",
						content: userMessage.content,
					},
				],
				system: systemPrompt,
			});

			let fullContent = "";

			for await (const chunk of stream) {
				if (
					chunk.type === "content_block_delta" &&
					chunk.delta.type === "text_delta"
				) {
					fullContent += chunk.delta.text;
					setStreamingContent(fullContent);
				}
			}

			const assistantMessage = {
				role: "assistant" as const,
				content: fullContent,
				timestamp: Date.now(),
			};

			addMessage(assistantMessage);
			setStreamingContent("");
		} catch (error) {
			console.error("Error streaming response:", error);
			const errorMessage = {
				role: "assistant" as const,
				content: `Error: ${
					error instanceof Error ? error.message : "Failed to get response"
				}`,
				timestamp: Date.now(),
			};
			addMessage(errorMessage);
		} finally {
			setIsStreaming(false);
		}
	}

	function handleApplyCode(code: string) {
		// Clean the code - remove markdown code blocks if present
		let cleanCode = code.trim();
		if (cleanCode.startsWith("```")) {
			cleanCode = cleanCode.replace(/^```[\w]*\n/, "").replace(/\n```$/, "");
		}
		updateStrudelCode(cleanCode);
	}

	return (
		<div className="flex flex-col h-full min-h-0">
			<div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
				{messages.map((message, index) => (
					<div
						key={index}
						className={`flex flex-col gap-2 ${
							message.role === "user" ? "items-end" : "items-start"
						}`}
					>
						<div
							className={`max-w-[80%] p-3 ${
								message.role === "user"
									? "bg-white text-black"
									: "bg-white/10 text-white border border-white/20"
							}`}
						>
							<pre className="whitespace-pre-wrap font-mono text-sm">
								{message.content}
							</pre>
						</div>
						{message.role === "assistant" && (
							<button
								onClick={() => handleApplyCode(message.content)}
								className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm transition-colors"
							>
								Apply to Strudel
							</button>
						)}
					</div>
				))}

				{streamingContent && (
					<div className="flex flex-col gap-2 items-start">
						<div className="max-w-[80%] p-3 bg-white/10 text-white border border-white/20">
							<pre className="whitespace-pre-wrap font-mono text-sm">
								{streamingContent}
							</pre>
						</div>
					</div>
				)}

				<div ref={messagesEndRef} />
			</div>

			<div className="border-t border-white/20 p-4">
				<div className="flex gap-2 mb-2">
					<button
						onClick={clearMessages}
						disabled={messages.length === 0}
						className="px-3 py-1 text-sm border border-white/20 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
					>
						Clear History
					</button>
				</div>
				<div className="flex gap-2">
					<input
						type="text"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						onKeyDown={(e) =>
							e.key === "Enter" && !e.shiftKey && handleSendMessage()
						}
						placeholder={
							apiKey ? "Ask for Strudel code..." : "Enter API key first..."
						}
						disabled={!apiKey || isStreaming}
						className="flex-1 px-3 py-2 bg-black border border-white/20 focus:border-white/50 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
					/>
					<button
						onClick={handleSendMessage}
						disabled={!apiKey || !input.trim() || isStreaming}
						className="px-4 py-2 bg-white text-black hover:bg-white/90 disabled:bg-white/20 disabled:text-white/50 disabled:cursor-not-allowed transition-colors"
					>
						{isStreaming ? "Sending..." : "Send"}
					</button>
				</div>
			</div>
		</div>
	);
}
