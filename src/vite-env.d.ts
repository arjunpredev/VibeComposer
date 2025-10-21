/// <reference types="vite/client" />

declare namespace JSX {
	interface IntrinsicElements {
		"strudel-repl": React.DetailedHTMLProps<
			React.HTMLAttributes<HTMLElement>,
			HTMLElement
		>;
	}
}
