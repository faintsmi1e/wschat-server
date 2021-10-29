import { Server, Socket } from 'socket.io';
import Room from '../Room';

const roomHandlers = (io: Server, socket: Socket) => {
  socket.on('room:join', async (data) => {
    socket.join(data.roomName);
    let room = await Room.find({ roomName: data.roomName }).exec();
    interface User {
      id: string;
      userName: string;
    }
    room = room[0];

    room.users.push({ id: socket.id, userName: data.userName });

    const updatedRoom = await Room.findOneAndUpdate(
      { roomName: data.roomName },
      room,
      { new: true }
    );
    
    io.sockets.in(data.roomName).emit('room:setUsers', room.users);
  });

  socket.on('disconnect', async () => {
    const id = socket.id;
    let rooms = await Room.find();
    function findRoomName(rooms: Array<any>, id: string) {
      const length = rooms.length;
      for (let i = 0; i < length; i++) {
        const usersLegth = rooms[i].users.length;
        for (let j = 0; j < usersLegth; j++) {
          const user = rooms[i].users[j];
         
          if (user.id === id) {
            
            rooms[i].users.splice(j, 1);
            return [rooms[i].roomName, rooms[i]];
          }
        }
      }
      return [false, null];
    }
    const [roomName, newRoom] = findRoomName(rooms, id);
    if (roomName) {
      const users = newRoom.users
      socket.to(roomName).emit('room:setUsers', users);
    }
    const updatedRoom = await Room.findOneAndUpdate(
      { roomName: roomName },
      newRoom,
      { new: true }
    );
  });

  socket.on('room:newMessage', async ({roomName, userName, text}) => {
    let room = await Room.find({ roomName: roomName }).exec();
    const message = {
      userName,
      text,
    }
    console.log(message)
    console.log(room[0].messages)
    console.log(roomName)
    room[0].messages.push(message)
    socket.to(roomName).emit('room:newMessage', message);
  })
};

export default roomHandlers;
