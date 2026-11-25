import { company } from "@/data/company";
import { siteUrl } from "./seo";
import type { Locale } from "@/i18n/config";

export function organizationJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Noćko",
    legalName: company.legalName,
    foundingDate: String(company.founded),
    url: siteUrl,
    email: company.email,
    telephone: company.phoneDisplay,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.street,
      postalCode: company.postalCode,
      addressLocality: company.city,
      addressCountry: "BA",
    },
    inLanguage: locale,
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
