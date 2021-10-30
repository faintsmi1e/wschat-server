import Room from './Room';
import express from 'express';

class RoomController {
  async create(req: express.Request, res: express.Response) {
    try {
      const { roomName, userName } = req.body;
      const room = await Room.find({ roomName: roomName }).exec();
      if (!room.length) {
        const newRoom = await Room.create({ roomName });
        
        return res.json(newRoom);
      }

      
      return res.json(room);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async get(req: express.Request, res: express.Response) {
    try {
      
      const {id} = req.params;
      const room = await Room.find({roomName: id});
      
      
      return res.json(room[0]);
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

export default new RoomController();
