export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 py-20">
      <span className="rounded-full bg-snack-100 px-4 py-1 text-sm font-semibold text-snack-700">
        v0.1.0 · 프로젝트 초기 셋업
      </span>

      <h1 className="mt-6 text-center font-display text-6xl leading-tight text-snack-700 sm:text-7xl">
        탕비실
      </h1>

      <p className="mt-4 text-center text-lg text-neutral-700 sm:text-xl">
        직장인을 위한 간식 추천 + 익명 커뮤니티
      </p>

      <div className="mt-12 grid w-full gap-4 sm:grid-cols-2">
        <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-snack-100">
          <h2 className="font-display text-2xl text-snack-600">간식 추천</h2>
          <p className="mt-2 text-sm text-neutral-600">
            오늘의 탕비실 픽, 신상 간식 큐레이션, 평점 & 리뷰.
          </p>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-snack-100">
          <h2 className="font-display text-2xl text-snack-600">익명 라운지</h2>
          <p className="mt-2 text-sm text-neutral-600">
            회사 밖에서는 못 하는 이야기, 직장인들끼리 솔직하게.
          </p>
        </section>
      </div>

      <footer className="mt-16 text-xs text-neutral-500">
        Next.js 14 · TypeScript · Tailwind CSS · Vercel
      </footer>
    </main>
  );
}
