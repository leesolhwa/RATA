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
    pin: '<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2"/>'
  };
  return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]}</svg>`;
};

const heroSlides = [
  {
    eyebrow: '이번 주, 주목할 한 그릇',
    title: '두 가게의 취향이<br>한 그릇으로 만나는 순간.',
    meta: '멘야 쇼유 × 코하루  |  10.3–10.5',
    image: ramenPhotos.hero
  },
  {
    eyebrow: '라타 에디터의 선택',
    title: '가을밤을 채우는<br>진한 미소 라멘.',
    meta: '라멘 소라  |  성수 · 서울',
    image: ramenPhotos.rich
  },
  {
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
  { id: 1, author: '역삼동 라오타', badge: '라이트', time: '1시간전', place: '반라이', score: '5.0', title: '', copy: '국물이 진해서 처음엔 놀랐는데 찍어먹으니까 괜찮던데요? 입문자도 먹을만 합니다, 웨이팅은 평일 1시쯤 도착해서 30분정도 기다렸어요 ㅠ', image: ramenPhotos.rich, likes: 12, comments: 8, popularity: 98 },
  { id: 2, author: '통풍주의', badge: '라타', time: '3시간전', place: '웅성 X 코하루', score: '', title: '이번 주 웅성 콜라보 둘다 갈 예정이신 분?', copy: '국물이 진해서 처음엔 놀랐는데 찍어먹으니까 괜찮던데요? 입문자도 먹을만 합니다, 웨이팅은 평일 1시쯤 도착해서 30분정도 기다렸어요 ㅠ', image: '', likes: 0, comments: 8, popularity: 76 },
  { id: 3, author: '익명의 라오타', badge: '라타', time: '3시간전', place: '하쿠텐', score: '4.8', title: '오늘 하쿠텐 오픈런 후기', copy: '면이 단단하고 국물이 깊어요. 첫 방문이라면 기본 메뉴부터 추천합니다.', image: ramenPhotos.clear, likes: 24, comments: 11, popularity: 120 },
  { id: 4, author: '망원동 면치기', badge: '라이트', time: '5시간전', place: '멘야준', score: '4.7', title: '맑은 국물 좋아하면 여기', copy: '향이 세지 않고 끝맛이 깔끔해서 편하게 먹기 좋았어요.', image: ramenPhotos.hero, likes: 7, comments: 3, popularity: 45 }
];

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
  </section>

  <section class="onboarding" aria-label="취향 온보딩" aria-hidden="true">
    <div class="fake-status"><strong>9:41</strong><span><i></i><i></i><i></i><b></b></span></div>
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
      <div class="home-status"><strong>9:41</strong><span><i></i><i></i><i></i><b></b></span></div>
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
        <button class="text-btn" data-toast="전체 일정을 준비 중이에요">전체보기 ${icon('chevron', 16)}</button>
      </div>
      <div class="date-row" aria-label="날짜 선택">
        ${weekDates.map((date, index) => {
          const key = dateKey(date);
          const hasEvent = events.some((event) => event.date === key);
          const label = date.getDate() === 1 ? `${date.getMonth() + 1}/1` : date.getDate();
          return `<button class="date-card ${key === todayKey ? 'selected' : ''}" data-date="${key}" aria-label="${shortDate(date)} ${weekDayLabels[index]}요일"><small>${weekDayLabels[index]}</small><strong>${label}</strong>${hasEvent ? '<i></i>' : ''}</button>`;
        }).join('')}
      </div>
      <div class="empty-schedule" aria-hidden="true"><strong>☹</strong><h3>이날 등록된 일정이 없어요</h3><p>다른 날짜를 눌러 이번주 일정을 확인해보세요.</p></div>
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
        ${news.map(item => `<button class="news-card" style="--image: url('${item.image}')" data-toast="${item.title} 상세 페이지를 준비 중이에요">
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
          <div class="home-status"><strong>9:41</strong><span><i></i><i></i><i></i><b></b></span></div>
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
              <div><h2>반라이</h2><span>취향 78% 일치</span></div>
              <div><button class="sheet-save" aria-label="저장">${icon('bookmark', 23)}</button><button class="sheet-close" aria-label="닫기">×</button></div>
            </div>
            <div class="store-chips"><span>소스에 찍어먹는 방식</span><span>찐하고 꾸덕한</span></div>
            <div class="store-scores"><div><span>라이트</span><strong>4.8</strong></div><div><span>라타</span><strong>4.8</strong></div><div><span>내 예상별점</span><strong>4.8</strong></div></div>
            <div class="store-gallery">
              <img src="${ramenPhotos.clear}" alt="반라이 라멘">
              <img src="${ramenPhotos.rich}" alt="반라이 츠케멘">
              <img src="${ramenPhotos.mixed}" alt="반라이 마제소바">
            </div>
            <button class="sheet-more">매장 상세정보 보기 ${icon('chevron', 18)}</button>
            <div class="store-expanded-content">
              <section><h3>내 취향과 잘 맞는 이유</h3><p>진한 육수와 꾸덕한 소스를 좋아하는 취향에 잘 맞아요. 면의 탄력과 감칠맛 평가가 특히 높습니다.</p></section>
              <section><h3>매장정보</h3><dl><div><dt>주소</dt><dd>서울 마포구 동교로 212</dd></div><div><dt>영업시간</dt><dd>11:30–21:00</dd></div><div><dt>휴무</dt><dd>매주 월요일</dd></div></dl></section>
              <section><h3>라타들의 한줄평</h3><p>“면이 단단하고 소스가 끝까지 진해서 좋아요.”</p><p>“스프를 부어 먹는 마지막 한입까지 만족스러워요.”</p></section>
            </div>
          </div>
        </aside>
        <div class="taste-modal" hidden>
          <button class="taste-backdrop" aria-label="취향 편집 닫기"></button>
          <section class="taste-panel" role="dialog" aria-modal="true" aria-labelledby="taste-title">
            <header><div><small>지도 추천에 반영돼요</small><h2 id="taste-title">내 취향 편집</h2></div><button class="taste-close" aria-label="닫기">×</button></header>
            <div class="taste-editor-group"><h3>좋아하는 국물</h3><div class="taste-pills"><button class="selected">청탕</button><button>백탕</button><button class="selected">쇼유</button><button>시오</button><button>미소</button><button>돈코츠</button></div></div>
            <div class="taste-editor-group"><h3>좋아하는 맛</h3><div class="taste-pills"><button class="selected">깔끔하고 담백한</button><button>진하고 꾸덕한</button><button>얼큰하고 매콤한</button><button>독특하고 이색적인</button><button>깊고 시원한</button></div></div>
            <div class="taste-editor-group"><h3>먹는 방식</h3><div class="taste-pills"><button>국물과 함께</button><button class="selected">소스에 찍어먹기</button><button>비벼먹기</button></div></div>
            <button class="taste-save">취향 저장하기</button>
          </section>
        </div>
      </section>
      <section class="live-ratalk-screen" hidden aria-label="라톡">
        <header class="ratalk-header">
          <div class="home-status dark-status"><strong>9:41</strong><span><i></i><i></i><i></i><b></b></span></div>
          <div class="ratalk-titlebar"><h1>라톡</h1><div><button aria-label="알림">${icon('bell', 23)}</button><button aria-label="검색">${icon('search', 23)}</button></div></div>
        </header>
        <nav class="ratalk-categories" aria-label="라톡 분류">
          <button class="active" data-talk-filter="all">전체</button><button data-talk-filter="plate">한 그릇</button><button data-talk-filter="story">이야기</button>
        </nav>
        <div class="ratalk-controls">
          <div class="talk-sort-wrap"><button class="talk-sort" aria-expanded="false"><span>최신순</span>${icon('chevron', 16)}</button><div class="talk-sort-menu" hidden><button data-talk-sort="latest">최신순</button><button data-talk-sort="popular">인기순</button></div></div>
          <button class="talk-place-filter">${icon('pin', 15)} 매장전체 ${icon('chevron', 14)}</button>
        </div>
        <div class="ratalk-feed">
          ${ratalkPosts.map((post) => `<article class="ratalk-post" data-post-id="${post.id}" data-popularity="${post.popularity}" data-category="${post.image ? 'plate' : 'story'}" tabindex="0" aria-label="${post.title || `${post.place} 한 그릇 후기`} 상세 글 보기">
            <header><span class="talk-avatar"><img src="/brand/R_logo_RATA.svg" alt=""></span><strong>${post.author}</strong><em>${post.badge}</em><time>${post.time}</time></header>
            ${post.image ? `<img class="talk-photo" src="${post.image}" alt="${post.place} 라멘">` : ''}
            <div class="talk-post-body">${post.place ? `<p class="talk-place">${icon('pin', 15)} <b>${post.place}</b>${post.score ? `<span>★★★★★</span><strong>${post.score}</strong>` : ''}</p>` : ''}${post.title ? `<h2>${post.title}</h2>` : ''}<p class="talk-copy">${post.copy}</p></div>
            <footer><button class="talk-like" aria-pressed="false">♡ <span>${post.likes}</span></button><button class="talk-comment">${icon('chat', 20)} <span>${post.comments}</span></button></footer>
          </article>`).join('')}
        </div>
        <button class="ratalk-compose" aria-label="글쓰기">✎</button>
      </section>
      <section class="live-ratalk-sub" hidden aria-label="라톡 상세"></section>
      <section class="live-state-screen" hidden aria-label="상태 화면"></section>
      <section class="live-calendar-screen" hidden aria-label="일정"></section>
      <section class="live-my-screen" hidden aria-label="마이"></section>
      <section class="live-auth-screen" hidden aria-label="로그인">
        <div class="auth-visual">
          <button class="auth-back" type="button" aria-label="이전 화면">‹</button>
          <img src="/brand/R_logo_RATA.svg" alt="RATA">
          <h1>당신의<br>깊어질<br>취향을</h1>
        </div>
        <section class="auth-card">
          <header><img class="auth-card-logo" src="/brand/R_logo_RATA.svg" alt=""><h2 class="auth-title">로그인하고 취향을 이어가요</h2><p class="auth-subtitle">저장 · 댓글 · 글쓰기는 로그인 후 이용가능합니다.</p></header>
          <form class="auth-form" novalidate>
            <div class="auth-name-field">${Input({ name: 'name', label: '이름(닉네임)', placeholder: '이름(닉네임)', autocomplete: 'nickname', required: true })}</div>
            ${Input({ name: 'email', label: '이메일 주소', type: 'email', placeholder: '이메일 주소', autocomplete: 'email', required: true })}
            ${Input({ name: 'password', label: '비밀번호', type: 'password', placeholder: '비밀번호', autocomplete: 'current-password', required: true, hint: '영문, 숫자 포함 8자 이상' })}
            <div class="auth-confirm-field">${Input({ name: 'passwordConfirm', label: '비밀번호 다시 입력', type: 'password', placeholder: '비밀번호 다시 입력', autocomplete: 'new-password', required: true })}</div>
            <p class="auth-terms">가입하면 <button type="button">이용약관</button>과 <button type="button">개인정보 처리방침</button>에 동의해요.</p>
            ${Button({ label: '로그인하기', type: 'submit', className: 'auth-submit', disabled: true })}
          </form>
          <div class="auth-divider"><span>간편로그인</span></div>
          <div class="auth-socials"><button type="button" data-provider="구글" aria-label="구글로 계속하기">G</button><button type="button" class="naver" data-provider="네이버" aria-label="네이버로 계속하기">N</button><button type="button" class="kakao" data-provider="카카오" aria-label="카카오로 계속하기"><span></span></button></div>
          <footer><p class="auth-switch-copy">아직 계정이 없으신가요? <button class="auth-switch" type="button">회원가입</button></p><p class="login-only">계정이나 비밀번호를 잊어버리셨나요? <button type="button">e-mail/pw찾기</button></p></footer>
        </section>
      </section>
      <nav class="prototype-nav" aria-label="피그마 하단 메뉴">
        <span class="nav-highlight" aria-hidden="true"></span>
        ${[['home','메인'],['calendar','일정'],['map','지도'],['ratalk','라톡'],['my','마이']].map(([key,label], index) => `<button class="nav-item ${index===0?'active':''}" data-prototype-nav="${index}" aria-label="${label}"><img class="nav-off" src="/figma/nav-items/${key}_off.png" alt=""><img class="nav-on" src="/figma/nav-items/${key}_on.png" alt=""></button>`).join('')}
      </nav>
    </section>
    ${Dialog({ id: 'logout-dialog', title: '로그아웃 할까요?', body: '저장한 일정, 취향, 한 그릇은 그대로 남아있어요. 다시 로그인 하면 이어서 볼 수 있어요.', confirmLabel: '로그아웃' })}
    ${Dialog({ id: 'delete-dialog', title: '정말 탈퇴할까요?', body: '저장한 일정과 취향 기록이 모두 삭제되며 되돌릴 수 없어요.', confirmLabel: '탈퇴하기' })}
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
  eventsTrack.innerHTML = selectedEvents.map((event) => `<article class="event-card">
    <img src="${event.image}" alt="${event.title} 라멘 사진">
    <div class="event-copy"><div><span class="pill dark">${event.shop}</span><span class="dday">${event.dday}</span></div><h3>${event.title}</h3><p class="event-time">${event.time}</p><p class="event-detail">${event.detail}</p></div>
    <button class="bookmark" aria-label="${event.title} 북마크">${icon('bookmark', 21)}</button>
  </article>`).join('');
  const isEmpty = selectedEvents.length === 0;
  eventsWrap.classList.toggle('is-hidden', isEmpty);
  emptySchedule.classList.toggle('is-visible', isEmpty);
  emptySchedule.setAttribute('aria-hidden', String(!isEmpty));
};
renderEvents(todayKey);

