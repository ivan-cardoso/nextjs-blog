// app/blog/page.tsx

import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: {
      categories: true,
      tags: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Latest Posts</h1>

      {posts.length === 0 && (
        <p className="text-muted-foreground">No posts published yet.</p>
      )}

      <ul className="space-y-6">
        {posts.map((post) => (
          <li key={post.id} className="border-b pb-4">
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-xl font-semibold hover:underline">
                {post.title}
              </h2>
            </Link>
            <p className="text-muted-foreground text-sm">{post.description}</p>

            <div className="flex flex-wrap mt-2 text-xs text-muted-foreground">
              {post.categories &&
                post.categories.map((category) => {
                  return (
                    <span key={category.id} className="mr-2 italic">
                      #{category.name}
                    </span>
                  );
                })}
              {post.tags.map((tag) => (
                <span key={tag.id} className="mr-2">
                  #{tag.name}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
