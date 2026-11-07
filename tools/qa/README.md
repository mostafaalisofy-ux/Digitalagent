# QA scripts

Playwright scripts that run against a local server. They are not dependencies of the site.

## Setup (once)

```bash
cd tools/qa
```

```bash
npm init -y && npm i -D playwright axe-core && npx playwright install chromium
```

## Run

Build and serve the site first: `cd site && npm run build && npx astro preview --port 4321`. Then generate the path list:

```bash
find ../../site/dist -name index.html | sed 's#^../../site/dist##; s#index.html$##' | grep -v '^/$' | sort > paths.txt
```

| Script | Build | What it checks |
|---|---|---|
| `node qa.js sweep < paths.txt` | any | 9 viewports (360, 390, 430, 768, 1024, 1280, 1440, 1920, 2560): horizontal overflow, console errors, failed requests, broken visible images, hero CTA in view **and revealed** on first paint |
| `node func.js` | staging | Internal links and anchors, language switch (including case pages), canonical, hreflang, lang/dir, staging noindex, active nav, case JSON-LD, contact form (preselect, validation including phone/website format, honest notice, confirmation hidden until submit, copy fallback, submit event), mobile menu, brand permission gate |
| `node seo.js ../../site/dist [--production]` | either | static: unique titles/descriptions, canonical, reciprocal hreflang, OG, JSON-LD parse and no unverified fields, one h1, robots by stage, AR/EN parity, sitemap and robots.txt (no browser) |
| `node a11y.js < paths.txt` | staging | axe-core WCAG 2.0/2.1 A/AA and 2.2 AA rules, one h1 and no skipped heading levels, visible keyboard focus on the first 25 tab stops, reduced-motion rendering |
| `node a11y.js --production < paths.txt` | production | All of the above, plus no internal or review wording visible to visitors ("to be supplied", "pending", preview bar, permission-pending brands) |
| `node figs.js < paths.txt` | production | No unapproved performance figure in the visible text, aria-labels or alt text of any page |
| `node qa.js shot <path> <w> <h> <out.png> [full]` | any | Screenshot (`DSF=2` for retina) |
| `node wide.js <path> [width]` | any | Lists the elements wider than the viewport |

Set `BASE=http://host:port` to test another server.

`paths.txt` and `paths-pages.txt` are committed (Sprint 3: they include `/en/privacy/` and `/ar/privacy/`). The home work wall (`.wm__track`) is excluded from the lazy-image wait because it is a horizontally clipped marquee whose tiles load as they slide in.

**Dependencies:** Playwright (pre-installed globally here) and `axe-core` for `a11y.js`. Install axe-core once in any folder (`npm i axe-core`) and point Node at it, e.g. `NODE_PATH=<that folder>/node_modules:$(npm root -g) node a11y.js < paths.txt`. Without it `a11y.js` fails with `Cannot find module` instead of running — check the output, not just the exit code.
