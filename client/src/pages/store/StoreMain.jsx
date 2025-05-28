import React from 'react';
import styles from './StoreMain.module.css';
import { useNavigate } from 'react-router-dom';

function StoreMain() {
  const navigate = useNavigate();

  const collegeList = [
    { name: '인문대학', id: 'humanities' },
    { name: '공과대학', id: 'engineering' },
    { name: '경영대학', id: 'business' },
    { name: '경제통상대학', id: 'economics' },
    { name: 'IT대학', id: 'it' },
    { name: '자연과학대학', id: 'natsci' },
    { name: '법과대학', id: 'law' },
    { name: '사회과학대학', id: 'social' },
  ];

  const goToMajor = (collegeId) => {
    navigate(`/store/${collegeId}`);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>제휴식당</h1>
      <div className={styles.list}>
        {collegeList.map((college) => (
          <div
            key={college.id}
            className={styles.card}
            onClick={() => goToMajor(college.id)}
          >
            <div className={styles.iconBox}>
              <img
                src={`/${college.id}.jpeg`}
                alt={`${college.name} 아이콘`}
                className={styles.iconImage}
              />
            </div>
            <div className={styles.name}>{college.name}</div>
            <div className={styles.arrow}>▶</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StoreMain;
