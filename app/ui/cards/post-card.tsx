import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import TogglePublishButton from "../Buttons/TogglePublishButton";
import { AdminPost } from "@/lib/definitions";
import { useRouter } from "next/navigation";

export function PostCard({ post }: { post: AdminPost }) {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/posts/${id}/delete`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.refresh();
    } else {
      console.error("Failed to delete post");
    }
  };
  return (
    <div className="rounded-md border bg-background p-4 shadow-sm hover:shadow transition">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{post.title}</h3>
        <Badge variant={post.published ? "default" : "secondary"}>
          {post.published ? "Published" : "Draft"}
        </Badge>
      </div>
      <p className="text-sm text-muted-foreground mt-2">{post.description}</p>

      <div className="mt-4 flex gap-2 justify-between">
        <span>
          <Link href={`/admin/posts/${post.id}/edit`}>
            <Button size="sm" variant="outline">
              📝 Edit
            </Button>
          </Link>
          <TogglePublishButton postId={post.id} published={post.published} />
        </span>

        <Button
          size="sm"
          variant="default"
          onClick={() => handleDelete(post.id)}
          className="bg-red-500 text-white hover:underline"
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
