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

interface RenameChatRequest {
	chatId: string;
	newName: string;
	userId: string;
}

interface DeleteChatRequest {
	chatId: string;
	userId: string;
}

export const action: ActionFunction = async ({ request }) => {
	if (request.method === "POST") {
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
	} else if (request.method === "PATCH") {
		try {
			await connectDB();

			const { chatId, newName, userId } = (await request.json()) as RenameChatRequest;

			if (!chatId || !newName?.trim() || !userId) {
				return json(
					{ error: "chatId, newName, and userId are required" },
					{ status: 400 }
				);
			}

			const updatedChat = await Chat.findOneAndUpdate(
				{ _id: chatId, userId },
				{ name: newName.trim(), updatedAt: Date.now() },
				{ new: true }
			);

			if (!updatedChat) {
				return json({ error: "Chat not found" }, { status: 404 });
			}

			return json({
				chat: updatedChat.toObject(),
				success: true,
			});
		} catch (error) {
			console.error("Rename chat error:", error);
			return json(
				{
					error: error instanceof Error ? error.message : "Failed to rename chat",
				},
				{ status: 500 }
			);
		}
	} else if (request.method === "DELETE") {
		try {
			await connectDB();

			const { chatId, userId } = (await request.json()) as DeleteChatRequest;

			if (!chatId || !userId) {
				return json(
					{ error: "chatId and userId are required" },
					{ status: 400 }
				);
			}

			const deletedChat = await Chat.findOneAndDelete({ _id: chatId, userId });

			if (!deletedChat) {
				return json({ error: "Chat not found" }, { status: 404 });
			}

			return json({
				success: true,
				message: "Chat deleted successfully",
			});
		} catch (error) {
			console.error("Delete chat error:", error);
			return json(
				{
					error: error instanceof Error ? error.message : "Failed to delete chat",
				},
				{ status: 500 }
			);
		}
	} else {
		return json({ error: "Method not allowed" }, { status: 405 });
	}
};
