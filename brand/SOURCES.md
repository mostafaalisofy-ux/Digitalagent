# SayTamm — Brand Source Manifest

Last reviewed: 2026-11-04 · Maintainer: project team

This file records every brand source received, its status, and which source wins when they conflict.

> **Storage status (2026-11-04):** the files listed below (`assets/`, `source/`, `reference/`) are **not yet committed** to this repository. They are held outside Git until the owner decides what may be stored in the remote: all files, the production asset package only, or none. See OQ-29 in `docs/OPEN_QUESTIONS.md`. Paths in this manifest describe the intended layout.
Nothing in `/brand` has been redrawn, re-exported or edited. Files were copied byte-for-byte from the uploads, and some were renamed for clarity.

## Authority order (when sources conflict)

1. **Brand Bible 2026** (`source/SayTamm_Brand_Bible_2026.md`). The strategic source the other guideline sets cite. *The original `.pptx` failed to upload (0 bytes, three attempts). The `.md` export is the only readable copy.*
2. **Master icon artwork.** The geometry authority: `reference/master-renders/*` and `assets/logo/*`, verified as the same silhouette (see "Verification" below).
3. **Visual Identity Guidelines 2026** (64 slides, dated 27 Aug 2026) plus the **asset package** in `assets/` (27 Aug 2026). This is the most rigorous and most recent set, and it labels its own recommendations explicitly. Its known errors are listed below.
4. **Full Visual Brand Guidelines 2026** (42 slides, embedded media dated 24 Aug 2026). An earlier and looser set. Use it only for digital specs the other sets lack (px grid, breakpoints, spacing tokens, export formats). Its colour values are **not** used.
5. **Concept boards** (`reference/concept-boards/*`). AI-assisted explorations. They are direction references, not specifications.

## File register

| Path | What it is | Status |
|---|---|---|
| `source/SayTamm_Brand_Bible_2026.md` | Brand Bible, 46 slides, text export | **Authoritative (strategy)** |
| `source/SayTamm_Visual_Identity_Guidelines_2026.pptx` / `.pdf` / `.md` | Visual Identity Guidelines, 64 slides | **Authoritative (visual)**, with the corrections below |
| `source/SayTamm_Full_Visual_Brand_Guidelines_2026.pptx` | Full Visual Brand Guidelines, 42 slides | Secondary: digital specs only |
| `source/SayTamm_Full_Visual_Brand_Guidelines_2026_summary.pdf` | 11-page summary of the above (A4) | Secondary |
| `assets/` | Brand asset package `SayTamm_Brand_Assets.zip` (27 Aug 2026) | **Authoritative production files** (raster only) |
| `reference/master-renders/` | Master icon renders supplied directly by the owner (1254 px) | **Geometry reference** |
| `reference/concept-boards/concept_01–02, 04` | Two-tone logo and application concept boards | Direction reference. Contains placeholder data |
| `reference/concept-boards/concept_03_fold_and_done_checkmark_variant` | "Fold & Done" variant with a bent check stroke | Divergent concept. Conflicts with the Bible ("without relying on a literal checkmark") and with the master artwork. Do not use |
| `reference/concept-boards/concept_05` | Mono solid/outline applications board | Direction reference |

### Received but not usable
| File | Problem |
|---|---|
| `SayTamm_Brand_Bible_2026.pptx` | Upload arrived 0 bytes (3 attempts). The `.md` export covers its text, not its visuals |
| `SayTamm_Professional_Brand_Guidelines_v2.pptx` | Upload arrived 0 bytes (3 attempts). **Content unknown.** Needs re-sending via another channel (Drive link or zip) |

### Older duplicates (not copied)
- `SayTamm_Brand_Assets_1.zip` (24 Aug 2026) has the same logo PNGs (identical hashes) but an **older pattern** that tiles the complete logo. The Bible prohibits that ("Do not repeatedly draw the complete logo as decoration"). It is superseded by the 27 Aug package.

### Referenced but never received
The 2026 Guidelines and the asset README cite a "Master Brand System", an "Art Direction System" and a "Content & Communication System" source deck. None of these were provided. Some 2026 Guidelines values (24 px minimum size, for example) are attributed to the Master Brand System and cannot be verified.

## Verification performed (2026-11-04)

- **Logo geometry.** The package PNGs were compared with the owner's 1254 px master render by mask overlap (IoU). `icon_white.png` scores **0.9997** and `icon_black.png` / `icon_primary_purple.png` score **0.9916**: the same silhouette, extracted slightly differently (588×709 vs 587×711 px trimmed). W:H ≈ 0.83, consistent with the guidelines.
- **Diagonal angle: documentation error found.** The 2026 Guidelines, the PDF and the asset README all state ≈ 65°. Measured on `pattern/diag_white.png`, the blade's long edge sits at **44.3°**, its principal axis at **47.2°**, and its bounding-box diagonal at 50.5°. **The correct working value is ≈ 45°.** The Full Visual Guidelines (iconography slide) also say 45°. The artwork is correct and the text is wrong. Treat "65°" anywhere as an error.
- **Duplicates inside the package.** `icon_purple_mono` = `icon_primary_purple`, `icon_source_navy` = `icon_black`, `icon_source_white` = `icon_white` (identical hashes). "Navy" is a misnomer: the file is Black `#0A0A0D`.
- **Format gap.** All logo files are single-colour raster PNGs of about 600 px. **No vector (SVG/AI/EPS/PDF) master exists** in anything received, though every guideline set says production must use vector artwork. **There is no wordmark artwork of any kind**: "SayTamm" appears only as live text in the decks.
- **Fonts.** The Guidelines PDF does not embed Satoshi, so it renders in a fallback face. Its typography pages do not show the real typeface.
