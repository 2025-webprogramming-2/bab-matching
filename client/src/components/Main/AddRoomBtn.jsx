import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import styles from './AddRoomBtn.module.css';

function AddRoomBtn() {
  const navigate = useNavigate();

  const handleAddRoom = () => {
    navigate('/addroom');
  };
  return (
    <>
      <div className={styles.wrapper}>
        <img className={styles.logoIcon} src="/assets/logo.png" alt="로고" />

        <div className={styles.container} onClick={handleAddRoom}>
          <div>
            <img className={styles.plusIcon} src="/assets/plus.png" alt="플러스아이콘" />
          </div>
        </div>
      </div>
    </>
  );
}

export default AddRoomBtn;
