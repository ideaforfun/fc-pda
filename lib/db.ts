import { supabase } from "./supabase";
import type { Post, Story } from "./data";

export type VotesMap = Record<number, Record<string, number>>;
export type StoriesMap = Record<number, Story[]>;

function currentMonth(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

type MonthlyVoteRow = { snack_id: number; mood_id: string; count: number };
type StoryRow = { id: number; snack_id: number; content: string; created_at: string };
type PostRow = {
  id: number;
  category: string;
  content: string;
  likes: number;
  created_at: string;
  is_deleted: boolean;
};
type LikeRow = { post_id: number };

function timeAgo(iso: string): string {
  const t = new Date(iso).getTime();
  const sec = Math.max(1, Math.floor((Date.now() - t) / 1000));
  if (sec < 60) return "방금 전";
  if (sec < 3600) return `${Math.floor(sec / 60)}분 전`;
  if (sec < 86400) return `${Math.floor(sec / 3600)}시간 전`;
  if (sec < 86400 * 2) return "어제";
  return `${Math.floor(sec / 86400)}일 전`;
}

export type InitialData = {
  votes: VotesMap;
  stories: StoriesMap;
  posts: Post[];
  likedSet: Set<number>;
};

/**
 * env 없으면 null. Provider는 이때 INIT_* 더미를 그대로 유지합니다.
 */
export async function fetchInitial(userToken: string): Promise<InitialData | null> {
  if (!supabase) return null;

  const month = currentMonth();
  const [votesRes, storiesRes, postsRes, likesRes] = await Promise.all([
    supabase
      .from("monthly_votes")
      .select("snack_id, mood_id, count")
      .eq("month", month),
    supabase
      .from("snack_stories")
      .select("id, snack_id, content, created_at")
      .order("created_at", { ascending: false }),
    supabase
      .from("posts")
      .select("id, category, content, likes, created_at, is_deleted")
      .eq("is_deleted", false)
      .order("created_at", { ascending: false }),
    userToken
      ? supabase
          .from("post_likes")
          .select("post_id")
          .eq("user_token", userToken)
      : Promise.resolve({ data: [] as LikeRow[], error: null }),
  ]);

  if (votesRes.error || storiesRes.error || postsRes.error || likesRes.error) {
    const err =
      votesRes.error?.message ??
      storiesRes.error?.message ??
      postsRes.error?.message ??
      likesRes.error?.message;
    throw new Error(`Supabase fetch 실패: ${err}`);
  }

  const votes: VotesMap = {};
  for (const r of (votesRes.data as MonthlyVoteRow[]) ?? []) {
    if (!votes[r.snack_id]) votes[r.snack_id] = {};
    votes[r.snack_id][r.mood_id] = r.count;
  }

  const stories: StoriesMap = {};
  for (const r of (storiesRes.data as StoryRow[]) ?? []) {
    if (!stories[r.snack_id]) stories[r.snack_id] = [];
    stories[r.snack_id].push({
      id: r.id,
      text: r.content,
      time: timeAgo(r.created_at),
    });
  }

  const posts: Post[] = ((postsRes.data as PostRow[]) ?? []).map((r) => ({
    id: r.id,
    cat: r.category,
    text: r.content,
    likes: r.likes,
    time: timeAgo(r.created_at),
  }));

  const likedSet = new Set<number>(
    ((likesRes.data as LikeRow[]) ?? []).map((r) => r.post_id),
  );

  return { votes, stories, posts, likedSet };
}

/**
 * RPC 함수 increment_vote 호출.
 * 반환: true=새 표 반영 / false=이번 달 같은 (snack, mood)에 이미 투표함 / null=env 없음
 */
export async function recordVote(
  snackId: number,
  moodId: string,
  userToken: string,
): Promise<boolean | null> {
  if (!supabase) return null;
  const { data, error } = await supabase.rpc("increment_vote", {
    p_snack_id: snackId,
    p_mood_id: moodId,
    p_user_token: userToken,
  });
  if (error) throw new Error(error.message);
  return data === true;
}

export async function recordStory(
  snackId: number,
  content: string,
): Promise<Story | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("snack_stories")
    .insert({ snack_id: snackId, content })
    .select("id, created_at")
    .single();
  if (error) throw new Error(error.message);
  return { id: data.id, text: content, time: timeAgo(data.created_at) };
}

export async function recordPost(
  category: string,
  content: string,
): Promise<Post | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("posts")
    .insert({ category, content })
    .select("id, created_at")
    .single();
  if (error) throw new Error(error.message);
  return {
    id: data.id,
    cat: category,
    text: content,
    likes: 0,
    time: timeAgo(data.created_at),
  };
}

/**
 * RPC toggle_post_like. 반환: 새 likes count / null=env 없음
 */
export async function recordLikeToggle(
  postId: number,
  userToken: string,
): Promise<number | null> {
  if (!supabase) return null;
  const { data, error } = await supabase.rpc("toggle_post_like", {
    p_post_id: postId,
    p_user_token: userToken,
  });
  if (error) throw new Error(error.message);
  return data as number;
}
