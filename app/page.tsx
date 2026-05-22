import Link from "next/link";
import { VendingMachine } from "@/components/VendingMachine";
import { CONFESSIONS } from "@/lib/data";

export default function HomePage() {
  return (
    <main className="pb-2">
      <div className="px-5 pb-3 pt-6 text-center">
        <div className="text-[9px] font-extrabold tracking-[3px] text-cocoa-400">
          OFFICE SNACK MACHINE
        </div>
        <h1 className="mt-1 font-display text-[46px] leading-none tracking-tighter text-cocoa-600 [text-shadow:3px_3px_0_#FFE066]">
          탕비실
        </h1>
      </div>

      <VendingMachine />

      <div className="flex px-4 pb-4 pt-8">
        <div className="relative max-w-[240px] animate-bubble-in rounded-[16px_16px_16px_4px] bg-white px-3.5 py-2.5 text-[13px] font-bold text-cocoa-600 shadow-[0_4px_12px_rgba(0,0,0,0.15)]">
          <div className="mb-0.5 text-[9px] font-extrabold tracking-wide text-tomato-400">
            탕이
          </div>
          기분 골라서 PICK 누르면
          <br />이 상황 1위 간식 알려줄게! 🍭
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5 px-4">
        <Link
          href="/feed"
          className="chunky-card cursor-pointer px-3.5 py-3.5 text-left"
        >
          <div className="mb-1 text-2xl">🕶️</div>
          <div className="text-[13px] font-extrabold text-cocoa-600">
            익명 고백
          </div>
          <div className="mt-0.5 text-[10px] text-cocoa-400">
            {CONFESSIONS.length}개의 이야기
          </div>
        </Link>
        <Link
          href="/result?mood=scolded"
          className="chunky-card cursor-pointer bg-butter-300 px-3.5 py-3.5 text-left"
        >
          <div className="mb-1 text-2xl">🏆</div>
          <div className="text-[13px] font-extrabold text-cocoa-600">
            이번주 1위
          </div>
          <div className="mt-0.5 text-[10px] text-cocoa-400">
            혼났을 때 픽 보러가기
          </div>
        </Link>
      </div>
    </main>
  );
}
