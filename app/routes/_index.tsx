import { useEffect } from "react";
import { useStore } from "~/store/useStore";
import { AppHeader } from "~/components/app-header";
import { DesktopLayout } from "~/components/desktop-layout";
import { MobileLayout } from "~/components/mobile-layout";
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
		<div className="h-screen w-screen flex flex-col bg-black text-white font-mono overflow-hidden">
			<AppHeader onHeaderClick={handleHeaderClick} />
			<DesktopLayout />
			<MobileLayout activeTab={activeTab} onTabChange={setActiveTab} />
			<Footer />
			<ApiKeyModal />
		</div>
	);
}
