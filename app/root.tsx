import { useEffect } from "react";
import { Outlet } from "react-router";
import { useStore } from "~/store/useStore";
import "~/styles/index.css";

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
		<>
			<Outlet />
		</>
	);
}

export default Root;
