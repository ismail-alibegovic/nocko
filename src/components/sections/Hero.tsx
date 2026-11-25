import Image from "next/image";
import { AnniversaryBadge } from "@/components/brand/AnniversaryBadge";
import { HillsDivider } from "@/components/brand/Art";
import { LineReveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { photos } from "@/data/photos";
import { featuredProducts } from "@/data/products";
import { href, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getAsset, getHeroPackaging, getPackshot } from "@/lib/assets";
import { HeroBackdrop, HeroFade, HeroFloat } from "./HeroMotion";

export function Hero({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const bg = getAsset(photos.valleySunrise.asset)!;
  const composite = getHeroPackaging();
  const packshots = featuredProducts
    .map((p) => ({ p, img: getPackshot(p.slug) }))
    .filter((x): x is { p: (typeof featuredProducts)[number]; img: NonNullable<ReturnType<typeof getPackshot>> } => !!x.img);
  const hasPackaging = !!composite || packshots.length > 0;

  return (
    <section className="relative isolate flex min-h-[max(92svh,640px)] items-end overflow-hidden bg-navy text-cream lg:min-h-[max(90vh,720px)]">
      <HeroBackdrop>
        <Image
          src={bg.src}
          alt={photos.valleySunrise.alt[locale]}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[60%_55%]"
        />
      </HeroBackdrop>
      {/* Legibility veils */}
      {/* Warm morning glow */}
      <div className="absolute inset-0 -z-0 bg-[radial-gradient(55%_65%_at_78%_18%,rgba(255,196,92,0.55),transparent_70%)] mix-blend-soft-light" />
      <div className="absolute inset-0 -z-0 bg-[linear-gradient(100deg,rgba(4,26,53,0.84)_0%,rgba(6,38,76,0.5)_36%,rgba(6,38,76,0)_64%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-0 h-1/2 bg-[linear-gradient(0deg,rgba(4,26,53,0.6),transparent)]" />
      <div className="absolute inset-x-0 top-0 h-36 bg-[linear-gradient(180deg,rgba(4,26,53,0.45),transparent)]" />

      <div className="container-x relative z-10 grid w-full grid-cols-1 items-end gap-10 pt-36 pb-28 lg:grid-cols-12 lg:pt-44 lg:pb-32">
        <div className="lg:col-span-8">
          <HeroFade delay={0.1}>
            <p className="eyebrow flex items-center gap-3 text-gold">
              <span className="h-px w-10 bg-gold" aria-hidden="true" />
              {t.hero.eyebrow}
            </p>
          </HeroFade>
          <LineReveal
            as="h1"
            animateOnMount
            delay={0.2}
            className="display mt-6 text-[3.3rem] sm:text-7xl lg:text-[6.4rem] xl:text-[7.4rem]"
            lines={[t.hero.titleA, t.hero.titleB]}
            lineClassNames={[undefined, "display-italic text-gold-soft"]}
          />
          <HeroFade delay={0.65}>
            <p className="mt-7 max-w-md text-lg leading-relaxed text-cream/85 lg:text-xl">{t.hero.body}</p>
          </HeroFade>
          <HeroFade delay={0.8} className="mt-9 flex flex-wrap items-center gap-3 sm:gap-4">
            <ButtonLink href={href("products", locale)} variant="gold">
              {t.hero.primary}
            </ButtonLink>
            <ButtonLink href={href("about", locale)} variant="outline-light">
              {t.hero.secondary}
            </ButtonLink>
          </HeroFade>
        </div>

        <div className="relative hidden justify-end sm:flex lg:col-span-4">
          {hasPackaging ? (
            <HeroFloat className="relative w-full max-w-[36rem] lg:translate-y-6">
              {composite ? (
                <Image
                  src={composite.src}
                  alt={featuredProducts.map((p) => `${p.name} ${p.size}`).join(", ")}
                  width={composite.width}
                  height={composite.height}
                  priority
                  sizes="(min-width: 1024px) 34rem, 60vw"
                  className="h-auto w-full drop-shadow-[0_40px_50px_rgba(4,26,53,0.55)]"
                />
              ) : (
                <div className="flex items-end justify-center">
                  {packshots.map(({ p, img }, i) => (
                    <Image
                      key={p.slug}
                      src={img.src}
                      alt={`${p.name} ${p.size}`}
                      width={img.width}
                      height={img.height}
                      priority
                      sizes="(min-width: 1024px) 22rem, 40vw"
                      className={`h-auto drop-shadow-[0_40px_45px_rgba(4,26,53,0.6)] ${
                        packshots.length === 1 ? "w-[74%]" : i === 0 ? "relative z-10 w-[56%]" : "-ml-[8%] w-[50%]"
                      }`}
                    />
                  ))}
                </div>
              )}
              <AnniversaryBadge
                top={t.hero.badgeTop}
                years={t.hero.badgeYears}
                className="absolute -top-10 -left-6 size-28 lg:size-32"
              />
            </HeroFloat>
          ) : (
            <HeroFloat>
              <AnniversaryBadge
                top={t.hero.badgeTop}
                years={t.hero.badgeYears}
                className="size-44 drop-shadow-[0_30px_40px_rgba(4,26,53,0.45)] lg:size-60"
              />
            </HeroFloat>
          )}
        </div>
      </div>

      {/* Mobile badge */}
      <AnniversaryBadge
        top={t.hero.badgeTop}
        years={t.hero.badgeYears}
        className="absolute top-28 right-5 z-10 size-24 sm:hidden"
      />

      <HeroFade delay={1.2} className="absolute bottom-16 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex">
        <span className="eyebrow text-[0.62rem] text-cream/70">{t.ui.scroll}</span>
        <span className="relative block h-12 w-px overflow-hidden bg-cream/25" aria-hidden="true">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_2.2s_var(--ease-soft)_infinite] bg-gold motion-reduce:animate-none" />
        </span>
      </HeroFade>

      <HillsDivider className="absolute -bottom-px left-0 z-10 h-[52px] w-full text-cream lg:h-[80px]" />
    </section>
  );
}
