import React, { useEffect } from "react";
import Sidebar from "./SideBar";
import ChatBox from "./ChatBox";
import { useAuth } from "../../context/AuthProvider";
import { Contact, ChatType } from "./types";
import { createChatConnection, getAllChats } from "../../api/chatService";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";

const Chat = () => {
  const { user } = useAuth();
  const [loading, setLoading] = React.useState(true);
  const [chats, setChat] = React.useState<ChatType[]>([]);
  const [selectedChat, setSelectedChat] = React.useState<ChatType>({
    _id: "",
    members: [],
  });
  const { id: friendId } = useParams();

  useEffect(() => {
    // Fetch users
    const fetchChat = async () => {
      setLoading(true);
      try {
        const chats = await getAllChats();
        setChat(chats);
        // Set the first chat as selected if available
        let chat = selectedChat;
        if (friendId) {
          const friendChat = chats.find(
            (chat: ChatType) => chat.members[0]._id === friendId
          );
          if (friendChat) {
            chat = friendChat;
          }
        } else if (chats.length > 0) {
          chat = chats[0];
        }
        setSelectedChat(chat);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user's chat:", error);
      }
    };
    fetchChat();
  }, [user]);

  return (
    <Box className="container">
      <>
        <Sidebar
          chats={chats}
          loading={loading}
          setSelectedChat={setSelectedChat}
          selectedChat={selectedChat}
        />
        <ChatBox chat={selectedChat} />
      </>
    </Box>
  );
};

export default Chat;
