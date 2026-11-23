// SayTamm launch film: creative rebuild ("A decision travels through matter"). Usage (repo root):
//   node film/launch-45s/production/rebuild/render.mjs --keyframes          → F01–F06 + contact sheet
//   node film/launch-45s/production/rebuild/render.mjs --frames 7.0,7.2     → spot frames for checking
//   node film/launch-45s/production/rebuild/render.mjs --preview            → 00:04–00:15 proof-of-energy MP4 with provisional foley
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync, spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../..');
const OUT = path.join(ROOT, 'handover', 'launch-film', 'rebuild'); fs.mkdirSync(OUT, { recursive: true });
const arg = (k) => { const i = process.argv.indexOf(k); return i < 0 ? null : process.argv[i + 1] ?? true; };
const html = fs.readFileSync(path.join(ROOT, 'film/launch-45s/production/rebuild/film.html'), 'utf8')
  .replaceAll('__SAT__', pathToFileURL(path.join(ROOT, 'site/public/fonts/satoshi')).href)
  .replaceAll('__PLEX__', pathToFileURL(path.join(ROOT, 'site/node_modules/@fontsource/ibm-plex-sans-arabic/files')).href)
  .replaceAll('__SYMBOL__', pathToFileURL(path.join(ROOT, 'brand/production/logo/SayTamm_Symbol_Signature_White-Purple.svg')).href); // official file, drawn as-is
const TMP = path.join(OUT, '_film.html'); fs.writeFileSync(TMP, html);

const require = createRequire(import.meta.url);
let playwright;
try { playwright = require('playwright'); } catch { playwright = require(execFileSync('npm', ['root', '-g']).toString().trim() + '/playwright'); }
const browser = await playwright.chromium.launch();
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
const errs = []; page.on('pageerror', (e) => errs.push(e.message)); page.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
await page.goto(pathToFileURL(TMP).href, { waitUntil: 'load' });
await page.evaluate(() => window.ready);
if (errs.length) throw new Error(errs.join('\n'));
const at = async (t, o = {}) => { await page.evaluate((x) => window.seek(x), t); return page.screenshot({ type: 'jpeg', quality: 94, ...o }); };
const done = async () => { if (errs.length) throw new Error(errs.join('\n')); await browser.close(); fs.rmSync(TMP); };

if (arg('--frames')) {
  const d = path.join(OUT, '_frames'); fs.mkdirSync(d, { recursive: true });
  for (const t of String(arg('--frames')).split(',').map(Number)) await at(t, { path: path.join(d, `t${t.toFixed(2).padStart(5, '0')}.jpg`) });
  await done(); console.log('frames in', d); process.exit(0);
}

