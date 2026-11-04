# Decision Log

Every decision that changes brand, business or website direction is recorded here.
Format: ID · date · decision · decided by · rationale · source.
**Proposed** decisions are Claude recommendations awaiting the owner. Only **Approved** decisions bind the project.

## Approved

| ID | Date | Decision | By | Rationale / source |
|---|---|---|---|---|
| D-001 | 2026-11-04 | Brand foundation (idea, promise, personality, values, tagline system, palette, typefaces, master symbol) is treated as fixed | Owner (brief: "non-negotiable foundation") | Brand Bible 2026 |
| D-002 | 2026-11-04 | Owner confirms the right to use **all content** in the Infinity Corp e-commerce portfolio and the nsm+ case studies deck ("انا ليا الحق استغل كل الموجود هنا") | Owner | Rights to use are confirmed; attribution (who did the work) still follows the A/B/C/D framework. See `PORTFOLIO_AND_CASE_STUDIES.md` |
| D-003 | 2026-11-04 | **All services listed on steps-ksa.com become SayTamm services** (9 services) | Owner ("كل الخدمات اللي ف الموقع ده هتكون خدمات say tamm") | Replaces the 4-line proposal (former P-003). Grouping into 4 pillars remains a recommendation |
| D-005 | 2026-11-04 | **SayTamm and Steps KSA are separate companies** (Scenario C) | Owner | Steps work is not SayTamm work. No reuse of Steps' contact details, testimonials, client logos, claims or copy. No SEO migration. Steps is treated as a competitor in positioning |
| D-006 | 2026-11-04 | The owner **personally led** the Infinity Corp (2021–22) and nsm+ (2015–18) projects | Owner | These become Category C ("led by our founder"), publishable subject to red-flag rules and data verification |
| D-007 | 2026-11-04 | **Two-tone Signature mark approved** for hero moments (white/black T + Electric Purple blade); solid mono stays the default | Owner | Resolves C1 / OQ-02 (former P-001) |
| D-008 | 2026-11-04 | **Wordmark direction: "SayTamm"** in mixed case (Satoshi Bold base, to be custom-drawn); "Tamm" in purple allowed on the Signature lockup only | Owner | Resolves C9 / OQ-03 (former P-002) |
| D-009 | 2026-11-04 | **SayTamm has full legal rights to use all case studies**, including the Steps KSA cases (K.S Furniture, Muriya, DAMAC Paramount, Bio-Group, strategy cases) | Owner ("لنا كل الحق ف استخدام كل الكيس ستديز بشكل قانوني") | Updates D-005 for case studies only. They are presented as the **team's track record**, with honest context about where they were delivered. Testimonials, client logos and Steps' aggregate claims remain excluded unless separately confirmed |
| D-010 | 2026-11-04 | Domain **www.saytamm.com**. Primary email **tamm@saytamm.com**. Public contact email **info@saytamm.com** | Owner | Resolves OQ-07 |
| D-011 | 2026-11-04 | **Approved logo = the solid black, outline black and outline white renders** supplied on 2026-11-04 (T-form + separate diagonal blade) | Owner ("ده اللوجو المعتمد اللي هنستخدمه") | Identical files to the master renders. Production files v1 in `brand/production/logo/` derive from them |
| D-004 | 2026-11-04 | 57357 case: the targeting of "Gulf princes'" locations is never published in any form | Claude (risk control; reversible only by explicit owner decision with legal advice) | Reputational and legal risk in the Saudi market |

## Working rules adopted for documentation (reversible, low-risk)

