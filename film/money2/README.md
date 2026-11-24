# «قاموس الفلوس» v2 (voice-over, real footage, faster)

The owner found v1 (`film/money/`, type-only, no voice) too slow. v2 rebuilds the series with a voice-over, real hands-only footage, colour blocks, semantic colour for money (green in, coral out), popping kinetic type and scene transitions (whip, zoom, flash, slam). Arabic, 9:16, 60 fps.

**Episode 01 · ROAS** (`ep1.html`, 20 s). Master (not in git): `handover/launch-film/money/SayTamm_QamoosElFlous_v2_01_ROAS_AR_9x16.mp4`.

| Time | Scene |
|---|---|
| 0–3 s | Card payment footage; «عائدُ إعلاناتِك» → a white card slams in with «4×», green ring; «أربعةُ أضعاف؟» and a ROAS pill |
| 3–4 s | Soft-white flash: green check, «جميل…» |
| 4–5.5 s | Music stops. Coral pause icon, «لكن… انتظر.», a clock ticks |
| 5.5–9.2 s | The beat drops back. Top: footage cuts on every cost (trolley, packing, parcel, cash and calculator) with a coral price sticker. Bottom: the total counts down from 40,000 (ads −10,000, goods −20,000, shipping −4,000, fees −2,000) to 4,000, the bar shrinks; «10% فقط من المبيعات» |
| 9.2–11.3 s | "PAY" phone footage: «العائدُ يقيسُ المبيعات…» and the formula as pills: المبيعات ÷ الإعلانات = 4× |
| 11.3–12.4 s | Soft white: ROAS ≠ الربح |
| 12.4–15.2 s | Calculator footage: «اعرفْ هامشَك قبل أن تحتفل.» and a gauge filling to 10% |
| 15.2–20 s | End card: symbol, «قول تم», «قول. تم.», «احفظ الفيديو… وأرسله لصاحب متجر.», «قول… تم» in Gulf Arabic |

All numbers are hypothetical and the badge «مثال توضيحي» stays on screen; the end card says the numbers are an illustration, not client results. The arithmetic: 40,000 − 10,000 − 20,000 − 4,000 − 2,000 = 4,000 = 10% of sales; ROAS = 40,000 ÷ 10,000 = 4×.

**Voice:** ElevenLabs "Rawi" (MSA, eleven_v4), one take, `handover/launch-film/money/vo/ep1.mp3`: «عائدُ إعلاناتِك أربعةُ أضعاف؟ جميل… لكن انتظر. اطرحْ تكلفةَ البضاعة، والشحن، والعمولات. العائدُ يقيسُ المبيعات… لا الربح. اعرفْ هامشَك قبل أن تحتفل.» It was made with the last free-plan credits: before publishing, generate it again on a paid plan (commercial licence) and have a native speaker review it. The other episodes need a paid plan to be voiced at all.

**Footage** (Pexels, hands only, no faces), prepared by `prep.py`: 8937985 (card payment), 6214215 (laptop and trolley), 9862359 (packing), 7362808 (parcel), 34839526 (cash and phone calculator), 6214214 ("PAY" phone), 6266261 (calculator), 6214218 (trolley, pink).

**Sound:** a 120 BPM groove synthesised in the page (kick, clap, hats, bass, plucks) that stops for «لكن انتظر» and drops back on the subtraction; whooshes on cuts, thuds on each cost, dings and pops on the elements. The score ducks under the voice; master −14 LUFS under −1 dBTP.

## Build (repo root)

```bash
python3 film/money2/prep.py
```

```bash
bash film/money2/render_parallel.sh 1
```

Spot frames: `node film/money2/render.mjs --ep 1 --frames 1.3,6.6,10.2`.
