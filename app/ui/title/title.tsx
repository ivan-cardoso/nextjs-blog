import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AdminPost } from "@/lib/definitions";
import { format } from "date-fns";
import { slugify } from "@/lib/utils";

export function Title({ text }: { text: string }) {
  return (
    <div className="border-b w-full">
      <h1
        className=" 
        font-semibold mb-4 uppercase max-w-72  text-4xl font-geist
        sm:text-5xl sm:max-w-90 md:mb-8
        md:max-w-2xl md:text-6xl
        "
      >
        {text}
      </h1>
    </div>
  );
}
