# The SayTamm Dictionary: voiceover script (ElevenLabs)

The film is 45 s. Each line is timed to the moment its words appear on screen.

**Model:** `eleven_v4`, the newest ElevenLabs model, which supports audio tags such as `[confident]` and `[playfully]`.

**ElevenLabs flow:** "SayTamm Dictionary film: voiceover" (`8U44DOWjscu1TVDikbqf`).

## Voices (ElevenLabs library)

| Role | Voice | ID | Why |
|---|---|---|---|
| Saudi | Ziyad, Natural Saudi Arabic | `pNGUEZc2WLum9bjP611g` | Native Najdi accent, warm and confident. «قول تم» is a Najdi expression |
| Egyptian | Omda | `fCbDHJoEtU6DEDqiP41q` | Natural Egyptian, confident and polished, made for premium commercials |
| English | William Mayfair | `TJBdgVeYqUckn8uLVJAe` | Crisp British RP, precise; matches the "Swiss precision" entry |

## Lines

| # | Time | Voice | Line (as sent) | On screen at that moment | Status |
|---|---|---|---|---|---|
| SA-01 | 4.45 | Saudi | `[confident] قول… تم.` | «قول» lands at 4.5, «تم.» at 5.0 | ✅ generated |
| SA-02 | 6.20 | Saudi | `[warmly] تقولها إذا تبي الشي يصير.` | The definition types in | ✅ generated |
| SA-03 | 9.00 | Saudi | `[casually] [confident] قول تم.` | The reply bubble «قول تم.» | ✅ generated |
| EG-01 | 14.45 | Egyptian | `[playfully] اعتبره… حصل.` | «اعتبره» drops at 14.5, «حصل.» pops at 15.0 | ✅ generated |
| EG-02 | 16.20 | Egyptian | `[relaxed] يعني ماتقلقش… خلاص، اتعمل.` | The definition types in | ✅ generated |
| EG-03 | 20.45 | Egyptian | `[chuckles] حصل.` | «حصل» hops into the reply: the wink | ✅ generated |
| EN-01 | 25.10 | English | `[crisp] Consider it done.` | Letters snap in; the full stop lands at 26.0 | ✅ generated |
| EN-02 | 27.00 | English | `Treat it as finished.` | The definition types in | ✅ generated |
| EN-03 | 28.50 | English | `[casually] Consider it done.` | The reply bubble | ✅ generated |
| EN-04 | 33.00 | English | `Three ways to say it.` | The caption appears | ✅ generated |
| SA-04 | 35.50 | Saudi | `[softly] والمعنى… واحد.` | The caption «والمعنى واحد.» | ✅ generated |
| SA-05 | 36.00 | Saudi | `[deep voice] [confident] تم.` | «تم» opens big | ✅ generated |
| EN-05 | 39.45 | English | `Say… Tamm.` | The name builds: Say (39.5) + Tamm (39.9) | ✅ generated |
| EN-06 | 40.40 | English | `Say it. Tamm it.` | The tagline appears | ✅ generated |
| SA-06 | 41.20 | Saudi | `[warmly] قول. تم.` | «قول. تم.» | ✅ generated |

## Final placement (as mixed)

`mix_vo.py` holds the exact cue list. Each phrase is placed so its key word lands on the picture's hit:

- **SA-01:** tightened 10% (atempo 1.10), so «تم» lands on the 5.0 slam.
- **EG-01:** take B, tightened 20%, so «حصل» lands on the 15.0 pop.
- **EG-03:** the chuckle first, so «حصل» lands on the 20.5 hop.
- **EN-01:** "done" lands as the word snaps in at 25.75.
- **SA-05:** «تم.» lands as the dots lift at 37.2.
- **EN-05:** cut into "Say" (39.2) and "Tamm" (on the 39.9 hit).
- **SA-06:** «قول. تم.» closes at 42.35.

Measured in the speech band (1–4 kHz), the voice sits 17–40 dB over the music. The music ducks only 3–8 dB, so it keeps its energy. The master peaks at −1.5 dBFS.

## Mix plan

- **Placement:** each take is placed on its time with `adelay`.
- **Music:** ducked under the voice with a sidechain compressor, 4–6 dB under speech, per the brief (03: "music 3–5 dB under speech").
- **Loudness:** the master is normalised to −1 dBFS peak. Speech is checked for clarity on a phone speaker (mono fold-down).
- **Outputs:** `SayTamm_Launch_Dictionary_45s_9x16_VO.mp4`, a VO-only stem and a music-only stem.

## Before publishing

- **Native-speaker review:** the voices are synthetic (ElevenLabs library voices). A native Saudi and a native Egyptian speaker should review the reads before anything is published.
- **Commercial licence:** use in a commercial launch needs an ElevenLabs plan that includes a commercial licence. The workspace is currently running on free shared generations.
