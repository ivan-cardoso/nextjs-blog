import { prisma } from "@/lib/prisma";
import { PostForm } from "@/app/ui/admin/post-form";

export default async function EditPostPage(context: {
  params: { id: string };
}) {
  const { id } = await context.params;
  const post = await prisma.post.findUnique({
    where: { id },
    include: { tags: true, categories: true },
  });

  if (!post) return <div>Post not found</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Post</h1>
      <PostForm
        initialData={{
          id: post.id,
          title: post.title,
          description: post.description,
          content: post.content as string,
          category: post.categories[0]?.name || "",
          tags: post.tags.map((tag) => tag.name),
        }}
      />
    </div>
  );
}
