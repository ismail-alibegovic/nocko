import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";
import { ContactView } from "@/views/ContactView";

const locale = "bs" as const;

export const metadata: Metadata = pageMetadata({ locale, route: "contact", title: getDictionary(locale).nav.contact });

export default function Page() {
  return <ContactView locale={locale} />;
}
