import React from 'react';
import axios from 'axios';
import styles from './StoreInfo.module.css';

function StoreInfo() {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.storeCard}>
          <div className={styles.storeImg}></div>
          <div className={styles.body}>
            <h1>먹돼지</h1>
            <h2>12:00 - 13:00</h2>
          </div>
        </div>
        <div className={styles.benefitsContainer}>
          <div className={styles.majorContanier}>
            <div className={styles.majorName}>공과대학</div>
            <p>4인분 이상 주문 시 음료수 서비스</p>
          </div>
          <div className={styles.majorContanier}>
            <div className={styles.majorName}>경제통상대학</div>
            <p>4인분 이상 주문 시 음료수 서비스</p>
          </div>
          <h3>※ 모바일 학생증 또는 실물 학생증으로 인증 가능합니다.</h3>
        </div>
      </div>
    </>
  );
}

export default StoreInfo;
