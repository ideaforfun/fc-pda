import { VendingMachine } from "@/components/VendingMachine";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <section className="mb-10 text-center">
        <span className="inline-block rounded-full bg-snack-100 px-4 py-1 text-xs font-semibold text-snack-700">
          오늘의 탕비실 자판기
        </span>
        <h1 className="mt-4 font-display text-5xl text-snack-700 sm:text-6xl">
          기분 따라, 1위 간식
        </h1>
        <p className="mt-3 text-base text-neutral-700 sm:text-lg">
          무드 버튼 한 번이면 탕이가 오늘의 픽을 뽑아드려요.
        </p>
      </section>

      <VendingMachine />
    </main>
  );
}
