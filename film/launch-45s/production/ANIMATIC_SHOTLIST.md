# SayTamm launch film: animatic shot list (Gate 2)

45 s · 1080×1920 · 30 fps constant · silent. Built graphic-first from `animatic.html` with a stateless `seek(t)`, so every frame can be re-rendered exactly. Captions are the locked script lines, burned in at the storyboard timings. The same timings are written to a draft SRT.

```bash
node film/launch-45s/production/render-animatic.mjs --sheet
```

```bash
node film/launch-45s/production/render-animatic.mjs
```

The first command renders one review frame per second (add `--fine` for one every half second). The second renders the full outputs listed below.

**Outputs** (in `handover/launch-film/animatic/`, not in git):

- `SayTamm_Launch_45s_9x16_ANIMATIC_REVIEW.mp4`: timecode, shot and "review only" overlay in the top margin.
- `SayTamm_Launch_45s_9x16_ANIMATIC_clean.mp4`: the same picture with no overlay.
- `SayTamm_Launch_45s_AR_DRAFT.srt`
- `qc.json`

## Structure: one world, four panels

Shots S2–S5 live in a single 2×2 world of four panels, and the camera cuts between them:

- **P1:** the device and its Publish button
- **P2:** the unfinished design page
- **P3:** a practical light
- **P4:** three pieces that align

At 20 s the camera pulls back for the first time and shows that the four moments were one system. That is the brief's "the frame widens for the first time", done literally rather than as a transition effect.

## Shots

| Shot | Time | Picture | Motion | On screen / VO |
|---|---|---|---|---|
| S1 | 00:00–04:00 | One soft-white caret in Obsidian; a graphite glass edge barely visible | Locked camera; slow blink (1.6 s cycle) | none |
| S2a | 04:00–05:20 | Macro on P1: Publish, unlit; a fingertip's shadow over the glass | Shadow drifts closer; tiny push | «قول تم.» 04:00–05:60 |
| S2b | 05:20–06:40 | Macro on P2: dashed frame missing two sides, an unfinished circle | Near-static drift; cut on the consonant | (continues) |
| S2c | 06:40–07:60 | Macro on P3: a practical light strip, off | Near-static drift | none |
| S2d | 07:60–08:00 | Back to P1: the shadow closes in | Shadow accelerates; the tension peaks | none |
| S3a | 08:00–09:40 | The press lands: the button lights; two purple rings cross the glass, then the pulse runs along the glass toward the layout | Spring on the button; rings ease out; the camera releases from the macro | none |
| S3b | 09:40–11:50 | Match-cut to P2: the pulse travels the frame and draws its missing sides solid, then the circle, then the copy lines | The pulse leads every stroke | none |
| S3c | 11:50–15:00 | Match-cut to P3: the pulse runs down the strip and the light comes on; it warms the wall, then the pulse leaves toward P4 | The strip fills top to bottom behind the pulse | none |
| S4 | 15:00–20:00 | P4: three tilted pieces (product, photo, copy) snap level, one per pulse (15.4 / 16.4 / 17.4); viewfinder brackets lock around them; a purple "ready" point | Springs with ≈1.5% overshoot: the pieces align, nothing explodes | «اعتبره حصل.» 15:20–16:80 |
| S5 | 20:00–27:00 | Log-scale zoom-out anchored on P4 reveals all four panels, every act completed. A reflection sweeps the glass at 45°; the panels close their gaps into one block, which dims; the ready point travels to frame centre | Zoom 1.17 → 0.455 (20–23), sweep (23–24.8), gaps close (24.6–26), dim (26–26.9) | “Consider it done.” 20:20–21:80 |
| S6 | 27:00–35:00 | قول / اعتبره / Consider enter on three layers (27.0 / 27.8 / 28.6); hairlines grow to the point; each word is pulled along its line into the point | Mask reveal from the baseline; staggered gravity (31.0–34.6); the point pulses at 34.8 | «في كل لغة، في لحظة بتفصل بين الفكرة وحصولها.» 28:00–32:40 · «فيه كلمات بتقفل الكلام.» 32:60–35:40 |
| S7 | 35:00–40:00 | «تم» opens from the point (circular reveal). At 37.2 the two dots of the ت lift off as the two pulses; the letter body sinks away. One pulse runs across the T and reveals it; the other runs down the blade's 45° axis and reveals it | The reveal fronts are masks on the original symbol paths that pass exactly through each pulse, so nothing is redrawn | «و«تم»؟ بتفتحه على واقع جديد.» 35:60–39:40 |
| S8 | 40:00–45:00 | End card: symbol, «SayTamm», rule, «Say it. Tamm it.», «قول. تم.» | Settle only: 14 px rise + fade-in, staggered 40.3 / 40.8 / 41.1 / 41.5. The last frame equals keyframe F06 | none |

Pace builds as the brief asks: 4 s → 1.2 s cuts → 1–2 s acts → one beat per second in S4 → the long pull-back → the converge, then the energy drops on the end card.

## Not in the animatic yet (comes at Stage 3 and later)

- **Sound:** foley, the «م» bass, music and VO. The file is silent by design.
- **Live macro footage:** to replace P1–P3 if a shoot is approved. Graphic-first remains the fallback.
- **Paper fold:** the "paper turns into geometry" beat in S5 is represented by the panels closing into one block. A real paper fold at 45° can be added in the first edit.
- **Motion blur:** sub-frame blending for the master.
