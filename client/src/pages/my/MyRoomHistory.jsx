import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MyRoomHistory() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  /* 1) /user/me 에서 historyRoom ID 배열 가져오기
     2) 그 ID 배열을 /room/multipleRoom 에 넘겨 방 정보 받아오기 */
  useEffect(() => {
    (async () => {
      try {
        /* 세션 쿠키 포함 */
        const { data: me } = await axios.get(
          'http://localhost:4000/api/user/me/full',
          { withCredentials: true }
        );

        if (!me.historyRoom?.length) {
          setRooms([]);
          return;
        }

        const { data: roomList } = await axios.post(
          'http://localhost:4000/api/room/multipleRoom',
          { roomIds: me.historyRoom },
          { withCredentials: true }
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

  if (loading) return <p>로딩 중...</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <h2>🕓 매칭 기록</h2>
      {rooms.length === 0 ? (
        <p>기록이 없습니다.</p>
      ) : (
        <ul>
          {rooms.map((r) => (
            <li key={r._id} style={{ border: '1px solid #ddd', marginBottom: 8, padding: 8 }}>
              <div><strong>식당:</strong> {r.storeId?.name || '알 수 없음'}</div>
              <div><strong>시간:</strong> {r.time.start}시 ~ {r.time.end}시</div>
              <div><strong>인원:</strong> {r.currentUserId.length} / {r.maxCount}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyRoomHistory;
