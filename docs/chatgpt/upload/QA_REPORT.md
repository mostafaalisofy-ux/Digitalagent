# QA report — Sprint 3 final

Date: 2026-11-07 · Commit tested: `6189d8c` and later docs-only commits · Environment: Linux container, Node 22.23.4, npm 10.9.9, Chromium (Playwright), axe-core.
Every result below was produced by an actual run; nothing is estimated. The full log is in the handover (`qa-evidence/final-qa.log`).

## Results

| # | Test | Command | Build | Result |
|---|---|---|---|---|
| 1 | Clean install | `npm ci` | — | OK, 0 vulnerabilities |
| 2 | Type and Astro check | `npx astro check` | — | **0 errors, 0 warnings, 0 hints** |
| 3 | Staging build | `npm run build` | staging | Complete, 28 HTML files (26 content pages + 404 + root redirect) |
| 4 | SEO, parity, positioning | `node tools/qa/seo.js site/dist` | staging | **706 passed, 0 failed** (26 pages, 26 sitemap URLs) |
| 5 | Layout sweep | `node qa.js sweep < paths-pages.txt` | staging | **234 checks, 0 problems** — 26 pages × 9 widths (360, 390, 430, 768, 1024, 1280, 1440, 1920, 2560): overflow, console errors, failed requests, broken images, hero CTA in view |
| 6 | Functional | `node func.js` | staging | **405 passed, 0 failed** (26 unique internal links; language switch, form validation and composed email, mobile menu, client wall counts, privacy page) |
| 7 | Accessibility | `node a11y.js < paths.txt` | staging | **110 passed, 0 failed** — axe WCAG 2.0/2.1 A/AA + 2.2 AA, one h1, no skipped headings, visible focus on 25 tab stops, reduced motion |
| 8 | Production build | `npm run build:production` | production | Complete |
| 9 | SEO, parity, positioning | `node tools/qa/seo.js site/dist --production` | production | **706 passed, 0 failed**; no `noindex` on content pages; robots `Allow` + sitemap |
| 10 | Layout sweep | as 5 | production | **234 checks, 0 problems** |
| 11 | Accessibility + internal wording | `node a11y.js --production` | production | **137 passed, 0 failed** (no "pending", "preview", "Saudi GEA" or draft wording visible) |
| 12 | Unapproved figures | `node figs.js < paths.txt` | production | **27 pages scanned, 0 with figures** |
| 13 | Screenshots | `node shots.js` | staging | 52 full-page screenshots (26 pages × desktop 1440 / mobile 390) in `qa-evidence/screenshots/` |
| 14 | Handover rebuild | unzip → `npm ci` → check → build → diff | staging | 0 errors; **output identical to the repository**; 0 forbidden files; 0 secrets |

## Performance (measured, production build, local server)

| Page | Mobile (4× CPU slowdown) | Desktop |
|---|---|---|
| `/en/` | LCP 1,256 ms · CLS 0 · 152 KB · 12 requests | LCP 1,256 ms · CLS 0 · 163 KB |
| `/ar/` | LCP 1,928 ms · CLS 0.001 · 199 KB · 18 requests | LCP 1,356 ms · CLS 0.009 |
| `/ar/work/` | LCP 336 ms · CLS 0.012 · 226 KB · 34 requests | LCP 160 ms · CLS 0.006 |
| `/ar/services/` | LCP 1,252 ms · CLS 0.002 · 99 KB | LCP 1,000 ms · CLS 0 |

All within "good" Core Web Vitals thresholds (LCP < 2.5 s, CLS < 0.1). **Limitation:** lab measurement on a local server with no network throttling; field data after launch (Search Console) is the real measure.

## Known limitations

- The first `a11y.js` attempt in the final run failed with `Cannot find module` (axe-core and Playwright are not installed next to `tools/qa`); it was re-run with `NODE_PATH` set and passed. Setup is now documented in `tools/qa/README.md`.
- Automated accessibility checks do not replace a screen-reader test with real users (NVDA/VoiceOver in Arabic).
- The niimee video does not play in the offline review HTML (it is linked, not embedded).
- QA scripts are not wired into CI.
