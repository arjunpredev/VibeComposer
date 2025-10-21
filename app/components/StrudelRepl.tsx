import { useEffect, useRef } from "react";
import { useStore } from "~/store/useStore";

export function StrudelRepl() {
	const { currentStrudelCode } = useStore();
	const replContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (replContainerRef.current) {
			// Remove the old <strudel-repl> if it exists
			const prev = replContainerRef.current.querySelector("strudel-repl");
			if (prev) {
				replContainerRef.current.removeChild(prev);
			}

			// Create a new <strudel-repl> element
			const strudelEl = document.createElement("strudel-repl");

			// Set the code using comment node to support Strudel's embed expectations
			strudelEl.appendChild(
				document.createComment(`\n${currentStrudelCode}\n`)
			);

			replContainerRef.current.appendChild(strudelEl);

			// Style any iframe inside the <strudel-repl> after a short delay (to ensure it exists)
			setTimeout(() => {
				const iframe = strudelEl.querySelector("iframe");
				if (iframe) {
					iframe.style.width = "100%";
					iframe.style.height = "100%";
					iframe.style.border = "none";
				}
			}, 100);
		}
	}, [currentStrudelCode]);

	return (
		<div className="h-full w-full overflow-hidden bg-black">
			<div ref={replContainerRef} className="h-full w-full" />
		</div>
	);
}
