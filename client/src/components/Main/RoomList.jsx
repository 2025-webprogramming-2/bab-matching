import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MajorList } from '../../constants/MajorList';
import useUserStore from '../../store/useUserStore';
import EnterModal from './EnterModal';
import styles from './RoomList.module.css';

function RoomList() {
  const [rooms, setRooms] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [userRooms, setUserRooms] = useState([]); // 유저가 들어가 있는 방 ID 리스트

  const { user, loading } = useUserStore();

  const API_URL = import.meta.env.VITE_API_URL;

  // 유저가 들어간 방 리스트 받아오기
  useEffect(() => {
    if (!loading && user) {
      axios
        .get(`${API_URL}/api/user/${user.userId}/rooms`, { withCredentials: true })
        .then((res) => {
          setUserRooms(res.data.currentRooms || []);
        })
        .catch((err) => {
          console.error('유저 방 목록 불러오기 실패:', err);
          setUserRooms([]); // 실패 시 빈 배열
        });
    }
  }, [user, loading]);

  const fetchRooms = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/room/roomList`, {
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

      // 유저가 들어가 있는 방 제외
      if (userRooms.length > 0) {
        filteredRooms = filteredRooms.filter((room) => !userRooms.includes(room._id.toString()));
      }

      // '내 조건만 보기' 필터 적용
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
      const interval = setInterval(fetchRooms, 3000);

      return () => clearInterval(interval);
    }
  }, [filterType, loading, userRooms]); // userRooms 바뀌면 재호출

  const checkRoomEligibility = (room) => {
    if (!user) return false;

    const convertedGender = user.gender === '남' ? 'male' : 'female';
    const matchMajor = !room.filter?.major || room.filter.major === user.major;
    const matchGender = !room.filter?.gender || room.filter.gender === convertedGender;

    return matchMajor && matchGender;
  };

  const handleRoomClick = (room) => {
    if (checkRoomEligibility(room)) {
      setSelectedRoom(room);
      setModalOpen(true);
    } else {
      alert('입장할 수 없는 방입니다.');
    }
  };

  if (loading) return <div>유저 정보 불러오는 중...</div>;

  return (
    <>
      <div className={styles.btnContainer}>
        <h1 className={styles.title}>실시간 매칭 방</h1>
        <div>
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
      </div>
      <div className={styles.wrapper}>
        <div className={styles.roomWrapper}>
          {rooms.map((room) => (
            <div className={styles.roomContainer} key={room._id} onClick={() => handleRoomClick(room)}>
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
                    {room.currentCount} / {room.maxCount}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {modalOpen && selectedRoom && <EnterModal roomId={selectedRoom._id} onClose={() => setModalOpen(false)} />}
      </div>
    </>
  );
}

export default RoomList;
