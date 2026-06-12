# Supabase 셋업 가이드

> 처음이라도 10분 안에 끝납니다. Supabase는 Postgres + 인증 + 스토리지를 묶어 제공하는 BaaS로, 무료 플랜이 있어 개인 프로젝트에 적합합니다.

## 1. 프로젝트 만들기

1. https://supabase.com 접속 → **Start your project** → GitHub로 로그인
2. **New project** 클릭
   - **Name**: `tangbisil` (자유)
   - **Database Password**: 안전한 비번 (1Password 등에 저장)
   - **Region**: `Northeast Asia (Seoul)`
   - **Pricing Plan**: Free
3. **Create new project** → 2분 정도 대기

## 2. 스키마 적용

1. 좌측 사이드바 → **SQL Editor** → **New query**
2. 이 레포의 `supabase/migrations/001_init.sql` 내용을 통째로 복사해 붙여넣기
3. 우측 하단 **Run** 클릭
4. 하단 로그에 `Success. No rows returned` 가 뜨면 성공
   - 모든 테이블 (snacks / monthly_votes / vote_logs / snack_stories / posts / post_likes / banners)
   - RPC 함수 (`increment_vote`, `toggle_post_like`)
   - RLS 정책
   - 시드 데이터 (간식 10개 + 기본 배너 1건)

## 3. API 키 가져오기

1. 좌측 사이드바 → **Project Settings** (톱니바퀴) → **API**
2. 다음 2개를 복사:
   - **Project URL** (`https://xxxxx.supabase.co`)
   - **Project API keys → anon public** (`eyJ...`로 시작하는 긴 문자열)

## 4. 로컬 환경변수 설정

레포 루트에 `.env.local` 파일을 만들고 (`.env.example` 참고):

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

저장한 다음 dev 서버를 재시작:

```bash
npm run dev
```

## 5. 동작 확인

브라우저에서 `http://localhost:3000` 접속.

| 기능 | 확인 방법 |
| --- | --- |
| 초기 페치 | Network 탭에서 `monthly_votes`, `snack_stories`, `posts` GET 요청 200 확인 |
| 투표 | 홈 카드의 후보 PICK → Network 탭에서 `rpc/increment_vote` POST → response `true` |
| 같은 달 중복 투표 | 다시 PICK 시 토스트 "이번 달엔 이미 같은 조합으로 투표했어요" |
| 이야기 작성 | `/snack/1` 에서 작성 → Network 탭 `snack_stories` POST → 새 row 반환 |
| 라운지 글 | `/lounge` 에서 작성 → Network 탭 `posts` POST |
| 좋아요 | 라운지 카드 ❤️ → `rpc/toggle_post_like` POST → 새 count 반환 |
| 새로고침 후 유지 | 새로 추가한 글/좋아요가 그대로 살아있음 (in-memory 모드와의 차이) |

## 6. Vercel 배포 시

Vercel 프로젝트 설정 → **Environment Variables** 에 동일 키 2개 추가:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Production / Preview / Development 모두 체크.

## 트러블슈팅

| 증상 | 원인 / 해결 |
| --- | --- |
| 화면은 뜨는데 더미 데이터만 보임 | `.env.local` 적용 후 dev 서버 재시작 안 함 → `Ctrl+C` 후 `npm run dev` |
| 콘솔에 `permission denied for table ...` | RLS 정책 누락 → `001_init.sql` 끝부분 `create policy ...` 다시 실행 |
| `increment_vote does not exist` | RPC 함수 미생성 → 마이그레이션 SQL 전체 재실행 (`if not exists` 라 안전) |
| 투표가 항상 false 반환 | user_token 변경 안 됨 → 브라우저 시크릿 모드로 새 토큰 발급 후 시도 |

## 어드민 등 다음 단계

브리프 §5 작업 3번 (관리자 페이지) 에서 service role key로 간식/배너 CRUD 와 게시글 삭제 추가합니다.
