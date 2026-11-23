// SayTamm brand patterns (owner selection 2026-11-23): 01 Tamm Slash (primary), 02 Completion (secondary),
// 08 Modular Tiles (layout system), 05 Layered (hero moments only). Built as vectors from the brand rules:
// 45° diagonal of the logo blade (never mirrored), Obsidian/Graphite/Soft White, Electric Purple as accent
// (measured: ≤ 10% of the area in dark versions), no glow, no particles, no logo repetition.
// Usage (repo root): node tools/brand/build-patterns.mjs  → handover/SayTamm_Brand_Identity_Package/08_Patterns
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = path.join(ROOT, 'handover', 'SayTamm_Brand_Identity_Package', '08_Patterns');
fs.rmSync(OUT, { recursive: true, force: true });
const D = (...p) => { const d = path.join(OUT, ...p); fs.mkdirSync(d, { recursive: true }); return d; };
const url = (p) => pathToFileURL(p).href;
const PUB = path.join(ROOT, 'site/public');
const SAT = path.join(PUB, 'fonts/satoshi');

const THEMES = {
  dark: { bg: '#09090D', s1: '#121218', s2: '#17171E', s3: '#202029', edge: 'rgba(245,243,250,0.07)', ac: '#6C35FF', ac2: '#4B22C4' },
  light: { bg: '#F5F3FA', s1: '#EFECF6', s2: '#E7E3F0', s3: '#DCD7E8', edge: 'rgba(9,9,13,0.06)', ac: '#6C35FF', ac2: '#8E66FF' },
};
// deterministic pseudo-random
const rng = (seed) => () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;

// "/" diagonal band: points along x + y = c (45°, rising to the right like the logo blade)
const band = (c, width, w, h) => { const a = c, b = c + width; return `${a},0 ${b},0 ${b - h},${h} ${a - h},${h}`.replace(/(-?\d+\.?\d*),(-?\d+\.?\d*)/g, (m, x, y) => `${(+x).toFixed(1)},${(+y).toFixed(1)}`); };
const defs = (t, id) => `<defs>
  <linearGradient id="${id}g1" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="${t.s1}"/><stop offset="1" stop-color="${t.s3}"/></linearGradient>
  <linearGradient id="${id}g2" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="${t.bg}"/><stop offset="1" stop-color="${t.s2}"/></linearGradient>
  <linearGradient id="${id}ga" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="${t.ac2}"/><stop offset="1" stop-color="${t.ac}"/></linearGradient></defs>`;

