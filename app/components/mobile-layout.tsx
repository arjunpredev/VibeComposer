import { StrudelRepl } from "./StrudelRepl";
import { Chat } from "./Chat";
import { ApiKeyButton } from "./api-key-button";
import { MobileTabNavigation } from "./mobile-tab-navigation";
import { TroubleHearingModal } from "./trouble-hearing-modal";
import { ExamplesModal } from "./examples-modal";
import { useState } from "react";

interface MobileLayoutProps {
	activeTab: "repl" | "chat";
	onTabChange: (tab: "repl" | "chat") => void;
}

export function MobileLayout({ activeTab, onTabChange }: MobileLayoutProps) {
	const [showTroubleHearingModal, setShowTroubleHearingModal] = useState(false);
	const [showExamplesModal, setShowExamplesModal] = useState(false);

	return (
		<div className="md:hidden flex flex-col flex-1 min-h-0">
			<div className="flex-1 min-h-0 flex flex-col">
				{activeTab === "repl" ? (
					<div className="flex flex-col flex-1 min-h-0 overflow-hidden">
						<div className="border-b border-white/20 px-4 py-2 text-sm text-white/70 flex-shrink-0 flex items-center justify-between h-10">
							<span>STRUDEL REPL</span>
							<div className="flex gap-1.5 items-center">
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
									className="hidden md:inline-block px-2.5 py-1 bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/30 transition-colors text-xs text-white/90 rounded"
								>
									Learn more
								</a>
								<button
									onClick={() => setShowTroubleHearingModal(true)}
									className="text-xs text-white/60 hover:text-white/80 transition-colors"
								>
									Trouble Hearing?
								</button>
							</div>
						</div>
						<div className="flex-1 min-h-0 overflow-hidden">
							<StrudelRepl />
						</div>
					</div>
				) : (
					<div className="flex flex-col flex-1 min-h-0 overflow-hidden">
						<div className="border-b border-white/20 px-4 py-2 flex items-center justify-between flex-shrink-0 h-10">
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
			<ExamplesModal
				isOpen={showExamplesModal}
				onClose={() => setShowExamplesModal(false)}
			/>
		</div>
	);
}
