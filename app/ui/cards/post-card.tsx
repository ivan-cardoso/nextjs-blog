import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Post } from "@/lib/generated/prisma";
import Link from "next/link";
import TogglePublishButton from "../Buttons/TogglePublishButton";
import { AdminPost } from "@/lib/definitions";

export function PostCard({ post }: { post: AdminPost }) {
  return (
    <div className="rounded-md border bg-background p-4 shadow-sm hover:shadow transition">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{post.title}</h3>
        <Badge variant={post.published ? "default" : "secondary"}>
          {post.published ? "Published" : "Draft"}
        </Badge>
      </div>
      <p className="text-sm text-muted-foreground mt-2">{post.description}</p>

      <div className="mt-4 flex gap-2">
        <Link href={`/admin/posts/${post.id}/edit`}>
          <Button size="sm" variant="outline">
            Edit
          </Button>
        </Link>
        {/* <form method="POST" action={`/api/posts/${post.id}/toggle`}>
          <Button size="sm" variant="secondary" type="submit">
            {post.published ? "Unpublish" : "Publish"}
          </Button>
        </form> */}

        <TogglePublishButton postId={post.id} published={post.published} />
      </div>
    </div>
  );
}
