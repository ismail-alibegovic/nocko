import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";
import { AboutView } from "@/views/AboutView";

const locale = "en" as const;

export const metadata: Metadata = pageMetadata({ locale, route: "about", title: getDictionary(locale).nav.about });

export default function Page() {
  return <AboutView locale={locale} />;
}
