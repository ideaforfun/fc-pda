import { AdBanner } from "@/components/AdBanner";
import { MoodCard } from "@/components/MoodCard";
import { MoodTopStrip, TodayStoriesStrip } from "@/components/HomeStrips";
import { Logo } from "@/components/Logo";
import { MONTH_LABEL } from "@/lib/data";

export default function HomePage() {
  return (
    <main className="pb-28">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-5 pb-1 pt-5">
        <Logo />
        <div className="text-[10.5px] font-semibold text-ink-400">
          {MONTH_LABEL}
        </div>
      </div>

      {/* 오늘의 기분 카드 + 광고 배너 */}
      <div className="mx-4 mt-4">
        <MoodCard />
        <AdBanner />
      </div>

      {/* 기분별 1위 간식 */}
      <div className="px-4">
        <MoodTopStrip />
      </div>

      {/* 오늘의 이야기 */}
      <div className="px-4">
        <TodayStoriesStrip />
      </div>
    </main>
  );
}
