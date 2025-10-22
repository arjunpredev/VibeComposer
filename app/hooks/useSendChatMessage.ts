import { useCallback } from "react";
import { useStore } from "~/store/useStore";
import Anthropic from "@anthropic-ai/sdk";
import { STRUDEL_SYSTEM_PROMPT } from "~/prompts/strudel-system-prompt";
import { cleanStrudelCode, trackEvent } from "~/utils/strudel-utils";

export function useSendChatMessage() {
	const {
		apiKey,
		getCurrentChatMessages,
		addMessage,
		updateStrudelCode,
		setIsStreaming,
		setStreamingContent,
		setActiveTab,
		setApiKeyModalOpen,
		setApiKeyModalWarning,
	} = useStore();

	const sendMessage = useCallback(
		async (content: string) => {
			if (!content.trim() || !apiKey) {
				if (!apiKey) {
					setApiKeyModalOpen(true);
					setApiKeyModalWarning(
						"API key required to send messages. Please add your API key to continue."
					);
				}
				return;
			}

			const userMessage = {
				role: "user" as const,
				content: content.trim(),
				timestamp: Date.now(),
			};

			addMessage(userMessage);
			setIsStreaming(true);
			setStreamingContent("");

			trackEvent("chat_submitted", {
				messageLength: content.trim().length,
				timestamp: Date.now(),
			});

			try {
				const anthropic = new Anthropic({
					apiKey: apiKey,
					dangerouslyAllowBrowser: true,
				});

				const messages = getCurrentChatMessages();
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

				trackEvent("response_applied", {
					inputTokens,
					outputTokens,
					codeLength: cleanCode.length,
					timestamp: Date.now(),
				});
			} catch (error) {
				console.error("Error streaming response:", error);

				const isApiKeyError =
					error instanceof Error &&
					(error.message.includes("401") ||
						error.message.includes("Unauthorized") ||
						error.message.includes("authentication") ||
						error.message.includes("API key"));

				if (isApiKeyError) {
					setApiKeyModalOpen(true);
					setApiKeyModalWarning(
						"Your API key is invalid or expired. Please update it to continue."
					);
				} else {
					const errorMessage = {
						role: "assistant" as const,
						content: `Error: ${
							error instanceof Error ? error.message : "Failed to get response"
						}`,
						timestamp: Date.now(),
					};
					addMessage(errorMessage);
				}
			} finally {
				setIsStreaming(false);
			}
		},
		[
			apiKey,
			addMessage,
			updateStrudelCode,
			setIsStreaming,
			setStreamingContent,
			setActiveTab,
			getCurrentChatMessages,
			setApiKeyModalOpen,
			setApiKeyModalWarning,
		]
	);

	return { sendMessage };
}
