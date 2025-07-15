import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { ChatType } from "./types";
import { getMessagesByChatId } from "../../api/chatService";
import pic from "../../assets/images/pic.jpg";
import {
  connectSocket,
  disconnectSocket,
  joinChat,
  offMessageReceived,
  onMessageReceived,
  onSendMessage,
} from "../../socket/socket";

const ChatBox = ({ chat }: { chat: ChatType }) => {
  const [content, setContent] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [error, setError] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    if (!chat || !chat._id) return;
    connectSocket();
    joinChat(chat._id);

    onMessageReceived((msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      disconnectSocket();
      offMessageReceived();
    };
  }, [chat._id]);

  useEffect(() => {
    // get messages for the selected chat
    const fetchMessages = async () => {
      if (!chat._id) return;
      // Fetch messages from the server or API
      const messages = await getMessagesByChatId(chat._id);

      setMessages(messages);
    };
    fetchMessages();
  }, [chat._id]);

  // Function to send a message
  const sendMessage = () => {
    console.log("Sending message:", chat._id, content, user);
    setError("");
    if (!content.trim()) return;
    if (!chat._id || !user?.id) {
      setContent("");
      setError("something went wrong");
      return;
    }
    const messageData = {
      chatId: chat._id,
      sender: user.id,
      content,
      type: "text",
      createdAt: new Date().toISOString(),
    };
    // Emit the message to the server
    onSendMessage(messageData);

    setContent("");
    setMessages((prevMessages) => [...prevMessages, messageData]);
  };

  const addConnection = () => {
    //[TODO] Implement logic to add a connection
    console.log("Add connection clicked");
  };

  // If no chat is selected, show a message
  if (!chat || !chat.members.length) {
    return (
      <div className="chat">
        Select a user to start messaging
        <button onClick={addConnection}>Add Connections</button>
      </div>
    );
  }

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{chat.members[0]?.username || ""}</span>
        <div className="chatIcons"></div>
      </div>
      <div className="messages">
        {messages.map((message) => (
          <div
            className={`message ${message.sender === user?._id ? "owner" : ""}`}
            key={message._id}
          >
            <div className="messageInfo">
              <img src={message.sender.avatar || pic} alt="" />
              <span>{new Date(message.createdAt).toLocaleTimeString()}</span>
            </div>
            <div className="messageContent">
              <p>{message.content}</p>
              {message.type === "image" && (
                <img src={message.imageUrl} alt="Sent image" />
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="input">
        <input
          type="text"
          placeholder="Type something..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="send">
          {/* <img src="" alt="" />
          <input type="file" style={{ display: "none" }} id="file" />
          <label htmlFor="file">
            <img src="" alt="" />
          </label>
          */}
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
