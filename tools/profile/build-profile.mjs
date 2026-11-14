// SayTamm company profile — builds a client-ready PDF (Arabic + English) from the website's own data.
// Content comes only from site/src (production gating forced: no pending figures, no government logos).
// Usage (from the repo root):  node tools/profile/build-profile.mjs [outDir]
// Needs: site/node_modules (npm ci), Satoshi fetched into site/public/fonts/satoshi, Playwright + Chromium.
// The PDF embeds Satoshi: send it to clients as a PDF only; never upload the font files themselves.
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const SITE = path.join(ROOT, 'site');
const PUB = path.join(SITE, 'public');
const OUT = path.resolve(process.argv[2] || path.join(ROOT, 'handover', 'company-profile'));
fs.mkdirSync(OUT, { recursive: true });

// ---------- 1. load the site's TypeScript data with production gating ----------
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'st-profile-'));
for (const d of ['config', 'data', 'i18n']) fs.cpSync(path.join(SITE, 'src', d), path.join(tmp, d), { recursive: true });
fs.writeFileSync(path.join(tmp, 'package.json'), '{"type":"module"}');
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
for (const f of walk(tmp).filter((f) => f.endsWith('.ts'))) {
  let s = fs.readFileSync(f, 'utf8').replace(/from '(\.\.?\/[^']+)'/g, "from '$1.ts'");
  if (f.endsWith(path.join('config', 'site.ts'))) {
    const before = s;
    s = s.replace("import.meta.env.PUBLIC_STAGE !== 'production'", 'false'); // production view only
    if (s === before) throw new Error('could not force production stage in site.ts');
  }
  fs.writeFileSync(f, s);
}
const imp = (p) => import(pathToFileURL(path.join(tmp, p)).href);
const { SITE: S } = await imp('config/site.ts');
const { CLIENTS, visibleWall, visibleBrands } = await imp('data/clients.ts');
const { DISCIPLINES } = await imp('data/services.ts');
const { SAYTAMM_WORK, coverOf } = await imp('data/work.ts');
const { HOME } = await imp('i18n/home.ts');
const { UI } = await imp('i18n/ui.ts').catch(() => ({}));
if (S.preview) throw new Error('profile must use the production view');
const wall = visibleWall();
const named = visibleBrands();
if (wall.some((c) => c.permission === 'pending') || named.some((c) => c.permission === 'pending')) throw new Error('pending permission leaked');

