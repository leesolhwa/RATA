import './styles.css';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
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
  newsShoyu: '/images/photos/news-shoyu.webp'
};

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
    spark: '<path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    pin: '<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2"/>',
    edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6 1.7 1.7 0 0 0 10 3V2.8h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z"/>',
    bowl: '<path d="M4 10h16c0 5-3 9-8 9s-8-4-8-9Z"/><path d="M7 22h10M8 6c0-2 2-2 2-4M13 7c0-2 2-2 2-4"/>',
    photo: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m21 15-5-5L5 20"/>',
    trash: '<path d="M3 6h18M8 6V4h8v2M19 6l-1 15H6L5 6M10 11v6M14 11v6"/>'
  };
  return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]}</svg>`;
};

const StatusBar = ({ className = 'home-status' } = {}) => `<div class="${className}"><strong>9:41</strong><span class="status-icons"><span class="status-signal" aria-hidden="true"><i></i><i></i><i></i></span><svg class="status-wifi" viewBox="0 0 16 12" aria-hidden="true"><path d="M1 4.2a10.6 10.6 0 0 1 14 0M3.6 7a6.7 6.7 0 0 1 8.8 0M6.2 9.6a2.7 2.7 0 0 1 3.6 0"/></svg><b aria-hidden="true"></b></span></div>`;

const RatingStars = ({ score, interactive = false } = {}) => {
  const value = Math.floor(Math.max(0, Math.min(5, Number(score) || 0)) * 2) / 2;
  const stars = [1, 2, 3, 4, 5].map((star) => {
    const state = value >= star ? 'full' : value >= star - .5 ? 'half' : 'empty';
    return interactive
      ? `<button type="button" class="rating-star ${state}" data-star="${star}" aria-label="${star - .5}점 또는 ${star}점">★</button>`
      : `<span class="rating-star ${state}" aria-hidden="true">★</span>`;
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
    sheet: { chips: ['소스에 찍어먹는 방식', '찐하고 꾸덕한'], scores: { light: 4.3, rata: 3.8, expected: 4.1 }, matchOffset: 0, description: '' }
  },
  rata: {
    panelSubtitle: '',
    groups: [
      ['', ['지로인스파이어', '돈백탕', '돈청탕']],
      ['', ['농도', '기름기', '짠맛', '면 굵기']],
      ['', ['돼지 • 유화', '쇼유 • 카에시강함', '극태면 • 저가수면']]
    ],
    sheet: { chips: ['지로인스파이어', '돈백탕', '돈청탕'], scores: { light: 4.8, rata: 4.8, expected: 4.8 }, matchOffset: 9, description: '육수　돼지 • 유화\n타래　쇼유 • 카에시강함\n면　극태면 • 저가수면' }
  }
};

const heroSlides = [
  {
    id: 'jun-today',
    eyebrow: '이번 주, 주목할 한 그릇',
    title: '두 가게의 취향이<br>한 그릇으로 만나는 순간.',
    meta: '멘야 쇼유 × 코하루  |  10.3–10.5',
    image: ramenPhotos.hero
  },
  {
    id: 'akari-today',
    eyebrow: '라타 에디터의 선택',
    title: '가을밤을 채우는<br>진한 미소 라멘.',
    meta: '라멘 소라  |  성수 · 서울',
    image: ramenPhotos.rich
  },
  {
    id: 'yuzu-koharu',
    eyebrow: '새롭게 문을 열었어요',
    title: '맑은 국물에 담은<br>서울의 새로운 맛.',
    meta: '유즈시오  |  연남 · 서울',
    image: ramenPhotos.clear
  },
  {
    eyebrow: '지금 가장 뜨거운 한 그릇',
    title: '익숙한 라멘에 더한<br>새로운 계절의 취향.',
    meta: '라멘 아카리  |  망원 · 서울',
    image: ramenPhotos.newsMiso
  }
];

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
  mode: readStored('rata_mode', 'light'),
  loggedIn: readStored('rata_logged_in', true),
  userName: readStored('rata_user_name', 'Realraota'),
  selectedPostId: 1,
  selectedPlaceId: 'banrai',
  rating: 4.5,
  selectedWriteStore: 'banrai',
  selectedPhoto: '',
  tasteEdit: readStored('rata_taste_edit', null),
  writeDraft: { title: '', body: '' },
  comments: {},
  savedEventIds: readStored('rata_saved_events', ['yuzu-koharu', 'jun-limited', 'akari-miso', 'shikou-guest', 'past-clear', 'past-salt']),
  savedStoreIds: readStored('rata_saved_stores', ['banrai']),
  notificationItems: [
    { id: 1, title: '유즈시오 × 코하루 콜라보', body: '내일 정오에 연남에서 시작해요.' },
    { id: 2, title: '저장한 일정이 곧 시작해요', body: '멘야준 육해공 시리즈 · 오늘 18:00' }
  ]
};
const persistState = (key, value) => {
  try { window.localStorage.setItem(key, JSON.stringify(value)); } catch {}
};

const events = [
  {
    date: todayKey,
    order: 1,
    shop: '오늘 오픈',
    dday: 'TODAY',
    title: '멘야준의 육해공 시리즈',
    time: `${shortDate(today)} 18:00 · 서울 합정`,
    detail: '닭과 해산물 육수를 한 그릇에 담은 오늘의 한정 팝업',
    image: heroSlides[0].image
  },
  {
    date: todayKey,
    order: 2,
    shop: '한정 메뉴',
    dday: 'TODAY',
    title: '아카리 가을 미소 라멘',
    time: `${shortDate(today)} 20:00 · 서울 망원`,
    detail: '구운 버섯과 진한 미소를 더한 저녁 한정 메뉴',
    image: ramenPhotos.rich
  },
  {
    date: dateKey(addDays(today, 1)),
    order: 3,
    shop: '콜라보',
    dday: 'D-1',
    title: '유즈시오 × 코하루',
    time: `${shortDate(addDays(today, 1))} 12:00 · 서울 연남`,
    detail: '유자 향을 더한 맑은 육수와 수제면 콜라보',
    image: ramenPhotos.clear
  }
].sort((a, b) => a.order - b.order);

const news = [
  { tag: 'NEW', place: '이에케 · 신촌', title: '멘야 이치도', copy: '오사카의 직수제자가 선보이는 원조 이에케 라멘', image: ramenPhotos.street },
  { tag: 'HOT', place: '츠케멘 · 망원', title: '츠케야 엔', copy: '최근 라타 언급량 150% 상승', image: ramenPhotos.newsMiso },
  { tag: 'HOT', place: '니보시 · 합정', title: '니보시팩토리', copy: '이게 시멘트야… 라멘이야…', image: ramenPhotos.newsShoyu }
];

const rankings = [
  ['라멘바 시코우', '성수', '깔끔하고 담백한 · 깊고 시원한 맛', '1,798'],
  ['하쿠텐', '이케부쿠로', '짭짤하고 진한 · 시금치 듬뿍', '1,798'],
  ['쿠로라멘', '합정', '깊은 풍미와 부드러운 면발', '1,200'],
  ['카라카라멘', '망원', '매운 육수의 진한 국물', '1,500'],
  ['소바샤', '이태원', '신선한 야채와 가벼운 육수', '950'],
  ['쇼유라멘', '신촌', '진한 간장 육수와 부드러운 면발', '1,300']
];

const talks = [
  ['합정 · 콜라보', '이번주 한정 콜라보 가보신분?'],
  ['오늘의 한그릇', '오늘자 나니요리'],
  ['추천 · 질문', '하쿠텐 오픈런 몇시가 좋아요?']
];

const ratalkPosts = [
  { id: 1, category: 'plate', author: '역삼동 라오타', badge: '라이트', time: '방금', place: '반라이', score: '5.0', title: '처음 먹어본 진한 츠케멘', copy: '면의 탄력이 좋고 소스가 진하지만 마지막 스프와리까지 편안하게 먹었어요.', image: ramenPhotos.rich, likes: 12, comments: 2, popularity: 98 },
  { id: 2, category: 'story', author: '통풍주의', badge: '라타', time: '3시간 전', place: '웅성', score: '', title: '웅성 콜라보 첫날 가실 분?', copy: '토요일 첫 타임을 예약했어요. 현장에서 같이 줄 서실 분 계신가요?', image: '', likes: 6, comments: 4, popularity: 76 },
  { id: 3, category: 'plate', author: '면발수집가', badge: '라타', time: '어제', place: '하쿠텐', score: '4.8', title: '하쿠텐 오픈런 후기', copy: '단단한 면과 짭짤한 국물이 잘 맞았고 시금치 추가가 특히 좋았습니다.', image: ramenPhotos.clear, likes: 24, comments: 5, popularity: 120 },
  { id: 4, category: 'plate', author: '망원동 면치기', badge: '라이트', time: '어제', place: '멘야준', score: '4.7', title: '맑은 국물 좋아하면 추천', copy: '닭 향이 과하지 않고 끝맛이 깔끔해서 첫 쇼유 라멘으로 좋았어요.', image: ramenPhotos.hero, likes: 7, comments: 3, popularity: 45 },
  { id: 5, category: 'story', author: '연남국물단', badge: '라이트', time: '2일 전', place: '유즈시오', score: '', title: '유즈시오 평일 대기시간', copy: '화요일 여섯 시 기준으로 스무 분 정도 기다렸습니다. 유자 향 좋아하면 추천해요.', image: '', likes: 9, comments: 6, popularity: 67 },
  { id: 6, category: 'plate', author: '성수라멘부', badge: '라타', time: '2일 전', place: '라멘바 시코우', score: '4.6', title: '시코우 청탕 한 그릇', copy: '맑지만 감칠맛이 오래 남고 얇은 면이 국물과 자연스럽게 어울렸어요.', image: ramenPhotos.newsShoyu, likes: 18, comments: 7, popularity: 88 },
  { id: 7, category: 'story', author: '합정퇴근러', badge: '라이트', time: '3일 전', place: '쿠로라멘', score: '', title: '합정 저녁 혼밥 추천 부탁해요', copy: '매운맛이 세지 않고 좌석 회전이 빠른 곳을 찾고 있어요.', image: '', likes: 4, comments: 9, popularity: 52 },
  { id: 8, category: 'plate', author: '시오한입', badge: '라타', time: '3일 전', place: '소바샤', score: '4.4', title: '채소 향이 산뜻한 시오', copy: '가벼운 육수에 구운 채소 향이 더해져 늦은 저녁에도 부담이 없었습니다.', image: ramenPhotos.mixed, likes: 15, comments: 4, popularity: 73 }
];
const escapeText = (value = '') => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const ratalkPostMarkup = (post) => `<article class="ratalk-post" data-post-id="${post.id}" data-place="${escapeText(post.place || '')}" data-popularity="${post.popularity}" data-category="${post.category}" tabindex="0" aria-label="${escapeText(post.title || `${post.place} 한 그릇 후기`)} 상세 글 보기">
  <header><span class="talk-avatar"><img src="/brand/R_logo_RATA.svg" alt=""></span><strong>${escapeText(post.author)}</strong><em>${post.badge}</em><time>${post.time}</time></header>
  ${post.image ? `<img class="talk-photo" src="${post.image}" alt="${escapeText(post.place)} 라멘">` : ''}
  <div class="talk-post-body">${post.place ? `<p class="talk-place">${icon('pin', 15)} <b>${escapeText(post.place)}</b>${post.score ? `${RatingStars({ score: post.score })}<strong>${post.score}</strong>` : ''}</p>` : ''}${post.title ? `<h2>${escapeText(post.title)}</h2>` : ''}<p class="talk-copy">${escapeText(post.copy)}</p></div>
  <footer><button class="talk-like" aria-pressed="false">♡ <span>${post.likes}</span></button><button class="talk-comment">${icon('chat', 20)} <span>${post.comments}</span></button></footer>
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
  map: { nav: true }, mapSheet: { nav: true }, storeGuest: { nav: false }, storeSaved: { nav: false }, storeLight: { nav: false }, storeRata: { nav: false }, storeRataEdit: { nav: false }, mapPrefsOld: { nav: false }, mapPrefsNew: { nav: false },
  ratalk: { nav: true }, ratalkDetail: { nav: false }, writeText: { nav: false }, writePhoto: { nav: false }, writePicker: { nav: false },
  my: { nav: true },
  myLogout: { nav: true },
  mySaved: { nav: false },
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
  <div class="experience-shell">
  <section class="splash-screen" aria-label="RATA 시작 화면">
    <video class="splash-video" autoplay muted playsinline preload="auto" aria-label="라멘 온보딩 영상">
      <source src="/video/onboding.mp4" type="video/mp4">
    </video>
    ${StatusBar({ className: 'fake-status light' })}
  </section>

  <section class="onboarding" aria-label="취향 온보딩" aria-hidden="true">
    ${StatusBar({ className: 'fake-status' })}
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
          <div class="onboarding-actions"><button class="wide-choice" data-broth="all">다 좋아요👌</button><button class="primary-btn onboarding-next">다음</button><button class="secondary-btn later-btn">건너뛰기</button></div>
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
      ${StatusBar()}
      <div class="header-top">
        <a href="#top" class="logo" aria-label="RATA 홈"><img src="/brand/txt_logo_RATA.svg" alt="RATA"></a>
        <div class="header-actions">
          <div class="mode-switch" role="group" aria-label="모드 선택">
            <button class="mode-btn active" data-mode="light">라이트</button>
            <button class="mode-btn" data-mode="rata">라타</button>
          </div>
          <button class="icon-btn notify" aria-label="알림">${icon('bell', 23)}<i></i></button>
        </div>
      </div>
      <div class="ticker" role="status">
        <span class="ticker-message ticker-light"><b>라이트 모드</b><span>쉬운 설명과 추천 위주로 홈이 보여요</span><i>♫</i></span>
        <span class="ticker-message ticker-rata"><b>라타 모드</b><span>육수·타래·면 같은 진한 스토리까지 보여요</span><i>●</i></span>
      </div>
    </header>

    <section class="hero" id="top" aria-label="주요 소식 슬라이드">
      <div class="hero-track"></div>
      <div class="hero-dots"></div>
    </section>

    <div class="divider"></div>

    <section class="section calendar-section">
      <div class="section-head">
        <div><p class="overline">WEEKLY PICK</p><h2>이번주 팝업일정 <span>🍜</span></h2><p class="sub">${shortDate(weekDates[0])} — ${shortDate(weekDates[6])} · ${events.length}개 일정</p></div>
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
        <div class="section-head compact"><div><h2>오늘의 라멘은?</h2><p class="sub">라멘이름을 몰라도 괜찮아요!</p></div></div>
        <div class="today-grid">
          ${[
            [ramenPhotos.clear, '국물없이 비벼먹는', '꾸덕한 양념에 꼬들면'],
            [ramenPhotos.dipping, '소스에 찍어먹는', '면의 식감이 더 살아나는'],
            [ramenPhotos.mixed, '국물없이 비벼먹는', '꾸덕한 양념에 꼬들면'],
            [ramenPhotos.rich, '소스에 찍어먹는', '면의 식감이 더 살아나는']
          ].map(([image,title,copy]) => `<button class="today-card" style="--today:url('${image}')" data-toast="취향별 라멘 목록을 준비 중이에요"><strong>${title}</strong><span>${copy}</span></button>`).join('')}
        </div>
      </section>
      <div class="divider"></div>
    </div>

    <section class="section news-section rata-only">
      <div class="section-head compact"><div><h2>News&Hot</h2><p class="sub">요새 괜찮은 라멘집 찾고계시진 않나요?</p></div></div>
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
      <div class="section-head compact"><div><h2>요즘 가장 많이 찾는 라멘집</h2><p class="sub">처음이라면 라타인증 맛집부터!</p></div></div>
      <div class="tabs" role="tablist"><button class="tab active" data-sort="popular">인기순</button><button class="tab" data-sort="review">리뷰순</button></div>
      <ol class="ranking-list">
        ${rankings.map((r, i) => `<li data-index="${i}"><strong class="rank">${i + 1}</strong><div class="rank-copy"><small>${r[1]}</small><h3>${r[0]}</h3><p>${r[2]}</p></div><span class="interest">${r[3]}명 관심중</span></li>`).join('')}
      </ol>
    </section>

    <div class="divider light-only"></div>

    <section class="section talk-section rata-only">
      <div class="section-head compact"><div><h2>화제중인 라타토크</h2><p class="sub">라타들이 지금 가장 많이 이야기하는 주제예요</p></div></div>
      <ol class="talk-list">
        ${talks.map((talk, i) => `<li><span>${i + 1}</span><button data-toast="토크 상세 화면을 준비 중이에요"><small>${talk[0]}</small><strong>${talk[1]}</strong></button>${icon('chevron', 23)}</li>`).join('')}
      </ol>
    </section>

    <nav class="bottom-nav" aria-label="하단 메뉴">
      <span class="nav-highlight" aria-hidden="true"></span>
      ${[['home','메인'],['calendar','일정'],['map','지도'],['ratalk','라톡'],['my','마이']].map(([key,label],i) => `<button class="nav-item ${i===0?'active':''}" data-nav="${label}"><img class="nav-off" src="/figma/nav-items/${key}_off.png" alt=""><img class="nav-on" src="/figma/nav-items/${key}_on.png" alt=""><span class="sr-only">${label}</span></button>`).join('')}
    </nav>
    <section class="prototype-screen" aria-hidden="true">
      <div class="prototype-canvas">
        <img class="prototype-image" alt="">
        <div class="prototype-hotspots"></div>
      </div>
      <section class="live-map-screen" hidden aria-label="라멘 지도">
        <header class="map-header">
          ${StatusBar()}
          <div class="header-top">
            <button class="logo map-home" aria-label="홈으로"><img src="/brand/txt_logo_RATA.svg" alt="RATA"></button>
            <div class="header-actions">
              <div class="mode-switch" aria-label="모드 선택"><button class="mode-btn active" data-mode="light">라이트</button><button class="mode-btn" data-mode="rata">라타</button></div>
              <button class="icon-btn notify" aria-label="알림">${icon('bell', 23)}<i></i></button>
            </div>
          </div>
        </header>
        <div id="rata-map" class="rata-map" aria-label="홍대 주변 라멘집 지도"></div>
        <div class="map-filters" aria-label="지도 필터">
          <button class="active" data-map-filter="all">전체</button>
          <button data-map-filter="rich">백탕</button>
          <button data-map-filter="clear">청탕</button>
          <button class="taste-edit-btn">${icon('spark', 17)} 취향편집</button>
        </div>
        <aside class="store-sheet" aria-hidden="true">
          <button class="sheet-handle" aria-label="매장 정보 펼치기"><i></i></button>
          <div class="sheet-scroll">
            <div class="store-title-row">
              <div><h2 class="store-name">반라이</h2><span class="store-match">취향 78% 일치</span></div>
              <div><button class="sheet-save" aria-label="저장">${icon('bookmark', 23)}</button><button class="sheet-close" aria-label="닫기">×</button></div>
            </div>
            <div class="store-chips"></div>
            <div class="store-scores"><div><span>라이트</span><strong data-store-score="light"></strong></div><div><span>라타</span><strong data-store-score="rata"></strong></div><div><span>내 예상별점</span><strong data-store-score="expected"></strong></div></div>
            <div class="store-gallery">
              <img src="${ramenPhotos.clear}" alt="반라이 라멘">
              <img src="${ramenPhotos.rich}" alt="반라이 츠케멘">
              <img src="${ramenPhotos.mixed}" alt="반라이 마제소바">
            </div>
            <button class="sheet-more">매장 상세정보 보기 ${icon('chevron', 18)}</button>
            <div class="store-expanded-content">
              <section><h3>내 취향과 잘 맞는 이유</h3><p class="mode-taste-copy">진한 육수와 꾸덕한 소스를 좋아하는 취향에 잘 맞아요.</p></section>
              <section><h3>매장정보</h3><dl><div><dt>주소</dt><dd class="store-address">서울 마포구 동교로 212</dd></div><div><dt>영업시간</dt><dd>11:30–21:00</dd></div><div><dt>휴무</dt><dd>매주 월요일</dd></div></dl></section>
              <section><h3>라타들의 한줄평</h3><p>“면이 단단하고 소스가 끝까지 진해서 좋아요.”</p><p>“스프를 부어 먹는 마지막 한입까지 만족스러워요.”</p></section>
            </div>
          </div>
        </aside>
        <div class="taste-modal" hidden>
          <button class="taste-backdrop" aria-label="취향 편집 닫기"></button>
          <section class="taste-panel" role="dialog" aria-modal="true" aria-labelledby="taste-title">
            <header><div><small>지도 추천에 반영돼요</small><h2 id="taste-title">내 취향 편집</h2></div><button class="taste-close" aria-label="닫기">×</button></header>
            <div class="taste-editor-groups"></div>
            <button class="taste-save">취향 저장하기</button>
          </section>
        </div>
      </section>
      <section class="live-ratalk-screen" hidden aria-label="라톡">
        <header class="ratalk-header">
          ${StatusBar({ className: 'home-status dark-status' })}
          <div class="ratalk-titlebar"><h1>라톡</h1><div><button data-notifications aria-label="알림">${icon('bell', 23)}</button><button class="talk-search-toggle" aria-label="검색">${icon('search', 23)}</button></div></div>
        </header>
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
        ${StatusBar({ className: 'home-status auth-status' })}
        <div class="auth-visual">
          <button class="auth-back" type="button" aria-label="이전 화면">‹</button>
          <img src="/brand/R_logo_RATA.svg" alt="RATA">
          <h1>당신의<br>깊어질<br>취향을</h1>
        </div>
        <section class="auth-card">
          <header><img class="auth-card-logo" src="/brand/R_logo_RATA.svg" alt=""><h2 class="auth-title">로그인하고 취향을 이어가요</h2><p class="auth-subtitle">저장 · 댓글 · 글쓰기는 로그인 후 이용가능합니다.</p></header>
          <form class="auth-form" novalidate>
            ${Input({ name: 'email', label: '이메일 주소', type: 'email', placeholder: '이메일 주소', autocomplete: 'email', required: true })}
            ${Input({ name: 'password', label: '비밀번호', type: 'password', placeholder: '비밀번호', autocomplete: 'current-password', required: true, hint: '영문, 숫자 포함 8자 이상' })}
            <p class="auth-terms">가입하면 <button type="button">이용약관</button>과 <button type="button">개인정보 처리방침</button>에 동의해요.</p>
            ${Button({ label: '로그인하기', type: 'submit', className: 'auth-submit', disabled: true })}
          </form>
          <div class="auth-divider"><span>간편로그인</span></div>
          <div class="auth-socials"><button type="button" class="kakao" data-provider="카카오" aria-label="카카오로 계속하기"><span></span></button><button type="button" class="naver" data-provider="네이버" aria-label="네이버로 계속하기">N</button><button type="button" data-provider="구글" aria-label="구글로 계속하기">G</button></div>
          <footer><p class="auth-switch-copy">아직 계정이 없으신가요? <button class="auth-switch" type="button">회원가입</button></p><p class="login-only">계정이나 비밀번호를 잊어버리셨나요? <button type="button" data-auth-help>e-mail/pw찾기</button></p><button class="auth-browse" type="button">먼저 둘러보기</button><p class="auth-mock-notice">수업용 목업 로그인입니다. 실제 계정 서버와 연결되어 있지 않아요.</p></footer>
        </section>
      </section>
      <nav class="prototype-nav" aria-label="피그마 하단 메뉴">
        <span class="nav-highlight" aria-hidden="true"></span>
        ${[['home','메인'],['calendar','일정'],['map','지도'],['ratalk','라톡'],['my','마이']].map(([key,label], index) => `<button class="nav-item ${index===0?'active':''}" data-prototype-nav="${index}" aria-label="${label}"><img class="nav-off" src="/figma/nav-items/${key}_off.png" alt=""><img class="nav-on" src="/figma/nav-items/${key}_on.png" alt=""></button>`).join('')}
      </nav>
    </section>
    ${Dialog({ id: 'logout-dialog', title: '로그아웃 할까요?', body: '저장한 일정, 취향, 한 그릇은 그대로 남아있어요. 다시 로그인 하면 이어서 볼 수 있어요.', confirmLabel: '로그아웃' })}
    ${Dialog({ id: 'delete-dialog', title: '정말 탈퇴할까요?', body: '저장한 일정과 취향 기록이 모두 삭제되며 되돌릴 수 없어요.', confirmLabel: '탈퇴하기' })}
    ${Dialog({ id: 'login-required-dialog', title: '로그인이 필요해요', body: '저장과 좋아요는 로그인 후 이용할 수 있어요.', confirmLabel: '로그인' })}
    ${Dialog({ id: 'content-detail-dialog', title: '상세 정보', body: '내용을 불러왔어요.', confirmLabel: '확인', cancelLabel: '닫기' })}
    <aside class="notification-panel" hidden aria-label="알림 패널"><header><h2>알림</h2><button type="button" data-clear-notifications>모두 지우기</button><button type="button" data-close-notifications aria-label="알림 닫기">×</button></header><div class="notification-list"></div></aside>
    ${Toast()}
  </main>
  </div>
