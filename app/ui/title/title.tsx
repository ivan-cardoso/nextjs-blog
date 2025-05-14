import { ReactNode } from "react";

export function Title({ text }: { text: ReactNode }) {
  return (
    <div className="border-b w-full">
      <h1
        className=" 
        font-semibold  uppercase max-w-90 text-5xl font-geist px-6 py-6
        sm:text-6xl sm:max-w-5xl md:py-8 md:px-0
        md:max-w-2xl md:text-6xl 
        2xl:text-7xl 2xl:max-w-3xl
        "
      >
        {text}
      </h1>
    </div>
  );
}
