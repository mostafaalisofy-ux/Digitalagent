# Website v0.4: final redesign report

Date: 2026-11-04 · Branch `claude/saytamm-brand-strategy-d2shzo` · Brief: "Final website redesign & implementation".
Screenshots: `site/docs/preview/v04-*`.

## 1. Audit findings (v0.3) and what was done about them

| Finding | Action |
|---|---|
| The hero used a CSS 3D extrusion of the logo; no approved 3D asset exists | Removed. The hero now uses the exact flat Signature symbol. Its only motion is an entrance: the blade travels in along its own diagonal (W-016) |
| The hero line ("Performance-led…") said what we do but not how | Replaced with the brief's line. Arabic was written separately |
| Selected work showed headline numbers with little story | Each project now states client, industry, market, period, objective, challenge, strategy, execution and outcome, with visuals and a link to a full case page |
| No case pages: "Read the case" pointed at anchors | 7 case pages × 2 languages, each with the evidence status and how the figures were measured (W-019) |
| The "Performance proof" section repeated Selected work figures (K.S, fashion) | Replaced by "What the work delivered": a ledger of **different** projects (Muriya, Bio-Group, electronics Q4), each with what was measured, the period and the source. No figure repeats on the homepage |
| Figures were presented as fact while still unconfirmed (OQ-32) | Every case is `pending`. Staging shows the figures with a "Pending confirmation" tag; **production withholds them** and says why (W-017). Verified by building production |
| The client list (13 names from case material) was mixed into About | New "Brands we've worked with" section with the owner's 12 brands, framed as team professional experience (W-018) |
| Services were presented as 9 tiles under 4 loosely named pillars | Four disciplines, each with its business value, laid out as an editorial index (D-014) |
| "Four disciplines" was used for both Services and How we work | Services became "Nine services. One objective." |
| About made claims about the "team since 2015" | Rewritten to what is documented: campaigns **led by our founder** since 2015 (D-006) |
| About page duplicated components (Process, Credibility, client list) | Removed. About = story → facts → how we work → brands → leadership → values → CTA |
| The "Credibility" block listed TikTok, LinkedIn and YouTube as delivered platforms (OQ-15 open) | Removed. Platforms appear only in the adopted service scope |
| Dead copy from v0.1 and v0.2 (philosophy, method, results, cred…) | Deleted from `ui.ts` |
| Arabic nav "تواصل" | Changed to «تواصل معنا» as briefed |
| Caption text was 13 px | Raised to 14 px; eyebrows to 13 px |

**Removed files:** `Sculpture.astro`, `Proof.astro`, `Credibility.astro`, `Process.astro`, `HomeClients.astro`, `CaseStudy.astro`, `CaseVisual.astro`.
**New files:** `home/Brands.astro`, `home/Results.astro`, `work/CaseMedia.astro`, `pages/[lang]/work/[slug].astro`, `pages/[lang]/work/index.astro` (rewritten).

## 2. Metrics used and their status

All metrics come from received source documents and have been arithmetic-checked. **None is approved yet** (OQ-44); production shows none of them.

| Case | Figures on the site | What it measures | Period | Source | Still to confirm |
|---|---|---|---|---|---|
| Fashion & beauty A / B (Egypt) | 13.84× and 8.91× ROAS; 27,703 and 6,930 purchases; EGP 535K → 7.4M | Meta-attributed purchase value ÷ spend | 10 Mar – 30 May 2022 | Meta Ads Manager screenshots in the deck | Original exports (the screenshots have corrupted digits); client approval |
| K.S Furniture (KSA) | 10.9× ROAS; SAR 100K → 1.09M; 507 orders; 446 first-time customers | Reported sales vs media budget | National Day season, **year unknown** | Published case study (previous agency) | Year; attribution method; export; approval |
| QNB Al Ahli (Egypt) | 7M views; 25M impressions; 50K clicks | Platform-reported awareness and traffic | Ramadan 2015 | Founder's case-study deck (2019) | Permission to name the bank with figures |
| Muriya (Oman) | 13 units; $1.51M; $18.2K spend | Value of units sold to campaign leads | **Unknown** | Published case study | Period; how sales were matched to leads |
| Electronics Q4 (Egypt) | $897K purchase value; 747 orders; $1,201 AOV | Meta-attributed | 1 Oct 2021 – 18 Jan 2022 | Meta screenshots | Export. The 119× ROAS is **deliberately not shown** |
| Bio-Group | 2× → 4× ROAS in two weeks; 2,970 purchases; 2.78% CR | Platform-reported ROAS, launch vs week two | **Unknown** | Published case study | Market, year, export |
| DAMAC Paramount (UAE) | $8 CPL; 15% qualified | As stated in the case study | **Unknown** | Published case study | Period, volume, permission to name DAMAC |

