# SayTamm launch film: creative rebuild change log

**Direction:** "A decision travels through matter". This answers `handoff/06_CREATIVE_REBUILD_PROMPT_FOR_CLAUDE.md`.

The project was not restarted. These stay exactly as they were:

- 45 s, 9:16, 1080×1920
- The narrative order and every scene boundary
- The three-language structure
- The original symbol (`brand/production/logo/SayTamm_Symbol_Signature_White-Purple.svg`, drawn as an image, never redrawn)
- The locked end-card copy
- The palette

What changes is the visual language.

**Why it changed.** The first animatic was a wireframe explainer: outline cards, a white pill, a purple dot and type on black. The rebuild turns the pulse into a physical force. It is a razor-thin purple edge that passes from one material to the next: black glass, then frosted glass, then paper, then a raw wall. At every match cut it completes a real action.

**Source strategy: graphic-first.** No footage is used. Every surface is built in code:

- **Glass:** lit glass with a softbox reflection.
- **Frosted glass:** a frosted micro-structure.
- **Paper:** fibres under a raking light.
- **Raw wall:** grazing-lit pits.
- **Graphite emboss:** for «تم».

On top of that:

- **Depth:** depth of field and rack focus.
- **Film:** grain and vignette.
- **Type:** set live in IBM Plex Sans Arabic and Satoshi.

There are no AI people, offices or Arabic text, no client work and no logos. The fingertip is a drawn, lit monochrome form, not a generated person.

## Removed

| Removed | Replaced by |
|---|---|
| Top-of-frame timecode and shot notes | Nothing. Review labels now live only in the contact sheet |
| Thin outline UI cards and wireframe screens | Physical surfaces: glass, frost, paper, wall |
| The tall white pill | A practical LED on a raw wall that reveals the wall's texture from its base |
| The round purple dot | A razor-thin purple edge (2.6 px core, minimal falloff). Purple is 0–0.9% of any keyframe |
| Text floating on black | Type inside the world: typed under the glass, reflected in glass, printed on a card, embossed in graphite |

## Shot by shot (timing unchanged)

| Time | Before (animatic) | Now (rebuild) | Status |
|---|---|---|---|
| 00:00–04:00 | A caret on black | Black glass at a grazing angle. A caret waits on the display under the glass, a fingertip and its reflection hover out of focus, and a far practical LED stutters and almost comes on. Locked camera, slow breathing drift. Sound: room tone, distant hum | Built (F01) |
| 04:00–07:00 | Three frozen UI details | The same macro shot pushes in. «قول» is typed under the glass, letter by letter. The fingertip descends and comes into focus (rack focus) with its reflection rising to meet it, then hovers with micro-tension. «تم.» is typed | Built (preview) |
| 07:00 | The press lands on a pill button | The fingertip meets its reflection on the final consonant. A razor-thin purple edge is released along the contact plane, the LED catches, and the warm low bass begins (the «م» motif) | Built (F02, preview) |
| 07:30–08:00 | (none) | The edge slides toward the camera to the shared screen height that anchors every match cut | Built (preview) |
| 08:00 | Cut | **Match cut 1:** the line is now under a frosted pane. It stays crisp outside the pane and diffuses inside it, and the frost grain picks up the light. The pane travels past the line | Built (preview) |
| 09:60 | Cut | **Match cut 2:** the line exits the pane and becomes a reflected edge on paper. The paper slides through it, the crop marks lock with a spring, and the unfinished 45° graphite stroke completes as the edge reaches its open end. Sound: paper friction, a graphite scratch | Built (F03, preview) |
| 11:20 | Cut | **Match cut 3:** the edge becomes the base of a raw wall. A white practical LED takes over from the purple pulse, which fades (a pulse, never a permanent glow), and the light climbs the wall from the edge inward to reveal its texture. Sound: relay click, hum swell | Built (preview) |
| 13:20–15:00 | Wide pull-back of the UI panels | First widening: the camera pulls back to show the wall as an object in a dark room, with the paper from the previous shot lying out of focus in the foreground | Built (preview) |
| 15:00–20:00 | Tilted cards snap level | «اعتبره حصل.» A hand closes a phone, or a studio composition clicks into its final alignment, as quiet confidence. Planned: macro of the wall-lit space settling, with a set of objects squaring up under the LED | Next pass |
| 20:00–27:00 | UI panels pull back | “Consider it done.” From intimate to expansive: the 45° diagonal passes through frost, paper and glass reflections and orders fragments into one system | Next pass |
| 27:00–35:00 | Three words on black | Three physical planes: «قول» standing on the far glass edge, read through its reflection; «اعتبره» printed on a paper card lying on the glass; “Consider” as a foreground wordmark with directional motion blur. One razor edge through the centre pulls all three in | Built (F04 frame) |
| 35:00–40:00 | «تم» on black | «تم» rises out of the convergence, embossed in graphite under a raking light, crisp letterpress bevel and cast shadow. The two dots are flat purple: the two beats. They then lead the reveal of the original symbol (mask reveal, never redrawn) | Built (F05 frame) |
| 40:00–45:00 | End card | Same locked copy. The group's optical centre is just above the frame centre, spacing between symbol, name and taglines is reworked, a faint top light falls off, and grain carries through. No rule, no extra copy | Built (F06) |

## Sound (preview, provisional)

The preview carries provisional foley, all synthesised:

- **Room and electrics:** room tone, a 50/100/150 Hz electrical hum, a breath before the tap.
- **Glass:** typing ticks under the glass, and the fingertip on glass with its ring.
- **The «م» motif:** a warm low bass (A1 · A1 · C2 · G1) starting on the tap and landing on each match cut.
- **Materials:** an air sweep under the frost, paper friction, the graphite scratch, the crop-mark ticks, the LED relay.
- **Score:** a sparse muted pulse at 92 BPM, starting only after the activation.

There are no voices. The rebuild brief says that, without authentic Saudi, Egyptian and English performers, the phrases stay as typography. Here «قول تم.» is typed under the glass. The tap is placed on the final consonant of the typed «تم.». If a real Saudi read is recorded, the tap re-syncs to its «م».

## QC on this pass

- **Purple share per keyframe:** 0%, 0.21%, 0.17%, 0.21%, 0.56%, 0.93%. The limit is ≈10%.
- **Captions:** the narration captions sit at y 1478, inside the safe zone. Picture elements cross the danger zones; text does not.
- **Banned elements:** no glow fields, particles, flares, dashboards, template transitions, client material or AI imagery.

## Files

| Path | Contents |
|---|---|
| `film/launch-45s/production/rebuild/film.html` | The rebuilt film (stateless `seek(t)`, procedural materials, Web Audio foley) |
| `film/launch-45s/production/rebuild/render.mjs` | Renders keyframes and the contact sheet (`--keyframes`), spot frames (`--frames`) and the preview (`--preview`) |
| `handover/launch-film/rebuild/` | `keyframes/F01–F06.png`, `F01-F06_rebuild_contact_sheet.png`, `SayTamm_Launch_ProofOfEnergy_04-15s.mp4` and its WAV (not in git) |

The first animatic (`production/animatic.html`) is kept for reference.
