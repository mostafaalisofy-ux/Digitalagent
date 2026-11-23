// SayTamm showreel 2 renderer (30 s, The Caret). Usage (repo root):
//   node tools/motion/render-showreel.mjs --beats   → one frame per beat (review sheet)
//   node tools/motion/render-showreel.mjs           → 60 fps, 3 sub-frames/frame blended (tmix) + Web Audio WAV → MP4
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync, spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = path.join(ROOT, 'handover', 'motion'); fs.mkdirSync(OUT, { recursive: true });
const BEATS = process.argv.includes('--beats');
const FPS = 60, SUB = 3, DUR = 30;
const sig = fs.readFileSync(path.join(ROOT, 'brand/production/logo/SayTamm_Symbol_Signature_White-Purple.svg'), 'utf8');
const ds = [...sig.matchAll(/<path[^>]*\sd="([^"]+)"/g)].map((m) => m[1]);
const vb = sig.match(/viewBox="([^"]+)"/)[1]; const [, , VW, VH] = vb.split(' ').map(Number);
const u = (p) => pathToFileURL(path.join(ROOT, 'site/public', p)).href;
// 28 real project covers (one per project in site/src/data/work.ts)
const WORK = ['chery-launch-1', 'chery-post-1', 'techhive-post-3', 'techhive-banner-3', 'niimee-visual-1', 'niimee-the-dot-poster', 'niimee-post-1', 'zahid-1', 'sw-electra-a-1', 'sw-gig-1', 'sw-xiaomi-1', 'sw-marriott-1', 'bitumat-1', 'mix-1', 'arhab-2', 'altopiano-3', 'metro-post-2', 'beautylab-1', 'cleanbasket-2', 'jora-identity-1', 'sw-tecspro-1', 'sw-siefco-1', 'dcblock-2', 'alqimma-2', 'fatora-1', 'ks-offer', 'siyaq-1', 'exodus-1'].map((f) => `/work/${f}.webp`);
// production-visible client wall logos (no government bodies)
const clientsTs = fs.readFileSync(path.join(ROOT, 'site/src/data/clients.ts'), 'utf8');
const wallSrc = clientsTs.slice(clientsTs.indexOf('export const CLIENT_WALL'), clientsTs.indexOf('\n];', clientsTs.indexOf('export const CLIENT_WALL')));
const LOGOS = wallSrc.split('\n').filter((l) => l.includes('/clients/wall/') && !l.includes("permission: 'pending'")).map((l) => l.match(/src: '([^']+)'/)[1]);
const STRIP = ['chery-launch-1', 'niimee-visual-1', 'techhive-post-3', 'zahid-1', 'altopiano-3', 'bitumat-1', 'metro-post-2', 'beautylab-2', 'mix-1', 'arhab-2', 'chery-post-1', 'niimee-post-1'].map((f) => `/work/${f}.webp`);
for (const f of [...WORK, ...STRIP, ...LOGOS]) if (!fs.existsSync(path.join(ROOT, 'site/public', f))) throw new Error('missing ' + f);
const html = fs.readFileSync(path.join(ROOT, 'tools/motion/showreel2.html'), 'utf8')
  .replaceAll('__SAT__', pathToFileURL(path.join(ROOT, 'site/public/fonts/satoshi')).href)
  .replaceAll('__PLEX__', pathToFileURL(path.join(ROOT, 'site/node_modules/@fontsource/ibm-plex-sans-arabic/files')).href)
  .replaceAll('__WORK__', pathToFileURL(path.join(ROOT, 'site/public/work')).href)
  .replaceAll('__VB__', vb).replaceAll('__T__', ds[0]).replaceAll('__B__', ds[1])
  .replaceAll('__VW__', String(VW)).replaceAll('__VH__', String(VH))
  .replaceAll('__WORK_LIST__', JSON.stringify(WORK.map(u)))
  .replaceAll('__LOGO_LIST__', JSON.stringify(LOGOS.map(u)))
  .replaceAll('__STRIP__', JSON.stringify(STRIP.map(u)));
const F = path.join(OUT, '_showreel2.html'); fs.writeFileSync(F, html);

const require = createRequire(import.meta.url);
let playwright;
try { playwright = require('playwright'); } catch { playwright = require(execFileSync('npm', ['root', '-g']).toString().trim() + '/playwright'); }
const browser = await playwright.chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
const errs = []; page.on('pageerror', (e) => errs.push(e.message));
await page.goto(pathToFileURL(F).href, { waitUntil: 'load' });
await page.evaluate(() => window.ready);
if (errs.length) throw new Error(errs.join('\n'));

if (BEATS) {
  const d = path.join(OUT, '_beats2'); fs.rmSync(d, { recursive: true, force: true }); fs.mkdirSync(d);
  for (let b = 0; b < 60; b++) { const t = b * 0.5 + 0.3; await page.evaluate((x) => window.seek(x), t); await page.screenshot({ path: path.join(d, `b${String(b + 1).padStart(2, '0')}_${t.toFixed(2)}.jpg`), type: 'jpeg', quality: 70 }); }
  if (errs.length) throw new Error(errs.join('\n'));
  await browser.close(); console.log('beat frames in', d); process.exit(0);
}
// audio
const b64 = await page.evaluate(() => window.renderAudio());
const WAV = path.join(OUT, 'SayTamm_Showreel_2_Sound.wav'); fs.writeFileSync(WAV, Buffer.from(b64, 'base64'));
// video: render at 180 fps (3 sub-frames), blend each 3 with tmix, keep every 3rd → 60 fps
const outMp4 = path.join(OUT, 'SayTamm_Showreel_2_The_Caret_30s.mp4');
const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS * SUB), '-c:v', 'mjpeg', '-i', '-', '-i', WAV,
  '-vf', `tmix=frames=${SUB},select='not(mod(n\\,${SUB}))',setpts=N/(${FPS}*TB)`, '-r', String(FPS),
  '-c:v', 'libx264', '-preset', 'slow', '-crf', '17', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-c:a', 'aac', '-b:a', '256k', '-shortest', outMp4], { stdio: ['pipe', 'inherit', 'inherit'] });
const done = new Promise((r, j) => ff.on('close', (c) => (c ? j(new Error('ffmpeg ' + c)) : r())));
const N = FPS * DUR * SUB;
for (let i = 0; i < N; i++) {
  // sub-frames centred on each output frame: t = (frame + (k - 1)/3) / fps
  const f = Math.floor(i / SUB), k = i % SUB; const t = Math.max(0, (f + (k - 1) / SUB) / FPS);
  await page.evaluate((x) => window.seek(x), t);
  const buf = await page.screenshot({ type: 'jpeg', quality: 93 });
  if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r));
  if (i % 600 === 0) console.log('frame', f, '/', FPS * DUR);
}
ff.stdin.end(); await done;
if (errs.length) throw new Error(errs.join('\n'));
await browser.close();
console.log('wrote', outMp4);
