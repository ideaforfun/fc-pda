"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MOODS, SNACKS, getRankedSnacks } from "@/lib/data";
import { TangiMascot } from "./TangiMascot";

const ROW_LABELS = ["A", "B"] as const;

export function VendingMachine() {
  const router = useRouter();
  const [moodId, setMoodId] = useState<string>("tired");
  const [pulling, setPulling] = useState(false);

  const activeMood = MOODS.find((m) => m.id === moodId) ?? MOODS[0];
  const ranked = getRankedSnacks(moodId);
  const topId = ranked[0]?.id;

  const handleDispense = () => {
    if (pulling) return;
    setPulling(true);
    window.setTimeout(() => {
      router.push(`/result?mood=${moodId}`);
    }, 900);
  };

  return (
    <div className="relative px-4">
      <div className="vending-body">
        {/* 상단 헤더 */}
        <div className="control-header">
          <div className="font-display text-sm tracking-tight text-butter-300">
            🍿 SNACK PICK
          </div>
          <div className="flex gap-1">
            <div className="h-2 w-2 rounded-full bg-[#51CF66] shadow-[0_0_6px_#51CF66]" />
            <div className="h-2 w-2 rounded-full bg-butter-300" />
            <div className="h-2 w-2 rounded-full bg-cocoa-600" />
          </div>
        </div>

        {/* 디스플레이 글래스 */}
        <div className="vending-glass mb-3">
          {[0, 1].map((row) => (
            <div key={row} className={row === 0 ? "relative mb-2" : "relative"}>
              <div className="relative z-10 flex justify-around py-1.5">
                {SNACKS.slice(row * 3, row * 3 + 3).map((snack, i) => {
                  const isTop = topId === snack.id;
                  return (
                    <div
                      key={snack.id}
                      className={`flex-1 text-center ${
                        pulling && isTop ? "animate-shake" : ""
                      }`}
                    >
                      <div
                        className={`relative mx-auto flex h-[50px] w-[46px] items-center justify-center border-2 border-cocoa-600 text-[22px] transition-all ${
                          isTop && !pulling ? "-translate-y-0.5" : ""
                        }`}
                        style={{
                          background: snack.color,
                          borderRadius: "6px 6px 4px 4px",
                          boxShadow: isTop
                            ? `0 0 16px ${activeMood.color}`
                            : "0 2px 4px rgba(0,0,0,0.2)",
                        }}
                      >
                        <div className="absolute left-0.5 top-0.5 h-6 w-2 rounded-sm bg-white/40" />
                        <span>{snack.emoji}</span>
                        {isTop && (
                          <span className="absolute -right-2 -top-2 rotate-[8deg] rounded-full border-[1.5px] border-cocoa-600 bg-butter-400 px-1.5 py-0.5 text-[8px] font-black text-cocoa-600">
                            HOT
                          </span>
                        )}
                      </div>
                      <div className="mt-1 inline-block rounded bg-black/40 px-1 py-0.5 font-mono text-[8px] font-extrabold tracking-widest text-white">
                        {ROW_LABELS[row]}
                        {i + 1}
                      </div>
                      <div className="mt-0.5 text-[9px] font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                        {snack.name}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-1 h-0.5 bg-black/40 shadow-[0_1px_2px_rgba(0,0,0,0.3)]" />
            </div>
          ))}
        </div>

        {/* 컨트롤 패널 */}
        <div className="control-panel">
          <div className="mb-2 font-mono text-[9px] font-extrabold tracking-wider text-butter-300">
            ▸ SELECT YOUR MOOD
          </div>
          <div className="mb-2.5 grid grid-cols-3 gap-1.5">
            {MOODS.map((m) => {
              const active = moodId === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMoodId(m.id)}
                  className={`rounded-md border-2 px-1 py-2 transition-all ${
                    active
                      ? "translate-y-px border-butter-300"
                      : "border-cocoa-700 bg-cocoa-500"
                  }`}
                  style={
                    active
                      ? {
                          background: m.color,
                          boxShadow: `inset 0 -2px 0 rgba(0,0,0,0.2), 0 0 12px ${m.color}88`,
                        }
                      : {
                          boxShadow:
                            "inset 0 -2px 0 rgba(0,0,0,0.3), 0 2px 0 #1a0d05",
                        }
                  }
                >
                  <div className="mb-0.5 text-lg">{m.emoji}</div>
                  <div
                    className={`font-mono text-[8px] font-extrabold tracking-wider ${
                      active ? "text-cocoa-600" : "text-butter-300"
                    }`}
                  >
                    {m.btn}
                  </div>
                  <div
                    className={`mt-0.5 text-[9px] font-bold ${
                      active ? "text-cocoa-600" : "text-butter-300/80"
                    }`}
                  >
                    {m.label}
                  </div>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleDispense}
            disabled={pulling}
            className="pick-btn"
          >
            {pulling ? "🎰 뽑는 중..." : "🎯 PICK!"}
          </button>
        </div>

        {/* 배출구 */}
        <div className="dispenser-slot mt-2.5">▼ PICK UP HERE ▼</div>
      </div>

      {/* 탕이 마스코트 */}
      <div className="absolute -bottom-5 right-2 animate-bob">
        <TangiMascot size={68} mood={pulling ? "wink" : "happy"} />
      </div>
    </div>
  );
}
