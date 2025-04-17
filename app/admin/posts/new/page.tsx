// "use client";

import { PostForm } from "@/app/ui/admin/post-form";

export default function NewPostPage() {
  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">New Post</h1>
      <PostForm />
    </div>
  );
}
