import { slugify } from "@/lib/utils";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { BlogPostCard } from "@/app/ui/cards/blog-post-card";

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = params;

  const categories = await prisma.category.findMany();

  const matchedCategory = categories.find(
    (cat) => slugify(cat.name) === categorySlug
  );

  if (!matchedCategory) {
    notFound();
  }

  const posts = await prisma.post.findMany({
    where: {
      categories: {
        some: {
          id: matchedCategory.id,
        },
      },
      published: true,
    },
    include: {
      categories: true,
      tags: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="py-10 px-4 ">
      <h1 className="text-5xl font-bold mb-6 text-primary uppercase font-sans">
        Posts in <span className="text-primary">{matchedCategory.name}</span>
      </h1>

      {posts.length === 0 && (
        <p className="text-muted-foreground">
          No posts available in this category yet.
        </p>
      )}

      <ul className="space-y-6">
        {posts.map((post) => {
          return <BlogPostCard post={post} key={post.id} />;
        })}
      </ul>
    </div>
  );
}
