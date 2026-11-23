// Infinite Tamm renderer. Usage (repo root):
//   node film/infinite-tamm/render.mjs --frames 0,7,14            → spot frames
//   node film/infinite-tamm/render.mjs --audio-only               → score WAV
//   node film/infinite-tamm/render.mjs --part k --parts 4         → one slice of the 60 fps film (3 sub-frames blended)
// Worlds are read from handover/launch-film/infinite/worlds/gen_*.png: the green (#00FF00) portal is detected,
// a 9:16 frame is cut around it, and the image is upscaled ×2 (Lanczos + light unsharp) before use.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync, spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = path.join(ROOT, 'handover', 'launch-film', 'infinite'), WD = path.join(OUT, 'worlds'); fs.mkdirSync(WD, { recursive: true });
const arg = (k) => { const i = process.argv.indexOf(k); return i < 0 ? null : process.argv[i + 1] ?? true; };
const FPS = 60, SUB = 3, DUR = 45;
const ORDER = (arg('--worlds') || 'cafe,facade,riyadh,london').split(',');

// ---- prepare worlds: detect the portal, upscale ×2, fill the green with the scene's dark tone (never seen, but safe)
const worlds = ORDER.map((name) => {
  const src = path.join(WD, `gen_${name}.png`), up = path.join(WD, `up_${name}.png`);
  const det = JSON.parse(execFileSync('python3', ['-I', '-c', `
import json, sys
from PIL import Image
im = Image.open(sys.argv[1]).convert('RGB'); w, h = im.size; px = im.load()
pts = [(x, y) for y in range(h) for x in range(w) if px[x, y][1] > 190 and px[x, y][0] < 110 and px[x, y][2] < 110]
xs = [p[0] for p in pts]; ys = [p[1] for p in pts]
print(json.dumps({'w': w, 'h': h, 'x0': min(xs), 'y0': min(ys), 'x1': max(xs), 'y1': max(ys)}))
`, src]).toString());
  if (!fs.existsSync(up) || fs.statSync(up).mtimeMs < fs.statSync(src).mtimeMs) {
    // chroma key: every green-dominant pixel (and its spill, grown by 3 px) becomes the screen's dark tone, then upscale
    const keyed = path.join(WD, `key_${name}.png`);
    execFileSync('python3', ['-I', '-c', `
import sys
from PIL import Image, ImageFilter
im = Image.open(sys.argv[1]).convert('RGB'); w, h = im.size; px = im.load()
m = Image.new('L', (w, h), 0); mp = m.load()
for y in range(h):
    for x in range(w):
        r, g, b = px[x, y]
        if g > r + 35 and g > b + 35: mp[x, y] = 255
m = m.filter(ImageFilter.MaxFilter(7))
dark = Image.new('RGB', (w, h), (11, 11, 14))
Image.composite(dark, im, m).save(sys.argv[2])
`, src, keyed]);
    execFileSync('ffmpeg', ['-y', '-v', 'error', '-i', keyed, '-vf', `scale=${det.w * 2}:${det.h * 2}:flags=lanczos,unsharp=5:5:0.6`, up]);
  }
  const S = 2, inset = 2; // shrink the portal a hair so no green fringe survives
  const portal = { x: (det.x0 + inset) * S, y: (det.y0 + inset) * S, w: (det.x1 - det.x0 + 1 - 2 * inset) * S, h: (det.y1 - det.y0 + 1 - 2 * inset) * S };
  const fh = det.h * S, fw = fh * 9 / 16, cx = Math.min(det.w * S - fw / 2, Math.max(fw / 2, portal.x + portal.w / 2));
  return { name, src: pathToFileURL(up).href, portal, frame: { x: cx - fw / 2, y: 0, w: fw, h: fh } };
});

const html = fs.readFileSync(path.join(ROOT, 'film/infinite-tamm/film.html'), 'utf8')
  .replaceAll('__SAT__', pathToFileURL(path.join(ROOT, 'site/public/fonts/satoshi')).href)
  .replaceAll('__PLEX__', pathToFileURL(path.join(ROOT, 'site/node_modules/@fontsource/ibm-plex-sans-arabic/files')).href)
  .replaceAll('__SYMBOL__', pathToFileURL(path.join(ROOT, 'brand/production/logo/SayTamm_Symbol_Signature_White-Purple.svg')).href)
  .replace('__WORLDS__', JSON.stringify(worlds));
const TAG = arg('--part') !== null ? `_${arg('--part')}` : arg('--from') ? `_s${arg('--from')}` : '';
const TMP = path.join(OUT, `_film${TAG}.html`); fs.writeFileSync(TMP, html);

const require = createRequire(import.meta.url);
let playwright;
try { playwright = require('playwright'); } catch { playwright = require(execFileSync('npm', ['root', '-g']).toString().trim() + '/playwright'); }
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
if (arg('--audio-only')) {
  const b64 = await page.evaluate(() => window.renderAudio());
  fs.writeFileSync(path.join(OUT, 'InfiniteTamm_Score.wav'), Buffer.from(b64, 'base64'));
  await done(); console.log('wrote score'); process.exit(0);
}
const PART = arg('--part'), PARTS = Number(arg('--parts') || 1), FT = FPS * DUR;
let F0 = PART === null ? 0 : Math.floor((Number(PART) * FT) / PARTS), F1 = PART === null ? FT : Math.floor(((Number(PART) + 1) * FT) / PARTS);
if (arg('--from')) { F0 = Number(arg('--from')); F1 = Number(arg('--to')); }
const MP4 = path.join(OUT, `_part${TAG}.mp4`);
const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS * SUB), '-c:v', 'mjpeg', '-i', '-',
  '-vf', `tmix=frames=${SUB},select='not(mod(n\\,${SUB}))',setpts=N/(${FPS}*TB)`, '-r', String(FPS),
  '-c:v', 'libx264', '-preset', 'slow', '-crf', '14', '-profile:v', 'high', '-tune', 'film', '-pix_fmt', 'yuv420p', '-an', MP4], { stdio: ['pipe', 'inherit', 'inherit'] });
const fin = new Promise((r, j) => ff.on('close', (c) => (c ? j(new Error('ffmpeg ' + c)) : r())));
for (let f = F0; f < F1; f++) {
  for (let k = 0; k < SUB; k++) { const buf = await at(Math.max(0, (f + (k - 1) / SUB) / FPS)); if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r)); }
  if ((f - F0) % 60 === 0) console.log('frame', f, `(${F0}–${F1})`);
}
ff.stdin.end(); await fin; await done(); console.log('wrote', MP4);
