import './styles.css';

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
  calendar: { src: screenAsset('06_03_Calendar_1-1131.png'), nav: true, hotspots: [
    ['지난 일정 보기', 320, 72, 110, 80, 'calendarMonth'], ['진행 중인 일정 보기', 0, 150, 430, 300, 'calendarDetail']
  ] },
  calendarMonth: { src: screenAsset('07_03_Calendar_1-1152.png'), nav: true, hotspots: [
    ['뒤로', 0, 40, 64, 72, 'calendar'], ['일정 상세 보기', 0, 250, 430, 560, 'calendarDetail']
  ] },
  calendarDetail: { src: screenAsset('17_03_Calendar_1-2157.png'), nav: false, hotspots: [['뒤로', 0, 32, 64, 72, 'calendar']] },
  map: { src: screenAsset('08_04_Map_edit_1-1225.png'), nav: true, hotspots: [
    ['취향 편집', 285, 105, 132, 64, 'mapPrefsOld'], ['지도 매장 선택', 145, 300, 150, 320, 'mapSheet']
  ] },
  mapSheet: { src: screenAsset('09_04-1_Map_click_1-1273.png'), nav: true, hotspots: [
    ['매장 패널 닫기', 370, 570, 60, 70, 'map'], ['매장 상세 보기', 0, 600, 360, 230, 'storeGuest']
  ] },
  storeGuest: { src: screenAsset('10_04-1_Map_datail_라린_1-1383.png'), nav: false, hotspots: [
    ['뒤로', 0, 20, 60, 70, 'mapSheet'], ['저장하기', 350, 20, 80, 70, 'storeSaved'], ['상세 정보 펼치기', 0, 370, 430, 180, 'storeLight']
  ] },
  storeSaved: { src: screenAsset('11_04-1_Map_datail_라린_1-1460.png'), nav: false, hotspots: [
    ['뒤로', 0, 20, 60, 70, 'mapSheet'], ['저장 취소', 350, 20, 80, 70, 'storeGuest'], ['상세 정보 펼치기', 0, 370, 430, 180, 'storeLight']
  ] },
  storeLight: { src: screenAsset('12_04-1_Map_datail_라이트_1-1537.png'), nav: false, hotspots: [
    ['뒤로', 0, 20, 60, 70, 'mapSheet'], ['라타 상세 보기', 0, 980, 430, 360, 'storeRata']
  ] },
  storeRata: { src: screenAsset('13_04-1_Map_datail_라타_1-1652.png'), nav: false, hotspots: [
    ['뒤로', 0, 20, 60, 70, 'mapSheet'], ['수정된 상세 보기', 330, 20, 100, 70, 'storeRataEdit']
  ] },
  storeRataEdit: { src: screenAsset('14_04-1_Map_datail_라타_수정중__1-1852.png'), nav: false, hotspots: [['뒤로', 0, 20, 60, 70, 'mapSheet']] },
  mapPrefsOld: { src: screenAsset('15_04_map_라오타취향편집팝업_1-2040.png'), nav: false, hotspots: [
    ['취향 편집 닫기', 365, 180, 65, 80, 'map'], ['취향 단계 변경', 20, 300, 390, 340, 'mapPrefsNew'], ['취향 저장', 20, 810, 390, 70, 'map']
  ] },
  mapPrefsNew: { src: screenAsset('16_04_map_라린이취향편집팝업_1-2100.png'), nav: false, hotspots: [
    ['취향 편집 닫기', 365, 180, 65, 80, 'map'], ['취향 단계 변경', 20, 300, 390, 340, 'mapPrefsOld'], ['취향 저장', 20, 810, 390, 70, 'map']
  ] },
  ratalk: { src: screenAsset('18_05_ratalk_1-2191.png'), nav: true, hotspots: [
    ['게시글 상세 보기', 0, 150, 430, 590, 'ratalkDetail'], ['글쓰기', 340, 735, 90, 100, 'writePhoto']
  ] },
  ratalkDetail: { src: screenAsset('21_05_ratlk_view_1-2390.png'), nav: false, hotspots: [['뒤로', 0, 20, 60, 70, 'ratalk']] },
  writeText: { src: screenAsset('22_05_ratalk_write_txt_1-2433.png'), nav: false, hotspots: [
    ['닫기', 0, 20, 60, 70, 'ratalk'], ['한 그릇 쓰기', 0, 80, 215, 70, 'writePhoto'], ['매장 선택', 0, 260, 430, 100, 'writePicker']
  ] },
  writePhoto: { src: screenAsset('27_05_ratalk_write_photo_1-2690.png'), nav: false, hotspots: [
    ['닫기', 0, 20, 60, 70, 'ratalk'], ['이야기 쓰기', 215, 80, 215, 70, 'writeText'], ['매장 선택', 0, 250, 430, 100, 'writePicker']
  ] },
  writePicker: { src: screenAsset('28_05_ratalk_write_option_1-2752.png'), nav: false, hotspots: [['매장 선택 완료', 0, 520, 430, 300, 'writePhoto']] },
  my: { src: screenAsset('19_06_My_1-2218.png'), nav: true, hotspots: [
    ['설정', 350, 35, 80, 90, 'settings'], ['저장한 일정', 0, 400, 430, 220, 'mySaved'], ['내 한 그릇', 0, 620, 430, 220, 'myPlate']
  ] },
  myLogout: { src: screenAsset('20_06_My_logout_1-2314.png'), nav: true, hotspots: [
    ['로그인', 20, 110, 390, 140, 'loginVisual'], ['설정', 350, 35, 80, 90, 'settings']
  ] },
  mySaved: { src: screenAsset('23_06_My_save_1-2469.png'), nav: false, hotspots: [['뒤로', 0, 20, 60, 70, 'my']] },
  settings: { src: screenAsset('24_06_my_setting_1-2545.png'), nav: false, hotspots: [
    ['뒤로', 0, 20, 60, 70, 'my'], ['로그아웃', 20, 820, 390, 80, 'settingsLogout']
  ] },
  settingsLogout: { src: screenAsset('25_06_my_setting_1-2589.png'), nav: false, hotspots: [
    ['취소', 30, 520, 170, 80, 'settings'], ['로그아웃 확인', 210, 520, 190, 80, 'myLogout']
  ] },
  myPlate: { src: screenAsset('26_06_My_plate_1-2635.png'), nav: false, hotspots: [
    ['뒤로', 0, 20, 60, 70, 'my'], ['새 한 그릇 작성', 350, 820, 80, 90, 'writePhoto']
  ] },
  loginVisual: { src: screenAsset('01_07_login_1-869.png'), nav: false, hotspots: [
    ['로그인 입력', 20, 560, 390, 180, 'loginForm'], ['회원가입', 200, 800, 210, 100, 'join'], ['간편 로그인', 20, 700, 390, 100, 'socialLogin']
  ] },
  loginForm: { src: screenAsset('02_07_login_1-917.png'), nav: false, hotspots: [
    ['로그인 완료', 20, 650, 390, 100, 'my'], ['회원가입', 200, 800, 210, 100, 'join']
  ] },
  join: { src: screenAsset('03_07_join_1-941.png'), nav: false, hotspots: [
    ['가입 정보 입력', 20, 230, 390, 430, 'joinInput'], ['가입 완료', 20, 650, 390, 100, 'my']
  ] },
  joinInput: { src: screenAsset('36_SU1-Default_1_1-3042.png'), nav: false, hotspots: [
    ['입력 완료 상태', 20, 480, 390, 300, 'joinValid'], ['뒤로', 0, 20, 60, 70, 'join']
  ] },
  joinValid: { src: screenAsset('37_SU3-Validate_1_1-3421.png'), nav: false, hotspots: [
    ['가입 완료', 20, 700, 390, 100, 'my'], ['뒤로', 0, 20, 60, 70, 'join']
  ] },
  socialLogin: { src: screenAsset('35_Frame_382_1-2996.png'), nav: false, hotspots: [
    ['뒤로', 0, 20, 80, 80, 'loginVisual'], ['로그인 폼', 130, 560, 300, 330, 'loginForm']
  ] }
};

