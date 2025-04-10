// app/api/posts/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, content, category, description, tags } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        // category,
        description,
        slug: slugify(title), // optional: useful for your future post detail page
        authorId: process.env.NEXTAUTH_SECRET as string, // You can replace this with session.user.id later
        tags: {
          create: tags.map((tag: string) => ({ name: tag })),
        },
        categories: {
          connect: [{ name: "Frontend" }], // assuming this category already exists
        },
      },
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("POST /api/posts error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
