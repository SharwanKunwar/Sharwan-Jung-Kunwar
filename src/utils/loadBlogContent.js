// src/utils/loadBlogContent.js
const modules = import.meta.glob("../content/blogs/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

export function getBlogContent(slug) {
  const entry = Object.entries(modules).find(([path]) =>
    path.endsWith(`${slug}.md`)
  );
  return entry ? entry[1] : null;
}