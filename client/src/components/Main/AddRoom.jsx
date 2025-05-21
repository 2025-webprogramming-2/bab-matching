import React from 'react';
import axios from 'axios';
import styles from './AddRoom.module.css';

function AddRoom() {
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

export default AddRoom;
