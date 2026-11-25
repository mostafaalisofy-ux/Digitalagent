# «رحلة العميل معانا» — the client journey (9:16, Arabic, 56 s)

Eight stations from the brief to the report, at 120 BPM, joined by the 45° purple blade; a station counter and progress bar run at the top.
Arabic-only, IBM Plex only (no Satoshi).

| Time | Station | What is on screen |
|---|---|---|
| 0–3.5 | Hook + map | «كل عميل بيبدأ بجملة. / والباقي رحلة.» → the journey map draws its eight stations |
| 3.5–9 | 01 البريف | hands typing (stock) under a brief card typed live; «مش هنبدأ بالإعلان. / هنبدأ بالأسئلة.» |
| 9–16 | 02 التحضير | story cards on a table (stock); four steps animated: market & competitors, audience card, positioning map, the month's plan |
| 16–21 | 03 الفكرة | Tech Hive robot idea → storyboard panels that sketch then fill → zoom into «تمت الترقية» |
| 21–28 | 04 التصوير والإنتاج | camera hands (stock) → Altopiano day/night split → dough to table under a REC viewfinder |
| 28–33 | 05 المحتوى والفيجوالز | six Tech Hive ads zoom out of one → two phones: Altopiano reel and Niimee post |
| 33–41 | 06 الميديا باينج والأداء | hooks A/B side by side → campaign dashboard (channels, bars, line, CPA ↓ ROAS ↑, no figures) |
| 41–46 | 07 SEO | phone in hand (stock) behind a search typed live; «براندك» climbs to the top |
| 46–51.5 | 08 التقارير | report pages: اللي حصل · اللي اتعلمناه · القرار الجاي (marked «أمثلة توضيحية») |
| 51.5–56 | End | «من البريف… للقرار الجاي.» → symbol, «قول. تم.», line, saytamm.com, team track-record line |

Stock (hands only, Pexels): 39425751, 8035618, 35313946, 30742631, 33942937 → `handover/launch-film/journey/stock`.
Client footage: Drive «فيديوهات عملاء» → `handover/launch-film/clientreel/src` (no faces, no contact end cards).

```bash
python3 film/journey/prep.py
```

```bash
bash film/journey/render_parallel.sh
```

Output: `handover/launch-film/journey/SayTamm_ClientJourney_AR_9x16.mp4`, `cover.jpg`, `cover_end.jpg`.
