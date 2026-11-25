import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";
import { BusinessView } from "@/views/BusinessView";

const locale = "bs" as const;

export const metadata: Metadata = pageMetadata({ locale, route: "business", title: getDictionary(locale).nav.business });

export default function Page() {
  return <BusinessView locale={locale} />;
}
