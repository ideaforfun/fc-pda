"use client";

import { useMemo, useState } from "react";
import {
  type Mood,
  type Snack,
  getTopSnackByMood,
  moods,
  snacks,
} from "@/lib/data";
import { TangiMascot } from "./TangiMascot";

type Phase = "idle" | "drawing" | "result";

const SLOT_COUNT = 9;

export function VendingMachine() {
  const [selectedMoodId, setSelectedMoodId] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [result, setResult] = useState<Snack | null>(null);

  const slotSnacks = useMemo(() => snacks.slice(0, SLOT_COUNT), []);

  const handleDraw = (mood: Mood) => {
    setSelectedMoodId(mood.id);
    setPhase("drawing");
    setResult(null);

    window.setTimeout(() => {
      const top = getTopSnackByMood(mood.id) ?? null;
      setResult(top);
      setPhase("result");
    }, 900);
  };

  const handleReset = () => {
    setPhase("idle");
    setResult(null);
    setSelectedMoodId(null);
  };

  return (
    <div className="grid w-full gap-8 lg:grid-cols-[1fr_360px]">
      {/* 자판기 본체 */}
      <div className="relative mx-auto w-full max-w-[480px]">
        <div className="rounded-[36px] bg-gradient-to-b from-snack-700 to-snack-800 p-5 shadow-2xl ring-4 ring-snack-900/20">
          {/* 상단 헤더 */}
          <div className="mb-4 flex items-center justify-between rounded-2xl bg-snack-900/40 px-4 py-2 text-snack-50">
            <span className="font-display text-xl tracking-wider">
              탕비실 自販機
            </span>
            <span className="text-xs uppercase tracking-widest text-snack-200">
              No. 001
            </span>
          </div>

          {/* 디스플레이 창 */}
          <div className="rounded-2xl bg-gradient-to-b from-amber-50 to-amber-100 p-3 shadow-inner ring-2 ring-snack-900/30">
            <div className="grid grid-cols-3 gap-2">
              {slotSnacks.map((snack) => {
                const isResult = result?.id === snack.id;
                return (
                  <div
                    key={snack.id}
                    className={`relative flex aspect-square flex-col items-center justify-center rounded-xl bg-white/80 text-center shadow-sm ring-1 transition-all duration-300 ${
                      isResult
                        ? "scale-105 ring-2 ring-snack-500 shadow-lg"
                        : "ring-snack-200"
                    } ${phase === "drawing" ? "animate-pulse" : ""}`}
                  >
                    <span className="text-3xl">{snack.emoji}</span>
                    <span className="mt-1 line-clamp-1 px-1 text-[10px] font-medium text-neutral-600">
                      {snack.name}
                    </span>
                    {isResult && (
                      <span className="absolute -right-1 -top-1 rounded-full bg-snack-500 px-1.5 py-0.5 text-[9px] font-bold text-white shadow">
                        1위
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 배출구 */}
          <div className="mt-4 rounded-2xl bg-snack-900/60 p-3">
            <div className="flex h-20 items-center justify-center rounded-xl bg-black/40 ring-2 ring-snack-900/40">
              {phase === "idle" && (
                <p className="text-xs text-snack-200">
                  무드를 골라 1위 간식을 뽑아보세요
                </p>
              )}
              {phase === "drawing" && (
                <p className="animate-pulse text-sm text-snack-100">
                  탕이가 고르는 중...
                </p>
              )}
              {phase === "result" && result && (
                <div className="flex items-center gap-3 text-snack-50">
                  <span className="text-4xl">{result.emoji}</span>
                  <div className="text-left">
                    <p className="font-display text-lg leading-none">
                      {result.name}
                    </p>
                    <p className="text-xs text-snack-200">{result.brand}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 오른쪽 조작 패널 */}
      <div className="flex flex-col gap-4">
        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-snack-100">
          <div className="flex items-center gap-3">
            <TangiMascot
              size={64}
              mood={
                phase === "drawing"
                  ? "thinking"
                  : phase === "result"
                    ? "excited"
                    : "default"
              }
            />
            <div>
              <p className="font-display text-xl text-snack-700">탕이</p>
              <p className="text-sm text-neutral-600">
                {phase === "idle" && "오늘 기분이 어때요?"}
                {phase === "drawing" && "음... 잠깐만요!"}
                {phase === "result" && "이거 어때요? 1위픽이에요!"}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-snack-100">
          <p className="mb-3 text-sm font-semibold text-neutral-700">
            무드 선택
          </p>
          <div className="grid grid-cols-2 gap-2">
            {moods.map((mood) => {
              const isActive = selectedMoodId === mood.id;
              return (
                <button
                  key={mood.id}
                  type="button"
                  onClick={() => handleDraw(mood)}
                  disabled={phase === "drawing"}
                  className={`flex flex-col items-start rounded-xl border-2 px-3 py-2 text-left transition-all disabled:cursor-wait ${
                    isActive
                      ? "border-snack-500 bg-snack-50"
                      : "border-snack-100 bg-white hover:border-snack-300 hover:bg-snack-50"
                  }`}
                >
                  <span className="text-xl">{mood.emoji}</span>
                  <span className="mt-1 text-sm font-semibold text-neutral-800">
                    {mood.label}
                  </span>
                  <span className="text-[11px] leading-tight text-neutral-500">
                    {mood.description}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {phase === "result" && result && (
          <div className="rounded-2xl bg-snack-500 p-5 text-white shadow-lg">
            <p className="text-xs uppercase tracking-widest text-snack-100">
              오늘의 픽
            </p>
            <p className="mt-1 font-display text-2xl">{result.name}</p>
            <p className="mt-2 text-sm text-snack-50">{result.description}</p>
            <p className="mt-3 text-xs text-snack-100">
              👍 {result.votes.toLocaleString()}명이 추천했어요
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="mt-4 w-full rounded-xl bg-white px-4 py-2 text-sm font-semibold text-snack-700 transition hover:bg-snack-50"
            >
              다시 뽑기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
