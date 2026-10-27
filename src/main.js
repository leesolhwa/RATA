import './styles.css';
import { Button, Dialog, EmptyState, ErrorState, Input, Skeleton, Toast } from './ui.js';

const ramenPhotos = {
  hero: '/images/photos/hero-ramen.webp',
  clear: '/images/photos/broth-clear.webp',
  rich: '/images/photos/broth-rich.webp',
  spicy: '/images/photos/broth-spicy.webp',
  dipping: '/images/photos/style-tsukemen.webp',
  mixed: '/images/photos/style-mazesoba.webp',
  street: '/images/photos/news-street.webp',
  newsMiso: '/images/photos/news-miso.webp',
  newsShoyu: '/images/photos/news-shoyu.webp',
  banrai: '/images/photos/figma/banrai-tsukemen.jpg',
  koreanShoyu: '/images/photos/figma/shoyu-bowl.jpg',
  koreanClear: '/images/photos/figma/clear-ramen.jpg',
  koreanSpicy: '/images/photos/figma/spicy-ramen.jpg'
};

const myPlatePhotos = [
  { src: ramenPhotos.banrai, alt: '마포 반라이 츠케멘' },
  { src: ramenPhotos.koreanClear, alt: '맑은 닭 청탕 라멘' },
  { src: ramenPhotos.koreanSpicy, alt: '매운 미소 라멘' },
  { src: ramenPhotos.rich, alt: '진한 돈코츠 라멘' },
  { src: ramenPhotos.clear, alt: '담백한 시오 라멘' },
  { src: ramenPhotos.spicy, alt: '얼큰한 탄탄멘' },
  { src: ramenPhotos.newsMiso, alt: '구수한 미소 라멘' },
  { src: ramenPhotos.newsShoyu, alt: '파를 올린 쇼유 라멘' },
  { src: ramenPhotos.mixed, alt: '고명을 올린 마제소바' },
  { src: ramenPhotos.hero, alt: '차슈와 김을 올린 쇼유 라멘' }
];

const icon = (name, size = 24) => {
  const paths = {
    bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/>',
    chevron: '<path d="m9 18 6-6-6-6"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    home: '<path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10M9 20v-6h6v6"/>',
    calendar: '<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    map: '<path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3zM9 3v15M15 6v15"/>',
    chat: '<path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    bookmark: '<path d="M6 3h12v18l-6-4-6 4z"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    pin: '<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2"/>',
    edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6 1.7 1.7 0 0 0 10 3V2.8h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z"/>',
    bowl: '<path d="M4 10h16c0 5-3 9-8 9s-8-4-8-9Z"/><path d="M7 22h10M8 6c0-2 2-2 2-4M13 7c0-2 2-2 2-4"/>',
    photo: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m21 15-5-5L5 20"/>',
    trash: '<path d="M3 6h18M8 6V4h8v2M19 6l-1 15H6L5 6M10 11v6M14 11v6"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    back: '<path d="m15 18-6-6 6-6"/>',
    heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"/>',
    send: '<path d="m12 19V5m-6 6 6-6 6 6"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>'
  };
  return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]}</svg>`;
};

const socialIcon = (provider) => {
  if (provider === '카카오') return '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 4C6.5 4 2 7.5 2 11.8c0 2.8 1.9 5.2 4.8 6.6l-1 3.6 4.2-2.8c.7.1 1.3.2 2 .2 5.5 0 10-3.4 10-7.6S17.5 4 12 4Z"/></svg>';
  if (provider === '네이버') return '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M5 4h5.1l4.8 7V4H19v16h-5.1l-4.8-7v7H5V4Z"/></svg>';
  if (provider === '애플') return '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M16.8 12.7c0-2.5 2.1-3.7 2.2-3.8-1.2-1.7-3-1.9-3.6-1.9-1.5-.2-3 .9-3.8.9-.8 0-2-1-3.3-.9-1.7 0-3.3 1-4.2 2.5-1.8 3.1-.5 7.8 1.3 10.3.9 1.3 1.9 2.7 3.3 2.6 1.3-.1 1.8-.8 3.4-.8s2.1.8 3.5.8c1.5 0 2.4-1.3 3.2-2.6 1-1.5 1.4-3 1.4-3.1-.1 0-3.4-1.3-3.4-4Zm-2.4-7.3c.7-.9 1.2-2.1 1.1-3.4-1.1 0-2.4.7-3.2 1.6-.7.8-1.3 2-1.1 3.2 1.2.1 2.4-.6 3.2-1.4Z"/></svg>';
  return '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M21.6 12.2c0-.7-.1-1.5-.2-2.2H12v4.2h5.4a4.6 4.6 0 0 1-2 3v2.7h3.3c1.9-1.8 2.9-4.4 2.9-7.7Z"/><path fill="#34A853" d="M12 22c2.7 0 5-.9 6.7-2.4l-3.3-2.7c-.9.6-2.1 1-3.4 1a5.9 5.9 0 0 1-5.5-4.1H3.1v2.8A10 10 0 0 0 12 22Z"/><path fill="#FBBC05" d="M6.5 13.8a6 6 0 0 1 0-3.6V7.4H3.1a10 10 0 0 0 0 9.2l3.4-2.8Z"/><path fill="#EA4335" d="M12 6.1c1.5 0 2.8.5 3.9 1.5l2.9-2.9A9.7 9.7 0 0 0 12 2a10 10 0 0 0-8.9 5.4l3.4 2.8A5.9 5.9 0 0 1 12 6.1Z"/></svg>';
};

const StatusBar = ({ className = 'home-status' } = {}) => `<div class="${className}"><strong>9:41</strong><span class="status-icons"><span class="status-signal" aria-hidden="true"><i></i><i></i><i></i></span><svg class="status-wifi" viewBox="0 0 16 12" aria-hidden="true"><path d="M1 4.2a10.6 10.6 0 0 1 14 0M3.6 7a6.7 6.7 0 0 1 8.8 0M6.2 9.6a2.7 2.7 0 0 1 3.6 0"/></svg><b aria-hidden="true"></b></span></div>`;

const ScreenTitleRow = ({ title, action = '' }) => `<div class="screen-title-row"><h1>${title}</h1>${action}</div>`;

let ratingGradientId = 0;
const RatingStars = ({ score, interactive = false } = {}) => {
  const value = Math.max(0, Math.min(5, Number(score) || 0));
  const stars = [1, 2, 3, 4, 5].map((star) => {
    const fill = Math.max(0, Math.min(1, value - (star - 1)));
    const gradientId = `rating-fill-${ratingGradientId += 1}`;
    const starSvg = `<svg viewBox="0 0 24 24" aria-hidden="true"><defs><linearGradient id="${gradientId}"><stop class="rating-fill-stop" offset="${fill * 100}%" stop-color="var(--accent)"/><stop class="rating-fill-stop" offset="${fill * 100}%" stop-color="var(--line)"/></linearGradient></defs><path fill="url(#${gradientId})" d="M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3.1-5.8 3.1 1.1-6.5-4.7-4.6 6.5-.9z"/></svg>`;
    return interactive
      ? `<button type="button" class="rating-star" data-star="${star}" aria-label="${star - .5}점 또는 ${star}점">${starSvg}</button>`
      : `<span class="rating-star" aria-hidden="true">${starSvg}</span>`;
  }).join('');
  return `<span class="rating-stars ${interactive ? 'interactive' : 'display'}" role="img" aria-label="별점 ${value.toFixed(1)}점">${stars}</span>`;
};

const modeContent = {
  light: {
    panelSubtitle: '먹고싶은 타입',
    groups: [
      ['좋아하는 국물', ['해산물의 시원한 감칠맛', '조개', '도미', '소금(시오)', '간장(쇼유)', '된장(미소)', '돈코츠']],
      ['좋아하는 맛', ['구수하고 짭짤한 맛', '얼큰하고 매콤한', '독특하고 이색적인 맛', '풍부하고 깊은 풍미']],
      ['먹는 방식', ['국물에 말아 나오는 방식', '소스에 찍어 먹는 방식', '국물없이 비벼 먹는 방식']]
    ],
    sheet: { chips: ['츠케멘', '진하고 꾸덕한'], description: '진한 어패류 소스와 탄력 있는 굵은 면이 특징이에요.' }
  },
  rata: {
    panelSubtitle: '',
    groups: [
      ['', ['지로인스파이어', '돈백탕', '돈청탕']],
      ['', ['농도', '기름기', '짠맛', '면 굵기']],
      ['', ['돼지 • 유화', '쇼유 • 카에시강함', '극태면 • 저가수면']]
    ],
    sheet: { chips: ['돈코츠 어패류', '쇼유 카에시', '극태 저가수면'], description: '육수　돈코츠·어패류 블렌드\n타래　쇼유 카에시\n면　극태 저가수면' }
  }
};

let heroSlides = [];

const padNumber = (value) => String(value).padStart(2, '0');
const dateKey = (date) => `${date.getFullYear()}-${padNumber(date.getMonth() + 1)}-${padNumber(date.getDate())}`;
const shortDate = (date) => `${date.getMonth() + 1}.${date.getDate()}`;
const addDays = (date, amount) => {
  const next = new Date(date);
  next.setDate(next.getDate() + amount);
  return next;
};

const today = new Date();
today.setHours(0, 0, 0, 0);
const monday = addDays(today, -((today.getDay() + 6) % 7));
const weekDates = Array.from({ length: 7 }, (_, index) => addDays(monday, index));
const weekDayLabels = ['월', '화', '수', '목', '금', '토', '일'];
const todayKey = dateKey(today);

const readStored = (key, fallback) => {
  try {
    const value = window.localStorage.getItem(key);
    return value == null ? fallback : JSON.parse(value);
  } catch { return fallback; }
};
const appState = {
  mode: 'light',
  loggedIn: readStored('rata_logged_in', true),
  userName: readStored('rata_user_name', 'Realraota'),
  selectedPostId: 1,
  selectedPlaceId: null,
  selectedEventId: 'jun-limited',
  rating: 0,
  selectedWriteStore: 'banrai',
  selectedPhoto: '',
  tasteEdit: readStored('rata_taste_edit', null),
  writeDraft: { title: '', body: '' },
  comments: {},
  savedEventIds: readStored('rata_saved_events', []),
  savedStoreIds: readStored('rata_saved_stores', []),
  likedPostIds: readStored('rata_liked_posts', []),
  explore: readStored('rata_explore_filters', { area: '연남', broth: 'clear', spicy: 'mild', style: 'all', query: '', view: 'list' }),
  notificationItems: [
    { id: 1, title: '유즈시오 × 코하루 콜라보', body: '내일 정오에 연남에서 시작해요.' },
    { id: 2, title: '저장한 일정이 곧 시작해요', body: '멘야준 육해공 시리즈 · 오늘 18:00' }
  ]
};
const persistState = (key, value) => {
  try { window.localStorage.setItem(key, JSON.stringify(value)); } catch {}
};
if (!readStored('rata_saved_stores_v2', false)) {
  if (appState.savedStoreIds.length === 1 && appState.savedStoreIds[0] === 'banrai') appState.savedStoreIds = [];
  persistState('rata_saved_stores', appState.savedStoreIds);
  persistState('rata_saved_stores_v2', true);
}

const eventCatalog = [
  { id: 'jun-limited', date: today, shop: '오늘 오픈', title: '멘야준 육해공 한정전', place: '합정', type: 'limited', time: '18:00', detail: '닭과 해산물 육수를 한 그릇에 담은 오늘의 한정 팝업', image: ramenPhotos.koreanShoyu },
  { id: 'akari-miso', date: today, shop: '한정 메뉴', title: '아카리 가을 미소 라멘', place: '망원', type: 'popup', time: '20:00', detail: '구운 버섯과 진한 미소를 더한 저녁 한정 메뉴', image: ramenPhotos.koreanSpicy },
  { id: 'yuzu-koharu', date: addDays(today, 1), shop: '콜라보', title: '유즈시오 × 코하루', place: '연남', type: 'collab', time: '12:00', detail: '유자 향을 더한 맑은 육수와 수제면 콜라보', image: ramenPhotos.koreanClear },
  { id: 'banrai-week', date: addDays(today, 5), shop: '한정 메뉴', title: '마포 반라이 가을 츠케멘 주간', place: '마포', type: 'limited', time: '11:30', detail: '돈코츠 어패류 소스와 극태면을 선보이는 한정 주간', image: ramenPhotos.banrai },
  { id: 'shikou-guest', date: addDays(today, 12), shop: '게스트데이', title: '시코우 × 소바샤 게스트데이', place: '성수', type: 'collab', time: '12:00', detail: '맑은 쇼유 육수와 수제면을 함께 선보이는 게스트데이', image: ramenPhotos.koreanShoyu },
  { id: 'koharu-chicken', date: addDays(today, 18), shop: '팝업', title: '코하루 닭백탕 팝업', place: '신촌', type: 'popup', time: '17:00', detail: '진한 닭백탕과 곧은 중면을 준비한 하루 팝업', image: ramenPhotos.koreanSpicy },
  { id: 'past-clear', date: addDays(today, -12), shop: '한정 메뉴', title: '하쿠텐 가을 이에케 위크', place: '홍대', type: 'limited', time: '11:30', detail: '가을 한정 이에케 라멘', image: ramenPhotos.koreanShoyu },
  { id: 'past-salt', date: addDays(today, -24), shop: '팝업', title: '시오한입 제철채소 팝업', place: '신촌', type: 'popup', time: '12:00', detail: '제철채소를 더한 시오 팝업', image: ramenPhotos.koreanClear }
];
const eventStoreLinks = {
  'jun-limited': 'menyajun',
  'akari-miso': 'kuro',
  'yuzu-koharu': 'yuzushio',
  'banrai-week': 'banrai',
  'shikou-guest': 'banrai',
  'past-clear': 'hakuten'
};
eventCatalog.forEach((item) => Object.assign(item, { storeId: eventStoreLinks[item.id] || null, source: '프로토타입 예시 데이터', updatedAt: dateKey(today) }));
const activeEventCatalog = eventCatalog
  .filter((item) => item.date >= today)
  .sort((a, b) => a.date - b.date);
const heroEyebrows = ['오늘 만나는 한 그릇', '이번 주, 주목할 한 그릇', '곧 시작하는 콜라보', '미리 보는 다음 팝업'];
heroSlides = activeEventCatalog.slice(0, 4).map((item, index) => ({
  id: item.id,
  eyebrow: heroEyebrows[index],
  title: `${item.title}<br>${index === 0 ? '오늘 놓치지 마세요.' : '새로운 취향을 만나보세요.'}`,
  meta: `${item.shop}  |  ${shortDate(item.date)} ${item.time} · ${item.place}`,
  image: item.image
}));
const dDayLabel = (date) => { const diff = Math.round((date - today) / 86400000); return diff === 0 ? 'TODAY' : `D-${diff}`; };
const events = eventCatalog.filter((item) => item.date >= weekDates[0] && item.date <= weekDates[6]).map((item, order) => ({
  ...item, date: dateKey(item.date), order, dday: dDayLabel(item.date),
  time: `${shortDate(item.date)} ${item.time} · 서울 ${item.place}`
}));

const news = activeEventCatalog.slice(0, 3).map((item, index) => ({
  tag: index === 0 ? 'NOW' : 'SOON',
  place: `${item.shop} · ${item.place}`,
  title: item.title,
  copy: `${shortDate(item.date)} ${item.time} · ${item.detail}`,
  image: item.image
}));

const rankings = [
  ['라멘바 시코우', '성수', '깔끔하고 담백한 · 깊고 시원한 맛', '1,798'],
  ['하쿠텐', '이케부쿠로', '짭짤하고 진한 · 시금치 듬뿍', '1,798'],
  ['쿠로라멘', '합정', '깊은 풍미와 부드러운 면발', '1,200'],
  ['카라카라멘', '망원', '매운 육수의 진한 국물', '1,500'],
  ['소바샤', '이태원', '신선한 야채와 가벼운 육수', '950'],
  ['쇼유라멘', '신촌', '진한 간장 육수와 부드러운 면발', '1,300']
];
const rankingMetrics = [
  { reviews: 624, latest: 6 }, { reviews: 580, latest: 4 }, { reviews: 580, latest: 5 },
  { reviews: 510, latest: 3 }, { reviews: 430, latest: 2 }, { reviews: 390, latest: 1 }
];

const talks = [
  ['합정 · 콜라보', '이번 주 한정 콜라보 가 보신 분?'],
  ['오늘의 한 그릇', '오늘자 나니요리'],
  ['추천 · 질문', '하쿠텐 오픈런 몇시가 좋아요?']
];

const ratalkPosts = [
  { id: 1, category: 'plate', author: '역삼동 라오타', badge: '라이트', time: '방금', place: '마포 반라이', score: '4.8', title: '처음 먹어본 진한 츠케멘', copy: '면의 탄력이 좋고 소스가 진하지만 마지막 스프와리까지 편안하게 먹었어요.', image: ramenPhotos.banrai, likes: 12, comments: 2, popularity: 98 },
  { id: 2, category: 'story', author: '통풍주의', badge: '라타', time: '3시간 전', place: '웅성', score: '', title: '웅성 콜라보 첫날 가실 분?', copy: '토요일 첫 타임을 예약했어요. 현장에서 같이 줄 서실 분 계신가요?', image: '', likes: 6, comments: 4, popularity: 76 },
  { id: 3, category: 'plate', author: '면발수집가', badge: '라타', time: '어제', place: '하쿠텐', score: '4.8', title: '하쿠텐 오픈런 후기', copy: '단단한 면과 짭짤한 국물이 잘 맞았고 시금치 추가가 특히 좋았습니다.', image: ramenPhotos.clear, likes: 24, comments: 5, popularity: 120 },
  { id: 4, category: 'plate', author: '망원동 면치기', badge: '라이트', time: '어제', place: '멘야준', score: '4.7', title: '맑은 국물 좋아하면 추천', copy: '닭 향이 과하지 않고 끝맛이 깔끔해서 첫 쇼유 라멘으로 좋았어요.', image: ramenPhotos.hero, likes: 7, comments: 3, popularity: 45 },
  { id: 5, category: 'story', author: '연남국물단', badge: '라이트', time: '2일 전', place: '유즈시오', score: '', title: '유즈시오 평일 대기시간', copy: '화요일 여섯 시 기준으로 스무 분 정도 기다렸습니다. 유자 향 좋아하면 추천해요.', image: '', likes: 9, comments: 6, popularity: 67 },
  { id: 6, category: 'plate', author: '성수라멘부', badge: '라타', time: '2일 전', place: '라멘바 시코우', score: '4.6', title: '시코우 청탕 한 그릇', copy: '맑지만 감칠맛이 오래 남고 얇은 면이 국물과 자연스럽게 어울렸어요.', image: ramenPhotos.newsShoyu, likes: 18, comments: 7, popularity: 88 },
  { id: 7, category: 'story', author: '합정퇴근러', badge: '라이트', time: '3일 전', place: '쿠로라멘', score: '', title: '합정 저녁 혼밥 추천 부탁해요', copy: '매운맛이 세지 않고 좌석 회전이 빠른 곳을 찾고 있어요.', image: '', likes: 4, comments: 9, popularity: 52 },
  { id: 8, category: 'plate', author: '시오한입', badge: '라타', time: '3일 전', place: '소바샤', score: '4.4', title: '채소 향이 산뜻한 시오', copy: '가벼운 육수에 구운 채소 향이 더해져 늦은 저녁에도 부담이 없었습니다.', image: ramenPhotos.mixed, likes: 15, comments: 4, popularity: 73 }
];
const escapeText = (value = '') => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const avatarMarkup = (author) => {
  const variant = [...String(author)].reduce((sum, character) => sum + character.codePointAt(0), 0) % 4;
  return `<span class="user-avatar avatar-${variant}" aria-hidden="true">${escapeText(String(author).trim().charAt(0) || 'R')}</span>`;
};
const ratalkPostMarkup = (post) => `<article class="ratalk-post" data-post-id="${post.id}" data-place="${escapeText(post.place || '')}" data-popularity="${post.popularity}" data-category="${post.category}" tabindex="0" aria-label="${escapeText(post.title || `${post.place} 한 그릇 후기`)} 상세 글 보기">
  <header>${avatarMarkup(post.author)}<strong>${escapeText(post.author)}</strong><em>${post.badge}</em><time>${post.time}</time></header>
  ${post.image ? `<img class="talk-photo" src="${post.image}" alt="${escapeText(post.place)} 라멘">` : ''}
  <div class="talk-post-body">${post.place ? `<p class="talk-place">${icon('pin', 15)} <b>${escapeText(post.place)}</b>${post.score ? `${RatingStars({ score: post.score })}<strong>${Number(post.score).toFixed(1)}</strong>` : ''}</p>` : ''}${post.title ? `<h2>${escapeText(post.title)}</h2>` : ''}<p class="talk-copy">${escapeText(post.copy)}</p></div>
  <footer><button class="talk-like ${appState.likedPostIds.includes(post.id) ? 'liked' : ''}" data-post-id="${post.id}" aria-pressed="${appState.likedPostIds.includes(post.id)}" aria-label="좋아요">${icon('heart', 20)}<span>${post.likes}</span></button><button class="talk-comment">${icon('chat', 20)} <span>${post.comments}</span></button></footer>
