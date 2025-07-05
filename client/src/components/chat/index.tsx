import React from 'react';
import Sidebar from './SideBar';
import ChatBox from './ChatBox';

const Chat = () => {
  return (
    <div className="container">
      <Sidebar/>
      <ChatBox/>
    </div>
  );
};

export default Chat;