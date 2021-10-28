import mongoose from 'mongoose';
const User = new mongoose.Schema({id: String, userName: String });
const Room = new mongoose.Schema( {
  roomName: {type: String, required: true},
  messages : {type:[String], default: []},
  users: {type:[User], default: {}},
});

export default mongoose.model ('Room', Room);