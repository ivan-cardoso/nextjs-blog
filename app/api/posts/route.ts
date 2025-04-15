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

    // 🔒 Use dummy author for now
    const author = await prisma.user.findUnique({
      where: { email: "admin@example.com" },
    });

    if (!author) {
      return NextResponse.json({ error: "Author not found" }, { status: 404 });
    }

    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        description,
        slug: slugify(title), // optional: useful for your future post detail page
        authorId: author.id, // You can replace this with session.user.id later
        tags: {
          connectOrCreate: tags.map((tag: string) => ({
            where: { name: tag },
            create: { name: tag },
          })),
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
