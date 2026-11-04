// Downloads the official Satoshi WOFF2 files (400/500/700) from Fontshare at build time.
// Licence (ITF FFL): self-hosting on our own site is permitted; files are used unmodified
// (no subsetting / conversion) and are NOT committed to the repository.
import { mkdir, writeFile, access } from 'node:fs/promises';
const OUT = new URL('../public/fonts/satoshi/', import.meta.url);
const WEIGHTS = [400, 500, 700];
const done = async (w) => access(new URL(`Satoshi-${w}.woff2`, OUT)).then(() => true, () => false);
if ((await Promise.all(WEIGHTS.map(done))).every(Boolean)) { console.log('[fonts] Satoshi present'); process.exit(0); }
await mkdir(OUT, { recursive: true });
const css = await (await fetch(`https://api.fontshare.com/v2/css?f[]=satoshi@${WEIGHTS.join(',')}&display=swap`)).text();
const faces = css.split('@font-face').slice(1);
for (const face of faces) {
  const weight = face.match(/font-weight:\s*(\d+)/)?.[1];
  const url = face.match(/url\('([^']+\.woff2)'\)/)?.[1];
  if (!weight || !url) continue;
  const res = await fetch(url.startsWith('//') ? `https:${url}` : url);
  if (!res.ok) throw new Error(`[fonts] Satoshi ${weight}: HTTP ${res.status}`);
  await writeFile(new URL(`Satoshi-${weight}.woff2`, OUT), Buffer.from(await res.arrayBuffer()));
  console.log(`[fonts] Satoshi ${weight} downloaded`);
}
