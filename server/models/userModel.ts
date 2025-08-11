import mongoose, { Document, Schema, Types } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  avatar?: string;
  isOnline: boolean;
  lastSeen: Date;
  friends: Types.ObjectId[];
  friendRequestsSent: Types.ObjectId[];
  friendRequestsReceived: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String },
    isOnline: { type: Boolean, default: false },
    lastSeen: { type: Date, default: Date.now },
    friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
    friendRequestsSent: [{ type: Schema.Types.ObjectId, ref: "User" }],
    friendRequestsReceived: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
