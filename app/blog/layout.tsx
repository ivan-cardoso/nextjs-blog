import Link from "next/link";
import { ReactNode } from "react";
import { Navbar } from "../ui/navbar/navbar";
import { Footer } from "../ui/footer/footer";
import { prisma } from "@/lib/prisma";
import { Category } from "@/lib/generated/prisma";

export default async function BlogLayout({
  children,
}: {
  children: ReactNode;
}) {
  const categories: Category[] = await prisma.category.findMany();
  return (
    <>
      {/* <header className="border-b py-4 px-6">
        <nav className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/blog" className="font-bold text-lg hover:underline">
            My Blog
          </Link>
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:underline"
          >
            Back to Admin
          </Link>
        </nav>
      </header> */}
      <Navbar categories={categories} />
      <main className="max-w-3xl mx-auto">{children}</main>
      <Footer />
    </>
  );
}
