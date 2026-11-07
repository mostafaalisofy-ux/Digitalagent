# Sprint 3 report — final completion, QA and production readiness

Dates: 2026-11-05 → 2026-11-07 · Baseline: tag `sprint3-baseline` (`4b760ca`) · Branch: `claude/saytamm-brand-strategy-d2shzo`
**Nothing was deployed, published or indexed. No DNS, hosting or account settings were changed.**

## 1. Status

**Technically ready, awaiting approvals and legal review.** All owner-level decisions are approved (global authorisation, D-019). The build, SEO, layout, functional and accessibility tests pass on both builds. Release is gated by legal review of the privacy notice and the Steps checklist, the company's legal details, native Arabic review, hosting/DNS and the owner's launch instruction (`PRODUCTION_RELEASE_CHECKLIST.md`).

| Area | Status |
|---|---|
| Owner approvals | **Approved** by explicit project-owner authorisation, 2026-11-05 (D-019 to D-022) |
| Implementation | **Completed** for everything within verified information (§3) |
| External permissions (client logos/names, government bodies, RCRC, case clients) | **Not verified** — owner-asserted only; government bodies hidden in production |
| Legal review | **Outstanding** — privacy notice is a labelled draft; Steps checklist open |
| Evidence for case figures | **Incomplete** — original exports missing; production withholds all 7 cases' figures |

## 2. What was reviewed

The full Astro source, all 26 pages in both languages, every component, data file, SEO route and QA script; the docs set; the Steps Selected Work deck; owner-sent client material. Baseline findings: `SPRINT_3_BASELINE_AUDIT.md`.

## 3. What changed

| Change | Files / doc |
|---|---|
| **Positioning (D-020):** "a digital marketing & performance agency", no Saudi-only wording in titles, meta, OG images, schema, hero, footer, services | `POSITIONING_AUDIT.md` |
| **About page rewritten** EN/AR: hero, experience (2021 founding vs founder's 15+ years kept separate), markets as team experience, one team / four disciplines, philosophy, leadership, close | `pages/[lang]/about.astro`, `i18n/home.ts` |
| **Stats bug fixed:** numbers overlapped dividers; new `Facts` component sizes numbers from the grid width (container units), tabular numerals, 0 overflow measured at 360–1440 px in LTR and RTL | `components/Facts.astro` |
| **Five service scopes completed** from evidence (content, production, SEO, web & CRO, analytics) | `data/services.ts`, `SERVICES_AND_CAPABILITIES.md` §Evidence |
| **Privacy notice** (draft — legal review required), footer and consent links | `pages/[lang]/privacy.astro`, `LEGAL_AND_PRIVACY_REVIEW.md` |
| **Contact form:** optional industry, market, timeline; role optional; consent linked | `ContactForm.astro`, `CONTACT_AND_CRM_INTEGRATION.md` |
| **SEO:** 404 noindex (was indexable in production); Service schema; no `areaServed` restriction; validator `seo.js` incl. positioning regression check | `SEO_FINAL_AUDIT.md` |
| **Clients (D-021, D-022):** one list «عملاء وثقوا بفريق قول تم»; 23 tile logos; a wall of 47 logos + 11 names; 18 low-quality logos removed; government bodies staging-only | `CLIENT_AND_BRAND_APPROVAL_REGISTER.md` |
| **Work:** 28 projects, 54 posts added from the Steps deck, filterable gallery and viewer, home work wall | `data/work.ts`, `WorkWall.astro`, `WorkMarquee.astro` |
| **UX:** shorter homepage cases, compact client grid, homepage order per brief | `UX_REVIEW.md` |
| **Arabic:** «منشورات» replaces «بوستات/سوشيال» (91×); tatweel fixes; native rewrite of About | `ARABIC_ENGLISH_QA.md` |
| **Node engine declared** (`engines`, `.nvmrc`); requirement unchanged (≥ 22.23.4, from Astro) | `site/package.json` |

Modified source files (from baseline): `scripts/make-og-images.cjs`, `scripts/make-review-html.py`, `components/{ContactForm,Facts,Footer,PageHero}.astro`, `components/home/{Clients,HomeAbout,SelectedWork}.astro`, `config/site.ts`, `data/{clients,services,work}.ts`, `i18n/{home,paths,ui}.ts`, `layouts/Base.astro`, `pages/404.astro`, `pages/[lang]/{about,index,privacy,services}.astro`, `pages/sitemap.xml.ts`; QA: `tools/qa/{a11y,func,qa,seo,shots,perf}.js`, `paths*.txt`, `README.md`.

## 4. What was not changed, and why

- **Case figures stay withheld in production**: owner authorisation covers presentation, not verification (OQ-32, OQ-44).
- **"Built on experience since 2014" and "30+"** not published: no evidence for 2014; the owner confirmed 30, not 30+.
- **No CRM, analytics or consent banner**: no credentials or IDs exist; nothing is tracked, so none is needed yet.
- **No legal entity, CR, VAT, address or phone**: not supplied; never invented.
- **Case-page attribution line** kept ("including work delivered at other agencies") because those pages carry figures (D-022).
- **Government-body logos** hidden in production until permission is documented.

## 5. Tests

See `QA_REPORT.md`. Summary: check 0 errors · SEO 706/706 (both builds) · layout 234/234 checks at 9 widths (both builds) · functional 405/405 · accessibility 110/110 staging, 137/137 production · 0 unapproved figures in 27 production pages · handover rebuild identical.

## 6. Outstanding owner actions

`OWNER_APPROVAL_REGISTER.md` lists each with whether it blocks release. Release-blocking: legal review of the privacy notice (with legal details and provider names), the Steps/founder legal checklist, native Arabic sign-off, hosting/DNS, launch instruction.

## 7. Risks

1. **Client logos and names (100+) without written permission** — owner-asserted. Large global brands (Ford, Shell, Nintendo, Cisco, Huawei) may object if the relationship was through a distributor. Mitigation: confirm in writing before launch, or keep only confirmed ones.
2. **Work shown from the Steps deck as SayTamm's own** (owner statement, D-021) while the founder's role at Steps is unresolved (OQ-38): legal review recommended before launch.
3. **Privacy notice is a draft**; PDPL compliance needs counsel.
4. **MIX posts name RCRC/U20** — external permission not verified.

## 8. Handover

`handover/SAYTAMM_SPRINT_3_FINAL_HANDOVER.zip`: source (git HEAD), fonts for offline build, brand assets, the verified production build (`production-build/`), QA evidence (log + 52 screenshots). Excludes `node_modules`, caches, `.env`, secrets. Internal use only (contains Satoshi font files).
