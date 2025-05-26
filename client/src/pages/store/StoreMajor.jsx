import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from './StoreMajor.module.css';

function StoreMajor() {
  const { collegeId } = useParams();
  const [stores, setStores] = useState([]);
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

  const filteredStores =
    selectedCategory === 'all'
      ? stores
      : stores.filter((store) => store.type === selectedCategory);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{collegeName}</h1>

      <div className={styles.categoryButtons}>
        <button
          className={`${styles.categoryButton} ${
            selectedCategory === 'all' ? styles.active : ''
          }`}
          onClick={() => setSelectedCategory('all')}
        >
          전체
        </button>
        <button
          className={`${styles.categoryButton} ${
            selectedCategory === 'restaurant' ? styles.active : ''
          }`}
          onClick={() => setSelectedCategory('restaurant')}
        >
          음식점
        </button>
        <button
          className={`${styles.categoryButton} ${
            selectedCategory === 'cafe' ? styles.active : ''
          }`}
          onClick={() => setSelectedCategory('cafe')}
        >
          카페
        </button>
        <button
          className={`${styles.categoryButton} ${
            selectedCategory === 'pub' ? styles.active : ''
          }`}
          onClick={() => setSelectedCategory('pub')}
        >
          술집
        </button>
      </div>

      {filteredStores.length === 0 ? (
        <p className={styles.emptyMessage}>제휴 가게가 없습니다.</p>
      ) : (
        filteredStores.map((store, index) => (
          <div className={styles.card} key={`${store.name}-${index}`}>
            <img src={store.img} alt={store.name} className={styles.image} />
            <div className={styles.info}>
              <h2 className={styles.name}>{store.name}</h2>
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
