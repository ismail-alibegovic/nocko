import manifest from "@/data/asset-manifest.json";

export type Asset = { src: string; width: number; height: number };

const files = manifest as Record<string, Asset>;

/** Returns an image from /public/images if it exists, otherwise null. */
export function getAsset(key: string): Asset | null {
  return files[key] ?? null;
}

/** Approved packshot of a product: /public/images/products/<slug>.(png|webp) */
export function getPackshot(slug: string) {
  return getAsset(`products/${slug}`);
}

/** Approved kitchen/lifestyle photograph of a product: /public/images/lifestyle/<slug>-kitchen.* */
export function getKitchenPhoto(slug: string) {
  return getAsset(`lifestyle/${slug}-kitchen`);
}

/** Approved refreshed logo: /public/images/brand/logo.(svg|png|webp) */
export function getLogo() {
  return getAsset("brand/logo");
}

/** Approved hero composite with packaging: /public/images/brand/hero-packaging.(png|webp) */
export function getHeroPackaging() {
  return getAsset("brand/hero-packaging");
}
