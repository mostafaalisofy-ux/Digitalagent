# SEO Strategy

## Principles [RECOMMENDATION]
- Build the architecture around **real services and real buyer intent**, not keyword lists.
- **One page per intent cluster.** No near-duplicate pages, no keyword stuffing, no city doorway pages.
- Arabic is optimised **natively**: Arabic searchers use different phrasing, not translated English.
- Search volumes and difficulty are **not stated here**. They must be pulled from a keyword tool (Google Keyword Planner, Ahrefs or Semrush) for KSA before content is finalised. **[MISSING]** tool access: OQ-22.

## Intent clusters → pages

| Cluster | EN seed terms | AR seed terms (to validate) | Target page |
|---|---|---|---|
| Agency (brand-level) | digital marketing agency Saudi Arabia · digital marketing agency Riyadh* | شركة تسويق رقمي في السعودية · وكالة تسويق رقمي · شركة تسويق الكتروني بالرياض* | Home |
| Performance | performance marketing agency Saudi Arabia · performance marketing · ROAS optimization | التسويق بالأداء · وكالة تسويق بالأداء · تحسين العائد على الإنفاق الإعلاني | /services/performance-marketing |
| Media buying | media buying agency Saudi Arabia · paid media management · media planning | شراء الوسائط الإعلانية · إدارة الحملات الإعلانية · الإعلانات الممولة | /services/media-buying |
| Strategy | digital marketing strategy · go-to-market strategy KSA · marketing planning | استراتيجية التسويق الرقمي · خطة تسويقية · دخول السوق السعودي | /services/strategy |
| Data & measurement | marketing analytics · conversion tracking · GA4 setup · marketing dashboards | تحليلات التسويق · تتبع التحويلات · لوحات قياس الأداء | /services/data-analytics |
| Lead generation | lead generation agency · real estate lead generation | توليد العملاء المحتملين · تسويق عقاري | Performance page (section); industry page later |
| E-commerce | e-commerce marketing agency KSA · e-commerce growth | تسويق المتاجر الإلكترونية | Performance page (section); industry page later |
| Thought leadership | (long-tail questions) | (long-tail questions) | /insights/* |

\* City terms are used **only if SayTamm has a real presence there** (OQ-09). Do not build city pages without an address and team.

## On-page standards
- Title: `[Primary intent] | SayTamm` (≤ 60 chars), localised; Arabic titles written natively.
- Meta description: ≤ 155 chars, with the outcome and a CTA verb.
- One `h1` per page that matches the intent. Supporting `h2`s answer the buyer's real questions (what, how, for whom, proof, next step).
- Internal links: every service page links to the Approach page, a relevant case study (when available) and Contact. Insights articles link to the matching service.
- Images: descriptive filenames and localised alt text.

## International / bilingual SEO
- Subdirectories `/en/` and `/ar/` on one domain (consolidates authority, simple to host).
- `hreflang`: `en`, `ar` (or `en-SA` / `ar-SA` if SayTamm only targets KSA, which is cleaner given the stated market; **decide with OQ-06**) plus `x-default`.
- **No automatic IP or language redirects.** Show a language switch instead; Google discourages forced redirects.
- **Slugs:** Latin in both locales (e.g. `/ar/services/performance-marketing/`). Arabic-script slugs become long percent-encoded strings when shared and add no meaningful ranking value; Arabic titles, headings and metadata carry the relevance.

## Technical SEO checklist
- [ ] `sitemap-index.xml` with locale alternates; submitted in Search Console (both language properties tracked)
- [ ] `robots.txt` (allow all production; disallow staging; block `/contact/thank-you/` from indexing via `noindex`)
- [ ] Canonicals self-referencing per locale
- [ ] JSON-LD: `Organization` (logo, sameAs: verified social profiles only), `WebSite`, `BreadcrumbList`, `Service` per service page, `Article` for insights, `CreativeWork` for case studies; `LocalBusiness` only with a verified address
- [ ] Open Graph and X cards with 1200×630 localised OG images (needs logo artwork)
- [ ] 404 page in both languages, with links back
- [ ] Core Web Vitals within budget (see `TECHNICAL_ARCHITECTURE.md`)
- [ ] Bing Webmaster Tools alongside Google Search Console
- [ ] Google Business Profile, **only once a verifiable address exists**

## AI search visibility [RECOMMENDATION]
AI answer engines increasingly shape agency shortlists. Support them with clear entity facts (who SayTamm is, where, what services) stated consistently across the site, schema and profiles. Use concise answer-style paragraphs near the top of service pages, and keep LinkedIn and other profiles consistent with the site.

## Content plan for Insights (post-launch)
Start with 3–5 articles that demonstrate thinking rather than chase volume, for example:
- How to read a performance report: what happened, why, what happens next.
- Lead quality vs lead volume in Saudi real estate marketing.
- Measurement foundations before scaling paid media.
Each article must be written natively in Arabic and English, not translated one from the other.
