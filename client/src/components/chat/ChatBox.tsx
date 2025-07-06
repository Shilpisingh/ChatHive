import React, { useContext, useState } from "react";
import socket from '../../socket';
import { useAuth } from "../../context/AuthProvider";

export interface IMessage extends Document {
  chatId: string; // Reference to the chat this message belongs to
  sender: string; // Reference to the user who sent the message
  content: string; // The content of the message, can be text or a URL for media
  type: string; // e.g., 'text', 'image', 'file'
}

const ChatBox = () => {
  const [content, setContent] = useState("");
  const username = "User"; // Replace with actual username from context or props
  const { user, loading } = useAuth();
  
   const sendMessage = () => {
    console.log("Sending message:", content);
    if (!content.trim()) return;

    socket.emit('send_message', { sender: user, content, type: 'text', chatId: '12345' });
    setContent('');
  };

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>user sjhwefher jhb</span>
        <div className="chatIcons"></div>
      </div>
      <div className="messages">
        <div className={`message "owner"}`}>
        <div className="messageInfo">
          <img src="" alt="" />
          <span>just now</span>
        </div>
        <div className="messageContent">
          <p>hhhh</p>
          <img src="" alt="" />
        </div>
      </div>
    </div>
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="send">
        <img src="" alt="" />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
        />
        <label htmlFor="file">
          <img src="" alt="" />
        </label>
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
    </div>
  );
};

export default ChatBox;