document.querySelectorAll('.mode-btn').forEach(btn => btn.addEventListener('click', () => {
  const selectedMode = btn.dataset.mode;
  document.querySelectorAll('.mode-btn').forEach(b => b.classList.toggle('active', b.dataset.mode === selectedMode));
  document.body.classList.toggle('rata-mode', selectedMode === 'rata');
  showToast(selectedMode === 'rata' ? '라타 모드로 전환했어요' : '라이트 모드로 전환했어요');
}));

document.querySelectorAll('.date-card').forEach(card => card.addEventListener('click', () => {
  document.querySelectorAll('.date-card').forEach(c => c.classList.remove('selected'));
  card.classList.add('selected');
  renderEvents(card.dataset.date);
}));

eventsTrack.addEventListener('click', (event) => {
  const btn = event.target.closest('.bookmark');
  if (!btn) return;
  btn.classList.toggle('saved');
  showToast(btn.classList.contains('saved') ? '일정을 저장했어요' : '저장을 취소했어요');
});

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
  ['반라이', 37.5563, 126.9236, 'rich', true],
  ['멘야준', 37.5589, 126.9211, 'clear'],
  ['하쿠텐', 37.5536, 126.9190, 'rich'],
  ['라멘트럭', 37.5504, 126.9228, 'clear'],
  ['쿄라멘', 37.5598, 126.9272, 'rich'],
  ['유즈시오', 37.5551, 126.9284, 'clear'],
  ['쿠로라멘', 37.5517, 126.9265, 'rich']
];

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
    mapMarkers = mapPlaces.map(([name, lat, lng, type, featured]) => {
      const marker = L.marker([lat, lng], { title: name, icon: L.divIcon({ className: `rata-marker${featured ? ' featured' : ''}`, html: featured ? '<span><b>R</b></span>' : '<span></span>', iconSize: featured ? [52,64] : [28,36], iconAnchor: featured ? [26,60] : [14,34] }) }).addTo(rataMap);
      marker.on('click', showStoreSheet);
      return { marker, type, setVisible: (visible) => { if (visible && !rataMap.hasLayer(marker)) marker.addTo(rataMap); if (!visible && rataMap.hasLayer(marker)) marker.removeFrom(rataMap); } };
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
    mapMarkers = mapPlaces.map(([name, lat, lng, type, featured]) => {
      const marker = new maps.Marker({
        position: new maps.LatLng(lat, lng), map: rataMap, title: name,
        icon: { content: `<button class="naver-ratav-marker${featured ? ' featured' : ''}" type="button" aria-label="${name}">${featured ? '<b>R</b>' : ''}</button>`, anchor: new maps.Point(featured ? 26 : 14, featured ? 58 : 34) }
      });
      maps.Event.addListener(marker, 'click', showStoreSheet);
      return { marker, type, setVisible: (visible) => marker.setMap(visible ? rataMap : null) };
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
  storeSheet.classList.toggle('visible', visible);
  storeSheet.classList.toggle('expanded', visible && expanded);
  prototypeNav.classList.toggle('sheet-expanded', visible && expanded);
  storeSheet.setAttribute('aria-hidden', String(!visible));
  if (visible) history.replaceState(null, '', `${location.pathname}?screen=mapSheet`);
}

function showStoreSheet() {
  setSheetVisible(false);
  requestAnimationFrame(() => requestAnimationFrame(() => setSheetVisible(true)));
}

function openTasteEditor() {
  tasteModal.hidden = false;
  requestAnimationFrame(() => tasteModal.classList.add('visible'));
}

function closeTasteEditor(saved = false) {
  tasteModal.classList.remove('visible');
  window.setTimeout(() => { tasteModal.hidden = true; }, 240);
  if (saved) showToast('취향을 지도 추천에 반영했어요');
}

const myStatus = '<div class="home-status dark-status"><strong>9:41</strong><span><i></i><i></i><i></i><b></b></span></div>';
const savedItems = [
  ['웅성 X 코하루', '10.19 · 합정', 'D-5', ramenPhotos.spicy],
  ['미드나잇 라멘夜', '10.30 · 연남', 'D-16', ramenPhotos.street],
  ['멘야준 육해공', '11.08 · 성수', 'D-25', ramenPhotos.hero]
];
const savedRows = (count = savedItems.length) => savedItems.slice(0, count).map(([title, meta, day, image]) => `<article class="my-saved-row"><img src="${image}" alt="${title}"><div><span><b>${day}</b> ${meta}</span><strong>${title}</strong></div><button type="button" class="saved-bookmark active" aria-label="${title} 저장 취소">${icon('bookmark', 20)}</button></article>`).join('');

function renderMyView(name) {
  if (name === 'my' || name === 'myLogout') {
    const loggedOut = name === 'myLogout';
    liveMyScreen.innerHTML = `${myStatus}<header class="my-topbar"><h1>마이</h1><button type="button" data-my-route="settings" aria-label="설정">⚙</button></header>
      ${loggedOut ? `<section class="my-login-prompt"><img src="/brand/R_logo_RATA.svg" alt=""><h2>로그인하고 내 취향을<br>저장해보세요</h2><div>${Button({ label: '로그인', attributes: { 'data-my-route': 'loginVisual' } })}${Button({ label: '회원가입', variant: 'secondary', attributes: { 'data-my-route': 'join' } })}</div></section>` : `<section class="my-profile"><span><img src="/brand/R_logo_RATA.svg" alt=""></span><div><h2>Roalraota <em>라타</em></h2><p>한 그릇의 기록이, 취향이 된다.</p></div></section>`}
      <section class="my-taste ${loggedOut ? 'locked' : ''}"><div><small>내 취향</small><h2>${loggedOut ? '로그인하면 내 취향이 보여요' : '진한 국물에<br>굵은 면, 츠케멘을<br>좋아해요'}</h2>${loggedOut ? '' : '<p>진한 국물 90 · 굵은 면 80 · 감칠맛 70<br>기름기 60 · 매운맛 35</p>'}</div><svg viewBox="0 0 160 140" aria-label="취향 그래프"><path d="M80 10 145 55 120 130 40 130 15 55Z"/><path class="taste-data" d="M80 30 132 60 112 114 48 110 28 60Z"/></svg></section>
      <section class="my-block"><header><b>저장됨 ${loggedOut ? '' : '14'}</b><button type="button" data-my-route="mySaved">전체보기 ›</button></header>${savedRows(2)}</section>
      <section class="my-block my-plates"><header><b>내 한 그릇 ${loggedOut ? '' : '24'}</b><button type="button" data-my-route="myPlate">전체보기 ›</button></header><div>${[ramenPhotos.rich,ramenPhotos.clear,ramenPhotos.spicy].map((src)=>`<button type="button" data-my-route="myPlate"><img src="${src}" alt="기록한 라멘"></button>`).join('')}</div></section>`;
  } else if (name === 'mySaved') {
    liveMyScreen.innerHTML = `${myStatus}<header class="my-pagebar"><button type="button" data-my-route="my" aria-label="뒤로">‹</button><h1>저장</h1></header><nav class="my-tabs"><button class="active">다가오는 일정 5</button><button>지난 일정 9</button></nav><div class="my-filterbar"><button>날짜 가까운 순⌄</button><button>콜라보만⌄</button></div><section class="my-saved-list"><h2>10월</h2>${savedRows(2)}<h2>11월</h2>${savedRows(3)}</section>`;
  } else if (name === 'myPlate') {
    const photos=[ramenPhotos.rich,ramenPhotos.clear,ramenPhotos.spicy,ramenPhotos.newsMiso,ramenPhotos.mixed,ramenPhotos.newsShoyu,ramenPhotos.hero,ramenPhotos.street,ramenPhotos.dipping,ramenPhotos.clear];
    liveMyScreen.innerHTML = `${myStatus}<header class="my-pagebar"><button type="button" data-my-route="my" aria-label="뒤로">‹</button><h1>내 한 그릇</h1></header><nav class="my-tabs"><button class="active">전체</button><button>별점남긴 그릇 8</button></nav><p class="plate-summary">다녀온 매장 <b>8</b>　평균 별점 <b>3.9</b></p><div class="plate-grid">${photos.map((src,i)=>`<button type="button" data-my-route="ratalkDetail"><img src="${src}" alt="라멘 기록 ${i+1}">${i%3===0?'<span>4.5</span>':''}</button>`).join('')}</div><button class="plate-add" type="button" data-my-route="writePhoto" aria-label="한 그릇 추가">＋</button>`;
  } else {
    liveMyScreen.innerHTML = `${myStatus}<header class="my-pagebar"><button type="button" data-my-route="my" aria-label="뒤로">‹</button><h1>설정</h1></header><section class="settings-list"><small>계정</small><button type="button">프로필 편집 <b>›</b></button><button type="button" data-restart-onboarding>취향 다시 고르기 <b>›</b></button><button type="button">로그인 방법 <em>이메일</em></button><small>알림</small><label>저장한 일정 알림 <input type="checkbox" checked><i></i></label><label>내 글의 댓글 알림 <input type="checkbox"><i></i></label><small>도움말</small><button type="button">문의하기 <b>›</b></button><button type="button">이용약관 · 개인정보 <b>›</b></button></section><footer class="settings-actions">${Button({ label: '로그아웃', variant: 'secondary', attributes: { 'data-open-dialog': 'logout-dialog' } })}<button type="button" data-open-dialog="delete-dialog">회원탈퇴</button></footer>`;
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

const calendarItems = [
  ['D-7', '신죠오사카게오 X 나니요리', '콜라보 | 서울 · 잠실'],
  ['D-10', '대충팝업', '팝업 | 서울 · 잠실'],
  ['D-14', '대충팝업', '시즌메뉴 | 서울 · 잠실'],
  ['D-21', '대충팝업', '팝업 | 서울 · 잠실']
];
const calendarRows = () => calendarItems.map(([day,title,meta],index)=>`<article class="calendar-row"><time>${day}<small>10.${20+index*3}</small></time><button type="button" data-calendar-route="calendarDetail"><strong>${title}</strong><span>${meta}</span></button><button type="button" class="calendar-save ${index!==1?'active':''}" aria-label="${title} 저장">${icon('bookmark',20)}</button></article>`).join('');
function renderCalendarView(name) {
  if (name === 'calendar') {
    liveCalendarScreen.innerHTML = `<header class="calendar-title"><h1>콜라보 · 일정</h1><button type="button" data-calendar-route="calendarMonth">지난 일정 보기</button></header><section class="calendar-section"><h2><i></i> 지금 진행중 <b>2</b></h2><div class="calendar-heroes"><button type="button" data-calendar-route="calendarDetail" style="--cal:url('${ramenPhotos.newsShoyu}')"><span>콜라보</span><strong>요아케X비밀이야 부티크</strong><small>10.3 — 10.17 | 서울 · 신당</small></button><button type="button" data-calendar-route="calendarDetail" style="--cal:url('${ramenPhotos.mixed}')"><span>시즌메뉴</span><strong>멘야하나비 가을 메뉴</strong><small>10.10 — 재료 소진시</small></button></div><h2 class="soon"><i></i> 곧 시작 <b>4</b></h2>${calendarRows()}</section>`;
  } else if (name === 'calendarMonth') {
    liveCalendarScreen.innerHTML = `${myStatus}<header class="my-pagebar"><button type="button" data-calendar-route="calendar" aria-label="뒤로">‹</button><h1>지난일정</h1></header><nav class="month-chips"><button>2026⌄</button>${['9월','8월','7월','6월','5월'].map((m,i)=>`<button class="${i===0?'active':''}">${m}</button>`).join('')}</nav><header class="month-title"><h2>9월</h2><span>4개일정</span></header><section class="past-list">${calendarItems.map(([d,t,m],i)=>`<article><img src="${ramenPhotos.spicy}" alt="${t}"><button type="button" data-calendar-route="calendarDetail"><span><b>${i?'한정메뉴':'콜라보'}</b> 종료</span><strong>${t}</strong><small>9.${2+i*4} | 서울 · 합정</small></button><button type="button" class="calendar-save ${i%3===0?'active':''}" aria-label="저장">${icon('bookmark',20)}</button></article>`).join('')}</section>`;
  } else {
    liveCalendarScreen.innerHTML = `<article class="calendar-detail"><header style="--detail:url('${ramenPhotos.newsMiso}')">${myStatus}<button type="button" data-calendar-route="calendar" aria-label="뒤로">‹</button><button type="button" class="calendar-save" aria-label="저장">${icon('bookmark',24)}</button></header><section><span class="pill dark">콜라보</span><h1>신죠오사카게오X나니요리</h1><h2>10.5 — 10.8</h2><p>서울 송파구 오금로31가길 13</p><h3>콜라보 메뉴</h3><dl><div><dt>한정특선쇼유</dt><dd>29,000 원</dd></div><div><dt>한정특선시오</dt><dd>29,000 원</dd></div></dl><div class="calendar-detail-actions">${Button({label:'콜라보 가게 살펴보기',variant:'secondary'})}${Button({label:'일정 저장하기',attributes:{'data-save-detail':true}})}</div></section></article>`;
  }
}

liveCalendarScreen.addEventListener('click',(event)=>{
  const route=event.target.closest('[data-calendar-route]')?.dataset.calendarRoute;
  if(route) return openPrototype(route);
  const save=event.target.closest('.calendar-save,[data-save-detail]');
  if(save){save.classList.toggle('active');showToast(save.classList.contains('active')?'일정을 저장했어요.':'저장을 취소했어요.');}
});

function renderRatalkSub(name) {
  if (name === 'ratalkDetail') {
    liveRatalkSub.innerHTML = `${myStatus}<header class="my-pagebar"><button data-talk-route="ratalk" aria-label="뒤로">‹</button><h1>한 그릇</h1></header><article class="talk-detail"><div class="talk-author"><img src="/brand/R_logo_RATA.svg" alt=""><b>역삼동 라오타</b><span>라이트</span><time>1시간전</time></div><img class="talk-detail-photo" src="${ramenPhotos.rich}" alt="반라이 라멘"><button class="talk-store" type="button" data-talk-route="storeGuest"><b>반라이</b><span>서울 마포구 · 츠케멘</span>›</button><p class="talk-rating">★★★★★　<b>5.0</b></p><p>국물이 진해서 처음엔 놀랐는데 찍어먹으니까 괜찮던데요? 입문자도 먹을만 합니다. 웨이팅은 평일 1시쯤 도착해서 30분정도 기다렸어요.</p><div class="talk-actions">♥ 12　▢ 4</div><section class="talk-comments"><h2>댓글 4</h2><p><b>웅성웅성</b><br>반라이 츠케멘 맛있죠. 끝에 탁 치고 올라오는 감칠맛이 좋아요.</p><p><b>통풍방지위원회</b><br>생각보다 오래 안 기다리셨네요.</p></section></article><form class="talk-comment-form"><input aria-label="댓글" placeholder="댓글을 남겨보세요"><button>↑</button></form>`;
  } else {
    const story=name==='writeText';
    liveRatalkSub.innerHTML = `${myStatus}<header class="talk-write-head"><button type="button" data-talk-route="ratalk">×</button><h1>글쓰기</h1></header><nav class="talk-write-tabs"><button data-talk-route="writePhoto" class="${story?'':'active'}">한 그릇</button><button data-talk-route="writeText" class="${story?'active':''}">이야기</button></nav><form class="talk-write-form">${story?'<label>태그 · 선택<div class="tag-row"><button type="button">매장 ＋</button><button type="button">콜라보 ＋</button><button type="button">일정 ＋</button><button type="button">질문 ＋</button></div></label><label>제목<input required placeholder="제목 입력 칸입니다."></label>':'<label>사진 · 선택<div class="photo-picker"><button type="button">▣<br>1/5</button><img src="'+ramenPhotos.mixed+'" alt="선택한 라멘"></div></label><label>매장 · 필수<button type="button" class="store-pick" data-talk-route="writePicker"><b>반라이</b><span>서울 마포구 · 츠케멘</span>변경</button></label><div class="write-stars">★★★★★<b>4.5</b></div>'}<label>내용<textarea required maxlength="500" placeholder="내용 입력 칸입니다."></textarea></label>${Button({label:'글 올리기',type:'submit'})}</form>${name==='writePicker'?'<aside class="write-picker"><i></i><h2>어느 매장 다녀오셨나요?</h2><input placeholder="매장 이름 검색"><button type="button" data-talk-route="writePhoto"><b>반라이</b><span>서울 마포구 · 츠케멘　✓</span></button><button type="button" data-talk-route="writePhoto"><b>멘야준</b><span>서울 성동구 · 쇼유</span></button></aside>':''}`;
  }
}
function renderState(name){const action=Button({label:'다시 시도',attributes:{onclick:'location.reload()'}});const body=name==='stateLoading'?Skeleton({rows:5}):name==='stateEmpty'?EmptyState({title:'아직 저장한 내용이 없어요',description:'마음에 드는 일정과 매장을 저장해보세요.'}):name==='stateError'?ErrorState({description:'네트워크 연결을 확인하고 다시 시도해주세요.',action}):name==='stateMaintenance'?ErrorState({title:'잠시 점검 중이에요',description:'더 안정적인 서비스를 위해 준비하고 있어요.'}):ErrorState({title:'업데이트가 필요해요',description:'새 버전으로 업데이트한 뒤 계속 이용해주세요.',action:Button({label:'업데이트하기'})});liveStateScreen.innerHTML=`${myStatus}<header class="my-pagebar"><h1>RATA</h1></header><main class="state-content">${body}</main>`;}
liveRatalkSub.addEventListener('click',e=>{const r=e.target.closest('[data-talk-route]')?.dataset.talkRoute;if(r){e.preventDefault();openPrototype(r);}});
liveRatalkSub.addEventListener('submit',e=>{e.preventDefault();showToast('글을 올렸어요.');openPrototype('ratalk');});

function openPrototype(name) {
  const screen = prototypeScreens[name];
  if (!screen) return;
  prototypeScreen.dataset.screen = name;
  prototypeScreen.setAttribute('aria-hidden', 'false');
  document.body.classList.add('prototype-open');
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
  const dialogId = event.target.closest('[data-open-dialog]')?.dataset.openDialog;
  if (dialogId) return openDialog(dialogId);
  const bookmark = event.target.closest('.saved-bookmark');
  if (bookmark) {
    bookmark.classList.toggle('active');
    showToast(bookmark.classList.contains('active') ? '일정을 저장했어요.' : '저장을 취소했어요.');
  }
});
document.querySelectorAll('.ui-dialog').forEach((dialog) => {
  dialog.querySelectorAll('[data-dialog-close]').forEach((button) => button.addEventListener('click', () => {
    closeDialog(dialog);
    if (location.search === '?screen=settingsLogout') openPrototype('settings');
  }));
  dialog.querySelector('[data-dialog-confirm]').addEventListener('click', () => {
    closeDialog(dialog);
    if (dialog.id === 'logout-dialog') {
      showToast('로그아웃했어요.');
      openPrototype('myLogout');
    } else {
      showToast('회원탈퇴가 완료됐어요.');
      openPrototype('myLogout');
    }
  });
});

document.querySelector('.map-home').addEventListener('click', closePrototype);
document.querySelector('.taste-edit-btn').addEventListener('click', openTasteEditor);
document.querySelector('.taste-close').addEventListener('click', () => closeTasteEditor());
document.querySelector('.taste-backdrop').addEventListener('click', () => closeTasteEditor());
document.querySelector('.taste-save').addEventListener('click', () => closeTasteEditor(true));
document.querySelectorAll('.taste-pills button').forEach((button) => button.addEventListener('click', () => {
  button.classList.toggle('selected');
  button.setAttribute('aria-pressed', String(button.classList.contains('selected')));
}));
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
  setSheetVisible(false);
  history.replaceState(null, '', `${location.pathname}?screen=map`);
});
document.querySelector('.sheet-save').addEventListener('click', (event) => {
  event.currentTarget.classList.toggle('saved');
  showToast(event.currentTarget.classList.contains('saved') ? '매장을 저장했어요' : '저장을 취소했어요');
});
document.querySelector('.sheet-more').addEventListener('click', () => setSheetVisible(true, true));
document.querySelector('.sheet-handle').addEventListener('click', () => setSheetVisible(true, !storeSheet.classList.contains('expanded')));

let sheetStartY = 0;
storeSheet.addEventListener('pointerdown', (event) => { sheetStartY = event.clientY; });
storeSheet.addEventListener('pointerup', (event) => {
  const delta = event.clientY - sheetStartY;
  if (delta < -44) setSheetVisible(true, true);
  if (delta > 64) {
    if (storeSheet.classList.contains('expanded')) setSheetVisible(true, false);
    else {
      setSheetVisible(false);
      history.replaceState(null, '', `${location.pathname}?screen=map`);
    }
  }
});

const talkSortButton = document.querySelector('.talk-sort');
const talkSortMenu = document.querySelector('.talk-sort-menu');
const ratalkFeed = document.querySelector('.ratalk-feed');
talkSortButton.addEventListener('click', () => {
  const open = talkSortMenu.hidden;
  talkSortMenu.hidden = !open;
  talkSortButton.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('[data-talk-sort]').forEach((button) => button.addEventListener('click', () => {
  const mode = button.dataset.talkSort;
  const posts = [...ratalkFeed.querySelectorAll('.ratalk-post')];
  posts.sort((a, b) => mode === 'popular' ? Number(b.dataset.popularity) - Number(a.dataset.popularity) : Number(a.dataset.postId) - Number(b.dataset.postId));
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
  const filter = button.dataset.talkFilter;
  [...ratalkFeed.querySelectorAll('.ratalk-post')].forEach((post) => {
    const visible = filter === 'all' || filter === post.dataset.category || (filter === 'review' && post.dataset.category === 'plate') || (filter === 'question' && post.dataset.category === 'story');
    post.hidden = !visible;
  });
  ratalkFeed.scrollTo({ top: 0, behavior: 'smooth' });
}));
document.querySelectorAll('.talk-like').forEach((button) => button.addEventListener('click', () => {
  const liked = button.classList.toggle('liked');
  button.setAttribute('aria-pressed', String(liked));
  const count = button.querySelector('span');
  count.textContent = String(Number(count.textContent) + (liked ? 1 : -1));
  button.firstChild.textContent = liked ? '♥ ' : '♡ ';
}));
document.querySelectorAll('.ratalk-post').forEach((post) => {
  const openPost = (event) => {
    if (event.target.closest('footer button')) return;
    openPrototype('ratalkDetail');
  };
  post.addEventListener('click', openPost);
  post.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openPrototype('ratalkDetail');
    }
  });
});
document.querySelectorAll('.talk-comment').forEach((button) => button.addEventListener('click', () => openPrototype('ratalkDetail')));
document.querySelector('.ratalk-compose').addEventListener('click', () => openPrototype('writePhoto'));
document.querySelector('.talk-place-filter').addEventListener('click', () => showToast('저장한 매장과 주변 매장을 함께 보고 있어요'));

let currentAuthView = 'loginVisual';
function renderAuthView(name) {
  const previousView = currentAuthView;
  currentAuthView = name;
  const joining = ['join', 'joinInput', 'joinValid'].includes(name);
  liveAuthScreen.classList.toggle('join-view', joining);
  document.querySelector('.auth-title').innerHTML = joining ? '나만의 라멘 취향을<br>시작해보세요.' : '로그인하고 취향을 이어가요';
  document.querySelector('.auth-subtitle').textContent = joining ? '회원가입 후 나만의 라멘 취향을 찾아가보세요!' : '저장 · 댓글 · 글쓰기는 로그인 후 이용가능합니다.';
  document.querySelector('.auth-submit').textContent = joining ? '시작하기' : '로그인하기';
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
  if (name === 'name') return value.length >= 2 ? '' : '이름은 2자 이상 입력해주세요.';
  if (name === 'email') return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : '올바른 이메일 주소를 입력해주세요.';
  if (name === 'password') return value.length >= 8 && /[A-Za-z]/.test(value) && /\d/.test(value) ? '' : '영문과 숫자를 포함해 8자 이상 입력해주세요.';
  if (name === 'passwordConfirm') return value && value === authInputs.password.value ? '' : '비밀번호가 일치하지 않아요.';
  return '';
};
function updateAuthFormState(showErrors = false) {
  const requiredNames = isJoining() ? ['name', 'email', 'password', 'passwordConfirm'] : ['email', 'password'];
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
  if (field) field.dataset.touched = 'true';
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
    showToast(joining ? '회원가입이 완료됐어요.' : '로그인했어요.');
    openPrototype('my');
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
  showToast(`${provider} ${joining ? '회원가입이 완료됐어요.' : '로그인했어요.'}`);
  window.setTimeout(() => openPrototype('my'), 450);
}));

document.querySelectorAll('[data-toast]').forEach(btn => btn.addEventListener('click', () => showToast(btn.dataset.toast)));

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
