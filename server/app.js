import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

import connect from './connect.js';

import userRouter from './router/userRouter.js';
import roomRouter from './router/roomRouter.js';
import storeRouter from './router/storeRouter.js';
import rootRouter from './router/rootRouter.js';
import majorRouter from './router/majorRouter.js';

dotenv.config();
connect();

const app = express();
const port = process.env.PORT || 4000;
const isProduction = process.env.NODE_ENV === 'production';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('trust proxy', 1);

// CORS 설정 (가장 먼저 등록)
app.use(
  cors({
    origin: [
      'http://localhost:5173', // 개발 환경
      'https://bab-matching.vercel.app',
      'https://bab-matching.onrender.com', // 배포 환경
    ],
    credentials: true, // 쿠키 주고받기 허용
  }),
);

// 세션 설정
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'mySecretKey',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: isProduction, // 개발 환경에서는 false (HTTPS일 땐 true)
      httpOnly: true,
      sameSite: isProduction ? 'none' : 'lax', // 또는 'none' (secure: true와 함께)
      maxAge: 1000 * 60 * 60 * 2, // 2시간
    },
  }),
);

// 본문 파싱
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'client/dist')));

// 라우터 연결
app.use('/api/', rootRouter);
app.use('/api/user', userRouter);
app.use('/api/room', roomRouter);
app.use('/api/store', storeRouter);
app.use('/api/major', majorRouter);

// SPA 라우팅: 위 API 외 모든 요청은 프론트 index.html 반환
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
});

// 서버 실행
app.listen(port, () => {
  console.log(`서버 실행 중: http://localhost:${port}`);
});

app.get('/', (req, res) => {
  res.send('서버가 정상 작동 중입니다.');
});
