"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import ReactMarkdown from "react-markdown";

type PostFormProps = {
  initialData?: {
    id: string;
    title: string;
    description: string;
    content: string;
    category: string;
    tags: string[];
  };
};

export function PostForm({ initialData }: PostFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [content, setContent] = useState(initialData?.content || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [tags, setTags] = useState(initialData?.tags.join(", ") || "");

  const isEdit = Boolean(initialData);

  const dummyCategories = ["Frontend", "Backend", "DevOps", "UI/UX"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      title,
      description,
      content,
      category,
      tags: tags.split(",").map((tag) => tag.trim()),
    };

    const res = await fetch(
      isEdit ? `/api/posts/${initialData?.id}/edit` : "/api/posts",
      {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    if (res.ok) {
      router.push("/admin/posts");
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label>Title</Label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <Label>Description</Label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <Label>Category</Label>
        {/* <Input value={category} onChange={(e) => setCategory(e.target.value)} /> */}

        <select
          className="w-full border rounded px-3 py-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select a category</option>
          {dummyCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Label>Tags (comma separated)</Label>
        <Input value={tags} onChange={(e) => setTags(e.target.value)} />
      </div>
      <div>
        <Label>Content (Markdown)</Label>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>

      <div className="mt-4">
        <h2 className="font-semibold mb-1">Preview:</h2>
        <div className="prose dark:prose-invert max-w-none border p-4 rounded bg-muted">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>

      <Button type="submit">{isEdit ? "Update Post" : "Create Post"}</Button>
    </form>
  );
}
