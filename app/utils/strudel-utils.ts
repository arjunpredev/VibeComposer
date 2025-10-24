import * as seline from "@seline-analytics/web";

export function initSeline(token: string): void {
	if (!token) {
		console.warn("[Seline] Token not provided, analytics disabled");
		return;
	}
	try {
		seline.init({
			token,
			autoPageView: true,
			cookie: true,
		});
		console.log("[Seline] Analytics initialized successfully");
	} catch (error) {
		console.error("[Seline] Failed to initialize:", error);
	}
}

export function setSelineUser(userData: {
	userId: string;
	email?: string;
	name?: string;
	[key: string]: unknown;
}): void {
	try {
		const { userId, ...restData } = userData;
		seline.setUser({
			userId,
			...restData,
		});
		console.log("[Seline] User identified:", userId);
	} catch (error) {
		console.error("[Seline] Failed to set user:", error);
	}
}

export function cleanStrudelCode(code: string): string {
	let cleanCode = code.trim();
	if (cleanCode.startsWith("```")) {
		cleanCode = cleanCode.replace(/^```[\w]*\n/, "").replace(/\n```$/, "");
	}
	return cleanCode;
}

export function trackEvent(
	eventName: string,
	eventData?: Record<string, unknown>
): void {
	try {
		seline.track(eventName, eventData);
		console.log(`[Seline] Tracked event: "${eventName}"`, eventData);
	} catch (error) {
		console.error(`[Seline] Failed to track event "${eventName}":`, error);
	}
}

export function loadExternalScript(
	scriptUrl: string,
	options?: { token?: string; id?: string }
): Promise<void> {
	return new Promise((resolve, reject) => {
		const script = document.createElement("script");
		script.src = scriptUrl;
		script.async = true;
		script.onload = () => resolve();
		script.onerror = () =>
			reject(new Error(`Failed to load script: ${scriptUrl}`));

		if (options?.token) {
			script.setAttribute("data-token", options.token);
		}

		if (options?.id) {
			script.id = options.id;
		}

		document.head.appendChild(script);
	});
}
