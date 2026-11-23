# The SayTamm Dictionary: TikTok version

```bash
bash film/launch-45s/production/dictionary/render_v2_parallel.sh tiktok
```

Output: `handover/launch-film/dictionary/SayTamm_Launch_Dictionary_v2_tiktok_45s_9x16_TIKTOK.mp4`, plus `SayTamm_TikTok_Cover.png` (not in git).

## What changes from the premium cut

| Change | Why |
|---|---|
| The pile of requests is already on screen in frame 0. The first four bubbles are in place, and the rest flood in faster | TikTok decides in the first second whether people keep scrolling. Frame 0 is also the default cover |
| The platform bursts at 12 s and 19.6 s sit at x ≤ 886 | Keeps them clear of TikTok's right-hand action rail (like, comment, save, share), x > 930 and y 950–1760 on a 1080×1920 frame |
| The convergence stack is lifted (tops at 380 / 620 / 850) and the English line is set at 108 px | Keeps "done" clear of the action rail while it is the word that survives the strike-through |
| Everything else is identical: timing, voiceover, mix and master | The voiceover still lands word for word |

**Safe-zone check** (top bar y < 160, right rail, caption block y > 1480):

- No text and no key element sits under the TikTok interface.
- The skyline drawings pass under the caption block, which is intended: they are decoration, not information.

## Upload settings

- **File:** upload the MP4 as is: 1080×1920, 60 fps, H.264 High, AAC, about 75 MB (TikTok's limit is far above this).
- **High-quality upload:** in the TikTok app, turn on **"Upload HD" / high-quality uploads**. Turn Data Saver off.
- **Auto-captions:** leave them **off**. Every spoken line is already on screen as type, and auto-captions in Arabic tend to mis-transcribe the dialect.
- **Cover:** use `SayTamm_TikTok_Cover.png`, the three phrases from the convergence at 0:33, or pick that frame in the editor. It reads in TikTok's 3:4 grid crop.
- **Sound:** the soundtrack is original (synthesised score and SFX), so there is no music licence to clear. Name the sound "SayTamm: قول تم". The voices are ElevenLabs: see the licence note below.

## Caption (light conversational Arabic, one short thought, at most one emoji)

**Option 1:**

> السعودي يقول: قول تم.
> المصري يقول: اعتبره حصل.
> والعالم يقول: Consider it done.
> ونحن جمعناها في اسم واحد: SayTamm

**Option 2:**

> ثلاث لهجات… ومعنى واحد: تم ✔️

**Hashtags:** #SayTamm #قول_تم #اعتبره_حصل #تسويق_رقمي #DigitalMarketing

The tags avoid country names, in line with the positioning rule: SayTamm is never presented as a "Saudi agency".

## Before posting

- **Voices:** a native Saudi and a native Egyptian speaker review the voices.
- **ElevenLabs licence:** the voices need a commercial licence. They were generated on the free plan, so generate them again on a paid plan; `mix_vo.py` rebuilds the film.
- **Platform icons:** check the platform brand guidelines for the icons (see `assets/PLATFORM_ICONS_NOTE.md`). TikTok's own icon appears in the film.
- **Final approval:** the owner gives explicit approval before anything is posted. Nothing here has been published.
