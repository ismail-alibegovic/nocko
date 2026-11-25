export const locales = ["bs", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "bs";

export type RouteKey = "home" | "about" | "products" | "farm" | "business" | "contact";

/** Localised URL for every page. Bosnian lives at the root, English under /en. */
export const routes: Record<RouteKey, Record<Locale, string>> = {
  home: { bs: "/", en: "/en" },
  about: { bs: "/o-nama", en: "/en/about" },
  products: { bs: "/proizvodi", en: "/en/products" },
  farm: { bs: "/od-farme-do-stola", en: "/en/farm-to-table" },
  business: { bs: "/poslovna-saradnja", en: "/en/business" },
  contact: { bs: "/kontakt", en: "/en/contact" },
};

export const navOrder: RouteKey[] = ["home", "about", "products", "farm", "business", "contact"];

export function href(key: RouteKey, locale: Locale) {
  return routes[key][locale];
}

export function productHref(slug: string, locale: Locale) {
  return `${routes.products[locale]}/${slug}`;
}

export function localeFromPath(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "bs";
}

/** Map the current path to its counterpart in another language. */
export function switchLocalePath(pathname: string, to: Locale): string {
  const from = localeFromPath(pathname);
  if (from === to) return pathname;
  const clean = pathname.replace(/\/+$/, "") || "/";

  for (const key of Object.keys(routes) as RouteKey[]) {
    if (routes[key][from] === clean) return routes[key][to];
  }
  const productBase = routes.products[from];
  if (clean.startsWith(`${productBase}/`)) {
    return `${routes.products[to]}/${clean.slice(productBase.length + 1)}`;
  }
  return routes.home[to];
}

/** Which nav item is active for a path. */
export function activeRoute(pathname: string, locale: Locale): RouteKey | null {
  const clean = pathname.replace(/\/+$/, "") || "/";
  for (const key of navOrder) {
    const base = routes[key][locale];
    if (key === "home") {
      if (clean === base) return key;
      continue;
    }
    if (clean === base || clean.startsWith(`${base}/`)) return key;
  }
  return null;
}
