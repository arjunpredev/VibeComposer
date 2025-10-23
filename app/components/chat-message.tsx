import { useStore } from "~/store/useStore";
import { useTrackEvent } from "~/hooks/useTrackEvent";
import { cleanStrudelCode } from "~/utils/strudel-utils";

interface ChatMessageProps {
	timestamp: number;
}

export function ChatMessage({ timestamp }: ChatMessageProps) {
	const {
		getCurrentChatMessages,
		currentStrudelCode,
		updateStrudelCode,
		setActiveTab,
	} = useStore();
	const { trackEvent } = useTrackEvent();

	const messages = getCurrentChatMessages();
	const message = messages.find((m) => m.timestamp === timestamp);
	if (!message) return null;

	const { role, content } = message;
	const isUser = role === "user";
	const cleanedContent = cleanStrudelCode(content);
	const isApplied = cleanedContent === currentStrudelCode;

	function handleApplyCode() {
		trackEvent("code: apply clicked", { isAlreadyApplied: isApplied });
		updateStrudelCode(cleanedContent);
		setActiveTab("repl");
	}

	return (
		<div
			className={`flex flex-col gap-2 ${isUser ? "items-end" : "items-start"}`}
		>
			<div
				className={`max-w-[80%] p-3 ${
					isUser
						? "bg-white text-black"
						: "bg-white/10 text-white border border-white/20"
				}`}
			>
				<pre className="whitespace-pre-wrap font-mono text-sm overflow-auto">
					{content}
				</pre>
			</div>
			{!isUser && (
				<button
					onClick={handleApplyCode}
					disabled={isApplied}
					className={`px-3 py-1 text-white text-sm transition-colors ${
						isApplied
							? "bg-gray-600 cursor-not-allowed opacity-50"
							: "bg-green-600 hover:bg-green-700"
					}`}
				>
					{isApplied ? "Applied" : "Apply"}
				</button>
			)}
		</div>
	);
}
