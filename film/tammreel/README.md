# «قولها… تمّت» — four briefs, four times done (9:16, Arabic, 38 s)

Tamm opens and closes. In between, four briefs arrive as chat bubbles and each is answered by real client work from the owner's Drive
(see `docs/DRIVE_MATERIAL_2026-11-26.md`), then stamped «تمّت» with the service and the client. Arabic-only, IBM Plex only (no Satoshi).

| Time | Scene | Footage |
|---|---|---|
| 0–3.5 | «قولها.» / «وسيبها علينا.» | `mini tamm.mp4` (st launching) |
| 3.5–15.5 | 01 الإنتاج والتصوير · Altopiano: brief «أكل يبان زي طعمه.» → nine beat cuts (salt, grill, steak, pizza, oil, pasta, pour, chocolate, dessert) → plate + «تمّت» | altopianoReels 4K (hands only; reel 10's diner face is not used) |
| 15.5–22 | 02 موشن 3D · Zahid Electra: «المنتج يشرح نفسه.» → washer, fridge, 1400 RPM | Zahid electra motion |
| 22–27 | 03 موشن 2D · Clean Basket: «الفكرة كلها في ضغطة.» → the app story at 2.4× | clean basket 2D motion (the live-action ad with an actor is not used) |
| 27–31.5 | 04 محتوى وسوشيال · Exodus: «رحلة تتحكي في ثواني.» → Nile, Sphinx, Anubis | Exodus reels (the opening shot with tourists' faces is not used) |
| 31.5–33.5 | all four in a grid: «قلتوها… وتمّت.» | |
| 33.5–38 | Tamm: «قولها.» → symbol, «قول. تم.», the line, saytamm.com, track-record line, «البريفات في الفيلم صياغة توضيحية.» | |

The briefs are paraphrases written for the film, not client quotes (said on the end card). Score generated in code (120 BPM), master −14 LUFS.

Build (repo root): download the sources into `handover/launch-film/tammreel/src` (Drive ids in the inventory doc, names in `shots.json`), then

```bash
python3 film/tammreel/prep.py
```

```bash
bash film/tammreel/render_parallel.sh
```

Output: `handover/launch-film/tammreel/SayTamm_QolhaTammat_AR_9x16.mp4`, `cover.jpg`, `cover_end.jpg`.

**16:9 cut** (`film169.html`, same timing and score): the type column sits on the right (brief bubble that stays, then «تمّت», service and client),
the vertical footage plays in two 9:16 panels on the left (Altopiano's cuts alternate between them), Zahid in a square, the four clips in a row
for «قلتوها… وتمّت.», and Tamm full-frame at both ends. Render after the 9:16 one (it reuses the score):

```bash
bash film/tammreel/render_parallel.sh 169
```

Output: `SayTamm_QolhaTammat_AR_16x9.mp4`, `cover169.jpg`, `cover_end169.jpg`.
