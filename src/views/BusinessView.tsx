import { LineReveal, Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Business } from "@/components/sections/Business";
import { ContactCta } from "@/components/sections/ContactCta";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { href, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export function BusinessView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const title = locale === "bs" ? ["Rastimo", "zajedno."] : ["Let's grow", "together."];
  return (
    <>
      <PageHero locale={locale} eyebrow={t.business.eyebrow} title={title} body={t.businessPage.heroBody} photo="pastryTable" />
      <Business locale={locale} />
      <section className="grain bg-cream py-24 lg:py-32" aria-labelledby="how-title">
        <div className="container-x relative z-[2]">
          <LineReveal id="how-title" lines={[t.businessPage.howTitle]} className="display max-w-3xl text-5xl text-navy lg:text-7xl" />
          <Stagger className="mt-16 grid gap-12 md:grid-cols-3 md:gap-8" stagger={0.12}>
            {t.businessPage.how.map((s) => (
              <StaggerItem key={s.n} className="border-t-2 border-navy pt-8">
                <p className="display display-italic text-6xl text-gold">{s.n}</p>
                <h3 className="display mt-6 text-3xl text-navy">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-ink/75">{s.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="mt-16">
            <ButtonLink href={href("contact", locale)} variant="navy">
              {t.business.cta}
            </ButtonLink>
          </Reveal>
        </div>
      </section>
      <ContactCta locale={locale} />
    </>
  );
}
