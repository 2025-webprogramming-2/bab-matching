import { Outlet } from 'react-router-dom';
import { UserInfoContextProvider } from './store/UserInfoStore';

function App() {
  return (
    <>
      <UserInfoContextProvider>
        <Outlet />
      </UserInfoContextProvider>
    </>
  );
}

export default App;
