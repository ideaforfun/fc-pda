"use client";

import { useTangbisil } from "@/lib/state";

export function Toast() {
  const { toast } = useTangbisil();
  if (!toast) return null;
  return (
    <div className="pointer-events-none fixed bottom-24 left-1/2 z-[9999] -translate-x-1/2 animate-pop-up whitespace-nowrap rounded-full bg-[rgba(25,26,30,0.94)] px-[22px] py-[11px] text-[13px] font-semibold text-white shadow-[0_8px_24px_rgba(0,0,0,0.22)] backdrop-blur">
      {toast}
    </div>
  );
}
