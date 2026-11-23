# SayTamm — Brand Identity Package (v1.1 · 23 November 2026)

The SayTamm symbol, its patterns and its applications, ready to use. Read `07_Brand_Guidelines/SayTamm_Brand_Guidelines_v1.pdf` and `08_Patterns/SayTamm_Pattern_Guide.pdf` first.

**Source of the artwork:** every logo file is built from the approved production vectors (`brand/production/logo`, decision D-011). Those vectors were traced from the owner's master renders and checked against them: overlap 0.999, maximum edge deviation 1 px. Each version is a colour change of the same two shapes (the T and the blade). Nothing was redrawn or AI-generated. The patterns are vectors built from the brand rules (45° diagonal, brand palette), not traced from the AI proposals.

## Folders

| Folder | Contents | Use it for |
|---|---|---|
| `01_Logo/SVG` | 8 versions | Web, Figma, any vector work |
| `01_Logo/PDF_vector` | 8 versions, true vector | Print, Illustrator, InDesign, signage and print suppliers |
| `01_Logo/PNG_transparent` | 8 versions × 256, 512, 1024, 2048, 4096 px tall | Office documents, social, video |
| `01_Logo/WebP` | 8 versions, 1024 px | Websites |
| `01_Logo/JPG_on_background` | 2048 px squares on the brand colours | Quick previews, where transparency is not supported |
| `02_App_Icons_Favicons` | Purple and Obsidian sets: 16–1024 px, `favicon.ico`, `favicon.svg`, Apple touch icon, Android maskable icon, `site.webmanifest`, `HEAD_SNIPPET.html` | Website, apps, browser tabs |
| `03_Social_Media` | Profile pictures (3); covers for LinkedIn (company + personal), X, Facebook and YouTube; Instagram highlight covers (5, English + Arabic); story and post frames; safe-zone guide | All platforms |
| `04_Stationery` | Business card (print files with 3 mm bleed + trim size), A4 letterhead (PDF + editable Word), DL envelope, e-mail signature (HTML + image) | Print and e-mail |
| `05_Presentation_Template` | Editable 16:9 PowerPoint, 6 layouts | Pitches and proposals |
| `06_Mockups` | The owner's 3D render, business cards, app icons, letterhead | Presentations, portfolio |
| `07_Brand_Guidelines` | 14-page guidelines PDF | Rules: clear space, minimum size, colours, misuse |
| `08_Patterns` | 4 approved patterns (01 Tamm Slash, 02 Completion, 08 Modular Tiles, 05 Layered) × dark/light; SVG masters and PNG in six sizes; pattern guide PDF | Backgrounds for social, covers, slides, print |

## Versions

| Version | When to use it |
|---|---|
| Obsidian | Default on light backgrounds |
| White | Default on dark backgrounds and photography |
| Signature White-Purple | Hero use on dark: covers, profile picture, title slides |
| Signature Obsidian-Purple | Signature on light: letterhead, card back, light slides |
| Purple | One hero moment per surface |
| Outline Obsidian / White / Purple | Light footprint (glass, embossing, dense layouts). Never below 48 px / 12 mm |

## Patterns

| Pattern | Role | Purple in the dark version |
|---|---|---|
| 01 The Tamm Slash | Primary | ≈ 5% |
| 02 The Completion Pattern | Secondary | ≈ 5% |
| 08 The Modular Tiles | Layout system | ≈ 1% |
| 05 The Layered Intelligence | Hero moments only | ≈ 10% |

One pattern per surface. Text goes on a calm area or over a scrim. The symbol never sits on a purple band. Not adopted from the proposals: 03, 04, 06, 07 and 12 (off-identity or logo misuse). 09, 10 and 11 wait for the approved TAMM reference (OQ-56).

## Rules in one line each

- Clear space: 1X on every side, where X is the height of the blade (65.5% of the symbol's height).
- Minimum size: 24 px / 6 mm (outline: 48 px / 12 mm).
- Colours: Obsidian #09090D · Graphite #17171E · Soft White #F5F3FA · Muted #96939F · Electric Purple #6C35FF (accent, 10% or less).
- Never stretch, rotate, mirror the diagonal, recolour outside the palette, add effects, or separate the two shapes.

## Before printing or publishing

1. **Print:** the CMYK values are conversions. Ask the printer for a proof on the actual paper before any run.
2. **Fonts:** the business cards, letterhead and covers embed Satoshi. To edit them in Word or PowerPoint, install Satoshi (Fontshare) and IBM Plex Sans Arabic (Google Fonts) first. Never share the font files themselves.
3. **Business card and letterhead:** the name, title and email are placeholders. No phone number or address appears, because none is approved yet.
4. **E-mail signature:** the image loads from `https://www.saytamm.com/brand/email/saytamm-email-mark.png`, so it appears once the website is live.
5. **Website favicon:** to switch the site to this set, copy `02_App_Icons_Favicons/<set>/` to the site root and use `HEAD_SNIPPET.html`.

## Not included, and why

- **Wordmark and lockups:** no drawn "SayTamm" wordmark exists (OQ-05). Setting the name in a font next to the symbol would be an unapproved logo.
- **EPS / AI files:** the vector PDF and the SVG open directly in Illustrator, InDesign, Figma and print RIPs, and contain the same paths.

Rebuild everything: `node tools/brand/build-identity-package.mjs`
