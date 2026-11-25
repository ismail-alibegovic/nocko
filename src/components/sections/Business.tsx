import { LineReveal, Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { ButtonLink } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { href, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export function Business({ locale, showPhoto = true }: { locale: Locale; showPhoto?: boolean }) {
  const t = getDictionary(locale);
  const [a, b] = locale === "bs" ? ["Rastimo", "zajedno."] : ["Let's grow", "together."];
  return (
    <section className="relative overflow-hidden bg-green-deep py-24 text-cream lg:py-36" aria-labelledby="business-title">
      <svg
        viewBox="0 0 1440 300"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[38%] w-full text-green opacity-55"
        aria-hidden="true"
      >
        <path d="M0 210 C 220 120 420 130 640 190 C 860 250 1080 150 1440 130 V300 H0Z" fill="currentColor" />
      </svg>
      <div className="container-x relative">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow text-gold">{t.business.eyebrow}</p>
            </Reveal>
            <LineReveal
              id="business-title"
              lines={[a, b]}
              lineClassNames={[undefined, "display-italic text-gold"]}
              className="display mt-5 text-5xl sm:text-7xl lg:text-[6rem]"
            />
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-md text-lg leading-relaxed text-cream/85">{t.business.body}</p>
              <ButtonLink href={href("contact", locale)} variant="gold" className="mt-10">
                {t.business.cta}
              </ButtonLink>
            </Reveal>
            {showPhoto && (
              <Reveal delay={0.2} className="mt-14 hidden lg:block">
                <Parallax className="aspect-[5/4] w-4/5 rounded-t-[999px] rounded-b-[1.5rem]" offset={30} scale={1.1}>
                  <Photo
                    photo="pastriesTray"
                    locale={locale}
                    sizes="30vw"
                    className="h-full w-full"
                    caption={t.ui.illustrative}
                  />
                </Parallax>
              </Reveal>
            )}
          </div>

          <Stagger className="lg:col-span-6 lg:col-start-7" stagger={0.15}>
            <ol className="border-t border-cream/20">
              {t.business.segments.map((s, i) => (
                <StaggerItem
                  as="li"
                  key={s.title}
                  className="group grid grid-cols-[3.5rem_1fr] gap-4 border-b border-cream/20 py-10 sm:grid-cols-[5rem_1fr] lg:py-12"
                >
                    <span className="display display-italic text-4xl text-gold sm:text-5xl">0{i + 1}</span>
                    <div>
                      <h3 className="display text-3xl sm:text-4xl">{s.title}</h3>
                      <p className="mt-4 max-w-lg leading-relaxed text-cream/80">{s.body}</p>
                    </div>
                </StaggerItem>
              ))}
            </ol>
            <Reveal>
              <p className="mt-6 text-sm text-cream/60">{t.business.note}</p>
            </Reveal>
          </Stagger>
        </div>
      </div>
    </section>
  );
}
