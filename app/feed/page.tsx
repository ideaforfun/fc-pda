import Link from "next/link";
import { ConfessionFeed } from "@/components/ConfessionFeed";
import { TangiMascot } from "@/components/TangiMascot";

export const metadata = {
  title: "익명 고백 · 탕비실",
  description: "탕이한테만 살짝 털어놓는 직장인 익명 고백.",
};

export default function FeedPage() {
  return (
    <main className="px-4 pb-4 pt-6">
      <Link
        href="/"
        className="mb-4 inline-block text-[13px] font-extrabold text-cocoa-600"
      >
        ← 자판기로
      </Link>

      <div className="mb-4 flex items-center gap-2">
        <TangiMascot size={42} />
        <div>
          <h1 className="font-display text-[26px] leading-none tracking-tight text-cocoa-600">
            익명 고백
          </h1>
          <p className="mt-0.5 text-[11px] font-bold text-cocoa-400">
            탕이만 알아요 🤫
          </p>
        </div>
      </div>

      <ConfessionFeed />
    </main>
  );
}
