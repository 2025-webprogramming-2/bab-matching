import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MajorList } from '../../constants/MajorList';
import { MajorNameToKey } from '../../constants/MajorNameToKey';
import { useNavigate } from 'react-router-dom';

import styles from './EnterModal.module.css';

function EnterModal({ roomId, onClose }) {
  const [roomData, setRoomData] = useState(null);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchRoomDetail = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/room/${roomId}`, {
          withCredentials: true,
        });
        setRoomData(res.data);
      } catch (err) {
        console.error('방 상세 정보 불러오기 실패:', err);
      }
    };

    fetchRoomDetail();
  }, [roomId]);

  // 방 입장 버튼
  const handleEnter = async () => {
    try {
      await axios.post(
        `${API_URL}/api/user/enterRoom`,
        {
          roomId,
        },
        { withCredentials: true },
      );

      alert('매칭 빙에 입장했습니다!');
      onClose();
      navigate(`/room/${roomId}`);
    } catch (err) {
      console.error('입장 실패:', err);
      alert('입장에 실패했습니다.');
    }
  };

  if (!roomData) return null;

  const store = roomData.storeId;
  const time = roomData.time;

  const majorKey = MajorNameToKey[store.college];
  const majorColor = MajorList[majorKey]?.color || '#000';
  const majorDisplayName = store.college;

  return (
    <div className={styles.overlay}>
      <div className={styles.modalContainer}>
        <h1>매칭 방에 입장하시겠습니까?</h1>

        <div className={styles.currentWrapper}>
          <div className={styles.body}>
            <h1>{store.name}</h1>
            <h2>
              {time.start}:00 - {time.end}:00
            </h2>
          </div>
        </div>

        <div className={styles.benefitsContainer}>
          {/* <h3>혜택 정보</h3> */}
          <div className={styles.majorContanier}>
            <div className={styles.majorName} style={{ background: majorColor }}>
              {majorDisplayName}
            </div>
            {store.benefits && store.benefits.length > 0 ? (
              store.benefits.map((benefit, index) => <p key={index}>{benefit}</p>)
            ) : (
              <p>혜택 정보가 없습니다.</p>
            )}
          </div>
        </div>

        <div className={styles.btnContainer}>
          <button className={styles.exBtn} onClick={onClose}>
            나가기
          </button>
          <button className={styles.entBtn} onClick={handleEnter}>
            입장하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default EnterModal;
