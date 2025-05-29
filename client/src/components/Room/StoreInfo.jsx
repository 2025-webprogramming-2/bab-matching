import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MajorList } from '../../constants/MajorList';
import { MajorNameToKey } from '../../constants/MajorNameToKey';

import styles from './StoreInfo.module.css';

function StoreInfo({ roomId }) {
  const [roomData, setRoomData] = useState(null);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/room/${roomId}`, {
          withCredentials: true,
        });
        setRoomData(res.data);
      } catch (err) {
        console.error('방 정보 가져오기 실패:', err);
      }
    };

    fetchRoom();
  }, [roomId]);

  if (!roomData) return <div>방 정보 불러오는 중...</div>;

  const store = roomData.storeId;
  const majorKey = MajorNameToKey[store.college];
  const majorColor = MajorList[majorKey]?.color || '#000';
  const majorDisplayName = store.college;

  return (
    <div className={styles.wrapper}>
      <div className={styles.storeCard}>
        <img src={store.img} alt={store.name} className={styles.storeImg} />
        <div className={styles.body}>
          <h1>{store.name}</h1>
          <h2>
            {roomData.time.start}:00 - {roomData.time.end}:00
          </h2>
        </div>
      </div>
      <div className={styles.benefitsContainer}>
        <div className={styles.majorContanier}>
          <div className={styles.majorName} style={{ background: majorColor }}>
            {majorDisplayName}
          </div>
          {store.benefits.map((benefit, index) => (
            <p key={index}>{benefit}</p>
          ))}
        </div>
        <h3>※ 모바일 학생증 또는 실물 학생증으로 인증 가능합니다.</h3>
      </div>
    </div>
  );
}

export default StoreInfo;
