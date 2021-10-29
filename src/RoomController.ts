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

  async getAll(req: express.Request, res: express.Response) {
    try {
      const events = await Room.find();
      return res.json(events);
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

export default new RoomController();
