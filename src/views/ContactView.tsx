import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { company, mapsEmbed, mapsLink } from "@/data/company";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export function ContactView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const c = t.contact;
  const title = locale === "bs" ? ["Razgovarajmo."] : ["Let's talk."];

  return (
    <>
      <PageHero locale={locale} eyebrow={c.heroEyebrow} title={title} body={c.heroBody} photo="mistyFarmhouse" />

      <section className="grain bg-cream py-20 lg:py-28">
        <div className="container-x relative z-[2] grid gap-16 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-7">
            <ContactForm
              email={company.email}
              phoneHref={company.phoneHref}
              phoneDisplay={company.phoneDisplay}
              labels={{
                formTitle: c.formTitle,
                fields: c.fields,
                optional: c.optional,
                subjects: c.subjects,
                subjectPlaceholder: c.subjectPlaceholder,
                submit: c.submit,
                errors: c.errors,
                demoTitle: c.demoTitle,
                demoBody: c.demoBody,
                demoMail: c.demoMail,
                reset: c.reset,
                call: c.call,
              }}
            />
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-4 lg:col-start-9">
            <aside className="rounded-[1.75rem] bg-navy p-8 text-cream lg:sticky lg:top-28 lg:p-10" aria-labelledby="details-title">
              <h2 id="details-title" className="eyebrow text-gold">
                {c.detailsTitle}
              </h2>
              <p className="display mt-6 text-2xl leading-snug">{company.legalName}</p>

              <dl className="mt-8 space-y-7">
                <div>
                  <dt className="eyebrow flex items-center gap-3 text-[0.65rem] text-cream/70">
                    <MapPin className="size-5 shrink-0 text-gold" aria-hidden="true" />
                    {c.address}
                  </dt>
                  <dd className="mt-1.5 pl-8 leading-relaxed">
                    {company.street}
                    <br />
                    {company.postalCode} {company.city}
                    <br />
                    {company.country[locale]}
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow flex items-center gap-3 text-[0.65rem] text-cream/70">
                    <Mail className="size-5 shrink-0 text-gold" aria-hidden="true" />
                    {c.email}
                  </dt>
                  <dd className="mt-1.5 pl-8">
                    <a href={`mailto:${company.email}`} className="link-underline text-lg">
                      {company.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow flex items-center gap-3 text-[0.65rem] text-cream/70">
                    <Phone className="size-5 shrink-0 text-gold" aria-hidden="true" />
                    {c.phone}
                  </dt>
                  <dd className="mt-1.5 pl-8">
                    <a href={company.phoneHref} className="link-underline text-lg">
                      {company.phoneDisplay}
                    </a>
                  </dd>
                </div>
              </dl>

              <div className="mt-10 flex flex-col gap-3">
                <a
                  href={company.phoneHref}
                  className="inline-flex items-center justify-center gap-3 rounded-full bg-gold px-6 py-3.5 font-semibold text-navy press hover:bg-[#ffd552]"
                >
                  <Phone className="size-4" aria-hidden="true" />
                  {c.call}
                </a>
                <a
                  href={`mailto:${company.email}`}
                  className="inline-flex items-center justify-center gap-3 rounded-full border border-cream/35 px-6 py-3.5 font-semibold press hover:bg-cream/10"
                >
                  <Mail className="size-4" aria-hidden="true" />
                  {c.write}
                </a>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream pb-40 lg:pb-48" aria-label={c.mapTitle}>
        <div className="container-x">
          <Reveal y={40}>
            <div className="relative overflow-hidden rounded-[2rem] border-4 border-gold bg-cream-deep">
              <iframe
                title={c.mapTitle}
                src={mapsEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-[420px] w-full grayscale-[35%] sepia-[12%] lg:h-[520px]"
              />
              <a
                href={mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-4 right-4 inline-flex items-center gap-2 rounded-full bg-navy px-5 py-3 text-sm font-semibold text-cream shadow-lg press hover:bg-blue"
              >
                {c.directions}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
