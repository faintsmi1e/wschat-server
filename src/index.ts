import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import http from 'http';
import {Server} from 'socket.io';
import RoomRouter from './RoomRouter'
import roomHandlers from './handlers/roomHandlers';

const app = express();
const server = new http.Server(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const DB_URL =
  'mongodb+srv://user:user@cluster0.bjtwy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
io.on('connection', (socket) => {
  
  roomHandlers(io, socket);

});
app.use('/api', RoomRouter);

async function startApp() {
  try {
    await mongoose.connect(DB_URL, {useUnifiedTopology: true, useNewUrlParser: true});
    
    server.listen(port, () => {
      console.log(`server started at http://localhost:${port}`);
    });
    
  } catch (e) {
    console.log(e);
  }
}

startApp();