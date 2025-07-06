import { io, Socket } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000'; // Update if using a different port or domain

// Define the socket type if you want strongly typed events
const socket: Socket = io(SOCKET_URL, {
  autoConnect: true,
  transports: ['websocket'], // optional: force websocket only
});

export default socket;
export const connectSocket = (userId: string) => {
  //socket.emit('setup', { id: userId });

  // Listen for connection confirmation
  socket.on('connected', () => {
    console.log('Socket connected');
  });
};