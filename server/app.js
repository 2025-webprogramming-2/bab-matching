import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import connect from './connect.js';
import cors from 'cors';

import userRouter from './router/userRouter.js';
import roomRouter from './router/roomRouter.js';
import storeRouter from './router/storeRouter.js';
import rootRouter from './router/rootRouter.js';
import majorRouter from './router/majorRouter.js';

dotenv.config(); // .env 설정 불러오기
connect(); // MongoDB 연결

const app = express();
const port = process.env.PORT || 4000;

// 미들웨어 등록
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// 라우터 연결
app.use('/api/', rootRouter);
app.use('/api/user', userRouter);
app.use('/api/room', roomRouter);
app.use('/api/store', storeRouter);
app.use('/api/major', majorRouter);

// 테스트용 루트 응답
app.get('/', (req, res) => {
  res.send('<html><body><h1>홈입니다.</h1></body></html>');
});

// 서버 실행
app.listen(port, () => {
  console.log(`포트 ${port}에서 서버 대기 중...`);
});
