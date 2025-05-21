import React from 'react';
import axios from 'axios';
import styles from './EnterModal.module.css';

function EnterModal() {
  return (
    <>
      <div className={styles.overlay}>
        <div className={styles.modalContainer}>
          <h1>매칭 방에 입장하시겠습니까?</h1>
          <div className={styles.currentWrapper}>
            <div className={styles.body}>
              <h1>먹돼지</h1>
              <h2>12:00 - 13:00</h2>
            </div>
          </div>
          <div className={styles.benefitsContainer}>
            <h3>혜택 정보</h3>
            <div className={styles.majorContanier}>
              <div className={styles.majorName}>공과대학</div>
              <p>4인분 이상 주문 시 음료수 서비스</p>
            </div>
          </div>
          <div className={styles.btnContainer}>
            <button className={styles.exBtn}>나가기</button>
            <button className={styles.entBtn}>입장하기</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default EnterModal;