`;

const heroTrack = document.querySelector('.hero-track');
const heroDots = document.querySelector('.hero-dots');
heroTrack.innerHTML = heroSlides.map((slide, i) => `<article class="hero-slide" style="--hero: url('${slide.image}')" aria-hidden="${i !== 0}"><div class="hero-copy"><p>${slide.eyebrow}</p><h1>${slide.title}</h1><small>${slide.meta}</small></div></article>`).join('');
heroDots.innerHTML = heroSlides.map((_, i) => `<button class="${i === 0 ? 'active' : ''}" aria-label="${i + 1}번째 슬라이드"></button>`).join('');

let heroIndex = 0;
const setHero = (index) => {
  heroIndex = (index + heroSlides.length) % heroSlides.length;
  heroTrack.style.transform = `translateX(-${heroIndex * 100}%)`;
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
enableSwipe(document.querySelector('.hero'), () => setHero(heroIndex + 1), () => setHero(heroIndex - 1));

const miniDots = document.querySelector('.mini-dots');
miniDots.innerHTML = '';

const eventsTrack = document.querySelector('.events-track');
const eventsWrap = document.querySelector('.events-wrap');
const emptySchedule = document.querySelector('.empty-schedule');
const renderEvents = (selectedDate) => {
  const selectedEvents = events.filter((event) => event.date === selectedDate);
  eventsTrack.innerHTML = selectedEvents.map((event) => `<article class="event-card" data-event-id="${event.id}" tabindex="0">
    <img src="${event.image}" alt="${event.title} 라멘 사진">
    <div class="event-copy"><div><span class="pill dark">${event.shop}</span><span class="dday">${event.dday}</span></div><h3>${event.title}</h3><p class="event-time">${event.time}</p><p class="event-detail">${event.detail}</p></div>
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
  groups.innerHTML = content.groups.map(([title, chips]) => `<div class="taste-editor-group">${title ? `<h3>${title}</h3>` : ''}<div class="taste-pills">${chips.map((chip) => `<button type="button" class="${savedChoices.includes(chip) ? 'selected' : ''}" aria-pressed="${savedChoices.includes(chip)}">${chip}</button>`).join('')}</div></div>`).join('');
}

