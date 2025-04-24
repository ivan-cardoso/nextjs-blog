// app/blog/[slug]/page.tsx

import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug },
    include: { categories: true, tags: true },
  });

  if (!post || !post.published) {
    return notFound();
  }

  const markdown = typeof post.content === "string" ? post.content : "";
  const markdownText = `
  # React Markdown Example
  
  - Some text
  - Some other text
  
  ## Subtitle
  
  ### Additional info
  
  This is a [link](https://github.com/remarkjs/react-markdown)
  `;
  return (
    <article className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-muted-foreground mb-4">{post.description}</p>

      <div className="mt-6 text-sm text-muted-foreground">
        <p>
          Category: {post.categories.map((cat) => `#${cat.name}`).join(", ")}
        </p>
        <p>Tags: {post.tags.map((tag) => `#${tag.name}`).join(", ")}</p>
      </div>
      <div className="prose dark:prose-invert max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}
