# The Receipt (9:16, 52 s)

A film for the client who cares most about money in and money out. Every campaign comes with a receipt: four case studies are printed as till receipts over real, hands-only footage (checkout, keys, packing, paying, a parcel). Each receipt states what was spent and what came back, with the source note for the figure.

**Master** (not in git): `handover/launch-film/receipt/SayTamm_The_Receipt_EN_9x16.mp4`, 1080×1920, 60 fps.

## Story

| Time | What happens |
|---|---|
| 0–4.6 s | "Likes don't pay the rent." "Likes" is struck through, then "Sales do." |
| 4.6–7.4 s | A printer slot opens: "Every campaign comes with a *receipt*." |
| 7.4–37.8 s | Four receipts print, one after another (7.6 s each). On each one: client, problem, what we did, the two money lines counting up, a bar drawn to scale ("spent" vs "came back"), the KPIs, the source note, and the «تم ✓» stamp. Under the receipt the money is said in plain words (e.g. "SAR 100K in. SAR 1.09M in store sales.") |
| 37.8–43.2 s | "Spend smarter. Sell more." The four receipts together |
| 43.2–52 s | "What's your *number*?" · `say › Say it.` · `tamm › We'll Tamm it.` · lockup, with «قول… تم» in Gulf Arabic and the approved footnote |

## The four receipts (copied from `site/src/data/cases.ts`)

| No. | Client | Money lines | Source note on the receipt |
|---|---|---|---|
| 01 | K.S Furniture (KSA) | Media budget SAR 100K → total store sales SAR 1.09M | Store total sales from the store platform, not only sales attributed to ads |
| 02 | Muriya (Oman) | Ad spend $18.2K → revenue from units sold $1.51M; 13 units | Value of units sold to buyers who came through the campaign |
| 03 | Fashion & beauty stores (Egypt) | Ad spend EGP 535K → purchase value EGP 7.4M (account A) | ROAS and purchase value are Meta-attributed |
| 04 | Electronics store (Egypt) | 747 orders, $897K purchase value, $1,201 AOV | Meta-attributed purchase value |

## Rules kept

- **Figures are pending (OQ-32).** Every case in `cases.ts` is `status: 'pending'` until the original platform exports and client approval are in. The film must not be published before that.
- **ROAS is revenue ÷ ad spend, not profit.** Nothing in the film says "profit" or "profitable".
- The lockup carries the approved line: "Results from projects led by members of the SayTamm team, including work delivered at other agencies." No previous agency is named.
- Footage is hands only, no faces, no AI people, no brand billboards. Purple stays an accent.
- Satoshi is used for type, so the master stays internal (font licence).

## Sound

- Hook take: ElevenLabs `eleven_v4`, voice "Noah", one take (`vo/EN_hook.mp3`). `plan.py` measures its six phrases and `mix.py` lays each on its line. Needs a paid ElevenLabs plan for commercial use and a native listen before publishing.
- "Say it." / "We'll Tamm it." are reused from the services film take; «قول… تم» is the launch films' Gulf take.
- Score, printer ticks and stamp hits are synthesised in the page (`renderAudio`, 96 BPM). Score ducked under the voice; master at -14 LUFS, under -1 dBTP.

## Build (repo root)

```bash
python3 film/receipt/prep.py
```

```bash
python3 film/receipt/plan.py
```

```bash
bash film/receipt/render_parallel.sh
```

```bash
python3 film/receipt/mix.py
```

Spot frames: `node film/receipt/render.mjs --frames 1.6,13.5,44.6`.
