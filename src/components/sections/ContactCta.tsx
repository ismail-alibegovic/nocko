import { Mail, Phone } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { company } from "@/data/company";
import { href, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export function ContactCta({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <section className="bg-gold pt-20 pb-36 text-navy lg:pt-24 lg:pb-44" aria-labelledby="cta-title">
      <div className="container-x flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <Reveal>
          <h2 id="cta-title" className="display text-5xl sm:text-6xl lg:text-7xl">
            {t.contactCta.title}
          </h2>
          <p className="mt-4 max-w-md text-lg text-navy/80">{t.contactCta.body}</p>
        </Reveal>
        <Reveal delay={0.1} className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
          <a
            href={company.phoneHref}
            className="group inline-flex items-center gap-3 rounded-full border border-navy/25 px-6 py-4 font-semibold transition-colors hover:bg-navy hover:text-cream"
          >
            <Phone className="size-4" aria-hidden="true" />
            {company.phoneDisplay}
          </a>
          <a
            href={`mailto:${company.email}`}
            className="group inline-flex items-center gap-3 rounded-full border border-navy/25 px-6 py-4 font-semibold transition-colors hover:bg-navy hover:text-cream"
          >
            <Mail className="size-4" aria-hidden="true" />
            {company.email}
          </a>
          <ButtonLink href={href("contact", locale)} variant="navy">
            {t.nav.contact}
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
