"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

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
    await fetch(`/api/posts/${postId}/toggle`, {
      method: "POST",
    });

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
