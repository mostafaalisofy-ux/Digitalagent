# Sprint 3 — Baseline audit

Date: 2026-11-05 · Baseline commit `4b760ca` (git tag `sprint3-baseline`; full bundle kept outside Git).
Method: source inspection of `site/`, a staging build, scripted checks of the 26 built pages, and the existing QA suite (`tools/qa`). The source code is treated as the source of truth; where docs disagree, that is listed under §19.

Severity: **Critical** blocks a safe public launch · **High** should be fixed this sprint · **Medium** quality issue · **Low** polish. Items that previously waited for an owner decision are now **owner-approved (global authorisation, 2026-11-05)**; they are listed with the decision taken. Items that need an *external* permission, legal review or evidence are marked **External**.

## Summary

| # | Area | State at baseline | Worst severity |
|---|---|---|---|
| 1 | Architecture | Astro 7.4.5 static site, TypeScript strict, plain CSS tokens, data in `src/data/*.ts`, copy in `src/i18n/*.ts` | — |
| 2 | Page inventory | 26 HTML files: 5 pages × 2 languages, 7 case pages × 2, 404, root redirect | Medium (no privacy page) |
| 3 | AR/EN parity | Every page exists in both languages; switcher maps to the equivalent page | Low |
| 4 | Shared components | Header, Footer, PageHero, SectionHead, Logo, ContactForm, home/*, work/* | — |
| 5 | Brand assets | Official symbol SVGs only (D-011, W-007); no wordmark (W-011) | Low |
| 6 | Fonts | IBM Plex Sans Arabic via @fontsource; Satoshi fetched at build, never committed | Medium (licence archive OQ-18) |
| 7 | Images | WebP with width/height; AI visuals decorative only (W-020); client work authentic | Low |
| 8 | Navigation | Work · Services · About · Contact + CTA; mobile menu | — |
| 9 | Internal links | QA: 24 unique internal links, 0 broken | — |
| 10 | SEO metadata | Unique titles/descriptions on all 25 content pages; canonical, hreflang (en, ar, x-default), OG | Medium (no automated check) |
| 11 | Structured data | WebSite + Organization on every page; AboutPage with founder; case pages | Low |
| 12 | Accessibility | axe WCAG 2.1 AA clean after Sprint 2 fixes; focus, reduced motion | Medium (target now WCAG 2.2) |
| 13 | Responsive | Sweep at 7 widths (no 360/430/1280) | Medium |
| 14 | Forms | mailto form, honest notice, honeypot, client validation | High (fields; no privacy notice to link) |
| 15 | Analytics | No vendor tag installed; `data-track` → `dataLayer` only | — (correct) |
| 16 | Performance | Static HTML, lazy images, one 1.2 MB video with `preload="none"` | Low |
| 17 | Legal & privacy | No privacy notice; no company details; consent line only | **Critical** for launch |
| 18 | Case studies & claims | 7 cases, all `pending`; production withholds every figure | External (evidence) |
| 19 | Docs consistency | Several docs describe earlier states | Medium |
| 20 | Build & deploy | `npm run build` = staging (noindex); `build:production` indexable; Node ≥ 22.23.4 | — |

## Findings

### 1. Architecture
- **OK.** Routes: `src/pages/[lang]/{index,about,services,contact}.astro`, `work/index.astro`, `work/[slug].astro`, `404.astro`, `robots.txt.ts`, `sitemap.xml.ts`, `index.astro` (redirect).
- **Low:** `Pattern.astro` and `SectionHead.astro` should be checked for use; `RecentWork.astro` was already removed (replaced by `WorkMarquee` + `WorkWall`).

### 2. Page inventory
- **High:** no privacy notice page, although the form collects personal data (PDPL). → build `/en/privacy/`, `/ar/privacy/` as a labelled draft.
- **OK:** 404 page exists in both languages (single bilingual 404).

### 3. Arabic / English parity
- **OK:** every route exists in both languages; `altHref` keeps the visitor on the equivalent page, including case pages.
- **Low:** the Arabic name was flagged as "pending OQ-04" in `site.ts`. → owner-approved: **قول تم** (matches the Bible and everyday usage).
- **Low:** numerals (OQ-17). → owner-approved: Western digits (0–9) in both languages, as already implemented.

### 4. Shared components
- **OK** overall. `Footer` has no legal links. → add the privacy link.

### 5. Brand assets
- **OK:** only approved logo files are used. The header/footer use the symbol only, because no drawn wordmark exists (W-011). **Documented requirement, not invented:** EN wordmark and AR lockup (OQ-05).

### 6. Fonts
- **Medium / External:** Satoshi licence terms are not archived in the project (OQ-18). Files are fetched at build and never committed, which is correct.

### 7. Images and attribution
- **OK:** all `<img>` have width/height; decorative duplicates use `alt=""`. Client work is authentic and owner-confirmed; mockups are labelled; AI-regenerated client files were rejected (D-018).
- **Low:** unused public files `work/techhive-banner-800.webp`, `visuals/og-bg-ar.webp`. → remove from `public/` (masters stay in `brand/`).

### 8. Navigation — OK.

### 9. Internal links — OK (QA func suite).

### 10. SEO metadata
- **Medium:** checks were manual. → add `tools/qa/seo.js` (titles, descriptions, canonical, hreflang reciprocity, OG, JSON-LD parse, sitemap coverage, robots by stage).
- **Low:** `x-default` points to English. Decision (owner-approved): keep `/en/` as x-default and the root redirect; Arabic remains first-class via hreflang `ar`.

### 11. Structured data
- **OK:** only truthful fields (no address, rating, opening hours or social profiles, because none is verified).

### 12. Accessibility
- **Medium:** suite runs axe rule tags up to WCAG 2.1 AA. → add `wcag22aa` tags; keep the manual checks (focus visibility, heading order, reduced motion).

### 13. Responsive
- **Medium:** sweep widths were 390–2560. → test 360, 390, 430, 768, 1024, 1280, 1440, 1920 in both languages.

### 14. Forms
- **High:** fields do not capture industry, market or timeline, which the brief needs to qualify an enquiry; "role" is mandatory without a reason. → add optional Industry, Market and Timeline; make Role optional.
- **High:** the consent line has no privacy notice to link to. → link to the draft notice.
- **OK:** mailto behaviour is disclosed; no fake "sent" state; honeypot present.

### 15. Analytics
- **OK:** no GA4, GTM, Meta Pixel, CAPI, Google Ads, Snap or TikTok tag is installed. `data-track` events push to a local `dataLayer` only, with no personal data. Nothing should be activated before IDs and a consent mechanism exist.

### 16. Performance
- **Low:** largest assets: niimee video 1.2 MB (`preload="none"`), OG PNGs ~190 KB (not loaded by pages), work images ≤ 180 KB.

### 17. Legal and privacy
- **Critical for launch / External:** no legal entity, CR or VAT number, address or phone is verified (OQ-08, OQ-09). A privacy notice can be drafted from verified facts (what the form collects, where it goes), but it must be reviewed by counsel before launch.
- **External:** the founder's role at Steps (OQ-38) needs a neutral owner/legal checklist.

### 18. Case studies and claims
- **External (evidence):** all 7 cases are `pending`. The open items are original platform exports and client confirmation (OQ-32, OQ-44). Owner authorisation covers presentation, not verification, so production keeps withholding the figures. The narrative (context, challenge, strategy, execution) stays public.
- **OK:** ROAS is never described as profit; K.S sales are labelled total store sales (W-021).

### 19. Documentation consistency
- **Medium:** `OPEN_QUESTIONS.md` and `SPRINT_2_REPORT.md` still list owner-level items as open; `SERVICES_AND_CAPABILITIES.md` marks five scopes `[MISSING]`; `README.md`/`PROJECT_HANDOVER.md` predate the work wall and Sprint 3. → reconcile.

### 20. Build and deployment
- **Medium:** the Node ≥ 22.23.4 requirement comes from Astro 7's own `engines` field (`node_modules/astro/package.json`); the project's `package.json` did not declare it and there was no `.nvmrc`, so a host could pick an older Node and fail. → declare `engines.node >=22.23.4` and add `.nvmrc` (22.23.4). The environment runs 22.23.4; the requirement itself is unchanged. Staging is the default build; production indexing only through `npm run build:production`. No hosting config is committed; nothing is deployed.

## Implementation plan (this sprint)
1. Complete the five service scopes from documented capability evidence.
2. Privacy notice (draft, labelled), footer link, consent link; qualifying form fields.
3. Hero supporting copy: specific, Saudi-focused proposition.
4. SEO validation script and fixes; WCAG 2.2 tags; 8-width responsive sweep.
5. Registers and reports listed in the Sprint 3 brief; reconcile existing docs.
6. Full re-test, screenshots, handover folder and ZIP.
