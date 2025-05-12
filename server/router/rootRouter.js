import express from 'express';
import { index } from '../controller/index.js';

// 유저 관리
const rootRouter = express.Router();

// rootRouter.get("/", index);

export default rootRouter;
