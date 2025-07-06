
import { text } from 'body-parser';
import mongoose, { Document, Schema } from 'mongoose';

export interface IChat extends Document {
  chatName?: string;
  members: mongoose.Schema.Types.ObjectId[];
  latestMessage?: {
    sender: mongoose.Schema.Types.ObjectId;
    text: string;
    createdAt: Date;
  };
  isGroupChat: boolean;
  groupAdmin?: mongoose.Schema.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const chatSchema = new Schema<IChat>(
  {
    chatName: { type: String, trim: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    latestMessage: {
      sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      text: { type: String, trim: true },
      createdAt: { type: Date, default: Date.now },
      ref: "Message",
    },
    isGroupChat: { type: Boolean, default: false },
    groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const Chat = mongoose.model<IChat>('Chat', chatSchema);
