// SayTamm — Brand Identity Package (logo masters, all formats, all applications, guidelines).
// Geometry comes ONLY from the approved production vectors in brand/production/logo (D-011, traced from the
// owner's master renders, IoU 0.999). Every variant here is a fill change of those same paths: nothing redrawn.
// Usage (repo root): node tools/brand/build-identity-package.mjs   → handover/SayTamm_Brand_Identity_Package/
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const LOGO = path.join(ROOT, 'brand/production/logo');
const PUB = path.join(ROOT, 'site/public');
const OUT = path.join(ROOT, 'handover', 'SayTamm_Brand_Identity_Package');
fs.rmSync(OUT, { recursive: true, force: true });
const D = (...p) => { const d = path.join(OUT, ...p); fs.mkdirSync(d, { recursive: true }); return d; };
const url = (p) => pathToFileURL(p).href;
const SAT = path.join(PUB, 'fonts/satoshi');
const PLEX = path.join(ROOT, 'site/node_modules/@fontsource/ibm-plex-sans-arabic/files');

// ---- palette (VISUAL_IDENTITY.md) -------------------------------------------------------------
const C = { ob: '#09090D', gr: '#17171E', sw: '#F5F3FA', mu: '#96939F', ac: '#6C35FF', wh: '#FFFFFF' };
const PALETTE = [
  { name: 'Obsidian', hex: '#09090D', rgb: '9 · 9 · 13', cmyk: '70 · 65 · 60 · 90', role: 'Primary background, logo on light' },
  { name: 'Graphite', hex: '#17171E', rgb: '23 · 23 · 30', cmyk: '72 · 66 · 55 · 80', role: 'Surfaces, cards, secondary dark' },
  { name: 'Soft White', hex: '#F5F3FA', rgb: '245 · 243 · 250', cmyk: '3 · 3 · 0 · 0', role: 'Light background, text on dark' },
  { name: 'Muted', hex: '#96939F', rgb: '150 · 147 · 159', cmyk: '42 · 38 · 28 · 5', role: 'Secondary text, rules' },
  { name: 'Electric Purple', hex: '#6C35FF', rgb: '108 · 53 · 255', cmyk: '70 · 78 · 0 · 0', role: 'Accent only — 10% or less', pms: 'Closest: Pantone 2369 C (verify with a printed swatch)' },
];

// ---- geometry from the approved vectors ------------------------------------------------------
const readPaths = (f) => {
  const s = fs.readFileSync(path.join(LOGO, f), 'utf8');
  const vb = s.match(/viewBox="([^"]+)"/)[1];
  const ds = [...s.matchAll(/<path[^>]*\sd="([^"]+)"/g)].map((m) => m[1]);
  if (ds.length !== 2) throw new Error(f + ': expected 2 paths (T-form + blade)');
  return { vb, t: ds[0], b: ds[1] };
};
const SOLID = readPaths('SayTamm_Symbol_Signature_Black-Purple.svg');
const LINE = readPaths('SayTamm_Symbol_Outline_Black.svg');
const [, , VW, VH] = SOLID.vb.split(' ').map(Number);
const svg = (g, t, b, { title = 'SayTamm', w, h } = {}) => {
  const [, , vw, vh] = g.vb.split(' ').map(Number);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${g.vb}" width="${w ?? vw}" height="${h ?? vh}"><title>${title}</title><path fill="${t}" fill-rule="evenodd" d="${g.t}"/><path fill="${b}" fill-rule="evenodd" d="${g.b}"/></svg>`;
};
const VARIANTS = [
  { id: 'Obsidian', g: SOLID, t: C.ob, b: C.ob, on: 'light', use: 'Default on light backgrounds' },
  { id: 'White', g: SOLID, t: C.wh, b: C.wh, on: 'dark', use: 'Default on dark backgrounds and photography' },
  { id: 'Purple', g: SOLID, t: C.ac, b: C.ac, on: 'light', use: 'One hero moment per surface' },
  { id: 'Signature_Obsidian-Purple', g: SOLID, t: C.ob, b: C.ac, on: 'light', use: 'Signature on light (D-007)' },
  { id: 'Signature_White-Purple', g: SOLID, t: C.wh, b: C.ac, on: 'dark', use: 'Signature on dark (D-007) — hero use' },
  { id: 'Outline_Obsidian', g: LINE, t: C.ob, b: C.ob, on: 'light', use: 'Light footprint: glass, embossing, dense layouts' },
  { id: 'Outline_White', g: LINE, t: C.wh, b: C.wh, on: 'dark', use: 'Outline on dark' },
  { id: 'Outline_Purple', g: LINE, t: C.ac, b: C.ac, on: 'light', use: 'Outline accent on light' },
];
const vsvg = (v, o) => svg(v.g, v.t, v.b, o);
const dataSvg = (s) => 'data:image/svg+xml;base64,' + Buffer.from(s).toString('base64');
// blade height = X (clear space unit), from the measured path box (463.6 of 721 units)
const X_RATIO = 463.6 / VH;

// ---- fonts / base css ------------------------------------------------------------------------
const FONTS = `@font-face{font-family:Satoshi;src:url(${url(path.join(SAT, 'Satoshi-400.woff2'))});font-weight:400}
@font-face{font-family:Satoshi;src:url(${url(path.join(SAT, 'Satoshi-500.woff2'))});font-weight:500}
@font-face{font-family:Satoshi;src:url(${url(path.join(SAT, 'Satoshi-700.woff2'))});font-weight:700}
@font-face{font-family:Plex;src:url(${url(path.join(PLEX, 'ibm-plex-sans-arabic-arabic-500-normal.woff2'))});font-weight:500}
@font-face{font-family:Plex;src:url(${url(path.join(PLEX, 'ibm-plex-sans-arabic-arabic-700-normal.woff2'))});font-weight:700}`;
const page = (body, css = '', w = 1080, h = 1080) => `<!doctype html><html><head><meta charset="utf-8"><style>${FONTS}
*{box-sizing:border-box;margin:0;padding:0}html,body{width:${w}px;height:${h}px;overflow:hidden;background:transparent}
body{font-family:Satoshi,Plex,sans-serif;-webkit-print-color-adjust:exact;print-color-adjust:exact}.ar{font-family:Plex,Satoshi,sans-serif;direction:rtl}${css}</style></head><body>${body}</body></html>`;

