import { useEffect, useRef } from "react";
import { useStore } from "../store/useStore";

export function StrudelRepl() {
	const { currentStrudelCode } = useStore();
	const replContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (replContainerRef.current) {
			// Clear and rebuild the strudel-repl element
			replContainerRef.current.innerHTML = `<strudel-repl><!--\n${currentStrudelCode}\n--></strudel-repl>`;
		}
	}, [currentStrudelCode]);

	return (
		<div className="h-full w-full overflow-hidden bg-black">
			<div ref={replContainerRef} className="h-full w-full" />
		</div>
	);
}
