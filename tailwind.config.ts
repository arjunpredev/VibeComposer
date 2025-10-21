import type { Config } from "tailwindcss";

export default {
	content: ["./app/**/*.tsx"],
	theme: {
		extend: {
			fontFamily: {
				mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
			},
			colors: {
				background: "rgb(0 0 0 / <alpha-value>)",
				foreground: "rgb(255 255 255 / <alpha-value>)",
			},
		},
	},
} satisfies Config;