const require = createRequire(import.meta.url);
let playwright;
try { playwright = require('playwright'); } catch { playwright = require(execFileSync('npm', ['root', '-g']).toString().trim() + '/playwright'); }
const browser = await playwright.chromium.launch();
const tab = await browser.newPage();
async function shot(html, file, w, h, { transparent = false, type } = {}) {
  await tab.setViewportSize({ width: w, height: h });
  await load(html);
  await tab.evaluate(() => document.fonts.ready);
  if (/Satoshi|Plex/.test(html) && /[A-Za-z]/.test(html.replace(/<[^>]+>/g,'')) && html.includes('font-family') ) { const ok = await tab.evaluate(() => [...document.fonts].some((f) => f.family === 'Satoshi' && f.status === 'loaded') || !document.body.innerText.trim()); if (!ok) throw new Error('Satoshi not loaded for ' + file); }
  await tab.screenshot({ path: file, omitBackground: transparent, type: type ?? (file.endsWith('.jpg') ? 'jpeg' : 'png'), quality: file.endsWith('.jpg') ? 95 : undefined, clip: { x: 0, y: 0, width: w, height: h } });
}
// pages are loaded from a file so the local font files (file://) are allowed to load
const TMP = path.join(OUT, '_tmp.html');
async function load(html) { fs.writeFileSync(TMP, html); await tab.goto(url(TMP), { waitUntil: 'load' }); }
async function pdf(html, file, w, h) { // w/h: css lengths ('91mm') or px numbers
  await load(html);
  await tab.evaluate(() => document.fonts.ready);
  await tab.pdf({ path: file, width: typeof w === 'number' ? w + 'px' : w, height: typeof h === 'number' ? h + 'px' : h, printBackground: true, pageRanges: '1' });
}
const py = (code, input) => execFileSync('python3', ['-I', '-c', code], { input: JSON.stringify(input) });

// =================================================================================================
// 01 LOGO — SVG · PDF (vector) · PNG (transparent, 5 sizes) · WebP · JPG on brand backgrounds
// =================================================================================================
const L = D('01_Logo');
for (const v of VARIANTS) {
  const name = `SayTamm_Symbol_${v.id}`;
  const s = vsvg(v);
  fs.writeFileSync(path.join(D('01_Logo', 'SVG'), name + '.svg'), s);
  const [, , vw, vh] = v.g.vb.split(' ').map(Number);
  await pdf(page(s.replace(/width="\d+" height="\d+"/, 'width="100%" height="100%"'), '', vw, vh), path.join(D('01_Logo', 'PDF_vector'), name + '.pdf'), vw, vh);
  for (const H of [256, 512, 1024, 2048, 4096]) {
    const W = Math.round(H * vw / vh);
    await shot(page(`<img src="${dataSvg(s)}" style="width:${W}px;height:${H}px;display:block">`, '', W, H), path.join(D('01_Logo', 'PNG_transparent', `${H}px`), `${name}_${H}.png`), W, H, { transparent: true });
  }
}
// on-background JPG/PNG squares (logo at 50% height, centred) — ready for quick use
const BGS = [['Obsidian-bg', C.ob, 'Signature_White-Purple'], ['Obsidian-bg', C.ob, 'White'], ['SoftWhite-bg', C.sw, 'Signature_Obsidian-Purple'], ['SoftWhite-bg', C.sw, 'Obsidian'], ['Purple-bg', C.ac, 'White'], ['Graphite-bg', C.gr, 'Signature_White-Purple']];
for (const [bn, bg, vid] of BGS) {
  const v = VARIANTS.find((x) => x.id === vid);
  const html = page(`<div style="width:2048px;height:2048px;background:${bg};display:grid;place-items:center"><img src="${dataSvg(vsvg(v))}" style="height:1024px"></div>`, '', 2048, 2048);
  await shot(html, path.join(D('01_Logo', 'JPG_on_background'), `SayTamm_${vid}_on_${bn}_2048.jpg`), 2048, 2048);
}
// WebP for web (via Pillow)
{
  const jobs = VARIANTS.map((v) => [path.join(L, 'PNG_transparent', '1024px', `SayTamm_Symbol_${v.id}_1024.png`), path.join(D('01_Logo', 'WebP'), `SayTamm_Symbol_${v.id}_1024.webp`)]);
  py('import sys,json\nfrom PIL import Image\nfor s,o in json.load(sys.stdin): Image.open(s).save(o,"WEBP",quality=95,method=6)', jobs);
}

