// Functional QA: links, language switch, SEO tags, nav state, contact form, mobile menu.
const { chromium } = require('playwright');
const B = process.env.BASE || 'http://localhost:4321';
let pass = 0, fail = 0;
const ok = (c, m) => { if (c) pass++; else { fail++; console.log('✗', m); } };
(async () => {
  const br = await chromium.launch();
  const ctx = await br.newContext({ viewport: { width: 1280, height: 800 }, permissions: ['clipboard-read', 'clipboard-write'] });
  const p = await ctx.newPage();
  const checked = new Set();
  for (const lang of ['en', 'ar']) {
    for (const start of [`/${lang}/`, `/${lang}/work/`, `/${lang}/about/`, `/${lang}/services/`, `/${lang}/work/qnb-ramadan/`]) {
      await p.goto(B + start);
      const links = await p.evaluate(() => [...new Set([...document.querySelectorAll('a[href^="/"]')].map((a) => a.getAttribute('href').split('#')[0].split('?')[0]))]);
      for (const l of links) {
        if (checked.has(l)) continue; checked.add(l);
        const r = await p.request.get(B + l); ok(r.status() === 200, `link ${l} → ${r.status()}`);
      }
      // in-page anchors exist
      const anchors = await p.evaluate(() => [...document.querySelectorAll('a[href*="#"]')].map((a) => a.getAttribute('href')));
      for (const a of anchors) {
        const [path, id] = a.split('#'); if (!id) continue;
        const html = await (await p.request.get(B + (path || start).split('?')[0])).text();
        ok(html.includes(`id="${id}"`), `anchor ${a} on ${start}`);
      }
    }
    await p.goto(`${B}/${lang}/work/muriya/`);
    const alt = lang === 'en' ? 'ar' : 'en';
    ok(await p.getAttribute('.hdr__lang', 'href') === `/${alt}/work/muriya/`, 'language switch → equivalent case page');
    ok(await p.getAttribute('link[rel=canonical]', 'href') === `https://www.saytamm.com/${lang}/work/muriya/`, 'canonical');
    ok((await p.locator('link[hreflang]').count()) === 3, 'hreflang en/ar/x-default');
    ok(await p.evaluate(() => document.documentElement.lang + document.documentElement.dir) === lang + (lang === 'ar' ? 'rtl' : 'ltr'), 'lang/dir');
    ok((await p.locator('meta[name=robots][content*=noindex]').count()) === 1, 'staging noindex');
    ok(await p.getAttribute('.hdr__link[aria-current=page]', 'href') === `/${lang}/work/`, 'active nav on case page');
    ok((await p.locator('script[type="application/ld+json"]').innerText()).includes('BreadcrumbList'), 'case JSON-LD');

    await p.goto(`${B}/${lang}/contact/?service=media`);
    ok(await p.isChecked('input[value=media]'), '?service preselects discipline');
    ok((await p.locator('input[name=services]').count()) === 5, '4 disciplines + not sure');
    await p.uncheck('input[value=media]');
    await p.click('form button[type=submit]');
    ok((await p.locator('[aria-invalid=true]').count()) > 0, 'validation flags empty fields');
    ok((await p.locator('#e-services').innerText()).length > 0, 'services error shown');
    await p.fill('[name=name]', 'Test');
    await p.fill('[name=email]', 't@example.com');
    await p.fill('[name=company]', 'Co'); await p.fill('[name=role]', 'CMO');
    if (await p.locator('[name=message]').count()) await p.fill('[name=message]', 'Grow sales');
    await p.check('input[value=strategy]');
    await p.check('[name=consent]');
    await p.click('form button[type=submit]');
    await p.waitForTimeout(500);
    const ev = await p.evaluate(() => (window.dataLayer || []).map((e) => e.event));
    ok(ev.includes('form_submit'), 'form_submit fired: ' + ev.join(','));

    await p.setViewportSize({ width: 375, height: 800 });
    await p.goto(`${B}/${lang}/`);
    const btn = p.locator('.hdr__burger');
    await btn.click(); await p.waitForTimeout(400);
    ok(await btn.getAttribute('aria-expanded') === 'true', 'mobile menu opens');
    await p.keyboard.press('Escape'); await p.waitForTimeout(300);
    ok(await btn.getAttribute('aria-expanded') === 'false', 'mobile menu closes on Escape');
    await p.setViewportSize({ width: 1280, height: 800 });
  }
  // Sprint 2: form format validation, honest notice, copy fallback; brand permission gate
  for (const lang of ['en', 'ar']) {
    await p.goto(`${B}/${lang}/contact/`);
    ok((await p.locator('#cf-notice').innerText()).includes('info@saytamm.com'), `${lang} form notice names the email route`);
    ok(!(await p.isVisible('[data-done]')), `${lang} confirmation hidden before submit`);
    ok((await p.getAttribute('[data-submit]', 'aria-describedby')) === 'cf-notice', `${lang} submit button described by notice`);
    await p.fill('[name=phone]', 'abc'); await p.fill('[name=website]', 'not a url'); await p.locator('[name=name]').focus();
    ok((await p.locator('#e-phone').innerText()).length > 0, `${lang} invalid phone flagged`);
    ok((await p.locator('#e-website').innerText()).length > 0, `${lang} invalid website flagged`);
    await p.fill('[name=phone]', '+966 50 000 0000'); await p.fill('[name=website]', 'https://example.com');
    // Sprint 3: role is optional; industry, market and timeline are carried into the message
    for (const [k, v] of [['name', 'T'], ['email', 't@example.com'], ['company', 'Co'], ['industry', 'Retail'], ['message', 'Grow sales']]) await p.fill(`[name=${k}]`, v);
    await p.selectOption('[name=market]', { index: 1 }); await p.selectOption('[name=timeline]', { index: 2 });
    await p.check('input[value=media]'); await p.check('[name=consent]');
    ok(await p.locator('.consent a[href$="/privacy/"]').count() === 1, `${lang} consent links to the privacy notice`);
    await p.evaluate(() => { const L = Object.getOwnPropertyDescriptor(window.Location.prototype, 'href'); });
    await p.click('[data-submit]'); await p.waitForTimeout(400);
    ok(await p.isVisible('[data-done]'), `${lang} confirmation shown after submit`);
    ok(await p.isVisible('[data-copy]'), `${lang} copy-message fallback shown`);
    await p.click('[data-copy]'); await p.waitForTimeout(200);
    const msgText = await p.evaluate(() => navigator.clipboard.readText().catch(() => ''));
    ok(/Industry: Retail/.test(msgText) && /Market: (?!-)\S/.test(msgText) && /Timeline: (?!-)\S/.test(msgText) && /Role: -/.test(msgText), `${lang} composed email carries industry, market, timeline; role optional`);
    ok((await p.locator('#e-phone').innerText()) === '' && (await p.locator('#e-website').innerText()) === '', `${lang} valid phone/website accepted`);
  }
  await p.goto(`${B}/en/`);
  ok((await p.locator('.wall__cell').count()) === 12, 'staging shows 12 brands (Saudi GEA tagged)');
  ok((await p.locator('.wall__cell .tag-pending').count()) === 1, 'exactly one brand tagged permission-pending');
  // production build is checked separately (indexable, no pending figures)
  console.log(`${pass} passed, ${fail} failed (${checked.size} unique internal links)`);
  await br.close();
})();
