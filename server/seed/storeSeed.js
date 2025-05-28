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
        storeIndex: "1",
        college: "공과대학",
        type: "cafe",
        name: "요거트아이스크림의 정석",
        benefits: ["18000원이상 방문주문시 초코/딸기쉘 or 그래놀라 토핑 추가"],
        img: "/assets/yogurt.png"
      },
      {
        storeIndex: "2",
        college: "공과대학",
        type: "cafe",
        name: "메가커피",
        benefits: ["5잔주문시 아메리카노 한잔 서비스"],
        img: "/assets/mega.png"
      },
      {
        storeIndex: "3",
        college: "공과대학",
        type: "cafe",
        name: "봄봄",
        benefits: ["2잔 주문시 샷 추가 1번"],
        img: "/assets/bombom.png"
      },
      {
        storeIndex: "4",
        college: "공과대학",
        type: "cafe",
        name: "에브어이브",
        benefits: ["전메뉴 10% 할인"],
        img: "/assets/evr.png"
      },
      {
        storeIndex: "5",
        college: "공과대학",
        type: "pub",
        name: "사랑과 평화",
        benefits: ["4인이상 테이블 메인안주 1개이상 주문시 감자튀김"],
        img: "/assets/lovepeace.png"
      },
      {
        storeIndex: "6",
        college: "공과대학",
        type: "pub",
        name: "역전할머니맥주",
        benefits: ["4만원이상주문시 갈릭빠다포테이토"],
        img: "/assets/halmae.png"
      },
      {
        storeIndex: "7",
        college: "공과대학",
        type: "pub",
        name: "지짐이",
        benefits: ["7만원이상 주문시 음료수 서비스"],
        img: "/assets/jijimi.png"
      },
      {
        storeIndex: "8",
        college: "공과대학",
        type: "pub",
        name: "블루힐",
        benefits: ["7만원 이상 현금결제시 김치볶음밥 or 계란말이"],
        img: "/assets/bluehill.png"
      },
      {
        storeIndex: "9",
        college: "공과대학",
        type: "pub",
        name: "상도로 3가",
        benefits: ["5% 할인 + 점심시간 2인이상 방문 시 음료수 1캔"],
        img: "/assets/sangdo.png"
      },
      {
        storeIndex: "10",
        college: "공과대학",
        type: "pub",
        name: "가치",
        benefits: ["칵테일 4잔 이상 테이블 미니나쵸"],
        img: "/assets/value.png"
      },
      {
        storeIndex: "11",
        college: "공과대학",
        type: "pub",
        name: "28청춘",
        benefits: ["18시 이전 주문 테이블당 소주 1병"],
        img: "/assets/28young.png"
      },
      {
        storeIndex: "12",
        college: "공과대학",
        type: "restaurant",
        name: "진푸 중화요리",
        benefits: [
          "2만원 이상 주문시 탄산 1캔",
          "3만원 이상 주문시 이과두주 또는 레몽홍차",
          "4만원 이상 주문시 물만두 14개"
        ],
        img: "/assets/jinpu.png"
      },
      {
        storeIndex: "13",
        college: "공과대학",
        type: "restaurant",
        name: "샹츠마라",
        benefits: ["3만원 이상 주문시 음료수 2개 또는 소주 또는 맥주 또는 유토우"],
        img: "/assets/xiang.png"
      },
      {
        storeIndex: "14",
        college: "공과대학",
        type: "restaurant",
        name: "취향",
        benefits: ["4인 이상 방문시 테이블당 음료 500ml 또는 군만두 4개"],
        img: "/assets/chwyhyang.png"
      },
      {
        storeIndex: "15",
        college: "공과대학",
        type: "restaurant",
        name: "코웍 비스트로",
        benefits: ["3인 이상 식사 주문시 면사리 추가"],
        img: "/assets/cowork.png"
      },
      {
        storeIndex: "16",
        college: "공과대학",
        type: "restaurant",
        name: "숯가마 바베큐 치킨",
        benefits: ["4만원 이상 결제 시 소주 1명 제공"],
        img: "/assets/chi.png"
      },
      {
        storeIndex: "17",
        college: "공과대학",
        type: "restaurant",
        name: "리얼 후라이",
        benefits: ["테이블당 음료 1캔"],
        img: "/assets/real.png"
      },
      {
        storeIndex: "18",
        college: "공과대학",
        type: "restaurant",
        name: "피자스쿨",
        benefits: ["25000원 이상 주문시 펩시제로 1.25리터"],
        img: "/assets/pizza.png"
      },
      {
        storeIndex: "19",
        college: "공과대학",
        type: "restaurant",
        name: "지지고",
        benefits: ["2만원 이상 주문시 음료수 2개, 3만원 이상 주문시 단품을 세트로변경"],
        img: "/assets/jijigo.png"
      },
      {
        storeIndex: "20",
        college: "공과대학",
        type: "restaurant",
        name: "광어삼촌",
        benefits: ["음료수 1명 제공"],
        img: "/assets/fish.png"
      },
      {
        storeIndex: "21",
        college: "공과대학",
        type: "restaurant",
        name: "먹돼지",
        benefits: ["토스 또는 카카오페이 결제시 5%할인(고기류 주문시에만)"],
        img: "/assets/pig.png"
      },
      {
        storeIndex: "22",
        college: "공과대학",
        type: "restaurant",
        name: "청운 음식점",
        benefits: ["4인 이하 방문 75000원, 5인 이하 방문 85000원 주문시 테이블 당 음료 서비스"],
        img: "/assets/pig2.png"
      },
      {
        storeIndex: "23",
        college: "공과대학",
        type: "restaurant",
        name: "고씨네 카레",
        benefits: ["1인 1메뉴 이상 주문시 치즈스틱 또는 감자 고로케"],
        img: "/assets/care.png"
      },
      {
        storeIndex: "24",
        college: "공과대학",
        type: "pub",
        name: "으리으리",
        benefits: ["4인 이상 방문, 3만원 이상 주문시 음료수"],
        img: "/assets/ooo.png"
      },
      {
        storeIndex: "25",
        college: "공과대학",
        type: "restaurant",
        name: "왕돈까스 왕냉면",
        benefits: ["2만원 이상 주문시 음료수 1캔"],
        img: "/assets/big.png"
      },
      {
        storeIndex: "26",
        college: "공과대학",
        type: "restaurant",
        name: "논두렁",
        benefits: ["식사류 3개 이상 주문시 음료수 1캔"],
        img: "/assets/nom.png"
      },
      // 인문대학 - 음식점
{
  storeIndex: "27",
  college: "인문대학",
  type: "restaurant",
  name: "포케 올데이",
  benefits: ["메인메뉴 주문시 사이다 증정"],
  img: "/assets/poke.png"
},
{
  storeIndex: "28",
  college: "인문대학",
  type: "restaurant",
  name: "진푸 중화요리",
  benefits: [
    "2만원 이상 주문시 음료1캔",
    "3만원 이상 주문시 이과두주",
    "3만5천원 이상 주문시 물만두 14개"
  ],
  img: "/assets/jinpu.png"
},
{
  storeIndex: "29",
  college: "인문대학",
  type: "restaurant",
  name: "코웍 비스트로",
  benefits: ["닭갈비 2인분 추가시 치즈무료"],
  img: "/assets/cowork.png"
},
{
  storeIndex: "30",
  college: "인문대학",
  type: "restaurant",
  name: "리김밥",
  benefits: ["메인메뉴 3개이상 주문시 프렌치프라이 또는 탄산음료 1캔 또는 에그 카스테라"],
  img: "/assets/rigimbap.png"
},
{
  storeIndex: "31",
  college: "인문대학",
  type: "restaurant",
  name: "취향",
  benefits: ["4인 방문 1인 1메뉴시 음료500 또는 군만두4개"],
  img: "/assets/chwyhyang.png"
},
{
  storeIndex: "32",
  college: "인문대학",
  type: "restaurant",
  name: "논두렁 갈비",
  benefits: ["10% 할인"],
  img: "/assets/nom.png"
},
{
  storeIndex: "33",
  college: "인문대학",
  type: "restaurant",
  name: "면식당",
  benefits: ["1인1메뉴 주문시 음료 증정"],
  img: "/assets/noodlehouse.png"
},
{
  storeIndex: "34",
  college: "인문대학",
  type: "restaurant",
  name: "밀플랜비",
  benefits: ["브리또 주문시 토핑추가(베이컨 제외)"],
  img: "/assets/mealplanb.png"
},
{
  storeIndex: "35",
  college: "인문대학",
  type: "pub",
  name: "파동추야",
  benefits: ["3만원 구매시 음료1캔"],
  img: "/assets/padong.png"
},

