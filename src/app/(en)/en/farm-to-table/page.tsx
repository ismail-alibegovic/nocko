import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";
import { FarmView } from "@/views/FarmView";

const locale = "en" as const;

export const metadata: Metadata = pageMetadata({ locale, route: "farm", title: getDictionary(locale).nav.farm });

export default function Page() {
  return <FarmView locale={locale} />;
}
