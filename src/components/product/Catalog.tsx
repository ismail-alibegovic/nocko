"use client";

import Link from "next/link";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import type { CategoryId } from "@/data/products";
import { springDefault, springSnappy } from "@/lib/motion";

const ease = [0.22, 1, 0.36, 1] as const;

export type CatalogItem = {
  slug: string;
  category: CategoryId;
  name: string;
  descriptor: string;
  size: string;
  fatLabel: string;
  href: string;
  /** Pre-rendered visual from the server (image or placeholder). */
  visual: ReactNode;
};

type Props = {
  items: CatalogItem[];
  categories: { id: CategoryId; name: string }[];
  labels: { all: string; filterLabel: string; countOne: string; countMany: string; view: string };
};

export function Catalog({ items, categories, labels }: Props) {
  const [filter, setFilter] = useState<CategoryId | "all">("all");

  // Deep links such as /proizvodi#jogurt preselect a category.
  useEffect(() => {
    const apply = () => {
      const hash = window.location.hash.replace("#", "") as CategoryId;
      if (categories.some((c) => c.id === hash)) setFilter(hash);
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, [categories]);

  const select = (id: CategoryId | "all") => {
    setFilter(id);
    const url = id === "all" ? window.location.pathname : `${window.location.pathname}#${id}`;
    window.history.replaceState(null, "", url);
  };

  const visible = filter === "all" ? items : items.filter((i) => i.category === filter);
  const options: { id: CategoryId | "all"; name: string; count: number }[] = [
    { id: "all", name: labels.all, count: items.length },
    ...categories.map((c) => ({ id: c.id, name: c.name, count: items.filter((i) => i.category === c.id).length })),
  ];

  return (
    <div>
      <div className="flex flex-col gap-6 border-b border-navy/12 pb-8 lg:flex-row lg:items-center lg:justify-between">
        <LayoutGroup id="catalog-filter">
          <div role="group" aria-label={labels.filterLabel} className="-mx-1 flex flex-wrap gap-2">
            {options.map((o) => {
              const active = filter === o.id;
              return (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => select(o.id)}
                  aria-pressed={active}
                  className={`relative rounded-full px-5 py-2.5 text-sm font-semibold transition-[color,background-color,scale] duration-300 active:scale-[0.95] active:duration-100 motion-reduce:active:scale-100 ${active ? "text-cream" : "text-navy hover:bg-navy/5"}`}
                >
                  {active && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 rounded-full bg-navy"
                      transition={springSnappy}
                    />
                  )}
                  <span className="relative">
                    {o.name} <span className={active ? "text-gold" : "text-muted"}>{o.count}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>
        <p className="eyebrow text-muted" aria-live="polite">
          {visible.length} {visible.length === 1 ? labels.countOne : labels.countMany}
        </p>
      </div>

      <motion.ul layout transition={{ layout: springDefault }} className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((item, i) => (
            <motion.li
              key={item.slug}
              layout
              transition={{ layout: springDefault }}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease, delay: i * 0.05 } }}
              exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.3 } }}
            >
              <Link href={item.href} className="group block transition-[scale] duration-500 ease-[var(--ease-soft)] active:scale-[0.98] active:duration-100 motion-reduce:active:scale-100" aria-label={`${item.name} ${item.size} — ${labels.view}`}>
                <div className="relative overflow-hidden rounded-t-[999px] rounded-b-[1.5rem]">
                  {item.visual}
                  <span className="absolute top-[14%] right-5 flex size-11 scale-75 items-center justify-center rounded-full bg-navy text-cream opacity-0 transition-all duration-500 ease-[var(--ease-soft)] group-hover:scale-100 group-hover:opacity-100">
                    <ArrowUpRight className="size-5" aria-hidden="true" />
                  </span>
                </div>
                <div className="mt-6 flex items-start justify-between gap-4">
                  <div>
                    <p className="eyebrow text-muted">{item.descriptor}</p>
                    <h3 className="display mt-2 text-3xl text-navy transition-colors group-hover:text-blue">
                      {item.name} <span className="display-italic text-green">{item.size}</span>
                    </h3>
                  </div>
                  <span className="mt-1 shrink-0 rounded-full border border-navy/15 px-3 py-1.5 text-sm font-semibold text-navy">
                    {item.fatLabel}
                  </span>
                </div>
              </Link>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
