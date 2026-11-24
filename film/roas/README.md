# The Ratio (العائد ÷ الإنفاق): the SayTamm services film

ROAS is a fraction: revenue ÷ ad spend. In this film the screen is that fraction.

- **Above the line (the return):** the real world. Stock footage of Riyadh, Cairo and Dubai, a checkout on a phone, and a parcel arriving.
- **Below the line (the spend):** the agency at work, animated. Strategy, social platforms, ad channels, the Shopify, Salla and Zid stores, and measurement.
- **The line itself:** each service pushes it down, so the return grows and the spend shrinks.

The film makes the performance argument without showing a single number.

**Outputs** (in `handover/launch-film/roas/`, not in git):

- **Masters:** `SayTamm_TheRatio_Services_AR_39s_9x16.mp4` and `SayTamm_TheRatio_Services_EN_39s_9x16.mp4`, each 39 s, 1080×1920 at 60 fps.
- **Stock clips:** the 12 source files are under `stock/`.
- **Voice takes:** under `vo/`.

```bash
python3 film/roas/plate.py
```

```bash
bash film/roas/render_parallel.sh
```

```bash
python3 film/roas/mix.py
```

1. `plate.py` cuts and grades the footage plate, and tracks the phone screen.
2. `render_parallel.sh` renders the score and the transparent animation layer over the plate, on 4 workers.
3. `mix.py` mixes the voiceover and masters the sound.

## The film

| Time (s) | Above the line (footage) | Below the line (animation) | Words |
|---|---|---|---|
| 0–3.3 | Riyadh: Kingdom Centre at dusk, full frame | (none yet) | «إعلانك… / مصروف؟ / ولا استثمار؟». A purple stroke strikes «مصروف؟» (a cost) and stretches into the fraction line, which drops into place |
| 3.3–6 | Kingdom Centre | Obsidian "spend" panel | **ROAS**, «العائد على الإنفاق الإعلاني», «شغلنا: نكبّر العائد. مش الإنفاق.» |
| 6–10 | Cairo: the Nile at sunset; a reticle locks on the city | 01 Strategy: الهدف → الجمهور → الرسالة | The line drops (thunk) |
| 10–14 | Dubai: Burj Khalifa | 02 Creative & social: Instagram, TikTok, Snapchat, X, YouTube and Facebook tiles pop, then fly up into the footage and float around the tower as posts | The line drops |
| 14–18 | Riyadh: Kingdom Centre lights | 03 Performance: Meta, Google Ads, TikTok, Snapchat. White "spend" dots rise, cross the line and come back as violet "return" rings | The line drops |
| 18–24.5 | A real phone at checkout. The screen is tracked, and an animated store (built on Shopify, then Salla, then Zid) runs on it: «أضف للسلة» → «إتمام الطلب» → «تم الطلب ✓». Then a cart with boxes («طلب جديد») and a parcel at the door («في الطريق إليك») | 04 E-commerce: Shopify, سلة and زد tiles | The line drops |
| 24.5–28.5 | Giza: the pyramids at dusk (time-lapse) | 05 Measurement & SEO: a reach → visits → orders funnel fills, beside a Google tile | The line drops |
| 28.5–32.5 | Dubai: Burj Khalifa at night | The spend panel is almost gone | «مش بنعدّ اللايكات…». A like is struck and falls through the line. «بنعدّ العائد.» lands on the slam, and the line hits its lowest point |
| 32.5–39 | Riyadh skyline, dimmed | The panel slides away, and the line becomes the underline of the lockup | Symbol, «قول تم», «وكالة تسويق رقمي وأداء», the five services, «قول. تم.», «عندك هدف؟ ابدأ من هنا.», info@saytamm.com |

## Sound

