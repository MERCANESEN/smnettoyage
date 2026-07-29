/**
 * One-off: remove near-white background from logo → transparent PNG.
 * Usage: node scripts/make-logo-transparent.mjs
 */
import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const input = path.join(root, "public", "logo-sm-nettoyage.original.png");
const output = path.join(root, "public", "logo-sm-nettoyage-clear.png");
const outputLegacy = path.join(root, "public", "logo-sm-nettoyage.png");

/** Pixels at or above this luminance (and low saturation) become transparent. */
const WHITE_THRESHOLD = 245;
/** Soft edge: partially fade whites between SOFT and WHITE_THRESHOLD */
const SOFT_THRESHOLD = 230;

const { data, info } = await sharp(input)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const pixels = Buffer.from(data);
const { width, height, channels } = info;

for (let i = 0; i < pixels.length; i += channels) {
  const r = pixels[i];
  const g = pixels[i + 1];
  const b = pixels[i + 2];
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const chroma = max - min;

  // Near-white / light gray background (low chroma, high brightness)
  const isLight = r >= SOFT_THRESHOLD && g >= SOFT_THRESHOLD && b >= SOFT_THRESHOLD && chroma < 28;

  if (!isLight) continue;

  const brightness = (r + g + b) / 3;
  if (brightness >= WHITE_THRESHOLD) {
    pixels[i + 3] = 0;
  } else {
    // Soft fringe: fade alpha toward transparent
    const t = (brightness - SOFT_THRESHOLD) / (WHITE_THRESHOLD - SOFT_THRESHOLD);
    pixels[i + 3] = Math.round(255 * (1 - t));
  }
}

await sharp(pixels, {
  raw: { width, height, channels },
})
  .png()
  .toFile(output);

await sharp(pixels, {
  raw: { width, height, channels },
})
  .png()
  .toFile(outputLegacy);

console.log(`Wrote transparent logo: ${output}`);
console.log(`Also wrote: ${outputLegacy}`);
