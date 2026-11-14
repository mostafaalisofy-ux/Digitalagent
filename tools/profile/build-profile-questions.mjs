// SayTamm — "Six Questions": a light, poster-style English company profile (PDF, 16:9).
// Concept: the profile answers the six questions every new client asks first; the logo's 45° blade
// becomes a page-scale supergraphic (never mirrored, logo itself never redrawn) and image frames
// carry a 45° corner cut. Data from site/src, production view (no pending figures, no government
// logos). No founder page (owner, 2026-11-14).
// Usage (repo root):  node tools/profile/build-profile-questions.mjs [outDir]
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const SITE = path.join(ROOT, 'site');
const PUB = path.join(SITE, 'public');
const OUT = path.resolve(process.argv[2] || path.join(ROOT, 'handover', 'company-profile-questions'));
fs.mkdirSync(OUT, { recursive: true });

// ---------- site data, production view ----------
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'st-profile-q-'));
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
const P = (theme, q, body) => pages.push({ theme, q, body });
const QS = [
  ['Who are you?', 'A digital marketing & performance agency, and why it is called SayTamm.'],
  ['What do you actually do?', 'Nine services in four disciplines, run as one plan.'],
  ['How do you work?', 'From the first objective to the next round of planning.'],
  ['Show me the work.', 'Projects made by the SayTamm team.'],
  ['Who trusts you?', 'Clients who trusted the SayTamm team.'],
  ['What happens next?', 'Three steps from your brief to an agreed number.'],
];
const qLabel = (n) => `Q.0${n} — ${QS[n - 1][0]}`;
const cut = 'cut';
const qStart = {};
const Q = (n) => {
  qStart[n] = pages.length + 1;
  P('purple', null, `
  <div class="q-top"><span>Q.0${n}</span><span>/ 06</span></div>
  <div class="slash slash-q"></div>
  <h2 class="q-h">“${esc(QS[n - 1][0])}”</h2>
  <p class="q-sub">${esc(QS[n - 1][1])}</p>
  <p class="q-ask">Clients ask. We answer.</p>`);
};

// COVER
P('paper', null, `
  <div class="slash slash-cover"></div>
  <img class="cv-sym" src="${SYM_B}" alt="SayTamm">
  <h1 class="cv-h"><span>Say it.</span><span class="pp">Tamm it.</span></h1>
  <div class="cv-meta"><b>SayTamm</b><span>Company profile · 2026</span><span>A digital marketing &amp; performance agency</span></div>`);

// SIX QUESTIONS (contents)
P('paper', null, `
  <img class="mk" src="${SYM_B}" alt="">
  <div class="sq">
    <div><p class="kk">${'<span class="bl"></span>'}This profile</p><h2 class="h1">Six questions.<br><span class="pp">Straight answers.</span></h2>
      <p class="tx">Every new client asks us the same six questions first. This profile answers them, in order.</p></div>
    <ol class="sq-l">${QS.map(([q], i) => `<li><span class="sq-n">0${i + 1}</span><span class="sq-q">${esc(q)}</span><span class="sq-p" data-q="${i + 1}"></span></li>`).join('')}</ol>
  </div>`);

// Q1 — WHO
Q(1);
P('paper', 1, `
  <div class="who">
    <div><p class="kk"><span class="bl"></span>Who we are</p><h2 class="h1">${A.title.map(esc).join('<br>')}</h2></div>
    <div class="who-r"><p class="ld">${esc(A.intro[0])}</p><p class="tx">${esc(A.intro[1])} ${esc(A.intro[2])}</p></div>
  </div>
  <div class="name">
    <div class="name-ar" lang="ar" dir="rtl">قول تم</div>
    <div class="name-t"><p class="kk"><span class="bl"></span>The name</p><p class="ld">${esc(H.about.name)}</p></div>
  </div>`);
const F = H.about.facts;
P('bleed', 1, `
  <div class="quad4">
    <div class="c c1"><span class="v">${esc(F[0].v)}</span><span class="k">${esc(F[0].k)}</span></div>
    <div class="c c2"><span class="v">${esc(F[1].v)}</span><span class="k">${esc(F[1].k)}</span></div>
    <div class="c c3"><span class="v">${esc(F[2].v)}</span><span class="k">${esc(F[2].k)}</span></div>
    <div class="c c4"><span class="v">${esc(F[3].v)}</span><span class="k">Markets in the team’s track record</span>
      <ul>${A.regional.markets.map((m) => `<li>${esc(m)}</li>`).join('')}</ul></div>
  </div>`);
