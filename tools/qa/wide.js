const { chromium } = require('playwright');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: +process.argv[3] || 360, height: 640 } });
await p.goto((process.env.BASE || 'http://localhost:4321') + process.argv[2], { waitUntil: 'networkidle' });
console.log(await p.evaluate(() => [...document.querySelectorAll('body *')].filter((e) => e.getBoundingClientRect().right > innerWidth + 1).slice(0, 8).map((e) => `${e.tagName}.${[...e.classList].join('.')} r=${Math.round(e.getBoundingClientRect().right)} "${(e.textContent || '').trim().slice(0, 40)}"`).join('\n')));
await b.close(); })();
