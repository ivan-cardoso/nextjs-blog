"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import ReactMarkdown from "react-markdown";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
  CommandEmpty,
  CommandGroup,
} from "@/components/ui/command";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils"; // used for conditional classes

type PostFormProps = {
  initialData?: {
    id: string;
    title: string;
    description: string;
    content: string;
    category: { id: string; name: string };
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

  // Category is stored as just the ID (string)
  const [category, setCategory] = useState(initialData?.category?.id || "");

  // Tags are stored as an array of strings (tag names)
  /* const [selectedTags, setSelectedTags] = useState<string[]>(
    initialData?.tags?.map((tag) => tag.name) || []
  ); */

  // Inside your PostForm component
  const [selectedTags, setSelectedTags] = useState<string[]>(
    initialData?.tags?.map((tag) => tag.name) || []
  );
  const [open, setOpen] = useState(false);

  const isEdit = Boolean(initialData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      title,
      description,
      content,
      category,
      tags: selectedTags,
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
      <div>
        <Label>Category</Label>
        <select
          className="w-full border rounded px-3 py-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      {/* <div>
        <Label>Tags (hold Ctrl or Cmd to select multiple)</Label>
        <select
          multiple
          value={selectedTags}
          onChange={handleTagChange}
          className="w-full border rounded px-3 py-2 h-32"
        >
          {tags.map((tag) => (
            <option key={tag.id} value={tag.name}>
              {tag.name}
            </option>
          ))}
        </select>
      </div> */}

      <div>
        <Label>Tags</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className="w-full justify-between"
            >
              {selectedTags.length > 0
                ? `${selectedTags.length} tag${
                    selectedTags.length > 1 ? "s" : ""
                  } selected`
                : "Select tags"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Search tags..." />
              <CommandList>
                <CommandEmpty>No tags found.</CommandEmpty>
                <CommandGroup>
                  {tags.map((tag) => {
                    const isSelected = selectedTags.includes(tag.name);
                    return (
                      <CommandItem
                        key={tag.id}
                        onSelect={() => {
                          setSelectedTags((prev) =>
                            isSelected
                              ? prev.filter((t) => t !== tag.name)
                              : [...prev, tag.name]
                          );
                        }}
                      >
                        <Checkbox checked={isSelected} className="mr-2" />
                        {tag.name}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
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
