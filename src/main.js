import './styles.css';

const A = '#D62829';

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
    image: '/images/ramen-collab.svg'
  },
  {
    eyebrow: '라타 에디터의 선택',
    title: '가을밤을 채우는<br>진한 미소 라멘.',
    meta: '라멘 소라  |  성수 · 서울',
    image: '/images/ramen-miso.svg'
  },
  {
    eyebrow: '새롭게 문을 열었어요',
    title: '맑은 국물에 담은<br>서울의 새로운 맛.',
    meta: '유즈시오  |  연남 · 서울',
    image: '/images/ramen-shio.svg'
  }
];

const dates = [
  ['월', '28'], ['화', '29'], ['수', '30'], ['목', '1'], ['금', '2'], ['토', '3'], ['일', '4']
];

const events = [
  { shop: '콜라보', dday: 'D-5', title: '멘야준의 육해공시리즈', meta: '10.3 — 10.4  |  서울 · 합정', image: heroSlides[0].image },
  { shop: '팝업', dday: 'D-12', title: '유즈시오, 서울 첫 팝업', meta: '10.10 — 10.12  |  서울 · 성수', image: heroSlides[2].image },
  { shop: '게스트', dday: 'D-20', title: '삿포로 미소 나이트', meta: '10.18 단 하루  |  서울 · 연남', image: heroSlides[1].image }
];

const news = [
  { tag: 'NEW', place: '이케부쿠로 · 신촌', title: '멘야 이치도', copy: '오사카의 직수제자가 선보이는 원조 이에케 라멘', image: '/images/ramen-shio.svg' },
  { tag: 'HOT', place: '츠케멘 · 망원', title: '츠케야 엔', copy: '최근 라타 언급량 150% 상승', image: '/images/ramen-miso.svg' },
  { tag: 'HOT', place: '니보시 · 합정', title: '니보시팩토리', copy: '이게 시멘트야… 라멘이야…', image: '/images/ramen-collab.svg' }
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
  { id: 'clear', title: '맑고 깔끔한 마무리', copy: '청탕 · 시오 · 쇼유', image: '/images/ramen-shio.svg' },
  { id: 'rich', title: '진하고 묵직한 마무리', copy: '백탕 · 돈코츠 · 토리파이탄', image: '/images/ramen-collab.svg' },
  { id: 'spicy', title: '얼큰하고 자극적인', copy: '카라돈코츠 · 미소 · 탄탄멘', image: '/images/ramen-miso.svg' },
  { id: 'unknown', title: '잘 모르겠어요', copy: '다음 취향에서 얘기할게요!', image: '' }
];

const eatingChoices = [
  { id: 'soup', title: '국물있는 라멘 (standard)', copy: '따스한 스프와 면을 같이! · 입문자 추천', image: '/images/ramen-shio.svg' },
  { id: 'dip', title: '소스에 찍어먹는 츠케멘', copy: '찐한 소스에 면을 찍어먹어요 · 숙련자 추천', image: '/images/ramen-miso.svg' },
  { id: 'mix', title: '비벼먹는 마제소바', copy: '국물없이 꾸덕하게 비벼먹어요', image: '/images/ramen-collab.svg' },
  { id: 'all', title: '다 좋아요', copy: '가리지 않고 다 먹어요', image: '' }
];

