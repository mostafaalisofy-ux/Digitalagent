# SayTamm (قول تم): working notes for Claude

SayTamm is a digital marketing & performance agency. This repo holds the website (`site/`), the brand and launch documents (`docs/`, `brand/`), and the launch films (`film/`). Read this file first in every new session, then the README of whatever you touch.

## How the owner works

- Reply in Egyptian Arabic. Keep it short and concrete.
- Work autonomously: do not come back with questions on creative or technical choices; pick a sensible default and say which.
- When a video is finished, send the MP4 straight away (and a cover frame), then explain briefly.
- Nothing is posted, published, deployed or sent outside without the owner's explicit approval. No DNS changes or deploy without the owner saying "launch".
- Never ask for tokens or passwords in chat.

## Rules that never bend

- **Facts.** Never invent facts or numbers. Approved company facts only: founded 2021 · 30 people on the team · 15+ years of founder leadership · 200+ brands in the founder's track record · 20+ industries · 5 markets in the team's track record (experience, not offices). No "first", "fastest", "leading", guaranteed results, offices, awards, certifications or partnerships.
- **Case figures** (`site/src/data/cases.ts`) are all `status: 'pending'` (OQ-32: original platform exports and client approval). Copy them verbatim with their source note, never publish them before approval, and never call ROAS "profit" (ROAS = revenue ÷ ad spend). Team track-record wording: "Results from projects led by members of the SayTamm team, including work delivered at other agencies." / «مشاريع قادها أعضاء من فريق قول تم، ومنها أعمال نُفّذت في وكالات أخرى.»
- **Names.** Never name previous agencies (the owner has full rights to use Steps material, but never with the Steps logo or name). Government bodies stay hidden. Never publish the 57357 targeting detail. Never call SayTamm a "Saudi agency"; the line is "A digital marketing & performance agency".
- **Brand.** Logo from the original SVG/PNG files in `brand/production/logo/` only, never redrawn. Obsidian #09090D, Graphite #17171E, Soft White #F5F3FA, Muted #96939F, Electric Purple #6C35FF as an accent at 10% of the frame or less. No glow, neon or particles. Satoshi for English, IBM Plex Sans Arabic for Arabic.
- **Satoshi** font files are never committed or uploaded (`site/public/fonts/satoshi/` is git-ignored; put the files there by hand on a new machine). Any output that embeds Satoshi stays internal until the licence is confirmed. Arabic-only films use Plex only.
- **People.** No AI-generated people presented as real. Stock footage: hands only, no faces; no Mixkit "Restricted" clips; no flags or other brands' billboards. Real team members appear only with written consent.
- **Voice.** ElevenLabs takes need a paid plan for commercial use and a native-speaker review before publishing. If ElevenLabs answers "Free generations are busy", start no other generation in that turn; retry later.
- Arabic copy is written natively (never line-by-line translation): «» quotes, the Arabic comma, Western digits.

## Where things are

- `docs/LAUNCH_VIDEO_PLAN.html`: the current launch video plan (12 ideas with storyboards, 30-day calendar, action plan, owner decisions). This is the plan to execute next.
- `docs/` launch playbook and 14-day content book (v2), decision log, open questions, approval registers.
- `film/<name>/`: one folder per film, each with a README. Pattern: `prep.py` (footage to JPEG sequences), `plan.py`/`timing.json`, `film.html` (canvas film with `window.seek(t)` and `window.renderAudio()`), `render.mjs` (Playwright → ffmpeg, 60 fps, 2 sub-frames blended), `render_parallel.sh` (4 workers, frame-count guard, retry), `mix.py` (VO cut to phrases, ducked score, master −14 LUFS / −1 dBTP).
- Films so far: the-dot, one-push, infinite, dictionary, roas (The Ratio v2–v5), intro (Tamm character), reel / reel2 (showreel), services (16:9 + 9:16), receipt (EN + Arabic store-owner cut), money2 («قاموس الفلوس» v2), whatwedo («Said. Done.», 16:9 motion piece of the nine services with client lines, loops), clientreel (client work as service stories, 9:16 Arabic), journey («رحلة العميل معانا», 9:16 Arabic, 8 stations from brief to report, real client footage + hands-only stock).
- Client footage comes from the owner's Google Drive folder «قول تم / فيديوهات عملاء» (Tech Hive, Niimee, Altopiano; Maheer empty). Large files download via the public link (`drive.usercontent.google.com/download?id=…&confirm=t`) only while the owner has the folder on "Anyone with the link".
- `handover/` is not in git (it is in `.git/info/exclude`): rendered masters, stock clips, VO takes and sequences live there. On a new machine it is empty, so re-download stock (Pexels IDs are in each `prep.py`) and copy the VO takes in before re-rendering an old film.

## Next steps (from the plan)

1. Teasers «قولها» (V01): done in another session; the owner supplied the three masters (`handover/launch-film/teasers/`). Their source is not in this repo.
2. «قاموس الفلوس» (V05): episodes 01–04 built; v2 (real stock, colour, VO cues) is `film/money2/`, v1 (type only) is `film/money/`. Episodes 02–04 still need their VO takes (`film/money2/VO_SCRIPTS.md`). Next episodes from the plan: new vs returning customer, the Boost button, wasted spend, CTR alone.
3. Filming days for the human series (The Relay, Meet the 30, founder, sketches) need the owner's footage and consent; use the owner's folders on this machine for any material they point to.
4. Owner decisions still open: launch date, who appears on camera, publishing our own ad numbers and the test budget, the CTA, dialect per platform, campaign line (D-023), Tamm character reference, client approvals (OQ-32).

## Setting up a new machine

Node 20+, Python 3 with numpy, ffmpeg (with libx264), and Playwright's Chromium (`npx playwright install chromium`). Satoshi files into `site/public/fonts/satoshi/` by hand. Site dependencies: `cd site && npm install` (the Arabic Plex font files come from `site/node_modules/@fontsource/ibm-plex-sans-arabic`).

## Git

Work on branch `claude/saytamm-brand-strategy-d2shzo`, commit after each step and push. No pull requests unless the owner asks. No model names in commits.
