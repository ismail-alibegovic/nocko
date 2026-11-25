"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useRef, type ReactNode } from "react";

/** Gentle vertical parallax tied to the element's position in the viewport. */
export function Parallax({
  children,
  className,
  offset = 60,
  scale = 1,
}: {
  children: ReactNode;
  className?: string;
  offset?: number;
  scale?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-offset, offset]);
  return (
    <div ref={ref} className={`overflow-hidden ${className ?? ""}`}>
      <motion.div style={{ y, scale }} className="h-full w-full will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}
