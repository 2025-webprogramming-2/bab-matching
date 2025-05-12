import express from 'express';
import Store from '../models/store_schema.js';

const storeRouter = express.Router();

// 모든 store 데이터 조회 API
storeRouter.get('/', async (req, res) => {
  try {
    const stores = await Store.find();
    console.log(stores);
    res.status(200).json(stores);
  } catch (error) {
    res.status(500).json({ error: '서버 에러: store 불러오기 실패' });
  }
});

export default storeRouter;