function applySheetModeContent(baseMatch) {
  const { sheet } = modeContent[appState.mode];
  const chips = document.querySelector('.store-chips');
  if (chips) chips.innerHTML = sheet.chips.map((chip) => `<span>${chip}</span>`).join('');
  Object.entries(sheet.scores).forEach(([key, value]) => {
    const score = document.querySelector(`[data-store-score="${key}"]`);
    if (score) score.textContent = value.toFixed(1);
  });
  const description = document.querySelector('.mode-taste-copy');
  if (description) {
    description.textContent = sheet.description;
    description.hidden = !sheet.description;
  }
  const match = document.querySelector('.store-match');
  const numericBase = Number.isFinite(baseMatch) ? baseMatch : Number(match?.dataset.baseMatch);
  if (match && Number.isFinite(numericBase)) match.textContent = `취향 ${Math.min(99, numericBase + sheet.matchOffset)}% 일치`;
}

function setAppMode(selectedMode, announce = false) {
  appState.mode = selectedMode;
  persistState('rata_mode', selectedMode);
  document.body.classList.toggle('rata-mode', selectedMode === 'rata');
  document.querySelectorAll('.mode-btn').forEach((button) => button.classList.toggle('active', button.dataset.mode === selectedMode));
  document.querySelectorAll('[data-settings-mode]').forEach((button) => button.classList.toggle('active', button.dataset.settingsMode === selectedMode));
  renderTasteEditorMode();
  applySheetModeContent();
  const compose = document.querySelector('.ratalk-compose');
  if (compose) compose.dataset.mode = selectedMode;
  if (announce) showToast(selectedMode === 'rata' ? '라타 모드로 전환했어요' : '라이트 모드로 전환했어요');
}
document.querySelectorAll('.mode-btn').forEach(btn => btn.addEventListener('click', () => setAppMode(btn.dataset.mode, true)));
setAppMode(appState.mode);

