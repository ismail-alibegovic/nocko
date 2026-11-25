import { Calendar, Factory, MapPin, Milk } from "lucide-react";
import { LineReveal, Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Photo } from "@/components/ui/Photo";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

const icons = [Calendar, Factory, MapPin, Milk];

/** Four verified company facts as staggered rounded cards (deep green / lime). */
export function Pillars({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <section className="bg-cream py-20 lg:py-32" aria-labelledby="pillars-title">
      <div className="container-x">
        <div className="max-w-2xl">
          <Reveal>
            <p className="eyebrow text-green-deep">{t.pillars.eyebrow}</p>
          </Reveal>
          <LineReveal
            id="pillars-title"
            lines={[t.pillars.title]}
            className="display display-xl mt-4 text-5xl text-navy sm:text-6xl lg:text-7xl"
          />
        </div>

        <div className="mt-12 grid items-center gap-8 lg:mt-16 lg:grid-cols-12 lg:gap-12">
          <Reveal y={40} className="relative lg:col-span-4">
            <Photo
              photo="stoneHouse"
              locale={locale}
              sizes="(min-width: 1024px) 28vw, 90vw"
              className="aspect-[4/3] rounded-[2rem] bg-cream-deep lg:aspect-[3/4]"
              caption={t.pillars.imageNote}
            />
          </Reveal>

          <Stagger className="flex flex-col gap-4 lg:col-span-8" stagger={0.12}>
            {t.pillars.items.map((item, i) => {
              const Icon = icons[i] ?? Milk;
              const lime = i % 2 === 1;
              return (
                <StaggerItem key={item.title}>
                  <article
                    className={`flex items-center gap-5 rounded-[1.5rem] p-5 sm:gap-6 sm:p-6 lg:w-[88%] ${
                      lime ? "bg-gold text-navy lg:ml-auto" : "bg-navy text-cream"
                    }`}
                  >
                    <span
                      className={`grid size-14 shrink-0 place-items-center rounded-full sm:size-16 ${
                        lime ? "bg-navy text-gold" : "bg-gold text-navy"
                      }`}
                      aria-hidden="true"
                    >
                      <Icon className="size-6 sm:size-7" strokeWidth={1.75} />
                    </span>
                    <div>
                      <h3 className="display text-2xl sm:text-3xl">{item.title}</h3>
                      <p className={`mt-1.5 max-w-md text-[0.95rem] leading-snug ${lime ? "text-navy/80" : "text-cream/80"}`}>
                        {item.body}
                      </p>
                    </div>
                  </article>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
