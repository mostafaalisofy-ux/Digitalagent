# SAYTAMM website: project handover

**Project:** SAYTAMM (قول تم) bilingual agency website · **Version:** v0.5 (Sprint 2, staging) · **Updated:** 2026-11-04
**Source:** Git branch `claude/saytamm-brand-strategy-d2shzo` (repository `mostafaalisofy-ux/digitalagent`). The v0.4 baseline is commit `082a5f2`. What changed in Sprint 2: `docs/SPRINT_2_REPORT.md`
**Intended domain:** https://www.saytamm.com (not deployed yet; no hosting or DNS has been set up)

This package is the complete, editable source. It builds on its own without network access to anything except the npm registry.

---

## 1. Framework and technologies

| | |
|---|---|
| Framework | **Astro 7.4.5**, static site generation (`output: static`, the default) |
| Runtime | **Node.js ≥ 22.23.4** (required by Astro 7) and npm ≥ 9.6.5. Built and verified with Node 22.23.4 / npm 10.9.9 |
| Package manager | npm (`site/package-lock.json`) |
| Runtime dependencies | `astro`, `@fontsource/ibm-plex-sans-arabic`. Nothing else |
| Languages | `.astro` components; TypeScript in component frontmatter and in `src/data`, `src/i18n`, `src/config`, `src/lib` |
| Styling | Plain CSS: design tokens in `src/styles/tokens.css`, base and layout in `src/styles/global.css`, and scoped `<style>` blocks in each component. **No SCSS, Tailwind or CSS framework** |
| Client JavaScript | Small inline scripts only (reveal-on-scroll, header and mobile menu, contact form, `dataLayer` click tracking). No UI framework |
| Page transitions | Native cross-document View Transitions (`@view-transition` in `global.css`) |
| Fonts | Satoshi (EN, self-hosted WOFF2) · IBM Plex Sans Arabic (AR, via @fontsource) |
| Type checking | `npm run check` (`@astrojs/check` + TypeScript, dev dependencies only; strict config in `tsconfig.json`) |
| Optional tooling | Python 3 (standard library only) for the export scripts · Playwright (+ axe-core) for `tools/qa/` and the OG-image script · Python with Pillow, NumPy and potrace for `tools/brand/build_logo.py` |

## 2. Package contents

