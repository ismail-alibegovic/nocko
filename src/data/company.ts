/** Verified company facts supplied by the client. Do not extend without approval. */
export const company = {
  legalName: "NOĆKO KOMERC d.o.o. Živinice",
  shortLegalName: "NOĆKO KOMERC d.o.o.",
  brand: "Noćko",
  founded: 1996,
  anniversaryYear: 2026,
  street: "Toplička 2, Kovači",
  postalCode: "75270",
  city: "Živinice",
  country: { bs: "Bosna i Hercegovina", en: "Bosnia and Herzegovina" },
  email: "info@nocko.eu",
  phoneDisplay: "+387 35 774 517",
  phoneHref: "tel:+38735774517",
  mapQuery: "Toplička 2, Kovači, 75270 Živinice, Bosnia and Herzegovina",
} as const;

export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.mapQuery)}`;
export const mapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(company.mapQuery)}&output=embed`;

/** Year used in the copyright line (kept static so pages stay fully prerendered). */
export const COPYRIGHT_YEAR = 2026;
