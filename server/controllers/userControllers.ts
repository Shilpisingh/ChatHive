import { Request, Response } from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel";
import { uploadFileToS3 } from "../middleware/uploadMiddleware";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() }).single("avatar");

// register user
export const registerUser = async (req: Request, res: Response) => {
  upload(req, res, async (err) => {
    if (err) return res.status(400).json({ error: "Upload error" });
    const { username, email, password } = req.body;
    console.log("Registering user:", req.body);
    let avatar = "";
    console.log("Avatar file:", avatar);
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    try {
      if (req.file) {
        // Validate avatar file type (if needed)
        /*const allowedTypes = /jpeg|jpg|png|gif/;
        if (!allowedTypes.test(avatar.split(".").pop()!.toLowerCase())) {
          return res.status(400).json({ message: "Invalid avatar file type" });
        }*/

        avatar = await uploadFileToS3(
          req.file.buffer,
          req.file.originalname,
          req.file.mimetype
        );
        if (!avatar) {
          return res.status(500).json({ message: "Failed to upload avatar" });
        }
        console.log("Avatar aws file:", avatar);
      }
      // Create new user
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({
        username,
        email,
        password: hashedPassword,
        avatar,
      });
      res
        .status(201)
        .json({ message: "User registered", user: { username, email } });
    } catch (error) {
      res.status(500).json({ message: "Error registering user", error });
    }
  });
};

// Login user
//@param req - Express request object
//@returns - JSON response with token and user info
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    console.log("Login attempt for email:", req.body);
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ message: "Please enter valid email address" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(404).json({ message: "Please enter valid credentail" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "12h",
    });

    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err });
  }
};

// Get all users (for chat list)
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const userOjectId = mongoose.Types.ObjectId(userId);
    const searchQuery = "";
    if (searchQuery) {
      const regex = new RegExp(searchQuery, "i");
      const users = await User.find({
        _id: { $ne: userId },
        $or: [{ username: regex }, { email: regex }],
      }).select("-password");
      res.status(200).json(users);
      return;
    }
    const users = await User.find({ _id: { $ne: userId } }).select("-password");
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    const updatedUser = users.map((user) => ({
      _id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      isOnline: user.isOnline,
      isFriend: user.friends.includes(userOjectId),
      isRequestSent: user.friendRequestsSent.includes(userOjectId),
      isRequestReceived: user.friendRequestsReceived.includes(userOjectId),
    }));
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

// Update user online status
export const setUserOnlineStatus = async (
  userId: mongoose.Types.ObjectId,
  isOnline: boolean
) => {
  return User.findByIdAndUpdate(userId, { isOnline }, { new: true });
};
