"use client";

import { useMemo, useState } from "react";
import { LOUNGE_CATS, type Post } from "@/lib/data";
import { useTangbisil } from "@/lib/state";

const ALL_CAT = { id: "all", e: "🍪", label: "전체" } as const;
const FILTER_CATS = [ALL_CAT, ...LOUNGE_CATS];

export function Lounge() {
  const { posts, liked, toggleLike, addPost } = useTangbisil();
  const [postText, setPostText] = useState("");
  const [postCat, setPostCat] = useState<string>("daily");
  const [loungeCat, setLoungeCat] = useState<string>("all");

  const { top3, rest } = useMemo(() => {
    const sorted = [...posts].sort((a, b) => b.likes - a.likes);
    const top3 = sorted.slice(0, 3);
    const topIds = new Set(top3.map((p) => p.id));
    const rest = posts.filter((p) => !topIds.has(p.id));
    return { top3, rest };
  }, [posts]);

  const filteredRest =
    loungeCat === "all"
      ? rest
      : rest.filter((p) => p.cat === loungeCat);

  const submit = () => {
    addPost(postCat, postText);
    setPostText("");
  };

  return (
    <div className="pb-28">
      <div className="px-5 pb-4 pt-5">
        <h2 className="m-0 font-display text-[26px] tracking-[-1.2px] text-ink-800">
          탕비실 라운지
        </h2>
        <p className="m-0 mt-1 text-[11.5px] font-semibold text-ink-400">
          가볍게, 익명으로 나누는 회사 이야기 🕶️
        </p>
      </div>

      {/* TOP 3 */}
      <div className="px-4">
        <div className="mb-[11px] px-0.5 text-[15px] font-extrabold tracking-[-0.3px] text-ink-800">
          👑 오늘의 이야기 TOP 3
        </div>
        {top3.map((p, i) => (
          <Top3Card key={p.id} post={p} rank={i} liked={!!liked[p.id]} onLike={toggleLike} />
        ))}
      </div>

      {/* 작성 박스 */}
      <div className="mx-4 mt-5">
        <div className="rounded-card border border-ink-200 bg-white p-3.5 shadow-card">
          <div className="mb-2.5 text-[12px] font-bold text-ink-500">
            🕶️ 익명으로 이야기 남기기
          </div>
          <div className="mb-2.5 flex flex-wrap gap-1.5">
            {LOUNGE_CATS.map((c) => {
              const active = postCat === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setPostCat(c.id)}
                  className={`press min-h-[34px] rounded-full px-3 text-[12px] font-bold transition ${
                    active
                      ? "bg-ink-800 text-white"
                      : "bg-ink-50 text-ink-500"
                  }`}
                >
                  {c.e} {c.label}
                </button>
              );
            })}
          </div>
          <div className="flex gap-2">
            <textarea
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  submit();
                }
              }}
              placeholder="신입 질문, 회사 문화, 꿀팁… 뭐든 가볍게"
              rows={2}
              className="flex-1 resize-none rounded-[13px] border-[1.5px] border-ink-200 bg-warm px-3.5 py-3 text-[14px] leading-[1.55] text-ink-800 outline-none"
            />
            <button
              type="button"
              onClick={submit}
              className="press w-12 self-stretch rounded-[13px] bg-ink-800 text-base font-bold text-white"
              aria-label="라운지 글 올리기"
            >
              ↑
            </button>
          </div>
        </div>
      </div>

      {/* 카테고리 필터 + 리스트 */}
      <div className="px-4 pt-5">
        <div className="flex gap-[7px] overflow-x-auto pb-[11px]">
          {FILTER_CATS.map((c) => {
            const active = loungeCat === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setLoungeCat(c.id)}
                className={`press flex-shrink-0 rounded-full border border-ink-200 px-3.5 text-[12px] font-bold transition ${
                  active ? "border-ink-800 bg-ink-800 text-white" : "bg-white text-ink-500"
                }`}
                style={{ minHeight: 36 }}
              >
                {c.e} {c.label}
              </button>
            );
          })}
        </div>

        {filteredRest.length === 0 && (
          <div className="py-9 text-center">
            <div className="mb-2 text-[30px]">✏️</div>
            <div className="text-[13px] font-semibold text-ink-500">
              이 주제의 첫 이야기를 남겨보세요
            </div>
          </div>
        )}

        {filteredRest.map((p, idx) => (
          <PostCard
            key={p.id}
            post={p}
            liked={!!liked[p.id]}
            onLike={toggleLike}
            isFresh={idx === 0 && p.time === "방금 전"}
          />
        ))}
      </div>
    </div>
  );
}

