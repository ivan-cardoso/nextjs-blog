import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const updated = await prisma.post.update({
      where: { id },
      data: { published: !post.published },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Toggle post error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