// =================================================================================================
// 02 APP ICONS & FAVICONS
// =================================================================================================
const SIG_W = VARIANTS.find((v) => v.id === 'Signature_White-Purple');
const WHITE = VARIANTS.find((v) => v.id === 'White');
const OBS = VARIANTS.find((v) => v.id === 'Obsidian');
const iconHtml = (size, bg, v, ratio = 0.56, radius = 0) => page(`<div style="width:${size}px;height:${size}px;background:${bg};border-radius:${radius}px;display:grid;place-items:center"><img src="${dataSvg(vsvg(v))}" style="height:${Math.round(size * ratio)}px"></div>`, '', size, size);
const ICON_SETS = [['Primary_Purple', C.ac, WHITE], ['Dark_Obsidian', C.ob, SIG_W]];
for (const [set, bg, v] of ICON_SETS) {
  const d = D('02_App_Icons_Favicons', set);
  for (const s of [16, 32, 48, 64, 96, 128, 180, 192, 256, 512, 1024]) await shot(iconHtml(s, bg, v, s <= 32 ? 0.7 : 0.56), path.join(d, `icon_${s}.png`), s, s);
  await shot(iconHtml(512, bg, v, 0.42), path.join(d, 'android_maskable_512.png'), 512, 512);
  await shot(iconHtml(1024, bg, v, 0.56), path.join(d, 'ios_app_store_1024.png'), 1024, 1024);
  fs.copyFileSync(path.join(d, 'icon_180.png'), path.join(d, 'apple-touch-icon.png'));
  py('import sys,json\nfrom PIL import Image\nd=json.load(sys.stdin)\nim=Image.open(d+"/icon_256.png").convert("RGBA")\nim.save(d+"/favicon.ico",sizes=[(16,16),(32,32),(48,48)])', d);
  const r = Math.round(VW * 0.16);
  const pad = 140;
  const fav = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-pad - 74} ${-pad} ${VH + 2 * pad} ${VH + 2 * pad}"><rect x="${-pad - 74}" y="${-pad}" width="${VH + 2 * pad}" height="${VH + 2 * pad}" rx="${r}" fill="${bg}"/><path fill="${v.t}" fill-rule="evenodd" d="${SOLID.t}"/><path fill="${v.b}" fill-rule="evenodd" d="${SOLID.b}"/></svg>`;
  fs.writeFileSync(path.join(d, 'favicon.svg'), fav);
  fs.writeFileSync(path.join(d, 'site.webmanifest'), JSON.stringify({ name: 'SayTamm', short_name: 'SayTamm', icons: [{ src: '/icon_192.png', sizes: '192x192', type: 'image/png' }, { src: '/icon_512.png', sizes: '512x512', type: 'image/png' }, { src: '/android_maskable_512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }], theme_color: bg, background_color: bg, display: 'standalone' }, null, 2));
  fs.writeFileSync(path.join(d, 'HEAD_SNIPPET.html'), `<link rel="icon" href="/favicon.ico" sizes="48x48">\n<link rel="icon" href="/favicon.svg" type="image/svg+xml">\n<link rel="apple-touch-icon" href="/apple-touch-icon.png">\n<link rel="manifest" href="/site.webmanifest">\n<meta name="theme-color" content="${bg}">\n`);
}

// =================================================================================================
// 03 SOCIAL MEDIA — profile pictures, covers, highlight covers, story/post frames
// =================================================================================================
const PROFILES = [['Obsidian_Signature', C.ob, SIG_W], ['Purple_White', C.ac, WHITE], ['SoftWhite_Signature', C.sw, VARIANTS.find((v) => v.id === 'Signature_Obsidian-Purple')]];
for (const [n, bg, v] of PROFILES) await shot(iconHtml(1080, bg, v, 0.5), path.join(D('03_Social_Media', 'Profile_Pictures'), `SayTamm_Profile_${n}_1080.png`), 1080, 1080);

const coverCss = `.cv{position:relative;width:100%;height:100%;background:${C.ob};overflow:hidden;color:${C.sw}}
.bar{position:absolute;background:${C.ac};transform:skewX(-45deg)}.bar.g{background:${C.gr}}
.tx{position:absolute;display:flex;flex-direction:column}.h{font-weight:700;letter-spacing:-.045em;line-height:.92}.h span{color:${C.ac}}.s{font-weight:500;color:${C.mu};letter-spacing:.14em;text-transform:uppercase}`;
const COVERS = [
  // name, w, h, text box (right-aligned area avoiding the avatar), font sizes
  ['LinkedIn_Company_1128x191', 1128, 191, { right: 60, top: 36, h: 64, s: 13 }],
  ['LinkedIn_Personal_1584x396', 1584, 396, { right: 90, top: 92, h: 120, s: 20 }],
  ['X_Header_1500x500', 1500, 500, { right: 90, top: 120, h: 140, s: 22 }],
  ['Facebook_Cover_1640x624', 1640, 624, { right: 120, top: 170, h: 150, s: 24 }],
  ['YouTube_Banner_2560x1440', 2560, 1440, { right: 640, top: 560, h: 170, s: 28 }],
];
for (const [n, w, h, t] of COVERS) {
  const body = `<div class="cv"><div class="bar g" style="left:${w * 0.18}px;top:-10%;width:${h * 0.5}px;height:120%"></div><div class="bar" style="left:${w * 0.18 + h * 0.62}px;top:-10%;width:${h * 0.16}px;height:120%"></div>
    <div class="tx" style="right:${t.right}px;top:${t.top}px;align-items:flex-end;text-align:right"><div class="h" style="font-size:${t.h}px">Say it. <span>Tamm it.</span></div><div class="s" style="font-size:${t.s}px;margin-top:${t.s}px">Digital marketing &amp; performance agency · saytamm.com</div></div></div>`;
  await shot(page(body, coverCss, w, h), path.join(D('03_Social_Media', 'Covers_Headers'), `SayTamm_${n}.png`), w, h);
}
const HL = [['About', 'من نحن'], ['Work', 'أعمالنا'], ['Services', 'خدماتنا'], ['Tips', 'نصائح'], ['Contact', 'تواصل']];
for (const [en, ar] of HL) {
  const body = `<div style="width:1080px;height:1080px;background:${C.ob};display:flex;flex-direction:column;align-items:center;justify-content:center;gap:40px"><span style="display:block;width:180px;height:40px;background:${C.ac};transform:skewX(-45deg)"></span><b style="font-size:120px;letter-spacing:-.04em;color:${C.sw}">${en}</b><span class="ar" style="font-size:80px;color:${C.mu};font-weight:700">${ar}</span></div>`;
  await shot(page(body, '', 1080, 1080), path.join(D('03_Social_Media', 'Instagram_Highlight_Covers'), `Highlight_${en}.png`), 1080, 1080);
}
// story and post frames (templates with safe zones marked in a separate guide file)
const frame = (w, h, guide) => page(`<div style="position:relative;width:${w}px;height:${h}px;background:${C.ob};color:${C.sw}">
  <img src="${dataSvg(vsvg(SIG_W))}" style="position:absolute;left:${w * 0.08}px;top:${guide ? 270 : h * 0.07}px;height:${Math.round(w * 0.07)}px">
  <span style="position:absolute;right:${w * 0.08}px;bottom:${guide ? 300 : h * 0.07}px;width:${w * 0.16}px;height:${w * 0.026}px;background:${C.ac};transform:skewX(-45deg)"></span>
  ${guide ? `<div style="position:absolute;left:0;right:0;top:0;height:250px;background:rgba(229,72,77,.25);border-bottom:2px dashed #E5484D"></div><div style="position:absolute;left:0;right:0;bottom:0;height:280px;background:rgba(229,72,77,.25);border-top:2px dashed #E5484D"></div><p style="position:absolute;left:0;right:0;top:50%;text-align:center;font-size:30px;color:${C.mu}">Keep text and the logo out of the red zones (platform UI)</p>` : ''}</div>`, '', w, h);
await shot(frame(1080, 1920, false), path.join(D('03_Social_Media', 'Templates'), 'Story_Frame_1080x1920.png'), 1080, 1920);
await shot(frame(1080, 1920, true), path.join(D('03_Social_Media', 'Templates'), 'Story_Frame_SAFE_ZONES_guide.png'), 1080, 1920);
await shot(frame(1080, 1350, false), path.join(D('03_Social_Media', 'Templates'), 'Post_Frame_4x5_1080x1350.png'), 1080, 1350);
await shot(frame(1080, 1080, false), path.join(D('03_Social_Media', 'Templates'), 'Post_Frame_1x1_1080x1080.png'), 1080, 1080);

// =================================================================================================
// 04 STATIONERY — business card, letterhead (PDF + DOCX), envelope, email signature
// =================================================================================================
const S = D('04_Stationery');
const mmCss = (w, h) => `@page{size:${w}mm ${h}mm;margin:0}html,body{width:${w}mm;height:${h}mm}`;
const card = (side, bleed) => {
  const W = bleed ? 91 : 85, H = bleed ? 61 : 55, o = bleed ? 3 : 0;
  const marks = bleed ? `<div class="crop"></div>` : '';
  const front = `<div style="position:absolute;inset:0;background:${C.ob}"></div><img src="${dataSvg(vsvg(SIG_W))}" style="position:absolute;left:50%;top:50%;height:22mm;transform:translate(-50%,-50%)">`;
  const back = `<div style="position:absolute;inset:0;background:${C.sw}"></div>
    <img src="${dataSvg(vsvg(VARIANTS.find((v) => v.id === 'Signature_Obsidian-Purple')))}" style="position:absolute;left:${o + 7}mm;top:${o + 7}mm;height:8mm">
    <div style="position:absolute;left:${o + 7}mm;bottom:${o + 7}mm;color:${C.ob}">
      <div style="font-size:10.5pt;font-weight:700;letter-spacing:-.01em">Full Name</div><div style="font-size:7pt;color:#55525e;margin:0.6mm 0 3mm">Job Title</div>
      <div style="font-size:7pt;line-height:1.5">name@saytamm.com<br>www.saytamm.com</div></div>
    <div style="position:absolute;right:${o + 7}mm;bottom:${o + 7}mm;text-align:right;color:${C.ob};font-size:7pt;font-weight:700">Say it. <span style="color:${C.ac}">Tamm it.</span><br><span class="ar" style="font-weight:700">قول. تم.</span></div>`;
  return page(side === 'front' ? front : back, `${mmCss(W, H)}body{position:relative;width:${W}mm;height:${H}mm}`, 1, 1).replace(/width:1px;height:1px;/, '');
};
for (const side of ['front', 'back']) {
  await pdf(card(side, true), path.join(D('04_Stationery', 'Business_Card'), `SayTamm_BusinessCard_${side}_91x61mm_with_3mm_bleed.pdf`), '91mm', '61mm');
  await pdf(card(side, false), path.join(D('04_Stationery', 'Business_Card'), `SayTamm_BusinessCard_${side}_85x55mm_trim.pdf`), '85mm', '55mm');
}
const letterhead = page(`<div style="position:relative;width:210mm;height:297mm;background:#fff;color:${C.ob}">
  <img src="${dataSvg(vsvg(VARIANTS.find((v) => v.id === 'Signature_Obsidian-Purple')))}" style="position:absolute;left:20mm;top:18mm;height:14mm">
  <div style="position:absolute;right:20mm;top:20mm;text-align:right;font-size:8pt;line-height:1.6;color:#55525e">SayTamm<br>Digital marketing &amp; performance agency<br>info@saytamm.com · www.saytamm.com</div>
  <div style="position:absolute;left:20mm;right:20mm;top:60mm;font-size:10pt;line-height:1.6;color:#9a96a6">[ Date ]<br><br>[ Recipient ]<br><br>[ Letter body — Satoshi 10 pt / IBM Plex Sans Arabic 10 pt ]</div>
  <div style="position:absolute;left:20mm;right:20mm;bottom:14mm;display:flex;justify-content:space-between;align-items:center;border-top:0.3mm solid ${C.ob};padding-top:3mm;font-size:7.5pt;color:#55525e"><span>Say it. Tamm it. · <span class="ar">قول. تم.</span></span><span style="display:block;width:14mm;height:2.2mm;background:${C.ac};transform:skewX(-45deg)"></span></div></div>`, mmCss(210, 297), 1, 1).replace(/width:1px;height:1px;/, '');
await pdf(letterhead, path.join(D('04_Stationery', 'Letterhead'), 'SayTamm_Letterhead_A4.pdf'), '210mm', '297mm');
const envelope = page(`<div style="position:relative;width:220mm;height:110mm;background:#fff">
  <img src="${dataSvg(vsvg(VARIANTS.find((v) => v.id === 'Signature_Obsidian-Purple')))}" style="position:absolute;left:12mm;top:10mm;height:11mm">
  <div style="position:absolute;left:12mm;bottom:10mm;font-size:7.5pt;color:#55525e;line-height:1.5">SayTamm · info@saytamm.com · www.saytamm.com</div>
  <span style="position:absolute;right:12mm;bottom:11mm;width:16mm;height:2.4mm;background:${C.ac};transform:skewX(-45deg)"></span></div>`, mmCss(220, 110), 1, 1).replace(/width:1px;height:1px;/, '');
await pdf(envelope, path.join(D('04_Stationery', 'Envelope'), 'SayTamm_Envelope_DL_220x110mm.pdf'), '220mm', '110mm');
// PNGs used by the DOCX/PPTX and the e-mail signature
const ASSET = D('_assets');
await shot(page(`<img src="${dataSvg(vsvg(VARIANTS.find((v) => v.id === 'Signature_Obsidian-Purple')))}" style="height:600px;display:block">`, '', Math.round(600 * VW / VH), 600), path.join(ASSET, 'sig_obsidian_600.png'), Math.round(600 * VW / VH), 600, { transparent: true });
await shot(page(`<img src="${dataSvg(vsvg(SIG_W))}" style="height:600px;display:block">`, '', Math.round(600 * VW / VH), 600), path.join(ASSET, 'sig_white_600.png'), Math.round(600 * VW / VH), 600, { transparent: true });
await shot(iconHtml(240, C.ob, SIG_W, 0.6, 0), path.join(ASSET, 'email_mark_240.png'), 240, 240);
py(`import sys,json
from docx import Document
from docx.shared import Mm, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
a=json.load(sys.stdin)
d=Document(); s=d.sections[0]; s.page_width=Mm(210); s.page_height=Mm(297)
s.left_margin=s.right_margin=Mm(20); s.top_margin=Mm(45); s.bottom_margin=Mm(28); s.header_distance=Mm(15); s.footer_distance=Mm(12)
h=s.header.paragraphs[0]; h.add_run().add_picture(a['logo'], height=Mm(13))
f=s.footer.paragraphs[0]; r=f.add_run('SayTamm  ·  info@saytamm.com  ·  www.saytamm.com  ·  Say it. Tamm it.'); r.font.size=Pt(7.5); r.font.color.rgb=RGBColor(0x55,0x52,0x5e); r.font.name='Satoshi'
st=d.styles['Normal']; st.font.name='Satoshi'; st.font.size=Pt(10)
for t in ['[ Date ]','','[ Recipient name ]','[ Company ]','','Dear [ Name ],','','[ Letter body. Use Satoshi 10 pt for English and IBM Plex Sans Arabic 10 pt for Arabic. ]','','Kind regards,','','[ Full Name ]','[ Job Title ], SayTamm']:
    d.add_paragraph(t)
d.save(a['out'])`, { logo: path.join(ASSET, 'sig_obsidian_600.png'), out: path.join(D('04_Stationery', 'Letterhead'), 'SayTamm_Letterhead_A4_editable.docx') });
// e-mail signature: image must be hosted (mail clients block SVG and local files)
const MARK_URL = 'https://www.saytamm.com/brand/email/saytamm-email-mark.png';
fs.writeFileSync(path.join(D('04_Stationery', 'Email_Signature'), 'SayTamm_Email_Signature.html'), `<!-- SayTamm e-mail signature. Replace the [ ] fields. The mark is served from the website (${MARK_URL}); it appears once the site is live. -->
<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif;color:#09090D">
  <tr><td style="padding-right:14px;vertical-align:top"><img src="${MARK_URL}" width="56" height="56" alt="SayTamm" style="display:block;border:0"></td>
  <td style="vertical-align:top;border-left:3px solid #6C35FF;padding-left:14px">
    <div style="font-size:15px;font-weight:bold">[ Full Name ]</div>
    <div style="font-size:12px;color:#55525e;padding:2px 0 8px">[ Job Title ] · SayTamm</div>
    <div style="font-size:12px;line-height:18px"><a href="mailto:[name]@saytamm.com" style="color:#09090D;text-decoration:none">[name]@saytamm.com</a><br><a href="https://www.saytamm.com" style="color:#6C35FF;text-decoration:none">www.saytamm.com</a></div>
    <div style="font-size:11px;color:#96939F;padding-top:8px">Say it. Tamm it. · قول. تم.</div></td></tr></table>
`);
fs.copyFileSync(path.join(ASSET, 'email_mark_240.png'), path.join(D('04_Stationery', 'Email_Signature'), 'saytamm-email-mark.png'));

// =================================================================================================
// 05 PRESENTATION TEMPLATE (PPTX, editable)
// =================================================================================================
py(`import sys,json
from pptx import Presentation
from pptx.util import Emu, Pt
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE
a=json.load(sys.stdin)
P=Presentation(); P.slide_width=Emu(12192000); P.slide_height=Emu(6858000)
OB,GR,SW,MU,AC=[RGBColor.from_string(x) for x in ['09090D','17171E','F5F3FA','96939F','6C35FF']]
W,H=P.slide_width,P.slide_height; IN=914400
def bg(s,c):
    f=s.background.fill; f.solid(); f.fore_color.rgb=c
def text(s,t,x,y,w,h,size,col,bold=False,font='Satoshi'):
    tb=s.shapes.add_textbox(int(x*IN),int(y*IN),int(w*IN),int(h*IN)); tf=tb.text_frame; tf.word_wrap=True
    for i,line in enumerate(t.split('\\n')):
        p=tf.paragraphs[0] if i==0 else tf.add_paragraph(); r=p.add_run(); r.text=line; r.font.size=Pt(size); r.font.bold=bold; r.font.color.rgb=col; r.font.name=font
    return tb
def blade(s,x,y,w=0.9,h=0.12):
    sh=s.shapes.add_shape(MSO_SHAPE.PARALLELOGRAM,int(x*IN),int(y*IN),int(w*IN),int(h*IN)); sh.fill.solid(); sh.fill.fore_color.rgb=AC; sh.line.fill.background()
def logo(s,path,x,y,h): s.shapes.add_picture(path,int(x*IN),int(y*IN),height=int(h*IN))
blank=P.slide_layouts[6]
s=P.slides.add_slide(blank); bg(s,OB); logo(s,a['w'],0.7,0.6,0.9); text(s,'Presentation title',0.7,3.0,10,1.4,54,SW,True); text(s,'Subtitle or client name · Month 2026',0.7,4.5,10,0.6,18,MU)
s=P.slides.add_slide(blank); bg(s,AC); text(s,'01',0.7,0.7,3,0.8,20,OB,True); text(s,'Section title',0.7,2.8,11,1.5,66,SW,True)
s=P.slides.add_slide(blank); bg(s,OB); logo(s,a['w'],0.7,0.45,0.42); blade(s,0.7,1.35); text(s,'Slide title in sentence case',0.7,1.6,11,1,36,SW,True); text(s,'• First point, one idea per line\\n• Second point\\n• Third point',0.7,2.9,7,3,20,RGBColor.from_string('CFCCD7'))
s=P.slides.add_slide(blank); bg(s,SW); logo(s,a['k'],0.7,0.45,0.42); blade(s,0.7,1.35); text(s,'Two-column comparison',0.7,1.6,11,1,36,OB,True); text(s,'Before\\nDescribe the starting point.',0.7,3.0,5.3,2.5,20,OB); text(s,'After\\nDescribe the outcome.',6.6,3.0,5.3,2.5,20,OB)
s=P.slides.add_slide(blank); bg(s,GR); text(s,'One big statement\\nthat carries the slide.',0.7,2.2,11.5,2.5,54,SW,True)
s=P.slides.add_slide(blank); bg(s,OB); logo(s,a['w'],5.9,1.7,1.6); text(s,'Say it. Tamm it.',0.7,4.0,11.9,0.9,40,SW,True).text_frame.paragraphs[0].alignment=2; text(s,'info@saytamm.com · www.saytamm.com',0.7,5.0,11.9,0.5,16,MU).text_frame.paragraphs[0].alignment=2
P.save(a['out'])`, { w: path.join(ASSET, 'sig_white_600.png'), k: path.join(ASSET, 'sig_obsidian_600.png'), out: path.join(D('05_Presentation_Template'), 'SayTamm_Presentation_Template_16x9.pptx') });

// =================================================================================================
// 06 MOCKUPS (owner render + composed flat mockups — no AI generation)
// =================================================================================================
const M = D('06_Mockups');
const ownerRender = '/tmp/claude-0/-home-user-Digitalagent/3927ecd2-7e46-5a08-9863-9a61771f84dd/images/105.webp';
if (fs.existsSync(ownerRender)) py('import sys,json\nfrom PIL import Image\na=json.load(sys.stdin)\nImage.open(a[0]).convert("RGB").save(a[1],quality=95)', [ownerRender, path.join(M, 'SayTamm_Symbol_3D_Purple_Pedestal_owner-render.jpg')]);
const cardFront = `<div style="width:850px;height:550px;background:${C.ob};display:grid;place-items:center;border-radius:6px"><img src="${dataSvg(vsvg(SIG_W))}" style="height:220px"></div>`;
const cardBack = `<div style="position:relative;width:850px;height:550px;background:${C.sw};border-radius:6px;color:${C.ob}"><img src="${dataSvg(vsvg(VARIANTS.find((v) => v.id === 'Signature_Obsidian-Purple')))}" style="position:absolute;left:70px;top:70px;height:80px"><div style="position:absolute;left:70px;bottom:70px"><b style="font-size:40px">Full Name</b><div style="font-size:24px;color:#55525e;margin:6px 0 26px">Job Title</div><div style="font-size:24px;line-height:1.5">name@saytamm.com<br>www.saytamm.com</div></div><div style="position:absolute;right:70px;bottom:70px;font-size:26px;font-weight:700;text-align:right">Say it. <span style="color:${C.ac}">Tamm it.</span></div></div>`;
await shot(page(`<div style="position:relative;width:2400px;height:1600px;background:radial-gradient(120% 90% at 30% 20%,#2a2a35,#0d0d12);overflow:hidden">
  <div style="position:absolute;left:330px;top:330px;transform:rotate(-12deg);box-shadow:0 60px 120px rgba(0,0,0,.6)">${cardBack}</div>
  <div style="position:absolute;left:1180px;top:520px;transform:rotate(8deg);box-shadow:0 60px 120px rgba(0,0,0,.65)">${cardFront}</div></div>`, '', 2400, 1600), path.join(M, 'SayTamm_Mockup_Business_Cards.jpg'), 2400, 1600);
await shot(page(`<div style="position:relative;width:2400px;height:1600px;background:${C.sw};display:flex;align-items:center;justify-content:center;gap:120px">
  ${[[C.ac, WHITE], [C.ob, SIG_W]].map(([bg, v]) => `<div style="display:flex;flex-direction:column;align-items:center;gap:40px"><div style="width:560px;height:560px;border-radius:124px;background:${bg};display:grid;place-items:center;box-shadow:0 50px 100px rgba(9,9,13,.25)"><img src="${dataSvg(vsvg(v))}" style="height:310px"></div><span style="font-size:44px;font-weight:500;color:${C.ob}">SayTamm</span></div>`).join('')}</div>`, '', 2400, 1600), path.join(M, 'SayTamm_Mockup_App_Icons.jpg'), 2400, 1600);
await shot(page(`<div style="position:relative;width:2400px;height:1600px;background:${C.gr};display:grid;place-items:center">
  <div style="position:relative;width:1300px;height:1300px;background:#fff;box-shadow:0 60px 140px rgba(0,0,0,.55);transform:rotate(-4deg)"><img src="${dataSvg(vsvg(VARIANTS.find((v) => v.id === 'Signature_Obsidian-Purple')))}" style="position:absolute;left:110px;top:100px;height:120px">
  <div style="position:absolute;left:110px;right:110px;top:330px">${Array.from({ length: 9 }, (_, i) => `<div style="height:18px;background:#e7e5ee;margin:0 ${i % 3 === 2 ? 300 : 0}px 34px 0"></div>`).join('')}</div>
  <div style="position:absolute;left:110px;right:110px;bottom:80px;border-top:3px solid ${C.ob};padding-top:24px;font-size:24px;color:#55525e">Say it. Tamm it. · info@saytamm.com</div></div></div>`, '', 2400, 1600), path.join(M, 'SayTamm_Mockup_Letterhead.jpg'), 2400, 1600);

// =================================================================================================
// 07 BRAND GUIDELINES (PDF, 16:9)
// =================================================================================================
const G = [];
const gp = (cls, sec, body) => G.push({ cls, sec, body });
const kk = (s) => `<p class="kk"><span class="bl"></span>${s}</p>`;
const img = (v, h, extra = '') => `<img src="${dataSvg(vsvg(v))}" style="height:${h}px;${extra}">`;
gp('cover', null, `<img class="cv-sym" src="${dataSvg(vsvg(SIG_W))}" alt=""><div class="cv-meta"><span>Brand identity guidelines</span><span>Logo &amp; applications · Version 1.0</span><span>23 November 2026</span></div><h1 class="cv-h">Say it.<br><span class="p">Tamm it.</span></h1><p class="cv-sub">SayTamm · قول تم — digital marketing &amp; performance agency</p>`);
gp('t-light', 'Symbol', `${kk('01 · The symbol')}<div class="two"><div class="stage light">${img(OBS, 560)}</div><div><h2 class="h1">Said.<br><span class="p">Done.</span></h2><p class="tx" style="margin-top:30px">The SayTamm symbol is two shapes: the <b>T</b> — the brief, the thing that is said — and the <b>blade</b>, a 45° diagonal that moves decisively into place: the thing that is done. The gap between them is part of the mark.</p><p class="tx">The symbol is the logo. A drawn “SayTamm” wordmark does not exist yet; until it does, the name is never set beside the symbol as a lockup (OQ-05).</p></div></div>`);
gp('', 'Versions', `${kk('02 · Versions')}<div class="vg">${VARIANTS.map((v) => `<div class="vc" style="background:${v.on === 'dark' ? C.gr : C.sw}">${img(v, 200)}<b style="color:${v.on === 'dark' ? C.sw : C.ob}">${v.id.replace(/_/g, ' ')}</b><span>${v.use}</span></div>`).join('')}</div>`);
const xh = 300, xw = Math.round(xh * VW / VH), X = Math.round(xh * X_RATIO);
gp('t-light', 'Clear space', `${kk('03 · Clear space')}<div class="two"><div class="stage light" style="position:relative"><div style="position:relative;padding:${X}px;outline:2px dashed ${C.ac};outline-offset:-1px">${img(OBS, xh, 'display:block')}<span class="xm" style="top:0;left:50%;height:${X}px">X</span><span class="xm" style="bottom:0;left:50%;height:${X}px">X</span><span class="xm h" style="left:0;top:50%;width:${X}px">X</span><span class="xm h" style="right:0;top:50%;width:${X}px">X</span></div></div>
  <div><h2 class="h2">1X on every side.</h2><p class="tx" style="margin-top:28px"><b>X = the height of the diagonal blade</b> (65.5% of the symbol’s height). Nothing — text, edges, other logos, busy image detail — enters this space.</p><p class="tx">Example: a symbol 40 mm tall needs 26 mm clear on each side.</p></div></div>`);
gp('', 'Minimum size', `${kk('04 · Minimum size')}<div class="two"><div><h2 class="h2">Small, but<br><span class="p">never cramped.</span></h2><table class="mt"><tr><td>Digital</td><td><b>24 px</b> tall (32 px+ preferred)</td></tr><tr><td>Print</td><td><b>6 mm</b> tall (10 mm+ preferred)</td></tr><tr><td>Favicon</td><td>16/32 px — use the purpose-made icon files only</td></tr><tr><td>Outline version</td><td>48 px / 12 mm minimum — the line closes up below that</td></tr></table></div>
  <div class="sizes">${[96, 64, 48, 32, 24].map((s) => `<div>${img(WHITE, s)}<span>${s}px</span></div>`).join('')}</div></div>`);
gp('t-light', 'Colour', `${kk('05 · Colour')}<div class="pal">${PALETTE.map((p) => `<div><div class="sw" style="background:${p.hex};${p.hex === '#F5F3FA' ? 'border:1px solid #ddd' : ''}"></div><b>${p.name}</b><span>HEX ${p.hex}</span><span>RGB ${p.rgb}</span><span>CMYK ${p.cmyk}*</span>${p.pms ? `<span>${p.pms}</span>` : ''}<em>${p.role}</em></div>`).join('')}</div><p class="note">* CMYK values are conversions for coated stock; confirm with a printed proof before any print run. Electric Purple is an accent: about 10% of a layout or less.</p>`);
const bgs = [[C.ob, SIG_W, 'Obsidian — Signature'], [C.gr, WHITE, 'Graphite — White'], [C.sw, VARIANTS[3], 'Soft White — Signature'], ['#fff', OBS, 'White — Obsidian'], [C.ac, WHITE, 'Purple — White'], ['linear-gradient(135deg,#3a1891,#09090D)', WHITE, 'Dark image — White']];
gp('', 'Backgrounds', `${kk('06 · Backgrounds')}<div class="bgg">${bgs.map(([b, v, n]) => `<div style="background:${b}">${img(v, 150)}<span>${n}</span></div>`).join('')}</div><p class="tx" style="margin-top:26px">On photography, use White or Obsidian on a calm, even area with enough contrast. Never place the Purple symbol on purple or busy backgrounds.</p>`);
const DONTS = [['transform:scaleX(1.35)', 'Stretch or squash'], ['transform:rotate(18deg)', 'Rotate'], ['transform:scaleX(-1)', 'Mirror the diagonal'], ['filter:drop-shadow(10px 10px 6px rgba(0,0,0,.6))', 'Add shadows or effects'], ['', 'Recolour outside the palette', 'hue'], ['', 'Rearrange or separate the shapes', 'split'], ['', 'Place on busy or low-contrast backgrounds', 'busy'], ['', 'Outline below 48 px or add a keyline', 'outline']];
gp('t-light', 'Misuse', `${kk('07 · Misuse')}<div class="dg">${DONTS.map(([t, n, k]) => {
  let inner = img(OBS, 150, t);
  if (k === 'hue') inner = `<img src="${dataSvg(svg(SOLID, '#2BB673', '#F2B705'))}" style="height:150px">`;
  if (k === 'split') inner = `<svg viewBox="0 0 ${VW + 160} ${VH}" style="height:150px"><path d="${SOLID.t}" fill="${C.ob}"/><g transform="translate(160,40)"><path d="${SOLID.b}" fill="${C.ob}"/></g></svg>`;
  if (k === 'busy') inner = `<div style="background:repeating-linear-gradient(45deg,#6C35FF 0 14px,#B79CFF 14px 28px);padding:16px">${img(VARIANTS[2], 120)}</div>`;
  if (k === 'outline') inner = img(VARIANTS[5], 40, 'outline:3px solid #6C35FF;outline-offset:6px');
  return `<div><div class="dz">${inner}<i>✕</i></div><span>${n}</span></div>`;
}).join('')}</div>`);
gp('', 'Typography', `${kk('08 · Typography')}<div class="two"><div><p class="tag">English · Satoshi</p><div class="ty">Aa</div><p class="tx">Bold 700 for headlines, tight tracking (−3% to −5%). Medium 500 for leads. Regular 400 for body. Sentence case, British spelling.</p><p class="note">Licence: Satoshi (Fontshare, ITF FFL) may be used and embedded in documents, but the font files are never redistributed.</p></div>
  <div class="ar" style="text-align:right"><p class="tag" style="display:block;direction:ltr;text-align:right">Arabic · IBM Plex Sans Arabic</p><div class="ty">أب</div><p class="tx">عريض 700 للعناوين، ومتوسط 500 للمقدمات، وعادي 400 للنصوص. لا نعكس تخطيط الإنجليزي، ولا نعكس الخط المائل في الشعار أبداً.</p></div></div>`);
gp('t-light', 'App icons', `${kk('09 · App icons & favicons')}<div class="apps">${[[C.ac, WHITE, 'Primary · Purple'], [C.ob, SIG_W, 'Dark · Obsidian']].map(([b, v, n]) => `<div><div class="ai" style="background:${b}">${img(v, 190)}</div><span>${n}</span></div>`).join('')}<div class="fav">${[64, 32, 16].map((s) => `<div style="width:${s}px;height:${s}px;background:${C.ac};display:grid;place-items:center">${img(WHITE, Math.round(s * 0.7))}</div>`).join('')}<span>Favicon 64 · 32 · 16</span></div></div><p class="tx" style="margin-top:34px">Files in <b>02_App_Icons_Favicons</b>: 16–1024 px PNG, favicon.ico, favicon.svg, Apple touch icon, Android maskable icon (symbol inside the 80% safe zone) and a ready <code>site.webmanifest</code>.</p>`);
gp('', 'Social', `${kk('10 · Social media')}<div class="soc"><div class="pp">${PROFILES.map(([, b, v]) => `<div style="background:${b}">${img(v, 110)}</div>`).join('')}</div><p class="tx">Profile pictures sit in a circle: the symbol at 50% of the frame stays clear of the crop. Use <b>Obsidian · Signature</b> as the default everywhere for one recognisable presence.</p><p class="tx">Covers are sized for LinkedIn (company and personal), X, Facebook and YouTube, with the type kept away from the profile-picture overlap. Highlight covers, story and post frames are included.</p></div>`);
gp('t-light', 'Stationery', `${kk('11 · Stationery')}<div class="st"><div class="cardm">${cardFront.replace('850px', '425px').replace('550px', '275px').replace('height:220px', 'height:110px')}</div><div class="cardm">${cardBack.replace(/850px/, '425px').replace(/550px/, '275px').replace(/70px/g, '35px').replace('height:80px', 'height:40px').replace(/font-size:40px/, 'font-size:20px').replace(/font-size:24px/g, 'font-size:12px').replace('font-size:26px', 'font-size:13px')}</div></div><p class="tx" style="margin-top:34px">Business card 85 × 55 mm (print files with 3 mm bleed), A4 letterhead (PDF and editable Word), DL envelope, e-mail signature, 16:9 presentation template. Contact details: info@saytamm.com and www.saytamm.com only — no phone or address is published yet.</p>`);
gp('', 'Files', `${kk('12 · What is in this package')}<table class="files">${[['01_Logo', '8 versions × SVG, vector PDF, transparent PNG (256–4096 px), WebP; JPG on brand backgrounds'], ['02_App_Icons_Favicons', 'Purple and Obsidian sets: 16–1024 px, ICO, SVG favicon, Apple and Android icons, manifest, head snippet'], ['03_Social_Media', 'Profile pictures, covers (LinkedIn, X, Facebook, YouTube), highlight covers, story and post frames + safe zones'], ['04_Stationery', 'Business card (bleed + trim), letterhead PDF/DOCX, DL envelope, e-mail signature'], ['05_Presentation_Template', 'Editable 16:9 PowerPoint: title, section, content, two-column, statement, closing'], ['06_Mockups', 'Owner’s 3D render, business cards, app icons, letterhead'], ['07_Brand_Guidelines', 'This document']].map(([k, v]) => `<tr><td>${k}</td><td>${v}</td></tr>`).join('')}</table><p class="note" style="margin-top:28px">Not included and why: EPS and AI files — the vector PDF and SVG open directly in Illustrator, InDesign, Figma and print RIPs. A wordmark and lockups — no drawn wordmark exists (OQ-05).</p>`);
gp('t-ac', null, `<img class="cv-sym" src="${dataSvg(vsvg(WHITE))}" alt=""><h2 class="cl-h">Say it.<br><span>Tamm it.</span></h2><p class="cl-s"><bdi dir="rtl">قول. تم.</bdi></p>`);

const gcss = `@page{size:1920px 1080px;margin:0}
:root{--ob:#09090D;--gr:#17171E;--sw:#F5F3FA;--mu:#96939F;--ac:#6C35FF;--tx:#CFCCD7;--ln:rgba(245,243,250,.14)}
html,body{width:1920px;height:auto;overflow:visible;background:var(--ob)}
.pg{position:relative;width:1920px;height:1080px;overflow:hidden;padding:120px;break-after:page;background:var(--ob);color:var(--sw)}.pg:last-child{break-after:auto}
.t-light{background:var(--sw);color:var(--ob)}.t-ac{background:var(--ac)}.p{color:var(--ac)}
.bl{display:inline-block;width:40px;height:7px;background:var(--ac);transform:skewX(-45deg);margin-right:20px}
.kk{display:flex;align-items:center;font-size:20px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--mu);margin-bottom:40px}
.h1{font-size:150px;line-height:.9;font-weight:700;letter-spacing:-.05em}.h2{font-size:72px;line-height:1;font-weight:700;letter-spacing:-.04em}
.tx{font-size:24px;line-height:1.6;color:var(--tx);margin-top:18px}.t-light .tx{color:#45424e}.note{font-size:17px;color:var(--mu);line-height:1.5}
.mark{position:absolute;top:50px;left:120px;height:32px}.run{position:absolute;left:120px;right:120px;bottom:46px;display:flex;justify-content:space-between;font-size:15px;letter-spacing:.14em;text-transform:uppercase;color:var(--mu)}
.two{display:grid;grid-template-columns:1fr 1fr;gap:110px;align-items:center}
.stage{display:grid;place-items:center;height:760px;background:#fff}.stage.light{background:#fff}
.cover{padding:120px}.cv-sym{position:absolute;top:110px;left:120px;height:120px}.cv-meta{position:absolute;top:118px;right:120px;display:flex;flex-direction:column;align-items:flex-end;gap:10px;font-size:19px;letter-spacing:.14em;text-transform:uppercase;color:var(--tx)}
.cv-h{position:absolute;left:110px;bottom:230px;font-size:240px;line-height:.88;font-weight:700;letter-spacing:-.055em}.cv-sub{position:absolute;left:122px;bottom:120px;font-size:28px;color:var(--tx)}
.vg{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}.vc{height:375px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:20px;text-align:center}.vc b{font-size:20px}.vc span{font-size:15px;color:var(--mu)}
.xm{position:absolute;display:grid;place-items:center;color:var(--ac);font-weight:700;font-size:22px;width:40px;margin-left:-20px;border-left:2px solid var(--ac)}.xm.h{height:40px;margin:-20px 0 0;border-left:0;border-top:2px solid var(--ac)}
.mt{margin-top:40px;border-collapse:collapse;font-size:24px}.mt td{padding:16px 30px 16px 0;border-bottom:1px solid var(--ln);color:var(--tx)}.mt td:first-child{color:var(--mu);width:220px}
.sizes{display:flex;align-items:flex-end;gap:60px;background:var(--gr);padding:60px;height:500px}.sizes div{display:flex;flex-direction:column;align-items:center;gap:16px}.sizes span{font-size:18px;color:var(--mu)}
.pal{display:grid;grid-template-columns:repeat(5,1fr);gap:20px}.pal .sw{height:330px;margin-bottom:22px}.pal b{display:block;font-size:28px;margin-bottom:10px}.pal span{display:block;font-size:18px;color:#45424e;line-height:1.6}.pal em{display:block;font-style:normal;font-size:16px;color:#6b6775;margin-top:12px}
.t-light .note{margin-top:30px}
.bgg{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.bgg div{height:330px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:24px}.bgg span{font-size:16px;letter-spacing:.1em;text-transform:uppercase;color:var(--mu);mix-blend-mode:difference}
.dg{display:grid;grid-template-columns:repeat(4,1fr);gap:22px}.dg>div{display:flex;flex-direction:column;gap:14px}.dz{position:relative;height:300px;background:#fff;display:grid;place-items:center;overflow:hidden}.dz i{position:absolute;top:14px;right:16px;font-style:normal;font-size:34px;color:#E5484D;font-weight:700}.dg span{font-size:20px;font-weight:500}
.tag{font-size:18px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--ac)}.ty{font-size:300px;line-height:1;font-weight:700;letter-spacing:-.05em;margin:20px 0}.ar .ty{font-family:Plex}
.apps{display:flex;gap:80px;align-items:flex-end}.apps>div{display:flex;flex-direction:column;align-items:center;gap:22px}.ai{width:340px;height:340px;border-radius:76px;display:grid;place-items:center}.apps span{font-size:20px;color:#45424e}.fav{display:flex;gap:30px;align-items:flex-end;flex-wrap:wrap;width:360px}.fav span{width:100%}
.soc .pp{display:flex;gap:40px;margin-bottom:40px}.soc .pp div{width:260px;height:260px;border-radius:50%;display:grid;place-items:center}.soc .tx{max-width:1300px}
.st{display:flex;gap:60px}.cardm{box-shadow:0 30px 70px rgba(9,9,13,.25)}
.files{width:100%;border-collapse:collapse;font-size:22px}.files td{padding:18px 30px 18px 0;border-bottom:1px solid var(--ln);color:var(--tx)}.files td:first-child{font-weight:700;color:var(--sw);width:440px}
.cl-h{position:absolute;left:110px;top:300px;font-size:230px;line-height:.9;font-weight:700;letter-spacing:-.055em}.cl-h span{color:var(--ob)}.cl-s{position:absolute;left:122px;bottom:120px;font-size:40px;font-family:Plex,Satoshi;font-weight:700}`;
const n = G.length;
const ghtml = `<!doctype html><html><head><meta charset="utf-8"><title>SayTamm — Brand Guidelines</title><style>${FONTS}*{box-sizing:border-box;margin:0;padding:0}body{font-family:Satoshi,Plex,sans-serif;-webkit-print-color-adjust:exact;print-color-adjust:exact}.ar{font-family:Plex,Satoshi,sans-serif;direction:rtl}${gcss}</style></head><body>${G.map((p, i) => `<section class="pg ${p.cls}">${p.body}${p.sec ? `<img class="mark" src="${dataSvg(vsvg(/t-light/.test(p.cls) ? VARIANTS[3] : SIG_W))}"><div class="run"><span>SayTamm — Brand guidelines</span><span>${p.sec}</span><span>${String(i + 1).padStart(2, '0')} / ${n}</span></div>` : ''}</section>`).join('')}</body></html>`;
const gdir = D('07_Brand_Guidelines');
fs.writeFileSync(path.join(ASSET, 'guidelines.html'), ghtml);
await tab.setViewportSize({ width: 1920, height: 1080 });
await tab.goto(url(path.join(ASSET, 'guidelines.html')), { waitUntil: 'load' });
await tab.evaluate(() => document.fonts.ready);
await tab.pdf({ path: path.join(gdir, 'SayTamm_Brand_Guidelines_v1.pdf'), width: '1920px', height: '1080px', printBackground: true });
const sd = D('_review'); for (let i = 0; i < n; i++) await tab.screenshot({ path: path.join(sd, `guidelines_${String(i + 1).padStart(2, '0')}.png`), clip: { x: 0, y: i * 1080, width: 1920, height: 1080 }, fullPage: true });

await browser.close();
fs.rmSync(TMP, { force: true });
fs.rmSync(ASSET, { recursive: true, force: true });
console.log('done', n, 'guideline pages');
