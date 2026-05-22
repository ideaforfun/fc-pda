import type { FeedPost } from "@/lib/data";

type Props = {
  post: FeedPost;
};

export function FeedPostCard({ post }: Props) {
  return (
    <article className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-snack-100 transition hover:shadow-md">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-snack-100 text-xl">
            {post.avatar}
          </div>
          <div>
            <p className="text-sm font-semibold text-neutral-800">
              {post.nickname}
            </p>
            <p className="text-xs text-neutral-500">{post.createdAt}</p>
          </div>
        </div>
        {post.tag && (
          <span className="rounded-full bg-snack-100 px-3 py-1 text-xs font-semibold text-snack-700">
            #{post.tag}
          </span>
        )}
      </header>

      <p className="mt-3 whitespace-pre-line text-[15px] leading-relaxed text-neutral-800">
        {post.content}
      </p>

      <footer className="mt-4 flex items-center gap-4 text-sm text-neutral-500">
        <span className="flex items-center gap-1">
          <span aria-hidden>❤️</span> {post.likes}
        </span>
        <span className="flex items-center gap-1">
          <span aria-hidden>💬</span> {post.comments}
        </span>
      </footer>
    </article>
  );
}
