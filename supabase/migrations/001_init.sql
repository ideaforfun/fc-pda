-- 탕비실 초기 스키마 (PROJECT_BRIEF §3)
-- 실행 방법: supabase SQL Editor에 통째로 붙여넣고 Run.

-- ─────────────────────────────────────────────────────────────
-- 1. 테이블
-- ─────────────────────────────────────────────────────────────

create table if not exists snacks (
  id bigserial primary key,
  name text not null,
  price int not null default 0,
  kcal int not null default 0,
  image_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- 월별 누적 (월 키마다 새 row → 자동 초기화 효과 + 히스토리 보존)
create table if not exists monthly_votes (
  id bigserial primary key,
  month text not null,                                -- 'YYYY-MM'
  snack_id bigint not null references snacks(id) on delete cascade,
  mood_id text not null,
  count int not null default 0,
  unique (month, snack_id, mood_id)
);
create index if not exists monthly_votes_rank_idx
  on monthly_votes (month, mood_id, count desc);

-- 중복 방지용 원시 로그
create table if not exists vote_logs (
  id bigserial primary key,
  snack_id bigint not null references snacks(id) on delete cascade,
  mood_id text not null,
  user_token text not null,
  voted_at timestamptz not null default now()
);
create index if not exists vote_logs_user_idx
  on vote_logs (user_token, voted_at desc);

create table if not exists snack_stories (
  id bigserial primary key,
  snack_id bigint not null references snacks(id) on delete cascade,
  content text not null,
  created_at timestamptz not null default now()
);
create index if not exists snack_stories_snack_idx
  on snack_stories (snack_id, created_at desc);

create table if not exists posts (
  id bigserial primary key,
  category text not null,
  content text not null,
  likes int not null default 0,
  created_at timestamptz not null default now(),
  is_deleted boolean not null default false
);
create index if not exists posts_feed_idx
  on posts (is_deleted, created_at desc);

create table if not exists post_likes (
  post_id bigint not null references posts(id) on delete cascade,
  user_token text not null,
  liked_at timestamptz not null default now(),
  primary key (post_id, user_token)
);

create table if not exists banners (
  id bigserial primary key,
  title text not null,
  body text,
  emoji text,
  image_url text,
  link_url text,
  tag text,
  is_active boolean not null default false,
  created_at timestamptz not null default now()
);
-- is_active = true 인 row는 1건만
create unique index if not exists banners_single_active
  on banners (is_active) where is_active = true;

-- ─────────────────────────────────────────────────────────────
-- 2. RPC 함수 (트랜잭션이 필요한 mutation은 RPC로 묶음)
-- ─────────────────────────────────────────────────────────────

-- 투표 1회 반영. 같은 user_token이 같은 (snack, mood)에 이미 이번 달 투표했으면 false.
create or replace function increment_vote(
  p_snack_id bigint,
  p_mood_id text,
  p_user_token text
) returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_month text := to_char(now(), 'YYYY-MM');
begin
  if exists (
    select 1 from vote_logs
    where snack_id = p_snack_id
      and mood_id = p_mood_id
      and user_token = p_user_token
      and to_char(voted_at, 'YYYY-MM') = v_month
  ) then
    return false;
  end if;

  insert into vote_logs (snack_id, mood_id, user_token)
  values (p_snack_id, p_mood_id, p_user_token);

  insert into monthly_votes (month, snack_id, mood_id, count)
  values (v_month, p_snack_id, p_mood_id, 1)
  on conflict (month, snack_id, mood_id)
    do update set count = monthly_votes.count + 1;

  return true;
end;
$$;

grant execute on function increment_vote(bigint, text, text) to anon, authenticated;

-- 좋아요 토글. 반환: 토글 후 likes count.
create or replace function toggle_post_like(
  p_post_id bigint,
  p_user_token text
) returns int
language plpgsql
security definer
set search_path = public
as $$
declare
  v_was_liked boolean;
  v_likes int;
begin
  select exists (
    select 1 from post_likes
    where post_id = p_post_id and user_token = p_user_token
  ) into v_was_liked;

  if v_was_liked then
    delete from post_likes
    where post_id = p_post_id and user_token = p_user_token;
    update posts set likes = greatest(0, likes - 1)
    where id = p_post_id
    returning likes into v_likes;
  else
    insert into post_likes (post_id, user_token) values (p_post_id, p_user_token);
    update posts set likes = likes + 1
    where id = p_post_id
    returning likes into v_likes;
  end if;

  return v_likes;
end;
$$;

grant execute on function toggle_post_like(bigint, text) to anon, authenticated;

-- ─────────────────────────────────────────────────────────────
-- 3. RLS — 익명 anon key로 접근. 어뷰징은 user_token + RPC 안 dedup으로 1차 방어.
-- ─────────────────────────────────────────────────────────────

alter table snacks         enable row level security;
alter table monthly_votes  enable row level security;
alter table vote_logs      enable row level security;
alter table snack_stories  enable row level security;
alter table posts          enable row level security;
alter table post_likes     enable row level security;
alter table banners        enable row level security;

-- 읽기는 전부 공개
create policy "snacks_read"        on snacks        for select using (true);
create policy "monthly_votes_read" on monthly_votes for select using (true);
create policy "vote_logs_read"     on vote_logs     for select using (true);
create policy "snack_stories_read" on snack_stories for select using (true);
create policy "posts_read"         on posts         for select using (is_deleted = false);
create policy "post_likes_read"    on post_likes    for select using (true);
create policy "banners_read"       on banners       for select using (true);

-- 익명 쓰기 (이야기/포스트만 클라이언트 직접 INSERT 허용. 투표/좋아요는 RPC 경유.)
create policy "snack_stories_insert" on snack_stories for insert with check (true);
create policy "posts_insert"         on posts         for insert with check (true);

-- snacks / banners 는 어드민(추후 service role)만 → 정책 미생성 = 차단

-- ─────────────────────────────────────────────────────────────
-- 4. 시드 — 브리프 SNACKS 10개 + 기본 배너 1건
-- ─────────────────────────────────────────────────────────────

insert into snacks (id, name, price, kcal, image_url, is_active) values
  (1,  '허니버터칩',  1800, 300, 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=300&h=300&fit=crop', true),
  (2,  '몽쉘',        2800, 340, 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=300&fit=crop', true),
  (3,  '꼬깔콘',      1400, 290, 'https://images.unsplash.com/photo-1600478383064-3c0b84bd1afd?w=300&h=300&fit=crop', true),
  (4,  '빠다코코낫',  1500, 220, 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&h=300&fit=crop', true),
  (5,  '오예스',      2400, 360, 'https://images.unsplash.com/photo-1606890658317-7d14490b76fd?w=300&h=300&fit=crop', true),
  (6,  '죠리퐁',      1200, 250, 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=300&h=300&fit=crop', true),
  (7,  '아몬드 믹스', 2200, 180, 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=300&h=300&fit=crop', true),
  (8,  '비스킷',      1600, 200, 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&h=300&fit=crop', true),
  (9,  '초코바',      1300, 280, 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=300&h=300&fit=crop', true),
  (10, '양갱',        1100, 160, 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=300&h=300&fit=crop', true)
on conflict (id) do nothing;

-- snacks의 시퀀스를 10 이후로 정렬
select setval(pg_get_serial_sequence('snacks', 'id'), greatest((select max(id) from snacks), 1));

insert into banners (title, body, emoji, tag, is_active) values
  ('오늘 기분, 간식이 알아요',
   '기분 따라 뽑고 · 투표하고 · 우리 회사 간식 랭킹 완성!',
   '🍪', '탕비실 소개', false)
on conflict do nothing;
