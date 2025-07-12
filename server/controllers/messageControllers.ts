import { Request, Response } from "express";
import Chat from "../models/chatModel";
import mongoose from "mongoose"; // Import mongoose to use ObjectId;
import Message from "../models/messageModel";
const ObjectId = mongoose.Types.ObjectId;

// GET /api/chat/:chatId/

const getMessagesByChatId = async (req: Request, res: Response) => {
  const { chatId } = req.params;

  if (!chatId) return res.status(400).json({ message: "Chat ID is required" });

  try {
    const messages = await Message.find({ chatId: ObjectId(chatId) })
      .populate("sender", "-password")
      .sort({ createdAt: 1 });

    //if (!messages.length) return res.status(404).json({ message: [] });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Failed to get messages", error });
  }
};

export { getMessagesByChatId };
