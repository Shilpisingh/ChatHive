import { createMessage, MessageDataType } from "../models/messageModel";
import { getChatById } from "../models/chatModel";
import { Server, Socket } from "socket.io";

// Register chat event handlers
const registerChatHandlers = (socket: Socket, io: Server) => {
  socket.on("join_chat", (chatId: string) => {
    socket.join(chatId);
    console.log(`User ${socket.id} joined chat ${chatId}`);
  });

  // Listen for 'send_message' event to send a message
  socket.on("send_message", async (newMessageRecieve) => {
    // Fetch the full chat object from the database using chatId
    const messageData = {
      chatId: newMessageRecieve.chatId,
      sender: newMessageRecieve.sender,
      content: newMessageRecieve.content,
      type: newMessageRecieve.type || "text",
    };
    // Log the chatId to ensure it's being received correctly
    if (!messageData.chatId || !messageData.sender || !messageData.content) {
      console.error("Invalid message data:", messageData);
      return;
    }
    // Create a new message using the createMessage function
    const newMessage = await createMessage(messageData);

    // Emit the message to the sender
    const chat = await getChatById(newMessage.chatId.toString());

    if (!chat || !chat.members) {
      console.log("chat.members is not defined");
      return;
    }

    // Emit the message to the sender
    chat.members.forEach((user: any) => {
      if (user._id.toString() === newMessageRecieve.sender.toString()) return;
      // Emit the message to the user who is not the sender
      socket.to(messageData.chatId).emit("message_recieved", newMessageRecieve);
    });
  });
};

export default registerChatHandlers;
