# How I Stopped Hardcoding My Blog Posts: Dynamic Blogs with Slugs and Markdown in React

When I started building my portfolio, the blog section looked like the easiest part. A few cards, a few articles, done. It turned out to be one of the most annoying parts, and fixing it taught me a pattern I now use everywhere.

This post covers the problem I had, the idea that fixed it, and a complete step-by-step guide so you can build the same thing, including exactly which code goes in which file.

## The problem: every blog post was a React component

My first approach was the one most beginners would take. Each post became its own JSX component:

```jsx
function WhatIsABackend() {
  return (
    <article>
      <h1>What is a Backend?</h1>
      <p>A backend is the part of an application...</p>
      <ul>
        <li>Handles data</li>
        <li>Handles logic</li>
      </ul>
    </article>
  );
}
```

It works, but it gets painful quickly:

- **Writing is slow.** Every paragraph is wrapped in tags, and one stray apostrophe or curly brace can break the build.
- **Content is tangled with code.** To fix a typo, I had to open a React file.
- **Every new post needs new code.** A new component, a new import, and a new route each time.
- **Nothing scales.** Ten posts means ten components and ten hardcoded routes.

I wanted to write blogs the way I write notes, in plain text, and let the site handle the rest.

## The idea that fixed it: slug + Markdown

One day I found a YouTube video explaining a simple pattern: **use a slug to connect a URL, a blog card, and a Markdown file.**

A slug is a short, URL-safe name for a post, like `what-is-a-backend`. That one string becomes three things:

```text
Slug: what-is-a-backend
URL:  /blog/what-is-a-backend
File: src/content/blogs/what-is-a-backend.md
```

Instead of one component per post, I now have **one page component** that reads the slug from the URL, finds the matching Markdown file, and renders it. Adding a post no longer means writing React code.

I picked the idea up, integrated it into my portfolio, and the hardcoded approach became a dynamic one.

## The project folder structure

Before any code, here is where everything lives. Only the files that matter for the blog are shown.

```text
my-portfolio/
├── public/
│   └── blogImage/
│       └── rest-api.jpg                ← cover images (served from the site root)
│
├── src/
│   ├── content/
│   │   └── blogs/
│   │       ├── what-is-a-backend.md    ← the article text (one file per post)
│   │       └── building-a-rest-api.md
│   │
│   ├── data/
│   │   └── blogs.js                    ← metadata: slug, title, image, excerpt
│   │
│   ├── utils/
│   │   └── loadBlogContent.js          ← loads all .md files, getBlogContent(slug)
│   │
│   ├── components/
│   │   └── BlogDetails.jsx             ← reads the slug, renders the Markdown
│   │
│   ├── pages/
│   │   ├── MySelf.jsx                  ← shows the blog cards from blogs.js
│   │   └── BlogPage.jsx                ← builds the /blog/:slug link
│   │
│   ├── main.jsx                        ← the blog/:slug route
│   └── index.css                       ← the typography plugin
│
└── package.json
```

The rule to remember: **content lives in `content/`, metadata lives in `data/`, and everything else is code that never changes when you add a post.**

## Which code goes in which file

| Step | What you write | File |
|------|----------------|------|
| 1 | The article in Markdown | `src/content/blogs/<slug>.md` |
| 2 | The post's metadata object | `src/data/blogs.js` |
| 3 | The cover image | `public/blogImage/<name>.jpg` |
| 4 | The Markdown loader (`getBlogContent`) | `src/utils/loadBlogContent.js` |
| 5 | The single dynamic route | `src/main.jsx` |
| 6 | The card link to each post | `src/pages/BlogPage.jsx` |
| 7 | The page that renders the article | `src/components/BlogDetails.jsx` |
| 8 | The typography plugin | `src/index.css` |

Steps 1 to 3 are the only ones you repeat for every new post. Steps 4 to 8 are set up once and then left alone.

## Before you start: install the packages

The blog renders Markdown with `react-markdown` and GitHub-style extras from `remark-gfm`. Styling comes from Tailwind's typography plugin.

```bash
npm install react-markdown remark-gfm
npm install -D @tailwindcss/typography
```

## Step-by-step guide

### Step 1: Choose a unique slug and write the Markdown file

A slug uses lowercase letters and hyphens only.

```text
good:  building-a-rest-api
avoid: Building A REST API
avoid: building_a_rest_api
```

Create the file in `src/content/blogs/`. Its name **must exactly match** the slug.

```text
src/content/blogs/building-a-rest-api.md
```

Then just write the post in Markdown:

````md
# Building a REST API

This is the introduction to my post.

## What you will learn

- Routes and HTTP methods
- Request validation
- Error handling

```js
app.get("/api/posts", getPosts);
```
````

Headings, paragraphs, lists, links, tables, blockquotes, and fenced code blocks all work. No JSX, no closing tags.

### Step 2: Add the post's metadata

The blog card needs a title, an image, and a short excerpt. All of that lives in one array.

**File:** `src/data/blogs.js`

