// usage: node qa.js sweep | node qa.js shot <path> <w> <h> <out> [full]
const { chromium } = require('playwright');
const BASE = process.env.BASE || 'http://localhost:4321';
const VP = { m360: [360, 640], m390: [390, 844], t768: [768, 1024], l1024: [1024, 768], d1440: [1440, 900], d1920: [1920, 1080], x2560: [2560, 1440] };
async function settle(page) {
  await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 500) { window.scrollTo({ top: y, behavior: 'instant' }); await new Promise((r) => setTimeout(r, 25)); } window.scrollTo({ top: 0, behavior: 'instant' }); });
  await page.waitForTimeout(1300);
}
(async () => {
  const [mode, ...a] = process.argv.slice(2);
  const browser = await chromium.launch();
  if (mode === 'shot') {
    const [path, w, h, out, full] = a;
    const page = await browser.newPage({ viewport: { width: +w, height: +h }, deviceScaleFactor: +(process.env.DSF || 1) });
    await page.goto(BASE + path, { waitUntil: 'networkidle' });
    if (full) await settle(page); else await page.waitForTimeout(1800);
    await page.screenshot({ path: out, fullPage: !!full });
  } else {
    const paths = require('fs').readFileSync(0, 'utf8').trim().split('\n');
    let bad = 0;
    for (const p of paths) for (const [name, [w, h]] of Object.entries(VP)) {
      const page = await browser.newPage({ viewport: { width: w, height: h } });
      const errs = [];
      page.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
      page.on('pageerror', (e) => errs.push(e.message));
      page.on('requestfailed', (r) => errs.push('FAIL ' + r.url()));
      const res = await page.goto(BASE + p, { waitUntil: 'networkidle' });
      await page.waitForTimeout(1500);
      const first = await page.evaluate(() => { const c = document.querySelector('.hero .btn--primary'); if (!c) return null; const b = c.getBoundingClientRect(); return { bottom: b.bottom, hidden: getComputedStyle(c.closest('[data-reveal]') || c).opacity !== '1' }; });
      await settle(page);
      // lazy images below the fold may still be downloading after the scroll: give them up to 5 s
      // The home work wall (.wm__track) is a horizontally clipped marquee: its lazy tiles load as they slide in,
      // so it is checked separately for real 404s below rather than scrolled into view.
      // A deferred lazy image reports complete=true with naturalWidth 0 until the browser requests it, so
      // bring each visible, unloaded image into view and wait for it (as a visitor scrolling would).
      await page.evaluate(async () => {
        for (const i of [...document.images].filter((x) => x.offsetParent && !x.closest('.wm__track') && !(x.complete && x.naturalWidth))) {
          i.scrollIntoView({ block: 'center' });
          await new Promise((res) => { if (i.complete && i.naturalWidth) return res(); i.addEventListener('load', res, { once: true }); i.addEventListener('error', res, { once: true }); setTimeout(res, 8000); });
        }
        scrollTo({ top: 0, behavior: 'instant' });
      });
      const r = await page.evaluate(() => {
        const over = document.documentElement.scrollWidth - innerWidth;
        const imgs = [...document.images].filter((i) => i.offsetParent && !i.closest('.wm__track') && (!i.complete || !i.naturalWidth)).map((i) => i.src);
        const cta = document.querySelector('.hero .btn--primary');
        const ctaBottom = cta ? cta.getBoundingClientRect().bottom : null;
        const ctaHidden = cta ? getComputedStyle(cta.closest('[data-reveal]') || cta).opacity !== '1' : false;
        return { over, imgs, ctaBottom, ctaHidden };
      });
      const ctaBad = !!first && (first.bottom > h || first.hidden);
      r.ctaBottom = first && first.bottom; r.ctaHidden = first && first.hidden;
      const ok = r.over <= 0 && !r.imgs.length && !errs.length && res.status() === 200 && !ctaBad;
      if (!ok) { bad++; console.log('✗', p, name, JSON.stringify({ status: res.status(), over: r.over, imgs: r.imgs, errs, ctaBottom: r.ctaBottom })); }
      await page.close();
    }
    console.log(`${paths.length * Object.keys(VP).length} checks, ${bad} problems`);
  }
  await browser.close();
})();
