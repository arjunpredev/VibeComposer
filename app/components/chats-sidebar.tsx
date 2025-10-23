import { useState } from "react";
import { useStore } from "~/store/useStore";
import { ChatListItem } from "./chat-list-item";
import { CreateChatButton } from "./create-chat-button";

interface ChatsSidebarProps {
	isOpen?: boolean;
	onClose?: () => void;
	isModal?: boolean;
	onChatSelect?: () => void;
}

export function ChatsSidebar({
	isOpen = true,
	onClose,
	isModal = false,
	onChatSelect,
}: ChatsSidebarProps) {
	const { chats, activeChatId } = useStore();
	const [isCollapsed, setIsCollapsed] = useState(false);

	const sortedChats = [...chats].sort((a, b) => b.updatedAt - a.updatedAt);

	if (!isOpen) return null;

	return (
		<div
			className={`${
				isCollapsed && !isModal ? "w-12" : "w-full"
			} bg-black/50 flex flex-col transition-all duration-200 overflow-hidden h-full`}
		>
			<div
				className={`flex items-center justify-between px-3 py-3 ${isModal ? "border-b border-white/20" : ""} flex-shrink-0`}
			>
				{(!isCollapsed || isModal) && (
					<span className="text-xs font-semibold text-white/70 uppercase tracking-wider">
						Chats
					</span>
				)}
				{!isModal && (
					<button
						onClick={() => setIsCollapsed(!isCollapsed)}
						className="p-1 hover:bg-white/10 rounded transition-colors"
						title={isCollapsed ? "Expand" : "Collapse"}
					>
						<svg
							className={`w-4 h-4 text-white/60 transition-transform ${
								isCollapsed ? "rotate-180" : ""
							}`}
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M15 19l-7-7 7-7"
							/>
						</svg>
					</button>
				)}
			</div>

			{(!isCollapsed || isModal) && (
				<>
					<div className="px-2 py-2 flex-shrink-0">
						<CreateChatButton onChatCreated={onChatSelect} />
					</div>

					<div className="flex-1 overflow-y-auto space-y-1 px-2 py-2">
						{sortedChats.length === 0 ? (
							<div className="text-xs text-white/40 text-center py-4">
								No chats yet
							</div>
						) : (
							sortedChats.map((chat) => (
								<ChatListItem
									key={chat.id}
									chat={chat}
									isActive={chat.id === activeChatId}
									onChatSelect={onChatSelect}
								/>
							))
						)}
					</div>
				</>
			)}
		</div>
	);
}
