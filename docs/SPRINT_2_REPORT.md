# Sprint 2 report: completing and refining v0.4

Date: 2026-11-04 · Branch `claude/saytamm-brand-strategy-d2shzo` · Base: v0.4 (`082a5f2`, tagged locally `v0.4-backup`; a Git bundle backup is kept outside the repo).
**Not deployed.** Staging builds stay noindex. No case evidence status was changed, and every case is still `pending`.

## 1. Files changed

| File | Change |
|---|---|
| `site/src/data/cases.ts` | New `context` field (business context) on all 7 cases. Profitability wording removed (ROAS ≠ profit, rule recorded in the file header). Headlines, objectives and challenges rewritten. `market` is now optional (Bio-Group's market is unknown and no longer printed). Two authentic fashion images added to the case gallery. The K.S budget split moved from the always-visible execution text into the withheld outcome. Muriya headline no longer hints at the budget |
| `site/src/data/services.ts` | Scope completed for 4 documented services (Digital Marketing Strategy, Branding & Identity, Social Media Marketing, Performance Marketing) from `docs/SERVICES_AND_CAPABILITIES.md`. The 5 unconfirmed services show their summary only |
| `site/src/data/clients.ts` | `permission: 'pending'` flag; Saudi GEA is hidden in production until its display permission is confirmed (`visibleBrands()`) |
| `site/src/i18n/ui.ts` | Contact page copy, form notice, submit label, confirmation, copy fallback, phone/website errors, footer descriptor, services index labels, shorter Services meta description |
| `site/src/i18n/home.ts` | Case field labels (Context / Approach / Channels / Services), data caption, How-we-work intro, brand count and permission labels, About leadership (placeholders removed), case page labels (The work / Outcomes / Previous case) |
| `site/src/pages/[lang]/services.astro` | Redesigned: discipline index bar, each discipline a distinct block (outlined numeral, name, value statement), two-column scope lists, staging-only "scope to be confirmed" tag |
| `site/src/pages/[lang]/work/[slug].astro` | Redesigned case page: header (client, headline, context), facts bar (unknown facts omitted), visuals, objective as a lead statement, three numbered steps, outcomes with KPIs and "how these figures were measured", previous/next pager, richer Article JSON-LD |
| `site/src/pages/[lang]/work/index.astro` | Unknown market/period omitted |
| `site/src/pages/[lang]/about.astro` | Leadership shows name and role only; the photo and bio placeholders are removed |
| `site/src/pages/404.astro` | Numeral contrast fixed |
| `site/src/components/work/CaseMedia.astro` | Case-page gallery (portrait triptych + landscape pair). A new **editorial panel** (channels, sector, market, services: verified facts only) for projects without visuals once figures are withheld. RTL alignment fixed |
| `site/src/components/home/SelectedWork.astro` | Story order Context → Challenge → Approach → Execution; unknown market omitted |
| `site/src/components/home/Brands.astro` | Redesigned typographic grid: index numbers, larger names, live "N brands · N sectors" count, case links, staging-only permission tag |
| `site/src/components/home/Results.astro` | Rendered in production only when at least one case is approved (it is omitted today); unknown periods hidden from visitors |
| `site/src/components/ContactForm.astro` | Honest information note (not a placeholder tag), submit button "Open in my email app" linked to that note, phone and website format validation, confirmation box fixed (it was visible before submit), copy-message fallback |
| `site/src/components/Footer.astro` | New composition: Signature mark, tagline, descriptor, contact column with "Start a project", navigation with current page, language |
| `site/src/components/Header.astro` | Language link accessible name now contains its visible text (WCAG 2.5.3) |
| `site/src/components/home/Hero.astro` | Compact mobile/tablet hero (no full-height box below 1024 px) and a short-screen rule for the Arabic headline, so the CTA is visible on first view from 360×640 upward |
| `site/src/layouts/Base.astro` | Reveal threshold raised (90% → 98% of the viewport) so an element starting in view, such as a CTA near the fold, is never left hidden |
| `site/src/styles/global.css` | `[hidden]` safety rule, RTL alignment for block-level Latin text |
| `site/scripts/make-og-images.cjs` | Hard-coded absolute path replaced with a path relative to the script |
| `site/package.json`, `package-lock.json`, `tsconfig.json` (new) | Type checking: `@astrojs/check` + `typescript` (dev only), `npm run check`, strict Astro TS config for `src/` |
| `tools/qa/*` (new in repo) | QA scripts: `qa.js`, `func.js`, `a11y.js` (new), `figs.js` (new), `wide.js`, README |
| `docs/OPEN_QUESTIONS.md`, `docs/WEBSITE_V04_REPORT.md`, `PROJECT_HANDOVER.md`, `site/README.md`, `docs/SPRINT_2_REPORT.md` | Documentation |

## 2. Content improvements

- **Case narratives:** every case now runs client & industry → context → objective → challenge → approach → execution → outcomes → visuals.
  - Seven new context statements, written only from source material.
  - "Profitable", "without giving up profitability" and "every pound… more than it cost" were removed. ROAS is described as a return on ad spend, never as profit.
- **Services:** documented scope added, including deliverables such as the positioning statement, messaging framework, channel priority plan, budget allocation model and written plan. Branding gained naming and tagline; Social gained audits, content calendars and reporting; Performance gained Display, creative testing and landing-page tests.
  - Timelines and operating commitments from the source are **not** published (OQ-50).
- **Contact page:** a new headline ("Tell us about the project." / «حدّثنا عن مشروعك.»), an intro that sets expectations, and the message label "What are you trying to achieve?".
- **How we work:** the intro is tighter.
- **About page:** the internal placeholder wording ("Photo to be supplied", "Biography… to be supplied") is removed; the story title is clearer.
- **Footer:** a descriptor line was added.
- **Arabic:** written separately for every new string. It still needs native review (OQ-25).

## 3. Visual improvements

- **Services:** the four disciplines are now visibly different. Each has its own block with an outlined numeral, alternating surfaces and a sticky header on desktop, plus an index bar to jump between them.
- **Case pages:** clearer hierarchy (headline and context side by side, a facts bar, objective lead statement, numbered steps), a real previous/next pager, and a gallery with consistent 2:3 portrait and 3:2 landscape crops.
- **Projects without visuals:** an editorial panel instead of an empty space or a placeholder.
- **Brands:** stronger typographic grid with index numbers and a sector count.
- **Footer:** rebuilt around a 12-column composition.
- **Form:** the information note, confirmation and fallback are styled consistently with the brand.
- **RTL:** step numbers, data figures and channel lists now sit on the Arabic reading edge.

## 4. Technical fixes

- Type checking added: `npm run check` gives 0 errors, 0 warnings and 0 hints (strict).
- Accessibility (axe-core): label-in-name on the language link, 404 contrast.
- Bug: the form confirmation box was visible before submitting (`display` overrode `hidden`). Fixed, with a regression test and a global `[hidden]` rule.
- Bug: on 390×844 phones the hero CTAs sat below the reveal threshold and stayed invisible until the visitor scrolled; the v0.4 check measured position, not visibility. Fixed (compact mobile hero, reveal threshold), and `qa.js` now checks the CTA is both in view and **revealed** on first paint at every viewport.
- Production: the Results section is omitted while no case is approved; unknown periods and markets are never shown to visitors; Saudi GEA is hidden.
- SEO audit over all 24 pages: no duplicate titles or descriptions, self-canonical everywhere, reciprocal hreflang, valid JSON-LD, descriptions 70–165 characters (one long description shortened).
- No machine-specific paths remain in the project.
- Client JavaScript is 2.5 KB external plus small inline scripts.

## 5. Tests performed (all executed in this sprint)

| Command / test | Result |
|---|---|
| `npm ci` (in the handover package) | see §8 |
| `npm run check` | 0 errors · 0 warnings · 0 hints |
| `npm run build` (staging) | Complete, no warnings. 26 HTML pages carry noindex; robots `Disallow: /` |
| `npm run build:production` | Complete. Only the root redirect stub is noindex; robots `Allow: /` + sitemap; Results section absent; Saudi GEA absent |
| `figs.js` (production) | 25 pages: **0** visible unapproved figures (first run found "100K" in the K.S execution text; fixed and re-run) |
| `a11y.js --production` | 127/127: axe WCAG 2.1 AA, headings, keyboard focus, reduced motion, no internal wording visible |
| `qa.js sweep` (production) | 168 checks (24 pages × 7 viewports), 0 problems |
| `qa.js sweep` (staging) | 168 checks, 0 problems |
| `func.js` (staging) | 114/114 |
| `a11y.js` (staging) | 102/102 |
| Visual review | Services, case (AR), About, Contact and homepage at 1440 px; homepage at 390 px |

## 6. Remaining content approvals

1. All 7 cases: figures, client naming, years and periods (OQ-44, OQ-32, OQ-33).
2. Saudi GEA display permission, and official logos for the 12 brands (OQ-39).
3. Native Arabic review of all copy (OQ-25, OQ-42, OQ-43).
4. Founder bio, photo, Arabic name spelling, founding year, team (OQ-40).
5. Scope for SEO, Content Marketing, Media Production, Website & CRO, Analytics & Growth (OQ-34).
6. Operating commitments (timelines, reporting cadence, audit offer) before they are published (OQ-50, OQ-14).

## 7. Missing visual assets

- Campaign visuals: K.S Furniture, Muriya, Bio-Group, DAMAC, electronics Q4 (OQ-41). They use the editorial panel or the to-scale data composition.
- Official logo files for the 12 brands (OQ-39).
- Founder portrait; team and workspace photography (OQ-40, OQ-41).
- Higher-resolution originals of the fashion photography (current files are about 550–640 px wide).
- Drawn "SayTamm" wordmark (OQ-05).

## 8. Outstanding business decisions (before launch)

- Form backend / CRM and lead ownership (OQ-19).
- Hosting and DNS (OQ-21), with the root `/` replaced by a 301 to `/en/`.
- Privacy notice and PDPL consent (OQ-49); analytics and consent banner.
- Phone and WhatsApp, legal entity, CR, VAT, address (OQ-08, OQ-09).
- Social profiles (OQ-24).
- Default language and market targeting (OQ-06).

**The site is not production-ready** until these approvals, assets, business details, hosting, privacy and lead integrations are in place.
