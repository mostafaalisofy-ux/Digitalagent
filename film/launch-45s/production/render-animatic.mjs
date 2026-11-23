// Silent animatic for the SayTamm launch film (45 s, 1080×1920, 30 fps constant). Usage (repo root):
//   node film/launch-45s/production/render-animatic.mjs --sheet   → one frame per second, contact sheet for checking
//   node film/launch-45s/production/render-animatic.mjs           → REVIEW mp4 (timecode/shot overlay) + clean mp4 + draft SRT + QC
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync, spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const OUT = path.join(ROOT, 'handover', 'launch-film', 'animatic'); fs.mkdirSync(OUT, { recursive: true });
const FPS = 30, DUR = 45, SHEET = process.argv.includes('--sheet');
const sig = fs.readFileSync(path.join(ROOT, 'brand/production/logo/SayTamm_Symbol_Signature_White-Purple.svg'), 'utf8'); // official file
const ds = [...sig.matchAll(/<path[^>]*\sd="([^"]+)"/g)].map((m) => m[1]);
const vb = sig.match(/viewBox="([^"]+)"/)[1];
const html = fs.readFileSync(path.join(ROOT, 'film/launch-45s/production/animatic.html'), 'utf8')
  .replaceAll('__SAT__', pathToFileURL(path.join(ROOT, 'site/public/fonts/satoshi')).href)
  .replaceAll('__PLEX__', pathToFileURL(path.join(ROOT, 'site/node_modules/@fontsource/ibm-plex-sans-arabic/files')).href)
  .replaceAll('__VB__', vb).replaceAll('__T__', ds[0]).replaceAll('__B__', ds[1]).replaceAll('__VH__', vb.split(' ')[3]);
const TMP = path.join(OUT, '_animatic.html'); fs.writeFileSync(TMP, html);

const require = createRequire(import.meta.url);
let playwright;
try { playwright = require('playwright'); } catch { playwright = require(execFileSync('npm', ['root', '-g']).toString().trim() + '/playwright'); }
const browser = await playwright.chromium.launch();
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
const errs = []; page.on('pageerror', (e) => errs.push(e.message));
await page.goto(pathToFileURL(TMP).href, { waitUntil: 'load' });
await page.evaluate(() => window.ready);
if (errs.length) throw new Error(errs.join('\n'));
const shot = async (t, review, opts = {}) => {
  await page.evaluate(([x, r]) => { document.body.classList.toggle('review', r); window.seek(x); }, [t, review]);
  return page.screenshot({ type: 'jpeg', quality: 92, ...opts });
};

if (SHEET) {
  const d = path.join(OUT, '_sheet'); fs.rmSync(d, { recursive: true, force: true }); fs.mkdirSync(d);
  const T = process.argv.includes('--fine') ? Array.from({ length: 90 }, (_, i) => i * 0.5 + 0.25) : Array.from({ length: 45 }, (_, i) => i + 0.5);
  for (const t of T) await shot(t, true, { path: path.join(d, `t${t.toFixed(2).padStart(5, '0')}.jpg`) });
  if (errs.length) throw new Error(errs.join('\n'));
  await browser.close(); fs.rmSync(TMP); console.log('frames in', d); process.exit(0);
}

const SHOTS = await page.evaluate(() => window.SHOTS), CAPS = await page.evaluate(() => window.CAPS);
// draft SRT from the same caption track that is burned into the picture
const ts = (x) => { const ms = Math.round(x * 1000); const p = (n, w = 2) => String(n).padStart(w, '0'); return `${p(Math.floor(ms / 3600000))}:${p(Math.floor(ms / 60000) % 60)}:${p(Math.floor(ms / 1000) % 60)},${p(ms % 1000, 3)}`; };
fs.writeFileSync(path.join(OUT, 'SayTamm_Launch_45s_AR_DRAFT.srt'), CAPS.map((c, i) => `${i + 1}\n${ts(c[0])} --> ${ts(c[1])}\n${c[3]}\n`).join('\n'));

const enc = (file) => {
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '16', '-pix_fmt', 'yuv420p', '-r', String(FPS), '-movflags', '+faststart', file], { stdio: ['pipe', 'inherit', 'inherit'] });
  return { ff, done: new Promise((r, j) => ff.on('close', (c) => (c ? j(new Error('ffmpeg ' + c)) : r()))) };
};
const review = enc(path.join(OUT, 'SayTamm_Launch_45s_9x16_ANIMATIC_REVIEW.mp4'));
const clean = enc(path.join(OUT, 'SayTamm_Launch_45s_9x16_ANIMATIC_clean.mp4'));
const write = async (p, buf) => { if (!p.ff.stdin.write(buf)) await new Promise((r) => p.ff.stdin.once('drain', r)); };
const qcDir = path.join(OUT, '_qc'); fs.rmSync(qcDir, { recursive: true, force: true }); fs.mkdirSync(qcDir);
for (let f = 0; f < FPS * DUR; f++) {
  const t = f / FPS;
  const c = await shot(t, false); await write(clean, c);
  if (f % 15 === 0) fs.writeFileSync(path.join(qcDir, `f${String(f).padStart(4, '0')}.jpg`), c);
  await write(review, await shot(t, true));
  if (f % 150 === 0) console.log('frame', f, '/', FPS * DUR);
}
review.ff.stdin.end(); clean.ff.stdin.end(); await Promise.all([review.done, clean.done]);
if (errs.length) throw new Error(errs.join('\n'));
await browser.close(); fs.rmSync(TMP);

// QC on the clean picture every 0.5 s: purple share, bright pixels inside the social danger zones (top 12% / bottom 20%)
const qc = JSON.parse(execFileSync('python3', ['-I', '-c', `
import json, sys, os
from PIL import Image
d = sys.argv[1]; rows = []
for n in sorted(os.listdir(d)):
    im = Image.open(os.path.join(d, n)).convert('RGB').resize((540, 960)); px = im.load(); w, h = im.size
    pu = sum(1 for y in range(h) for x in range(w) if px[x, y][2] > 120 and px[x, y][2] - px[x, y][1] > 90 and px[x, y][0] < px[x, y][2])
    out = sum(1 for y in list(range(0, 115)) + list(range(768, 960)) for x in range(w) if min(px[x, y]) > 200)
    rows.append({'t': int(n[1:5]) / 30, 'purple_pct': round(100 * pu / (w * h), 2), 'bright_px_outside_safe': out})
print(json.dumps(rows))
`, qcDir]).toString());
fs.rmSync(qcDir, { recursive: true });
fs.writeFileSync(path.join(OUT, 'qc.json'), JSON.stringify({ max_purple_pct: Math.max(...qc.map((r) => r.purple_pct)), frames_with_bright_px_outside_safe: qc.filter((r) => r.bright_px_outside_safe > 0).map((r) => r.t), samples: qc }, null, 2));
console.log('max purple %', Math.max(...qc.map((r) => r.purple_pct)), 'unsafe frames', qc.filter((r) => r.bright_px_outside_safe > 0).map((r) => r.t).join(','));
