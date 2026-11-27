# «مدينة الكلمات» (Word City): SayTamm intro film

Owner brief (2026-11-27): a new intro film for the agency, the most creative idea possible, a completely new idea; services shown
in a modern, fast way; the existing voice-over at the end; the website www.saytamm.com.

## The idea

**Everything starts with a word.** Each service is said as one word. The word falls from the sky and lands as a building in an
isometric city (the extruded Arabic letters are the architecture), then comes alive with what that service does. The city stands,
the Gulf voice says «قول…», and the last and biggest word, **«تمّ»**, lands exactly on «تم». The blade wipes to the end card.

| Time | What happens |
|---|---|
| 0–2.4 | Black. «كل شيء يبدأ بكلمة.» is typed. |
| 2.4 | The purple blade cuts the sentence in two at 45°; the halves fall away and the city grid opens behind. |
| 4.0 | **استراتيجية** lands first and draws the plan: a ring road, spokes to an empty centre plot, dashed plots for the words to come. |
| 6.5 | **هوية**: the word sharpens from light to bold through the palette, and the brand palette lands in front of it. |
| 8.5 | **تواصل**: a feed of cards rises out of the roof. |
| 10.5 | **محتوى**: pages fly out of the word and land around it. |
| 12.5 | **إنتاج**: a light cone, the camera's frame, REC and a running timecode. |
| 14.5 | **إعلانات**: billboards with growing bars pop up; an arrow launches from the roof. |
| 16.5 | **بحث**: a search bar appears and the word rises on a column above its neighbours. |
| 18.5 | **مواقع**: a browser window stands behind it while the outline fills from the ground up. |
| 20.5 | **تحليلات**: a radar sweeps at its base, bars grow, data starts running along every road. |
| 21.3–26.5 | Crane up over the whole city: «تسع خدمات. فريق واحد.» |
| 26.5–28.5 | The empty centre plot pulses on the beat; «قول…» (Gulf voice). |
| 28.5 | **«تمّ»** lands on «تم»: the biggest word, purple sides; the city jumps. |
| 31.6–32.3 | The blade wipes the screen. |
| 32.3–38 | End card: the symbol (original file), **www.saytamm.com**, «وكالة تسويق رقمي وأداء». |

Each landing shows the service's approved Arabic name, its discipline and «0n / 09» in the corner.

## Craft

- Canvas film (`film.html`, `window.seek(t)`), 60 fps with 2 sub-frames blended (`render.mjs`), 4 workers (`render_parallel.sh`).
- Isometric projection; each word is drawn on its face plane and extruded backwards in layers (lit face Soft White, sides graphite;
  «تمّ» has purple sides). Lines and solid shapes only: no glow, no particles. Purple for the blade, the roads and key details.
- IBM Plex Sans Arabic only (Arabic film: no Satoshi), so the film can be published once approved.
- Score generated in code (`renderAudio`, 120 BPM): typing, the blade, a falling whistle and a thud for every word, a sound for what
  each service does, a breakdown under the line card, a riser and a gap for the voice, a big hit on «تمّ».
- Voice: the Gulf «قول… تم» from the launch films (`handover/launch-film/infinite/vo2/SA_call.mp3`, ElevenLabs "Mansour"),
  placed so «تم» (1.245 s into the take) lands at 28.5 s. Score ducked under it. Master −14 LUFS, under −1 dBTP after AAC.

## Render (repo root)

```bash
bash film/wordcity/render_parallel.sh 169
bash film/wordcity/render_parallel.sh 916
```

Outputs in `handover/launch-film/wordcity/`: `SayTamm_WordCity_AR_16x9.mp4`, `SayTamm_WordCity_AR_9x16.mp4`, and cover frames.

## Before publishing

- The Gulf voice came from the ElevenLabs free plan: generate it again on a paid plan and have a native speaker review it.
- www.saytamm.com is not live yet: publish the film when the site is.
