import { StrudelRepl } from "./StrudelRepl";
import { Chat } from "./Chat";
import { ApiKeyButton } from "./api-key-button";

export function DesktopLayout() {
	return (
		<div className="hidden md:flex flex-1 overflow-hidden min-h-0">
			<div className="w-1/2 border-r border-white/20 flex flex-col min-h-0">
				<div className="flex-1 min-h-0">
					<StrudelRepl />
				</div>
			</div>

			<div className="w-1/2 flex flex-col min-h-0">
				<div className="border-b border-white/20 p-2 flex items-center justify-between flex-shrink-0">
					<span className="text-sm text-white/70">AI CHAT</span>
					<ApiKeyButton />
				</div>
				<div className="flex-1 min-h-0">
					<Chat />
				</div>
			</div>
		</div>
	);
}
