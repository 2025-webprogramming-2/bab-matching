// src/layout/Layout.jsx
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import BottomNav from "../components/BottomNav/BottomNav";
import "../components/BottomNav/BottomNav.css";

function Layout() {
  const location = useLocation();

  // 하단바 제외할 경로
  const hideBottomNavRoutes = ["/addroom", "/room"];

  // 현재 경로가 제외 대상인지 확인
  const shouldHideBottomNav = hideBottomNavRoutes.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <div className="layout-container">
      <Outlet />
      {!shouldHideBottomNav && <BottomNav />}
    </div>
  );
}

export default Layout;
