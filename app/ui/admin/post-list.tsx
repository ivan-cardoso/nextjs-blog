"use client";

import { Post } from "@/lib/generated/prisma";
import { PostCard } from "../cards/post-card";
import { AdminPost } from "@/lib/definitions";

export default function PostList({ posts }: { posts: AdminPost[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
