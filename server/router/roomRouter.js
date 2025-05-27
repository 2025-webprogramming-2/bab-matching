import express from 'express';
import Room from '../models/room_schema.js';
import { getCurrentRoom, getHistoryRoom, postRoom } from '../controller/room/room.js';

const roomRouter = express.Router();

roomRouter.post('/addRoom', async (req, res) => {
  try {
    const { currentUserId, storeId, time, maxCount, filter } = req.body;

    const newRoom = new Room({
      currentUserId: [currentUserId],
      storeId,
      time,
      maxCount,
      filter,
    });

    const savedRoom = await newRoom.save();

    res.status(201).json({ message: '방 만들기 성공', roomId: savedRoom._id });
  } catch (error) {
    console.error('방 만들기 오류:', error);
    console.log(req.body);
    res.status(500).json({ message: '서버 오류' });
  }
});

export default roomRouter;
