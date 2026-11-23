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