</article>`;

const brothChoices = [
  { id: 'clear', title: '맑고 깔끔한 마무리', copy: '청탕(시오 · 쇼유)', image: ramenPhotos.clear },
  { id: 'rich', title: '진하고 묵직한 마무리', copy: '백탕(돈코츠 · 토리파이탄)', image: ramenPhotos.rich },
  { id: 'spicy', title: '얼큰하고 자극적인', copy: '카라돈코츠 · 미소 · 탄탄멘', image: ramenPhotos.spicy },
  { id: 'unknown', title: '잘 모르겠어요', copy: '다음 취향에서 얘기할게요!', image: ramenPhotos.hero }
];

const eatingChoices = [
  { id: 'soup', title: '국물있는 라멘 (standard)', copy: '따스한 스프와 면을 같이! (입문자 추천)', image: ramenPhotos.clear },
  { id: 'dip', title: '소스에 찍어먹는 츠케멘', copy: '찐한 소스에 면을 찍어먹어요 (숙련자 추천)', image: ramenPhotos.dipping },
  { id: 'mix', title: '비벼먹는 마제소바', copy: '국물없이 꾸덕하게 비벼먹어요', image: ramenPhotos.mixed },
  { id: 'all', title: '다 좋아요', copy: '가리지 않고 다 먹어요', image: ramenPhotos.newsMiso }
];

const screenAsset = (name) => `/figma/screens/${name}`;
const prototypeScreens = {
  calendar: { nav: true },
  calendarMonth: { nav: true },
  calendarDetail: { nav: false },
  map: { nav: true }, mapSheet: { nav: true }, storeDetail: { nav: true }, storeGuest: { nav: false }, storeSaved: { nav: false }, storeLight: { nav: false }, storeRata: { nav: false }, storeRataEdit: { nav: false }, mapPrefsOld: { nav: false }, mapPrefsNew: { nav: false },
  ratalk: { nav: true }, ratalkDetail: { nav: false }, writeText: { nav: false }, writePhoto: { nav: false }, writePicker: { nav: false },
  my: { nav: true },
  myLogout: { nav: true },
  mySaved: { nav: false },
  saved: { nav: true },
  settings: { nav: false },
  settingsLogout: { nav: false },
  myPlate: { nav: false },
  loginVisual: { nav: false },
  loginForm: { nav: false },
  join: { nav: false },
  joinInput: { nav: false },
  joinValid: { nav: false },
  socialLogin: { nav: false }
  ,stateLoading:{nav:false},stateEmpty:{nav:false},stateError:{nav:false},stateMaintenance:{nav:false},stateUpdate:{nav:false}
};

document.querySelector('#app').innerHTML = `
  <div class="desktop-stage">
    <aside class="desktop-intro" aria-label="RATA 소개">
      <span class="desktop-brand-logo" role="img" aria-label="RATA"></span>
      <h1>처음이라도<br>내 취향의 라멘을<br>고를 수 있도록</h1>
      <span class="desktop-accent-bar" aria-hidden="true"></span>
      <p>RATA는 오늘 먹고 싶은 조건으로 가게를 찾고, 메뉴와 방문 정보를 확인해 저장하는 탐색 프로토타입이에요.</p>
    </aside>
    <div class="phone-frame-slot">
      <div class="phone-frame">
        <span class="phone-island" aria-hidden="true"></span>
        <span class="phone-side-button phone-side-button-one" aria-hidden="true"></span>
        <span class="phone-side-button phone-side-button-two" aria-hidden="true"></span>
        <span class="phone-side-button phone-side-button-three" aria-hidden="true"></span>
        <span class="phone-side-button phone-side-button-four" aria-hidden="true"></span>
        <div class="phone-screen">
          ${StatusBar({ className: 'frame-status' })}
          <span class="frame-home-indicator" aria-hidden="true"></span>
  <div class="experience-shell">
  <section class="splash-screen" aria-label="RATA 시작 화면">
    <video class="splash-video" autoplay muted playsinline preload="auto" aria-label="라멘 온보딩 영상">
      <source src="/video/onboding.mp4" type="video/mp4">
    </video>
    <button class="splash-skip" type="button">건너뛰기</button>
  </section>

  <section class="onboarding" aria-label="취향 온보딩" aria-hidden="true">
    <div class="onboarding-meta"><span class="step-count">1 / 3</span><button class="later-btn">나중에</button></div>
    <div class="onboarding-progress" aria-hidden="true"><i class="active"></i><i></i><i></i></div>
    <div class="onboarding-window">
      <div class="onboarding-track">
        <article class="onboarding-page" data-step="0">
          <div class="onboarding-title"><h1>어떤 국물 좋아하세요 ?</h1><p>3번만 답해주시면 첫 홈이 내 취향으로 채워져요.<br>나중에 언제든지 바꿀 수 있어요!</p></div>
          <div class="broth-grid">
            ${brothChoices.map((item) => `<button class="broth-card" data-broth="${item.id}" aria-pressed="false" style="--choice-image:url('${item.image}')">
              <span><strong>${item.title}</strong><small>${item.copy}</small></span>
            </button>`).join('')}
          </div>
          <div class="onboarding-actions"><button class="wide-choice" data-broth="all">다 좋아요</button><button class="primary-btn onboarding-next">다음</button><button class="secondary-btn later-btn">건너뛰기</button></div>
        </article>

        <article class="onboarding-page" data-step="1">
          <div class="onboarding-title"><h1>어떻게 먹는게 좋아요?</h1><p>가게 추천과 일정 알림에 쓰여요.<br>하나만 골라주시면 금방 알아볼게요.</p></div>
          <div class="taste-list">
            ${eatingChoices.map((item) => `<button class="taste-option" data-eating="${item.id}" aria-pressed="false">
              <span class="taste-image" style="--choice-image:url('${item.image}')"></span>
              <span class="taste-copy"><strong>${item.title}</strong><small>${item.copy}</small></span><i class="radio"></i>
            </button>`).join('')}
          </div>
          <div class="onboarding-actions"><button class="primary-btn onboarding-next">다음</button><button class="secondary-btn onboarding-back">이전으로</button></div>
        </article>

        <article class="onboarding-page" data-step="2">
          <div class="onboarding-title"><h1>어떤 소식을<br>먼저 알려드릴까요?</h1><p>취향에 맞는 소식만 보내드려요. 설정에서 언제든 끌 수 있습니다.</p></div>
          <div class="preference-list">
            ${[
              ['collab', '내 취향 콜라보 · 팝업 오픈', '방금 고른 국물 · 방식에 맞는 새 콜라보 · 팝업', true],
              ['shop', '좋아하는 가게 소식', '저장한 가게의 팝업 · 한정 · 시즌 메뉴 오픈 알림', true],
              ['near', '근처 팝업', '내 위치 반경 3km 안 팝업 오픈 소식을 알려드려요', false]
            ].map(([id,title,copy,on]) => `<div class="preference-row"><div><strong>${title}</strong><small>${copy}</small></div><button class="pref-toggle ${on ? 'on' : ''}" data-pref="${id}" aria-pressed="${on}" aria-label="${title} 알림 ${on ? '켜짐' : '꺼짐'}"><i></i></button></div>`).join('')}
          </div>
          <div class="onboarding-actions"><button class="primary-btn start-btn">시작하기</button><button class="secondary-btn onboarding-back">이전으로</button></div>
        </article>
      </div>
    </div>
  </section>

  <main class="phone-shell">
    <header class="app-header">
      <div class="header-top">
        <a href="#top" class="logo" aria-label="RATA 홈"><img src="/brand/txt_logo_RATA.svg" alt="RATA"></a>
        <div class="header-actions"><button class="icon-btn notify" type="button" data-notifications aria-label="알림">${icon('bell', 23)}<i></i></button></div>
      </div>
    </header>

    <section class="explore-home" aria-label="라멘집 탐색"></section>

    <section class="hero" id="top" aria-label="주요 소식 슬라이드">
      <div class="hero-track"></div>
      <div class="hero-dots"></div>
    </section>

    <div class="divider"></div>

    <section class="section calendar-section">
      <div class="section-head">
        <div><p class="overline">WEEKLY PICK</p><h2>이번주 팝업일정 <span class="heading-icon">${icon('bowl', 24)}</span></h2><p class="sub">${shortDate(weekDates[0])} — ${shortDate(weekDates[6])} · ${events.length}개 일정</p></div>
        <button class="text-btn" data-home-all>전체보기 ${icon('chevron', 16)}</button>
      </div>
      <div class="date-row" aria-label="날짜 선택">
        ${weekDates.map((date, index) => {
          const key = dateKey(date);
          const hasEvent = events.some((event) => event.date === key);
          const label = date.getDate() === 1 ? `${date.getMonth() + 1}/1` : date.getDate();
          return `<button class="date-card ${key === todayKey ? 'selected' : ''}" data-date="${key}" aria-label="${shortDate(date)} ${weekDayLabels[index]}요일"><small>${weekDayLabels[index]}</small><strong>${label}</strong>${hasEvent ? '<i></i>' : ''}</button>`;
        }).join('')}
      </div>
      <div class="empty-schedule" aria-hidden="true"><strong>${icon('bowl', 32)}</strong><h3>이날 등록된 일정이 없어요</h3><p>다른 날짜를 눌러 이번주 일정을 확인해보세요.</p></div>
      <div class="events-wrap">
        <div class="events-track"></div>
        <div class="mini-dots"></div>
      </div>
    </section>

    <div class="divider"></div>

    <div class="light-only">
      <section class="section today-section">
        <div class="section-head compact"><div><h2>오늘의 라멘은?</h2><p class="sub">라멘 이름을 몰라도 괜찮아요!</p></div></div>
        <div class="today-grid">
          ${[
            [ramenPhotos.clear, '맑고 시원한 청탕', '가볍게 퍼지는 닭과 해산물 향'],
            [ramenPhotos.dipping, '소스에 찍어 먹는 츠케멘', '면의 식감이 또렷하게 살아나는'],
            [ramenPhotos.mixed, '국물 없이 비벼 먹는 마제소바', '꾸덕한 양념과 고소한 토핑'],
            [ramenPhotos.rich, '진하고 묵직한 백탕', '오래 끓인 육수의 깊은 풍미']
          ].map(([image,title,copy]) => `<button class="today-card" style="--today:url('${image}')" data-toast="취향별 라멘 목록을 준비 중이에요"><strong>${title}</strong><span>${copy}</span></button>`).join('')}
        </div>
      </section>
      <div class="divider"></div>
    </div>

    <section class="section news-section rata-only">
      <div class="section-head compact"><div><h2>News&Hot</h2><p class="sub">요새 괜찮은 라멘집 찾고 계시진 않나요?</p></div></div>
      <div class="news-track">
        ${news.map((item, index) => `<button class="news-card" style="--image: url('${item.image}')" data-news-detail="${index}">
          <span class="pill outline">${item.tag}</span>
          <span class="news-copy"><small>${item.place}</small><strong>${item.title}</strong><em>${item.copy}</em></span>
          <span class="round-arrow">${icon('arrow', 18)}</span>
        </button>`).join('')}
      </div>
    </section>

    <div class="divider rata-only"></div>

    <section class="section ranking-section light-only">
      <div class="section-head compact"><div><h2>요즘 가장 많이 찾는 라멘집</h2><p class="sub">집계 기준이 연결되면 제공할 예정이에요.</p></div></div>
      <div class="tabs" role="tablist" aria-label="랭킹 정렬"><button class="tab active" role="tab" aria-selected="true" data-sort="popular">인기순</button><button class="tab" role="tab" aria-selected="false" data-sort="review">리뷰순</button></div>
      <ol class="ranking-list">
        ${rankings.map((r, i) => `<li data-index="${i}" data-popular="${Number(r[3].replace(',', ''))}" data-interest="${r[3]}" data-reviews="${rankingMetrics[i].reviews}" data-latest="${rankingMetrics[i].latest}"><strong class="rank">${i + 1}</strong><div class="rank-copy"><small>${r[1]}</small><h3>${r[0]}</h3><p>${r[2]}</p></div><span class="interest">${r[3]}명 관심중</span></li>`).join('')}
      </ol>
    </section>

    <div class="divider light-only"></div>

    <section class="section talk-section rata-only">
      <div class="section-head compact"><div><h2>화제 중인 라타토크</h2><p class="sub">라타들이 지금 가장 많이 이야기하는 주제예요</p></div></div>
      <ol class="talk-list">
        ${talks.map((talk, i) => `<li><span>${i + 1}</span><button data-toast="토크 상세 화면을 준비 중이에요"><small>${talk[0]}</small><strong>${talk[1]}</strong></button>${icon('chevron', 23)}</li>`).join('')}
      </ol>
    </section>

    <nav class="bottom-nav" aria-label="하단 메뉴">
      <span class="nav-highlight" aria-hidden="true"></span>
      ${[['search','탐색'],['calendar','일정'],['bookmark','저장'],['user','마이']].map(([key,label],i) => `<button class="nav-item ${i===0?'active':''}" data-nav="${label}">${icon(key,24)}<span class="nav-label">${label}</span></button>`).join('')}
    </nav>
    <section class="prototype-screen" aria-hidden="true" inert>
      <div class="prototype-canvas">
        <img class="prototype-image" alt="">
        <div class="prototype-hotspots"></div>
      </div>
      <section class="live-map-screen" hidden aria-label="라멘 지도">
        <div id="rata-map" class="rata-map" aria-label="홍대 주변 라멘집 지도"></div>
        <div class="map-filters" aria-label="지도 필터">
          <button data-map-back>${icon('back', 18)} 목록</button>
          <button class="active" data-map-filter="all">조건 결과</button>
          <button data-map-filter="rich">진한 맛</button>
          <button data-map-filter="clear">담백한 맛</button>
        </div>
        <aside class="store-sheet" aria-hidden="true">
          <button class="sheet-handle" aria-label="매장 정보 펼치기"><i></i></button>
          <div class="sheet-scroll">
            <div class="store-title-row">
              <div><h2 class="store-name">마포 반라이</h2><span class="store-match">프로토타입 예시 데이터</span></div>
              <div><button class="sheet-save" aria-label="저장">${icon('bookmark', 23)}</button><button class="sheet-close" aria-label="닫기">${icon('close', 24)}</button></div>
            </div>
            <div class="store-chips"></div>
            <div class="store-summary"><strong class="store-menu"></strong><span class="store-price"></span></div>
            <div class="store-gallery">
              <img src="${ramenPhotos.banrai}" alt="마포 반라이 츠케멘">
              <img src="${ramenPhotos.koreanShoyu}" alt="마포 반라이 쇼유 라멘">
              <img src="${ramenPhotos.koreanClear}" alt="마포 반라이 맑은 라멘">
            </div>
            <button class="sheet-more">메뉴와 방문 조건 확인하기 ${icon('chevron', 18)}</button>
            <div class="store-expanded-content">
              <section><h3>방문 조건</h3><dl><div><dt>영업 상태</dt><dd>확인 필요</dd></div><div><dt>영업시간</dt><dd>확인 필요</dd></div><div><dt>휴식·마감</dt><dd>확인 필요</dd></div></dl><p class="data-note">실시간 영업 정보는 아직 연결되지 않았어요. 출발 전 지도 서비스에서 확인해주세요.</p></section>
              <section><h3>위치와 접근</h3><dl><div><dt>주소</dt><dd class="store-address">서울 마포구 동교로 212</dd></div></dl><a class="store-directions" target="_blank" rel="noopener">네이버 지도에서 길찾기 ${icon('arrow', 18)}</a></section>
              <section><h3>선택 조건과 비교</h3><p class="store-reason"></p><p class="store-caution"></p></section>
              <section><h3>방문 후기</h3><div class="store-review-list"></div></section>
              <details class="store-technical"><summary>육수·타래·면 정보 더 보기 ${icon('chevron',16)}</summary><p class="store-technical-copy"></p></details>
            </div>
          </div>
        </aside>
        <div class="taste-modal" hidden>
          <button class="taste-backdrop" aria-label="취향 편집 닫기"></button>
          <section class="taste-panel" role="dialog" aria-modal="true" aria-labelledby="taste-title">
            <header><div><small>지도 추천에 반영돼요</small><h2 id="taste-title">내 취향 편집</h2></div><button class="taste-close" aria-label="닫기">${icon('close', 24)}</button></header>
            <div class="taste-editor-groups"></div>
            <button class="taste-save">취향 저장하기</button>
          </section>
        </div>
      </section>
      <section class="live-ratalk-screen" hidden aria-label="라톡">
        ${ScreenTitleRow({ title: '라톡', action: `<button class="screen-title-action talk-search-toggle" type="button" aria-label="검색">${icon('search', 23)}</button>` })}
        <form class="ratalk-search" hidden><input type="search" aria-label="라톡 검색" placeholder="글, 작성자, 매장 검색"><button type="button" class="talk-search-close">취소</button></form>
        <nav class="ratalk-categories" aria-label="라톡 분류">
          <button class="active" data-talk-filter="all">전체</button><button data-talk-filter="plate">한 그릇</button><button data-talk-filter="story">이야기</button>
        </nav>
        <div class="ratalk-controls">
          <div class="talk-sort-wrap"><button class="talk-sort" aria-expanded="false"><span>최신순</span>${icon('chevron', 16)}</button><div class="talk-sort-menu" hidden><button data-talk-sort="latest">최신순</button><button data-talk-sort="popular">인기순</button></div></div>
          <div class="talk-place-wrap"><button class="talk-place-filter" aria-expanded="false">${icon('pin', 15)} <span>매장전체</span> ${icon('chevron', 14)}</button><div class="talk-place-menu" hidden><button type="button" data-talk-place="all">매장전체</button><button type="button" data-talk-place="banrai">반라이</button><button type="button" data-talk-place="menyajun">멘야준</button><button type="button" data-talk-place="hakuten">하쿠텐</button><button type="button" data-talk-place="yuzushio">유즈시오</button></div></div>
        </div>
        <div class="ratalk-feed">
          ${ratalkPosts.map(ratalkPostMarkup).join('')}
        </div>
        <button class="ratalk-compose" aria-label="글쓰기">${icon('edit', 24)}</button>
      </section>
      <section class="live-ratalk-sub" hidden aria-label="라톡 상세"></section>
      <section class="live-state-screen" hidden aria-label="상태 화면"></section>
      <section class="live-calendar-screen" hidden aria-label="일정"></section>
      <section class="live-my-screen" hidden aria-label="마이"></section>
      <section class="live-auth-screen" hidden aria-label="로그인">
        <div class="auth-visual">
          <button class="auth-hero-back" type="button" aria-label="이전 화면">${icon('back', 24)}</button>
          <img src="/brand/R_logo_RATA.svg" alt="RATA">
          <h1>당신의<br>깊어질<br>취향을</h1>
        </div>
        <section class="auth-social-entry" aria-label="로그인 방법 선택">
          <div class="auth-provider-list">
            <button type="button" class="auth-provider kakao" data-provider="카카오">${socialIcon('카카오')}<span>카카오로 계속하기</span></button>
            <button type="button" class="auth-provider naver" data-provider="네이버">${socialIcon('네이버')}<span>네이버로 계속하기</span></button>
            <button type="button" class="auth-provider google" data-provider="구글">${socialIcon('구글')}<span>Google로 계속하기</span></button>
            <button type="button" class="auth-provider apple" data-provider="애플">${socialIcon('애플')}<span>Apple로 계속하기</span></button>
          </div>
          <button type="button" class="auth-email-entry">${icon('mail', 20)}<span>이메일로 로그인</span></button>
          <p>아직 계정이 없나요? <button class="auth-social-join" type="button">회원가입</button></p>
          <button class="auth-social-browse" type="button">먼저 둘러보기</button>
        </section>
        <section class="auth-card">
          <form class="auth-form" novalidate>
            ${Input({ name: 'email', label: '이메일 주소', type: 'email', placeholder: '이메일 주소', autocomplete: 'email', required: true })}
            ${Input({ name: 'password', label: '비밀번호', type: 'password', placeholder: '비밀번호', autocomplete: 'current-password', required: true, hint: '영문, 숫자 포함 8자 이상' })}
            <p class="auth-terms">가입하면 <button type="button">이용약관</button>과 <button type="button">개인정보 처리방침</button>에 동의해요.</p>
            ${Button({ label: '로그인하기', type: 'submit', className: 'auth-submit', disabled: true })}
          </form>
          <footer><p class="login-only"><button type="button" data-auth-help>비밀번호 찾기</button></p><p class="auth-switch-copy">아직 계정이 없나요? <button class="auth-switch" type="button">회원가입</button></p></footer>
        </section>
      </section>
      <nav class="prototype-nav" aria-label="피그마 하단 메뉴">
        <span class="nav-highlight" aria-hidden="true"></span>
        ${[['search','탐색'],['calendar','일정'],['bookmark','저장'],['user','마이']].map(([key,label], index) => `<button class="nav-item ${index===0?'active':''}" data-prototype-nav="${index}" aria-label="${label}">${icon(key,24)}<span class="nav-label">${label}</span></button>`).join('')}
      </nav>
    </section>
    ${Dialog({ id: 'logout-dialog', title: '로그아웃 할까요?', body: '저장한 일정, 취향, 한 그릇은 그대로 남아있어요. 다시 로그인 하면 이어서 볼 수 있어요.', confirmLabel: '로그아웃' })}
    ${Dialog({ id: 'delete-dialog', title: '정말 탈퇴할까요?', body: '저장한 일정과 취향 기록이 모두 삭제되며 되돌릴 수 없어요.', confirmLabel: '탈퇴하기' })}
    ${Dialog({ id: 'login-required-dialog', title: '로그인이 필요해요', body: '저장과 좋아요는 로그인 후 이용할 수 있어요.', confirmLabel: '로그인' })}
    ${Dialog({ id: 'content-detail-dialog', title: '상세 정보', body: '내용을 불러왔어요.', confirmLabel: '확인', cancelLabel: '닫기' })}
    <aside class="notification-panel" hidden aria-label="알림 패널"><header><h2>알림</h2><button type="button" data-clear-notifications>모두 지우기</button><button type="button" data-close-notifications aria-label="알림 닫기">${icon('close', 24)}</button></header><div class="notification-list"></div></aside>
    ${Toast()}
  </main>
  </div>
        </div>
      </div>
    </div>
    <aside class="desktop-modes desktop-experience" aria-label="대표 체험 안내">
      <p class="overline">대표 체험</p>
      <h2>취향을 골라<br>가게를 찾아보세요.</h2>
      <p>연남 · 담백한 맛 · 맵지 않음 조건이 예시로 선택되어 있어요. 폰 화면에서 조건을 바꿔 결과를 확인할 수 있어요.</p>
      <button class="desktop-start" type="button">탐색 시작하기 ${icon('arrow', 18)}</button>
      <footer>2026 UX / UI Portfolio · Designed by 이솔화</footer>
    </aside>
  </div>