const MEDALS = ["🥇", "🥈", "🥉"] as const;

function Top3Card({
  post,
  rank,
  liked,
  onLike,
}: {
  post: Post;
  rank: number;
  liked: boolean;
  onLike: (id: number) => void;
}) {
  const cat = LOUNGE_CATS.find((c) => c.id === post.cat);
  const isFirst = rank === 0;
  return (
    <div
      className="mb-[9px] rounded-card bg-white px-4 py-3.5"
      style={{
        border: isFirst ? "1.5px solid #F2A33C4D" : "1px solid #ECECF1",
        boxShadow: isFirst
          ? "0 6px 20px rgba(242,163,60,0.12)"
          : "0 2px 8px rgba(23,25,35,0.04)",
      }}
    >
      <div className="mb-[7px] flex items-center gap-[7px]">
        <span className="text-[15px]">{MEDALS[rank]}</span>
        <span className="text-[11px] font-semibold text-ink-500">
          {cat?.e} {cat?.label}
        </span>
        <span className="ml-auto text-[11px] font-semibold text-ink-300">
          {post.time}
        </span>
      </div>
      <p className="m-0 mb-2.5 text-[13.5px] leading-[1.65] text-[#3A3B44]">
        {post.text}
      </p>
      <button
        type="button"
        onClick={() => onLike(post.id)}
        className="press inline-flex min-h-9 items-center rounded-full border border-ink-200 px-3.5 text-[12px] font-bold transition"
        style={{
          background: liked ? "#FFF0F0" : "#FFFFFF",
          color: liked ? "#F25C5C" : "#8A8B94",
        }}
      >
        {liked ? "❤️" : "🤍"} {post.likes}
      </button>
    </div>
  );
}

function PostCard({
  post,
  liked,
  onLike,
  isFresh,
}: {
  post: Post;
  liked: boolean;
  onLike: (id: number) => void;
  isFresh: boolean;
}) {
  const cat = LOUNGE_CATS.find((c) => c.id === post.cat);
  return (
    <div
      className={`mb-[9px] rounded-card border border-ink-200 bg-white px-[15px] py-[13px] shadow-card ${
        isFresh ? "animate-fade-in" : ""
      }`}
    >
      <div className="mb-1.5 flex items-center gap-[7px]">
        <div className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-ink-50 text-xs">
          🕶️
        </div>
        <span className="text-[11px] font-semibold text-ink-500">
          {cat?.e} {cat?.label}
        </span>
        <span className="ml-auto text-[11px] font-semibold text-ink-300">
          {post.time}
        </span>
      </div>
      <p className="m-0 mb-[9px] text-[13.5px] leading-[1.62] text-[#3A3B44]">
        {post.text}
      </p>
      <button
        type="button"
        onClick={() => onLike(post.id)}
        className="press inline-flex min-h-9 items-center rounded-full border border-ink-200 px-3.5 text-[12px] font-bold transition"
        style={{
          background: liked ? "#FFF0F0" : "#FFFFFF",
          color: liked ? "#F25C5C" : "#8A8B94",
        }}
      >
        {liked ? "❤️" : "🤍"} {post.likes}
      </button>
    </div>
  );
}
