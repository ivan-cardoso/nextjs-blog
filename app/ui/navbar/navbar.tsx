// src/components/Navbar.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import {
  Menu,
  Search,
  Github,
  Moon,
  Sun,
  X,
  Sparkles,
  LayoutGrid,
  User,
} from "lucide-react"; // Added more icons

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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"; // Import Accordion components
import { ScrollArea } from "@/components/ui/scroll-area";
import { Category } from "@/lib/generated/prisma";
import { manrope } from "../fonts";

interface NavbarProps {
  categories: Category[];
}

export function Navbar({ categories }: NavbarProps) {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <header className=" z-50 w-full  bg-background  px-0 md:px-10">
      {/* px-4 md:px-28 lg:px-36 */}
      {/* <header className="sticky top-0 z-50 w-full border-b  border-border/40 bg-red-400 "> */}
      <div
        className={`${manrope.className} border-b  container px-6 md:px-0 flex h-16 md:h-24 2xl:h-28 max-w-screen-2xl items-center `}
      >
        <Link
          href="/blog"
          className="mr-6 flex items-center space-x-2 text-lg md:text-xl font-bold tracking-tight font-sans" // Adjusted text size
        >
          {/* Optional: Add an actual SVG logo here */}
          {/* <YourLogoSvg className="h-6 w-6" /> */}
          <span>Ivan Cardoso</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex flex-1">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn(
                    "text-primary-text hover:text-foreground text-md hover:bg-accent/50 h-10",
                    "data-[state=open]:bg-accent/50 data-[state=open]:focus:bg-accent/50 data-[state=open]:hover:bg-accent/50"
                  )}
                >
                  Categories
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-1 border-none p-2 md:w-72 md:grid-cols-2 lg:w-72 rounded-none">
                    {categories.map((cat: Category) => (
                      <Link
                        key={cat.id}
                        href={`/blog/${slugify(cat.name)}`}
                        className="flex items-center justify-center w-full h-10 p-0 text-muted-foreground hover:bg-accent hover:text-highlight transition-transform duration-200"
                      >
                        <p className="font-bold text-center w-full uppercase p-0 m-0 line-clamp-0 text-sm   ">
                          {cat.name}
                        </p>
                      </Link>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/blog/about"
                  className={cn(
                    "w-28 text-center",
                    "text-primary-text hover:text-foreground text-md hover:bg-accent/50 ",
                    "data-[state=open]:bg-accent/50 data-[state=open]:focus:bg-accent/50 data-[state=open]:hover:bg-accent/50"
                  )}
                >
                  About
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="hidden md:flex items-center space-x-2 ml-auto">
          {" "}
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
        {/* Desktop END */}

        {/* Mobile Navigation Trigger */}
        <div
          className={`flex flex-1 items-center justify-end md:hidden ${manrope.variable}`}
        >
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open main menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent
              side="left"
              className={cn(
                "w-full max-w-sm p-0 font-sans",
                "[&>button[class*='rounded-xs']]:hidden"
              )}
            >
              <SheetClose asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-3 right-3 z-10 text-muted-foreground hover:bg-accent rounded-full"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </Button>
              </SheetClose>

              <SheetHeader className="border-b p-4">
                <SheetTitle>
                  <SheetClose asChild>
                    <Link
                      href="/blog"
                      className="font-bold text-lg flex items-center gap-2"
                    >
                      Blog
                    </Link>
                  </SheetClose>
                </SheetTitle>
              </SheetHeader>

              <ScrollArea className="h-[calc(100vh-140px)] px-4 py-4">
                <nav className="flex flex-col space-y-1">
                  <SheetClose asChild>
                    <Link
                      href="/blog"
                      className="flex items-center gap-3 rounded-md px-3 py-2 text-base font-medium text-foreground/80 hover:bg-accent hover:text-accent-foreground"
                    >
                      <Sparkles className="h-5 w-5 text-muted-foreground" />
                      <span>Latest</span>
                    </Link>
                  </SheetClose>

                  {categories && categories.length > 0 && (
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="categories" className="border-b-0">
                        <AccordionTrigger className="flex w-full items-center justify-between rounded-md px-3 py-2 text-base font-medium text-foreground/80 hover:bg-accent hover:text-accent-foreground hover:no-underline data-[state=open]:bg-accent">
                          <div className="flex items-center gap-3">
                            <LayoutGrid className="h-5 w-5 text-muted-foreground" />
                            <span>Categories</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pl-8 pr-2 pt-1 pb-0">
                          <div className="flex flex-col space-y-1">
                            {categories.map((cat) => (
                              <SheetClose asChild key={cat.id}>
                                <Link
                                  href={`/blog/${slugify(cat.name)}`}
                                  className="block rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                                >
                                  {cat.name}
                                </Link>
                              </SheetClose>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  )}

                  <SheetClose asChild>
                    <Link
                      href="/about"
                      className="flex items-center gap-3 rounded-md px-3 py-2 text-base font-medium text-foreground/80 hover:bg-accent hover:text-accent-foreground"
                    >
                      <User className="h-5 w-5 text-muted-foreground" />
                      <span>About</span>
                    </Link>
                  </SheetClose>
                </nav>
              </ScrollArea>

              {/* Footer Icons */}
              <div className="absolute bottom-0 left-0 right-0 border-t p-4 flex justify-center space-x-3 bg-background">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Search"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Search className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="GitHub"
                  asChild
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Link
                    href="https://github.com/your-github"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <Github className="h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Toggle Theme"
                  onClick={toggleTheme}
                  className="text-muted-foreground hover:text-foreground"
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
