import { JsonValue } from "next-auth/adapters";

export type AdminPost = {
  id: string;
  title: string;
  description: string;
  slug: string;
  content: string;
  categories: Array<{ name: string; id: string }>;
  tags: Array<{ name: string; id: string }>;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
};
