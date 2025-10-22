import { StrudelRepl } from "./StrudelRepl";
import { Chat } from "./Chat";
import { ApiKeyButton } from "./api-key-button";
import { ExamplesModal } from "./examples-modal";
import { useState } from "react";

export function DesktopLayout() {
	const [showExamplesModal, setShowExamplesModal] = useState(false);

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
					<ApiKeyButton />
				</div>
				<div className="flex-1 min-h-0">
					<Chat />
				</div>
			</div>

			<ExamplesModal
				isOpen={showExamplesModal}
				onClose={() => setShowExamplesModal(false)}
			/>
		</div>
	);
}