// ---------- 01 THE TAMM SLASH — wide parallel 45° bands, one purple ----------------------------------
function slash(w, h, t, seed = 7) {
  const r = rng(seed); const unit = Math.max(w, h);
  let x = -h * 0.2, out = '', purple = Math.floor(4 + r() * 2), i = 0;
  while (x < w + h) {
    const bw = unit * (0.08 + r() * 0.12), gap = unit * (0.02 + r() * 0.05);
    const fill = i === purple ? `url(#p1ga)` : (i % 2 ? `url(#p1g1)` : `url(#p1g2)`);
    const width = i === purple ? unit * 0.045 : bw;
    out += `<polygon points="${band(x, width, w, h)}" fill="${fill}"/><polygon points="${band(x + width - 1.2, 1.2, w, h)}" fill="${t.edge}"/>`;
    x += width + gap; i++;
  }
  return `<rect width="${w}" height="${h}" fill="${t.bg}"/>${out}`;
}
// ---------- 02 THE COMPLETION PATTERN — staggered short blades, a few purple ------------------------------
function completion(w, h, t, seed = 11) {
  const r = rng(seed); const s = Math.max(w, h) / 9; let out = '';
  const blade = (cx, cy, L, T, fill) => { // parallelogram along 45°, rounded by stroke-linejoin
    const dx = L / Math.SQRT2, ox = T;
    return `<polygon points="${cx - dx / 2},${cy + dx / 2} ${cx - dx / 2 + ox},${cy + dx / 2} ${cx + dx / 2 + ox},${cy - dx / 2} ${cx + dx / 2},${cy - dx / 2}" fill="${fill}" stroke="${fill === 'none' ? 'none' : fill}" stroke-width="${s * 0.06}" stroke-linejoin="round"/>`;
  };
  let n = 0, p = 0;
  for (let row = -1; row * s * 0.75 < h + s; row++) for (let col = -1; col * s < w + s; col++) {
    if (r() < 0.28) continue;
    const cx = col * s + (row % 2 ? s / 2 : 0), cy = row * s * 0.75; n++;
    const isP = r() < 0.07; if (isP) p++;
    out += blade(cx, cy, s * (0.9 + r() * 0.5), s * (0.32 + r() * 0.12), isP ? 'url(#p2ga)' : (r() < 0.5 ? 'url(#p2g1)' : 'url(#p2g2)'));
  }
  return `<rect width="${w}" height="${h}" fill="${t.bg}"/>${out}`;
}
// ---------- 08 THE MODULAR TILES — rounded 45° parallelogram grid with fine seams, one purple tile --------
function tiles(w, h, t, seed = 5) {
  const r = rng(seed); const s = Math.max(w, h) / 6, gap = s * 0.07; let out = '';
  const rows = Math.ceil(h / (s * 0.55)) + 2, cols = Math.ceil((w + h) / s) + 2;
  const pr = 2 + Math.floor(r() * (rows - 3)), pc = 2 + Math.floor(r() * 3);
  for (let rI = -1; rI < rows; rI++) for (let cI = -2; cI < cols; cI++) {
    const y0 = rI * s * 0.55, x0 = cI * s + (rI % 2) * s * 0.5; // staggered courses
    const H = s * 0.55 - gap, W = s - gap - H, k = H; // 45° slant: top edge shifted right by its height
    const fill = rI === pr && cI === pc ? 'url(#p8ga)' : (r() < 0.5 ? 'url(#p8g1)' : 'url(#p8g2)');
    out += `<path d="M${x0},${y0 + H} L${x0 + k},${y0} L${x0 + k + W},${y0} L${x0 + W},${y0 + H} Z" fill="${fill}" stroke="${fill}" stroke-width="${s * 0.03}" stroke-linejoin="round"/>`;
  }
  return `<rect width="${w}" height="${h}" fill="${t.bg}"/>${out}`;
}
// ---------- 05 THE LAYERED INTELLIGENCE — folded sheets along the diagonal ------------------------------
function layered(w, h, t) {
  const U = Math.max(w, h); let out = '';
  const sheet = (off, fill, shade) => {
    const a = w * 0.35 + off, b = a + U * 0.18;
    const d = `M${a - h},${h} C${a - h * 0.55},${h * 0.62} ${a - h * 0.35},${h * 0.55} ${a - h * 0.18},${h * 0.32} S${a + U * 0.02},0 ${a + U * 0.1},${-h * 0.05} L${w + U},${-h * 0.05} L${w + U},${h} Z`;
    return `<path d="${d}" fill="${fill}" ${shade ? `filter="url(#p5sh)"` : ''} transform="translate(${b - a - U * 0.18},0)"/>`;
  };
  out += sheet(U * 0.05, 'url(#p5g1)', true);
  out += sheet(U * 0.17, 'url(#p5ga)', true);
  out += sheet(U * 0.27, 'url(#p5g2)', true);
  out += sheet(U * 0.45, `url(#p5g1)`, true);
  return `<defs><filter id="p5sh" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="${-U * 0.006}" dy="${U * 0.006}" stdDeviation="${U * 0.012}" flood-color="#000" flood-opacity="${t.bg === '#09090D' ? 0.55 : 0.12}"/></filter></defs><rect width="${w}" height="${h}" fill="${t.bg}"/>${out}`;
}

