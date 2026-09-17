import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function BlogPage({ slug, img, title, excerpt }) {
  return (
    <article
      className="
        group relative flex h-full flex-col overflow-hidden rounded-3xl
        border border-white/50 bg-white/35 p-3
        shadow-[0_10px_35px_rgba(15,23,42,0.10)]
        backdrop-blur-2xl backdrop-saturate-150
        transition-all duration-500
        hover:-translate-y-1 hover:border-white/70 hover:bg-white/50
        hover:shadow-[0_20px_50px_rgba(15,23,42,0.16)]
        dark:border-white/10 dark:bg-white/[0.06]
        dark:shadow-[0_10px_35px_rgba(0,0,0,0.25)]
        dark:hover:border-white/20 dark:hover:bg-white/[0.10]
      "
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent dark:via-white/20" />
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-white/35 via-transparent to-white/5 dark:from-white/[0.06] dark:to-transparent" />

      <div className="relative aspect-[16/9] overflow-hidden rounded-2xl ring-1 ring-white/60 dark:ring-white/10">
        <img
          src={img}
          alt=""
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-white/10" />
      </div>

      <div className="relative flex flex-1 flex-col px-2 pb-2 pt-5">
        <h2 className="text-lg font-semibold leading-snug text-slate-800 dark:text-white">{title}</h2>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-neutral-400">
          {excerpt}
        </p>

        <Link
          to={`/blog/${slug}`}
          aria-label={`Read ${title}`}
          className="
            mt-5 inline-flex w-fit items-center gap-1.5 rounded-xl px-3 py-2
            text-sm font-semibold text-slate-800 transition
            hover:bg-white/60 hover:text-indigo-600 focus-visible:outline-indigo-400
            dark:text-white dark:hover:bg-white/10 dark:hover:text-indigo-300
          "
        >
          Read article <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}

export default BlogPage;