document.querySelector('#app').innerHTML = `
  <div class="experience-shell">
  <section class="splash-screen" aria-label="RATA 시작 화면">
    <video class="splash-video" autoplay muted playsinline preload="auto" poster="/images/photos/splash-ramen.webp" aria-hidden="true">
      <source src="/video/onboding.mp4" type="video/mp4">
    </video>
    <div class="fake-status light"><strong>9:41</strong><span><i></i><i></i><i></i><b></b></span></div>
    <div class="splash-brand"><img src="/brand/txt_logo_RATA.svg" alt="RATA"><p>먹을수록 선명해지는 나만의 라멘취향</p></div>
    <img class="splash-foot" src="/brand/txt_logo_RATA.svg" alt="">
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
            ${brothChoices.map((item, i) => `<button class="broth-card ${i === 1 || i === 2 ? 'selected' : ''}" data-broth="${item.id}" aria-pressed="${i === 1 || i === 2}" style="--choice-image:url('${item.image}')">
              <span><strong>${item.title}</strong><small>${item.copy}</small></span>
            </button>`).join('')}
          </div>
          <div class="onboarding-actions"><button class="wide-choice" data-broth="all">다 좋아요👌</button><button class="primary-btn onboarding-next">다음</button><button class="secondary-btn later-btn">건너뛰기</button></div>
        </article>

        <article class="onboarding-page" data-step="1">
          <div class="onboarding-title"><h1>어떻게 먹는게 좋아요?</h1><p>가게 추천과 일정 알림에 쓰여요.<br>하나만 골라주시면 금방 알아볼게요.</p></div>
          <div class="taste-list">
            ${eatingChoices.map((item, i) => `<button class="taste-option ${i === 1 ? 'selected' : ''}" data-eating="${item.id}" aria-pressed="${i === 1}">
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
              ['near', '근처 팝업', '내 위치 반경 3km 안 팝업 오픈 소식을 알려드려요', false],
              ['near2', '근처 팝업', '내 위치 반경 3km 안 팝업 오픈 소식을 알려드려요', false]
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
      <div class="ticker"><b>라타 모드</b><span>육수·타래·면 같은 진한 스토리까지 보여요</span><span class="ticker-dot">●</span></div>
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
        ${rankings.map((r, i) => `<li data-index="${i}"><strong class="rank">${i + 1}</strong><div class="rank-copy"><small>${r[1]}</small><h3>${r[0]}</h3><p>${r[2]}</p></div><span class="interest">${r[3]}명<br>관심중</span></li>`).join('')}
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
      ${[['home','메인'],['calendar','일정'],['map','지도'],['chat','라톡'],['user','마이']].map(([ic,label],i) => `<button class="nav-item ${i===0?'active':''}" data-nav="${label}">${icon(ic,23)}<span>${label}</span></button>`).join('')}
    </nav>
    <section class="prototype-screen" aria-hidden="true">
      <div class="prototype-canvas">
        <img class="prototype-image" alt="">
        <div class="prototype-hotspots"></div>
      </div>
      <nav class="prototype-nav" aria-label="피그마 하단 메뉴">
        ${['메인','일정','지도','라톡','마이'].map((label, index) => `<button data-prototype-nav="${index}" aria-label="${label}"></button>`).join('')}
      </nav>
    </section>
    <div class="toast" role="status" aria-live="polite"></div>
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
  document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.body.classList.toggle('rata-mode', btn.dataset.mode === 'rata');
  showToast(btn.dataset.mode === 'rata' ? '라타 모드로 전환했어요' : '라이트 모드로 전환했어요');
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

