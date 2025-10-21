import { useStore } from "~/store/useStore";

export function ApiKeyButton() {
	const { apiKey } = useStore();

	function handleClick() {
		window.dispatchEvent(new Event("openApiKeyModal"));
	}

	return (
		<button
			onClick={handleClick}
			className={`px-3 py-1 text-xs rounded transition-colors ${
				apiKey
					? "bg-green-600/20 hover:bg-green-600/30 text-green-400 border border-green-600/50"
					: "bg-white/10 hover:bg-white/20 text-white border border-white/20"
			}`}
		>
			API Key
		</button>
	);
}
