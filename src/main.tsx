import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { loadExternalScript } from "./utils/strudel-utils";

async function initializeApp() {
	const selineUrl = import.meta.env.VITE_SELINE_URL;
	const selineToken = import.meta.env.VITE_SELINE_TOKEN;

	if (selineUrl && selineToken) {
		try {
			await loadExternalScript(selineUrl, { token: selineToken });
		} catch (error) {
			console.warn("Failed to load Seline script:", error);
		}
	}

	createRoot(document.getElementById("root")!).render(
		<StrictMode>
			<App />
		</StrictMode>
	);
}

initializeApp();