| ID | Date | Rule | Rationale |
|---|---|---|---|
| W-001 | 2026-11-04 | Source authority order as set in `/brand/SOURCES.md` | The Bible is the strategic source; the 2026 Guidelines are the newest and most rigorous visual set |
| W-002 | 2026-11-04 | Colour values follow the Bible / 2026 Guidelines (`#0A0A0D` Black etc.), not the Full Visual Guidelines alternates | Two of three guideline sets agree; the Bible is the source |
| W-003 | 2026-11-04 | Diagonal angle documented as ≈ 45° (measured), replacing "≈ 65°" | Direct pixel measurement of the master artwork; matches the Full Visual Guidelines |
| W-004 | 2026-11-04 | The 27 Aug asset package is authoritative; the 24 Aug package (`_1.zip`) is superseded | The older pattern tiles the full logo, which the Bible prohibits |
| W-005 | 2026-11-04 | Brand source files committed to `/brand` unmodified, with renamed copies only | Uploads do not persist between sessions; the project needs a durable source of truth |
| W-006 | 2026-11-04 | **Rejected** the third asset zip (`SayTamm_Brand_Assets.zip`, 135 KB, 24 Aug 13:47) | It contains a **different, unapproved mark**: a pointed T-stem plus a literal checkmark, navy/orange "source" files, W:H 1.17 (IoU 0.40 vs the approved logo). It contradicts D-011 and the Bible |
| W-007 | 2026-11-04 | Production logo files v1 built by recolour and verified trace of the approved logo | Website and digital use need SVG; the fidelity checks are in `brand/production/logo/README.md` |
| W-008 | 2026-11-04 | Website v0.1 built in `/site` on **Astro 7** (static), plain CSS tokens, Git content | Owner asked for the website and supplied the theme brief; this was the recommended stack (OQ-20). Reversible: content and tokens are framework-neutral |
| W-009 | 2026-11-04 | Theme colour names from the website brief (Obsidian, Graphite, Soft White, Muted Grey) **mapped to approved palette values** (`#0A0A0D`, `#17171C`, `#F5F5F7`, `#A4A4AE`), not the brief's proposed hexes | The brief asked to check brand files before treating its colours as final; the approved values are within a shade and keep the palette authoritative |
| W-010 | 2026-11-04 | Hero "sculpture" = exact logo silhouette extruded in CSS 3D (face flat, side walls are palette tints) | Brief asks for a logo-derived architectural sculpture; treated as an environmental application (like the dimensional signage in the guidelines), so the flat logo rules are untouched |
| W-011 | 2026-11-04 | Header and footer use the **symbol only** until the drawn wordmark exists | Brief: never approximate the logo with ordinary text |
| W-012 | 2026-11-04 | Contact form opens a pre-filled email to info@saytamm.com until a server endpoint and CRM exist, and says so on the form | Functional and honest; no fake "sent" state |
| W-013 | 2026-11-04 | Private preview link published on the owner's claude.ai account (https://claude.ai/artifact/1T1HBDghRXiKtQND2Fk72Q), built by `npm run build:preview-link` | Owner asked to see the site without setting up hosting. The link host allows Google Fonts only and Satoshi's licence forbids third-party hosting, so the preview uses Figtree as a labelled stand-in; the real site keeps Satoshi |
| D-012 | 2026-11-04 | **Website structure v0.2**: Hero → About → Services (all 9 visible) → Clients → Work → How we work → Why SayTamm → Contact; new About page; nav = About · Services · Clients · Work · Contact | Owner feedback: v0.1 content and structure were unclear ("محتاج يبقى في مكان عن الشركة، بعدها الخدمات، والعملاء السابقين") | Replaces the abstract philosophy / method / pillar narrative of v0.1 |
| D-013 | 2026-11-04 | **Design direction locked: "Dark Editorial Performance"**. Website palette: Obsidian `#09090D`, Graphite `#17171E`, Soft White `#F5F3FA` (muted `#96939F`), Electric Purple `#6C35FF` sparingly. Homepage: Hero → Selected work → Services → Our approach → Performance proof → About → Final CTA. Nav: Work · Services · About · Contact | Owner (direction lock brief) | Supersedes W-009 for the website interface; official logo files keep their own values. Supersedes the D-012 section order |
| W-014 | 2026-11-04 | Real campaign assets used in Selected work: Infinity Corp fashion photography (captioned as the team's fashion e-commerce work, not as the creative behind the metrics) and QNB Ramadan 2015 screenshots. Projects without supplied visuals get data-led compositions, never stock or AI imagery | Brief requires real approved assets; rights D-002 |
| D-014 | 2026-11-04 | **Final redesign brief (v0.4)**. Homepage: Hero → Selected work → Brands we've worked with → Services (4 disciplines) → How we work → Results → About → Final CTA. Services regrouped into Strategy & Consulting · Creative & Content · Media & Performance · Digital & Technology. Brand list of 12 supplied by the owner as **team professional experience** | Owner (final brief) | Supersedes the D-013 section order and P-010 pillar names; resolves OQ-13 |
| D-015 | 2026-11-04 | **Owner-supplied company and founder facts:** SayTamm founded **2021**; team of **30**; founder **Mostafa Sofy / مصطفى صوفي**; founder photo; founder biography (15+ years, 200+ brands, 20+ industries, early career at Yellow Pages). Case attribution reworded from "before SayTamm was founded" to "led by members of the SayTamm team, including work delivered at other agencies", because the e-commerce cases (2021–22) postdate the founding year | Owner | Resolves most of OQ-40. The bio was edited for the site: the current role at another agency, the "double-digit ROAS" claim and named employers (other than Yellow Pages) were left out pending OQ-38 and OQ-33 |
| W-016 | 2026-11-04 | Hero CSS 3D "sculpture" **removed**; the hero uses the exact flat Signature symbol, with an entrance motion only (the blade travels in along its own 45° diagonal to its exact resting position) | Final brief: no artificial 3D effect unless an approved official 3D asset exists |
| W-017 | 2026-11-04 | Every case carries `evidence.status`. **Pending figures appear in staging only** (tagged "Pending confirmation"); the production build withholds them and says so, until each case is approved | Final brief: unverified figures must be marked for confirmation or omitted from the published version |
| W-018 | 2026-11-04 | Brand wall shows names as text, in Latin script in both languages, with a sector label and an explicit "professional experience, not SayTamm clients" note. Official logo files slot in when supplied with permission (OQ-39). No logo was sourced from third-party sites | Logo accuracy (current official versions) and permission to display can't be verified from mirrors; never redraw a client logo |
| W-019 | 2026-11-04 | One case page per project (`/en/work/<slug>/`, `/ar/work/<slug>/`) with Objective · Challenge · Strategy · Execution · Results · How the figures were measured | Final brief: each case must state all ten elements and link to a complete case study |
| W-015 | 2026-11-04 | Staging is the default for every build (noindex, robots Disallow, preview bar); `npm run build:production` (PUBLIC_STAGE=production) is the only indexable build, for the authorised launch | Brief: do not expose staging to search engines; prepare production indexing separately |

## Proposed — awaiting owner

| ID | Proposal | See |
|---|---|---|
| ~~P-001~~ | Two-tone Signature mark. **Approved as D-007** | — |
| ~~P-002~~ | Wordmark "SayTamm". **Approved as D-008** | — |
| ~~P-003~~ | ~~Four service lines~~. **Superseded by D-003**; replaced by P-010 | — |
| ~~P-010~~ | ~~4 pillars~~. **Superseded by D-014 (four disciplines)** | — |
| ~~P-011~~ | Scenario A rebrand. **Rejected: owner chose Scenario C (D-005)** | — |
| P-012 | Lead proof = founder-led e-commerce results (fashion & beauty scale-up, electronics Q4), plus Marseilia and 57357 once their results exist; Steps cases only if founder-led (OQ-37) | `PORTFOLIO_AND_CASE_STUDIES.md` §5 |
| P-004 | Say → Tamm → Prove operating narrative | OQ-12 |
| P-005 | Sitemap: merge Work and Case Studies; add Approach; defer Insights | `WEBSITE_SITEMAP.md` |
| P-006 | Astro + plain CSS tokens + Git content | OQ-20 |
| P-007 | Minimum symbol size of 24 px digital (the stricter of the conflicting values) | `PROJECT_AUDIT.md` C6 |
| P-008 | Purple text below 24 px on dark backgrounds uses Purple 200 (an accessibility rule) | `VISUAL_IDENTITY.md` §2 |
| P-009 | Attribution framework A/B/C/D for all portfolio work | `PORTFOLIO_AND_CASE_STUDIES.md` |