document.querySelectorAll('.date-card').forEach(card => card.addEventListener('click', () => {
  document.querySelectorAll('.date-card').forEach(c => c.classList.remove('selected'));
  card.classList.add('selected');
  renderEvents(card.dataset.date);
}));

eventsTrack.addEventListener('click', (event) => {
  const btn = event.target.closest('.bookmark');
  const card = event.target.closest('.event-card');
  if (btn) {
    if (!ensureLoggedIn()) return;
    const id = card.dataset.eventId;
    const active = !appState.savedEventIds.includes(id);
    appState.savedEventIds = active ? [...appState.savedEventIds, id] : appState.savedEventIds.filter((savedId) => savedId !== id);
    persistState('rata_saved_events', appState.savedEventIds);
    btn.classList.toggle('saved', active);
    btn.setAttribute('aria-pressed', String(active));
    showToast(active ? '일정을 저장했어요' : '저장을 취소했어요');
    return;
  }
  if (card) openPrototype('calendarDetail');
});
eventsTrack.addEventListener('keydown', (event) => {
  if ((event.key === 'Enter' || event.key === ' ') && event.target.closest('.event-card')) {
    event.preventDefault();
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
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  tab.classList.add('active');
  const list = document.querySelector('.ranking-list');
  [...list.children].reverse().forEach(item => list.append(item));
}));

const bottomNav = document.querySelector('.bottom-nav');
document.querySelectorAll('.nav-item').forEach((btn, index) => btn.addEventListener('click', () => {
  document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  bottomNav.style.setProperty('--nav-index', index);
  if (index === 0) closePrototype();
  else openPrototype(['', 'calendar', 'map', 'ratalk', 'my'][index]);
}));

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
let mapProvider = 'naver';
const authRoutes = new Set(['loginVisual', 'loginForm', 'join', 'joinInput', 'joinValid', 'socialLogin']);
const myRoutes = new Set(['my', 'myLogout', 'mySaved', 'settings', 'settingsLogout', 'myPlate']);
const calendarRoutes = new Set(['calendar', 'calendarMonth', 'calendarDetail']);
const mapRoutes = new Set(['map','mapSheet','storeGuest','storeSaved','storeLight','storeRata','storeRataEdit','mapPrefsOld','mapPrefsNew']);
const ratalkSubRoutes = new Set(['ratalkDetail','writeText','writePhoto','writePicker']);
const stateRoutes=new Set(['stateLoading','stateEmpty','stateError','stateMaintenance','stateUpdate']);

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
  { id: 'banrai', name: '반라이', lat: 37.5563, lng: 126.9236, type: 'rich', address: '서울 마포구 동교로 212', tags: ['츠케멘', '진하고 꾸덕한'], match: 78, image: ramenPhotos.rich },
  { id: 'menyajun', name: '멘야준', lat: 37.5589, lng: 126.9211, type: 'clear', address: '서울 마포구 연희로1길 36', tags: ['쇼유', '깔끔하고 담백한'], match: 84, image: ramenPhotos.hero },
  { id: 'hakuten', name: '하쿠텐', lat: 37.5536, lng: 126.9190, type: 'rich', address: '서울 마포구 와우산로29길 14', tags: ['이에케', '짭짤하고 진한'], match: 72, image: ramenPhotos.spicy },
  { id: 'ramen-truck', name: '라멘트럭', lat: 37.5504, lng: 126.9228, type: 'clear', address: '서울 마포구 독막로6길 15', tags: ['시오', '깊고 시원한'], match: 81, image: ramenPhotos.clear },
  { id: 'kyo', name: '쿄라멘', lat: 37.5598, lng: 126.9272, type: 'rich', address: '서울 마포구 성미산로 161', tags: ['돈코츠', '고소하고 묵직한'], match: 69, image: ramenPhotos.newsMiso },
  { id: 'yuzushio', name: '유즈시오', lat: 37.5551, lng: 126.9284, type: 'clear', address: '서울 마포구 동교로38길 27', tags: ['유자 시오', '산뜻하고 맑은'], match: 91, image: ramenPhotos.newsShoyu },
  { id: 'kuro', name: '쿠로라멘', lat: 37.5517, lng: 126.9265, type: 'rich', address: '서울 마포구 양화로6길 9', tags: ['카라미소', '얼큰하고 진한'], match: 75, image: ramenPhotos.mixed }
];
if (appState.tasteEdit?.matches) {
  mapPlaces.forEach((place) => { if (appState.tasteEdit.matches[place.id]) place.match = appState.tasteEdit.matches[place.id]; });
}

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
  const useFallbackMap = (sdkError) => {
    console.warn(`[RATA map] provider=leaflet reason="${sdkError.message}" container=${mapElement.clientWidth}x${mapElement.clientHeight}`);
    mapProvider = 'leaflet';
    mapElement.innerHTML = '';
    rataMap = L.map(mapElement, { zoomControl: false, attributionControl: false, minZoom: 12 }).setView([37.5556, 126.9238], 15);
    L.tileLayer('/api/map-tile?z={z}&x={x}&y={y}', { maxZoom: 19 }).addTo(rataMap);
    mapMarkers = mapPlaces.map((place) => {
      const selected = place.id === appState.selectedPlaceId;
      const marker = L.marker([place.lat, place.lng], { title: place.name, icon: L.divIcon({ className: `rata-marker${selected ? ' featured' : ''}${place.match >= 85 ? ' recommended' : ''}`, html: selected ? '<span><b>R</b></span>' : '<span></span>', iconSize: selected ? [52,64] : [28,36], iconAnchor: selected ? [26,60] : [14,34] }) }).addTo(rataMap);
      marker.on('click', () => selectMapPlace(place.id));
      return { marker, place, type: place.type, setVisible: (visible) => { if (visible && !rataMap.hasLayer(marker)) marker.addTo(rataMap); if (!visible && rataMap.hasLayer(marker)) marker.removeFrom(rataMap); } };
    });
    mapElement.classList.remove('loading');
    showToast('네이버 지도 연결이 지연되어 기본 지도로 전환했어요.');
    return rataMap;
  };
  let maps;
  try {
    maps = await loadNaverMaps();
  } catch (sdkError) {
    return useFallbackMap(sdkError);
  }
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  console.info(`[RATA map] provider=naver container=${mapElement.clientWidth}x${mapElement.clientHeight}`);
  if (mapElement.clientHeight <= 0) {
    mapElement.classList.remove('loading');
    mapElement.innerHTML = '<div class="map-error" role="alert"><strong>지도 영역의 높이를 확인해주세요.</strong></div>';
    throw new Error('네이버 지도 컨테이너 높이가 0px입니다.');
  }
  try {
    mapProvider = 'naver';
    rataMap = new maps.Map(mapElement, { center: new maps.LatLng(37.5556, 126.9238), zoom: 15, minZoom: 12, scaleControl: false, mapDataControl: false, logoControlOptions: { position: maps.Position.BOTTOM_LEFT } });
    mapMarkers = mapPlaces.map((place) => {
      const selected = place.id === appState.selectedPlaceId;
      const marker = new maps.Marker({
        position: new maps.LatLng(place.lat, place.lng), map: rataMap, title: place.name,
        icon: { content: `<button class="naver-ratav-marker${selected ? ' featured' : ''}${place.match >= 85 ? ' recommended' : ''}" type="button" aria-label="${place.name}">${selected ? '<b>R</b>' : ''}</button>`, anchor: new maps.Point(selected ? 26 : 14, selected ? 58 : 34) }
      });
      maps.Event.addListener(marker, 'click', () => selectMapPlace(place.id));
      return { marker, place, type: place.type, setVisible: (visible) => marker.setMap(visible ? rataMap : null) };
    });
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
  if (visible) history.replaceState(null, '', `${location.pathname}?screen=mapSheet`);
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
  const place = mapPlaces.find((item) => item.id === appState.selectedPlaceId) || mapPlaces[0];
  document.querySelector('.store-name').textContent = place.name;
  document.querySelector('.store-match').dataset.baseMatch = place.match;
  document.querySelector('.store-address').textContent = place.address;
  applySheetModeContent(place.match);
  document.querySelectorAll('.store-gallery img').forEach((image, index) => {
    image.src = [place.image, ramenPhotos.clear, ramenPhotos.mixed][index];
    image.alt = `${place.name} 메뉴 사진 ${index + 1}`;
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
    if (mapProvider === 'naver') {
      marker.setIcon({ content: `<button class="naver-ratav-marker${selected ? ' featured' : ''}${place.match >= 85 ? ' recommended' : ''}" type="button" aria-label="${place.name}">${selected ? '<b>R</b>' : ''}</button>`, anchor: new window.naver.maps.Point(selected ? 26 : 14, selected ? 58 : 34) });
    } else {
      marker.setIcon(L.divIcon({ className: `rata-marker${selected ? ' featured' : ''}${place.match >= 85 ? ' recommended' : ''}`, html: selected ? '<span><b>R</b></span>' : '<span></span>', iconSize: selected ? [52,64] : [28,36], iconAnchor: selected ? [26,60] : [14,34] }));
    }
  });
}