// 인문대학 - 주점
{
  storeIndex: "36",
  college: "인문대학",
  type: "pub",
  name: "블루힐",
  benefits: ["5만원 이상 결제시 음료1캔", "7만원 이상 주문시 황도1개"],
  img: "/assets/bluehill.png"
},
{
  storeIndex: "37",
  college: "인문대학",
  type: "pub",
  name: "상도로 3가",
  benefits: ["11~24시 사이에 2명 이상 방문시 음료1개"],
  img: "/assets/sangdo.png"
},

// 인문대학 - 카페
{
  storeIndex: "38",
  college: "인문대학",
  type: "cafe",
  name: "커피나무",
  benefits: ["조각케이크 구매시 아메리카노 증정"],
  img: "/assets/coffeetree.png"
},
{
  storeIndex: "39",
  college: "경제통상대학",
  type: "restaurant",
  name: "피자스쿨",
  benefits: ["25000원 이상 주문 시, 펩시제로 1.25L 제공"],
  img: "/assets/pizza.png"
},
{
  storeIndex: "40",
  college: "경제통상대학",
  type: "restaurant",
  name: "밀플랜비",
  benefits: ["부리또 주문 시 토핑 1개 추가 무료(베이컨 제외)"],
  img: "/assets/mealplanb.png"
},
{
  storeIndex: "41",
  college: "경제통상대학",
  type: "restaurant",
  name: "리얼후라이",
  benefits: ["테이블 당 음료 1개 제공"],
  img: "/assets/real.png"
},
{
  storeIndex: "42",
  college: "경제통상대학",
  type: "restaurant",
  name: "슬로우캘리",
  benefits: ["메인메뉴 2개 당 음료 1캔 제공"],
  img: "/assets/slowcali.png"
},
{
  storeIndex: "43",
  college: "경제통상대학",
  type: "restaurant",
  name: "면식당",
  benefits: ["2인 이하 음료수 1개, 3~4인 음료수 2개 서비스"],
  img: "/assets/noodlehouse.png"
},
{
  storeIndex: "44",
  college: "경제통상대학",
  type: "pub",
  name: "파동추야",
  benefits: ["30000원 이상 주문 시 음료 제공"],
  img: "/assets/padong.png"
},
{
  storeIndex: "45",
  college: "경제통상대학",
  type: "restaurant",
  name: "취향",
  benefits: ["4인 방문 시, 음료 500ml 또는 군만두 4개 제공"],
  img: "/assets/chwyhyang.png"
},
{
  storeIndex: "46",
  college: "경제통상대학",
  type: "restaurant",
  name: "청운음식점",
  benefits: ["4인 이하 75000원 이상, 5인 85000원 이상 주문시 음료 500ml 제공"],
  img: "/assets/pig2.png"
},
{
  storeIndex: "47",
  college: "경제통상대학",
  type: "pub",
  name: "씨밤",
  benefits: ["20000원 이상 주문 시 즉석 라면 제공"],
  img: "/assets/ssibam.png"
},
{
  storeIndex: "48",
  college: "경제통상대학",
  type: "pub",
  name: "상도로 3가",
  benefits: ["현금 또는 계좌 이체 시 5% 할인"],
  img: "/assets/sangdo.png"
},
{
  storeIndex: "49",
  college: "경제통상대학",
  type: "pub",
  name: "블루힐",
  benefits: ["7만원 이상 현금 결제 시 김치볶음밥 혹은 계란말이 중 하나 제공"],
  img: "/assets/bluehill.png"
},
// 경영대학 - 음식점
{
  storeIndex: "50",
  college: "경영대학",
  type: "restaurant",
  name: "면식당",
  benefits: ["2인 이하 음료수 1개", "4인 이하 음료수 2개 서비스 제공"],
  img: "/assets/noodlehouse.png"
},
{
  storeIndex: "51",
  college: "경영대학",
  type: "restaurant",
  name: "신의주 찹쌀순대",
  benefits: [
    "4인 이상 주문 시 음료 한 캔 제공",
    "or 4인 이상 방문하여 5만원 이상 주문 시 소주 한 병 제공"
  ],
  img: "/assets/shiniju.png"
},
{
  storeIndex: "52",
  college: "경영대학",
  type: "restaurant",
  name: "취향",
  benefits: ["4인 이상 주문 시 음료 한 캔 or 군만두 4개 제공"],
  img: "/assets/chwyhyang.png"
},
{
  storeIndex: "53",
  college: "경영대학",
  type: "restaurant",
  name: "청운 음식점",
  benefits: [
    "한 테이블에 4인 이하 방문 7만원 이상 or",
    "5인 이상 방문 8만원 이상 주문 시 음료 1개(500ml) 제공"
  ],
  img: "/assets/pig2.png"
},
{
  storeIndex: "54",
  college: "경영대학",
  type: "restaurant",
  name: "먹돼지",
  benefits: ["카카오페이 or 토스 결제 이용 시 5% 할인(고기류 주문 시)"],
  img: "/assets/pig.png"
},
{
  storeIndex: "55",
  college: "경영대학",
  type: "restaurant",
  name: "논두렁갈비",
  benefits: ["결제금액에서 10% 할인"],
  img: "/assets/nom.png"
},
{
  storeIndex: "56",
  college: "경영대학",
  type: "restaurant",
  name: "가마치통닭",
  benefits: [
    "신입생 학생증 제시 시 10% 할인",
    "4인 테이블 기준 사이드메뉴 1개 + 음료 500ml 제공",
    "저녁 9시 이후 4인 이상 방문 시 사이드메뉴 + 음료1.5L(or 주류 2개) 제공"
  ],
  img: "/assets/gamachi.png"
},
{
  storeIndex: "57",
  college: "경영대학",
  type: "restaurant",
  name: "889 와규",
  benefits: ["점심메뉴 인당 5,000원 할인 (기간한정)"],
  img: "/assets/889.png"
},
{
  storeIndex: "58",
  college: "경영대학",
  type: "restaurant",
  name: "상도동 솔뚝껑",
  benefits: ["리뷰 이벤트 참여 시 사이드메뉴(비빔면) + 음료 1개 제공"],
  img: "/assets/sangdo2.png"
},
{
  storeIndex: "59",
  college: "경영대학",
  type: "restaurant",
  name: "고추동제면소",
  benefits: [
    "테이블당 메뉴 2개 이상 주문 시 음료 서비스",
    "(점심 12~2시, 저녁 5~7시 제외)"
  ],
  img: "/assets/gochu.png"
},

