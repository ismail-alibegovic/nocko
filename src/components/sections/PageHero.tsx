import Image from "next/image";
import { HillsDivider } from "@/components/brand/Art";
import { LineReveal } from "@/components/motion/Reveal";
import { photos, type PhotoKey } from "@/data/photos";
import type { Locale } from "@/i18n/config";
import { getAsset } from "@/lib/assets";
import { HeroBackdrop, HeroFade } from "./HeroMotion";

type Props = {
  locale: Locale;
  eyebrow: string;
  title: string[];
  body?: string;
  photo?: PhotoKey;
  /** Divider colour should match the next section's background. */
  nextBg?: "cream" | "paper";
};

export function PageHero({ locale, eyebrow, title, body, photo, nextBg = "cream" }: Props) {
  const asset = photo ? getAsset(photos[photo].asset) : null;
  return (
    <section className="relative isolate flex min-h-[max(72svh,560px)] items-end overflow-hidden bg-navy text-cream lg:min-h-[max(78vh,620px)]">
      {asset && photo && (
        <HeroBackdrop>
          <Image src={asset.src} alt={photos[photo].alt[locale]} fill priority sizes="100vw" className="object-cover" />
        </HeroBackdrop>
      )}
      <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(4,26,53,0.9)_0%,rgba(6,38,76,0.62)_45%,rgba(6,38,76,0.2)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(4,26,53,0.6),transparent)]" />
      <div className="container-x relative z-10 pt-36 pb-28 lg:pt-44 lg:pb-36">
        <HeroFade delay={0.05}>
          <p className="eyebrow flex items-center gap-3 text-gold">
            <span className="h-px w-10 bg-gold" aria-hidden="true" />
            {eyebrow}
          </p>
        </HeroFade>
        <LineReveal
          as="h1"
          animateOnMount
          delay={0.15}
          lines={title}
          lineClassNames={title.map((_, i) => (i === title.length - 1 && title.length > 1 ? "display-italic text-gold-soft" : undefined))}
          className="display mt-6 max-w-5xl text-[3.1rem] sm:text-7xl lg:text-[6.25rem]"
        />
        {body && (
          <HeroFade delay={0.5}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-cream/85 lg:text-xl">{body}</p>
          </HeroFade>
        )}
      </div>
      <HillsDivider
        className={`absolute -bottom-px left-0 z-10 h-[48px] w-full lg:h-[72px] ${nextBg === "paper" ? "text-paper" : "text-cream"}`}
      />
    </section>
  );
}
