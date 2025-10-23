import { useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useStore } from "~/store/useStore";

interface AppHeaderProps {
	onHeaderClick: () => void;
}

export function AppHeader({ onHeaderClick }: AppHeaderProps) {
	const { setSignInModalOpen } = useStore();
	const { isSignedIn, signOut } = useAuth();
	const { user } = useUser();
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const handleOpenUserProfile = () => {
		if (user) {
			user.manageAccount();
		}
	};

	return (
		<header className="border-b border-white/20 p-4 flex-shrink-0 flex items-center justify-between cursor-pointer group">
			<div
				className="flex items-center gap-3 hover:opacity-70 transition-opacity"
				onClick={onHeaderClick}
			>
				<img src="/vibe-composer.png" alt="Vibe Composer" className="w-8 h-8" />
				<h1 className="text-md md:text-xl font-bold">VIBE COMPOSER</h1>
			</div>

			<div className="flex items-center gap-4">
				{isSignedIn ? (
					<div className="relative">
						<button
							onClick={() => setIsDropdownOpen(!isDropdownOpen)}
							className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
							aria-expanded={isDropdownOpen}
							aria-label="User menu"
						>
							{user?.imageUrl && (
								<img
									src={user.imageUrl}
									alt={user.primaryEmailAddress?.emailAddress || "User"}
									className="w-6 h-6 rounded-full"
								/>
							)}
							<span className="hidden sm:inline text-sm text-white">
								{user?.firstName || user?.primaryEmailAddress?.emailAddress}
							</span>
							<svg
								className={`w-4 h-4 text-white transition-transform ${
									isDropdownOpen ? "rotate-180" : ""
								}`}
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M19 14l-7 7m0 0l-7-7m7 7V3"
								/>
							</svg>
						</button>

						{isDropdownOpen && (
							<div className="absolute right-0 mt-2 w-48 bg-black border border-white/20 rounded-lg shadow-lg z-50 overflow-hidden">
								{/* <button
									onClick={() => {
										handleOpenUserProfile();
										setIsDropdownOpen(false);
									}}
									className="w-full px-4 py-2 text-left text-white hover:bg-white/10 transition-colors text-sm flex items-center gap-2"
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
											d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
									Profile & Settings
								</button> */}
								<div className="border-t border-white/10" />
								<button
									onClick={() => {
										signOut({ redirectUrl: "/" });
										setIsDropdownOpen(false);
									}}
									className="w-full px-4 py-2 text-left text-red-400 hover:bg-red-400/10 transition-colors text-sm flex items-center gap-2"
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
											d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
										/>
									</svg>
									Sign Out
								</button>
							</div>
						)}
					</div>
				) : (
					<button
						onClick={() => setSignInModalOpen(true)}
						className="px-4 py-2 rounded-lg bg-white text-black font-semibold hover:bg-white/90 transition-colors text-sm"
					>
						Sign In
					</button>
				)}
			</div>
		</header>
	);
}