// 경영대학 - 카페
{
  storeIndex: "60",
  college: "경영대학",
  type: "cafe",
  name: "커피나무",
  benefits: ["조각케이크 구입 시 아메리카노 증정"],
  img: "/assets/coffeetree.png"
},
{
  storeIndex: "61",
  college: "경영대학",
  type: "cafe",
  name: "에브어이브",
  benefits: ["세트 메뉴 제외한 모든 메뉴 10% 할인"],
  img: "/assets/evr.png"
},
{
  storeIndex: "62",
  college: "경영대학",
  type: "cafe",
  name: "브레댄코",
  benefits: [
    "모닝세트: 아메리카노 + 샌드위치 3500원",
    "음료 전 메뉴 무료 사이즈업"
  ],
  img: "/assets/breadnco.png"
},

// 경영대학 - 주점
{
  storeIndex: "63",
  college: "경영대학",
  type: "pub",
  name: "인쌩맥주",
  benefits: ["카카오페이 or 토스결제 이용 시 5% 할인(메인메뉴 2개 주문 시)"],
  img: "/assets/inssaeng.png"
},
{
  storeIndex: "64",
  college: "경영대학",
  type: "pub",
  name: "역전할머니맥주",
  benefits: ["4만원 이상 주문 시 살얼음 파인애플 서비스 제공"],
  img: "/assets/halmae.png"
},
{
  storeIndex: "65",
  college: "경영대학",
  type: "pub",
  name: "자월당",
  benefits: ["양맥 2잔 이상 주문 시 감자튀김 서비스 제공"],
  img: "/assets/jawoldang.png"
},
{
  storeIndex: "66",
  college: "경영대학",
  type: "pub",
  name: "씨밤",
  benefits: ["20,000원 이상 주문 시 즉석 라면 제공"],
  img: "/assets/ssibam.png"
},
{
  storeIndex: "67",
  college: "경영대학",
  type: "pub",
  name: "사랑과 평화",
  benefits: ["4만원 이상 주문 시 양념감자튀김 서비스"],
  img: "/assets/lovepeace.png"
},
{
  storeIndex: "68",
  college: "경영대학",
  type: "pub",
  name: "상도로 3가",
  benefits: ["현금 or 계좌 이체 시 5% 할인"],
  img: "/assets/sangdo.png"
},
{
  storeIndex: "69",
  college: "사회과학대학",
  type: "pub",
  name: "인생맥주",
  benefits: ["메뉴 2개 이상 주문 후 현금, 계좌이체 또는 카카오페이 결제 시 5% 할인"],
  img: "/assets/inssaeng.png"
},
{
  storeIndex: "70",
  college: "사회과학대학",
  type: "pub",
  name: "파동추야",
  benefits: ["3만원 이상 주문 시 음료수 1개 제공"],
  img: "/assets/padong.png"
},
{
  storeIndex: "71",
  college: "사회과학대학",
  type: "pub",
  name: "28청춘 1, 2호점",
  benefits: ["테이블 당 소주 1병 제공"],
  img: "/assets/28young.png"
},
{
  storeIndex: "72",
  college: "사회과학대학",
  type: "restaurant",
  name: "리얼 후라이",
  benefits: ["테이블 당 음료수 1개 제공"],
  img: "/assets/real.png"
},
{
  storeIndex: "73",
  college: "사회과학대학",
  type: "restaurant",
  name: "고씨네",
  benefits: ["1인 1메뉴 이상 주문 시 감자 고로케 또는 치즈스틱 제공"],
  img: "/assets/care.png"
},
{
  storeIndex: "74",
  college: "사회과학대학",
  type: "restaurant",
  name: "샹츠마라",
  benefits: ["3만원 이상 구매 시 음료수 2개 또는 맥주(카스or테라) 1개 또는 유토우 中 1개 제공"],
  img: "/assets/xiang.png"
},
{
  storeIndex: "75",
  college: "사회과학대학",
  type: "restaurant",
  name: "크라이치즈버거",
  benefits: [
    "11:00~13:30 단품 포장 주문 시 컵음료 무료 제공",
    "13:30~16:30 더블/트리플 세트 주문 시 치즈감자 업그레이드"
  ],
  img: "/assets/crycheese.png"
},
{
  storeIndex: "76",
  college: "사회과학대학",
  type: "restaurant",
  name: "밀플랜비",
  benefits: ["부리또 주문 시 토핑 하나 증정"],
  img: "/assets/mealplanb.png"
},
{
  storeIndex: "77",
  college: "사회과학대학",
  type: "restaurant",
  name: "멘동",
  benefits: ["1인 1메뉴 이상 주문 시, 2인 이상 음료 1개 제공 또는 4인 이상 음료 2개 제공"],
  img: "/assets/mendong.png"
},
{
  storeIndex: "78",
  college: "사회과학대학",
  type: "restaurant",
  name: "지지고",
  benefits: ["2만원 이상 주문 시 음료수 2개 증정, 3만원 이상 주문 시 단품에서 세트로 변경"],
  img: "/assets/jijigo.png"
},
{
  storeIndex: "79",
  college: "법과대학",
  type: "restaurant",
  name: "면식당",
  benefits: ["2인 이하 음료수 1개 제공, 3~4인 이하 음료수 2개 제공"],
  img: "/assets/noodlehouse.png"
},
{
  storeIndex: "80",
  college: "법과대학",
  type: "restaurant",
  name: "고씨네",
  benefits: ["감자고로케, 치즈스틱, 치즈볼 중 택1 제공"],
  img: "/assets/care.png"
},
{
  storeIndex: "81",
  college: "법과대학",
  type: "restaurant",
  name: "지짐이",
  benefits: ["주문금액 7만원 당 소주 1병 제공"],
  img: "/assets/jijimi.png"
},
{
  storeIndex: "82",
  college: "법과대학",
  type: "restaurant",
  name: "피자스쿨",
  benefits: ["25000원당 펩시제로 1.25L 제공"],
  img: "/assets/pizza.png"
},
{
  storeIndex: "83",
  college: "법과대학",
  type: "restaurant",
  name: "핵밥",
  benefits: ["닭튀김 1pcs 제공 + 리뷰 참여 시 음료 추가 제공"],
  img: "/assets/haekbab.png"
},
{
  storeIndex: "84",
  college: "법과대학",
  type: "restaurant",
  name: "취향",
  benefits: ["4인 방문 시, 군만두 4개 또는 탄산 1캔 제공"],
  img: "/assets/chwyhyang.png"
},
{
  storeIndex: "85",
  college: "법과대학",
  type: "pub",
  name: "역전 할머니 맥주",
  benefits: ["40000원 이상 주문 시 파인애플 샤베트 제공"],
  img: "/assets/halmae.png"
},
{
  storeIndex: "86",
  college: "법과대학",
  type: "restaurant",
  name: "부리또집",
  benefits: ["오후 2:30~5:30 사이 방문 시 추가 토핑 4종 중 택 1추가"],
  img: "/assets/zip.png"
},
{
  storeIndex: "87",
  college: "법과대학",
  type: "restaurant",
  name: "은하수 식당",
  benefits: ["식사메뉴 2개당 음료수 1캔 제공"],
  img: "/assets/oo2.png"
},
{
  storeIndex: "88",
  college: "법과대학",
  type: "restaurant",
  name: "코웍 비스트로",
  benefits: ["2인 이상 방문 시, 치즈사리 추가 제공"],
  img: "/assets/cowork.png"
},
{
  storeIndex: "89",
  college: "자연과학대학",
  type: "cafe",
  name: "카페 트리암 숭실대점",
  benefits: ["현금/계좌이체 결제 시 10% 할인"],
  img: "/assets/treearm.png"
},
{
  storeIndex: "90",
  college: "자연과학대학",
  type: "cafe",
  name: "에브어이브",
  benefits: ["세트 메뉴 제외 10% 할인"],
  img: "/assets/evr.png"
},
{
  storeIndex: "91",
  college: "자연과학대학",
  type: "cafe",
  name: "빽다방",
  benefits: ["화/목요일 4잔 이상 주문 시 아메리카노 or 아샷추 중 택1 추가 제공"],
  img: "/assets/paiks.png"
},
{
  storeIndex: "92",
  college: "자연과학대학",
  type: "restaurant",
  name: "슬로우캘리",
  benefits: ["메인메뉴 2개 주문 시 캔 음료 제공"],
  img: "/assets/slowcali.png"
},
{
  storeIndex: "93",
  college: "자연과학대학",
  type: "restaurant",
  name: "크라이치즈버거",
  benefits: ["추후공개"],
  img: "/assets/crycheese.png"
},
{
  storeIndex: "94",
  college: "자연과학대학",
  type: "restaurant",
  name: "먹돼지",
  benefits: ["고기류(식사 제외) 주문, 현금/계좌이체/페이 결제 시 5% 할인"],
  img: "/assets/pig.png"
},
{
  storeIndex: "95",
  college: "자연과학대학",
  type: "restaurant",
  name: "밀플랜비",
  benefits: ["부리또 주문 시 토핑 추가 무료"],
  img: "/assets/mealplanb.png"
},
{
  storeIndex: "96",
  college: "자연과학대학",
  type: "pub",
  name: "블루힐",
  benefits: ["18시 이전 방문 시 칵테일 소주 500ml 제공"],
  img: "/assets/bluehill.png"
},
{
  storeIndex: "97",
  college: "자연과학대학",
  type: "pub",
  name: "사랑과 평화 숭실대본점",
  benefits: ["4만원 이상 주문 시 감자튀김 제공"],
  img: "/assets/lovepeace.png"
},
{
  storeIndex: "98",
  college: "자연과학대학",
  type: "pub",
  name: "인생맥주 숭실대점",
  benefits: ["3만원 이상 현금/계좌이체/페이 결제 시 5% 할인"],
  img: "/assets/inssaeng.png"
}
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
