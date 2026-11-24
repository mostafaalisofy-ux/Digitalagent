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

## Before publishing

- **Platform logos:** check each brand's guidelines (Meta, Google, TikTok, Snap, X, YouTube, Shopify, Salla, Zid). Do not imply partner status the agency does not hold.
- **ElevenLabs licence:** the voices came from the free plan. Generate them again on a paid plan for a commercial licence.
- **Native review:** a native Saudi speaker and a native Egyptian speaker review the voices.
- **Satoshi:** the output embeds Satoshi, so it stays internal until the font licence is checked.
- **Approval:** the owner gives explicit approval before anything is posted.
