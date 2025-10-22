import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

interface Message {
	role: "user" | "assistant";
	content: string;
	timestamp: number;
	inputTokens?: number;
	outputTokens?: number;
}

interface Chat {
	id: string;
	name: string;
	messages: Message[];
	createdAt: number;
	updatedAt: number;
}

interface AppState {
	apiKey: string | null;
	chats: Chat[];
	activeChatId: string | null;
	currentStrudelCode: string;
	activeTab: "repl" | "chat";
	chatInput: string;
	isStreaming: boolean;
	streamingContent: string;
	showingExamples: boolean;
	currentExampleIndex: number;
	setApiKey: (key: string) => void;
	clearApiKey: () => void;
	createChat: (name?: string) => void;
	deleteChat: (chatId: string) => void;
	renameChat: (chatId: string, newName: string) => void;
	setActiveChat: (chatId: string) => void;
	addMessage: (message: Message) => void;
	clearCurrentChat: () => void;
	updateStrudelCode: (code: string) => void;
	setActiveTab: (tab: "repl" | "chat") => void;
	setChatInput: (input: string) => void;
	setIsStreaming: (isStreaming: boolean) => void;
	setStreamingContent: (content: string) => void;
	setShowingExamples: (showing: boolean) => void;
	setCurrentExampleIndex: (index: number) => void;
	loadFromLocalStorage: () => void;
	getCurrentChatMessages: () => Message[];
}

const STORAGE_KEY_CHATS = "vibe-composer-chats";
const STORAGE_KEY_ACTIVE_CHAT = "vibe-composer-active-chat";
const STORAGE_KEY_API = "vibe-composer-api-key";
const STORAGE_KEY_CODE = "vibe-composer-strudel-code";

const DEFAULT_STRUDEL_CODE = `// "coastline" @by eddyflux
// @version 1.0
samples('github:eddyflux/crate')
setcps(.75)
let chords = chord("<Bbm9 Fm9>/4").dict('ireal')
stack(
  stack( // DRUMS
    s("bd").struct("<[x*<1 2> [~@3 x]] x>"),
    s("~ [rim, sd:<2 3>]").room("<0 .2>"),
    n("[0 <1 3>]*<2!3 4>").s("hh"),
    s("rd:<1!3 2>*2").mask("<0 0 1 1>/16").gain(.5)
  ).bank('crate')
  .mask("<[0 1] 1 1 1>/16".early(.5))
  , // CHORDS
  chords.offset(-1).voicing().s("gm_epiano1:1")
  .phaser(4).room(.5)
  , // MELODY
  n("<0!3 1*2>").set(chords).mode("root:g2")
  .voicing().s("gm_acoustic_bass"),
  chords.n("[0 <4 3 <2 5>>*2](<3 5>,8)")
  .anchor("D5").voicing()
  .segment(4).clip(rand.range(.4,.8))
  .room(.75).shape(.3).delay(.25)
  .fm(sine.range(3,8).slow(8))
  .lpf(sine.range(500,1000).slow(8)).lpq(5)
  .rarely(ply("2")).chunk(4, fast(2))
  .gain(perlin.range(.6, .9))
  .mask("<0 1 1 0>/16")
)
.late("[0 .01]*4").late("[0 .01]*2").size(4)`;

function createNewChat(name?: string): Chat {
	const now = Date.now();
	return {
		id: uuidv4(),
		name: name || `Chat ${new Date().toLocaleDateString()}`,
		messages: [],
		createdAt: now,
		updatedAt: now,
	};
}

