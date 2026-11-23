# SayTamm launch film: "The SayTamm Dictionary" (45 s, 9:16)

This is the owner's original idea, made explicit: the name defined like a dictionary entry.

- The Saudi says **«قول تم»** when they want something to happen.
- The Egyptian says **«اعتبره حصل»**.
- The English speaker says **"Consider it done"**.

Three phrases, one meaning. SayTamm is named after that moment.

```bash
node film/launch-45s/production/dictionary/render.mjs --beats
```

```bash
node film/launch-45s/production/dictionary/render.mjs
```

The first command renders one review frame per beat. The second renders the full film at 60 fps with 3 sub-frames (tmix motion blur), plus a Web Audio soundtrack.

Outputs: `handover/launch-film/dictionary/SayTamm_Launch_Dictionary_45s_9x16.mp4` and `SayTamm_Launch_Dictionary_Sound.wav` (not in git).

## The idea: each dialect moves differently

The life comes from motion personality: the same promise performed in three accents of movement.

| Entry | Motion personality | Rhythm |
|---|---|---|
| 01 «قول تم» (Saudi) | Heavy and decisive: words land with weight and stop dead, no bounce (critically damped) | Deep doum and Gulf-style handclaps |
| 02 «اعتبره حصل» (Egyptian) | Playful: drops in, squashes, pops with overshoot, winks | Maqsoum (doum-tak), a bouncing bass |
| 03 "Consider it done" (English) | Swiss precision: every letter snaps onto a 12-column grid, and the full stop lands as a purple square | Four-on-the-floor, crisp hats |
| Convergence | All three motions on screen at once | All three rhythms at once, becoming one groove |

Each entry has the same structure:

- The headword
- The pronunciation: / gūl tamm /, / eʿtebro ḥaṣal /, / kənˈsɪdər ɪt dʌn /
- A definition in the dialect, with a line in the other language
- A live example: a request arrives, the phrase answers it, and the thing happens

## Timeline (120 BPM)

| Time | What happens |
|---|---|
| 0–3.5 | **The pile.** Requests in all three languages pop in faster and faster, with depth (near ones sharp, far ones soft). The screen fills. At 3.0 everything freezes; a caret waits for the answer |
| 3.5 | The purple 45° blade cuts the pile and opens the dictionary |
| 3.75–13.5 | **01 «قول تم».** Two heavy hits, the underline, the pronunciation, then «تقولها إذا تبي الشي يصير.». Example: «نبي الحملة تنزل الخميس.» is answered «قول تم.»; the campaign card rises in a phone, the calendar chip flips to «الخميس», the bar fills on four beats, then «نزلت ✓» |
| 13.5–23.5 | **02 «اعتبره حصل».** «اعتبره» drops and squashes, «حصل.» pops. «يعني ماتقلقش… خلاص اتعمل.» Example (the gag): «عايزين البوست ينزل النهارده.». While «اعتبره…» is still being typed, the clock spins and the post is already «اتنشر ✓». Then «حصل» arrives with a hop, and a «حصل» stamp lands on the post |
| 23.5–31.5 | **03 "Consider it done".** Letters snap in on 16ths, and the full stop is a purple square on the downbeat. "Treat it as finished." Example: "Can we have it by Friday?" is answered "Consider it done.", then six tasks tick on 8ths |
| 31.5–35.9 | **Convergence.** The three phrases return, each with its own entrance. "Three ways to say it." The saying words are struck through in purple (قول / اعتبره / Consider it) and the doing words stay (تم / حصل / done). They travel to the centre: «والمعنى واحد.» |
| 35.9–39.4 | «تم» opens big. The two dots of the ت lift off and travel, and their paths reveal the original symbol (a mask on the original paths, never redrawn) |
| 39.5–45 | The name builds itself, **Say** + **Tamm**, then «Say it. Tamm it.» and «قول. تم.», then quiet |

## Rules kept

- **Logo:** the original symbol is used unchanged: its paths come from `brand/production/logo/SayTamm_Symbol_Signature_White-Purple.svg` and are only revealed with masks.
- **Facts:** no claims, numbers, client names, client logos or client work. The requests are generic.
- **People and voices:** no AI people and no voices. The dialects live in the writing and the motion, never in an imitated voice.
- **Palette:** purple is used as the accent (underlines, strikes, ticks, the blade, the dots). Everything else is obsidian, graphite and soft white.
- **Wordmark:** «SayTamm» is typeset in Satoshi because no approved wordmark exists yet (OQ-05).

## v2: premium cut

```bash
node film/launch-45s/production/dictionary/render_v2.mjs
```

```bash
python3 film/launch-45s/production/dictionary/mix_vo.py --v2
```

The first command renders the picture and music; the second mixes the voiceover in and masters it.

Output: `handover/launch-film/dictionary/SayTamm_Launch_Dictionary_v2_45s_9x16_PREMIUM.mp4`, plus the master WAV, VO stem and ducked music stem.

**Picture**

- **Light:** deep violet ambient light drifts behind obsidian, replacing flat black.
- **Type:** headwords have a gradient fill with a light sheen that sweeps across each one as it lands.
- **Surfaces:** frosted-glass bubbles, cards and chips, a refined phone, and gradient purple.
- **Camera:** a light 3D drift.
- **Transitions:** the new page settles in as the blade passes, and the old one recedes.
- **Frames:** near-lossless (JPEG q100), then H.264 High at crf 14.

**Landmarks**

Original fine-line engravings, drawn on in motion, in `assets/landmarks.js`:

| Entry | What is drawn |
|---|---|
| 01 Riyadh | Kingdom Centre with its sky bridge, Al Faisaliah, the crenellated mud-brick walls and watchtower of Diriyah, palms |
| 02 Giza | The three pyramids with stone courses, the Sphinx, a palm |
| 03 London | Big Ben, the Palace of Westminster, the London Eye |
| Convergence | The three skylines join on one horizon |
| End card | The same horizon, faint |

**Platforms**

- **Opening:** platform icons float in depth behind the pile of requests.
- **Launches:** when the campaign or post goes out, five platform chips burst from the phone.
- **Icons:** they come from simple-icons, used unaltered and monochrome; see `assets/PLATFORM_ICONS_NOTE.md`.

**Sound**

- **Music:** a synthesised room (convolution reverb), tape-style saturation, air and weight EQ, a pad bed under the convergence, sheen sparkles, burst pops and draw-on ink.
- **VO chain:** high-pass, mud cut, de-esser, 3:1 compression, presence and air.
- **Mastering:** two passes to **−14 LUFS integrated, −1 dBTP true peak**.
- **Measured:** −13.9 LUFS, −1.0 dBTP, LRA 5.3 LU. In the speech band (1–4 kHz) the voice sits 14–35 dB over the music, and the music ducks only 3–8 dB.
