/** Slow typographic band. Duplicated content makes the loop seamless; hidden from AT. */
export function Marquee({ words, className }: { words: string[]; className?: string }) {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {[...words, ...words].map((w, i) => (
        <li key={`${w}-${i}`} className="flex items-center">
          <span className="display display-italic display-xl px-6 text-5xl whitespace-nowrap sm:text-6xl lg:px-10 lg:text-7xl">
            {w}
          </span>
          <span className="block h-4 w-7 shrink-0 rounded-[50%] border-2 border-gold" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className={`overflow-hidden py-8 lg:py-12 ${className ?? ""}`}>
      <p className="sr-only">{words.join(", ")}</p>
      <div className="flex w-max animate-marquee motion-reduce:animate-none" aria-hidden="true">
        {row(true)}
        {row(true)}
      </div>
    </div>
  );
}
