# SayTamm showreel v2 (56 s, 9:16)

The first showreel was replaced at the owner's request. They wanted a purposeful opening, one sample per service, sharp samples rather than full-screen pixelated ones, and testimonials.

**Master:** `handover/launch-film/reel2/SayTamm_Showreel_v2_56s_9x16.mp4`. It is not in git.

## Structure

| Time (s) | Section | Content |
|---|---|---|
| 0–4 | The goal | A prompt bar types three goals: "Launch our new model in Saudi Arabia." · "Build a brand people remember." · "Turn visits into sales." Enter is pressed |
| 4–6 | The answer | Symbol, SayTamm, Showreel 2026, "Nine services. One objective." |
| 6–42 | The nine services | 4 s each, with the profile's wording and a sample, plus a progress rail (01–09) |
| 42–50 | In their words | Four client testimonials, each beside that client's work |
| 50–56 | Close | "Your goal." · "say › Say it." · "We'll Tamm it." · lockup, with «قول… تم» in Gulf Arabic |

## Samples by service

| Service | Sample |
|---|---|
| Strategy | A plan board, from the objective to the number each channel must deliver; the five markets |
| Branding | Clean Basket manual and icons; Alia identity tiles; palette; chips |
| Social media | Chery posts scrolling in a phone feed; Tech Hive posts; platform icons |
| Content | Zahid Electra series; "Al Zahid in every home" |
| Media production | The niimee motion piece playing; Beauty Lab product photography |
| Performance | An A/B test of two niimee ads ("Sponsored"); ad platforms. No figures |
| SEO | Queries typed in English and Arabic; a skeleton results page where "Your page" rises; buying-intent keywords |
| Website & CRO | The SayTamm website on two phones: EN left to right, AR right to left |
| Analytics | A measurement-plan checklist; a Measure → Learn → Plan loop |

**Image rule:** every image is drawn at or below its own pixel size (`card()` caps the width), so nothing is upscaled.

**Image sources:**

- The owner's company profile PDF: work at 750–1600 px.
- Tiles cut one by one from the owner's source deck. Any tile with part of another agency's name in its slide margin was excluded.
- The niimee clip.
- Screenshots of `handover/saytamm-{en,ar}-home.html`, with the preview banner cropped off.

## Testimonials

These are verbatim excerpts from reviews published on the source site. Only the parts that do not name the previous agency are quoted, and "…" marks each cut. No word has been changed. The clients are DC Block Factory, Altopiano, Bitumat and Alqimma.

## Rebuild

```bash
python3 film/reel/prep.py
```

```bash
python3 film/reel2/prep.py
```

```bash
bash film/reel2/render_parallel.sh
```

```bash
python3 film/reel2/mix.py
```

`film/reel/prep.py` provides the niimee frames and the tiles.

## Before publishing

- **Testimonials:** the four clients confirm that SayTamm may quote them.
- **Clients' work:** each client agrees to its work appearing in the reel.
- **Gulf voice:** generate it again on a paid ElevenLabs plan, and have a native speaker review it.
- **Satoshi:** check the font licence.
- **Approval:** the owner gives final approval.
