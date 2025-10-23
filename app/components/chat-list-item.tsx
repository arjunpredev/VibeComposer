import { useState } from "react";
import { useNavigate } from "react-router";
import { useStore } from "~/store/useStore";
import { useTrackEvent } from "~/hooks/useTrackEvent";
import { Chat } from "~/store/useStore";

interface ChatListItemProps {
	chat: Chat;
	isActive: boolean;
	onChatSelect?: () => void;
}

export function ChatListItem({
	chat,
	isActive,
	onChatSelect,
}: ChatListItemProps) {
	const { setActiveChat, renameChat, deleteChat } = useStore();
	const navigate = useNavigate();
	const { trackEvent } = useTrackEvent();
	const [isRenaming, setIsRenaming] = useState(false);
	const [newName, setNewName] = useState(chat.name);
	const [showMenu, setShowMenu] = useState(false);

	function handleRename() {
		if (newName.trim() && newName !== chat.name) {
			trackEvent("chat: renamed");
			renameChat(chat._id || chat.id, newName);
		} else {
			setNewName(chat.name);
		}
		setIsRenaming(false);
	}

	function handleDelete() {
		if (confirm(`Delete chat "${chat.name}"?`)) {
			trackEvent("chat: delete confirmed");
			deleteChat(chat._id || chat.id);
		}
	}

	function handleSelectChat() {
		const chatId = chat._id || chat.id;
		setActiveChat(chatId);
		navigate(`?chatId=${chatId}`);
		trackEvent("chat: selected from list");
		onChatSelect?.();
	}

	const userMessageCount = chat.messages.filter(
		(m) => m.role === "user"
	).length;
	const lastUpdated = new Date(chat.updatedAt);
	const timeAgo = getTimeAgo(lastUpdated);

	return (
		<div
			className={`group relative rounded-lg transition-colors ${
				isActive
					? "bg-white/20 border border-white/30"
					: "bg-white/5 border border-transparent hover:bg-white/10 hover:border-white/20 cursor-pointer"
			}`}
		>
			{isRenaming ? (
				<div className="p-2">
					<input
						autoFocus
						type="text"
						value={newName}
						onChange={(e) => setNewName(e.target.value)}
						onBlur={handleRename}
						onKeyDown={(e) => {
							if (e.key === "Enter") handleRename();
							if (e.key === "Escape") {
								setNewName(chat.name);
								setIsRenaming(false);
							}
						}}
						className="w-full px-2 py-1 bg-black border border-white/30 rounded text-xs text-white focus:outline-none focus:border-white/50"
						placeholder="Chat name"
					/>
				</div>
			) : (
				<div onClick={handleSelectChat} className="p-2 min-h-0">
					<div className="flex items-start justify-between gap-2 min-h-0">
						<div className="flex-1 min-w-0">
							<p className="text-sm font-medium text-white truncate">
								{chat.name}
							</p>
							<p className="text-xs text-white/50 mt-0.5">
								{userMessageCount} message{userMessageCount !== 1 ? "s" : ""} •{" "}
								{timeAgo}
							</p>
						</div>

						<div className="relative flex-shrink-0">
							<button
								onClick={(e) => {
									e.stopPropagation();
									setShowMenu(!showMenu);
								}}
								className="p-1 hover:bg-white/20 rounded opacity-0 group-hover:opacity-100 transition-opacity"
								title="Options"
							>
								<svg
									className="w-4 h-4 text-white/60"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
									/>
								</svg>
							</button>

							{showMenu && (
								<div className="absolute right-0 mt-1 w-32 bg-black/90 border border-white/20 rounded-lg shadow-lg z-50">
									<button
										onClick={(e) => {
											e.stopPropagation();
											setIsRenaming(true);
											setShowMenu(false);
										}}
										className="block w-full text-left px-3 py-2 text-xs text-white/80 hover:bg-white/10 hover:text-white transition-colors"
									>
										Rename
									</button>
									<button
										onClick={(e) => {
											e.stopPropagation();
											handleDelete();
											setShowMenu(false);
										}}
										className="block w-full text-left px-3 py-2 text-xs text-red-400/80 hover:bg-red-500/10 hover:text-red-300 transition-colors border-t border-white/10"
									>
										Delete
									</button>
								</div>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

function getTimeAgo(date: Date): string {
	const now = new Date();
	const diffMs = now.getTime() - date.getTime();
	const diffMins = Math.floor(diffMs / 60000);
	const diffHours = Math.floor(diffMins / 60);
	const diffDays = Math.floor(diffHours / 24);

	if (diffMins < 1) return "now";
	if (diffMins < 60) return `${diffMins}m ago`;
	if (diffHours < 24) return `${diffHours}h ago`;
	if (diffDays < 7) return `${diffDays}d ago`;
	return date.toLocaleDateString();
}