const PATTERNS = [
  { id: '01_Tamm_Slash', name: 'The Tamm Slash', role: 'Primary pattern', fn: slash, note: 'The signature. Wide 45° bands taken from the logo’s blade; one purple band per composition.' },
  { id: '02_Completion', name: 'The Completion Pattern', role: 'Secondary pattern', fn: completion, note: 'Staggered blades: progress, things moving into place. Social backgrounds, covers, dividers.' },
  { id: '08_Modular_Tiles', name: 'The Modular Tiles', role: 'Layout system', fn: tiles, note: 'A 45° tiled grid: each tile can hold content. One purple tile marks the focus.' },
  { id: '05_Layered', name: 'The Layered Intelligence', role: 'Hero moments only', fn: layered, note: 'Folded sheets for covers, launch visuals and title slides. Once per surface.' },
];
const SIZES = [['Desktop_16x9', 1920, 1080], ['4K_16x9', 3840, 2160], ['Square_1x1', 1080, 1080], ['Portrait_4x5', 1080, 1350], ['Story_9x16', 1080, 1920], ['LinkedIn_Banner', 1584, 396]];
const idp = (id) => 'p' + id.split('_')[0].replace(/^0/, '');
const svgDoc = (p, t, w, h) => { const id = idp(p.id); return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">${defs(t, id)}${p.fn(w, h, t)}</svg>`; };

// ---------- render ----------
const require = createRequire(import.meta.url);
let playwright;
try { playwright = require('playwright'); } catch { playwright = require(execFileSync('npm', ['root', '-g']).toString().trim() + '/playwright'); }
const browser = await playwright.chromium.launch();
const tab = await browser.newPage();
const TMP = path.join(OUT, '_tmp.html');
async function render(html, w, h, file) {
  await tab.setViewportSize({ width: w, height: h });
  fs.writeFileSync(TMP, `<!doctype html><html><head><meta charset="utf-8"><style>@font-face{font-family:Satoshi;src:url(${url(path.join(SAT, 'Satoshi-700.woff2'))});font-weight:700}@font-face{font-family:Satoshi;src:url(${url(path.join(SAT, 'Satoshi-500.woff2'))});font-weight:500}*{margin:0;padding:0;box-sizing:border-box}html,body{width:${w}px;height:${h}px;overflow:hidden;font-family:Satoshi,sans-serif}</style></head><body>${html}</body></html>`);
  await tab.goto(url(TMP), { waitUntil: 'load' }); await tab.evaluate(() => document.fonts.ready);
  if (file) await tab.screenshot({ path: file, type: file.endsWith('.jpg') ? 'jpeg' : 'png', quality: file.endsWith('.jpg') ? 92 : undefined });
}
// purple share check (dark versions must stay ≤ 10%)
async function purpleShare() {
  return tab.evaluate(() => new Promise((res) => {
    const svg = document.querySelector('svg'); const img = new Image(); const w = 480, h = Math.round(480 * svg.viewBox.baseVal.height / svg.viewBox.baseVal.width);
    img.onload = () => { const c = document.createElement('canvas'); c.width = w; c.height = h; const x = c.getContext('2d'); x.drawImage(img, 0, 0, w, h); const d = x.getImageData(0, 0, w, h).data; let p = 0; for (let i = 0; i < d.length; i += 4) { const [r, g, b] = [d[i], d[i + 1], d[i + 2]]; if (b > 140 && b - g > 90 && r > 40) p++; } res(p / (w * h)); };
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg.outerHTML)));
  }));
}
const report = [];
for (const p of PATTERNS) for (const [tn, t] of Object.entries(THEMES)) {
  for (const [sn, w, h] of SIZES) {
    const s = svgDoc(p, t, w, h);
    const base = `SayTamm_Pattern_${p.id}_${tn}_${sn}_${w}x${h}`;
    if (sn === 'Desktop_16x9' || sn === 'Square_1x1' || sn === 'Story_9x16') fs.writeFileSync(path.join(D(p.id, 'SVG'), base + '.svg'), s);
    await render(s, w, h, path.join(D(p.id, 'PNG'), base + '.png'));
    if (sn === 'Desktop_16x9') { const share = await purpleShare(); report.push([p.id, tn, share]); }
  }
}
for (const [id, tn, sh] of report) if (tn === 'dark' && sh > 0.10) console.warn(`purple share ${id} ${tn}: ${(sh * 100).toFixed(1)}% > 10%`);

