// MyEdit.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './MyEdit.module.css';
import { MajorList } from '../../constants/MajorList';

function MyEdit() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    gender: '',
    major: '',
    studentNumber: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`http://localhost:4000/api/user/me`, {
        withCredentials: true // 세션 쿠키 전송
      });
      setForm(res.data);
    };
    fetchUser();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    try {
      await axios.put('http://localhost:4000/api/user/me', form, {
        withCredentials: true,
      });
      alert('수정 완료!');
    } catch (err) {
      console.error('handleSave 오류:', err);
      alert('저장 실패: ' + (err.response?.data?.message || '서버 오류'));
    }
  };

  function goToMy() {
    navigate(`/my`);
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <button className={styles.closeButton} onClick={goToMy}>✕</button>
        <h2 className={styles.title}>프로필 수정</h2>
        <button className={styles.saveButton} onClick={handleSave}>Save</button>
      </div>

      {/* Profile Photo */}
      <div className={styles.imageWrapper}>
        <img
          src="/assets/숭늉마.png" // 실제 이미지 경로로 수정
          alt="Profile"
          className={styles.image}
        />
      </div>
      <div className={styles.center}>
      </div>

      {/* Input Fields */}
      <div className={styles.formGroup}>
        <label className={styles.label}>이름</label>
        <input type="text" name="username" value={form.username} onChange={handleChange} placeholder="이름을 입력하세요" className={styles.input} />

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
      </div>

    </div>
  );
}

export default MyEdit;
