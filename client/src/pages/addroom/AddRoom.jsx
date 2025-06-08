import React from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom'; 
import AddRoomMain from '../../components/AddRoom/AddRoomMain';

function AddRoom() {
  const location = useLocation();
  const store = location.state?.store; //  store 정보 받기

  return (
    <>
      {/* store 정보가 있다면 props로 전달 */}
      <AddRoomMain store={store} />
    </>
  );
}

export default AddRoom;
