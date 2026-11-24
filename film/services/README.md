# SayTamm services film (16:9, 62 s)

A film about what SayTamm does, not a showreel. The style follows the owner's reference (kinetic type, a typed prompt, a grid that assembles with a counter, a tiled wipe into the logo). It is built on the brand's own "prompt" language from the 2026 profile.

**Master:** `handover/launch-film/services/SayTamm_Services_EN_16x9.mp4`, 1920×1080 at 60 fps. It is not in git.

## Story

| Part | What happens |
|---|---|
| The goal | "What's your goal?" is typed, then the prompt `say › Grow our sales in Saudi Arabia.`; Enter is pressed |
| Tamm answers | His window opens: "tamm › Got it." · "Here's how we get there." |
| One goal. Nine services. | Nine pieces of work assemble in a grid while a counter runs from 01 to 09 |
| The nine services | Each has a title and the profile's line on the left, and Tamm's sentence in a bubble beside his avatar. On the right is a sharp sample with animated elements. Each ends with the stamp «تم ✓» |
| Don't take our word for it. | Four client testimonials (verbatim excerpts, "…" marks each cut), each beside that client's work |
| Close | "So… what's your goal?" · `say › Say it.` · "We'll Tamm it." · tiled wipe · lockup, with «قول… تم» in Gulf Arabic |

## Samples by service

| Service | Sample |
|---|---|
| Strategy | Plan board and the five markets |
| Branding | Clean Basket manual and icons; JORA; Alia |
| Social | Chery feed in a phone; Tech Hive posts; platforms |
| Content | Zahid Electra series |
| Production | niimee motion piece; Beauty Lab photography |
| Performance | Tech Hive web banners as an A/B pair ("Sponsored") and the ad platforms. No figures |
| SEO | Queries typed in English and Arabic; a skeleton results page where "Your page" rises |
| Website & CRO | The SayTamm site, on desktop (EN) and on a phone (AR) |
| Analytics | A measurement checklist, then Measure → Learn → Plan → Repeat |

## Sources and rules

**Work images:** embedded in the site's Work page (`saytamm-en-work.html`, 750–1600 px), extracted to `webimg/`. Every image is drawn at or below its own size. Left out: government-related work, a conference with officials, and every case-study figure (they are "Pending confirmation" on the site).

**Tamm:** the owner's vertical character clip, used as a window and as a round avatar (the face holds still in the clip's second half).

**Voice:** ElevenLabs "Noah", one take cut into 16 phrases. `plan.py` sizes each scene to its line.

- The automatic transcription check could not run, because the ElevenLabs credits had run out.
- The 16 phrases line up exactly with the script.

## Rebuild

```bash
python3 film/reel/prep.py
```

```bash
python3 film/reel2/prep.py
```

```bash
python3 film/services/plan.py
```

```bash
python3 film/services/prep.py
```

```bash
bash film/services/render_parallel.sh
```

```bash
python3 film/services/mix.py
```

## Before publishing

- **Testimonials:** the four clients confirm SayTamm may quote them. Each client agrees to its work appearing in the film.
- **Voices:** generate them again on a paid ElevenLabs plan (commercial licence). Have a native speaker review «قول… تم».
- **Satoshi:** check the font licence.
- **Approval:** the owner gives final approval.
