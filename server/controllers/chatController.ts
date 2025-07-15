import { Request, Response } from "express";
import Chat from "../models/chatModel";
import mongoose from "mongoose"; // Import mongoose to use ObjectId;

// POST /api/chat/one-to-one
export const accessOrCreateChat = async (req: Request, res: Response) => {
  const { contactId } = req.body; // ID of the other person you want to chat with
  const userId = req.user?.id; // from auth middleware

  if (!contactId)
    return res.status(400).json({ message: "UserId is required" });

  try {
    // 1. Check if chat already exists between both users
    let chat = await Chat.findOne({
      members: { $all: [userId, contactId] },
    }).populate({
      path: "members",
      match: { _id: { $ne: userId } }, // get only the other user
      select: "_id, username email avatar", // customize as needed
    });

    console.log("Accessing chat for users:", chat);
    if (chat) return res.status(200).json(chat);

    // 2. If no chat exists, create one
    chat = await Chat.create({
      chatName: "sender",
      members: [userId, contactId],
    });

    const fullChat = await Chat.findOne({
      members: { $all: [userId, contactId] },
    }).populate({
      path: "members",
      match: { _id: { $ne: userId } }, // get only the other user
      select: "_id, username email avatar", // customize as needed
    });

    console.log("craete fullchat for users:", fullChat);
    res.status(201).json(fullChat);
  } catch (error) {
    res.status(500).json({ message: "Failed to access or create chat", error });
  }
};

// GET /api/chat
export const getAllUserChats = async (req: Request, res: Response) => {
  const userId = req.user?.id; // from auth middleware
  try {
    const ObjectId = mongoose.Types.ObjectId;
    const chats = await Chat.find({
      members: ObjectId(userId),
    })
      .populate({
        path: "members",
        match: { _id: { $ne: userId } }, // get only the other user
        select: "_id, username email avatar", // customize as needed
      })
      .sort({ updatedAt: -1 });

    /*if (!chats || chats.length === 0) {
      return res.status(404).json([]);
    }*/

    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ message: "Failed to get chats", error });
  }
};
