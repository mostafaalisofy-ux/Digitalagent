# SayTamm (قول تم) — complete project knowledge

Last updated: 2026-11-07. This file summarises the whole project so far. Detail files are listed in §12.

## 1. The company

| | |
|---|---|
| Name | SayTamm (EN) · قول تم (AR, approved spelling) |
| What it is | A digital marketing & performance agency (positioning D-020) |
| Tagline | Say it. Tamm it. · قول. تم. |
| Name meaning | In everyday Gulf Arabic, «قول تم» is what you hear when a request is as good as done: you tell us the goal, we take responsibility for getting there |
| Founded | 2021 |
| Team | 30 people |
| Founder | Mostafa Sofy · مصطفى صوفي — 15+ years building and leading digital marketing operations across Saudi Arabia, Egypt and the Gulf; 200+ brands; 20+ industries |
| Why it exists | To close the gap between what a client needs and what their agency delivers: fast, direct communication, and work built around numbers and goals, not marketing for its own sake |
| Domain | www.saytamm.com (not live yet) |
| Public email | info@saytamm.com (primary: tamm@saytamm.com) |
| Unknown / never invent | Legal entity name, CR, VAT, address, phone/WhatsApp, social handles, office locations |

**Approved positioning copy**
- EN headline (About): "A digital marketing & performance agency built to move brands forward."
- EN supporting statement: "SayTamm brings strategy, creative, media and technology together under one connected approach to growth."
- AR headline: «وكالة تسويق رقمي وأداء، تحوّل الأفكار إلى تأثير.»
- AR supporting: «في قول تم، نجمع الاستراتيجية والإبداع والإعلانات والتقنية في منظومة واحدة. نفهم أهداف الأعمال، ونبني خطط التسويق، ونحوّلها إلى تنفيذ واضح ونتائج قابلة للقياس.»
- Values: Clarity, Ownership, Speed, Precision, Impact.
- Markets in the team's track record: Saudi Arabia, UAE, Kuwait, Oman, Egypt (experience, not offices).

## 2. Services — 9 services in 4 disciplines

| Discipline | Services |
|---|---|
| 01 Strategy & Consulting · الاستراتيجية والاستشارات | Digital Marketing Strategy |
| 02 Creative & Content · الإبداع والمحتوى | Branding & Identity · Social Media Marketing · Content Marketing · Media Production |
| 03 Media & Performance · الإعلانات والأداء | Performance Marketing (Google, Meta, Snapchat, TikTok, LinkedIn) |
| 04 Digital & Technology · التقنية والقنوات الرقمية | SEO · Website Development & CRO · Analytics & Growth |

Operating model: Strategy → Creative → Media → Performance, one team, judged by the same business number. Not published: delivery deadlines, packages, prices, certifications, a studio or in-house crew.

## 3. Brand identity — "Dark Editorial Performance"

- Palette: Obsidian `#09090D`, Graphite `#17171E`, Soft White `#F5F3FA`, muted `#96939F`, Electric Purple `#6C35FF` (accent ≤10%).
- Type: Satoshi (English; licence forbids redistribution) · IBM Plex Sans Arabic (Arabic).
- Logo: a "T" form with a separate 45° diagonal blade; solid mono default, two-tone Signature (white/black T + purple blade) for hero moments. No drawn wordmark yet: the header shows the symbol only. Never redraw, recolour or AI-generate it. Never mirror the diagonal.
- Style: premium editorial, strong type hierarchy, negative space, 12-column grid, purposeful motion only. Avoid: generic agency templates, neon/glow, particles, stock people, fake dashboards.

## 4. Website (built, in staging)