P('ink', 1, `
  <div class="slash slash-ph"></div>
  <div class="ph"><p class="kk"><span class="bl"></span>${esc(A.philosophy.eyebrow)}</p>
    <h2 class="ph-h">${A.philosophy.title.map(esc).join('<br>')}</h2>
    <div class="ph-b">${A.philosophy.body.map((p) => `<p>${esc(p)}</p>`).join('')}</div>
    <p class="ph-o">${esc(A.experience.origin)}</p></div>`);

// Q2 — WHAT
Q(2);
const tag = { strategy: 't1', creative: 't2', media: 't3', digital: 't4' };
const all = DISCIPLINES.flatMap((d) => d.services.map((s) => ({ s, d })));
P('paper', 2, `
  <div class="sv-h"><h2 class="h2">Nine services. <span class="pp">One objective.</span></h2>
    <ul class="legend">${DISCIPLINES.map((d) => `<li><i class="${tag[d.id] ?? 't1'}"></i>${esc(d.name.en)}</li>`).join('')}</ul></div>
  <ol class="sv">${all.map(({ s, d }, i) => `<li class="${cut}"><div class="sv-top"><span class="sv-n">${String(i + 1).padStart(2, '0')}</span><i class="${tag[d.id] ?? 't1'}"></i></div>
    <h3>${esc(s.name.en)}</h3><p>${esc(s.summary.en)}</p></li>`).join('')}</ol>`);
P('paper', 2, `
  <p class="kk"><span class="bl"></span>What sits inside each discipline</p><h2 class="h2 bands-h">Four disciplines. <span class="pp">One plan.</span></h2>
  <div class="bands">${DISCIPLINES.map((d) => `
    <section class="band ${tag[d.id] ?? 't1'}b"><div class="b-l"><span class="b-n">${d.n}</span><h3>${esc(d.name.en)}</h3></div>
      <p class="b-v">${esc(d.value.en)}</p>
      <ul class="b-s">${d.services.map((s) => `<li><b>${esc(s.name.en)}</b><span>${esc(s.includes.en.slice(0, 1).join(' · '))}</span></li>`).join('')}</ul></section>`).join('')}
  </div>`);

// Q3 — HOW
Q(3);
P('paper', 3, `
  <div class="hw-h"><p class="kk"><span class="bl"></span>${esc(H.approach.eyebrow)}</p><h2 class="h1">${esc(H.approach.title)}</h2><p class="tx">${esc(H.approach.intro)}</p></div>
  <div class="slash slash-stairs"></div>
  <ol class="stairs">${H.approach.steps.map((s, i) => `<li class="st${i} ${cut}"><span class="st-n">0${i + 1}</span><h3>${esc(s.k)}</h3><p>${esc(s.d)}</p></li>`).join('')}</ol>
  <p class="hw-loop"><span class="bl"></span>${esc(H.approach.loop)}</p>`);
P('ink', 3, `
  <div class="md">
    <div><p class="kk"><span class="bl"></span>${esc(A.model.eyebrow)}</p><h2 class="h1">${A.model.title.map(esc).join('<br>')}</h2>
      ${A.model.intro.map((p) => `<p class="tx lt">${esc(p)}</p>`).join('')}</div>
    <ol class="md-l">${DISCIPLINES.map((d, i) => `<li><span class="md-n">${d.n}</span><div><h3>${esc(d.name.en)}</h3><p>${esc(A.model.items[i])}</p></div></li>`).join('')}</ol>
  </div>`);

// Q4 — WORK (question page over a straight wall of work)
qStart[4] = pages.length + 1;
const wallSlugs = ['chery-saudi-models', 'niimee-posts', 'tech-hive-gaming', 'bitumat-posts', 'altopiano-posts', 'metro-food', 'mix-events', 'arhab-app',
  'alqimma-founding-day', 'dc-block-posts', 'fatora-plus-posts', 'siyaq-post', 'niimee-your-size', 'zahid-electra-appliances', 'gig-posts', 'xiaomi-wearables',
  'marriott-posts', 'jora-identity', 'cleanbasket-identity', 'beauty-lab-packaging', 'tech-hive-banner', 'chery-saudi-trust', 'ks-furniture-offer', 'exodus-travel-post'];
