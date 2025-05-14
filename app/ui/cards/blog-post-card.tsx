import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AdminPost } from "@/lib/definitions";
import { format } from "date-fns";
import { ArrowRight } from "lucide-react"; // For the "Read Post" arrow
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

/* {
  <Link
    href={`/blog/${post.slug}`} // Adjust path as needed
    className="group block w-full transition-all duration-300 ease-in-out hover:scale-[1.015]"
    aria-label={`Read more about ${post.title}`}
  >
    <article className="bg-white dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700/80 rounded-xl shadow-sm hover:shadow-lg dark:hover:shadow-zinc-700/30 transition-shadow duration-300 ease-in-out overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="hidden md:flex flex-col items-center justify-center w-32 lg:w-36 p-4 lg:p-5 border-r border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 flex-shrink-0">
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-sky-600 dark:text-sky-400">
              20
            </div>
            <div className="text-xs lg:text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider mt-0.5">
              2025
            </div>
          </div>
          {post.categories && post.categories.length > 0 && (
            <div className="mt-3 text-center">
              {post.categories.slice(0, 2).map(
                (
                  category // Show max 2 categories here
                ) => (
                  <span
                    key={category.id}
                    className="block text-[11px] lg:text-xs text-muted-foreground dark:text-zinc-400 leading-tight truncate"
                  >
                    {category.name}
                  </span>
                )
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col p-5 md:p-6 lg:p-8 flex-1 min-w-0">
          {post.categories && post.categories.length > 0 && (
            <div className="mb-2 md:hidden">
              <p className="text-xs font-semibold uppercase text-sky-600 dark:text-sky-400 tracking-wider">
                {post.categories.map((cat) => cat.name).join(", ")}
              </p>
            </div>
          )}
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 leading-tight group-hover:text-sky-700 dark:group-hover:text-sky-500 transition-colors duration-200">
            {post.title}
          </h2>
          <div className="mt-1 mb-3 md:hidden">
            <time
              dateTime={post.createdAt.toDateString()}
              className="text-sm text-gray-500 dark:text-gray-400"
            >
              {post.createdAt.toDateString()}
            </time>
          </div>
          {post.description && (
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3 mt-2 md:mt-3 flex-grow">
              {post.description}
            </p>
          )}
          <div className="mt-4 md:mt-5 pt-2 text-sm font-semibold text-sky-600 dark:text-sky-400 flex items-center group-hover:underline">
            Read Post
            <ArrowRight className="ml-1.5 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </article>
  </Link>;
} */
