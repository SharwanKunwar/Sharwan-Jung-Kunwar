import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { blogs } from "../data/blogs";
import { getBlogContent } from "../utils/loadBlogContent";
import { ArrowLeft } from "lucide-react";

function BlogDetails({ isDarkMode }) {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === Number(id));

  if (!blog) {
    return (
      <div className="max-w-2xl mx-auto mt-24 text-center">
        <h1 className={isDarkMode ? "text-white" : "text-black"}>
          Blog not found
        </h1>
        <Link to="/" className="text-sm underline mt-4 inline-block">
          Back home
        </Link>
      </div>
    );
  }

  const content = getBlogContent(blog.slug);

  return (
    <div className="max-w-3xl mx-auto mt-20 mb-24 px-5">
      <Link
        to="/"
        className={`inline-flex items-center gap-1.5 text-sm mb-6 transition-colors ${
          isDarkMode
            ? "text-neutral-400 hover:text-white"
            : "text-neutral-500 hover:text-black"
        }`}
      >
        <ArrowLeft size={14} />
        Back to blogs
      </Link>

      <div className="rounded-2xl overflow-hidden mb-8 aspect-video">
        <img
          src={blog.img}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
      </div>

      <h1
        className={`text-2xl md:text-3xl font-bold tracking-tight mb-8 ${
          isDarkMode ? "text-white" : "text-neutral-900"
        }`}
      >
        {blog.title}
      </h1>

      <article
        className={`prose max-w-none ${
          isDarkMode ? "prose-invert" : ""
        }`}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {content ?? blog.excerpt}
        </ReactMarkdown>
      </article>
    </div>
  );
}

export default BlogDetails;