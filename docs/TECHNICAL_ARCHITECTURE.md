# Technical Architecture

## Current state [CONFIRMED]
Empty repository (README only). No framework, no dependencies, no hosting, no domain configured. Greenfield.

## Recommended stack [RECOMMENDATION — needs approval, OQ-20]

| Layer | Choice | Why |
|---|---|---|
| Framework | **Astro 5** (TypeScript, static-first, server endpoints where needed) | Content-led marketing site: ships near-zero JS by default (best Core Web Vitals), built-in i18n routing, typed content collections for services, case studies and articles, and the View Transitions API for meaningful page motion. Islands allow interactive pieces without a heavy SPA |
| Styling | **Plain CSS with design tokens** (custom properties) + **CSS logical properties** | RTL works naturally (`margin-inline-start`, not `margin-left`). No styling framework dependency. Tokens map 1:1 to `VISUAL_IDENTITY.md` |
| Content | **MDX/Markdown in Git** (content collections, Zod-validated schemas) at launch | No CMS cost or lock-in while content volume is small. Schema validation enforces EN/AR parity and case study approval fields |
| CMS (later) | Headless CMS (e.g. Sanity, Payload or Decap) **when non-developers need to publish** | Deferred decision; the content model is designed to migrate cleanly |
| Motion | CSS + Web Animations API; a small GSAP layer only for hero choreography if needed | Minimal dependencies; always honours `prefers-reduced-motion` |
| Forms | Astro server endpoint → email (transactional provider) + CRM webhook; Cloudflare Turnstile | Validation on both client and server; no third-party form widget |
| Images | Astro `<Image>` → AVIF/WebP, responsive `srcset`, width/height set, lazy below the fold | Campaign imagery is heavy; this keeps LCP under control |
| Video | Self-hosted MP4/WebM with poster frames, or a privacy-friendly host; never autoplay with sound | Case study reels |
| Hosting | Vercel, Netlify or Cloudflare Pages (**OQ-21**) | All support Astro static + server endpoints, previews per branch, and edge CDN |
| Analytics | GTM + GA4 + consent mode; platform CAPIs as approved | See `WEBSITE_STRATEGY.md` |

**When Next.js would be the better choice:** if a client portal, login, live dashboards or app-like features are planned within 6–12 months. Astro is the right tool for the site as briefed; Next.js is right for a product. **This is the key question behind OQ-20.**

## Project structure (planned)
```
/brand                     Source brand files (read-only)
/docs                      Knowledge base
/site                      Website (Astro)            ← created in Phase 05
  /src/content/            services, work, insights, pages (en/ + ar/)
  /src/components/         UI components (direction-agnostic)
  /src/layouts/            Base layout per locale
  /src/styles/tokens.css   Design tokens from VISUAL_IDENTITY.md
  /src/i18n/               UI strings (en.json, ar.json), routing helpers
  /public/fonts/           Self-hosted Satoshi + IBM Plex Sans Arabic (WOFF2, subset)
```

## Internationalisation & RTL
- Routes are `/en/...` and `/ar/...` with Astro i18n routing. The default-language strategy is OQ-06.
- `<html lang="ar" dir="rtl">` per locale. All layout uses logical properties. Icons that imply direction (arrows, the diagonal indicator) flip via `:dir(rtl)`; **the logo never flips**.
- Per-locale font stacks: `"Satoshi", system-ui` (EN) and `"IBM Plex Sans Arabic", "Satoshi", system-ui` (AR), so Latin terms inside Arabic copy render in Plex Arabic's own Latin glyphs for consistent texture.
- Font loading: WOFF2, subset (Latin; Arabic + Arabic Presentation Forms), `font-display: swap`, preload only the hero weight per locale.
- Numbers: `Intl.NumberFormat` per locale, with a numeral style per OQ-17.
- A content parity check at build time fails if a page lacks its counterpart.

## Performance budget [RECOMMENDATION]
| Item | Budget |
|---|---|
| JS (per page, compressed) | ≤ 50 KB (excluding analytics) |
| CSS | ≤ 40 KB |
| Fonts | ≤ 2 weights preloaded per locale |
| LCP image | ≤ 200 KB, AVIF |
| Lighthouse (mobile) | ≥ 95 Performance / 100 Accessibility / 100 Best Practices / 100 SEO |

## Accessibility (target: WCAG 2.2 AA)
Semantic landmarks · skip link · visible focus (Electric Purple ring, ≥ 3:1) · keyboard-complete navigation and forms · form labels and error association (`aria-describedby`) · contrast rules per `VISUAL_IDENTITY.md` §2 · `prefers-reduced-motion` · alt text in both languages · no information conveyed by colour alone.

## SEO plumbing
Per-page title and description (localised) · canonical · `hreflang` (en, ar, x-default) · Open Graph and X cards (localised OG images) · JSON-LD (Organization, WebSite, BreadcrumbList, Service, Article, CreativeWork for case studies; LocalBusiness **only** with a verified address) · `sitemap-index.xml` with alternates · `robots.txt` · noindex for thank-you, preview and staging. Details: `SEO_STRATEGY.md`.

## Privacy & compliance [RECOMMENDATION — requires legal review]
- **Saudi PDPL** governs personal data collected through forms and tracking. Needed: a privacy notice (EN/AR), purpose-specific consent on the form, a cookie/consent banner controlling non-essential tags, data retention rules, and a named contact for data requests.
- Where form data is stored and processed (CRM and email provider regions) should be reviewed against PDPL cross-border transfer rules.
- Footer legal block: entity name, CR number, VAT number. **All [MISSING]** (OQ-09).

## Environments & release
`main` → production (after launch authorisation only). Branch previews for every PR. Staging is password-protected and `noindex`. **No DNS change or production deploy without explicit owner authorisation.**

## Quality gates (CI)
Type-check · build · HTML validation · link check · Lighthouse CI against the budgets · axe accessibility scan (EN and AR) · EN/AR content parity check.
