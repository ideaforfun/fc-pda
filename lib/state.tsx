"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { getUserToken } from "./auth";
import {
  fetchInitial,
  recordLikeToggle,
  recordPost,
  recordStory,
  recordVote,
  type StoriesMap,
  type VotesMap,
} from "./db";
import {
  INIT_POSTS,
  INIT_STORIES,
  INIT_VOTES,
  MOODS,
  SNACKS,
  randomMood,
  shuffle,
  type Mood,
  type Post,
  type Snack,
} from "./data";
import { supabaseEnabled } from "./supabase";

type State = {
  votes: VotesMap;
  stories: StoriesMap;
  posts: Post[];
  todayMood: Mood;
  candidates: Snack[];
  picked: number | null;
  liked: Record<number, boolean>;
  toast: string;
  rankMood: string;
  /** Supabase 모드 활성 여부 — UI에서 상태 표시 등에 활용 가능 */
  remoteMode: boolean;

  getVotes: (snackId: number, moodId: string) => number;
  storyCount: (snackId: number) => number;
  rankedFor: (moodId: string) => Snack[];

  castVote: (snackId: number, moodId: string, name: string) => void;
  rerollMood: () => void;
  refreshCandidates: () => void;
  pickCandidate: (snack: Snack) => void;
  addStory: (snackId: number, text: string) => void;
  addPost: (cat: string, text: string) => void;
  toggleLike: (postId: number) => void;
  setRankMood: (id: string) => void;
  flashToast: (msg: string) => void;
};

const Ctx = createContext<State | null>(null);

