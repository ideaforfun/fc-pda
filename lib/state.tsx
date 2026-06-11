"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
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
  type Story,
} from "./data";

type VotesMap = Record<number, Record<string, number>>;
type StoriesMap = Record<number, Story[]>;

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
  // SSR/CSR 일치를 위해 첫 렌더는 MOODS[0]로 시작, 마운트 후 랜덤화.
  const [todayMood, setTodayMood] = useState<Mood>(MOODS[0]);
  const [candidates, setCandidates] = useState<Snack[]>(() =>
    SNACKS.filter((s) => s.active).slice(0, 3),
  );
  const [picked, setPicked] = useState<number | null>(null);
  const [liked, setLiked] = useState<Record<number, boolean>>({});
  const [toast, setToast] = useState("");
  const [rankMood, setRankMood] = useState("tired");

  useEffect(() => {
    setTodayMood(randomMood());
    setCandidates(shuffle(SNACKS.filter((s) => s.active)).slice(0, 3));
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

  const castVote = useCallback(
    (sid: number, mid: string, name: string) => {
      setVotes((prev) => ({
        ...prev,
        [sid]: {
          ...(prev[sid] ?? {}),
          [mid]: (prev[sid]?.[mid] ?? 0) + 1,
        },
      }));
      flashToast(`${name}에 투표했어요 🗳️`);
    },
    [flashToast],
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
      setStories((prev) => ({
        ...prev,
        [sid]: [
          { id: Date.now(), text: trimmed, time: "방금 전" },
          ...(prev[sid] ?? []),
        ],
      }));
      flashToast("이야기를 남겼어요 💬");
    },
    [flashToast],
  );

  const addPost = useCallback(
    (cat: string, text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      setPosts((prev) => [
        { id: Date.now(), cat, text: trimmed, likes: 0, time: "방금 전" },
        ...prev,
      ]);
      flashToast("익명으로 올렸어요 🕶️");
    },
    [flashToast],
  );

  const toggleLike = useCallback((id: number) => {
    setLiked((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      setPosts((p) =>
        p.map((q) =>
          q.id === id ? { ...q, likes: q.likes + (prev[id] ? -1 : 1) } : q,
        ),
      );
      return next;
    });
  }, []);

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
