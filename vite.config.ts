import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	plugins: [tsconfigPaths(), reactRouter()],
	define: {
		"import.meta.env.CLERK_PUBLISHABLE_KEY": JSON.stringify(
			process.env.CLERK_PUBLISHABLE_KEY
		),
		"import.meta.env.SELINE_TOKEN": JSON.stringify(process.env.SELINE_TOKEN),
	},
	server: {
		host: "0.0.0.0",
		port: parseInt(process.env.PORT || "5173"),
		middlewareMode: false,
		allowedHosts: ["vibecomposer.onrender.com", "vibecomposer.studio"],
	},
	preview: {
		host: "0.0.0.0",
		port: parseInt(process.env.PORT || "4173"),
		allowedHosts: ["vibecomposer.onrender.com", "vibecomposer.studio"],
	},
});
