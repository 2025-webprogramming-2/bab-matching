import express from 'express';
import Store from '../models/store_schema.js';

const storeRouter = express.Router();

// 단과대학 필터 포함한 store 데이터 조회 API
storeRouter.get('/', async (req, res) => {
  const { college } = req.query; // ?college=공과대학

  try {
    const query = college ? { college } : {};
    const stores = await Store.find(query); // ✅ 필터링!
    res.status(200).json(stores);
  } catch (error) {
    res.status(500).json({ error: '서버 에러: store 불러오기 실패' });
  }
});

export default storeRouter;