- Stack: Astro 7.4.5 static site, TypeScript strict, plain CSS tokens, Node ≥ 22.23.4. Repository: `mostafaalisofy-ux/Digitalagent`, branch `claude/saytamm-brand-strategy-d2shzo`, code in `/site`.
- Builds: `npm run build` = staging (noindex everywhere, preview bar, pending figures visible with a tag); `npm run build:production` = indexable, pending figures hidden.
- Pages (each in `/en/` and `/ar/`): Home, Work (+7 case pages), Services, About, Contact, Privacy; plus 404.
- Home order: Hero → Selected work (3 cases) → client work wall → Services → How we work → Clients who trusted the SayTamm team → Results → About → Final CTA.
- Contact: the form opens the visitor's email app with a prepared message to info@saytamm.com (mailto). No CRM or backend yet. Fields: name, work email, company, role, industry, market, timeline, services, phone, website, budget, message, consent.
- Privacy notice: published as **DRAFT — legal review required**. The site sets no cookies and runs no analytics or pixels.
- Tracking readiness: buttons push events (`cta_click`, `form_start`, `form_submit`, `email_click`, `case_study_view`, `language_switch`) to a local dataLayer only.
- QA (Sprint 3 final): type check 0 errors · SEO 706/706 · layout 234/234 at 9 widths · functional 405/405 · accessibility WCAG 2.2 110/110 staging, 137/137 production · 0 unapproved figures in production · LCP 1.0–1.9 s mobile.

## 5. Clients — one public list

Title: «عملاء وثقوا بفريق قول تم» / "Clients who trusted the SayTamm team" (D-022). Internally the register still records how each relationship started.

**Tile logos (23):** Xiaomi, GIG, Marriott, TECSPRO, SIEFCO, Chery Saudi, niimee, K.S Furniture, Fatora Plus, Siyaq, Kheir Zaman, METRO, Zahid Electra, MIX, Alqimma Equipment, BITUMAT, ALTOPIANO, Arhab, Tech Hive, Tech Craft; as names: JORA, Al Bustan, Exodus Travel, Beauty Lab, DC BLOCK.
**Wall (47 logos + 11 names):** e.g. Ford, Shell, Lincoln, Fiat, Huawei, Cisco, Nintendo, stc, Jahez, Naqel, Dar Al Arkan, Shawarmer, National Geographic, Eucerin, Filorga, LuLu, SAPTCO, Limak, Polaris… plus Toyota, BYD, DAMAC, QNB, Costa Coffee, Air Arabia, Radisson Blu, Buffalo Burger, Juhayna, Edita Foods, Saudi GEA.
**Hidden in production (government bodies, permission needed):** Kuwait Police, KNPC, Kuwait Oil Company, Ministry of Health, Kuwait Municipality, Riyadh Season, General Entertainment Authority, Saudi GEA.
**Removed for logo quality:** VOV, LEAP, Mamnon, Smart Touch, Darb Al Omda, Chicken Spot, OHI, Al Majed Oud, AMEX, Bin Al Basha, Cleopatra, Abo El Kheir, Alia, Ministries of Education and Public Works, Five Little Monkeys, Sahara, Saudi Falcons Club (can return with official files).

## 6. Client work on the site — 28 projects

Chery Saudi (2), Tech Hive (2), niimee (3, incl. an 18-s video), Zahid Electra (2), BITUMAT, GIG, Xiaomi, Marriott, MIX, Arhab, ALTOPIANO, METRO (packaging labelled mockup), Beauty Lab (labels + product photography, one mockup), Clean Basket (identity manual), JORA (identity on labelled mockups), TECSPRO, SIEFCO, DC BLOCK, Alqimma, Fatora Plus, K.S Furniture, Siyaq, Exodus Travel. Each project is described by facts only (client, format, what the piece says) — no objectives or results claimed.

Excluded on purpose: AI-regenerated client files (Gemini mark, garbled Arabic), a banknote with a royal portrait, posts with lookalikes of public figures, Lorem-ipsum grids.

## 7. Case studies — team track record (7)

| Case | Market | Headline figure (PENDING, hidden in production) | Missing evidence |
|---|---|---|---|
| Fashion & beauty e-commerce (anonymised) | Egypt, 2022 | ROAS 13.84× (Meta-attributed) | Ads Manager exports; client approval |
| K.S Furniture | Saudi Arabia, Aug–Oct 2024 | ROAS 4× → 10× (target 7×); total store sales SAR 1.09M (not ad-attributed) | Platform export; client approval |
| QNB Al Ahli Ramadan | Egypt, 2015 | 7M video views | Bank's permission to be named |
| Muriya | Oman | 13 units sold | Period; lead-to-sale matching |
| Electronics e-commerce (anonymised) | Egypt | purchase value via Meta | Export; approval |
| Bio-Group | — | ROAS 2× → 4× in two weeks | Market, year, export |
| DAMAC · Paramount Tower | UAE | $8 CPL, 15% qualified | Period, volume; permission |

