"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/", emoji: "🎰", label: "자판기" },
  { href: "/feed", emoji: "🕶️", label: "고백" },
] as const;

function isActive(href: string, pathname: string) {
  if (href === "/") return pathname === "/" || pathname.startsWith("/result");
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-1/2 z-50 flex w-full max-w-[430px] -translate-x-1/2 rounded-t-2xl border-t border-ink-100/60 bg-white/70 backdrop-blur-xl"
      style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}
    >
      {TABS.map((tab) => {
        const active = isActive(tab.href, pathname);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`flex flex-1 flex-col items-center gap-0.5 pb-1 pt-3 transition ${
              active ? "text-peach-500" : "text-ink-400"
            }`}
          >
            <span className="text-[22px]">{tab.emoji}</span>
            <span className="text-[10px] font-bold">{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
