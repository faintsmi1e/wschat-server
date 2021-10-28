import { Server, Socket } from 'socket.io';
import Room from '../Room';

const roomHandlers = (io: Server, socket: Socket) => {
  socket.on('room:join', async (data) => {
    console.log('сокет');
    console.log(data);
    socket.join(data.roomName);
    let room = await Room.find({ roomName: data.roomName }).exec();
    interface User {
      id: string,
      userName: string
    }
    room = room[0];
    
    room.users.push({id: socket.id, userName: data.userName})
    
    console.log(room);
    const updatedRoom = await Room.findOneAndUpdate({roomName: data.roomName}, room, {new: true});
    socket.to(data.roomName).emit('room:joined', room.users);
  });
};

export default roomHandlers;