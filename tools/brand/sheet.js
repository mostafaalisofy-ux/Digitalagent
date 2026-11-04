const { chromium } = require('playwright'); const fs = require('fs');
(async () => {
  const B = process.argv[2], out = process.argv[3];
  const svg = n => fs.readFileSync(`${B}/SayTamm_Symbol_${n}.svg`, 'utf8').replace(/width="\d+" height="\d+"/, 'width="100%" height="100%"');
  const tile = (n, bg, label, fg) => `<div class="t" style="background:${bg};color:${fg}"><div class="m">${svg(n)}</div><span>${label}</span></div>`;
  const small = (n, bg) => [16,24,32,48].map(s => `<div style="background:${bg};width:${s+16}px;height:${s+16}px;display:grid;place-items:center"><div style="width:${s*0.832}px;height:${s}px">${svg(n)}</div></div>`).join('');
  const html = `<html><head><style>
    body{margin:0;font:500 14px system-ui;background:#F5F5F7;padding:32px;width:1336px}
    h1{font:700 22px system-ui;margin:0 0 4px} p{margin:0 0 20px;color:#555}
    .g{display:grid;grid-template-columns:repeat(5,1fr);gap:12px}
    .t{height:300px;border-radius:4px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;border:1px solid #e3e3e8}
    .m{width:150px;height:180px} span{font-size:12px;letter-spacing:.04em}
    .s{display:flex;gap:10px;align-items:center;margin-top:20px} .s b{width:150px}
  </style></head><body>
  <h1>SayTamm symbol: production files v1 (vector candidate)</h1>
  <p>Traced from the owner's master render. Fidelity vs master: IoU 0.9992 (1×), 0.9994 (4×), max edge deviation 1 px. Geometry not redrawn. Two-tone = recolour of the two existing shapes (D-007).</p>
  <div class="g">
    ${tile('Black','#FFFFFF','BLACK · default on light','#0A0A0D')}
    ${tile('White','#0A0A0D','WHITE · default on dark','#fff')}
    ${tile('Purple','#FFFFFF','PURPLE · special use','#0A0A0D')}
    ${tile('Signature_White-Purple','#0A0A0D','SIGNATURE · on dark','#fff')}
    ${tile('Signature_Black-Purple','#FFFFFF','SIGNATURE · on light','#0A0A0D')}
  </div>
  <div class="s"><b>Small sizes · light</b>${small('Black','#fff')} <b style="margin-left:24px">Small sizes · dark</b>${small('Signature_White-Purple','#0A0A0D')}</div>
  <p style="margin-top:8px;font-size:12px">Heights 16 / 24 / 32 / 48 px. Minimum recommended digital size is 24 px.</p>
  </body></html>`;
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1400, height: 600 }, deviceScaleFactor: 2 });
  await p.setContent(html); await p.screenshot({ path: out, fullPage: true }); await b.close();
})();
