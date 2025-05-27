import express from 'express';
import Room from '../models/room_schema.js';
import { getCurrentRoom, getHistoryRoom, postRoom } from '../controller/room/room.js';

const roomRouter = express.Router();

// 방 만들기 - addRoom
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

// 방 목록 가져오기 - main
roomRouter.get('/roomList', async (req, res) => {
  try {
    const rooms = await Room.find()
      .sort({ createdAt: -1 }) // 최신 순
      .populate('currentUserId') // 유저 정보 포함
      .populate('storeId'); // 식당 정보 포함

    if (!rooms || rooms.length === 0) {
      return res.status(200).json({ message: '방 목록이 없습니다', rooms: [] });
    }

    res.status(200).json(rooms);
  } catch (err) {
    console.error('방 목록 불러오기 오류:', err);
    res.status(500).json({ message: '서버 오류' });
  }
});

export default roomRouter;
