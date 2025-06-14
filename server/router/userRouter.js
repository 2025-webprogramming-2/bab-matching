import express from 'express';
import User from '../models/user_schema.js';
import Room from '../models/room_schema.js';

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

// 찜 목록 조회 API
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

    req.session.save((err) => {
      if (err) {
        console.error('세션 저장 실패:', err);
        return res.status(500).json({ message: '세션 저장 실패' });
      }
      res.status(200).json({ message: '로그인 성공' });
    });
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

userRouter.get('/me/full', async (req, res) => {
  const uid = req.session.user?.userId || req.session.userId;
  if (!uid) return res.status(401).json({ message: '로그인이 필요합니다.' });

  try {
    const user = await User.findById(uid);     // ← DB 전체 문서
    if (!user) return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    res.status(200).json(user);                // historyRoom, currentRoom 등 모두 포함
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '서버 오류' });
  }
});

// 세션 외 상세 조회
userRouter.get('/me/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('currentRoom').populate('historyRoom');
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
userRouter.put('/me', async (req, res) => {
  try {
    const userId = req.session.user?.userId;
    if (!userId) return res.status(401).json({ message: '로그인이 필요합니다.' });

    const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });

    // 세션 정보도 함께 업데이트
    if (updatedUser) {
      req.session.user = {
        userId: updatedUser._id,
        userLoginId: updatedUser.userLoginId,
        username: updatedUser.username,
        gender: updatedUser.gender,
        major: updatedUser.major,
        studentNumber: updatedUser.studentNumber,
      };
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error('세션 사용자 정보 수정 실패:', err);
    res.status(500).json({ message: '업데이트 실패' });
  }
});

// 방 입장
userRouter.post('/enterRoom', async (req, res) => {
  try {
    const userId = req.session.user?.userId;
    if (!userId) return res.status(401).json({ message: '로그인이 필요합니다.' });

    const { roomId } = req.body;
    if (!roomId) return res.status(400).json({ message: 'roomId가 필요합니다.' });

    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ message: '해당 방이 존재하지 않습니다.' });

    let roomModified = false;

    // 중복 방지
    if (!room.currentUserId.includes(userId)) {
      room.currentUserId.push(userId);
      room.currentCount += 1;
      roomModified = true;
    }

    // maxCount와 같으면 isFilled를 true로 설정
    if (room.currentCount >= room.maxCount) {
      room.isFilled = true;
    }

    if (roomModified) {
      await room.save();
    }

    const user = await User.findById(userId);
    if (!user.currentRoom.includes(roomId)) {
      user.currentRoom.push(roomId);
      await user.save();
    }

    res.status(200).json({ message: '방 입장 성공', roomId });
  } catch (err) {
    console.error('방 입장 실패:', err);
    res.status(500).json({ message: '서버 오류' });
  }
});

// 방 목록 - 이미 입장한 방 제외
userRouter.get('/:userId/rooms', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('currentRoom');
    if (!user) return res.status(404).json({ message: '유저 없음' });

    const currentRooms = user.currentRoom.map((roomId) => roomId.toString());
    res.json({ currentRooms });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 오류' });
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
