import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(_: Request, context: { params: { id: string } }) {
  const { id } = await context.params;

  try {
    const deleted = await prisma.post.delete({
      where: { id },
    });

    return NextResponse.json(deleted);
  } catch (error) {
    console.error("Error deleting post", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
