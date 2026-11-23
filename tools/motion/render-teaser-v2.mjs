// Render the SayTamm teaser v2 (SAY → TAMM, 30 s): frames from teaser.html (Playwright) + synthesised sound design (Python/numpy) → MP4 (ffmpeg).
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
const FPS = 30, DUR = 30;

// logo paths straight from the approved production vector (never redrawn)
const sig = fs.readFileSync(path.join(ROOT, 'brand/production/logo/SayTamm_Symbol_Signature_White-Purple.svg'), 'utf8');
const ds = [...sig.matchAll(/<path[^>]*\sd="([^"]+)"/g)].map((m) => m[1]);
const LOGO = { vb: sig.match(/viewBox="([^"]+)"/)[1], t: ds[0], b: ds[1] };
const tpl = fs.readFileSync(path.join(ROOT, 'tools/motion/teaser-v2.html'), 'utf8')
  .replaceAll('__SAT__', pathToFileURL(path.join(ROOT, 'site/public/fonts/satoshi')).href)
  .replaceAll('__PLEX__', pathToFileURL(path.join(ROOT, 'site/node_modules/@fontsource/ibm-plex-sans-arabic/files')).href)
  .replace('__LOGO__', JSON.stringify(LOGO));
const HTML = path.join(OUT, '_teaser_v2.html'); fs.writeFileSync(HTML, tpl);

