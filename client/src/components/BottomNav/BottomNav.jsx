// src/components/BottomNav.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./BottomNav.css"; // 스타일은 따로 분리

function BottomNav() {
  const navigate = useNavigate();

  return (
    <nav className="bottom-nav">
      <button onClick={() => navigate("/")}>홈</button>
      <button onClick={() => navigate("/store")}>가게</button>
      <button onClick={() => navigate("/my")}>마이페이지</button>
    </nav>
  );
}

export default BottomNav;
