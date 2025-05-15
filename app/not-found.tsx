import Link from "next/link";
import "@/app/ui/globals.css";
import { Title } from "./ui/title/title";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="w-full h-svh flex flex-col  px-0 md:px-10">
      <span className="border-b w-full px-6 md:px-0 flex h-16 md:h-24 2xl:h-28 "></span>
      <Title
        text={
          <span>
            404 <br />
            Page Not Found
          </span>
        }
      />
      <div className="md:py-10 px-6 py-6 md:px-0">
        <p className="text-sm 2xl:text-base uppercase font-semibold text-primary tracking-wider mb-1">
          Oops! The page you are looking for doesn't exist.
        </p>
        <p className="text-sm 2xl:text-base uppercase font-semibold text-primary tracking-wider mb-1">
          You might have mistyped the address or the page may have moved.
        </p>

        <Link
          href={`/blog`}
          className="text-sm uppercase font-semibold text-highlight flex items-center w-fit tracking-wider md:mb-1 2xl:text-base"
        >
          Go back to the Blog
          <ArrowRight className="ml-1.5 h-4 w-4 2xl:h-6 2xl:w-6 transition-transform duration-200 group-hover:translate-x-1 " />
        </Link>
      </div>
    </div>
  );
}
