# Launch content review — 14-day social launch

Date: 2026-11-23. Reviewed: `SayTamm_Launch_Strategy_Playbook.pdf` (v1.0, 17 Nov 2026), `SayTamm_Launch_Strategy_Presentation.pptx` (18 slides), `SayTamm_14Day_Social_Content_Production_Book` (PDF 67 pages + HTML) and `SayTamm_14Day_Social_Content_Production_Deck.pptx` (101 slides). Originals are kept in `docs/launch/source/`.

Checked against: `DECISION_LOG.md`, `VISUAL_IDENTITY.md`, `BRAND_VOICE.md`, the approved facts in `docs/chatgpt/2_SAYTAMM_PROJECT_KNOWLEDGE.md`, and each platform's own limits.

**Verdict:** the strategy is sound and stays within the approved facts. Several problems stopped it from being publishable or shareable: broken Arabic in both PDFs, captions copied across platforms, a wrong colour palette in the prompts, and a calendar that differs between the documents. All the copy fixes are applied in `content/posts_v2.json`, and the redesigned files are in `handover/launch/`.

## Critical

| # | Issue | Where | Fix applied |
|---|---|---|---|
| 1 | **Arabic does not render.** Every Arabic word in the title, the purpose lines and the tagline shows as "NO GLYPH" boxes, ellipses break, and `#` disappears from Arabic hashtags. The file cannot be sent or reviewed. | Playbook PDF, Content Book PDF | Rebuilt with IBM Plex Sans Arabic embedded and checked page by page (`tools/launch/build-launch.mjs`) |
| 2 | **One caption copied five times.** Each day has a single body pasted into Facebook, Instagram, LinkedIn, X and TikTok, with a template prefix ("خلّينا نسأل سؤال مهم:", "من منظور الأعمال،", "الخلاصة:") and a generic closing line. This produces errors such as "From a business perspective, Have an objective?". | All 70 caption pairs | All 140 captions rewritten for their platform: full argument on LinkedIn and Facebook, hook and save on Instagram, one thought on X, a short line on TikTok |
| 3 | **X captions are 350–600 characters**, over the 280-character limit, so they cannot be posted. | X, 14 days × 2 languages | All within 280 characters (longest: 188); limits checked automatically in `build_posts.py` |
| 4 | **Wrong palette in all 14 production prompts.** They specify Black #0A0A0D, White #FFFFFF, #F5F5F7, #A4A4AE and #17171C, which contradicts the approved identity and the playbook itself. | Content Book prompts | Replaced with Obsidian #09090D, Graphite #17171E, Soft White #F5F3FA, muted #96939F, Electric Purple #6C35FF |
| 5 | **Arabic register.** All the Arabic, LinkedIn included, is in Egyptian colloquial. | All Arabic captions | Owner decision (2026-11-23): Modern Standard Arabic on Facebook and LinkedIn; light conversational Arabic on Instagram, X and TikTok |

## High

| # | Issue | Fix |
|---|---|---|
| 6 | **The calendar differs between documents.** The playbook's hooks and topics do not match the content book. Day 1 is "Another marketing agency? Think again." against "Not all movement means progress."; Day 11 is "Your competitor's strategy…" against "Read the report backwards", a different topic. Days 2, 3, 5, 7, 10, 13 and 14 also differ. | The content book is treated as the source; the redesigned playbook takes its calendar from the same data file, so they cannot diverge again |
| 7 | **TAMM has no approved reference.** Every prompt depends on an "approved TAMM reference image", but no TAMM design is recorded in the project (decision log, brand files). Producing Days 2, 5, 7, 10, 13 and 14 needs it. | **Open, owner:** approve the TAMM master reference (front, side, back) and record it as a decision before production |
| 8 | **The campaign line is new.** "LESS TALK. MORE TAMM. / كلام أقل. تنفيذ أذكى." is not in the decision log. The documents rightly keep it separate from the tagline. | **Open, owner:** confirm it as the launch campaign line (proposed D-023) |
| 9 | **A closing line on Day 7 makes no sense:** «تمثيل المشكلة أسهل من القفز للحل» / "It is easier to represent a problem than to jump to a solution". | Now «فهم المشكلة أولاً أوفر من القفز إلى الحل» / "Understanding the problem first costs less than jumping to a solution" |
| 10 | **Carousel prompts ask for a 9:16 video master.** | Days 3, 6 and 12 now specify 4:5 carousels (1080 × 1350 px, 6–8 slides) |
| 11 | **Unsupported claim** added during the rewrite and then removed: "reports that lead nowhere are among the biggest drains…" | Removed. No market claims, superlatives or promised results remain |

## Medium

- **Website link:** www.saytamm.com is not live. The Day 14 call to action uses info@saytamm.com only. Profile bios and link-in-bio must wait for the site launch, or use the email.
- **Tracking:** the site has no analytics or pixels. The playbook rightly says not to report website conversions until tracking and consent are in place.
- **Hashtags:** reduced to 1–3 per post, with no hashtag stuffing; English and Arabic sets are separate.
- **Wording rules:** «منشور» replaces «بوست»; British spelling in English; Western digits.
- **Emoji:** at most one per caption, on Instagram, TikTok and X only. The owner can remove them.

## Facts check (all pass)

Founded 2021 · team of 30 · founder 15+ years across Saudi Arabia, Egypt and the Gulf · 200+ brands · 20+ industries · nine services in four disciplines · info@saytamm.com. Nothing else is added: no clients, results, case figures, offices or promises. Day 5 and Day 7 scenarios are labelled hypothetical. "ROAS is not profit" is kept.

## What was already good

- The strategy (audience tension, five content pillars, the mix of founder-led and AI-led pieces) is sound.
- Governance rules are correct: pending figures stay unpublished, government bodies stay hidden, and AI imagery is never presented as real.
- The AI prompt discipline is strong: typography-free plates, the logo added in post, negative prompts.
- Founder reels follow a clear 0–2 / 2–7 / 7–24 / 24–32 second structure.

## Files

| File | What it is |
|---|---|
| `content/captions_v2.py` | The corrected captions, hooks and purpose lines (edit here) |
| `content/build_posts.py` | Merges them with the production fields → `posts_v2.json`; checks the X and TikTok limits and the palette |
| `content/posts_v2.json` | 14 days: hooks, purpose, 140 captions, corrected prompts |
| `content/posts_v1_original.json` | The original data, for comparison |
| `source/` | The five original files |
| `tools/launch/build-launch.mjs` | Builds the redesigned PDFs and interactive HTML in `handover/launch/` |
