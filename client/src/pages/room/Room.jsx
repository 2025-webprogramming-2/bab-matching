import React from 'react';
import axios from 'axios';
import StoreInfo from '../../components/Room/StoreInfo';
import Chat from '../../components/Room/Chat';

function Room() {
  return (
    <>
      <StoreInfo />
      <Chat />
    </>
  );
}

export default Room;
