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
      className="fixed bottom-0 left-1/2 z-50 flex w-full max-w-[430px] -translate-x-1/2 border-t-[3px] border-cocoa-800 bg-cocoa-600"
      style={{
        paddingTop: 10,
        paddingBottom: "max(10px, env(safe-area-inset-bottom))",
      }}
    >
      {TABS.map((tab) => {
        const active = isActive(tab.href, pathname);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`flex flex-1 flex-col items-center gap-0.5 rounded-lg py-1 transition ${
              active ? "bg-butter-300/15 text-butter-300" : "text-cocoa-400"
            }`}
          >
            <span className="text-[22px]">{tab.emoji}</span>
            <span className="text-[10px] font-extrabold">{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
