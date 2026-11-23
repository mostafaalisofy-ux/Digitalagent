# SayTamm teaser — "From noise to Tamm" (24 s)

```bash
node tools/motion/render-teaser.mjs
```

Builds 4 videos in `handover/motion/` (EN/AR × 16:9/9:16), each with sound plus a silent copy, a poster frame and the sound track (`SayTamm_Teaser_Sound.wav`). Add `--preview` for keyframes only, or `--only=ar-9x16` for one version.

- `teaser.html` — the animation. `render(t)` draws the frame at time t, so every frame is deterministic.
- Logo: paths read from `brand/production/logo/SayTamm_Symbol_Signature_White-Purple.svg` and animated by transform only (T drops in, blade slides along its own 45° axis). Never redrawn or mirrored.
- Sound: synthesised in Python (ticks, drone, whooshes, pulse, impact), so there is no third-party music licence.

| Time | Scene |
|---|---|
| 0–3 s | Noise: «more posts, more ads, more reports…», then a hard cut to silence |
| 3–6 s | "Not all movement means progress." with a purple underline |
| 6–9.5 s | "What should move?" → Sales · Qualified leads · Revenue |
| 9.5–14 s | Strategy → Creative → Media → Performance on one 45° line → "One team. One number." |
| 14–15.7 s | Tamm Slash transition |
| 15.7–20 s | Logo build + impact → "Say it. Tamm it." / «قول. تم.» |
| 20–24 s | "A digital marketing & performance agency." → "Less talk. More Tamm." → saytamm.com |

## v2 — "SAY → TAMM" (30 s, more visual)

```bash
node tools/motion/render-teaser-v2.mjs
```

Outputs `handover/motion/SayTamm_Teaser_v2_*` (EN/AR × 16:9/9:16; with sound, silent, poster) and `SayTamm_Teaser_v2_Sound.wav`.

| Time | Idea |
|---|---|
| 0–3.5 s | Talk as a waveform: tangled voice-lines with agency clichés riding the peaks, syllable-rate chatter, then a hard cut |
| 3.5–6.3 s | The noise freezes and pulls taut into one line, rotates to 45°, turns purple and becomes the logo's blade: "We say less. / And get it done." |
| 6.3–10.5 s | A giant striped SAY / قول is slashed along the 45° line; the halves slide apart and TAMM / تم rises between them |
| 10.5–15.6 s | The four disciplines as diagonal ticker lanes moving in opposite directions to a 120 bpm beat, merging into one purple lane: "ONE TEAM · ONE NUMBER" |
| 15.6–20.6 s | Outline questions (Sales? Qualified leads? Revenue?) filled solid by each blade slash → "Pick the number. We build everything around it." |
| 20.6–26.2 s | Extruded 3D logo: the camera swings from a side view to the front; the blade slides along its axis into place with the impact |
| 26.2–30 s | "Less talk. More Tamm." cut in on the diagonal → "Coming soon" |
