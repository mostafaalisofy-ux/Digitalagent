# SayTamm intro film, hosted by Tamm (English, 63 s)

Tamm, the brand character, introduces the agency. The narration is English. The name «قول… تم» is heard in Gulf Arabic, as the profile explains it: "In everyday Gulf Arabic, «قول تم» is what you hear when a request is as good as done."

**Master:** `handover/launch-film/intro/SayTamm_Intro_Tamm_EN_63s_9x16.mp4`, 1080×1920 at 60 fps. It is not in git.

## Structure

The film follows the 2026 profile, "Prompt edition", and its commands `/say`, `/plan`, `/make` and `/tamm`.

| Time (s) | Scene | On screen |
|---|---|---|
| 0–4.4 | "Hi, I'm Tamm." | The vertical character clip, and a name tag: "Tamm · The Playful Strategist" |
| 4.3–9 | "In Gulf Arabic, when a request is as good as done, you hear two words…" | The wide clip, in a panel; `> lookup("as good as done")` is typed |
| 9–11.4 | «قول… تم» in the Gulf voice | «قول» = prompt, «تم» = result. The rest is silent apart from two hits |
| 11.4–17.7 | "That's our name and our promise. You tell us the goal; we take responsibility for getting there." | A prompt card: "say › Launch our new model in Saudi Arabia." and "tamm › تم done ✓" (from the profile) |
| 17.6–22.6 | "A digital marketing & performance agency, founded in 2021." | `/say who-we-are` and the spec sheet from the profile: 2021 · 30 · 5 |
| 22.5–25.6 | "One team. Four connected disciplines." | Four nodes on one ring |
| 25.5–41.5 | Strategy, Creative, Media, Technology | One card per discipline, using the profile's wording, with Tamm in a window above each |
| 41.4–47.3 | "Saudi Arabia, the UAE, Kuwait, Oman and Egypt." | Tamm changes looks while the five markets stack up: "experience, not offices" |
| 47.1–54.7 | "Posts, campaigns, identities and packaging, for brands in automotive, retail, fashion, food and technology." | `/make work`: a wall of the team's work taken from the profile |
| 54.6–59 | "So… what's your goal? Say it. We'll Tamm it." | A prompt bar |
| 59–63.5 | Lockup | Symbol, SayTamm, «قول تم», positioning, "Say it. Tamm it.", info@saytamm.com and www.saytamm.com. «قول… تم» is heard once more |

Captions in English follow the narration word by word. They are switched off where a scene already sets the words.

## Sources

**Character:** the owner's files, kept in `handover/launch-film/intro/src`:

| File | What it shows |
|---|---|
| `tamm_vertical.mp4` | Push-in, welcome gesture |
| `tamm_wide.mp4` | Presenter in a hall |
| `tamm_looks.mp4` | Streetwear, Saudi thobe, Emirati dress, suit, robot form |
| `tamm_cap.webp` | Still image |

The cities behind Tamm in `tamm_looks.mp4` are not labelled.

**Work images:** embedded in `SayTamm_Company_Profile_2026_Prompt.html` and extracted to `profile_img/`. They show client work as presented in the profile. Client logos are not used.

**Voices:** ElevenLabs eleven_v4.

| Voice | Line | Notes |
|---|---|---|
| "Noah" | The English narration | One take; Scribe transcription matched the script |
| "Mansour" | The Gulf Arabic «قول… تم» | The take from the launch films |

**Score:** original Web Audio at 104 BPM: an Am–F–C–G pad, a pluck and a light groove. It is silent under the name card and ends on a lockup chord.

## Rebuild

```bash
python3 film/intro/prep.py
```

```bash
bash film/intro/render_parallel.sh
```

```bash
python3 film/intro/mix.py
```

The edit list for the narration, and the word timings for the captions, are in `film/intro/timing.json`.

## Before publishing

- **Voices:** generate them again on a paid ElevenLabs plan for a commercial licence. Have a native Gulf speaker check «قول… تم».
- **Client work:** confirm the team may show these client projects in a promotional film, as the profile already does.
- **Satoshi:** the film embeds Satoshi, so it stays internal until the font licence is checked.
- **Approval:** the owner approves before anything is posted.
