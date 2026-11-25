import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CategoryArt, Sprig } from "@/components/brand/Art";
import { LineReveal, Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ProductVisual } from "@/components/product/ProductVisual";
import { ContactCta } from "@/components/sections/ContactCta";
import { ButtonLink } from "@/components/ui/Button";
import { formatFat, getCategory, products, type Product } from "@/data/products";
import { href, productHref, routes, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { JsonLd } from "@/lib/jsonld";
import { siteUrl } from "@/lib/seo";
import { getPackshot } from "@/lib/assets";

export function ProductView({ product: p, locale }: { product: Product; locale: Locale }) {
  const t = getDictionary(locale);
  const cat = getCategory(p.category);
  const related = products.filter((x) => x.category === p.category && x.slug !== p.slug);
  // Same-family products first, topped up with others so the row always has three.
  const more = [...related, ...products.filter((x) => x.category !== p.category)].slice(0, 3);
  const packshot = getPackshot(p.slug);

  return (
    <>
      <section className="grain bg-cream pt-32 pb-24 lg:pt-40 lg:pb-32">
        <div className="container-x relative z-[2]">
          <Reveal>
            <nav aria-label="Breadcrumb" className="flex items-center gap-3 text-sm text-muted">
              <Link href={href("products", locale)} className="group inline-flex items-center gap-2 font-semibold text-navy">
                <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
                <span className="link-underline">{t.nav.products}</span>
              </Link>
              <span aria-hidden="true">/</span>
              <Link href={`${routes.products[locale]}#${cat.id}`} className="link-underline">
                {cat.name[locale]}
              </Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">
                {p.name} {p.size}
              </span>
            </nav>
          </Reveal>

          <div className="mt-10 grid gap-12 lg:mt-14 lg:grid-cols-12 lg:gap-10">
            <Reveal y={50} className="lg:col-span-7">
              <div className="relative">
                <ProductVisual
                  product={p}
                  locale={locale}
                  zoom
                  priority
                  sizes="(min-width: 1024px) 55vw, 92vw"
                  className="aspect-[4/5] rounded-t-[999px] rounded-b-[2rem] sm:aspect-square lg:aspect-[5/6]"
                />
                <span className="display display-italic absolute -top-6 right-2 text-[6rem] leading-none text-gold sm:text-[8rem]" aria-hidden="true">
                  {formatFat(p.fat, locale)}
                </span>
              </div>
              {!packshot && <p className="mt-4 text-sm text-muted">{t.ui.photoPendingNote}</p>}
            </Reveal>

            <div className="lg:col-span-5 lg:pt-10">
              <Reveal>
                <p className="eyebrow text-green">
                  {cat.name[locale]} — {p.descriptor}
                </p>
              </Reveal>
              <LineReveal
                as="h1"
                animateOnMount
                delay={0.1}
                lines={[p.name, p.size]}
                lineClassNames={[undefined, "display-italic text-green"]}
                className="display mt-4 text-6xl text-navy sm:text-7xl lg:text-[5.5rem]"
              />
              <Reveal delay={0.25}>
                <Sprig className="mt-8 w-28 text-green" />
                <p className="mt-8 text-lg leading-relaxed text-ink/80">{p.description[locale]}</p>

                <h2 className="eyebrow mt-12 text-muted">{t.product.details}</h2>
                <dl className="mt-4 divide-y divide-navy/12 border-y border-navy/12">
                  {[
                    [t.ui.pack, p.size],
                    [t.ui.fat, `${formatFat(p.fat, locale)}`],
                    [t.ui.category, cat.name[locale]],
                  ].map(([k, v]) => (
                    <div key={k} className="flex items-baseline justify-between gap-6 py-4">
                      <dt className="text-muted">{k}</dt>
                      <dd className="display text-2xl text-navy">{v}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 text-xs leading-relaxed text-muted">{t.product.approvalNote}</p>

                <div className="mt-10 rounded-[1.5rem] bg-navy p-8 text-cream">
                  <p className="display text-3xl">{t.product.inquiry}</p>
                  <p className="mt-3 text-cream/75">{t.product.inquiryBody}</p>
                  <ButtonLink href={href("contact", locale)} variant="gold" className="mt-6">
                    {t.business.cta}
                  </ButtonLink>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper py-24 lg:py-32" aria-labelledby="related-title">
        <div className="container-x">
          <div className="flex items-end justify-between gap-6">
            <LineReveal id="related-title" lines={[t.product.related]} className="display text-4xl text-navy lg:text-6xl" />
            <CategoryArt category={p.category} className="hidden size-20 text-green sm:block" />
          </div>
          <Stagger className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((r) => (
              <StaggerItem key={r.slug}>
                <Link href={productHref(r.slug, locale)} className="group block">
                  <ProductVisual
                    product={r}
                    locale={locale}
                    compact
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
                    className="aspect-[4/5] rounded-t-[999px] rounded-b-[1.5rem]"
                  />
                  <h3 className="display mt-6 text-3xl text-navy">
                    {r.name} <span className="display-italic text-green">{r.size}</span>
                  </h3>
                  <p className="mt-1 text-muted">
                    {formatFat(r.fat, locale)} {t.ui.milkFat}
                  </p>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
      <ContactCta locale={locale} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: `${p.name} ${p.size}`,
          brand: { "@type": "Brand", name: "Noćko" },
          category: cat.name[locale],
          description: p.description[locale],
          url: `${siteUrl}${productHref(p.slug, locale)}`,
          ...(packshot ? { image: `${siteUrl}${packshot.src}` } : {}),
        }}
      />
    </>
  );
}
