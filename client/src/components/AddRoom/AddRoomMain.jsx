import React, { useState, useEffect } from 'react';
import useUserStore from '../../store/useUserStore';
import { MajorList } from '../../constants/MajorList';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './AddRoomMain.module.css';

function AddRoomMain({ store }) {
  const [selectedRestaurant, setSelectedRestaurant] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [college, setCollege] = useState('');
  const [gender, setGender] = useState('');
  const [selectedPeople, setSelectedPeople] = useState(null);
  const [collegeMajor, setCollegeMajor] = useState('');
  const [restaurantList, setRestaurantList] = useState([]);
  const isFormValid = selectedRestaurant && startTime && endTime && selectedPeople;
  const navigate = useNavigate();
  const { user, loading } = useUserStore();

  //  store에서 값이 넘어오면 자동 입력
  useEffect(() => {
    if (store) {
      const matchedMajorKey = Object.entries(MajorList).find(
        ([key, value]) => value.name === store.college
      )?.[0];

      if (matchedMajorKey) {
        setCollegeMajor(matchedMajorKey);          // 드롭다운에서 key값 (예: 'engineering')
        setSelectedRestaurant(store._id);          // 식당 id
      }
    }
  }, [store]);

  //  단과대학 선택 시 가게 리스트 불러오기
  useEffect(() => {
    const fetchStores = async () => {
      if (!collegeMajor) return;

      try {
        const collegeName = MajorList[collegeMajor]?.name;
        const res = await axios.get(`http://localhost:4000/api/store?college=${collegeName}`);
        setRestaurantList(res.data);
      } catch (error) {
        console.error('식당 불러오기 실패:', error);
      }
    };

    fetchStores();
  }, [collegeMajor]);

  //  시간 옵션
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

  //  필터링 선택
  const handleToggleMajor = () => {
    if (college === user.major) {
      setCollege('');
    } else {
      setCollege(user.major);
    }
  };

  const handleToggleGender = () => {
    const convertedGender = user.gender === '남' ? 'male' : 'female';
    if (gender === convertedGender) {
      setGender('');
    } else {
      setGender(convertedGender);
    }
  };

  //  방 만들기 요청
  const handleCreateRoom = async () => {
    if (!isFormValid) return;

    try {
      const response = await axios.post(
        'http://localhost:4000/api/room/addRoom',
        {
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
        },
        {
          withCredentials: true,
        },
      );

      alert('방이 성공적으로 생성되었습니다!');
      navigate('/main');
    } catch (error) {
      console.error('방 생성 실패:', error);
      alert('방 생성 중 오류가 발생했습니다.');
    }
  };

  const availableHours = getAvailableHours();

  if (loading) return <div>유저 정보 불러오는 중...</div>;
  if (!user) return <div>로그인 정보가 없습니다</div>;

  return (
    <div className={styles.wrapper}>
      <div>
        <div className={styles.mustSection}>
          {/* 식당 선택 */}
          <div className={styles.selectContainer}>
            <p className={styles.selectTitle}>식당</p>
            <select
              className={styles.selectBtn}
              value={collegeMajor}
              onChange={(e) => {
                setCollegeMajor(e.target.value);
                setSelectedRestaurant('');
              }}
            >
              <option value="">단과대 </option>
              {Object.entries(MajorList).map(([key, value]) => (
                <option key={key} value={key}>
                  {value.name}
                </option>
              ))}
            </select>

            <select
              className={`${styles.selectBtn} ${styles.storeName}`}
              value={selectedRestaurant}
              onChange={(e) => setSelectedRestaurant(e.target.value)}
              disabled={!restaurantList.length}
            >
              <option value="">단과대 먼저 선택해주세요</option>
              {restaurantList.map((store) => (
                <option key={store._id} value={store._id}>
                  {store.name}
                </option>
              ))}
            </select>
          </div>

          {/* 시간 선택 */}
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
              </select>
              ~
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

          {/* 인원 선택 */}
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

        {/* 필터링 */}
        <div className={styles.optionContainer}>
          <h1>
            매칭 필터링<span className={styles.orangeText}>(선택)</span>
          </h1>
          <div className={styles.filterContainer}>
            <div className={styles.OptionSelectContainer} onClick={handleToggleMajor}>
              <div className={`${styles.btn} ${college === user.major ? styles.btnActive : ''}`}></div>
              <p
                className={`${styles.selectTitle} ${
                  college === user.major ? styles.filterActive : styles.filterDeactive
                }`}
              >
                {MajorList[user.major]?.name}만
              </p>
            </div>

            <div className={styles.OptionSelectContainer} onClick={handleToggleGender}>
              <div
                className={`${styles.btn} ${
                  gender === (user.gender === '남' ? 'male' : 'female') ? styles.btnActive : ''
                }`}
              ></div>

              <p
                className={`${styles.selectTitle} ${
                  gender === (user.gender === '남' ? 'male' : 'female') ? styles.filterActive : styles.filterDeactive
                }`}
              >
                {user.gender}자만
              </p>
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
  );
}

export default AddRoomMain;
