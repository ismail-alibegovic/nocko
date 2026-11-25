import { HillsDivider } from "@/components/brand/Art";
import { LineReveal, Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { FarmToTable } from "@/components/sections/FarmToTable";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { href, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export function FarmView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const title = locale === "bs" ? ["Od farme", "do vašeg stola."] : ["From the farm", "to your table."];
  return (
    <>
      <PageHero locale={locale} eyebrow={t.farm.eyebrow} title={title} body={t.farmPage.heroBody} photo="cowsHillside" />
      <section className="bg-cream pt-20 lg:pt-28">
        <div className="container-x">
          <Reveal>
            <p className="max-w-3xl text-2xl leading-relaxed text-navy lg:text-3xl display">{t.farm.intro}</p>
          </Reveal>
        </div>
      </section>
      <FarmToTable locale={locale} showIntro={false} />

      <section className="relative overflow-hidden bg-navy text-cream">
        <HillsDivider className="absolute -top-px left-0 h-[48px] w-full rotate-180 text-cream lg:h-[72px]" />
        <div className="relative h-[70vh] min-h-[480px]">
          <Parallax className="absolute inset-0" offset={60} scale={1.15}>
            <Photo photo="valleySunrise" locale={locale} sizes="100vw" className="h-full w-full" />
          </Parallax>
          <div className="absolute inset-0 bg-navy/55" />
          <div className="container-x relative flex h-full flex-col items-start justify-center">
            <LineReveal lines={[t.farmPage.closingTitle]} className="display display-xl max-w-3xl text-5xl sm:text-6xl lg:text-7xl" />
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-lg text-lg text-cream/85">{t.farmPage.closingBody}</p>
              <ButtonLink href={href("products", locale)} variant="gold" className="mt-10">
                {t.hero.primary}
              </ButtonLink>
            </Reveal>
          </div>
        </div>
        <div className="h-24 bg-navy" />
      </section>
    </>
  );
}
