import { FeedPostCard } from "@/components/FeedPostCard";
import { TangiMascot } from "@/components/TangiMascot";
import { feedPosts } from "@/lib/data";

export const metadata = {
  title: "익명 피드 · 탕비실",
  description: "탕비실에서만 할 수 있는 직장인들의 솔직한 이야기.",
};

export default function FeedPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-10">
      <section className="mb-8 flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-snack-100">
        <TangiMascot size={72} mood="sleepy" />
        <div>
          <h1 className="font-display text-3xl text-snack-700">익명 라운지</h1>
          <p className="mt-1 text-sm text-neutral-600">
            여기서는 다 익명이에요. 부장님 흉도, 다이어트 실패담도 자유롭게.
          </p>
        </div>
      </section>

      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm font-semibold text-neutral-700">
          최근 글 {feedPosts.length}개
        </p>
        <button
          type="button"
          className="rounded-full bg-snack-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-snack-600"
        >
          + 익명 글쓰기
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {feedPosts.map((post) => (
          <FeedPostCard key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
}
