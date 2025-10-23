import { useStore } from "~/store/useStore";
import { useSendChatMessage } from "~/hooks/useSendChatMessage";

export function ChatInput() {
	const { chatInput, isStreaming, activeChatId, setChatInput } = useStore();
	const { sendMessage } = useSendChatMessage();

	function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
		if (
			e.key === "Enter" &&
			!e.shiftKey &&
			chatInput.trim() &&
			activeChatId &&
			!isStreaming
		) {
			e.preventDefault();
			sendMessage(chatInput);
			setChatInput("");
		}
	}

	function handleSendClick() {
		if (chatInput.trim() && activeChatId && !isStreaming) {
			sendMessage(chatInput);
			setChatInput("");
		}
	}

	return (
		<div className="border-t border-white/20 p-2 md:p-4 flex-shrink-0">
			<div className="flex gap-2">
				<input
					type="text"
					value={chatInput}
					onChange={(e) => setChatInput(e.target.value)}
					onKeyDown={handleKeyDown}
					placeholder="Compose a vibe..."
					disabled={!activeChatId || isStreaming}
					className="flex-1 px-3 py-2 bg-black border placeholder:text-white/50 border-white/20 focus:border-white/50 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
				/>
				<button
					onClick={handleSendClick}
					disabled={!activeChatId || !chatInput.trim() || isStreaming}
					className="px-4 py-2 bg-white text-black hover:bg-white/90 disabled:bg-white/20 disabled:text-white/50 disabled:cursor-not-allowed transition-colors"
				>
					{isStreaming ? "Sending..." : "Send"}
				</button>
			</div>
		</div>
	);
}
