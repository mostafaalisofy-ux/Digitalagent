// SayTamm — "The Tamm Edition": a creative, English-only company profile (PDF, 16:9).
// Concept: the tagline as a four-verb story — Say it. → Plan it. → Make it. → Tamm it.
// Facts, services, work and clients come from the website's data (production view forced:
// no pending figures, no government logos). No founder page (owner, 2026-11-14).
// Usage (repo root):  node tools/profile/build-profile-global.mjs [outDir]
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const SITE = path.join(ROOT, 'site');
const PUB = path.join(SITE, 'public');
const OUT = path.resolve(process.argv[2] || path.join(ROOT, 'handover', 'company-profile-global'));
fs.mkdirSync(OUT, { recursive: true });

// ---------- site data, production view ----------
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'st-profile-g-'));
for (const d of ['config', 'data', 'i18n']) fs.cpSync(path.join(SITE, 'src', d), path.join(tmp, d), { recursive: true });
fs.writeFileSync(path.join(tmp, 'package.json'), '{"type":"module"}');
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
for (const f of walk(tmp).filter((f) => f.endsWith('.ts'))) {
  let s = fs.readFileSync(f, 'utf8').replace(/from '(\.\.?\/[^']+)'/g, "from '$1.ts'");
  if (f.endsWith(path.join('config', 'site.ts'))) {
    const b = s;
    s = s.replace("import.meta.env.PUBLIC_STAGE !== 'production'", 'false');
    if (s === b) throw new Error('could not force production stage');
  }
  fs.writeFileSync(f, s);
}
const imp = (p) => import(pathToFileURL(path.join(tmp, p)).href);
const { SITE: S } = await imp('config/site.ts');
const { CLIENTS, visibleWall, visibleBrands } = await imp('data/clients.ts');
const { DISCIPLINES } = await imp('data/services.ts');
const { SAYTAMM_WORK, coverOf } = await imp('data/work.ts');
const { HOME } = await imp('i18n/home.ts');
if (S.preview) throw new Error('production view required');
const wall = visibleWall();
const named = visibleBrands();
if ([...wall, ...named].some((c) => c.permission === 'pending')) throw new Error('pending permission leaked');
const H = HOME.en;
const A = H.aboutPage;

