# Sprint 2 report: completing and refining v0.4

> **Superseded in part by `SPRINT_3_REPORT.md` (2026-11-05).** Owner-level items listed here as open were approved by the project owner on 2026-11-05 (D-019); external and evidence items remain open in `OWNER_APPROVAL_REGISTER.md`. This report is kept as the Sprint 2 record.

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
| `site/src/pages/[lang]/about.astro` | Placeholders removed. Leadership shows the **founder photo supplied by the owner** (unedited, square), name and role; AboutPage JSON-LD with the founder |
| `site/public/team/mostafa-sofy.webp`, `brand/people/Mostafa_Sofy_Founder_original.webp` (new) | Founder portrait: a 900 px web version and the original 1254 px file |
| Illustrative visuals (W-020) | 9 owner-supplied AI images reviewed (no text, logos, faces, or fake ads or charts) and trimmed of edge artifacts. Placed on Services (one per discipline), About (atmosphere band), Contact and 404 (low-opacity textures, legibility checked). Decorative `alt=""`, lazy-loaded, 1200/2400 px `srcset`. OG images rebuilt on the new background with the official logo and real fonts; tagline updated to the current positioning |
| Illustrative visuals, batch 2 (W-020) | `work-hero` behind the Work page headline (`PageHero` now takes an optional image; dimmed in RTL), `cta-background` behind the closing CTA on every page, `approach-band` above the four disciplines in "How we work" |
| Founder bio and company facts (D-015) | The owner's bio was edited into a first-person, 3-paragraph site bio (EN + AR) with an expertise list; Arabic name «مصطفى صوفي». About facts are now 2021 founded · 30 people · 15+ years · 5 markets. Case attribution was reworded: the e-commerce cases (2021–22) postdate the 2021 founding, so "before SayTamm was founded" became "led by members of the SayTamm team, including work delivered at other agencies". The About story now states the owner's founding reason (closing the client–agency gap, fast communication, goal- and number-driven work). **Left out on purpose:** all employer names (owner decision, OQ-33), the current Managing Director role at Steps (OQ-38) and "double-digit ROAS" (OQ-51) |
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
| `docs/OPEN_QUESTIONS.md`, `docs/WEBSITE_V04_REPORT.md`, `docs/DECISION_LOG.md`, `PROJECT_HANDOVER.md`, `site/README.md`, `docs/SPRINT_2_REPORT.md`, `docs/AI_VISUAL_PROMPTS.md` (new) | Documentation. `AI_VISUAL_PROMPTS.md` holds prompts for illustrative imagery only, plus the list of visuals that must never be generated |

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

## 5. Tests performed (all executed; final run on the final code, 2026-11-04 13:14–13:30)

| Command / test | Result |
|---|---|
| `npm ci` + `npm run build` + `npm run build:production` from a fresh extract of `SAYTAMM_SPRINT_2_HANDOVER.zip` | see the handover verification in the delivery message |
| `npm run check` | 0 errors · 0 warnings · 0 hints |
| `npm run build` (staging) | Complete, no warnings. All 26 HTML pages noindex; robots `Disallow: /` |
| `npm run build:production` | Complete. Only the root redirect stub is noindex; robots `Allow: /` + sitemap; Results section absent; Saudi GEA absent |
| `qa.js sweep` (staging) | 168 checks (24 pages × 7 viewports: 360, 390, 768, 1024, 1440, 1920, 2560), **0 problems**. Covers overflow, console errors, failed requests, broken images, and the hero CTA in view and revealed on first paint |
| `qa.js sweep` (production) | 168 checks, **0 problems** |
| `func.js` (staging) | **114/114**: links, anchors, language switch, SEO tags, nav state, JSON-LD, form (preselect, validation, phone/website, notice, hidden-until-submit, copy fallback, event), mobile menu, brand permission gate |
| `a11y.js` (staging) | **102/102**: axe-core WCAG 2.1 A/AA, one h1, no skipped heading levels, visible keyboard focus, reduced motion (25 pages incl. 404) |
| `a11y.js --production` | **127/127**: the same, plus no internal or review wording visible to visitors |
| `figs.js` (production) | 25 pages: **0** unapproved figures in visible text, aria-labels or alt text |
| SEO audit (script) | 24 pages: no duplicate titles or descriptions; self-canonical; reciprocal hreflang; valid JSON-LD; descriptions 70–165 characters |
| Visual review | Homepage EN/AR at 1440 and 390 px; Services, About EN/AR, Contact, a case page (AR) at 1440 px; mobile 360, 390 and 768 px |

Bugs found by testing and fixed in this sprint: the form confirmation was visible before submit; the mobile hero CTA was hidden until scroll; an axe label-in-name failure; 404 contrast; 1–15 px overflows at 360 px; RTL alignment of Latin blocks; "100K" visible in production.

## 6. Remaining content approvals

1. All 7 cases: figures, client naming, years and periods (OQ-44, OQ-32, OQ-33).
2. Saudi GEA display permission, and official logos for the 12 brands (OQ-39).
3. Native Arabic review of all copy (OQ-25, OQ-42, OQ-43).
4. Founder facts are received and in use (D-015). Still open: the legal check on the current Steps role (OQ-38).
5. Scope for SEO, Content Marketing, Media Production, Website & CRO, Analytics & Growth (OQ-34).
6. Operating commitments (timelines, reporting cadence, audit offer) before they are published (OQ-50, OQ-14).

## 7. Missing visual assets

- Campaign visuals: K.S Furniture, Muriya, Bio-Group, DAMAC, electronics Q4 (OQ-41). They use the editorial panel or the to-scale data composition.
- Official logo files for the 12 brands (OQ-39).
- Team and workspace photography (OQ-41). The founder portrait has been received.
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
