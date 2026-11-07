# SEO final audit

Date: 2026-11-05. Validated by `node tools/qa/seo.js site/dist [--production]` against both builds.

## Results

| Build | Command | Result |
|---|---|---|
| Staging | `npm run build && node tools/qa/seo.js site/dist` | 680 passed, 0 failed · 26 content pages · 26 sitemap URLs |
| Production | `npm run build:production && node tools/qa/seo.js site/dist --production` | 680 passed, 0 failed · 26 content pages · 26 sitemap URLs |

## What is checked on every content page (13 pages × 2 languages)

- One `<title>` (10–70 characters) and one meta description (50–170), both unique across the site.
- `<html lang>` and `dir` correct (`ar` → `rtl`).
- Canonical = the page's own absolute URL on `https://www.saytamm.com`.
- `hreflang` `en`, `ar` and `x-default` present, self-referencing, and reciprocal between the two language versions.
- Open Graph: `og:title`, `og:description`, `og:url` (= canonical), `og:image` (1200×630, official logo composite), `og:locale`; `twitter:card`.
- JSON-LD parses; no rating, review, opening hours or address (none is verified).
- Exactly one `<h1>`.
- Robots meta: `noindex, nofollow` on every staging page; absent on production pages.
- Arabic/English parity: every `/en/` page has an `/ar/` twin.
- Sitemap lists exactly the content pages, with hreflang alternates; robots.txt is `Disallow: /` in staging and `Allow: /` + sitemap in production.
- Root redirect (`/` → `/en/`) and `404.html` are `noindex` in both stages.

## Fixes made this sprint

| Issue | Fix |
|---|---|
| 404 page was indexable in production and carried a canonical/hreflang to the home page | `Base` gets a `noindex` prop: robots noindex, no canonical, no hreflang; used by `404.astro` |
| English About title 72 characters | "About SayTamm — Saudi Digital Marketing & Performance Agency" |
| No Service schema on the services page | `ItemList` of 9 `Service` items: name, description, provider SayTamm, areaServed SA |
| Privacy notice missing from sitemap and footer | Added (both languages) |

## Structured data by page type

| Page | Types |
|---|---|
| All | `WebSite`, `Organization` (name, alternateName «قول تم», url, email, logo, slogan, areaServed SA, languages) |
| Services | + `ItemList` of `Service` |
| About | + `AboutPage` with founder |
| Case pages | + `Article`, `BreadcrumbList` |

Not used, deliberately: `ProfessionalService`/`LocalBusiness` (they expect an address and opening hours, which are not verified), `sameAs` (no verified social handles), ratings and reviews (none exist).

## Other checks

- Internal links: 0 broken (`func.js`).
- Image alt text: every content image has descriptive alt text in its language; duplicates and decorative images use `alt=""`.
- Headings: one h1, no skipped levels (`a11y.js`).
- Duplicate content: none — each language has its own copy, linked by hreflang.
- Pagination: not applicable.

## Owner actions before indexing

1. Approve launch, then build with `npm run build:production` (the only indexable build).
2. Configure the host: `saytamm.com` → `www.saytamm.com` (301), `/` → `/en/` (already a static redirect page; a host-level 301 is better).
3. Submit `https://www.saytamm.com/sitemap.xml` in Google Search Console after launch.
4. Never deploy a staging build to the production domain (it is `noindex` everywhere by design).
