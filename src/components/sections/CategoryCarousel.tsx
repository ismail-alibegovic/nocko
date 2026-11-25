"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

/** Native scroll-snap row with prev/next buttons. Works by swipe/keyboard without the buttons. */
export function CategoryCarousel({
  children,
  prevLabel,
  nextLabel,
}: {
  children: ReactNode;
  prevLabel: string;
  nextLabel: string;
}) {
  const ref = useRef<HTMLUListElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8 });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [update]);

  const go = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = (card?.getBoundingClientRect().width ?? 280) + 16;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const btn =
    "press grid size-12 place-items-center rounded-full transition-colors duration-300 disabled:opacity-40 focus-visible:outline-offset-2";
  return (
    <div>
      <div className="mb-6 flex justify-end gap-2 lg:mb-8 xl:hidden">
        <button type="button" aria-label={prevLabel} disabled={edge.start} onClick={() => go(-1)} className={`${btn} bg-sage text-navy hover:bg-cream-deep`}>
          <ArrowLeft className="size-5" aria-hidden="true" />
        </button>
        <button type="button" aria-label={nextLabel} disabled={edge.end} onClick={() => go(1)} className={`${btn} bg-navy text-cream hover:bg-blue`}>
          <ArrowRight className="size-5" aria-hidden="true" />
        </button>
      </div>
      <ul
        ref={ref}
        className="snap-row -mx-5 flex gap-4 overflow-x-auto px-5 pb-2 md:-mx-10 md:px-10 xl:mx-0 xl:grid xl:grid-cols-4 xl:overflow-visible xl:px-0"
      >
        {children}
      </ul>
    </div>
  );
}
