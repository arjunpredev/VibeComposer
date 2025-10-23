import { isbot } from "isbot";
import { renderToReadableStream } from "react-dom/server";
import { ServerRouter } from "react-router";
import type { AppLoadContext } from "react-router";

const ABORT_DELAY = 5_000;

export default async function handleRequest(
	request: Request,
	responseStatusCode: number,
	responseHeaders: Headers,
	routerContext: AppLoadContext
) {
	const url = new URL(request.url);
	
	if (url.pathname.startsWith("/api/")) {
		return routerContext.router.request(request);
	}

	const userAgent = request.headers.get("user-agent");
	const readableStream = await renderToReadableStream(
		<ServerRouter url={request.url} context={routerContext} />,
		{
			signal: AbortSignal.timeout(ABORT_DELAY),
			onError(error: unknown) {
				console.error(error);
				responseStatusCode = 500;
			},
		}
	);

	if (isbot(userAgent)) {
		await new Promise((resolve) => setTimeout(resolve, 0));
	}

	responseHeaders.set("Content-Type", "text/html");
	return new Response(readableStream, {
		headers: responseHeaders,
		status: responseStatusCode,
	});
}
