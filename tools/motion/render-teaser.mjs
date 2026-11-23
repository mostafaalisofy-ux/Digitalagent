// Render the SayTamm teaser: frames from teaser.html (Playwright) + synthesised sound design (Python/numpy) → MP4 (ffmpeg).
// Usage (repo root): node tools/motion/render-teaser.mjs [--preview] [--only=en-16x9]
// Output: handover/motion/SayTamm_Teaser_<lang>_<ratio>.mp4 (+ silent versions, poster frames).
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync, spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = path.join(ROOT, 'handover', 'motion'); fs.mkdirSync(OUT, { recursive: true });
const PREVIEW = process.argv.includes('--preview');
const ONLY = (process.argv.find((a) => a.startsWith('--only=')) || '').slice(7);
const FPS = 30, DUR = 24;

// logo paths straight from the approved production vector (never redrawn)
const sig = fs.readFileSync(path.join(ROOT, 'brand/production/logo/SayTamm_Symbol_Signature_White-Purple.svg'), 'utf8');
const ds = [...sig.matchAll(/<path[^>]*\sd="([^"]+)"/g)].map((m) => m[1]);
const LOGO = { vb: sig.match(/viewBox="([^"]+)"/)[1], t: ds[0], b: ds[1] };
const tpl = fs.readFileSync(path.join(ROOT, 'tools/motion/teaser.html'), 'utf8')
  .replaceAll('__SAT__', pathToFileURL(path.join(ROOT, 'site/public/fonts/satoshi')).href)
  .replaceAll('__PLEX__', pathToFileURL(path.join(ROOT, 'site/node_modules/@fontsource/ibm-plex-sans-arabic/files')).href)
  .replace('__LOGO__', JSON.stringify(LOGO));
const HTML = path.join(OUT, '_teaser.html'); fs.writeFileSync(HTML, tpl);

// ---------- sound design (synthesised; no third-party music) ----------
const WAV = path.join(OUT, '_teaser_sound.wav');
execFileSync('python3', ['-I', '-c', `
import numpy as np, wave, sys
SR=48000; D=${DUR}; N=SR*D; t=np.arange(N)/SR; out=np.zeros(N)
rng=np.random.default_rng(7)
def lp(x,a):  # one-pole low-pass, vectorised enough
    y=np.empty_like(x); acc=0.0
    for i in range(len(x)): acc+=a*(x[i]-acc); y[i]=acc
    return y
def add(sig,at):
    i=int(at*SR); j=min(N,i+len(sig)); out[i:j]+=sig[:j-i]
def env(n,att,dec): e=np.ones(n); a=int(att*SR); e[:a]=np.linspace(0,1,a) if a>0 else 1; e*=np.exp(-np.arange(n)/(dec*SR)); return e
# S1 ticks, accelerating and rising
for k in range(22):
    at=0.25+k*0.12; n=int(0.03*SR); s=rng.standard_normal(n)*env(n,0,0.006)
    s=s-np.concatenate([[0],s[:-1]])  # high-passed click
    add(s*(0.10+0.25*k/22),at)
# noise bed growing in S1, hard cut at 3.05
n=int(3.05*SR); bed=lp(rng.standard_normal(n),0.08)*np.linspace(0,0.18,n); out[:n]+=bed
# drone from 3.35
dn=N-int(3.35*SR); tt=np.arange(dn)/SR
drone=(np.sin(2*np.pi*55*tt)+0.5*np.sin(2*np.pi*82.5*tt)+0.25*np.sin(2*np.pi*110*tt+0.3))*0.09
drone*=np.minimum(1,tt/1.5)
out[int(3.35*SR):]+=drone
# whooshes into transitions
def whoosh(at,L=0.6,g=0.35):
    n=int(L*SR); x=rng.standard_normal(n); e=np.sin(np.linspace(0,np.pi,n))**2
    x=lp(x,0.02+0.25*np.linspace(0,1,n).mean()); add(x*e*g, at-L*0.8)
for at in (6.05,9.6,14.2,15.7): whoosh(at)
# soft pulse 9.6-14.2 (one connected plan)
for k in np.arange(9.75,14.1,0.5):
    n=int(0.25*SR); tt=np.arange(n)/SR; f=60*np.exp(-tt*18)+45
    add(np.sin(2*np.pi*np.cumsum(f)/SR)*env(n,0.002,0.09)*0.35,k)
# underline / box / node ticks
for at in (4.6,7.5,8.05,8.55,9.85,10.47,11.09,11.71,12.75,13.07):
    n=int(0.05*SR); s=np.sin(2*np.pi*1800*np.arange(n)/SR)*env(n,0,0.012); add(s*0.12,at)
# logo: T drop thud + blade IMPACT at 17.05
def impact(at,g=1.0):
    n=int(1.6*SR); tt=np.arange(n)/SR; f=110*np.exp(-tt*9)+38
    body=np.sin(2*np.pi*np.cumsum(f)/SR)*env(n,0.001,0.35)
    snap=lp(rng.standard_normal(n),0.35)*env(n,0,0.03)
    add((body*0.9+snap*0.5)*g,at)
impact(15.95,0.35); impact(17.05,1.0)
# shimmer after impact
n=int(2.5*SR); tt=np.arange(n)/SR; sh=(np.sin(2*np.pi*880*tt)+np.sin(2*np.pi*1320*tt)*0.5)*np.exp(-tt*1.6)*0.04; add(sh,17.06)
# end hit
impact(21.25,0.45)
# drone duck on cuts and fade out
g=np.ones(N);
for a,b in ((5.9,6.15),(14.1,14.3)): i,j=int(a*SR),int(b*SR); g[i:j]*=0.6
f=int(23.2*SR); g[f:]*=np.linspace(1,0,N-f)
out*=g
out=np.tanh(out*1.4)/np.tanh(1.4); out/=max(1e-9,np.abs(out).max()); out*=0.89
st=np.stack([out,out*0.985],1); data=(st*32767).astype('<i2').tobytes()
w=wave.open(sys.argv[1],'wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(data); w.close()
`, WAV]);

