# «The Rally» v2 — SayTamm, 32 s, 1080×1080 and a Reels cut at 1080×1920, English

Owner feedback on v1 (2026-11-27): no realism, no creativity, nothing that says "digital marketing agency", the logo should
actually get bigger when the client asks, show the team's work, use free stock or drawn characters, as strong as the reference.

**The idea:** the client–agency relationship covered like a live match. The client keeps sending requests (bigger logo, another
colour, one more change, results?) and the SayTamm team returns every one, done. A broadcast strip keeps score:
REQUESTS 04 · DONE 04.

| Time | Scene |
|---|---|
| 0.0–1.5 | Aerial tennis court (real). «CLIENT / VS. / AGENCY.» LIVE strip comes in. |
| 1.5–3.0 | Tennis balls raining onto a clay court. «THE LONGEST RALLY IN MARKETING.» |
| 3.0–5.0 | **Point 1.** A real hand holding a phone (green screen keyed, screen tracked per frame) with a chat: «Small thing… can you make the logo bigger?» |
| 5.0–7.5 | A sponsored post (real product photo). The team's cursor drags the logo bigger on every beat: 160% → 260% → 420% → 560%. «BIGGER. BIGGER. BIGGER?!» |
| 7.5–8.5 | A designer's hand and stylus (real). «OUR DESIGN TEAM IS ON IT.» |
| 8.5–10.0 | The answer: a bigger logo in a balanced layout, guides, «DONE.» stamp. «BIGGER. AND BETTER.» |
| 10.0–11.5 | **Point 2.** Phone: «Can it pop more? Maybe another colour?» |
| 11.5–14.0 | A new colour and a new file name on every beat (final.jpg → final_FINAL_v7_REAL.jpg). «AMENDS. ROUND AFTER ROUND.» |
| 14.0–16.0 | The line-up: Tamm in four roles (Strategy, Creative, Media, Tech), a card on every beat. |
| 16.0–17.5 | A/B test: version B wins. «WE TEST. THE DATA DECIDES.» |
| 17.5–19.0 | **Point 3.** Phone: «Sending it to my manager… He wants one more change.» |
| 19.0–21.0 | The team at work (real, hands only): «STRATEGY. DESIGN. PRODUCTION. ONE TEAM.» |
| 21.0–22.5 | Phone: the final ad arrives for approval; Approve is tapped. «APPROVED.» |
| 22.5–24.0 | **Point 4.** Phone: «It's live! So… results?» |
| 24.0–27.0 | A real, approved case (verbatim, with how it was measured and the track-record line): 13.84× ROAS and 27,703 purchases, account A, fashion & beauty e-commerce, 10 Mar – 30 May 2022. |
| 27.0–29.0 | A racket's shadow on clay, a ball bouncing. «EVERY BALL COMES BACK.» |
| 29.0–32.0 | The purple full stop becomes the blade of the SayTamm symbol (original file); «Say Tamm», «قول تم», «A digital marketing & performance agency», saytamm.com. |

**Rules kept:** stock is hands only, no faces (two tennis clips that show a player's face were dropped); no other brand logos (the
product photo has no label; branded sneaker photos were rejected); the ad's logo is a placeholder, on purpose; the only figures are
the approved case, verbatim, with its measurement note; ROAS is called "not profit"; Tamm is the brand's character.
**Satoshi is embedded: keep the film internal until the font licence is confirmed** (or swap to IBM Plex Sans for a publishable cut).

## Reels cut (9:16)

Same film, same score, laid out again for 1080×1920 rather than cropped. The footage is re-cut from the full-size Pexels
originals (`handover/launch-film/rally2/orig/`, crops in `shots916.json`), so every phone stays whole in the frame and its screen is tracked again.
Words stay between y 250 and ~1520 and low lines stay under ~860 px wide, clear of the app's caption area and the buttons on
the right. Differences from the square: the broadcast strip sits at y 190; the client's words go at the top of the phone shots
in two big lines (the chat stays readable below); the ad is a bigger card with a deeper text band; the cursor's name tag sits on
its left while it drags the handle; the phone's clock is left out (it sat beside the score); A/B adds «B WINS.».
Both cuts: the case's counters keep every character in the column it has in the final figure, so the number never shifts
sideways while it counts; each 60 fps frame blends its own three sub-frames, centred on the frame's time.

## Stock (Pexels, free licence; IDs to re-download)

Tennis: 33175804 (aerial court), 5740595 (balls on clay), 5738571 (racket shadow). Phones (green screen): 12280159, 13863534, 9558749.
Team: 20463055 (stylus), 37116270 (tablet), 6192771 (hands); from the journey film: 8035618 (story cards), 35313946 (camera).
Product photo: 15369086. Downloaded with `https://www.pexels.com/download/video/<id>/`.

## Build (repo root)

```bash
python3 film/rally2/prep.py
bash film/rally2/render_parallel.sh
# Reels cut: download the originals of 12280159, 13863534, 9558749, 20463055 and 6192771 into handover/launch-film/rally2/orig/
python3 film/rally2/prep.py --v 916
RV=916 bash film/rally2/render_parallel.sh
```

`prep.py` cuts each shot to 30 fps 1080×1080 frames; for the phone shots it keys the green screen (OpenCV), despills, and tracks
the screen's corners per frame (`quad.json`). `film.html` draws the chat into the screen through a bilinear grid of affine
triangles and lays the real hand back on top, so the thumb stays in front of the screen. Score generated in code (120 BPM:
kick on every beat, a hit on every cut, ball hits, message pops, the logo stretching, crowd swells, a stamp on every «DONE»).
Output: `handover/launch-film/rally2/SayTamm_The_Rally_v2_EN_1x1.mp4` and `SayTamm_The_Rally_v2_EN_9x16.mp4`.
