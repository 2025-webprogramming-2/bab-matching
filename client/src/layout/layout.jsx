// src/layout/Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import BottomNav from "../components/BottomNav/BottomNav";
import "../components/BottomNav/BottomNav.css"; // 스타일도 꼭 import

function Layout() {
  return (
    <div className="layout-container">
      <Outlet /> {/* 자식 페이지가 여기에 들어옴 */}
      <BottomNav /> {/* 항상 하단 고정 */}
    </div>
  );
}

export default Layout;
