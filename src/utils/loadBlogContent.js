// src/utils/loadBlogContent.js
const modules = import.meta.glob("../content/blogs/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

export function getBlogContent(slug) {
  return modules[`../content/blogs/${slug}.md`] ?? null;
}
