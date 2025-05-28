import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MajorList } from '../../constants/MajorList';
import styles from './RoomList.module.css';

function RoomList() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/room/roomList');
        setRooms(res.data);
      } catch (err) {
        console.error('방 목록 불러오기 실패:', err);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className={styles.wrapper}>
      <h2>실시간 매칭 방</h2>
      <div className={styles.roomWrapper}>
        {rooms.map((room) => (
          <div className={styles.roomContainer} key={room._id}>
            <div className={styles.top}>
              <h1>{room.storeId?.name}</h1>
              <h2>
                {room.time.start}:00 - {room.time.end}:00
              </h2>
            </div>

            <div className={styles.bottom}>
              <div className={styles.filter}>
                {room.filter?.major && (
                  <h1
                    style={{
                      background: MajorList[room.filter.major]?.color || '#000',
                    }}
                  >
                    {MajorList[room.filter.major]?.name}
                  </h1>
                )}
                {room.filter?.gender && (
                  <h2
                    style={{
                      background: room.filter.gender === 'male' ? '#97BFFF' : undefined,
                    }}
                  >
                    {room.filter.gender === 'male' ? '남자' : room.filter.gender === 'female' ? '여자' : ''}
                  </h2>
                )}
              </div>

              <div className={styles.peopleContainer}>
                <img className={styles.peopleIcon} src="/assets/people.png" alt="사람 이미지" />
                <p>
                  {room.currentUserId.length} / {room.maxCount}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoomList;