```
SAYTAMM_COMPLETE_SOURCE_HANDOVER/
├── PROJECT_HANDOVER.md        ← this document
├── README.md                  repository overview
├── site/                      ★ the website (Astro project). Run everything from here
│   ├── package.json, package-lock.json, astro.config.mjs, .gitignore, .env.example
│   ├── README.md              older site notes (v0.1-era route table; this document supersedes it)
│   ├── src/
│   │   ├── config/site.ts     business facts (email, domain), staging/production flag
│   │   ├── i18n/ui.ts         interface copy EN + AR (nav, meta titles/descriptions, hero, forms, footer)
│   │   ├── i18n/home.ts       homepage, About and case-page copy EN + AR
│   │   ├── i18n/paths.ts      locale-prefixed URL helpers: href(), caseHref(), other()
│   │   ├── data/cases.ts      7 case studies: story, KPIs, visuals, evidence status
│   │   ├── data/services.ts   4 disciplines and 9 services
│   │   ├── data/clients.ts    "Brands we've worked with" (12 brands, logo slots, display-permission flag)
│   │   ├── lib/logo.ts        reads the official symbol paths verbatim from assets/logo/symbol.svg
│   │   ├── assets/logo/symbol.svg   official symbol (source for every in-page logo)
│   │   ├── styles/tokens.css, global.css
│   │   ├── layouts/Base.astro <html lang/dir>, SEO head, JSON-LD, preview bar, header/footer, scripts
│   │   ├── components/        Logo, Pattern, PageHero, SectionHead, Header, Footer, ContactForm
│   │   ├── components/home/   Hero, SelectedWork, Brands, HomeServices, Approach, Results, HomeAbout, FinalCta
│   │   ├── components/work/   CaseMedia (photos / screens / to-scale data composition)
│   │   └── pages/             routes (see §5)
│   ├── public/
│   │   ├── brand/             favicons and logo files used by the site
│   │   ├── fonts/satoshi/     Satoshi 400/500/700 WOFF2 (see the licence note in §8)
│   │   ├── og/                Open Graph images EN/AR (1200×630)
│   │   └── work/              portfolio images (WebP)
│   ├── scripts/               fetch-satoshi.mjs, make-preview-link.py, make-review-html.py, make-og-images.cjs
│   └── docs/preview/          v0.3 and v0.4 screenshots
├── brand/                     official brand assets, original quality
│   ├── SOURCES.md             what each file is, which source wins, verification notes
│   ├── production/logo/       ★ production logo set: SVG + PNG, every approved colourway (+ README)
│   ├── assets/                original brand asset package (logo PNGs, pattern tiles, colour/type specs)
│   ├── source/                Brand Bible (md), Visual Identity Guidelines 2026 (pptx/pdf/md), Full Visual Guidelines (pptx/pdf)
│   ├── reference/             master logo renders and concept boards (direction only; see SOURCES.md)
│   └── fonts/                 Satoshi + IBM Plex Sans Arabic files with licence notes
├── docs/                      strategy knowledge base: positioning, services, audience, voice, visual identity,
│                              portfolio verification, SEO, technical architecture, DECISION_LOG, OPEN_QUESTIONS,
│                              WEBSITE_V04_REPORT (latest change log and QA)
├── source-material/portfolio/ original case-study PDFs that the case content and figures were taken from
└── tools/
    ├── brand/                 scripts that produced the production logo files
    └── qa/                    Playwright QA scripts: layout sweep, functional, accessibility (axe), figure leak check
```

## 3. Install, run, build

All commands run inside `site/`.

```bash
cd site
```

```bash
npm ci
```

```bash
npm run dev
```
The dev server runs at http://localhost:4321/ (the root redirects to `/en/`).

```bash
npm run build
```
This produces the **staging** build in `site/dist/`: noindex, robots `Disallow: /`, preview bar, and unconfirmed figures shown with a "Pending confirmation" tag.

```bash
npm run build:production
```
This produces the **production** build in `site/dist/`: indexable, no preview bar, and figures withheld for every case that isn't approved. Run it only for the authorised launch.

```bash
npm run preview
```
This serves the last build from `dist/` locally.

```bash
npm run check
```
This type-checks all `.astro` and `.ts` files in `src/`.

Notes:
- `dev`, `build` and `build:production` first run `npm run fonts`. It **skips** the download when the three Satoshi files are already in `public/fonts/satoshi/`, which is the case in this package. If they are missing, it downloads them from Fontshare (needs internet).
- `npm run build:preview-link` builds the private claude.ai preview bundle (`dist-artifact/` → `preview-link/`, with Figtree as a stand-in font). `python3 scripts/make-review-html.py` (run after `npm run build`) writes the self-contained offline review HTML files to `review-html/`. Neither is needed for normal development.
- Environment variables: see `site/.env.example`. Neither variable is needed for dev or a staging build.

## 4. Deployment

This is a static site. Deploy the contents of `site/dist/` to any static host (Vercel, Netlify, Cloudflare Pages, S3 + CloudFront…). Settings: build command `npm run build:production`, output directory `dist`, Node 22.23.4 or later.

At deploy time:
- Replace the root meta-refresh (`src/pages/index.astro`) with a **301 from `/` to `/en/`** at the host.
- Serve `404.html` as the 404 page.
- URLs use **trailing slashes** (`trailingSlash: 'always'`, `build.format: 'directory'`).

## 5. Routing

