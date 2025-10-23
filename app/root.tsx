import { useEffect } from "react";
import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useSearchParams,
} from "react-router";
import type { LinksFunction, MetaFunction } from "react-router";
import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { useStore } from "~/store/useStore";
import { useTrackEvent } from "~/hooks/useTrackEvent";
import indexCss from "~/styles/index.css?url";

export const meta: MetaFunction = () => {
	return [
		{ charSet: "utf-8" },
		{ name: "Content-Type", content: "text/html; charset=UTF-8" },
		{
			name: "viewport",
			content: "width=device-width, initial-scale=1, maximum-scale=1",
		},
		{ name: "theme-color", content: "#000000" },
		{
			name: "description",
			content:
				"Vibe Composer - Live Coding meets Vibe Coding. Transform your musical ideas into reality with AI-powered composition and music production tools. Code beats, compose melodies, and create stunning music.",
		},
		{
			name: "keywords",
			content:
				"music composition, AI music, music production, sound design, generative music, music tools, creative audio, live coding, algorithmic music, strudel",
		},
		{ title: "Vibe Composer | AI Music Creation" },

		// Open Graph / Facebook
		{
			property: "og:title",
			content: "Vibe Composer | Live Coding Meets Vibe Coding",
		},
		{ property: "og:type", content: "website" },
		{ property: "og:image", content: "https://vibecomposer.studio/vibe.png" },
		{
			property: "og:logo",
			content: "https://vibecomposer.studio/vibe-composer.png",
		},
		{ property: "og:url", content: "https://vibecomposer.studio" },
		{
			property: "og:description",
			content:
				"Live Coding meets Vibe Coding. Create stunning music with Vibe Composer - AI-powered composition, algorithmic production, and intelligent sound design for creative musicians and developers.",
		},
		{ property: "og:site_name", content: "Vibe Composer - AI Music Creation" },

		// Twitter
		{ name: "twitter:card", content: "summary_large_image" },
		{ name: "twitter:site", content: "@vibecomposer" },
		{ name: "twitter:creator", content: "@ArjunRajJain" },
		{
			name: "twitter:title",
			content: "Vibe Composer | AI Music Creation Platform",
		},
		{
			name: "twitter:description",
			content:
				"Code your beats. Compose with AI. Live Coding meets Vibe Coding. Transform musical ideas into reality.",
		},
		{ name: "twitter:image", content: "https://vibecomposer.studio/vibe.png" },
		{
			name: "twitter:image:alt",
			content:
				"Vibe Composer - Where Live Coding meets Vibe Coding. AI-powered music composition and algorithmic production platform",
		},
	];
};

export const links: LinksFunction = () => [
	{ rel: "stylesheet", href: indexCss },
	{ rel: "icon", type: "image/png", href: "/vibe-composer.png" },
	{ rel: "apple-touch-icon", href: "/vibe-composer.png" },
	{
		rel: "icon",
		href: "/vibe-composer.png",
		sizes: "192x192",
		type: "image/png",
	},
	{
		rel: "icon",
		href: "/vibe-composer.png",
		sizes: "512x512",
		type: "image/png",
	},
];

function RootContent() {
	const { loadChats, setActiveChat } = useStore();
	const { userId, isSignedIn, isLoaded } = useAuth();
	const [searchParams] = useSearchParams();
	const { trackEvent } = useTrackEvent();

	useEffect(() => {
		if (isLoaded && isSignedIn && userId) {
			loadChats(userId);
			(window as any).__clerkUserId = userId;
			trackEvent("user: signed in");
		}
	}, [isLoaded, isSignedIn, userId]);

	// Load chat from URL param if present
	useEffect(() => {
		const chatId = searchParams.get("chatId");
		if (chatId) {
			setActiveChat(chatId);
		}
	}, [searchParams]);

	useEffect(() => {
		// Load Strudel embed script locally
		const script = document.createElement("script");
		script.src = "/strudel-embed.js";
		script.async = true;
		document.body.appendChild(script);

		return () => {
			if (document.body.contains(script)) {
				document.body.removeChild(script);
			}
		};
	}, []);

	return <Outlet />;
}

function Root() {
	const publishableKey = (import.meta as any).env.CLERK_PUBLISHABLE_KEY;

	if (!publishableKey) {
		throw new Error(
			"Missing Clerk Publishable Key. Please set CLERK_PUBLISHABLE_KEY environment variable."
		);
	}

	return (
		<ClerkProvider publishableKey={publishableKey}>
			<html lang="en">
				<head>
					<meta charSet="utf-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<Meta />
					<Links />
				</head>
				<body>
					<RootContent />
					<ScrollRestoration />
					<Scripts />
				</body>
			</html>
		</ClerkProvider>
	);
}

export default Root;
