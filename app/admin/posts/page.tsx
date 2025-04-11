// app/admin/posts/page.tsx
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import TogglePublishButton from "@/app/ui/Buttons/TogglePublishButton";

export default async function AdminPostList() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: { tags: true, categories: true },
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Your Posts</h1>
      <Link
        href="/admin/posts/new"
        className="inline-block mb-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        + New Post
      </Link>

      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="border border-gray-200 p-4 rounded shadow-sm"
          >
            <h2 className="font-semibold text-lg">{post.title}</h2>
            <p className="text-sm text-gray-500">
              {post.published ? "✅ Published" : "❌ Draft"} •{" "}
              {new Date(post.createdAt).toLocaleDateString()}
            </p>

            <div className="mt-2 flex gap-2">
              <Link
                href={`/admin/posts/edit/${post.id}`}
                className="text-sm text-blue-600 hover:underline"
              >
                Edit
              </Link>

              <TogglePublishButton
                postId={post.id}
                published={post.published}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
