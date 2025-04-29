// src/components/Navbar.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, Search, Github, Moon, Sun } from "lucide-react"; // Added more icons

import { cn, slugify } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle, // Import this for consistent styling if needed elsewhere
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Category } from "@/lib/generated/prisma";

// Example data for dropdown items
const components: { title: string; href: string; description: string }[] = [
  {
    title: "Sub Item 1",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content.",
  },
  {
    title: "Sub Item 2",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Sub Item 3",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task.",
  },
];

interface NavbarProps {
  categories: Category[];
}

export function Navbar({ categories }: NavbarProps) {
  // Basic theme toggle state example (you'd likely use a proper theme provider)
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    // <header className="sticky top-0 z-50 w-full border-b  border-border/40 bg-background/95  backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <header className="sticky top-0 z-50 w-full border-b  border-border/40 bg-red-400 ">
      <div className="container flex h-14 md:h-24 2xl:h-28 max-w-screen-2xl items-center px-4 md:px-28 lg:px-36">
        {/* 1) Logo */}
        <Link
          href="/blog" // Changed href to /blog as per your original code
          className="mr-6 flex items-center space-x-2 text-lg md:text-xl font-bold tracking-tight" // Adjusted text size
        >
          {/* Optional: Add an actual SVG logo here */}
          {/* <YourLogoSvg className="h-6 w-6" /> */}
          <span>Ivan Cardoso</span>
        </Link>

        {/* 2) Desktop Navigation (Middle Left) */}
        <div className="hidden md:flex flex-1">
          {" "}
          {/* Use flex-1 to push icons right */}
          <NavigationMenu>
            <NavigationMenuList>
              {/* Simple Link Item */}

              {/* Item with Dropdown */}

              {/* Another example dropdown or simple link */}
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn(
                    navigationMenuTriggerStyle(), // Use this style for consistency
                    "text-muted-foreground hover:text-foreground"
                  )}
                >
                  Categories
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    {categories.map((cat: Category) => (
                      <ListItem
                        key={cat.id}
                        title={cat.name}
                        href={`/${slugify(cat.name)}`}
                      >
                        {cat.name}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/about" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(), // Use this style for consistency
                      "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    About
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* 3) Icons (Right) */}
        <div className="hidden md:flex items-center space-x-2 ml-auto">
          {" "}
          {/* ml-auto pushes this section right */}
          <Button variant="ghost" size="icon" aria-label="Search">
            <Search className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="GitHub"
            asChild // Use asChild to make the button a link anchor
          >
            <a
              href="https://github.com/your-repo"
              target="_blank"
              rel="noreferrer"
            >
              <Github className="h-5 w-5" />
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle Theme"
            onClick={toggleTheme}
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation Trigger */}
        <div className="md:hidden ml-auto">
          {" "}
          {/* Ensure trigger is on the right on mobile */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open main menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              {" "}
              {/* Change side if needed */}
              <SheetHeader className="border-b pb-4 mb-4">
                {/* Mobile Logo/Title */}
                <SheetTitle>
                  <Link href="/blog" className="font-bold">
                    Ivan Cardoso
                  </Link>
                </SheetTitle>
                {/* Optional: Add description if needed */}
                {/* <SheetDescription>
                  Navigate the site
                </SheetDescription> */}
              </SheetHeader>
              <div className="grid gap-2 py-2">
                {" "}
                {/* Use grid for simple vertical links */}
                {/* Add SheetClose around links to close sheet on navigation */}
                <SheetClose asChild>
                  <Link
                    href="/blog"
                    className="flex w-full items-center rounded-md p-2 text-sm font-medium hover:bg-accent"
                  >
                    Home
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/about"
                    className="flex w-full items-center rounded-md p-2 text-sm font-medium hover:bg-accent"
                  >
                    About
                  </Link>
                </SheetClose>
                {/* Add other primary links here */}
                <SheetClose asChild>
                  <Link
                    href="/docs/primitives/overview" // Example link
                    className="flex w-full items-center rounded-md p-2 text-sm font-medium hover:bg-accent"
                  >
                    Components Overview
                  </Link>
                </SheetClose>
              </div>
              {/* Optional: Add mobile icons maybe in footer */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Search"
                  className="text-muted-foreground"
                >
                  <Search className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="GitHub"
                  asChild
                  className="text-muted-foreground"
                >
                  <a
                    href="https://github.com/your-repo"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Toggle Theme"
                  onClick={toggleTheme}
                  className="text-muted-foreground"
                >
                  {isDarkMode ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

// Helper component for NavigationMenu Content items (often used in Shadcn examples)
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
