# SayTamm launch film: Gate 1 report (asset audit and keyframes F01–F06)

Stage 1 only. No animatic, voice, music or final render has been started. Nothing has been published or uploaded.

## Project layout

| Path | Contents |
|---|---|
| `film/launch-45s/handoff/` | The 7 handoff documents, unchanged (byte-identical to the uploads; only the upload prefix was removed from the file names) |
| `film/launch-45s/production/keyframes.html` | The six keyframes as one layered HTML file (1080×1920 each) |
| `film/launch-45s/production/render-keyframes.mjs` | Renders the frames, the purple and safe-zone QC, and both contact sheets |
| `handover/launch-film/keyframes/` | Review outputs: `F01.png`–`F06.png`, `F01-F06_contact_sheet.png`, `F01-F06_safe_zones.png`, `qc.json` (not in git) |

```bash
node film/launch-45s/production/render-keyframes.mjs
```

## Assets used

| Asset | File | Status |
|---|---|---|
| Symbol | `brand/production/logo/SayTamm_Symbol_Signature_White-Purple.svg` | Verified: same SHA-256 as `site/dist/brand/…`, which is the file the handoff points to (`../SayTamm-Offline-Preview/dist/brand/`). Placed as an `<img>` of the original file: not redrawn, recoloured, mirrored or regenerated |
| Arabic type | IBM Plex Sans Arabic 400/500/600 (`@fontsource`, OFL) | Verified, local |
| English type | Satoshi 500/700 (`site/public/fonts/satoshi`) | Available locally under the Fontshare licence. The files stay out of git and are never uploaded to third parties, so frames that contain Satoshi are internal review material |
| Palette | `#09090D` `#17171E` `#F5F3FA` `#96939F`, accent `#6C35FF` | Verified in the source |
| Live footage, voices, music | None | Not available yet. These keyframes follow the brief's graphic-first fallback. No AI people, AI offices or AI-generated Arabic text were used |

## Keyframes

| Frame | Time | What it shows | Purple |
|---|---|---|---|
| F01 | 00:00–00:04 | One soft-white caret in Obsidian; a graphite glass edge barely visible | 0% |
| F02 | 00:04–00:08 | Macro crop of a device: an unfinished layout (frame missing two sides, half-drawn lines) and an unlit Publish button. The fingertip is off-frame and only its shadow hovers on the glass, so no hand had to be generated. Caption «قول تم.» | 0% |
| F03 | 00:08 | The press lands: the button lights, the layout completes, and the first pulse crosses the glass as two crisp rings (stroke only, no glow) | 0.16% |
| F04 | 00:27–00:35 | قول / اعتبره / Consider on three depth layers, with hairlines running to one purple point | 0.01% |
| F05 | 00:35–00:40 | «تم» at 640 px. The two dots of the ت are the two purple pulses | 0.52% |
| F06 | 00:40–00:45 | Official symbol, «SayTamm», «Say it. Tamm it.» and «قول. تم.» | 1.09% |

**How the dots of «تم» are made:** the word is set twice in IBM Plex Sans Arabic in the same position. «تم» is set in purple and «ٮم» (the dotless form, U+066E) in white on top, so only the font's own dots stay purple. Nothing is drawn or generated, the joining is the font's, and in motion the dots can lift off as their own layer.

## QC run on these frames

- **Purple share:** at most 1.09% of any frame (limit ≈10%).
- **Safe zones:** 0 bright pixels in the top 12% or the bottom 20% of any frame. All text sits between y 230 and 1536; see `F01-F06_safe_zones.png`.
- **Arabic text:** set as real connected RTL text, never as an image. It still needs a native-speaker review before delivery (05 QC).
- **Banned elements:** no client logos, client work, numbers, claims, government bodies, previous agencies, AI people or offices, glow, particles or flares.

## Assumed versus verified

**Verified:** the symbol file and its hash; the fonts; the palette; purple share and safe zones (measured); the handoff docs being byte-identical.

**Assumed:**
- The «Publish» button is in English because the storyboard names it «Publish». An Arabic «نشر» is a one-line change.
- F03 has no caption, because no line is spoken at 00:08.
- The F04 and F05 captions use the locked narrator lines.

**Conflict resolved:** `CREATIVE_TREATMENT_AR.md` ends with «قول تم. وشوفها بتحصل.», but the locked script (02) and the execution prompt both lock the tagline to «Say it. Tamm it.» / «قول. تم.». The locked version is used.

## Open items for the owner

1. **Gate 1 decision (the one decision needed now):** approve the visual direction of F03 (the pulse), F05 (the «تم» with purple dots) and F06 (the end card), or give one consolidated round of notes. The animatic does not start before this.
2. **Wordmark:** «SayTamm» on F06 is typed in Satoshi because no approved wordmark exists yet (OQ-05). It gets swapped once one is approved.
3. **Voices (needed before Stage 5, not now):** book a real Saudi and a real Egyptian speaker, or choose the no-voice fallback (on-screen text only). Dialects are not imitated.
