# Sector reels — one reel per industry (9:16, Arabic, 16 s each)

One engine (`film.html`), five configurations (`sectors.json`, injected at render time). Each reel:

| Time | What |
|---|---|
| 0–2 | the sector, and a two-part hook over the first shot dimmed |
| 2–13.8 | the client's real work cut on the beat (120 BPM), three short captions on what was made, sector tag and a progress bar at the top |
| 12–13.8 | «عمل لـ» + client name + chips for what was made |
| 13.8–16 | symbol, «قول. تم.», the line, saytamm.com, the approved track-record line |

| Sector | Client | Hook | Footage |
|---|---|---|---|
| المطاعم والضيافة (`food`) | Altopiano | الأكل بيتباع… بالعين الأول. | altopianoReels 4K, hands only |
| الأجهزة المنزلية (`appliances`) | Zahid Electra | الميزة اللي متتشافش… متتباعش. | product motion, square on obsidian |
| الإلكترونيات والتقنية (`electronics`) | Tech Hive | جمهور التقنية بيقارن… قبل ما يدفع. | story film, hooks A/B, Black Friday set (same safe in-points as `film/clientreel`) |
| الأبلكيشنز والخدمات (`apps`) | Clean Basket | الأبلكيشن لازم يتفهم… من أول ثانية. | 2D motion at 1.2× |
| السفر والسياحة (`travel`) | Exodus | الرحلة بتتباع… قبل ما تبدأ. | Nile, Sphinx, desert, Anubis (the opening shot with tourists is not used) |

No faces, no client end cards with contact details, Plex only (no Satoshi), score generated in code, master −14 LUFS.

Build (repo root): the sources are the proxies in `handover/launch-film/tammreel/src` and `handover/launch-film/clientreel/src` (see their READMEs), then

```bash
python3 film/sectors/prep.py
```

```bash
bash film/sectors/render_parallel.sh
```

One sector only: `bash film/sectors/render_parallel.sh travel`. Output: `handover/launch-film/sectors/SayTamm_Sector_<Name>_AR_9x16.mp4` and `cover_<sector>.jpg`.
To add a sector: add its shots to `shots.json`, run `prep.py <ids>`, add an entry to `sectors.json` (cuts must total 11.8 s).

**English**: each sector in `sectors.json` has an `en` block (sector, hook, captions, chips; Tech Hive also swaps in its English story film).
Satoshi, so internal until the licence is confirmed.

```bash
SECTOR_LANG=en bash film/sectors/render_parallel.sh
```

Output: `SayTamm_Sector_<Name>_EN_9x16.mp4`.