const wim = [];
for (const s of wallSlugs) { const w = work(s); (w.media.kind === 'images' ? w.media.images : [coverOf(w)]).slice(0, 2).filter((i) => i.w >= 380).forEach((i) => wim.push(i)); }
P('bleed', null, `
  <div class="ww">${wim.slice(0, 40).map((i) => `<div><img src="${asset(i.src, 520)}" alt=""></div>`).join('')}</div>
  <div class="ww-box"><div class="q-top"><span>Q.04</span><span>/ 06</span></div><h2 class="q-h sm">“Show me the work.”</h2><p class="q-sub">${esc(QS[3][1])}</p></div>`);

const meta = (w, n) => `<p class="w-meta"><span class="pp">W/${String(n).padStart(2, '0')}</span><span>${esc(w.sector.en)}</span><span>${esc(w.format.en)}</span></p>`;
const vert = (name) => `<div class="vname">${esc(name)}</div>`;
// W1 Chery
{ const w = work('chery-saudi-models'); const im = w.media.images;
  P('paper', 4, `${vert(w.client)}<div class="w1">
    <div class="w1-imgs">${im.slice(0, 4).map((i) => img(i, fit(i, 520), cut)).join('')}</div>
    <div class="w-txt row">${meta(w, 1)}<h3 class="w-t">${esc(w.title.en)}</h3><p class="tx">${esc(w.summary.en)}</p></div></div>`); }
// W2 Zahid
{ const w = work('zahid-electra-appliances'); const im = w.media.images;
  P('ink', 4, `<div class="w2-hero"><img src="${asset(im[0].src)}" alt=""></div>
    <div class="w2-txt">${meta(w, 2)}<h3 class="w-c">${esc(w.client)}</h3><p class="w-t">${esc(w.title.en)}</p><p class="tx lt">${esc(w.summary.en)}</p>
      <div class="w2-sm">${img(im[1], fit(im[1], 190), cut)}${img(im[2], fit(im[2], 190), cut)}</div></div>`); }
// W3 niimee
{ const w = work('niimee-your-size'); const im = w.media.images;
  P('sand', 4, `${vert(w.client)}<div class="w3">${img(im[0], fit(im[0], 820), cut)}<div class="w3-st">${img(im[1], fit(im[1], 400), cut)}${img(im[2], fit(im[2], 400), cut)}</div>
    <div class="w-txt">${meta(w, 3)}<h3 class="w-t">${esc(w.title.en)}</h3><p class="tx">${esc(w.summary.en)}</p></div></div>`); }
// W4 Clean Basket
{ const w = work('cleanbasket-identity'); const im = w.media.images;
  P('paper', 4, `<div class="w4"><div class="w-txt">${meta(w, 4)}<h3 class="w-c">${esc(w.client)}</h3><p class="w-t">${esc(w.title.en)}</p><p class="tx">${esc(w.summary.en)}</p></div>
    <div class="w4-g">${img(im[1], fit(im[1], 500), cut + ' big')}${img(im[0], fit(im[0], 240), cut)}${img(im[2], fit(im[2], 240), cut)}</div></div>`); }
// W5 split: Beauty Lab | Tech Hive
{ const b = work('beauty-lab-packaging'); const t = work('tech-hive-gaming');
  P('bleed', 4, `<div class="split">
    <div class="sp sp-l">${meta(b, 5)}<h3 class="w-c sm">${esc(b.client)}</h3><p class="w-t">${esc(b.title.en)}</p>
      <div class="sp-i">${b.media.images.slice(1, 3).map((i) => img(i, fit(i, 520), cut)).join('')}</div></div>
    <div class="sp sp-r">${meta(t, 6)}<h3 class="w-c sm">${esc(t.client)}</h3><p class="w-t">${esc(t.title.en)}</p>
      <div class="sp-i">${t.media.images.slice(0, 2).map((i) => img(i, fit(i, 520), cut)).join('')}</div></div></div>`); }
// W6 more
{ const more = ['xiaomi-wearables', 'gig-posts', 'marriott-posts', 'metro-food', 'altopiano-posts', 'bitumat-posts', 'arhab-app', 'mix-events', 'fatora-plus-posts', 'alqimma-founding-day', 'dc-block-posts', 'jora-identity'];
  const brands = new Set(SAYTAMM_WORK.map((w) => w.client)).size;
  P('paper', 4, `<div class="mw-h"><h2 class="h2">${SAYTAMM_WORK.length} projects. <span class="pp">${brands} brands.</span></h2><p class="tx">More from the SayTamm work wall: electronics, insurance, hospitality, food, restaurants, building materials, mobility, events and software.</p></div>
    <ul class="mw">${more.map((s) => { const w = work(s); return `<li><div class="${cut}"><img src="${asset(coverOf(w).src, 700)}" alt=""></div><b>${esc(w.client)}</b><span>${esc(w.sector.en)}</span></li>`; }).join('')}</ul>`); }

