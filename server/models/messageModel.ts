import mongoose, { Document, Schema, Types } from "mongoose";

export interface IMessage extends Document {
  chatId: Types.ObjectId; // Reference to the chat this message belongs to
  sender: Types.ObjectId; // Reference to the user who sent the message
  content: string; // The content of the message, can be text or a URL for media
  type: string; // e.g., 'text', 'image', 'file'
  mediaUrl?: string; // URL for media files if type is not 'text'
  createdAt?: Date;
  updatedAt?: Date;
}

const messageSchema = new Schema<IMessage>(
  {
    chatId: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: { type: String, trim: true },
    type: { type: String, enum: ["text", "image", "file"], default: "text" },
    mediaUrl: { type: String, trim: true, default: "" }, // Optional
  },
  { timestamps: true }
);

const Message = mongoose.model<IMessage>("Message", messageSchema);

export default Message;

export type MessageDataType = {
  chatId: string;
  sender: string;
  content: string;
  type?: string; // Optional, defaults to 'text'
  mediaUrl?: string; // Optional, for media messages
};

export const createMessage = async (messageData: MessageDataType) => {
  try {
    const message = await Message.create(messageData);
    // // Update the lastMessage field in the chat
    // await Chat.findByIdAndUpdate
    return message;
  } catch (error) {
    console.error("Error creating message:", error);
    throw error;
  }
};

export const getMessagesByChatId = async (chatId: string) => {
  try {
    const messages = await Message.find({
      chatId: new mongoose.Types.ObjectId(chatId),
    })
      .populate("sender", "-password")
      .sort({ createdAt: -1 });
    return messages;
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
};
