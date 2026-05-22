"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import { type Mood, getRankedSnacks } from "@/lib/data";

type Props = {
  mood: Mood;
};

const CONFETTI = [
  { left: "10%", top: "5%", color: "#FF6B6B", size: 14, start: -15, tx: -20, ty: -10, end: -30 },
  { left: "85%", top: "8%", color: "#FFE066", size: 10, start: 25, tx: 20, ty: -12, end: 45 },
  { left: "15%", top: "90%", color: "#51CF66", size: 12, start: -30, tx: -15, ty: 15, end: -60 },
  { left: "88%", top: "85%", color: "#74C0FC", size: 8, start: 15, tx: 15, ty: 12, end: 35 },
  { left: "50%", top: "-5%", color: "#FFA94D", size: 10, start: 0, tx: 0, ty: -15, end: 0 },
] as const;

export function ResultCard({ mood }: Props) {
  const ranked = getRankedSnacks(mood.id);
  const top = ranked[0];
  const others = ranked.slice(1, 4);
  const [voted, setVoted] = useState<Record<number, boolean>>({});
  const [toast, setToast] = useState<string>("");

  if (!top) return null;

  const flashToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(""), 1800);
  };

  const handleVote = (id: number) => {
    if (voted[id]) {
      flashToast("이미 좋아요 눌렀어요!");
      return;
    }
    setVoted((p) => ({ ...p, [id]: true }));
    flashToast("좋아요! 🎉");
  };

  return (
    <>
      <div className="result-card mb-4">
        {/* Confetti */}
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

        <div className="mb-3 text-center">
          <span
            className="inline-block rounded-full border-2 border-cocoa-600 px-3 py-1 text-[11px] font-extrabold text-cocoa-600"
            style={{ background: mood.color }}
          >
            {mood.emoji} {mood.label}일 때
          </span>
        </div>

        <div className="mb-1.5 text-center">
          <div className="mb-0.5 text-[11px] font-bold text-cocoa-400">
            오늘의 픽 🎯
          </div>
          <div className="font-display text-[38px] leading-none tracking-tighter text-cocoa-600">
            {top.name}
          </div>
        </div>

        <div className="my-5 text-center">
          <div
            className="relative mx-auto flex h-[130px] w-[120px] -rotate-3 animate-wiggle items-center justify-center border-[3px] border-cocoa-600 text-[60px]"
            style={{
              background: top.color,
              borderRadius: "10px 10px 6px 6px",
              boxShadow: `0 6px 0 #3D2914, 0 0 32px ${mood.color}66`,
            }}
          >
            <div className="absolute left-2 top-2 h-[50px] w-[18px] rounded bg-white/40" />
            <span>{top.emoji}</span>
          </div>
        </div>

        <div className="rounded-[10px] border-2 border-dashed border-cocoa-600 bg-cocoa-50 px-3.5 py-2.5 text-center text-xs font-bold text-cocoa-600">
          {top.votes[mood.id]}명의 직장인이 이 상황에 골랐어요 ✨
        </div>
      </div>

      <div className="mb-4">
        <div className="mb-2.5 text-xs font-extrabold tracking-wide text-cocoa-600">
          🥈 다른 인기 간식
        </div>
        {others.map((s, i) => (
          <div
            key={s.id}
            className="chunky-card mb-2 flex items-center gap-2.5 px-3 py-2.5"
          >
            <div
              className="flex h-10 w-9 items-center justify-center rounded border-2 border-cocoa-600 text-lg"
              style={{ background: s.color }}
            >
              {s.emoji}
            </div>
            <div className="flex-1">
              <div className="text-xs font-extrabold text-cocoa-600">
                {i + 2}. {s.name}
              </div>
              <div className="text-[10px] font-bold text-cocoa-400">
                {s.votes[mood.id]}표
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleVote(s.id)}
              className={`rounded-md border-2 border-cocoa-600 px-2.5 py-1 text-[10px] font-extrabold text-cocoa-600 ${
                voted[s.id]
                  ? "bg-neutral-50"
                  : "bg-butter-300 shadow-[0_2px_0_#3D2914]"
              }`}
            >
              {voted[s.id] ? "✓" : "👍"}
            </button>
          </div>
        ))}
      </div>

      <Link
        href="/"
        className="block w-full rounded-xl border-[3px] border-cocoa-600 bg-cocoa-600 px-4 py-3.5 text-center font-display text-lg tracking-tight text-butter-300 shadow-[0_4px_0_#1a0d05]"
      >
        🎰 다시 뽑기
      </Link>

      {toast && (
        <div className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 animate-toast-in whitespace-nowrap rounded-full border-2 border-butter-300 bg-cocoa-600 px-5 py-2.5 text-[13px] font-extrabold text-butter-300 shadow-[0_4px_16px_rgba(0,0,0,0.25)]">
          {toast}
        </div>
      )}
    </>
  );
}
