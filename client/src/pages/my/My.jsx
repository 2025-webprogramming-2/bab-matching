import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function My() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const userId = params.get('userId');

  const [form, setForm] = useState({
    userLoginId: '',
    username: '',
    gender: '',
    major: '',
    studentNumber: '',
  });

  // 사용자 정보 불러오기
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/user/${userId}`);
        setForm(res.data);
      } catch (err) {
        alert('유저 정보를 불러오지 못했습니다.');
      }
    };
    if (userId) fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:4000/api/user/${userId}`, form);
      alert('정보가 수정되었습니다!');
    } catch (err) {
      alert('수정 실패: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>내 정보</h2>
      <input name="userLoginId" value={form.userLoginId} onChange={handleChange} placeholder="아이디" disabled />
      <input name="username" value={form.username} onChange={handleChange} placeholder="이름" />
      <select name="gender" value={form.gender} onChange={handleChange}>
        <option value="">성별 선택</option>
        <option value="남">남</option>
        <option value="여">여</option>
      </select>
      <input name="major" value={form.major} onChange={handleChange} placeholder="전공" />
      <input name="studentNumber" value={form.studentNumber} onChange={handleChange} placeholder="학번" />
      <button onClick={handleSave}>수정하기</button>
    </div>
  );
}

export default My;