| Route (EN) | Route (AR) | Source file |
|---|---|---|
| `/en/` | `/ar/` | `src/pages/[lang]/index.astro`: Hero → Selected work → Brands → Services → How we work → Results → About → CTA |
| `/en/work/` | `/ar/work/` | `src/pages/[lang]/work/index.astro`: index of all cases |
| `/en/work/<slug>/` | `/ar/work/<slug>/` | `src/pages/[lang]/work/[slug].astro`, one page per entry in `data/cases.ts`. Slugs: `fashion-beauty-scale`, `ks-furniture`, `qnb-ramadan`, `muriya`, `electronics-q4`, `bio-group`, `damac-paramount` |
| `/en/services/` | `/ar/services/` | `src/pages/[lang]/services.astro`. Anchors `#strategy`, `#creative`, `#media`, `#digital` and one per service id |
| `/en/about/` | `/ar/about/` | `src/pages/[lang]/about.astro` |
| `/en/contact/` | `/ar/contact/` | `src/pages/[lang]/contact.astro`. `?service=<discipline-id>` preselects a discipline |
| `/` | | `src/pages/index.astro`: noindex meta-refresh to `/en/` |
| `/404.html` | | `src/pages/404.astro` |
| `/sitemap.xml` | | `src/pages/sitemap.xml.ts`: all 24 localised URLs with hreflang alternates |
| `/robots.txt` | | `src/pages/robots.txt.ts`: `Disallow: /` on staging, `Allow` + sitemap on production |

Every page is generated for both locales via `getStaticPaths` (`staticLangPaths()` in `i18n/paths.ts`). Always build internal links with `href(lang, page, hash?)` or `caseHref(lang, slug)`.

## 6. Arabic / English implementation

- **URLs:** both languages are prefixed (`/en/…`, `/ar/…`); `x-default` = `/en/`.
- **Document:** `Base.astro` sets `<html lang dir>` (`ar` → `rtl`), the canonical URL, hreflang `en` / `ar` / `x-default` and `og:locale`. Pages outside the fixed page list (case pages) pass `paths={{ en, ar }}` so that the canonical URL, hreflang and the language switch all point to the equivalent page.
- **Copy:** every string lives in `src/i18n/ui.ts` (interface) and `src/i18n/home.ts` (homepage, About, case pages) under `en` and `ar` keys, accessed as `t(lang)` and `h(lang)`. Data files (`cases.ts`, `services.ts`, `clients.ts`) store bilingual fields as `{ en, ar }`. Arabic was written separately, not translated line by line.
- **CSS:** logical properties throughout (`inset-inline-*`, `padding-inline-*`, `margin-inline-*`). Arabic typography overrides live under `[dir='rtl']` in `tokens.css` (font, line heights, no letter-spacing, no uppercase).
- ⚠️ **Astro scoped-style rule:** inside a component `<style>`, write `:global([dir='rtl']) .x { … }`. A plain `[dir='rtl'] .x` compiles to a selector that never matches `<html>`.
- **Mixed direction:** figures and Latin strings inside Arabic text are wrapped in `<bdi>` or class `latin` so that values like `13.84×` or `$1.51M` don't get reordered. Brand names stay in Latin script in both languages.
- **Never mirrored:** the logo, the brand diagonal and the pattern.

## 7. Where content and assets live

