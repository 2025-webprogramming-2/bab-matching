import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './StoreMajor.module.css';

function StoreMajor() {
  const { collegeId } = useParams();
  const navigate = useNavigate();

  const [stores, setStores] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const API_URL = import.meta.env.VITE_API_URL;

  const majorMap = {
    engineering: '공과대학',
    humanities: '인문대학',
    business: '경영대학',
    economics: '경제통상대학',
    it: 'IT대학',
    social: '사회과학대학',
    law: '법과대학',
    natsci: '자연과학대학',
  };

  const collegeName = majorMap[collegeId];

  // 찜 목록 불러오기
  useEffect(() => {
    const fetchUserFavorites = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/user/favorites`, {
          withCredentials: true,
        });
        setFavorites(res.data.favorites);
      } catch (err) {
        console.error('찜 목록 불러오기 실패:', err);
      }
    };

    fetchUserFavorites();
  }, []);

  // 가게 목록 불러오기
  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/store?college=${collegeName}`);
        setStores(res.data);
      } catch (err) {
        console.error('가게 불러오기 실패:', err);
      }
    };

    fetchStores();
  }, [collegeName]);

  // 찜 토글
  const handleToggleFavorite = async (storeId) => {
    try {
      const res = await axios.post(`${API_URL}/api/user/toggleFavorite`, { storeId }, { withCredentials: true });
      setFavorites(res.data.favorites);
    } catch (err) {
      console.error('찜 토글 실패:', err);
    }
  };

  //  가게 클릭 시 AddRoom 페이지로 이동 (store 정보 함께 전달)
  const handleStoreClick = (store) => {
    navigate('/addroom', { state: { store } });
  };

  // 필터 + 찜 우선 정렬
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
          { label: '술집', value: 'pub' },
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
      <h3 className={styles.findAccount}>제휴 식당을 클릭해 매칭방을 만들 수 있습니다.</h3>

      {/* 가게 카드 리스트 */}
      {filteredStores.length === 0 ? (
        <p className={styles.emptyMessage}>제휴 가게가 없습니다.</p>
      ) : (
        filteredStores.map((store) => (
          <div
            className={styles.card}
            key={store._id}
            onClick={() => handleStoreClick(store)} // 가게 클릭 시 이동
          >
            <img src={store.img} alt={store.name} className={styles.image} />
            <div className={styles.info}>
              <div className={styles.headerRow}>
                <h2 className={styles.name}>{store.name}</h2>
                <span
                  className={`${styles.star} ${favorites.includes(store._id) ? styles.filled : ''}`}
                  onClick={(e) => {
                    e.stopPropagation(); // 찜 클릭 시 카드 클릭 방지
                    handleToggleFavorite(store._id);
                  }}
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