// ---------- frames ----------
const require = createRequire(import.meta.url);
let playwright;
try { playwright = require('playwright'); } catch { playwright = require(execFileSync('npm', ['root', '-g']).toString().trim() + '/playwright'); }
const browser = await playwright.chromium.launch();
const VERSIONS = [['en', '16x9', 1920, 1080], ['ar', '16x9', 1920, 1080], ['en', '9x16', 1080, 1920], ['ar', '9x16', 1080, 1920]].filter(([l, r]) => !ONLY || ONLY === `${l}-${r}`);
for (const [lang, ratio, w, h] of VERSIONS) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.goto(pathToFileURL(HTML).href + `?w=${w}&h=${h}&lang=${lang}`, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  const name = `SayTamm_Teaser_${lang.toUpperCase()}_${ratio}`;
  if (PREVIEW) {
    const pd = path.join(OUT, '_preview', name); fs.mkdirSync(pd, { recursive: true });
    for (const t of [1.5, 2.9, 4.2, 5.3, 6.9, 8.2, 10.6, 12.0, 13.4, 14.9, 16.5, 17.2, 18.9, 21.4, 22.9]) {
      await page.evaluate((x) => window.render(x), t); await page.screenshot({ path: path.join(pd, `t${t.toFixed(1)}.jpg`), type: 'jpeg', quality: 80 });
    }
    await page.close(); continue;
  }
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-', '-i', WAV,
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-c:a', 'aac', '-b:a', '192k', '-shortest', path.join(OUT, name + '.mp4')], { stdio: ['pipe', 'inherit', 'inherit'] });
  const done = new Promise((r, j) => ff.on('close', (c) => (c ? j(new Error('ffmpeg ' + c)) : r())));
  for (let f = 0; f < FPS * DUR; f++) {
    await page.evaluate((x) => window.render(x), f / FPS);
    const buf = await page.screenshot({ type: 'jpeg', quality: 95 });
    if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r));
    if (f === Math.round(17.6 * FPS)) fs.writeFileSync(path.join(OUT, name + '_poster.jpg'), buf);
  }
  ff.stdin.end(); await done;
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', path.join(OUT, name + '.mp4'), '-an', '-c:v', 'copy', path.join(OUT, name + '_silent.mp4')]);
  console.log('rendered', name);
  await page.close();
}
await browser.close();
if (!PREVIEW) fs.copyFileSync(WAV, path.join(OUT, 'SayTamm_Teaser_Sound.wav'));
