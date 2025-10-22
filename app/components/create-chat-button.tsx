import { useStore } from "~/store/useStore";

export function CreateChatButton() {
	const { createChat } = useStore();

	function handleCreate() {
		const now = new Date();
		const timeStr = now.toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit",
			hour12: true,
		});
		const dateStr = now.toLocaleDateString();
		createChat(`${dateStr} ${timeStr}`);
	}

	return (
		<button
			onClick={handleCreate}
			className="w-full px-3 py-2 bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/30 rounded-lg transition-colors text-xs font-medium text-white flex items-center justify-center gap-2"
		>
			<svg
				className="w-4 h-4"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M12 4v16m8-8H4"
				/>
			</svg>
			New Chat
		</button>
	);
}
