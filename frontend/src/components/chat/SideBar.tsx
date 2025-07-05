import React from "react";
import pic from '../../assets/images/pic.jpg';

const Sidebar = () => {
  return (
    <div className="sidebar">
       <div className='navbar'>
      <span className="logo">Chat App</span>
      <div className="user">
        <img src={pic} alt="" />
        <span>user name</span>
        <button >logout</button>
      </div>
    </div>
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
        />
      </div>
        <div className="userChat">
          <img src="" alt="" />
          <div className="userChatInfo">
            <span>name</span>
          </div>
        </div>

    </div>
    <div className="chats">
        <div className="userChat">
          <img src="" alt="" />
          <div className="userChatInfo">
            <span>name</span>
            <p>text</p>
          </div>
        </div>
    </div>
    </div>
  );
};

export default Sidebar;