import Link from "next/link";
import { ReactNode } from "react";
import { Navbar } from "../ui/navbar/navbar";
import { Footer } from "../ui/footer/footer";

export default function BlogLayout({ children }: { children: ReactNode }) {
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
      <Navbar />
      <main className="max-w-3xl mx-auto">{children}</main>
      <Footer />
    </>
  );
}
