# Project Roadmap

Status as of 2026-11-04: **Phase 01 complete · Phase 02–03 drafted (awaiting approval).**

| Phase | Scope | Status | Exit criteria | Depends on |
|---|---|---|---|---|
| **01 Discovery** | Repo, asset, brand and technical audit; missing info | ✅ Complete | `PROJECT_AUDIT.md`, `/brand/SOURCES.md`, `OPEN_QUESTIONS.md` | — |
| **02 Agency foundation** | Positioning, narrative, service architecture, audience, differentiation, messaging | 🟡 Drafted | Owner approves P-001…P-004, P-009 | OQ-12, OQ-13, OQ-14 |
| **03 Website strategy** | Sitemap, journeys, conversion, content structure, SEO, EN/AR | 🟡 Drafted | Owner approves P-005; OQ-06 answered | Phase 02 |
| **04 Creative direction** | Homepage art direction (2 routes), type specimens EN/AR, colour application, motion principles, UI component system | ⏳ Next | One route approved | OQ-02, OQ-03, OQ-04; ideally OQ-05 |
| **05 Development** | Astro build, tokens, components, EN/AR pages, forms, analytics, SEO plumbing | ⏳ | Feature-complete on staging | Phase 04, OQ-20, OQ-05 (final logo), content |
| **06 QA** | Devices, EN/AR, accessibility, performance, forms, links, metadata, browsers | ⏳ | All quality gates pass; manual RTL review signed off | Phase 05 |
| **07 Launch readiness** | Domain/DNS plan, hosting, analytics and Search Console, tracking verification, content review, launch report | ⏳ | **Owner authorises launch** | OQ-07, OQ-09, OQ-21, legal review |

## Prioritised next steps

**Now (owner, about 1 hour of decisions):**
1. Answer the P0 questions: OQ-01 (repo), OQ-02 (two-tone), OQ-03 (wordmark), OQ-04 (Arabic spelling), OQ-20 (stack).
2. Request vector masters from the designer (OQ-05).
3. Send the portfolio materials and say which are SayTamm vs Steps Agency work (OQ-10, OQ-11).

**Next (Claude, in parallel; not blocked):**
4. **Phase 04 creative direction:** two homepage art-direction routes as high-fidelity static frames (desktop + mobile, EN + AR), using approved assets only, presented before any build.
5. Draft EN homepage and service-page copy against the approved messaging framework, with Arabic written natively for review.
6. Set up the Astro project skeleton (tokens, i18n routing, layouts, CI quality gates), once OQ-01 and OQ-20 are answered. The logo slot uses the approved raster symbol until vectors arrive.

**Before launch:**
7. Legal: privacy notice (PDPL), entity details, consent approach.
8. Contact details, CRM routing, analytics accounts.
9. Approved case studies (or launch with Approach + leadership experience).

## Risks
| Risk | Mitigation |
|---|---|
| No vector logo or wordmark delays a credible launch | Request now; precision-trace fallback with approval |
| No approved case studies at launch | Launch scenario in `PORTFOLIO_AND_CASE_STUDIES.md`: proof via approach, leadership experience and the audit offer |
| Arabic treated as a translation | Native AR copywriting and review as a named step (OQ-25); parity check in CI |
| Guideline conflicts resurfacing | `/brand/SOURCES.md` plus this knowledge base as the single source; the guideline decks updated in a future version |
