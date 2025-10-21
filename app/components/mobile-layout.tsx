import { StrudelRepl } from "./StrudelRepl";
import { Chat } from "./Chat";
import { ApiKeyButton } from "./api-key-button";
import { MobileTabNavigation } from "./mobile-tab-navigation";
import { TroubleHearingModal } from "./trouble-hearing-modal";
import { useState } from "react";

interface MobileLayoutProps {
	activeTab: "repl" | "chat";
	onTabChange: (tab: "repl" | "chat") => void;
}

export function MobileLayout({ activeTab, onTabChange }: MobileLayoutProps) {
	const [showTroubleHearingModal, setShowTroubleHearingModal] = useState(false);

	return (
		<div className="md:hidden flex flex-col flex-1 min-h-0">
			<div className="flex-1 min-h-0 flex flex-col">
				{activeTab === "repl" ? (
					<div className="flex flex-col flex-1 min-h-0 overflow-hidden">
						<div className="border-b border-white/20 p-2 text-sm text-white/70 flex-shrink-0 flex items-center justify-between">
							<span>STRUDEL REPL</span>
							<button
								onClick={() => setShowTroubleHearingModal(true)}
								className="text-xs text-white/60 hover:text-white/80 transition-colors"
							>
								Trouble Hearing?
							</button>
						</div>
						<div className="flex-1 min-h-0 overflow-hidden">
							<StrudelRepl />
						</div>
					</div>
				) : (
					<div className="flex flex-col flex-1 min-h-0 overflow-hidden">
						<div className="border-b border-white/20 p-2 flex items-center justify-between flex-shrink-0">
							<span className="text-sm text-white/70">AI CHAT</span>
							<ApiKeyButton />
						</div>
						<div className="flex-1 min-h-0 overflow-hidden">
							<Chat />
						</div>
					</div>
				)}
			</div>

			<MobileTabNavigation activeTab={activeTab} onTabChange={onTabChange} />
			<TroubleHearingModal
				isOpen={showTroubleHearingModal}
				onClose={() => setShowTroubleHearingModal(false)}
			/>
		</div>
	);
}
