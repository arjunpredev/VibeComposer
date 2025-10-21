interface MobileTabNavigationProps {
	activeTab: "repl" | "chat";
	onTabChange: (tab: "repl" | "chat") => void;
}

export function MobileTabNavigation({
	activeTab,
	onTabChange,
}: MobileTabNavigationProps) {
	return (
		<div className="border-t border-white/20 flex gap-0 flex-shrink-0">
			<button
				onClick={() => onTabChange("repl")}
				className={`flex-1 py-3 px-4 text-center font-mono text-sm transition-colors ${
					activeTab === "repl"
						? "bg-white text-black font-bold"
						: "bg-black text-white/50 hover:text-white/70"
				}`}
			>
				REPL
			</button>
			<button
				onClick={() => onTabChange("chat")}
				className={`flex-1 py-3 px-4 text-center font-mono text-sm transition-colors ${
					activeTab === "chat"
						? "bg-white text-black font-bold"
						: "bg-black text-white/50 hover:text-white/70"
				}`}
			>
				CHAT
			</button>
		</div>
	);
}
