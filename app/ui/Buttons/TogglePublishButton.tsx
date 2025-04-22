"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function TogglePublishButton({
  postId,
  published,
}: {
  postId: string;
  published: boolean;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const togglePublish = async () => {
    const res = await fetch(`/api/posts/${postId}/toggle`, {
      method: "POST",
    });

    if (res.ok) {
      toast.success("Post has been published");
      router.refresh();
    } else {
      toast.error("Error publishing post");
    }

    startTransition(() => {
      router.refresh(); // Refresh data after mutation
    });
  };

  return (
    <Button
      onClick={togglePublish}
      disabled={isPending}
      size="sm"
      variant="default"
      type="submit"
    >
      {published ? "Unpublish" : "Publish"}
    </Button>
  );
}
