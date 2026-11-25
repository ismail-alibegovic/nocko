import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";
import { ProductsView } from "@/views/ProductsView";

const locale = "en" as const;

export const metadata: Metadata = pageMetadata({ locale, route: "products", title: getDictionary(locale).nav.products });

export default function Page() {
  return <ProductsView locale={locale} />;
}
