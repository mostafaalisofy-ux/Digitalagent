# «The Rally»: SayTamm, 20 s, 1080×1080, English

Owner brief (2026-11-27): a video like the reference (a tennis game ad: top-down courts, bold kinetic type, counters), about the
constant back-and-forth between client and agency (requests, amends, approvals, results) and how the SayTamm team handles every one
of them for better performance. SayTamm identity, English. The owner's prompt asked for one through-line object, a vector UI, a
cursor-driven story, screen-studio zooms, springs, a code soundtrack, 60 fps with 3 sub-frames.

**Idea:** the client–agency back-and-forth is a rally. The client sends the ball; the SayTamm team returns it, done, every time.
**Through-line object: the purple ball** (full stop → request badge → comment pin → next-version button → Approve button →
data point → the blade of the SayTamm symbol). The beat-by-beat storyboard is in `STORYBOARD.md`.

- `film.html`: one canvas, everything computed from `t` in `window.seek(t)` (no CSS animation, no timers, no state).
  Springs with about 4% overshoot; exponential easing; the ball stretches along its own velocity; the camera always pushes or moves.
- The symbol on the end card is the original file, split into its two layers at runtime (white T, purple blade) without redrawing.
  The blade is measured from its pixels (centre, axis, length, width) so the ball turns into it exactly.
- The full stops are measured from the type, so the ball lands exactly after «CHANGE» and «BACK».
- UI is illustrative of the everyday workflow, rebuilt as vector layers in the brand style: no client, tool or figure is named.
- Score in code (`renderAudio`): 120 BPM, a kick on every beat, a hit on every scene change, a racket "pock" on every shot,
  bounces, clicks, the approval chime. Master −14 LUFS, under −1 dBTP after AAC.
- Type: Satoshi (the brand's English face) with IBM Plex Sans Arabic for «قول تم». **Satoshi is embedded: keep the film internal
  until the font licence is confirmed** (or swap to IBM Plex Sans for a publishable cut).

Render (repo root): `bash film/rally/render_parallel.sh` → `handover/launch-film/rally/SayTamm_The_Rally_EN_1x1.mp4`.

## Suno prompt (if you want a real track instead of the code score)

Instrumental, 120 BPM, 20 seconds, punchy modern sports-promo electronic: tight four-on-the-floor kick, crisp claps on 2 and 4,
short muted synth stabs in A minor (Am–F–C–G), rubbery sub bass, tennis-ball "pock" percussion as a rhythmic element, no vocals,
no risers longer than one bar, a hard stop hit at 16 seconds then a clean resolving chord for the logo. Confident, clean, minimal.
