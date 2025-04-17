// app/admin/posts/page.tsx
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import TogglePublishButton from "@/app/ui/Buttons/TogglePublishButton";
import PostList from "@/app/ui/admin/post-list";
import { Post } from "@/lib/generated/prisma";
import { AdminPost } from "@/lib/definitions";

export default async function AdminPostList() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: { tags: true, categories: true },
  });

  const formattedPosts: AdminPost[] = posts.map((post) => ({
    id: post.id,
    title: post.title,
    description: post.description,
    slug: post.slug,
    content: post.content,
    published: post.published,
    categories: post.categories,
    tags: post.tags,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
  }));

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Posts</h1>
      <PostList posts={formattedPosts} />
      {/* {console.log(posts)} */}
    </div>
  );
}
