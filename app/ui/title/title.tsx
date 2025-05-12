export function Title({ text }: { text: string }) {
  return (
    <div className="border-b w-full">
      <h1
        className=" 
        font-semibold mb-4 uppercase max-w-80  text-5xl font-geist px-6
        sm:text-6xl sm:max-w-90 md:mb-8 md:px-0
        md:max-w-2xl md:text-6xl
        "
      >
        {text}
      </h1>
    </div>
  );
}
