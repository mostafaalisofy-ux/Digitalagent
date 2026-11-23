# One Push (زقّة واحدة): a chain reaction on white

The full stop of «قول.» / "Say it." drops as a purple ball and sets one connected machine in motion. Each station is one discipline. The last move stamps «تم».

- **Arabic master:** `handover/launch-film/one-push/SayTamm_OnePush_AR_22s_9x16.mp4`
- **English master:** `handover/launch-film/one-push/SayTamm_OnePush_EN_22s_9x16.mp4`
- **Format:** 22 s, 1080×1920, 60 fps.

The masters are not in git.

```bash
bash film/one-push/render_parallel.sh
```

```bash
python3 film/one-push/mix.py
```

The first command renders the score and both pictures on 4 workers. The second mixes the voiceover and masters both films.

## The machine

| Time (s) | Station | What moves | Sound |
|---|---|---|---|
| 0–2.9 | Hook | «عندك هدف؟» then «قول» lands, big. Its full stop jiggles and hops | Two marimba notes; voice: «عندك هدف؟», then «قول…» |
| 2.9–4.5 | The push | The full stop falls onto a ramp, rolls, hits the wall, bounces onto the shelf | Click, rolling, wall knock |
| 4.5–6.4 | 01 Strategy | Four dominoes fall: الهدف → الجمهور → الرسالة → الخطة. The last one tips a blank card off the shelf | The dominoes are the beat; the groove starts |
| 6.4–9.2 | 02 Creative | The card drops onto a press. The press slams, and the card comes out designed (circle, purple diagonal, type lines). A piston pushes it down the slope | Hiss, heavy thud, three chimes |
| 9.2–10.6 | 03 Media | The card hits a wedge and splits into four. Each copy flies into a screen, and the screens light and broadcast | Split, four rising pings |
| 10.6–11.4 | 04 Measurement | A gauge rises one step per screen, overshoots and rings a bell | Bell |
| 10.8–12.4 | One system | The bell knocks a second ball onto a rail. The camera pulls back to show the whole machine: «منظومة واحدة.» | Rolling |
| 12.4–13.5 | Whip | The camera dives into the funnel and comes out above the paper. The stamp falls away from us, and the ball in its handle is the ink | Whoosh, breath |
| 13.5 | «تم» | The stamp slams. It lifts to show «تم» stamped in ink, with purple dots | Big thud; voice: «تم!» |
| 15.6–22 | Lockup | Symbol (Black-Purple), «قول تم» / SayTamm, positioning, «قول. تم.», «عندك هدف؟ ابدأ من هنا.», email | Warm pad; voice: «قول… تم!», then «ابدأ من هنا.» |

## Voices

These reuse takes already generated for the launch films, so no new voices were made:

| Line | Voice |
|---|---|
| «عندك هدف؟ / ابدأ من هنا.» | Mawardy |
| «قول… تم!» and «تم!» | Mansour |
| "Have an objective? / Start here." and "Say it. Tamm it." | Jeffery |

In the English master the stamp says «تم!». It is the brand word, and the stamped mark is «تم».

## Rules kept

- **Logo:** the original logo file is used (Black-Purple, for the white background) and never redrawn. «SayTamm» is set in type (OQ-05).
- **Purple:** an accent only (the ball, the slash on the card, the gauge pin, the ink dots).
- **Content:**
  - no people and no AI imagery: the machine is drawn in code;
  - no platform logos: the screens are generic;
  - no numbers or claims.
- **Copy:** «منظومة واحدة» follows the content book («في منظومة واحدة»). The tagline is the permanent «قول. تم.» / "Say it. Tamm it."

## Before publishing

The same checks apply as for the other launch films:

- **ElevenLabs licence:** the voices came from the free plan. Generate them again on a paid plan for a commercial licence.
- **Native review:** a native Saudi speaker and a native Egyptian speaker review the voices.
- **Satoshi:** the output embeds Satoshi, so it stays internal until the font licence is checked.
- **Approval:** the owner gives explicit approval before anything is posted.
