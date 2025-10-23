import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useStore } from "~/store/useStore";

interface MessageLimitExceededModalProps {
	emailAddress?: string;
}

export function MessageLimitExceededModal({
	emailAddress = "arjun@vibecomposer.studio",
}: MessageLimitExceededModalProps) {
	const { messageLimitExceededModalOpen, setMessageLimitExceededModalOpen } =
		useStore();
	const { user } = useUser();
	const [copied, setCopied] = useState(false);

	if (!messageLimitExceededModalOpen) return null;

	const userInfo = user?.emailAddresses?.[0]?.emailAddress
		? `\n\nMy email is ${user.emailAddresses[0].emailAddress}`
		: "";

	const mailtoLink = `mailto:${emailAddress}?subject=Request%20for%20More%20Message%20Access&body=Hi%20Arjun%2C%0A%0AI%27ve%20reached%20my%20message%20limit%20and%20would%20like%20to%20request%20access%20to%20send%20more%20messages.${encodeURIComponent(userInfo)}%0A%0AThank%20you!`;

	function handleCopyEmail() {
		navigator.clipboard.writeText(emailAddress);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	}

	return (
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
			<div className="bg-black border border-white/20 rounded-lg p-6 max-w-md mx-4 shadow-lg">
				<div className="flex items-center gap-3 mb-4">
					<div className="text-2xl">⚠️</div>
					<h2 className="text-lg font-semibold text-white">
						Message Limit Reached
					</h2>
				</div>

				<p className="text-white/80 mb-6">
					You've reached your message limit for this session. To get more
					access, please contact:
				</p>

				<div className="flex items-center gap-2 mb-6 bg-white/5 border border-white/20 rounded p-3">
					<span className="text-sm text-white flex-1 break-all">
						{emailAddress}
					</span>
					<button
						onClick={handleCopyEmail}
						className="flex-shrink-0 px-2 py-1 bg-white/10 hover:bg-white/20 text-white text-xs font-medium rounded transition-colors"
						title="Copy email"
					>
						{copied ? (
							<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
								<path
									fillRule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clipRule="evenodd"
								/>
							</svg>
						) : (
							<svg
								className="w-4 h-4"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
								/>
							</svg>
						)}
					</button>
				</div>

				<div className="space-y-3">
					<a
						href={mailtoLink}
						className="w-full inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded transition-colors"
					>
						📧 Email Support
					</a>

					<button
						onClick={() => setMessageLimitExceededModalOpen(false)}
						className="w-full px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-medium rounded transition-colors"
					>
						Close
					</button>
				</div>
			</div>
		</div>
	);
}
