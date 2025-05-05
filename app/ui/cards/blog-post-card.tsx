import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AdminPost } from "@/lib/definitions";
import { format } from "date-fns";
import { slugify } from "@/lib/utils";

export function BlogPostCard({ post }: { post: AdminPost }) {
  const formattedDate = format(new Date(post.createdAt), "MMMM d, yyyy");
  return (
    <Link
      href={`/blog/${slugify(post.categories[0].name)}/${post.slug}`}
      className="rounded-md border bg-background p-4 shadow-sm hover:shadow transition flex flex-col gap-y-2"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{post.title}</h3>
      </div>
      <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
        {post.description}
      </p>
      <p className="text-sm text-muted-foreground mt-2">{formattedDate}</p>
    </Link>
  );
}