export const useStore = create<AppState>((set, get) => ({
	apiKey: null,
	chats: [],
	activeChatId: null,
	currentStrudelCode: DEFAULT_STRUDEL_CODE,
	activeTab: "repl",
	chatInput: "",
	isStreaming: false,
	streamingContent: "",
	showingExamples: false,
	currentExampleIndex: 0,

	setApiKey: (key: string) => {
		localStorage.setItem(STORAGE_KEY_API, key);
		set({ apiKey: key });
	},

	clearApiKey: () => {
		localStorage.removeItem(STORAGE_KEY_API);
		set({ apiKey: null });
	},

	createChat: (name?: string) => {
		const newChat = createNewChat(name);
		set((state) => {
			const updatedChats = [...state.chats, newChat];
			localStorage.setItem(STORAGE_KEY_CHATS, JSON.stringify(updatedChats));
			return { chats: updatedChats, activeChatId: newChat.id };
		});
		localStorage.setItem(STORAGE_KEY_ACTIVE_CHAT, newChat.id);
	},

	deleteChat: (chatId: string) => {
		set((state) => {
			const updatedChats = state.chats.filter((chat) => chat.id !== chatId);
			localStorage.setItem(STORAGE_KEY_CHATS, JSON.stringify(updatedChats));

			let newActiveChatId = state.activeChatId;
			if (state.activeChatId === chatId) {
				newActiveChatId = updatedChats.length > 0 ? updatedChats[0].id : null;
				if (newActiveChatId) {
					localStorage.setItem(STORAGE_KEY_ACTIVE_CHAT, newActiveChatId);
				} else {
					localStorage.removeItem(STORAGE_KEY_ACTIVE_CHAT);
				}
			}

			return { chats: updatedChats, activeChatId: newActiveChatId };
		});
	},

	renameChat: (chatId: string, newName: string) => {
		if (!newName.trim()) return;
		set((state) => {
			const updatedChats = state.chats.map((chat) =>
				chat.id === chatId
					? { ...chat, name: newName.trim(), updatedAt: Date.now() }
					: chat
			);
			localStorage.setItem(STORAGE_KEY_CHATS, JSON.stringify(updatedChats));
			return { chats: updatedChats };
		});
	},

	setActiveChat: (chatId: string) => {
		const state = get();
		if (state.chats.find((chat) => chat.id === chatId)) {
			localStorage.setItem(STORAGE_KEY_ACTIVE_CHAT, chatId);
			set({ activeChatId: chatId });
		}
	},

	addMessage: (message: Message) => {
		set((state) => {
			if (!state.activeChatId) return state;

			const updatedChats = state.chats.map((chat) =>
				chat.id === state.activeChatId
					? {
							...chat,
							messages: [...chat.messages, message],
							updatedAt: Date.now(),
						}
					: chat
			);
			localStorage.setItem(STORAGE_KEY_CHATS, JSON.stringify(updatedChats));
			return { chats: updatedChats };
		});
	},

	clearCurrentChat: () => {
		set((state) => {
			if (!state.activeChatId) return state;

			const updatedChats = state.chats.map((chat) =>
				chat.id === state.activeChatId
					? { ...chat, messages: [], updatedAt: Date.now() }
					: chat
			);
			localStorage.setItem(STORAGE_KEY_CHATS, JSON.stringify(updatedChats));
			return { chats: updatedChats };
		});
	},

	getCurrentChatMessages: () => {
		const state = get();
		if (!state.activeChatId) return [];
		const activeChat = state.chats.find(
			(chat) => chat.id === state.activeChatId
		);
		return activeChat?.messages || [];
	},

	updateStrudelCode: (code: string) => {
		localStorage.setItem(STORAGE_KEY_CODE, code);
		set({ currentStrudelCode: code });
	},

	setActiveTab: (tab: "repl" | "chat") => {
		set({ activeTab: tab });
	},

	setChatInput: (input: string) => {
		set({ chatInput: input });
	},

	setIsStreaming: (isStreaming: boolean) => {
		set({ isStreaming });
	},

	setStreamingContent: (content: string) => {
		set({ streamingContent: content });
	},

	setShowingExamples: (showing: boolean) => {
		set({ showingExamples: showing });
	},

	setCurrentExampleIndex: (index: number) => {
		set({ currentExampleIndex: index });
	},

	loadFromLocalStorage: () => {
		const apiKey = localStorage.getItem(STORAGE_KEY_API);
		const chatsStr = localStorage.getItem(STORAGE_KEY_CHATS);
		const activeChatId = localStorage.getItem(STORAGE_KEY_ACTIVE_CHAT);
		const code = localStorage.getItem(STORAGE_KEY_CODE);

		let chats: Chat[] = [];
		let finalActiveChatId: string | null = null;

		if (chatsStr) {
			try {
				chats = JSON.parse(chatsStr);
			} catch {
				chats = [];
			}
		}

		if (chats.length === 0) {
			const newChat = createNewChat();
			chats = [newChat];
			finalActiveChatId = newChat.id;
		} else if (activeChatId && chats.find((c) => c.id === activeChatId)) {
			finalActiveChatId = activeChatId;
		} else if (chats.length > 0) {
			finalActiveChatId = chats[0].id;
		}

		set({
			apiKey: apiKey || null,
			chats,
			activeChatId: finalActiveChatId,
			currentStrudelCode: code || DEFAULT_STRUDEL_CODE,
		});

		if (finalActiveChatId) {
			localStorage.setItem(STORAGE_KEY_ACTIVE_CHAT, finalActiveChatId);
		}
		localStorage.setItem(STORAGE_KEY_CHATS, JSON.stringify(chats));
	},
}));