`;

const phoneScreen = document.querySelector('.phone-screen');
const globalAppHeader = document.querySelector('.app-header');
phoneScreen.insertBefore(globalAppHeader, phoneScreen.querySelector('.experience-shell'));
const frameBottomNav = document.querySelector('.bottom-nav');
const framePrototypeNav = document.querySelector('.prototype-nav');
const frameCompose = document.querySelector('.ratalk-compose');
const frameToast = document.querySelector('.toast');
[frameBottomNav, framePrototypeNav, frameCompose, frameToast].forEach((element) => phoneScreen.append(element));
frameCompose.hidden = true;
const frameStatus = phoneScreen.querySelector('.frame-status');
let currentRoute = 'splash';
let activeScrollContainer = null;
let scrollPosition = 0;
let scrollDistance = 0;
let scrollFrame = 0;

const autoHideRoutes = new Set(['home', 'calendar', 'calendarMonth', 'calendarDetail', 'ratalk', 'ratalkDetail', 'my', 'myLogout', 'mySaved', 'myPlate', 'settings', 'settingsLogout']);
const routeScrollContainer = (route) => {
  if (route === 'home') return document.querySelector('.experience-shell');
  if (['calendar', 'calendarMonth', 'calendarDetail'].includes(route)) return document.querySelector('.live-calendar-screen');
  if (['storeGuest', 'storeSaved', 'storeLight', 'storeRata'].includes(route)) return document.querySelector('.sheet-scroll');
  if (route === 'ratalk') return document.querySelector('.live-ratalk-screen');
  if (route === 'ratalkDetail') return document.querySelector('.live-ratalk-sub');
  if (['my', 'myLogout', 'mySaved', 'myPlate', 'settings', 'settingsLogout'].includes(route)) return document.querySelector('.live-my-screen');
  return null;
};
const showFrameHeader = () => phoneScreen.classList.remove('header-hidden');
const setFrameStatusSurface = (route = currentRoute) => {
  const authRoute = ['loginVisual','loginForm','join','joinInput','joinValid','socialLogin'].includes(route);
  const transparentRoute = route === 'splash' || authRoute;
  const background = transparentRoute ? 'transparent' : (appState.mode === 'rata' ? 'var(--accent)' : 'var(--ink)');
  phoneScreen.style.setProperty('--header-bg', background);
  phoneScreen.style.setProperty('--header-color', '#fff');
  phoneScreen.classList.toggle('status-on-dark', true);
  phoneScreen.classList.toggle('status-on-light', false);
};
const resetFrameChrome = (route, container = routeScrollContainer(route)) => {
  currentRoute = route;
  phoneScreen.dataset.route = route;
  activeScrollContainer = autoHideRoutes.has(route) ? container : null;
  scrollPosition = activeScrollContainer?.scrollTop || 0;
  scrollDistance = 0;
  showFrameHeader();
  setFrameStatusSurface(route);
};
const handleChromeScroll = (container) => {
  if (container !== activeScrollContainer || !autoHideRoutes.has(currentRoute)) return;
  cancelAnimationFrame(scrollFrame);
  scrollFrame = requestAnimationFrame(() => {
    const next = container.scrollTop;
    if (next <= 8) {
      showFrameHeader();
      scrollDistance = 0;
      scrollPosition = next;
      return;
    }
    const delta = next - scrollPosition;
    if ((delta > 0 && scrollDistance < 0) || (delta < 0 && scrollDistance > 0)) scrollDistance = 0;
    scrollDistance += delta;
    if (scrollDistance >= 8) {
      phoneScreen.classList.add('header-hidden');
      scrollDistance = 0;
    } else if (scrollDistance <= -8) {
      showFrameHeader();
      scrollDistance = 0;
    }
    scrollPosition = next;
  });
};
const chromeScrollContainers = ['.experience-shell', '.live-calendar-screen', '.live-ratalk-screen', '.live-ratalk-sub', '.live-my-screen', '.sheet-scroll'].map((selector) => document.querySelector(selector));
chromeScrollContainers.forEach((container) => container.addEventListener('scroll', () => handleChromeScroll(container), { passive: true }));
resetFrameChrome('splash', null);

const heroTrack = document.querySelector('.hero-track');
const heroDots = document.querySelector('.hero-dots');
heroTrack.innerHTML = heroSlides.map((slide, i) => `<article class="hero-slide" style="--hero: url('${slide.image}')" aria-hidden="${i !== 0}"><div class="hero-copy"><p>${slide.eyebrow}</p><h1>${slide.title}</h1><small>${slide.meta}</small></div></article>`).join('');
heroDots.innerHTML = heroSlides.map((_, i) => `<button class="${i === 0 ? 'active' : ''}" aria-label="${i + 1}번째 슬라이드"></button>`).join('');

let heroIndex = 0;
const setHero = (index) => {
  heroIndex = (index + heroSlides.length) % heroSlides.length;
  heroTrack.scrollTo({ left: heroIndex * heroTrack.clientWidth, behavior: 'smooth' });
  document.querySelectorAll('.hero-slide').forEach((slide, i) => slide.setAttribute('aria-hidden', i !== heroIndex));
  [...heroDots.children].forEach((dot, i) => dot.classList.toggle('active', i === heroIndex));
};
[...heroDots.children].forEach((dot, i) => dot.addEventListener('click', () => setHero(i)));

const enableSwipe = (element, onLeft, onRight) => {
  let startX = 0;
  element.addEventListener('pointerdown', (e) => { startX = e.clientX; });
  element.addEventListener('pointerup', (e) => {
    const delta = e.clientX - startX;
    if (Math.abs(delta) > 45) delta < 0 ? onLeft() : onRight();
  });
};
const initializedCarousels = new WeakSet();
function setupSnapCarousel(viewport, { itemSelector = ':scope > *', dots, onIndexChange } = {}) {
  if (!viewport || initializedCarousels.has(viewport)) return;
  const items = [...viewport.querySelectorAll(itemSelector)];
  if (items.length < 2) return;
  initializedCarousels.add(viewport);
  viewport.classList.add('drag-carousel');
  viewport.setAttribute('aria-roledescription', 'carousel');
  items.forEach((item, index) => {
    item.setAttribute('aria-label', `${index + 1} / ${items.length}`);
    item.dataset.carouselIndex = index;
  });
  const dotHost = dots || document.createElement('div');
  if (!dots) {
    dotHost.className = 'carousel-dots';
    viewport.after(dotHost);
  }
  dotHost.innerHTML = items.map((_, index) => `<button type="button" class="${index === 0 ? 'active' : ''}" aria-label="${index + 1}번 슬라이드로 이동"></button>`).join('');
  const positions = () => items.map((item) => item.offsetLeft - items[0].offsetLeft);
  const nearestIndex = () => positions().reduce((best, left, index, all) => Math.abs(viewport.scrollLeft - left) < Math.abs(viewport.scrollLeft - all[best]) ? index : best, 0);
  const update = (index = nearestIndex()) => {
    [...dotHost.children].forEach((dot, dotIndex) => dot.classList.toggle('active', dotIndex === index));
    onIndexChange?.(index);
  };
  const go = (index, behavior = 'smooth') => {
    const safeIndex = Math.max(0, Math.min(items.length - 1, index));
    viewport.scrollTo({ left: positions()[safeIndex], behavior });
    update(safeIndex);
  };
  [...dotHost.children].forEach((dot, index) => dot.addEventListener('click', () => go(index)));
  let drag = null;
  let suppressClick = false;
  viewport.addEventListener('pointerdown', (event) => {
    if (event.button !== undefined && event.button !== 0) return;
    drag = { id: event.pointerId, x: event.clientX, scroll: viewport.scrollLeft, moved: false };
    viewport.setPointerCapture(event.pointerId);
    viewport.classList.add('is-dragging');
  });
  viewport.addEventListener('pointermove', (event) => {
    if (!drag || event.pointerId !== drag.id) return;
    const delta = event.clientX - drag.x;
    drag.moved ||= Math.abs(delta) >= 6;
    if (drag.moved) viewport.scrollLeft = drag.scroll - delta;
  });
  const finish = (event) => {
    if (!drag || event.pointerId !== drag.id) return;
    suppressClick = drag.moved;
    drag = null;
    viewport.classList.remove('is-dragging');
    go(nearestIndex());
    window.setTimeout(() => { suppressClick = false; }, 0);
  };
  viewport.addEventListener('pointerup', finish);
  viewport.addEventListener('pointercancel', finish);
  viewport.addEventListener('click', (event) => {
    if (!suppressClick) return;
    event.preventDefault();
    event.stopPropagation();
  }, true);
  let scrollFrame;
  viewport.addEventListener('scroll', () => {
    cancelAnimationFrame(scrollFrame);
    scrollFrame = requestAnimationFrame(() => update());
  }, { passive: true });
  items.forEach((item, index) => item.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    const next = index + (event.key === 'ArrowRight' ? 1 : -1);
    go(next);
    items[Math.max(0, Math.min(items.length - 1, next))].focus();
  }));
  update(0);
}

setupSnapCarousel(heroTrack, {
  itemSelector: ':scope > .hero-slide',
  dots: heroDots,
  onIndexChange: (index) => {
    heroIndex = index;
    document.querySelectorAll('.hero-slide').forEach((slide, slideIndex) => slide.setAttribute('aria-hidden', slideIndex !== index));
  }
});
setupSnapCarousel(document.querySelector('.store-gallery'), { itemSelector: ':scope > img' });

const miniDots = document.querySelector('.mini-dots');
miniDots.innerHTML = '';

const eventsTrack = document.querySelector('.events-track');
const eventsWrap = document.querySelector('.events-wrap');
const emptySchedule = document.querySelector('.empty-schedule');
const renderEvents = (selectedDate) => {
  const selectedEvents = events.filter((event) => event.date === selectedDate);
  eventsTrack.innerHTML = selectedEvents.map((event) => `<article class="event-card" data-event-id="${event.id}" tabindex="0">
    <img src="${event.image}" alt="${event.title} 라멘 사진">
    <div class="event-copy"><div><span class="pill dark">${event.shop}</span><span class="dday schedule-dday">${event.dday}</span></div><h3>${event.title}</h3><p class="event-time schedule-date">${event.time}</p><p class="event-detail">${event.detail}</p></div>
    <button class="bookmark ${appState.savedEventIds.includes(event.id) ? 'saved' : ''}" aria-label="${event.title} 북마크" aria-pressed="${appState.savedEventIds.includes(event.id)}">${icon('bookmark', 21)}</button>
  </article>`).join('');
  const isEmpty = selectedEvents.length === 0;
  eventsWrap.classList.toggle('is-hidden', isEmpty);
  emptySchedule.classList.toggle('is-visible', isEmpty);
  emptySchedule.setAttribute('aria-hidden', String(!isEmpty));
};
renderEvents(todayKey);

function renderTasteEditorMode() {
  const content = modeContent[appState.mode];
  const subtitle = document.querySelector('.taste-panel header small');
  if (subtitle) subtitle.textContent = content.panelSubtitle;
  const groups = document.querySelector('.taste-editor-groups');
  if (!groups) return;
  const savedChoices = appState.tasteEdit?.choices || [];
  const termHelp = {
    '지로인스파이어': '푸짐한 채소와 굵은 면, 진한 돼지 육수가 특징인 스타일',
    '카에시강함': '육수의 간과 향을 정하는 타래가 강한 맛',
    '극태면': '일반 라멘보다 매우 굵은 면',
    '저가수면': '수분이 적어 단단하고 씹는 맛이 강한 면'
  };
  groups.innerHTML = content.groups.map(([title, chips]) => `<div class="taste-editor-group">${title ? `<h3>${title}</h3>` : ''}<div class="taste-pills">${chips.map((chip) => {
    const helpKey = Object.keys(termHelp).find((term) => chip.includes(term));
    const help = helpKey ? termHelp[helpKey] : '';
    return `<button type="button" class="${savedChoices.includes(chip) ? 'selected' : ''}" aria-pressed="${savedChoices.includes(chip)}" ${help ? `title="${help}" aria-description="${help}"` : ''}>${chip}${help ? icon('info', 16) : ''}</button>`;
  }).join('')}</div></div>`).join('');
}

document.body.classList.remove('rata-mode');
renderTasteEditorMode();

const updateDesktopFrameScale = () => {
  const scale = Math.min(1, (window.innerHeight - 48) / 940);
  document.documentElement.style.setProperty('--s', String(Math.max(0, scale)));
  document.documentElement.style.setProperty('--mobile-frame-scale', String(Math.min(1, window.innerWidth / 430)));
};
updateDesktopFrameScale();
window.addEventListener('resize', updateDesktopFrameScale, { passive: true });

document.querySelectorAll('.date-card').forEach(card => card.addEventListener('click', () => {
  document.querySelectorAll('.date-card').forEach(c => c.classList.remove('selected'));
  card.classList.add('selected');
  renderEvents(card.dataset.date);
}));

eventsTrack.addEventListener('click', (event) => {
  const btn = event.target.closest('.bookmark');
  const card = event.target.closest('.event-card');
  if (btn) {
    const id = card.dataset.eventId;
    const active = !appState.savedEventIds.includes(id);
    appState.savedEventIds = active ? [...appState.savedEventIds, id] : appState.savedEventIds.filter((savedId) => savedId !== id);
    persistState('rata_saved_events', appState.savedEventIds);
    btn.classList.toggle('saved', active);
    btn.setAttribute('aria-pressed', String(active));
    showToast(active ? '일정을 저장했어요' : '저장을 취소했어요');
    return;
  }
  if (card) { appState.selectedEventId = card.dataset.eventId; openPrototype('calendarDetail'); }
});
eventsTrack.addEventListener('keydown', (event) => {
  if ((event.key === 'Enter' || event.key === ' ') && event.target.closest('.event-card')) {
    event.preventDefault();
    appState.selectedEventId = event.target.closest('.event-card').dataset.eventId;
    openPrototype('calendarDetail');
  }
});
document.querySelector('[data-home-all]').addEventListener('click', () => openPrototype('calendar'));
document.querySelectorAll('[data-news-detail]').forEach((button) => button.addEventListener('click', () => {
  const item = news[Number(button.dataset.newsDetail)];
  const dialog = document.getElementById('content-detail-dialog');
  dialog.querySelector('h2').textContent = item.title;
  dialog.querySelector('p').textContent = `${item.place} · ${item.copy}`;
  openDialog('content-detail-dialog');
}));

document.querySelectorAll('.tab').forEach(tab => tab.addEventListener('click', () => {
  document.querySelectorAll('.tab').forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
  tab.classList.add('active');
  tab.setAttribute('aria-selected', 'true');
  const list = document.querySelector('.ranking-list');
  const key = tab.dataset.sort === 'review' ? 'reviews' : 'popular';
  [...list.children]
    .sort((a, b) => Number(b.dataset[key]) - Number(a.dataset[key]) || Number(b.dataset.reviews) - Number(a.dataset.reviews) || Number(b.dataset.latest) - Number(a.dataset.latest))
    .forEach((item, index) => {
      item.querySelector('.rank').textContent = String(index + 1);
      item.querySelector('.interest').textContent = key === 'reviews' ? `리뷰 ${Number(item.dataset.reviews).toLocaleString('ko-KR')}개` : `${item.dataset.interest}명 관심중`;
      list.append(item);
    });
}));
document.querySelector('.tab[data-sort="popular"]').click();

const bottomNav = document.querySelector('.bottom-nav');
const syncNavHighlight = (nav) => {
  if (!nav || nav.hidden) return;
  const active = nav.querySelector('.nav-item.active');
  if (!active) return;
  const navRect = nav.getBoundingClientRect();
  const activeRect = active.getBoundingClientRect();
  const scale = navRect.width / nav.offsetWidth || 1;
  nav.style.setProperty('--nav-left', `${(activeRect.left - navRect.left) / scale}px`);
  nav.style.setProperty('--nav-width', `${activeRect.width / scale}px`);
};
requestAnimationFrame(() => syncNavHighlight(bottomNav));
window.addEventListener('resize', () => {
  syncNavHighlight(bottomNav);
  syncNavHighlight(document.querySelector('.prototype-nav'));
}, { passive: true });

const prototypeScreen = document.querySelector('.prototype-screen');
const prototypeImage = document.querySelector('.prototype-image');
const prototypeHotspots = document.querySelector('.prototype-hotspots');
const prototypeNav = document.querySelector('.prototype-nav');
const prototypeCanvas = document.querySelector('.prototype-canvas');
const liveMapScreen = document.querySelector('.live-map-screen');
const liveRatalkScreen = document.querySelector('.live-ratalk-screen');
const liveRatalkSub = document.querySelector('.live-ratalk-sub');
const liveStateScreen = document.querySelector('.live-state-screen');
const liveCalendarScreen = document.querySelector('.live-calendar-screen');
const liveMyScreen = document.querySelector('.live-my-screen');
const liveAuthScreen = document.querySelector('.live-auth-screen');
const storeSheet = document.querySelector('.store-sheet');
const tasteModal = document.querySelector('.taste-modal');
let rataMap;
let mapMarkers = [];
let naverMapsPromise;
const authRoutes = new Set(['loginVisual', 'loginForm', 'join', 'joinInput', 'joinValid', 'socialLogin']);
const myRoutes = new Set(['my', 'myLogout', 'mySaved', 'saved', 'settings', 'settingsLogout', 'myPlate']);
const calendarRoutes = new Set(['calendar', 'calendarMonth', 'calendarDetail']);
const mapRoutes = new Set(['map','mapSheet','storeDetail','storeGuest','storeSaved','storeLight','storeRata','storeRataEdit','mapPrefsOld','mapPrefsNew']);
const ratalkSubRoutes = new Set(['ratalkDetail','writeText','writePhoto','writePicker']);
const stateRoutes=new Set(['stateLoading','stateEmpty','stateError','stateMaintenance','stateUpdate']);
const navRoutes = ['home', 'calendar', 'saved', 'my'];
const navIndexForRoute = (route) => {
  if (calendarRoutes.has(route)) return 1;
  if (route === 'saved' || route === 'mySaved') return 2;
  if (myRoutes.has(route)) return 3;
  if (mapRoutes.has(route)) return 0;
  return 0;
};
const syncRouteNavigation = (route) => {
  const navIndex = navIndexForRoute(route);
  [bottomNav, prototypeNav].forEach((nav) => {
    nav.style.setProperty('--nav-index', navIndex);
    nav.querySelectorAll('.nav-item').forEach((item, index) => {
      const active = index === navIndex;
      item.classList.toggle('active', active);
      item.setAttribute('aria-current', active ? 'page' : 'false');
    });
    requestAnimationFrame(() => syncNavHighlight(nav));
  });
};
const navigateToNavIndex = (index) => {
  if (index === 0) closePrototype();
  else openPrototype(navRoutes[index]);
};
bottomNav.querySelectorAll('.nav-item').forEach((button, index) => button.addEventListener('click', () => navigateToNavIndex(index)));
prototypeNav.querySelectorAll('.nav-item').forEach((button, index) => button.addEventListener('click', () => navigateToNavIndex(index)));

const prototypeImageCache = new Map();
Object.entries(prototypeScreens).forEach(([name, screen]) => {
  if (mapRoutes.has(name) || name === 'ratalk' || ratalkSubRoutes.has(name) || stateRoutes.has(name) || authRoutes.has(name) || myRoutes.has(name) || calendarRoutes.has(name)) return;
  const image = new Image();
  image.decoding = 'async';
  image.src = screen.src;
  image.decode?.().catch(() => {});
  prototypeImageCache.set(name, image);
});

const mapPlaces = [
  { id: 'banrai', name: '마포 반라이', lat: 37.5563, lng: 126.9236, type: 'rich', address: '서울 마포구 동교로 212', tags: ['츠케멘', '진하고 꾸덕한'], match: 87, taste: [4.8, 4.6, 2.6, 4.0, 3.0], image: ramenPhotos.banrai },
  { id: 'menyajun', name: '멘야준', lat: 37.5589, lng: 126.9211, type: 'clear', address: '서울 마포구 연희로1길 36', tags: ['쇼유', '깔끔하고 담백한'], match: 84, taste: [2.6, 2.5, 4.6, 1.4, 0.5], image: ramenPhotos.hero },
  { id: 'hakuten', name: '하쿠텐', lat: 37.5536, lng: 126.9190, type: 'rich', address: '서울 마포구 와우산로29길 14', tags: ['이에케', '짭짤하고 진한'], match: 72, taste: [4.7, 3.2, 4.1, 4.5, 1.0], image: ramenPhotos.spicy },
  { id: 'ramen-truck', name: '라멘트럭', lat: 37.5504, lng: 126.9228, type: 'clear', address: '서울 마포구 독막로6길 15', tags: ['시오', '깊고 시원한'], match: 81, taste: [2.1, 3.5, 4.8, 1.2, 0.3], image: ramenPhotos.clear },
  { id: 'kyo', name: '쿄라멘', lat: 37.5598, lng: 126.9272, type: 'rich', address: '서울 마포구 성미산로 161', tags: ['돈코츠', '고소하고 묵직한'], match: 69, taste: [4.9, 2.9, 3.4, 4.7, 1.5], image: ramenPhotos.newsMiso },
  { id: 'yuzushio', name: '유즈시오', lat: 37.5551, lng: 126.9284, type: 'clear', address: '서울 마포구 동교로38길 27', tags: ['유자 시오', '산뜻하고 맑은'], match: 91, taste: [1.8, 2.2, 4.9, 0.8, 0.2], image: ramenPhotos.newsShoyu },
  { id: 'kuro', name: '쿠로라멘', lat: 37.5517, lng: 126.9265, type: 'rich', address: '서울 마포구 양화로6길 9', tags: ['카라미소', '얼큰하고 진한'], match: 75, taste: [4.2, 3.7, 3.3, 3.8, 4.8], image: ramenPhotos.mixed }
];
const storeFacts = {
  banrai: { area: '연남', style: 'dip', spice: 1, menu: '돈코츠 어패류 츠케멘', price: null, broth: '진한 돼지·어패류 소스', caution: '맑고 가벼운 국물을 찾는 날에는 무겁게 느껴질 수 있어요.' },
  menyajun: { area: '연남', style: 'soup', spice: 0, menu: '쇼유 라멘', price: null, broth: '맑은 닭·간장 국물', caution: '진하고 기름진 국물을 원하면 맛이 가볍게 느껴질 수 있어요.' },
  hakuten: { area: '홍대', style: 'soup', spice: 1, menu: '이에케 라멘', price: null, broth: '진한 돼지·간장 국물', caution: '간이 진한 편이라 담백한 맛을 원하면 맞지 않을 수 있어요.' },
  'ramen-truck': { area: '합정', style: 'soup', spice: 0, menu: '시오 라멘', price: null, broth: '맑고 시원한 소금 국물', caution: '굵고 묵직한 면을 선호하면 식감이 가볍게 느껴질 수 있어요.' },
  kyo: { area: '연남', style: 'soup', spice: 1, menu: '돈코츠 라멘', price: null, broth: '고소하고 진한 돼지 국물', caution: '기름진 국물을 피하고 싶다면 다른 가게를 먼저 살펴보세요.' },
  yuzushio: { area: '연남', style: 'soup', spice: 0, menu: '유자 시오 라멘', price: null, broth: '맑고 산뜻한 유자 소금 국물', caution: '유자 향을 좋아하지 않으면 향이 강하게 느껴질 수 있어요.' },
  kuro: { area: '합정', style: 'soup', spice: 5, menu: '카라미소 라멘', price: null, broth: '맵고 진한 된장 국물', caution: '맵지 않은 메뉴를 찾는 조건에는 맞지 않아요.' }
};
mapPlaces.forEach((place) => Object.assign(place, storeFacts[place.id], { sample: true }));

const exploreHome = document.querySelector('.explore-home');
const exploreAreas = ['연남', '합정', '홍대', '망원'];
const matchesExplore = (place) => {
  const filters = appState.explore;
  const queryText = filters.query.trim().toLowerCase();
  const areaMatch = filters.area === 'all' || place.area === filters.area;
  const brothMatch = filters.broth === 'all' || place.type === filters.broth;
  const spicyMatch = filters.spicy === 'all' || (filters.spicy === 'mild' ? place.spice <= 1 : place.spice >= 3);
  const styleMatch = filters.style === 'all' || place.style === filters.style;
  const queryMatch = !queryText || `${place.name} ${place.menu} ${place.address} ${place.tags.join(' ')}`.toLowerCase().includes(queryText);
  return areaMatch && brothMatch && spicyMatch && styleMatch && queryMatch;
};
const matchingPlaces = () => mapPlaces.filter(matchesExplore);
const recommendationCopy = (place) => {
  const reasons = [];
  if (appState.explore.broth === place.type) reasons.push(place.type === 'clear' ? '맑고 가벼운 국물' : '진하고 묵직한 맛');
  if (appState.explore.spicy === 'mild' && place.spice <= 1) reasons.push('맵지 않은 메뉴');
  if (appState.explore.style !== 'all' && appState.explore.style === place.style) reasons.push(place.style === 'dip' ? '찍어 먹는 방식' : '국물 라멘');
  return reasons.length ? `선택한 ${reasons.join(' · ')} 조건과 맞아요.` : `${place.area}에서 ${place.menu}를 살펴볼 수 있어요.`;
};
const storeCardMarkup = (place) => {
  const saved = appState.savedStoreIds.includes(place.id);
  return `<article class="explore-store-card" data-store-id="${place.id}">
    <button class="explore-store-main" type="button" data-open-store="${place.id}">
      <img src="${place.image}" alt="${place.menu} 유형 예시 사진"><span class="sample-label">예시 사진</span>
      <span class="explore-store-copy"><small>${place.area} · ${place.style === 'dip' ? '츠케멘' : '라멘'}</small><strong>${place.name}</strong><b>${place.menu}${place.price ? ` · ${place.price.toLocaleString('ko-KR')}원` : ''}</b><em>${recommendationCopy(place)}</em></span>
    </button>
    <button class="explore-store-save ${saved ? 'saved' : ''}" type="button" data-save-store="${place.id}" aria-label="${place.name} ${saved ? '저장 취소' : '저장'}" aria-pressed="${saved}">${icon('bookmark', 22)}</button>
  </article>`;
};
function renderExploreHome() {
  const results = matchingPlaces();
  const savedRecent = mapPlaces.filter((place) => appState.savedStoreIds.includes(place.id)).slice(-2).reverse();
  exploreHome.innerHTML = `<header class="explore-heading"><p>내 취향에 맞고, 오늘 갈 수 있는 라멘집을 골라보세요.</p><h1>${appState.explore.area === 'all' ? '서울 서북권' : appState.explore.area}에서 라멘 찾기</h1></header>
    <form class="explore-search" role="search"><label><span class="sr-only">가게 또는 메뉴 검색</span>${icon('search', 20)}<input type="search" value="${escapeText(appState.explore.query)}" placeholder="가게 또는 메뉴 검색"></label><button type="submit">검색</button></form>
    <section class="explore-filter-section"><div class="explore-section-head"><h2>탐색 지역</h2><span>현재 위치 없이 직접 선택</span></div><div class="explore-chips" data-filter-group="area">${['all', ...exploreAreas].map((value) => `<button type="button" data-filter-value="${value}" class="${appState.explore.area === value ? 'active' : ''}" aria-pressed="${appState.explore.area === value}">${value === 'all' ? '전체' : value}</button>`).join('')}</div></section>
    <section class="explore-filter-section"><div class="explore-section-head"><h2>오늘 먹고 싶은 맛</h2><button type="button" class="reset-filters">초기화</button></div><div class="explore-filter-row"><b>국물</b><div class="explore-chips" data-filter-group="broth">${[['all','상관없음'],['clear','담백한 맛'],['rich','진한 맛']].map(([value,label]) => `<button type="button" data-filter-value="${value}" class="${appState.explore.broth === value ? 'active' : ''}" aria-pressed="${appState.explore.broth === value}">${label}</button>`).join('')}</div></div><div class="explore-filter-row"><b>매운맛</b><div class="explore-chips" data-filter-group="spicy">${[['all','상관없음'],['mild','맵지 않게'],['hot','매운맛']].map(([value,label]) => `<button type="button" data-filter-value="${value}" class="${appState.explore.spicy === value ? 'active' : ''}" aria-pressed="${appState.explore.spicy === value}">${label}</button>`).join('')}</div></div><details class="advanced-taste"><summary>먹는 방식 더 고르기 ${icon('chevron', 16)}</summary><div class="explore-chips" data-filter-group="style">${[['all','상관없음'],['soup','국물'],['dip','찍어 먹기'],['mix','비벼 먹기']].map(([value,label]) => `<button type="button" data-filter-value="${value}" class="${appState.explore.style === value ? 'active' : ''}" aria-pressed="${appState.explore.style === value}">${label}</button>`).join('')}</div></details></section>
    <section class="explore-results"><div class="explore-section-head"><div><h2>조건에 맞는 가게</h2><span>${results.length}곳 · 프로토타입 예시 데이터</span></div><div class="result-view-tabs" role="tablist" aria-label="결과 보기"><button class="active" role="tab" aria-selected="true">목록</button><button type="button" data-open-results-map role="tab" aria-selected="false">지도</button></div></div><div class="explore-store-list">${results.length ? results.map(storeCardMarkup).join('') : EmptyState({ title: '조건에 맞는 가게가 없어요', description: '지역이나 맛 조건을 바꿔 다시 찾아보세요.', action: Button({ label: '조건 초기화', variant: 'secondary', attributes: { class: 'reset-filters' } }) })}</div></section>
    <section class="explore-events"><div class="explore-section-head"><div><h2>이번 주 한정 메뉴와 콜라보</h2><span>날짜를 확인하고 방문하세요</span></div><button type="button" data-open-calendar>전체보기 ${icon('chevron', 16)}</button></div><div>${activeEventCatalog.slice(0,2).map((item) => `<button type="button" data-open-event="${item.id}"><img src="${item.image}" alt="${item.title} 예시 사진"><span><small>${dDayLabel(item.date)} · ${shortDate(item.date)} ${item.time}</small><strong>${item.title}</strong><em>서울 ${item.place}</em></span>${icon('chevron', 18)}</button>`).join('')}</div></section>
    ${savedRecent.length ? `<section class="explore-recent"><div class="explore-section-head"><h2>최근 저장한 가게</h2><button type="button" data-open-saved>저장 전체보기 ${icon('chevron',16)}</button></div><div class="explore-store-list">${savedRecent.map(storeCardMarkup).join('')}</div></section>` : ''}`;
}
const persistExplore = () => persistState('rata_explore_filters', appState.explore);
const applyExploreToMap = () => {
  const allowed = new Set(matchingPlaces().map((place) => place.id));
  if (appState.selectedPlaceId) allowed.add(appState.selectedPlaceId);
  mapMarkers.forEach(({ place, setVisible }) => setVisible(allowed.has(place.id)));
};
exploreHome.addEventListener('click', (event) => {
  const filter = event.target.closest('[data-filter-value]');
  if (filter) {
    const group = filter.closest('[data-filter-group]')?.dataset.filterGroup;
    if (group) appState.explore[group] = filter.dataset.filterValue;
    persistExplore();
    renderExploreHome();
    return;
  }
  if (event.target.closest('.reset-filters')) {
    appState.explore = { area: 'all', broth: 'all', spicy: 'all', style: 'all', query: '', view: 'list' };
    persistExplore();
    renderExploreHome();
    return;
  }
  const storeButton = event.target.closest('[data-open-store]');
  if (storeButton) {
    appState.homeScrollTop = document.querySelector('.experience-shell').scrollTop;
    appState.selectedPlaceId = storeButton.dataset.openStore;
    openPrototype('storeDetail');
    return;
  }
  const saveButton = event.target.closest('[data-save-store]');
  if (saveButton) {
    const id = saveButton.dataset.saveStore;
    const active = !appState.savedStoreIds.includes(id);
    appState.savedStoreIds = active ? [...appState.savedStoreIds, id] : appState.savedStoreIds.filter((savedId) => savedId !== id);
    persistState('rata_saved_stores', appState.savedStoreIds);
    renderExploreHome();
    showToast(active ? '가게를 이 기기에 저장했어요.' : '가게 저장을 취소했어요.');
    return;
  }
  if (event.target.closest('[data-open-results-map]')) { appState.homeScrollTop = document.querySelector('.experience-shell').scrollTop; openPrototype('map'); return; }
  if (event.target.closest('[data-open-calendar]')) { appState.homeScrollTop = document.querySelector('.experience-shell').scrollTop; openPrototype('calendar'); return; }
  if (event.target.closest('[data-open-saved]')) { openPrototype('saved'); return; }
  const eventButton = event.target.closest('[data-open-event]');
  if (eventButton) {
    appState.homeScrollTop = document.querySelector('.experience-shell').scrollTop;
    appState.selectedEventId = eventButton.dataset.openEvent;
    openPrototype('calendarDetail');
  }
});
exploreHome.addEventListener('submit', (event) => {
  if (!event.target.matches('.explore-search')) return;
  event.preventDefault();
  appState.explore.query = event.target.querySelector('input').value;
  persistExplore();
  renderExploreHome();
});
document.querySelector('.desktop-start')?.addEventListener('click', () => {
  closePrototype();
  document.querySelector('.experience-shell').scrollTo({ top: 0, behavior: 'smooth' });
});
renderExploreHome();
const mapMarkerMarkup = (place, selected = false) => `<button class="naver-ratav-marker${selected ? ' featured' : ''}" type="button" aria-label="${place.name}"><img src="/map-markers/marker-${selected ? 'selected' : 'default'}.png" alt="">${selected ? `<span>${place.name.replace(/^마포\s+/, '')}</span>` : ''}</button>`;
const mapMarkerIcon = (maps, place, selected = false) => ({
  content: mapMarkerMarkup(place, selected),
  anchor: new maps.Point(selected ? 42 : 22, selected ? 77 : 36)
});

function loadNaverMaps() {
  if (window.naver?.maps) return Promise.resolve(window.naver.maps);
  if (naverMapsPromise) return naverMapsPromise;
  naverMapsPromise = new Promise((resolve, reject) => {
    const clientId = import.meta.env.VITE_NAVER_MAP_CLIENT_ID;
    if (!clientId) return reject(new Error('네이버 지도 Client ID가 없습니다.'));
    window.navermap_authFailure = () => reject(new Error('네이버 지도 도메인 인증에 실패했습니다.'));
    const script = document.createElement('script');
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${encodeURIComponent(clientId)}`;
    script.async = true;
    script.onload = () => window.naver?.maps ? resolve(window.naver.maps) : reject(new Error('네이버 지도 SDK를 불러오지 못했습니다.'));
    script.onerror = () => reject(new Error('네이버 지도 네트워크 연결에 실패했습니다.'));
    document.head.append(script);
  });
  return naverMapsPromise;
}

