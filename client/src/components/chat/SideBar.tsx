import React, { useEffect } from "react";
import pic from "../../assets/images/pic.jpg";
import { useAuth } from "../../context/AuthProvider";
import { ChatType, Contact } from "./types";
import { Box } from "@mui/material";

const Sidebar = ({
  chats,
  loading,
  selectedChat,
  setSelectedChat,
}: {
  chats: ChatType[];
  loading: Boolean;
  selectedChat: { _id: string; members: Contact[] };
  setSelectedChat: (chatId: ChatType) => void;
}) => {
  const onChatSelect = (chat: ChatType) => {
    // Handle chat selection logic here
    setSelectedChat(chat);
  };

  // Show loading state while fetching contacts
  if (loading) {
    return <div>Loading...</div>;
  }

  console.log("selectedChat", selectedChat);

  return (
    <div className="sidebar">
      <Box className="chats">
        {chats.map((chat) => (
          <Box
            className={`userChat ${
              selectedChat._id == chat._id ? "selected" : ""
            }`}
            key={chat?._id}
            onClick={() => onChatSelect(chat)}
          >
            <img
              src={chat.members[0]?.avatar || pic}
              alt={chat.members[0].username}
            />
            <div className="userChatInfo">
              <span>{chat.members[0].username}</span>
              <p>Last message text</p>
            </div>
          </Box>
        ))}
      </Box>
    </div>
  );
};

export default Sidebar;
