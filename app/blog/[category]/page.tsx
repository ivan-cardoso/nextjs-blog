import { slugify } from "@/lib/utils";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { BlogPostCard } from "@/app/ui/cards/blog-post-card";
import { Title } from "@/app/ui/title/title";

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;

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
    <div className="w-full font-sans p-4 md:p-8">
      <Title text={`Posts in ${matchedCategory.name}`} />

      <div className="flex flex-col md:flex-row gap-8 lg:gap-12 xl:gap-16 py-4 md:py-8">
        <ul className="space-y-8 ">
          {posts.map((post) => {
            return <BlogPostCard post={post} key={post.id} />;
          })}
          {posts.map((post) => {
            return <BlogPostCard post={post} key={post.id} />;
          })}
        </ul>
        {posts.length === 0 && (
          <p className="text-muted-foreground">
            No posts available in this category yet.
          </p>
        )}
      </div>
    </div>
  );
}
