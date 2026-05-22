import type { Metadata, Viewport } from "next";
import { blackHanSans } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "탕비실 - 직장인 간식 추천 & 익명 커뮤니티",
  description:
    "사무실 탕비실에서 만나는 간식 추천과 솔직한 직장인들의 익명 이야기.",
  keywords: ["탕비실", "간식 추천", "직장인", "익명 커뮤니티", "오피스 스낵"],
  openGraph: {
    title: "탕비실",
    description: "직장인을 위한 간식 추천 + 익명 커뮤니티",
    type: "website",
    locale: "ko_KR",
  },
};

export const viewport: Viewport = {
  themeColor: "#ff7a10",
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
      <body className="min-h-screen bg-snack-50 font-sans text-neutral-900 antialiased">
        {children}
      </body>
    </html>
  );
}
