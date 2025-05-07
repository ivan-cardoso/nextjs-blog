import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

import { MDXRemote } from "next-mdx-remote/rsc";
import { formattedDate, slugify } from "@/lib/utils";
import "@/app/ui/mdx.css";
import { manrope } from "@/app/ui/fonts";
import Link from "next/link";

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
    <article className={`${manrope.variable} w-full font-sans p-4 md:p-8 `}>
      <div className="border-b w-full">
        <h1
          className=" 
        font-semibold mb-4 uppercase max-w-72  text-4xl font-geist
        sm:text-5xl sm:max-w-90 md:mb-8
        md:max-w-2xl md:text-6xl
        "
        >
          {post.title}
        </h1>
      </div>
      <div className="flex flex-col md:flex-row gap-8 lg:gap-12 xl:gap-16 py-4 md:py-8">
        <aside className="md:w-60 lg:w-42 flex-shrink-0 space-y-4 h-fit">
          {post.categories && post.categories.length > 0 && (
            <div>
              <h3 className="text-xs uppercase font-semibold text-primary tracking-wider mb-1">
                Filed Under
              </h3>
              <div className="space-y-1">
                {post.categories.map((cat: any) => (
                  <Link
                    href={`/blog/${slugify(cat.name)}`}
                    key={cat.id}
                    className="block text-sm text-sky-600 dark:text-sky-400 hover:underline leading-snug"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div>
            <h3 className="text-xs uppercase font-semibold text-primary tracking-wider mb-1">
              Published
            </h3>
            <p className="text-sm text-foreground/80">
              {formattedDate(post.createdAt)}
            </p>
          </div>

          {formattedDate(post.createdAt) !== formattedDate(post.updatedAt) && (
            <div>
              <h3 className="text-xs uppercase font-semibold text-primary tracking-wider mb-1">
                Last Updated
              </h3>
              <p className="text-sm text-foreground/80">
                {formattedDate(post.updatedAt)}
              </p>
            </div>
          )}
        </aside>

        <main className="flex-1 min-w-0 prose prose-lg prose-neutral dark:prose-invert font-sans">
          <p className={`text-primary mb-4 `}>{post.description}</p>
          <MDXRemote source={post.content} />
        </main>
        {/* <aside className="md:w-30 lg:w-42 flex-shrink-0 space-y-6 md:sticky md:top-24 h-fit">
        </aside> */}
      </div>
    </article>
  );
}
