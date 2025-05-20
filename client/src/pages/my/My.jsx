// My.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function My() {
  const navigate = useNavigate();
  const userId = new URLSearchParams(useLocation().search).get('userId');

  const [user, setUser] = useState(null);

  // 유저 정보 불러오기
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/user/${userId}`);
        setUser(res.data);
      } catch (err) {
        alert('유저 정보를 불러올 수 없습니다.');
      }
    };

    if (userId) fetchUser();
  }, [userId]);

  const goToEdit = () => {
    navigate(`/my/edit?userId=${userId}`);
  };

  return (
    <div>
      <h2>마이페이지</h2>
      <div style={{ border: '1px solid orange', padding: '20px', borderRadius: '12px' }}>
        <strong>유저 정보</strong>
        <div style={{ marginTop: '10px' }}>
          {user ? (
            <>
              <div>이름: {user.username}</div>
              <div>아이디: {user.userLoginId}</div>
              <div>학번: {user.studentNumber}</div>
              <div>성별: {user.gender}</div>
              <div>전공: {user.major}</div>
            </>
          ) : (
            <p>로딩 중...</p>
          )}
        </div>
      </div>
      <div onClick={goToEdit} style={{ textAlign: 'right', marginTop: '10px', cursor: 'pointer' }}>
        정보 수정하기 &gt;
      </div>
    </div>
  );
}

export default My;