function openPrototype(name) {
  const screen = prototypeScreens[name];
  if (!screen) return;
  prototypeScreen.dataset.screen = name;
  prototypeScreen.setAttribute('aria-hidden', 'false');
  document.body.classList.add('prototype-open');
  prototypeImage.src = screen.src;
  prototypeImage.alt = `${name} 화면`;
  prototypeNav.hidden = !screen.nav;
  prototypeHotspots.innerHTML = screen.hotspots.map(([label, left, top, width, height, target]) => `<button class="prototype-hotspot" aria-label="${label}" data-target="${target}" style="left:${left}px;top:${top}px;width:${width}px;height:${height}px"></button>`).join('');
  document.querySelector('.experience-shell').scrollTo({ top: 0 });
  prototypeScreen.scrollTo({ top: 0 });
  history.replaceState(null, '', `${location.pathname}?screen=${name}`);
}

function closePrototype() {
  prototypeScreen.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('prototype-open');
  document.querySelector('.experience-shell').scrollTo({ top: 0, behavior: 'smooth' });
  history.replaceState(null, '', `${location.pathname}?home`);
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
const onboarding = document.querySelector('.onboarding');
const onboardingTrack = document.querySelector('.onboarding-track');
const onboardingProgress = [...document.querySelectorAll('.onboarding-progress i')];
const stepCount = document.querySelector('.step-count');
const query = new URLSearchParams(window.location.search);
let onboardingStep = 0;

const setOnboardingStep = (nextStep) => {
  onboardingStep = Math.max(0, Math.min(2, nextStep));
  onboardingTrack.style.transform = `translateX(-${onboardingStep * 100}%)`;
  stepCount.textContent = `${onboardingStep + 1} / 3`;
  onboardingProgress.forEach((bar, index) => bar.classList.toggle('active', index <= onboardingStep));
  document.querySelectorAll('.onboarding-page').forEach((page, index) => page.setAttribute('aria-hidden', index !== onboardingStep));
};

const openOnboarding = () => {
  splash.classList.add('hidden');
  onboarding.classList.add('visible');
  onboarding.setAttribute('aria-hidden', 'false');
  document.body.classList.add('onboarding-open');
  setOnboardingStep(0);
};

const enterHome = (remember = true) => {
  splash.classList.add('hidden');
  onboarding.classList.remove('visible');
  onboarding.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('onboarding-open');
  document.querySelector('.experience-shell').scrollTo({ top: 0, behavior: 'smooth' });
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
  enterHome(false);
} else if (query.has('screen') && prototypeScreens[query.get('screen')]) {
  enterHome(false);
  openPrototype(query.get('screen'));
} else if (query.has('skipSplash')) {
  openOnboarding();
} else if (!query.has('splash')) {
  splashVideo.playbackRate = 2;
  splashVideo.addEventListener('ended', openOnboarding, { once: true });
  window.setTimeout(openOnboarding, 6600);
  splash.addEventListener('click', openOnboarding, { once: true });
}