export function TangbisilProvider({ children }: { children: ReactNode }) {
  const [votes, setVotes] = useState<VotesMap>(INIT_VOTES);
  const [stories, setStories] = useState<StoriesMap>(INIT_STORIES);
  const [posts, setPosts] = useState<Post[]>(INIT_POSTS);
  const [todayMood, setTodayMood] = useState<Mood>(MOODS[0]);
  const [candidates, setCandidates] = useState<Snack[]>(() =>
    SNACKS.filter((s) => s.active).slice(0, 3),
  );
  const [picked, setPicked] = useState<number | null>(null);
  const [liked, setLiked] = useState<Record<number, boolean>>({});
  const [toast, setToast] = useState("");
  const [rankMood, setRankMood] = useState("tired");

  // SSR safe — 마운트 후 채움
  const userTokenRef = useRef("");

  useEffect(() => {
    // 1) 마운트 후 무드/후보 랜덤화 (SSR 일치)
    setTodayMood(randomMood());
    setCandidates(shuffle(SNACKS.filter((s) => s.active)).slice(0, 3));

    // 2) user_token 확보
    userTokenRef.current = getUserToken();

    // 3) Supabase 모드면 초기 데이터 페치 — INIT_* 더미를 실DB로 교체
    if (!supabaseEnabled) return;
    let alive = true;
    fetchInitial(userTokenRef.current)
      .then((data) => {
        if (!alive || !data) return;
        setVotes(data.votes);
        setStories(data.stories);
        setPosts(data.posts);
        const likedMap: Record<number, boolean> = {};
        data.likedSet.forEach((id) => {
          likedMap[id] = true;
        });
        setLiked(likedMap);
      })
      .catch((err) => {
        console.error("[tangbisil] Supabase 초기 페치 실패:", err);
        flashToast("서버 연결에 실패해 임시 데이터로 표시 중이에요");
      });
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getVotes = useCallback(
    (sid: number, mid: string) => votes[sid]?.[mid] ?? 0,
    [votes],
  );

  const storyCount = useCallback(
    (sid: number) => (stories[sid] ?? []).length,
    [stories],
  );

  const rankedFor = useCallback(
    (mid: string) =>
      [...SNACKS.filter((s) => s.active)].sort(
        (a, b) => (votes[b.id]?.[mid] ?? 0) - (votes[a.id]?.[mid] ?? 0),
      ),
    [votes],
  );

  const flashToast = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(""), 1900);
  }, []);

  const bumpLocalVote = useCallback((sid: number, mid: string, delta: number) => {
    setVotes((prev) => ({
      ...prev,
      [sid]: {
        ...(prev[sid] ?? {}),
        [mid]: Math.max(0, (prev[sid]?.[mid] ?? 0) + delta),
      },
    }));
  }, []);

  const castVote = useCallback(
    (sid: number, mid: string, name: string) => {
      // 낙관적 업데이트
      bumpLocalVote(sid, mid, 1);
      flashToast(`${name}에 투표했어요 🗳️`);

      if (!supabaseEnabled) return;
      void recordVote(sid, mid, userTokenRef.current)
        .then((accepted) => {
          if (accepted === false) {
            // 이번 달 같은 (snack, mood) 중복 — 롤백
            bumpLocalVote(sid, mid, -1);
            flashToast("이번 달엔 이미 같은 조합으로 투표했어요");
          }
        })
        .catch((err) => {
          console.error("[tangbisil] recordVote 실패:", err);
          bumpLocalVote(sid, mid, -1);
          flashToast("투표 저장에 실패했어요");
        });
    },
    [bumpLocalVote, flashToast],
  );

  const rerollMood = useCallback(() => {
    setTodayMood((prev) => {
      let next = randomMood();
      while (next.id === prev.id) next = randomMood();
      return next;
    });
    setPicked(null);
    setCandidates(shuffle(SNACKS.filter((s) => s.active)).slice(0, 3));
  }, []);

  const refreshCandidates = useCallback(() => {
    setCandidates((prev) => {
      const pool = SNACKS.filter(
        (s) => s.active && !prev.some((c) => c.id === s.id),
      );
      return shuffle(
        pool.length >= 3 ? pool : SNACKS.filter((s) => s.active),
      ).slice(0, 3);
    });
    setPicked(null);
  }, []);

  const pickCandidate = useCallback(
    (s: Snack) => {
      if (picked) return;
      setPicked(s.id);
      castVote(s.id, todayMood.id, s.name);
    },
    [picked, todayMood.id, castVote],
  );

  const addStory = useCallback(
    (sid: number, text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;

      // 낙관적 — 임시 id, 마운트 후 서버 id로 교체
      const tempId = -Date.now();
      const tempStory = { id: tempId, text: trimmed, time: "방금 전" };
      setStories((prev) => ({
        ...prev,
        [sid]: [tempStory, ...(prev[sid] ?? [])],
      }));
      flashToast("이야기를 남겼어요 💬");

      if (!supabaseEnabled) return;
      void recordStory(sid, trimmed)
        .then((real) => {
          if (!real) return;
          setStories((prev) => ({
            ...prev,
            [sid]: (prev[sid] ?? []).map((s) =>
              s.id === tempId ? { ...real, time: "방금 전" } : s,
            ),
          }));
        })
        .catch((err) => {
          console.error("[tangbisil] recordStory 실패:", err);
          setStories((prev) => ({
            ...prev,
            [sid]: (prev[sid] ?? []).filter((s) => s.id !== tempId),
          }));
          flashToast("이야기 저장에 실패했어요");
        });
    },
    [flashToast],
  );

  const addPost = useCallback(
    (cat: string, text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;

      const tempId = -Date.now();
      const tempPost: Post = {
        id: tempId,
        cat,
        text: trimmed,
        likes: 0,
        time: "방금 전",
      };
      setPosts((prev) => [tempPost, ...prev]);
      flashToast("익명으로 올렸어요 🕶️");

      if (!supabaseEnabled) return;
      void recordPost(cat, trimmed)
        .then((real) => {
          if (!real) return;
          setPosts((prev) =>
            prev.map((p) =>
              p.id === tempId ? { ...real, time: "방금 전" } : p,
            ),
          );
        })
        .catch((err) => {
          console.error("[tangbisil] recordPost 실패:", err);
          setPosts((prev) => prev.filter((p) => p.id !== tempId));
          flashToast("글 저장에 실패했어요");
        });
    },
    [flashToast],
  );

  const toggleLike = useCallback(
    (id: number) => {
      // 임시 글(id<0)은 서버 저장 전 — 낙관 토글만
      const isTemp = id < 0;
      let wasLiked = false;
      setLiked((prev) => {
        wasLiked = !!prev[id];
        return { ...prev, [id]: !prev[id] };
      });
      setPosts((prev) =>
        prev.map((p) =>
          p.id === id
            ? { ...p, likes: Math.max(0, p.likes + (wasLiked ? -1 : 1)) }
            : p,
        ),
      );

      if (!supabaseEnabled || isTemp) return;
      void recordLikeToggle(id, userTokenRef.current)
        .then((newLikes) => {
          if (newLikes === null) return;
          setPosts((prev) =>
            prev.map((p) => (p.id === id ? { ...p, likes: newLikes } : p)),
          );
        })
        .catch((err) => {
          console.error("[tangbisil] recordLikeToggle 실패:", err);
          // 롤백
          setLiked((prev) => ({ ...prev, [id]: wasLiked }));
          setPosts((prev) =>
            prev.map((p) =>
              p.id === id
                ? { ...p, likes: Math.max(0, p.likes + (wasLiked ? 1 : -1)) }
                : p,
            ),
          );
          flashToast("좋아요 저장에 실패했어요");
        });
    },
    [flashToast],
  );

  return (
    <Ctx.Provider
      value={{
        votes,
        stories,
        posts,
        todayMood,
        candidates,
        picked,
        liked,
        toast,
        rankMood,
        remoteMode: supabaseEnabled,
        getVotes,
        storyCount,
        rankedFor,
        castVote,
        rerollMood,
        refreshCandidates,
        pickCandidate,
        addStory,
        addPost,
        toggleLike,
        setRankMood,
        flashToast,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useTangbisil() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useTangbisil must be inside TangbisilProvider");
  return ctx;
}