// ---------- sound design (synthesised; no third-party music) ----------
const WAV = path.join(OUT, '_teaser_v2_sound.wav');
execFileSync('python3', ['-I', '-c', `
import numpy as np, wave, sys
SR=48000; D=${DUR}; N=SR*D; out=np.zeros(N); rng=np.random.default_rng(11)
def lp(x,a):
    y=np.empty_like(x); acc=0.0
    for i in range(len(x)): acc+=a*(x[i]-acc); y[i]=acc
    return y
def add(sig,at,g=1.0):
    i=int(at*SR); j=min(N,i+len(sig)); 
    if i<N: out[i:j]+=sig[:j-i]*g
def env(n,att,dec):
    e=np.ones(n); a=int(att*SR)
    if a>0: e[:a]=np.linspace(0,1,a)
    return e*np.exp(-np.arange(n)/(dec*SR))
def kick(g=1.0):
    n=int(0.45*SR); tt=np.arange(n)/SR; f=140*np.exp(-tt*30)+48
    return np.sin(2*np.pi*np.cumsum(f)/SR)*env(n,0.001,0.12)*g
def hat(g=0.2):
    n=int(0.06*SR); x=rng.standard_normal(n); x=x-np.concatenate([[0],x[:-1]]); return x*env(n,0,0.012)*g
def impact(g=1.0,L=2.0,f0=120):
    n=int(L*SR); tt=np.arange(n)/SR; f=f0*np.exp(-tt*8)+34
    body=np.sin(2*np.pi*np.cumsum(f)/SR)*env(n,0.001,0.45)
    snap=lp(rng.standard_normal(n),0.4)*env(n,0,0.035)
    return (body*0.95+snap*0.55)*g
def riser(L,g=0.4,f1=180,f2=900):
    n=int(L*SR); tt=np.arange(n)/SR; f=np.linspace(f1,f2,n)
    tone=np.sin(2*np.pi*np.cumsum(f)/SR)*0.25
    nz=lp(rng.standard_normal(n),0.05)+lp(rng.standard_normal(n),0.3)*np.linspace(0,1,n)
    return (tone+nz*0.6)*np.linspace(0,1,n)**2*g
def whoosh(L=0.5,g=0.5):
    n=int(L*SR); x=lp(rng.standard_normal(n),0.12); return x*np.sin(np.linspace(0,np.pi,n))**2*g
# S1 chatter: noise shaped by syllable-rate gates (talk without words), building to 3.45 then HARD CUT
n=int(3.45*SR); tt=np.arange(n)/SR
gate=np.zeros(n); pos=0
while pos<n:
    L=int(rng.uniform(0.06,0.16)*SR); gp=int(rng.uniform(0.01,0.05)*SR)
    gate[pos:pos+L]=np.sin(np.linspace(0,np.pi,min(L,n-pos)))[:max(0,min(L,n-pos))] if pos+L<=n else 0
    pos+=L+gp
ch=(lp(rng.standard_normal(n),0.18)*0.8+lp(rng.standard_normal(n),0.05))*gate
ch2=(lp(rng.standard_normal(n),0.12))*np.roll(gate,int(0.07*SR))
out[:n]+=(ch+0.6*ch2)*np.linspace(0.15,0.75,n)*0.5
for k in range(8): add(hat(0.35),0.9+k*0.27)            # chip pops
# 3.45-3.75 silence; tension riser into the blade
add(riser(1.3,0.45),3.75); add(impact(0.55,1.2,200),5.05); add(kick(0.9),5.35)
# S3 SAY low pulse, slash
for k in np.arange(6.4,8.0,0.4): add(kick(0.45),k)
add(whoosh(0.45,0.8),7.7); add(impact(0.8,1.6,160),8.07)
# S4 beat 120 bpm with bass, merge riser + hit
bpm=0.5
for k in np.arange(10.5,13.9,bpm): add(kick(0.75),k); add(hat(0.18),k+bpm/2)
bn=int(3.4*SR); tt=np.arange(bn)/SR; bass=np.sin(2*np.pi*55*tt)*(0.5+0.5*np.sign(np.sin(2*np.pi*2*tt)))*0.12; add(bass,10.5)
add(riser(0.75,0.5,300,1400),13.25); add(impact(0.85,1.4,140),14.0)
for k in np.arange(14.0,15.5,bpm): add(kick(0.6),k); add(hat(0.15),k+bpm/2)
# S5 slashes
for at in (16.2,17.25,18.3): add(whoosh(0.25,0.6),at-0.15); add(impact(0.5,0.9,220),at+0.05)
# S6 drone swell, T drop, swing, BIG IMPACT
dn=int(5.0*SR); tt=np.arange(dn)/SR
drone=(np.sin(2*np.pi*55*tt)+0.5*np.sin(2*np.pi*82.5*tt)+0.3*np.sin(2*np.pi*110*tt))*np.minimum(1,tt/1.2)*0.10; add(drone,19.0)
add(impact(0.35,1.0,180),20.85); add(riser(2.2,0.4,120,700),21.2); add(impact(1.0,2.4,110),23.45)
n=int(2.6*SR); tt=np.arange(n)/SR; add((np.sin(2*np.pi*880*tt)+0.5*np.sin(2*np.pi*1320*tt))*np.exp(-tt*1.4)*0.05,23.46)
# S7 end
add(impact(0.5,1.6,130),26.35); add(impact(0.35,1.2,150),26.75); add(hat(0.25),27.9)
g=np.ones(N); f=int(29.2*SR); g[f:]*=np.linspace(1,0,N-f); out*=g
out=np.tanh(out*1.5)/np.tanh(1.5); out/=max(1e-9,np.abs(out).max()); out*=0.89
st=np.stack([out,np.roll(out,int(0.0004*SR))*0.98],1); data=(st*32767).astype('<i2').tobytes()
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
  const name = `SayTamm_Teaser_v2_${lang.toUpperCase()}_${ratio}`;
  if (PREVIEW) {
    const pd = path.join(OUT, '_preview', name); fs.mkdirSync(pd, { recursive: true });
    for (const t of [1.8, 3.2, 4.4, 5.6, 7.4, 8.5, 9.4, 11.6, 13.1, 14.6, 16.6, 19.4, 21.6, 22.6, 23.6, 24.8, 26.9, 28.6]) {
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
    if (f === Math.round(24.8 * FPS)) fs.writeFileSync(path.join(OUT, name + '_poster.jpg'), buf);
  }
  ff.stdin.end(); await done;
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', path.join(OUT, name + '.mp4'), '-an', '-c:v', 'copy', path.join(OUT, name + '_silent.mp4')]);
  console.log('rendered', name);
  await page.close();
}
await browser.close();
if (!PREVIEW) fs.copyFileSync(WAV, path.join(OUT, 'SayTamm_Teaser_v2_Sound.wav'));
