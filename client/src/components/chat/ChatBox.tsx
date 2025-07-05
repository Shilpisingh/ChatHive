import React, { useContext } from "react";

const ChatBox = () => {
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
        <button>Send</button>
      </div>
    </div>
    </div>
  );
};

export default ChatBox;