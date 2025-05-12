import Room from "../../models/room_schema.js";

const getCurrentRoom = async (req, res) => {
  try {
    const currentRoomList = await Room.find()
      .populate("currentUserId") // 유저 정보 같이 불러오기
      .populate("storeId"); // 식당 정보 같이 불러오기

    res.status(200).json(currentRoomList);
  } catch (error) {
    console.error("현재 룸 불러오기 오류:", error);
    res.status(500).json({ error: "서버 오류" });
  }
};

const getHistoryRoom = async (req, res) => {
  try {
    const currentRoomList = await Room.find()
      .populate("currentUserId") // 유저 정보 같이 불러오기
      .populate("storeId"); // 식당 정보 같이 불러오기

    res.status(200).json(currentRoomList);
  } catch (error) {
    console.error("매칭 기록 불러오기 오류:", error);
    res.status(500).json({ error: "서버 오류" });
  }
};

const postRoom = async (req, res) => {
  try {
    const currentRoomList = await Room.find()
      .populate("currentUserId") // 유저 정보 같이 불러오기
      .populate("storeId"); // 식당 정보 같이 불러오기

    res.status(200).json(currentRoomList);
  } catch (error) {
    console.error("룸 불러오기 오류:", error);
    res.status(500).json({ error: "서버 오류" });
  }
};

export { getCurrentRoom, getHistoryRoom, postRoom };
