# Arabic and English QA

Date: 2026-11-05. Scope: every public page in both languages (13 page types), the form, error states and the 404.

## Parity

| Check | Result | How |
|---|---|---|
| Every page exists in both languages | Pass (13 + 13) | `seo.js` parity check |
| Navigation, footer, buttons, form labels, errors | Pass — all from `src/i18n/ui.ts` / `home.ts` with an entry per language | Source review |
| Page titles and descriptions | Pass — unique per language | `seo.js` |
| Canonical and hreflang | Pass — reciprocal | `seo.js` |
| Case studies and services | Pass — every field is `{ en, ar }` in `src/data/*.ts` | Source review |
| Legal page | Pass — `/en/privacy/`, `/ar/privacy/` | Build |
| Error page | Single bilingual 404 (both languages on one page) | Build |
| Language switch keeps the equivalent page | Pass, including case pages and privacy | `func.js` |

## Arabic corrections made this sprint

| Before | After | Why |
|---|---|---|
| «بوستات» / «بوستات سوشيال» / «بوست» (91 occurrences) | «منشورات» / «منشورات لمنصات التواصل» / «منشور» | Transliterated English reads informal on a business site |
| «لـ BITUMAT», «لـ DC BLOCK» | «لعلامة BITUMAT», «لشركة DC BLOCK» | Project rule: no tatweel next to a Latin word (RTL rendering) |
| «والبوستان منشوران» | «والمنشوران نُشرا فعلاً» | Clearer, avoids a repeated root |
| Hero supporting line | «في قول تم، نجمع الاستراتيجية والإبداع والإعلانات والتقنية في منظومة واحدة…» | Approved positioning (D-020); no single-country restriction |
| About page | Rewritten in Arabic with its own hierarchy (hero, experience, markets, operating model, philosophy, close) | D-020; corporate MSA, no dialect |
| Final CTA | «حدّد الرقم الذي تريد تحريكه.» | Commercially specific |

## Automated Arabic checks (all built Arabic pages)

Latin comma or question mark between Arabic words, Latin semicolon, straight quotes around Arabic, tatweel, double spaces, a space before Arabic punctuation: **0 occurrences** after the fixes above.

## Rules applied

- Arabic spelling of the brand: **قول تم** (owner-approved).
- Western digits 0–9 in both languages (owner-approved); numbers and Latin product names in Arabic are isolated with `<bdi>` so punctuation never reorders.
- Arabic quotation marks «…»; Arabic comma «،»; Arabic question mark «؟».
- Brand lines and product names in English stay in English inside Arabic text (e.g. Your size. Your style., Casual Core), isolated with `<bdi lang="en">`.
- The brand diagonal is never mirrored in RTL; layout mirrors through logical CSS properties.

## English

- Natural business English; sentence case for headings; British spelling (optimise, colour), applied consistently.
- No literal translations from Arabic: each language is written for its reader, not translated line by line.

## Unresolved — needs a native reviewer

A native Arabic reviewer (professional MENA business Arabic) must approve the final public Arabic copy before launch (OQ-25). Points to look at:
1. Tone: Modern Standard Arabic with Saudi business vocabulary; the Tech Hive titles quote Saudi dialect on purpose («القيمنق»).
2. «بانرات» kept as the common industry term for web banners.
3. Service names and the four discipline names.
4. The privacy notice wording (also subject to legal review).
