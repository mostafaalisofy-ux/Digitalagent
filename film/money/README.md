# «قاموس الفلوس» (Money Dictionary, V05)

A twice-weekly series from `docs/LAUNCH_VIDEO_PLAN.html`: one marketing term per episode, turned into money in a receipt. Arabic, 9:16, 60 fps, about 18–19 s, no voice-over. Type is IBM Plex Sans Arabic only (Arabic and Latin subsets), so these episodes carry no Satoshi and need no ElevenLabs licence.

**Every number is hypothetical.** The badge «مثال توضيحي» stays on screen for the whole episode, and the end card says «الأرقام في الفيديو مثال توضيحي، مش نتايج عميل.» No client figures are used.

**Masters** (not in git): `handover/launch-film/money/SayTamm_QamoosElFlous_0N_<TERM>_AR_9x16.mp4`.

| Ep | Term | The sum on screen | The line |
|---|---|---|---|
| 01 | ROAS | sales 40,000 − ads 10,000 (ROAS 4×) − goods 20,000 − shipping & fees 6,000 = 4,000 left | «ROAS بيقيس المبيعات… مش الربح.» |
| 02 | CPA | two campaigns, 5,000 each: A 5,000 clicks at 1 → 25 orders → 200 per order; B 2,000 clicks at 2.5 → 50 orders → 100 per order | «النقرة الأرخص… مش دايماً الطلب الأرخص.» |
| 03 | AOV | 100 orders × 300 = 30,000; a complementary product in the same order lifts the average to 360 → 36,000 | «نفس عدد الطلبات… مبيعات أكتر.» |
| 04 | CR | 10,000 visitors (200 squares of 50): 1% → 100 orders; 1.5% → 150 orders | «مش محتاج زوار أكتر… محتاج زوار يشتروا.» |

Each episode: header (series label, term, Arabic name) → the sum, line by line, numbers counting → the line in kinetic type → the takeaway → end card (symbol from the original SVG, «قول تم», «قول. تم.», «احفظ الفيديو… وابعته لحد عنده متجر.»). Score: a light 100 BPM groove with ticks, counts and a stamp, synthesised in the page; mastered to −14 LUFS under −1 dBTP.

## Build (repo root)

```bash
bash film/money/render_all.sh
```

Spot frames: `node film/money/render.mjs --ep 2 --frames 3,8,12`. Re-master one episode: `python3 film/money/mix.py 2`.
