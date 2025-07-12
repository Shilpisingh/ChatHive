import { text } from "body-parser";
import mongoose, { Document, Schema, Types } from "mongoose";

export interface IChat extends Document {
  chatName?: string;
  members: Types.ObjectId[];
  lastMessage?: string;
  /*latestMessage?: {
    sender: mongoose.Schema.Types.ObjectId;
    text: string;
    createdAt: Date;
  };
  isGroupChat: boolean;
  groupAdmin?: mongoose.Schema.Types.ObjectId;*/
  createdAt?: Date;
  updatedAt?: Date;
}

const chatSchema = new Schema<IChat>(
  {
    chatName: { type: String, trim: true },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    lastMessage: {
      type: String,
    },
    /*latestMessage: {
      sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      text: { type: String, trim: true },
      createdAt: { type: Date, default: Date.now },
      ref: "Message",
    },*/
    //isGroupChat: { type: Boolean, default: false },
    //groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Chat = mongoose.model<IChat>("Chat", chatSchema);
export default Chat;

export const getChatById = async (chatId: string) => {
  try {
    const chat = await Chat.findById(chatId).populate("members");
    return chat;
  } catch (error) {
    console.error("Error fetching chat by ID:", error);
    throw error;
  }
};
