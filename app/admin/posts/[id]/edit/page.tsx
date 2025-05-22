import { prisma } from "@/lib/prisma";
import { PostForm } from "@/app/ui/admin/post-form";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await prisma.post.findUnique({
    where: { id },
    include: { tags: true, categories: true },
  });

  const categories = await prisma.category.findMany();
  const tags = await prisma.tag.findMany();

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
          category: post.categories,
          tags: post.tags,
        }}
        categories={categories}
        tags={tags}
      />
    </div>
  );
}
