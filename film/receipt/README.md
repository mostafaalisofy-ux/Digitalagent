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

## Arabic cut: «الإيصال» for online-store owners (9:16, 69.5 s)

**Master** (not in git): `handover/launch-film/receipt/SayTamm_Receipt_AR_StoreOwners_9x16.mp4`, from `film_ar.html`.

No voice-over: the story is told in kinetic type. Words rise out of a mask in reading order, right to left, and leave upwards. Key words turn purple; numbers count. The type is IBM Plex Sans Arabic only (Arabic and Latin subsets), so this cut carries no Satoshi.

| Time | What happens |
|---|---|
| 0–6 s | «لأصحاب المتاجر الإلكترونية» · «عندك متجر إلكتروني؟» · «الإعجابات» struck through: «لا تدفع الإيجار.» «المبيعات تدفعه.» |
| 6–9.8 s | «كل حملة لها إيصال.» «تعالَ نقرأ واحداً منها… سطراً سطراً.» |
| 9.8–15 s | Line 01, the client: K.S للأثاث, an online furniture and décor store in Saudi Arabia, Saudi National Day season 2024 |
| 15–21.6 s | Line 02, the problem: competitors' bigger discounts; the target, ROAS 4× → 7×; no deep discounts, no influencers |
| 21.6–35 s | Line 03, what we did, in four moves: product not price; bundles that raise basket value; discounts under 20% and 90% of the budget on conversion (Google, Instagram, Snapchat); starting in August with abandoned-cart retargeting and daily monitoring to early October |
| 35–47 s | The receipt prints: budget by platform (40,000 + 40,000 + 20,000 = SAR 100,000), total store sales SAR 1.09M counting up, the bar to scale, ROAS 4× → 10× against 7×, 507 orders (15–20 a day), 446 first-time customers, the source note, the stamp. Then it shrinks and the money is said plainly |
| 47–55 s | «إيصالات أخرى، من سجل إنجاز الفريق»: Muriya, the fashion and beauty stores, the electronics store drop in, short (each with its source note) |
| 55–59.6 s | «اصرف بذكاء. بِع أكثر.» over the pile of receipts |
| 59.6–69.5 s | «وأنت… ما رقمك؟» · `قول ‹ قُلها.` · `تم ‹ ونحن نُتمّها.` · lockup, «عندك متجر؟ ابدأ من هنا.», «قول… تم» in Gulf Arabic, and the site's approved Arabic attribution line |

All wording comes from the Arabic fields of `cases.ts`. Footage for the K.S story (hands only, Pexels): 6801512 (sofa), 6801516 (chair), 6632888 (vase), 36507355 (cushions), 6801514 (flowers), in `handover/launch-film/receipt/stock_ar/`.

```bash
bash film/receipt/render_parallel_ar.sh
```

```bash
python3 film/receipt/mix_ar.py
```

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

Spot frames: `node film/receipt/render.mjs --frames 1.6,13.5,44.6` (add `--ar` for the Arabic cut).
