# RATA

라멘 취향을 발견하고 팝업 일정, 맛집 순위, 커뮤니티 소식을 둘러보는 모바일 우선 웹 앱입니다.

## 로컬 실행

```bash
npm install
npm run dev
```

프로덕션 빌드는 `npm run build`로 확인할 수 있습니다.

## 교체할 이미지

현재 아래 파일은 레이아웃 검증용 벡터 더미 이미지입니다. 같은 파일명으로 실제 이미지를 교체하면 모든 사용 위치에 바로 반영됩니다.

- `public/images/ramen-collab.svg` — 메인 콜라보 히어로
- `public/images/ramen-miso.svg` — 미소 라멘 및 News & Hot 카드
- `public/images/ramen-shio.svg` — 시오 라멘 및 News & Hot 카드

온보딩과 스플래시에서 최종적으로 필요한 실사진은 다음 구도로 준비하면 됩니다.

- `public/images/splash-ramen.svg` — 현재 스플래시 더미. 최종 이미지는 세로형 9:16, 젓가락으로 면을 드는 어두운 라멘 사진
- `broth-clear.jpg` — 맑은 시오·쇼유 라멘
- `broth-rich.jpg` — 진한 돈코츠·토리파이탄 라멘
- `broth-spicy.jpg` — 붉은 미소·탄탄멘
- `style-tsukemen.jpg` — 면을 소스에 찍는 장면
- `style-mazesoba.jpg` — 비벼 먹는 마제소바
