"use client";

import { usePathname } from "next/navigation";
import { switchLocalePath, type Locale } from "@/i18n/config";

export function FooterLanguage({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname() || "/";
  const items: { code: Locale; name: string }[] = [
    { code: "bs", name: "Bosanski" },
    { code: "en", name: "English" },
  ];
  return (
    <div role="group" aria-label={label} className="flex items-center gap-4">
      <span className="eyebrow text-cream/70">{label}</span>
      {items.map((it) =>
        it.code === locale ? (
          <span key={it.code} aria-current="true" className="font-semibold text-gold">
            {it.name}
          </span>
        ) : (
          <a
            key={it.code}
            href={switchLocalePath(pathname, it.code)}
            hrefLang={it.code}
            lang={it.code}
            className="link-underline text-cream/80 hover:text-cream"
          >
            {it.name}
          </a>
        ),
      )}
    </div>
  );
}
