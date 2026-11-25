import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { LineReveal, Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { categories, products, type CategoryId } from "@/data/products";
import type { PhotoKey } from "@/data/photos";
import { href, routes, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { CategoryCarousel } from "./CategoryCarousel";

/** Illustrative photography per category (no Noćko packaging is shown until approved). */
const categoryPhoto: Record<CategoryId, PhotoKey> = {
  mlijeko: "milkPour",
  jogurt: "gardenBreakfast",
  pavlaka: "breadAndMilk",
  ayran: "milkCans",
};

export function CategoriesTeaser({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <section className="bg-paper py-20 lg:py-32" aria-labelledby="categories-title">
      <div className="container-x">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <p className="eyebrow text-green-deep">{t.categoriesTeaser.eyebrow}</p>
            </Reveal>
            <LineReveal
              id="categories-title"
              lines={[t.categoriesTeaser.title]}
              className="display display-xl mt-4 text-5xl text-navy sm:text-6xl lg:text-7xl"
            />
          </div>
          <Reveal delay={0.1}>
            <ButtonLink href={href("products", locale)} variant="outline-dark">
              {t.ui.allProducts}
            </ButtonLink>
          </Reveal>
        </div>

        <div className="mt-10 lg:mt-14">
          <CategoryCarousel prevLabel={t.ui.prev} nextLabel={t.ui.next}>
            {categories.map((c) => {
              const count = products.filter((p) => p.category === c.id).length;
              return (
                <li key={c.id} className="w-[72%] shrink-0 snap-start sm:w-[44%] md:w-[34%] xl:w-auto">
                  <Link
                    href={`${routes.products[locale]}#${c.id}`}
                    className="group relative block aspect-[3/4.2] overflow-hidden rounded-[1.75rem] bg-navy text-cream ring-0 transition-[box-shadow,scale] duration-500 ease-[var(--ease-soft)] hover:shadow-[0_30px_50px_-30px_rgba(7,54,36,0.7)] active:scale-[0.98] active:duration-100 motion-reduce:active:scale-100"
                  >
                    <Photo
                      photo={categoryPhoto[c.id]}
                      locale={locale}
                      sizes="(min-width: 1280px) 22vw, 70vw"
                      className="absolute inset-0"
                      imgClassName="transition-transform duration-[1.4s] ease-[var(--ease-soft)] group-hover:scale-[1.05]"
                    />
                    <span className="absolute inset-0 bg-[linear-gradient(0deg,rgba(7,54,36,0.85)_0%,rgba(7,54,36,0.1)_55%,transparent)]" />
                    <span className="absolute top-4 right-4 rounded-full bg-paper/90 px-3 py-1.5 text-xs font-bold text-navy backdrop-blur">
                      {count} {count === 1 ? t.catalog.countOne : t.catalog.countMany}
                    </span>
                    <span className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-3">
                      <span>
                        <span className="display block text-3xl lg:text-4xl">{c.name[locale]}</span>
                        <span className="mt-1 block text-sm text-cream/80">{c.blurb[locale]}</span>
                      </span>
                      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-gold text-navy transition-transform duration-500 ease-[var(--ease-soft)] group-hover:rotate-45">
                        <ArrowUpRight className="size-5" aria-hidden="true" />
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </CategoryCarousel>
          <p className="mt-5 text-xs text-muted">{t.ui.illustrative}</p>
        </div>
      </div>
    </section>
  );
}
