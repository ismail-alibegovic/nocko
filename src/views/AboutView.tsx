import { CategoryArt, MilkCanArt, QualityArt } from "@/components/brand/Art";
import { Parallax } from "@/components/motion/Parallax";
import { LineReveal, Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { BrandStory } from "@/components/sections/BrandStory";
import { ContactCta } from "@/components/sections/ContactCta";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { company, mapsLink } from "@/data/company";
import { href, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export function AboutView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const whatArt = [
    <MilkCanArt key="a" className="size-16 text-green" />,
    <QualityArt key="b" className="size-16 text-green" />,
    <CategoryArt key="c" category="jogurt" className="size-16 text-green" />,
  ];
  const titleLines = locale === "bs" ? ["Domaće.", "Od 1996."] : ["Homegrown.", "Since 1996."];

  return (
    <>
      <PageHero locale={locale} eyebrow={t.about.heroEyebrow} title={titleLines} body={t.about.heroBody} photo="stoneHouse" nextBg="paper" />
      <BrandStory locale={locale} showCta={false} />

      {/* What we do */}
      <section className="grain bg-cream py-24 lg:py-32" aria-labelledby="what-title">
        <div className="container-x relative z-[2]">
          <LineReveal id="what-title" lines={[t.about.whatTitle]} className="display text-5xl text-navy lg:text-7xl" />
          <Stagger className="mt-14 grid gap-px overflow-hidden rounded-[1.5rem] bg-navy/12 md:grid-cols-3" stagger={0.12}>
            {t.about.what.map((w, i) => {
              return (
                <StaggerItem key={w.title} className="bg-cream p-8 lg:p-12">
                  {whatArt[i]}
                  <p className="eyebrow mt-8 text-muted">0{i + 1}</p>
                  <h3 className="display mt-3 text-3xl text-navy lg:text-4xl">{w.title}</h3>
                  <p className="mt-4 leading-relaxed text-ink/75">{w.body}</p>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* Values — editorial band */}
      <section className="relative overflow-hidden bg-navy py-24 text-cream lg:py-32" aria-labelledby="values-title">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <LineReveal id="values-title" lines={[t.about.valuesTitle]} className="display text-5xl lg:text-7xl" />
            <Reveal delay={0.15} className="mt-12 hidden lg:block">
              <Parallax className="oval aspect-[4/5] w-4/5" offset={30} scale={1.12}>
                <Photo photo="cowsHillside" locale={locale} sizes="30vw" className="h-full w-full" />
              </Parallax>
            </Reveal>
          </div>
          <ol className="lg:col-span-6 lg:col-start-7">
            {t.about.values.map((v, i) => (
              <Reveal as="li" key={v.title} delay={i * 0.1} className="border-b border-cream/15 py-10 first:border-t lg:py-14">
                <p className="display display-italic text-2xl text-gold">0{i + 1}</p>
                <h3 className="display mt-3 text-4xl lg:text-6xl">{v.title}</h3>
                <p className="mt-4 max-w-md text-lg text-cream/75">{v.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Location */}
      <section className="bg-paper py-24 lg:py-32" aria-labelledby="location-title">
        <div className="container-x grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <LineReveal id="location-title" lines={[t.about.locationTitle]} className="display text-5xl text-navy lg:text-6xl" />
            <Reveal delay={0.1}>
              <p className="mt-6 text-lg leading-relaxed text-ink/75">{t.about.locationBody}</p>
              <address className="mt-8 text-lg leading-relaxed text-navy not-italic">
                <strong className="font-semibold">{company.legalName}</strong>
                <br />
                {company.street}
                <br />
                {company.postalCode} {company.city}, {company.country[locale]}
              </address>
              <div className="mt-10 flex flex-wrap gap-3">
                <ButtonLink href={href("contact", locale)} variant="navy">
                  {t.nav.contact}
                </ButtonLink>
                <ButtonLink href={mapsLink} external icon="external" variant="outline-dark">
                  {t.contact.directions}
                </ButtonLink>
              </div>
            </Reveal>
          </div>
          <Reveal y={50} className="lg:col-span-6 lg:col-start-7">
            <Parallax className="aspect-[5/4] rounded-t-[999px] rounded-b-[2rem]" offset={40} scale={1.12}>
              <Photo photo="valleySunrise" locale={locale} sizes="(min-width: 1024px) 45vw, 92vw" className="h-full w-full" caption={t.ui.illustrative} />
            </Parallax>
          </Reveal>
        </div>
      </section>

      <ContactCta locale={locale} />
    </>
  );
}
