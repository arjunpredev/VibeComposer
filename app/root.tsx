import { useEffect } from "react";
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import type { LinksFunction } from "react-router";
import { useStore } from "~/store/useStore";
import indexCss from "~/styles/index.css?url";

export const links: LinksFunction = () => [
	{ rel: "stylesheet", href: indexCss },
];

function Root() {
	const { loadFromLocalStorage } = useStore();

	useEffect(() => {
		loadFromLocalStorage();
	}, [loadFromLocalStorage]);

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

	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				<Outlet />
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default Root;
