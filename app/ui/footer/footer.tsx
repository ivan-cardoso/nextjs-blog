import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t mt-16">
      <div className="max-w-5xl mx-auto py-8 px-4 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} YourBlogName. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/about" className="hover:underline">
            About
          </Link>
          {/* Future: maybe GitHub, Twitter links */}
        </div>
      </div>
    </footer>
  );
}
