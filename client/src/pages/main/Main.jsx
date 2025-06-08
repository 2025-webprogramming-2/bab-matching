import React, { useEffect, useState } from 'react';
import axios from 'axios';

import CurrentRoom from '../../components/Main/CurrentRoom';
import RoomList from '../../components/Main/RoomList';
import AddRoomBtn from '../../components/Main/AddRoomBtn';

import styles from './Main.module.css';
import EnterModal from '../../components/Main/EnterModal';

function Main() {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.bodyContainer}>
          {/* <div className={styles.leftContainer}> */}
          <AddRoomBtn />
          <CurrentRoom />
          {/* </div> */}
          <RoomList />
        </div>
      </div>
      {/* <EnterModal /> */}
    </>
  );
}

export default Main;
