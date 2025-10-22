import { useStore } from "~/store/useStore";
import { MessageList } from "./message-list";
import { ChatInput } from "./chat-input";

export function Chat() {
	const { messages, clearMessages, showingExamples, setShowingExamples } =
		useStore();

	return (
		<div className="flex flex-col h-full min-h-0">
			{messages.length > 0 && (
				<div className="flex justify-between px-2 md:px-4 py-2 border-b border-white/20 flex-shrink-0">
					<button
						onClick={() => setShowingExamples(!showingExamples)}
						className="text-xs text-white/40 hover:text-white/60 transition-colors"
					>
						{showingExamples ? "hide prompts" : "view prompts"}
					</button>
					<button
						onClick={clearMessages}
						className="text-xs text-white/40 hover:text-white/60 transition-colors"
					>
						clear
					</button>
				</div>
			)}
			<MessageList />
			<ChatInput />
		</div>
	);
}
