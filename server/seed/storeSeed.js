import dotenv from 'dotenv';
import Store from '../models/store_schema.js';
import connect from '../connect.js';

dotenv.config();

const storeSeed = async () => {
  console.log('실행확인');
  try {
    await connect(); // DB 연결

    await Store.deleteMany(); // 기존 데이터 삭제

    const stores = [
      {
        name: '한솥도시락',
        info: [
          { major: '공과대학', benefits: ['10% 할인', '음료 무료 제공'] },
          { major: '경영대학', benefits: ['세트 메뉴 업그레이드'] },
        ],
        verify: '승인됨',
        img: 'https://example.com/image1.jpg',
      },
      {
        name: '맘스터치',
        info: [{ major: '사범대학', benefits: ['사이드메뉴 무료 제공'] }],
        verify: '승인됨',
        img: 'https://example.com/image2.jpg',
      },
    ];

    await Store.insertMany(stores);

    console.log('🎉 목데이터 삽입 완료!');
    process.exit();
  } catch (err) {
    console.error('❌ 에러 발생:', err);
    process.exit(1);
  }
};

storeSeed();
