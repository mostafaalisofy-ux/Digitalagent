# «إزاي فكرة بتبقى إعلان؟» — client work as services (9:16, Arabic, 36 s)

Real client footage from the owner's Drive folder «فيديوهات عملاء», told as three service stories: the idea → how it was made → what ran.
Arabic-only, IBM Plex only (no Satoshi). The word "showreel" is not used on screen.

| Time | Act | What the edit does |
|---|---|---|
| 0–2 | Hook | «إزاي فكرة / بتبقى إعلان؟» |
| 2–14.5 | 01 الإنتاج والتصوير · Altopiano | the idea over the facade («مكان بمودين… ونفس المستوى.», from the client's own line) → day / night split screen → «من العجينة للطاولة» in four numbered steps → the finished reel inside a phone: «وده اللي نزل على الفيد.» |
| 14.5–27 | 02 الإبداع والمحتوى · Tech Hive | the idea («روبوت عايش مهمة.») → the story in three panels (مهمة، مكافأة، تمّت) zooming into «تمت الترقية» → two hooks side by side, A and B («نختبر الاتنين… والأرقام تقرر.», no winner claimed) → a six-ad grid zooming out of one ad: «وحملة كاملة للموسم.» |
| 27–32 | 03 الموشن والتصميم · Niimee | the Every Body film in a feed frame |
| 32–36 | End | «من الفكرة… للإعلان.» → symbol, «قول. تم.», the line, saytamm.com, and the approved track-record line |

Rules applied in `shots.json`: no real faces (Tech Hive's presenter, Niimee's models, Altopiano's guests), no client end cards with phone numbers or email, the clients' audio replaced by a score generated in code.

Build (repo root): download the sources into `handover/launch-film/clientreel/src` (file names in `shots.json`), then

```bash
python3 film/clientreel/prep.py
```

```bash
bash film/clientreel/render_parallel.sh
```

Output: `handover/launch-film/clientreel/SayTamm_ClientWork_v2_AR_9x16.mp4`, `cover.jpg`, `cover_end.jpg`.
