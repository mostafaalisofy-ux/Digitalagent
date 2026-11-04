# AI visual prompts for the SayTamm website

> **Status (2026-11-04): all 9 received and placed** (W-020). Masters are in `brand/visuals-ai/`; web versions in `site/public/visuals/`, trimmed 24 px per edge (more on Contact and 404) to remove generation edge lines. `services-creative` uses about 15% purple, above the 10% guideline, and is accepted. `og-bg-ar` is not used: both OG images share `og-bg-en`, because the brand diagonal is never mirrored.

For generating supporting visuals with an image model (for example ChatGPT image generation). Date: 2026-11-04.

## 1. What may and may not be generated

| ✅ May be AI-generated (illustrative, makes no factual claim) | ❌ Must never be AI-generated (would be fabricated proof) |
|---|---|
| Abstract or editorial art for the four service disciplines | Campaign visuals, ads or screenshots for any case study |
| About page atmosphere image (abstract; no office, city or people that imply a real place or team) | Client or brand logos (the 12 brands) |
| Contact page and 404 texture | Team, office or workspace photos |
| Open Graph / social share backgrounds (the official logo is added afterwards by us) | Any image of the founder (the real photo is in use) |
| | Charts, dashboards or results imagery that look like real data |
| | The SayTamm logo itself: AI cannot reproduce it exactly. We add the official file afterwards |

Case studies without visuals keep the editorial facts panel until the real campaign assets arrive (OQ-41).

## 2. Shared art direction (included in every prompt below)

Paste this block at the end of every prompt:

> **Style rules:** premium dark editorial art direction for a digital marketing and performance agency. Colour palette strictly limited to near-black obsidian (#09090D), deep graphite (#17171E), soft off-white (#F5F3FA), and ONE restrained accent of electric purple (#6C35FF) covering no more than 10% of the image. Strong geometry built on clean 45-degree rising diagonals, from bottom-left to top-right. Architectural, matte materials (brushed metal, matte stone, frosted glass, paper). Soft directional light, deep shadows, high contrast, generous negative space, minimalist composition. Photographic realism, shot like high-end architectural or product photography, 35mm lens, shallow depth of field. **Do not include:** any text, letters, numbers, logos, symbols, icons, user-interface elements, screens, charts, people, faces, hands, recognisable buildings or landmarks, flags, neon glow, lens flares, particles, bokeh orbs, rainbow or multicolour gradients, or a cartoon or 3D-render look.

Delivery: export **WebP or high-quality JPG**, sRGB, at the size listed. Keep the original PNG as a master.

## 3. Prompts

### 3.1 Services: one image per discipline (4 images)
Size **2400 × 1350 px (16:9)**. Placement: top of each discipline block on `/services/`. Files go in `site/public/visuals/`.

**01 Strategy & Consulting:** `services-strategy.webp`
> A single sheet of heavy off-white paper resting on a matte graphite surface, folded along one precise 45-degree diagonal crease that rises from bottom-left to top-right, casting a long, sharp shadow. A thin line of electric purple light runs exactly along the fold. Calm, deliberate, the feeling of a plan being set before anything moves. Overhead three-quarter view, lots of dark empty space on the left for layout. [+ style rules]

**02 Creative & Content:** `services-creative.webp`
> Several translucent frosted-glass panels standing upright in a dark studio, overlapping at slightly different depths, each edge cut at a 45-degree angle. One panel carries a soft electric purple tint; light passes through and projects layered diagonal shapes onto the floor. Feels like ideas being composed and tested in variations. Low, wide angle, deep shadows. [+ style rules]

**03 Media & Performance:** `services-media.webp`
> A long, precise brushed-metal bar or track rising at a 45-degree diagonal across a dark graphite space, with a single small electric-purple element sliding along it, motion suggested by a very subtle streak. A sense of momentum, direction and controlled acceleration. Clean architectural lighting from the top right. Minimal, lots of negative space. [+ style rules]

**04 Digital & Technology:** `services-digital.webp`
> Macro photograph of a precisely machined dark metal surface with a fine engraved grid, crossed by one clean 45-degree diagonal channel. A thin electric purple light sits inside the channel. Precision, measurement and systems, with no screens or electronics visible. Very shallow depth of field, the grid fading into darkness. [+ style rules]

### 3.2 About page: atmosphere image (1 image)
Size **2560 × 1100 px (21:9)**. Placement: below the About intro. File: `about-atmosphere.webp`
> A minimalist architectural interior detail in deep shadow: a smooth matte stone wall and floor meeting at a sharp edge, cut by one wide beam of soft daylight falling at a 45-degree diagonal. A slim electric purple line is inset in the floor and follows the diagonal. Quiet, confident, built to last. No furniture, no people, no windows showing a city. [+ style rules]

### 3.3 Contact page: side texture (1 image)
Size **1600 × 2000 px (4:5)**. Placement: behind or under the contact intro, at low opacity. File: `contact-texture.webp`
> Extreme close-up of layered dark graphite paper sheets, each cut with a clean 45-degree diagonal edge, stacked with small offsets so their edges form a rising staircase of thin highlights. One edge is lit with a faint electric purple rim light. Tactile, quiet, very dark overall so text can sit on top. [+ style rules]

### 3.4 404 page (1 image)
Size **1600 × 1200 px (4:3)**. File: `404-texture.webp`
> A single clean diagonal cut through a dark matte surface, revealing an empty gap of darkness beneath, with a thin electric purple glow at the very bottom of the gap. Minimal and slightly playful: something is missing here. [+ style rules]

### 3.5 Social share (Open Graph) backgrounds (2 images)
Size **1200 × 630 px**. Files: `og-bg-en.webp`, `og-bg-ar.webp`. **The official SayTamm logo and the text are added by us afterwards: generate the background only.** Leave the right third empty for the EN version and the left third empty for the AR version.
> Abstract dark composition: a large off-white geometric plane and a separate electric purple plane, both cut on precise 45-degree diagonals, floating over a near-black background with soft shadows. Large empty area on the [right / left] third for a logo. [+ style rules]

## 4. After generating

1. Check each image: no text, letters or fake logos, no faces, nothing that looks like a real ad, screen or chart, and the purple accent used sparingly.
2. Send the files and we'll place them, compress them, add `alt` text in both languages, and check them against the dark palette and in RTL.
3. AI-generated images are recorded in `docs/DECISION_LOG.md` as illustrative only. They never appear next to case-study results as if they were campaign material.
