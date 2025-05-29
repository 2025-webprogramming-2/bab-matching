// src/components/BottomNav/BottomNav.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./BottomNav.css";

function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="bottom-nav">
      <button
        onClick={() => navigate("/store")}
        className={location.pathname.startsWith("/store") ? "active" : ""}
      >
        <img src="assets/storeimage.png " alt="가게" className="nav-icon" />
      </button>
      <button
        onClick={() => navigate("/main")}
        className={location.pathname === "/main" ? "active" : ""}
      >
        <img src="assets/homeimage.png " alt="홈" className="nav-icon" />
      </button>
      <button
        onClick={() => navigate("/my")}
        className={location.pathname.startsWith("/my") ? "active" : ""}
      >
        <img src="assets/myimage.png " alt="마이페이지" className="nav-icon" />
      </button>
    </nav>
  );
}

export default BottomNav;