// Q5 — CLIENTS
Q(5);
const list = [...CLIENTS.filter((c) => c.logo), ...CLIENTS.filter((c) => !c.logo)];
P('paper', 5, `<div class="cl-h"><h2 class="h2">${esc(H.clients.title)}</h2><span class="cl-c">${list.length}</span></div>
  <ul class="lg">${list.map((c) => `<li${c.tile ? ` style="background:${c.tile}"` : ''} class="${c.fill ? 'fill' : ''}">${c.logo ? `<img src="${asset(c.logo.src)}" alt="">` : `<span>${esc(c.name.en)}</span>`}</li>`).join('')}${Array.from({ length: (7 - (list.length % 7)) % 7 }, () => '<li class="e"></li>').join('')}</ul>`);
P('ink', 5, `<div class="cl-h"><h2 class="h2">And ${wall.length + named.length} more.</h2><span class="cl-c pp">+${wall.length + named.length}</span></div>
  <ul class="wl">${wall.map((c) => `<li><img src="${asset(c.logo.src)}" alt=""></li>`).join('')}${named.map((c) => `<li class="nm"><span>${esc(c.name)}</span></li>`).join('')}</ul>`);

// Q6 — NEXT
Q(6);
P('paper', 6, `<div class="nx-h"><p class="kk"><span class="bl"></span>Start a project</p><h2 class="h1">Tell us the goal.<br><span class="pp">We take it from there.</span></h2></div>
  <ol class="nx">
    <li class="${cut}"><span>01</span><h3>Share the brief</h3><p>Your objective, your market and your timeline.</p></li>
    <li class="${cut}"><span>02</span><h3>Get our approach</h3><p>How we would approach it, and what we would need from you to start.</p></li>
    <li class="${cut}"><span>03</span><h3>Agree the number</h3><p>One business objective that the plan, the work and the reporting all answer to.</p></li>
  </ol>
  <p class="vals">${['Clarity', 'Ownership', 'Speed', 'Precision', 'Impact'].map((v) => `<span>${v}</span>`).join('<i class="bl"></i>')}</p>`);

// CLOSING
P('ink', null, `<div class="slash slash-close"></div><img class="cv-sym" src="${SYM_W}" alt="">
  <h2 class="cl-big"><span>You say it.</span><span class="pp">We Tamm it.</span></h2>
  <div class="cl-ct"><div><span>Email</span><b>${esc(S.email)}</b></div><div><span>Web</span><b>www.saytamm.com</b></div></div>`);
P('purple', null, `<div class="back"><img src="${SYM_WHITE}" alt="SayTamm"><p>Say it. Tamm it.</p></div>`);

// contents page numbers
pages[1].body = pages[1].body.replace(/<span class="sq-p" data-q="(\d)"><\/span>/g, (_, n) => `<span class="sq-p">p. ${String(qStart[n]).padStart(2, '0')}</span>`);