function selectMapPlace(placeId) {
  const place = mapPlaces.find((item) => item.id === placeId);
  if (!place) return;
  appState.selectedPlaceId = place.id;
  renderSelectedStore();
  refreshMapMarkerSelection();
  if (mapProvider === 'naver') rataMap.panTo(new window.naver.maps.LatLng(place.lat, place.lng));
  else rataMap.panTo([place.lat, place.lng]);
  showStoreSheet();
}

function showStoreSheet() {
  renderSelectedStore();
  setSheetVisible(false);
  requestAnimationFrame(() => requestAnimationFrame(() => setSheetVisible(true)));
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

const myStatus = StatusBar({ className: 'home-status dark-status' });
const savedItems = [
  { id: 'yuzu-koharu', date: addDays(today, 2), title: '유즈시오 × 코하루 청탕전', place: '연남', type: 'collab', image: ramenPhotos.clear },
  { id: 'jun-limited', date: addDays(today, 5), title: '멘야준 닭백탕 한정주간', place: '성수', type: 'limited', image: ramenPhotos.hero },
  { id: 'akari-miso', date: addDays(today, 11), title: '아카리 구운버섯 미소 팝업', place: '망원', type: 'popup', image: ramenPhotos.rich },
  { id: 'shikou-guest', date: addDays(today, 18), title: '시코우 × 소바샤 게스트데이', place: '합정', type: 'collab', image: ramenPhotos.newsShoyu },
  { id: 'past-clear', date: addDays(today, -12), title: '하쿠텐 가을 이에케 위크', place: '홍대', type: 'limited', image: ramenPhotos.spicy },
  { id: 'past-salt', date: addDays(today, -24), title: '시오한입 제철채소 팝업', place: '신촌', type: 'popup', image: ramenPhotos.mixed }
];
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
  return `<article class="my-saved-row" data-saved-id="${item.id}" data-type="${item.type}"><img src="${item.image}" alt="${item.title}"><div><span><b>${diff >= 0 ? `D-${diff}` : '종료'}</b> ${shortDate(item.date)} · ${item.place}</span><strong>${item.title}</strong></div><button type="button" class="saved-bookmark ${active ? 'active' : ''}" aria-label="${item.title} ${active ? '저장 취소' : '저장'}" aria-pressed="${active}">${icon('bookmark', 20)}</button></article>`;
}).join('');

const tasteGraph = (values = [90, 80, 70, 60, 35]) => {
  const center = { x: 105, y: 92 };
  const radius = 58;
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
  const dataPoints = values.map((value, index) => point(Math.max(0, Math.min(100, value)) / 100, index));
  const axes = directions.map((_, index) => {
    const vertex = point(1, index);
    return `<line x1="${center.x}" y1="${center.y}" x2="${vertex.x.toFixed(2)}" y2="${vertex.y.toFixed(2)}"/>`;
  }).join('');
  const labelPositions = [
    { x: 105, y: 16, anchor: 'middle' },
    { x: 204, y: 66, anchor: 'end' },
    { x: 178, y: 171, anchor: 'end' },
    { x: 32, y: 171, anchor: 'start' },
    { x: 6, y: 66, anchor: 'start' }
  ];
  return `<svg class="taste-graph" viewBox="0 0 210 180" role="img" aria-label="${labels.map((label, index) => `${label} ${values[index]}`).join(', ')}"><g class="taste-grid"><polygon points="${polygon(.33)}"/><polygon points="${polygon(.66)}"/><polygon points="${polygon(1)}"/>${axes}</g><polygon class="taste-data" points="${dataPoints.map(({ x, y }) => `${x.toFixed(2)},${y.toFixed(2)}`).join(' ')}"/><g class="taste-points">${dataPoints.map(({ x, y }) => `<circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="4"/>`).join('')}</g><g class="taste-labels">${labels.map((label, index) => `<text x="${labelPositions[index].x}" y="${labelPositions[index].y}" text-anchor="${labelPositions[index].anchor}">${label}</text>`).join('')}</g></svg>`;
};

function renderSavedView() {
  const saved = savedScheduleItems();
  const source = saved.filter((item) => savedView === 'upcoming' ? item.date >= today : item.date < today);
  const filtered = source.filter((item) => !savedCollabOnly || item.type === 'collab').sort((a, b) => savedSort === 'near' ? a.date - b.date : b.date - a.date);
  const groups = filtered.reduce((result, item) => { const key = `${item.date.getFullYear()}-${item.date.getMonth() + 1}`; (result[key] ||= []).push(item); return result; }, {});
  const list = Object.entries(groups).map(([key, items]) => `<h2>${key.split('-')[1]}월</h2>${savedRows(items)}`).join('') || EmptyState({ title: '조건에 맞는 일정이 없어요', description: '필터를 바꾸면 다른 일정을 볼 수 있어요.' });
  const upcomingCount = saved.filter((item) => item.date >= today).length;
  const pastCount = saved.filter((item) => item.date < today).length;
  liveMyScreen.innerHTML = `${myStatus}<header class="my-pagebar"><button type="button" data-my-route="my" aria-label="뒤로">‹</button><h1>저장</h1></header><nav class="my-tabs"><button class="${savedView === 'upcoming' ? 'active' : ''}" data-saved-view="upcoming">다가오는 일정 ${upcomingCount}</button><button class="${savedView === 'past' ? 'active' : ''}" data-saved-view="past">지난 일정 ${pastCount}</button></nav><div class="my-filterbar"><button data-saved-sort>${savedSort === 'near' ? '날짜 가까운 순' : '날짜 먼 순'} ${icon('chevron', 16)}</button><button class="${savedCollabOnly ? 'active' : ''}" data-collab-filter aria-pressed="${savedCollabOnly}">콜라보만</button></div><section class="my-saved-list">${list}</section>`;
}

