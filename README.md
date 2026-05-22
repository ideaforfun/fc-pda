# 탕비실 (Tangbisil)

> 직장인을 위한 간식 추천 + 익명 커뮤니티 서비스

## 스택

- **Framework**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS
- **Fonts**: Black Han Sans (제목용, `next/font/google`) + Pretendard (본문용, CDN)
- **Deployment**: Vercel

## 시작하기

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 확인.

## 스크립트

| 명령 | 설명 |
| --- | --- |
| `npm run dev` | 개발 서버 실행 |
| `npm run build` | 프로덕션 빌드 |
| `npm run start` | 빌드 결과 실행 |
| `npm run lint` | ESLint 검사 |
| `npm run type-check` | 타입 검사 |

## 폴더 구조

```
.
├── app/                # App Router 라우트
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── fonts.ts
├── components/         # 재사용 컴포넌트
├── lib/                # 유틸 / 도메인 로직
├── public/             # 정적 에셋
├── tailwind.config.ts
├── postcss.config.js
├── next.config.mjs
└── tsconfig.json
```

## 배포

[Vercel](https://vercel.com)에 GitHub 저장소를 import 하면 자동 배포됩니다.

## 폰트 노트

- **Black Han Sans**: `next/font/google` 로 자동 최적화 — 별도 설정 불필요.
- **Pretendard**: `app/globals.css` 의 jsDelivr CDN `@import` 로 로딩 (dynamic-subset).
  자체 호스팅이 필요하면 [Pretendard 릴리스](https://github.com/orioncactus/pretendard/releases)에서
  `PretendardVariable.woff2` 를 받아 `public/fonts/` 에 두고 `next/font/local` 로 교체하세요.
