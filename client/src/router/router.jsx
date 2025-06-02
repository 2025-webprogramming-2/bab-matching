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
import Layout from '../layout/layout'; // 

const router = createBrowserRouter([

  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/signUp',
    element: <SignUp />,
  },

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
        element: <AddRoom />, 
      },
      {
        path: 'room/:roomId',
        element: <Room />, 
      },
    ],
  },

  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
