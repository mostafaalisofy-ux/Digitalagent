// SayTamm launch film: "The SayTamm Dictionary" v2, premium (45 s, 1080×1920). Usage (repo root):
//   node film/launch-45s/production/dictionary/render_v2.mjs --beats          → one frame per beat (review sheet)
//   node film/launch-45s/production/dictionary/render_v2.mjs --frames 4.6,9.2 → spot frames
//   node film/launch-45s/production/dictionary/render_v2.mjs               → 60 fps, 3 sub-frames blended (tmix) + Web Audio WAV → MP4
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync, spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../..');
const OUT = path.join(ROOT, 'handover', 'launch-film', 'dictionary'); fs.mkdirSync(OUT, { recursive: true });
const arg = (k) => { const i = process.argv.indexOf(k); return i < 0 ? null : process.argv[i + 1] ?? true; };
const FPS = 60, SUB = 3, DUR = 45;
const sig = fs.readFileSync(path.join(ROOT, 'brand/production/logo/SayTamm_Symbol_Signature_White-Purple.svg'), 'utf8'); // official file: paths used unchanged
const ds = [...sig.matchAll(/<path[^>]*\sd="([^"]+)"/g)].map((m) => m[1]);
const vb = sig.match(/viewBox="([^"]+)"/)[1];
const DIR = path.join(ROOT, 'film/launch-45s/production/dictionary');
const html = fs.readFileSync(path.join(DIR, 'film_v2.html'), 'utf8')
  .replace('__LANDMARKS__', fs.readFileSync(path.join(DIR, 'assets/landmarks.js'), 'utf8'))
  .replace('__ICONS__', fs.readFileSync(path.join(DIR, 'assets/platform-icons.json'), 'utf8'))
  .replaceAll('__SAT__', pathToFileURL(path.join(ROOT, 'site/public/fonts/satoshi')).href)
  .replaceAll('__PLEX__', pathToFileURL(path.join(ROOT, 'site/node_modules/@fontsource/ibm-plex-sans-arabic/files')).href)
  .replaceAll('__VB__', vb).replaceAll('__T__', ds[0]).replaceAll('__B__', ds[1]).replaceAll('__VH__', vb.split(' ')[3]);
const TMP = path.join(OUT, '_film_v2.html'); fs.writeFileSync(TMP, html);

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
const done = async () => { if (errs.length) throw new Error(errs.join('\n')); await browser.close(); fs.rmSync(TMP); };

if (arg('--beats') || arg('--frames')) {
  const d = path.join(OUT, '_beats_v2'); fs.rmSync(d, { recursive: true, force: true }); fs.mkdirSync(d);
  const T = arg('--frames') ? String(arg('--frames')).split(',').map(Number) : Array.from({ length: 90 }, (_, b) => b * 0.5 + 0.3);
  for (const t of T) await at(t, { path: path.join(d, `t${t.toFixed(2).padStart(5, '0')}.jpg`), quality: 80 });
  await done(); console.log('frames in', d); process.exit(0);
}

const b64 = await page.evaluate((d) => window.renderAudio(d), DUR);
const WAV = path.join(OUT, 'SayTamm_Launch_Dictionary_v2_Sound.wav'); fs.writeFileSync(WAV, Buffer.from(b64, 'base64'));
const MP4 = path.join(OUT, 'SayTamm_Launch_Dictionary_v2_45s_9x16_music.mp4');
const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS * SUB), '-c:v', 'mjpeg', '-i', '-', '-i', WAV,
  '-vf', `tmix=frames=${SUB},select='not(mod(n\\,${SUB}))',setpts=N/(${FPS}*TB)`, '-r', String(FPS),
  '-c:v', 'libx264', '-preset', 'slow', '-crf', '14', '-profile:v', 'high', '-tune', 'film', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-c:a', 'aac', '-b:a', '256k', '-shortest', MP4], { stdio: ['pipe', 'inherit', 'inherit'] });
const fin = new Promise((r, j) => ff.on('close', (c) => (c ? j(new Error('ffmpeg ' + c)) : r())));
const N = FPS * DUR * SUB;
for (let i = 0; i < N; i++) {
  const f = Math.floor(i / SUB), k = i % SUB, t = Math.max(0, (f + (k - 1) / SUB) / FPS);
  const buf = await at(t);
  if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r));
  if (i % 900 === 0) console.log('frame', f, '/', FPS * DUR);
}
ff.stdin.end(); await fin; await done(); console.log('wrote', MP4);
