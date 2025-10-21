interface AppHeaderProps {
	onHeaderClick: () => void;
}

export function AppHeader({ onHeaderClick }: AppHeaderProps) {
	return (
		<header
			className="border-b border-white/20 p-4 flex-shrink-0 flex items-center justify-between cursor-pointer group"
			onClick={onHeaderClick}
		>
			<div className="flex items-center gap-3 hover:opacity-70 transition-opacity">
				<img src="/vibe-composer.png" alt="Vibe Composer" className="w-8 h-8" />
				<h1 className="text-md md:text-xl font-bold">VIBE COMPOSER</h1>
			</div>
		</header>
	);
}
