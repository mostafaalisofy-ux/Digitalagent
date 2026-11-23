# The Dot (النقطة): the SayTamm Day 14 launch film

The market talks in ellipses: «بيكتب…», «هنرجعلك…», "Let's circle back…", meetings postponed ×3, a 40-page report with no decision. One dot ends the sentence.

- **Arabic master:** `handover/launch-film/the-dot/SayTamm_TheDot_Day14_AR_28s_9x16.mp4`
- **English master:** `handover/launch-film/the-dot/SayTamm_TheDot_Day14_EN_28s_9x16.mp4`
- **Format:** 28 s, 1080×1920, 60 fps.
- **Covers:** `SayTamm_TheDot_{AR,EN}_Cover.png`.

None of these files are in git.

The two masters are separate. Neither frame mixes the two scripts, as the Day 14 brief asks.

```bash
bash film/the-dot/render_parallel.sh
```

```bash
python3 film/the-dot/mix.py
```

The first command renders the score, then both pictures on 4 workers. The second mixes the voiceover and masters both films.

## The film

| Time (s) | Act | What happens | Sound |
|---|---|---|---|
| 0–5.6 | The talk | Typing bubbles, «هنرجعلك…», «في جديد؟», a 2:47 voice note, a meeting postponed ×2, ×3, a spinner, Report_FINAL_v7.pdf (40 pages). It floods in faster; the frame creeps in and shakes | Pings, keyboards, buzzes, a clock that speeds up, a tightening drone, and the talk voices piling up |
| 5.6 | Freeze | Everything stops and dims | Silence |
| 6.0–6.75 | The dot | In the centre «بيكتب…» bubble, two of the three dots fall away. The last one turns purple | Two tiny drops, then one heavy hit |
| 7.75–12.5 | Closing | The dot strikes each open loop and its ellipsis falls off. Each loop resolves into a bright tile with a check: «رجعنالك.», «خلصت النهارده.», «نزل.», «اتأجل» → «تم ✓», the spinner → «جاهز.», the report → «صفحة واحدة. قرار واحد.». Then a ring runs out and closes everything else | A clean 120 BPM groove; each closure is a tick up the Hijaz scale |
| 12.75–14.75 | Less talk | Every tile is pulled into the dot. «كلام أقل.» | A reverse swell, then a thump |
| 14.75–20.75 | More Tamm | «عندك هدف؟»: the dot draws one line through الهدف → الاستراتيجية → الإبداع → الإعلانات → القياس, each stop with its own mark. Pull back: «منظومة واحدة.» | Full groove; each stop has its own sound; a riser |
| 21.75 | «تم» | «ٮم» rises in. The dot drops in, splits in two and becomes the two dots of ت | A breath of silence, then the drop; Mansour: «قول… تم!» (EN: "Say it. Tamm it."), with «تم» / "Tamm" landing on the hit |
| 22.9–28 | Lockup | The original symbol, then «قول تم» / SayTamm, «وكالة تسويق رقمي وأداء», «كلام أقل. تنفيذ أكتر» ending on a purple dot, then «عندك هدف؟ ابدأ من هنا.» and info@saytamm.com | Warm Hijaz pad, voices for the campaign line and the CTA |

## Voices (ElevenLabs eleven_v4)

The takes are in `handover/launch-film/the-dot/vo/`. The closing «قول… تم!» and "Say it. Tamm it." takes are reused from `infinite/vo2/`.

| Line | Voice |
|---|---|
| Talk: Egyptian | Mawardy |
| Talk: Saudi | Mansour |
| Talk: English | Edward Sterling (British corporate) |
| «كلام أقل. تنفيذ أكتر.» | Mansour |
| «عندك هدف؟ ابدأ من هنا.» | Mawardy |
| "Less talk. More Tamm." and "Have an objective? Start here." | Jeffery |

**Mix**

- The talk voices are cut into phrases, phone-filtered and panned. They pile up and are cut dead at the freeze.
- The music ducks under the closing voices.

**Measured**

| Master | Loudness | True peak |
|---|---|---|
| AR | −14.5 LUFS | −1.4 dBTP |
| EN | −14.4 LUFS | −1.1 dBTP |

The silence after the freeze measures −45 dB.

## The dot as a launch signature (optional, Days 1–13)

End every launch post on the same small purple dot, in the same place, without explaining it. On Day 14 the dot is explained: it is the dot that becomes «تم». This adds no posts to the calendar.

## Rules kept

- **Logo:** the original symbol SVG only, never redrawn.
- **Wordmark:** «SayTamm» is set in Satoshi because no wordmark exists yet (OQ-05).
- **Purple:** an accent only (the dot, checks, the path line).
- **Content:**
  - no people, no AI faces, no TAMM character (its reference is not approved);
  - no real platform UI and no data claims; the report and the meeting are generic props;
  - no clients, numbers or superlatives.
- **Positioning:** "a digital marketing & performance agency", as in the content book. It is never called a "Saudi agency".
- **Talk lines:** «إن شاء الله» is not used, so no faith phrase is mocked.

## Before publishing

- **Campaign line:** "Less talk. More Tamm." / «كلام أقل. تنفيذ أكتر.» is still awaiting confirmation (D-023). If it changes, edit `T_LINE` in `film.html` and the `line` take in `mix.py`, then render again.
- **ElevenLabs licence:** the voices came from the free plan. Generate them again on a paid plan for a commercial licence.
- **Native review:** a native Saudi speaker and a native Egyptian speaker review the voices and the dialect lines.
- **Satoshi:** the output embeds Satoshi, so it stays internal until the font licence is checked.
- **Approval:** the owner gives explicit approval before anything is posted.
