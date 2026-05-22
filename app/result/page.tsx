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
    <main className="px-5 pb-4 pt-6">
      <Link
        href="/"
        className="mb-4 inline-block text-[13px] font-extrabold text-cocoa-600"
      >
        ← 자판기로
      </Link>
      <ResultCard mood={mood} />
    </main>
  );
}