- **Score:** an original Web Audio score at 120 BPM.
  - A held tone under the hook.
  - A marker-swipe sound for the strike.
  - A low thunk every time the line is pushed down.
  - A modern groove with a Hijaz pluck.
  - Pops for the tiles, ticks for the spend-to-return stream, taps and a success chime on the phone.
  - A heartbeat drop before the payoff, a slam on «بنعدّ العائد», and a warm pad under the lockup.
- **Voices:** ElevenLabs eleven_v4.

| Line | Arabic master | English master |
|---|---|---|
| Hook | Mansour | Jeffery |
| Payoff | Mawardy | Jeffery |
| Tagline («قول… تم!» / "Say it. Tamm it.") | Mansour | Jeffery |
| Call to action | Mawardy (from The Dot) | Jeffery (from The Dot) |

- **Mastering:** the music ducks under the voice by sidechain; two-pass loudnorm to −14 LUFS, under −1 dBTP after AAC.

## Footage: Pexels (free licence, commercial use allowed, no attribution required)

| File | Pexels video | Used for |
|---|---|---|
| R_34505476 | "Kingdom Tower illuminated at night in Riyadh" (pexels.com/video/34505476) | Hook and formula |
| R_34505477 | "Kingdom Tower with light show in Riyadh" (34505477) | Performance |
| R_18511357 | "Riyadh skyline" (18511357) | Lockup |
| C_27433325 | "Timelapse Nil sunset" (27433325) | Strategy |
| C_20284256 | "Great Pyramids of Giza … timelapse" (20284256) | Measurement |
| D_31257755 | "Iconic Burj Khalifa tower in Dubai skyline" (31257755) | Social |
| D_37337798 | "Night skyline featuring Burj Khalifa" (37337798) | Payoff |
| E_6898096 | "Person shopping online" (6898096), hands only | Checkout; the phone screen is tracked |
| E_6214218 | "Miniatures of shopping cart and cardboard boxes" (6214218) | Order |
| E_7362808 | "A dolly shot of packages on the front door" (7362808) | Delivery |

**Why these sources:**

- Mixkit's city clips are under its Restricted licence, which forbids company social media and advertising, so none were used.
- Storyblocks clips are not included in the connected account's plan.

**Rules for this footage:**

- No faces appear, only hands.
- The Pexels licence does not allow implying that identifiable people endorse the brand, and it does not allow reselling clips unaltered.

## Rules kept

- **Numbers:** no ROAS figures and no client results. The site's case-study figures are still awaiting approval. The ratio is shown only as a moving line.
- **Logo:** the original symbol file is used, never redrawn. «SayTamm» is set in type (OQ-05).
- **Platform logos:** see `assets/LOGOS_NOTE.md`. They are used only to name the platforms the agency works on, with no partnership claim.
- **Positioning:** "a digital marketing & performance agency". It is never called a "Saudi agency"; the three cities are shown as the region the brand works in.

## v2: richer in footage and animation (42.5 s)

**Masters:** `SayTamm_TheRatio_v2_Services_AR_42s_9x16.mp4` and `SayTamm_TheRatio_v2_Services_EN_42s_9x16.mp4`, 1080×1920 at 60 fps.

```bash
python3 film/roas/plate2.py
```

```bash
bash film/roas/render2_parallel.sh
```

```bash
python3 film/roas/mix2.py
```

v2 keeps the v1 choreography (the fraction line, the five services, the payoff and the lockup) on a re-timed clock, and adds:

