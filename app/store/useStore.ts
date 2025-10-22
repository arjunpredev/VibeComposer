import { create } from "zustand";

interface Message {
	role: "user" | "assistant";
	content: string;
	timestamp: number;
	inputTokens?: number;
	outputTokens?: number;
}

interface AppState {
	apiKey: string | null;
	messages: Message[];
	currentStrudelCode: string;
	activeTab: "repl" | "chat";
	chatInput: string;
	isStreaming: boolean;
	streamingContent: string;
	showingExamples: boolean;
	currentExampleIndex: number;
	setApiKey: (key: string) => void;
	clearApiKey: () => void;
	addMessage: (message: Message) => void;
	clearMessages: () => void;
	updateStrudelCode: (code: string) => void;
	setActiveTab: (tab: "repl" | "chat") => void;
	setChatInput: (input: string) => void;
	setIsStreaming: (isStreaming: boolean) => void;
	setStreamingContent: (content: string) => void;
	setShowingExamples: (showing: boolean) => void;
	setCurrentExampleIndex: (index: number) => void;
	loadFromLocalStorage: () => void;
}

const STORAGE_KEY_API = "vibe-composer-api-key";
const STORAGE_KEY_MESSAGES = "vibe-composer-messages";
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

export const useStore = create<AppState>((set) => ({
	apiKey: null,
	messages: [],
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
		const messagesStr = localStorage.getItem(STORAGE_KEY_MESSAGES);
		const code = localStorage.getItem(STORAGE_KEY_CODE);

		set({
			apiKey: apiKey || null,
			messages: messagesStr ? JSON.parse(messagesStr) : [],
			currentStrudelCode: code || DEFAULT_STRUDEL_CODE,
		});
	},
}));
