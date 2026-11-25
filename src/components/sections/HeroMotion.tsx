"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

/** Background photo: slow settle on load + gentle parallax while scrolling away. */
export function HeroBackdrop({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], reduce ? [0, 0] : [0, 180]);
  return (
    <motion.div className="absolute inset-0 -z-10" style={{ y }}>
      <motion.div
        className="absolute inset-0"
        initial={{ scale: reduce ? 1.04 : 1.16 }}
        animate={{ scale: 1.04 }}
        transition={{ duration: 2.6, ease }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export function HeroFade({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Foreground product/badge: rises in, then drifts slightly slower than the page (depth). */
export function HeroFloat({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], reduce ? [0, 0] : [0, -90]);
  return (
    <motion.div style={{ y }} className={className}>
      <motion.div
        initial={{ opacity: 0, y: 60, rotate: -4 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 1.4, ease, delay: 0.45 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