| Time (s) | What is new |
|---|---|
| 0–2 | **Cold open:** four cuts in two seconds (Riyadh highway, Cairo pyramids from the air, Dubai from above, a thumb on an online store), each stamped with its word: الرياض / القاهرة / دبي / أونلاين |
| 5.4–8 | **ROAS filled with footage:** the four letters are cut out of a moving Dubai skyline |
| 8–12.5 | **Strategy over a city map:** Cairo, Riyadh and Dubai pins joined by arcs, on two Cairo shots (the Nile, then over the old city) |
| 12.5–17 | **Reels:** three phone-framed vertical videos rise beside the platform tiles (Dubai, then Giza) |
| 17–21.5 | **Live ad cards:** four cards with real footage drift through the frame while spend turns into return (Riyadh lights, then traffic toward the skyline) |
| 21.5–28.5 | **Store:** the tracked phone UI, then three quick cuts: pay, cart and boxes, the parcel at the door |
| 28.5–32.5 | **Measurement:** Giza time-lapse, then Dubai from above |
| 32.5–34.5 | **Triptych:** three cities side by side in tall panels, then the frame darkens for the payoff |
| 34.3–36.5 | **«بنعدّ العائد» filled with footage** (the Cairo pyramids from the air) |
| 36.5–42.5 | Lockup over the Riyadh skyline |

- **Sound:** a new 120 BPM groove under the services section, impacts and ticks for the cold open, whooshes for the reels, cards and triptych. The voice takes are the same as v1.
- **Plate:** 18 shots instead of 10.

**New Pexels clips** (same licence as above):

| File | Pexels video | Used for |
|---|---|---|
| R_31114786 | Riyadh highway toward the skyline (31114786) | Cold open, performance |
| C_10719817 | Pyramids of Giza from the air (10719817) | Cold open, ad card, «بنعدّ العائد» fill |
| C_4174555 | Cairo seen from a height (4174555) | Strategy, ad card |
| C_25797443 | Pyramid with a camel, no faces visible (25797443) | Social |
| D_33739603 | Dubai from above (33739603) | Cold open, measurement |
| D_36470958 | Dubai skyline (36470958) | ROAS fill, reel, triptych |
| E_7568746 | A finger scrolling an online store on a phone, hands only (7568746) | Cold open |
| E_6214217 | A phone showing "PAY" beside a card and a shopping bag (6214217) | Store |
| E_6214214 | A phone showing "PAY", a hand placing letter dice (6214214) | Ad card |

**Avoided on purpose:** a clip that shows the Saudi flag (flags are restricted in ads), a Dubai clip with the UAE flag in frame, and a Cairo clip with other brands' billboards.

## v3: fast cut (33 s)

**Masters:** `SayTamm_TheRatio_v3_Fast_AR_33s_9x16.mp4` and `SayTamm_TheRatio_v3_Fast_EN_33s_9x16.mp4`, 1080×1920 at 60 fps.

v3 keeps the v2 scenes and the same voice takes, and makes the film faster:

- **Speed:** everything before the lockup (0–36.5 s of v2) plays 1.35× faster. The lockup (logo, tagline, call to action) stays at normal speed so the voice has room to finish.
- **Picture:** retimed from the v2 picture in ffmpeg with frame blending (`framerate`, which skips blending across cuts).
- **Music:** rendered again with every event and envelope on the faster clock, so the tempo rises to about 162 BPM and the pitch stays.
- **Voices:** the same takes, re-pinned to the new times.

```bash
node film/roas/render2.mjs --variant ar --audio-only --speed 1.35 --hold 36.5
```

```bash
python3 film/roas/mix3.py
```

Make the two pictures first, as `handover/launch-film/roas/Ratio3_{ar,en}_picture.mp4`: trim 0–36.5 s, `setpts=(PTS-STARTPTS)/1.35,framerate=fps=60`, then concat with 36.5–42.5 s at normal speed.

## v4: English only, centred layout (33 s)

**Master:** `SayTamm_TheRatio_v4_EN_33s_9x16.mp4`, 1080×1920 at 60 fps. The same fast cut as v3 (1.35× before the lockup), with the type moved out of the bottom of the frame:

- **The fraction line** sits in the middle of the frame (y 1060 to 1160) and still steps down with each service. At the payoff it falls to the bottom to make room for "We count returns".
- **The spend side** under the line is a translucent shade, so the footage stays visible.
- **Section titles** are centred and larger. "E-commerce" sits at the top, clear of the tracked phone.
- **"We count returns"** is set smaller, so it sits inside the frame.

