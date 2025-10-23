import { SignIn, SignUp } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";
import { useAuth } from "@clerk/clerk-react";
import { useStore } from "~/store/useStore";

export function AuthSignInModal() {
	const { isSignedIn, isLoaded } = useAuth();
	const { showAuthPrompt, setShowAuthPrompt } = useStore();

	const isSignInMode =
		typeof window !== "undefined" &&
		new URLSearchParams(window.location.search).get("signin") === "true";

	const hasSSOCallback =
		typeof window !== "undefined" && window.location.hash.includes("#/sso-callback");

	if (isSignedIn || (!showAuthPrompt && !hasSSOCallback)) {
		return null;
	}

	const appearanceConfig = {
		baseTheme: dark,
		variables: {
			colorPrimary: "#ffffff",
			colorBackground: "#1a1a1a",
			colorInputBackground: "#262626",
			colorInputText: "#ffffff",
			colorText: "#ffffff",
			colorTextSecondary: "#a1a1a1",
			colorDanger: "#ff4444",
			colorSuccess: "#44ff44",
			colorWarning: "#ffaa00",
			colorBorder: "#404040",
		},
	};

	return (
		<div
			className="fixed inset-0 flex items-center justify-center bg-black/95 z-50 p-4"
			onClick={() => !hasSSOCallback && setShowAuthPrompt(false)}
		>
			<div onClick={(e) => e.stopPropagation()}>
				{isLoaded ? (
					isSignInMode ? (
						<SignIn
							appearance={appearanceConfig}
							signUpUrl="/?signin=false"
							redirectUrl="/"
						/>
					) : (
						<SignUp
							appearance={appearanceConfig}
							signInUrl="/?signin=true"
							redirectUrl="/"
						/>
					)
				) : null}
			</div>
		</div>
	);
}