// ---------- CSS ----------
const css = `
@font-face{font-family:Satoshi;src:url(${pathToFileURL(path.join(SAT, 'Satoshi-400.woff2')).href});font-weight:400}
@font-face{font-family:Satoshi;src:url(${pathToFileURL(path.join(SAT, 'Satoshi-500.woff2')).href});font-weight:500}
@font-face{font-family:Satoshi;src:url(${pathToFileURL(path.join(SAT, 'Satoshi-700.woff2')).href});font-weight:700}
@font-face{font-family:Plex;src:url(${pathToFileURL(path.join(PLEX, 'ibm-plex-sans-arabic-arabic-700-normal.woff2')).href});font-weight:700}
@page{size:1920px 1080px;margin:0}
:root{--ink:#09090D;--gr:#17171E;--pa:#F5F3FA;--mu:#7d7987;--pp:#6C35FF;--li:#E4DCFF;--sand:#ECE5DA}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:Satoshi,Plex,sans-serif;color:var(--ink);-webkit-print-color-adjust:exact;print-color-adjust:exact}
[lang=ar]{font-family:Plex,sans-serif}
.pg{position:relative;width:1920px;height:1080px;overflow:hidden;padding:110px 120px 120px;break-after:page}
.pg:last-child{break-after:auto}
.t-paper{background:var(--pa)} .t-sand{background:var(--sand)} .t-ink{background:var(--ink);color:var(--pa)} .t-purple{background:var(--pp);color:var(--pa)} .t-bleed{padding:0;background:var(--ink)}
.pp{color:var(--pp)} .t-purple .pp{color:var(--ink)}
.bl{display:inline-block;width:40px;height:7px;background:var(--pp);transform:skewX(-45deg);margin-right:20px;vertical-align:middle}
.kk{display:flex;align-items:center;font-size:20px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--mu);margin-bottom:30px}
.t-ink .kk{color:#9a96a6}
.h1{font-size:92px;line-height:.98;font-weight:700;letter-spacing:-.04em}
.h2{font-size:70px;line-height:1;font-weight:700;letter-spacing:-.035em}
.ld{font-size:32px;line-height:1.42;font-weight:500;letter-spacing:-.01em}
.tx{font-size:23px;line-height:1.6;color:#45424e;margin-top:18px}.tx.lt,.t-ink .tx{color:#c9c6d1}
.cut{clip-path:polygon(0 0,calc(100% - 56px) 0,100% 56px,100% 100%,0 100%)}
img.cut{display:block}
/* the blade, enlarged into a page-scale supergraphic (45°, never mirrored) */
.slash{position:absolute;top:0;height:1080px;background:var(--pp)}
.slash-cover{left:1080px;width:1600px;clip-path:polygon(1080px 0,1600px 0,520px 1080px,0 1080px)}
.slash-q{left:1180px;width:1400px;background:var(--ink);clip-path:polygon(1080px 0,1300px 0,220px 1080px,0 1080px)}
.slash-ph{left:900px;width:1600px;clip-path:polygon(1080px 0,1180px 0,100px 1080px,0 1080px)}
.slash-stairs{left:150px;width:1700px;height:1080px;background:var(--li);clip-path:polygon(1610px 330px,1700px 330px,950px 1080px,860px 1080px)}
.slash-close{left:820px;width:1700px;clip-path:polygon(1080px 0,1700px 0,620px 1080px,0 1080px)}
/* chrome */
.mk,.mark{position:absolute;top:50px;left:120px;height:34px}
.run{position:absolute;left:120px;right:120px;bottom:48px;display:flex;justify-content:space-between;font-size:15px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;color:var(--mu)}
.t-ink .run{color:#8d8a97}.t-bleed .run{color:rgba(245,243,250,.75)}
/* cover */
.cv-sym{position:absolute;top:100px;left:120px;height:130px}
.cv-h{position:absolute;left:104px;bottom:250px;font-size:260px;line-height:.86;font-weight:700;letter-spacing:-.06em}
.cv-h span{display:block}
.cv-meta{position:absolute;left:122px;bottom:110px;display:flex;gap:40px;font-size:22px;color:var(--mu)}.cv-meta b{color:var(--ink)}
/* six questions */
.sq{display:grid;grid-template-columns:640px 1fr;gap:110px;align-items:start;margin-top:40px}
.sq-l{list-style:none;border-top:2px solid var(--ink)}
.sq-l li{display:grid;grid-template-columns:80px 1fr 90px;align-items:baseline;padding:22px 0;border-bottom:1px solid rgba(9,9,13,.15)}
.sq-n{font-size:22px;font-weight:700;color:var(--pp)}.sq-q{font-size:52px;font-weight:700;letter-spacing:-.03em}.sq-p{font-size:18px;color:var(--mu);text-align:right}
/* question page */
.q-top{display:flex;gap:14px;font-size:24px;font-weight:700;letter-spacing:.1em}
.q-h{position:absolute;left:110px;top:250px;width:1300px;font-size:178px;line-height:.92;font-weight:700;letter-spacing:-.055em;z-index:1}
.q-h.sm{position:static;width:auto;font-size:120px;margin-top:34px}
.q-sub{position:absolute;left:120px;bottom:120px;font-size:30px;font-weight:500;max-width:900px;z-index:1}
.q-ask{position:absolute;right:120px;top:114px;font-size:18px;letter-spacing:.16em;text-transform:uppercase;color:rgba(245,243,250,.75);z-index:1}
/* who */
.who{display:grid;grid-template-columns:1fr 760px;gap:110px}
.who-r{padding-top:62px}
.name{position:absolute;left:120px;right:120px;bottom:120px;display:grid;grid-template-columns:600px 1fr;gap:110px;align-items:end;border-top:2px solid var(--ink);padding-top:30px}
.name-ar{font-size:170px;line-height:1.05;font-weight:700;color:var(--pp)}
/* numbers quadrant */
.quad4{display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;width:1920px;height:1080px}
.quad4 .c{position:relative;padding:70px 90px;display:flex;flex-direction:column;justify-content:flex-end}
.quad4 .v{font-size:250px;line-height:.82;font-weight:700;letter-spacing:-.06em;font-variant-numeric:lining-nums}
.quad4 .k{font-size:24px;line-height:1.4;margin-top:22px;max-width:620px}
.c1{background:var(--pp);color:var(--pa)}.c2{background:var(--pa);color:var(--ink)}.c3{background:var(--ink);color:var(--pa)}.c4{background:var(--li);color:var(--ink)}
.c4 ul{list-style:none;display:flex;flex-wrap:wrap;gap:10px;margin-top:20px}.c4 li{font-size:22px;font-weight:700;border:2px solid var(--ink);padding:8px 18px}
.c4 .v{position:absolute;top:60px;right:90px}
/* philosophy */
.ph{position:relative;z-index:1;max-width:1180px}
.ph-h{font-size:128px;line-height:.92;font-weight:700;letter-spacing:-.05em}
.ph-b{display:grid;grid-template-columns:repeat(3,1fr);gap:40px;margin-top:60px}.ph-b p{font-size:23px;line-height:1.55;color:#c9c6d1;border-top:2px solid var(--pp);padding-top:18px}
.ph-o{font-size:20px;line-height:1.6;color:#8d8a97;margin-top:50px;max-width:1000px}
/* services grid */
.sv-h{display:flex;justify-content:space-between;align-items:flex-end;margin:0 0 34px}
.legend{list-style:none;display:flex;gap:24px;font-size:17px;font-weight:500;color:var(--mu)}.legend li{display:flex;align-items:center;gap:10px}
i.t1,i.t2,i.t3,i.t4{display:inline-block;width:26px;height:9px;transform:skewX(-45deg)}
.t1{background:var(--pp)}i.t2{background:var(--ink)}i.t3{background:#B79CFF}i.t4{background:#5B5866}
.sv{list-style:none;display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.sv li{background:#fff;padding:26px 40px 26px 30px;height:236px}
.sv-top{display:flex;justify-content:space-between;align-items:center}.sv-n{font-size:20px;font-weight:700;color:var(--pp)}
.sv h3{font-size:36px;font-weight:700;letter-spacing:-.025em;line-height:1.08;margin:18px 0 10px}
.sv p{font-size:19px;line-height:1.5;color:#55525e}
/* bands */
.bands{display:grid;gap:14px}.bands-h{margin:-10px 0 24px;font-size:58px}
.band{display:grid;grid-template-columns:470px 470px 1fr;gap:40px;align-items:start;background:#fff;padding:18px 34px;border-left:12px solid var(--pp)}
.t2b{border-left-color:var(--ink)}.t3b{border-left-color:#B79CFF}.t4b{border-left-color:#5B5866}
.b-n{font-size:18px;font-weight:700;color:var(--pp)}.band h3{font-size:36px;font-weight:700;letter-spacing:-.025em;line-height:1.1;margin-top:4px}
.b-v{font-size:19px;line-height:1.5;color:#55525e}
.b-s{list-style:none;display:grid;grid-template-columns:1fr 1fr;gap:10px 24px}.b-s li{display:flex;flex-direction:column}.b-s b{font-size:20px}.b-s span{font-size:16px;color:var(--mu);line-height:1.4}
/* stairs */
.hw-h{max-width:820px;position:relative;z-index:1}
.stairs{list-style:none}
.stairs li{position:absolute;width:390px;height:250px;background:#fff;padding:26px 46px 26px 28px;border-top:6px solid var(--pp)}
.st0{left:120px;bottom:120px}.st1{left:560px;bottom:260px}.st2{left:1000px;bottom:400px}.st3{left:1440px;bottom:540px;background:var(--pp)!important;color:var(--pa)}
.st-n{font-size:20px;font-weight:700;color:var(--pp)}.st3 .st-n{color:var(--pa)}
.stairs h3{font-size:42px;font-weight:700;letter-spacing:-.03em;margin:6px 0 8px}.stairs p{font-size:18.5px;line-height:1.5;color:#55525e}.st3 p{color:var(--pa)}
.hw-loop{position:absolute;right:120px;bottom:120px;width:780px;font-size:24px;font-weight:700;display:flex;align-items:center}
/* model */
.md{display:grid;grid-template-columns:640px 1fr;gap:110px}
.md-l{list-style:none;border-top:1px solid rgba(245,243,250,.18)}
.md-l li{display:grid;grid-template-columns:70px 1fr;padding:24px 0;border-bottom:1px solid rgba(245,243,250,.18)}
.md-n{font-size:20px;font-weight:700;color:var(--pp);padding-top:8px}.md-l h3{font-size:36px;font-weight:700;letter-spacing:-.02em}.md-l p{font-size:20px;line-height:1.5;color:#c9c6d1;margin-top:6px}
/* work wall question */
.ww{position:absolute;inset:0;display:grid;grid-template-columns:repeat(8,1fr);grid-auto-rows:270px;gap:6px}
.ww div{overflow:hidden}.ww img{width:100%;height:100%;object-fit:cover;display:block}
.ww-box{position:absolute;left:120px;top:150px;width:1060px;background:var(--pp);color:var(--pa);padding:56px 60px 60px;clip-path:polygon(0 0,calc(100% - 110px) 0,100% 110px,100% 100%,0 100%)}
.ww-box .q-sub{position:static;margin-top:26px}
/* work */
.vname{position:absolute;left:84px;bottom:120px;writing-mode:vertical-rl;transform:rotate(180deg);font-size:118px;line-height:1;font-weight:700;letter-spacing:-.05em}
.w-meta{display:flex;gap:24px;font-size:16px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--mu);margin-bottom:14px;flex-wrap:wrap}
.w-c{font-size:110px;line-height:.92;font-weight:700;letter-spacing:-.05em}.w-c.sm{font-size:74px}
.w-t{font-size:30px;font-weight:700;color:var(--pp);margin-top:10px;letter-spacing:-.01em}
.w1{position:absolute;left:280px;right:120px;top:110px;bottom:120px;display:flex;flex-direction:column;justify-content:space-between}
.w1-imgs{display:flex;gap:22px}
.w-txt.row{display:grid;grid-template-columns:1fr 820px;column-gap:60px;align-items:end}.w-txt.row .w-meta{grid-column:1/-1}.w-txt.row .tx{grid-column:2;grid-row:2;margin:0}
.w2-hero{position:absolute;right:0;top:0;width:1120px;height:1080px;clip-path:polygon(300px 0,100% 0,100% 100%,0 100%)}
.w2-hero img{width:100%;height:100%;object-fit:cover;object-position:60% 50%}
.w2-txt{position:relative;width:720px;margin-top:40px}.w2-sm{display:flex;gap:16px;margin-top:40px}
.w3{position:absolute;left:280px;right:120px;top:120px;display:flex;gap:24px}.w3-st{display:flex;flex-direction:column;gap:20px}.w3 .w-txt{padding-left:30px;flex:1;align-self:flex-end;padding-bottom:20px}
.w3 .tx{color:#4a4339}
.w4{display:grid;grid-template-columns:540px 1fr;gap:60px;align-items:center;height:100%}
.w4-g{display:grid;grid-template-columns:auto auto;grid-template-rows:auto auto;gap:20px;justify-content:end}.w4-g .big{grid-row:span 2;height:500px!important;width:auto!important}
.split{display:grid;grid-template-columns:1fr 1fr;height:1080px}
.sp{padding:110px 90px 120px 120px;display:flex;flex-direction:column}.sp-l{background:var(--sand);color:var(--ink)}.sp-r{background:linear-gradient(160deg,#3a1891,#09090D);color:var(--pa)}
.sp-r .w-meta{color:#b8b3c6}.sp-r .w-t{color:#B79CFF}
.sp-i{display:flex;gap:20px;margin-top:auto}
.mw-h{display:grid;grid-template-columns:1fr 680px;gap:60px;align-items:end;margin-bottom:30px}.mw-h .tx{margin:0}
.mw{list-style:none;display:grid;grid-template-columns:repeat(6,1fr);gap:22px 18px}
.mw div{aspect-ratio:6/5;overflow:hidden}.mw img{width:100%;height:100%;object-fit:cover;display:block}
.mw b{display:block;font-size:19px;margin-top:10px}.mw span{font-size:15px;color:var(--mu)}
/* clients */
.cl-h{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:36px}.cl-c{font-size:120px;line-height:.8;font-weight:700;letter-spacing:-.05em;color:var(--pp)}
.lg{list-style:none;display:grid;grid-template-columns:repeat(7,1fr);gap:12px}
.lg li{position:relative;height:160px;background:#fff}
.lg li img{position:absolute;inset:22% 20%;width:60%;height:56%;object-fit:contain}.lg li.fill img{inset:0;width:100%;height:100%;object-fit:cover}
.lg li span{position:absolute;inset:0;display:grid;place-items:center;font-size:21px;font-weight:700;color:#4a4753}
.lg li.e{background:transparent;border:2px dashed rgba(9,9,13,.08)}
.wl{list-style:none;display:grid;grid-template-columns:repeat(10,1fr);gap:10px}
.wl li{position:relative;height:132px;background:var(--gr)}
.wl li img{position:absolute;inset:24% 18%;width:64%;height:52%;object-fit:contain}
.wl li.nm{display:grid;place-items:center;text-align:center;font-size:19px;font-weight:700;color:#c9c6d1}
/* next */
.nx{list-style:none;display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:60px}
.nx li{background:#fff;padding:34px 70px 40px 36px;min-height:280px}.nx span{font-size:22px;font-weight:700;color:var(--pp)}
.nx h3{font-size:46px;font-weight:700;letter-spacing:-.03em;margin:10px 0 12px}.nx p{font-size:22px;line-height:1.5;color:#55525e}
.vals{position:absolute;left:120px;right:120px;bottom:120px;display:flex;align-items:center;justify-content:space-between;font-size:56px;font-weight:700;letter-spacing:-.03em;border-top:2px solid var(--ink);padding-top:30px}
.vals .bl{margin:0}
/* closing */
.cl-big{position:absolute;left:104px;top:290px;font-size:210px;line-height:.9;font-weight:700;letter-spacing:-.06em;z-index:1}.cl-big span{display:block}
.t-ink .cl-big .pp{color:var(--pa);-webkit-text-stroke:0}
.cl-ct{position:absolute;left:120px;bottom:110px;display:flex;gap:120px;z-index:1}.cl-ct span{display:block;font-size:17px;letter-spacing:.16em;text-transform:uppercase;color:#9a96a6}.cl-ct b{font-size:44px;font-weight:700;letter-spacing:-.02em}
.back{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:30px}.back img{height:160px}.back p{font-size:34px;font-weight:700}
`;

