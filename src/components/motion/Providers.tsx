"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/** Respects the user's prefers-reduced-motion setting across every animation. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