// ---------- pattern guide (PDF, 16:9) ----------
const sig = fs.readFileSync(path.join(ROOT, 'brand/production/logo/SayTamm_Symbol_Signature_White-Purple.svg'), 'utf8');
const sigB = fs.readFileSync(path.join(ROOT, 'brand/production/logo/SayTamm_Symbol_Signature_Black-Purple.svg'), 'utf8');
const d64 = (s) => 'data:image/svg+xml;base64,' + Buffer.from(s).toString('base64');
const thumb = (p, t, w, h) => `<img src="${d64(svgDoc(p, THEMES[t], w, h))}" style="width:100%;display:block">`;
const pages = [];
pages.push(`<div class="pg"><img class="mk" src="${d64(sig)}"><p class="kk"><span class="bl"></span>Brand patterns</p><h1>Four patterns.<br><span>One diagonal.</span></h1><div class="ov">${PATTERNS.map((p, i) => `<div>${thumb(p, 'dark', 640, 400)}<b>0${p.id[1]} · ${p.name}</b><em>${p.role}</em></div>`).join('')}</div></div>`);
for (const p of PATTERNS) {
  const r = report.find((x) => x[0] === p.id && x[1] === 'dark');
  pages.push(`<div class="pg"><img class="mk" src="${d64(sig)}"><p class="kk"><span class="bl"></span>${p.role}</p><div class="two"><div><h2>${p.name}</h2><p class="tx">${p.note}</p><p class="meta">Purple in the dark version: ${(r[2] * 100).toFixed(1)}% of the area</p></div><div class="pair"><div>${thumb(p, 'dark', 960, 540)}<span>Dark · Obsidian</span></div><div>${thumb(p, 'light', 960, 540)}<span>Light · Soft White</span></div></div></div></div>`);
}
// applications
const post = (p, t) => `<div class="ap" style="width:360px;height:450px;position:relative;overflow:hidden">${thumb(p, t, 1080, 1350)}<div style="position:absolute;inset:0;background:linear-gradient(0deg,${t === 'dark' ? 'rgba(9,9,13,.92)' : 'rgba(245,243,250,.94)'} 35%,transparent 75%)"></div><div style="position:absolute;inset:0;background:radial-gradient(circle at 0 0,${t === 'dark' ? 'rgba(9,9,13,.97)' : 'rgba(245,243,250,.97)'} 0,${t === 'dark' ? 'rgba(9,9,13,.9)' : 'rgba(245,243,250,.9)'} 90px,transparent 170px)"></div><img src="${d64(t === 'dark' ? sig : sigB)}" style="position:absolute;left:28px;top:28px;height:34px"><b style="position:absolute;left:28px;bottom:60px;right:28px;font-size:34px;line-height:1.05;letter-spacing:-.03em;color:${t === 'dark' ? '#F5F3FA' : '#09090D'}">Not all movement means progress.</b><span style="position:absolute;left:28px;bottom:30px;font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:#96939F">SayTamm</span></div>`;
pages.push(`<div class="pg"><img class="mk" src="${d64(sig)}"><p class="kk"><span class="bl"></span>In use</p><div class="apps">${post(PATTERNS[0], 'dark')}${post(PATTERNS[1], 'dark')}${post(PATTERNS[2], 'light')}<div class="ap" style="width:620px;height:349px;position:relative;overflow:hidden;align-self:center">${thumb(PATTERNS[3], 'dark', 1920, 1080)}<div style="position:absolute;inset:0;background:linear-gradient(90deg,rgba(9,9,13,.95) 30%,transparent 75%)"></div><img src="${d64(sig)}" style="position:absolute;left:34px;top:30px;height:36px"><b style="position:absolute;left:34px;bottom:40px;font-size:48px;line-height:.95;letter-spacing:-.04em;color:#F5F3FA">Say it.<br><span style="color:#6C35FF">Tamm it.</span></b></div></div><p class="tx" style="margin-top:40px">Text always sits on a calm area or over a scrim (gradient from Obsidian or Soft White). The symbol keeps its clear space and never sits on a purple band.</p></div>`);
pages.push(`<div class="pg light"><img class="mk" src="${d64(sigB)}"><p class="kk"><span class="bl"></span>Rules</p><div class="two"><div><h2 style="color:#09090D">Do</h2><ul class="rl">${['One pattern per surface', 'Keep purple at 10% of the area or less in dark layouts', 'Run every diagonal at 45°, rising to the right, like the logo blade', 'Put text on a calm area or a scrim', 'Use 05 Layered only for hero moments: covers, launch visuals, title slides', 'Use the SVG masters; scale them, never stretch them'].map((x) => `<li>${x}</li>`).join('')}</ul></div><div><h2 style="color:#E5484D">Don’t</h2><ul class="rl no">${['Mirror the diagonal (no “\\” direction)', 'Add glow, neon, particles or lens flares', 'Repeat the logo as a pattern or redraw it as a construction drawing', 'Recolour outside the palette', 'Stack two patterns or place the symbol on a purple band', 'Use circles, waves or dot grids — they are not part of the identity'].map((x) => `<li>${x}</li>`).join('')}</ul></div></div></div>`);
const css = `@page{size:1920px 1080px;margin:0}html,body{width:1920px;height:auto;overflow:visible}
.pg{position:relative;width:1920px;height:1080px;overflow:hidden;background:#09090D;color:#F5F3FA;padding:120px;break-after:page}.pg:last-child{break-after:auto}.pg.light{background:#F5F3FA;color:#09090D}
.mk{position:absolute;top:50px;left:120px;height:34px}.kk{display:flex;align-items:center;font-size:20px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#96939F;margin-bottom:34px}
.bl{display:inline-block;width:40px;height:7px;background:#6C35FF;transform:skewX(-45deg);margin-right:20px}
h1{font-size:110px;line-height:.92;letter-spacing:-.05em;margin-bottom:50px}h1 span{color:#6C35FF}h2{font-size:72px;letter-spacing:-.04em;line-height:1}
.ov{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}.ov b{display:block;font-size:22px;margin-top:14px}.ov em{font-style:normal;font-size:17px;color:#96939F}
.two{display:grid;grid-template-columns:1fr;gap:40px;align-items:start}.pair{display:grid;grid-template-columns:1fr 1fr;gap:24px}.pair span{display:block;font-size:15px;letter-spacing:.12em;text-transform:uppercase;color:#96939F;margin-top:8px}
.pair img{width:100%}.tx{font-size:24px;line-height:1.55;color:#CFCCD7;margin-top:24px}.meta{margin-top:30px;font-size:17px;color:#96939F}
.apps{display:flex;gap:26px;align-items:flex-start}.ap{box-shadow:0 30px 70px rgba(0,0,0,.5)}
.rl{list-style:none;margin-top:30px;display:grid;gap:14px}.rl li{font-size:24px;line-height:1.4;padding-left:40px;position:relative;color:#2c2a33}.rl li::before{content:'';position:absolute;left:0;top:7px;width:22px;height:22px;background:#6C35FF;transform:skewX(-45deg) scale(.7)}.rl.no li::before{background:#E5484D}
.light .two{grid-template-columns:1fr 1fr;gap:70px}`;
fs.writeFileSync(TMP, `<!doctype html><html><head><meta charset="utf-8"><style>@font-face{font-family:Satoshi;src:url(${url(path.join(SAT, 'Satoshi-700.woff2'))});font-weight:700}@font-face{font-family:Satoshi;src:url(${url(path.join(SAT, 'Satoshi-500.woff2'))});font-weight:500}*{margin:0;padding:0;box-sizing:border-box}body{font-family:Satoshi,sans-serif;-webkit-print-color-adjust:exact;print-color-adjust:exact}${css}</style></head><body>${pages.join('')}</body></html>`);
await tab.setViewportSize({ width: 1920, height: 1080 });
await tab.goto(url(TMP), { waitUntil: 'load' }); await tab.evaluate(() => document.fonts.ready);
await tab.pdf({ path: path.join(OUT, 'SayTamm_Pattern_Guide.pdf'), width: '1920px', height: '1080px', printBackground: true });
const rv = path.join(ROOT, 'handover', '_pattern_review'); fs.mkdirSync(rv, { recursive: true });
for (let i = 0; i < pages.length; i++) await tab.screenshot({ path: path.join(rv, `guide_${i + 1}.png`), clip: { x: 0, y: i * 1080, width: 1920, height: 1080 }, fullPage: true });
await browser.close();
fs.rmSync(TMP, { force: true });
fs.writeFileSync(path.join(OUT, 'README.md'), `# SayTamm brand patterns\n\nSelected by the owner on 2026-11-23 from the 12 proposals: **01 The Tamm Slash** (primary), **02 The Completion Pattern** (secondary), **08 The Modular Tiles** (layout system), **05 The Layered Intelligence** (hero moments only). Rebuilt as vectors from the brand rules; not traced from the AI proposals.\n\nEach pattern: dark (Obsidian) and light (Soft White) · SVG masters (16:9, 1:1, 9:16) · PNG at 1920×1080, 3840×2160, 1080×1080, 1080×1350, 1080×1920 and the LinkedIn banner size.\n\nPurple share in the dark 16:9 versions: ${report.filter((r) => r[1] === 'dark').map((r) => `${r[0]} ${(r[2] * 100).toFixed(1)}%`).join(' · ')}.\n\nRules: see \`SayTamm_Pattern_Guide.pdf\`. Not adopted: 03, 04, 06, 07, 12 (off-identity or logo misuse); 09, 10, 11 wait for the approved TAMM reference (OQ-56).\n`);
console.log(report.map((r) => `${r[0]} ${r[1]} ${(r[2] * 100).toFixed(1)}%`).join('\n'));
