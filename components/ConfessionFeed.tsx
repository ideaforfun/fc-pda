"use client";

import { useState } from "react";
import {
  CONFESSIONS,
  MOODS,
  getMoodById,
  type Confession,
} from "@/lib/data";

export function ConfessionFeed() {
  const [confessions, setConfessions] = useState<Confession[]>(CONFESSIONS);
  const [postText, setPostText] = useState("");
  const [postMood, setPostMood] = useState<string>("friday");
  const [liked, setLiked] = useState<Record<number, boolean>>({});
  const [toast, setToast] = useState("");

  const flashToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(""), 1800);
  };

  const handlePost = () => {
    const trimmed = postText.trim();
    if (!trimmed) return;
    setConfessions((prev) => [
      {
        id: Date.now(),
        mood: postMood,
        text: trimmed,
        likes: 0,
        time: "방금 전",
      },
      ...prev,
    ]);
    setPostText("");
    flashToast("올렸어요! 🕶️");
  };

  return (
    <>
      {/* Post box */}
      <div className="mb-5 rounded-2xl bg-white p-4 shadow-soft">
        <div className="mb-3 flex flex-wrap gap-1.5">
          {MOODS.map((m) => {
            const active = postMood === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setPostMood(m.id)}
                className={`rounded-full px-3 py-1.5 text-[11px] font-bold transition ${
                  active
                    ? "text-white"
                    : "bg-ink-50 text-ink-500 hover:bg-ink-100"
                }`}
                style={active ? { background: m.color } : undefined}
              >
                {m.emoji} {m.label}
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
                handlePost();
              }
            }}
            placeholder="탕이한테만 살짝 말해줘..."
            rows={2}
            className="flex-1 resize-none rounded-xl bg-ink-50 px-3.5 py-2.5 text-[13px] font-medium text-ink-700 outline-none transition placeholder:text-ink-300 focus:bg-white focus:ring-2 focus:ring-peach-200"
          />
          <button
            type="button"
            onClick={handlePost}
            className="self-stretch rounded-xl bg-peach-500 px-4 text-lg font-bold text-white transition hover:bg-peach-600"
            aria-label="고백 올리기"
          >
            ↑
          </button>
        </div>
      </div>

      {/* List */}
      <div className="flex flex-col gap-3">
        {confessions.map((c, idx) => {
          const m = getMoodById(c.mood);
          const isLiked = !!liked[c.id];
          const isFresh = idx === 0 && c.time === "방금 전";
          return (
            <div
              key={c.id}
              className={`rounded-2xl bg-white p-4 shadow-soft ${
                isFresh ? "animate-pop-in" : ""
              }`}
            >
              <div className="mb-2.5 flex items-center gap-2">
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-full text-sm"
                  style={{ background: m?.color }}
                >
                  {m?.emoji}
                </span>
                <div>
                  <p className="text-[12px] font-bold text-ink-700">
                    {m?.label}일 때
                  </p>
                  <p className="text-[10px] text-ink-400">{c.time}</p>
                </div>
              </div>
              <p className="mb-3 text-[14px] font-medium leading-relaxed text-ink-700">
                {c.text}
              </p>
              <button
                type="button"
                onClick={() =>
                  setLiked((p) => ({ ...p, [c.id]: !p[c.id] }))
                }
                className={`rounded-full px-3 py-1 text-[12px] font-bold transition ${
                  isLiked
                    ? "bg-peach-50 text-peach-500"
                    : "bg-ink-50 text-ink-400 hover:bg-ink-100"
                }`}
              >
                {isLiked ? "❤️" : "🤍"} {c.likes + (isLiked ? 1 : 0)}
              </button>
            </div>
          );
        })}
      </div>

      {toast && (
        <div className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 animate-toast-in whitespace-nowrap rounded-full bg-ink-800 px-5 py-2.5 text-[13px] font-bold text-white shadow-card">
          {toast}
        </div>
      )}
    </>
  );
}
