# Production release checklist

Date: 2026-11-05. **Nothing has been deployed, published or indexed.** No DNS, hosting or account settings were changed. The final decision to release belongs to the owner.

## Environments

| | Staging | Production |
|---|---|---|
| Build | `npm run build` (default) | `npm run build:production` (`PUBLIC_STAGE=production`) |
| Indexing | `noindex, nofollow` on every page; robots `Disallow: /` | Indexable; robots `Allow: /` + sitemap |
| Preview bar | Shown | Hidden |
| Case figures | Shown with "Pending confirmation" tag | Withheld unless the case is `approved` |
| Saudi GEA | Shown, tagged | Hidden |
| 404 and root redirect | noindex | noindex |

## Gate

| # | Item | State | Evidence / owner action |
|---|---|---|---|
| 1 | Final approved content | **Done** — owner-approved 2026-11-05 (D-019) | — |
| 2 | Case studies | **Done for presentation**; figures withheld in production | Exports needed to publish figures (OQ-32) |
| 3 | Client identities | Owner-asserted; written permissions not on file | Recommended: email confirmation per client (`CLIENT_AND_BRAND_APPROVAL_REGISTER.md`) |
| 4 | Legal review | **Outstanding — blocks launch** | Counsel reviews `/privacy/`; Steps checklist (`LEGAL_AND_PRIVACY_REVIEW.md` §4) |
| 5 | Privacy requirements | Draft notice live in staging, labelled; no cookies or tracking | Legal details + provider names; then `SITE.legalReviewed = true` |
| 6 | Contact functionality | **Done** — mailto, tested; honest wording | Optional: backend (`CONTACT_AND_CRM_INTEGRATION.md`) |
| 7 | SEO configuration | **Done** — `seo.js` 680/680 in both builds | Submit sitemap after launch |
| 8 | Analytics and consent | Not installed (correct) | IDs + consent mechanism before adding any tag |
| 9 | Responsive QA | See `QA_REPORT.md` | — |
| 10 | Accessibility QA | See `QA_REPORT.md` | — |
| 11 | Build success | `npm ci`, `npm run check`, both builds | See `QA_REPORT.md` |
| 12 | Native Arabic review | **Outstanding — blocks launch** | Reviewer signs off `ARABIC_ENGLISH_QA.md` |
| 13 | Hosting configuration | **Prepared for Cloudflare Pages** (`_redirects`, `_headers`, guide; tested with `wrangler pages dev`) — not deployed | Follow `DEPLOY_CLOUDFLARE.md` after the launch instruction |
| 14 | Domain configuration | **Not done** (do not change DNS without the owner) | `saytamm.com` → `www.saytamm.com` 301; keep existing MX/SPF/DKIM records for email |
| 15 | Redirects | **Done for Pages:** `/` → `/en/` 301 in `_redirects`; 404 page served automatically | Apex → www as a Cloudflare Redirect Rule (guide §3) |
| 16 | Sitemap | **Done** — 26 URLs with hreflang | — |
| 17 | robots.txt | **Done** — by stage | Confirm production file after deploy |
| 18 | Final smoke test | After deploy | Open every page in both languages; submit the form; check `robots.txt`, `sitemap.xml`, no `noindex` on content pages |
| 19 | Launch authorisation | **Pending** | Owner's explicit instruction |

## Readiness

**Technically ready, awaiting approvals and legal review.** Items 4, 5, 12, 13, 14 and 19 must be completed before a public launch.
