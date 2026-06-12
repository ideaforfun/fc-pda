"use client";

import { useRouter } from "next/navigation";
import type { MouseEvent } from "react";
import { useTangbisil } from "@/lib/state";

type Props = {
  snackId: number;
  accent?: string;
};

export function StoryChip({ snackId, accent = "#8A8B94" }: Props) {
  const router = useRouter();
  const { storyCount } = useTangbisil();

  const open = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    router.push(`/snack/${snackId}`);
  };

  return (
    <span
      role="button"
      tabIndex={0}
      onClick={open}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") open(e as unknown as MouseEvent);
      }}
      className="press inline-flex h-[26px] cursor-pointer items-center gap-1 rounded-full border border-ink-200 bg-white px-2.5 text-[10.5px] font-bold"
      style={{ color: accent }}
    >
      💬 {storyCount(snackId)}
    </span>
  );
}
