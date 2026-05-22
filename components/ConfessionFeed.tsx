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
      { id: Date.now(), mood: postMood, text: trimmed, likes: 0, time: "방금 전" },
      ...prev,
    ]);
    setPostText("");
    flashToast("올렸어요! 🕶️");
  };

  return (
    <>
      <div className="chunky-card mb-4 p-3.5">
        <div className="mb-2 text-[10px] font-extrabold tracking-wider text-cocoa-400">
          🕶️ 익명 보장
        </div>
        <div className="mb-2.5 flex flex-wrap gap-1.5">
          {MOODS.map((m) => {
            const active = postMood === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setPostMood(m.id)}
                className={`rounded-full border-2 px-2.5 py-1 text-[11px] font-extrabold text-cocoa-600 ${
                  active ? "border-cocoa-600" : "border-neutral-200 bg-white"
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
            className="flex-1 resize-none rounded-lg border-2 border-cocoa-600 bg-cocoa-50 px-3 py-2.5 text-[13px] font-semibold leading-relaxed text-cocoa-600 outline-none placeholder:font-medium placeholder:text-neutral-400"
          />
          <button
            type="button"
            onClick={handlePost}
            className="self-stretch rounded-lg border-2 border-cocoa-600 bg-butter-300 px-4 font-display text-lg text-cocoa-600 shadow-[0_3px_0_#3D2914]"
            aria-label="고백 올리기"
          >
            ↑
          </button>
        </div>
      </div>

      {confessions.map((c, idx) => {
        const m = getMoodById(c.mood);
        const isLiked = !!liked[c.id];
        const isFresh = idx === 0 && c.time === "방금 전";
        return (
          <div
            key={c.id}
            className={`chunky-card mb-2.5 p-3.5 ${isFresh ? "animate-pop-in" : ""}`}
          >
            <div className="mb-2 flex items-center gap-1.5">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-cocoa-600 text-base"
                style={{ background: m?.color }}
              >
                {m?.emoji}
              </div>
              <div>
                <div className="text-[11px] font-extrabold text-cocoa-600">
                  {m?.label}일 때
                </div>
                <div className="text-[9px] font-bold text-neutral-400">{c.time}</div>
              </div>
            </div>
            <p className="mb-2.5 text-[13px] font-semibold leading-relaxed text-cocoa-600">
              {c.text}
            </p>
            <button
              type="button"
              onClick={() =>
                setLiked((prev) => ({ ...prev, [c.id]: !prev[c.id] }))
              }
              className={`rounded-full border-2 border-cocoa-600 px-2.5 py-1 text-[11px] font-extrabold text-cocoa-600 ${
                isLiked ? "bg-butter-300" : "bg-transparent"
              }`}
            >
              {isLiked ? "❤️" : "🤍"} {c.likes + (isLiked ? 1 : 0)}
            </button>
          </div>
        );
      })}

      {toast && (
        <div className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 animate-toast-in whitespace-nowrap rounded-full border-2 border-butter-300 bg-cocoa-600 px-5 py-2.5 text-[13px] font-extrabold text-butter-300 shadow-[0_4px_16px_rgba(0,0,0,0.25)]">
          {toast}
        </div>
      )}
    </>
  );
}
