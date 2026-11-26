// «قولها… تمّت» renderer (9:16). Usage (repo root), after `python3 film/tammreel/prep.py`:
//   node film/tammreel/render.mjs --frames 1,5,9   → spot frames      node film/tammreel/render.mjs --audio-only → score
//   node film/tammreel/render.mjs --part k --parts 4 → one slice of the 60 fps picture (2 sub-frames blended)
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync, spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = path.join(ROOT, 'handover', 'launch-film', 'tammreel'); fs.mkdirSync(OUT, { recursive: true });
const arg = (k) => { const i = process.argv.indexOf(k); return i < 0 ? null : process.argv[i + 1] ?? true; };
const FPS = 60, SUB = 2, SEQD = path.join(OUT, 'seq');
const html = fs.readFileSync(path.join(ROOT, 'film/tammreel/film.html'), 'utf8')
  .replaceAll('__SEQ__', pathToFileURL(SEQD).href)
  .replace('__SEQN__', JSON.stringify(Object.fromEntries(fs.readdirSync(SEQD).map((d) => [d, fs.readdirSync(path.join(SEQD, d)).length]))))
  .replaceAll('__PLEX__', pathToFileURL(path.join(ROOT, 'site/node_modules/@fontsource/ibm-plex-sans-arabic/files')).href)
  .replaceAll('__SYMBOL__', pathToFileURL(path.join(ROOT, 'brand/production/logo/SayTamm_Symbol_Signature_White-Purple.svg')).href);
const PART = arg('--part'), PARTS = Number(arg('--parts') || 1);
const TAG = PART !== null ? `_${PART}` : arg('--frames') ? '_f' : '_a';
const TMP = path.join(OUT, `_film${TAG}.html`); fs.writeFileSync(TMP, html);
const require = createRequire(import.meta.url);
const playwright = require('playwright');
const browser = await playwright.chromium.launch();
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
const errs = []; page.on('pageerror', (e) => errs.push(e.message));
await page.goto(pathToFileURL(TMP).href, { waitUntil: 'load' });
await page.evaluate(() => window.ready);
if (errs.length) throw new Error(errs.join('\n'));
const at = async (t, o = {}) => { await page.evaluate((x) => window.seek(x), t); return page.screenshot({ type: 'jpeg', quality: 100, ...o }); };
const done = async () => { if (errs.length) throw new Error(errs.join('\n')); await browser.close(); try { fs.rmSync(TMP); } catch {} };
if (arg('--frames')) {
  const d = path.join(OUT, '_frames'); fs.mkdirSync(d, { recursive: true });
  for (const t of String(arg('--frames')).split(',').map(Number)) await at(t, { path: path.join(d, `t${t.toFixed(2).padStart(5, '0')}.jpg`), quality: 85 });
  await done(); console.log('frames in', d); process.exit(0);
}
if (arg('--audio-only')) { fs.writeFileSync(path.join(OUT, 'Tammreel_Score.wav'), Buffer.from(await page.evaluate(() => window.renderAudio()), 'base64')); await done(); console.log('wrote score'); process.exit(0); }
const DUR = await page.evaluate(() => window.DUR_S), FT = Math.round(FPS * DUR);
const F0 = PART === null ? 0 : Math.floor((Number(PART) * FT) / PARTS), F1 = PART === null ? FT : Math.floor(((Number(PART) + 1) * FT) / PARTS);
const MP4 = path.join(OUT, `_part${TAG}.mp4`);
const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS * SUB), '-c:v', 'mjpeg', '-i', '-',
  '-vf', `tmix=frames=${SUB},select='not(mod(n\\,${SUB}))',setpts=N/(${FPS}*TB)`, '-r', String(FPS),
  '-c:v', 'libx264', '-preset', 'slow', '-crf', '16', '-profile:v', 'high', '-pix_fmt', 'yuv420p', '-an', MP4], { stdio: ['pipe', 'inherit', 'inherit'] });
const fin = new Promise((r, j) => ff.on('close', (c) => (c ? j(new Error('ffmpeg ' + c)) : r())));
for (let f = F0; f < F1; f++) {
  for (let k = 0; k < SUB; k++) { const buf = await at(Math.max(0, (f + (k - (SUB - 1) / 2) / SUB) / FPS)); if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r)); }
  if ((f - F0) % 120 === 0) console.log('frame', f, `(${F0}–${F1})`);
}
ff.stdin.end(); await fin; await done();
const got = Number(execFileSync('ffprobe', ['-v', 'error', '-count_packets', '-select_streams', 'v', '-show_entries', 'stream=nb_read_packets', '-of', 'csv=p=0', MP4]).toString().trim());
if (got !== F1 - F0) { console.error(`SHORT ${MP4}: ${got} of ${F1 - F0} frames`); process.exit(3); }
console.log('wrote', MP4, got, 'frames');
