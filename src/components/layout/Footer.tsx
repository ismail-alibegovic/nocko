import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { HillsDivider } from "@/components/brand/Art";
import { categories } from "@/data/products";
import { company, COPYRIGHT_YEAR } from "@/data/company";
import { photos } from "@/data/photos";
import { href, navOrder, routes, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { FooterLanguage } from "./FooterLanguage";

export function Footer({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <footer className="relative mt-auto bg-navy text-cream">
      <HillsDivider className="absolute -top-[59px] left-0 h-[60px] w-full text-navy" />
      <div className="container-x relative pt-20 pb-10 lg:pt-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Link href={href("home", locale)} className="inline-block w-36" aria-label={`Noćko — ${t.nav.home}`}>
              <Logo />
            </Link>
            <p className="display display-italic mt-8 text-3xl text-gold">{t.footer.tagline}</p>
            <p className="mt-4 max-w-sm leading-relaxed text-cream/75">{t.footer.description}</p>
          </div>

          <nav aria-labelledby="footer-nav" className="lg:col-span-2 lg:col-start-6">
            <h2 id="footer-nav" className="eyebrow text-gold">
              {t.footer.navTitle}
            </h2>
            <ul className="mt-6 space-y-3 text-cream/85">
              {navOrder.map((key) => (
                <li key={key}>
                  <Link href={href(key, locale)} className="link-underline">
                    {t.nav[key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-products" className="lg:col-span-2">
            <h2 id="footer-products" className="eyebrow text-gold">
              {t.footer.productsTitle}
            </h2>
            <ul className="mt-6 space-y-3 text-cream/85">
              {categories.map((c) => (
                <li key={c.id}>
                  <Link href={`${routes.products[locale]}#${c.id}`} className="link-underline">
                    {c.name[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="eyebrow text-gold">{t.footer.contactTitle}</h2>
            <address className="mt-6 space-y-3 leading-relaxed text-cream/85 not-italic">
              <p>
                {company.legalName}
                <br />
                {company.street}
                <br />
                {company.postalCode} {company.city}
                <br />
                {company.country[locale]}
              </p>
              <p>
                <a href={`mailto:${company.email}`} className="link-underline">
                  {company.email}
                </a>
                <br />
                <a href={company.phoneHref} className="link-underline">
                  {company.phoneDisplay}
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-cream/15 pt-8 text-sm text-cream/75 lg:flex-row lg:items-center lg:justify-between">
          <p>
            © {COPYRIGHT_YEAR} {company.shortLegalName} {t.footer.rights}
            <span className="mt-1 block text-cream/70 lg:mt-0 lg:ml-3 lg:inline">{t.footer.concept}</span>
          </p>
          <FooterLanguage locale={locale} label={t.ui.language} />
        </div>

        <details className="group mt-6 text-xs text-cream/70">
          <summary className="w-fit cursor-pointer list-none tracking-[0.12em] uppercase transition-colors hover:text-cream">
            {t.footer.credits} <span className="inline-block transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 max-w-2xl">{t.footer.creditsNote}</p>
          <ul className="mt-3 grid gap-x-6 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
            {Object.values(photos).map((p) => (
              <li key={p.sourceUrl}>
                <a href={p.sourceUrl} target="_blank" rel="noopener noreferrer" className="hover:text-cream/80">
                  {p.alt[locale]}
                </a>{" "}
                —{" "}
                <a href={p.creditUrl} target="_blank" rel="noopener noreferrer" className="hover:text-cream/80">
                  {p.credit}
                </a>
              </li>
            ))}
          </ul>
        </details>
      </div>
    </footer>
  );
}
