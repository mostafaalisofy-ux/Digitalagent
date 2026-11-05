# UI/UX review

Date: 2026-11-05. Method: rendered pages in Chromium (Playwright, reduced motion so every section is settled) at 1440 and 390 px in Arabic and English. I inspected the screenshots section by section and measured section heights in the DOM. Pages reviewed: home, services, about, a case page (K.S Furniture), work, contact, privacy.

## Findings and fixes

| # | Finding | Evidence | Severity | Fix | Result |
|---|---|---|---|---|---|
| 1 | "Our clients" became a long white block: 23 large pure-white tiles in 3 columns on desktop, **1 column on mobile** | Section 2,237 px (desktop), ~7,000 px of tiles on mobile | High | 2 columns (mobile) → 3 (600 px) → 4 (1024 px) → 5 (1440 px); 16:10 tiles; tile colour Soft White `#F5F3FA` from the palette instead of pure white | 1,099 px desktop; 2 columns on mobile |
| 2 | Clients without a logo file were set in large bold type inside the tile, so they read like redrawn logos | Screenshot | High (brand integrity) | Quiet name style (small, medium weight, grey); logo clients listed first, name-only clients after | Name tiles read as names, not marks |
| 3 | Each homepage case repeated the whole story (context, challenge, strategy, execution, outcome) | ~1,600 px per case; Selected Work 4,894 px | Medium | Homepage shows challenge + approach; the case page keeps the full narrative | Selected Work 4,329 px (staging, with figures; shorter in production) |
| 4 | KPI "15–20" broke across two lines | Screenshot | Medium | `white-space: nowrap` on KPI values | One line |
| 5 | Homepage length | 17,327 px desktop / 26,263 px mobile | Medium | Fixes 1–3 | **15,623 px / 20,442 px** |
| 6 | Contact form: optional fields misaligned with neighbours; 3 columns too tight | Screenshot | Medium | Two-column rows aligned to the input line; reserved error space | Aligned |
| 7 | Work wall read in columns, scattering each client's work | Screenshot | Medium | Row-ordered grid, equal 4:5 covers, grouped by client (earlier this session) | Grouped |

## Checked and working well

- Hero: the «قول. تم.» / "Say it. Tamm it." line, a specific Saudi-market proposition, and a primary and a secondary CTA, all visible in the first screen at 360 px and above.
- Services page: disciplines index, discipline images, clear service hierarchy, a CTA per service that preselects the form.
- About: story, facts, founder with photo and bio, values; no placeholders.
- Approach: one connected four-stage line, not four boxes.
- RTL: mirrored layout through logical properties; the brand diagonal is never mirrored; Latin runs isolated.
- No horizontal overflow at 360 px in either language (re-checked after these fixes).

## Recommendations not implemented (owner choice or need content)

1. **Fewer homepage sections:** "Brands we've worked with" and "Our clients" are both proof sections. Once client permissions are confirmed, one combined proof band would shorten the page by ~900 px.
2. **Case visuals:** K.S, Muriya, DAMAC, Bio-Group and Electronics have no campaign visuals (OQ-41). Real assets would lift the case pages more than any layout change.
3. **Logo files** for GIG, JORA, Al Bustan, Exodus, Beauty Lab and DC BLOCK would make the clients grid consistent.
4. **Usability test:** 5 target buyers (Saudi marketing managers / founders), task "find proof you've done work like mine and get in touch". No user research has been run; these findings come from expert review only.
