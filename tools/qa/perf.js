// Measured lab performance (local static server, no throttling unless MOBILE=1 applies 4× CPU slowdown).
// Reports LCP, CLS, transferred bytes and request count per path. Usage: node perf.js < paths.txt
const { chromium } = require('playwright'); const fs = require('fs');
const B = process.env.BASE || 'http://localhost:4321';
const paths = fs.readFileSync(0, 'utf8').split('\n').filter(Boolean);
(async () => { const b = await chromium.launch();
  for (const [w, h, tag] of [[390, 844, 'mobile'], [1440, 900, 'desktop']]) {
    for (const path of paths) {
      const ctx = await b.newContext({ viewport: { width: w, height: h } }); const p = await ctx.newPage();
      const cdp = await ctx.newCDPSession(p);
      if (tag === 'mobile') await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
      let bytes = 0, reqs = 0; p.on('response', async (r) => { reqs++; try { bytes += (await r.body()).length; } catch {} });
      await p.addInitScript(() => { window.__lcp = 0; window.__cls = 0;
        new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__lcp = e.startTime; }).observe({ type: 'largest-contentful-paint', buffered: true });
        new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value; }).observe({ type: 'layout-shift', buffered: true }); });
      await p.goto(B + path, { waitUntil: 'networkidle' }); await p.waitForTimeout(800);
      const m = await p.evaluate(() => ({ lcp: Math.round(window.__lcp), cls: +window.__cls.toFixed(3) }));
      console.log(`${tag}\t${path}\tLCP ${m.lcp} ms\tCLS ${m.cls}\t${(bytes / 1024).toFixed(0)} KB\t${reqs} requests`);
      await ctx.close();
    }
  }
  await b.close(); })();
