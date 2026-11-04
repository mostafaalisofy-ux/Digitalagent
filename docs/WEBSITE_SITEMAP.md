# Website Sitemap & Page Architecture

## Evaluating the proposed sitemap [RECOMMENDATION]

Proposed in the brief: Home · About · Services · Strategy & Performance · Selected Work · Case Studies · Insights · Contact.

| Proposed | Recommendation | Why |
|---|---|---|
| Strategy & Performance | **Merge** into Services, and create **Approach** | It duplicates Services. The *method* (Say → Tamm → Prove) is the real differentiator and deserves its own page |
| Selected Work + Case Studies | **Merge** into one **Work** section (index + detail) | Two sections for the same content split authority, create thin pages and confuse attribution. One index, with "featured" flags |
| Insights / Journal | **Keep, but launch later** | An empty or one-post journal signals inactivity. Launch it once 3–5 strong articles exist |
| Home, About, Services, Contact | Keep | — |

## Recommended architecture

Navigation (5 items + CTA): **Work · Services · Approach · About · Insights** · [**Start a project**] · EN/ع

```
/{lang}/                              Home
/{lang}/services/                                  Services overview (4 pillars, 9 services; D-003 / P-010)
/{lang}/services/digital-marketing-strategy/        Pillar 01 Strategy & Brand
/{lang}/services/branding/
/{lang}/services/performance-marketing/             Pillar 02 Media & Performance (paid media: Google, Meta, Snapchat, TikTok, LinkedIn)
/{lang}/services/seo/
/{lang}/services/social-media-marketing/            Pillar 03 Content & Social
/{lang}/services/content-marketing/
/{lang}/services/media-production/
/{lang}/services/website-development-cro/           Pillar 04 Data & Conversion
/{lang}/services/analytics-growth/
/{lang}/approach/                     How we work: Say → Tamm → Prove
/{lang}/work/                         Work index      (launch when ≥ 2 approved studies)
/{lang}/work/{slug}/                  Case study
/{lang}/about/                        Who we are, leadership, experience (Category C lives here)
/{lang}/insights/                     Journal         (launch when 3–5 articles exist)
/{lang}/insights/{slug}/
/{lang}/contact/                      Business inquiry
/{lang}/contact/thank-you/            Confirmation (noindex), conversion event
/{lang}/privacy/                      Privacy notice (PDPL)
/{lang}/terms/                        Terms of use
/404
```

`{lang}` = `en` | `ar`. URL slugs use Latin characters in both languages; titles, headings and metadata are fully localised. See `SEO_STRATEGY.md` for the reasoning and for default-language handling (OQ-06).

Optional later: `/{lang}/performance-audit/` (offer landing page, if the audit offer is approved), `/{lang}/careers/`, and industry pages once case studies support them.

## Page purposes

| Page | Primary job | Primary CTA | Secondary |
|---|---|---|---|
| Home | Make the right buyer understand *why SayTamm* within 30 seconds | Start a project | See how we work |
| Services overview | Help buyers self-identify their need | Start a project | Each service page |
| Service page | Rank for the service, explain the outcome and method, qualify | Start a project (service pre-selected) | Related case study |
| Approach | Prove *how we think*; supports sales conversations | Start a project | Services |
| Work index / case | Proof | Start a similar project | Next case |
| About | Trust: people, principles, experience, legal presence | Start a project | Approach |
| Contact | Convert a qualified inquiry | Submit | WhatsApp (if approved) |

## Homepage narrative [RECOMMENDATION — refines the brief's hypothesis]

The page follows the brand's own logic: **Say → Tamm → Prove → Start.**

| # | Section | Content | Notes |
|---|---|---|---|
| 01 | **Hero** | Display line (e.g. *"Say it. Tamm it."* or *"From brief to measurable outcome."*), a one-sentence value proposition, primary CTA, and the T-frame or diagonal motion moment | Dark canvas, signature mark, low-opacity pattern. The only saturated colour is the CTA. Logo-motion principle on load (fast, not a loading screen) |
| 02 | **The belief** | "Marketing without direction is just activity." Short manifesto: 3–4 lines | Brand philosophy. Editorial type, lots of space |
| 03 | **What we do** | Four pillars (Strategy & Brand · Media & Performance · Content & Social · Data & Conversion), each with its outcome line and its services listed as links | **Not nine generic cards.** A numbered editorial list with the diagonal as the divider/indicator |
| 04 | **How we move** | Say → Tamm → Prove. Three steps, each with what happens and what the client gets | Scroll-linked diagonal progress indicator |
| 05 | **Proof** | Approved case studies (large campaign imagery) **or**, before launch-ready work exists, leadership experience plus the audit offer | Never fabricated. Swaps to real work when approved |
| 06 | **Numbers that matter** | Only verified KPIs, in large type with purple on the one number that matters | **Omitted entirely** until verified figures exist |
| 07 | **Why SayTamm** | Differentiation pillars (connected · ownership · speed · Saudi/global · evidence) | Short and confident. No superlatives |
| 08 | **Start** | "Say it." → inquiry CTA, with a short form preview or a direct link | The final CTA reads like the brand's verbal signature |

Sections 02 and 07 can merge if the page runs long. The aim is a short, dense, decisive homepage, not maximum scroll.
