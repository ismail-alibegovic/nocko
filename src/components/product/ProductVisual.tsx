import Image from "next/image";
import { CategoryArt } from "@/components/brand/Art";
import { getPackshot, getKitchenPhoto } from "@/lib/assets";
import type { Product } from "@/data/products";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { ZoomImage } from "./ZoomImage";

type Props = {
  product: Product;
  locale: Locale;
  sizes: string;
  /** "packshot" = product on its own; "kitchen" = editorial kitchen photograph (falls back to packshot). */
  kind?: "packshot" | "kitchen";
  zoom?: boolean;
  priority?: boolean;
  className?: string;
  compact?: boolean;
};

/**
 * Shows approved product imagery if it exists. Otherwise renders a clearly labelled,
 * deliberately generic illustration — never an invented packaging design.
 */
export function ProductVisual({ product, locale, sizes, kind = "packshot", zoom, priority, className, compact }: Props) {
  const t = getDictionary(locale);
  const kitchen = kind === "kitchen" ? getKitchenPhoto(product.slug) : null;
  const image = kitchen ?? getPackshot(product.slug);
  const alt = `${product.name} ${product.size} — ${t.ui.milkFat} ${product.fat}%`;
  // Packshots are cut-outs: show them whole on a cream ground instead of cropping.
  const isCutout = !!image && !kitchen;

  if (image) {
    if (zoom) {
      return (
        <ZoomImage
          src={image.src}
          alt={alt}
          sizes={sizes}
          priority={priority}
          contain={!!isCutout}
          hint={t.ui.zoomHint}
          className={className}
        />
      );
    }
    return (
      <div className={`relative overflow-hidden ${isCutout ? "bg-cream-deep" : ""} ${className ?? ""}`}>
        <Image
          src={image.src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`${isCutout ? "object-contain p-[8%]" : "object-cover"} transition-transform duration-[1.4s] ease-[var(--ease-soft)] group-hover:scale-[1.04]`}
        />
      </div>
    );
  }

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-cream-deep ${className ?? ""}`}
      role="img"
      aria-label={`${product.name} ${product.size} — ${t.ui.photoPending}`}
    >
      <div className="absolute inset-0 opacity-60 [background:radial-gradient(120%_90%_at_50%_110%,#d9dcbd_0%,transparent_60%)]" />
      <div
        className={`absolute aspect-square rounded-full bg-gold/80 transition-transform duration-[1.4s] ease-[var(--ease-soft)] group-hover:scale-110 ${compact ? "w-[46%]" : "w-[52%]"} top-[16%]`}
      />
      <svg viewBox="0 0 400 80" preserveAspectRatio="none" className="absolute bottom-0 left-0 h-[22%] w-full text-green/25" aria-hidden="true">
        <path d="M0 50 C 80 20 150 24 220 44 C 290 64 340 40 400 34 V80 H0Z" fill="currentColor" />
      </svg>
      <CategoryArt
        category={product.category}
        className={`relative text-navy transition-transform duration-[1.4s] ease-[var(--ease-soft)] group-hover:-translate-y-1 ${compact ? "w-[44%]" : "w-[46%]"}`}
      />
      <span
        className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-navy/15 bg-paper/85 px-3 py-1.5 font-semibold tracking-[0.12em] text-navy/70 uppercase backdrop-blur ${compact ? "bottom-3 text-[0.55rem]" : "bottom-5 text-[0.62rem]"}`}
      >
        {t.ui.photoPending}
      </span>
    </div>
  );
}
