import React from 'react';
import axios from 'axios';
import styles from './CurrentRoom.module.css';

function CurrentRoom() {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.body}>
          <h1>먹돼지</h1>
          <h2>12:00 - 13:00</h2>
        </div>
      </div>
    </>
  );
}

export default CurrentRoom;
