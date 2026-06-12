"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/", emoji: "🍪", label: "홈" },
  { href: "/ranking", emoji: "📊", label: "랭킹" },
  { href: "/lounge", emoji: "💬", label: "라운지" },
] as const;

function isActive(href: string, pathname: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function BottomNav() {
  const pathname = usePathname();
  // 간식 상세에서는 하단 네비를 숨김 (v4 동작)
  if (pathname.startsWith("/snack/")) return null;

  return (
    <nav
      className="fixed bottom-0 left-1/2 z-[100] flex w-full max-w-[430px] -translate-x-1/2 gap-1.5 border-t border-ink-200/90 bg-white/90 px-3 backdrop-blur-xl"
      style={{
        paddingTop: 10,
        paddingBottom: "max(12px, env(safe-area-inset-bottom))",
      }}
    >
      {TABS.map((t) => {
        const active = isActive(t.href, pathname);
        return (
          <Link
            key={t.href}
            href={t.href}
            className={`flex min-h-[48px] flex-1 flex-col items-center justify-center gap-0.5 rounded-2xl transition ${
              active ? "bg-ink-100 text-ink-800" : "text-ink-400"
            }`}
          >
            <span className="text-[20px]">{t.emoji}</span>
            <span className={`text-[10px] ${active ? "font-extrabold" : "font-semibold"}`}>
              {t.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
