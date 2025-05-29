import User from "../../models/user_schema.js";

// ⭐ 찜한 가게 토글 API
export const toggleFavorite = async (req, res) => {
  try {
    // 세션 또는 미들웨어로부터 사용자 ID 획득
    const userId = req.session.user?.userId;
    if (!userId) return res.status(401).json({ message: "로그인이 필요합니다." });

    const { storeId } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });

    const index = user.favorite.indexOf(storeId);

    if (index > -1) {
      user.favorite.splice(index, 1); // 찜 해제
    } else {
      user.favorite.push(storeId); // 찜 추가
    }

    await user.save();

    // ✅ 유저 전체 데이터 응답 (ObjectId → string 처리 포함)
    res.json({
      ...user.toObject(),
      _id: user._id.toString(),
    });
  } catch (err) {
    console.error("찜 토글 실패:", err);
    res.status(500).json({ message: "서버 오류" });
  }
};