// ---------- helpers ----------
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// Photos and work images are re-encoded as JPEG (Chromium embeds JPEG as-is; WebP would be stored
// uncompressed and make the PDF ~25 MB). Logos keep their original files (transparency).
const JPG = path.join(tmp, 'jpg');
fs.mkdirSync(JPG, { recursive: true });
const toJpeg = [];
const asset = (p) => {
  const src = path.join(PUB, p.replace(/^\//, ''));
  if (/^\/(work|team)\/.+\.webp$/.test(p)) {
    const out = path.join(JPG, p.replace(/^\//, '').replace(/\//g, '__').replace(/\.webp$/, '.jpg'));
    if (!toJpeg.some(([s]) => s === src)) toJpeg.push([src, out]);
    return pathToFileURL(out).href;
  }
  return pathToFileURL(src).href;
};
const font = (p) => pathToFileURL(p).href;
const SAT = path.join(PUB, 'fonts', 'satoshi');
if (!fs.existsSync(path.join(SAT, 'Satoshi-400.woff2'))) throw new Error('Satoshi missing: run npm run fetch-fonts (scripts/fetch-satoshi.mjs) in site/');
const PLEX = path.join(SITE, 'node_modules', '@fontsource', 'ibm-plex-sans-arabic', 'files');
const work = (slug) => SAYTAMM_WORK.find((w) => w.slug === slug) ?? (() => { throw new Error('missing project ' + slug); })();

// Justified image row: same height for every image, total width ≤ maxW, height ≤ maxH.
function row(images, maxW, maxH, gap = 24) {
  const ar = images.map((i) => i.w / i.h);
  let h = (maxW - gap * (images.length - 1)) / ar.reduce((a, b) => a + b, 0);
  h = Math.min(h, maxH);
  return `<div class="row" style="gap:${gap}px">${images
    .map((i, k) => `<img src="${asset(i.src)}" style="width:${Math.round(ar[k] * h)}px;height:${Math.round(h)}px" alt="">`)
    .join('')}</div>`;
}

const FEATURED = [
  ['chery-saudi-models', [0, 1, 2]],
  ['zahid-electra-appliances', [0, 1, 2]],
  ['niimee-your-size', [0, 1, 2]],
  ['cleanbasket-identity', [0, 1, 2]],
  ['beauty-lab-packaging', [0, 1, 2]],
  ['tech-hive-gaming', [0, 1, 2, 3]],
];
const MOSAIC = ['gig-posts', 'xiaomi-wearables', 'marriott-posts', 'bitumat-posts', 'metro-food', 'arhab-app', 'altopiano-posts',
  'mix-events', 'fatora-plus-posts', 'alqimma-founding-day', 'dc-block-posts', 'siyaq-post', 'niimee-the-dot', 'jora-identity'];

// ---------- copy (only the site's approved strings; profile-only labels kept minimal) ----------
const L = {
  en: {
    doc: 'Company profile', year: '2026', tagline: ['Say it.', 'Tamm it.'], kind: 'Digital marketing & performance agency',
    who: 'Who we are', why: 'Why SayTamm', values: 'What we hold ourselves to', valuesList: ['Clarity', 'Ownership', 'Speed', 'Precision', 'Impact'],
    services: 'Services', servicesTitle: ['Nine services.', 'One objective.'], includes: 'Includes',
    work: 'Selected work', workTitle: ['Work made by', 'the SayTamm team.'], workIntro: 'Posts, campaigns, identities and packaging for brands across automotive, retail, fashion, food, technology and building materials.',
    moreWork: 'More from the work wall', clients: 'Clients', clientsMore: 'Also among our clients',
    founder: 'Leadership', contact: 'Start a project', email: 'Email', web: 'Website', page: 'p.',
  },
  ar: {
    doc: 'ملف الشركة', year: '2026', tagline: ['قول.', 'تم.'], kind: 'وكالة تسويق رقمي وأداء',
    who: 'من نحن', why: 'لماذا «قول تم»؟', values: 'ما نلتزم به', valuesList: ['الوضوح', 'المسؤولية', 'السرعة', 'الدقة', 'الأثر'],
    services: 'خدماتنا', servicesTitle: ['تسع خدمات.', 'هدف واحد.'], includes: 'تشمل',
    work: 'أعمال مختارة', workTitle: ['أعمال من صنع', 'فريق قول تم.'], workIntro: 'منشورات وحملات وهويات وتغليف لعلامات في السيارات والتجزئة والأزياء والأغذية والتقنية ومواد البناء.',
    moreWork: 'المزيد من جدار الأعمال', clients: 'العملاء', clientsMore: 'ومن عملائنا أيضاً',
    founder: 'القيادة', contact: 'ابدأ مشروعك', email: 'البريد', web: 'الموقع', page: 'ص',
  },
};

function build(lang) {
  const t = L[lang];
  const H = HOME[lang];
  const A = H.aboutPage;
  const dir = lang === 'ar' ? 'rtl' : 'ltr';
  const pages = [];
  const total = () => pages.length;
  const page = (cls, body, { chrome = true } = {}) => pages.push({ cls, body, chrome });
  const eyebrow = (s) => `<p class="eb"><span class="rule"></span>${esc(s)}</p>`;
  const title = (lines, cls = 'h1') => `<h2 class="${cls}">${lines.map((l, i) => `<span${i === lines.length - 1 ? ' class="acc-line"' : ''}>${esc(l)}</span>`).join('')}</h2>`;
  const ps = (arr, cls = '') => arr.map((p) => `<p class="${cls}">${esc(p)}</p>`).join('');

  // 1 cover
  page('cover', `
    <img class="cover__sym" src="${asset('/brand/SayTamm_Symbol_Signature_White-Purple.svg')}" alt="SayTamm">
    <div class="cover__txt">
      <p class="eb"><span class="rule"></span>${esc(t.kind)}</p>
      <h1 class="cover__h">${t.tagline.map((l, i) => `<span${i ? ' class="acc"' : ''}>${esc(l)}</span>`).join('')}</h1>
      <p class="cover__sub">${esc(lang === 'ar' ? 'في قول تم، نجمع الاستراتيجية والإبداع والإعلانات والتقنية في منظومة واحدة.' : 'SayTamm brings strategy, creative, media and technology together under one connected approach to growth.')}</p>
    </div>
    <div class="cover__foot"><span>${esc(t.doc)} · <bdi class="latin">${t.year}</bdi></span><span class="latin" dir="ltr">www.saytamm.com</span></div>`, { chrome: false });

  // 2 who we are + facts
  page('who', `
    <div class="cols2">
      <div>${eyebrow(t.who)}${title(A.title)}</div>
      <div class="lead-col">${ps(A.intro, 'lead')}</div>
    </div>
    <div class="facts">${H.about.facts.map((f) => `<div class="fact"><div class="fact__v"><bdi class="latin">${esc(f.v)}</bdi></div><div class="fact__k">${esc(f.k)}</div></div>`).join('')}</div>`);

  // 3 why SayTamm: name + origin + philosophy + values
  page('why', `
    <div class="cols2">
      <div>${eyebrow(t.why)}<p class="quote">${esc(H.about.name)}</p><p class="body mt">${esc(A.experience.origin)}</p></div>
      <div>${eyebrow(A.philosophy.eyebrow)}${title(A.philosophy.title, 'h2')}${ps(A.philosophy.body, 'body')}
        <p class="eb mt-l"><span class="rule"></span>${esc(t.values)}</p>
        <ul class="values">${t.valuesList.map((v, i) => `<li><span class="num latin">0${i + 1}</span>${esc(v)}</li>`).join('')}</ul>
      </div>
    </div>`);

  // 4 operating model: one team, four disciplines
  page('model', `
    <div class="cols2 top">
      <div>${eyebrow(A.model.eyebrow)}${title(A.model.title)}</div>
      <div class="lead-col">${ps(A.model.intro, 'body')}</div>
    </div>
    <div class="grid4">${DISCIPLINES.map((d, i) => `
      <div class="card"><span class="num latin">${d.n}</span><h3>${esc(d.name[lang])}</h3><p>${esc(A.model.items[i] ?? d.value[lang])}</p></div>`).join('')}
    </div>`);

  // services: Strategy + Media (one service each), then Creative (4) and Digital (3) on their own pages
    const groups = [[DISCIPLINES[0], DISCIPLINES[2]], [DISCIPLINES[1]], [DISCIPLINES[3]]];
  for (const group of groups) {
    const solo = group.length === 1;
    page('services', `
      <div class="svc-head">${eyebrow(t.services)}${title(t.servicesTitle, 'h2')}</div>
      <div class="svc-cols">${group.map((d) => `
        <section class="disc${solo ? ' disc--solo' : ''}">
          <header><span class="num latin">${d.n}</span><h3>${esc(d.name[lang])}</h3><p>${esc(d.value[lang])}</p></header>
          <div class="svc-grid" style="grid-template-columns:repeat(${solo ? Math.min(d.services.length, 4) : 1},1fr)">${d.services.map((s) => `
            <div class="svc"><h4>${esc(s.name[lang])}</h4><p class="svc__sum">${esc(s.summary[lang])}</p>
              <ul>${s.includes[lang].slice(0, solo ? 4 : 6).map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div>`).join('')}
          </div>
        </section>`).join('')}
      </div>`);
  }

  // 7 how we work
  page('approach', `
    <div class="cols2 top">
      <div>${eyebrow(H.approach.eyebrow)}${title([H.approach.title])}</div>
      <div class="lead-col"><p class="body">${esc(H.approach.intro)}</p></div>
    </div>
    <ol class="steps">${H.approach.steps.map((s, i) => `<li><span class="num latin">0${i + 1}</span><h3>${esc(s.k)}</h3><p>${esc(s.d)}</p></li>`).join('')}</ol>
    <p class="loop">${esc(H.approach.loop)}</p>`);

  // 8 markets
  page('markets', `
    <div class="cols2">
      <div>${eyebrow(A.regional.eyebrow)}${title(A.regional.title)}${ps(A.regional.body, 'body')}</div>
      <div class="mk">
        <ul>${A.regional.markets.map((m, i) => `<li><span class="num latin">0${i + 1}</span>${esc(m)}</li>`).join('')}</ul>
        <p class="note">${esc(A.regional.marketsNote)}</p>
      </div>
    </div>`);

  // 9 work divider with mosaic
  const mos = MOSAIC.map((s) => coverOf(work(s)));
  page('workintro', `
    <div class="wi__txt">${eyebrow(t.work)}${title(t.workTitle)}<p class="body">${esc(t.workIntro)}</p></div>
    <div class="mosaic">${mos.slice(0, 12).map((c) => `<div class="mos"><img src="${asset(c.src)}" alt=""></div>`).join('')}</div>`);

  // 10–15 featured projects
  FEATURED.forEach(([slug, idx], k) => {
    const w = work(slug);
    const imgs = idx.map((i) => w.media.images[i]).filter(Boolean);
    page('project', `
      <div class="pj__head">
        <div><p class="eb"><span class="rule"></span><bdi class="latin">${String(k + 1).padStart(2, '0')}</bdi> · ${esc(w.sector[lang])}</p>
          <h2 class="h2">${esc(lang === 'ar' && w.clientAr ? w.clientAr : w.client)}</h2><p class="pj__t">${esc(w.title[lang])}</p></div>
        <div><p class="body">${esc(w.summary[lang])}</p><p class="pj__fmt">${esc(w.format[lang])}</p></div>
      </div>
      ${row(imgs, 1680, 600)}`);
  });

  // 16 clients (logos on soft-white tiles, never recoloured)
  const list = [...CLIENTS.filter((c) => c.logo), ...CLIENTS.filter((c) => !c.logo)];
  page('clients', `
    <div class="cl__head">${eyebrow(t.clients)}<h2 class="h2">${esc(H.clients.title)}</h2></div>
    <ul class="tiles">${list.map((c) => {
      const l = (lang === 'ar' && c.logoAr) || c.logo;
      return `<li><div class="tile${c.fill ? ' tile--fill' : ''}"${c.tile ? ` style="background:${c.tile}"` : ''}>${l ? `<img src="${asset(l.src)}" alt="">` : `<span class="word">${esc(c.name[lang])}</span>`}</div><p>${esc(c.name[lang])}</p></li>`;
    }).join('')}</ul>`);

  // 17 client wall (production-visible only)
  page('wall', `
    <div class="cl__head">${eyebrow(t.clients)}<h2 class="h2">${esc(t.clientsMore)} <bdi class="latin acc">${wall.length + named.length}</bdi></h2></div>
    <ul class="wall">${wall.map((c) => `<li><img src="${asset(c.logo.src)}" alt=""></li>`).join('')}${named.map((c) => `<li class="nm"><span class="latin" dir="ltr">${esc(c.name)}</span></li>`).join('')}</ul>`);

  // 18 founder
  page('founder', `
    <div class="fd">
      <div class="fd__photo"><img src="${asset('/team/mostafa-sofy.webp')}" alt=""></div>
      <div>${eyebrow(t.founder)}<h2 class="h2">${esc(A.founderName)}</h2><p class="pj__t">${esc(A.founderRole)} · ${esc(lang === 'ar' ? 'قول تم' : 'SayTamm')}</p>
        ${ps(A.bio, 'body')}
        <ul class="chips">${A.expertise.map((e) => `<li>${esc(e)}</li>`).join('')}</ul></div>
    </div>`);

  // 19 closing
  page('closing', `
    <div class="cl-end">
      <h2 class="cover__h">${A.closing.title.map((l, i) => `<span${i ? ' class="acc"' : ''}>${esc(l)}</span>`).join('')}</h2>
      <div>${ps(A.closing.body, 'lead')}
        <p class="eb mt-l"><span class="rule"></span>${esc(A.closing.cta)}</p>
        <dl class="contact"><div><dt>${esc(t.email)}</dt><dd class="latin" dir="ltr">${esc(S.email)}</dd></div><div><dt>${esc(t.web)}</dt><dd class="latin" dir="ltr">www.saytamm.com</dd></div></dl>
      </div>
    </div>
    <img class="end__sym" src="${asset('/brand/SayTamm_Symbol_Signature_White-Purple.svg')}" alt="">`, { chrome: false });

  const n = total();
  const html = `<!doctype html><html lang="${lang}" dir="${dir}"><head><meta charset="utf-8"><title>SayTamm — ${esc(t.doc)}</title><style>
@font-face{font-family:Satoshi;src:url(${font(path.join(SAT, 'Satoshi-400.woff2'))}) format('woff2');font-weight:400}
@font-face{font-family:Satoshi;src:url(${font(path.join(SAT, 'Satoshi-500.woff2'))}) format('woff2');font-weight:500}
@font-face{font-family:Satoshi;src:url(${font(path.join(SAT, 'Satoshi-700.woff2'))}) format('woff2');font-weight:700}
${[400, 500, 700].map((w) => `@font-face{font-family:'Plex Arabic';src:url(${font(path.join(PLEX, `ibm-plex-sans-arabic-arabic-${w}-normal.woff2`))}) format('woff2');font-weight:${w};unicode-range:U+0600-06FF,U+0750-077F,U+0870-088E,U+0890-0891,U+0898-08E1,U+08E3-08FF,U+200C-200E,U+2010-2011,U+204F,U+2E41,U+FB50-FDFF,U+FE70-FE74,U+FE76-FEFC}`).join('\n')}
@page{size:1920px 1080px;margin:0}
:root{--ob:#09090D;--gr:#17171E;--sw:#F5F3FA;--mu:#96939F;--ac:#6C35FF;--line:rgba(245,243,250,.12)}
*{box-sizing:border-box;margin:0;padding:0}
html,body{background:var(--ob);color:var(--sw)}
body{font-family:${lang === 'ar' ? "'Plex Arabic',Satoshi" : "Satoshi,'Plex Arabic'"},sans-serif;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.latin{font-family:Satoshi,sans-serif}
.pg{position:relative;width:1920px;height:1080px;overflow:hidden;padding:150px 120px 110px;page-break-after:always;break-after:page;background:var(--ob)}
.pg:last-child{page-break-after:auto}
.chrome{position:absolute;inset:48px 120px auto;display:flex;justify-content:space-between;align-items:center;font-size:18px;color:var(--mu);letter-spacing:${lang === 'ar' ? 0 : '.04em'}}
.chrome img{height:30px;width:auto}
.chrome .r{display:flex;gap:28px;align-items:center}
.pgno{position:absolute;bottom:48px;inset-inline-end:120px;font-size:18px;color:var(--mu)}
.eb{display:flex;align-items:center;gap:16px;font-size:22px;font-weight:500;color:var(--mu);margin-bottom:28px;letter-spacing:${lang === 'ar' ? 0 : '.02em'}}
.rule{display:inline-block;width:40px;height:5px;background:var(--ac);transform:skewX(-45deg)}
.h1{font-size:${lang === 'ar' ? 84 : 88}px;line-height:1.08;font-weight:700;letter-spacing:${lang === 'ar' ? 0 : '-.02em'}}
.h2{font-size:${lang === 'ar' ? 64 : 66}px;line-height:1.1;font-weight:700;letter-spacing:${lang === 'ar' ? 0 : '-.02em'};margin-bottom:24px}
.h1 span,.h2 span{display:block}.acc-line{color:var(--sw)}
.acc{color:var(--ac)}
.lead{font-size:30px;line-height:1.55;color:var(--sw);margin-bottom:22px}
.body{font-size:24px;line-height:1.65;color:#C9C6D1;margin-bottom:18px}
.mt{margin-top:28px}.mt-l{margin-top:48px}
.num{color:var(--ac);font-weight:700;font-size:22px}
.cols2{display:grid;grid-template-columns:1fr 1fr;gap:120px;align-items:start}
.cols2.top{margin-bottom:64px}
.lead-col{padding-top:62px}
.who .h1{font-size:68px}.who .cols2{grid-template-columns:1.1fr 1fr}
/* cover */
.cover{display:flex;flex-direction:column;justify-content:flex-end;padding:120px}
.cover__sym{position:absolute;top:120px;inset-inline-start:120px;height:150px}
.cover__h{font-size:${lang === 'ar' ? 220 : 210}px;line-height:${lang === 'ar' ? 1.15 : 0.95};font-weight:700;letter-spacing:${lang === 'ar' ? 0 : '-.04em'}}
.cover__h span{display:block}
.cover__sub{font-size:32px;line-height:1.5;color:#C9C6D1;max-width:1000px;margin-top:40px}
.cover__foot{position:absolute;top:140px;inset-inline-end:120px;display:flex;flex-direction:column;align-items:flex-end;gap:10px;font-size:22px;color:var(--mu)}
.cover::after,.closing::after{content:'';position:absolute;inset-inline-end:-160px;bottom:-200px;width:900px;height:900px;border:2px solid var(--line);transform:rotate(45deg)}
/* facts */
.facts{position:absolute;inset:auto 120px 130px;display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid var(--line)}
.fact{padding:40px 36px 0;border-inline-start:1px solid var(--line)}.fact:first-child{border-inline-start:0;padding-inline-start:0}
.fact__v{font-size:120px;font-weight:700;line-height:1;letter-spacing:-.03em;font-variant-numeric:lining-nums tabular-nums}
.fact:first-child .fact__v{color:var(--ac)}
.fact__k{font-size:22px;line-height:1.5;color:var(--mu);margin-top:18px;max-width:340px}
/* why */
.quote{font-size:40px;line-height:1.45;font-weight:500}
.values{list-style:none;display:flex;flex-wrap:wrap;gap:14px}
.values li{display:flex;gap:14px;align-items:baseline;border:1px solid var(--line);padding:14px 24px;font-size:26px;font-weight:500}
/* model */
.grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:24px}
.card{background:var(--gr);padding:40px 36px;min-height:420px;border-top:4px solid var(--ac)}
.card h3{font-size:32px;line-height:1.25;margin:18px 0 18px;font-weight:700}
.card p{font-size:21px;line-height:1.6;color:#C9C6D1}
/* services */
.services{padding-top:130px;display:flex;flex-direction:column}
.services .svc-cols{flex:1;min-height:0}.services .disc{display:flex;flex-direction:column}.services .svc-grid{flex:1}
.services .svc{padding:40px 40px!important}.services .svc h4{font-size:32px!important}.services .svc__sum{font-size:22px;margin:12px 0 22px}.services .svc ul{gap:12px}.services .svc li{font-size:20px!important;line-height:1.5}.services .disc header p{font-size:22px}.services .disc header h3{font-size:38px}
.svc-head .h2{font-size:52px;margin-bottom:0}.svc-head .h2 span{display:inline}.svc-head .h2 span+span{margin-inline-start:.3em;color:var(--ac)}
.svc-head{display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:40px}.svc-head .eb{margin:0}
.svc-cols{display:grid;grid-auto-flow:column;grid-auto-columns:1fr;gap:56px}
.svc-grid{display:grid;gap:16px}.svc-grid .svc{margin:0}.disc--solo .svc{padding:28px 30px}.disc--solo .svc h4{font-size:26px}.disc--solo .svc li{font-size:18px}
.disc header{border-top:4px solid var(--ac);padding-top:22px;margin-bottom:18px}
.disc header h3{display:inline;font-size:34px;font-weight:700;margin-inline-start:14px}
.disc header p{font-size:19px;line-height:1.55;color:var(--mu);margin-top:10px}
.svc{background:var(--gr);padding:18px 26px;margin-bottom:12px}
.svc h4{font-size:24px;font-weight:700}
.svc__sum{font-size:18px;color:#C9C6D1;line-height:1.5;margin:6px 0 10px}
.svc ul{list-style:none;display:grid;gap:6px}
.svc li{font-size:17px;line-height:1.45;color:var(--mu);padding-inline-start:22px;position:relative}
.svc li::before{content:'';position:absolute;inset-inline-start:0;top:.62em;width:10px;height:3px;background:var(--ac);transform:skewX(-45deg)}
/* approach */
.steps{list-style:none;display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid var(--line)}
.steps li{padding:40px 36px 0;border-inline-start:1px solid var(--line)}.steps li:first-child{border-inline-start:0;padding-inline-start:0}
.steps h3{font-size:40px;font-weight:700;margin:14px 0 16px}
.steps p{font-size:22px;line-height:1.6;color:#C9C6D1}
.loop{position:absolute;inset:auto 120px 130px;font-size:34px;font-weight:500;padding-top:32px;border-top:1px solid var(--line)}
.loop::before{content:'';display:inline-block;width:40px;height:5px;background:var(--ac);transform:skewX(-45deg);margin-inline-end:20px;vertical-align:middle}
/* markets */
.mk ul{list-style:none;border-top:1px solid var(--line)}
.mk li{display:flex;gap:30px;align-items:baseline;font-size:56px;font-weight:700;padding:22px 0;border-bottom:1px solid var(--line)}
.note{font-size:20px;color:var(--mu);margin-top:20px}
/* work intro */
.workintro{display:grid;grid-template-columns:620px 1fr;gap:80px;align-items:center;padding-top:110px}
.mosaic{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
.mos{aspect-ratio:4/5;overflow:hidden;background:var(--gr)}.mos img{width:100%;height:100%;object-fit:cover;display:block}
.mosaic .mos:nth-child(n+13){display:none}
/* project */
.project{padding-top:140px}
.pj__head{display:grid;grid-template-columns:1fr 1fr;gap:120px;margin-bottom:44px;align-items:end}
.pj__head .h2{margin-bottom:8px}
.pj__t{font-size:30px;color:var(--ac);font-weight:500}
.pj__head .body{margin-bottom:8px}
.pj__fmt{font-size:20px;color:var(--mu)}
.row{display:flex;justify-content:flex-start}
.row img{display:block;object-fit:cover;background:var(--gr)}
/* clients */
.cl__head{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:36px}.cl__head .eb,.cl__head .h2{margin:0}
.clients .h2,.wall .h2{font-size:48px}
.tiles{list-style:none;display:grid;grid-template-columns:repeat(9,1fr);gap:20px 16px}
.tiles li p{font-size:15px;color:var(--mu);margin-top:8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.tile{position:relative;aspect-ratio:16/11;background:var(--sw);overflow:hidden}
.tile img{position:absolute;inset:16% 16%;width:68%;height:68%;object-fit:contain}
.tile--fill img{inset:0;width:100%;height:100%;object-fit:cover}
.word{position:absolute;inset:0;display:grid;place-items:center;text-align:center;font-size:18px;font-weight:500;color:#55525e;padding:0 10px}
ul.wall{list-style:none;display:grid;grid-template-columns:repeat(10,1fr);gap:12px}
ul.wall li{position:relative;aspect-ratio:3/2;background:var(--gr)}
ul.wall li img{position:absolute;inset:20% 16%;width:68%;height:60%;object-fit:contain}
ul.wall li.nm{display:grid;place-items:center;text-align:center;font-size:19px;font-weight:500;color:#C9C6D1;padding:0 8px}
/* founder */
.fd{display:grid;grid-template-columns:600px 1fr;gap:100px;align-items:start}
.fd__photo{height:800px;overflow:hidden;background:var(--gr)}.fd__photo img{width:100%;height:100%;object-fit:cover;display:block;filter:grayscale(.15)}
.founder{padding-top:150px}
.fd .body{font-size:23px}
.chips{list-style:none;display:flex;flex-wrap:wrap;gap:12px;margin-top:20px}
.chips li{border:1px solid var(--line);padding:10px 20px;font-size:20px;color:#C9C6D1}
/* closing */
.closing{padding:120px}
.cl-end{position:relative;z-index:1;display:grid;grid-template-columns:1fr 760px;gap:100px;align-items:center;height:100%}
.contact{display:grid;gap:22px;margin-top:10px}
.contact dt{font-size:20px;color:var(--mu)}.contact dd{font-size:38px;font-weight:700}
.end__sym{position:absolute;bottom:110px;inset-inline-start:120px;height:64px}
</style></head><body>
${pages.map((p, i) => `<section class="pg ${p.cls}">${p.chrome ? `<div class="chrome"><img src="${asset('/brand/SayTamm_Symbol_Signature_White-Purple.svg')}" alt=""><div class="r"><span>${esc(t.doc)}</span><bdi class="latin">${String(i + 1).padStart(2, '0')} / ${String(n).padStart(2, '0')}</bdi></div></div>` : ''}${p.body}</section>`).join('\n')}
</body></html>`;
  return { html, n };
}

// ---------- 2. render ----------
const require = createRequire(import.meta.url);
let playwright;
try { playwright = require('playwright'); } catch { playwright = require(execFileSync('npm', ['root', '-g']).toString().trim() + '/playwright'); }
const built = { ar: build('ar'), en: build('en') };
// convert with Pillow (python3 -I): max 1600 px on the long side, quality 84
execFileSync('python3', ['-I', '-c', `import sys,json\nfrom PIL import Image\nfor s,o in json.load(sys.stdin):\n  im=Image.open(s).convert('RGB'); im.thumbnail((1600,1600)); im.save(o,'JPEG',quality=84,optimize=True,progressive=True)`], { input: JSON.stringify(toJpeg) });
const browser = await playwright.chromium.launch();
for (const lang of ['ar', 'en']) {
  const { html, n } = built[lang];
  const htmlPath = path.join(OUT, `saytamm-profile-${lang}.html`);
  fs.writeFileSync(htmlPath, html);
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  await page.goto(pathToFileURL(htmlPath).href, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  const broken = await page.evaluate(() => [...document.images].filter((i) => !i.complete || !i.naturalWidth).map((i) => i.src));
  if (broken.length) throw new Error('broken images: ' + broken.join(', '));
  // overflow check: no page content may spill past its 1920×1080 frame
  const spill = await page.evaluate(() => [...document.querySelectorAll('.pg')].flatMap((pg, i) => {
    const r = pg.getBoundingClientRect();
    return [...pg.querySelectorAll('*')].filter((e) => { const b = e.getBoundingClientRect(); return b.width && (b.bottom > r.bottom + 1 || b.right > r.right + 1 || b.left < r.left - 1) && !e.closest('.cover,.closing'); })
      .slice(0, 3).map((e) => `p${i + 1}:${e.tagName}.${e.className}`);
  }));
  if (spill.length) console.warn(`[${lang}] overflow:`, spill.join(' | '));
  const name = lang === 'ar' ? 'SayTamm_Company_Profile_AR.pdf' : 'SayTamm_Company_Profile_EN.pdf';
  await page.pdf({ path: path.join(OUT, name), width: '1920px', height: '1080px', printBackground: true, preferCSSPageSize: true });
  for (let i = 0; i < n; i++) {
    await page.evaluate((y) => window.scrollTo(0, y), i * 1080);
    await page.screenshot({ path: path.join(OUT, `shot-${lang}-${String(i + 1).padStart(2, '0')}.png`), clip: { x: 0, y: i * 1080, width: 1920, height: 1080 }, fullPage: true });
  }
  await page.close();
  console.log(`${lang}: ${n} pages → ${name}`);
}
await browser.close();
fs.rmSync(tmp, { recursive: true, force: true });
