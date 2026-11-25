import Image from "next/image";
import { Parallax } from "@/components/motion/Parallax";
import { LineReveal, Reveal } from "@/components/motion/Reveal";
import { Photo } from "@/components/ui/Photo";
import { featuredProducts } from "@/data/products";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getKitchenPhoto } from "@/lib/assets";

export function Lifestyle({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  // Approved Noćko kitchen photographs take the lead tiles as soon as they exist.
  const kitchen = featuredProducts
    .map((p) => ({ p, img: getKitchenPhoto(p.slug) }))
    .filter((x) => x.img);
  const [lines0, lines1] = locale === "bs" ? ["Mali trenuci.", "Veliki okus."] : ["Small moments.", "Big taste."];

  return (
    <section className="relative overflow-hidden bg-navy py-24 text-cream lg:py-36" aria-labelledby="lifestyle-title">
      <div className="pointer-events-none absolute -top-40 -left-40 size-[36rem] rounded-full bg-blue/50 blur-[120px]" />
      <div className="container-x relative">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow text-gold">{t.lifestyle.eyebrow}</p>
            </Reveal>
            <LineReveal
              id="lifestyle-title"
              lines={[lines0, lines1]}
              lineClassNames={[undefined, "display-italic text-gold"]}
              className="display display-xl mt-5 text-5xl sm:text-7xl lg:text-[6.5rem]"
            />
          </div>
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.15}>
            <p className="text-lg leading-relaxed text-cream/80">{t.lifestyle.body}</p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-6 gap-3 sm:gap-4 lg:mt-24 lg:grid-cols-12 lg:gap-5">
          <Reveal y={60} className="col-span-6 lg:col-span-7 lg:row-span-2">
            <Parallax className="aspect-[4/5] rounded-[1.75rem] sm:aspect-[5/4] lg:aspect-auto lg:h-full lg:min-h-[44rem]" offset={50} scale={1.12}>
              {kitchen[0]?.img ? (
                <Image
                  src={kitchen[0].img.src}
                  alt={`${kitchen[0].p.name} ${kitchen[0].p.size}`}
                  fill
                  sizes="(min-width: 1024px) 55vw, 92vw"
                  className="object-cover"
                />
              ) : (
                <Photo photo="gardenBreakfast" locale={locale} sizes="(min-width: 1024px) 55vw, 92vw" className="h-full w-full" />
              )}
            </Parallax>
          </Reveal>
          <Reveal y={60} delay={0.1} className="col-span-6 lg:col-span-5">
            <Parallax className="aspect-[16/11] rounded-[1.75rem]" offset={30} scale={1.1}>
              {kitchen[1]?.img ? (
                <Image
                  src={kitchen[1].img.src}
                  alt={`${kitchen[1].p.name} ${kitchen[1].p.size}`}
                  fill
                  sizes="(min-width: 1024px) 40vw, 92vw"
                  className="object-cover"
                />
              ) : (
                <Photo photo="loaf" locale={locale} sizes="(min-width: 1024px) 40vw, 92vw" className="h-full w-full" />
              )}
            </Parallax>
          </Reveal>
          <Reveal y={60} delay={0.2} className="col-span-3 lg:col-span-2">
            <div className="relative aspect-[3/4] overflow-hidden rounded-t-[999px] rounded-b-[1.25rem] lg:h-full lg:aspect-auto">
              <Photo photo="pastriesTray" locale={locale} sizes="(min-width: 1024px) 16vw, 45vw" className="h-full w-full" />
            </div>
          </Reveal>
          <Reveal y={60} delay={0.3} className="col-span-3 lg:col-span-3">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[1.25rem] lg:aspect-[4/5]">
              <Photo photo="pastryTable" locale={locale} sizes="(min-width: 1024px) 24vw, 45vw" className="h-full w-full" />
            </div>
          </Reveal>
        </div>
        <Reveal>
          <p className="mt-6 text-xs tracking-[0.08em] text-cream/70">{t.lifestyle.note}</p>
        </Reveal>
      </div>
    </section>
  );
}
