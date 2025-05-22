import Link from "next/link";
import { ReactNode } from "react";
import { Navbar } from "../ui/navbar/navbar";
import { Footer } from "../ui/footer/footer";
import { prisma } from "@/lib/prisma";
import { Category } from "@/lib/generated/prisma";
import { manrope } from "../ui/fonts";

export default async function BlogLayout({
  children,
}: {
  children: ReactNode;
}) {
  const categories: Category[] = await prisma.category.findMany();
  return (
    <>
      <Navbar categories={categories} />
      <main className={`${manrope.className} w-full `}>{children}</main>
      <Footer />
    </>
  );
}
