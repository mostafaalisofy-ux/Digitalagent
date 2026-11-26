# «قالوا لك…» — the Tamm series (9:16, Arabic, 30 s an episode)

Each episode takes a marketing myth clients hear all the time, cuts it in two with the brand's 45° blade, lets Tamm answer it,
draws the move as a live diagram, and proves it with real work: an approved case (figures verbatim, with how they were measured)
or, where there is no case, the production itself. One engine (`film.html`), four configurations (`episodes.json`).

| Time | Beat |
|---|---|
| 0–4.5 | Tamm walks in (3D, `tamm_vertical.mp4`); the myth arrives as a message card «قالوا لك:» |
| 4.5 | the purple blade strikes through the card; the halves fall away |
| 4.5–9 | Tamm gestures (same 3D clip); his answer in two lines |
| 9–19 | «الحركة»: the move as a diagram over Tamm's discipline still |
| 19–26 | «الدليل»: the case, figures counting up, the measurement note |
| 26–30 | Tamm (`mini tamm`), symbol, «قول. تم.», saytamm.com, episode, the track-record line |

| Ep | Myth → answer | Move | Proof |
|---|---|---|---|
| 01 الاستراتيجية | «عشان تبيع في الموسم… لازم تخصم أكتر.» → «نافس بالمنتج… مش بالسعر.» | hero products, store rearranged, bundles; −50% struck → «تحت 20%»; budget 90/10 | K.S Furniture: ROAS line 4× → 10× against target 7×, 507 orders, 15–20 a day, 446 new customers |
| 02 الإبداع والمحتوى | «الصورة الحلوة… بتبيع لوحدها.» → «الصورة بتتشاف… الهوك هو اللي بيوقّف.» | one idea, Tech Hive hooks A and B side by side, meters swap leads: «نختبر الاتنين… والأرقام تقرر.» (no winner claimed) | Altopiano production, Altopiano · Tech Hive |
| 03 الميديا والأداء | «زوّد الميزانية… والمبيعات هتزيد لوحدها.» → «الميزانية لازم تتحرك… كل يوم.» | six ad sets, day 1 → 82, budget flows to the ones bringing purchases | fashion & beauty: 13.84× (account A), 27,703 purchases, 8.91× (B), 6,930; ROAS is not profit |
| 04 الجمهور والاستهداف | «كل الناس… جمهورك.» → «جمهورك هو اللي… ناوي يشتري.» | funnel: awareness struck, spend falls into interest and intent | electronics Q4: $897K purchase value, 747 orders, $1,201 average order |

Case figures and notes come from `site/src/data/cases.ts` (all three `approved`, D-025/D-026). Case photos are the owner-generated
stock stills, labelled «صورة توضيحية». Plex only, no voice-over (score generated in code), master −14 LUFS.

Build (repo root), with the sources from `film/tammreel` and `film/clientreel` and `handover/launch-film/intro/src` in place:

```bash
python3 film/tammseries/prep.py
```

```bash
bash film/tammseries/render_parallel.sh
```

Output: `handover/launch-film/tammseries/SayTamm_QaloLak_<NN_Name>_AR_9x16.mp4` and `cover_<ep>.jpg`.

**English** ("They told you…"): each episode in `episodes.json` has an `en` block (myth, answer, discipline, case text from the English side of
`cases.ts`); fixed copy is in the `TXT` table at the top of `film.html`. Satoshi, so internal until the licence is confirmed. Edge-aligned
text and bars mirror; long lines shrink to fit.

```bash
EP_LANG=en bash film/tammseries/render_parallel.sh
```

Output: `SayTamm_QaloLak_<NN_Name>_EN_9x16.mp4`.
