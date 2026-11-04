# Project Roadmap

Two connected tracks. **Track 1 builds the agency; Track 2 builds its digital presence.** Track 2 exists to serve Track 1.
Status as of 2026-11-04.

## Track 1 — Build the agency
| Stage | Scope | Status | Doc |
|---|---|---|---|
| 1.1 Foundation | Brand foundation, positioning, voice | ✅ Documented (brand fixed, D-001) | `BRAND_FOUNDATION.md`, `BUSINESS_POSITIONING.md`, `BRAND_VOICE.md` |
| 1.2 Services | 9 services (D-003) in 4 pillars (P-010) | 🟡 Drafted; 5 services need scope (OQ-34) | `SERVICES_AND_CAPABILITIES.md` |
| 1.3 Portfolio | Inventory, verification, tiers, red flags | 🟡 Tiers set (founder-led proof); needs original exports (OQ-32) and OQ-37 | `PORTFOLIO_AND_CASE_STUDIES.md` |
| 1.4 Steps relationship | Separate companies (D-005); competitive differentiation | ✅ Decided; legal check pending (OQ-38) | `STEPS_TRANSITION.md` |
| 1.5 Growth plan | ICP, acquisition, sales collateral, operations, 90 days | 🟡 Drafted | `AGENCY_GROWTH_PLAN.md` |
| 1.6 Sales collateral | Credentials deck, audit template, proposal, report template | ⏳ Next: unblocked (founder-led proof, D-006) | — |

## Track 2 — Build the digital presence
| Phase | Scope | Status | Depends on |
|---|---|---|---|
| 01 Discovery | Repo, assets, brand, technical audit | ✅ | — |
| 02–03 Strategy | Sitemap (9 service pages), journeys, conversion, SEO, EN/AR | 🟡 Drafted | OQ-06 |
| 04 Creative direction | Theme "The Completion Experience" (owner brief), applied directly in the build | ✅ v0.1 in `/site` (design system in `site/src/styles/tokens.css`) | Owner review |
| 05 Development | Astro build, tokens, components, EN/AR pages, form, analytics hooks, SEO plumbing | 🟡 **v0.1 preview built** (Home, Services, Work, Contact, 404 × EN/AR). Pending: wordmark, form endpoint, real visuals, GTM/consent | OQ-05, OQ-19, OQ-32 |
| 06 QA | Devices, EN/AR, a11y, performance, forms, metadata | 🟡 v0.1 pass (see `site/README.md`); repeat before launch | 05 |
| 07 Launch | Domain/DNS, hosting, Search Console (new domain), tracking | ⏳ **Owner authorisation required** | OQ-07, OQ-09, OQ-21, legal |

## Decisions that unlock the most work (in order)
1. ~~OQ-30, OQ-31, OQ-02, OQ-03~~: answered 2026-11-04 (D-005 to D-008).
2. **OQ-05**: vector masters for the symbol and the drawn "SayTamm" wordmark. Unlocks production logo use.
3. **OQ-32**: original Ads Manager exports. Unlock publishable founder-led cases.
4. **OQ-01 / OQ-20**: repo and stack. Unlock the build.
5. **OQ-07 / OQ-08 / OQ-09**: SayTamm's own domain, contact details and legal entity. Needed for launch.
6. **OQ-38**: legal check on agreements with previous companies.

## Risks
| Risk | Mitigation |
|---|---|
| SayTamm competes head-on with Steps (same services and market) | Differentiation in `STEPS_TRANSITION.md`; original copy only; legal check (OQ-38) |
| No SayTamm-delivered work at launch | Founder-led track record, clearly labelled; founding-client programme (`AGENCY_GROWTH_PLAN.md` §7) |
| Strong cases with weak evidence (corrupted screenshots, no dates) | Original exports (OQ-32); restyled charts from real data |
| Publishing sensitive or unverifiable material | Red-flag rules in `PORTFOLIO_AND_CASE_STUDIES.md` §4; D-004 |
| Nine services read as a generic "360 agency" | Pillar structure and outcome-led copy (P-010) |
| No vector logo or wordmark | Request now; precision-trace fallback with approval |
| Arabic treated as a translation | Native AR copywriting and review (OQ-25); parity check in CI |
