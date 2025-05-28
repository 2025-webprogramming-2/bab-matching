import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from './StoreMajor.module.css';

function StoreMajor() {
  const { collegeId } = useParams();
  const [stores, setStores] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const majorMap = {
    engineering: '공과대학',
    humanities: '인문대학',
    business: '경영대학',
    economics: '경제통상대학',
    it: 'IT대학',
    social: '사회과학대학',
    law: '법과대학',
    natsci: '자연과학대학'
  };

  const collegeName = majorMap[collegeId];

  // ✅ 찜한 가게 불러오기
  useEffect(() => {
    const fetchUserFavorites = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/user/favorites', {
          withCredentials: true // 쿠키 인증이 필요한 경우
        });
        setFavorites(res.data.favorites); // 서버에서 받은 찜 가게 ID 배열
      } catch (err) {
        console.error('찜 목록 불러오기 실패:', err);
      }
    };

    fetchUserFavorites();
  }, []);

  // ✅ 가게 목록 불러오기
  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/store?college=${collegeName}`);
        setStores(res.data);
      } catch (err) {
        console.error('가게 불러오기 실패:', err);
      }
    };

    fetchStores();
  }, [collegeName]);

  // ⭐ 찜 토글 함수 (아직 서버 연동은 안 된 상태)
const handleToggleFavorite = async (storeId) => {
  try {
    const res = await axios.post(
      'http://localhost:4000/api/user/toggleFavorite',
      { storeId },
      { withCredentials: true } // 세션 인증 필요 시
    );
    setFavorites(res.data.favorites); // 서버에서 받은 최신 찜 리스트로 상태 갱신
  } catch (err) {
    console.error('찜 토글 실패:', err);
  }
};
  // ⭐ 찜 순서 정렬 + 카테고리 필터 적용
  const filteredStores = stores
    .filter((store) => selectedCategory === 'all' || store.type === selectedCategory)
    .sort((a, b) => {
      const aFav = favorites.includes(a._id);
      const bFav = favorites.includes(b._id);
      return aFav === bFav ? 0 : aFav ? -1 : 1;
    });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{collegeName}</h1>

      {/* 카테고리 버튼 */}
      <div className={styles.categoryButtons}>
        {[
          { label: '전체', value: 'all' },
          { label: '음식점', value: 'restaurant' },
          { label: '카페', value: 'cafe' },
          { label: '술집', value: 'pub' }
        ].map((cat) => (
          <button
            key={cat.value}
            className={`${styles.categoryButton} ${selectedCategory === cat.value ? styles.active : ''}`}
            onClick={() => setSelectedCategory(cat.value)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* 가게 리스트 */}
      {filteredStores.length === 0 ? (
        <p className={styles.emptyMessage}>제휴 가게가 없습니다.</p>
      ) : (
        filteredStores.map((store, index) => (
          <div className={styles.card} key={store._id}>
            <img src={store.img} alt={store.name} className={styles.image} />
            <div className={styles.info}>
              <div className={styles.headerRow}>
                <h2 className={styles.name}>{store.name}</h2>
                <span
                  className={`${styles.star} ${favorites.includes(store._id) ? styles.filled : ''}`}
                  onClick={() => handleToggleFavorite(store._id)}
                >
                  ★
                </span>
              </div>
              <ul className={styles.benefitList}>
                {(store.benefits || []).map((benefit, i) => (
                  <li key={i}>{benefit}</li>
                ))}
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default StoreMajor;
