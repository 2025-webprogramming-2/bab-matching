// src/router/router.jsx
import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/login/Login';
import SignUp from '../pages/login/Signup';
import Main from '../pages/main/Main';
import StoreMain from '../pages/store/StoreMain';
import StoreMajor from '../pages/store/StoreMajor';
import My from '../pages/my/My';
import MyRoomHistory from '../pages/my/MyRoomHistory';
import MyEdit from '../pages/my/MyEdit';
import Room from '../pages/room/Room';
import AddRoom from '../pages/addroom/AddRoom';
import NotFound from '../pages/NotFound';
import Layout from '../layout/layout'; // ✅ 대소문자 정확히 확인!

const router = createBrowserRouter([
  // ✅ 로그인/회원가입은 Layout 없이
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/signUp',
    element: <SignUp />,
  },

  // ✅ Layout이 적용되는 모든 경로
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'main',
        element: <Main />,
      },
      {
        path: 'store',
        element: <StoreMain />,
      },
      {
        path: 'store/:collegeId',
        element: <StoreMajor />,
      },
      {
        path: 'my',
        element: <My />,
      },
      {
        path: 'my/edit',
        element: <MyEdit />,
      },
      {
        path: 'addroom',
        element: <AddRoom />, // ✅ 이제 상단바 작동함
      },
      {
        path: 'room/:roomId',
        element: <Room />, // ✅ 이제 상단바 작동함
      },
    ],
  },

  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
