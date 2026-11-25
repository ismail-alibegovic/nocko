"use client";

import { motion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

type Item = { year: string; label: string };

/** Understated 1996 → 2026 timeline. Only decade markers — no invented milestones. */
export function Timeline({ title, items, tone = "dark" }: { title: string; items: Item[]; tone?: "dark" | "light" }) {
  const line = tone === "dark" ? "bg-navy/15" : "bg-cream/20";
  const text = tone === "dark" ? "text-navy" : "text-cream";
  const sub = tone === "dark" ? "text-muted" : "text-cream/70";
  return (
    <div>
      <h3 className={`eyebrow ${tone === "dark" ? "text-green" : "text-gold"}`}>{title}</h3>
      <ol className="relative mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {/* desktop rule */}
        <div className={`absolute top-[11px] right-0 left-0 hidden h-px lg:block ${line}`} aria-hidden="true">
          <motion.div
            className="h-full origin-left bg-gold"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "0px 0px -15% 0px" }}
            transition={{ duration: 2, ease }}
          />
        </div>
        {items.map((it, i) => {
          const last = i === items.length - 1;
          return (
            <motion.li
              key={it.year}
              className="relative pl-10 lg:pl-0"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.9, ease, delay: 0.25 + i * 0.35 }}
            >
              <span
                className={`absolute top-0 left-0 flex size-[23px] items-center justify-center rounded-full border ${last ? "border-gold bg-gold" : tone === "dark" ? "border-navy/25 bg-cream" : "border-cream/40 bg-navy"}`}
                aria-hidden="true"
              >
                <span className={`size-[7px] rounded-full ${last ? "bg-navy" : "bg-gold"}`} />
              </span>
              <p className={`display mt-0 text-5xl lg:mt-10 lg:text-6xl ${last ? "display-italic" : ""} ${text}`}>
                {it.year}
              </p>
              <p className={`mt-2 ${sub}`}>{it.label}</p>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}
