import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useStore } from "~/store/useStore";
import { useTrackEvent } from "~/hooks/useTrackEvent";
import { AppHeader } from "~/components/app-header";
import { DesktopLayout } from "~/components/desktop-layout";
import { MobileLayout } from "~/components/mobile-layout";
import { MobileTabNavigation } from "~/components/mobile-tab-navigation";
import { Footer } from "~/components/footer";
import { AuthSignInModal } from "~/components/auth-sign-in-modal";
import { MessageLimitExceededModal } from "~/components/message-limit-exceeded-modal";

export default function Index() {
	const { activeTab, setActiveTab, setShowingExamples } = useStore();
	const { isSignedIn, isLoaded } = useAuth();
	const { trackEvent } = useTrackEvent();

	useEffect(() => {
		trackEvent("app: page viewed");
	}, [trackEvent]);

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
			<AuthSignInModal />
			<MessageLimitExceededModal />
		</div>
	);
}
