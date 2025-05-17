import React, { useState } from 'react';
import axios from 'axios';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate();

  const [userLoginId, setUserLoginId] = useState('');
  const [userLoginPw, setUserLoginPw] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:4000/api/user/login', {
        userLoginId,
        userLoginPw,
      });

      const userId = res.data.userId;
      alert('로그인 성공!');
      navigate(`/main?userId=${userId}`);
    } catch (err) {
      alert('로그인 실패: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleSignup = () => {
    navigate('/Signup');
  }

  return (
    <div className={styles.container}>
      <div className={styles.logoText}>밥친구</div>

      {/* 입력값 상태 연결 */}
      <input
        type="text"
        placeholder="id: "
        className={styles.input}
        value={userLoginId}
        onChange={(e) => setUserLoginId(e.target.value)}
      />
      <input
        type="password"
        placeholder="password: "
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
