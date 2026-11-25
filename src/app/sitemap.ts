import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { navOrder, productHref, routes } from "@/i18n/config";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = navOrder.map((key) => routes[key]);
  const productPages = products.map((p) => ({ bs: productHref(p.slug, "bs"), en: productHref(p.slug, "en") }));
  return [...pages, ...productPages].flatMap((p) =>
    (["bs", "en"] as const).map((locale) => ({
      url: `${siteUrl}${p[locale]}`,
      changeFrequency: "monthly" as const,
      priority: p.bs === "/" ? 1 : 0.7,
      alternates: { languages: { bs: `${siteUrl}${p.bs}`, en: `${siteUrl}${p.en}` } },
    })),
  );
}
