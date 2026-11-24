// The Ratio v2 renderer: a transparent animation layer composited over the graded stock-footage plate.
// Usage (repo root), after `python3 film/roas/plate.py`:
//   node film/roas/render.mjs --variant ar --frames 1,3.5,8,12.5   → composited review frames
//   node film/roas/render.mjs --variant ar --audio-only            → score WAV
//   node film/roas/render.mjs --variant ar --part k --parts 4      → one slice of the 60 fps film (2 sub-frames blended)
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync, spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = path.join(ROOT, 'handover', 'launch-film', 'roas');
const arg = (k) => { const i = process.argv.indexOf(k); return i < 0 ? null : process.argv[i + 1] ?? true; };
const FPS = 60, SUB = 2, VAR = arg('--variant') || 'ar', PLATE = path.join(OUT, 'Ratio2_plate.mp4');
const zid = 'data:image/svg+xml;base64,' + fs.readFileSync(path.join(ROOT, 'film/roas/assets/zid-logo-en.svg')).toString('base64');
const html = fs.readFileSync(path.join(ROOT, 'film/roas/film2.html'), 'utf8')
  .replaceAll('__SAT__', pathToFileURL(path.join(ROOT, 'site/public/fonts/satoshi')).href)
  .replaceAll('__PLEX__', pathToFileURL(path.join(ROOT, 'site/node_modules/@fontsource/ibm-plex-sans-arabic/files')).href)
  .replaceAll('__SYMBOL__', pathToFileURL(path.join(ROOT, 'brand/production/logo/SayTamm_Symbol_Signature_White-Purple.svg')).href)
  .replace('__ICONS__', fs.readFileSync(path.join(ROOT, 'film/roas/assets/platform-icons.json'), 'utf8'))
  .replace('__PHONE__', fs.readFileSync(path.join(OUT, 'phone_track2.json'), 'utf8'))
  .replace('__ZID__', zid)
  .replace('__SEQ__', pathToFileURL(path.join(OUT, 'seq')).href)
  .replace('__SEQN__', JSON.stringify(Object.fromEntries(fs.readdirSync(path.join(OUT, 'seq')).map((d) => [d, fs.readdirSync(path.join(OUT, 'seq', d)).length]))))
  .replaceAll('__VARIANT__', VAR);
const TAG = `_${VAR}` + (arg('--part') !== null ? `_${arg('--part')}` : arg('--frames') ? '_f' : arg('--audio-only') ? '_a' : '');
const TMP = path.join(OUT, `_film2${TAG}.html`); fs.writeFileSync(TMP, html);
const require = createRequire(import.meta.url);
let playwright;
try { playwright = require('playwright'); } catch { playwright = require(execFileSync('npm', ['root', '-g']).toString().trim() + '/playwright'); }
const browser = await playwright.chromium.launch();
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
const errs = []; page.on('pageerror', (e) => errs.push(e.message));
await page.goto(pathToFileURL(TMP).href, { waitUntil: 'load' });
await page.evaluate(() => window.ready);
if (errs.length) throw new Error(errs.join('\n'));
const at = async (t) => { await page.evaluate(async (x) => { await window.seek(x); }, t); return page.screenshot({ type: 'png', omitBackground: true }); };
const done = async () => { if (errs.length) throw new Error(errs.join('\n')); await browser.close(); try { fs.rmSync(TMP); } catch {} };
if (arg('--frames')) {
  const d = path.join(OUT, `_frames2_${VAR}`); fs.mkdirSync(d, { recursive: true });
  for (const t of String(arg('--frames')).split(',').map(Number)) {
    const ov = path.join(d, '_ov.png'); fs.writeFileSync(ov, await at(t));
    execFileSync('ffmpeg', ['-y', '-v', 'error', '-ss', String(t), '-i', PLATE, '-i', ov, '-filter_complex', '[0:v][1:v]overlay=0:0', '-frames:v', '1', '-q:v', '3', path.join(d, `t${t.toFixed(2).padStart(5, '0')}.jpg`)]);
  }
  await done(); console.log('frames in', d); process.exit(0);
}
if (arg('--audio-only')) {
  const b64 = await page.evaluate(() => window.renderAudio());
  fs.writeFileSync(path.join(OUT, 'Ratio2_Score.wav'), Buffer.from(b64, 'base64'));
  await done(); console.log('wrote score'); process.exit(0);
}
const DUR = await page.evaluate(() => window.DUR_S), FT = Math.round(FPS * DUR);
const PART = arg('--part'), PARTS = Number(arg('--parts') || 1);
const F0 = PART === null ? 0 : Math.floor((Number(PART) * FT) / PARTS), F1 = PART === null ? FT : Math.floor(((Number(PART) + 1) * FT) / PARTS);
const MP4 = path.join(OUT, `_part2${TAG}.mp4`);
const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error',
  '-ss', (F0 / FPS).toFixed(6), '-t', ((F1 - F0) / FPS).toFixed(6), '-i', PLATE,
  '-f', 'image2pipe', '-framerate', String(FPS * SUB), '-c:v', 'png', '-i', '-',
  '-filter_complex', `[1:v]format=rgba,tmix=frames=${SUB},select='not(mod(n\\,${SUB}))',setpts=N/(${FPS}*TB)[ov];[0:v]setpts=PTS-STARTPTS[bg];[bg][ov]overlay=0:0:eof_action=pass,format=yuv420p[v]`,
  '-map', '[v]', '-r', String(FPS), '-frames:v', String(F1 - F0),
  '-c:v', 'libx264', '-preset', 'slow', '-crf', '14', '-profile:v', 'high', '-tune', 'film', '-pix_fmt', 'yuv420p', '-an', MP4], { stdio: ['pipe', 'inherit', 'inherit'] });
const fin = new Promise((r, j) => ff.on('close', (c) => (c ? j(new Error('ffmpeg ' + c)) : r())));
for (let f = F0; f < F1; f++) {
  for (let k = 0; k < SUB; k++) { const buf = await at(Math.max(0, (f + (k - (SUB - 1) / 2) / SUB) / FPS)); if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r)); }
  if ((f - F0) % 120 === 0) console.log('frame', f, `(${F0}–${F1})`);
}
ff.stdin.end(); await fin; await done(); console.log('wrote', MP4);