function renderMyView(name) {
  if (name === 'my' || name === 'myLogout') {
    const loggedOut = name === 'myLogout' || !appState.loggedIn;
    const upcomingSaved = savedScheduleItems().filter((item) => item.date >= today);
    const savedCount = upcomingSaved.length;
    liveMyScreen.innerHTML = `${myStatus}<header class="my-topbar"><h1>마이</h1><button type="button" data-my-route="settings" aria-label="설정">${icon('settings', 24)}</button></header>
      ${loggedOut ? `<section class="my-login-prompt"><img src="/brand/R_logo_RATA.svg" alt=""><h2>로그인하고 내 취향을<br>저장해보세요</h2><div>${Button({ label: '로그인', attributes: { 'data-my-route': 'loginVisual' } })}${Button({ label: '회원가입', variant: 'secondary', attributes: { 'data-my-route': 'join' } })}</div></section>` : `<section class="my-profile"><span><img src="/brand/R_logo_RATA.svg" alt=""></span><div><h2>${appState.userName} <em>${appState.mode === 'rata' ? '라타' : '라이트'}</em></h2><p>한 그릇의 기록이, 취향이 된다.</p></div></section>`}
      <section class="my-taste ${loggedOut ? 'locked' : ''}"><div><small>내 취향</small><h2>${loggedOut ? '로그인하면 내 취향이 보여요' : '진한 국물에<br>굵은 면, 츠케멘을<br>좋아해요'}</h2>${loggedOut ? '' : '<p>진한 국물 90 · 굵은 면 80 · 감칠맛 70<br>기름기 60 · 매운맛 35</p>'}</div>${tasteGraph()}</section>
      ${loggedOut ? '' : `<section class="my-block"><header><b>저장됨 ${savedCount}</b><button type="button" data-my-route="mySaved">전체보기 ›</button></header>${savedRows(upcomingSaved.slice(0, 2))}</section>`}
      <section class="my-block my-plates"><header><b>내 한 그릇 ${loggedOut ? '' : '24'}</b><button type="button" data-my-route="myPlate">전체보기 ›</button></header><div>${[ramenPhotos.rich,ramenPhotos.clear,ramenPhotos.spicy].map((src,index)=>`<button type="button" data-my-route="myPlate" aria-label="기록한 라멘 ${index + 1} 보기"><img src="${src}" alt=""></button>`).join('')}</div></section>`;
  } else if (name === 'mySaved') {
    if (!appState.loggedIn) {
      liveMyScreen.innerHTML = `${myStatus}<header class="my-pagebar"><button type="button" data-my-route="my" aria-label="뒤로">‹</button><h1>저장</h1></header>${EmptyState({ title: '로그인이 필요해요', description: '로그인하면 저장한 일정과 매장을 볼 수 있어요.', action: Button({ label: '로그인', attributes: { 'data-my-route': 'loginVisual' } }) })}`;
    } else renderSavedView();
  } else if (name === 'myPlate') {
    const photos=[ramenPhotos.rich,ramenPhotos.clear,ramenPhotos.spicy,ramenPhotos.newsMiso,ramenPhotos.mixed,ramenPhotos.newsShoyu,ramenPhotos.hero,ramenPhotos.street,ramenPhotos.dipping,ramenPhotos.clear];
    liveMyScreen.innerHTML = `${myStatus}<header class="my-pagebar"><button type="button" data-my-route="my" aria-label="뒤로">‹</button><h1>내 한 그릇</h1></header><nav class="my-tabs"><button class="active">전체</button><button>별점남긴 그릇 8</button></nav><p class="plate-summary">다녀온 매장 <b>8</b>　평균 별점 <b>3.9</b></p><div class="plate-grid">${photos.map((src,i)=>`<button type="button" data-my-route="ratalkDetail"><img src="${src}" alt="라멘 기록 ${i+1}">${i%3===0?'<span>4.5</span>':''}</button>`).join('')}</div><button class="plate-add" type="button" data-my-route="writePhoto" aria-label="한 그릇 추가">＋</button>`;
  } else {
    liveMyScreen.innerHTML = `${myStatus}<header class="my-pagebar"><button type="button" data-my-route="my" aria-label="뒤로">‹</button><h1>설정</h1></header><section class="settings-list"><small>모드</small><div class="settings-mode" role="group" aria-label="모드 선택"><button type="button" data-settings-mode="light" class="${appState.mode === 'light' ? 'active' : ''}">라이트</button><button type="button" data-settings-mode="rata" class="${appState.mode === 'rata' ? 'active' : ''}">라타</button></div><button type="button" data-open-taste-editor>${icon('spark', 18)} 내 취향 편집 <b>›</b></button><small>계정</small><button type="button" data-profile-edit>프로필 편집 <b>›</b></button><button type="button" data-restart-onboarding>취향 다시 고르기 <b>›</b></button><button type="button">로그인 방법 <em>이메일</em></button><small>알림</small><label>저장한 일정 알림 <input type="checkbox" checked><i></i></label><label>내 글의 댓글 알림 <input type="checkbox"><i></i></label><small>도움말</small><button type="button" data-inquiry>문의하기 <b>›</b></button><button type="button" data-legal>이용약관 · 개인정보 <b>›</b></button></section>${appState.loggedIn ? `<footer class="settings-actions">${Button({ label: '로그아웃', variant: 'secondary', attributes: { 'data-open-dialog': 'logout-dialog' } })}<button type="button" data-open-dialog="delete-dialog">회원탈퇴</button></footer>` : ''}`;
    if (name === 'settingsLogout') requestAnimationFrame(() => openDialog('logout-dialog'));
  }
  liveMyScreen.scrollTop = 0;
}

function openDialog(id) {
  const dialog = document.getElementById(id);
  dialog.hidden = false;
  requestAnimationFrame(() => dialog.classList.add('visible'));
}
function closeDialog(dialog) {
  dialog.classList.remove('visible');
  window.setTimeout(() => { dialog.hidden = true; }, 180);
}
function ensureLoggedIn() {
  if (appState.loggedIn) return true;
  openDialog('login-required-dialog');
  return false;
}

const calendarItems = [
  { id: 'seongsu-clear', date: addDays(today, 7), title: '멘야준 × 유즈시오 맑은육수전', meta: '콜라보 | 서울 · 성수', type: 'collab', image: ramenPhotos.clear },
  { id: 'mangwon-miso', date: addDays(today, 10), title: '아카리 제철버섯 미소 팝업', meta: '팝업 | 서울 · 망원', type: 'popup', image: ramenPhotos.rich },
  { id: 'hapjeong-tsuke', date: addDays(today, 14), title: '반라이 가을 츠케멘 한정주간', meta: '한정메뉴 | 서울 · 합정', type: 'limited', image: ramenPhotos.dipping },
  { id: 'sinchon-chicken', date: addDays(today, 21), title: '코하루 닭백탕 게스트데이', meta: '게스트데이 | 서울 · 신촌', type: 'guest', image: ramenPhotos.hero }
];
const calendarRows = () => calendarItems.map((item) => {
  const diff = Math.ceil((item.date - today) / 86400000);
  const active = appState.savedEventIds.includes(item.id);
  return `<article class="calendar-row" data-calendar-id="${item.id}"><time>D-${diff}<small>${shortDate(item.date)}</small></time><button type="button" data-calendar-route="calendarDetail"><strong>${item.title}</strong><span>${item.meta}</span></button><button type="button" class="calendar-save ${active ? 'active' : ''}" aria-label="${item.title} 저장" aria-pressed="${active}">${icon('bookmark',20)}</button></article>`;
}).join('');
function renderCalendarView(name) {
  if (name === 'calendar') {
    liveCalendarScreen.innerHTML = `${myStatus}<header class="calendar-title"><h1>콜라보 · 일정</h1><button type="button" data-calendar-route="calendarMonth">지난 일정 보기</button></header><section class="calendar-section"><h2><i></i> 지금 진행중 <b>2</b></h2><div class="calendar-heroes"><button type="button" data-calendar-route="calendarDetail" style="--cal:url('${ramenPhotos.newsShoyu}')"><span>콜라보</span><strong>요아케 × 비밀이야 청탕전</strong><small>${shortDate(today)} — ${shortDate(addDays(today, 4))} | 서울 · 신당</small></button><button type="button" data-calendar-route="calendarDetail" style="--cal:url('${ramenPhotos.mixed}')"><span>시즌메뉴</span><strong>멘야하나비 가을 마제소바</strong><small>${shortDate(today)} — ${shortDate(addDays(today, 6))} | 서울 · 잠실</small></button></div><h2 class="soon"><i></i> 곧 시작 <b>4</b></h2>${calendarRows()}</section>`;
  } else if (name === 'calendarMonth') {
    const past = savedItems.filter((item) => item.date < today);
    liveCalendarScreen.innerHTML = `${myStatus}<header class="my-pagebar"><button type="button" data-calendar-route="calendar" aria-label="뒤로">‹</button><h1>지난일정</h1></header><nav class="month-chips"><button>${today.getFullYear()} ${icon('chevron', 16)}</button><button class="active">${today.getMonth()}월</button></nav><header class="month-title"><h2>${today.getMonth()}월</h2><span>${past.length}개 일정</span></header><section class="past-list">${past.map((item)=>`<article><img src="${item.image}" alt="${item.title}"><button type="button" data-calendar-route="calendarDetail"><span><b>${item.type === 'collab' ? '콜라보' : '한정메뉴'}</b> 종료</span><strong>${item.title}</strong><small>${shortDate(item.date)} | 서울 · ${item.place}</small></button><button type="button" class="calendar-save" aria-label="저장" aria-pressed="false">${icon('bookmark',20)}</button></article>`).join('')}</section>`;
  } else {
    liveCalendarScreen.innerHTML = `<article class="calendar-detail" data-calendar-id="seongsu-clear"><header style="--detail:url('${ramenPhotos.newsMiso}')">${myStatus}<button type="button" data-calendar-route="calendar" aria-label="뒤로">‹</button><button type="button" class="calendar-save" aria-label="저장" aria-pressed="false">${icon('bookmark',24)}</button></header><section><span class="pill dark">콜라보</span><h1>멘야준 × 유즈시오 맑은육수전</h1><h2>${shortDate(addDays(today, 7))} — ${shortDate(addDays(today, 10))}</h2><p>서울 성동구 연무장길 41</p><h3>콜라보 메뉴</h3><dl><div><dt>유자 특선 쇼유</dt><dd>16,000 원</dd></div><div><dt>맑은 닭육수 시오</dt><dd>15,000 원</dd></div></dl><div class="calendar-detail-actions">${Button({label:'콜라보 가게 살펴보기',variant:'secondary',attributes:{'data-calendar-route':'map'}})}${Button({label:'일정 저장하기',attributes:{'data-save-detail':true}})}</div></section></article>`;
  }
}

