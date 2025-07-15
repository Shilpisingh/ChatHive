export type Contact = {
  _id: string;
  username: string;
  email: string;
  avatar?: string;
  // add other properties as needed
};

export type ChatType = {
  _id: string;
  chatName?: string;
  members: Contact[];
  //lastMessage?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type MessageType = {
  _id: string;
  chatId: string;
  sender: string; // user ID
  content: string;
  type: "text" | "image" | "file"; // extend as needed
  createdAt: Date;
};

export type UserType = {
  _id: string;
  username: string;
  email: string;
  avatar?: string;
  isOnline?: boolean; // optional, for online status
};
