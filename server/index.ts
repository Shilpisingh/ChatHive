import express from 'express';
//import mongoDBConnect from './db/connection.js';
//import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
//import userRoutes from './routes/user.js';
//import chatRoutes from './routes/chat.js';
//import messageRoutes from './routes/message.js';
import dotenv from 'dotenv';
import * as Server from 'socket.io';
import setupSocket from './socket/socketHandler';

dotenv.config();
const app = express();
const corsConfig = {
  origin: [process.env.BASE_URL, 'http://localhost:3000'],
  credentials: true,
  methods: 'GET, POST, PATCH, DELETE',
  allowedHeaders:
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
};
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error('MONGO_URI is not defined in environment variables');
  process.exit(1);
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(cors(corsConfig));
//app.use('/', userRoutes);
//app.use('/api/chat', chatRoutes);
//app.use('/api/message', messageRoutes);

//mongoose.set('strictQuery', false);
//mongoDBConnect(MONGO_URI); 

app.get('/', (_, res) => {
  res.send('Server is running with Socket.IO + MongoDB + TypeScript');
});

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
setupSocket(io)

io.on('disconnect', () => {
  console.log('User Disconnected');
});
