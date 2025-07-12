import { io, Socket } from "socket.io-client";

const SOCKET_URL = "http://localhost:5000"; // Update if using a different port or domain

// Define the socket type if you want strongly typed events
const socket: Socket = io(SOCKET_URL, {
  autoConnect: true,
  transports: ["websocket"], // optional: force websocket only
});

export default socket;
export const connectSocket = () => {
  // Listen for connection confirmation
  socket.on("connected", () => {
    console.log("Socket connected:", socket.id);
  });
  // Handle connection errors
  socket.on("connect_error", (error) => {
    console.error("Socket connection error:", error);
  });
  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("Socket disconnected");
  });
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
    console.log("Socket disconnected");
  } else {
    console.warn("Socket is not connected");
  }
};

export const joinChat = (chatId: string) => {
  if (!chatId) {
    console.error("Chat ID is required to join a chat");
    return;
  }
  socket.emit("join_chat", chatId);
  console.log(`Joined chat: ${chatId}`);
};

export const onSendMessage = (messageData: any) => {
  if (
    !messageData ||
    !messageData.chatId ||
    !messageData.sender ||
    !messageData.content
  ) {
    console.error("Invalid message data:", messageData);
    return;
  }
  socket.emit("send_message", messageData);
  console.log("Message sent:", messageData);
};

export const onMessageReceived = (callback: (message: any) => void) => {
  socket.on("message_recieved", callback);
};

export const offMessageReceived = () => {
  socket.off("message_recieved");
};