liveCalendarScreen.addEventListener('click',(event)=>{
  const route=event.target.closest('[data-calendar-route]')?.dataset.calendarRoute;
  if(route) return openPrototype(route);
  const save=event.target.closest('.calendar-save,[data-save-detail]');
  if(save){
    if (!ensureLoggedIn()) return;
    const id = save.closest('[data-calendar-id]')?.dataset.calendarId || 'seongsu-clear';
    const active = !appState.savedEventIds.includes(id);
    appState.savedEventIds = active ? [...appState.savedEventIds, id] : appState.savedEventIds.filter((savedId) => savedId !== id);
    persistState('rata_saved_events', appState.savedEventIds);
    save.classList.toggle('active', active);
    save.setAttribute('aria-pressed', String(active));
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
    liveRatalkSub.innerHTML = `${myStatus}<header class="my-pagebar"><button data-talk-route="ratalk" aria-label="뒤로">‹</button><h1>${post.category === 'plate' ? '한 그릇' : '이야기'}</h1></header><article class="talk-detail" data-detail-post="${post.id}"><div class="talk-author"><img src="/brand/R_logo_RATA.svg" alt=""><b>${post.author}</b><span>${post.badge}</span><time>${post.time}</time></div>${post.image ? `<img class="talk-detail-photo" src="${post.image}" alt="${post.place} 라멘">` : ''}${post.place ? `<button class="talk-store" type="button" data-open-map-store="${post.place}"><span><b>${post.place}</b><small>${mapPlaces.find((place) => place.name === post.place)?.address || '서울 라멘 매장'}</small></span><i aria-hidden="true">›</i></button>` : ''}${post.score ? `<p class="talk-rating">${RatingStars({ score: post.score })}<b>${post.score}</b></p>` : ''}${post.title ? `<h2>${post.title}</h2>` : ''}<p>${post.copy}</p><div class="talk-actions">♥ ${post.likes}　▢ <span class="detail-comment-count">${comments.length}</span></div><section class="talk-comments"><h2>댓글 ${comments.length}</h2><div class="talk-comment-list">${comments.map((comment) => `<p><b>${comment.author}</b><br>${comment.copy}</p>`).join('')}</div></section></article><form class="talk-comment-form"><input aria-label="댓글" placeholder="댓글을 남겨보세요"><button type="submit" aria-label="댓글 전송">↑</button></form>`;
    return;
  }
  const story = name === 'writeText';
  const selectedStore = mapPlaces.find((place) => place.id === appState.selectedWriteStore) || mapPlaces[0];
  liveRatalkSub.innerHTML = `${myStatus}<header class="talk-write-head"><button type="button" data-talk-route="ratalk">×</button><h1>글쓰기</h1></header><nav class="talk-write-tabs ${appState.mode === 'rata' ? 'rata' : 'light'}"><button data-talk-route="writePhoto" class="${story ? '' : 'active'}">한 그릇</button><button data-talk-route="writeText" class="${story ? 'active' : ''}">이야기</button></nav><form class="talk-write-form" data-write-kind="${story ? 'story' : 'plate'}">${story ? `<label>태그 · 선택<div class="tag-row"><button type="button">매장 ＋</button><button type="button">콜라보 ＋</button><button type="button">일정 ＋</button><button type="button">질문 ＋</button></div></label><label>제목<input name="title" value="${appState.writeDraft.title}" placeholder="제목을 입력해주세요."></label>` : `<label>사진 · 선택<div class="photo-picker"><label class="photo-upload">${icon('photo', 24)}<span>사진 선택</span><input type="file" accept="image/*" hidden></label>${appState.selectedPhoto ? `<img src="${appState.selectedPhoto}" alt="선택한 라멘 사진">` : ''}</div></label><label>매장 · 필수<button type="button" class="store-pick" data-talk-route="writePicker"><span><b>${selectedStore.name}</b><small>${selectedStore.address}</small></span><i>변경</i></button></label><div class="write-stars" role="radiogroup" aria-label="별점">${RatingStars({ score: appState.rating, interactive: true })}<b>${appState.rating.toFixed(1)}</b></div>`}<label>내용<textarea name="body" maxlength="500" placeholder="라멘과 매장에 대한 이야기를 남겨주세요.">${appState.writeDraft.body}</textarea></label><p class="write-error" role="alert" hidden>내용을 입력해주세요.</p>${Button({label:'글 올리기',type:'submit'})}</form>${name === 'writePicker' ? `<aside class="write-picker"><i></i><h2>어느 매장에 다녀오셨나요?</h2><input type="search" placeholder="매장 이름 검색" aria-label="매장 검색"><div class="write-store-options">${mapPlaces.map((place) => `<button type="button" data-select-store="${place.id}"><b>${place.name}</b><span>${place.address} · ${place.tags[0]} ${place.id === selectedStore.id ? '✓' : ''}</span></button>`).join('')}</div></aside>` : ''}`;
  updateRatingStars();
}
function renderState(name){const action=Button({label:'다시 시도',attributes:{onclick:'location.reload()'}});const body=name==='stateLoading'?Skeleton({rows:5}):name==='stateEmpty'?EmptyState({title:'아직 저장한 내용이 없어요',description:'마음에 드는 일정과 매장을 저장해보세요.'}):name==='stateError'?ErrorState({description:'네트워크 연결을 확인하고 다시 시도해주세요.',action}):name==='stateMaintenance'?ErrorState({title:'잠시 점검 중이에요',description:'더 안정적인 서비스를 위해 준비하고 있어요.'}):ErrorState({title:'업데이트가 필요해요',description:'새 버전으로 업데이트한 뒤 계속 이용해주세요.',action:Button({label:'업데이트하기',attributes:{onclick:'location.reload()'}})});liveStateScreen.innerHTML=`${myStatus}<header class="my-pagebar"><h1>RATA</h1></header><main class="state-content">${body}</main>`;}
function updateRatingStars() {
  document.querySelectorAll('.write-stars .rating-star').forEach((button) => {
    const star = Number(button.dataset.star);
    button.classList.toggle('full', appState.rating >= star);
    button.classList.toggle('half', appState.rating === star - .5);
  });
  const value = document.querySelector('.write-stars b');
  if (value) value.textContent = appState.rating.toFixed(1);
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
  if (event.target.name === 'body') appState.writeDraft.body = event.target.value;
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
  const error = event.target.querySelector('.write-error');
  if (!body) {
    error.hidden = false;
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
  openPrototype('ratalk');
  showToast('글을 올렸어요.');
});

function openPrototype(name) {
  const screen = prototypeScreens[name];
  if (!screen) return;
  prototypeScreen.dataset.screen = name;
  prototypeScreen.setAttribute('aria-hidden', 'false');
  document.body.classList.add('prototype-open');
  document.querySelectorAll('.app-header, .hero, .phone-shell > .divider, .phone-shell > .section, .phone-shell > .light-only, .phone-shell > .rata-only, .bottom-nav').forEach((element) => {
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
  [liveMapScreen, liveRatalkScreen, liveRatalkSub, liveCalendarScreen, liveMyScreen, liveAuthScreen].forEach((view) => view.classList.remove('route-enter'));
  const liveView = isLiveMap ? liveMapScreen : isLiveTalk ? liveRatalkScreen : isLiveTalkSub ? liveRatalkSub : isLiveCalendar ? liveCalendarScreen : isLiveMy ? liveMyScreen : isLiveAuth ? liveAuthScreen : null;
  if (liveView) {
    void liveView.offsetWidth;
    liveView.classList.add('route-enter');
  }
  prototypeScreen.classList.toggle('map-open', isLiveMap);
  prototypeNav.classList.toggle('map-nav', isLiveMap);
  prototypeNav.classList.toggle('talk-nav', isLiveTalk);
  const navIndex = isLiveCalendar ? 1 : isLiveMap ? 2 : isLiveTalk ? 3 : isLiveMy ? 4 : 0;
  prototypeNav.style.setProperty('--nav-index', navIndex);
  prototypeNav.querySelectorAll('.nav-item').forEach((item, index) => item.classList.toggle('active', index === navIndex));
  prototypeNav.hidden = !screen.nav;
  if (isLiveMap) {
    prototypeHotspots.innerHTML = '';
    initMap().then(() => requestAnimationFrame(() => {
      if (mapProvider === 'naver') window.naver.maps.Event.trigger(rataMap, 'resize');
      else rataMap.invalidateSize();
      if (name.startsWith('mapPrefs')) { setSheetVisible(false); openTasteEditor(); }
      else if (name === 'map') { setSheetVisible(false); closeTasteEditor(); }
      else if (name === 'mapSheet') showStoreSheet();
      else setSheetVisible(true, true);
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
  history.replaceState(null, '', `${location.pathname}?screen=${name}`);
}

function closePrototype() {
  prototypeScreen.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('prototype-open');
  document.querySelectorAll('.app-header, .hero, .phone-shell > .divider, .phone-shell > .section, .phone-shell > .light-only, .phone-shell > .rata-only, .bottom-nav').forEach((element) => {
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
  bottomNav.style.setProperty('--nav-index', 0);
  document.querySelectorAll('.bottom-nav .nav-item').forEach((item, index) => item.classList.toggle('active', index === 0));
  document.querySelector('.experience-shell').scrollTo({ top: 0, behavior: 'smooth' });
  history.replaceState(null, '', `${location.pathname}?home`);
  startTickerTimer();
}

prototypeHotspots.addEventListener('click', (event) => {
  const hotspot = event.target.closest('[data-target]');
  if (hotspot) openPrototype(hotspot.dataset.target);
});

document.querySelectorAll('[data-prototype-nav]').forEach((button) => button.addEventListener('click', () => {
  const index = Number(button.dataset.prototypeNav);
  if (index === 0) closePrototype();
  else openPrototype(['', 'calendar', 'map', 'ratalk', 'my'][index]);
}));

liveMyScreen.addEventListener('click', (event) => {
  if (event.target.closest('[data-restart-onboarding]')) {
    closePrototype();
    openOnboarding(true);
    return;
  }
  const route = event.target.closest('[data-my-route]')?.dataset.myRoute;
  if (route) return openPrototype(route);
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
  const modeButton = event.target.closest('[data-settings-mode]');
  if (modeButton) {
    setAppMode(modeButton.dataset.settingsMode, true);
    renderMyView('settings');
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
    liveMyScreen.innerHTML = `${myStatus}<header class="my-pagebar"><button type="button" data-my-route="settings" aria-label="뒤로">‹</button><h1>약관 · 개인정보</h1></header><article class="legal-copy"><h2>이용약관</h2><p>RATA는 수업용 프로토타입이며 제공된 목업 정보는 서비스 기능 확인을 위해 사용됩니다.</p><h2>개인정보 처리방침</h2><p>입력한 목업 계정 정보는 서버로 전송하지 않고 현재 브라우저 안에서만 처리합니다.</p></article>`;
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
    renderSavedView();
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
document.querySelectorAll('[aria-label="알림"]').forEach((button) => button.addEventListener('click', () => {
  renderNotifications();
  notificationPanel.hidden = false;
  requestAnimationFrame(() => notificationPanel.classList.add('visible'));
}));
document.querySelector('[data-close-notifications]').addEventListener('click', () => {
  notificationPanel.classList.remove('visible');
  window.setTimeout(() => { notificationPanel.hidden = true; }, 180);
});
document.querySelector('[data-clear-notifications]').addEventListener('click', () => {
  appState.notificationItems = [];
  renderNotifications();
});

document.querySelector('.map-home').addEventListener('click', closePrototype);
document.querySelector('.taste-edit-btn').addEventListener('click', openTasteEditor);
document.querySelector('.taste-close').addEventListener('click', () => closeTasteEditor());
document.querySelector('.taste-backdrop').addEventListener('click', () => closeTasteEditor());
document.querySelector('.taste-save').addEventListener('click', () => {
  const selectedCount = document.querySelectorAll('.taste-pills button.selected').length;
  mapPlaces.forEach((place, index) => { place.match = Math.min(96, 64 + ((selectedCount * 5 + index * 3) % 31)); });
  appState.tasteEdit = {
    choices: [...document.querySelectorAll('.taste-pills button.selected')].map((button) => button.textContent.trim()),
    matches: Object.fromEntries(mapPlaces.map((place) => [place.id, place.match]))
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
  mapMarkers.forEach(({ type, setVisible }) => {
    const visible = filter === 'all' || filter === type;
    setVisible(visible);
  });
}));
document.querySelector('.sheet-close').addEventListener('click', () => {
  closeStoreSheet();
});
document.querySelector('.sheet-save').addEventListener('click', (event) => {
  if (!ensureLoggedIn()) return;
  const id = appState.selectedPlaceId;
  const active = !appState.savedStoreIds.includes(id);
  appState.savedStoreIds = active ? [...appState.savedStoreIds, id] : appState.savedStoreIds.filter((savedId) => savedId !== id);
  persistState('rata_saved_stores', appState.savedStoreIds);
  renderSelectedStore();
  showToast(active ? '매장을 저장했어요' : '저장을 취소했어요');
});
document.querySelector('.sheet-more').addEventListener('click', () => setSheetState('full'));
document.querySelector('.sheet-handle').addEventListener('click', () => {
  if (sheetDrag.didMove) {
    sheetDrag.didMove = false;
    return;
  }
  const state = storeSheet.dataset.state || 'peek';
  setSheetState(state === 'peek' ? 'half' : state === 'half' ? 'full' : 'peek');
});

const sheetTopByState = { full: 24, half: 352, peek: 612, hidden: 932 };
const sheetDrag = { pointerId: null, startY: 0, startTop: 0, lastY: 0, lastTime: 0, velocity: 0, initialState: 'peek', didMove: false };
const sheetHandle = document.querySelector('.sheet-handle');

function nearestSheetState(top, states = ['full', 'half', 'peek', 'hidden']) {
  return states.reduce((nearest, state) => Math.abs(sheetTopByState[state] - top) < Math.abs(sheetTopByState[nearest] - top) ? state : nearest, states[0]);
}

function finishSheetDrag(cancelled = false) {
  if (sheetDrag.pointerId === null) return;
  const currentTop = storeSheet.getBoundingClientRect().top;
  const delta = sheetDrag.lastY - sheetDrag.startY;
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
  sheetDrag.startTop = storeSheet.getBoundingClientRect().top;
  sheetDrag.didMove = false;
  sheetHandle.setPointerCapture(event.pointerId);
  storeSheet.classList.add('dragging');
});
sheetHandle.addEventListener('pointermove', (event) => {
  if (event.pointerId !== sheetDrag.pointerId) return;
  const elapsed = Math.max(1, event.timeStamp - sheetDrag.lastTime);
  sheetDrag.velocity = (event.clientY - sheetDrag.lastY) / elapsed;
  sheetDrag.lastY = event.clientY;
  sheetDrag.lastTime = event.timeStamp;
  const top = Math.max(sheetTopByState.full, Math.min(sheetTopByState.hidden, sheetDrag.startTop + event.clientY - sheetDrag.startY));
  sheetDrag.didMove ||= Math.abs(event.clientY - sheetDrag.startY) > 4;
  storeSheet.style.height = `${932 - top}px`;
  storeSheet.style.bottom = '0px';
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
ratalkFeed.addEventListener('click', (event) => {
  const post = event.target.closest('.ratalk-post');
  if (!post) return;
  const postId = Number(post.dataset.postId);
  const like = event.target.closest('.talk-like');
  if (like) {
    if (!ensureLoggedIn()) return;
    const liked = like.classList.toggle('liked');
    like.setAttribute('aria-pressed', String(liked));
    const count = like.querySelector('span');
    count.textContent = String(Number(count.textContent) + (liked ? 1 : -1));
    like.firstChild.textContent = liked ? '♥ ' : '♡ ';
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
document.querySelector('.ratalk-compose').addEventListener('click', () => { if (ensureLoggedIn()) openPrototype('writePhoto'); });
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
  liveAuthScreen.classList.toggle('join-view', joining);
  document.querySelector('.auth-title').innerHTML = joining ? '당신의 깊어질 취향을' : '로그인하고 취향을 이어가요';
  document.querySelector('.auth-subtitle').textContent = joining ? '이메일과 비밀번호만 입력하면 바로 시작할 수 있어요.' : '저장 · 댓글 · 글쓰기는 로그인 후 이용가능합니다.';
  document.querySelector('.auth-submit').textContent = joining ? '회원가입하기' : '로그인하기';
  document.querySelector('.auth-switch-copy').firstChild.textContent = joining ? '이미 계정이 있나요? ' : '아직 계정이 없으신가요? ';
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
      appState.userName = '꾸덕한 이케멘';
      persistState('rata_user_name', appState.userName);
      openPrototype('my');
      showToast('꾸덕한 이케멘님, 반가워요 · 이름은 마이에서 바꿀 수 있어요');
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
}));
document.querySelector('.auth-switch').addEventListener('click', () => openPrototype(isJoining() ? 'loginVisual' : 'join'));
document.querySelector('.auth-back').addEventListener('click', () => openPrototype(isJoining() ? 'loginVisual' : 'myLogout'));
document.querySelectorAll('.auth-socials [data-provider]').forEach((button) => button.addEventListener('click', () => {
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
document.querySelector('.auth-browse').addEventListener('click', () => closePrototype());
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
let tickerTimer;
let splashFinished = false;

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

function startTickerTimer() {
  const header = document.querySelector('.app-header');
  const ticker = document.querySelector('.ticker');
  clearTimeout(tickerTimer);
  header.classList.remove('ticker-hidden');
  ticker.classList.remove('dismissed');
  tickerTimer = window.setTimeout(() => {
    ticker.classList.add('dismissed');
    header.classList.add('ticker-hidden');
  }, 10000);
}

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
  splash.classList.add('hidden');
  onboarding.classList.add('visible');
  onboarding.setAttribute('aria-hidden', 'false');
  document.body.classList.add('onboarding-open');
  setOnboardingStep(0);
}

const enterHome = (remember = true) => {
  if (remember) saveOnboarding();
  splash.classList.add('hidden');
  onboarding.classList.remove('visible');
  onboarding.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('onboarding-open');
  document.querySelector('.experience-shell').scrollTo({ top: 0, behavior: 'smooth' });
  startTickerTimer();
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

if (query.has('home')) {
  markSplashSeen();
  enterHome(false);
} else if (query.has('screen') && prototypeScreens[query.get('screen')]) {
  markSplashSeen();
  enterHome(false);
  openPrototype(query.get('screen'));
} else if (query.has('skipSplash')) {
  markSplashSeen();
  if (hasOnboarded()) enterHome(false);
  else openOnboarding();
} else if (hasSeenSplash()) {
  if (hasOnboarded()) enterHome(false);
  else openOnboarding();
} else {
  splashVideo.addEventListener('ended', finishSplash, { once: true });
  window.setTimeout(finishSplash, 13500);
  splash.addEventListener('click', finishSplash, { once: true });
}
