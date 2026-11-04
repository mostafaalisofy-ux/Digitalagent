// Visible-text scan: no unapproved performance figure may appear in the production build.
const { chromium } = require('playwright'); const fs = require('fs');
const FIG = ['13.84×', '8.91×', '27,703', '6,930', '10.9×', '1.09M', '507', '446', '7M', '25M', '50K', '$897K', '$1,201', '747', '$1.51M', '$18.2K', '83×', '2× → 4×', '2,970', '2.78%', '$8', '15%', '119', '535K', '7.4M', '100K'];
(async () => { const b = await chromium.launch(); let hits = 0; const paths = fs.readFileSync(0, 'utf8').trim().split('\n');
  for (const p of paths) { const pg = await b.newPage(); await pg.goto((process.env.BASE || 'http://localhost:4321') + p, { waitUntil: 'networkidle' });
    const txt = await pg.evaluate(() => document.body.innerText + ' ' + [...document.querySelectorAll('[aria-label],[alt]')].map((e) => e.getAttribute('aria-label') + e.getAttribute('alt')).join(' '));
    const found = FIG.filter((f) => new RegExp(`(^|[^\\d.,])${f.replace(/[.$×→+]/g, (m) => '\\' + m)}(?![\\d])`).test(txt));
    if (found.length) { hits++; console.log('✗', p, found.join(', ')); } await pg.close(); }
  console.log(`${paths.length} pages scanned, ${hits} with figures`); await b.close(); })();
