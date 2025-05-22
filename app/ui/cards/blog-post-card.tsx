import Link from "next/link";
import { AdminPost } from "@/lib/definitions";
import { format } from "date-fns";
import { ArrowRight } from "lucide-react";
import { slugify } from "@/lib/utils";

export function BlogPostCard({ post }: { post: AdminPost }) {
  const formattedDate = format(new Date(post.createdAt), "MMMM d, yyyy");
  return (
    <div className=" border-b py-4 px-6 transition grid md:grid-cols-6 gap-y-2 md:gap-x-9 lg:gap-x-12 min-h-60 2xl:min-h-72 md:px-0 md:py-8">
      <div className="flex flex-col md:col-span-1">
        <Link
          href={`/blog/${slugify(post.categories[0].name)}`}
          className="text-sm uppercase font-semibold text-highlight tracking-wider md:mb-1 2xl:text-base"
        >
          {post.categories[0].name}
        </Link>
        <p className="text-sm 2xl:text-base text-foreground/80 tracking-wider md:mb-1">
          {formattedDate}
        </p>
      </div>

      <div className="justify-between  md:col-span-2">
        <Link
          href={`/blog/${slugify(post.categories[0].name)}/${post.slug}`}
          className="text-2xl md:text-2xl lg:text-4xl 2xl:text-5xl font-semibold uppercase hover:text-highlight"
        >
          {post.title}
        </Link>
      </div>
      <div className="md:col-span-2">
        <p className=" text-foreground line-clamp-6 2xl:text-xl 2xl:line-clamp-none">
          {post.description}
        </p>
      </div>

      <div className="md:col-span-1 ">
        <Link
          className="hover:text-highlight flex w-fit"
          href={`/blog/${slugify(post.categories[0].name)}/${post.slug}`}
        >
          <p className="text-sm uppercase font-semibold 2xl:text-base">
            Read Post
          </p>
          <ArrowRight className="ml-1.5 h-4 w-4 2xl:h-6 2xl:w-6 transition-transform duration-200 group-hover:translate-x-1 " />
        </Link>
      </div>
    </div>
  );
}
