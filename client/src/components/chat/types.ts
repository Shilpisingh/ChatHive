export type Contact = {
  _id: string;
  username: string;
  email?: string;
  avatar?: string;
  // add other properties as needed
};
export type ChatType = {
  _id: string;
  sender: string; //
  members: Contact[];
  //lastMessage?: string; // optional, if you want to show last message in sidebar
  createdAt?: Date; // for sorting chats by creation date
  updatedAt?: Date; // for sorting chats by last activity
};
