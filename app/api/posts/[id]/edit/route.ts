import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, context: { params: { id: string } }) {
  const { id } = await context.params;
  try {
    const body = await req.json();
    const { title, content, description } = body;

    const updated = await prisma.post.update({
      where: { id },
      data: {
        title,
        content,
        description,
        slug: title.toLowerCase().replace(/ /g, "-"),
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating post", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
