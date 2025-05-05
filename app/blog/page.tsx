import { prisma } from "@/lib/prisma";
import { BlogPostCard } from "../ui/cards/blog-post-card";

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
    <div className="max-w-3xl mx-auto py-10 px-4 ">
      <h1 className="text-5xl font-bold mb-6 text-primary uppercase font-sans">
        Latest Posts
      </h1>

      {posts.length === 0 && (
        <p className="text-muted-foreground">No posts published yet.</p>
      )}

      <ul className="space-y-6">
        {posts.map((post) => {
          return <BlogPostCard post={post} key={post.id} />;
        })}
      </ul>
    </div>
  );
}