async function initMap() {
  if (rataMap) return rataMap;
  const mapElement = document.getElementById('rata-map');
  mapElement.classList.add('loading');
  let maps;
  try {
    maps = await loadNaverMaps();
  } catch (sdkError) {
    mapElement.classList.remove('loading');
    mapElement.innerHTML = `<div class="map-error" role="alert"><strong>네이버 지도를 불러오지 못했어요.</strong><p>${sdkError.message}</p><button type="button" data-map-retry>다시 시도</button></div>`;
    mapElement.querySelector('[data-map-retry]')?.addEventListener('click', () => { naverMapsPromise = null; mapElement.innerHTML = ''; initMap().catch(() => {}); });
    console.error('[RATA map] provider=naver load-failed', sdkError);
    throw sdkError;
  }
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  console.info(`[RATA map] provider=naver container=${mapElement.clientWidth}x${mapElement.clientHeight}`);
  if (mapElement.clientHeight <= 0) {
    mapElement.classList.remove('loading');
    mapElement.innerHTML = '<div class="map-error" role="alert"><strong>지도 영역의 높이를 확인해주세요.</strong></div>';
    throw new Error('네이버 지도 컨테이너 높이가 0px입니다.');
  }
  try {
    rataMap = new maps.Map(mapElement, { center: new maps.LatLng(37.5556, 126.9238), zoom: 15, minZoom: 12, scaleControl: false, mapDataControl: false, logoControlOptions: { position: maps.Position.BOTTOM_LEFT } });
    mapMarkers = mapPlaces.map((place) => {
      const selected = place.id === appState.selectedPlaceId;
      const marker = new maps.Marker({
        position: new maps.LatLng(place.lat, place.lng), map: rataMap, title: place.name,
        icon: mapMarkerIcon(maps, place, selected)
      });
      maps.Event.addListener(marker, 'click', () => selectMapPlace(place.id));
      return { marker, place, type: place.type, setVisible: (visible) => marker.setMap(visible ? rataMap : null) };
    });
    applyExploreToMap();
    const resizeMap = () => maps.Event.trigger(rataMap, 'resize');
    new ResizeObserver(resizeMap).observe(mapElement);
    requestAnimationFrame(resizeMap);
    if (typeof rataMap.autoResize === 'function') rataMap.autoResize();
    mapElement.classList.remove('loading');
    return rataMap;
  } catch (error) {
    mapElement.classList.remove('loading');
    mapElement.innerHTML = `<div class="map-error" role="alert"><strong>네이버 지도를 생성하지 못했어요.</strong><p>${error.message}</p></div>`;
    console.error('[RATA map] provider=naver creation-failed', error);
    throw error;
  }
}