Each case page: context, challenge, strategy, execution, outcome, how figures were measured, attribution line. Never publish a pending figure as fact. Never publish 57357's targeting detail.

## 8. Key decisions (latest)

- D-019: global owner authorisation for all owner-level decisions (2026-11-05).
- D-020: positioning — digital marketing & performance agency, no Saudi-only wording.
- D-021: Steps Selected Work deck — owner states the work is SayTamm's own; logos added as SayTamm clients.
- D-022: one client list, "Clients who trusted the SayTamm team".
- Earlier: SayTamm and Steps KSA are separate companies (D-005); SayTamm has rights to use the case studies (D-009); no previous agency named publicly (OQ-33).

## 9. Before launch (blocking)

1. Legal review of the privacy notice + company legal name, CR, VAT, email and hosting providers.
2. Legal review of the founder's role at Steps and showing Steps-deck work as SayTamm's (checklist in `LEGAL_AND_PRIVACY_REVIEW.md` §4).
3. Native Arabic sign-off.
4. Hosting + domain (recommended: Cloudflare Pages; apex → www 301; `/` → `/en/` 301; keep existing email DNS records).
5. Owner's explicit launch instruction.

Not blocking but open: written client permissions for logos; case exports; CRM; analytics IDs + consent banner; social handles; drawn wordmark; missing logo files (JORA, Al Bustan, Exodus, Beauty Lab, DC BLOCK).

## 10. Risks to keep in mind

- 100+ client names/logos shown on the owner's word, without written permission; global brands may have been served through distributors.
- Work from the Steps deck shown as SayTamm's while the Steps relationship is under legal review.
- MIX posts name the Royal Commission for Riyadh City.

## 11. Writing rules

- Arabic: native MSA, «» quotes, Arabic comma «،», «منشورات» not «بوستات», Western digits, no tatweel before Latin words, isolate English names. Saudi/Gulf dialect only when quoting a client's campaign.
- English: British spelling (optimise, colour), sentence-case headings, no clichés ("passionate", "innovative solutions", "help brands grow").
- Every claim traceable; when unsure, say what is missing.

## 12. Files in this project

| File | Use it for |
|---|---|
| `1_PROJECT_INSTRUCTIONS.md` | The rules (also pasted in the Instructions box) |
| `2_SAYTAMM_PROJECT_KNOWLEDGE.md` | This overview |
| `BRAND_FOUNDATION.md`, `BRAND_VOICE.md`, `VISUAL_IDENTITY.md` | Brand idea, voice, visual system |
| `BUSINESS_POSITIONING.md`, `TARGET_AUDIENCE.md`, `AGENCY_GROWTH_PLAN.md` | Strategy (D-020 overrides any KSA-only framing) |
| `SERVICES_AND_CAPABILITIES.md` | Service scope and evidence |
| `PORTFOLIO_AND_CASE_STUDIES.md` | Case sources and attribution rules |
| `DECISION_LOG.md`, `OPEN_QUESTIONS.md`, `OWNER_APPROVAL_REGISTER.md` | What is decided, what is open |
| `CLIENT_AND_BRAND_APPROVAL_REGISTER.md` | Every client and its status |
| `POSITIONING_AUDIT.md` | The positioning change, line by line |
| `SEO_STRATEGY.md`, `SEO_FINAL_AUDIT.md` | SEO |
| `LEGAL_AND_PRIVACY_REVIEW.md`, `CONTACT_AND_CRM_INTEGRATION.md` | Legal, privacy, form |
| `SPRINT_3_REPORT.md`, `QA_REPORT.md`, `PRODUCTION_RELEASE_CHECKLIST.md` | Current status and launch gate |
| `site_copy_ui.ts.txt`, `site_copy_home.ts.txt`, `site_data_*.ts.txt` | The live website copy and data (EN + AR) |
