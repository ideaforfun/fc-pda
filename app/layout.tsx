import type { Metadata, Viewport } from "next";
import { BottomNav } from "@/components/BottomNav";
import { blackHanSans } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "탕비실 - 직장인 간식 추천 & 익명 커뮤니티",
  description:
    "기분 따라 1위 간식을 뽑아주는 자판기, 그리고 탕이한테만 털어놓는 익명 고백.",
  keywords: ["탕비실", "간식 추천", "직장인", "익명 커뮤니티", "오피스 스낵"],
  openGraph: {
    title: "탕비실",
    description: "직장인을 위한 간식 자판기 + 익명 고백",
    type: "website",
    locale: "ko_KR",
  },
};

export const viewport: Viewport = {
  themeColor: "#FF6B3D",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={blackHanSans.variable}>
      <body className="min-h-screen bg-gradient-to-b from-peach-50 via-white to-peach-50/50 font-sans text-ink-800 antialiased">
        <div className="relative mx-auto min-h-screen max-w-[430px] pb-24">
          {children}
        </div>
        <BottomNav />
      </body>
    </html>
  );
}
