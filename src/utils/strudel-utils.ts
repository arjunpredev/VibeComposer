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
	const seline = (
		window as unknown as {
			seline?: {
				track?: (name: string, data?: Record<string, unknown>) => void;
			};
		}
	).seline;

	if (seline?.track) {
		try {
			seline.track(eventName, eventData);
		} catch (error) {
			console.debug(`Failed to track event "${eventName}":`, error);
		}
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
