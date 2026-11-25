import { LineReveal, Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { photos, type PhotoKey } from "@/data/photos";
import { href, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getAsset } from "@/lib/assets";
import { FarmSequence, type FarmStep } from "./FarmSequence";

// Stage 03 (packaging) intentionally has no photograph: we have no images of the
// actual facility and will not imply one.
const stepPhotos: (PhotoKey | null)[] = ["milkCans", "milkPour", null, "breadAndMilk"];

export function FarmToTable({
  locale,
  showIntro = true,
  showCta = true,
}: {
  locale: Locale;
  showIntro?: boolean;
  showCta?: boolean;
}) {
  const t = getDictionary(locale);
  const steps: FarmStep[] = t.farm.steps.map((s, i) => {
    const key = stepPhotos[i];
    const asset = key ? getAsset(photos[key].asset) : null;
    return { ...s, image: key && asset ? { src: asset.src, alt: photos[key].alt[locale] } : null };
  });

  return (
    <section className="grain bg-cream py-24 lg:py-28" aria-labelledby={showIntro ? "farm-title" : undefined}>
      <div className="container-x relative z-[2]">
        {showIntro && (
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="eyebrow text-green">{t.farm.eyebrow}</p>
              </Reveal>
              <LineReveal
                id="farm-title"
                lines={[t.farm.title]}
                className="display display-xl mt-5 text-5xl text-navy sm:text-6xl lg:text-[5.25rem]"
              />
            </div>
            <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.15}>
              <p className="text-lg leading-relaxed text-muted">{t.farm.intro}</p>
              {showCta && (
                <ButtonLink href={href("farm", locale)} variant="text-dark" className="mt-4">
                  {t.farm.cta}
                </ButtonLink>
              )}
            </Reveal>
          </div>
        )}
        <div className={showIntro ? "mt-16 lg:mt-8" : ""}>
          <FarmSequence steps={steps} caption={t.ui.illustrative} />
        </div>
      </div>
    </section>
  );
}
