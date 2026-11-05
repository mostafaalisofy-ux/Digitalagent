// Static SEO + parity validator for a built site (no browser needed).
// Usage: node tools/qa/seo.js [dist-dir] [--production]
// Checks every HTML page: one <title>/description (unique), html lang+dir, canonical = own URL,
// hreflang en/ar/x-default present and reciprocal, OG/Twitter tags, JSON-LD parses, one <h1>,
// robots meta by stage; sitemap lists every content page; robots.txt matches the stage;
// every /en/ page has an /ar/ twin and vice versa.
const fs = require('fs'), path = require('path');
const dist = path.resolve(process.argv[2] && !process.argv[2].startsWith('--') ? process.argv[2] : 'site/dist');
const PROD = process.argv.includes('--production');
const SITE = 'https://www.saytamm.com';
let pass = 0, fail = 0;
const ok = (c, m) => { if (c) pass++; else { fail++; console.log('✗', m); } };
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? walk(path.join(d, e.name)) : e.name.endsWith('.html') ? [path.join(d, e.name)] : []);
const pages = walk(dist).map((f) => ({ f, url: '/' + path.relative(dist, f).replace(/index\.html$/, '').replace(/\\/g, '/') }))
  .filter((p) => /^\/(en|ar)\//.test(p.url)); // content pages (root redirect and 404 checked separately)
const attr = (s, re) => (s.match(re) || [])[1];
const seen = { title: new Map(), desc: new Map() };
const alt = {};
for (const { f, url } of pages) {
  const s = fs.readFileSync(f, 'utf8');
  const lang = url.slice(1, 3);
  const title = attr(s, /<title>([^<]*)<\/title>/); const desc = attr(s, /<meta name="description" content="([^"]*)"/);
  ok(title && title.length >= 10 && title.length <= 70, `${url} title length ${title?.length}: ${title}`);
  ok(desc && desc.length >= 50 && desc.length <= 170, `${url} description length ${desc?.length}`);
  for (const [k, v] of [['title', title], ['desc', desc]]) { ok(!seen[k].has(v), `${url} duplicate ${k} with ${seen[k].get(v)}`); seen[k].set(v, url); }
  ok(new RegExp(`<html lang="${lang}" dir="${lang === 'ar' ? 'rtl' : 'ltr'}"`).test(s), `${url} html lang/dir`);
  ok(attr(s, /<link rel="canonical" href="([^"]+)"/) === SITE + url, `${url} canonical`);
  const hl = Object.fromEntries([...s.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map((m) => [m[1], m[2]]));
  ok(hl.en && hl.ar && hl['x-default'], `${url} hreflang set incomplete`);
  ok(hl[lang] === SITE + url, `${url} self hreflang`);
  alt[url] = hl;
  for (const p of ['og:title', 'og:description', 'og:url', 'og:image', 'og:locale']) ok(s.includes(`property="${p}"`), `${url} missing ${p}`);
  ok(attr(s, /property="og:url" content="([^"]+)"/) === SITE + url, `${url} og:url`);
  ok(s.includes('name="twitter:card"'), `${url} twitter:card`);
  const ld = [...s.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  ok(ld.length > 0, `${url} no JSON-LD`);
  for (const m of ld) { let j; try { j = JSON.parse(m[1]); } catch { j = null; } ok(j, `${url} JSON-LD does not parse`);
    const txt = m[1]; ok(!/aggregateRating|"review"|openingHours|"address"/.test(txt), `${url} JSON-LD contains an unverified field`); }
  ok((s.match(/<h1\b/g) || []).length === 1, `${url} h1 count`);
  const robots = s.includes('name="robots" content="noindex, nofollow"');
  ok(PROD ? !robots : robots, `${url} robots meta wrong for ${PROD ? 'production' : 'staging'}`);
}
// reciprocity + parity
for (const [url, hl] of Object.entries(alt)) {
  for (const l of ['en', 'ar']) { const twin = hl[l]?.replace(SITE, ''); ok(alt[twin], `${url} → hreflang ${l} target ${twin} is not a built page`);
    if (alt[twin]) ok(alt[twin][url.slice(1, 3)] === SITE + url, `${url} ↔ ${twin} hreflang not reciprocal`); }
}
const en = pages.filter((p) => p.url.startsWith('/en/')).map((p) => p.url.slice(3)).sort();
const ar = pages.filter((p) => p.url.startsWith('/ar/')).map((p) => p.url.slice(3)).sort();
ok(JSON.stringify(en) === JSON.stringify(ar), `language parity: en-only ${en.filter((x) => !ar.includes(x))} ar-only ${ar.filter((x) => !en.includes(x))}`);
// sitemap + robots
const sm = fs.readFileSync(path.join(dist, 'sitemap.xml'), 'utf8');
const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(SITE, ''));
for (const { url } of pages) ok(locs.includes(url), `sitemap missing ${url}`);
for (const l of locs) ok(alt[l], `sitemap lists ${l}, which is not a built content page`);
const rb = fs.readFileSync(path.join(dist, 'robots.txt'), 'utf8');
ok(PROD ? /Allow: \/[\s\S]*Sitemap:/.test(rb) : /Disallow: \//.test(rb), `robots.txt wrong for ${PROD ? 'production' : 'staging'}`);
// root redirect + 404 stay out of the index in both stages
for (const f of ['index.html', '404.html']) { const p = path.join(dist, f); if (fs.existsSync(p)) ok(/name="robots" content="noindex/.test(fs.readFileSync(p, 'utf8')), `${f} should be noindex`); }
console.log(`${pass} passed, ${fail} failed (${pages.length} content pages, ${locs.length} sitemap URLs, ${PROD ? 'production' : 'staging'})`);
process.exit(fail ? 1 : 0);
