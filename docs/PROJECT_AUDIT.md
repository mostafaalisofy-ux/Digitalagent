# Phase 01 — Project Audit

> **Sprint 3 status (2026-11-05): historical document.** This audit describes the repository on 2026-11-04, before the website existed. The site has since been built in `/site` (Astro 7, W-008). Current state: `SPRINT_3_BASELINE_AUDIT.md` and `SPRINT_3_REPORT.md`.

Date: 2026-11-04 · Status: **Discovery complete.** Owner review pending.

## 1. Repository audit [CONFIRMED]

| Item | Finding |
|---|---|
| Repository | `mostafaalisofy-ux/Digitalagent`, branch `claude/saytamm-brand-strategy-d2shzo` |
| History | One commit ("Initial commit") |
| Contents before this work | `README.md` only ("my agent for digital marketing works") |
| Framework / dependencies | None. No `package.json`, no code, no build config |
| Existing website | None in the repo. No live URL provided |
| Technical debt | None, since nothing has been built. The real risk is starting the build before brand blockers are resolved (see §4) |

**Implication:** this is a greenfield build. There is no architecture to preserve, so the stack is our choice (see `TECHNICAL_ARCHITECTURE.md`).
**Open point:** the repo name and README describe "an agent for digital marketing work", not a website. We need to confirm this repo should hold the SayTamm website (OQ-01).

## 2. Asset inventory

Full register with hashes: [`/brand/SOURCES.md`](../brand/SOURCES.md).

| Category | What exists | What's missing |
|---|---|---|
| Logo symbol | 8 PNGs (black, white, purple, outline black/white). 5 unique files, about 600 px, raster | **Vector master (SVG/AI/EPS)**; a two-tone file; large-format PNGs |
| Wordmark / lockups | None. "SayTamm" exists only as live text in the decks | **Wordmark artwork, EN and AR**; horizontal, stacked and bilingual lockup files |
| Pattern | The diagonal element isolated in 3 colours, plus a reference tile | Pattern tiles as SVG |
| Colour | Full spec (HEX/RGB/CMYK) | Pantone (deliberately not fabricated) |
| Typography | Spec sheet | Font files and licence record (Satoshi via Fontshare; IBM Plex Sans Arabic is OFL) |
| Guidelines | Bible (`.md` only), Visual Identity Guidelines 2026 (`.pptx`/`.pdf`/`.md`), Full Visual Guidelines (`.pptx` + summary `.pdf`) | **Bible `.pptx` and Professional Guidelines v2 arrived empty**; the "Master Brand System" decks cited by the guidelines were never received |
| Concept boards | 5 application and mockup boards (AI-assisted) | — |
| Company profile | **None** | Company profile, legal entity, CR number, office location |
| Portfolio / case studies | *Updated 2026-11-04:* Infinity Corp e-commerce deck, nsm+ case studies deck, steps-ksa.com case studies (see `PORTFOLIO_AND_CASE_STUDIES.md`) | Original data exports, dates, full-resolution visuals; Steps cases only if founder-led (OQ-37) |
| Business info | Steps KSA's public details (Jeddah office, phone, email, socials; see `STEPS_TRANSITION.md`). **None confirmed as SayTamm's** | SayTamm domain, email, phone, legal entity, team |
| Photography | **None** | Team, workspace, real work moments |

## 3. Brand conflicts found across sources

These must be resolved once, recorded in `DECISION_LOG.md`, and then applied everywhere.

