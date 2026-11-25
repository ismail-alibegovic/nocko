import type { Locale } from "@/i18n/config";

export type CategoryId = "mlijeko" | "jogurt" | "pavlaka" | "ayran";

export const categories: { id: CategoryId; name: Record<Locale, string>; blurb: Record<Locale, string> }[] = [
  {
    id: "mlijeko",
    name: { bs: "Mlijeko", en: "Milk" },
    blurb: { bs: "Za jutarnju kafu, kakao i kuhinju.", en: "For morning coffee, cocoa and cooking." },
  },
  {
    id: "jogurt",
    name: { bs: "Jogurt", en: "Yogurt" },
    blurb: { bs: "Uz pitu, doručak ili kao osvježenje.", en: "With pita, at breakfast or as a refreshment." },
  },
  {
    id: "pavlaka",
    name: { bs: "Pavlaka", en: "Sour cream" },
    blurb: { bs: "Za sarmu, čorbe, priloge i domaći hljeb.", en: "For sarma, soups, sides and homemade bread." },
  },
  {
    id: "ayran",
    name: { bs: "Ayran", en: "Ayran" },
    blurb: { bs: "Lagan i osvježavajući, uz ćevape i roštilj.", en: "Light and refreshing, with ćevapi and grills." },
  },
];

export type Product = {
  slug: string;
  category: CategoryId;
  /** Product name exactly as supplied by the client. */
  name: string;
  /** Short English descriptor shown under the Bosnian product name. */
  descriptor: string;
  size: string;
  /** Milk fat percentage, as supplied (m.m. = mliječne masti). */
  fat: number;
  featured?: boolean;
  /** Draft copy — usage-oriented, no health, ingredient or nutrition claims. Requires client approval. */
  description: Record<Locale, string>;
};

export const products: Product[] = [
  {
    slug: "tecni-jogurt-1kg",
    category: "jogurt",
    name: "Tečni jogurt",
    descriptor: "Drinking yogurt",
    size: "1 kg",
    fat: 2.8,
    featured: true,
    description: {
      bs: "Tečni jogurt u porodičnom pakovanju od jednog kilograma. Pravi se za trpezu za kojom se okuplja cijela porodica — uz toplu pitu, burek ili doručak koji ne žuri.",
      en: "Drinking yogurt in a one-kilogram family pack. Made for the table the whole family gathers around — with warm pita, burek or an unhurried breakfast.",
    },
  },
  {
    slug: "domaca-pavlaka-800g",
    category: "pavlaka",
    name: "Domaća pavlaka",
    descriptor: "Homestyle sour cream",
    size: "800 g",
    fat: 26,
    featured: true,
    description: {
      bs: "Domaća pavlaka s 26% mliječne masti, u pakovanju od 800 grama. Za kašiku na sarmu, prijatelja domaćeg hljeba i sastojak koji kuhinju vraća na okuse iz djetinjstva.",
      en: "Homestyle sour cream with 26% milk fat, in an 800-gram tub. A spoonful on sarma, a friend to homemade bread and an ingredient that brings the kitchen back to the tastes of childhood.",
    },
  },
  {
    slug: "mlijeko-1l",
    category: "mlijeko",
    name: "Mlijeko",
    descriptor: "Milk",
    size: "1 L",
    fat: 2.8,
    description: {
      bs: "Mlijeko s 2,8% mliječne masti u pakovanju od jednog litra — za jutarnju kafu, kakao, palačinke i sve ono što se svakodnevno sprema kod kuće.",
      en: "Milk with 2.8% milk fat in a one-litre pack — for morning coffee, cocoa, pancakes and everything made at home every day.",
    },
  },
  {
    slug: "jogurt-180g",
    category: "jogurt",
    name: "Jogurt",
    descriptor: "Yogurt",
    size: "180 g",
    fat: 2.8,
    description: {
      bs: "Jogurt u praktičnom pakovanju od 180 grama — taman za jednu osobu, za užinu na poslu ili u školskoj torbi.",
      en: "Yogurt in a handy 180-gram pack — just right for one, for a snack at work or in a school bag.",
    },
  },
  {
    slug: "jogurt-500ml",
    category: "jogurt",
    name: "Jogurt",
    descriptor: "Yogurt",
    size: "500 ml",
    fat: 2.8,
    description: {
      bs: "Jogurt u pakovanju od pola litra — za dvoje za doručkom ili za jedan obilan obrok uz pitu.",
      en: "Yogurt in a half-litre pack — for two at breakfast or one generous meal with pita.",
    },
  },
  {
    slug: "jogurt-1l",
    category: "jogurt",
    name: "Jogurt",
    descriptor: "Yogurt",
    size: "1 L",
    fat: 2.8,
    description: {
      bs: "Jogurt u pakovanju od jednog litra, za porodični stol i dane kada se za ručkom okupi više ukućana.",
      en: "Yogurt in a one-litre pack, for the family table and days when more of the household gathers for lunch.",
    },
  },
  {
    slug: "pavlaka-180g",
    category: "pavlaka",
    name: "Pavlaka",
    descriptor: "Sour cream",
    size: "180 g",
    fat: 12,
    description: {
      bs: "Pavlaka s 12% mliječne masti u pakovanju od 180 grama — za čorbe, priloge i brza jela.",
      en: "Sour cream with 12% milk fat in a 180-gram pack — for soups, sides and quick dishes.",
    },
  },
  {
    slug: "ayran-180g",
    category: "ayran",
    name: "Ayran",
    descriptor: "Ayran",
    size: "180 g",
    fat: 2,
    description: {
      bs: "Ayran u pakovanju od 180 grama — lagano osvježenje uz ćevape, roštilj i ljetne obroke.",
      en: "Ayran in a 180-gram pack — a light refreshment with ćevapi, grills and summer meals.",
    },
  },
  {
    slug: "ayran-1l",
    category: "ayran",
    name: "Ayran",
    descriptor: "Ayran",
    size: "1 L",
    fat: 2,
    description: {
      bs: "Ayran u pakovanju od jednog litra, za društvo, porodični roštilj i sto za kojim se dijeli.",
      en: "Ayran in a one-litre pack, for company, family barbecues and a table meant for sharing.",
    },
  },
];

export const featuredProducts = products.filter((p) => p.featured);

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getCategory(id: CategoryId) {
  return categories.find((c) => c.id === id)!;
}

export function formatFat(fat: number, locale: Locale) {
  const n = locale === "bs" ? String(fat).replace(".", ",") : String(fat);
  return `${n}%`;
}

export function productTitle(p: Product) {
  return `${p.name} ${p.size}`;
}
