# RATA

오늘 먹고 싶은 조건으로 라멘집을 찾고, 메뉴와 방문 조건을 확인해 저장하는 모바일 우선 웹 프로토타입입니다.

## 대표 흐름

1. 탐색 지역과 오늘 먹고 싶은 맛을 고릅니다.
2. 같은 조건을 공유하는 목록과 지도에서 가게를 선택합니다.
3. 메뉴, 방문 전 확인할 정보, 추천 이유와 주의점을 확인합니다.
4. 네이버 지도 길찾기로 이동하거나 가게를 브라우저에 저장합니다.
5. 하단 `저장`에서 가게와 일정을 다시 확인합니다.

가게와 행사 콘텐츠는 UI 검증용 예시 데이터입니다. 가격, 실시간 영업 상태, 행사 공지, 계정 동기화와 알림 서버는 연결되어 있지 않으며 화면에서도 `확인 필요` 또는 `프로토타입 예시 데이터`로 구분합니다.

## 로컬 실행

```bash
npm install
npm run dev
```

프로덕션 빌드는 `npm run build`로 확인할 수 있습니다.

네이버 지도는 `VITE_NAVER_MAP_CLIENT_ID`와 허용 도메인 설정이 필요합니다. 키가 없거나 네트워크에서 SDK를 불러올 수 없으면 지도 영역에 오류와 재시도 버튼을 표시합니다.

## 교체할 이미지

현재 화면에는 실제 음식 사진을 로컬 파일로 넣어 두었습니다. 외부 이미지 서버가 막혀도 미리보기와 배포 화면에서 동일하게 보입니다. 최종 브랜드 사진이 준비되면 아래 파일명으로 교체합니다.

온보딩과 스플래시에서 최종적으로 필요한 실사진은 다음 구도로 준비하면 됩니다.

- `public/images/photos/splash-ramen.webp` — 세로형 9:16, 젓가락으로 면을 드는 어두운 라멘 사진
- `public/images/photos/hero-ramen.webp` — 메인 히어로용 가로형 라멘 사진
- `public/images/photos/broth-clear.webp` — 맑은 시오·쇼유 라멘
- `public/images/photos/broth-rich.webp` — 진한 돈코츠·토리파이탄 라멘
- `public/images/photos/broth-spicy.webp` — 붉은 미소·탄탄멘
- `public/images/photos/style-tsukemen.webp` — 면을 소스에 찍는 장면
- `public/images/photos/style-mazesoba.webp` — 비벼 먹는 마제소바
- `public/images/photos/news-street.webp` — 라멘 가게 전경
- `public/images/photos/news-miso.webp` — News&Hot 미소 라멘
- `public/images/photos/news-shoyu.webp` — News&Hot 쇼유 라멘