function setSheetVisible(visible, expanded = false) {
  const state = !visible ? 'hidden' : expanded ? 'full' : 'peek';
  resetSheetDragStyles();
  storeSheet.dataset.state = state;
  storeSheet.classList.toggle('visible', visible);
  storeSheet.classList.remove('half');
  storeSheet.classList.toggle('expanded', visible && expanded);
  prototypeNav.classList.toggle('sheet-expanded', visible && expanded);
  storeSheet.setAttribute('aria-hidden', String(!visible));
  if (visible && appState.selectedPlaceId) history.replaceState(null, '', `${location.pathname}?screen=${expanded ? 'storeDetail' : 'mapSheet'}&store=${encodeURIComponent(appState.selectedPlaceId)}`);
}
function setSheetState(state) {
  if (state === 'hidden') return setSheetVisible(false);
  resetSheetDragStyles();
  storeSheet.dataset.state = state;
  storeSheet.classList.add('visible');
  storeSheet.classList.toggle('half', state === 'half');
  storeSheet.classList.toggle('expanded', state === 'full');
  prototypeNav.classList.toggle('sheet-expanded', state === 'full');
  storeSheet.setAttribute('aria-hidden', 'false');
}

function resetSheetDragStyles() {
  storeSheet.classList.remove('dragging');
  ['height', 'bottom', 'transform', 'transition'].forEach((property) => storeSheet.style.removeProperty(property));
}

function closeStoreSheet() {
  setSheetVisible(false);
  storeSheet.classList.remove('visible', 'half', 'expanded', 'dragging');
  storeSheet.dataset.state = 'hidden';
  storeSheet.setAttribute('aria-hidden', 'true');
  prototypeNav.classList.remove('sheet-expanded');
  appState.selectedPlaceId = null;
  refreshMapMarkerSelection();
  history.replaceState(null, '', `${location.pathname}?screen=map`);
}

function renderSelectedStore() {
  const place = mapPlaces.find((item) => item.id === appState.selectedPlaceId);
  if (!place) return;
  document.querySelector('.store-name').textContent = place.name;
  document.querySelector('.store-match').textContent = '프로토타입 예시 데이터';
  document.querySelector('.store-address').textContent = place.address;
  document.querySelector('.store-chips').innerHTML = place.tags.map((tag) => `<span>${tag}</span>`).join('');
  document.querySelector('.store-menu').textContent = place.menu;
  document.querySelector('.store-price').textContent = place.price ? `${place.price.toLocaleString('ko-KR')}원` : '가격 확인 필요';
  document.querySelector('.store-reason').textContent = recommendationCopy(place);
  document.querySelector('.store-caution').textContent = place.caution;
  document.querySelector('.store-technical-copy').textContent = `${place.broth} · ${place.tags.join(' · ')}. 실제 메뉴 정보 연동 전의 분류 예시예요.`;
  const directions = document.querySelector('.store-directions');
  directions.href = `https://map.naver.com/p/search/${encodeURIComponent(place.name)}`;
  directions.setAttribute('aria-label', `${place.name} 네이버 지도에서 길찾기`);
  const reviews = ratalkPosts.filter((post) => post.place === place.name).slice(0, 3);
  document.querySelector('.store-review-list').innerHTML = reviews.length
    ? reviews.map((post) => `<article><strong>${post.title}</strong><p>${post.copy}</p><small>${post.author} · ${post.time} · 방문 날짜·대기 정보 미입력</small></article>`).join('')
    : `<p>아직 연결된 방문 후기가 없어요.</p>`;
  document.querySelectorAll('.store-gallery img').forEach((image, index) => {
    image.hidden = index > 0;
    if (index === 0) {
      image.src = place.image;
      image.alt = `${place.menu} 유형 예시 사진`;
    }
  });
  const saved = appState.savedStoreIds.includes(place.id);
  const saveButton = document.querySelector('.sheet-save');
  saveButton.classList.toggle('saved', saved);
  saveButton.setAttribute('aria-pressed', String(saved));
  saveButton.setAttribute('aria-label', `${place.name} ${saved ? '저장 취소' : '저장'}`);
}

function refreshMapMarkerSelection() {
  mapMarkers.forEach(({ marker, place }) => {
    const selected = place.id === appState.selectedPlaceId;
    marker.setIcon(mapMarkerIcon(window.naver.maps, place, selected));
  });
}

function selectMapPlace(placeId) {
  const place = mapPlaces.find((item) => item.id === placeId);
  if (!place) return;
  appState.selectedPlaceId = place.id;
  renderSelectedStore();
  refreshMapMarkerSelection();
  rataMap.panTo(new window.naver.maps.LatLng(place.lat, place.lng));
  showStoreSheet();
}

function showStoreSheet() {
  if (!appState.selectedPlaceId) return;
  renderSelectedStore();
  setSheetVisible(false);
  requestAnimationFrame(() => requestAnimationFrame(() => {
    setSheetVisible(true);
    document.querySelector('.sheet-handle')?.focus({ preventScroll: true });
  }));
}

