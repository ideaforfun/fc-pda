import Link from "next/link";
import { ConfessionFeed } from "@/components/ConfessionFeed";
import { TangiMascot } from "@/components/TangiMascot";

export const metadata = {
  title: "익명 고백 · 탕비실",
  description: "탕이한테만 살짝 털어놓는 직장인 익명 고백.",
};

export default function FeedPage() {
  return (
    <main className="px-5 pb-4 pt-10">
      <Link
        href="/"
        className="mb-5 inline-flex items-center gap-1 text-sm font-bold text-ink-400 transition hover:text-ink-600"
      >
        ← 자판기로
      </Link>

      <div className="mb-6 flex items-center gap-3">
        <TangiMascot size={44} />
        <div>
          <h1 className="font-display text-[40px] leading-none tracking-tight text-ink-800">
            익명 고백
          </h1>
          <p className="mt-1 text-sm text-ink-400">탕이만 알아요 🤫</p>
        </div>
      </div>

      <ConfessionFeed />
    </main>
  );
}
