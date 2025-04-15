import { JsonValue } from "next-auth/adapters";

export type AdminPost = {
  id: string;
  title: string;
  description: string;
  slug: string;
  content: JsonValue;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};
