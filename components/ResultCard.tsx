"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import { type Mood, getRankedSnacks } from "@/lib/data";

type Props = {
  mood: Mood;
};

const CONFETTI = [
  { left: "8%", top: "5%", color: "#FF6B3D", size: 12, start: -15, tx: -18, ty: -8, end: -30 },
  { left: "87%", top: "8%", color: "#FFD43B", size: 10, start: 25, tx: 18, ty: -10, end: 45 },
  { left: "12%", top: "88%", color: "#34D399", size: 10, start: -30, tx: -12, ty: 12, end: -60 },
  { left: "90%", top: "85%", color: "#A78BFA", size: 8, start: 15, tx: 12, ty: 10, end: 35 },
  { left: "50%", top: "-3%", color: "#FFB899", size: 10, start: 0, tx: 0, ty: -12, end: 0 },
] as const;

export function ResultCard({ mood }: Props) {
  const ranked = getRankedSnacks(mood.id);
  const top = ranked[0];
  const others = ranked.slice(1, 4);
  const [voted, setVoted] = useState<Record<number, boolean>>({});
  const [toast, setToast] = useState("");

  if (!top) return null;

  const flashToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(""), 1800);
  };

  const handleVote = (id: number) => {
    if (voted[id]) {
      flashToast("이미 눌렀어요!");
      return;
    }
    setVoted((p) => ({ ...p, [id]: true }));
    flashToast("좋아요! 🎉");
  };

  return (
    <>
      {/* Main result */}
      <div className="relative mb-6 animate-drop-in rounded-3xl bg-white px-6 pb-6 pt-8 shadow-card">
        {CONFETTI.map((c, i) => (
          <div
            key={i}
            className="absolute animate-confetti-pop rounded-sm"
            style={
              {
                left: c.left,
                top: c.top,
                width: c.size,
                height: c.size,
                background: c.color,
                "--confetti-start": `${c.start}deg`,
                "--confetti-tx": `${c.tx}px`,
                "--confetti-ty": `${c.ty}px`,
                "--confetti-end": `${c.end}deg`,
              } as CSSProperties
            }
          />
        ))}

        <div className="mb-6 text-center">
          <span
            className="inline-block rounded-full px-4 py-1.5 text-[12px] font-bold text-white"
            style={{ background: mood.color }}
          >
            {mood.emoji} {mood.label}일 때
          </span>
        </div>

        <div className="text-center">
          <p className="text-xs font-semibold text-ink-400">오늘의 픽 🎯</p>
          <h2 className="mt-1 font-display text-[52px] leading-none tracking-tighter text-ink-800">
            {top.name}
          </h2>
        </div>

        <div className="my-8 flex justify-center">
          <div
            className="flex h-[120px] w-[110px] animate-wiggle items-center justify-center rounded-3xl text-[56px] shadow-lg"
            style={{ background: top.color }}
          >
            {top.emoji}
          </div>
        </div>

        <div className="rounded-2xl bg-peach-50 px-4 py-3.5 text-center">
          <p className="text-sm font-bold text-peach-600">
            {top.votes[mood.id]}명이 추천했어요 ✨
          </p>
        </div>
      </div>

      {/* Other picks */}
      <p className="mb-3 px-1 text-[10px] font-bold uppercase tracking-[2px] text-ink-400">
        다른 인기 간식
      </p>
      <div className="mb-6 flex flex-col gap-2.5">
        {others.map((s, i) => (
          <div
            key={s.id}
            className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3.5 shadow-soft"
          >
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl text-lg"
              style={{ background: s.color }}
            >
              {s.emoji}
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-ink-700">
                {i + 2}위 {s.name}
              </p>
              <p className="text-[11px] text-ink-400">{s.votes[mood.id]}표</p>
            </div>
            <button
              type="button"
              onClick={() => handleVote(s.id)}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                voted[s.id]
                  ? "bg-ink-100 text-ink-400"
                  : "bg-peach-50 text-peach-500 hover:bg-peach-100"
              }`}
            >
              {voted[s.id] ? "✓" : "👍"}
            </button>
          </div>
        ))}
      </div>

      <Link
        href="/"
        className="block rounded-2xl bg-ink-800 py-4 text-center font-display text-xl tracking-tight text-white shadow-card transition hover:bg-ink-700"
      >
        🎰 다시 뽑기
      </Link>

      {toast && (
        <div className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 animate-toast-in whitespace-nowrap rounded-full bg-ink-800 px-5 py-2.5 text-[13px] font-bold text-white shadow-card">
          {toast}
        </div>
      )}
    </>
  );
}
