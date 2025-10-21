import { useEffect, useRef } from "react";
import { useStore } from "~/store/useStore";
import { useSendChatMessage } from "~/hooks/useSendChatMessage";
import { ChatMessage } from "./chat-message";
import { SuggestionsPanel } from "./suggestions-panel";

export function MessageList() {
	const { messages, streamingContent, showingExamples, setShowingExamples } =
		useStore();
	const { sendMessage } = useSendChatMessage();
	const messagesEndRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const showingSuggestionsOnly =
			(messages.length === 0 && !streamingContent) || showingExamples;
		if (!showingSuggestionsOnly && messagesEndRef.current) {
			const container = messagesEndRef.current.parentElement;
			if (container) {
				container.scrollTop = container.scrollHeight;
			}
		}
	}, [messages, streamingContent, showingExamples]);

	function handleSuggestionClick(text: string) {
		setShowingExamples(false);
		sendMessage(text);
	}

	return (
		<div className="flex-1 overflow-y-auto p-2 md:p-4 space-y-4 min-h-0">
			{showingExamples ? (
				<SuggestionsPanel onSuggestionClick={handleSuggestionClick} />
			) : (
				<>
					{messages.length === 0 && !streamingContent && (
						<SuggestionsPanel onSuggestionClick={handleSuggestionClick} />
					)}

					{messages.map((message) => (
						<ChatMessage
							key={message.timestamp}
							timestamp={message.timestamp}
						/>
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
				</>
			)}
		</div>
	);
}
