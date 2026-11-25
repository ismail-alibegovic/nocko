"use client";

import Image from "next/image";
import { useReducedMotion } from "motion/react";
import { useRef, useState, type PointerEvent } from "react";

type Props = {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  contain?: boolean;
  hint: string;
  className?: string;
};

/** Hover/touch-and-hold zoom that follows the pointer, so label details can be inspected. */
export function ZoomImage({ src, alt, sizes, priority, contain, hint, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");

  const move = (e: PointerEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOrigin(`${x.toFixed(1)}% ${y.toFixed(1)}%`);
  };

  return (
    <div
      ref={ref}
      className={`group relative cursor-zoom-in overflow-hidden ${contain ? "bg-cream-deep" : ""} ${className ?? ""}`}
      onPointerEnter={() => setZoomed(true)}
      onPointerLeave={() => setZoomed(false)}
      onPointerMove={move}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`${contain ? "object-contain p-[8%]" : "object-cover"} ${reduce ? "" : "transition-transform duration-500 ease-[var(--ease-soft)]"}`}
        style={{ transformOrigin: origin, transform: zoomed ? "scale(1.9)" : "scale(1)" }}
      />
      <span className="pointer-events-none absolute right-4 bottom-4 rounded-full bg-navy/70 px-3 py-1.5 text-[0.65rem] font-semibold tracking-[0.12em] text-cream uppercase opacity-100 transition-opacity duration-300 group-hover:opacity-0">
        {hint}
      </span>
    </div>
  );
}
