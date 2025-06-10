import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './TopBar.css';

function TopBar() {
  const navigate = useNavigate();
  const location = useLocation();

  // 경로에 따라 타이틀 변경
  let title = '';
  if (location.pathname.startsWith('/addroom')) {
    title = '방 만들기';
  } else if (location.pathname.startsWith('/room')) {
    title = '매칭 방';
  } else if (location.pathname.startsWith('/my/history')) {
    title = '매칭 기록';
  }

  return (
    <div className="top-bar">
      <div className="back-button" onClick={() => navigate(-1)}>
        <div className="arrow-left" />
      </div>
      <div className="top-bar-title">{title}</div>
    </div>
  );
}

export default TopBar;
