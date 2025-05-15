import React from 'react';
import axios from 'axios';
import styles from './RoomList.module.css';

function RoomList() {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.roomContianer}>
          <div className={styles.top}>
            <h1>먹돼지</h1>
            <h2>12:00 - 13:00</h2>
          </div>

          <div className={styles.filter}>
            <h1>공과대학</h1>
            <h2>여자</h2>
          </div>
        </div>
      </div>
    </>
  );
}

export default RoomList;
