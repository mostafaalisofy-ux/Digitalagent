// Final screenshots: every path from stdin at 1440 and 390 (full page), reduced motion so
// reveal animations are settled. Usage: node shots.js <outdir> < paths-pages.txt
const { chromium } = require('playwright'); const fs = require('fs');
const out = process.argv[2] || 'shots'; fs.mkdirSync(out, { recursive: true });
const B = process.env.BASE || 'http://localhost:4321';
const paths = fs.readFileSync(0, 'utf8').split('\n').filter(Boolean);
(async () => { const b = await chromium.launch(); let n = 0;
  for (const [w, h, tag] of [[1440, 900, 'desktop'], [390, 844, 'mobile']]) {
    const p = await b.newPage({ viewport: { width: w, height: h } }); await p.emulateMedia({ reducedMotion: 'reduce' });
    for (const path of paths) {
      await p.goto(B + path, { waitUntil: 'networkidle' });
      await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 700) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); } scrollTo(0, 0); await new Promise((r) => setTimeout(r, 600)); });
      const name = path.replace(/^\/|\/$/g, '').replace(/\//g, '_') || 'root';
      await p.screenshot({ path: `${out}/${name}__${tag}.jpg`, fullPage: true, type: 'jpeg', quality: 70 }); n++;
    }
    await p.close();
  }
  console.log(`${n} screenshots in ${out}`); await b.close(); })();