// ---------- assets ----------
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const JPG = path.join(tmp, 'jpg');
fs.mkdirSync(JPG, { recursive: true });
const toJpeg = new Map();
// photos/visuals → JPEG (keeps the PDF small); logos and SVGs untouched
const asset = (p, max = 1800) => {
  const src = path.join(PUB, p.replace(/^\//, ''));
  if (!fs.existsSync(src)) throw new Error('missing asset ' + p);
  if (/^\/(work|team|visuals)\/.+\.webp$/.test(p)) {
    const out = path.join(JPG, p.replace(/^\//, '').replace(/\//g, '__').replace(/\.webp$/, `-${max}.jpg`));
    toJpeg.set(out, [src, out, max]);
    return pathToFileURL(out).href;
  }
  return pathToFileURL(src).href;
};
const SAT = path.join(PUB, 'fonts', 'satoshi');
if (!fs.existsSync(path.join(SAT, 'Satoshi-700.woff2'))) throw new Error('Satoshi missing (site/scripts/fetch-satoshi.mjs)');
const PLEX = path.join(SITE, 'node_modules', '@fontsource', 'ibm-plex-sans-arabic', 'files');
const SYM_W = asset('/brand/SayTamm_Symbol_Signature_White-Purple.svg');
const SYM_B = asset('/brand/SayTamm_Symbol_Signature_Black-Purple.svg');
const SYM_WHITE = asset('/brand/SayTamm_Symbol_White.svg');
const work = (slug) => SAYTAMM_WORK.find((w) => w.slug === slug) ?? (() => { throw new Error('missing ' + slug); })();
const img = (i, style = '', cls = '') => `<img class="${cls}" src="${asset(i.src)}" style="${style}" alt="">`;
const fit = (i, h) => `width:${Math.round((i.w / i.h) * h)}px;height:${h}px`; // exact aspect, no crop

// ---------- pages ----------
const pages = [];
// theme: 'dark' | 'light' | 'purple' | 'bleed'; chapter label shown in the running footer
const P = (theme, chapter, body, extra = '') => pages.push({ theme, chapter, body, extra });
const blade = (cls = '') => `<span class="blade ${cls}"></span>`;
const kicker = (s) => `<p class="kicker">${blade()}${esc(s)}</p>`;
const CH = { 1: 'Say it.', 2: 'Plan it.', 3: 'Make it.', 4: 'Tamm it.' };

// 01 COVER
P('bleed', null, `
  <img class="bg" src="${asset('/visuals/cta-background.webp', 2400)}" alt="">
  <div class="shade-l"></div>
  <img class="cover-sym" src="${SYM_W}" alt="SayTamm">
  <div class="cover-meta"><span>Company profile</span><span>Edition 2026</span></div>
  <h1 class="cover-h"><span>Say it.</span><span class="p">Tamm it.</span></h1>
  <p class="cover-sub">A digital marketing &amp; performance agency.<br>Strategy, creative, media and technology — run as one plan.</p>`);

// 02 MANIFESTO
P('light', null, `
  <p class="mega-q">More campaigns<br>do not automatically<br>mean <span class="u">more growth.</span></p>
  <div class="mq-foot">${blade()}<p>${esc(A.philosophy.body[1])} ${esc(A.philosophy.body[2])}</p></div>`);

// 03 THE NAME
P('dark', null, `
  <div class="name-ar" lang="ar" dir="rtl">قول تم</div>
  <div class="name-grid">
    <div><p class="kicker">${blade()}The name</p><h2 class="h-xl">Why “SayTamm”?</h2></div>
    <div><p class="lede">${esc(H.about.name)}</p>
      <dl class="gloss"><div><dt lang="ar" dir="rtl">قول</dt><dd>“say” — tell us the goal</dd></div><div><dt lang="ar" dir="rtl">تم</dt><dd>“done” — consider it handled</dd></div></dl></div>
  </div>`);

// 04 CONTENTS
const toc = [
  [1, 'Say it.', 'Who we are · SayTamm in numbers · Markets'],
  [2, 'Plan it.', 'One team, four disciplines · Nine services · How a brief becomes a result'],
  [3, 'Make it.', 'Selected work from the SayTamm team'],
  [4, 'Tamm it.', 'Clients · What you can hold us to · Start a project'],
];
P('dark', null, `
  <p class="kicker">${blade()}Contents</p>
  <ol class="toc">${toc.map(([n, t, d]) => `<li><span class="toc-n">0${n}</span><span class="toc-t${n === 4 ? ' p' : ''}">${t}</span><span class="toc-d">${esc(d)}</span><span class="toc-pg" data-ch="${n}"></span></li>`).join('')}</ol>`);

// chapter opener
const opener = (n, visual, line) => P('bleed', null, `
  <img class="bg" src="${asset(visual, 2400)}" alt="">
  <div class="shade-b"></div>
  <div class="ch-num">0${n}</div>
  <div class="ch-txt"><p class="kicker">${blade()}Chapter 0${n}</p><h2 class="ch-h${n === 4 ? ' p' : ''}">${CH[n]}</h2><p class="ch-line">${esc(line)}</p></div>`, `data-chapter-start="${n}"`);

// ===== CHAPTER 1 — SAY IT =====
opener(1, '/visuals/about-atmosphere.webp', 'Who we are, and the experience we bring to the brief.');
P('dark', CH[1], `
  <div class="who">
    <div><p class="kicker">${blade()}Who we are</p><h2 class="h-xl">${A.title.map(esc).join('<br>')}</h2></div>
    <div class="who-r"><p class="lede">${esc(A.intro[0])}</p><p class="body">${esc(A.intro[1])}</p><p class="body">${esc(A.intro[2])}</p></div>
  </div>
  <p class="who-origin">${blade()}${esc(A.experience.origin)}</p>`);

const F = H.about.facts;
P('dark', CH[1], `
  <p class="kicker">${blade()}SayTamm in numbers</p>
  <div class="nums">
    <div class="num-big"><span class="v">${esc(F[0].v)}</span><span class="k">${esc(F[0].k)}</span></div>
    <div class="num-stack">${F.slice(1).map((f) => `<div class="num-row"><span class="v">${esc(f.v)}</span><span class="k">${esc(f.k)}</span></div>`).join('')}</div>
  </div>`);

P('dark', CH[1], `
  <div class="mk">
    <div class="mk-l"><p class="kicker">${blade()}${esc(A.regional.eyebrow)}</p><h2 class="h-l">${A.regional.title.map(esc).join('<br>')}</h2>
      <p class="body">${esc(A.regional.body[0])}</p><p class="body">${esc(A.regional.body[1])}</p><p class="body">${esc(A.regional.body[2])}</p></div>
    <ol class="mk-list">${A.regional.markets.map((m, i) => `<li><span class="mk-i">0${i + 1}</span><span class="mk-n">${esc(m)}</span></li>`).join('')}</ol>
  </div>
  <p class="foot-note">${esc(A.regional.marketsNote)} — experience, not offices.</p>`);

// ===== CHAPTER 2 — PLAN IT =====
opener(2, '/visuals/services-strategy.webp', 'How one team turns a business objective into a connected plan.');

// loop diagram
const steps = H.approach.steps;
const R = 330, cx = 420, cy = 420;
const pos = [[cx, cy - R], [cx + R, cy], [cx, cy + R], [cx - R, cy]];
const arc = (a, b) => {
  const [x1, y1] = pos[a], [x2, y2] = pos[b];
  return `<path d="M${x1} ${y1} A${R} ${R} 0 0 1 ${x2} ${y2}" />`;
};
P('dark', CH[2], `
  <div class="model">
    <div class="model-l"><p class="kicker">${blade()}${esc(A.model.eyebrow)}</p><h2 class="h-l">${A.model.title.map(esc).join('<br>')}</h2>
      ${A.model.intro.map((p) => `<p class="body">${esc(p)}</p>`).join('')}</div>
    <div class="loop">
      <svg viewBox="0 0 840 840" width="840" height="840" aria-hidden="true">
        <defs><marker id="ah" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10z" fill="#6C35FF"/></marker></defs>
        <circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="rgba(245,243,250,.12)" stroke-width="2"/>
        <g fill="none" stroke="#6C35FF" stroke-width="4" marker-end="url(#ah)">${[0, 1, 2, 3].map((i) => {
          const a0 = (-90 + i * 90 + 14) * Math.PI / 180, a1 = (-90 + (i + 1) * 90 - 14) * Math.PI / 180;
          return `<path d="M${cx + R * Math.cos(a0)} ${cy + R * Math.sin(a0)} A${R} ${R} 0 0 1 ${cx + R * Math.cos(a1)} ${cy + R * Math.sin(a1)}"/>`;
        }).join('')}</g>
        ${pos.map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="14" fill="#6C35FF"/>`).join('')}
      </svg>
      <div class="loop-c"><span>One team.</span><span class="p">One business number.</span></div>
      ${steps.map((s, i) => `<div class="node node-${i}"><span class="node-i">0${i + 1}</span><span class="node-k">${esc(s.k)}</span></div>`).join('')}
    </div>
  </div>`);

// services index (light)
const allSvc = DISCIPLINES.flatMap((d) => d.services.map((s) => ({ s, d })));
P('light', CH[2], `
  <div class="si-head"><div><p class="kicker">${blade()}Services</p><h2 class="h-l">Nine services.<br><span class="p">One objective.</span></h2></div>
    <p class="body dk">Every engagement is planned around one business objective. Hire us for a single service, or for the connected plan.</p></div>
  <ol class="si">${allSvc.map(({ s, d }, i) => `<li><span class="si-n">${String(i + 1).padStart(2, '0')}</span><span class="si-name">${esc(s.name.en)}</span><span class="si-d">${esc(d.name.en)}</span></li>`).join('')}</ol>`);

// service detail — one page per two disciplines, columns by service
const svcPage = (ds) => P('dark', CH[2], `
  <div class="sd">${ds.map((d) => `
    <section class="sd-disc" style="flex:${d.services.length}">
      <header><span class="sd-n">${d.n}</span><h3>${esc(d.name.en)}</h3><p>${esc(d.value.en)}</p></header>
      <div class="sd-cards">${d.services.map((s) => `
        <article><h4>${esc(s.name.en)}</h4><p class="sd-sum">${esc(s.summary.en)}</p>
          <ul>${s.includes.en.slice(0, ds.length > 1 ? 6 : 4).map((x) => `<li>${esc(x)}</li>`).join('')}</ul></article>`).join('')}</div>
    </section>`).join('')}</div>`);
svcPage([DISCIPLINES[0], DISCIPLINES[2]]);
svcPage([DISCIPLINES[1]]);
svcPage([DISCIPLINES[3]]);

// process
P('bleed', CH[2], `
  <img class="bg dim" src="${asset('/visuals/approach-band.webp', 2400)}" alt="">
  <div class="shade-full"></div>
  <div class="pr">
    <div class="pr-head"><p class="kicker">${blade()}${esc(H.approach.eyebrow)}</p><h2 class="h-l">${esc(H.approach.title)}</h2><p class="body">${esc(H.approach.intro)}</p></div>
    <ol class="pr-steps">${steps.map((s, i) => `<li><span class="pr-i">0${i + 1}</span><h3>${esc(s.k)}</h3><p>${esc(s.d)}</p></li>`).join('')}</ol>
    <p class="pr-loop">${blade()}${esc(H.approach.loop)}</p>
  </div>`);

// ===== CHAPTER 3 — MAKE IT =====
// tilted collage opener
const collage = ['chery-saudi-models', 'niimee-posts', 'tech-hive-gaming', 'bitumat-posts', 'altopiano-posts', 'zahid-electra-features', 'metro-food', 'mix-events',
  'arhab-app', 'alqimma-founding-day', 'dc-block-posts', 'gig-posts', 'xiaomi-wearables', 'marriott-posts', 'fatora-plus-posts', 'siyaq-post', 'niimee-the-dot',
  'tecspro-posts', 'siefco-posts', 'ks-furniture-offer', 'exodus-travel-post', 'chery-saudi-trust', 'tech-hive-banner', 'niimee-your-size'];
const colImgs = [];
for (const s of collage) {
  const w = work(s);
  const ims = w.media.kind === 'images' ? w.media.images : [coverOf(w)];
  colImgs.push(...ims.slice(0, 2).filter((i) => i.w >= 380));
}
P('bleed', null, `
  <div class="collage">${Array.from({ length: 48 }, (_, k) => colImgs[k % colImgs.length]).map((i) => `<div class="cc"><img src="${asset(i.src, 600)}" alt=""></div>`).join('')}</div>
  <div class="shade-collage"></div>
  <div class="ch-num">03</div>
  <div class="ch-txt"><p class="kicker">${blade()}Chapter 03</p><h2 class="ch-h">Make it.</h2><p class="ch-line">Selected work made by the SayTamm team — posts, campaigns, identities and packaging.</p></div>`, 'data-chapter-start="3"');

const pjHead = (n, w, extra = '') => `
  <div class="pj-meta"><span class="pj-n">P/${String(n).padStart(2, '0')}</span><span>${esc(w.sector.en)}</span><span>${esc(w.format.en)}</span></div>
  <h2 class="pj-client">${esc(w.client)}</h2>
  <p class="pj-title">${esc(w.title.en)}</p>
  <p class="pj-sum">${esc(w.summary.en)}</p>${extra}`;

// P/01 Chery — staggered trio
{ const w = work('chery-saudi-models'); const im = w.media.images;
  P('dark', CH[3], `<div class="pj pj-chery"><div class="trio">${[0, 1, 2].map((k) => img(im[k], fit(im[k], 470), `t${k}`)).join('')}</div><div class="pj-txt">${pjHead(1, w)}</div></div>`); }
// P/02 Zahid — bleed hero right
{ const w = work('zahid-electra-appliances'); const im = w.media.images;
  P('dark', CH[3], `<div class="pj-zahid"><div class="pj-txt">${pjHead(2, w)}<div class="duo">${img(im[1], fit(im[1], 228))}${img(im[2], fit(im[2], 228))}</div></div>
    <div class="hero-r"><img src="${asset(im[0].src)}" alt=""></div></div>`); }
// P/03 niimee — warm editorial
{ const w = work('niimee-your-size'); const im = w.media.images;
  P('sand', CH[3], `<div class="pj pj-niimee">${img(im[0], fit(im[0], 860), 'big')}<div class="stack">${img(im[1], fit(im[1], 420))}${img(im[2], fit(im[2], 420))}</div><div class="pj-txt">${pjHead(3, w)}</div></div>`); }
// P/04 Clean Basket — identity on light
{ const w = work('cleanbasket-identity'); const im = w.media.images;
  P('light', CH[3], `<div class="pj pj-cb"><div class="cb-grid">${img(im[1], fit(im[1], 600), 'big')}<div class="stack">${img(im[0], fit(im[0], 290))}${img(im[2], fit(im[2], 290))}</div></div><div class="pj-txt">${pjHead(4, w)}</div></div>`); }
// P/05 Beauty Lab — bleed band
{ const w = work('beauty-lab-packaging'); const im = w.media.images;
  P('dark', CH[3], `<div class="pj-bl"><div class="band"><img src="${asset(im[0].src)}" alt=""></div>
    <div class="bl-row"><div class="pj-txt">${pjHead(5, w)}</div><div class="duo">${img(im[1], fit(im[1], 420))}${img(im[2], fit(im[2], 420))}</div></div></div>`); }
// P/06 Tech Hive — purple stage
{ const w = work('tech-hive-gaming'); const im = w.media.images;
  P('purple', CH[3], `<div class="pj pj-th"><div class="pj-txt th-txt">${pjHead(6, w)}</div><div class="quad">${im.slice(0, 4).map((i) => img(i, fit(i, 500))).join('')}</div></div>`); }

// more work grid
const more = ['xiaomi-wearables', 'gig-posts', 'marriott-posts', 'metro-food', 'altopiano-posts', 'bitumat-posts', 'arhab-app', 'mix-events', 'fatora-plus-posts', 'alqimma-founding-day', 'dc-block-posts', 'jora-identity'];
P('dark', CH[3], `
  <div class="mw-head"><div><p class="kicker">${blade()}More from the work wall</p><h2 class="h-l">Twenty-eight projects.<br><span class="p">Twenty-three brands.</span></h2></div>
    <p class="body">A selection from the SayTamm work wall: consumer electronics, insurance, hospitality, food, restaurants, building materials, mobility, events and software.</p></div>
  <ul class="mw">${more.map((s) => { const w = work(s); const c = coverOf(w); return `<li><div class="mw-img"><img src="${asset(c.src, 700)}" alt=""></div><p><b>${esc(w.client)}</b><span>${esc(w.sector.en)}</span></p></li>`; }).join('')}</ul>`);

// ===== CHAPTER 4 — TAMM IT =====
opener(4, '/visuals/services-media.webp', 'The brands that trusted the team, and what you can hold us to.');

const list = [...CLIENTS.filter((c) => c.logo), ...CLIENTS.filter((c) => !c.logo)];
P('light', CH[4], `
  <div class="cl-head"><div><p class="kicker">${blade()}Clients</p><h2 class="h-l">In good company.</h2></div><p class="body dk">${esc(H.clients.title)}</p></div>
  <ul class="lg">${list.map((c) => `<li${c.tile ? ` style="background:${c.tile}"` : ''} class="${c.fill ? 'fill' : ''}">${c.logo ? `<img src="${asset(c.logo.src)}" alt="">` : `<span>${esc(c.name.en)}</span>`}</li>`).join('')}${Array.from({ length: (10 - (list.length % 10)) % 10 }, () => '<li class="empty"></li>').join('')}</ul>`);

P('dark', CH[4], `
  <div class="cl-head"><div><p class="kicker">${blade()}Clients</p><h2 class="h-l">Also among our clients <span class="p">${wall.length + named.length}</span></h2></div></div>
  <ul class="wl">${wall.map((c) => `<li><img src="${asset(c.logo.src)}" alt=""></li>`).join('')}${named.map((c) => `<li class="nm"><span>${esc(c.name)}</span></li>`).join('')}</ul>`);

// promises — the five values, each tied to site copy
const promises = [
  ['Clarity', 'One objective, written down before budget is spent — and the number that will show it worked.'],
  ['Ownership', 'You set the goal. We take responsibility for getting there.'],
  ['Speed', 'Fast, direct communication: no distance between what you need and what the team delivers.'],
  ['Precision', 'Strategy, creative, media and measurement planned together, so nothing is lost between handovers.'],
  ['Impact', 'Judged by sales, qualified leads and revenue — never by activity alone.'],
];
P('dark', CH[4], `
  <div class="pm-head"><p class="kicker">${blade()}What you can hold us to</p><h2 class="h-l">Five commitments.</h2></div>
  <ol class="pm">${promises.map(([k, d], i) => `<li><span class="pm-i">0${i + 1}</span><span class="pm-k">${k}</span><span class="pm-d">${esc(d)}</span></li>`).join('')}</ol>`);

// how to start
P('dark', CH[4], `
  <div class="st">
    <div><p class="kicker">${blade()}Start a project</p><h2 class="h-xl">Tell us the goal.<br><span class="p">We take it from there.</span></h2></div>
    <ol class="st-steps">
      <li><span>01</span><div><h3>Share the brief</h3><p>Your objective, your market and your timeline.</p></div></li>
      <li><span>02</span><div><h3>Get our approach</h3><p>We reply with how we would approach it and what we would need from you to start.</p></div></li>
      <li><span>03</span><div><h3>Agree the number</h3><p>One business objective that the plan, the work and the reporting all answer to.</p></div></li>
    </ol>
  </div>`);

// closing
P('purple-full', null, `
  <img class="close-sym" src="${SYM_WHITE}" alt="">
  <h2 class="close-h"><span>Say it.</span><span>We’ll Tamm it.</span></h2>
  <div class="close-c"><div><span>Email</span><b>${esc(S.email)}</b></div><div><span>Web</span><b>www.saytamm.com</b></div></div>`);

// back cover
P('dark', null, `<div class="back"><img src="${SYM_W}" alt="SayTamm"><p>Say it. Tamm it.</p><p class="lo">SayTamm · Digital marketing &amp; performance agency</p></div>`);

// table of contents page numbers
const chStart = {};
pages.forEach((p, i) => { const m = /data-chapter-start="(\d)"/.exec(p.extra); if (m) chStart[m[1]] = i + 1; });
pages[3].body = pages[3].body.replace(/<span class="toc-pg" data-ch="(\d)"><\/span>/g, (_, n) => `<span class="toc-pg">p. ${String(chStart[n]).padStart(2, '0')}</span>`);

// ---------- CSS ----------
const css = `
@font-face{font-family:Satoshi;src:url(${pathToFileURL(path.join(SAT, 'Satoshi-400.woff2')).href});font-weight:400}
@font-face{font-family:Satoshi;src:url(${pathToFileURL(path.join(SAT, 'Satoshi-500.woff2')).href});font-weight:500}
@font-face{font-family:Satoshi;src:url(${pathToFileURL(path.join(SAT, 'Satoshi-700.woff2')).href});font-weight:700}
@font-face{font-family:Plex;src:url(${pathToFileURL(path.join(PLEX, 'ibm-plex-sans-arabic-arabic-700-normal.woff2')).href});font-weight:700}
@font-face{font-family:Plex;src:url(${pathToFileURL(path.join(PLEX, 'ibm-plex-sans-arabic-arabic-500-normal.woff2')).href});font-weight:500}
@page{size:1920px 1080px;margin:0}
:root{--ob:#09090D;--gr:#17171E;--sw:#F5F3FA;--mu:#96939F;--ac:#6C35FF;--ln:rgba(245,243,250,.14);--tx:#CFCCD7}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:Satoshi,Plex,sans-serif;background:var(--ob);color:var(--sw);-webkit-print-color-adjust:exact;print-color-adjust:exact;font-feature-settings:"ss01"}
[lang=ar]{font-family:Plex,sans-serif}
.pg{position:relative;width:1920px;height:1080px;overflow:hidden;padding:120px 120px 120px;break-after:page}
.pg:last-child{break-after:auto}
.t-dark{background:var(--ob)} .t-light{background:var(--sw);color:var(--ob)} .t-purple{background:linear-gradient(135deg,#2a1263 0%,#09090D 70%)}
.t-sand{background:#EDE6DC;color:#1b1714} .t-purple-full{background:var(--ac)} .t-bleed{padding:0}
.p{color:var(--ac)} .t-purple-full .p{color:var(--sw)}
.blade{display:inline-block;width:46px;height:7px;background:var(--ac);transform:skewX(-45deg);margin-right:22px;vertical-align:middle;flex:none}
.kicker{display:flex;align-items:center;font-size:21px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;color:var(--mu);margin-bottom:34px}
.t-light .kicker,.t-sand .kicker{color:#6b6775}
.h-xl{font-size:96px;line-height:.98;font-weight:700;letter-spacing:-.035em}
.h-l{font-size:76px;line-height:1;font-weight:700;letter-spacing:-.03em}
.lede{font-size:34px;line-height:1.42;font-weight:500;letter-spacing:-.01em}
.body{font-size:23px;line-height:1.62;color:var(--tx);margin-top:18px}
.body.dk,.t-light .body{color:#4a4753}
/* chrome */
.run{position:absolute;left:120px;right:120px;bottom:52px;display:flex;justify-content:space-between;font-size:16px;letter-spacing:.14em;text-transform:uppercase;color:var(--mu)}
.t-light .run,.t-sand .run{color:#8a8693}
.mark{position:absolute;top:52px;left:120px;height:34px}
/* bleed bits */
.bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.bg.dim{opacity:.55}
.shade-l{position:absolute;inset:0;background:linear-gradient(90deg,rgba(9,9,13,.92) 0%,rgba(9,9,13,.55) 45%,rgba(9,9,13,0) 75%)}
.shade-b{position:absolute;inset:0;background:linear-gradient(0deg,rgba(9,9,13,.95) 0%,rgba(9,9,13,.25) 55%,rgba(9,9,13,.05) 100%)}
.shade-full{position:absolute;inset:0;background:linear-gradient(180deg,rgba(9,9,13,.94) 0%,rgba(9,9,13,.82) 60%,rgba(9,9,13,.95) 100%)}
/* cover */
.cover-sym{position:absolute;top:110px;left:120px;height:120px}
.cover-meta{position:absolute;top:118px;right:120px;display:flex;flex-direction:column;align-items:flex-end;gap:10px;font-size:20px;letter-spacing:.16em;text-transform:uppercase;color:var(--tx)}
.cover-h{position:absolute;left:110px;bottom:250px;font-size:250px;line-height:.86;font-weight:700;letter-spacing:-.055em}
.cover-h span{display:block}
.cover-sub{position:absolute;left:122px;bottom:120px;font-size:28px;line-height:1.45;color:var(--tx)}
/* manifesto */
.mega-q{font-size:168px;line-height:.95;font-weight:700;letter-spacing:-.05em;margin-top:20px}
.mega-q .u{color:var(--ac)}
.mq-foot{position:absolute;left:120px;right:120px;bottom:120px;display:flex;align-items:flex-start;gap:0;border-top:2px solid var(--ob);padding-top:34px}
.mq-foot .blade{margin-top:14px}
.mq-foot p{font-size:26px;line-height:1.55;max-width:1180px;color:#33303b}
/* name */
.name-ar{position:absolute;right:90px;top:20px;font-size:430px;line-height:1.1;font-weight:700;color:var(--ac);letter-spacing:0}
.name-grid{position:absolute;left:120px;right:120px;bottom:130px;display:grid;grid-template-columns:1fr 1fr;gap:120px;align-items:end}
.gloss{display:flex;gap:60px;margin-top:40px}
.gloss dt{font-size:56px;font-weight:700;color:var(--sw)} .gloss dd{font-size:20px;color:var(--mu);margin-top:4px}
/* toc */
.toc{list-style:none;margin-top:40px;border-top:1px solid var(--ln)}
.toc li{display:grid;grid-template-columns:140px 560px 1fr 120px;align-items:baseline;padding:34px 0;border-bottom:1px solid var(--ln)}
.toc-n{font-size:28px;color:var(--ac);font-weight:700}
.toc-t{font-size:96px;font-weight:700;letter-spacing:-.04em;line-height:1}
.toc-d{font-size:22px;color:var(--mu)} .toc-pg{font-size:20px;color:var(--mu);text-align:right}
/* chapter opener */
.ch-num{position:absolute;right:80px;top:20px;font-size:560px;line-height:1;font-weight:700;letter-spacing:-.06em;color:transparent;-webkit-text-stroke:2px rgba(245,243,250,.45)}
.ch-txt{position:absolute;left:120px;bottom:120px}
.ch-h{font-size:230px;line-height:.9;font-weight:700;letter-spacing:-.055em}
.ch-line{font-size:30px;color:var(--tx);margin-top:26px;max-width:1100px}
/* who */
.who{display:grid;grid-template-columns:1fr 760px;gap:120px}
.who-r{padding-top:70px}
.who-origin{position:absolute;left:120px;right:120px;bottom:120px;display:flex;align-items:flex-start;font-size:23px;line-height:1.6;color:var(--mu);border-top:1px solid var(--ln);padding-top:30px}
.who-origin .blade{margin-top:12px}
/* numbers */
.nums{display:grid;grid-template-columns:1.25fr 1fr;gap:80px;align-items:end;height:760px}
.num-big .v{display:block;font-size:400px;line-height:.82;font-weight:700;letter-spacing:-.06em;color:var(--ac);font-variant-numeric:lining-nums}
.num-big .k{display:block;font-size:30px;margin-top:30px;color:var(--tx)}
.num-row{display:grid;grid-template-columns:330px 1fr;align-items:center;gap:30px;padding:26px 0;border-top:1px solid var(--ln)}
.num-row .v{font-size:150px;line-height:.9;font-weight:700;letter-spacing:-.05em}
.num-row .k{font-size:22px;line-height:1.45;color:var(--mu)}
/* markets */
.mk{display:grid;grid-template-columns:720px 1fr;gap:110px}
.mk-list{list-style:none;margin-top:-10px}
.mk-list li{display:flex;align-items:baseline;gap:30px;border-bottom:1px solid var(--ln);padding:6px 0}
.mk-i{font-size:22px;color:var(--ac);font-weight:700;width:50px}
.mk-n{font-size:118px;line-height:1.08;font-weight:700;letter-spacing:-.045em;color:transparent;-webkit-text-stroke:2px var(--sw)}
.mk-list li:first-child .mk-n{color:var(--sw)}
.foot-note{position:absolute;right:120px;bottom:120px;font-size:19px;color:var(--mu)}
/* model loop */
.model{display:grid;grid-template-columns:560px 1fr;gap:80px;align-items:center;margin-top:-40px}
.loop{position:relative;width:840px;height:840px;margin-left:auto}
.loop-c{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:44px;font-weight:700;letter-spacing:-.02em;line-height:1.15;text-align:center}
.node{position:absolute;display:flex;flex-direction:column;gap:4px;background:var(--ob);padding:6px 14px}
.node-i{font-size:18px;color:var(--ac);font-weight:700}.node-k{font-size:36px;font-weight:700}
.node-0{left:420px;top:90px;transform:translate(-50%,-100%)}
.node-1{left:770px;top:420px;transform:translate(0,-50%)}
.node-2{left:420px;top:770px;transform:translate(-50%,0)}
.node-3{left:70px;top:420px;transform:translate(-100%,-50%);text-align:right}
/* services index */
.si-head{display:grid;grid-template-columns:1fr 600px;gap:100px;align-items:end;margin-bottom:46px}
.si{list-style:none;columns:2;column-gap:100px;border-top:2px solid var(--ob)}
.si li{display:grid;grid-template-columns:90px 1fr;grid-template-rows:auto auto;break-inside:avoid;padding:20px 0 18px;border-bottom:1px solid rgba(9,9,13,.15)}
.si-n{grid-row:span 2;font-size:24px;font-weight:700;color:var(--ac);padding-top:12px}
.si-name{font-size:46px;font-weight:700;letter-spacing:-.025em;line-height:1.1}
.si-d{font-size:18px;color:#6b6775;letter-spacing:.1em;text-transform:uppercase;margin-top:6px}
/* service detail */
.sd{display:flex;gap:40px;height:100%}
.sd-disc{display:flex;flex-direction:column;min-width:0}
.sd-disc header{border-top:5px solid var(--ac);padding-top:22px;margin-bottom:22px;min-height:180px}
.sd-n{font-size:22px;font-weight:700;color:var(--ac)}
.sd-disc h3{font-size:40px;font-weight:700;letter-spacing:-.02em;margin:6px 0 10px}
.sd-disc header p{font-size:22px;line-height:1.5;color:var(--mu);max-width:820px}
.sd-cards{display:flex;gap:16px;flex:1}
.sd-cards article{flex:1;background:var(--gr);padding:28px 26px;min-width:0}
.sd-cards article{padding:34px 32px}.sd-cards h4{font-size:30px;font-weight:700;line-height:1.15;letter-spacing:-.01em}
.sd-sum{font-size:20px;line-height:1.5;color:var(--tx);margin:12px 0 18px}
.sd-cards ul{list-style:none;display:grid;gap:10px}
.sd-cards li{position:relative;font-size:19px;line-height:1.5;color:var(--mu);padding-left:26px}
.sd-cards li::before{content:'';position:absolute;left:0;top:.62em;width:12px;height:3px;background:var(--ac);transform:skewX(-45deg)}
/* process */
.pr{position:absolute;inset:120px}
.pr-head{display:grid;grid-template-columns:700px 1fr;column-gap:100px}.pr-head .kicker{grid-column:1/-1}.pr-head .body{margin-top:0;align-self:end}
.pr-steps{list-style:none;display:grid;grid-template-columns:repeat(4,1fr);gap:0;margin-top:90px;position:relative}
.pr-steps::before{content:'';position:absolute;left:0;right:0;top:0;height:2px;background:linear-gradient(90deg,var(--ac),rgba(108,53,255,.2))}
.pr-steps li{padding:46px 40px 0 0;position:relative}
.pr-steps li::before{content:'';position:absolute;top:-11px;left:0;width:24px;height:24px;background:var(--ac);transform:skewX(-45deg)}
.pr-i{font-size:20px;color:var(--ac);font-weight:700}
.pr-steps h3{font-size:54px;font-weight:700;letter-spacing:-.03em;margin:8px 0 16px}
.pr-steps p{font-size:22px;line-height:1.55;color:var(--tx)}
.pr-loop{position:absolute;left:0;right:0;bottom:0;display:flex;align-items:center;font-size:34px;font-weight:500}
/* collage */
.collage{position:absolute;left:-520px;top:-560px;width:3000px;display:grid;grid-template-columns:repeat(8,1fr);gap:22px;transform:rotate(-14deg)}
.cc{aspect-ratio:4/5;overflow:hidden;background:var(--gr)}.cc img{width:100%;height:100%;object-fit:cover;display:block}
.shade-collage{position:absolute;inset:0;background:linear-gradient(0deg,rgba(9,9,13,.96) 8%,rgba(9,9,13,.55) 50%,rgba(9,9,13,.35) 100%)}
/* projects */
.pj-meta{display:flex;gap:26px;font-size:17px;letter-spacing:.14em;text-transform:uppercase;color:var(--mu);margin-bottom:20px;flex-wrap:wrap}
.pj-n{color:var(--ac);font-weight:700}
.pj-client{font-size:104px;line-height:.95;font-weight:700;letter-spacing:-.045em}
.pj-title{font-size:30px;color:var(--ac);font-weight:500;margin-top:14px}
.pj-sum{font-size:22px;line-height:1.6;color:var(--tx);margin-top:22px}
.t-light .pj-sum,.t-sand .pj-sum{color:#4a4753} .t-light .pj-meta,.t-sand .pj-meta{color:#7b7784}
.pj{display:flex;gap:70px;align-items:center;height:100%}
.pj img{display:block;box-shadow:0 30px 80px rgba(0,0,0,.45)}
.pj-chery{margin-top:-30px}.trio{display:flex;gap:28px;align-items:flex-start;flex:none}.trio .t1{margin-top:110px}.trio .t2{margin-top:40px}
.pj-chery .pj-txt{flex:1;min-width:470px}.pj-chery .pj-client{font-size:92px}
.pj-zahid{position:absolute;inset:0;display:grid;grid-template-columns:780px 1fr}
.pj-zahid .pj-txt{padding:150px 70px 0 120px}
.duo{display:flex;gap:18px;margin-top:40px}.duo img{display:block}
.hero-r{position:relative;overflow:hidden}.hero-r img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:62% 50%}
.pj-niimee{gap:30px}.pj-niimee .stack{display:flex;flex-direction:column;gap:20px}.pj-niimee .pj-txt{padding-left:40px;flex:1}
.pj-niimee img{box-shadow:0 30px 70px rgba(60,40,20,.18)}
.pj-cb{gap:60px}.cb-grid{display:flex;gap:20px;flex:none}.cb-grid .stack{display:flex;flex-direction:column;gap:20px}
.pj-cb img{box-shadow:0 20px 60px rgba(9,9,13,.12)}
.pj-bl{position:absolute;inset:0}
.band{height:520px;overflow:hidden}.band img{width:100%;height:100%;object-fit:cover;object-position:50% 60%;display:block}
.bl-row{display:flex;gap:80px;padding:0 120px;margin-top:-120px;align-items:flex-start}
.bl-row .pj-txt{flex:1;padding-top:160px}.bl-row .pj-client{font-size:84px}
.bl-row .duo{margin-top:0}.bl-row .duo img{box-shadow:0 30px 80px rgba(0,0,0,.5)}
.pj-th{flex-direction:column;align-items:stretch;gap:44px;justify-content:center}
.th-txt{display:grid;grid-template-columns:1fr 860px;column-gap:80px;align-items:end}.th-txt .pj-meta{grid-column:1/-1}
.th-txt .pj-title{grid-column:1}.th-txt .pj-sum{grid-column:2;grid-row:2/4;margin:0}
.quad{display:flex;gap:24px;justify-content:space-between}
/* more work */
.mw-head{display:grid;grid-template-columns:1fr 640px;gap:80px;align-items:end;margin-bottom:32px}
.mw{list-style:none;display:grid;grid-template-columns:repeat(6,1fr);gap:22px 18px}
.mw-img{aspect-ratio:6/5;overflow:hidden;background:var(--gr)}.mw-img img{width:100%;height:100%;object-fit:cover;display:block}
.mw p{display:flex;flex-direction:column;margin-top:10px}.mw b{font-size:19px}.mw p span{font-size:15px;color:var(--mu)}
/* clients */
.cl-head{display:flex;justify-content:space-between;align-items:flex-end;gap:60px;margin-bottom:46px}.cl-head .body{margin:0;max-width:560px;text-align:right}
.lg{list-style:none;display:grid;grid-template-columns:repeat(10,1fr);border-top:1px solid rgba(9,9,13,.16);border-left:1px solid rgba(9,9,13,.16)}
.lg li{position:relative;height:124px;border-right:1px solid rgba(9,9,13,.16);border-bottom:1px solid rgba(9,9,13,.16);background:#fff}
.lg li img{position:absolute;inset:22% 20%;width:60%;height:56%;object-fit:contain}
.lg li.fill img{inset:0;width:100%;height:100%;object-fit:cover}
.lg li span{position:absolute;inset:0;display:grid;place-items:center;font-size:21px;font-weight:500;color:#4a4753;letter-spacing:.02em}
.lg li.empty{background:transparent}
.wl{list-style:none;display:grid;grid-template-columns:repeat(10,1fr);border-top:1px solid var(--ln);border-left:1px solid var(--ln)}
.wl li{position:relative;height:138px;border-right:1px solid var(--ln);border-bottom:1px solid var(--ln)}
.wl li img{position:absolute;inset:24% 18%;width:64%;height:52%;object-fit:contain}
.wl li.nm{display:grid;place-items:center;text-align:center;font-size:20px;font-weight:500;color:var(--tx)}
/* promises */
.pm-head{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:30px}.pm-head .kicker{margin:0 0 14px}
.pm{list-style:none;border-top:1px solid var(--ln)}
.pm li{display:grid;grid-template-columns:90px 560px 1fr;align-items:center;padding:24px 0;border-bottom:1px solid var(--ln)}
.pm-i{font-size:22px;color:var(--ac);font-weight:700}
.pm-k{font-size:92px;font-weight:700;letter-spacing:-.045em;line-height:1}
.pm-d{font-size:25px;line-height:1.5;color:var(--tx)}
.pm li:nth-child(5) .pm-k{color:var(--ac)}
/* start */
.st{display:grid;grid-template-columns:1fr 720px;gap:110px;align-items:center;height:100%}
.st-steps{list-style:none}
.st-steps li{display:flex;gap:30px;padding:32px 0;border-top:1px solid var(--ln)}
.st-steps li>span{font-size:22px;font-weight:700;color:var(--ac);padding-top:8px}
.st-steps h3{font-size:38px;font-weight:700;letter-spacing:-.02em}
.st-steps p{font-size:22px;line-height:1.55;color:var(--tx);margin-top:6px}
/* closing */
.close-sym{position:absolute;top:110px;left:120px;height:110px}
.close-h{position:absolute;left:110px;top:300px;font-size:200px;line-height:.92;font-weight:700;letter-spacing:-.055em}
.close-h span{display:block}.close-h span+span{color:var(--ob)}
.close-c{position:absolute;left:120px;right:120px;bottom:110px;display:flex;gap:140px;border-top:2px solid rgba(245,243,250,.6);padding-top:30px}
.close-c span{display:block;font-size:18px;letter-spacing:.16em;text-transform:uppercase;color:rgba(245,243,250,.75)}
.close-c b{font-size:46px;font-weight:700;letter-spacing:-.02em}
.back{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:34px}
.back img{height:150px}.back p{font-size:34px;font-weight:700;letter-spacing:-.01em}.back .lo{font-size:18px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;color:var(--mu)}
`;

const n = pages.length;
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>SayTamm — Company profile</title><style>${css}</style></head><body>
${pages.map((p, i) => {
  const light = p.theme === 'light' || p.theme === 'sand';
  const chrome = p.chapter ? `<img class="mark" src="${light ? SYM_B : SYM_W}" alt=""><div class="run"><span>SayTamm — Company profile</span><span>${esc(p.chapter)}</span><span>${String(i + 1).padStart(2, '0')} / ${n}</span></div>` : '';
  return `<section class="pg t-${p.theme}">${p.body}${chrome}</section>`;
}).join('\n')}
</body></html>`;

// ---------- render ----------
execFileSync('python3', ['-I', '-c', 'import sys,json\nfrom PIL import Image\nfor s,o,m in json.load(sys.stdin):\n  im=Image.open(s).convert("RGB"); im.thumbnail((m,m)); im.save(o,"JPEG",quality=85,optimize=True,progressive=True)'], { input: JSON.stringify([...toJpeg.values()]) });
const htmlPath = path.join(OUT, 'saytamm-profile-global.html');
fs.writeFileSync(htmlPath, html);
const require = createRequire(import.meta.url);
let playwright;
try { playwright = require('playwright'); } catch { playwright = require(execFileSync('npm', ['root', '-g']).toString().trim() + '/playwright'); }
const browser = await playwright.chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await page.goto(pathToFileURL(htmlPath).href, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
const broken = await page.evaluate(() => [...document.images].filter((i) => !i.complete || !i.naturalWidth).map((i) => i.src));
if (broken.length) throw new Error('broken images: ' + broken.join(', '));
const spill = await page.evaluate(() => [...document.querySelectorAll('.pg')].flatMap((pg, i) => {
  if (/t-bleed/.test(pg.className) && pg.querySelector('.collage,.bg')) return [];
  const r = pg.getBoundingClientRect();
  return [...pg.querySelectorAll('*')].filter((e) => { const b = e.getBoundingClientRect(); return b.width && !e.closest('svg') && (b.bottom > r.bottom + 1 || b.right > r.right + 1 || b.left < r.left - 1); }).slice(0, 3).map((e) => `p${i + 1}:${e.tagName}.${e.className}`);
}));
if (spill.length) console.warn('overflow:', spill.join(' | '));
await page.pdf({ path: path.join(OUT, 'SayTamm_Company_Profile_2026.pdf'), width: '1920px', height: '1080px', printBackground: true, preferCSSPageSize: true });
for (let i = 0; i < n; i++) await page.screenshot({ path: path.join(OUT, `p-${String(i + 1).padStart(2, '0')}.png`), clip: { x: 0, y: i * 1080, width: 1920, height: 1080 }, fullPage: true });
await browser.close();
fs.rmSync(tmp, { recursive: true, force: true });
console.log(`${n} pages → ${path.join(OUT, 'SayTamm_Company_Profile_2026.pdf')}`);
