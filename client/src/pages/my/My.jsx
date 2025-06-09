// My.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import styles from './My.module.css';

function My() {
  const navigate = useNavigate();
  const userId = new URLSearchParams(useLocation().search).get('userId');

  const [user, setUser] = useState(null);

  // 유저 정보 불러오기
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/user/me`, {
          withCredentials: true, //세션 쿠키 전송
        });
        setUser(res.data);
      } catch (err) {
        alert('유저 정보를 불러올 수 없습니다.');
      }
    };

    fetchUser();
  }, []);

  const LogOut = async () => {
    try {
      await axios.post(
        'http://localhost:4000/api/user/logout',
        {},
        {
          withCredentials: true
        }
      );
      navigate('/');
    } catch (err) {
      alert('로그아웃 실패' +(err.response?.data?.message || err.message));
    }
  };

  const goToEdit = () => {
    navigate(`/my/edit`);
  };

  const goTohistory = () => {
    navigate(`/my/history`);
  };

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.title}>프로필</h1>
      </div>
      <div>
        <div className={styles.imageWrapper}>
          <img
            src={user?.profileImage || "/assets/숭늉마.png"} // 실제 이미지 경로로 수정
            alt="Profile"
            className={styles.image}
          />
        </div>        
        <div>
          {user ? (
            <>
              <div className={styles.userName}>{user.username}</div>
              <div className={styles.userInfo}>{user.studentNumber}학번, {user.major}</div>
            </>
          ) : (
            <p>로딩 중...</p>
          )}
        </div>
      </div>
      <div className={styles.accountLayout}>
        <div className={styles.accountText}>계정</div>
      </div>
      <div className={styles.container} onClick={goToEdit}>
        <div className={styles.containerText}>프로필 수정</div>
      </div>
      <div className={styles.container} onClick={goTohistory}>
        <div className={styles.containerText}>매칭 기록</div>
      </div>
      <div className={styles.logoutButton}> 
      <button onClick={LogOut}>
        로그아웃
      </button>
      </div>
    </div>
  );
}

export default My;
