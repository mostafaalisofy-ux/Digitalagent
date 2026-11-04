# Open Questions

Priority: **P0** blocks a phase now · **P1** needed before launch · **P2** can be decided later.
Status: `open` · `answered` (move the outcome to `DECISION_LOG.md`).

## P0 — needed for creative direction and build start

| ID | Question | Why it matters | Our recommendation | Status |
|---|---|---|---|---|
| OQ-01 | Is this repository (`Digitalagent`) the home of the SayTamm website, or is it meant for something else (the README mentions "an agent for digital marketing work")? | Where the site gets built | Build the site in `/site` here, or create a dedicated `saytamm-website` repo | open |
| OQ-02 | Two-tone Signature mark? | — | — | **answered: approved (D-007)** |
| OQ-03 | Wordmark style? Who draws the final wordmark? | — | — | **Style answered: "SayTamm" (D-008).** Still open: who draws the final vector wordmark (see OQ-05) |
| OQ-04 | Canonical Arabic spelling: **قول تم** or **قول تمّ**? | Used in the logo lockup, site and all comms | Choose one and lock it. "تمّ" is the fully vocalised form; "تم" matches the Bible and everyday usage | open |
| OQ-05 | Vector masters | — | **Symbol: done.** v1 SVGs traced from the approved logo (D-011, W-007), with an edge deviation of 1 px or less. Still open: the **drawn "SayTamm" wordmark (EN) and an Arabic wordmark/lockup**. Who designs them? Should I draft wordmark options for approval? A designer's original vector of the symbol, if one exists, would still be preferable for print | partly answered |
| OQ-10 | Portfolio materials | Work section, proof, case studies | **Partly answered 2026-11-04:** Infinity Corp deck, nsm+ deck and the steps-ksa.com cases received. Still needed: see OQ-32 and the intake list in `PORTFOLIO_AND_CASE_STUDIES.md` §7 | partly answered |
| OQ-30 | SayTamm ↔ Steps relationship? | — | — | **answered: separate companies (D-005)** |
| OQ-31 | Owner's role on Infinity Corp and nsm+ projects? | — | — | **answered: led them (D-006)** |
| OQ-37 | Steps cases | — | **Rights answered (D-009).** One wording point remains: may the case pages say where each was delivered (e.g. "delivered by our team at Steps KSA")? This ties to OQ-33 | partly answered |
| OQ-38 | ⚠️ **Raised in priority (2026-11-04):** the founder's bio states a *current* Managing Director role at Steps Marketing Agency, which D-005 treats as a separate, competing company whose case studies the site shows. This role is **not mentioned on the site**. Confirm with a legal advisor before launch. Any ongoing role, shareholding or agreement (non-compete / non-solicit / confidentiality) with Steps KSA, Infinity Corp or nsm+ that limits SayTamm offering the same services, approaching the same clients, or naming them? | Legal risk: SayTamm now competes directly with Steps in the same market and services | Confirm with a legal advisor before launch | open |
| OQ-39 | **Brands wall (12 brands, owner list 2026-11-04):** send the **official logo files** (SVG preferred) and confirm we may display each one. Confirm the wording "professional experience, not SayTamm clients". Saudi GEA is a government entity — confirm display is permitted. **Sprint 2: Saudi GEA is shown in staging (tagged) and hidden in the production build until permission is confirmed.** Note: STC's current wordmark is lower-case "stc"; the name is shown as supplied | open |
| OQ-40 | **Mostly answered (D-015):** photo, bio, Arabic name, founding year (2021) and team size (30) are in use. Still open: LinkedIn URL (optional), and whether other team members are shown. **About page / leadership.** **Founder photo received 2026-11-04** (used on About; original in `brand/people/`). Still needed: a 60–100-word bio, the Arabic spelling of the name, LinkedIn URL (optional), SayTamm's founding year, team size, and whether other team members are shown | open |
| OQ-41 | Campaign visuals for K.S Furniture, Muriya, DAMAC and Bio-Group, plus agency photography (team, workspace) for About | open |
| OQ-43 | Arabic headings: the brief wrote «أربع تخصصات»; the site uses the grammatical «أربعة تخصصات» (تخصص is masculine). Confirm in native review | open |
| OQ-51 | The bio's "consistent double-digit ROAS" claim is **not published**: it is an unverified performance claim. It can be reconsidered once case figures are approved | open |
| OQ-44 | **Approve each case for publication** (Sprint 2: the K.S Furniture budget split is also treated as withheld campaign data) (all 7 are `pending`; production shows none of their figures until approved): K.S Furniture (year, revenue attribution), fashion & beauty A/B (original Meta exports), QNB (bank name with figures), Muriya (period, sales matching), electronics Q4 (export), Bio-Group (market, year), DAMAC (period, volume, naming permission) | open |
| OQ-42 | Confirm the Arabic hero line "تسويق رقمي يقوده الأداء، لعلامات تتحرك بسرعة وتقيس كل شيء" and the Arabic approach terms (الاستراتيجية · الإبداع · الإعلانات · الأداء) after native review | open |
| OQ-20 | Stack | Framework choice | **Built on Astro 7 (W-008).** Still worth confirming: are a client portal or app features planned in the next 12 months? If yes, revisit | partly answered |
| OQ-01 | Repo | Where the site lives | **Site built in `/site` of this repo (W-008)**; move it to a dedicated repo later if preferred | partly answered |

