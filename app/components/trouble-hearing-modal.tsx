interface TroubleHearingModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export function TroubleHearingModal({
	isOpen,
	onClose,
}: TroubleHearingModalProps) {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
			<div className="bg-black border border-white/20 p-6 rounded-lg w-full max-w-md mx-4 space-y-4">
				<p className="text-white">
					You must unmute your phone to hear the music from Strudel.
				</p>
				<div className="flex gap-2 justify-end">
					<button
						onClick={onClose}
						className="px-4 py-2 text-sm bg-white text-black hover:bg-white/90 transition-colors rounded"
					>
						Got it
					</button>
				</div>
			</div>
		</div>
	);
}
