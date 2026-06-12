"use client";

import Link from "next/link";
import { MONTH_LABEL, MOODS, calcIndex } from "@/lib/data";
import { useTangbisil } from "@/lib/state";
import { StoryChip } from "./StoryChip";

export function RankingList() {
  const { rankMood, setRankMood, rankedFor, getVotes } = useTangbisil();
  const ranked = rankedFor(rankMood);
  const rankMoodObj = MOODS.find((m) => m.id === rankMood)!;
  const max = getVotes(ranked[0]?.id ?? 0, rankMood) || 1;

  return (
    <>
      <div className="px-5 pt-5">
        <h2 className="m-0 font-display text-[26px] tracking-[-1.2px] text-ink-800">
          기분 랭킹
        </h2>
        <div className="mb-3.5 mt-1 text-[11px] font-semibold text-ink-400">
          {MONTH_LABEL}
        </div>
      </div>

      <div className="sticky top-0 z-50 bg-ink-50/95 px-0 pb-2.5 pt-2 backdrop-blur">
        <div className="flex gap-[7px] overflow-x-auto px-4">
          {MOODS.map((m) => {
            const active = rankMood === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setRankMood(m.id)}
                className="press flex-shrink-0 rounded-full px-[15px] text-[12.5px] font-extrabold transition-all"
                style={{
                  minHeight: 40,
                  background: active ? m.accent : "#FFFFFF",
                  color: active ? "#FFFFFF" : "#8A8B94",
                  boxShadow: active
                    ? `0 4px 12px ${m.accent}38`
                    : "0 1px 4px rgba(23,25,35,0.05)",
                }}
              >
                {m.e} {m.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-4 pt-1.5">
        {ranked.map((s, idx) => {
          const v = getVotes(s.id, rankMood);
          const idxP = calcIndex(s.kcal, rankMood);
          return (
            <Link
              key={s.id}
              href={`/snack/${s.id}`}
              className="press mb-[9px] flex items-center gap-3 rounded-card bg-white px-[15px] py-[13px]"
              style={{
                border:
                  idx === 0
                    ? `1.5px solid ${rankMoodObj.accent}40`
                    : "1px solid #ECECF1",
                boxShadow:
                  idx === 0
                    ? `0 6px 20px ${rankMoodObj.accent}14`
                    : "0 2px 8px rgba(23,25,35,0.04)",
              }}
            >
              <span
                className="min-w-6 text-center font-display"
                style={{
                  fontSize: idx < 3 ? 19 : 14,
                  color:
                    idx === 0
                      ? rankMoodObj.accent
                      : idx === 1
                        ? "#5A5B64"
                        : idx === 2
                          ? "#8A8B94"
                          : "#C8C9D2",
                }}
              >
                {idx + 1}
              </span>

              <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-[14px] bg-[#F2F3F6]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.img}
                  alt={s.name}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.visibility =
                      "hidden";
                  }}
                />
              </div>

              <div className="min-w-0 flex-1">
                <div className="mb-[5px] text-[14.5px] font-extrabold text-ink-800">
                  {s.name}
                </div>
                <div className="mb-1.5 flex items-center gap-[7px]">
                  <div className="h-[5px] flex-1 rounded-full bg-[#F0F0F4]">
                    <div
                      className="h-full rounded-full transition-[width] duration-500"
                      style={{
                        background: idx === 0 ? rankMoodObj.accent : "#D5D6DE",
                        width: `${(v / max) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="min-w-[40px] text-[11px] font-bold text-ink-500">
                    {v.toLocaleString()}표
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-[5px]">
                  <span className="rounded-[7px] bg-ink-50 px-2 py-[2.5px] text-[10px] font-bold text-ink-500">
                    {s.kcal}kcal
                  </span>
                  <span
                    className="rounded-[7px] px-2 py-[2.5px] text-[10px] font-extrabold"
                    style={{
                      color: rankMoodObj.accent,
                      background: `${rankMoodObj.accent}10`,
                    }}
                  >
                    {rankMoodObj.idxName}지수 {idxP}p
                  </span>
                  <StoryChip snackId={s.id} />
                </div>
              </div>
            </Link>
          );
        })}
        <div className="pt-2 text-center text-[11.5px] font-semibold text-ink-400">
          간식을 누르면 이야기를 볼 수 있어요
        </div>
      </div>
    </>
  );
}
