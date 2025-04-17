// "use client";

import { PostForm } from "@/app/ui/admin/post-form";
import { prisma } from "@/lib/prisma";

export default async function NewPostPage() {
  const categories = await prisma.category.findMany();
  const tags = await prisma.tag.findMany();
  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">New Post</h1>
      <PostForm categories={categories} tags={tags} />
    </div>
  );
}
