"use client";

import { useState } from "react";
import Link from "next/link";
import { MONTH_LABEL, MOODS, calcIndex, type Snack } from "@/lib/data";
import { useTangbisil } from "@/lib/state";

type Props = {
  snack: Snack;
};

export function SnackDetail({ snack }: Props) {
  const { stories, addStory, getVotes, storyCount } = useTangbisil();
  const [text, setText] = useState("");

  const list = stories[snack.id] ?? [];
  const topMoods = [...MOODS]
    .sort((a, b) => calcIndex(snack.kcal, b.id) - calcIndex(snack.kcal, a.id))
    .slice(0, 2);

  return (
    <div className="pb-28">
      {/* 상단 바 */}
      <div className="flex items-center gap-2.5 px-4 pt-4">
        <Link
          href="/"
          className="press flex h-[38px] w-[38px] items-center justify-center rounded-[12px] border border-ink-200 bg-white text-[15px] text-ink-600"
          aria-label="뒤로"
        >
          ←
        </Link>
        <div className="text-[13px] font-bold text-ink-500">간식 상세</div>
      </div>

      {/* 히어로 */}
      <div className="mx-4 mt-3.5 overflow-hidden rounded-card border border-ink-200 bg-white shadow-card">
        <div className="aspect-[1.7] w-full bg-[#F2F3F6]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={snack.img}
            alt={snack.name}
            className="h-full w-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.visibility = "hidden";
            }}
          />
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <h2 className="m-0 text-[22px] font-black tracking-[-0.6px] text-ink-800">
              {snack.name}
            </h2>
            <span className="text-[13px] font-bold text-ink-500">
              ₩{snack.price.toLocaleString()}
            </span>
          </div>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            <span className="rounded-lg bg-ink-50 px-2.5 py-1 text-[11px] font-bold text-ink-500">
              {snack.kcal}kcal
            </span>
            {topMoods.map((m) => (
              <span
                key={m.id}
                className="rounded-lg px-2.5 py-1 text-[11px] font-extrabold"
                style={{ color: m.accent, background: `${m.accent}10` }}
              >
                {m.e} {m.idxName}지수 {calcIndex(snack.kcal, m.id)}p
              </span>
            ))}
          </div>

          <div className="mt-3.5 rounded-[13px] bg-warm px-3.5 py-3">
            <div className="mb-2 text-[11px] font-bold text-ink-500">
              {MONTH_LABEL} 기분별 득표
            </div>
            <div className="flex flex-wrap gap-[5px]">
              {MOODS.map((m) => (
                <span
                  key={m.id}
                  className="rounded-full border border-ink-200 bg-white px-2.5 py-[3.5px] text-[10.5px] font-bold text-ink-600"
                >
                  {m.e} {getVotes(snack.id, m.id).toLocaleString()}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 이야기 작성 */}
      <div className="mx-4 mt-4">
        <div className="mb-2.5 px-0.5 text-[15px] font-extrabold text-ink-800">
          💬 이 간식 이야기{" "}
          {storyCount(snack.id) > 0 && (
            <span className="font-bold text-ink-500">{storyCount(snack.id)}</span>
          )}
        </div>
        <div className="rounded-card border border-ink-200 bg-white p-3.5 shadow-card">
          <div className="flex gap-2">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  addStory(snack.id, text);
                  setText("");
                }
              }}
              placeholder={`${snack.name}, 언제 먹으면 최고예요?`}
              rows={2}
              className="flex-1 resize-none rounded-[13px] border-[1.5px] border-ink-200 bg-warm px-3.5 py-3 text-[14px] leading-[1.55] text-ink-800 outline-none"
            />
            <button
              type="button"
              onClick={() => {
                addStory(snack.id, text);
                setText("");
              }}
              className="press w-12 self-stretch rounded-[13px] bg-ink-800 text-base font-bold text-white"
              aria-label="이야기 남기기"
            >
              ↑
            </button>
          </div>
          <div className="mt-2 text-[10.5px] font-medium text-ink-400">
            🕶️ 익명으로 남겨져요
          </div>
        </div>
      </div>

      {/* 이야기 목록 */}
      <div className="px-4 pt-3">
        {list.length === 0 && (
          <div className="py-8 text-center">
            <div className="mb-2 text-[30px]">🗨️</div>
            <div className="text-[13px] font-semibold text-ink-500">
              아직 이야기가 없어요. 첫 이야기를 남겨보세요!
            </div>
          </div>
        )}

        {list.map((st, idx) => (
          <div
            key={st.id}
            className={`mb-[9px] rounded-card border border-ink-200 bg-white px-[15px] py-3.5 shadow-card ${
              idx === 0 && st.time === "방금 전" ? "animate-fade-in" : ""
            }`}
          >
            <div className="mb-1.5 flex items-center gap-[7px]">
              <div className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-ink-50 text-xs">
                🕶️
              </div>
              <span className="text-[11px] font-semibold text-ink-500">
                익명의 직장인
              </span>
              <span className="ml-auto text-[11px] font-semibold text-ink-300">
                {st.time}
              </span>
            </div>
            <p className="m-0 text-[13.5px] leading-[1.62] text-[#3A3B44]">
              {st.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
