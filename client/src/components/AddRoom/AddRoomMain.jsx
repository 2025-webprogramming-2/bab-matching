import React, { useState } from 'react';
import useUserStore from '../../store/useUserStore';
import { MajorList } from '../../constants/MajorList';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import styles from './AddRoomMain.module.css';

function AddRoomMain() {
  const [selectedRestaurant, setSelectedRestaurant] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [college, setCollege] = useState('');
  const [gender, setGender] = useState('');
  const [selectedPeople, setSelectedPeople] = useState(null);
  const isFormValid = selectedRestaurant && startTime && endTime && selectedPeople; // 버튼 활성화 조건
  const navigate = useNavigate();

  // 현재 시간 기준 이후의 시간 옵션 생성
  const getAvailableHours = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const hours = [];

    for (let i = 0; i <= 23; i++) {
      if (i > currentHour) {
        hours.push(i);
      }
    }

    return hours;
  };

  // 방 만들기 버튼 클릭
  const handleCreateRoom = async () => {
    if (!isFormValid) return;

    try {
      const response = await axios.post('http://localhost:4000/api/room/addRoom', {
        currentUserId: [user.userId],
        storeId: selectedRestaurant,
        time: {
          start: parseInt(startTime),
          end: parseInt(endTime),
        },
        maxCount: selectedPeople,
        filter: {
          gender: gender || null,
          major: college || null,
        },
      });

      alert('방이 성공적으로 생성되었습니다!');
      console.log(response.data);
      navigate('/main');
    } catch (error) {
      console.error('방 생성 실패:', error);
      alert('방 생성 중 오류가 발생했습니다.');
    }
  };

  const availableHours = getAvailableHours();
  const { user, loading } = useUserStore();
  console.log('user 전체:', user);
  if (loading) return <div>유저 정보 불러오는 중...</div>;
  if (!user) return <div>로그인 정보가 없습니다</div>;
  return (
    <>
      <div className={styles.wrapper}>
        <div>
          <div className={styles.mustSection}>
            <div className={styles.selectContainer}>
              <p className={styles.selectTitle}>식당 이름</p>
              <select
                className={`${styles.selectBtn} ${styles.storeName}`}
                //   식당 목록 받아오기

                value={selectedRestaurant}
                onChange={(e) => setSelectedRestaurant(e.target.value)}
              >
                <option value="">선택하기</option>
                <option value="1">1번 식당</option>
                <option value="2">2번 식당</option>
              </select>
            </div>

            <div className={styles.selectContainer}>
              <p className={styles.selectTitle}>시간</p>
              <div className={styles.timeContainer}>
                <select
                  className={`${styles.selectBtn} ${styles.time}`}
                  value={startTime}
                  onChange={(e) => {
                    setStartTime(e.target.value);
                    if (parseInt(e.target.value) >= parseInt(endTime)) {
                      setEndTime('');
                    }
                  }}
                >
                  <option value="">시작 시간</option>
                  {availableHours.map((hour) => (
                    <option key={hour} value={hour}>
                      {hour}시
                    </option>
                  ))}
                </select>{' '}
                ~{' '}
                <select
                  className={`${styles.selectBtn} ${styles.time}`}
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  disabled={!startTime}
                >
                  <option value="">종료 시간</option>
                  {availableHours
                    .filter((hour) => parseInt(hour) > parseInt(startTime))
                    .map((hour) => (
                      <option key={hour} value={hour}>
                        {hour}시
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div className={styles.selectContainer}>
              <p className={styles.selectTitle}>인원수</p>
              <div className={styles.peopleContainer}>
                {[2, 3, 4, 5, 6].map((num) => (
                  <div
                    key={num}
                    className={`${styles.peopleBtn} ${
                      selectedPeople === num ? styles.peopleBtnActive : styles.peopleBtnDeactive
                    }`}
                    onClick={() => setSelectedPeople(num)}
                  >
                    {num}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.optionContainer}>
            <h1>
              필터링<span className={styles.orangeText}>(선택)</span>
            </h1>
            <div className={styles.filterContainer}>
              <div className={styles.selectContainer}>
                <p className={styles.selectTitle}>단과대</p>
                <select className={styles.selectBtn} value={college} onChange={(e) => setCollege(e.target.value)}>
                  <option
                    value=""
                    //   단과대 목록 받아오기
                  >
                    선택하기
                  </option>
                  {Object.entries(MajorList).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.selectContainer}>
                <p className={styles.selectTitle}>성별</p>
                <select className={styles.selectBtn} value={gender} onChange={(e) => setGender(e.target.value)}>
                  <option value="">선택하기</option>
                  <option value="male">남자만</option>
                  <option value="female">여자만</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.btnContainer}>
          <button
            className={`${styles.submitBtn} ${isFormValid ? styles.submitBtnActive : styles.submitBtnDeactive}`}
            onClick={handleCreateRoom}
            disabled={!isFormValid}
          >
            방 만들기
          </button>
        </div>
      </div>
    </>
  );
}

export default AddRoomMain;
