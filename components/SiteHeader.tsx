import Link from "next/link";
import { TangiMascot } from "./TangiMascot";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-snack-100 bg-snack-50/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-2">
          <TangiMascot size={36} />
          <span className="font-display text-2xl text-snack-700">탕비실</span>
        </Link>
        <nav className="flex items-center gap-1 text-sm font-medium">
          <Link
            href="/"
            className="rounded-full px-3 py-1.5 text-neutral-700 transition hover:bg-snack-100 hover:text-snack-700"
          >
            자판기
          </Link>
          <Link
            href="/feed"
            className="rounded-full px-3 py-1.5 text-neutral-700 transition hover:bg-snack-100 hover:text-snack-700"
          >
            익명 피드
          </Link>
        </nav>
      </div>
    </header>
  );
}
