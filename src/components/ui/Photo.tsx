import Image from "next/image";
import { getAsset } from "@/lib/assets";
import { photos, type PhotoKey } from "@/data/photos";
import type { Locale } from "@/i18n/config";

type Props = {
  photo: PhotoKey;
  locale: Locale;
  sizes: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  /** Adds a discreet "illustrative photograph" caption. */
  caption?: string;
  captionClassName?: string;
};

/** Licensed editorial photograph that fills its (relatively positioned) parent. */
export function Photo({ photo, locale, sizes, className, imgClassName, priority, caption, captionClassName }: Props) {
  const p = photos[photo];
  const asset = getAsset(p.asset);
  if (!asset) return null;
  return (
    <div className={`relative overflow-hidden ${className ?? ""}`}>
      <Image
        src={asset.src}
        alt={p.alt[locale]}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${imgClassName ?? ""}`}
      />
      {caption && (
        <span
          className={`absolute bottom-3 left-3 z-[2] rounded-full bg-navy/55 px-2.5 py-1 text-[0.62rem] font-semibold tracking-[0.14em] text-cream/90 uppercase backdrop-blur-sm ${captionClassName ?? ""}`}
        >
          {caption}
        </span>
      )}
    </div>
  );
}
