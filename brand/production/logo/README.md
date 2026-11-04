# SayTamm Symbol — Production Files v1

Status: **v1. Derived from the approved logo (D-011).** The owner confirmed on 2026-11-04 that the solid black, outline black and outline white renders in `source/` are the approved logo. These files are traced and recoloured from them, never redrawn. Built 2026-11-04.

| File | Use |
|---|---|
| `SayTamm_Symbol_Black.svg/.png` | **Default on light** backgrounds |
| `SayTamm_Symbol_White.svg/.png` | **Default on dark** backgrounds |
| `SayTamm_Symbol_Purple.svg/.png` | Special use: one hero moment per surface |
| `SayTamm_Symbol_Signature_White-Purple.svg/.png` | **Signature** (D-007) on Black / dark |
| `SayTamm_Symbol_Signature_Black-Purple.svg/.png` | **Signature** (D-007) on White / light |
| `SayTamm_Symbol_Outline_Black.svg/.png` | Outline: light production footprint, glass, dense layouts |
| `SayTamm_Symbol_Outline_White.svg/.png` | Outline on dark |
| `SayTamm_Symbol_Review_v1.png` | Review sheet: all versions plus 16–48 px tests |
| `source/master_black_on_white.webp` | **Approved logo**, solid (1254 px) |
| `source/master_outline_black_on_white.webp` | **Approved logo**, outline (1254 px) |

## How they were made (no redrawing)
1. Source: the owner's master render (black on white, 1254 × 1254). It is the same silhouette as the white-on-black render (IoU 0.9916) and the 27 Aug asset package.
2. The mark splits into exactly **two physical shapes** (connected-component labelling): the T-form (144,751 px) and the diagonal blade (71,928 px). The gap between them is preserved.
3. **PNGs** keep the master's own anti-aliased pixels and are recoloured only. Trimmed size 600 × 721 (W:H = 0.832).
4. **SVGs** are a potrace fit of the 4×-supersampled silhouette, one path per shape, so the two-tone version is a fill change only.
5. **Verification:** the SVG is rasterised in Chromium and compared with the master.
   - Solid: **IoU 0.9992 at 1×, 0.9994 at 4×; maximum edge deviation 1 px.** Acceptance threshold: 0.995.
   - Outline (649 × 776, W:H 0.836, including stroke): **IoU 0.9941; maximum edge deviation 1 px.** Thin strokes have little area relative to their edge length, so the same 1 px fit scores lower IoU. The edge accuracy matches the solid version.

Rebuild: `tools/brand/build_logo.py <master> <out_dir>`, then `tools/brand/rasterize.js` for verification.

## Limits
- The trace reproduces the master **faithfully, including its small raster irregularities**. For example, the blade's lower-left end and the stem's join are slightly uneven in the master render itself. A designer's original vector file, if one exists, should replace v1 (OQ-05).
- PNG resolution is capped by the master (about 600 px wide). **Use the SVG for anything larger.**
- **No wordmark yet.** The lockups need the drawn "SayTamm" wordmark (D-008, OQ-05).
- Colours: Black `#0A0A0D`, White `#FFFFFF`, Electric Purple `#6C35FF`.
