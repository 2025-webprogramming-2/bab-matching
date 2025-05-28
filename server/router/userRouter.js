import express from 'express';
import User from '../models/user_schema.js';

const userRouter = express.Router();

// ✅ 찜 목록 토글 API
userRouter.post('/toggleFavorite', async (req, res) => {
  try {
    // 세션에서 로그인된 유저 ID 가져오기
    const userId = req.session.user?.userId;
    if (!userId) return res.status(401).json({ message: '로그인이 필요합니다.' });

    const { storeId } = req.body;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });

    const index = user.favorite.indexOf(storeId);

    if (index > -1) {
      user.favorite.splice(index, 1); // 찜 제거
    } else {
      user.favorite.push(storeId); // 찜 추가
    }

    await user.save();

    res.json({ favorites: user.favorite }); // 클라이언트에 최신 목록 전달
  } catch (err) {
    console.error('찜 토글 실패:', err);
    res.status(500).json({ message: '서버 오류' });
  }
});

// ✅ 찜 목록 조회 API
userRouter.get('/favorites', async (req, res) => {
  try {
    const userId = req.session.user?.userId;
    if (!userId) return res.status(401).json({ message: '로그인이 필요합니다.' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });

    res.json({ favorites: user.favorite }); // 찜 목록 반환
  } catch (err) {
    console.error('찜 목록 불러오기 실패:', err);
    res.status(500).json({ message: '서버 오류' });
  }
});

// 회원가입 API
userRouter.post('/signup', async (req, res) => {
  try {
    const { userLoginId, userLoginPw, username, gender, major, studentNumber } = req.body;

    const existingUser = await User.findOne({ userLoginId });
    if (existingUser) {
      return res.status(409).json({ message: '이미 존재하는 아이디입니다.' });
    }

    const newUser = new User({
      userLoginId,
      userLoginPw,
      username,
      gender,
      major,
      studentNumber,
    });

    const savedUser = await newUser.save();

    res.status(201).json({ message: '회원가입 성공', userId: savedUser._id });
  } catch (error) {
    console.error('회원가입 오류:', error);
    res.status(500).json({ message: '서버 오류' });
  }
});

// 로그인 API
userRouter.post('/login', async (req, res) => {
  try {
    const { userLoginId, userLoginPw } = req.body;

    const user = await User.findOne({ userLoginId });
    if (!user || user.userLoginPw !== userLoginPw) {
      return res.status(401).json({ message: '아이디 또는 비밀번호가 틀렸습니다.' });
    }

    req.session.user = {
      userId: user._id,
      userLoginId: user.userLoginId,
      username: user.username,
      gender: user.gender,
      major: user.major,
      studentNumber: user.studentNumber,
    };

    console.log('로그인 성공 - 세션에 저장된 사용자:', req.session.user);

    res.status(200).json({ message: '로그인 성공' });
  } catch (error) {
    console.error('로그인 오류:', error);
    res.status(500).json({ message: '서버 오류' });
  }
});

// 세션 사용자 정보 확인 API
userRouter.get('/me', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: '로그인이 필요합니다.' });
  }

  res.status(200).json(req.session.user);
});

// 세션 외 상세 조회
userRouter.get('/me/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('currentRoom');
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: '유저 정보 불러오기 실패' });
  }
});

// 사용자 개별 조회
userRouter.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: '서버 오류' });
  }
});

// 사용자 정보 수정
userRouter.put('/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: '업데이트 실패' });
  }
});

// 로그아웃
userRouter.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('로그아웃 실패:', err);
      return res.status(500).json({ message: '로그아웃 중 오류가 발생했습니다.' });
    }
    res.clearCookie('connect.sid');
    res.status(200).json({ message: '로그아웃 성공' });
  });
});

export default userRouter;
