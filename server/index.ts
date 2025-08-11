import express from "express";
import mongoDBConnect from "./db/connection";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import * as Server from "socket.io";
import setupSocket from "./socket/socketHandler";
import userRoutes from "./routes/userRoutes";
import chatRoutes from "./routes/chatRoute";
import messageRoutes from "./routes/messageRoute";
import friendRoute from "./routes/friendRoute";

dotenv.config();
const app = express();
const allowedOrigins = [process.env.BASE_URL, "http://localhost:3000"].filter(
  (origin): origin is string => typeof origin === "string"
);

const corsConfig = {
  origin: allowedOrigins,
  credentials: true,
  methods: "GET, POST, PATCH, DELETE",
  allowedHeaders:
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
};
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error("MONGO_URI is not defined in environment variables");
  process.exit(1);
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsConfig));

// Connect to MongoDB
mongoose.set("strictQuery", false);
mongoDBConnect(MONGO_URI);

//add routes
app.get("/", (_, res) => {
  res.send("Server is running with Socket.IO + MongoDB + TypeScript");
});

app.use("/api/users", userRoutes);
app.use("/api/friend", friendRoute);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

const server = app.listen(PORT, () => {
  console.log(`Server Listening at PORT - ${PORT}`);
});

// Socket.io setup
const io = new Server.Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.BASE_URL,
  },
});

// Socket.io connection
setupSocket(io);

io.on("disconnect", () => {
  console.log("User Disconnected");
});
