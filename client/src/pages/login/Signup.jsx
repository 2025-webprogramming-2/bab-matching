import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './Signup.module.css';
import { MajorList } from '../../constants/MajorList';

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
    const { name, value } = e.target;

    // 학번은 숫자만 허용, 최대 2자리
    if (name === 'studentNumber') {
      const cleaned = value.replace(/\D/g, '').slice(0, 2);
      setForm({ ...form, [name]: cleaned });
    } else {
      setForm({ ...form, [name]: value });
    }
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

      <input
        name="userLoginId"
        placeholder="아이디"
        onChange={handleChange}
        className={styles.input}
      />
      <input
        name="userLoginPw"
        placeholder="비밀번호"
        type="password"
        onChange={handleChange}
        className={styles.input}
      />
      <input
        name="username"
        placeholder="이름"
        onChange={handleChange}
        className={styles.input}
      />

      {/* ▶︎ 성별 (토글 라디오) */}
      <div className={styles.field}>
        <div className={styles.genderGroup}>
          {['남', '여'].map((g) => (
            <label
              key={g}
              className={`${styles.genderOption} ${form.gender === g ? styles.checked : ''}`}
            >
              <input
                type="radio"
                name="gender"
                value={g}
                checked={form.gender === g}
                onChange={handleChange}
              />
              <span className={styles.genderText}>{g}</span>
              <span className={styles.circle} />
            </label>
          ))}
        </div>
      </div>

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

      <input
        name="studentNumber"
        placeholder="학번"
        type="text"
        inputMode="numeric"
        pattern="\d*"
        value={form.studentNumber}
        onChange={handleChange}
        className={`${styles.input} ${styles.studentNumberInput}`}
      />

      <button className={styles.signupBtn} onClick={handleSignup}>
        회원가입 하기
      </button>
    </div>
  );
}

export default Signup;
