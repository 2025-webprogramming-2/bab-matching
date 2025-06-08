import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MajorList } from '../../constants/MajorList';
import useUserStore from '../../store/useUserStore';
import styles from './RoomList.module.css';

function RoomList() {
  const [rooms, setRooms] = useState([]);
  const [filterType, setFilterType] = useState('all');

  const { user, loading } = useUserStore();

  const fetchRooms = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/room/roomList', {
        withCredentials: true,
      });

      const now = new Date();
      const todayStr = now.toISOString().slice(0, 10);
      const currentHour = now.getHours();

      let filteredRooms = res.data.filter((room) => {
        const createdDate = new Date(room.createdAt).toISOString().slice(0, 10);
        const isToday = createdDate === todayStr;
        const isBeforeEndTime = room.time.end > currentHour;
        return isToday && isBeforeEndTime;
      });

      // 내 조건 필터링
      if (filterType === 'mine' && user) {
        const convertedGender = user.gender === '남' ? 'male' : 'female';
        filteredRooms = filteredRooms.filter((room) => {
          const matchMajor = !room.filter?.major || room.filter.major === user.major;
          const matchGender = !room.filter?.gender || room.filter.gender === convertedGender;
          return matchMajor && matchGender;
        });
      }

      setRooms(filteredRooms);
    } catch (err) {
      console.error('방 목록 불러오기 실패:', err);
    }
  };

  useEffect(() => {
    if (!loading) {
      fetchRooms();
    }
  }, [filterType, loading]);

  if (loading) return <div>유저 정보 불러오는 중...</div>;

  return (
    <div className={styles.wrapper}>
      <h2>실시간 매칭 방</h2>

      <div className={styles.btnContainer}>
        <p
          className={filterType === 'all' ? styles.btnActive : styles.btnDeactive}
          onClick={() => setFilterType('all')}
        >
          전체
        </p>
        |
        <p
          className={filterType === 'mine' ? styles.btnActive : styles.btnDeactive}
          onClick={() => setFilterType('mine')}
        >
          내 조건만 보기
        </p>
      </div>

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
              |
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
