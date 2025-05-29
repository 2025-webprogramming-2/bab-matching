import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/login/Login';
import Main from '../pages/main/Main';
import StoreMain from '../pages/store/StoreMain';
import StoreMajor from '../pages/store/StoreMajor';
import My from '../pages/my/My';
import MyRoomHistory from '../pages/my/MyRoomHistory';
import MyEdit from '../pages/my/MyEdit';
import Room from '../pages/room/Room';
import SignUp from '../pages/login/Signup';
import NotFound from '../pages/NotFound';
import AddRoom from '../pages/addroom/AddRoom';
import Layout from '../layout/layout.jsx';

const router = createBrowserRouter([
  {
    path: '/', // 로그인은 Layout 없이
    element: <Login />,
  },
  {
    path: '/signUp', // 회원가입도 Layout 없이
    element: <SignUp />,
  },
  {
    path: 'room/:roomId',
    element: <Room />,
  },
  {
    path: 'addroom',
    element: <AddRoom />,
  },
  {
    path: '/',
    element: <Layout />, // 하단바 있는 공통 레이아웃
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
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
