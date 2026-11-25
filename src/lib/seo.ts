import type { Metadata } from "next";
import { routes, type Locale, type RouteKey } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

/**
 * Demo is kept out of search indexes until the client approves it.
 * Flip NEXT_PUBLIC_ALLOW_INDEXING=true at launch.
 */
export const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

type PageMeta = {
  locale: Locale;
  title?: string;
  description?: string;
  /** Either a route key or explicit per-locale paths (for product pages). */
  route?: RouteKey;
  paths?: Record<Locale, string>;
};

export function pageMetadata({ locale, title, description, route, paths }: PageMeta): Metadata {
  const t = getDictionary(locale);
  const p = paths ?? (route ? routes[route] : routes.home);
  const fullTitle = title ? `${title} · Noćko` : t.meta.defaultTitle;
  const desc = description ?? t.meta.description;
  return {
    title: fullTitle,
    description: desc,
    alternates: {
      canonical: p[locale],
      languages: { bs: p.bs, en: p.en, "x-default": p.bs },
    },
    openGraph: {
      title: fullTitle,
      description: desc,
      url: p[locale],
      siteName: "Noćko",
      locale: locale === "bs" ? "bs_BA" : "en_GB",
      alternateLocale: locale === "bs" ? ["en_GB"] : ["bs_BA"],
      type: "website",
    },
    twitter: { card: "summary_large_image", title: fullTitle, description: desc },
  };
}

export function rootMetadata(locale: Locale): Metadata {
  const t = getDictionary(locale);
  return {
    metadataBase: new URL(siteUrl),
    title: { default: t.meta.defaultTitle, template: "%s" },
    description: t.meta.description,
    applicationName: "Noćko",
    robots: allowIndexing
      ? { index: true, follow: true }
      : { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
    formatDetection: { telephone: false },
  };
}
