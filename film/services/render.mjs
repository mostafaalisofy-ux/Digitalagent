// SayTamm services film renderer (16:9). Usage (repo root), after `python3 film/services/plan.py && python3 film/services/prep.py`:
//   node film/services/render.mjs --frames 1,9.5,12   → spot frames
//   node film/services/render.mjs --audio-only        → score WAV
//   node film/services/render.mjs --part k --parts 4  → one slice of the 60 fps film (2 sub-frames blended)
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync, spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = path.join(ROOT, 'handover', 'launch-film', 'services'); fs.mkdirSync(OUT, { recursive: true });
const arg = (k) => { const i = process.argv.indexOf(k); return i < 0 ? null : process.argv[i + 1] ?? true; };
const FPS = 60, SUB = 2, VAR = 'en';
const html = fs.readFileSync(path.join(ROOT, 'film/services/film.html'), 'utf8')
  .replaceAll('__LF__', pathToFileURL(path.join(ROOT, 'handover', 'launch-film')).href)
  .replace('__TIMING__', fs.readFileSync(path.join(ROOT, 'film/services/timing.json'), 'utf8'))
  .replace('__ICONS__', fs.readFileSync(path.join(ROOT, 'film/roas/assets/platform-icons.json'), 'utf8'))
  .replace('__NN__', String(fs.readdirSync(path.join(ROOT, 'handover', 'launch-film', 'reel2', 'seq', 'niimee')).length))
  .replaceAll('__SAT__', pathToFileURL(path.join(ROOT, 'site/public/fonts/satoshi')).href)
  .replaceAll('__PLEX__', pathToFileURL(path.join(ROOT, 'site/node_modules/@fontsource/ibm-plex-sans-arabic/files')).href)
  .replaceAll('__SYMBOL__', pathToFileURL(path.join(ROOT, 'brand/production/logo/SayTamm_Symbol_Signature_White-Purple.svg')).href)
  .replaceAll('__VARIANT__', VAR);
const TAG = `_${VAR}` + (arg('--part') !== null ? `_${arg('--part')}` : arg('--frames') ? '_f' : arg('--audio-only') ? '_a' : '');
const TMP = path.join(OUT, `_film${TAG}.html`); fs.writeFileSync(TMP, html);
const require = createRequire(import.meta.url);
let playwright;
try { playwright = require('playwright'); } catch { playwright = require(execFileSync('npm', ['root', '-g']).toString().trim() + '/playwright'); }
const browser = await playwright.chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
const errs = []; page.on('pageerror', (e) => errs.push(e.message));
await page.goto(pathToFileURL(TMP).href, { waitUntil: 'load' });
await page.evaluate(() => window.ready);
if (errs.length) throw new Error(errs.join('\n'));
const at = async (t, o = {}) => { await page.evaluate((x) => window.seek(x), t); return page.screenshot({ type: 'jpeg', quality: 100, ...o }); };
const done = async () => { if (errs.length) throw new Error(errs.join('\n')); await browser.close(); try { fs.rmSync(TMP); } catch {} };
if (arg('--frames')) {
  const d = path.join(OUT, `_frames_${VAR}`); fs.mkdirSync(d, { recursive: true });
  for (const t of String(arg('--frames')).split(',').map(Number)) await at(t, { path: path.join(d, `t${t.toFixed(2).padStart(5, '0')}.jpg`), quality: 85 });
  await done(); console.log('frames in', d); process.exit(0);
}
if (arg('--audio-only')) {
  const b64 = await page.evaluate(() => window.renderAudio());
  fs.writeFileSync(path.join(OUT, 'Services_Score.wav'), Buffer.from(b64, 'base64'));
  await done(); console.log('wrote score'); process.exit(0);
}
const DUR = await page.evaluate(() => window.DUR_S), FT = Math.round(FPS * DUR);
const PART = arg('--part'), PARTS = Number(arg('--parts') || 1);
const F0 = PART === null ? 0 : Math.floor((Number(PART) * FT) / PARTS), F1 = PART === null ? FT : Math.floor(((Number(PART) + 1) * FT) / PARTS);
const MP4 = path.join(OUT, `_part${TAG}.mp4`);
const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS * SUB), '-c:v', 'mjpeg', '-i', '-',
  '-vf', `tmix=frames=${SUB},select='not(mod(n\\,${SUB}))',setpts=N/(${FPS}*TB)`, '-r', String(FPS),
  '-c:v', 'libx264', '-preset', 'slow', '-crf', '14', '-profile:v', 'high', '-tune', 'film', '-pix_fmt', 'yuv420p', '-an', MP4], { stdio: ['pipe', 'inherit', 'inherit'] });
const fin = new Promise((r, j) => ff.on('close', (c) => (c ? j(new Error('ffmpeg ' + c)) : r())));
for (let f = F0; f < F1; f++) {
  for (let k = 0; k < SUB; k++) { const buf = await at(Math.max(0, (f + (k - (SUB - 1) / 2) / SUB) / FPS)); if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r)); }
  if ((f - F0) % 120 === 0) console.log('frame', f, `(${F0}–${F1})`);
}
ff.stdin.end(); await fin; await done();
const got = Number(execFileSync('ffprobe', ['-v', 'error', '-count_packets', '-select_streams', 'v', '-show_entries', 'stream=nb_read_packets', '-of', 'csv=p=0', MP4]).toString().trim());
if (got !== F1 - F0) { console.error(`SHORT ${MP4}: ${got} of ${F1 - F0} frames`); process.exit(3); }
console.log('wrote', MP4, got, 'frames');
