import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: Request, context: { params: { id: string } }) {
  const { id } = await context.params;

  try {
    const body = await req.json();
    const { title, content, description, slug, published, tags, categories } =
      body;

    const dataToUpdate: any = {
      title,
      content,
      description,
      slug,
      published,
    };

    if (Array.isArray(tags)) {
      dataToUpdate.tags = {
        set: [],
        connectOrCreate: tags.map((tag: string) => ({
          where: { name: tag },
          create: { name: tag },
        })),
      };
    }

    if (Array.isArray(categories)) {
      dataToUpdate.categories = {
        set: [],
        connectOrCreate: categories.map((category: string) => ({
          where: { name: category },
          create: { name: category },
        })),
      };
    }

    const updatedPost = await prisma.post.update({
      where: { id },
      data: dataToUpdate,
    });

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error("Error updating post", error);
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}
