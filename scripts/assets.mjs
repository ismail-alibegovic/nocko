#!/usr/bin/env node
/**
 * Noćko asset pipeline
 *
 *   node scripts/assets.mjs optimize   → converts assets-source/** (jpg/png/tif) to WebP in public/images/**
 *   node scripts/assets.mjs manifest   → scans public/images/** and writes src/data/asset-manifest.json
 *   node scripts/assets.mjs            → both
 *
 * Components read the manifest to decide whether an approved image exists.
 * If it does not, they render a clearly labelled placeholder instead of
 * inventing packaging. Drop files in using the naming convention described
 * in public/images/README.md and re-run this script (it also runs before dev/build).
 */
import { readdir, mkdir, writeFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE = path.join(root, "assets-source");
const PUBLIC_IMAGES = path.join(root, "public", "images");
const MANIFEST = path.join(root, "src", "data", "asset-manifest.json");
const FOLDERS = ["brand", "products", "lifestyle", "landscapes"];
const RASTER = new Set([".jpg", ".jpeg", ".png", ".tif", ".tiff", ".webp", ".avif"]);
const SERVABLE = new Set([".webp", ".avif", ".png", ".jpg", ".jpeg", ".svg"]);
// Preference when several formats exist for the same name.
const PRIORITY = [".svg", ".avif", ".webp", ".png", ".jpg", ".jpeg"];

async function exists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

async function optimize() {
  const sharp = (await import("sharp")).default;
  if (!(await exists(SOURCE))) {
    console.log("· no assets-source/ folder — skipping optimisation");
    return;
  }
  for (const folder of FOLDERS) {
    const dir = path.join(SOURCE, folder);
    if (!(await exists(dir))) continue;
    await mkdir(path.join(PUBLIC_IMAGES, folder), { recursive: true });
    for (const file of await readdir(dir)) {
      const ext = path.extname(file).toLowerCase();
      if (!RASTER.has(ext)) continue;
      const name = path.basename(file, path.extname(file));
      const out = path.join(PUBLIC_IMAGES, folder, `${name}.webp`);
      // Packaging and logos: keep label typography crisp (higher quality,
      // alpha preserved, no aggressive resizing). Photography: 2400px max.
      const isLabelArt = folder === "products" || folder === "brand";
      await sharp(path.join(dir, file))
        .rotate()
        .resize({ width: isLabelArt ? 2000 : 2400, withoutEnlargement: true })
        .webp({ quality: isLabelArt ? 92 : 80, alphaQuality: 100, smartSubsample: true, effort: 5 })
        .toFile(out);
      console.log(`✓ ${folder}/${file} → ${path.relative(root, out)}`);
    }
  }
}

async function manifest() {
  const sharp = (await import("sharp")).default;
  const entries = {};
  for (const folder of FOLDERS) {
    const dir = path.join(PUBLIC_IMAGES, folder);
    if (!(await exists(dir))) continue;
    const files = (await readdir(dir)).filter((f) => SERVABLE.has(path.extname(f).toLowerCase()));
    files.sort(
      (a, b) =>
        PRIORITY.indexOf(path.extname(a).toLowerCase()) - PRIORITY.indexOf(path.extname(b).toLowerCase()),
    );
    for (const file of files) {
      const key = `${folder}/${path.basename(file, path.extname(file))}`;
      if (entries[key]) continue;
      let width = 0;
      let height = 0;
      try {
        const meta = await sharp(path.join(dir, file)).metadata();
        width = meta.width ?? 0;
        height = meta.height ?? 0;
      } catch {
        /* svg without explicit size etc. */
      }
      entries[key] = { src: `/images/${folder}/${file}`, width, height };
    }
  }
  await mkdir(path.dirname(MANIFEST), { recursive: true });
  const sorted = Object.fromEntries(Object.entries(entries).sort(([a], [b]) => a.localeCompare(b)));
  await writeFile(MANIFEST, `${JSON.stringify(sorted, null, 2)}\n`);
  console.log(`✓ manifest: ${Object.keys(sorted).length} images → ${path.relative(root, MANIFEST)}`);
}

const mode = process.argv[2];
if (!mode || mode === "optimize") await optimize();
if (!mode || mode === "manifest") await manifest();
