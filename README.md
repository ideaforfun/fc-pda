# 탕비실 (Tangbisil)

> 직장인을 위한 간식 추천 + 익명 커뮤니티 서비스

## 스택

- **Framework**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS
- **Fonts**: Black Han Sans (제목용, `next/font/google`) + Pretendard (본문용, CDN)
- **Database**: Supabase (Postgres) — 선택. 없으면 in-memory 모드
- **Deployment**: Vercel

## 시작하기

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 확인.

### 데이터 모드 (env 자동 분기)

| 환경변수 | 동작 |
| --- | --- |
| **없음** (기본) | **in-memory 모드** — `lib/data.ts` 의 더미로 동작. 새로고침 시 데이터 초기화. 디자인 확인용. |
| `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` 설정 | **Supabase 모드** — 투표/이야기/라운지가 실제 DB에 저장. 새로고침해도 유지. |

Supabase 셋업은 [docs/SUPABASE_SETUP.md](docs/SUPABASE_SETUP.md) 참고 (10분 소요).

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
├── app/                       # App Router 라우트
│   ├── layout.tsx             # TangbisilProvider + BottomNav + Toast
│   ├── page.tsx               # 홈
│   ├── ranking/page.tsx       # 기분 랭킹
│   ├── lounge/page.tsx        # 탕비실 라운지
│   ├── snack/[id]/page.tsx    # 간식 상세
│   ├── globals.css
│   └── fonts.ts
├── components/                # MoodCard / SnackSearchSheet / RankingList /
│                              # SnackDetail / Lounge / AdBanner / Logo /
│                              # HomeStrips / BottomNav / StoryChip / Toast
├── lib/
│   ├── data.ts                # 더미 데이터 + 헬퍼 (in-memory 모드용)
│   ├── state.tsx              # TangbisilProvider — env 분기 + 낙관적 업데이트
│   ├── supabase.ts            # Supabase 클라이언트 (env 없으면 null)
│   ├── auth.ts                # localStorage 익명 user_token
│   └── db.ts                  # DB 호출 추상화 (fetchInitial / recordVote / ...)
├── supabase/
│   └── migrations/
│       └── 001_init.sql       # 스키마 + RLS + RPC + 시드
├── docs/
│   └── SUPABASE_SETUP.md
├── tailwind.config.ts
├── .env.example
└── ...
```

## 배포

[Vercel](https://vercel.com)에 GitHub 저장소를 import 하면 자동 배포됩니다.
Supabase 사용 시 Vercel 프로젝트 설정에서 위 두 env를 추가하세요.

## 폰트 노트

- **Black Han Sans**: `next/font/google` 로 자동 최적화 — 별도 설정 불필요.
- **Pretendard**: `app/globals.css` 의 jsDelivr CDN `@import` 로 로딩 (dynamic-subset).
  자체 호스팅이 필요하면 [Pretendard 릴리스](https://github.com/orioncactus/pretendard/releases)에서
  `PretendardVariable.woff2` 를 받아 `public/fonts/` 에 두고 `next/font/local` 로 교체하세요.
