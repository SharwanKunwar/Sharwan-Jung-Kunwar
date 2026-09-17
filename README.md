# Sharwan Jung Kunwar Portfolio

A React and Vite portfolio with a blog section powered by local Markdown files.

## Add a Markdown blog post

This project uses one **slug** to connect a blog card, its URL, and its Markdown content.

For example, this post:

```text
Slug: what-is-a-backend
URL:  /blog/what-is-a-backend
File: src/content/blogs/what-is-a-backend.md
```

Follow these steps to add another post.

### 1. Choose a unique slug

A slug is a short URL-safe name. Use lowercase letters and hyphens only.

```text
good: building-a-rest-api
avoid: Building A REST API
avoid: building_a_rest_api
```

### 2. Create the Markdown file

Create a file inside `src/content/blogs`. Its filename must exactly match the slug.

```text
src/content/blogs/building-a-rest-api.md
```

Write the post in Markdown:

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

Markdown supports headings, paragraphs, lists, links, tables, blockquotes, and fenced code blocks. The site uses `react-markdown` with GitHub-Flavored Markdown support to render it.

### 3. Add the post metadata

Open `src/data/blogs.js` and add an object to the `blogs` array. The `slug` must exactly match the Markdown filename without `.md`.

```js
{
  id: 3,
  slug: "building-a-rest-api",
  img: "/blogImage/rest-api.jpg",
  title: "Building a REST API",
  excerpt: "A practical introduction to creating a REST API.",
},
```

Place the cover image in `public/blogImage/rest-api.jpg`. Files inside `public` are referenced from the site root, so the image path begins with `/`.

### 4. How the blog flow works

```text
src/data/blogs.js
        │
        │  slug: "building-a-rest-api"
        ▼
Blog card link: /blog/building-a-rest-api
        │
        ▼
Route: blog/:slug
        │
        ▼
BlogDetails finds the matching metadata by slug
        │
        ▼
getBlogContent(slug)
        │
        ▼
src/content/blogs/building-a-rest-api.md
        │
        ▼
ReactMarkdown renders the post
```

The relevant files are:

- `src/pages/MySelf.jsx` renders every blog card from the `blogs` array.
- `src/pages/BlogPage.jsx` creates the `/blog/:slug` link.
- `src/main.jsx` defines the `blog/:slug` route.
- `src/components/BlogDetails.jsx` reads the slug from the URL and renders the post.
- `src/utils/loadBlogContent.js` loads all Markdown files from `src/content/blogs` at build time.

### 5. Test the post

Start the development server:

```bash
npm run dev
```

Open the blog section on the MySelf page, select **Read**, and confirm the URL is:

```text
/blog/building-a-rest-api
```

Then run a production build:

```bash
npm run build
```

## Troubleshooting

### The page says “Blog not found”

Check that the route uses `blog/:slug`, the card links to `blog.slug`, and the value in `src/data/blogs.js` matches the URL exactly.

### Only the excerpt appears instead of the article

The Markdown file is missing or its filename does not exactly match the slug. For a slug of `my-post`, the required file is:

```text
src/content/blogs/my-post.md
```

### Markdown looks like plain text

The typography plugin is enabled in `src/index.css`:

```css
@plugin "@tailwindcss/typography";
```

The article uses Tailwind's `prose` class in `BlogDetails.jsx`; keep both in place for styled headings, lists, and code blocks.
