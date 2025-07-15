import React, { useEffect } from "react";
import Sidebar from "./SideBar";
import ChatBox from "./ChatBox";
import { useAuth } from "../../context/AuthProvider";
import Users from "./Users";
import { Contact, ChatType } from "./types";
import { getAllUsers } from "../../api/userService";
import { createConnection, getAllChats } from "../../api/chatService";

const Chat = () => {
  const { user } = useAuth();
  const [loading, setLoading] = React.useState(true);
  const [chats, setChat] = React.useState<ChatType[]>([]);
  const [selectedChat, setSelectedChat] = React.useState<ChatType>({
    _id: "",
    members: [],
  });

  useEffect(() => {
    // Fetch users
    const fetchChat = async () => {
      setLoading(true);
      try {
        const chats = await getAllChats();
        setChat(chats);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user's chat:", error);
      }
    };
    fetchChat();
  }, [user]);

  const updateContactList = async (contactId: string) => {
    // Handle adding contact as a friend
    console.log("Adding contact ID:", contactId);
    try {
      const response = await createConnection(contactId);
      if (!response) {
        console.error("Failed to create connection");
        return;
      }
      setChat((prevContacts) => [
        ...prevContacts,
        {
          _id: response?._id,
          members: response?.members,
        },
      ]);
    } catch (error) {
      console.error("Error creating connection:", error);
    }
  };

  return (
    <div className="container">
      <Sidebar
        chats={chats}
        loading={loading}
        setSelectedChat={setSelectedChat}
      />
      <ChatBox chat={selectedChat} />
      <Users updateContactList={updateContactList} />
    </div>
  );
};

export default Chat;
