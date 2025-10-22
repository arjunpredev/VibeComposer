import { useState } from "react";
import { useStore } from "~/store/useStore";
import { STRUDEL_EXAMPLES } from "~/utils/strudel-examples";

interface ExamplesModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export function ExamplesModal({ isOpen, onClose }: ExamplesModalProps) {
	const { currentExampleIndex, setCurrentExampleIndex, updateStrudelCode } =
		useStore();
	const currentExample = STRUDEL_EXAMPLES[currentExampleIndex];

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
			<div className="bg-black border border-white/20 rounded-lg w-full max-w-md mx-4 flex flex-col max-h-[80vh]">
				<div className="border-b border-white/20 p-4 flex items-center justify-between flex-shrink-0">
					<h2 className="text-lg text-white">Strudel Examples</h2>
					<button
						onClick={onClose}
						className="text-white/60 hover:text-white/80 transition-colors text-xl"
					>
						✕
					</button>
				</div>

				<div className="flex-1 overflow-y-auto p-4 min-h-0">
					<div className="space-y-2">
						{STRUDEL_EXAMPLES.map((example, index) => (
							<button
								key={index}
								onClick={() => {
									setCurrentExampleIndex(index);
									updateStrudelCode(example.code);
									onClose();
								}}
								className={`w-full text-left px-3 py-2 rounded transition-colors ${
									index === currentExampleIndex
										? "bg-white/20 border border-white/30 text-white"
										: "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20"
								}`}
							>
								<div className="flex items-baseline justify-between gap-2">
									<span className="font-medium">{example.name}</span>
									{example.by && (
										<span className="text-xs text-white/40">
											by {example.by}
										</span>
									)}
								</div>
							</button>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
