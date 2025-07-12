import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  avatar?: string;
  isOnline: boolean;
  lastSeen: Date;
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
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
