// Visible-text scan: no unapproved or removed performance figure may appear in the production build.
const { chromium } = require('playwright'); const fs = require('fs');
// D-026 (2026-11-25): K.S Furniture, fashion & beauty and electronics Q4 are approved and may appear. Only the figures of
// the removed cases (QNB Ramadan, Muriya, Bio-Group, DAMAC) and figures never cleared for publication are listed here.
const FIG = ['935,215', '10.9×', '7M', '25M', '50K', '$1.51M', '$18.2K', '83×', '2× → 4×', '2,970', '2.78%', '$8', '15%', '119', '7.4M'];
(async () => { const b = await chromium.launch(); let hits = 0; const paths = fs.readFileSync(0, 'utf8').trim().split('\n');
  for (const p of paths) { const pg = await b.newPage(); await pg.goto((process.env.BASE || 'http://localhost:4321') + p, { waitUntil: 'networkidle' });
    const txt = await pg.evaluate(() => document.body.innerText + ' ' + [...document.querySelectorAll('[aria-label],[alt]')].map((e) => e.getAttribute('aria-label') + e.getAttribute('alt')).join(' '));
    const found = FIG.filter((f) => new RegExp(`(^|[^\\d.,])${f.replace(/[.$×→+]/g, (m) => '\\' + m)}(?![\\d])`).test(txt));
    if (found.length) { hits++; console.log('✗', p, found.join(', ')); } await pg.close(); }
  console.log(`${paths.length} pages scanned, ${hits} with figures`); await b.close(); })();
