import React, { useEffect } from "react";
import pic from "../../assets/images/pic.jpg";
import { useAuth } from "../../context/AuthProvider";
import { ChatType } from "./types";

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
  const [search, setSearch] = React.useState("");

  const onChatSelect = (chat: ChatType) => {
    // Handle chat selection logic here
    setSelectedChat(chat);
  };

  const handleKeyPress = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && search.trim()) {
      try {
        // [TODO] Implement search functionality
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
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
          <img src={user?.avatar || pic} alt="" />
          <span>{user?.username}</span>
          <button onClick={logout}>logout</button>
        </div>
      </div>
      <div className="search">
        <div className="searchForm">
          <input
            type="text"
            placeholder="Find a user"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            onKeyDown={(e) => handleKeyPress(e)}
          />
        </div>
      </div>
      <div className="chats">
        {chats.map((chat) => (
          <div
            className="userChat"
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
