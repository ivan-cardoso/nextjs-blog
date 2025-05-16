import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

import { MDXRemote } from "next-mdx-remote/rsc";
import { formattedDate, slugify } from "@/lib/utils";
import "@/app/ui/mdx.css";
import { manrope } from "@/app/ui/fonts";
import Link from "next/link";
import { Title } from "@/app/ui/title/title";

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug },
    include: { categories: true, tags: true },
  });

  if (!post || !post.published) {
    return notFound();
  }

  return (
    <article className={`w-full pb-10  md:px-10`}>
      <Title text={post.title} />
      <div
        className="
      grid grid-cols-6 
      gap-6 lg:gap-12 py-6 md:py-8"
      >
        <aside
          className="
          col-span-6 md:col-span-1
          px-6 md:px-0
          mt-1 flex-shrink-0 space-y-4 h-fit"
        >
          {post.categories && post.categories.length > 0 && (
            <div>
              <h3 className="text-sm 2xl:text-base uppercase font-semibold text-primary tracking-wider mb-1">
                Filed Under
              </h3>
              <div className="space-y-1">
                {post.categories.map((cat: any) => (
                  <Link
                    href={`/blog/${slugify(cat.name)}`}
                    key={cat.id}
                    className="text-sm uppercase font-semibold text-highlight tracking-wider md:mb-1 2xl:text-base"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div>
            <h3 className="text-sm 2xl:text-base uppercase font-semibold text-primary tracking-wider mb-1">
              Published
            </h3>
            <p className="text-sm 2xl:text-base text-foreground/80">
              {formattedDate(post.createdAt)}
            </p>
          </div>

          {formattedDate(post.createdAt) !== formattedDate(post.updatedAt) && (
            <div>
              <h3 className="text-sm 2xl:text-base uppercase font-semibold text-primary tracking-wider mb-1">
                Last Updated
              </h3>
              <p className="text-sm 2xl:text-base text-foreground/80">
                {formattedDate(post.updatedAt)}
              </p>
            </div>
          )}
        </aside>

        <main
          className="
          px-6 md:px-0
          col-span-6 md:col-span-4
          prose md:prose-lg max-w-full 
          2xl:prose-2xl prose-neutral dark:prose-invert "
        >
          <p className={`text-primary mb-4 font-medium leading-normal`}>
            {post.description}
          </p>
          <MDXRemote source={post.content} />
        </main>
        {/* <aside className="md:w-30 lg:w-42 flex-shrink-0 space-y-6 md:sticky md:top-24 h-fit">
        </aside> */}
      </div>
    </article>
  );
}