document.querySelector('#app').innerHTML = `
  <div class="experience-shell">
  <section class="splash-screen" aria-label="RATA 시작 화면">
    <div class="fake-status light"><strong>9:41</strong><span><i></i><i></i><i></i><b></b></span></div>
    <div class="splash-brand"><strong>RATA</strong><p>먹을수록 선명해지는 나만의 라멘취향</p></div>
    <div class="splash-foot">RATA</div>
  </section>

  <section class="onboarding" aria-label="취향 온보딩" aria-hidden="true">
    <div class="fake-status"><strong>9:41</strong><span><i></i><i></i><i></i><b></b></span></div>
    <div class="onboarding-meta"><span class="step-count">1 / 3</span><button class="later-btn">나중에</button></div>
    <div class="onboarding-progress" aria-hidden="true"><i class="active"></i><i></i><i></i></div>
    <div class="onboarding-window">
      <div class="onboarding-track">
        <article class="onboarding-page" data-step="0">
          <div class="onboarding-title"><h1>어떤 국물 좋아하세요?</h1><p>3번만 답해주시면 첫 홈이 내 취향으로 채워져요.<br>나중에 언제든지 바꿀 수 있어요!</p></div>
          <div class="broth-grid">
            ${brothChoices.map((item, i) => `<button class="broth-card ${i === 1 ? 'selected' : ''} ${item.id === 'unknown' ? 'unknown' : ''}" data-broth="${item.id}" aria-pressed="${i === 1}" ${item.image ? `style="--choice-image:url('${item.image}')"` : ''}>
              ${item.id === 'unknown' ? '<span class="thinking">🤔</span>' : ''}
              <span><strong>${item.title}</strong><small>${item.copy}</small></span>
            </button>`).join('')}
          </div>
          <div class="onboarding-actions"><button class="wide-choice" data-broth="all">다 좋아요👌</button><button class="primary-btn onboarding-next">다음</button><button class="secondary-btn later-btn">건너뛰기</button></div>
        </article>

        <article class="onboarding-page" data-step="1">
          <div class="onboarding-title"><h1>어떻게 먹는게 좋아요?</h1><p>가게 추천과 일정 알림에 쓰여요.<br>하나만 골라주시면 금방 알아볼게요.</p></div>
          <div class="taste-list">
            ${eatingChoices.map((item, i) => `<button class="taste-option ${i === 1 ? 'selected' : ''}" data-eating="${item.id}" aria-pressed="${i === 1}">
              <span class="taste-image ${item.id === 'all' ? 'emoji' : ''}" ${item.image ? `style="--choice-image:url('${item.image}')"` : ''}>${item.id === 'all' ? '😋' : ''}</span>
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
              ['talk', '라타토크 인기글', '취향이 비슷한 라타의 인기글을 모아 알려드려요', false]
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
        <a href="#top" class="logo" aria-label="RATA 홈">RATA<span>.</span></a>
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

    <section class="section calendar-section">
      <div class="section-head">
        <div><p class="overline">WEEKLY PICK</p><h2>이번주 팝업일정 <span>🍜</span></h2><p class="sub">9.28 — 10.4 · 2개 일정</p></div>
        <button class="text-btn" data-toast="전체 일정을 준비 중이에요">전체보기 ${icon('chevron', 16)}</button>
      </div>
      <div class="date-row" aria-label="날짜 선택">
        ${dates.map(([day,date], i) => `<button class="date-card ${i === 5 ? 'selected' : ''}" data-date="${date}"><small>${day}</small><strong>${date}</strong>${i > 4 ? '<i></i>' : ''}</button>`).join('')}
      </div>
      <div class="events-wrap">
        <div class="events-track">
          ${events.map((event) => `<article class="event-card">
            <img src="${event.image}" alt="${event.title} 더미 이미지">
            <div class="event-copy"><div><span class="pill dark">${event.shop}</span><span class="dday">${event.dday}</span></div><h3>${event.title}</h3><p>${event.meta}</p></div>
            <button class="bookmark" aria-label="북마크">${icon('bookmark', 21)}</button>
          </article>`).join('')}
        </div>
        <div class="mini-dots"></div>
      </div>
    </section>

    <div class="divider"></div>

    <section class="section news-section">
      <div class="section-head compact"><div><p class="overline">TASTE NOW</p><h2>News & Hot</h2><p class="sub">요새 괜찮은 라멘집 찾고 계시진 않나요?</p></div></div>
      <div class="news-track">
        ${news.map(item => `<button class="news-card" style="--image: url('${item.image}')" data-toast="${item.title} 상세 페이지를 준비 중이에요">
          <span class="pill outline">${item.tag}</span>
          <span class="news-copy"><small>${item.place}</small><strong>${item.title}</strong><em>${item.copy}</em></span>
          <span class="round-arrow">${icon('arrow', 18)}</span>
        </button>`).join('')}
      </div>
      <div class="swipe-hint"><span></span> 옆으로 넘겨보세요</div>
    </section>

    <div class="divider"></div>

    <section class="section ranking-section">
      <div class="section-head compact"><div><p class="overline">RAMEN CHART</p><h2>요즘 가장 많이 찾는 라멘집</h2><p class="sub">처음이라면 라타 인증 맛집부터!</p></div></div>
      <div class="tabs" role="tablist"><button class="tab active" data-sort="popular">인기순</button><button class="tab" data-sort="review">리뷰순</button></div>
      <ol class="ranking-list">
        ${rankings.map((r, i) => `<li data-index="${i}"><strong class="rank">${i + 1}</strong><div class="rank-copy"><small>${r[1]}</small><h3>${r[0]}</h3><p>${r[2]}</p></div><span class="interest">${r[3]}명<br>관심중</span></li>`).join('')}
      </ol>
    </section>

    <div class="divider"></div>

    <section class="section talk-section">
      <div class="section-head compact"><div><p class="overline">COMMUNITY</p><h2>화제중인 라타토크</h2><p class="sub">라타들이 지금 가장 많이 이야기하는 주제예요</p></div></div>
      <ol class="talk-list">
        ${talks.map((talk, i) => `<li><span>${i + 1}</span><button data-toast="토크 상세 화면을 준비 중이에요"><small>${talk[0]}</small><strong>${talk[1]}</strong></button>${icon('chevron', 23)}</li>`).join('')}
      </ol>
    </section>

    <nav class="bottom-nav" aria-label="하단 메뉴">
      ${[['home','메인'],['calendar','일정'],['map','지도'],['chat','라톡'],['user','마이']].map(([ic,label],i) => `<button class="nav-item ${i===0?'active':''}" data-nav="${label}">${icon(ic,23)}<span>${label}</span></button>`).join('')}
    </nav>
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

