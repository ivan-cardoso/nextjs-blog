import { prisma } from "@/lib/prisma";
import { BlogPostCard } from "../ui/cards/blog-post-card";
import { Title } from "../ui/title/title";

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
    <div className="py-10 px-0 md:px-10">
      {/* <h1 className="text-5xl font-bold mb-6 text-primary uppercase font-sans">
        Latest Posts
      </h1> */}

      <Title text="Latest Posts" />

      {posts.length === 0 && (
        <p className="text-muted-foreground">No posts published yet.</p>
      )}

      <ul className="">
        {posts.map((post) => {
          return <BlogPostCard post={post} key={post.id} />;
        })}
      </ul>

      <ul className="">
        {posts.map((post) => {
          return <BlogPostCard post={post} key={post.id} />;
        })}
      </ul>

      <ul className="">
        {posts.map((post) => {
          return <BlogPostCard post={post} key={post.id} />;
        })}
      </ul>

      <ul className="">
        {posts.map((post) => {
          return <BlogPostCard post={post} key={post.id} />;
        })}
      </ul>
    </div>
  );
}
