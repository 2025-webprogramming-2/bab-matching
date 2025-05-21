import React from 'react';
import axios from 'axios';
import styles from './RoomList.module.css';

function RoomList() {
  return (
    <>
      <div className={styles.wrapper}>
        <h2>실시간 매칭 방</h2>
        <div className={styles.roomWrapper}>
          <div className={styles.roomContainer}>
            <div className={styles.top}>
              <h1>먹돼지</h1>
              <h2>12:00 - 13:00</h2>
            </div>

            <div className={styles.bottom}>
              <div className={styles.filter}>
                <h1>경제통상대학</h1>
                <h2>여자</h2>
              </div>
              <div className={styles.peopleContainer}>
                <img className={styles.peopleIcon} src="/assets/people.png" alt="사람 이미지" />
                <p>1 / 4</p>
              </div>
            </div>
          </div>

          <div className={styles.roomContainer}>
            <div className={styles.top}>
              <h1>먹돼지</h1>
              <h2>12:00 - 13:00</h2>
            </div>

            <div className={styles.bottom}>
              <div className={styles.filter}>
                <h1>경제통상대학</h1>
                <h2>여자</h2>
              </div>
              <div className={styles.peopleContainer}>
                <img className={styles.peopleIcon} src="/assets/people.png" alt="사람 이미지" />
                <p>1 / 4</p>
              </div>
            </div>
          </div>

          <div className={styles.roomContainer}>
            <div className={styles.top}>
              <h1>먹돼지</h1>
              <h2>12:00 - 13:00</h2>
            </div>

            <div className={styles.bottom}>
              <div className={styles.filter}>
                <h1>경제통상대학</h1>
                <h2>여자</h2>
              </div>
              <div className={styles.peopleContainer}>
                <img className={styles.peopleIcon} src="/assets/people.png" alt="사람 이미지" />
                <p>1 / 4</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RoomList;
