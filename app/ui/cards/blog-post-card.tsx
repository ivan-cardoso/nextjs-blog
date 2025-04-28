import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AdminPost } from "@/lib/definitions";
import { format } from "date-fns";

export function BlogPostCard({ post }: { post: AdminPost }) {
  const formattedDate = format(new Date(post.createdAt), "MMMM d, yyyy");
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="rounded-md border bg-background p-4 shadow-sm hover:shadow transition flex flex-col gap-y-2"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{post.title}</h3>
      </div>
      <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
        {post.description}
      </p>
      <p className="text-sm text-muted-foreground mt-2">{formattedDate}</p>
      {/* <div className="flex items-center justify-between">
        {post.categories.map((cat) => {
          return (
            <Badge key={cat.id} variant={"default"}>
              {cat.name}
            </Badge>
          );
        })}
      </div>
      <div className="flex items-center gap-x-1">
        {post.tags.map((tag) => {
          return (
            <Badge key={tag.id} variant={"secondary"}>
              {tag.name}
            </Badge>
          );
        })}
      </div> */}
    </Link>
  );
}
