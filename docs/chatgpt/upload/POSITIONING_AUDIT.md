# Global positioning audit — "a digital marketing & performance agency"

Date: 2026-11-05 · Decision: **D-020**. Before-state: commit `764f6b1`. Scope: every source file in `site/src` and `site/scripts` (pages, components, layouts, copy, data, SEO routes, structured data, OG image script), then the **built output of all 26 pages** (visible text, `<title>`, meta, Open Graph, JSON-LD).

**Rule applied:** SayTamm is never described as a Saudi, Saudi-based or Saudi-focused agency. Saudi Arabia stays wherever it is a fact: real client projects and markets, the team's experience, the founder's biography, or product origin.

## 1. Changed (positioning removed or neutralised)

| # | File : line (before) | Page / surface | Before | After |
|---|---|---|---|---|
| 1 | `i18n/ui.ts:8` | EN home `<title>`, OG title | SayTamm — Digital Marketing & Performance Agency in Saudi Arabia | SayTamm \| Digital Marketing & Performance Agency |
| 2 | `i18n/ui.ts:9` | EN home description, OG | …a Saudi-focused digital marketing and performance agency… | SayTamm connects strategy, creative, media and technology to help brands move forward through purposeful digital marketing and performance. |
| 3 | `i18n/ui.ts:16` | EN About title | About SayTamm — Saudi Digital Marketing & Performance Agency | About SayTamm \| Digital Marketing & Performance Agency |
| 4 | `i18n/ui.ts:17` | EN About description | …a Saudi-focused agency that plans, runs and measures… | Who SayTamm is, how we think and how we work: one team connecting strategy, creative, media and technology to each brand's business objective. |
| 5 | `i18n/ui.ts:23` | EN hero eyebrow (home) | Digital marketing & performance agency · Saudi Arabia | Digital marketing & performance agency |
| 6 | `i18n/ui.ts:25` | EN hero supporting line | A digital marketing and performance agency for the Saudi market… | SayTamm brings strategy, creative, media and technology together under one connected approach to growth, with every channel answering to the sales, leads or revenue you set at the start. |
| 7 | `i18n/ui.ts:49` | EN footer (every page) | Digital marketing & performance agency · Saudi Arabia | Digital marketing & performance agency |
| 8 | `i18n/ui.ts:54` | AR home `<title>` | قول تم \| SayTamm — وكالة تسويق رقمي وأداء في السعودية | قول تم \| وكالة تسويق رقمي وأداء |
| 9 | `i18n/ui.ts:55` | AR home description | …تركّز على السوق السعودي… | قول تم وكالة تسويق رقمي وأداء تجمع الاستراتيجية والإبداع والإعلانات والتقنية في منظومة واحدة لدعم نمو العلامات التجارية. |
| 10 | `i18n/ui.ts:62` | AR About title | …وكالة تسويق رقمي وأداء في السعودية | من نحن \| قول تم — وكالة تسويق رقمي وأداء |
| 11 | `i18n/ui.ts:63` | AR About description | …وكالة تركّز على السوق السعودي… | من نحن وكيف نفكر وكيف نعمل: فريق واحد يربط الاستراتيجية والإبداع والإعلانات والتقنية بهدف العمل لدى كل علامة. |
| 12 | `i18n/ui.ts:69` | AR hero eyebrow | وكالة تسويق رقمي وأداء · السعودية | وكالة تسويق رقمي وأداء |
| 13 | `i18n/ui.ts:71` | AR hero supporting line | وكالة تسويق رقمي وأداء للسوق السعودي… | في قول تم، نجمع الاستراتيجية والإبداع والإعلانات والتقنية في منظومة واحدة… |
| 14 | `i18n/ui.ts:95` | AR footer (every page) | وكالة تسويق رقمي وأداء · السعودية | وكالة تسويق رقمي وأداء |
| 15 | `i18n/ui.ts:41, 87` | Contact form market options | Saudi Arabia / Other GCC / Egypt / More than one / Other | + UAE, other MENA market, outside MENA (options, not positioning) |
| 16 | `i18n/home.ts:63` | EN home "About" title | A Saudi digital marketing & performance agency. | A digital marketing & performance agency. |
| 17 | `i18n/home.ts:65` | EN home "About" body | …for brands in Saudi Arabia and the Gulf… | …as one connected system… |
| 18 | `i18n/home.ts:69` | EN "Why SayTamm?" | In Saudi dialect, «قول تم»… | In everyday Gulf Arabic, «قول تم»… (etymology kept, wider) |
| 19 | `i18n/home.ts:85` | EN About hero intro | A Saudi-focused digital marketing and performance agency… | Full About rewrite (see §4) |
| 20 | `i18n/home.ts:178` | AR home "About" title | وكالة تسويق رقمي وأداء في السعودية. | وكالة تسويق رقمي وأداء. |
| 21 | `i18n/home.ts:180` | AR home "About" body | …للعلامات التجارية في السعودية والخليج… | …كمنظومة واحدة مترابطة… |
| 22 | `i18n/home.ts:200` | AR About hero intro | وكالة تسويق رقمي وأداء تركّز على السوق السعودي… | Full About rewrite (see §4) |
| 23 | `data/services.ts:22–23` | Digital Marketing Strategy | Market and competitor research across Saudi Arabia and the Gulf | …in each market you compete in, from Saudi Arabia and the Gulf to the wider region |
| 24 | `data/services.ts:43–44` | Social Media Marketing | content calendars built around Saudi cultural moments | …around each market's cultural moments |
| 25 | `data/services.ts:50–51` | Content Marketing | including Saudi dialect | including local dialects such as Saudi and Gulf Arabic |
| 26 | `layouts/Base.astro:34` | Organization JSON-LD (every page) | `areaServed: 'SA'` | removed; `description` added with the approved supporting statement |
| 27 | `pages/[lang]/services.astro:14,17` | Service JSON-LD | `areaServed: 'SA'` on 9 services | removed |
| 28 | `scripts/make-og-images.cjs:21` | OG images EN/AR (all pages) | …agency · Saudi Arabia / …وأداء · السعودية | …agency / وكالة تسويق رقمي وأداء (images regenerated) |

