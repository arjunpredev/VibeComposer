import mongoose, { Schema, Document } from "mongoose";

interface IMessage extends Document {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
  inputTokens?: number;
  outputTokens?: number;
}

interface IChat extends Document {
  userId: string;
  name: string;
  messages: IMessage[];
  createdAt: number;
  updatedAt: number;
}

const messageSchema = new Schema<IMessage>({
  role: { type: String, enum: ["user", "assistant"], required: true },
  content: { type: String, required: true },
  timestamp: { type: Number, required: true },
  inputTokens: { type: Number },
  outputTokens: { type: Number },
});

const chatSchema = new Schema<IChat>({
  userId: { type: String, required: true, index: true },
  name: { type: String, required: true },
  messages: [messageSchema],
  createdAt: { type: Number, required: true },
  updatedAt: { type: Number, required: true },
});

chatSchema.index({ userId: 1, updatedAt: -1 });

export const Chat = mongoose.model<IChat>("Chat", chatSchema);
export const Message = mongoose.models.Message || mongoose.model<IMessage>("Message", messageSchema);

export type { IChat, IMessage };
