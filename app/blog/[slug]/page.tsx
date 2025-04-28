import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

import { MDXRemote } from "next-mdx-remote/rsc";
import { formattedDate } from "@/lib/utils";
import "@/app/ui/mdx.css";
import { manrope } from "@/app/ui/fonts";

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
    <article
      className={`${manrope.variable} font-sans max-w-3xl mx-auto py-16 px-4 prose prose-lg prose-neutral dark:prose-invert`}
    >
      <h1 className="text-4xl font-semibold mb-4">{post.title}</h1>
      <p className="text-muted-foreground mb-4">{post.description}</p>

      <div className="mt-6 prose prose-lg  prose-neutral dark:prose-invert">
        <p className="italic">
          Filed under{" "}
          {post.categories.map((cat) => (
            <span key={cat.id} className="font-bold not-italic">
              {" "}
              {cat.name}{" "}
            </span>
          ))}
          on{" "}
          <span className="font-bold not-italic">
            {formattedDate(post.createdAt)}
            {". "}
          </span>
        </p>
        {formattedDate(post.createdAt) !== formattedDate(post.updatedAt) && (
          <p>
            Last updated on{" "}
            <span className="font-bold not-italic">
              {formattedDate(post.updatedAt)}
            </span>
          </p>
        )}

        {/* <p>Tags: {post.tags.map((tag) => `#${tag.name}`).join(", ")}</p> */}
      </div>
      <div className={`${manrope.variable} font-sans max-w-3xl mx-auto `}>
        <MDXRemote source={post.content} />
      </div>
    </article>
  );
}
