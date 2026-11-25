import { HillsDivider } from "@/components/brand/Art";
import { ButtonLink } from "@/components/ui/Button";
import { href, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export function NotFoundView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden bg-navy pt-32 pb-40 text-cream">
      <div className="container-x">
        <p className="display display-italic display-xl text-[8rem] leading-none text-gold sm:text-[12rem]">404</p>
        <h1 className="display mt-4 text-5xl sm:text-6xl">{t.notFound.title}</h1>
        <p className="mt-5 max-w-md text-lg text-cream/80">{t.notFound.body}</p>
        <ButtonLink href={href("home", locale)} variant="gold" className="mt-10">
          {t.notFound.cta}
        </ButtonLink>
      </div>
      <HillsDivider className="absolute -bottom-px left-0 h-[60px] w-full text-cream" />
    </section>
  );
}
