// Stage 1 keyframes for the SayTamm launch film. Usage (repo root):
//   node film/launch-45s/production/render-keyframes.mjs
// Writes F01–F06 (1080×1920 PNG), a labelled contact sheet and a safe-zone sheet to handover/launch-film/keyframes/.
// Fonts are referenced from local files only (Satoshi is never copied or committed).
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const OUT = path.join(ROOT, 'handover', 'launch-film', 'keyframes'); fs.mkdirSync(OUT, { recursive: true });
const SYMBOL = path.join(ROOT, 'brand/production/logo/SayTamm_Symbol_Signature_White-Purple.svg'); // official file, used as-is
const html = fs.readFileSync(path.join(ROOT, 'film/launch-45s/production/keyframes.html'), 'utf8')
  .replaceAll('__SAT__', pathToFileURL(path.join(ROOT, 'site/public/fonts/satoshi')).href)
  .replaceAll('__PLEX__', pathToFileURL(path.join(ROOT, 'site/node_modules/@fontsource/ibm-plex-sans-arabic/files')).href)
  .replaceAll('__SYMBOL__', pathToFileURL(SYMBOL).href);
const TMP = path.join(OUT, '_keyframes.html'); fs.writeFileSync(TMP, html);

const require = createRequire(import.meta.url);
let playwright;
try { playwright = require('playwright'); } catch { playwright = require(execFileSync('npm', ['root', '-g']).toString().trim() + '/playwright'); }
const browser = await playwright.chromium.launch();
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
await page.goto(pathToFileURL(TMP).href, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
const IDS = ['F01', 'F02', 'F03', 'F04', 'F05', 'F06'];
for (const id of IDS) await page.locator('#' + id).screenshot({ path: path.join(OUT, `${id}.png`) });
fs.rmSync(TMP);

// QC: share of the frame in Electric Purple (#6C35FF, incl. anti-aliased edges) and content outside the safe zone.
const qc = JSON.parse(execFileSync('python3', ['-I', '-c', `
import json, sys
from PIL import Image
out = {}
for p in sys.argv[1:]:
    im = Image.open(p).convert('RGB'); w, h = im.size; px = im.load()
    purple = 0; outside = 0
    for y in range(0, h, 2):
        for x in range(0, w, 2):
            r, g, b = px[x, y]
            if b > 120 and b - g > 90 and r < b: purple += 1
            if (y < 230 or y >= 1536) and max(r, g, b) > 200 and abs(r - b) < 30: outside += 1
    out[p.rsplit('/', 1)[-1][:3]] = {'purple_pct': round(100 * purple / ((w // 2) * (h // 2)), 2), 'bright_px_outside_safe': outside}
print(json.dumps(out))
`, ...IDS.map((id) => path.join(OUT, `${id}.png`))]).toString());
fs.writeFileSync(path.join(OUT, 'qc.json'), JSON.stringify(qc, null, 2));

const LABELS = {
  F01: ['00:00–00:04', 'One caret in Obsidian. The world before the decision.'],
  F02: ['00:04–00:08', 'Macro. Publish, lights off, the layout unfinished. A fingertip’s shadow hovers.'],
  F03: ['00:08', 'The first pulse crosses the glass and completes one act.'],
  F04: ['00:27–00:35', '<bdi dir="rtl">قول</bdi> / <bdi dir="rtl">اعتبره</bdi> / Consider on separate layers, before they unite.'],
  F05: ['00:35–00:40', '<bdi dir="rtl">تم</bdi>. The two dots of the <bdi>ت</bdi> are the two pulses.'],
  F06: ['00:40–00:45', 'End card: official symbol, SayTamm, the locked tagline.'],
};
const sheet = (safe) => `<!doctype html><meta charset="utf-8"><style>
@font-face{font-family:Sat;src:url(${pathToFileURL(path.join(ROOT, 'site/public/fonts/satoshi/Satoshi-500.woff2')).href});font-weight:500}
@font-face{font-family:Sat;src:url(${pathToFileURL(path.join(ROOT, 'site/public/fonts/satoshi/Satoshi-700.woff2')).href});font-weight:700}
@font-face{font-family:Plex;src:url(${pathToFileURL(path.join(ROOT, 'site/node_modules/@fontsource/ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-arabic-500-normal.woff2')).href})}
body{margin:0;background:#17171E;color:#F5F3FA;font:500 15px/1.45 Sat,Plex,sans-serif;width:1440px;padding:48px 60px 56px;box-sizing:border-box}
h1{font:700 26px/1 Sat;margin:0 0 6px}.sub{color:#96939F;margin-bottom:30px}
.g{display:grid;grid-template-columns:repeat(6,1fr);gap:20px}.c img{width:100%;display:block;border:1px solid rgba(245,243,250,.08)}
.w{position:relative}.z{position:absolute;left:0;right:0;background:rgba(108,53,255,.16);border:0 dashed #6C35FF}
.id{font:700 18px/1 Sat;margin:14px 0 4px}.t{color:#96939F;font-size:13px;margin-bottom:6px}.q{color:#96939F;font-size:12px;margin-top:8px}</style>
<h1>SayTamm launch film · Gate 1 keyframes</h1><div class="sub">${safe ? 'Social safe zones: top 12% and bottom 20% shaded. No important text may sit inside them.' : '1080×1920 · graphic-first (no live footage yet) · review only, not for publication'}</div>
<div class="g">${IDS.map((id) => `<div class="c"><div class="w"><img src="${id}.png">${safe ? '<div class="z" style="top:0;height:12%;border-bottom-width:1px"></div><div class="z" style="bottom:0;height:20%;border-top-width:1px"></div>' : ''}</div>
<div class="id">${id}</div><div class="t">${LABELS[id][0]}</div><div>${LABELS[id][1]}</div><div class="q">Purple ${qc[id].purple_pct}% of frame</div></div>`).join('')}</div>`;
for (const [name, safe] of [['F01-F06_contact_sheet', false], ['F01-F06_safe_zones', true]]) {
  const f = path.join(OUT, `_${name}.html`); fs.writeFileSync(f, sheet(safe));
  const p = await browser.newPage({ viewport: { width: 1440, height: 300 }, deviceScaleFactor: 2 });
  await p.goto(pathToFileURL(f).href, { waitUntil: 'load' }); await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: path.join(OUT, `${name}.png`), fullPage: true }); await p.close(); fs.rmSync(f);
}
await browser.close();
console.log(JSON.stringify(qc));
