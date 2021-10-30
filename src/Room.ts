import mongoose from 'mongoose';
const User = new mongoose.Schema({id: String, userName: String });
const Message = new mongoose.Schema({userName: String, text: String, date: String });
const Room = new mongoose.Schema( {
  roomName: {type: String, required: true},
  messages : {type:[Message]},
  users: {type:[User]},
});

export default mongoose.model ('Room', Room);