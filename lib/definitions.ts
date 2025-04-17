import { JsonValue } from "next-auth/adapters";

export type AdminPost = {
  id: string;
  title: string;
  description: string;
  slug: string;
  content: JsonValue;
  categories: Array<{ name: string; id: string }>;
  tags: Array<{ name: string; id: string }>;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};
