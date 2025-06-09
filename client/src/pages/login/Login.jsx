import React, { useState, useEffect } from 'react'; // useState: 입력창에 입력한 값을 기억하기 위해 사용되는 "상태저장도구"
import axios from 'axios';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../store/useUserStore';

function Login() {
  const navigate = useNavigate(); // 페이지 이동 도구
  const API_URL = import.meta.env.VITE_API_URL;

  //입력창에서 유저가 입력한 ID와 PW를 저장
  //userLoginId: 아이디 입력값을 저장
  //setUserLoginId: 아이디 값을 변경하는 함수
  const [userLoginId, setUserLoginId] = useState('');
  const [userLoginPw, setUserLoginPw] = useState('');

  const { setUser } = useUserStore();

  //이미 로그인된 상태인지 확인
  useEffect(() => {
    const checkSession = async () => {
      try {
        await axios.get(`${API_URL}/api/user/me`, {
          withCredentials: true,
        });
        navigate('/main');
      } catch (err) {
        const status = err?.response?.status;

        if (status === 401) {
        } else {
          console.error('세션 확인 중 에러 발생:', err);
        }
      }
    };
    checkSession();
  }, [navigate]);

  //로그인 요청 함수
  const handleLogin = async () => {
    try {
      await axios.post(
        `${API_URL}/api/user/login`,
        {
          userLoginId,
          userLoginPw,
        },
        {
          withCredentials: true, // 세션 쿠키 포함
        },
      );
      // 로그인 성공 후 유저 정보 불러오기
      const res = await axios.get(`${API_URL}/api/user/me`, {
        withCredentials: true,
      });

      setUser(res.data); // 전역 상태에 저장
      console.log(res.data);
      alert('로그인 성공!');
      navigate('/main');
    } catch (err) {
      alert('로그인 실패: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleSignup = () => {
    navigate('/Signup');
  };

  return (
    <div className={styles.container}>
      <img className={styles.logoIcon} src="/assets/logo.png" alt="로고" />

      {/* 입력값 상태 연결 */}
      <input
        type="text"
        placeholder="id "
        className={styles.input}
        value={userLoginId}
        onChange={(e) => setUserLoginId(e.target.value)}
      />
      <input
        type="password"
        placeholder="password "
        className={styles.input}
        value={userLoginPw}
        onChange={(e) => setUserLoginPw(e.target.value)}
      />
      <button className={styles.loginBtn} onClick={handleLogin}>
        밥먹으러 가기!
      </button>
      <button className={styles.signupBtn} onClick={handleSignup}>
        회원가입 하기
      </button>

      <p className={styles.findAccount}>아이디/비밀번호 찾기</p>
    </div>
  );
}

export default Login;
