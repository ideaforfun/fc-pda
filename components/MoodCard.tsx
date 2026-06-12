"use client";

import { useState } from "react";
import { calcIndex } from "@/lib/data";
import { useTangbisil } from "@/lib/state";
import { SnackSearchSheet } from "./SnackSearchSheet";
import { StoryChip } from "./StoryChip";

export function MoodCard() {
  const {
    todayMood,
    candidates,
    picked,
    pickCandidate,
    rerollMood,
    refreshCandidates,
  } = useTangbisil();
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <div
        className="rounded-card border px-4 pb-4 pt-[18px]"
        style={{
          background: todayMood.grad,
          borderColor: `${todayMood.accent}1F`,
          boxShadow: `0 8px 28px ${todayMood.accent}14`,
        }}
      >
        {/* 상단: 이모지 + 라벨 + 재추첨 */}
        <div className="mb-4 flex items-center gap-3">
          <div
            className="flex h-[54px] w-[54px] flex-shrink-0 items-center justify-center rounded-[18px] bg-white text-[28px]"
            style={{ boxShadow: `0 4px 14px ${todayMood.accent}22` }}
          >
            {todayMood.e}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[11px] font-semibold text-ink-500">
              오늘의 기분
            </div>
            <div className="text-[21px] font-black leading-tight tracking-[-0.6px] text-ink-800">
              {todayMood.label}
            </div>
          </div>
          <button
            type="button"
            onClick={rerollMood}
            className="press inline-flex min-h-[40px] items-center rounded-full border border-ink-200 bg-white px-3.5 text-xs font-bold text-ink-600 shadow-[0_2px_6px_rgba(23,25,35,0.05)]"
          >
            🎲 기분 바꾸기
          </button>
        </div>

        <div className="mb-[11px] text-[13px] font-bold text-[#3A3B44]">
          이 기분, 어떤 간식이 당겨요?
        </div>

        {/* 3 후보 */}
        <div className="grid grid-cols-3 gap-[9px]">
          {candidates.map((s) => {
            const isPicked = picked === s.id;
            const dimmed = picked !== null && !isPicked;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => pickCandidate(s)}
                disabled={picked !== null}
                className="press relative rounded-[16px] bg-white px-[7px] pb-[11px] pt-[9px] transition-all"
                style={{
                  border: isPicked
                    ? `2px solid ${todayMood.accent}`
                    : "1.5px solid rgba(255,255,255,0.9)",
                  opacity: dimmed ? 0.4 : 1,
                  cursor: picked !== null ? "default" : "pointer",
                  boxShadow: isPicked
                    ? `0 6px 18px ${todayMood.accent}30`
                    : "0 2px 8px rgba(23,25,35,0.06)",
                }}
              >
                {isPicked && (
                  <div
                    className="absolute left-1/2 top-[-8px] -translate-x-1/2 whitespace-nowrap rounded-full px-2.5 py-[3px] text-[9.5px] font-extrabold text-white"
                    style={{
                      background: todayMood.accent,
                      boxShadow: `0 3px 8px ${todayMood.accent}50`,
                    }}
                  >
                    내 픽 ✓
                  </div>
                )}
                <div className="mb-2 aspect-square w-full overflow-hidden rounded-[12px] bg-[#F2F3F6]">
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
                <div className="text-[12px] font-extrabold leading-[1.25] text-ink-800">
                  {s.name}
                </div>
                <div
                  className="mt-[3px] text-[10px] font-semibold"
                  style={{ color: todayMood.accent }}
                >
                  {todayMood.idxName}지수 {calcIndex(s.kcal, todayMood.id)}p
                </div>
                <div className="mt-1.5 flex justify-center">
                  <StoryChip snackId={s.id} />
                </div>
              </button>
            );
          })}
        </div>

        {/* 액션 */}
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={refreshCandidates}
            className="press flex min-h-[46px] flex-1 items-center justify-center rounded-[14px] border border-ink-200 bg-white/85 text-[13px] font-bold text-ink-600"
          >
            ↻ 간식 다시 뽑기
          </button>
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="press flex min-h-[46px] flex-1 items-center justify-center rounded-[14px] bg-ink-800 text-[13px] font-bold text-white"
          >
            🔍 검색해서 투표
          </button>
        </div>

        {picked && (
          <div
            className="mt-[11px] animate-fade-in rounded-[13px] bg-white/85 px-3.5 py-[11px] text-center text-[12.5px] font-bold"
            style={{ color: todayMood.accent }}
          >
            {todayMood.label} 랭킹에 한 표 반영됐어요 🗳️
          </div>
        )}
      </div>

      {searchOpen && (
        <SnackSearchSheet mood={todayMood} onClose={() => setSearchOpen(false)} />
      )}
    </>
  );
}
