# Owner approval register

Date: 2026-11-05. Under the **global owner authorisation of 2026-11-05**, every decision within the project owner's authority is recorded as **APPROVED BY PROJECT OWNER — 2026-11-05**. That authorisation does not create client permissions, legal review, third-party rights, evidence or credentials; those items keep their real status below.

Statuses: **Approved** · **Pending** (an owner input of fact, not a decision) · **Evidence required** · **Legal review required** · **Not applicable**.

## Owner-level decisions — approved

| Item | Decision | Status |
|---|---|---|
| Brand and creative direction | Dark Editorial Performance; approved palette and type (D-013) | Approved — 2026-11-05 |
| Arabic brand spelling (OQ-04) | **قول تم** | Approved — 2026-11-05 |
| Numerals (OQ-17) | Western digits 0–9 in both languages | Approved — 2026-11-05 |
| URL and language strategy (OQ-06) | `/en/` and `/ar/` prefixes; x-default = English; root redirects to `/en/`; no single-country target (D-020) | Approved — 2026-11-05 |
| Homepage messaging and order | Hero line «قول. تم.» / "Say it. Tamm it."; supporting line per the approved positioning (D-020: digital marketing & performance agency, not Saudi-only); order: work → services → approach → clients → team experience → results → about → contact | Approved — 2026-11-05 |
| Arabic hero and approach terms (OQ-42) | As published | Approved — 2026-11-05 |
| «أربعة تخصصات» (OQ-43) | Grammatical form kept | Approved — 2026-11-05 |
| Operating narrative (OQ-12) | Strategy → Creative → Media → Performance (as implemented) | Approved — 2026-11-05 |
| Services architecture (OQ-34) | Nine services in four disciplines; five scopes completed from documented evidence | Approved — 2026-11-05 |
| Case-study presentation and homepage selection | Fashion & beauty, K.S Furniture, QNB on the homepage; narrative structure per case | Approved — 2026-11-05 |
| Agency-name wording (OQ-33, OQ-37) | No previous agency named; "including work delivered at other agencies" | Approved — 2026-11-05 |
| Founder and About content (OQ-40, OQ-23) | Mostafa Sofy, photo and bio as supplied; no other team members named | Approved — 2026-11-05 |
| Portfolio presentation | Work wall on the home page, filterable gallery and viewer on /work/ | Approved — 2026-11-05 |
| Contact page structure and form fields | mailto form with optional industry, market, timeline | Approved — 2026-11-05 |
| SEO implementation | As in `SEO_FINAL_AUDIT.md` | Approved — 2026-11-05 |
| Approved visual assets | AI illustrations decorative only (W-020); client work authentic | Approved — 2026-11-05 |
| Operating commitments (OQ-50) | Not published as numbers (2–4 weeks, 3 days…) because they are promises to clients; the site describes the method without deadlines | Approved — 2026-11-05 |

| Brand positioning (D-020) | "A digital marketing & performance agency"; Saudi Arabia is part of the team's experience, not the limit of the identity; About page rewritten | Approved — 2026-11-05 |

## Items that remain open

| Item | Why approval is required | Current status | Required owner action | Blocking release? |
|---|---|---|---|---|
| Case-study metrics (7 cases) | Figures must be traceable to original platform or store data | **Evidence required** | Supply original Ads Manager / analytics / store exports (OQ-32); production withholds figures until then | No — production already hides them |
| Client naming in cases (QNB, DAMAC) | Third parties' names with campaign data | **Evidence required** (client confirmation) | Obtain written confirmation, or anonymise | No — names shown under owner-asserted rights (D-009); recommended before launch |
| Client logos and names (23 direct, 12 team brands) | Third-party marks | **Evidence required** (written client permission) | Email confirmation per client (`CLIENT_AND_BRAND_APPROVAL_REGISTER.md`) | Recommended before launch |
| Saudi GEA | Government entity | **Evidence required** | Written permission, or keep hidden | No — hidden in production |
| MIX posts naming RCRC / U20 | Government body named in a supplier portfolio | **Evidence required** | Confirm RCRC has no objection, or remove those two posts | Recommended before launch |
| Founder's current role at Steps (OQ-38) | Possible conflict between a named competitor role and SayTamm | **Legal review required** | Review the checklist in `LEGAL_AND_PRIVACY_REVIEW.md` §4 | **Yes** |
| Company legal details (OQ-09) | Entity name, CR, VAT, address are legal facts | **Pending** (missing facts) | Supply them; never invented | **Yes** (privacy notice needs the controller's legal name) |
| Phone and WhatsApp (OQ-08) | Contact facts | **Pending** | Supply SayTamm's own numbers, or confirm email only | No |
| Privacy notice | Personal data under the Saudi PDPL | **Legal review required** | Counsel review of the draft; then set `SITE.legalReviewed = true` | **Yes** |
| Email provider and hosting provider names | Named in the privacy notice as processors | **Pending** | Confirm both | **Yes** (with the privacy notice) |
| Satoshi licence (OQ-18) | Font licence terms | **Evidence required** | Archive the Fontshare licence | No |
| CRM / form backend (OQ-19) | Credentials and processor choice | **Pending** | Choose a backend; see `CONTACT_AND_CRM_INTEGRATION.md` | No — mailto works honestly |
| Analytics IDs and consent (OQ-21) | Tracking needs IDs and, for non-essential tags, consent | **Pending** | Supply GA4/GTM IDs and approve a consent mechanism | No — nothing is installed |
| Social handles (OQ-24) | Verified accounts only | **Pending** | Supply verified handles | No |
| Final Arabic copy (OQ-25) | Native review of all public Arabic | **Pending** (reviewer) | A native Saudi-market reviewer signs off `ARABIC_ENGLISH_QA.md` | **Yes** |
| Beauty Lab whitening claim | SFDA-regulated claim on the product label | **Evidence required** | Client confirms label approval | No — site text does not repeat it |
| Public launch | Final authority | **Pending** | Explicit "launch" instruction after the gates above | **Yes** |
