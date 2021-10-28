import mongoose from 'mongoose';

const Room = new mongoose.Schema( {
  roomName: {type: String, required: true},
  messages : {type:[String], default: []},
  users: {type:[String], default: []},
});

export default mongoose.model ('Room', Room);