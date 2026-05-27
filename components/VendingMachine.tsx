"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MOODS, SNACKS, getRankedSnacks } from "@/lib/data";

export function VendingMachine() {
  const router = useRouter();
  const [moodId, setMoodId] = useState<string>("tired");
  const [pulling, setPulling] = useState(false);

  const ranked = getRankedSnacks(moodId);
  const topId = ranked[0]?.id;

  const handleDispense = () => {
    if (pulling) return;
    setPulling(true);
    window.setTimeout(() => {
      router.push(`/result?mood=${moodId}`);
    }, 800);
  };

  return (
    <div className="px-5">
      {/* Snack display */}
      <div className="rounded-3xl bg-white p-5 shadow-card">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-[10px] font-bold uppercase tracking-[2px] text-ink-400">
            today&apos;s snacks
          </p>
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-mint-400" />
            <span className="text-[10px] font-bold text-mint-400">LIVE</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          {SNACKS.slice(0, 3).map((snack) => {
            const isTop = topId === snack.id;
            return (
              <SnackSlot
                key={snack.id}
                emoji={snack.emoji}
                name={snack.name}
                isTop={isTop}
                isPulling={pulling && isTop}
              />
            );
          })}
        </div>
        <div className="mt-2.5 grid grid-cols-2 gap-2.5">
          {SNACKS.slice(3).map((snack) => {
            const isTop = topId === snack.id;
            return (
              <SnackSlot
                key={snack.id}
                emoji={snack.emoji}
                name={snack.name}
                isTop={isTop}
                isPulling={pulling && isTop}
              />
            );
          })}
        </div>
      </div>

      {/* Mood selection */}
      <div className="mt-4 rounded-3xl bg-white p-5 shadow-card">
        <p className="mb-3 text-sm font-bold text-ink-700">오늘 기분은?</p>
        <div className="flex flex-wrap gap-2">
          {MOODS.map((m) => {
            const active = moodId === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setMoodId(m.id)}
                className={`rounded-full px-3.5 py-2 text-[13px] font-bold transition-all ${
                  active
                    ? "text-white shadow-sm"
                    : "bg-ink-50 text-ink-600 hover:bg-ink-100"
                }`}
                style={active ? { background: m.color } : undefined}
              >
                {m.emoji} {m.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* PICK */}
      <button
        type="button"
        onClick={handleDispense}
        disabled={pulling}
        className="mt-4 w-full rounded-2xl bg-gradient-to-r from-peach-500 to-peach-400 py-4 font-display text-2xl tracking-tight text-white shadow-lg shadow-peach-200 transition-all hover:shadow-xl hover:shadow-peach-300 disabled:opacity-50 disabled:shadow-none"
      >
        {pulling ? "뽑는 중..." : "🎯 PICK!"}
      </button>
    </div>
  );
}

function SnackSlot({
  emoji,
  name,
  isTop,
  isPulling,
}: {
  emoji: string;
  name: string;
  isTop: boolean;
  isPulling: boolean;
}) {
  return (
    <div
      className={`relative flex flex-col items-center gap-2 rounded-2xl p-4 transition-all ${
        isTop
          ? "bg-peach-50 shadow-glow ring-2 ring-peach-200"
          : "bg-ink-50"
      } ${isPulling ? "animate-pulse-soft" : ""}`}
    >
      <span className="text-3xl">{emoji}</span>
      <span className="text-[11px] font-bold text-ink-600">{name}</span>
      {isTop && (
        <span className="absolute -right-1 -top-1 rounded-full bg-peach-500 px-2 py-0.5 text-[9px] font-bold text-white shadow-sm">
          1위
        </span>
      )}
    </div>
  );
}
