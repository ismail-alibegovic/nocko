import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CategoryArt } from "@/components/brand/Art";
import { LineReveal, Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { categories, products } from "@/data/products";
import { href, routes, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export function CategoriesTeaser({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <section className="bg-paper py-24 lg:py-32" aria-labelledby="categories-title">
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <p className="eyebrow text-green">{t.categoriesTeaser.eyebrow}</p>
            </Reveal>
            <LineReveal
              id="categories-title"
              lines={[t.categoriesTeaser.title]}
              className="display mt-5 text-5xl text-navy sm:text-6xl lg:text-7xl"
            />
          </div>
          <Reveal delay={0.1}>
            <ButtonLink href={href("products", locale)} variant="outline-dark">
              {t.ui.allProducts}
            </ButtonLink>
          </Reveal>
        </div>

        <Stagger className="mt-14 grid border-t border-navy/12 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {categories.map((c, i) => {
            const count = products.filter((p) => p.category === c.id).length;
            return (
              <StaggerItem key={c.id}>
                <Link
                  href={`${routes.products[locale]}#${c.id}`}
                  className={`group relative flex h-full flex-col border-b border-navy/12 py-10 transition-colors duration-500 hover:bg-cream sm:px-8 ${i % 2 === 0 ? "sm:border-r" : ""} lg:border-r ${i === 3 ? "lg:border-r-0" : ""}`}
                >
                  <div className="flex items-start justify-between">
                    <span className="eyebrow text-muted">0{i + 1}</span>
                    <span className="eyebrow text-muted">
                      {count} {count === 1 ? t.catalog.countOne : t.catalog.countMany}
                    </span>
                  </div>
                  <div className="relative mx-auto my-8 flex size-36 items-center justify-center">
                    <span className="absolute inset-3 rounded-full bg-gold/70 transition-transform duration-700 ease-[var(--ease-soft)] group-hover:scale-110" />
                    <CategoryArt category={c.id} className="relative w-28 text-navy" />
                  </div>
                  <h3 className="display text-4xl text-navy">{c.name[locale]}</h3>
                  <p className="mt-3 text-muted">{c.blurb[locale]}</p>
                  <ArrowRight
                    className="mt-6 size-5 text-navy transition-transform duration-500 ease-[var(--ease-soft)] group-hover:translate-x-2"
                    aria-hidden="true"
                  />
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
