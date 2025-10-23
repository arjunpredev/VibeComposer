import type { LoaderFunction, ActionFunction } from "react-router";
import { json } from "~/server/json";
import { connectDB } from "~/db/connect";
import { Chat } from "~/db/models";
import type { IChat } from "~/db/models";

export const loader: LoaderFunction = async ({ request, params }) => {
	if (request.method !== "GET") {
		return json({ error: "Method not allowed" }, { status: 405 });
	}

	try {
		await connectDB();

		const url = new URL(request.url);
		const userId = url.searchParams.get("userId");
		const page = parseInt(url.searchParams.get("page") || "1", 10);
		const pageSize = parseInt(url.searchParams.get("pageSize") || "10", 10);

		if (!userId) {
			return json({ error: "userId is required" }, { status: 400 });
		}

		const skip = (page - 1) * pageSize;

		const chats = await Chat.find({ userId })
			.sort({ updatedAt: -1 })
			.skip(skip)
			.limit(pageSize)
			.lean();

		const totalChats = await Chat.countDocuments({ userId });

		// Count total messages across all user's chats
		const allUserChats = await Chat.find({ userId }).lean();
		const totalMessages = allUserChats.reduce(
			(sum, c) => sum + c.messages.filter((m) => m.role === "user").length,
			0
		);

		return json({
			chats: chats as any as IChat[],
			totalChats,
			totalMessages,
			currentPage: page,
			pageSize,
			totalPages: Math.ceil(totalChats / pageSize),
		});
	} catch (error) {
		console.error("Fetch chats error:", error);
		return json(
			{
				error: error instanceof Error ? error.message : "Failed to fetch chats",
			},
			{ status: 500 }
		);
	}
};

interface CreateChatRequest {
	userId: string;
	name: string;
}

export const action: ActionFunction = async ({ request }) => {
	if (request.method !== "POST") {
		return json({ error: "Method not allowed" }, { status: 405 });
	}

	try {
		await connectDB();

		const { userId, name } = (await request.json()) as CreateChatRequest;

		if (!userId || !name?.trim()) {
			return json({ error: "userId and name are required" }, { status: 400 });
		}

		const now = Date.now();
		const newChat = new Chat({
			userId,
			name: name.trim(),
			messages: [],
			createdAt: now,
			updatedAt: now,
		});

		await newChat.save();

		return json({
			chat: newChat.toObject(),
			success: true,
		});
	} catch (error) {
		console.error("Create chat error:", error);
		return json(
			{
				error: error instanceof Error ? error.message : "Failed to create chat",
			},
			{ status: 500 }
		);
	}
};
