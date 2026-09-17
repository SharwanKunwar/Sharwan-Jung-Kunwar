import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function BlogPage({ slug, img, title, excerpt }) {
  return (
    <article className="flex items-center gap-4 rounded-2xl border border-black/10 bg-white/45 p-3 shadow-sm backdrop-blur-md transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-white/5">
      <img
        src={img}
        alt=""
        className="h-16 w-16 shrink-0 rounded-xl object-cover"
      />
      <div className="min-w-0 flex-1">
        <h2 className="font-semibold text-slate-800 dark:text-white">{title}</h2>
        <p className="mt-1 line-clamp-2 text-sm text-slate-600 dark:text-neutral-400">
          {excerpt}
        </p>
      </div>
      <Link
        to={`/blog/${slug}`}
        aria-label={`Read ${title}`}
        className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-indigo-600 focus-visible:outline-indigo-400 dark:bg-white dark:text-slate-900"
      >
        Read <ArrowRight size={15} />
      </Link>
    </article>
  );
}

export default BlogPage;