const n = pages.length;
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>SayTamm — Company profile</title><style>${css}</style></head><body>
${pages.map((p, i) => {
  const darkish = p.theme === 'ink' || p.theme === 'bleed';
  const chrome = p.q ? `<img class="mark" src="${darkish ? SYM_W : SYM_B}" alt=""><div class="run"><span>SayTamm — Company profile</span><span>${esc(qLabel(p.q))}</span><span>${String(i + 1).padStart(2, '0')} / ${n}</span></div>` : '';
  return `<section class="pg t-${p.theme}">${p.body}${chrome}</section>`;
}).join('\n')}
</body></html>`;

// ---------- render ----------
execFileSync('python3', ['-I', '-c', 'import sys,json\nfrom PIL import Image\nfor s,o,m in json.load(sys.stdin):\n  im=Image.open(s).convert("RGB"); im.thumbnail((m,m)); im.save(o,"JPEG",quality=85,optimize=True,progressive=True)'], { input: JSON.stringify([...toJpeg.values()]) });
const htmlPath = path.join(OUT, 'saytamm-profile-questions.html');
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
  if (/t-bleed/.test(pg.className)) return [];
  const r = pg.getBoundingClientRect();
  return [...pg.querySelectorAll('*')].filter((e) => { const b = e.getBoundingClientRect(); return b.width && !e.closest('svg') && !e.classList.contains('slash') && (b.bottom > r.bottom + 1 || b.right > r.right + 1 || b.left < r.left - 1); }).slice(0, 3).map((e) => `p${i + 1}:${e.tagName}.${e.className}`);
}));
if (spill.length) console.warn('overflow:', spill.join(' | '));
await page.pdf({ path: path.join(OUT, 'SayTamm_Company_Profile_2026_SixQuestions.pdf'), width: '1920px', height: '1080px', printBackground: true, preferCSSPageSize: true });
for (let i = 0; i < n; i++) await page.screenshot({ path: path.join(OUT, `p-${String(i + 1).padStart(2, '0')}.png`), clip: { x: 0, y: i * 1080, width: 1920, height: 1080 }, fullPage: true });
await browser.close();
fs.rmSync(tmp, { recursive: true, force: true });
console.log(`${n} pages → ${path.join(OUT, 'SayTamm_Company_Profile_2026_SixQuestions.pdf')}`);
