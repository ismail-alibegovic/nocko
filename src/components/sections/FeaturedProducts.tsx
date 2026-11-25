import Link from "next/link";
import { LineReveal, Reveal } from "@/components/motion/Reveal";
import { ProductVisual } from "@/components/product/ProductVisual";
import { ButtonLink } from "@/components/ui/Button";
import { featuredProducts, formatFat } from "@/data/products";
import { productHref, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export function FeaturedProducts({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <section className="grain bg-cream py-24 lg:py-36" aria-labelledby="featured-title">
      <div className="container-x relative z-[2]">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow text-green">{t.featured.eyebrow}</p>
            </Reveal>
            <LineReveal
              id="featured-title"
              lines={[t.featured.title]}
              className="display mt-5 text-5xl text-navy sm:text-6xl lg:text-[5.5rem]"
            />
          </div>
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.15}>
            <p className="text-lg leading-relaxed text-muted">{t.featured.body}</p>
          </Reveal>
        </div>

        <div className="mt-20 space-y-28 lg:mt-28 lg:space-y-40">
          {featuredProducts.map((p, i) => {
            const flip = i % 2 === 1;
            return (
              <article key={p.slug} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
                <Reveal
                  y={60}
                  className={`lg:col-span-6 ${flip ? "lg:order-2 lg:col-start-7" : ""}`}
                >
                  <Link
                    href={productHref(p.slug, locale)}
                    className="group relative block"
                    aria-label={`${p.name} ${p.size} — ${t.ui.learnMore}`}
                  >
                    <ProductVisual
                      product={p}
                      locale={locale}
                      kind="kitchen"
                      sizes="(min-width: 1024px) 45vw, 92vw"
                      className="aspect-[4/5] rounded-t-[999px] rounded-b-[2rem]"
                    />
                    <span
                      className={`display display-italic absolute -top-8 text-[7rem] leading-none text-gold sm:text-[9rem] ${flip ? "-left-2 lg:-left-10" : "-right-2 lg:-right-10"}`}
                      aria-hidden="true"
                    >
                      0{i + 1}
                    </span>
                  </Link>
                </Reveal>

                <div className={`lg:col-span-5 ${flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-8"}`}>
                  <Reveal>
                    <p className="eyebrow text-muted">
                      {String(i + 1).padStart(2, "0")} — {p.descriptor}
                    </p>
                  </Reveal>
                  <LineReveal
                    as="h3"
                    lines={[p.name]}
                    className="display mt-4 text-5xl text-navy lg:text-7xl"
                  />
                  <Reveal delay={0.1}>
                    <dl className="mt-8 flex flex-wrap gap-3">
                      <div className="rounded-full border border-navy/15 px-5 py-2.5">
                        <dt className="sr-only">{t.ui.pack}</dt>
                        <dd className="font-semibold text-navy">{p.size}</dd>
                      </div>
                      <div className="rounded-full bg-navy px-5 py-2.5 text-cream">
                        <dt className="sr-only">{t.ui.fat}</dt>
                        <dd className="font-semibold">
                          {formatFat(p.fat, locale)} <span className="font-normal text-cream/75">{t.ui.milkFat}</span>
                        </dd>
                      </div>
                    </dl>
                    <p className="mt-8 max-w-md text-lg leading-relaxed text-ink/75">{p.description[locale]}</p>
                    <ButtonLink href={productHref(p.slug, locale)} variant="outline-dark" className="mt-10">
                      {t.ui.learnMore}
                    </ButtonLink>
                  </Reveal>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
