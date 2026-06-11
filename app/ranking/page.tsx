import { RankingList } from "@/components/RankingList";

export const metadata = {
  title: "기분 랭킹 · 탕비실",
};

export default function RankingPage() {
  return (
    <main className="pb-28">
      <RankingList />
    </main>
  );
}
