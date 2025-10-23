import { useState } from "react";
import { StrudelRepl } from "./StrudelRepl";
import { Chat } from "./Chat";
import { ExamplesModal } from "./examples-modal";
import { ChatsSidebar } from "./chats-sidebar";
import { useStore } from "~/store/useStore";

export function DesktopLayout() {
	const [showExamplesModal, setShowExamplesModal] = useState(false);
	const [showChatsModal, setShowChatsModal] = useState(false);
	const { createChat, getMessageStats } = useStore();
	const { totalMessages, messageLimit, remainingMessages } = getMessageStats();

	async function handleNewChat() {
		try {
			await createChat();
			setShowChatsModal(false);
		} catch (error) {
			console.error("Failed to create chat:", error);
			alert("Failed to create chat");
		}
	}

	return (
		<div className="hidden md:flex flex-1 overflow-hidden min-h-0">
			<div className="w-1/2 border-r border-white/20 flex flex-col min-h-0">
				<div className="border-b border-white/20 px-4 py-2 flex items-center justify-between flex-shrink-0 h-10">
					<span className="text-sm text-white/70">STRUDEL REPL</span>
					<div className="flex gap-2 items-center">
						<button
							onClick={() => setShowExamplesModal(true)}
							className="px-2.5 py-1 bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/30 transition-colors text-xs text-white/90 rounded"
						>
							Examples
						</button>
						<a
							href="https://strudel.cc/workshop/getting-started/"
							target="_blank"
							rel="noopener noreferrer"
							className="px-2.5 py-1 bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/30 transition-colors text-xs text-white/90 rounded"
						>
							Learn more
						</a>
					</div>
				</div>
				<div className="flex-1 min-h-0">
					<StrudelRepl />
				</div>
			</div>

			<div className="w-1/2 flex flex-col min-h-0">
				<div className="border-b border-white/20 px-4 py-2 flex items-center justify-between flex-shrink-0 h-10">
					<span className="text-sm text-white/70">AI CHAT</span>
					<div className="text-xs text-white/60">
						Messages: {totalMessages}/{messageLimit}
					</div>
				</div>
				<div className="flex-1 min-h-0">
					<Chat
						onViewChats={() => setShowChatsModal(true)}
						onNewChat={handleNewChat}
					/>
				</div>
			</div>

			{showChatsModal && (
				<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
					<div className="bg-black border border-white/20 rounded-lg w-[600px] h-[600px] overflow-hidden flex flex-col">
						<div className="flex items-center justify-between px-4 py-3 border-b border-white/20 flex-shrink-0">
							<span className="text-sm font-semibold text-white uppercase">
								Chats
							</span>
							<button
								onClick={() => setShowChatsModal(false)}
								className="p-1 hover:bg-white/10 rounded transition-colors"
								title="Close"
							>
								<svg
									className="w-5 h-5 text-white/60"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>
						</div>
						<ChatsSidebar
							isOpen={true}
							isModal={true}
							onClose={() => setShowChatsModal(false)}
							onChatSelect={() => setShowChatsModal(false)}
						/>
					</div>
				</div>
			)}

			<ExamplesModal
				isOpen={showExamplesModal}
				onClose={() => setShowExamplesModal(false)}
			/>
		</div>
	);
}
