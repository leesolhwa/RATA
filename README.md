# RATA

라멘 취향을 발견하고 팝업 일정, 맛집 순위, 커뮤니티 소식을 둘러보는 모바일 우선 웹 앱입니다.

## 로컬 실행

```bash
npm install
npm run dev
```

프로덕션 빌드는 `npm run build`로 확인할 수 있습니다.

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