## P1 — needed before launch

| ID | Question | Status |
|---|---|---|
| OQ-06 | Default language and URL strategy: both prefixed (`/en`, `/ar`), and which serves as `x-default`? Target KSA only (`ar-SA`/`en-SA`) or wider GCC? | open |
| OQ-07 | Domain and emails | **answered (D-010):** www.saytamm.com · tamm@saytamm.com · info@saytamm.com (public contact) | answered |
| OQ-08 | SayTamm's own public phone and WhatsApp Business number. **Not Steps'** (D-005) | open |
| OQ-09 | SayTamm's legal entity name, CR number, VAT number, office address(es)/city | open |
| OQ-11 | Rights to show previous work | **Answered for Infinity Corp and nsm+ material (D-002).** Steps rights follow from OQ-30 | answered / partly |
| OQ-32 | Original **Ads Manager / analytics exports** for K.S Furniture, Muriya, Bio-Group, DAMAC and the Infinity fashion and electronics campaigns (the Infinity screenshots have corrupted digits), plus campaign dates and years for the Steps cases | open |
| OQ-33 | Naming previous agencies | **answered (owner, 2026-11-04): no previous employers or agencies are named.** The bio and case attributions refer to markets (Saudi Arabia, Egypt, the Gulf) and "other agencies" only | answered |
| OQ-34 | **Scope for 5 services** (Sprint 2: the site shows their one-line summary only, with no capability list). Needed for each: what is included, typical deliverables, who delivers it (in-house or partner). **SEO:** technical, Arabic, content, local, links? **Content Marketing:** articles, video series, newsletters, lead magnets? **Media Production:** in-house crew or studio, photography, video, motion, audio? **Website & CRO:** platforms and stack, CRO method, testing tools? **Analytics & Growth:** GA4, GTM, server-side/CAPI, dashboards, attribution, reporting cadence? | open |
| OQ-35 | Results for Marseilia 2018 (leads by market) and 57357 Ramadan 2018 (donations), if available | open |
| OQ-36 | ~~Steps' public claims~~: not applicable to SayTamm (D-005) | closed |
| OQ-12 | Approve **Say → Tamm → Prove** as the operating narrative? (from concept board 1; not in the Bible) | open |
| OQ-13 | Service grouping | **answered: four disciplines (D-014)** |
| OQ-14 | Engagement models, minimum engagement size, SAR budget bands for the form, response-time SLA. Is the Performance Audit offer real? | open |
| OQ-15 | Which ad platforms does SayTamm actively run (Meta, Google, Snap, TikTok, X, LinkedIn, YouTube)? Any official partner status or certifications? | open |
| OQ-16 | Arabic tagline and sub-taglines: written natively and approved | open |
| OQ-18 | Satoshi licence: confirm the Fontshare terms and archive the licence; who holds the font files? | open |
| OQ-19 | **Form backend / CRM.** The form currently opens the visitor's email app (mailto) and says so on screen. To connect a real endpoint we need: (1) the destination (HubSpot, Zoho, Pipedrive, a form service, or a serverless function sending to info@saytamm.com); (2) who receives and owns the leads; (3) spam protection (keep the honeypot; add Turnstile or reCAPTCHA?); (4) the privacy notice and consent wording (OQ-49); (5) the API key stored as a host environment variable, never in code. See `PROJECT_HANDOVER.md` §8 | open |
| OQ-21 | Hosting preference and who owns the accounts (domain, hosting, analytics, GTM) | open |
| OQ-23 | Leadership bios and photos: who is named on the site (founder, team)? | open |
| OQ-24 | Verified social handles (the decks show `@SAYTAMM` as a placeholder) | open |
| OQ-25 | Who reviews Arabic copy natively, and who signs off legal (privacy notice, PDPL)? Sprint 2 rewrote the Arabic throughout, and it still needs native review | open |
| OQ-49 | **Privacy notice and consent (PDPL).** There is no privacy page yet. The form's consent line is a draft. A cookie or consent banner is needed once analytics is added | open |
| OQ-50 | **Operating commitments** documented from the adopted service scope (strategy in 2–4 weeks, brand build in 6–10 weeks, weekly performance reports, free audit within 3 business days). They are **not published** until SayTamm confirms it will keep them (links to OQ-14) | open |

## P2 — can be decided later

| ID | Question | Status |
|---|---|---|
| OQ-17 | Numerals in Arabic content: Western (0–9) or Eastern Arabic (٠–٩)? | open |
| OQ-22 | Access to a keyword research tool for KSA search volumes | open |
| OQ-26 | Will SayTamm advertise its own services (affects the offer landing page and tracking setup)? | open |
| OQ-27 | Resend `SayTamm_Professional_Brand_Guidelines_v2.pptx` and `SayTamm_Brand_Bible_2026.pptx` via Drive or zip. Both arrived as 0-byte files three times | open |
| OQ-29 | What brand files may be stored in this GitHub repo? **Production logo files are now committed** (they will be public on the website anyway). Guideline decks, concept boards and portfolio PDFs are still held outside Git until you confirm | partly answered |
| OQ-28 | Do the "Master Brand System", "Art Direction System" and "Content & Communication System" decks cited by the 2026 Guidelines exist? If so, please send them | open |
