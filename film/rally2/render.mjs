// «The Rally» v2 renderer: 1080×1080, or 1080×1920 with RV=916 (after `python3 film/rally2/prep.py [--v 916]`). Usage (repo root):
//   node film/rally2/render.mjs --frames 0.5,1 → spot frames      node film/rally2/render.mjs --audio-only → score
//   node film/rally2/render.mjs --part k --parts 4 → one slice of the 60 fps picture (3 sub-frames blended)
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync, spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = path.join(ROOT, 'handover', 'launch-film', 'rally2'); fs.mkdirSync(OUT, { recursive: true });
const arg = (k) => { const i = process.argv.indexOf(k); return i < 0 ? null : process.argv[i + 1] ?? true; };
const FPS = 60, SUB = 3, V = process.env.RV === '916' ? '916' : '11', [W, H] = V === '916' ? [1080, 1920] : [1080, 1080];
const SEQD = path.join(OUT, V === '916' ? 'seq916' : 'seq'), dirs = fs.readdirSync(SEQD);
const SEQN = Object.fromEntries(dirs.map((d) => [d, fs.readdirSync(path.join(SEQD, d)).filter((f) => /\.(jpg|webp)$/.test(f)).length]));
const QUADS = Object.fromEntries(dirs.filter((d) => fs.existsSync(path.join(SEQD, d, 'quad.json'))).map((d) => [d, JSON.parse(fs.readFileSync(path.join(SEQD, d, 'quad.json'), 'utf8'))]));
const html = fs.readFileSync(path.join(ROOT, 'film/rally2/film.html'), 'utf8')
  .replace('__CFG__', JSON.stringify({ w: W, h: H })).replace('__SEQN__', JSON.stringify(SEQN)).replace('__QUADS__', JSON.stringify(QUADS))
  .replaceAll('__SEQ__', pathToFileURL(SEQD).href).replaceAll('__ASSETS__', pathToFileURL(path.join(ROOT, 'handover/profile/assets')).href)
  .replaceAll('__PHOTO__', pathToFileURL(path.join(OUT, 'photo')).href)
  .replace('__SYMBOL_SVG__', JSON.stringify(fs.readFileSync(path.join(ROOT, 'brand/production/logo/SayTamm_Symbol_Signature_White-Purple.svg'), 'utf8')))
  .replaceAll('__SAT__', pathToFileURL(path.join(ROOT, 'site/public/fonts/satoshi')).href)
  .replaceAll('__PLEX__', pathToFileURL(path.join(ROOT, 'site/node_modules/@fontsource/ibm-plex-sans-arabic/files')).href)
;
const PART = arg('--part'), PARTS = Number(arg('--parts') || 1);
const TAG = PART !== null ? `_${PART}` : arg('--frames') ? '_f' : '_a';
const TMP = path.join(OUT, `_film${V}${TAG}.html`); fs.writeFileSync(TMP, html);
const require = createRequire(import.meta.url);
const playwright = require('playwright');
const browser = await playwright.chromium.launch();
const page = await browser.newPage({ viewport: { width: W, height: H } });
const errs = []; page.on('pageerror', (e) => errs.push(e.message));
await page.goto(pathToFileURL(TMP).href, { waitUntil: 'load' });
await page.evaluate(() => window.ready);
if (errs.length) throw new Error(errs.join('\n'));
const at = async (t, o = {}) => { await page.evaluate((x) => window.seek(x), t); return page.screenshot({ type: 'jpeg', quality: 100, ...o }); };
const done = async () => { if (errs.length) throw new Error(errs.join('\n')); await browser.close(); try { fs.rmSync(TMP); } catch {} };
if (arg('--frames')) {
  const d = path.join(OUT, `_frames${V}`); fs.mkdirSync(d, { recursive: true });
  for (const t of String(arg('--frames')).split(',').map(Number)) await at(t, { path: path.join(d, `t${t.toFixed(2).padStart(5, '0')}.jpg`), quality: 85 });
  await done(); console.log('frames in', d); process.exit(0);
}
if (arg('--audio-only')) { fs.writeFileSync(path.join(OUT, 'Rally2_Score.wav'), Buffer.from(await page.evaluate(() => window.renderAudio()), 'base64')); await done(); console.log('wrote score'); process.exit(0); }
const DUR = await page.evaluate(() => window.DUR_S), FT = Math.round(FPS * DUR);
const F0 = PART === null ? 0 : Math.floor((Number(PART) * FT) / PARTS), F1 = PART === null ? FT : Math.floor(((Number(PART) + 1) * FT) / PARTS);
const MP4 = path.join(OUT, `_part${V}${TAG}.mp4`);
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
