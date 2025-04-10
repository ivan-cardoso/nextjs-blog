// app/admin/posts/new/page.tsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
// import { Select } from "@/components/ui/select";

import ReactMarkdown from "react-markdown";

export default function NewPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");

  const dummyCategories = ["Frontend", "Backend", "DevOps", "UI/UX"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        content,
        category,
        description,
        tags: tags.split(",").map((tag) => tag.trim()),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      router.push("/admin/posts");
    } else {
      alert("Failed to create post.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {/* <Input
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        /> */}

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

        {/* <Select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select a category</option>
          {dummyCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </Select> */}
        <Input
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <Textarea
          placeholder="Markdown Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
        />

        <div className="mt-4">
          <h2 className="font-semibold mb-1">Preview:</h2>
          <div className="prose dark:prose-invert max-w-none border p-4 rounded bg-muted">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </div>
        <Button type="submit">Create Post</Button>
      </form>
    </div>
  );
}
