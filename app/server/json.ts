export function json(data: any, init?: ResponseInit) {
	return new Response(JSON.stringify(data), {
		headers: { "Content-Type": "application/json" },
		...init,
	});
}