let eventIndex = 0;
const eventTrack = document.querySelector('.events-track');
const miniDots = document.querySelector('.mini-dots');
miniDots.innerHTML = events.map((_, i) => `<button class="${i === 0 ? 'active' : ''}" aria-label="${i + 1}번째 팝업"></button>`).join('');
const setEvent = (index) => {
  eventIndex = Math.max(0, Math.min(events.length - 1, index));
  eventTrack.style.transform = `translateX(calc(-${eventIndex * 100}% - ${eventIndex * 16}px))`;
  [...miniDots.children].forEach((dot, i) => dot.classList.toggle('active', i === eventIndex));
};
[...miniDots.children].forEach((dot, i) => dot.addEventListener('click', () => setEvent(i)));
enableSwipe(eventTrack, () => setEvent(eventIndex + 1), () => setEvent(eventIndex - 1));

document.querySelectorAll('.mode-btn').forEach(btn => btn.addEventListener('click', () => {
  document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.body.classList.toggle('rata-mode', btn.dataset.mode === 'rata');
  showToast(btn.dataset.mode === 'rata' ? '라타 모드로 전환했어요' : '라이트 모드로 전환했어요');
}));

document.querySelectorAll('.date-card').forEach(card => card.addEventListener('click', () => {
  document.querySelectorAll('.date-card').forEach(c => c.classList.remove('selected'));
  card.classList.add('selected');
}));

document.querySelectorAll('.bookmark').forEach(btn => btn.addEventListener('click', () => {
  btn.classList.toggle('saved');
  showToast(btn.classList.contains('saved') ? '일정을 저장했어요' : '저장을 취소했어요');
}));

document.querySelectorAll('.tab').forEach(tab => tab.addEventListener('click', () => {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  tab.classList.add('active');
  const list = document.querySelector('.ranking-list');
  [...list.children].reverse().forEach(item => list.append(item));
}));

document.querySelectorAll('.nav-item').forEach(btn => btn.addEventListener('click', () => {
  document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  if (btn.dataset.nav === '메인') window.scrollTo({ top: 0, behavior: 'smooth' });
  else showToast(`${btn.dataset.nav} 화면은 다음 단계에서 연결할게요`);
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
  if (remember) localStorage.setItem('rata-onboarding-complete', 'true');
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

document.querySelectorAll('.broth-card, .wide-choice').forEach(card => card.addEventListener('click', () => {
  document.querySelectorAll('.broth-card, .wide-choice').forEach(item => {
    item.classList.remove('selected');
    item.setAttribute('aria-pressed', 'false');
  });
  card.classList.add('selected');
  card.setAttribute('aria-pressed', 'true');
}));

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

const needsOnboarding = query.has('onboarding') || localStorage.getItem('rata-onboarding-complete') !== 'true';
if (query.has('home') || !needsOnboarding) {
  enterHome(false);
} else if (query.has('skipSplash')) {
  openOnboarding();
} else if (!query.has('splash')) {
  window.setTimeout(openOnboarding, 1400);
}
