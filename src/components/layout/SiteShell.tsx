import type { ReactNode } from "react";
import { fraunces, manrope } from "@/app/fonts";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Logo } from "@/components/brand/Logo";
import { MotionProvider } from "@/components/motion/Providers";
import { company } from "@/data/company";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { JsonLd, organizationJsonLd } from "@/lib/jsonld";

export function SiteShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  const t = getDictionary(locale);
  return (
    <html lang={locale} className={`${fraunces.variable} ${manrope.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <MotionProvider>
          <Header
            locale={locale}
            logo={<Logo />}
            labels={{
              nav: t.nav,
              skip: t.ui.skip,
              menu: t.ui.menu,
              openMenu: t.ui.openMenu,
              closeMenu: t.ui.closeMenu,
              language: t.ui.language,
              tagline: t.footer.tagline,
              email: company.email,
              phoneDisplay: company.phoneDisplay,
              phoneHref: company.phoneHref,
            }}
          />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer locale={locale} />
        </MotionProvider>
        <JsonLd data={organizationJsonLd(locale)} />
      </body>
    </html>
  );
}
