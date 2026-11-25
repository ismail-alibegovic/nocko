import { Mail, Phone } from "lucide-react";
import { LineReveal, Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { company } from "@/data/company";
import { href, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

/** Split rounded CTA card: copy on a soft lime-cream wash, photo bleeding off the right edge. */
export function ContactCta({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const pill =
    "group press inline-flex items-center gap-3 rounded-full border border-navy/20 bg-paper/70 px-5 py-3.5 text-[0.95rem] font-semibold hover:bg-navy hover:text-cream";
  return (
    <section className="bg-cream px-3 pt-6 pb-20 sm:px-5 lg:px-6 lg:pb-28" aria-labelledby="cta-title">
      <div className="relative mx-auto grid max-w-[88rem] overflow-hidden rounded-[2rem] bg-[linear-gradient(120deg,#f1f4c8_0%,#f7f7e2_60%,#fbfbf3_100%)] lg:grid-cols-12 lg:rounded-[2.75rem]">
        <div className="relative z-10 p-7 sm:p-12 lg:col-span-7 lg:p-20">
          <Reveal>
            <p className="eyebrow text-green-deep">{t.nav.contact}</p>
          </Reveal>
          <LineReveal
            id="cta-title"
            lines={[t.contactCta.title]}
            className="display display-xl mt-4 text-5xl text-navy sm:text-6xl lg:text-7xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-md text-lg text-navy/75">{t.contactCta.body}</p>
            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <ButtonLink href={href("contact", locale)} variant="navy">
                {t.nav.contact}
              </ButtonLink>
              <a href={company.phoneHref} className={pill}>
                <Phone className="size-4" aria-hidden="true" />
                {company.phoneDisplay}
              </a>
              <a href={`mailto:${company.email}`} className={pill}>
                <Mail className="size-4" aria-hidden="true" />
                {company.email}
              </a>
            </div>
          </Reveal>
        </div>
        <Reveal y={0} className="relative min-h-[18rem] lg:col-span-5 lg:min-h-full">
          <Photo
            photo="milkPour"
            locale={locale}
            sizes="(min-width: 1024px) 38vw, 100vw"
            className="absolute inset-0"
            caption={t.ui.illustrative}
          />
        </Reveal>
      </div>
    </section>
  );
}
