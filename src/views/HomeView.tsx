import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { BrandStory } from "@/components/sections/BrandStory";
import { FarmToTable } from "@/components/sections/FarmToTable";
import { Lifestyle } from "@/components/sections/Lifestyle";
import { CategoriesTeaser } from "@/components/sections/CategoriesTeaser";
import { Business } from "@/components/sections/Business";
import { ContactCta } from "@/components/sections/ContactCta";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export function HomeView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <>
      <Hero locale={locale} />
      <Marquee words={t.marquee} className="bg-cream text-navy" />
      <FeaturedProducts locale={locale} />
      <BrandStory locale={locale} id="prica" />
      <FarmToTable locale={locale} />
      <Lifestyle locale={locale} />
      <CategoriesTeaser locale={locale} />
      <Business locale={locale} />
      <ContactCta locale={locale} />
    </>
  );
}