```bash
bash film/roas/render4_parallel.sh
```

```bash
python3 film/roas/mix4.py
```

## v5: Arabic, for store owners (33 s)

**Master:** `SayTamm_TheRatio_v5_Stores_AR_33s_9x16.mp4`, 1080×1920 at 60 fps. The same film structure, rewritten for e-commerce store owners, in the v4 centred layout and at the v3 pace. v5 is rendered at that pace directly rather than retimed, so motion stays smooth.

**Voice:** a single take in Modern Standard Arabic (ElevenLabs "Rawi", eleven_v4), from a fully vowelled script. This follows the house rule for Arabic copy: professional Arabic, with no imitated dialect. An automatic transcription (ElevenLabs Scribe) matched the script word for word:

| Line | When |
|---|---|
| «عِنْدَكَ مَتْجَر؟ زِيَارَاتٌ كَثِيرَة… وَطَلَبَاتٌ قَلِيلَة؟» | The hook. «وطلبات قليلة؟» is struck and becomes the line |
| «هَدَفُنَا وَاحِد: عَائِدٌ أَعْلَى مِنْ كُلِّ إِعْلَان.» | The formula |
| «لَا نَعُدُّ الإِعْجَابَات… نَعُدُّ الطَّلَبَات.» | The payoff, with «نعدّ الطلبات» filled with footage |
| «قُولْ… تَمّ.» / «عِنْدَكَ مَتْجَر؟ اِبْدَأْ مِنْ هُنَا.» | The lockup |

**Copy for store owners:**

- **Sections:** الاستهداف / محتوى يبيع / إعلانات الأداء / متجرك (سلة · زد · Shopify) / القياس.
- **Funnel:** الزيارات → السلة → الطلبات.
- **Services line:** «استهداف · محتوى · إعلانات · متاجر · قياس».

**City labels:** each label sits only on a shot whose city Pexels confirms:

| Label | Shot |
|---|---|
| الرياض | R_18511357 "Riyadh Skyline", and Kingdom Centre |
| القاهرة | C_4174555, "Cairo's skyline from the Citadel" |
| دبي | D_33739603 "Aerial View of Dubai Skyline", and D_36470958 "Dubai Skyline at Sunset" |

**Dropped:**

- The highway shot R_31114786. Pexels names no city for it; it looks like Dubai but was labelled Riyadh in v2.
- The Nile shot, from the Cairo panel of the triptych. It now uses a texture cut from C_4174555 (`seq/tri2cairo`).

**New Pexels clips** (in `stock5/`, hands only):

| File | Pexels video | Used for |
|---|---|---|
| E_9862359 | "Top view of a person packing a dress" (9862359) | An order packed |
| E_8937985 | "A person shopping online holding a credit card" (8937985) | Payment |

Candidates with faces (6342201, 6342204, 6347120, 7464002) were downloaded but not used.

**Smoother:**

- The white flash on the cold-open cuts is gone.
- The plate is cut on whole output frames, and each clip plays 1.35× before the lockup, so the tracked phone stays locked.

```bash
python3 film/roas/plate5.py
```

```bash
bash film/roas/render5_parallel.sh
```

```bash
python3 film/roas/mix5.py
```

The score is `Ratio3_Score.wav` (see v3).

## Before publishing

- **Platform logos:** check each brand's guidelines (Meta, Google, TikTok, Snap, X, YouTube, Shopify, Salla, Zid). Do not imply partner status the agency does not hold.
- **ElevenLabs licence:** the voices came from the free plan. Generate them again on a paid plan for a commercial licence.
- **Native review:** a native Saudi speaker and a native Egyptian speaker review the voices.
- **Satoshi:** the output embeds Satoshi, so it stays internal until the font licence is checked.
- **Approval:** the owner gives explicit approval before anything is posted.
