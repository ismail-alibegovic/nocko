import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export const ogSize = { width: 1200, height: 630 };

const dir = join(process.cwd(), "src", "assets", "og");

// Read at module scope so the image is prerendered at build time.
const [fraunces, manrope, bg] = await Promise.all([
  readFile(join(dir, "fraunces-600-italic.woff")),
  readFile(join(dir, "manrope-700.woff")),
  readFile(join(dir, "og-bg.jpg"), "base64"),
]);

export function renderOg(locale: Locale) {
  const t = getDictionary(locale);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#0B4A32" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:image/jpeg;base64,${bg}`}
          width={1200}
          height={630}
          alt=""
          style={{ position: "absolute", inset: 0, objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(100deg, rgba(7,54,36,0.92) 0%, rgba(11,74,50,0.7) 45%, rgba(11,74,50,0.15) 100%)",
          }}
        />
        <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "72px 80px", width: "100%" }}>
          <div style={{ display: "flex", fontFamily: "Manrope", fontSize: 22, letterSpacing: 6, color: "#D9E75A", textTransform: "uppercase" }}>
            {t.hero.eyebrow}
          </div>
          <div style={{ display: "flex", flexDirection: "column", marginTop: 22, fontFamily: "Fraunces", fontSize: 104, lineHeight: 1, color: "#F5F4E8" }}>
            <span>{t.hero.titleA}</span>
            <span style={{ color: "#F8DC84" }}>{t.hero.titleB}</span>
          </div>
          <div style={{ display: "flex", marginTop: 34, alignItems: "center", gap: 18, fontFamily: "Manrope", fontSize: 24, color: "rgba(247,244,235,0.85)" }}>
            <div style={{ display: "flex", width: 74, height: 44, borderRadius: "50%", border: "4px solid #D9E75A", background: "#14724A" }} />
            Noćko · Živinice · 1996 — 2026
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Fraunces", data: fraunces, style: "italic", weight: 600 },
        { name: "Manrope", data: manrope, style: "normal", weight: 700 },
      ],
    },
  );
}
