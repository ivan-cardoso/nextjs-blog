// components/admin/sidebar.tsx
"use client";

import Link from "next/link";
import { Home, FileText, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: Home },
  { href: "/admin/posts", label: "Posts", icon: FileText },
  { href: "/admin/posts/new", label: "New Post", icon: Plus },
];

export default function Sidebar() {
  return (
    <aside className="w-64 border-r bg-background">
      <div className="p-6 font-semibold text-lg">Admin</div>
      <nav className="space-y-1 px-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted transition-colors"
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
