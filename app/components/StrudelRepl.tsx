import { useEffect, useRef } from "react";
import { useStore } from "~/store/useStore";

function styleIframe(strudelEl: HTMLElement) {
	const iframe = strudelEl.querySelector("iframe") as HTMLIFrameElement | null;
	if (iframe) {
		iframe.style.width = "100%";
		iframe.style.height = "100%";
		iframe.style.border = "none";
	}
}

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

			// Immediate attempt to style (in case iframe is ready immediately)
			styleIframe(strudelEl);

			// First retry after short delay
			const timeout1 = setTimeout(() => {
				styleIframe(strudelEl);
			}, 100);

			// Second retry after longer delay as fallback
			const timeout2 = setTimeout(() => {
				styleIframe(strudelEl);
			}, 300);

			// Set up mutation observer to ensure styles persist
			const observer = new MutationObserver(() => {
				styleIframe(strudelEl);
			});

			observer.observe(strudelEl, {
				attributes: true,
				subtree: true,
				attributeFilter: ["width", "height", "style"],
			});

			return () => {
				clearTimeout(timeout1);
				clearTimeout(timeout2);
				observer.disconnect();
			};
		}
	}, [currentStrudelCode]);

	return (
		<div className="h-full w-full overflow-hidden bg-black">
			<div ref={replContainerRef} className="h-full w-full" />
		</div>
	);
}