| What | Where |
|---|---|
| Business facts (email, domain; phone, address and legal details are `null` until confirmed) | `src/config/site.ts` |
| Page copy EN/AR | `src/i18n/ui.ts`, `src/i18n/home.ts` |
| Case studies (text, KPIs, visuals, evidence) | `src/data/cases.ts` |
| Services and disciplines | `src/data/services.ts` |
| Brands wall | `src/data/clients.ts`. Add `logo: { src, w, h }` to a brand to show an official logo file instead of the name. `permission: 'pending'` hides a brand in production (Saudi GEA today) |
| Logo used by the site | `src/assets/logo/symbol.svg` (read by `lib/logo.ts` → `components/Logo.astro`, `Pattern.astro`) and `public/brand/*` (favicons, JSON-LD logo) |
| Portfolio images | `public/work/*.webp` (referenced from `cases.ts`) |
| Founder photo | `public/team/mostafa-sofy.webp` (900 px, used on About); original in `brand/people/` |
| OG images | `public/og/saytamm-og-{en,ar}.png`, rebuilt by `scripts/make-og-images.cjs` from `public/visuals/og-bg-en.webp` + the official logo SVG + brand fonts |
| Illustrative visuals (AI-generated, decorative only) | `public/visuals/*.webp`; masters in `brand/visuals-ai/`. Never use them as case or client material (`docs/AI_VISUAL_PROMPTS.md`) |
| Fonts | `public/fonts/satoshi/` (Satoshi); `@fontsource/ibm-plex-sans-arabic` via npm (Arabic) |
| Full logo set and brand originals | `/brand` (see `brand/SOURCES.md` and `brand/production/logo/README.md`) |

**Publishing a case's figures:** set `evidence.status: 'approved'` in `cases.ts` once the figures are confirmed. In production, figures appear only for approved cases (`showFigures()` in `cases.ts`). The homepage Results section appears in production only once at least one of its cases is approved. Keep budgets and figures out of the always-visible fields (`context`, `challenge`, `strategy`, `execution`, `headline`); put them in `outcome`, `kpis`, `bar` and `note`, which are withheld. **ROAS is not profit:** never describe a result as profitable without financial evidence.

## 8. Contact form

`src/components/ContactForm.astro`:
- Fields: name, work email, company, role, phone (optional), website (optional), needs (4 disciplines + "not sure"), monthly budget (optional), message, consent. A hidden honeypot field catches bots.
- Client-side validation with an error summary, inline errors, `aria-invalid` and focus management. Optional phone and website fields are format-checked when filled in. The error line is always reserved so the layout doesn't shift.
- An information note above the fields (linked to the submit button by `aria-describedby`) tells visitors the form opens their email app. The button reads "Open in my email app". After submitting, a confirmation appears with a **Copy message** fallback and the address, in case no email app opens.
- **There is no backend.** Submitting opens the visitor's email app with a pre-filled message to **info@saytamm.com** (`mailto:`), and the form says so on screen. In the claude.ai preview build (`PUBLIC_DEPLOY_TARGET=artifact`), it shows the address instead.
- `?service=strategy|creative|media|digital` preselects a discipline (used by the Services page CTAs).
- Analytics events are pushed to `window.dataLayer`: `form_start`, `form_error`, `form_submit`. CTAs use `data-track` and push `cta_click`, `language_switch`, `email_click` and `case_study_view`.

To connect a real endpoint (OQ-19):
1. Choose the destination: CRM (HubSpot, Zoho, Pipedrive), a form service, or a serverless function on the chosen host that emails info@saytamm.com.
2. Replace the `mailto` step in the submit handler with a `fetch()` POST, and show success or error states from the real response.
3. Keep secrets server-side. A CRM key goes in a host environment variable used by a serverless function, never in client code. Add the variable names to `.env.example`.
4. Keep the honeypot; add Turnstile or reCAPTCHA if spam appears.
5. Publish a privacy notice and final consent wording first (OQ-49). Add a consent banner if analytics or tracking tags are added.
6. Update the on-page notice text so it no longer mentions the email app.

## 9. External services and integrations

| Service | Status |
|---|---|
| Fontshare (Satoshi download) | Used only by `scripts/fetch-satoshi.mjs` when the font files are missing |
| npm registry | Dependencies |
| Google Fonts | Used **only** in the claude.ai preview bundle (`make-preview-link.py`), not on the real site |
| Hosting, DNS, CDN | **None configured** |
| Form backend / CRM | **None.** `mailto:` only |
| Analytics / Tag Manager | **None installed.** `dataLayer` events are ready for GTM |
| Social profiles | None listed (`SITE.social` is empty until the handles are confirmed) |

