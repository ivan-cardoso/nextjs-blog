import { AuthButton } from "@/app/ui/Buttons/AuthButton";
import { Title } from "../ui/title/title";

export default function Home() {
  return (
    <main className="w-full h-svh flex flex-col  px-0 md:px-10">
      <span className="border-b w-full px-6 md:px-0 flex h-16 md:h-24 2xl:h-28 "></span>
      <Title text={<span>Login</span>} />
      <div className="md:py-10 px-6 py-6 md:px-0 flex flex-col gap-y-3">
        <p className="text-sm 2xl:text-base uppercase font-semibold text-primary tracking-wider mb-1">
          Hi Ivan, welcome back to your blog.
        </p>
        <span className="w-fit">
          <AuthButton />
        </span>
      </div>
    </main>
  );
}
