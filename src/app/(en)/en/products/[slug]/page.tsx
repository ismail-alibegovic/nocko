import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, products } from "@/data/products";
import { productHref } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
import { ProductView } from "@/views/ProductView";

const locale = "en" as const;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return pageMetadata({
    locale,
    title: `${product.name} ${product.size}`,
    description: product.description[locale],
    paths: { bs: productHref(slug, "bs"), en: productHref(slug, "en") },
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  return <ProductView product={product} locale={locale} />;
}
