import "../globals.css";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { SiteShell } from "@/components/layout/SiteShell";
import { rootMetadata } from "@/lib/seo";

export const metadata: Metadata = rootMetadata("en");

export const viewport: Viewport = {
  themeColor: "#06264C",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <SiteShell locale="en">{children}</SiteShell>;
}
