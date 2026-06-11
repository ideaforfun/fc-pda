"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LOUNGE_CATS, MOODS } from "@/lib/data";
import { useTangbisil } from "@/lib/state";
import { StoryChip } from "./StoryChip";

export function MoodTopStrip() {
  const router = useRouter();
  const { rankedFor, getVotes, setRankMood } = useTangbisil();

  return (
    <div className="pt-[26px]">
      <div className="mb-3 flex items-baseline justify-between px-1.5">
        <div className="text-base font-extrabold tracking-[-0.4px] text-ink-800">
          기분별 1위 간식
        </div>
        <Link
          href="/ranking"
          className="px-1 py-1 text-[12px] font-bold text-ink-500"
        >
          더보기
        </Link>
      </div>
      <div className="-mx-4 flex gap-2.5 overflow-x-auto px-4 pb-1.5">
        {MOODS.map((m) => {
          const top = rankedFor(m.id)[0];
          if (!top) return null;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => {
                setRankMood(m.id);
                router.push("/ranking");
              }}
              className="press w-[130px] flex-shrink-0 rounded-card border border-ink-200 bg-white p-3 text-left shadow-card"
            >
              <div className="mb-2.5 flex items-center gap-[5px]">
                <span className="text-[15px]">{m.e}</span>
                <span className="text-[11.5px] font-extrabold text-ink-800">
                  {m.label}
                </span>
              </div>
              <div className="mb-2 aspect-[1.45] w-full overflow-hidden rounded-[11px] bg-[#F2F3F6]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={top.img}
                  alt={top.name}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.visibility =
                      "hidden";
                  }}
                />
              </div>
              <div className="text-[12px] font-extrabold text-ink-800">
                {top.name}
              </div>
              <div className="mt-1 flex items-center justify-between">
                <span
                  className="text-[10.5px] font-semibold"
                  style={{ color: m.accent }}
                >
                  {getVotes(top.id, m.id).toLocaleString()}표
                </span>
                <StoryChip snackId={top.id} accent={m.accent} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function TodayStoriesStrip() {
  const { posts } = useTangbisil();
  const top = [...posts].sort((a, b) => b.likes - a.likes).slice(0, 2);

  return (
    <div className="pt-6">
      <div className="mb-3 flex items-baseline justify-between px-1.5">
        <div className="text-base font-extrabold tracking-[-0.4px] text-ink-800">
          오늘의 이야기
        </div>
        <Link
          href="/lounge"
          className="px-1 py-1 text-[12px] font-bold text-ink-500"
        >
          더보기
        </Link>
      </div>
      {top.map((p, i) => {
        const cat = LOUNGE_CATS.find((c) => c.id === p.cat);
        return (
          <div
            key={p.id}
            className="mb-[9px] rounded-card border border-ink-200 bg-white px-4 py-3.5 shadow-card"
          >
            <div className="mb-[7px] flex items-center gap-[7px]">
              <span className="rounded-full bg-ink-800 px-2.5 py-[2.5px] text-[10px] font-extrabold text-white">
                TOP {i + 1}
              </span>
              <span className="text-[11px] font-semibold text-ink-500">
                {cat?.e} {cat?.label}
              </span>
              <span className="ml-auto text-[11px] font-semibold text-ink-300">
                ❤️ {p.likes}
              </span>
            </div>
            <p className="m-0 text-[13.5px] leading-[1.62] text-[#3A3B44]">
              {p.text}
            </p>
          </div>
        );
      })}
    </div>
  );
}
