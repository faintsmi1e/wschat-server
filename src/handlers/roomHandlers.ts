import { SocketAddress } from 'net';
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
    socket.to(data.roomName).emit('room:joined', room.users);
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
};

export default roomHandlers;
