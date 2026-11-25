import { Sprig } from "@/components/brand/Art";
import { Parallax } from "@/components/motion/Parallax";
import { LineReveal, Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { href, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Timeline } from "./Timeline";

export function BrandStory({ locale, showCta = true, id }: { locale: Locale; showCta?: boolean; id?: string }) {
  const t = getDictionary(locale);
  return (
    <section id={id} className="relative overflow-hidden bg-paper py-24 lg:py-36" aria-labelledby="story-title">
      <div className="container-x">
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
          {/* Oval-framed photography — the logo's shape as a recurring motif */}
          <div className="relative mx-auto w-full max-w-[30rem] lg:col-span-5 lg:max-w-none">
            <Reveal y={50} className="relative">
              <div className="absolute -inset-3 oval border border-gold sm:-inset-4" aria-hidden="true" />
              <Parallax className="oval relative aspect-[4/5] bg-cream-deep" offset={40} scale={1.12}>
                <Photo
                  photo="mistyFarmhouse"
                  locale={locale}
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="h-full w-full"
                />
              </Parallax>
              <span className="absolute bottom-[8%] left-1/2 -translate-x-1/2 rounded-full bg-navy/60 px-3 py-1 text-[0.6rem] font-semibold tracking-[0.14em] whitespace-nowrap text-cream uppercase backdrop-blur-sm">
                {t.ui.illustrative}
              </span>
            </Reveal>
            <Reveal delay={0.25} className="absolute -right-2 -bottom-10 w-[42%] sm:-right-8 lg:-right-14">
              <div className="aspect-square overflow-hidden rounded-full border-[6px] border-paper shadow-[0_30px_60px_-30px_rgba(6,38,76,0.5)]">
                <Photo photo="cowsMeadow" locale={locale} sizes="(min-width: 1024px) 18vw, 40vw" className="h-full w-full" />
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <p className="eyebrow text-green">{t.story.eyebrow}</p>
            </Reveal>
            <LineReveal
              id="story-title"
              lines={locale === "bs" ? ["Tri decenije", "tradicije."] : ["Three decades", "of tradition."]}
              lineClassNames={[undefined, "display-italic"]}
              className="display display-xl mt-5 text-5xl text-navy sm:text-6xl lg:text-[5.25rem]"
            />
            <Reveal delay={0.1}>
              <Sprig className="mt-8 w-28 text-green" />
              <p className="mt-8 text-lg leading-relaxed text-ink/80 lg:text-xl">{t.story.p1}</p>
              <p className="mt-5 text-lg leading-relaxed text-ink/70">{t.story.p2}</p>
              {showCta && (
                <ButtonLink href={href("about", locale)} variant="navy" className="mt-10">
                  {t.story.cta}
                </ButtonLink>
              )}
            </Reveal>
          </div>
        </div>

        <div className="mt-28 lg:mt-36">
          <Timeline title={t.story.timelineTitle} items={t.story.timeline} />
        </div>
      </div>
    </section>
  );
}
