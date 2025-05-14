import { cn } from "@/lib/utils";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-16 h-32 px-6 md:px-10">
      <div className="border-t py-8 h-full flex flex-col md:flex-row items-center justify-between text-sm 2xl:text-base 3xl:text-lg text-muted-foreground font-geist">
        <p className="uppercase">
          Made in Argentina — All rights reserved, Ivan Cardoso{" "}
          {new Date().getFullYear()}
        </p>
        <div className="space-x-4 mt-4 md:mt-0">
          <div className="flex items-center space-x-5 ml-auto">
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
          </div>
        </div>
      </div>
    </footer>
  );
}
