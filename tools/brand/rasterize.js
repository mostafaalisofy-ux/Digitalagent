// usage: node rasterize.js <svg> <out.png> <width> <height>
const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
  const [svgPath, out, w, h] = process.argv.slice(2);
  const svg = fs.readFileSync(svgPath, 'utf8').replace(/width="\d+" height="\d+"/, `width="${w}" height="${h}"`);
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1 });
  await p.setContent(`<html><body style="margin:0;background:#fff">${svg}</body></html>`);
  await p.screenshot({ path: out, clip: { x: 0, y: 0, width: +w, height: +h } }); await b.close();
})();
