// Renders 1200x630 OG images from the approved symbol SVG + brand fonts.
const { chromium } = require('playwright'); const fs = require('fs');
(async () => {
  const site = require('path').resolve(__dirname, '..'); // project root (site/), no machine-specific path
  const svg = fs.readFileSync(`${site}/public/brand/SayTamm_Symbol_Signature_White-Purple.svg`, 'utf8').replace(/width="\d+" height="\d+"/, 'width="100%" height="100%"');
  const font = (f) => 'data:font/woff2;base64,' + fs.readFileSync(f).toString('base64');
  const sat = font(`${site}/public/fonts/satoshi/Satoshi-700.woff2`);
  const plex = font(`${site}/node_modules/@fontsource/ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-arabic-700-normal.woff2`);
  const page = (lang) => `<html><head><style>
    @font-face{font-family:S;src:url(${sat})} @font-face{font-family:P;src:url(${plex})}
    body{margin:0;width:1200px;height:630px;background:#09090D;color:#F5F3FA;font-family:${lang === 'ar' ? 'P' : 'S'};overflow:hidden;position:relative}
    .m{position:absolute;${lang === 'ar' ? 'left' : 'right'}:90px;top:95px;height:440px;aspect-ratio:600/721}
    .t{position:absolute;${lang === 'ar' ? 'right' : 'left'}:90px;bottom:110px;direction:${lang === 'ar' ? 'rtl' : 'ltr'};text-align:${lang === 'ar' ? 'right' : 'left'}}
    h1{margin:0;font-size:${lang === 'ar' ? 150 : 128}px;line-height:${lang === 'ar' ? 1.05 : .9};letter-spacing:${lang === 'ar' ? 0 : '-.05em'}}
    h1 b{color:#6C35FF} p{margin:28px 0 0;font-size:28px;color:#96939F}
    .rule{position:absolute;${lang === 'ar' ? 'right' : 'left'}:90px;top:95px;width:56px;height:6px;border-radius:6px;background:#6C35FF}
  </style></head><body><span class="rule"></span><div class="m">${svg}</div><div class="t">
    ${lang === 'ar' ? '<h1>قول<br>تم<b>.</b></h1><p>تسويق رقمي يقوده الأداء · السعودية</p>' : '<h1>Say it.<br>Tamm it<b>.</b></h1><p>Performance-led digital marketing · Saudi Arabia</p>'}
  </div></body></html>`;
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  for (const lang of ['en', 'ar']) { await p.setContent(page(lang)); await p.evaluate(() => document.fonts.ready); await p.screenshot({ path: `${site}/public/og/saytamm-og-${lang}.png` }); }
  await b.close();
})();