## 2. Retained on purpose (legitimate context)

| File | Occurrence | Why it stays |
|---|---|---|
| `i18n/home.ts:74, 231` · About markets list and copy (`home.ts` regional) | "Markets in the team's track record: Saudi Arabia, UAE, Kuwait, Oman, Egypt" | Team experience, documented: K.S (KSA), DAMAC (UAE), Muriya (Oman), Marseilia 2018 (Kuwait), several Egypt cases. Labelled as track record, not offices |
| `i18n/home.ts:148, 300` | Founder bio: "…across Saudi Arabia, Egypt and the wider Gulf" | Owner-supplied personal experience (D-015) |
| `i18n/ui.ts:13, 30, 59, 76` | Work page: case studies "in Saudi Arabia, the Gulf and Egypt" | Describes where the cases took place (factual) |
| `data/cases.ts` (3) | K.S market "Saudi Arabia", "Saudi National Day" | Real project market and season |
| `data/work.ts` (36) | Saudi National Day, Founding Day, "made in Saudi Arabia", Saudi dialect posts, Saudi homes | Real client work and its content |
| `data/clients.ts` (2) | Chery Saudi, Saudi GEA | Brand names |
| `data/services.ts` (4) | "from Saudi Arabia and the Gulf to the wider region", "Saudi and Gulf Arabic" | Market experience as capability, not a limit |
| Form options | "Saudi Arabia", "السعودية" | A choice for the visitor |

## 3. Final verification

Built-output scan of all 26 pages (body text, titles, meta, OG, JSON-LD) for: Saudi agency · Saudi digital · Saudi-based · Saudi marketing agency · Saudi performance · agency in Saudi · Saudi-focused · Saudi Arabia-based · for the Saudi market · · Saudi Arabia (suffix) · وكالة سعودية · وكالة تسويق سعودية · وكالة تسويق رقمي سعودية · وكالة إعلانات سعودية · وكالة أداء سعودية · مقرها السعودية · متخصصة في السوق السعودي · تركّز على السوق السعودي · للسوق السعودي · وأداء · السعودية.

**Result: 0 positioning occurrences.** The 7 remaining matches are all in §2 (team markets, founder bio, case markets, a Saudi-made product, a case's market label).

## 4. About page — rewritten

`site/src/pages/[lang]/about.astro` + `i18n/home.ts › aboutPage` (EN and AR written separately):
Hero ("A digital marketing & performance agency built to move brands forward." / «وكالة تسويق رقمي وأداء، تحوّل الأفكار إلى تأثير.») → Experience (with the founding story and a clear split: SayTamm founded 2021; founder's 15+ years) and the facts grid → Markets (team track record, no offices implied) → One team, four connected disciplines (names identical to the services page, each links to it) → Philosophy → Leadership → Our clients → Team experience → "Say it. Tamm it." close with CTA to contact. Removed: the duplicated Approach section and the values list (replaced by the philosophy).

## 5. Facts — verification register

| Figure | Published as | Evidence | Status |
|---|---|---|---|
| 2021 | "SayTamm founded" | Owner, D-015 | Verified (owner) — published |
| 30 | "People on the SayTamm team" | Owner, D-015 ("team of 30") | Verified (owner) — published. **"30+" not used** |
| 15+ | "Years of digital marketing leadership, led by our founder" | Owner bio, D-015 | Verified (owner) — attributed to the founder, not to the agency's age |
| 5 markets | "Markets in the team's track record" | Case documents (see §2) | Verified (documents) — not presented as offices |
| "Built on experience since 2014" | **Not published** | No document gives 2014 for the team's heritage | Owner to supply evidence if wanted |
| 200+ brands, 20+ industries | In the founder bio only | Owner bio, D-015 | Verified (owner), personal |

## 6. For owner review

1. "In everyday Gulf Arabic, «قول تم»…" — confirm the etymology wording (was "Saudi dialect").
2. Whether to add "since 2014" (needs a source).
3. Native review of the new Arabic About copy (OQ-25).
