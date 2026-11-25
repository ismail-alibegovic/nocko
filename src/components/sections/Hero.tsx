import Image from "next/image";
import { LineReveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { photos } from "@/data/photos";
import { featuredProducts } from "@/data/products";
import { href, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getAsset, getHeroPackaging, getPackshot } from "@/lib/assets";
import { HeroBackdrop, HeroFade, HeroFloat } from "./HeroMotion";

/**
 * Hero as a rounded "stage" card inset on the sage page ground, with a large
 * ghost wordmark behind the message. Static first frame is complete without JS.
 */
export function Hero({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const bg = getAsset(photos.cowsMeadow.asset) ?? getAsset(photos.valleySunrise.asset)!;
  const bgPhoto = getAsset(photos.cowsMeadow.asset) ? photos.cowsMeadow : photos.valleySunrise;
  const composite = getHeroPackaging();
  const packshots = featuredProducts
    .map((p) => ({ p, img: getPackshot(p.slug) }))
    .filter((x): x is { p: (typeof featuredProducts)[number]; img: NonNullable<ReturnType<typeof getPackshot>> } => !!x.img);

  return (
    <section className="bg-sage px-3 pt-[5rem] pb-3 sm:px-5 lg:px-6 lg:pt-[5.75rem]" aria-label="Noćko">
      <div className="relative isolate flex min-h-[max(80svh,620px)] items-end overflow-hidden rounded-[2rem] bg-navy-deep text-cream lg:min-h-[max(82vh,700px)] lg:rounded-[2.75rem]">
        <HeroBackdrop>
          <Image
            src={bg.src}
            alt={bgPhoto.alt[locale]}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[60%_55%]"
          />
        </HeroBackdrop>
        {/* Green legibility veils: left for copy, bottom for depth */}
        <div className="absolute inset-0 -z-0 bg-[linear-gradient(100deg,rgba(7,54,36,0.88)_0%,rgba(11,74,50,0.55)_38%,rgba(11,74,50,0.05)_68%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-0 h-1/2 bg-[linear-gradient(0deg,rgba(7,54,36,0.55),transparent)]" />

        {/* Ghost wordmark: decorative, behind the message */}
        <span
          aria-hidden="true"
          className="display pointer-events-none absolute inset-x-0 top-[6%] z-0 text-center text-[27vw] leading-none font-semibold tracking-[-0.04em] text-cream/[0.18] select-none lg:top-[2%] lg:text-[21rem]"
          style={{ fontVariationSettings: '"SOFT" 100, "WONK" 0' }}
        >
          NOĆKO
        </span>

        <div className="container-x relative z-10 grid w-full grid-cols-1 items-end gap-10 pt-40 pb-10 lg:grid-cols-12 lg:pb-14">
          <div className="lg:col-span-7">
            <HeroFade delay={0.1}>
              <p className="inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-[0.72rem] font-bold tracking-[0.16em] text-navy uppercase">
                <span className="size-1.5 rounded-full bg-navy" aria-hidden="true" />
                {t.hero.eyebrow}
              </p>
            </HeroFade>
            <LineReveal
              as="h1"
              animateOnMount
              delay={0.2}
              className="display display-xl mt-6 text-[3.1rem] sm:text-7xl lg:text-[5.6rem] xl:text-[6.4rem]"
              lines={[t.hero.titleA, t.hero.titleB]}
              lineClassNames={[undefined, "display-italic text-gold"]}
            />
            <HeroFade delay={0.65}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-cream/90 lg:text-lg">{t.hero.body}</p>
            </HeroFade>
            <HeroFade delay={0.8} className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <ButtonLink href={href("products", locale)} variant="gold">
                {t.hero.primary}
              </ButtonLink>
              <ButtonLink href={href("about", locale)} variant="outline-light">
                {t.hero.secondary}
              </ButtonLink>
            </HeroFade>
          </div>

          <div className="relative hidden justify-end lg:col-span-5 lg:flex">
            {composite || packshots.length > 0 ? (
              <HeroFloat className="relative w-full max-w-[30rem]">
                {composite ? (
                  <Image
                    src={composite.src}
                    alt={featuredProducts.map((p) => `${p.name} ${p.size}`).join(", ")}
                    width={composite.width}
                    height={composite.height}
                    priority
                    sizes="30rem"
                    className="h-auto w-full drop-shadow-[0_40px_50px_rgba(7,54,36,0.55)]"
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
                        sizes="20rem"
                        className={`h-auto drop-shadow-[0_40px_45px_rgba(7,54,36,0.6)] ${i === 0 ? "relative z-10 w-[56%]" : "-ml-[8%] w-[50%]"}`}
                      />
                    ))}
                  </div>
                )}
              </HeroFloat>
            ) : (
              /* Packaging not yet supplied: an honest 30-year chip instead of invented packshots */
              <HeroFloat>
                <div className="rounded-[1.75rem] border border-cream/25 bg-cream/12 p-6 backdrop-blur-md">
                  <p className="eyebrow text-gold">{t.hero.badgeTop}</p>
                  <p className="display display-xl mt-2 text-6xl">{t.hero.badgeYears}</p>
                </div>
              </HeroFloat>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
