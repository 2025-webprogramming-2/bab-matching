import React from 'react';
import axios from 'axios';
import StoreInfo from '../../components/Room/StoreInfo';
import Chat from '../../components/Room/Chat';
import { useParams } from 'react-router-dom';

function Room() {
  const { roomId } = useParams();
  console.log('roomId:', roomId);
  return (
    <>
      <StoreInfo roomId={roomId} />
      <Chat roomId={roomId} />
    </>
  );
}

export default Room;
