import React, { useEffect, useState } from 'react';
import axios from 'axios';

import CurrentRoom from '../../components/Main/CurrentRoom';
import RoomList from '../../components/Main/RoomList';
import AddRoom from '../../components/Main/AddRoom';

import styles from './Main.module.css';
import EnterModal from '../../components/Main/EnterModal';

function Main() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/store'); // 포트 확인!
        console.log('응답 데이터:', res.data);

        setStores(res.data);
      } catch (error) {
        console.error('가게 데이터 불러오기 실패:', error);
      }
    };

    fetchStores();
  }, []);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.bodyContainer}>
          <div className={styles.leftContainer}>
            <AddRoom />
            <CurrentRoom />
          </div>
          <RoomList />
        </div>
      </div>
      {/* <EnterModal /> */}
    </>
  );
}

export default Main;
