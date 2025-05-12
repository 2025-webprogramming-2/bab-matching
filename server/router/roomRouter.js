import express from 'express';
import { getCurrentRoom } from '../controller/room/room.js';

const roomRouter = express.Router();

roomRouter.get('/get', getCurrentRoom);

export default roomRouter;
