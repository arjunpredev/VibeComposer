import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	plugins: [tsconfigPaths(), reactRouter()],
	preview: {
		host: "0.0.0.0",
		port: parseInt(process.env.PORT || "4173"),
		allowedHosts: ["vibecomposer.onrender.com", "vibecomposer.studio"],
	},
});
