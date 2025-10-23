import type { ActionFunction } from "react-router";
import { json } from "~/server/json";
import Anthropic from "@anthropic-ai/sdk";
import { connectDB } from "~/db/connect";
import { Chat } from "~/db/models";
import { STRUDEL_SYSTEM_PROMPT } from "~/prompts/strudel-system-prompt";
import { MESSAGE_LIMIT } from "~/constants/limits";

interface SendMessageRequest {
	chatId: string;
	userId: string;
	content: string;
}

export const action: ActionFunction = async ({ request }) => {
	if (request.method !== "POST") {
		return json({ error: "Method not allowed" }, { status: 405 });
	}

	try {
		await connectDB();

		const { chatId, userId, content } =
			(await request.json()) as SendMessageRequest;

		if (!chatId || !userId || !content?.trim()) {
			return json({ error: "Missing required fields" }, { status: 400 });
		}

		const anthropicKey = process.env.ANTHROPIC_KEY;
		if (!anthropicKey) {
			return json({ error: "Backend API key not configured" }, { status: 500 });
		}

		const chat = await Chat.findOne({ _id: chatId, userId });
		if (!chat) {
			return json({ error: "Chat not found" }, { status: 404 });
		}

		// Count total messages across all user's chats
		const allChats = await Chat.find({ userId });
		const totalMessages = allChats.reduce(
			(sum, c) => sum + c.messages.filter((m) => m.role === "user").length,
			0
		);

		if (totalMessages >= MESSAGE_LIMIT) {
			return json(
				{
					error: `Message limit of ${MESSAGE_LIMIT} reached across all chats. Please clear chats to continue.`,
				},
				{ status: 400 }
			);
		}

		const userMessage = {
			role: "user" as const,
			content: content.trim(),
			timestamp: Date.now(),
		};

		chat.messages.push(userMessage as any);

		const anthropic = new Anthropic({
			apiKey: anthropicKey,
		});

		const stream = await anthropic.messages.stream({
			model: "claude-haiku-4-5",
			max_tokens: 1024,
			messages: [
				...chat.messages.map((m) => ({
					role: m.role,
					content: m.content,
				})),
			],
			system: STRUDEL_SYSTEM_PROMPT,
		});

		let fullContent = "";
		let inputTokens = 0;
		let outputTokens = 0;

		const encoder = new TextEncoder();
		const { writable, readable } = new TransformStream();
		const writer = writable.getWriter();

		(async () => {
			try {
				for await (const chunk of stream) {
					if (
						chunk.type === "content_block_delta" &&
						chunk.delta.type === "text_delta"
					) {
						fullContent += chunk.delta.text;
						await writer.write(
							encoder.encode(
								`data: ${JSON.stringify({ type: "text", data: chunk.delta.text })}\n\n`
							)
						);
					}
					if (chunk.type === "message_delta" && chunk.usage) {
						outputTokens = chunk.usage.output_tokens;
					}
					if (chunk.type === "message_start" && chunk.message.usage) {
						inputTokens = chunk.message.usage.input_tokens;
					}
				}

				const assistantMessage = {
					role: "assistant" as const,
					content: fullContent,
					timestamp: Date.now(),
					inputTokens,
					outputTokens,
				};

				chat.messages.push(assistantMessage as any);
				chat.updatedAt = Date.now();
				await chat.save();

				await writer.write(
					encoder.encode(
						`data: ${JSON.stringify({ type: "done", inputTokens, outputTokens })}\n\n`
					)
				);
				await writer.close();
			} catch (error) {
				console.error("Streaming error:", error);
				await writer.abort(error);
			}
		})();

		return new Response(readable, {
			headers: {
				"Content-Type": "text/event-stream",
				"Cache-Control": "no-cache",
				Connection: "keep-alive",
			},
		});
	} catch (error) {
		console.error("Message send error:", error);
		return json(
			{
				error:
					error instanceof Error ? error.message : "Failed to send message",
			},
			{ status: 500 }
		);
	}
};
