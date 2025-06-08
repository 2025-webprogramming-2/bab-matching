import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useUserStore from '../../store/useUserStore';
import { useNavigate } from 'react-router-dom';
import styles from './CurrentRoom.module.css';

function CurrentRoom() {
  const { user } = useUserStore();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.userId) return; // user가 없으면 아예 실행 안함

    const fetchUserRooms = async () => {
      try {
        console.log('🔍 userId:', user.userId);

        const res = await axios.get(`http://localhost:4000/api/user/me/${user.userId}`, {
          withCredentials: true,
        });
        console.log('유저 정보 불러옴:', res.data);

        const userData = res.data;

        if (!userData.currentRoom || userData.currentRoom.length === 0) {
          console.log('currentRoom 없음');
          setRooms([]);
        } else {
          const roomRes = await axios.post(
            `http://localhost:4000/api/room/multipleRoom`,
            {
              roomIds: userData.currentRoom,
            },
            {
              withCredentials: true,
            },
          );
          console.log('방 정보 불러옴:', roomRes.data);
          setRooms(roomRes.data);
        }
      } catch (err) {
        console.error('유저 정보 또는 방 정보 불러오기 실패:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRooms();
    const interval = setInterval(fetchUserRooms, 3000);

    return () => clearInterval(interval);
  }, [user?.userId]);

  if (loading) return <div>불러오는 중...</div>;

  return (
    <>
      <h2 className={styles.title}>현재 매칭된 방</h2>
      <div className={styles.wrap}>
        {rooms.length === 0 ? (
          <div className={styles.wrapper}>
            <p>매칭된 방이 없습니다</p>
          </div>
        ) : (
          rooms.map((room) => (
            <div className={styles.wrapper} key={room._id} onClick={() => navigate(`/room/${room._id}`)}>
              <div className={styles.body}>
                <h1>{room.storeId?.name || '가게 이름 없음'}</h1>
                <div>
                  <div className={styles.peopleContainer}>
                    <img className={styles.peopleIcon} src="/assets/people.png" alt="사람 이미지" />
                    <p>{room.currentCount}</p>
                  </div>
                  <h2>
                    {room.time.start}:00 - {room.time.end}:00
                  </h2>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default CurrentRoom;
