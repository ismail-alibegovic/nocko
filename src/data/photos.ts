import type { Locale } from "@/i18n/config";

/**
 * Licensed editorial photography (Unsplash License) used for mood and
 * storytelling only. None of these depict Noćko's farms, facilities or
 * products — every placement is captioned as illustrative. Replace with a
 * commissioned shoot before launch (see CLIENT_APPROVAL.md).
 */
export type PhotoKey =
  | "valleySunrise"
  | "mistyFarmhouse"
  | "cowsHillside"
  | "cowsMeadow"
  | "stoneHouse"
  | "breadAndMilk"
  | "loaf"
  | "milkPour"
  | "pastriesTray"
  | "gardenBreakfast"
  | "milkCans"
  | "pastryTable";

export type Photo = {
  asset: string;
  alt: Record<Locale, string>;
  credit: string;
  creditUrl: string;
  sourceUrl: string;
};

const u = (user: string) => `https://unsplash.com/@${user}?utm_source=nocko_concept&utm_medium=referral`;

export const photos: Record<PhotoKey, Photo> = {
  valleySunrise: {
    asset: "landscapes/valley-sunrise",
    alt: {
      bs: "Jutarnje sunce nad zelenim brežuljcima i livadama sa razbacanim kućama",
      en: "Morning sun over green rolling hills and meadows dotted with houses",
    },
    credit: "François Hoppet",
    creditUrl: u("fhoppet"),
    sourceUrl: "https://unsplash.com/photos/Xedgzb06bvo",
  },
  mistyFarmhouse: {
    asset: "landscapes/misty-farmhouse",
    alt: {
      bs: "Kuća u zelenoj dolini obavijena jutarnjom maglom i toplim svjetlom",
      en: "A house in a green valley wrapped in morning mist and warm light",
    },
    credit: "Christopher Politano",
    creditUrl: u("poli_graphy"),
    sourceUrl: "https://unsplash.com/photos/emLntE8UkgQ",
  },
  cowsHillside: {
    asset: "landscapes/cows-hillside",
    alt: { bs: "Krave na travnatoj padini pod večernjim nebom", en: "Cows on a grassy slope under an evening sky" },
    credit: "David Dolenc",
    creditUrl: u("daviddolenc"),
    sourceUrl: "https://unsplash.com/photos/1AKuVmQxUkU",
  },
  cowsMeadow: {
    asset: "landscapes/cows-meadow",
    alt: { bs: "Krave na zelenoj livadi uz drveće", en: "Cows on a green meadow by the trees" },
    credit: "Marino Bobetic",
    creditUrl: u("mbobetic"),
    sourceUrl: "https://unsplash.com/photos/aQ1RbibEVeQ",
  },
  stoneHouse: {
    asset: "landscapes/stone-house-hills",
    alt: { bs: "Stara kamena kuća u zelenim brdima", en: "An old stone house in the green hills" },
    credit: "Ivan Ovych",
    creditUrl: u("kehl"),
    sourceUrl: "https://unsplash.com/photos/Gnww9wenuLI",
  },
  breadAndMilk: {
    asset: "lifestyle/bread-and-milk",
    alt: {
      bs: "Kriške hljeba i šolja mlijeka na drvenoj dasci",
      en: "Slices of bread and a cup of milk on a wooden board",
    },
    credit: "insung yoon",
    creditUrl: u("insungpandora"),
    sourceUrl: "https://unsplash.com/photos/J6CGO0WQHqM",
  },
  loaf: {
    asset: "lifestyle/loaf",
    alt: { bs: "Svježe pečen okrugli hljeb", en: "A freshly baked round loaf" },
    credit: "Gideon Karanja",
    creditUrl: u("gideon_karanja"),
    sourceUrl: "https://unsplash.com/photos/uf7Q9WLbwvw",
  },
  milkPour: {
    asset: "lifestyle/milk-pour",
    alt: { bs: "Mlijeko se sipa iz bokala u čašu", en: "Milk poured from a jug into a glass" },
    credit: "Eiliv Aceron",
    creditUrl: u("shootdelicious"),
    sourceUrl: "https://unsplash.com/photos/_8bnn1GqX70",
  },
  pastriesTray: {
    asset: "lifestyle/pastries-tray",
    alt: { bs: "Zlatno pečena peciva na plehu", en: "Golden baked pastries on a tray" },
    credit: "Bernd Dittrich",
    creditUrl: u("hdbernd"),
    sourceUrl: "https://unsplash.com/photos/vpolqsmPwwk",
  },
  gardenBreakfast: {
    asset: "lifestyle/garden-breakfast",
    alt: {
      bs: "Doručak u bašti s kroasanima, mlijekom i trešnjama",
      en: "Breakfast in the garden with croissants, milk and cherries",
    },
    credit: "Anna Keibalo",
    creditUrl: u("anyutakejbalo"),
    sourceUrl: "https://unsplash.com/photos/3zV_s4S4c2g",
  },
  milkCans: {
    asset: "lifestyle/milk-cans",
    alt: { bs: "Stare metalne kante za mlijeko na drvenom zidu", en: "Vintage metal milk cans on a log wall" },
    credit: "Ilse Orsel",
    creditUrl: u("beertje60"),
    sourceUrl: "https://unsplash.com/photos/uJdjadBwN6U",
  },
  pastryTable: {
    asset: "lifestyle/pastry-table",
    alt: {
      bs: "Sto s pecivima, kolačima i čašom mlijeka",
      en: "A table with pastries, cake and a glass of milk",
    },
    credit: "Grâce Goubo",
    creditUrl: u("graxe_ma"),
    sourceUrl: "https://unsplash.com/photos/iwQlgvxTDNk",
  },
};