No API keys, tokens, passwords or `.env` files are included or required.

## 10. Font licences

- **Satoshi** (ITF Free Font License): free for commercial use and self-hosting on your own website. **Do not redistribute it.** Don't commit the WOFF2 files to a public repository, don't upload them to third-party platforms or design tools, and don't subset or convert them. That's why the original repository gitignores `public/fonts/satoshi/` and fetches the files at build time. They are in this package so it builds offline.
- **IBM Plex Sans Arabic:** SIL Open Font License 1.1. Free to redistribute.

## 11. Known issues and unfinished work

**Content and approvals** (details in `docs/OPEN_QUESTIONS.md` and `docs/WEBSITE_V04_REPORT.md`):
1. **No case figure is approved yet** (OQ-44, OQ-32). In production every case shows "Figures published once confirmed". Original platform exports and client approvals are needed.
2. **Brand logos** for the 12 brands are not supplied; the wall shows names as text (OQ-39). Saudi GEA (a government entity) needs display permission.
3. **Arabic copy** needs native review (OQ-25, OQ-42, OQ-43).
4. **Five services** have scope pending: SEO, Content Marketing, Media Production, Website & CRO, Analytics & Growth (OQ-34).
5. **Founder:** the photo, bio, Arabic name, founding year (2021) and team size (30) are in place (D-015). No previous employers are named (owner decision). The legal check on the founder's current role at Steps (OQ-38) is still open.
6. Campaign visuals are missing for K.S Furniture, Muriya, Bio-Group, DAMAC and Electronics (OQ-41).
7. There is no drawn "SayTamm" wordmark yet, so the header shows the symbol only (OQ-05). Phone, WhatsApp, legal entity, CR and address are unknown (OQ-08, OQ-09). Social handles are unconfirmed (OQ-24).

**Technical:**
1. The contact form has no backend (mailto only), and no CRM is chosen (OQ-19).
2. Hosting is not chosen and the root `/` uses a meta-refresh; replace it with a host-level 301 (OQ-21).
3. There's no analytics or GTM container, and no cookie/consent banner. A privacy notice (PDPL) is still to be written and approved.
4. `scripts/make-og-images.cjs` needs Playwright (path issue fixed in Sprint 2). The OG images are already generated in `public/og/`.
5. `site/README.md` is a short pointer to this document.
6. `brand/SOURCES.md` says `assets/`, `source/` and `reference/` are "not yet committed". They are included in this package but are still outside the Git repository, pending the owner's decision (OQ-29).
7. The Playwright QA scripts are in `tools/qa/` (see its README). They aren't wired into a CI pipeline.
8. Five services show a summary only until their scope is confirmed (OQ-34). Projects without supplied visuals use an editorial facts panel (OQ-41).

**Last QA (Sprint 2):** see `docs/SPRINT_2_REPORT.md` §5.

**Previous QA (v0.4):**
- 24 pages × 6 viewports (360 → 2560 px): no horizontal overflow, console errors or broken images.
- 88/88 functional checks passed.
- The production build was verified as indexable with no unconfirmed figures.
- See `docs/WEBSITE_V04_REPORT.md`.

## 12. Rules to keep

- Use the official logo only, via `Logo.astro` or the files in `brand/production/logo/`. Never redraw, distort, mirror or approximate it, and don't add 3D effects.
- Don't invent clients, figures, testimonials, awards, team members, office locations or contact details. Unknown facts stay `null` or marked pending.
- Never publish the 57357 targeting detail (D-004).
- Keep staging builds noindex. Run the production build only for the authorised launch.
- Website palette: Obsidian `#09090D`, Graphite `#17171E`, Soft White `#F5F3FA`, Electric Purple `#6C35FF` used sparingly. Purple text under 24 px uses `#A78BFA` for contrast.
