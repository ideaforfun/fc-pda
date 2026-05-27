import Link from "next/link";
import { VendingMachine } from "@/components/VendingMachine";
import { TangiMascot } from "@/components/TangiMascot";
import { CONFESSIONS } from "@/lib/data";

export default function HomePage() {
  return (
    <main className="pb-4">
      {/* Hero — bold typography */}
      <div className="px-6 pb-2 pt-14">
        <p className="text-[10px] font-bold uppercase tracking-[3px] text-peach-400">
          office snack machine
        </p>
        <h1 className="mt-1 font-display text-[72px] leading-[0.85] tracking-tighter text-ink-800">
          탕비실
        </h1>
        <p className="mt-3 text-[17px] font-medium leading-snug text-ink-400">
          기분 따라 뽑는
          <br />
          <span className="text-ink-600">1위 간식 자판기</span>
        </p>
      </div>

      {/* Tangi speech */}
      <div className="mb-6 flex items-center gap-3 px-5">
        <TangiMascot size={48} />
        <div className="animate-bubble-in rounded-2xl rounded-bl-md bg-white px-4 py-2.5 shadow-soft">
          <p className="text-[13px] font-semibold text-ink-600">
            기분 골라서 PICK 누르면
            <br />
            1위 간식 알려줄게! 🍭
          </p>
        </div>
      </div>

      <VendingMachine />

      {/* Quick access */}
      <div className="mt-6 grid grid-cols-2 gap-3 px-5">
        <Link
          href="/feed"
          className="rounded-2xl bg-white p-4 shadow-soft transition hover:shadow-card"
        >
          <span className="text-2xl">🕶️</span>
          <p className="mt-2 text-sm font-bold text-ink-700">익명 고백</p>
          <p className="mt-0.5 text-[11px] text-ink-400">
            {CONFESSIONS.length}개의 이야기
          </p>
        </Link>
        <Link
          href="/result?mood=scolded"
          className="rounded-2xl bg-peach-50 p-4 shadow-soft transition hover:shadow-card"
        >
          <span className="text-2xl">🏆</span>
          <p className="mt-2 text-sm font-bold text-ink-700">이번주 1위</p>
          <p className="mt-0.5 text-[11px] text-ink-400">혼났을 때 픽</p>
        </Link>
      </div>
    </main>
  );
}
