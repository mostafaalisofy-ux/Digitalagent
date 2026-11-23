# Launch materials generator

```bash
python3 docs/launch/content/build_posts.py
```

```bash
node tools/launch/build-launch.mjs
```

The first command merges the corrected captions (`docs/launch/content/captions_v2.py`) into `posts_v2.json` and checks the X and TikTok limits and the prompt palette. The second builds, in `handover/launch/` (not in Git):

- `SayTamm_Launch_Playbook_v2.pdf` — 18 pages, strategy and sign-off reference
- `SayTamm_14Day_Content_Book_v2.pdf` — 60 pages: per day a brief, Arabic captions, English captions and the production prompt
- `SayTamm_14Day_Content_Book_v2_interactive.html` — working version: copy buttons, character counts, status per day (kept in the browser)

It checks for broken images, text overflowing a page and clipped caption boxes, and smoke-tests the interactive file. The outputs embed Satoshi: internal use only.
