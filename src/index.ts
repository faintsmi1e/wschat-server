import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import http from 'http';
import {Server} from 'socket.io';

const app = express();
const server = new http.Server(app);
const io = new Server(server);

const DB_URL =
  'mongodb+srv://user:user@cluster0.bjtwy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const port = process.env.PORT || 5000;

app.use(cors());
io.on('connection', socket => {
  console.log('user connected', socket);
})
app.use(express.json());
//app.use('/api', router);

async function startApp() {
  try {
    await mongoose.connect(DB_URL, {useUnifiedTopology: true, useNewUrlParser: true});
    app.listen(port, () => {
      console.log(`server started at http://localhost:${port}`);
    });
  } catch (e) {
    console.log(e);
  }
}

startApp();