function openTasteEditor() {
  if (appState.tasteEdit?.choices) {
    document.querySelectorAll('.taste-pills button').forEach((button) => {
      const selected = appState.tasteEdit.choices.includes(button.textContent.trim());
      button.classList.toggle('selected', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
  }
  tasteModal.hidden = false;
  requestAnimationFrame(() => tasteModal.classList.add('visible'));
}

function closeTasteEditor(saved = false) {
  tasteModal.classList.remove('visible');
  window.setTimeout(() => { tasteModal.hidden = true; }, 240);
  if (saved) showToast('취향을 지도 추천에 반영했어요');
}

const screenChrome = () => '';
const savedItems = eventCatalog;
const legacySavedDefaults = ['yuzu-koharu', 'jun-limited', 'akari-miso'];
if (!readStored('rata_saved_data_v2', false) && appState.savedEventIds.length === legacySavedDefaults.length && legacySavedDefaults.every((id) => appState.savedEventIds.includes(id))) {
  appState.savedEventIds = savedItems.map((item) => item.id);
  persistState('rata_saved_events', appState.savedEventIds);
}
persistState('rata_saved_data_v2', true);
const savedScheduleItems = () => savedItems.filter((item) => appState.savedEventIds.includes(item.id));
let savedView = 'upcoming';
let savedCollabOnly = false;
let savedSort = 'near';
const savedRows = (items) => items.map((item) => {
  const diff = Math.ceil((item.date - today) / 86400000);
  const active = appState.savedEventIds.includes(item.id);
  return `<article class="my-saved-row" data-saved-id="${item.id}" data-type="${item.type}"><img src="${item.image}" alt="${item.title}"><div><span><b class="schedule-dday">${diff >= 0 ? `D-${diff}` : '종료'}</b> <time class="schedule-date">${shortDate(item.date)}</time> · ${item.place}</span><strong>${item.title}</strong></div><button type="button" class="saved-bookmark ${active ? 'active' : ''}" aria-label="${item.title} ${active ? '저장 취소' : '저장'}" aria-pressed="${active}">${icon('bookmark', 20)}</button></article>`;
}).join('');

const tasteGraph = (values = [4.5, 4, 3.5, 3, 1.8], comparisonValues = null) => {
  const center = { x: 105, y: 90 };
  const radius = 48;
  const labels = ['진한 국물', '굵은 면', '감칠맛', '기름기', '매운맛'];
  const directions = labels.map((_, index) => {
    const angle = (-90 + (72 * index)) * (Math.PI / 180);
    return { x: Math.cos(angle), y: Math.sin(angle) };
  });
  const point = (scale, index) => ({ x: center.x + radius * scale * directions[index].x, y: center.y + radius * scale * directions[index].y });
  const polygon = (scale) => directions.map((_, index) => {
    const vertex = point(scale, index);
    return `${vertex.x.toFixed(2)},${vertex.y.toFixed(2)}`;
  }).join(' ');
  const dataPoints = values.map((value, index) => point(Math.max(0, Math.min(5, value)) / 5, index));
  const comparisonPoints = comparisonValues?.map((value, index) => point(Math.max(0, Math.min(5, value)) / 5, index));
  const axes = directions.map((_, index) => {
    const vertex = point(1, index);
    return `<line x1="${center.x}" y1="${center.y}" x2="${vertex.x.toFixed(2)}" y2="${vertex.y.toFixed(2)}"/>`;
  }).join('');
  const labelPositions = directions.map((direction) => ({
    x: center.x + (radius + 12) * direction.x,
    y: center.y + (radius + 12) * direction.y + 4,
    anchor: direction.x > .25 ? 'start' : direction.x < -.25 ? 'end' : 'middle'
  }));
  const comparisonLabel = comparisonValues ? `, 가게 ${labels.map((label, index) => `${label} ${comparisonValues[index].toFixed(1)}`).join(', ')}` : '';
  return `<svg class="taste-graph" viewBox="0 0 210 180" role="img" aria-label="내 취향 ${labels.map((label, index) => `${label} ${values[index].toFixed(1)}`).join(', ')}${comparisonLabel}"><g class="taste-grid"><polygon points="${polygon(1 / 3)}"/><polygon points="${polygon(2 / 3)}"/><polygon points="${polygon(1)}"/>${axes}</g><polygon class="taste-data" points="${dataPoints.map(({ x, y }) => `${x.toFixed(2)},${y.toFixed(2)}`).join(' ')}"/>${comparisonPoints ? `<polygon class="taste-store-data" points="${comparisonPoints.map(({ x, y }) => `${x.toFixed(2)},${y.toFixed(2)}`).join(' ')}"/>` : ''}<g class="taste-points">${dataPoints.map(({ x, y }) => `<circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="4"/>`).join('')}</g>${comparisonPoints ? `<g class="taste-store-points">${comparisonPoints.map(({ x, y }) => `<circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="3"/>`).join('')}</g>` : ''}<g class="taste-labels">${labels.map((label, index) => `<text x="${labelPositions[index].x.toFixed(2)}" y="${labelPositions[index].y.toFixed(2)}" text-anchor="${labelPositions[index].anchor}">${label}</text>`).join('')}</g></svg>`;
};

function renderSavedView() {
  const saved = savedScheduleItems();
  const source = saved.filter((item) => savedView === 'upcoming' ? item.date >= today : item.date < today);
  const filtered = source.filter((item) => !savedCollabOnly || item.type === 'collab').sort((a, b) => savedSort === 'near' ? a.date - b.date : b.date - a.date);
  const groups = filtered.reduce((result, item) => { const key = `${item.date.getFullYear()}-${item.date.getMonth() + 1}`; (result[key] ||= []).push(item); return result; }, {});
  const list = Object.entries(groups).map(([key, items]) => `<h2>${key.split('-')[1]}월</h2>${savedRows(items)}`).join('') || EmptyState({ title: '조건에 맞는 일정이 없어요', description: '필터를 바꾸면 다른 일정을 볼 수 있어요.' });
  const countable = saved.filter((item) => !savedCollabOnly || item.type === 'collab');
  const upcomingCount = countable.filter((item) => item.date >= today).length;
  const pastCount = countable.filter((item) => item.date < today).length;
  liveMyScreen.innerHTML = `${screenChrome()}<header class="my-pagebar"><button type="button" data-my-route="my" aria-label="뒤로">${icon('back', 24)}</button><h1>저장</h1></header><nav class="my-tabs"><button class="${savedView === 'upcoming' ? 'active' : ''}" data-saved-view="upcoming">다가오는 일정 ${upcomingCount}</button><button class="${savedView === 'past' ? 'active' : ''}" data-saved-view="past">지난 일정 ${pastCount}</button></nav><div class="my-filterbar"><button data-saved-sort>${savedSort === 'near' ? '날짜 가까운 순' : '날짜 먼 순'} ${icon('chevron', 16)}</button><button class="${savedCollabOnly ? 'active' : ''}" data-collab-filter aria-pressed="${savedCollabOnly}">콜라보만</button></div><section class="my-saved-list">${list}</section>`;
}

function renderUnifiedSaved() {
  const stores = mapPlaces.filter((place) => appState.savedStoreIds.includes(place.id));
  const schedules = savedScheduleItems().sort((a, b) => a.date - b.date);
  const empty = !stores.length && !schedules.length;
  liveMyScreen.innerHTML = `${screenChrome()}${ScreenTitleRow({ title: '저장' })}
    <p class="saved-scope-note">이 브라우저에 저장돼요. 로그인 동기화는 아직 연결되지 않았어요.</p>
    ${empty ? EmptyState({ title: '저장한 항목이 없어요', description: '탐색에서 가게를 저장하면 여기서 다시 찾을 수 있어요.', action: Button({ label: '가게 탐색하기', attributes: { 'data-my-route': 'home' } }) }) : ''}
    ${stores.length ? `<section class="unified-saved-section"><div class="explore-section-head"><h2>가게 ${stores.length}</h2></div><div class="explore-store-list">${stores.map(storeCardMarkup).join('')}</div></section>` : ''}
    ${schedules.length ? `<section class="unified-saved-section"><div class="explore-section-head"><h2>일정 ${schedules.length}</h2></div><div class="saved-event-list">${savedRows(schedules)}</div></section>` : ''}`;
}

function renderMyView(name) {
  if (name === 'saved') {
    renderUnifiedSaved();
  } else if (name === 'my' || name === 'myLogout') {
    const loggedOut = name === 'myLogout' || !appState.loggedIn;
    const upcomingSaved = savedScheduleItems().filter((item) => item.date >= today);
    const savedCount = upcomingSaved.length;
    const storedPreferences = readStored(ONBOARDING_CHOICES_KEY, null);
    const tasteTitle = storedPreferences ? '내가 직접 고른<br>평소 라멘 취향' : '평소 취향을 아직<br>저장하지 않았어요';
    const tasteSummary = storedPreferences ? '<span>취향 다시 고르기에서 언제든 바꿀 수 있어요.</span>' : '<span>취향 질문에 답하면 여기에 저장돼요.</span>';
    const platePhotos = myPlatePhotos.slice(0, 4);
    liveMyScreen.innerHTML = `${screenChrome()}${ScreenTitleRow({ title: '마이', action: `<button class="screen-title-action" type="button" data-my-route="settings" aria-label="설정">${icon('settings', 24)}</button>` })}
      ${loggedOut ? `<section class="my-login-prompt"><img src="/brand/R_logo_RATA.svg" alt=""><h2>로그인하면 여러 기기에서<br>기록을 이어갈 수 있어요</h2><p>현재 저장과 탐색 조건은 이 브라우저에 유지돼요.</p><div>${Button({ label: '로그인', attributes: { 'data-my-route': 'loginVisual' } })}${Button({ label: '회원가입', variant: 'secondary', attributes: { 'data-my-route': 'join' } })}</div></section>` : `<section class="my-profile"><span><img src="/brand/R_logo_RATA.svg" alt=""></span><div><h2>${appState.userName}</h2><p>저장과 기록을 한곳에서 관리해요.</p></div></section>`}
      <section class="my-taste"><div><small>평소 취향</small><h2>${tasteTitle}</h2><p>${tasteSummary}</p><button type="button" data-restart-onboarding>평소 취향 고르기</button></div></section>
      ${loggedOut ? '' : `<section class="my-block"><header><b>저장됨 ${savedCount}</b><button type="button" data-my-route="mySaved">전체보기 ${icon('chevron', 18)}</button></header>${savedRows(upcomingSaved)}</section>`}
      ${loggedOut ? '' : `<section class="my-block my-plates"><header><b>내 한 그릇 ${platePhotos.length}</b><button type="button" data-my-route="myPlate">전체보기 ${icon('chevron', 18)}</button></header><div>${platePhotos.map((photo,index)=>`<button type="button" data-my-route="myPlate" aria-label="기록한 라멘 ${index + 1} 보기"><img src="${photo.src}" alt="${photo.alt}"></button>`).join('')}</div></section>`}`;
  } else if (name === 'mySaved') {
    if (!appState.loggedIn) {
      liveMyScreen.innerHTML = `${screenChrome()}<header class="my-pagebar"><button type="button" data-my-route="my" aria-label="뒤로">${icon('back', 24)}</button><h1>저장</h1></header>${EmptyState({ title: '로그인이 필요해요', description: '로그인하면 저장한 일정과 매장을 볼 수 있어요.', action: Button({ label: '로그인', attributes: { 'data-my-route': 'loginVisual' } }) })}`;
    } else renderSavedView();
  } else if (name === 'myPlate') {
    liveMyScreen.innerHTML = `${screenChrome()}<header class="my-pagebar"><button type="button" data-my-route="my" aria-label="뒤로">${icon('back', 24)}</button><h1>내 한 그릇</h1></header><nav class="my-tabs"><button class="active">전체</button><button>별점남긴 그릇 8</button></nav><p class="plate-summary">다녀온 매장 <b>8</b>　평균 별점 <b>3.9</b></p><div class="plate-grid">${myPlatePhotos.map((photo,i)=>`<button type="button" data-my-route="ratalkDetail"><img src="${photo.src}" alt="${photo.alt}">${i%3===0?'<span>4.5</span>':''}</button>`).join('')}</div><button class="plate-add" type="button" data-my-route="writePhoto" aria-label="한 그릇 추가">${icon('edit', 24)}</button>`;
  } else {
    liveMyScreen.innerHTML = `${screenChrome()}${ScreenTitleRow({ title: '설정', action: `<button class="screen-title-action" type="button" data-my-route="my" aria-label="마이로 돌아가기">${icon('back', 24)}</button>` })}<section class="settings-list"><small>취향</small><button type="button" data-restart-onboarding>평소 취향 다시 고르기 <b>${icon('chevron', 20)}</b></button><small>계정</small><button type="button" data-profile-edit>프로필 편집 <b>${icon('chevron', 20)}</b></button><button type="button">로그인 방법 <em>${appState.loggedIn ? '이메일' : '로그인 안 함'}</em></button><small>알림</small><label>저장한 일정 알림 <input type="checkbox"><i></i></label><p class="settings-help">알림 서버는 아직 연결되지 않았어요.</p><small>도움말</small><button type="button" data-inquiry>문의하기 <b>${icon('chevron', 20)}</b></button><button type="button" data-legal>이용약관 · 개인정보 <b>${icon('chevron', 20)}</b></button></section>${appState.loggedIn ? `<footer class="settings-actions">${Button({ label: '로그아웃', variant: 'secondary', attributes: { 'data-open-dialog': 'logout-dialog' } })}<button type="button" data-open-dialog="delete-dialog">회원탈퇴</button></footer>` : ''}`;
    if (name === 'settingsLogout') requestAnimationFrame(() => openDialog('logout-dialog'));
  }
  liveMyScreen.scrollTop = 0;
  setupSnapCarousel(liveMyScreen.querySelector('.my-plates > div'), { itemSelector: ':scope > button' });
}

let dialogReturnFocus = null;
function openDialog(id) {
  const dialog = document.getElementById(id);
  dialogReturnFocus = document.activeElement;
  dialog.hidden = false;
  requestAnimationFrame(() => {
    dialog.classList.add('visible');
    dialog.querySelector('[data-dialog-confirm], [data-dialog-close]')?.focus();
  });
}
function closeDialog(dialog) {
  dialog.classList.remove('visible');
  window.setTimeout(() => {
    dialog.hidden = true;
    dialogReturnFocus?.focus?.();
    dialogReturnFocus = null;
  }, 180);
}
function ensureLoggedIn() {
  if (appState.loggedIn) return true;
  openDialog('login-required-dialog');
  return false;
}

const calendarItems = eventCatalog.filter((item) => item.date >= today);
const calendarCurrent = calendarItems.filter((item) => item.date.getTime() === today.getTime());
const calendarUpcoming = calendarItems.filter((item) => item.date > today);
const calendarRows = () => calendarUpcoming.map((item) => {
  const diff = Math.ceil((item.date - today) / 86400000);
  const active = appState.savedEventIds.includes(item.id);
  return `<article class="calendar-row" data-calendar-id="${item.id}"><time><strong class="schedule-dday">D-${diff}</strong><small class="schedule-date">${shortDate(item.date)}</small></time><button type="button" data-calendar-route="calendarDetail"><strong>${item.title}</strong><span>${item.shop} | 서울 · ${item.place}</span></button><button type="button" class="calendar-save ${active ? 'active' : ''}" aria-label="${item.title} 저장" aria-pressed="${active}">${icon('bookmark',20)}</button></article>`;
}).join('');
function renderCalendarView(name) {
  if (name === 'calendar') {
    liveCalendarScreen.innerHTML = `${screenChrome()}${ScreenTitleRow({ title: '일정', action: `<button class="screen-title-text" type="button" data-calendar-route="calendarMonth">지난 일정 보기 ${icon('chevron', 16)}</button>` })}<section class="calendar-section"><h2><i></i> 지금 진행중 <b>${calendarCurrent.length}</b></h2><div class="calendar-heroes">${calendarCurrent.map((item,index)=>`<button type="button" data-calendar-route="calendarDetail" data-calendar-id="${item.id}" aria-label="${index+1} / 2" style="--cal:url('${item.image}')"><span>${item.shop}</span><strong>${item.title}</strong><small>${shortDate(item.date)} · 서울 ${item.place}</small></button>`).join('')}</div><h2 class="soon"><i></i> 곧 시작 <b>${calendarUpcoming.length}</b></h2>${calendarRows()}</section>`;
  } else if (name === 'calendarMonth') {
    const past = savedItems.filter((item) => item.date < today).sort((a, b) => b.date - a.date);
    const groups = past.reduce((result, item) => { const key = `${item.date.getFullYear()}-${item.date.getMonth() + 1}`; (result[key] ||= []).push(item); return result; }, {});
    const pastMarkup = Object.entries(groups).map(([key, items]) => `<header class="month-title"><h2>${Number(key.split('-')[1])}월</h2><span>${items.length}개 일정</span></header>${items.map((item)=>`<article data-calendar-id="${item.id}"><img src="${item.image}" alt="${item.title}"><button type="button" data-calendar-route="calendarDetail"><span><b>${item.type === 'collab' ? '콜라보' : '한정메뉴'}</b> 종료</span><strong>${item.title}</strong><small>${shortDate(item.date)} | 서울 · ${item.place}</small></button><button type="button" class="calendar-save" aria-label="저장" aria-pressed="false">${icon('bookmark',20)}</button></article>`).join('')}`).join('');
    liveCalendarScreen.innerHTML = `${screenChrome()}<header class="my-pagebar"><button type="button" data-calendar-route="calendar" aria-label="뒤로">${icon('back', 24)}</button><h1>지난 일정</h1></header><nav class="month-chips"><button>${today.getFullYear()} ${icon('chevron', 16)}</button></nav><section class="past-list">${pastMarkup}</section>`;
  } else {
    const item = eventCatalog.find((event) => event.id === appState.selectedEventId);
    if (!item) {
      liveCalendarScreen.innerHTML = `${screenChrome()}<header class="my-pagebar"><button type="button" data-calendar-route="calendar" aria-label="일정으로 돌아가기">${icon('back',24)}</button><h1>일정을 찾을 수 없어요</h1></header>${EmptyState({ title: '잘못된 일정 주소예요', description: '일정 목록에서 다시 선택해주세요.', action: Button({ label: '일정 목록으로', attributes: { 'data-calendar-route': 'calendar' } }) })}`;
      return;
    }
    const detailSaved = appState.savedEventIds.includes(item.id);
    const linkedStore = mapPlaces.find((place) => place.id === item.storeId);
    liveCalendarScreen.innerHTML = `<article class="calendar-detail" data-calendar-id="${item.id}"><header style="--detail:url('${item.image}')">${screenChrome()}<button type="button" data-calendar-route="calendar" aria-label="뒤로">${icon('back', 24)}</button><button type="button" class="calendar-save ${detailSaved ? 'active' : ''}" aria-label="저장" aria-pressed="${detailSaved}">${icon('bookmark',24)}</button></header><section><span class="pill dark">${item.shop}</span><h1>${item.title}</h1><h2>${shortDate(item.date)} ${item.time}</h2><p>서울 ${item.place} · ${item.detail}</p><h3>방문 정보</h3><dl><div><dt>장소</dt><dd>${linkedStore?.name || '장소 확인 필요'}</dd></div><div><dt>행사 메뉴·가격</dt><dd>확인 필요</dd></div><div><dt>예약·수량 제한</dt><dd>확인 필요</dd></div><div><dt>정보 출처</dt><dd>${item.source}</dd></div><div><dt>마지막 확인</dt><dd>${item.updatedAt}</dd></div></dl><p class="data-note">실제 행사 공지 연동 전의 예시 일정입니다. 방문 전 공식 공지를 확인해주세요.</p><div class="calendar-detail-actions">${linkedStore ? Button({label:`${linkedStore.name} 지도에서 보기`,variant:'secondary',attributes:{'data-calendar-store':linkedStore.id}}) : ''}${Button({label:`${icon('bookmark', 20)} <span>${detailSaved ? '저장됨' : '일정 저장하기'}</span>`,attributes:{'data-save-detail':true,'aria-pressed':String(detailSaved)}})}</div></section></article>`;
  }
  setupSnapCarousel(liveCalendarScreen.querySelector('.calendar-heroes'), { itemSelector: ':scope > button' });
}

liveCalendarScreen.addEventListener('click',(event)=>{
  const mapStore = event.target.closest('[data-calendar-store]');
  if (mapStore) {
    appState.selectedPlaceId = mapStore.dataset.calendarStore;
    return openPrototype('storeDetail');
  }
  const routeTarget = event.target.closest('[data-calendar-route]');
  const route = routeTarget?.dataset.calendarRoute;
  if (route) {
    const item = routeTarget.closest('[data-calendar-id]');
    if (route === 'calendarDetail' && item) appState.selectedEventId = item.dataset.calendarId;
    return openPrototype(route);
  }
  const save=event.target.closest('.calendar-save,[data-save-detail]');
  if(save){
    const id = save.closest('[data-calendar-id]')?.dataset.calendarId || appState.selectedEventId;
    const active = !appState.savedEventIds.includes(id);
    appState.savedEventIds = active ? [...appState.savedEventIds, id] : appState.savedEventIds.filter((savedId) => savedId !== id);
    persistState('rata_saved_events', appState.savedEventIds);
    save.classList.toggle('active', active);
    save.setAttribute('aria-pressed', String(active));
    const label = save.querySelector('span');
    if (label) label.textContent = active ? '저장됨' : '일정 저장하기';
    showToast(active?'일정을 저장했어요.':'저장을 취소했어요.');
  }
});

const initialComments = () => [
  { author: '웅성웅성', copy: '면의 식감 설명이 자세해서 다음 주문에 참고할게요.' },
  { author: '통풍방지위원회', copy: '평일 방문 정보도 도움이 됐어요.' }
];
function renderRatalkSub(name) {
  if (name === 'ratalkDetail') {
    const post = ratalkPosts.find((item) => item.id === appState.selectedPostId) || ratalkPosts[0];
    const comments = appState.comments[post.id] || initialComments();
    liveRatalkSub.innerHTML = `${screenChrome()}<header class="my-pagebar"><button data-talk-route="ratalk" aria-label="뒤로">${icon('back', 24)}</button><h1>${post.category === 'plate' ? '한 그릇' : '이야기'}</h1></header><article class="talk-detail" data-detail-post="${post.id}"><div class="talk-author">${avatarMarkup(post.author)}<b>${post.author}</b><span>${post.badge}</span><time>${post.time}</time></div>${post.image ? `<img class="talk-detail-photo" src="${post.image}" alt="${post.place} 라멘">` : ''}${post.place ? `<button class="talk-store" type="button" data-open-map-store="${post.place}"><span><b>${post.place}</b><small>${mapPlaces.find((place) => place.name === post.place)?.address || '서울 라멘 매장'}</small></span>${icon('chevron', 24)}</button>` : ''}${post.score ? `<p class="talk-rating">${RatingStars({ score: post.score })}<b>${Number(post.score).toFixed(1)}</b></p>` : ''}${post.title ? `<h2>${post.title}</h2>` : ''}<p>${post.copy}</p><div class="talk-actions"><button class="talk-like ${appState.likedPostIds.includes(post.id) ? 'liked' : ''}" data-post-id="${post.id}" aria-pressed="${appState.likedPostIds.includes(post.id)}" aria-label="좋아요">${icon('heart', 20)}<span>${post.likes}</span></button><span class="detail-comment-total">${icon('chat', 20)} <b class="detail-comment-count">${comments.length}</b></span></div><section class="talk-comments"><h2>댓글 ${comments.length}</h2><div class="talk-comment-list">${comments.map((comment) => `<article class="talk-comment-item">${avatarMarkup(comment.author)}<div><b>${comment.author}</b><p>${comment.copy}</p></div></article>`).join('')}</div></section></article><form class="talk-comment-form"><input aria-label="댓글" placeholder="댓글을 남겨보세요"><button type="submit" aria-label="댓글 전송">${icon('send', 22)}</button></form>`;
    return;
  }
  const story = name === 'writeText';
  const selectedStore = mapPlaces.find((place) => place.id === appState.selectedWriteStore) || mapPlaces[0];
  const writeValid = Boolean(appState.writeDraft.body.trim()) && (story || appState.rating > 0);
  liveRatalkSub.innerHTML = `${screenChrome()}<header class="talk-write-head"><button type="button" data-talk-route="ratalk" aria-label="닫기">${icon('close', 24)}</button><h1>글쓰기</h1></header><nav class="talk-write-tabs ${appState.mode === 'rata' ? 'rata' : 'light'}"><button data-talk-route="writePhoto" class="${story ? '' : 'active'}">한 그릇</button><button data-talk-route="writeText" class="${story ? 'active' : ''}">이야기</button></nav><form class="talk-write-form" data-write-kind="${story ? 'story' : 'plate'}">${story ? `<label>태그 (선택)<div class="tag-row"><button type="button">매장 추가</button><button type="button">콜라보 추가</button><button type="button">일정 추가</button><button type="button">질문 추가</button></div></label><label>제목<input name="title" value="${appState.writeDraft.title}" placeholder="제목을 입력해주세요."></label>` : `<label>사진 (선택)<div class="photo-picker"><label class="photo-upload">${icon('photo', 24)}<span>사진 선택</span><input type="file" accept="image/*" hidden></label>${appState.selectedPhoto ? `<img src="${appState.selectedPhoto}" alt="선택한 라멘 사진">` : ''}</div></label><label>매장 (필수)<button type="button" class="store-pick" data-talk-route="writePicker"><span><b>${selectedStore.name}</b><small>${selectedStore.address}</small></span><i>변경</i></button></label><div class="write-stars" role="radiogroup" aria-label="별점">${RatingStars({ score: appState.rating, interactive: true })}<b>${appState.rating.toFixed(1)}</b></div>`}<label>내용<textarea name="body" maxlength="500" placeholder="라멘과 매장에 대한 이야기를 남겨주세요.">${appState.writeDraft.body}</textarea><span class="write-error" role="alert" ${writeValid ? 'hidden' : ''}>${appState.writeDraft.body.trim() ? '별점을 선택해주세요.' : '내용을 입력해주세요.'}</span></label>${Button({label:'글 올리기',type:'submit',disabled:!writeValid})}</form>${name === 'writePicker' ? `<aside class="write-picker"><i></i><h2>어느 매장에 다녀오셨나요?</h2><input type="search" placeholder="매장 이름 검색" aria-label="매장 검색"><div class="write-store-options">${mapPlaces.map((place) => `<button type="button" data-select-store="${place.id}"><b>${place.name}</b><span>${place.address} · ${place.tags[0]} ${place.id === selectedStore.id ? '· 선택됨' : ''}</span></button>`).join('')}</div></aside>` : ''}`;
  updateRatingStars();
}
function renderState(name){const action=Button({label:'다시 시도',attributes:{onclick:'location.reload()'}});const routeErrorAction=Button({label:'탐색으로 돌아가기',attributes:{'data-return-explore':true}});const body=name==='stateLoading'?Skeleton({rows:5}):name==='stateEmpty'?EmptyState({title:'아직 저장한 내용이 없어요',description:'마음에 드는 일정과 매장을 저장해보세요.'}):name==='stateError'?ErrorState({title:appState.routeError?.title || '불러오지 못했어요',description:appState.routeError?.description || '네트워크 연결을 확인하고 다시 시도해주세요.',action:appState.routeError ? routeErrorAction : action}):name==='stateMaintenance'?ErrorState({title:'잠시 점검 중이에요',description:'더 안정적인 서비스를 위해 준비하고 있어요.'}):ErrorState({title:'업데이트가 필요해요',description:'새 버전으로 업데이트한 뒤 계속 이용해주세요.',action:Button({label:'업데이트하기',attributes:{onclick:'location.reload()'}})});liveStateScreen.innerHTML=`${screenChrome()}<header class="my-pagebar"><h1>RATA</h1></header><main class="state-content">${body}</main>`;}
function updateRatingStars() {
  document.querySelectorAll('.write-stars .rating-star').forEach((button) => {
    const star = Number(button.dataset.star);
    const fill = Math.max(0, Math.min(1, appState.rating - (star - 1))) * 100;
    button.classList.toggle('half', fill === 50);
    button.classList.toggle('filled', fill === 100);
    button.querySelectorAll('.rating-fill-stop').forEach((stop) => stop.setAttribute('offset', `${fill}%`));
  });
  const value = document.querySelector('.write-stars b');
  if (value) value.textContent = appState.rating.toFixed(1);
  updateWriteSubmitState();
}
liveStateScreen.addEventListener('click', (event) => {
  if (event.target.closest('[data-return-explore]')) {
    appState.routeError = null;
    closePrototype();
  }
});
function updateWriteSubmitState(showError = false) {
  const form = liveRatalkSub.querySelector('.talk-write-form');
  if (!form) return false;
  const body = form.elements.body?.value.trim() || '';
  const valid = Boolean(body) && (form.dataset.writeKind === 'story' || appState.rating > 0);
  const submit = form.querySelector('[type="submit"]');
  if (submit) submit.disabled = !valid;
  const error = form.querySelector('.write-error');
  if (error) {
    error.textContent = !body ? '내용을 입력해주세요.' : '별점을 선택해주세요.';
    error.hidden = !(showError && !valid);
  }
  return valid;
}
liveRatalkSub.addEventListener('click', (event) => {
  const routeButton = event.target.closest('[data-talk-route]');
  if (routeButton) {
    const form = event.target.closest('.live-ratalk-sub')?.querySelector('.talk-write-form');
    if (form) {
      appState.writeDraft.title = form.elements.title?.value || '';
      appState.writeDraft.body = form.elements.body?.value || '';
    }
    event.preventDefault();
    openPrototype(routeButton.dataset.talkRoute);
    return;
  }
  const storeButton = event.target.closest('[data-select-store]');
  if (storeButton) {
    appState.selectedWriteStore = storeButton.dataset.selectStore;
    openPrototype('writePhoto');
    return;
  }
  const mapStore = event.target.closest('[data-open-map-store]');
  if (mapStore) {
    const place = mapPlaces.find((item) => item.name === mapStore.dataset.openMapStore);
    if (place) appState.selectedPlaceId = place.id;
    openPrototype('mapSheet');
    return;
  }
  const star = event.target.closest('.rating-star');
  if (star) {
    const box = star.getBoundingClientRect();
    appState.rating = Number(star.dataset.star) - (event.clientX - box.left < box.width / 2 ? .5 : 0);
    updateRatingStars();
  }
});
liveRatalkSub.addEventListener('input', (event) => {
  if (event.target.name === 'title') appState.writeDraft.title = event.target.value;
  if (event.target.name === 'body') {
    appState.writeDraft.body = event.target.value;
    updateWriteSubmitState(true);
  }
  if (event.target.type === 'search' && event.target.closest('.write-picker')) {
    const queryText = event.target.value.trim();
    document.querySelectorAll('.write-store-options button').forEach((button) => { button.hidden = !button.textContent.includes(queryText); });
  }
});
liveRatalkSub.addEventListener('change', (event) => {
  if (event.target.type !== 'file' || !event.target.files?.[0]) return;
  if (appState.selectedPhoto.startsWith('blob:')) URL.revokeObjectURL(appState.selectedPhoto);
  appState.selectedPhoto = URL.createObjectURL(event.target.files[0]);
  renderRatalkSub('writePhoto');
});
liveRatalkSub.addEventListener('click', (event) => {
  const like = event.target.closest('.talk-like');
  if (!like) return;
  if (!ensureLoggedIn()) return;
  togglePostLike(Number(like.dataset.postId));
});
liveRatalkSub.addEventListener('submit', (event) => {
  event.preventDefault();
  if (event.target.matches('.talk-comment-form')) {
    const input = event.target.querySelector('input');
    const copy = input.value.trim();
    if (!copy) return;
    const post = ratalkPosts.find((item) => item.id === appState.selectedPostId) || ratalkPosts[0];
    const comments = appState.comments[post.id] ||= initialComments();
    comments.push({ author: appState.userName, copy });
    post.comments += 1;
    const feedCount = ratalkFeed.querySelector(`[data-post-id="${post.id}"] .talk-comment span`);
    if (feedCount) feedCount.textContent = String(post.comments);
    input.value = '';
    renderRatalkSub('ratalkDetail');
    return;
  }
  const body = event.target.elements.body?.value.trim();
  if (!updateWriteSubmitState(true)) {
    event.target.elements.body.focus();
    return;
  }
  if (!ensureLoggedIn()) return;
  const kind = event.target.dataset.writeKind;
  const place = mapPlaces.find((item) => item.id === appState.selectedWriteStore) || mapPlaces[0];
  const post = { id: Date.now(), category: kind, author: appState.userName, badge: appState.mode === 'rata' ? '라타' : '라이트', time: '방금', place: kind === 'plate' ? place.name : '', score: kind === 'plate' ? appState.rating.toFixed(1) : '', title: event.target.elements.title?.value.trim() || '', copy: body, image: kind === 'plate' ? (appState.selectedPhoto || place.image) : '', likes: 0, comments: 0, popularity: 0 };
  ratalkPosts.unshift(post);
  ratalkFeed.insertAdjacentHTML('afterbegin', ratalkPostMarkup(post));
  appState.writeDraft = { title: '', body: '' };
  appState.selectedPhoto = '';
  appState.rating = 0;
  openPrototype('ratalk');
  showToast('글을 올렸어요.');
});

const routeUrl = (name) => {
  const params = new URLSearchParams({ screen: name });
  if ((mapRoutes.has(name) || name === 'storeDetail') && appState.selectedPlaceId) params.set('store', appState.selectedPlaceId);
  if (name === 'calendarDetail' && appState.selectedEventId) params.set('event', appState.selectedEventId);
  if (name === 'ratalkDetail' && appState.selectedPostId) params.set('post', String(appState.selectedPostId));
  return `${location.pathname}?${params}`;
};
function openPrototype(name) {
  const screen = prototypeScreens[name];
  if (!screen) return;
  prototypeScreen.dataset.screen = name;
  prototypeScreen.setAttribute('aria-hidden', 'false');
  prototypeScreen.inert = false;
  document.body.classList.add('prototype-open');
  document.querySelectorAll('.explore-home, .hero, .phone-shell > .divider, .phone-shell > .section, .phone-shell > .light-only, .phone-shell > .rata-only, .bottom-nav').forEach((element) => {
    element.setAttribute('aria-hidden', 'true');
    element.inert = true;
  });
  const isLiveMap = mapRoutes.has(name);
  const isLiveTalk = name === 'ratalk';
  const isLiveTalkSub = ratalkSubRoutes.has(name);
  const isLiveState=stateRoutes.has(name);
  const isLiveAuth = authRoutes.has(name);
  const isLiveMy = myRoutes.has(name);
  const isLiveCalendar = calendarRoutes.has(name);
  const isLiveScreen = isLiveMap || isLiveTalk || isLiveTalkSub || isLiveState || isLiveAuth || isLiveMy || isLiveCalendar;
  prototypeCanvas.hidden = isLiveScreen;
  liveMapScreen.hidden = !isLiveMap;
  liveRatalkScreen.hidden = !isLiveTalk;
  liveRatalkSub.hidden = !isLiveTalkSub;
  liveStateScreen.hidden=!isLiveState;
  liveCalendarScreen.hidden = !isLiveCalendar;
  liveMyScreen.hidden = !isLiveMy;
  liveAuthScreen.hidden = !isLiveAuth;
  [liveMapScreen, liveRatalkScreen, liveRatalkSub, liveStateScreen, liveCalendarScreen, liveMyScreen, liveAuthScreen, prototypeCanvas].forEach((view) => { view.inert = view.hidden; });
  [liveMapScreen, liveRatalkScreen, liveRatalkSub, liveCalendarScreen, liveMyScreen, liveAuthScreen].forEach((view) => view.classList.remove('route-enter'));
  const liveView = isLiveMap ? liveMapScreen : isLiveTalk ? liveRatalkScreen : isLiveTalkSub ? liveRatalkSub : isLiveCalendar ? liveCalendarScreen : isLiveMy ? liveMyScreen : isLiveAuth ? liveAuthScreen : null;
  if (liveView) {
    void liveView.offsetWidth;
    liveView.classList.add('route-enter');
  }
  prototypeScreen.classList.toggle('map-open', isLiveMap);
  prototypeNav.classList.toggle('map-nav', isLiveMap);
  prototypeNav.classList.toggle('talk-nav', isLiveTalk);
  prototypeNav.hidden = !screen.nav;
  frameCompose.hidden = !isLiveTalk;
  syncRouteNavigation(name);
  if (isLiveMap) {
    prototypeHotspots.innerHTML = '';
    if (name.startsWith('mapPrefs')) { setSheetVisible(false); openTasteEditor(); }
    else if (name === 'map') { setSheetVisible(false); closeTasteEditor(); }
    else if (name === 'mapSheet') showStoreSheet();
    else if (name === 'storeDetail') { renderSelectedStore(); setSheetVisible(true, true); }
    else setSheetVisible(true, true);
    initMap().then(() => requestAnimationFrame(() => {
      window.naver.maps.Event.trigger(rataMap, 'resize');
      applyExploreToMap();
      if (appState.selectedPlaceId) {
        refreshMapMarkerSelection();
        const selected = mapPlaces.find((place) => place.id === appState.selectedPlaceId);
        if (selected) rataMap.panTo(new window.naver.maps.LatLng(selected.lat, selected.lng));
      }
    })).catch(() => {});
  } else if (isLiveTalk) {
    document.querySelector('.ratalk-feed').scrollTo({ top: 0 });
  } else if (isLiveTalkSub) {
    renderRatalkSub(name);
  } else if(isLiveState){renderState(name);
  } else if (isLiveAuth) {
    renderAuthView(name);
  } else if (isLiveMy) {
    renderMyView(name);
  } else if (isLiveCalendar) {
    renderCalendarView(name);
  } else {
    const cached = prototypeImageCache.get(name);
    prototypeImage.src = cached?.src || screen.src;
    prototypeImage.alt = `${name} 화면`;
    prototypeHotspots.innerHTML = screen.hotspots.map(([label, left, top, width, height, target]) => `<button class="prototype-hotspot" aria-label="${label}" data-target="${target}" style="left:${left}px;top:${top}px;width:${width}px;height:${height}px"></button>`).join('');
    prototypeCanvas.classList.remove('screen-enter', 'sheet-screen-enter');
    void prototypeCanvas.offsetWidth;
    prototypeCanvas.classList.add(['writePicker', 'settingsLogout'].includes(name) ? 'sheet-screen-enter' : 'screen-enter');
  }
  document.querySelector('.experience-shell').scrollTo({ top: 0 });
  prototypeScreen.scrollTo({ top: 0 });
  resetFrameChrome(name);
  history.replaceState(null, '', routeUrl(name));
}

function closePrototype() {
  prototypeScreen.setAttribute('aria-hidden', 'true');
  prototypeScreen.inert = true;
  document.body.classList.remove('prototype-open');
  document.querySelectorAll('.explore-home, .hero, .phone-shell > .divider, .phone-shell > .section, .phone-shell > .light-only, .phone-shell > .rata-only, .bottom-nav').forEach((element) => {
    element.removeAttribute('aria-hidden');
    element.inert = false;
  });
  liveMapScreen.hidden = true;
  liveRatalkScreen.hidden = true;
  liveRatalkSub.hidden = true;
  liveStateScreen.hidden=true;
  liveCalendarScreen.hidden = true;
  liveMyScreen.hidden = true;
  liveAuthScreen.hidden = true;
  prototypeCanvas.hidden = false;
  frameCompose.hidden = true;
  [liveMapScreen, liveRatalkScreen, liveRatalkSub, liveStateScreen, liveCalendarScreen, liveMyScreen, liveAuthScreen].forEach((view) => { view.inert = true; });
  prototypeCanvas.inert = false;
  syncRouteNavigation('home');
  document.querySelector('.experience-shell').scrollTo({ top: appState.homeScrollTop || 0, behavior: 'smooth' });
  resetFrameChrome('home');
  history.replaceState(null, '', `${location.pathname}?home`);
}

prototypeHotspots.addEventListener('click', (event) => {
  const hotspot = event.target.closest('[data-target]');
  if (hotspot) openPrototype(hotspot.dataset.target);
});

liveMyScreen.addEventListener('click', (event) => {
  if (event.target.closest('[data-restart-onboarding]')) {
    closePrototype();
    openOnboarding(true);
    return;
  }
  const route = event.target.closest('[data-my-route]')?.dataset.myRoute;
  if (route) return route === 'home' ? closePrototype() : openPrototype(route);
  const storeLink = event.target.closest('[data-open-store]');
  if (storeLink) {
    appState.selectedPlaceId = storeLink.dataset.openStore;
    return openPrototype('storeDetail');
  }
  const storeSave = event.target.closest('[data-save-store]');
  if (storeSave) {
    const id = storeSave.dataset.saveStore;
    appState.savedStoreIds = appState.savedStoreIds.filter((savedId) => savedId !== id);
    persistState('rata_saved_stores', appState.savedStoreIds);
    renderUnifiedSaved();
    showToast('가게 저장을 취소했어요.');
    return;
  }
  const savedEvent = event.target.closest('.my-saved-row[data-saved-id]');
  if (savedEvent && !event.target.closest('.saved-bookmark')) {
    appState.selectedEventId = savedEvent.dataset.savedId;
    return openPrototype('calendarDetail');
  }
  const savedViewButton = event.target.closest('[data-saved-view]');
  if (savedViewButton) {
    savedView = savedViewButton.dataset.savedView;
    renderSavedView();
    return;
  }
  if (event.target.closest('[data-collab-filter]')) {
    savedCollabOnly = !savedCollabOnly;
    renderSavedView();
    return;
  }
  if (event.target.closest('[data-saved-sort]')) {
    savedSort = savedSort === 'near' ? 'far' : 'near';
    renderSavedView();
    return;
  }
  if (event.target.closest('[data-open-taste-editor]')) return openPrototype('mapPrefsNew');
  if (event.target.closest('[data-profile-edit]')) {
    const nextName = window.prompt('마이에서 사용할 이름을 입력해주세요.', appState.userName)?.trim();
    if (nextName) {
      appState.userName = nextName;
      persistState('rata_user_name', nextName);
      showToast('프로필 이름을 저장했어요.');
    }
    return;
  }
  if (event.target.closest('[data-inquiry]')) {
    window.location.href = 'mailto:rata@example.com?subject=RATA 문의';
    return;
  }
  if (event.target.closest('[data-legal]')) {
    liveMyScreen.innerHTML = `${screenChrome()}<header class="my-pagebar"><button type="button" data-my-route="settings" aria-label="뒤로">${icon('back', 24)}</button><h1>약관 · 개인정보</h1></header><article class="legal-copy"><h2>이용약관</h2><p>RATA 프로토타입의 제공 정보는 서비스 기능 확인을 위해 사용됩니다.</p><h2>개인정보 처리방침</h2><p>입력한 목업 계정 정보는 서버로 전송하지 않고 현재 브라우저 안에서만 처리합니다.</p></article>`;
    return;
  }
  const dialogId = event.target.closest('[data-open-dialog]')?.dataset.openDialog;
  if (dialogId) return openDialog(dialogId);
  const bookmark = event.target.closest('.saved-bookmark');
  if (bookmark) {
    const item = bookmark.closest('[data-saved-id]');
    const id = item?.dataset.savedId;
    if (!id) return;
    const active = !appState.savedEventIds.includes(id);
    appState.savedEventIds = active ? [...appState.savedEventIds, id] : appState.savedEventIds.filter((savedId) => savedId !== id);
    persistState('rata_saved_events', appState.savedEventIds);
    if (prototypeScreen.dataset.screen === 'saved') renderUnifiedSaved();
    else renderSavedView();
    showToast(active ? '일정을 저장했어요.' : '저장을 취소했어요.');
  }
});
document.querySelectorAll('.ui-dialog').forEach((dialog) => {
  dialog.querySelectorAll('[data-dialog-close]').forEach((button) => button.addEventListener('click', () => {
    closeDialog(dialog);
    if (location.search === '?screen=settingsLogout') openPrototype('settings');
  }));
  dialog.querySelector('[data-dialog-confirm]').addEventListener('click', () => {
    closeDialog(dialog);
    if (dialog.id === 'content-detail-dialog') {
      return;
    } else if (dialog.id === 'login-required-dialog') {
      openPrototype('loginVisual');
    } else if (dialog.id === 'logout-dialog') {
      appState.loggedIn = false;
      persistState('rata_logged_in', false);
      showToast('로그아웃했어요.');
      openPrototype('myLogout');
    } else {
      appState.loggedIn = false;
      persistState('rata_logged_in', false);
      persistState('rata_user_name', 'Realraota');
      appState.userName = 'Realraota';
      showToast('회원탈퇴가 완료됐어요.');
      openPrototype('myLogout');
    }
  });
});

const notificationPanel = document.querySelector('.notification-panel');
function renderNotifications() {
  const list = document.querySelector('.notification-list');
  list.innerHTML = appState.notificationItems.length
    ? appState.notificationItems.map((item) => `<article><strong>${item.title}</strong><p>${item.body}</p></article>`).join('')
    : EmptyState({ title: '새로운 알림이 없어요', description: '새 소식이 생기면 여기에 알려드릴게요.' });
  document.querySelector('[data-clear-notifications]').hidden = appState.notificationItems.length === 0;
  document.querySelectorAll('.notify i').forEach((dot) => { dot.hidden = appState.notificationItems.length === 0; });
}
phoneScreen.addEventListener('click', (event) => {
  if (!event.target.closest('[data-notifications], [aria-label="알림"]')) return;
  renderNotifications();
  notificationPanel.hidden = false;
  requestAnimationFrame(() => notificationPanel.classList.add('visible'));
});
document.querySelector('[data-close-notifications]').addEventListener('click', () => {
  notificationPanel.classList.remove('visible');
  window.setTimeout(() => { notificationPanel.hidden = true; }, 180);
});
document.querySelector('[data-clear-notifications]').addEventListener('click', () => {
  appState.notificationItems = [];
  renderNotifications();
});

document.querySelector('.app-header .logo').addEventListener('click', (event) => {
  event.preventDefault();
  closePrototype();
});
document.querySelector('.taste-edit-btn')?.addEventListener('click', openTasteEditor);
document.querySelector('.taste-close').addEventListener('click', () => closeTasteEditor());
document.querySelector('.taste-backdrop').addEventListener('click', () => closeTasteEditor());
document.querySelector('.taste-save').addEventListener('click', () => {
  appState.tasteEdit = {
    choices: [...document.querySelectorAll('.taste-pills button.selected')].map((button) => button.textContent.trim())
  };
  persistState('rata_taste_edit', appState.tasteEdit);
  renderSelectedStore();
  refreshMapMarkerSelection();
  closeTasteEditor(true);
});
tasteModal.addEventListener('click', (event) => {
  const button = event.target.closest('.taste-pills button');
  if (!button) return;
  button.classList.toggle('selected');
  button.setAttribute('aria-pressed', String(button.classList.contains('selected')));
});
document.querySelectorAll('[data-map-filter]').forEach((button) => button.addEventListener('click', () => {
  document.querySelectorAll('[data-map-filter]').forEach((item) => item.classList.remove('active'));
  button.classList.add('active');
  const filter = button.dataset.mapFilter;
  if (filter === 'rich' || filter === 'clear') appState.explore.broth = filter;
  persistExplore();
  renderExploreHome();
  applyExploreToMap();
}));
document.querySelector('[data-map-back]').addEventListener('click', closePrototype);
document.querySelector('.sheet-close').addEventListener('click', () => {
  closeStoreSheet();
});
document.querySelector('.sheet-save').addEventListener('click', (event) => {
  const id = appState.selectedPlaceId;
  const active = !appState.savedStoreIds.includes(id);
  appState.savedStoreIds = active ? [...appState.savedStoreIds, id] : appState.savedStoreIds.filter((savedId) => savedId !== id);
  persistState('rata_saved_stores', appState.savedStoreIds);
  renderSelectedStore();
  renderExploreHome();
  showToast(active ? '가게를 이 기기에 저장했어요.' : '저장을 취소했어요.');
});
document.querySelector('.sheet-more').addEventListener('click', () => {
  setSheetState('full');
  if (appState.selectedPlaceId) history.replaceState(null, '', `${location.pathname}?screen=storeDetail&store=${encodeURIComponent(appState.selectedPlaceId)}`);
});
document.querySelector('.sheet-handle').addEventListener('click', () => {
  if (sheetDrag.didMove) {
    sheetDrag.didMove = false;
    return;
  }
  const state = storeSheet.dataset.state || 'peek';
  setSheetState(state === 'peek' ? 'half' : state === 'half' ? 'full' : 'peek');
});

const sheetDrag = { pointerId: null, startY: 0, startTop: 0, lastY: 0, lastTime: 0, velocity: 0, scale: 1, initialState: 'peek', didMove: false };
const sheetHandle = document.querySelector('.sheet-handle');

function sheetTopByState() {
  const height = document.querySelector('.phone-screen').clientHeight;
  return { full: 105, half: Math.max(105, height - 580), peek: Math.max(105, height - 320), hidden: height - 100 };
}

function nearestSheetState(top, states = ['full', 'half', 'peek', 'hidden']) {
  const tops = sheetTopByState();
  return states.reduce((nearest, state) => Math.abs(tops[state] - top) < Math.abs(tops[nearest] - top) ? state : nearest, states[0]);
}

function finishSheetDrag(cancelled = false) {
  if (sheetDrag.pointerId === null) return;
  const screenRect = document.querySelector('.phone-screen').getBoundingClientRect();
  const scale = screenRect.height / document.querySelector('.phone-screen').clientHeight;
  const currentTop = (storeSheet.getBoundingClientRect().top - screenRect.top) / scale;
  const delta = (sheetDrag.lastY - sheetDrag.startY) / scale;
  let target;
  if (cancelled) {
    target = nearestSheetState(currentTop);
  } else if (sheetDrag.velocity < -.75) {
    target = 'full';
  } else if (sheetDrag.velocity > .75) {
    target = sheetDrag.initialState === 'full' ? 'half' : sheetDrag.initialState === 'half' ? 'peek' : 'hidden';
  } else if (delta > 0) {
    const downwardStates = sheetDrag.initialState === 'full' ? ['full', 'half'] : sheetDrag.initialState === 'half' ? ['half', 'peek'] : ['peek', 'hidden'];
    target = nearestSheetState(currentTop, downwardStates);
  } else {
    const upwardStates = sheetDrag.initialState === 'peek' ? ['peek', 'half', 'full'] : sheetDrag.initialState === 'half' ? ['half', 'full'] : ['full'];
    target = nearestSheetState(currentTop, upwardStates);
  }
  sheetDrag.pointerId = null;
  resetSheetDragStyles();
  if (target === 'hidden') closeStoreSheet();
  else setSheetState(target);
}

sheetHandle.addEventListener('pointerdown', (event) => {
  sheetDrag.pointerId = event.pointerId;
  sheetDrag.startY = event.clientY;
  sheetDrag.lastY = event.clientY;
  sheetDrag.lastTime = event.timeStamp;
  sheetDrag.velocity = 0;
  sheetDrag.initialState = storeSheet.dataset.state || 'peek';
  const screenRect = document.querySelector('.phone-screen').getBoundingClientRect();
  sheetDrag.scale = screenRect.height / document.querySelector('.phone-screen').clientHeight;
  sheetDrag.startTop = (storeSheet.getBoundingClientRect().top - screenRect.top) / sheetDrag.scale;
  sheetDrag.didMove = false;
  sheetHandle.setPointerCapture(event.pointerId);
  storeSheet.classList.add('dragging');
});
sheetHandle.addEventListener('pointermove', (event) => {
  if (event.pointerId !== sheetDrag.pointerId) return;
  const elapsed = Math.max(1, event.timeStamp - sheetDrag.lastTime);
  sheetDrag.velocity = (event.clientY - sheetDrag.lastY) / elapsed / sheetDrag.scale;
  sheetDrag.lastY = event.clientY;
  sheetDrag.lastTime = event.timeStamp;
  const pointerDelta = (event.clientY - sheetDrag.startY) / sheetDrag.scale;
  const tops = sheetTopByState();
  const top = Math.max(tops.full, Math.min(tops.hidden, sheetDrag.startTop + pointerDelta));
  sheetDrag.didMove ||= Math.abs(event.clientY - sheetDrag.startY) > 4;
  storeSheet.style.height = `${Math.max(0, document.querySelector('.phone-screen').clientHeight - 100 - top)}px`;
  storeSheet.style.bottom = '100px';
  storeSheet.style.transform = 'translateY(0)';
});
sheetHandle.addEventListener('pointerup', (event) => {
  if (event.pointerId !== sheetDrag.pointerId) return;
  finishSheetDrag(false);
});
sheetHandle.addEventListener('pointercancel', (event) => {
  if (event.pointerId !== sheetDrag.pointerId) return;
  finishSheetDrag(true);
});

const talkSortButton = document.querySelector('.talk-sort');
const talkSortMenu = document.querySelector('.talk-sort-menu');
const ratalkFeed = document.querySelector('.ratalk-feed');
const talkPlaceButton = document.querySelector('.talk-place-filter');
const talkPlaceMenu = document.querySelector('.talk-place-menu');
let talkCategory = 'all';
let talkPlace = 'all';
let talkQuery = '';
function applyTalkFilters() {
  [...ratalkFeed.querySelectorAll('.ratalk-post')].forEach((post) => {
    const categoryMatch = talkCategory === 'all' || talkCategory === post.dataset.category;
    const placeName = mapPlaces.find((place) => place.id === talkPlace)?.name || '';
    const placeMatch = talkPlace === 'all' || post.dataset.place === placeName;
    const queryMatch = !talkQuery || post.textContent.toLowerCase().includes(talkQuery.toLowerCase());
    post.hidden = !(categoryMatch && placeMatch && queryMatch);
  });
}
talkSortButton.addEventListener('click', () => {
  const open = talkSortMenu.hidden;
  talkSortMenu.hidden = !open;
  talkSortButton.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('[data-talk-sort]').forEach((button) => button.addEventListener('click', () => {
  const mode = button.dataset.talkSort;
  const posts = [...ratalkFeed.querySelectorAll('.ratalk-post')];
  posts.sort((a, b) => mode === 'popular' ? Number(b.dataset.popularity) - Number(a.dataset.popularity) : Number(b.dataset.postId) - Number(a.dataset.postId));
  posts.forEach((post, index) => {
    post.style.animationDelay = `${index * 35}ms`;
    ratalkFeed.append(post);
  });
  talkSortButton.querySelector('span').textContent = mode === 'popular' ? '인기순' : '최신순';
  talkSortMenu.hidden = true;
  talkSortButton.setAttribute('aria-expanded', 'false');
  ratalkFeed.scrollTo({ top: 0, behavior: 'smooth' });
}));
document.querySelectorAll('[data-talk-filter]').forEach((button) => button.addEventListener('click', () => {
  document.querySelectorAll('[data-talk-filter]').forEach((item) => item.classList.remove('active'));
  button.classList.add('active');
  talkCategory = button.dataset.talkFilter;
  applyTalkFilters();
  ratalkFeed.scrollTo({ top: 0, behavior: 'smooth' });
}));
function togglePostLike(postId) {
  const post = ratalkPosts.find((item) => item.id === postId);
  if (!post) return;
  const liked = !appState.likedPostIds.includes(postId);
  appState.likedPostIds = liked ? [...appState.likedPostIds, postId] : appState.likedPostIds.filter((id) => id !== postId);
  post.likes += liked ? 1 : -1;
  persistState('rata_liked_posts', appState.likedPostIds);
  document.querySelectorAll(`.talk-like[data-post-id="${postId}"]`).forEach((button) => {
    button.classList.toggle('liked', liked);
    button.setAttribute('aria-pressed', String(liked));
    const count = button.querySelector('span');
    if (count) count.textContent = String(post.likes);
  });
}

ratalkFeed.addEventListener('click', (event) => {
  const post = event.target.closest('.ratalk-post');
  if (!post) return;
  const postId = Number(post.dataset.postId);
  const like = event.target.closest('.talk-like');
  if (like) {
    if (!ensureLoggedIn()) return;
    togglePostLike(postId);
    return;
  }
  appState.selectedPostId = postId;
  openPrototype('ratalkDetail');
});
ratalkFeed.addEventListener('keydown', (event) => {
  const post = event.target.closest('.ratalk-post');
  if (post && (event.key === 'Enter' || event.key === ' ')) {
    event.preventDefault();
    appState.selectedPostId = Number(post.dataset.postId);
    openPrototype('ratalkDetail');
  }
});
document.querySelector('.ratalk-compose').addEventListener('click', () => {
  if (!ensureLoggedIn()) return;
  appState.rating = 0;
  appState.writeDraft = { title: '', body: '' };
  openPrototype('writePhoto');
});
talkPlaceButton.addEventListener('click', () => {
  const open = talkPlaceMenu.hidden;
  talkPlaceMenu.hidden = !open;
  talkPlaceButton.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('[data-talk-place]').forEach((button) => button.addEventListener('click', () => {
  talkPlace = button.dataset.talkPlace;
  talkPlaceButton.querySelector('span').textContent = button.textContent;
  talkPlaceMenu.hidden = true;
  talkPlaceButton.setAttribute('aria-expanded', 'false');
  applyTalkFilters();
}));
const talkSearch = document.querySelector('.ratalk-search');
document.querySelector('.talk-search-toggle').addEventListener('click', () => { talkSearch.hidden = false; talkSearch.querySelector('input').focus(); });
document.querySelector('.talk-search-close').addEventListener('click', () => { talkSearch.hidden = true; talkSearch.reset(); talkQuery = ''; applyTalkFilters(); });
talkSearch.addEventListener('input', (event) => { talkQuery = event.target.value.trim(); applyTalkFilters(); });
talkSearch.addEventListener('submit', (event) => event.preventDefault());
document.addEventListener('click', (event) => {
  if (!event.target.closest('.talk-sort-wrap')) { talkSortMenu.hidden = true; talkSortButton.setAttribute('aria-expanded', 'false'); }
  if (!event.target.closest('.talk-place-wrap')) { talkPlaceMenu.hidden = true; talkPlaceButton.setAttribute('aria-expanded', 'false'); }
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    const dialog = [...document.querySelectorAll('.ui-dialog')].find((item) => !item.hidden);
    if (dialog) closeDialog(dialog);
    talkSortMenu.hidden = true;
    talkPlaceMenu.hidden = true;
    talkSortButton.setAttribute('aria-expanded', 'false');
    talkPlaceButton.setAttribute('aria-expanded', 'false');
  }
});

let currentAuthView = 'loginVisual';
function renderAuthView(name) {
  const previousView = currentAuthView;
  currentAuthView = name;
  const joining = ['join', 'joinInput', 'joinValid'].includes(name);
  const socialEntry = ['loginVisual', 'socialLogin'].includes(name);
  liveAuthScreen.classList.toggle('join-view', joining);
  liveAuthScreen.classList.toggle('social-view', socialEntry);
  liveAuthScreen.classList.toggle('email-login-view', !joining && !socialEntry);
  document.querySelector('.auth-submit').textContent = joining ? '회원가입하기' : '로그인하기';
  document.querySelector('.auth-switch-copy').firstChild.textContent = joining ? '이미 계정이 있나요? ' : '아직 계정이 없나요? ';
  document.querySelector('.auth-switch').textContent = joining ? '로그인' : '회원가입';
  const password = document.querySelector('.auth-form input[name="password"]');
  password.autocomplete = joining ? 'new-password' : 'current-password';
  if (previousView !== name) {
    document.querySelector('.auth-form').reset();
    document.querySelectorAll('.auth-form .ui-field').forEach((field) => {
      field.classList.remove('is-error');
      field.dataset.touched = 'false';
      field.querySelector('input').removeAttribute('aria-invalid');
    });
  }
  updateAuthFormState();
}

const authForm = document.querySelector('.auth-form');
const authSubmit = document.querySelector('.auth-submit');
const authInputs = Object.fromEntries([...authForm.querySelectorAll('input')].map((input) => [input.name, input]));
const isJoining = () => liveAuthScreen.classList.contains('join-view');
const authError = (name) => {
  const value = authInputs[name].value.trim();
  if (name === 'nickname') return value.length >= 2 ? '' : '닉네임을 2자 이상 입력해주세요.';
  if (name === 'email') return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : '올바른 이메일 주소를 입력해주세요.';
  if (name === 'password') return value.length >= 8 && /[A-Za-z]/.test(value) && /\d/.test(value) ? '' : '영문과 숫자를 포함해 8자 이상 입력해주세요.';
  return '';
};
function updateAuthFormState(showErrors = false) {
  const requiredNames = ['email', 'password'];
  requiredNames.forEach((name) => {
    const input = authInputs[name];
    const field = input.closest('.ui-field');
    const error = authError(name);
    const shouldShow = Boolean(error) && (showErrors || field.dataset.touched === 'true');
    field.classList.toggle('is-error', shouldShow);
    input.setAttribute('aria-invalid', String(shouldShow));
    field.querySelector('.ui-field__message').textContent = shouldShow ? error : (name === 'password' ? '영문, 숫자 포함 8자 이상' : '');
  });
  const valid = requiredNames.every((name) => !authError(name));
  authSubmit.disabled = !valid;
  return valid;
}

authForm.addEventListener('input', (event) => {
  const field = event.target.closest('.ui-field');
  updateAuthFormState();
});
authForm.addEventListener('focusout', (event) => {
  const field = event.target.closest('.ui-field');
  if (field) field.dataset.touched = 'true';
  updateAuthFormState();
});
authForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!updateAuthFormState(true)) return;
  const joining = isJoining();
  authSubmit.disabled = true;
  authSubmit.textContent = joining ? '가입하는 중…' : '로그인 중…';
  window.setTimeout(() => {
    appState.loggedIn = true;
    persistState('rata_logged_in', true);
    if (joining) {
      openPrototype('my');
      showToast(`${appState.userName}님, 반가워요 · 이름은 마이에서 바꿀 수 있어요`);
    } else {
      openPrototype('my');
      showToast('로그인했어요.');
    }
  }, 450);
});
document.querySelectorAll('[data-reveal]').forEach((button) => button.addEventListener('click', () => {
  const input = authInputs[button.dataset.reveal];
  const visible = input.type === 'text';
  input.type = visible ? 'password' : 'text';
  button.setAttribute('aria-label', visible ? '비밀번호 보기' : '비밀번호 숨기기');
  button.setAttribute('aria-pressed', String(!visible));
}));
document.querySelector('.auth-switch').addEventListener('click', () => openPrototype(isJoining() ? 'loginVisual' : 'join'));
document.querySelector('.auth-hero-back').addEventListener('click', () => openPrototype('loginVisual'));
document.querySelector('.auth-email-entry').addEventListener('click', () => openPrototype('loginForm'));
document.querySelector('.auth-social-join').addEventListener('click', () => openPrototype('join'));
document.querySelectorAll('.auth-social-entry [data-provider]').forEach((button) => button.addEventListener('click', () => {
  const joining = isJoining();
  const provider = button.dataset.provider;
  appState.loggedIn = true;
  persistState('rata_logged_in', true);
  if (joining) {
    appState.userName = '꾸덕한 이케멘';
    persistState('rata_user_name', appState.userName);
  }
  openPrototype('my');
  showToast(joining ? '꾸덕한 이케멘님, 반가워요 · 이름은 마이에서 바꿀 수 있어요' : `${provider} 계정으로 로그인했어요.`);
}));
document.querySelector('.auth-social-browse').addEventListener('click', () => closePrototype());
document.querySelector('[data-auth-help]').addEventListener('click', () => showToast('이메일 또는 비밀번호 찾기 안내를 준비했어요.'));

document.querySelectorAll('[data-toast]').forEach((button) => button.addEventListener('click', () => {
  const dialog = document.getElementById('content-detail-dialog');
  dialog.querySelector('h2').textContent = button.querySelector('strong,h3')?.textContent || '상세 정보';
  dialog.querySelector('p').textContent = button.dataset.toast;
  openDialog('content-detail-dialog');
}));

let toastTimer;
function showToast(message) {
  const toast = document.querySelector('.toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 1800);
}

let autoPlay = setInterval(() => setHero(heroIndex + 1), 5200);
document.querySelector('.hero').addEventListener('pointerdown', () => clearInterval(autoPlay), { once: true });

const splash = document.querySelector('.splash-screen');
const splashVideo = document.querySelector('.splash-video');
const revealSplashVideo = () => splashVideo.classList.add('ready');
if (splashVideo.readyState >= 2) revealSplashVideo();
else splashVideo.addEventListener('loadeddata', revealSplashVideo, { once: true });
const onboarding = document.querySelector('.onboarding');
const onboardingTrack = document.querySelector('.onboarding-track');
const onboardingProgress = [...document.querySelectorAll('.onboarding-progress i')];
const stepCount = document.querySelector('.step-count');
const query = new URLSearchParams(window.location.search);
const ONBOARDED_KEY = 'rata_onboarded';
const ONBOARDING_CHOICES_KEY = 'rata_onboarding_choices';
const SPLASH_SEEN_KEY = 'rata_splash_seen';
let onboardingStep = 0;
let splashFinished = false;

const hideSplash = () => {
  splash.classList.add('hidden');
  splashVideo.pause();
  splashVideo.classList.remove('ready');
};

const storageHas = (storage, key) => {
  try { return storage.getItem(key) === '1'; } catch { return false; }
};
const hasOnboarded = () => storageHas(window.localStorage, ONBOARDED_KEY);
const hasSeenSplash = () => storageHas(window.sessionStorage, SPLASH_SEEN_KEY);
const markSplashSeen = () => {
  try { window.sessionStorage.setItem(SPLASH_SEEN_KEY, '1'); } catch {}
};

const getOnboardingChoices = () => ({
  broth: [...document.querySelectorAll('.broth-card.selected')].map((card) => card.dataset.broth),
  allBroth: document.querySelector('.wide-choice').classList.contains('selected'),
  eating: document.querySelector('.taste-option.selected')?.dataset.eating || null,
  notifications: Object.fromEntries([...document.querySelectorAll('.pref-toggle')].map((toggle) => [toggle.dataset.pref, toggle.classList.contains('on')]))
});

const saveOnboarding = () => {
  try {
    window.localStorage.setItem(ONBOARDED_KEY, '1');
    window.localStorage.setItem(ONBOARDING_CHOICES_KEY, JSON.stringify(getOnboardingChoices()));
  } catch {}
};


const setOnboardingStep = (nextStep) => {
  onboardingStep = Math.max(0, Math.min(2, nextStep));
  onboardingTrack.style.transform = `translateX(-${onboardingStep * 100}%)`;
  stepCount.textContent = `${onboardingStep + 1} / 3`;
  onboardingProgress.forEach((bar, index) => bar.classList.toggle('active', index <= onboardingStep));
  document.querySelectorAll('.onboarding-page').forEach((page, index) => page.setAttribute('aria-hidden', index !== onboardingStep));
};

function openOnboarding(force = false) {
  if (hasOnboarded() && !force) {
    enterHome(false);
    return;
  }
  hideSplash();
  onboarding.classList.add('visible');
  onboarding.setAttribute('aria-hidden', 'false');
  document.body.classList.add('onboarding-open');
  resetFrameChrome('onboarding', null);
  setOnboardingStep(0);
}

const enterHome = (remember = true) => {
  if (remember) saveOnboarding();
  hideSplash();
  onboarding.classList.remove('visible');
  onboarding.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('onboarding-open');
  document.querySelector('.experience-shell').scrollTo({ top: 0, behavior: 'smooth' });
  resetFrameChrome('home');
};

const finishSplash = () => {
  if (splashFinished) return;
  splashFinished = true;
  markSplashSeen();
  if (hasOnboarded()) enterHome(false);
  else openOnboarding();
};

document.querySelectorAll('.broth-card').forEach(card => card.addEventListener('click', () => {
  const selected = card.classList.toggle('selected');
  card.setAttribute('aria-pressed', String(selected));
  document.querySelector('.wide-choice').classList.remove('selected');
}));
document.querySelector('.wide-choice').addEventListener('click', (event) => {
  document.querySelectorAll('.broth-card').forEach(item => {
    item.classList.remove('selected');
    item.setAttribute('aria-pressed', 'false');
  });
  event.currentTarget.classList.add('selected');
  event.currentTarget.setAttribute('aria-pressed', 'true');
});

document.querySelectorAll('.taste-option').forEach(option => option.addEventListener('click', () => {
  document.querySelectorAll('.taste-option').forEach(item => {
    item.classList.remove('selected');
    item.setAttribute('aria-pressed', 'false');
  });
  option.classList.add('selected');
  option.setAttribute('aria-pressed', 'true');
}));

document.querySelectorAll('.pref-toggle').forEach(toggle => toggle.addEventListener('click', () => {
  const enabled = toggle.classList.toggle('on');
  toggle.setAttribute('aria-pressed', String(enabled));
}));

document.querySelectorAll('.onboarding-next').forEach(button => button.addEventListener('click', () => setOnboardingStep(onboardingStep + 1)));
document.querySelectorAll('.onboarding-back').forEach(button => button.addEventListener('click', () => setOnboardingStep(onboardingStep - 1)));
document.querySelectorAll('.later-btn').forEach(button => button.addEventListener('click', () => enterHome(true)));
document.querySelector('.start-btn').addEventListener('click', () => enterHome(true));
enableSwipe(document.querySelector('.onboarding-window'), () => setOnboardingStep(onboardingStep + 1), () => setOnboardingStep(onboardingStep - 1));

let requestedScreen = query.get('screen');
if (['mapSheet', 'storeDetail'].includes(requestedScreen) && !query.has('store')) {
  appState.routeError = { title: '가게를 선택해주세요', description: '탐색 목록에서 가게를 고르면 상세 정보를 볼 수 있어요.' };
  requestedScreen = 'stateError';
}
if (requestedScreen && mapRoutes.has(requestedScreen) && query.has('store')) {
  const requestedStore = query.get('store');
  if (mapPlaces.some((place) => place.id === requestedStore)) appState.selectedPlaceId = requestedStore;
  else {
    appState.routeError = { title: '가게를 찾을 수 없어요', description: '주소의 가게 ID가 올바르지 않아요. 탐색에서 다시 선택해주세요.' };
    requestedScreen = 'stateError';
  }
}
if (requestedScreen === 'calendarDetail') {
  const requestedEvent = query.get('event');
  if (eventCatalog.some((item) => item.id === requestedEvent)) appState.selectedEventId = requestedEvent;
  else {
    appState.routeError = { title: '일정을 찾을 수 없어요', description: '주소의 일정 ID가 올바르지 않아요. 일정 목록에서 다시 선택해주세요.' };
    requestedScreen = 'stateError';
  }
}
if (requestedScreen === 'ratalkDetail' && query.has('post')) {
  const requestedPost = Number(query.get('post'));
  if (ratalkPosts.some((post) => post.id === requestedPost)) appState.selectedPostId = requestedPost;
  else requestedScreen = 'stateError';
}

if (query.has('home')) {
  markSplashSeen();
  enterHome(false);
} else if (requestedScreen && prototypeScreens[requestedScreen]) {
  markSplashSeen();
  enterHome(false);
  openPrototype(requestedScreen);
} else if (query.has('skipSplash')) {
  markSplashSeen();
  if (hasOnboarded()) enterHome(false);
  else openOnboarding();
} else if (hasSeenSplash()) {
  if (hasOnboarded()) enterHome(false);
  else openOnboarding();
} else {
  splashVideo.addEventListener('ended', finishSplash, { once: true });
  window.setTimeout(finishSplash, 3000);
  splash.addEventListener('click', finishSplash, { once: true });
}
