// MyEdit.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function MyEdit() {
  const userId = new URLSearchParams(useLocation().search).get('userId');
  const [form, setForm] = useState({
    username: '',
    gender: '',
    major: '',
    studentNumber: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`http://localhost:4000/api/user/${userId}`);
      setForm(res.data);
    };
    fetchUser();
  }, [userId]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    await axios.put(`http://localhost:4000/api/user/${userId}`, form);
    alert('수정 완료!');
  };

  return (
    <div>
      <h2>정보 수정</h2>
      <input name="username" value={form.username} onChange={handleChange} placeholder="이름"/>
      <input name="major" value={form.major} onChange={handleChange} placeholder="전공"/>
      <input name="studentNumber" value={form.studentNumber} onChange={handleChange} placeholder="학번"/>
      <select name="gender" value={form.gender} onChange={handleChange}>
        <option value="">성별 선택</option>
        <option value="남">남</option>
        <option value="여">여</option>
      </select>
      <button onClick={handleSave}>저장</button>
    </div>
  );
}

export default MyEdit;
