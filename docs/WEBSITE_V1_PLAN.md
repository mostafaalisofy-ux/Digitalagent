# Website v1.0 — identity redesign plan

Date: 2026-11-25 · Owner brief: «موقع اليكتروني قوي يعبر عن هوية قول تم» · Builds on Sprint 3 (`docs/SPRINT_3_REPORT.md`) and the 2026 company profile (`docs/profile/`).
Status: plan. Nothing is deployed; staging stays noindex; launch only when the owner says "launch".

## 1. Where the site is today (audit of the current build, 2026-11-25)

The site works: Astro 7, Arabic and English parity, 28 pages, case pages, client wall, legal drafts, SEO, Cloudflare files. It does not yet *feel* like SayTamm.

| # | Finding | Evidence |
|---|---|---|
| 1 | The hero is the static symbol and a paragraph. Nothing shows the work, the name's meaning or Tamm | Home, first screen |
| 2 | The home page is long and reads like a document: ~16,000 px on desktop, ~23,600 px on mobile, 9 sections, full case narratives on the home page | Full-page captures |
| 3 | **At launch the "performance agency" shows no numbers.** Every case is `pending`, so production hides all figures | `cases.ts`, `showFigures()` |
| 4 | The site still lists QNB (Ramadan 2015), Muriya, Bio-Group and DAMAC. The profile dropped them (D-025): pre-2021 or from another agency's published study | `cases.ts` |
| 5 | The profile's strongest material is not on the site: work by industry, Tamm, the markets skyline, the client journey with pictures, sharp single-post crops, Altopiano 4K frames | `handover/profile/assets` |
| 6 | Satoshi is self-hosted from git-ignored files. **Production cannot go live until the font licence is confirmed** | `site/public/fonts/satoshi/` |

## 2. Direction: "the work is the brand"

One idea, carried from the profile: **you say it, we Tamm it — and here is the proof.** Every screen either shows the work, shows a number with how it was measured, or moves the visitor to the brief.

- **Show, then tell.** Work and numbers first; copy short.
- **Tamm is the guide, not the hero.** He appears at four moments (name, journey, CTA, 404). Never more than one per screen.
- **One blade per screen.** Purple ≤ 10 %; the 45° blade is the only graphic device and the page transition.
- **Markets without words.** The Egypt · Saudi Arabia · UAE skyline line art (from the profile) marks where the team has worked.
- **Motion with a job:** the blade wipe between sections, numbers that count once, a work wall that drifts slowly and stops on hover. `prefers-reduced-motion` turns all of it off. No glow, no particles.

## 3. Site map v1.0

| Page | Change |
|---|---|
| Home | Rebuilt (storyboard below) |
| Work | Industry filter (7 industries, as the profile) + the three measured cases; the wall uses the sharp single-post crops |
| Case pages | Kept for the three remaining cases; four removed (see decision A) with redirects to /work |
| Services | Kept; each discipline gets a work strip from its industries |
| About | Story, «قول تم» name, facts, the markets skyline, values, Tamm |
| Contact | Brief form (still mailto until a backend exists) + the three next steps from the profile |

## 4. Home storyboard (target ≤ 7,000 px desktop)

1. **Hero:** "Say it. Tamm it." on the left; on the right a slow, tilted wall of real client work (as the profile cover). One CTA: Start a project.
2. **The name:** «قول تم» in Plex, one line on what it means, Tamm with arms crossed.
3. **Work by industry:** seven industry tabs; each opens a sharp grid of real posts (no enlarged collages).
4. **The work, measured:** K.S Furniture, fashion & beauty, electronics Q4, each with its figure and "how it was measured".
5. **From the brief to the next decision:** the eight-step journey with pictures; a progress line fills as you scroll.
6. **Nine services, one objective:** compact, four disciplines.
7. **Who trusts us:** 41 logos + the wall, then the six testimonials.
8. **Markets + CTA:** skyline line art, "Tell us the goal. We take it from there.", Tamm welcoming.

## 5. Quality bar

- Lighthouse ≥ 95 on Performance, Accessibility, Best Practices and SEO on mobile; LCP < 2.5 s; CLS < 0.05.
- Images: responsive AVIF/WebP, real `width`/`height`, lazy below the fold; home ≤ 1.5 MB on first load.
- JavaScript ≤ 30 KB on the home page; everything works without it.
- Arabic written natively (not translated), RTL checked at 8 widths; the blade is never mirrored.
- Existing QA scripts (`tools/qa/`) extended to the new sections.

## 6. Phases

| Phase | Scope | Output |
|---|---|---|
| 1 | Data sync (cases per D-025, industries, assets) + new Home, EN and AR | Staging build + screenshots |
| 2 | Work page by industry + case pages refresh + redirects | Staging build |
| 3 | About (name, Tamm, markets), Services strips, Contact steps, 404 with Tamm | Staging build |
| 4 | QA: 8 widths × 2 languages, accessibility, Lighthouse, link check | QA report |
| — | Launch | Only on the owner's "launch" |

## 7. Owner decisions

| ID | Decision | Recommendation |
|---|---|---|
| A | Apply D-025 to the site: remove the four cases and show the three approved figures in production | Yes, same as the profile |
| B | Tamm on the website (the character reference is still an open item) | Yes, at the four moments above |
| C | A second contact channel (WhatsApp or phone number) | Needed for conversion; owner supplies the number |
| D | Satoshi licence for the live site | Required before launch |
