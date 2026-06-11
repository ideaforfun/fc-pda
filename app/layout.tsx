import type { Metadata, Viewport } from "next";
import { BottomNav } from "@/components/BottomNav";
import { Toast } from "@/components/Toast";
import { TangbisilProvider } from "@/lib/state";
import { blackHanSans } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "탕비실 — 오피스 스낵 라운지",
  description:
    "오늘 기분, 간식이 알아요. 기분 따라 뽑고, 투표하고, 우리 회사 간식 랭킹 완성!",
  openGraph: {
    title: "탕비실 — 오피스 스낵 라운지",
    description:
      "오늘 기분, 간식이 알아요. 기분 따라 뽑고, 투표하고, 우리 회사 간식 랭킹 완성!",
    type: "website",
    locale: "ko_KR",
  },
};

export const viewport: Viewport = {
  themeColor: "#F5F6F8",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={blackHanSans.variable}>
      <body className="min-h-screen bg-ink-50 font-sans text-ink-800 antialiased">
        <TangbisilProvider>
          <div className="mx-auto min-h-screen max-w-[430px]">{children}</div>
          <BottomNav />
          <Toast />
        </TangbisilProvider>
      </body>
    </html>
  );
}
