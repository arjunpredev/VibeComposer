import { useAuth, useUser } from "@clerk/clerk-react";
import { trackEvent as baseTrackEvent } from "~/utils/strudel-utils";

export function useTrackEvent() {
	const { userId, isSignedIn } = useAuth();
	const { user } = useUser();

	const trackEvent = (
		eventName: string,
		eventData?: Record<string, unknown>
	) => {
		const enrichedData: Record<string, unknown> = {
			...eventData,
			userId,
			userEmail: user?.emailAddresses?.[0]?.emailAddress,
			userName: user?.fullName || user?.username,
			isSignedIn,
			timestamp: new Date().toISOString(),
		};

		baseTrackEvent(eventName, enrichedData);
	};

	return { trackEvent };
}
