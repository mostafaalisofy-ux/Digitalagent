// Accessibility + content-hygiene QA. usage: BASE=http://localhost:4321 node a11y.js < paths.txt [--production]
// - axe-core (WCAG 2.0/2.1 A + AA rules) on every page, after all reveals have run
// - heading hierarchy: exactly one h1, no skipped levels
// - keyboard: Tab through the page, every focused element must show a visible focus style
// - reduced motion: hero mark and headline are fully visible immediately
// - production only: no internal placeholder / review wording visible to visitors
const { chromium } = require('playwright');
const fs = require('fs');
const axeSrc = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const BASE = process.env.BASE || 'http://localhost:4321';
const PROD = process.argv.includes('--production');
const FORBIDDEN = [/to be supplied/i, /to be confirmed/i, /placeholder/i, /pending confirmation/i, /Preview build/i, /بانتظار التزويد/, /قيد التأكيد/, /بانتظار التأكيد/, /نسخة معاينة/, /Display permission pending/i, /Saudi GEA/];
let fail = 0, pass = 0;
const ok = (c, m) => { if (c) pass++; else { fail++; console.log('✗', m); } };

(async () => {
  const paths = fs.readFileSync(0, 'utf8').trim().split('\n');
  const br = await chromium.launch();
  for (const p of paths) {
    const page = await br.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(BASE + p, { waitUntil: 'networkidle' });
    await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { scrollTo({ top: y, behavior: 'instant' }); await new Promise((r) => setTimeout(r, 20)); } scrollTo({ top: 0, behavior: 'instant' }); });
    await page.waitForTimeout(1200);
    // axe
    await page.addScriptTag({ content: axeSrc });
    const res = await page.evaluate(async () => (await (window).axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] } })).violations.map((v) => `${v.id} (${v.impact}): ${v.nodes.length}× e.g. ${v.nodes[0].target.join(' ')}`));
    ok(res.length === 0, `${p} axe: ${res.join(' | ')}`);
    // headings
    const hs = await page.evaluate(() => [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].filter((h) => h.getClientRects().length).map((h) => +h.tagName[1]));
    ok(hs.filter((l) => l === 1).length === 1, `${p} h1 count = ${hs.filter((l) => l === 1).length}`);
    const skips = hs.map((l, i) => (i && l > hs[i - 1] + 1 ? `h${hs[i - 1]}→h${l}` : null)).filter(Boolean);
    ok(!skips.length, `${p} heading skips: ${skips.join(', ')}`);
    // keyboard focus visibility (first 25 tab stops)
    const invisible = [];
    for (let i = 0; i < 25; i++) {
      await page.keyboard.press('Tab');
      const r = await page.evaluate(() => {
        const el = document.activeElement; if (!el || el === document.body) return null;
        const cs = getComputedStyle(el);
        const visible = (cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) > 0) || cs.boxShadow !== 'none';
        return visible ? null : `${el.tagName}.${[...el.classList].join('.')}`;
      });
      if (r) invisible.push(r);
    }
    ok(!invisible.length, `${p} focus not visible on: ${[...new Set(invisible)].join(', ')}`);
    if (PROD) {
      const text = await page.evaluate(() => document.body.innerText);
      const hits = FORBIDDEN.filter((re) => re.test(text)).map(String);
      ok(!hits.length, `${p} visitor-facing internal wording: ${hits.join(', ')}`);
    }
    await page.close();
  }
  // reduced motion
  for (const lang of ['en', 'ar']) {
    const ctx = await br.newContext({ reducedMotion: 'reduce', viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(`${BASE}/${lang}/`, { waitUntil: 'networkidle' });
    const st = await page.evaluate(() => ['.hero__mark .logo__blade', '.hero__title .line > span', '.hero__sub'].map((s) => { const e = document.querySelector(s); const cs = getComputedStyle(e); return cs.opacity + '|' + cs.transform; }));
    ok(st.every((x) => x.startsWith('1|') && (x.endsWith('none') || x.endsWith('matrix(1, 0, 0, 1, 0, 0)'))), `${lang} reduced motion: ${st.join(' ; ')}`);
    await ctx.close();
  }
  console.log(`${pass} passed, ${fail} failed`);
  await br.close();
})();
