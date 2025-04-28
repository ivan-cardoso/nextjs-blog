"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="border-b sticky top-0 bg-background z-50">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-4">
        {/* Logo */}
        <Link href="/blog" className="text-2xl font-bold tracking-tight">
          Ivan Cardoso
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="flex space-x-6">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/blog"
                  className={cn(
                    "text-muted-foreground hover:text-foreground transition-colors"
                  )}
                >
                  Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/about"
                  className={cn(
                    "text-muted-foreground hover:text-foreground transition-colors"
                  )}
                >
                  About
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Navigation */}
        {/* <div className="md:hidden">
          <Sheet>
            <SheetTrigger>
              <Menu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="flex flex-col space-y-6 pt-10"
            >
              <Link
                href="/blog"
                className="text-lg font-medium hover:underline"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-lg font-medium hover:underline"
              >
                About
              </Link>
            </SheetContent>
          </Sheet>
        </div> */}

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Open</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Edit profile</SheetTitle>
                <SheetDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </SheetDescription>
              </SheetHeader>

              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Link
                    href="/blog"
                    className="text-lg font-medium hover:underline"
                  >
                    Home
                  </Link>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Link
                    href="/about"
                    className="text-lg font-medium hover:underline"
                  >
                    About
                  </Link>
                </div>
              </div>

              <SheetFooter>
                <SheetClose asChild>
                  <Button type="submit">Save changes</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
