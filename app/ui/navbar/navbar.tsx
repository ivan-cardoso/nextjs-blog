// src/components/Navbar.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, Search, Github, Moon, Sun, X } from "lucide-react"; // Added more icons

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
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
      <div
        className={`${manrope.className} border-b px-6 md:px-0 flex h-16 md:h-24 2xl:h-28  items-center `}
      >
        <Link
          href="/blog"
          className="mr-6 flex items-center space-x-2 text-lg md:text-xl 2xl:text-2xl font-bold tracking-tight hover:text-highlight"
        >
          <span>Ivan Cardoso</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex flex-1">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn(
                    "text-primary-text text-sm 2xl:text-base 3xl:text-lg font-semibold hover:bg-background hover:text-highlight h-10 uppercase",
                    "data-[state=open]:bg-background data-[state=open]:focus:bg-background data-[state=open]:hover:bg-background",
                    "data-[state=open]:text-highlight data-[state=open]:focus:text-highlight data-[state=open]:hover:text-highlight"
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
                        <p className="font-bold text-center w-full uppercase p-0 m-0 line-clamp-0 text-sm 2xl:text-base 3xl:text-lg   ">
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
                    "text-primary-text  text-sm 2xl:text-base 3xl:text-lg font-semibold hover:bg-background hover:text-highlight uppercase",
                    "data-[state=open]:bg-none data-[state=open]:focus:bg-none data-[state=open]:hover:bg-none"
                  )}
                >
                  About
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="hidden md:flex items-center space-x-5 ml-auto">
          {/* FILTER FUNCTIONALITY */}
          {/* <Button variant="ghost" size="icon" aria-label="Search">
            <Search className="h-5 w-5" />
          </Button> */}
          <Link
            href="https://linkedin.com/in/ivan--cardoso"
            target="_blank"
            rel="noreferrer"
            className={cn(
              "text-primary-text text-sm 2xl:text-base 3xl:text-lg  hover:text-highlight uppercase"
            )}
          >
            LinkedIn
          </Link>
          <Link
            href="https://ivancardoso.vercel.app"
            target="_blank"
            rel="noreferrer"
            className={cn(
              "text-primary-text text-sm 2xl:text-base 3xl:text-lg  hover:text-highlight uppercase"
            )}
          >
            Portfolio
          </Link>

          <Link
            href="https://github.com/ivan-cardoso"
            target="_blank"
            rel="noreferrer"
            className={cn(
              "text-primary-text text-sm 2xl:text-base 3xl:text-lg  hover:text-highlight uppercase"
            )}
          >
            GitHub
          </Link>

          {/* CHANGE THEME */}
          {/* <Button
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
          </Button> */}
        </div>
        {/* Desktop END */}

        {/* Mobile Navigation Trigger */}
        <div className={`flex flex-1 items-center justify-end md:hidden `}>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-0">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open main menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent
              side="left"
              className={cn(
                "w-full p-0 font-geist",
                "[&>button[class*='rounded-xs']]:hidden",
                "border-r-0"
              )}
            >
              <SheetClose asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-3 right-3 z-10 text-muted-foreground hover:bg-accent rounded-full mr-2"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </Button>
              </SheetClose>

              <SheetHeader className="border-b px-6">
                <SheetTitle>
                  <SheetClose asChild>
                    <Link
                      href="/blog"
                      className="font-semibold text-lg flex items-center gap-2 font-sans"
                    >
                      Ivan Cardoso
                    </Link>
                  </SheetClose>
                </SheetTitle>
              </SheetHeader>

              <ScrollArea className="h-[calc(100vh-140px)] px-4 py-4">
                <nav className="flex flex-col">
                  <SheetClose asChild>
                    <Link
                      href="/blog"
                      className="flex items-center gap-3 uppercase rounded-md px-3 py-1 text-2xl font-medium text-foreground/80 hover:bg-accent hover:text-accent-foreground"
                    >
                      {/* <Sparkles className="h-5 w-5 text-muted-foreground" /> */}
                      Latest
                    </Link>
                  </SheetClose>

                  {categories && categories.length > 0 && (
                    <>
                      {categories.map((cat) => (
                        <SheetClose asChild key={cat.id}>
                          <Link
                            href={`/blog/${slugify(cat.name)}`}
                            className="flex items-center gap-3 uppercase rounded-md px-3 py-1 text-2xl font-medium text-foreground/80 hover:bg-accent hover:text-accent-foreground"
                          >
                            {cat.name}
                          </Link>
                        </SheetClose>
                      ))}
                    </>
                  )}

                  <SheetClose asChild>
                    <Link
                      href="/blog/about"
                      className="flex items-center gap-3 uppercase rounded-md px-3 py-1 text-2xl font-medium text-foreground/80 hover:bg-accent hover:text-accent-foreground"
                    >
                      About
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
