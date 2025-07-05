import React from 'react';

import './styles.scss';
import Sidebar from '../../components/chat/SideBar';
import Chat from '../../components/chat';

const ChatPage = () => {
  return (
    <div className='chat-page'>
      <Chat />
    </div>
  );
};

export default ChatPage;