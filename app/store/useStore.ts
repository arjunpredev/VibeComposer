import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { trackEvent } from "~/utils/strudel-utils";

interface Message {
	role: "user" | "assistant";
	content: string;
	timestamp: number;
	inputTokens?: number;
	outputTokens?: number;
}

interface Chat {
	_id?: string;
	id?: string;
	userId?: string;
	name: string;
	messages: Message[];
	createdAt: number;
	updatedAt: number;
}

interface AppState {
	chats: Chat[];
	activeChatId: string | null;
	currentStrudelCode: string;
	activeTab: "repl" | "chat";
	chatInput: string;
	isStreaming: boolean;
	streamingContent: string;
	showingExamples: boolean;
	currentExampleIndex: number;
	isSignInModalOpen: boolean;
	isAuthLoading: boolean;
	totalMessages: number;
	messageLimit: number;
	createChat: (name?: string) => Promise<void>;
	deleteChat: (chatId: string) => Promise<void>;
	renameChat: (chatId: string, newName: string) => Promise<void>;
	setActiveChat: (chatId: string) => void;
	addMessage: (message: Message) => void;
	removeLastMessage: () => void;
	clearCurrentChat: () => void;
	updateStrudelCode: (code: string) => void;
	setActiveTab: (tab: "repl" | "chat") => void;
	setChatInput: (input: string) => void;
	setIsStreaming: (isStreaming: boolean) => void;
	setStreamingContent: (content: string) => void;
	setShowingExamples: (showing: boolean) => void;
	setCurrentExampleIndex: (index: number) => void;
	setSignInModalOpen: (isOpen: boolean) => void;
	setAuthLoading: (isLoading: boolean) => void;
	loadChats: (userId: string) => Promise<void>;
	getCurrentChatMessages: () => Message[];
	getMessageStats: () => {
		totalMessages: number;
		messageLimit: number;
		remainingMessages: number;
	};
	messageLimitExceededModalOpen: boolean;
	setMessageLimitExceededModalOpen: (isOpen: boolean) => void;
	showAuthPrompt: boolean;
	setShowAuthPrompt: (isOpen: boolean) => void;
}

const STORAGE_KEY_CODE = "vibe-composer-strudel-code";

const DEFAULT_STRUDEL_CODE = `// dante sine squared - Originally Vibe Composed by @ArjunRajJain

setcps(0.5)
stack(
  
  s("hh*4").gain(sine.range(.2,.4))
  .delay(.2).delaytime(.16).delayfeedback(.3),
  
  s("cp(3,8,[0.5 0.7])").gain(.5).room(.4)
  .sometimes(fast(2)),
  
  note("a2 [~ d2] g2 [~ e2]")
  .s("sine")
  .gain(.6)
  .cutoff(300)
  .shape(.1)
  .attack(.1),
  
  note("a4,c5 [~ d5,f5] g4,b4 [~ e5,g5]")
  .s("square")
  .lpf(400)
  .attack(.2)
  .sustain(.1)
  .gain(.15)
  .room(.8)
  .slow(8)
  .echo(4,.16,.4),
)`;

