// src/layout/Layout.jsx
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import TopBar from '../components/TopBar/TopBar';
import BottomNav from '../components/BottomNav/BottomNav';
import '../components/TopBar/TopBar.css';
import '../components/BottomNav/BottomNav.css';

function Layout() {
  const location = useLocation();

  const hideBottomNavRoutes = ['/addroom', '/room'];
  const showTopBarRoutes = ['/addroom', '/room'];

  const shouldHideBottomNav = hideBottomNavRoutes.some((path) => location.pathname.startsWith(path));

  const shouldShowTopBar = showTopBarRoutes.some((path) => location.pathname.startsWith(path));

  return (
    <div
      className="layout-container"
      style={{
        paddingTop: shouldShowTopBar ? '60px' : '0px',
        paddingBottom: shouldHideBottomNav ? '0px' : '60px',
        position: 'relative',
        minHeight: '100vh',
        // backgroundColor: "#fff",
      }}
    >
      {shouldShowTopBar && <TopBar />}
      <Outlet />
      {!shouldHideBottomNav && <BottomNav />}
    </div>
  );
}

export default Layout;
