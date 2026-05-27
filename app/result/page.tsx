import Link from "next/link";
import { redirect } from "next/navigation";
import { ResultCard } from "@/components/ResultCard";
import { getMoodById } from "@/lib/data";

export const metadata = {
  title: "오늘의 픽 · 탕비실",
};

type Props = {
  searchParams: { mood?: string };
};

export default function ResultPage({ searchParams }: Props) {
  const mood = getMoodById(searchParams.mood ?? "");
  if (!mood) {
    redirect("/");
  }

  return (
    <main className="px-5 pb-4 pt-10">
      <Link
        href="/"
        className="mb-5 inline-flex items-center gap-1 text-sm font-bold text-ink-400 transition hover:text-ink-600"
      >
        ← 자판기로
      </Link>
      <ResultCard mood={mood} />
    </main>
  );
}
