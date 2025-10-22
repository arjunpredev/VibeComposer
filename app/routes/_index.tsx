import { useEffect } from "react";
import { useStore } from "~/store/useStore";
import { AppHeader } from "~/components/app-header";
import { DesktopLayout } from "~/components/desktop-layout";
import { MobileLayout } from "~/components/mobile-layout";
import { MobileTabNavigation } from "~/components/mobile-tab-navigation";
import { Footer } from "~/components/footer";
import { ApiKeyModal } from "~/components/api-key-modal";

export default function Index() {
	const { loadFromLocalStorage, activeTab, setActiveTab, setShowingExamples } =
		useStore();

	useEffect(() => {
		loadFromLocalStorage();
	}, []);

	const handleHeaderClick = () => {
		setShowingExamples(true);
	};

	return (
		<div className="h-dvh w-screen flex flex-col bg-black text-white font-mono overflow-hidden">
			<div className="flex-1 min-h-0 flex flex-col overflow-hidden">
				<AppHeader onHeaderClick={handleHeaderClick} />
				<DesktopLayout />
				<MobileLayout activeTab={activeTab} onTabChange={setActiveTab} />
			</div>

			<div className="md:hidden flex-shrink-0">
				<MobileTabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
			</div>
			<div className="flex-shrink-0">
				<Footer />
			</div>
			<ApiKeyModal />
		</div>
	);
}
