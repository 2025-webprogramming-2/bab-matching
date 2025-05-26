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
import NotFound from '../pages/notFound';
import AddRoom from '../components/Main/AddRoom';

const router = createBrowserRouter([
  {
    // 온보딩 페이지 - 로그인
    path: '/',
    element: <Login />,
  },
  {
    // 회원가입 페이지
    path: '/signUp',
    element: <SignUp />,
  },

  {
    // 메인 페이지
    path: '/main',
    element: <Main />,
  },

  {
    // 식당 메인 페이지 - 단과대 목록
    path: '/store',
    element: <StoreMain />,
  },
  {
  path: '/store/:collegeId',
  element: <StoreMajor />,
  },




  {
    // 방 생성 페이지
    path: '/addroom',
    element: <AddRoom />,
  },
  {
    // 마이페이지
    path: '/my',
    element: <My />,
    children: [
      {
        // 마이페이지 - 매칭 히스토리
        index: true,
        element: <MyRoomHistory />,
      },
    ],
  },

  {
    //내 정보수정 페이지
    path: '/my/edit',
    element: <MyEdit />,
  },

  {
    // 매칭룸 페이지 - 채팅
    path: '/room',
    element: <Room />,
  },

  {
    // 에러 페이지
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
