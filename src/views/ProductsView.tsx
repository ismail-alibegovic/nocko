import { Catalog, type CatalogItem } from "@/components/product/Catalog";
import { ProductVisual } from "@/components/product/ProductVisual";
import { LineReveal, Reveal } from "@/components/motion/Reveal";
import { Business } from "@/components/sections/Business";
import { categories, formatFat, products } from "@/data/products";
import { productHref, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export function ProductsView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const items: CatalogItem[] = products.map((p) => ({
    slug: p.slug,
    category: p.category,
    name: p.name,
    descriptor: p.descriptor,
    size: p.size,
    fatLabel: `${formatFat(p.fat, locale)} ${t.ui.milkFatShort}`,
    href: productHref(p.slug, locale),
    visual: (
      <ProductVisual
        product={p}
        locale={locale}
        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
        className="aspect-[4/5]"
        compact
      />
    ),
  }));

  return (
    <>
      <section className="grain bg-cream pt-40 pb-24 lg:pt-52 lg:pb-32">
        <div className="container-x relative z-[2]">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="eyebrow text-green">{t.catalog.eyebrow}</p>
              </Reveal>
              <LineReveal
                as="h1"
                animateOnMount
                lines={[t.catalog.title]}
                className="display display-xl mt-5 text-6xl text-navy sm:text-7xl lg:text-[7rem]"
              />
            </div>
            <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.2}>
              <p className="text-lg leading-relaxed text-muted">{t.catalog.intro}</p>
            </Reveal>
          </div>
          <div className="mt-16 lg:mt-24">
            <Catalog
              items={items}
              categories={categories.map((c) => ({ id: c.id, name: c.name[locale] }))}
              labels={{
                all: t.catalog.all,
                filterLabel: t.catalog.filterLabel,
                countOne: t.catalog.countOne,
                countMany: t.catalog.countMany,
                view: t.ui.viewProduct,
              }}
            />
          </div>
        </div>
      </section>
      <Business locale={locale} showPhoto={false} />
    </>
  );
}
