import { useCallback } from "react";
import { useStore } from "~/store/useStore";
import { cleanStrudelCode } from "~/utils/strudel-utils";
import { useTrackEvent } from "~/hooks/useTrackEvent";

export function useSendChatMessage() {
	const { trackEvent } = useTrackEvent();
	const {
		activeChatId,
		createChat,
		getCurrentChatMessages,
		addMessage,
		removeLastMessage,
		updateStrudelCode,
		setIsStreaming,
		setStreamingContent,
		setActiveTab,
		setActiveChat,
		setMessageLimitExceededModalOpen,
		setChatInput,
	} = useStore();

	const sendMessage = useCallback(
		async (content: string) => {
			if (!content.trim()) {
				return;
			}

			let chatId = activeChatId;

			if (!chatId) {
				try {
					await createChat();
					chatId = useStore.getState().activeChatId;
					if (!chatId) {
						throw new Error("Failed to create chat");
					}
				} catch (error) {
					console.error("Failed to create chat:", error);
					return;
				}
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
				const userId = (window as any).__clerkUserId;
				const response = await fetch("/api/chat/message", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						chatId: chatId,
						userId,
						content: userMessage.content,
					}),
				});

				if (!response.ok) {
					const errorData = await response.json();
					if (
						response.status === 400 &&
						errorData.error?.includes("Message limit")
					) {
						// Remove the message that was just added since limit was exceeded
						removeLastMessage();
						// Restore message to input so user can save it
						setChatInput(userMessage.content);
						setMessageLimitExceededModalOpen(true);
						setIsStreaming(false);
						return;
					}
					throw new Error(`Server error: ${response.statusText}`);
				}

				const reader = response.body?.getReader();
				if (!reader) throw new Error("No response body");

				const decoder = new TextDecoder();
				let fullContent = "";
				let inputTokens = 0;
				let outputTokens = 0;

				while (true) {
					const { done, value } = await reader.read();
					if (done) break;

					const chunk = decoder.decode(value, { stream: true });
					const lines = chunk.split("\n");

					for (const line of lines) {
						if (line.startsWith("data: ")) {
							try {
								const data = JSON.parse(line.slice(6));
								if (data.type === "text") {
									fullContent += data.data;
									setStreamingContent(fullContent);
								} else if (data.type === "done") {
									inputTokens = data.inputTokens;
									outputTokens = data.outputTokens;
								}
							} catch {
								/* ignore parse errors */
							}
						}
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
			activeChatId,
			createChat,
			addMessage,
			updateStrudelCode,
			setIsStreaming,
			setStreamingContent,
			setActiveTab,
			getCurrentChatMessages,
			setMessageLimitExceededModalOpen,
			removeLastMessage,
			setChatInput,
			trackEvent,
		]
	);

	return { sendMessage };
}
