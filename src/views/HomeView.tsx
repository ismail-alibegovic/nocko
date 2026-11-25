import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { ProductVisual } from "@/components/product/ProductVisual";
import { formatFat, getProduct } from "@/data/products";
import { href, productHref, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import styles from "./HomeView.module.css";

const showcase = [
  { product: getProduct("tecni-jogurt-1kg")!, tone: "jogurt" },
  { product: getProduct("domaca-pavlaka-800g")!, tone: "pavlaka" },
  { product: getProduct("jogurt-1l")!, tone: "bottle" },
] as const;

const copy = {
  bs: {
    hero: ["Domaće za", "svaki dan."],
    intro: "Jogurt uz toplu pitu, pavlaka uz domaći hljeb. Noćko za obroke kojima se uvijek vraćamo.",
    explore: "Upoznaj proizvode",
    packaging: "Pogledaj ambalažu",
    studioAlt: "Studijski prikaz Noćko jogurta u vrećici i boci te domaće pavlake u novoj ambalaži",
    reveal: "Prijedlog redizajna",
    range: "Naši proizvodi",
    all: "Cijeli asortiman",
    campaign: "Doručak ima svoj ritam.",
    campaignAlt: "Reklamni vizual s tri Noćko pakovanja na plavim postoljima",
    about: "Upoznajte Noćko",
    aboutBody: "Naša priča počinje u Živinicama. Saznajte više o mljekari i putu od mlijeka do gotovog proizvoda.",
    businessBody: "Za upite o distribuciji, ugostiteljstvu i poslovnoj saradnji.",
  },
  en: {
    hero: ["A taste of home,", "every day."],
    intro: "Yogurt with warm pita, sour cream with homemade bread. Noćko for the meals we keep coming back to.",
    explore: "Explore products",
    packaging: "See the packaging",
    studioAlt: "Studio view of the proposed packaging for Noćko yogurt pouches and bottles and homestyle sour cream",
    reveal: "Packaging redesign concept",
    range: "Our products",
    all: "Full product range",
    campaign: "Breakfast has a rhythm of its own.",
    campaignAlt: "Campaign artwork with three Noćko products on blue podiums",
    about: "Meet Noćko",
    aboutBody: "Our story begins in Živinice. Learn about the dairy and the journey from milk to finished product.",
    businessBody: "Get in touch about distribution, hospitality and partnerships.",
  },
} as const;

export function HomeView({ locale }: { locale: Locale }) {
  const c = copy[locale];
  const t = getDictionary(locale);
  return (
    <div className={styles.home}>
      <section className={`container-x ${styles.hero}`} aria-labelledby="home-title">
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>{c.reveal}</p>
          <h1 id="home-title">{c.hero[0]} <em>{c.hero[1]}</em></h1>
          <p className={styles.intro}>{c.intro}</p>
          <div className={styles.actions}>
            <Link className={styles.primary} href={href("products", locale)}>
              {c.explore} <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <Link className={styles.textLink} href="#ambalaza">
              {c.packaging} <ArrowDown size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
        <figure className={styles.studio}>
          <Image
            src="/images/concept/ambalaza.webp"
            alt={c.studioAlt}
            width={1800}
            height={1200}
            sizes="(min-width: 1024px) 58vw, 94vw"
            preload
          />
        </figure>
      </section>

      <section id="ambalaza" className={`container-x ${styles.range}`} aria-labelledby="range-title">
        <div className={styles.sectionHeading}>
          <h2 id="range-title">{c.range}</h2>
          <Link href={href("products", locale)} className={styles.textLink}>
            {c.all} <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>
        <ul className={styles.products}>
          {showcase.map(({ product, tone }) => (
            <li key={product.slug}>
              <Link href={productHref(product.slug, locale)} className={`group ${styles.card}`}>
                <ProductVisual
                  product={product}
                  locale={locale}
                  sizes="(min-width: 1024px) 28vw, (min-width: 680px) 32vw, 92vw"
                  className={`${styles.cardImage} ${styles[tone]}`}
                />
                <div className={styles.cardBody}>
                  <div>
                    <h3>{locale === "bs" ? product.name : product.descriptor}</h3>
                    <p>{product.size} <span aria-hidden="true">·</span> {formatFat(product.fat, locale)} {t.ui.milkFatShort}</p>
                  </div>
                  <ArrowUpRight size={20} aria-hidden="true" />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.campaign} aria-labelledby="campaign-title">
        <h2 id="campaign-title" className="sr-only">{c.campaign}</h2>
        <Image
          src="/images/concept/kampanja.webp"
          alt={c.campaignAlt}
          width={2000}
          height={1334}
          sizes="(min-width: 1408px) 1408px, 100vw"
        />
      </section>

      <section className={`container-x ${styles.more}`} aria-label={c.about}>
        <Link className={styles.moreCard} href={href("about", locale)}>
          <div><h2>{c.about}</h2><p>{c.aboutBody}</p></div>
          <ArrowUpRight size={22} aria-hidden="true" />
        </Link>
        <Link className={styles.moreCard} href={href("business", locale)}>
          <div><h2>{t.nav.business}</h2><p>{c.businessBody}</p></div>
          <ArrowUpRight size={22} aria-hidden="true" />
        </Link>
      </section>
    </div>
  );
}
