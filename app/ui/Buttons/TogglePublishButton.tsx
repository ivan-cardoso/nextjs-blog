"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

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
    <button
      onClick={togglePublish}
      disabled={isPending}
      className="text-sm text-green-600 hover:underline"
    >
      {published ? "Unpublish" : "Publish"}
    </button>
  );
}
