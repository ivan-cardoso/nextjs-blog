import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: Request, context: { params: { id: string } }) {
  const { id } = await context.params;
  /* try {
    const body = await req.json();
    const { title, content, description, tags, categories } = body;

    const updated = await prisma.post.update({
      where: { id },
      data: {
        title,
        content,
        description,
        slug: title.toLowerCase().replace(/ /g, "-"),
        updatedAt: new Date(),
        tags: {
          // Remove all previous tags, then recreate/connect new ones
          set: [],
          connectOrCreate: tags.map((tag: string) => ({
            where: { name: tag },
            create: { name: tag },
          })),
        },
        categories: {
          set: [],
          connect: categories.map((category: string) => ({
            name: category,
          })),
        },
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating post", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  } */

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
        connect: categories.map((category: string) => ({
          name: category,
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