export const useStore = create<AppState>((set, get) => ({
	chats: [],
	activeChatId: null,
	currentStrudelCode: DEFAULT_STRUDEL_CODE,
	activeTab: "repl",
	chatInput: "",
	isStreaming: false,
	streamingContent: "",
	showingExamples: false,
	currentExampleIndex: 0,
	isSignInModalOpen: false,
	isAuthLoading: false,
	totalMessages: 0,
	messageLimit: 10,
	messageLimitExceededModalOpen: false,
	showAuthPrompt: false,

	createChat: async (name?: string) => {
		try {
			const userId = (window as any).__clerkUserId;
			const response = await fetch("/api/chats", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					userId,
					name: name || `Chat ${new Date().toLocaleDateString()}`,
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to create chat");
			}

			const { chat } = await response.json();
			set((state) => ({
				chats: [...state.chats, chat],
				activeChatId: chat._id,
			}));
			trackEvent("chat_created", { chatId: chat._id, chatName: chat.name });
		} catch (error) {
			console.error("Error creating chat:", error);
			trackEvent("chat_creation_failed", { error: String(error) });
			throw error;
		}
	},

	deleteChat: async (chatId: string) => {
		try {
			const userId = (window as any).__clerkUserId;
			const response = await fetch("/api/chats", {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ chatId, userId }),
			});

			if (!response.ok) {
				throw new Error("Failed to delete chat");
			}

			set((state) => ({
				chats: state.chats.filter((c) => c._id !== chatId),
				activeChatId:
					state.activeChatId === chatId
						? state.chats.length > 0
							? state.chats[0]._id || null
							: null
						: state.activeChatId,
			}));
			trackEvent("chat_deleted", { chatId });
		} catch (error) {
			console.error("Error deleting chat:", error);
			trackEvent("chat_deletion_failed", { error: String(error) });
			throw error;
		}
	},

	renameChat: async (chatId: string, newName: string) => {
		if (!newName.trim()) return;
		try {
			const userId = (window as any).__clerkUserId;
			const response = await fetch("/api/chats", {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ chatId, newName, userId }),
			});

			if (!response.ok) {
				throw new Error("Failed to rename chat");
			}

			const { chat } = await response.json();

			set((state) => ({
				chats: state.chats.map((c) =>
					c._id === chatId
						? { ...c, name: chat.name, updatedAt: chat.updatedAt }
						: c
				),
			}));
			trackEvent("chat_renamed", { chatId, newName });
		} catch (error) {
			console.error("Error renaming chat:", error);
			trackEvent("chat_rename_failed", { error: String(error) });
			throw error;
		}
	},

	setActiveChat: (chatId: string) => {
		trackEvent("chat_selected", { chatId });
		const state = get();
		if (state.chats.find((c) => c._id === chatId)) {
			set({ activeChatId: chatId });
		}
	},

	addMessage: (message: Message) => {
		set((state) => {
			if (!state.activeChatId) return state;
			return {
				chats: state.chats.map((chat) =>
					chat._id === state.activeChatId
						? {
								...chat,
								messages: [...chat.messages, message],
								updatedAt: Date.now(),
							}
						: chat
				),
				totalMessages:
					message.role === "user"
						? state.totalMessages + 1
						: state.totalMessages,
			};
		});
	},

	removeLastMessage: () => {
		set((state) => {
			if (!state.activeChatId) return state;
			const chat = state.chats.find((c) => c._id === state.activeChatId);
			const lastMessage = chat?.messages[chat.messages.length - 1];
			const isUserMessage = lastMessage?.role === "user";

			return {
				chats: state.chats.map((c) =>
					c._id === state.activeChatId
						? {
								...c,
								messages: c.messages.slice(0, -1),
								updatedAt: Date.now(),
							}
						: c
				),
				totalMessages: isUserMessage
					? state.totalMessages - 1
					: state.totalMessages,
			};
		});
	},

	clearCurrentChat: () => {
		set((state) => {
			if (!state.activeChatId) return state;
			return {
				chats: state.chats.map((chat) =>
					chat._id === state.activeChatId
						? { ...chat, messages: [], updatedAt: Date.now() }
						: chat
				),
			};
		});
	},

	getCurrentChatMessages: () => {
		const state = get();
		if (!state.activeChatId) return [];
		const activeChat = state.chats.find((c) => c._id === state.activeChatId);
		return activeChat?.messages || [];
	},

	getMessageStats: () => {
		const state = get();
		return {
			totalMessages: state.totalMessages,
			messageLimit: state.messageLimit,
			remainingMessages: Math.max(0, state.messageLimit - state.totalMessages),
		};
	},

	updateStrudelCode: (code: string) => {
		localStorage.setItem(STORAGE_KEY_CODE, code);
		set({ currentStrudelCode: code });
		trackEvent("strudel_code_updated", { codeLength: code.length });
	},

	setActiveTab: (tab: "repl" | "chat") => {
		trackEvent("tab_switched", { tab });
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
		trackEvent("examples_toggled", { showing });
		set({ showingExamples: showing });
	},

	setCurrentExampleIndex: (index: number) => {
		set({ currentExampleIndex: index });
	},

	setSignInModalOpen: (isOpen: boolean) => {
		set({ isSignInModalOpen: isOpen });
	},

	setAuthLoading: (isLoading: boolean) => {
		set({ isAuthLoading: isLoading });
	},

	loadChats: async (userId: string) => {
		try {
			const response = await fetch(
				`/api/chats?userId=${userId}&page=1&pageSize=10`
			);
			if (!response.ok) throw new Error("Failed to load chats");

			const { chats, totalMessages } = await response.json();
			const latestChat = chats.length > 0 ? chats[0] : null;

			set({
				chats,
				activeChatId: latestChat?._id || null,
				totalMessages,
			});
		} catch (error) {
			console.error("Error loading chats:", error);
		}
	},

	setMessageLimitExceededModalOpen: (isOpen: boolean) => {
		set({ messageLimitExceededModalOpen: isOpen });
	},

	setShowAuthPrompt: (isOpen: boolean) => {
		set({ showAuthPrompt: isOpen });
	},
}));
