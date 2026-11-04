# Project Roadmap

Two connected tracks. **Track 1 builds the agency; Track 2 builds its digital presence.** Track 2 exists to serve Track 1.
Status as of 2026-11-04.

## Track 1 — Build the agency
| Stage | Scope | Status | Doc |
|---|---|---|---|
| 1.1 Foundation | Brand foundation, positioning, voice | ✅ Documented (brand fixed, D-001) | `BRAND_FOUNDATION.md`, `BUSINESS_POSITIONING.md`, `BRAND_VOICE.md` |
| 1.2 Services | 9 services (D-003) in 4 pillars (P-010) | 🟡 Drafted; 5 services need scope (OQ-34) | `SERVICES_AND_CAPABILITIES.md` |
| 1.3 Portfolio | Inventory, verification, tiers, red flags | 🟡 Drafted; blocked on OQ-30, OQ-31, OQ-32 | `PORTFOLIO_AND_CASE_STUDIES.md` |
| 1.4 Steps transition | Rebrand / sister / separate | 🔴 **Decision needed (OQ-30)** | `STEPS_TRANSITION.md` |
| 1.5 Growth plan | ICP, acquisition, sales collateral, operations, 90 days | 🟡 Drafted | `AGENCY_GROWTH_PLAN.md` |
| 1.6 Sales collateral | Credentials deck, audit template, proposal, report template | ⏳ Next, after OQ-30 | — |

## Track 2 — Build the digital presence
| Phase | Scope | Status | Depends on |
|---|---|---|---|
| 01 Discovery | Repo, assets, brand, technical audit | ✅ | — |
| 02–03 Strategy | Sitemap (9 service pages), journeys, conversion, SEO, EN/AR | 🟡 Drafted | OQ-06, OQ-30 (migration) |
| 04 Creative direction | 2 homepage routes (EN + AR, desktop + mobile), type specimens, motion, components | ⏳ Next | OQ-02, OQ-03, OQ-04 |
| 05 Development | Astro build, tokens, components, forms, analytics, SEO plumbing | ⏳ | OQ-01, OQ-20, OQ-05 (vector logo) |
| 06 QA | Devices, EN/AR, a11y, performance, forms, metadata, redirects | ⏳ | 05 |
| 07 Launch | Domain/DNS, hosting, Search Console (change of address if Scenario A), tracking | ⏳ **Owner authorisation required** | OQ-07, OQ-09, OQ-21, legal |

## Decisions that unlock the most work (in order)
1. **OQ-30**: SayTamm ↔ Steps relationship. Unlocks portfolio, contact details, SEO migration and claims.
2. **OQ-02 / OQ-03 / OQ-04**: two-tone mark, wordmark, Arabic spelling. Unlock creative direction.
3. **OQ-05**: vector masters from the designer. Unlocks production logo use.
4. **OQ-31 / OQ-32**: role on past projects and the original data exports. Unlock publishable case studies.
5. **OQ-01 / OQ-20**: repo and stack. Unlock the build.

## Risks
| Risk | Mitigation |
|---|---|
| SayTamm and Steps compete for the same market and keywords | Resolve OQ-30; if Scenario A, migrate with 301s |
| Strong cases with weak evidence (corrupted screenshots, no dates) | Original exports (OQ-32); restyled charts from real data |
| Publishing sensitive or unverifiable material | Red-flag rules in `PORTFOLIO_AND_CASE_STUDIES.md` §4; D-004 |
| Nine services read as a generic "360 agency" | Pillar structure and outcome-led copy (P-010) |
| No vector logo or wordmark | Request now; precision-trace fallback with approval |
| Arabic treated as a translation | Native AR copywriting and review (OQ-25); parity check in CI |