if (arg('--keyframes')) {
  const d = path.join(OUT, 'keyframes'); fs.mkdirSync(d, { recursive: true });
  const KF = [
    ['F01', 3.3, '00:00–00:04', 'Before the decision', 'Black glass at a grazing angle. A caret under the glass, a fingertip and its reflection out of focus, a practical light almost on.'],
    ['F02', 7.16, '00:04–00:08', 'First activation', '«قول تم» is typed under the glass; the fingertip meets its reflection and releases a razor-thin purple edge.'],
    ['F03', 10.3, '00:08–00:15', 'Chain reaction', 'Match cut: the edge, now a reflection on paper, completes the unfinished 45° stroke and locks the crop marks.'],
    ['F04', 30.4, '00:27–00:35', 'Three languages converge', 'قول as a reflection on glass · اعتبره printed on a card · Consider as a moving wordmark. One edge pulls them.'],
    ['F05', 37.0, '00:35–00:40', '«تم», the climax', '«تم» embossed in graphite under a raking light. The two dots are the two purple beats.'],
    ['F06', 44.0, '00:40–00:45', 'End card', 'The original symbol, refined spacing and optical centre, quiet. Locked copy only.'],
  ];
  for (const [id, t] of KF) await page.evaluate((x) => window.seek(x), t), await page.screenshot({ path: path.join(d, `${id}.png`) });
  const qc = JSON.parse(execFileSync('python3', ['-I', '-c', `
import json, sys
from PIL import Image
out = {}
for p in sys.argv[1:]:
    im = Image.open(p).convert('RGB').resize((540, 960)); px = im.load(); w, h = im.size
    out[p.rsplit('/', 1)[-1][:3]] = round(100 * sum(1 for y in range(h) for x in range(w) if px[x, y][2] > 110 and px[x, y][2] - px[x, y][1] > 70 and px[x, y][0] < px[x, y][2]) / (w * h), 2)
print(json.dumps(out))
`, ...KF.map(([id]) => path.join(d, `${id}.png`))]).toString());
  const sheet = `<!doctype html><meta charset="utf-8"><style>
@font-face{font-family:Sat;src:url(${pathToFileURL(path.join(ROOT, 'site/public/fonts/satoshi/Satoshi-500.woff2')).href});font-weight:500}
@font-face{font-family:Sat;src:url(${pathToFileURL(path.join(ROOT, 'site/public/fonts/satoshi/Satoshi-700.woff2')).href});font-weight:700}
@font-face{font-family:Plex;src:url(${pathToFileURL(path.join(ROOT, 'site/node_modules/@fontsource/ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-arabic-500-normal.woff2')).href})}
body{margin:0;background:#0E0E12;color:#F5F3FA;font:500 15px/1.45 Sat,Plex,sans-serif;width:1680px;padding:52px 64px 60px;box-sizing:border-box}
h1{font:700 28px/1 Sat;margin:0 0 8px;letter-spacing:-.01em}.sub{color:#96939F;margin-bottom:34px}
.g{display:grid;grid-template-columns:repeat(6,1fr);gap:22px}.c img{width:100%;display:block}
.id{font:700 18px/1 Sat;margin:16px 0 4px}.t{color:#96939F;font-size:13px}.h{font-weight:700;margin:6px 0 4px}.d{color:#C9C6D1;font-size:13.5px}.q{color:#6f6c78;font-size:12px;margin-top:8px}</style>
<h1>SayTamm launch film · rebuild keyframes</h1><div class="sub">“A decision travels through matter” · 1080×1920 · graphic-first (procedural glass, frost, paper, graphite; live type; original symbol) · review only</div>
<div class="g">${KF.map(([id, , tc, h, dsc]) => `<div class="c"><img src="keyframes/${id}.png"><div class="id">${id}</div><div class="t">${tc}</div><div class="h">${h}</div><div class="d">${dsc.replace(/([؀-ۿ«»][؀-ۿ«». ]*[؀-ۿ»])/g, '<bdi dir="rtl">$1</bdi>')}</div><div class="q">Purple ${qc[id]}% of frame</div></div>`).join('')}</div>`;
  const f = path.join(OUT, '_sheet.html'); fs.writeFileSync(f, sheet);
  const p = await browser.newPage({ viewport: { width: 1680, height: 300 }, deviceScaleFactor: 2 });
  await p.goto(pathToFileURL(f).href, { waitUntil: 'load' }); await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: path.join(OUT, 'F01-F06_rebuild_contact_sheet.png'), fullPage: true }); await p.close(); fs.rmSync(f);
  await done(); console.log(JSON.stringify(qc)); process.exit(0);
}

if (arg('--preview')) {
  const T0 = 4.0, T1 = 15.0, FPS = 30, SUB = 3;
  const b64 = await page.evaluate(([a, b]) => window.renderAudio(a, b), [T0, T1]);
  const WAV = path.join(OUT, 'SayTamm_Launch_ProofOfEnergy_04-15s_foley.wav'); fs.writeFileSync(WAV, Buffer.from(b64, 'base64'));
  const CUTS = await page.evaluate(() => window.CUTS);
  const MP4 = path.join(OUT, 'SayTamm_Launch_ProofOfEnergy_04-15s.mp4');
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS * SUB), '-c:v', 'mjpeg', '-i', '-', '-i', WAV,
    '-vf', `tmix=frames=${SUB},select='not(mod(n\\,${SUB}))',setpts=N/(${FPS}*TB)`, '-r', String(FPS),
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '16', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-c:a', 'aac', '-b:a', '256k', '-shortest', MP4], { stdio: ['pipe', 'inherit', 'inherit'] });
  const fin = new Promise((r, j) => ff.on('close', (c) => (c ? j(new Error('ffmpeg ' + c)) : r())));
  const N = Math.round((T1 - T0) * FPS);
  for (let f = 0; f < N; f++) {
    const tc = T0 + f / FPS;
    for (let k = 0; k < SUB; k++) {
      let t = tc + (k - 1) / (SUB * FPS);
      if (CUTS.some((c) => (t < c) !== (tc < c))) t = tc; // never blend across a match cut
      const buf = await at(Math.max(T0, t), { quality: 92 });
      if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r));
    }
    if (f % 60 === 0) console.log('frame', f, '/', N);
  }
  ff.stdin.end(); await fin; await done(); console.log('wrote', MP4); process.exit(0);
}
await done();
