import { Request, Response } from "express";
import mongoose from "mongoose";
import User, { IUser } from "../models/userModel";

// Get all friends
export const getFriends = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    const user = await User.findById(userId).populate(
      "friends",
      "_id username email avatar"
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user.friends);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

export const getFriendRequest = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    const user = await User.findById(userId).populate(
      "friendRequestsReceived",
      "_id username email avatar"
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user.friendRequestsReceived);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

export const getSenderAndRecipient = async (
  senderId: mongoose.Types.ObjectId,
  recipientId: mongoose.Types.ObjectId
) => {
  const output: { sender: IUser | null; recipient: IUser | null } = {
    sender: null,
    recipient: null,
  };
  try {
    if (senderId && recipientId) {
      const sender = await User.findById(senderId);
      const recipient = await User.findById(recipientId);
      if (!sender || !recipient) {
        return output;
      }
      output.sender = sender;
      output.recipient = recipient;
    }
    return output;
  } catch (error) {
    return output;
  }
};
export const sendFriendRequest = async (req: Request, res: Response) => {
  try {
    const ObjectId = mongoose.Types.ObjectId;
    const senderId = ObjectId(req.user?.id);
    const { recipientId } = req.body;

    const { sender, recipient } = await getSenderAndRecipient(
      senderId,
      recipientId
    );

    if (!recipient || !sender) {
      return res.status(404).json({ message: "User not found" });
    }

    if (
      recipient?.friendRequestsReceived.includes(senderId) ||
      sender?.friendRequestsSent.includes(recipientId)
    ) {
      return res.status(400).json({ message: "friend request found" });
    }
    recipient.friendRequestsReceived.push(senderId);
    sender.friendRequestsSent.push(recipientId);

    await recipient.save();
    await sender.save();

    res.status(200).json({ message: "Friend request send" });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

// Cancel friend request
export const cancelFriendRequest = async (req: Request, res: Response) => {
  try {
    const ObjectId = mongoose.Types.ObjectId;
    const senderId = ObjectId(req.user?.id);
    const { recipientId } = req.body;

    const { sender, recipient } = await getSenderAndRecipient(
      senderId,
      recipientId
    );
    if (!recipient || !sender) {
      return res.status(404).json({ message: "User not found" });
    }
    if (
      !recipient?.friendRequestsReceived.includes(senderId) ||
      !sender?.friendRequestsSent.includes(recipientId)
    ) {
      return res.status(400).json({ message: "No friend request found" });
    }
    recipient.friendRequestsReceived = recipient.friendRequestsReceived.filter(
      (id) => id.toString() !== senderId.toString()
    );
    sender.friendRequestsSent = sender.friendRequestsSent.filter(
      (id) => id.toString() !== recipientId.toString()
    );
    await recipient.save();
    await sender.save();
    res.status(200).json({ message: "Friend request cancelled" });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

// accept friend request
export const acceptFriendRequest = async (req: Request, res: Response) => {
  const ObjectId = mongoose.Types.ObjectId;
  const recipientId = ObjectId(req.user?.id);
  const { senderId } = req.body;

  const { sender, recipient } = await getSenderAndRecipient(
    senderId,
    recipientId
  );

  if (
    !recipient?.friendRequestsReceived.includes(senderId) ||
    !sender?.friendRequestsSent.includes(recipientId)
  ) {
    return res.status(400).json({ message: "No friend request found" });
  }

  // Remove from request lists
  recipient.friendRequestsReceived = recipient.friendRequestsReceived.filter(
    (id) => id.toString() !== senderId.toString()
  );
  sender.friendRequestsSent = sender.friendRequestsSent.filter(
    (id) => id.toString() !== recipientId.toString()
  );
  // Add to friends
  recipient.friends.push(senderId);
  sender.friends.push(recipientId);

  await recipient.save();
  await sender.save();

  res.status(200).json({ message: "Friend request accepted" });
};

export const rejectFriendRequest = async (req: Request, res: Response) => {
  const ObjectId = mongoose.Types.ObjectId;
  const recipientId = ObjectId(req.user?.id);
  const { senderId } = req.body;

  const { sender, recipient } = await getSenderAndRecipient(
    senderId,
    recipientId
  );

  if (
    !recipient?.friendRequestsReceived.includes(senderId) ||
    !sender?.friendRequestsSent.includes(recipientId)
  ) {
    return res.status(400).json({ message: "No friend request found" });
  }

  // Remove from request lists
  recipient.friendRequestsReceived = recipient.friendRequestsReceived.filter(
    (id) => id.toString() !== senderId.toString()
  );
  sender.friendRequestsSent = sender.friendRequestsSent.filter(
    (id) => id.toString() !== recipientId.toString()
  );

  await recipient.save();
  await sender.save();

  res.status(200).json({ message: "Friend request rejected" });
};

export const removeFriend = async (req: Request, res: Response) => {
  const ObjectId = mongoose.Types.ObjectId;
  const senderId = ObjectId(req.user?.id);
  const { recipientId } = req.body;

  const { sender, recipient } = await getSenderAndRecipient(
    senderId,
    recipientId
  );

  if (!recipient || !sender) {
    return res.status(404).json({ message: "User not found" });
  }

  if (
    !recipient.friends.includes(senderId) ||
    !sender.friends.includes(recipientId)
  ) {
    return res.status(400).json({ message: "No friend found" });
  }

  // Remove from friends list
  recipient.friends = recipient.friends.filter(
    (id) => id.toString() !== senderId.toString()
  );
  sender.friends = sender.friends.filter(
    (id) => id.toString() !== recipientId.toString()
  );

  await recipient.save();
  await sender.save();

  res.status(200).json({ message: "Friend removed successfully" });
};
