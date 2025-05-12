import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Main.module.css';
import CurrentRoom from '../../components/Main/CurrentRoom';

function Main() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/store'); // 포트 확인!
        console.log('응답 데이터:', res.data);

        setStores(res.data);
      } catch (error) {
        console.error('가게 데이터 불러오기 실패:', error);
      }
    };

    fetchStores();
  }, []);

  return (
    <div>
      <h1>가게 목록</h1>
      <ul>
        {stores.map((store) => (
          <li key={store._id}>
            <h2>{store.name}</h2>
            <img src={store.img} alt={store.name} width="200" />
            {store.info.map((item, idx) => (
              <div key={idx}>
                <strong>{item.major}</strong>
                <ul>
                  {item.benefits.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Main;
