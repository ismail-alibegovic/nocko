import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { HomeView } from "@/views/HomeView";

const locale = "bs" as const;

export const metadata: Metadata = pageMetadata({ locale, route: "home" });

export default function Page() {
  return <HomeView locale={locale} />;
}
