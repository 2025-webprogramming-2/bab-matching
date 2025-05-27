import express from 'express';
import User from '../models/user_schema.js';

const userRouter = express.Router();

// 회원가입 API
userRouter.post('/signup', async (req, res) => {
  try {
    const { userLoginId, userLoginPw, username, gender, major, studentNumber } = req.body;

    // 아이디 중복 검사
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


// 로그인 API 추가
userRouter.post('/login', async (req, res) => {
  try {
    const { userLoginId, userLoginPw } = req.body; //프론트에서 보낸 아이디와 비번

    const user = await User.findOne({ userLoginId }); // Mongo DB에서 같은 아이디인 테이블 찾기
    if (!user || user.userLoginPw !== userLoginPw) { // 비밀번호 비교
      return res.status(401).json({ message: '아이디 또는 비밀번호가 틀렸습니다.' });
    }

    res.status(200).json({
      message: '로그인 성공',
      userId: user._id, //쿼리로 넘겨줌
    });
  } catch (error) {
    console.error('로그인 오류:', error);
    res.status(500).json({ message: '서버 오류' });
  }
});

//사용자 정보 가져오기(조회용)
userRouter.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: '서버 오류' });
  }
});

//사용자 정보 수정하기(업데이트용)
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


export default userRouter;
