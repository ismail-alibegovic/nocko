"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "p" | "span" | "article" | "figure";
} & Omit<HTMLMotionProps<"div">, "children">;

/** Fades and lifts content into view once. Transforms are disabled for reduced-motion users via MotionConfig. */
export function Reveal({ children, delay = 0, y = 28, className, as = "div", ...rest }: RevealProps) {
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, ease, delay }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

/**
 * Editorial line-by-line headline reveal: each line rises from behind a mask.
 * The heading itself is observed (the lines start clipped by their masks, so
 * observing them directly would never report an intersection).
 */
export function LineReveal({
  lines,
  className,
  lineClassNames,
  delay = 0,
  as = "h2",
  animateOnMount = false,
  id,
}: {
  id?: string;
  lines: ReactNode[];
  className?: string;
  /** Optional class per line (index-aligned). */
  lineClassNames?: (string | undefined)[];
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p";
  animateOnMount?: boolean;
}) {
  const Tag = motion[as] as typeof motion.h2;
  const trigger = animateOnMount
    ? { animate: "show" }
    : { whileInView: "show", viewport: { once: true, margin: "0px 0px -10% 0px" } };
  return (
    <Tag id={id} className={className} initial="hidden" {...trigger}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className={`block ${lineClassNames?.[i] ?? ""}`}
            variants={{
              hidden: { y: "105%" },
              show: { y: "0%", transition: { duration: 1.05, ease, delay: delay + i * 0.12 } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** Staggered children container. */
export function Stagger({
  children,
  className,
  stagger = 0.1,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  const Comp = as === "li" ? motion.li : motion.div;
  return (
    <Comp
      className={className}
      variants={{
        hidden: { opacity: 0, y: 36 },
        show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
      }}
    >
      {children}
    </Comp>
  );
}
