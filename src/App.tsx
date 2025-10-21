import { useEffect } from "react";
import { useStore } from "./store/useStore";
import { ApiKeyInput } from "./components/ApiKeyInput";
import { StrudelRepl } from "./components/StrudelRepl";
import { Chat } from "./components/Chat";

function App() {
	const { loadFromLocalStorage } = useStore();

	useEffect(() => {
		loadFromLocalStorage();
	}, [loadFromLocalStorage]);

	return (
		<div className="h-screen w-screen flex flex-col bg-black text-white font-mono overflow-hidden">
			<header className="border-b border-white/20 p-4">
				<h1 className="text-xl font-bold">VIBE COMPOSER</h1>
				<p className="text-sm text-white/50">Strudel × Claude Haiku 4.5</p>
			</header>

			<ApiKeyInput />

			<div className="flex-1 flex overflow-hidden min-h-0">
				<div className="w-1/2 border-r border-white/20 flex flex-col min-h-0">
					<div className="border-b border-white/20 p-2 text-sm text-white/70">
						STRUDEL REPL
					</div>
					<div className="flex-1 min-h-0">
						<StrudelRepl />
					</div>
				</div>

				<div className="w-1/2 flex flex-col min-h-0">
					<div className="border-b border-white/20 p-2 text-sm text-white/70">
						AI CHAT
					</div>
					<div className="flex-1 min-h-0">
						<Chat />
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
