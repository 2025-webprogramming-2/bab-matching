import React from 'react';
import axios from 'axios';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log('로그인 시도');
  };

  const handleSignup = () => {
    navigate('/signup');
  }

  return (
    <div className={styles.container}>
      <div className={styles.logoText}>밥친구</div>

      <input type="text" placeholder="id: " className={styles.input} />
      <input type="password" placeholder="password: " className={styles.input} />

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