```js
export const blogs = [
  // ...existing posts
  {
    id: 3,
    slug: "building-a-rest-api",
    img: "/blogImage/rest-api.jpg",
    title: "Building a REST API",
    excerpt: "A practical introduction to creating a REST API.",
  },
];
```

The `slug` must match the Markdown filename without `.md`.

### Step 3: Add the cover image

**File:** `public/blogImage/rest-api.jpg`

Everything inside `public` is served from the site root, so in the metadata the image path starts with `/`, not with `public`.

### Step 4: Load all Markdown files at build time

This helper returns the Markdown text for any slug. With Vite, you import every file in the folder as raw text.

**File:** `src/utils/loadBlogContent.js`

```js
const files = import.meta.glob("../content/blogs/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

export function getBlogContent(slug) {
  return files[`../content/blogs/${slug}.md`];
}
```

Vite bundles all the Markdown files when the site builds, so you need no server and no database.

### Step 5: Add one dynamic route

This single route replaces all the hardcoded ones.

**File:** `src/main.jsx`

```jsx
{ path: "blog/:slug", element: <BlogDetails /> }
```

The `:slug` part is a placeholder. Whether the URL is `/blog/what-is-a-backend` or `/blog/building-a-rest-api`, the same component runs.

### Step 6: Link each blog card to its post

**File:** `src/pages/BlogPage.jsx`

```jsx
<Link to={`/blog/${blog.slug}`}>Read</Link>
```

The card list itself is rendered in `src/pages/MySelf.jsx`, which loops over the `blogs` array. Add a post to the array and a new card appears automatically.

### Step 7: Render the article

This component reads the slug from the URL, finds the metadata, loads the Markdown, and renders it.

**File:** `src/components/BlogDetails.jsx`

```jsx
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { blogs } from "../data/blogs";
import { getBlogContent } from "../utils/loadBlogContent";

export default function BlogDetails() {
  const { slug } = useParams();
  const blog = blogs.find((b) => b.slug === slug);
  const content = getBlogContent(slug);

  if (!blog || !content) return <p>Blog not found</p>;

  return (
    <article className="prose">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </article>
  );
}
```

### Step 8: Enable the typography plugin

Markdown renders as plain, unstyled HTML by default. Tailwind's typography plugin, together with the `prose` class from Step 7, styles headings, lists, and code blocks for you.

**File:** `src/index.css`

```css
@plugin "@tailwindcss/typography";
```

## How the whole flow works

```text
src/data/blogs.js
        │  slug: "building-a-rest-api"
        ▼
Blog card link: /blog/building-a-rest-api
        │
        ▼
Route: blog/:slug  (src/main.jsx)
        │
        ▼
BlogDetails finds the matching metadata by slug
        │
        ▼
getBlogContent(slug)  (src/utils/loadBlogContent.js)
        │
        ▼
src/content/blogs/building-a-rest-api.md
        │
        ▼
ReactMarkdown renders the post
```

## Add a new post in two minutes

Once the setup is done, publishing a new post looks like this:

1. Pick a slug, for example `my-new-post`.
2. Create `src/content/blogs/my-new-post.md` and write the article.
3. Add a metadata object with the same slug to `src/data/blogs.js`.
4. Drop the cover image into `public/blogImage/`.

That's it. No new component, no new route, no new import.

## Test it

Start the dev server:

```bash
npm run dev
```

Open the blog section, click **Read**, and confirm the URL looks like this:

```text
/blog/building-a-rest-api
```

Then run a production build, because that is where missing files show up:

```bash
npm run build
```

## Troubleshooting

### The page says "Blog not found"

The slug in `src/data/blogs.js` doesn't match the URL. Check that the route is `blog/:slug`, that the card links to `blog.slug`, and that the spelling matches character for character.

### Only the excerpt appears instead of the article

The Markdown file is missing or misnamed. For a slug of `my-post`, the required file is:

```text
src/content/blogs/my-post.md
```

### Markdown looks like plain text

The typography plugin or the `prose` class is missing. Check that `src/index.css` has the `@plugin "@tailwindcss/typography";` line, and that `BlogDetails.jsx` wraps the article in `className="prose"`. You need both.

### The cover image doesn't load

Image paths for files in `public` must start with `/`, for example `/blogImage/rest-api.jpg`. Also check that the filename and its capitalization match exactly.

## What this changed for me

- **Writing feels natural.** I open a `.md` file and write, with no JSX in the way.
- **Adding a post takes minutes.** One Markdown file, one metadata object, one image.
- **Content and code are separate.** Fixing a typo never touches a component.
- **It scales.** Ten posts or a hundred, the code stays the same.
- **It's portable.** Markdown files can move to any other framework or platform later.

## The bigger lesson

The biggest takeaway wasn't about blogs. When you catch yourself copying a component for every new item, stop and ask: **can the data drive the page instead of the code?**

One dynamic route plus a good identifier, like a slug, replaced a whole pile of hardcoded files. The same pattern works for projects, case studies, product pages, and documentation.

If your portfolio blog is still made of hand-written components, try this. Your future self, with a new idea and five minutes to write it down, will be glad you did.