| # | Topic | Brand Bible | Visual Identity Guidelines 2026 | Full Visual Guidelines | Concept boards | Our recommendation |
|---|---|---|---|---|---|---|
| C1 | **Two-tone mark** (white/black T + purple blade) | "Purple is an accent… not a requirement for every logo placement" (implies purple-accented versions exist) | Prohibits a split mark ("not part of the supplied master artwork") | Shows a "FULL COLOR" version | **Every board shows it as the hero version** | Approve two-tone as a *Signature* version for hero moments. It recolours two already-separate shapes, so no geometry changes. Mono stays the default. **Owner decision (OQ-02)** |
| C2 | Black HEX | (not listed; its table matches the 2026 Guidelines) | `#0A0A0D` | `#07080C` | `#111111` | `#0A0A0D` |
| C3 | Neutrals | 100 `#F5F5F7` · 500 `#A4A4AE` · 900 `#17171C` | Same as Bible | `#F4F4F7` · `#9A9CA8` · `#11131A` | `#F5F5F5` | Bible values |
| C4 | Electric Purple | `#6C35FF` | `#6C35FF` | `#6C35FF` | `#6A35FF` | `#6C35FF` (agreed everywhere except one board) |
| C5 | **Diagonal angle** | — | "≈ 65°" | 45° (icon slide) | — | **≈ 45° (measured)**. "65°" is an error |
| C6 | Digital minimum size | ≈ 20 px | 24 px (attributed to the unseen "Master Brand System") | 20 px | 28 mm / 12 mm print | 24 px minimum (the stricter value); test at 20 px for favicon only |
| C7 | Clear space unit X | "visual **width** of the diagonal element" | "**height** of the diagonal element" | "diagonal element" | "height of the diagonal element" | Height (3 of 4 sources). Define it numerically once the vector exists |
| C8 | Type scale | Display 48–72 · H1 32–44 · H2 24–30 · Body 16–18 · Caption 11–13 | Same as Bible | Display 56–72 · H1 36–48 · H2 26–32 | — | Bible scale for print and decks; fluid web scale in `VISUAL_IDENTITY.md` |
| C9 | Wordmark styling | — | "SayTamm" mono (lockups) / "SAYTAMM" caps (cover) | "SAYTAMM" | "Say" + "Tamm" in purple (boards 1, 2); "SAYTAMM" tracked caps (boards 3–5) | **Owner decision (OQ-03)**, then commission vector wordmark artwork |
| C10 | Arabic name | قول تم | قول تمّ (with shadda) | قول تم | قول تم | **Owner decision (OQ-04)** on the canonical spelling. Note: the Guidelines `.md` contains a garbled "قول لوق مت" (RTL extraction bug). Never copy text from that line |
| C11 | Outline icon file | — | `icon_outline_*` | — | — | The white outline file is 820×927 px versus 655×781 for black: a different extraction. Verify stroke weight once vectors exist |
| C12 | Pattern | "Repeat the diagonal gesture" | Diagonal element only (27 Aug package) | Thin straight lines on a grid | — | Diagonal element only. Older zip's full-logo pattern is invalid |
| C13 | Pattern count | — | Slide 42 says "Seven" treatments but shows eight | — | — | Eight. Fix in the next guideline revision |

## 4. What blocks which phase

| Blocker | Blocks | Can work continue? |
|---|---|---|
| Vector master logo + wordmark artwork (OQ-05) | Production website header, favicon set, OG images, print | Yes. Strategy, IA, copy, design direction and build scaffolding all proceed. Final logo slots in later |
| Two-tone + wordmark decisions (OQ-02, OQ-03) | Creative direction sign-off | Yes. Direction can show both options |
| Portfolio materials + attribution (OQ-10, OQ-11) | Work section, proof section, case studies | Yes. The site can launch with a strong "Approach" story and few or no case studies (see sitemap) |
| Contact details, domain (OQ-07, OQ-08) | Launch | Yes. Clearly marked placeholders until then |
| Repo purpose (OQ-01) | Website build location | Docs are safe here either way |

## 5. Quality issues in the existing guidelines (non-blocking)

- The PDF does not embed Satoshi; its type specimen pages render in a fallback font.
- Placeholder people and data appear in application mockups ("Yara Al-Faisal", "Mostafa Sofy, Founder & CEO", "+966 50 123 4567", `hello@saytamm.com`). **None are verified contact data.**
- Concept board 2 states "T + ✓ = SayTamm" and describes the mark in Arabic as a checkmark ("علامة الصح"). This contradicts the Bible's "without relying on a literal checkmark icon". Do not reuse that explanation publicly.
- Concept board 2 contains AI text artifacts in its type specimen. Never use it as a type reference.
- The spacing scale in the 2026 Guidelines is in inches (deck-oriented). Web work uses the 8 px system from the Full Visual Guidelines instead.
