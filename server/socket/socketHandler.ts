import { Server, Socket } from 'socket.io';
import { createMessage, IMessage } from '../models/messageModel';

interface ClientToServerEvents {
  send_message: (data: IMessage) => void;
  setup: (userData: { id: string }) => void;
  'join room': (room: string) => void;
  typing: (room: string) => void;
  'stop typing': (room: string) => void;
  'new message': (newMessageRecieve: any) => void;
}

interface ServerToClientEvents {
  connected: () => void;
  typing: () => void;
  stop_typing: () => void;
  message_recieved: (newMessageRecieve: any) => void;
}

const setupSocket = (io: Server<ClientToServerEvents, ServerToClientEvents>) => {
  io.on('connection', (socket: Socket<ClientToServerEvents, ServerToClientEvents>) => {
    socket.on('setup', (userData) => {
      socket.join(userData.id);
      socket.emit('connected');
    });
    // Listen for 'join room' event to join a specific room
    console.log("USER CONNECTED");
    socket.on('join room', (room) => { socket.join(room) });

    // Listen for 'typing' event to notify users in the room
    // that someone is typing
    // socket.on('typing', (room) => socket.in(room).emit('typing'));

    // Listen for 'stop typing' event to notify users in the room
    // that typing has stopped
    // This is useful to stop showing the typing indicator
    // socket.on('stop typing', (room) => socket.in(room).emit('stop typing'));

    // Listen for 'send_message' event to send a message
    socket.on('send_message', async (newMessageRecieve) => {

      // Fetch the full chat object from the database using chatId
      const chatId = newMessageRecieve.chatId;
      console.log("Chat ID:", chatId);
      // Replace the following line with your actual chat model import
      const ChatModel = require('../models/chatModel'); // adjust path as needed
      const chat = await ChatModel.findById(chatId).populate('members').exec();

      if (!chat || !chat.members) {
        console.log('chat.members is not defined');
        return;
      }

      // Save the message to the database
      await createMessage(newMessageRecieve);
      // Emit the message to the sender
      chat.members.forEach((user: any) => {
        if (user._id.toString() === newMessageRecieve.sender.toString()) return;
        // Emit the message to the user who is not the sender
        socket.in(user._id.toString()).emit('message_recieved', newMessageRecieve);
      });
    });

    socket.off("setup", () => {
      console.log("USER DISCONNECTED");
      //socket.leave(userData._id);
    });
  });
};

export default setupSocket;
