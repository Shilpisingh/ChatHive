
import mongoose, { Document, Schema } from 'mongoose';

export interface IMessage extends Document {
  chatId: mongoose.Schema.Types.ObjectId; // Reference to the chat this message belongs to
  sender: mongoose.Schema.Types.ObjectId; // Reference to the user who sent the message
  content: string; // The content of the message, can be text or a URL for media
  type: string; // e.g., 'text', 'image', 'file'
  mediaUrl?: string; // URL for media files if type is not 'text'
  createdAt?: Date;
  updatedAt?: Date;
}

const messageSchema = new Schema<IMessage>({
  chatId: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  content: { type: String, trim: true },
  type: { type: String, enum: ['text', 'image', 'file'], default: 'text' },
  mediaUrl: { type: String, trim: true, default: '' }, // Optional
  },
  { timestamps: true }
);

const Message = mongoose.model<IMessage>('Message', messageSchema);

export default Message;

// Function to create a new message
// This function saves a new message to the database
// @param messageData - The data for the new message, including chatId, sender, content, etc.
// @returns The created message object
export const createMessage = async (messageData: IMessage) => {
  try {
    const message = new Message(messageData);
    await message.save();
    return message;
  } catch (error) {
    console.error("Error creating message:", error);
    throw error;
  }
}

// Function to get messages by chatId
// This function retrieves messages for a specific chat, populating sender and readBy fields with user\
// @param chatId - The ID of the chat for which to retrieve messages
// @returns An array of messages for the specified chat, with sender and readBy fields populated
interface IGetMessagesByChatIdParams {
  chatId: mongoose.Schema.Types.ObjectId;
}

export const getMessagesByChatId = async (
  chatId: IGetMessagesByChatIdParams['chatId']
): Promise<IMessage[]> => {
  try {
    const messages = await Message.find({ chatId })
      .populate('sender', 'username avatar')
    return messages;
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
}
