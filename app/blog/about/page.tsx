import { prisma } from "@/lib/prisma";
import { Title } from "@/app/ui/title/title";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: {
      categories: true,
      tags: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <section className="pb-10 px-0 md:px-10">
      <Title
        text={
          <span className="capitalize">
            Hi there! <br />
            I'm Ivan.
          </span>
        }
      />
      <div
        className="
          grid grid-cols-6 
          gap-6 lg:gap-12 py-6 md:py-8"
      >
        <main
          className="
                px-6 md:px-0  
                col-span-6 md:col-span-4 md:col-start-2
                prose md:prose-lg max-w-full 
                2xl:prose-2xl prose-neutral dark:prose-invert "
        >
          <div className="">
            <p className={`text-primary mb-4 font-medium leading-normal`}></p>
            <h3>About this Blog</h3>
            <p>
              Hi! My name is Ivan and I'm a Fullstack developer with a strong
              focus on Frontend — motivated about building modern, performant
              apps and sharing what I learn along the way.
            </p>
            <p>
              This blog is my personal space to share notes, tutorials, dev
              diaries, English learning and solutions to the problems I face
              daily as a developer.{" "}
              <strong>
                Think this site as my digital notebook — open to the world.
              </strong>
            </p>
            {/* <p>
              I'm currently diving deep into the latest technologies, especially
              the modern React ecosystem:{" "}
              <strong>
                Next.js, TypeScript, Tailwind CSS, Prisma, shadcn/ui
              </strong>{" "}
              — and everything in between.
            </p> */}
            <p>
              Whether you’re a junior just starting out or a senior dev looking
              for new perspectives, I hope you’ll find something useful here.{" "}
              <strong>
                And if you're hiring or looking to collaborate on a freelance
                project, let’s connect.
              </strong>
            </p>
            <h3>Follow me</h3>
            <ul className="text-primary ">
              <li>
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
              </li>
              <li>
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
              </li>

              <li>
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
              </li>
            </ul>
            <p>Thanks for stopping by. More posts coming soon.</p>
          </div>
        </main>
      </div>
    </section>
  );
}
