# SayTamm showreel (30 s, 9:16)

The team's work, cut to an original 128 BPM track: 64 beats, exactly 30 seconds.

**Master:** `handover/launch-film/reel/SayTamm_Showreel_30s_9x16.mp4`. It is not in git.

| Beats | Section | Work |
|---|---|---|
| 0–3 | Hook | "Say it." then "Tamm it.", and a build into the drop |
| 4–11 | Campaigns | Chery Saudi, full-bleed, one cut per beat; GIG; POCO |
| 12–19 | Content | Redmi / Xiaomi, social posts |
| 20–27 | Motion | The niimee motion piece (`niimee_dot.mp4`) |
| 28–35 | Taste | Food and hospitality |
| 36–43 | Events | MIX key visuals |
| 44–51 | Brands | Electra, Metro, Kidzos, travel, beauty |
| 52–55 | The rush | Half-beat cuts and a snare roll |
| 56–63 | Lockup | Symbol, SayTamm, «قول تم», "Say it. Tamm it.", saytamm.com; «قول… تم» in Gulf Arabic |

## Sources

The owner states the company holds full rights to this work.

- **Posts:** cut one by one from the work pages (16–53) of the owner's source deck, with `pdfimages` and an automatic crop. Each post is taken on its own, so no agency logo or mark comes along. The film names no other agency.
- **Left out:**
  - Case studies with figures, which are unapproved.
  - Client-logo pages.
  - Government and Vision 2030 work.
  - An event photo that shows a public figure on screen.
- **Chery and MIX key visuals, and the niimee clip:** supplied by the owner in chat.
- **Website video:** none was found on the page the owner linked.

## Rebuild

```bash
python3 film/reel/prep.py
```

```bash
bash film/reel/render_parallel.sh
```

```bash
python3 film/reel/mix.py
```

## Before publishing

- Check that each client agrees to its work appearing in a SayTamm reel.
- The Gulf voice comes from the ElevenLabs free plan. Generate it again on a paid plan and have a native speaker review it.
- The film embeds Satoshi. Check the font licence.
- The owner gives final approval.
