# Client work reel (9:16, Arabic, 23 s)

Real client ads from the owner's Drive folder «فيديوهات عملاء» (Tech Hive, Niimee), cut on the beat at 120 BPM and joined by the 45° purple blade.
Arabic-only, IBM Plex only (no Satoshi). The word "showreel" is not used on screen (owner's instruction).

Structure: «الكلام سهل. / ده الشغل.» → Tech Hive · حملة الجمعة البيضاء → Tech Hive · إعلان «مهمة الترقية» → Tech Hive · محتوى المتجر والمنتجات → Niimee · إعلان Every Body → symbol, «قول. تم.», «وكالة تسويق رقمي وأداء», saytamm.com.
Each chapter opens with a one-beat credit card, then 1-second shots. The clients' own audio is replaced by a score generated in code.

Shot rules (`shots.json`): no real faces (Tech Hive's presenter and Niimee's models are left out), no client end cards with phone numbers or email.

Build (repo root): download the sources into `handover/launch-film/clientreel/src` (file names in `shots.json`), then

```bash
python3 film/clientreel/prep.py
```

```bash
bash film/clientreel/render_parallel.sh
```

Output: `handover/launch-film/clientreel/SayTamm_ClientWork_AR_9x16.mp4`, `cover.jpg`, `cover_end.jpg`.
