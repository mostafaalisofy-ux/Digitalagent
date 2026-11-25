// Company profile → print PDF: one 1920×1080 page per slide, vector text, images at the print master's resolution.
// Build the print HTML first: PROFILE_PRINT=1 python3 docs/profile/build_profile_v2.py handover/profile/SayTamm_Company_Profile_EN_print.html
// Usage (repo root): node docs/profile/render_pdf.cjs <in.html> <out.pdf>
// The PDF embeds Satoshi: keep it internal until the font licence is confirmed.
const { chromium } = require('playwright');
const path = require('node:path');
(async () => {
const [, , src, out] = process.argv;
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
await p.goto('file://' + path.resolve(src), { waitUntil: 'networkidle' });
await p.addStyleTag({ content: `
  @page { size: 1920px 1080px; margin: 0; }
  html, body { background: #09090D !important; }
  .deck { display: block !important; padding: 0 !important; gap: 0 !important; }
  .pg { width: 1920px !important; height: 1080px !important; aspect-ratio: auto !important; border-radius: 0 !important;
        box-shadow: none !important; break-after: page; page-break-after: always; margin: 0 !important; }
  img { filter: none !important; }   /* CSS filters force page rasterisation in PDF */
  .pg:last-child { break-after: auto; page-break-after: auto; }` });
await p.evaluate(() => document.fonts.ready);
await p.waitForTimeout(1500);
await p.pdf({ path: out, width: '1920px', height: '1080px', printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
await b.close();
console.log('wrote', out);
})();
