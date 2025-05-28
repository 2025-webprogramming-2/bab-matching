import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useUserStore from '../../store/useUserStore';
import styles from './CurrentRoom.module.css';

function CurrentRoom() {
  const { userId } = useUserStore();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRooms = async () => {
      if (!userId) return;

      try {
        const res = await axios.get(`http://localhost:4000/api/user/me/${userId}`);
        const user = res.data;

        if (!user.currentRoom || user.currentRoom.length === 0) {
          setRooms([]);
        } else {
          const roomRes = await axios.post(`http://localhost:4000/api/room/multipleRoom`, {
            roomIds: user.currentRoom,
          });
          setRooms(roomRes.data);
        }
      } catch (err) {
        console.error('유저 정보 또는 방 정보 불러오기 실패:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRooms();
  }, [userId]);

  if (loading) return <div>불러오는 중...</div>;

  return (
    <div className={styles.wrapper}>
      {rooms.length === 0 ? (
        <p>참여 중인 방이 없습니다</p>
      ) : (
        rooms.map((room) => (
          <div className={styles.body} key={room._id}>
            <h1>{room.storeId?.name || '가게 이름 없음'}</h1>
            <h2>
              {room.time.start}:00 - {room.time.end}:00
            </h2>
          </div>
        ))
      )}
    </div>
  );
}

export default CurrentRoom;
