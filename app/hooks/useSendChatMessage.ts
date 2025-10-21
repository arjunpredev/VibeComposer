import { useCallback } from "react";
import { useStore } from "~/store/useStore";
import Anthropic from "@anthropic-ai/sdk";
import { STRUDEL_SYSTEM_PROMPT } from "~/prompts/strudel-system-prompt";
import { cleanStrudelCode, trackEvent } from "~/utils/strudel-utils";

export function useSendChatMessage() {
	const {
		apiKey,
		messages,
		addMessage,
		updateStrudelCode,
		setIsStreaming,
		setStreamingContent,
		setActiveTab,
	} = useStore();

	const sendMessage = useCallback(
		async (content: string) => {
			if (!content.trim() || !apiKey) return;

			const userMessage = {
				role: "user" as const,
				content: content.trim(),
				timestamp: Date.now(),
			};

			addMessage(userMessage);
			setIsStreaming(true);
			setStreamingContent("");

			// Track chat submission
			trackEvent("chat_submitted", {
				messageLength: content.trim().length,
				timestamp: Date.now(),
			});

			try {
				const anthropic = new Anthropic({
					apiKey: apiKey,
					dangerouslyAllowBrowser: true,
				});

				const stream = await anthropic.messages.stream({
					model: "claude-haiku-4-5",
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
					system: STRUDEL_SYSTEM_PROMPT,
				});

				let fullContent = "";
				let inputTokens = 0;
				let outputTokens = 0;

				for await (const chunk of stream) {
					if (
						chunk.type === "content_block_delta" &&
						chunk.delta.type === "text_delta"
					) {
						fullContent += chunk.delta.text;
						setStreamingContent(fullContent);
					}
					if (chunk.type === "message_delta" && chunk.usage) {
						outputTokens = chunk.usage.output_tokens;
					}
					if (chunk.type === "message_start" && chunk.message.usage) {
						inputTokens = chunk.message.usage.input_tokens;
					}
				}

				const assistantMessage = {
					role: "assistant" as const,
					content: fullContent,
					timestamp: Date.now(),
					inputTokens,
					outputTokens,
				};

				addMessage(assistantMessage);
				setStreamingContent("");

				const cleanCode = cleanStrudelCode(fullContent);
				updateStrudelCode(cleanCode);
				setActiveTab("repl");

				// Track response application
				trackEvent("response_applied", {
					inputTokens,
					outputTokens,
					codeLength: cleanCode.length,
					timestamp: Date.now(),
				});
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
		},
		[
			apiKey,
			messages,
			addMessage,
			updateStrudelCode,
			setIsStreaming,
			setStreamingContent,
			setActiveTab,
		]
	);

	return { sendMessage };
}
