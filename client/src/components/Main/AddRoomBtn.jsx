import React from 'react';
import axios from 'axios';
import styles from './AddRoomBtn.module.css';

function AddRoomBtn() {
  return (
    <>
      <div className={styles.wrapper}>
        <div>
          <img className={styles.plusIcon} src="/assets/plus.png" alt="플러스아이콘" />
        </div>
      </div>
    </>
  );
}

export default AddRoomBtn;
