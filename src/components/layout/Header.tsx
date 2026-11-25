"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { activeRoute, href, navOrder, switchLocalePath, type Locale, type RouteKey } from "@/i18n/config";

type Labels = {
  nav: Record<RouteKey, string>;
  skip: string;
  menu: string;
  openMenu: string;
  closeMenu: string;
  language: string;
  tagline: string;
  email: string;
  phoneDisplay: string;
  phoneHref: string;
};

import { easeSoft as ease, springDefault } from "@/lib/motion";

export function Header({ locale, labels, logo }: { locale: Locale; labels: Labels; logo: ReactNode }) {
  const pathname = usePathname() || "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // Where the menu grows from: the centre of the button that opened it.
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const toggleRef = useRef<HTMLButtonElement>(null);
  const active = activeRoute(pathname, locale);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    requestAnimationFrame(() => toggleRef.current?.focus());
  }, []);

  // Close the menu after navigation.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Every page now opens on a light sage/cream ground, so the bar is always dark-on-light.
  const solid = scrolled && !open;
  const dark = !open;

  return (
    <>
      <a
        href="#main"
        className="fixed top-3 left-3 z-[100] -translate-y-24 rounded-full bg-gold px-5 py-3 text-sm font-bold text-navy transition-transform focus:translate-y-0"
      >
        {labels.skip}
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color,backdrop-filter] duration-500 ease-[var(--ease-soft)] ${
          solid ? "material text-navy" : "bg-transparent text-navy"
        }`}
      >
        <div
          className={`container-x flex items-center justify-between gap-6 transition-[height] duration-500 ease-[var(--ease-soft)] ${solid ? "h-[4.25rem]" : "h-[5rem] lg:h-[5.75rem]"}`}
        >
          <Link
            href={href("home", locale)}
            className="relative z-[60] shrink-0"
            aria-label={`Noćko — ${labels.nav.home}`}
          >
            <span
              className={`block transition-[width] duration-500 ease-[var(--ease-soft)] ${solid ? "w-[4.5rem]" : "w-[5.25rem] lg:w-[6rem]"}`}
            >
              {logo}
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-0.5 rounded-full border border-navy/10 bg-paper/80 p-1.5 shadow-[0_10px_30px_-18px_rgba(7,54,36,0.5)] backdrop-blur">
              {navOrder.slice(1).map((key) => (
                <li key={key}>
                  <Link
                    href={href(key, locale)}
                    aria-current={active === key ? "page" : undefined}
                    className={`press block rounded-full px-3 py-2 text-[0.85rem] xl:px-4 xl:text-[0.88rem] font-semibold tracking-[0.01em] transition-colors duration-300 ${active === key ? "bg-navy text-cream" : "hover:bg-cream-deep"}`}
                  >
                    {labels.nav[key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="relative z-[60] flex items-center gap-3">
            <LanguageSwitcher locale={locale} pathname={pathname} label={labels.language} tone={open ? "light" : dark ? "dark" : "light"} />
            <button
              ref={toggleRef}
              type="button"
              onPointerDown={() => {
                const r = toggleRef.current?.getBoundingClientRect();
                if (r) setOrigin({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
              }}
              onClick={() => {
                if (open) return close();
                const r = toggleRef.current?.getBoundingClientRect();
                if (r) setOrigin({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
                setOpen(true);
              }}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? labels.closeMenu : labels.openMenu}
              className={`press flex h-11 items-center gap-3 rounded-full pr-4 pl-4 text-sm font-semibold lg:hidden ${open ? "text-cream" : ""}`}
            >
              <span className="hidden sm:inline">{labels.menu}</span>
              <span className="relative block h-3 w-6" aria-hidden="true">
                <span
                  className={`absolute left-0 h-[1.5px] w-6 bg-current transition-transform duration-500 ease-[var(--ease-soft)] ${open ? "top-1.5 rotate-45" : "top-0"}`}
                />
                <span
                  className={`absolute left-0 h-[1.5px] bg-current transition-all duration-500 ease-[var(--ease-soft)] ${open ? "top-1.5 w-6 -rotate-45" : "top-3 w-4"}`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && <MobileNav locale={locale} labels={labels} active={active} origin={origin} onClose={close} />}
      </AnimatePresence>
    </>
  );
}

function LanguageSwitcher({
  locale,
  pathname,
  label,
  tone,
}: {
  locale: Locale;
  pathname: string;
  label: string;
  tone: "light" | "dark";
}) {
  const items: { code: Locale; text: string; name: string }[] = [
    { code: "bs", text: "BS", name: "Bosanski" },
    { code: "en", text: "EN", name: "English" },
  ];
  return (
    <div
      role="group"
      aria-label={label}
      className={`flex items-center rounded-full border p-0.5 text-[0.72rem] font-bold tracking-[0.12em] transition-colors duration-500 ${tone === "dark" ? "border-navy/20" : "border-cream/35"}`}
    >
      {items.map((it) =>
        it.code === locale ? (
          <span
            key={it.code}
            aria-current="true"
            className={`rounded-full px-2.5 py-1.5 ${tone === "dark" ? "bg-navy text-cream" : "bg-cream text-navy"}`}
          >
            {it.text}
          </span>
        ) : (
          // Full navigation on purpose: each language has its own root layout (<html lang>).
          <a
            key={it.code}
            href={switchLocalePath(pathname, it.code)}
            hrefLang={it.code}
            lang={it.code}
            aria-label={it.name}
            className="rounded-full px-2.5 py-1.5 opacity-75 transition-opacity hover:opacity-100"
          >
            {it.text}
          </a>
        ),
      )}
    </div>
  );
}

function MobileNav({
  locale,
  labels,
  active,
  origin,
  onClose,
}: {
  locale: Locale;
  labels: Labels;
  active: RouteKey | null;
  origin: { x: number; y: number };
  onClose: () => void;
}) {
  const firstLink = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();
  // Spatial consistency: the sheet grows out of the menu button and returns into it
  // along the same path. Reduced motion gets a plain cross-fade.
  const at = `${origin.x}px ${origin.y}px`;
  const closed = reduce ? { opacity: 0 } : { clipPath: `circle(0px at ${at})` };
  const opened = reduce ? { opacity: 1 } : { clipPath: `circle(150vmax at ${at})` };

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstLink.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      id="mobile-nav"
      role="dialog"
      aria-modal="true"
      aria-label={labels.menu}
      className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-navy text-cream lg:hidden"
      initial={closed}
      animate={opened}
      exit={closed}
      transition={reduce ? { duration: 0.2 } : { ...springDefault, duration: 0.6 }}
    >
      <div className="pointer-events-none absolute -right-24 -bottom-24 size-80 rounded-full bg-blue/60 blur-3xl" />
      <nav aria-label="Mobile" className="container-x relative flex flex-1 flex-col justify-center pt-28 pb-10">
        <ul className="space-y-1">
          {navOrder.map((key, i) => (
            <motion.li
              key={key}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12, transition: { duration: 0.2 } }}
              transition={{ duration: 0.7, ease, delay: 0.18 + i * 0.06 }}
            >
              <Link
                ref={i === 0 ? firstLink : undefined}
                href={href(key, locale)}
                aria-current={active === key ? "page" : undefined}
                className="group press flex origin-left items-baseline gap-4 py-1.5"
              >
                <span className="w-6 text-xs font-bold tracking-[0.2em] text-gold/80">0{i + 1}</span>
                <span
                  className={`display text-[2.6rem] leading-[1.05] sm:text-6xl ${active === key ? "display-italic text-gold" : "transition-colors group-hover:text-gold"}`}
                >
                  {labels.nav[key]}
                </span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>
      <motion.div
        className="container-x relative flex flex-col gap-2 border-t border-cream/15 py-8 text-sm text-cream/80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.55, duration: 0.6 }}
      >
        <span className="display display-italic text-xl text-gold">{labels.tagline}</span>
        <a href={`mailto:${labels.email}`} className="link-underline w-fit">
          {labels.email}
        </a>
        <a href={labels.phoneHref} className="link-underline w-fit">
          {labels.phoneDisplay}
        </a>
      </motion.div>
    </motion.div>
  );
}
