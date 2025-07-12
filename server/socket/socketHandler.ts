import { Server, Socket } from "socket.io";
import { createMessage, MessageDataType } from "../models/messageModel";
import { getChatById } from "../models/chatModel";
import registerChatHandlers from "./chatEvents";

interface ClientToServerEvents {
  send_message: (data: MessageDataType) => void;
  setup: (userData: { id: string }) => void;
}

interface ServerToClientEvents {
  connected: () => void;
  message_recieved: (newMessageRecieve: MessageDataType) => void;
}

const setupSocket = (
  io: Server<ClientToServerEvents, ServerToClientEvents>
) => {
  io.on(
    "connection",
    (socket: Socket<ClientToServerEvents, ServerToClientEvents>) => {
      console.log("New client connected:", socket.id);

      registerChatHandlers(socket, io);

      socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        //socket.leave(userData._id);
      });
    }
  );
};

export default setupSocket;
