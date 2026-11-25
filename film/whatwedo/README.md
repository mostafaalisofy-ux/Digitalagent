# «Said. Done.» — what SayTamm does (16:9, 29 s, loops)

A motion piece about the nine services. One line: **the cursor that types the brief tilts to 45° and becomes the blade of the SayTamm symbol, and every scene is made out of the one before it.** No cuts, no crossfades.

- 1920×1080, 60 fps, 3 sub-frames blended per frame (ffmpeg `tmix`) plus per-sample motion blur on fast moves (the scene is drawn several times inside the shutter and added up).
- 120 BPM: a beat every 0.5 s, a bar every 2 s. 14 bars and a half bar. Something lands on every beat.
- Type: Satoshi (700/500). Arabic («قول. تم.», «أب») in IBM Plex Sans Arabic, laid out right to left.
- Colour: Obsidian, Soft White, Electric Purple (accent, well under 10% of the frame except the one hero moment, which is a Soft White field, not a purple one), Graphite and Muted for UI.
- Easing: exponential in/out and a critically damped spring (no overshoot, nothing bouncy).
- The last frame equals the first: the film loops.

## Beat sheet

| Bar | Time | What happens | Technique |
|---|---|---|---|
| 1 Hook | 0–2 | End title → «Tamm it.» squeezes into a cursor → «Say it.» is deleted → the cursor types «Grow our sales.» → tilts 45° and becomes the blade that cuts the line | Kinetic type |
| 2 Digital Marketing Strategy | 2–4 | The blade becomes a path: Research · Position · Plan; the path retracts into the last node | Kinetic type |
| 3 Branding & Identity | 4–6 | Dot → circle → square → three swatches (Obsidian, Soft White, Electric Purple) → «Aa» / «أب» | Shape morph |
| 4 Social Media Marketing | 6–8 | The swatches split into nine tiles inside a phone; the feed scrolls; a heart; the platforms | Shape morph |
| 5 Content Marketing → Media Production | 8–10 | The centre tile becomes a 9:16 card, then a 3D carousel (Reels, Carousels, Stories, Photography, Video, Motion); viewfinder | 2D → 3D |
| 6 Performance Marketing | 10–12 | The cards flatten into bars; a dashboard; a rising line; CPA ↓ and ROAS ↑ (directions only, no figures) | Data / UI |
| 7 SEO | 12–14 | The line becomes a search box; «best office chairs»; «Your brand» climbs to the top | UI |
| 8 Website Development & CRO | 14–16 | The top result opens into a browser; the page builds; the pointer clicks «Buy now» → «Done ✓» | UI |
| 9 Analytics & Growth | 16–18 | The page's blocks become a loop: Measure → Learn → Improve → Repeat | Data |
| 10 One team | 18–20 | The loop becomes a ring of the nine services; «Nine services. 30 people. One goal. Yours.» | Kinetic type |
| 11–12 In their words | 20–24 | The ring collapses into a quote mark; four client lines, one per second | Kinetic type |
| 13 Build | 24–26 | The quote mark becomes the cursor; the nine services stack faster and faster over a riser | Kinetic type |
| 14 The strongest moment | 26–28 | The blade opens the frame to Soft White; «Say it.» / «Tamm it.» slam on the beat; a second blade closes it | — |
| ½ End | 28–29 | Symbol, «Say it. Tamm it.», «قول. تم.», the line and saytamm.com (= frame 0) | End title |

## Client lines (bars 11–12)

Verbatim excerpts from testimonials published on the website of the agency where the work was delivered. The agency's name is not shown and nothing is put in a client's mouth: none of the four excerpts names an agency, so nothing was replaced. On screen: «Client words from projects led by members of the Say Tamm team, including work delivered at other agencies.»

| Client | Line | Full original |
|---|---|---|
| K.S Furniture | Professional team with strong execution. | Professional team with strong execution. Our campaigns became more structured, and we started seeing measurable ROI within a short time. |
| Musalli Jewelry | …handled everything with precision. | From branding to performance campaigns, [the agency] handled everything with precision. … |
| Alqimma Equipment | …a steady flow of high-quality leads. | … We've seen stronger brand presence, better audience targeting, and a steady flow of high-quality leads. |
| BITUMAT | …truly understands business needs. | … The team is proactive, creative, and truly understands business needs. |

If the clients approve the lines being attributed to Say Tamm by name, the attribution caption is one string (`ATTR`) and the quotes are the `QUOTES` array in `film.html`. Get that approval in writing before publishing (same register as OQ-32).

## Facts used

Only approved facts: «30 people», the nine services as named in `site/src/data/services.ts`, «A digital marketing & performance agency», saytamm.com. No figures, no results, no claims.

## Build

Needs the Satoshi files in `site/public/fonts/satoshi/` (not in git) and `site/node_modules` for Plex.

```bash
node film/whatwedo/render.mjs --beats 0.4
```

```bash
bash film/whatwedo/render_parallel.sh
```

`--beats 0.4` writes one frame per beat (at beat + 0.4 s) to `handover/launch-film/whatwedo/_frames` for review; `--frames 1.2,3.4` writes chosen frames. `render_parallel.sh` renders the score, the picture on 4 workers (frame-count guard, retry), and runs `mix.py` (master to −14 LUFS, under −1 dBTP, AAC 320k), which also writes `cover.jpg` (27.4 s) and `cover_end.jpg` (28.9 s).

Output: `handover/launch-film/whatwedo/SayTamm_SaidDone_Services_16x9.mp4`.

## Before publishing

- Satoshi is embedded in the picture: keep the master internal until the font licence is confirmed (`CLAUDE.md`).
- Client approval for the four lines and their names.
- The score is generated in code (Web Audio), so there is no music licence to clear.
