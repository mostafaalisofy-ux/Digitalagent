# Visual Identity — Reconciled Specification

This is the single working spec for designers and developers. It reconciles the Brand Bible, the Visual Identity Guidelines 2026 and the Full Visual Guidelines. Conflicts and how they were resolved: `PROJECT_AUDIT.md` §3. Source files: `/brand`.

## 1. Logo

### Master symbol [APPROVED]
- **T + completion.** A strong T-form plus a separate diagonal completion element, divided by a fixed gap. It is *not* a checkmark glyph.
- **Geometry is locked.** Never redraw, reinterpret, distort, rotate, re-angle, shadow, bevel or gradient-fill it.
- **Anatomy:** T-bar (rounded terminals) · T-stem (vertical anchor, with an angled cut parallel to the blade) · diagonal blade · inner negative space (never closed).
- **Measured [CONFIRMED, 2026-11-04]:** W:H ≈ **0.83 : 1**. Diagonal ≈ **45°** from horizontal (edge 44.3°, principal axis 47.2°).
  > ⚠️ The 2026 Guidelines, PDF and asset README state "≈ 65°". **That is a measurement error.** Use 45° for every derived element (pattern, icons, dividers, wipes).
- **Master files:** `/brand/assets/logo/*.png` (verified at 99.2–99.97% overlap against the owner's master renders).
- **[MISSING] Vector master.** Needed before any production use (OQ-05). We will not auto-trace and publish without approval: a trace counts as a redraw. **[RECOMMENDATION]** The original designer supplies the vector. Failing that, we produce a precision trace, verify it against the master (IoU ≥ 0.995 at 1254 px), and submit it for written approval.

### Versions
| Version | Status | Use |
|---|---|---|
| Solid black | [APPROVED] **Default on light** | Most placements |
| Solid white | [APPROVED] **Default on dark** | Most placements; the website default |
| Solid Electric Purple | [APPROVED] Special use | One hero moment per surface, never the default |
| Outline black / white | [APPROVED] Special use | Light production footprint, glass, dense layouts |
| **Signature two-tone** (white or black T + Electric Purple blade) | **[APPROVED — D-007]** Special use | Hero moments: website hero, covers, app icon, key visuals. A recolour of two existing, separate shapes, so geometry is untouched. Solid mono stays the default everywhere else |

### Wordmark & lockups
- **Direction [APPROVED — D-008]:** **"SayTamm"** in mixed case. Satoshi Bold is the base, to be custom-drawn and optically refined. "Tamm" may be set in Electric Purple on the Signature lockup only; the mono lockups are single colour.
- **[MISSING] No wordmark artwork exists** (OQ-05). Until the drawn vector exists, **no lockup ships to production**. Per the brief, the logo must never be approximated with ordinary text. Design explorations may use Satoshi Bold as a clearly marked placeholder.
- Lockup architecture [APPROVED]: horizontal (symbol + wordmark: proposals, site header, decks) · stacked (square/social) · English · Arabic · bilingual · symbol-only (app icon, avatar, favicon).
- Horizontal lockup spacing [SOURCE: 2026 Guidelines]: minimum ½ icon height between symbol and wordmark. The wordmark baseline aligns to the icon's optical centre.

### Clear space & size
- **Clear space:** 1X on all sides, where **X = height of the diagonal element** [APPROVED, 3 of 4 sources]. Give it a numeric value once the vector exists.
- **Minimum size [RECOMMENDATION, resolving C6]:** symbol 24 px digital (32 px+ preferred), lockup 120 px wide; print symbol 6 mm (10 mm+ preferred), lockup 30 mm wide. A favicon may go to 16/32 px only after a legibility test, using a purpose-tuned export.
- **Backgrounds [APPROVED]:** solid White, Black or Electric Purple. Anything else needs a contrast check. Never place the mark on busy photography.

## 2. Colour

### Palette [APPROVED — Bible values; the Full Visual Guidelines' alternates are rejected]
| Token | Name | HEX | RGB | CMYK |
|---|---|---|---|---|
| `--st-black` | Black | `#0A0A0D` | 10 10 13 | 77 68 62 87 |
| `--st-white` | White | `#FFFFFF` | 255 255 255 | 0 0 0 0 |
| `--st-purple` | Electric Purple | `#6C35FF` | 108 53 255 | 72 82 0 0 |
| `--st-purple-100` | Purple 100 | `#8B5CF6` | 139 92 246 | 63 58 0 0 |
| `--st-purple-200` | Purple 200 | `#A78BFA` | 167 139 250 | 44 39 0 0 |
| `--st-purple-900` | Purple 900 | `#24105C` | 36 16 92 | 89 96 0 42 |
| `--st-neutral-100` | Neutral 100 | `#F5F5F7` | 245 245 247 | 3 2 0 0 |
| `--st-neutral-500` | Neutral 500 | `#A4A4AE` | 164 164 174 | 26 21 15 0 |
| `--st-neutral-900` | Neutral 900 | `#17171C` | 23 23 28 | 72 64 55 78 |

There is no Pantone reference; confirm against a physical swatch before print. CMYK values are printer-proofed per job.

### Ratio [APPROVED]
70% black/white · 20% supporting neutrals · **10% Electric Purple**. Purple signals action: CTA, key metric, active state, highlight, brand moment. Never use it as a large background fill (Purple 900 is the deep field option).

### Contrast — measured WCAG 2.x ratios [CONFIRMED]
| Foreground on background | Ratio | Body text (4.5) | Large text / UI (3.0) |
|---|---|---|---|
| White on Black | 19.77 | ✅ | ✅ |
| White on Electric Purple (CTA button) | 5.85 | ✅ | ✅ |
| Electric Purple on White | 5.85 | ✅ | ✅ |
| **Electric Purple on Black** | **3.38** | ❌ | ✅ |
| Purple 100 on Black | 4.67 | ✅ | ✅ |
| Purple 200 on Black | 7.27 | ✅ | ✅ |
| Neutral 500 on Black | 8.00 | ✅ | ✅ |
| White on Neutral 500 / White on Purple 200 | 2.47 / 2.72 | ❌ | ❌ |

**Web rules that follow [RECOMMENDATION]:**
- On dark surfaces, purple **text below 24 px (or 18.66 px bold)** uses **Purple 200**. Electric Purple is reserved for fills, large display text, icons, rules and focus rings.
- The guidelines ban Neutral 500 body copy on Black. That rule is about **hierarchy** (it reads too quiet for long text), not accessibility, since it passes at 8.0. Neutral 500 is fine for captions and metadata.

## 3. Typography

### Families [APPROVED]
- **English:** Satoshi — Regular 400 / Medium 500 / Bold 700. Not Light, not Black.
- **Arabic:** IBM Plex Sans Arabic — Regular / Medium / Bold. SIL Open Font License.
- **Licence [ASSUMPTION]:** Fontshare's licence is understood to allow free commercial use, including web embedding. **Download the licence text and archive it in `/brand/fonts/` before launch (OQ-18).** Self-host both families with no third-party font CDN.
- **Display alternates** (Clash Display, Space Grotesk) [SOURCE]: campaigns only, never on the website core.

### Print & deck hierarchy [APPROVED — Bible slide 25]
Display 48–72 pt Bold / 1.05 · H1 32–44 Bold / 1.1 · H2 24–30 Medium / 1.15 · Body 16–18 Regular / 1.4 · Caption 11–13 Medium / 1.3 · KPI Bold, tight tracking / 1.1.

### Web type scale [RECOMMENDATION — fluid, 360 → 1440 px viewport]
| Token | Size (`clamp`) | Weight | Line-height EN / AR |
|---|---|---|---|
| `display` | `clamp(3rem, 2rem + 4.4vw, 6rem)` (48 → 96 px) | 700 | 1.0 / 1.2 |
| `h1` | `clamp(2.25rem, 1.8rem + 2vw, 3.5rem)` (36 → 56) | 700 | 1.05 / 1.25 |
| `h2` | `clamp(1.75rem, 1.5rem + 1.1vw, 2.5rem)` (28 → 40) | 500 | 1.1 / 1.3 |
| `h3` | `clamp(1.25rem, 1.15rem + .45vw, 1.5rem)` (20 → 24) | 500 | 1.2 / 1.4 |
| `body-lg` | `1.25rem` (20) | 400 | 1.5 / 1.7 |
| `body` | `1.0625rem` (17) | 400 | 1.55 / 1.75 |
| `caption` | `0.8125rem` (13) | 500 | 1.4 / 1.6 |
| `eyebrow` | `0.75rem` (12), uppercase, +0.12em tracking (**EN only**) | 500 | 1.2 |
| `kpi` | `clamp(3rem, 2rem + 5vw, 7.5rem)`, `tabular-nums`, −0.02em | 700 | 1.0 |

Arabic rules: no letter-spacing ever, no uppercase equivalent (Arabic eyebrows use Medium weight plus a purple rule instead), and Arabic line-height runs 150–175% [SOURCE: Full Visual Guidelines]. Match EN/AR by **weight and visual size, not point size**. Plex Arabic often needs about +5–10% size to balance Satoshi; tune it in the specimen phase.

## 4. Graphic language

### Diagonal gesture [APPROVED]
The diagonal element, **isolated** from the mark, is the visual DNA. Use it as a crop, underline, divider, progress indicator, frame, mask, or directional cue.
- Source unit: `/brand/assets/pattern/diag_*.png` (real pixel extraction, not a redraw). Angle ≈ 45°.
- **Never** repeat the complete logo as decoration.

### T-frame [APPROVED]
A thick horizontal bar anchors headlines; the vertical stem acts as a grid alignment reference. The frame must never get heavier than the content.

### Pattern [APPROVED]
The diagonal element only, on a brick-offset modular grid, with generous negative space. Opacity is 8–18% behind content; full strength only for campaign, motion or environmental use. One direction per composition, one element size per tile, no recolouring within an instance. Spacing uses 8 px multiples. Keep critical text out of dense areas.
Approved treatments (8): dense purple-on-black · sparse purple-on-white · ghost white-on-black · mono black-on-neutral · accent corner · Purple-900 field · oversized scale · fine texture.

### Performance language [APPROVED — Bible slide 28]
Large numbers. Simple bars, lines and directional indicators. **Purple only for the variable that matters.** Charts must be legible before they are branded.

## 5. Layout — digital [SOURCE: Full Visual Guidelines; adopted for web]
| | Mobile 320–767 | Tablet 768–1023 | Desktop 1024–1439 | Wide 1440+ |
|---|---|---|---|---|
| Columns | 4 | 8 | 12 | 12 (max-width container) |
| Side margin | 20 px | 40 px | 64 px | auto (content max 1280 px) |
| Gutter | 16 px | 24 px | 24 px | 24 px |

Spacing tokens (8 px base): 4 · 8 · 16 · 24 · 32 · 40 · 48 · 64 · 80 · 96 · 128 · 160.
Section rhythm [RECOMMENDATION]: 96–160 px vertical on desktop, 64–96 px on mobile.

## 6. Imagery [APPROVED]
- Real people doing real work: decisions, screens, data moments, believable environments. Strong directional light. Confident, asymmetric crops.
- Avoid: staged handshakes, exaggerated smiles, generic office stock, full-purple scenes.
- AI imagery: a production tool, not the identity. Photorealistic, natural skin tones, purple only as a controlled accent. **Never fabricate people presented as staff or clients, client logos, or data.**
- **Campaign work in case studies uses the original campaign assets**, never stock substitutes.

## 7. Motion [APPROVED principle — Bible slides 41–42]
- Logo: start with the T-form → the diagonal moves decisively into place → hold → clean static lockup. Fast, precise, controlled.
- System: diagonal wipes, progressive line reveals, metric counters, short directional moves, micro-interactions that reinforce completion.
- [RECOMMENDATION] Durations 150–400 ms for UI and up to 900 ms for hero choreography, with an ease-out-expo curve. Every motion has a `prefers-reduced-motion` fallback. No loading screens.

## 8. Explicitly prohibited
Generic agency gradients · glassmorphism · glow and particle effects · stock 3D illustrations · stock-mockup clichés · decorative elements without purpose · centring everything (keep the diagonal directional) · more than two type families in one asset.
