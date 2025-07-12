import React, { useEffect } from "react";
import pic from "../../assets/images/pic.jpg";
import { useAuth } from "../../context/AuthProvider";
import { getAllUsers } from "../../api/userService";
import { ChatType, Contact } from "./types";

const Sidebar = ({
  chats,
  loading,
  setSelectedChat,
}: {
  chats: ChatType[];
  loading: Boolean;
  setSelectedChat: (chatId: ChatType) => void;
}) => {
  const { user, logout } = useAuth();

  const onChatSelect = (chat: ChatType) => {
    // Handle chat selection logic here
    setSelectedChat(chat);
  };

  // Show loading state while fetching contacts
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="sidebar">
      <div className="navbar">
        <span className="logo">Chat App</span>
        <div className="user">
          <img src={pic} alt="" />
          <span>{user?.username}</span>
          <button onClick={logout}>logout</button>
        </div>
      </div>
      <div className="search">
        <div className="searchForm">
          <input type="text" placeholder="Find a user" />
        </div>
      </div>
      <div className="chats">
        {chats.map((chat) => (
          <div
            className="userChat"
            key={chat?._id}
            onClick={() => onChatSelect(chat)}
          >
            <img src={pic} alt={chat.members[0].username} />
            <div className="userChatInfo">
              <span>{chat.members[0].username}</span>
              <p>Last message text</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