## 3. Content facts requiring your approval

1. **The 12 brands** and the wording "worked on in previous roles and agencies… not SayTamm clients or endorsements" (OQ-39). Saudi GEA is a government entity.
2. **"Campaigns led by our founder since 2015"** and **"5 markets in the team's track record"** (KSA, UAE, Kuwait, Oman, Egypt; Kuwait comes from the Marseilia 2018 case).
3. The **Arabic copy** throughout (OQ-25), especially the hero line, «أربعة تخصصات» (OQ-43) and the «قول تم» name explanation.
4. **Approval of each case** for publication (OQ-44) and whether previous agencies are named (OQ-33). They are currently described as "the team's previous agency".
5. **Service scope** for SEO, Content Marketing, Media Production, Web & CRO and Analytics (OQ-34). These are shown as "scope being finalised".
6. Founder bio, photo and the Arabic spelling of the name (OQ-40).

## 4. Assets still missing

- Official logo files for the 12 brands, with permission to display them (OQ-39)
- Campaign visuals for K.S Furniture, Muriya, Bio-Group, DAMAC and electronics (OQ-41). These cases use to-scale data compositions or no image
- Original platform exports for every metric (OQ-32)
- Founder photo; team and workspace photography (OQ-40, OQ-41)
- Drawn "SayTamm" wordmark (OQ-05); the header uses the symbol only

## 5. Technical QA (staging build)

- **Sweep:** 24 pages × 6 viewports (360×640, 375×812, 820×1180, 1366×768, 1536×864, 2560×1440) = 144 checks. Result: 0 horizontal overflow, 0 console errors, 0 failed requests or broken images, hero CTA above the fold on every homepage viewport.
- **Functional:** 88/88 checks.
  - All 24 internal routes return 200 and every in-page anchor resolves.
  - The language switch on a case page goes to the same case in the other language.
  - Canonical, hreflang (en/ar/x-default), lang/dir, staging noindex, nav active state on case pages and case JSON-LD (Article + BreadcrumbList) are correct.
  - Contact form: `?service=` preselects a discipline; validation and error states work; the submit event fires.
  - The mobile menu opens and closes on Escape.
- **Production build:** indexable (only the root redirect stub is noindex), robots allows crawling, no preview bar, and **no unconfirmed figure appears**.
- **Sitemap:** 24 URLs with alternates, including all case pages.

## 6. EN / AR checklist

- [x] `lang`/`dir` per page; IBM Plex Sans Arabic in AR, Satoshi in EN; no letter-spacing in Arabic
- [x] Arabic headlines sized separately (hero ×1.3 on mobile, ×0.86 on desktop)
- [x] Labels in sentence case in Arabic (no uppercase tracking)
- [x] Grids mirrored by logical properties; mark and pattern on the inline-end side
- [x] Brand diagonal never mirrored
- [x] Latin figures isolated with `<bdi>` (13.84×, $1.51M, 2× → 4×); brand names kept in Latin
- [x] Bars grow from the inline-start edge in both directions
- [x] Language switch keeps the visitor on the equivalent page (including case pages)
- [ ] Native Arabic review (OQ-25)
