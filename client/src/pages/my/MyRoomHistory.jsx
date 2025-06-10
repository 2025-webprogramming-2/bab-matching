import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './MyRoomHistory.module.css'; // ✅ CSS 모듈 import (파일명 주의)

function MyRoomHistory() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    (async () => {
      try {
        const { data: me } = await axios.get(`${API_URL}/api/user/me/full`, { withCredentials: true });

        if (!me.historyRoom?.length) {
          setRooms([]);
          setLoading(false);
          return;
        }

        const { data: roomList } = await axios.post(
          `${API_URL}/api/room/multipleRoom`,
          { roomIds: me.historyRoom },
          { withCredentials: true },
        );

        setRooms(roomList);
      } catch (err) {
        console.error('매칭 기록 불러오기 실패:', err);
        setRooms([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${month}.${day}.`;
  };

  if (loading) return <p className={styles.loading}>로딩 중...</p>;

  return (
    <div className={styles.historyContainer}>
      <h2 className={styles.historyTitle}>🕓 매칭 기록</h2>
      {rooms.length === 0 ? (
        <p className={styles.emptyMessage}>기록이 없습니다.</p>
      ) : (
        <ul className={styles.roomList}>
          {rooms.map((r) => (
            <li key={r._id} className={styles.roomCard}>
              <h1>{r.storeId?.name || '알 수 없음'}</h1>
              <div className={styles.roomBottom}>
                <h2>
                  {formatDate(r.createdAt)} {r.time.start}시
                </h2>
                <div className={styles.peopleContainer}>
                  <img className={styles.peopleIcon} src="/assets/people.png" alt="사람 이미지" />
                  <p>{r.currentCount}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyRoomHistory;
