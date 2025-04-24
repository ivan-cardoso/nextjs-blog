import Link from "next/link";
import { ReactNode } from "react";

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <header className="border-b py-4 px-6">
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
      </header>
      <main className="max-w-3xl mx-auto">{children}</main>
    </div>
  );
}
