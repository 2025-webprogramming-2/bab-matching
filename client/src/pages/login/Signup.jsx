import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Signup.module.css';
import { MajorList } from '../../constants/MajorList'; // 추가

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    userLoginId: '',
    userLoginPw: '',
    username: '',
    gender: '',
    major: '',
    studentNumber: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/user/signup', form);
      const userId = response.data.userId;
      alert('회원가입 성공!');
      navigate(`/`);
    } catch (error) {
      alert('회원가입 실패: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>회원가입</h2>

      <input name="userLoginId" placeholder="아이디" onChange={handleChange} className={styles.input} />
      <input name="userLoginPw" placeholder="비밀번호" type="password" onChange={handleChange} className={styles.input} />
      <input name="username" placeholder="이름" onChange={handleChange} className={styles.input} />
      
      <select name="gender" onChange={handleChange} className={styles.input}>
        <option value="">성별 선택</option>
        <option value="남">남</option>
        <option value="여">여</option>
      </select>

      <select
        name="major"
        onChange={handleChange}
        className={styles.input}
        value={form.major}
      >
        <option value="">단과대 선택</option>
        {Object.entries(MajorList).map(([key, value]) => (
          <option key={key} value={key}>
            {value.name}
          </option>
        ))}
      </select>
      <input name="studentNumber" placeholder="학번" type="number" onChange={handleChange} className={styles.input} />

      <button className={styles.signupBtn} onClick={handleSignup}>
        회원가입 하기
      </button>
    </div>
  );
}

export default Signup;
