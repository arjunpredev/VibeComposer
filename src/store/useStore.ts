import { create } from "zustand";

interface Message {
	role: "user" | "assistant";
	content: string;
	timestamp: number;
}

interface AppState {
	apiKey: string | null;
	messages: Message[];
	currentStrudelCode: string;
	setApiKey: (key: string) => void;
	clearApiKey: () => void;
	addMessage: (message: Message) => void;
	clearMessages: () => void;
	updateStrudelCode: (code: string) => void;
	loadFromLocalStorage: () => void;
}

const STORAGE_KEY_API = "vibe-composer-api-key";
const STORAGE_KEY_MESSAGES = "vibe-composer-messages";
const STORAGE_KEY_CODE = "vibe-composer-strudel-code";

const DEFAULT_STRUDEL_CODE = `setcps(1)
n("<0 1 2 3 4>*8").scale('G4 minor')
.s("gm_lead_6_voice")
.clip(sine.range(.2,.8).slow(8))`;

export const useStore = create<AppState>((set) => ({
	apiKey: null,
	messages: [],
	currentStrudelCode: DEFAULT_STRUDEL_CODE,

	setApiKey: (key: string) => {
		localStorage.setItem(STORAGE_KEY_API, key);
		set({ apiKey: key });
	},

	clearApiKey: () => {
		localStorage.removeItem(STORAGE_KEY_API);
		set({ apiKey: null });
	},

	addMessage: (message: Message) => {
		set((state) => {
			const newMessages = [...state.messages, message];
			localStorage.setItem(STORAGE_KEY_MESSAGES, JSON.stringify(newMessages));
			return { messages: newMessages };
		});
	},

	clearMessages: () => {
		localStorage.removeItem(STORAGE_KEY_MESSAGES);
		set({ messages: [] });
	},

	updateStrudelCode: (code: string) => {
		localStorage.setItem(STORAGE_KEY_CODE, code);
		set({ currentStrudelCode: code });
	},

	loadFromLocalStorage: () => {
		const apiKey = localStorage.getItem(STORAGE_KEY_API);
		const messagesStr = localStorage.getItem(STORAGE_KEY_MESSAGES);
		const code = localStorage.getItem(STORAGE_KEY_CODE);

		set({
			apiKey: apiKey || null,
			messages: messagesStr ? JSON.parse(messagesStr) : [],
			currentStrudelCode: code || DEFAULT_STRUDEL_CODE,
		});
	},
}));
