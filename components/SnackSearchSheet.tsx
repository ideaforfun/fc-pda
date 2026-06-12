"use client";

import { useState } from "react";
import { SNACKS, calcIndex, type Mood } from "@/lib/data";
import { useTangbisil } from "@/lib/state";

type Props = {
  mood: Mood;
  onClose: () => void;
};

export function SnackSearchSheet({ mood, onClose }: Props) {
  const { castVote } = useTangbisil();
  const [q, setQ] = useState("");
  const [voted, setVoted] = useState<Record<number, boolean>>({});

  const results = SNACKS.filter(
    (s) => s.active && s.name.toLowerCase().includes(q.trim().toLowerCase()),
  );

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[1000] flex animate-fade-in items-end justify-center bg-[rgba(17,18,24,0.5)] backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex h-[76vh] w-full max-w-[430px] animate-sheet-up flex-col rounded-t-[24px] bg-white px-5 pt-2.5"
      >
        <div className="mx-auto mb-4 h-[5px] w-10 rounded-full bg-[#E4E5EA]" />

        {/* 무드 안내 배너 */}
        <div
          className="mb-3.5 flex items-center gap-2.5 rounded-2xl px-3.5 py-3"
          style={{
            background: mood.grad,
            border: `1px solid ${mood.accent}26`,
          }}
        >
          <span className="text-2xl">{mood.e}</span>
          <div className="flex-1">
            <div className="text-[13.5px] font-extrabold text-ink-800">
              지금 기분{" "}
              <span style={{ color: mood.accent }}>{mood.label}</span>(으)로 투표돼요
            </div>
            <div className="mt-[1px] text-[11px] font-medium text-ink-500">
              검색한 간식도 이 기분 랭킹에 쌓여요
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-[30px] w-[30px] flex-shrink-0 items-center justify-center rounded-full border border-ink-200 bg-white/80 text-xs text-ink-500"
            aria-label="닫기"
          >
            ✕
          </button>
        </div>

        {/* 검색 인풋 */}
        <div className="relative mb-1.5">
          <span className="pointer-events-none absolute left-[15px] top-1/2 -translate-y-1/2 text-[15px] text-ink-400">
            🔍
          </span>
          {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="어떤 간식을 찾으세요?"
            className="w-full rounded-[14px] border-[1.5px] border-ink-200 bg-warm py-3.5 pl-[42px] pr-4 text-[15px] text-ink-800 outline-none"
          />
        </div>

        {/* 결과 */}
        <div
          className="flex-1 overflow-y-auto"
          style={{ paddingBottom: "max(20px, env(safe-area-inset-bottom))" }}
        >
          {results.length === 0 && (
            <div className="py-12 text-center">
              <div className="mb-2 text-3xl">🍃</div>
              <div className="text-[13.5px] font-semibold text-ink-500">
                찾는 간식이 없어요
              </div>
              <div className="mt-1 text-[11.5px] text-ink-400">
                다른 이름으로 검색해보세요
              </div>
            </div>
          )}

          {results.map((s) => {
            const done = voted[s.id];
            return (
              <div
                key={s.id}
                className="flex items-center gap-3 border-b border-[#F2F3F6] px-0.5 py-3"
              >
                <div className="h-[52px] w-[52px] flex-shrink-0 overflow-hidden rounded-[13px] bg-ink-50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.img}
                    alt={s.name}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.visibility = "hidden";
                    }}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[14.5px] font-bold text-ink-800">{s.name}</div>
                  <div className="mt-0.5 text-[11.5px] text-ink-500">
                    {s.kcal}kcal · {mood.idxName}지수{" "}
                    <b style={{ color: mood.accent }}>
                      {calcIndex(s.kcal, mood.id)}p
                    </b>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (done) return;
                    castVote(s.id, mood.id, s.name);
                    setVoted((p) => ({ ...p, [s.id]: true }));
                  }}
                  disabled={done}
                  className={`min-h-[40px] rounded-[12px] px-[18px] text-[13px] font-bold transition ${
                    done
                      ? "cursor-default bg-ink-100 text-ink-400"
                      : "bg-ink-800 text-white"
                  }`}
                >
                  {done ? "완료" : "투표"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
