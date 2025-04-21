"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import ReactMarkdown from "react-markdown";

import { CreatableMultiSelect } from "../inputs/creatable-multiselect";

type PostFormProps = {
  initialData?: {
    id: string;
    title: string;
    description: string;
    content: string;
    category: { id: string; name: string }[];
    tags: { id: string; name: string }[];
  };
  categories: { id: string; name: string }[];
  tags: { id: string; name: string }[];
};

export function PostForm({ initialData, categories, tags }: PostFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [content, setContent] = useState(initialData?.content || "");

  const [selectedTags, setSelectedTags] = useState<string[]>(
    initialData?.tags?.map((tag) => tag.name) || []
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialData?.category?.map((cat) => cat.name) || []
  );

  const isEdit = Boolean(initialData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      title,
      description,
      content,
      tags: selectedTags,
      categories: selectedCategories,
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

  const handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = e.target.options;
    const selected: string[] = [];

    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }

    setSelectedTags(selected);
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

      <CreatableMultiSelect
        label="Categories"
        options={categories} // array of { id, name }
        selected={selectedCategories} // string[]
        setSelected={setSelectedCategories}
      />

      <CreatableMultiSelect
        label="Tags"
        options={tags} // array of { id, name }
        selected={selectedTags} // string[]
        setSelected={setSelectedTags}
      />
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
