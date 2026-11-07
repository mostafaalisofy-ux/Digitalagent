# Legal and privacy review

Date: 2026-11-05. **This is a technical and factual preparation for legal review, not legal advice.** No statement here or on the site has been reviewed by legal counsel. Final approval belongs to the owner and qualified counsel.

## 1. What exists on the site

| Mechanism | State | Evidence |
|---|---|---|
| Privacy notice | `/en/privacy/`, `/ar/privacy/` — **DRAFT — LEGAL REVIEW REQUIRED**, label shown on the page until `SITE.legalReviewed = true` | `site/src/pages/[lang]/privacy.astro` |
| Cookie policy | Not needed today: the site sets no cookies | No `document.cookie`, no third-party scripts (build scan: every external URL in the HTML is the site's own canonical/hreflang) |
| Cookie / consent banner | Not needed today: no analytics, pixels or tags are installed | `Base.astro`: only a local `dataLayer` array; no vendor script |
| Terms and conditions | Not created: the site sells nothing and has no accounts. Optional; counsel to advise | — |
| Contact consent | Required checkbox, linked to the privacy notice | `ContactForm.astro` |
| Third-party tracking disclosure | Stated in the notice ("does not run analytics…") | privacy notice §Cookies |
| Retention | Stated as "as long as needed"; **a defined period must be set after review** | privacy notice §How long |

## 2. Data inventory

| Data | Source | Required? | Purpose | Where it goes | Third parties |
|---|---|---|---|---|---|
| Name, work email, company, message | Enquiry form | Yes | Reply to the enquiry | Visitor's own email app → info@saytamm.com (only if the visitor presses send) | SayTamm's email provider (**name to be confirmed**) |
| Role, industry, market, timeline, phone, website, budget, services | Enquiry form | Optional (one service option required) | Qualify the enquiry | Same | Same |
| Click events (`cta_click`, `form_start`, `form_submit`, `email_click`, `case_study_view`, `language_switch`) | `data-track` | — | Ready for future analytics | Kept in the page's memory only (`window.dataLayer`); **not sent anywhere** | None |
| Server logs | Hosting | — | Standard operation | Host | Hosting provider (**not chosen yet**) |

No personal data is placed in `dataLayer` events (they carry event name, CTA id, location, language, page type and, for the form, the service IDs only).

## 3. Facts that must not be invented

Missing and **not** published: legal entity name, CR number, VAT number, registered address, DPO or privacy contact other than info@saytamm.com, email provider, hosting provider, retention period. The draft notice names SayTamm (قول تم) as operator and uses info@saytamm.com (D-010) as the contact, both verified.

## 4. Founder and Steps — neutral checklist for owner and counsel

Context from the project record: SayTamm and Steps KSA are separate companies (D-005); the owner states SayTamm has full rights to use the Steps case studies (D-009) and the client logos shown on steps-ksa.com (2026-11-05); the founder's biography source mentioned a *current* Managing Director role at Steps (OQ-38). The site names no previous agency (OQ-33).

This checklist records questions only. It draws no conclusion.

| # | Question | Who answers | Status |
|---|---|---|---|
| 1 | Brand ownership: is there any overlap in ownership, trademarks or trading names between SayTamm and Steps entities? | Owner, counsel | Open |
| 2 | Portfolio ownership: under the contracts in force when the Steps cases were delivered, who owns the work and the right to show it? Is D-009 documented in writing? | Owner, counsel | Open |
| 3 | Client confidentiality: do the K.S, Muriya, DAMAC and Bio-Group engagements carry confidentiality terms that limit naming the client or publishing results? | Owner, counsel | Open |
| 4 | Image and asset usage: are the campaign images in the case decks owned by the client, the agency or a third party (photographers, stock)? | Owner | Open |
| 5 | Employment or contractual restrictions: does the founder's role at Steps carry non-compete, non-solicitation or exclusivity terms affecting SayTamm? | Owner, counsel | Open |
| 6 | Conflicts of interest: are any SayTamm direct clients also Steps clients, and is that disclosed where required? | Owner | Open |
| 7 | Historical work: is every team-track-record case attributed accurately ("including work delivered at other agencies"), with no implication that SayTamm itself delivered it? | Owner (site wording already does this) | Wording implemented |

## 5. Before launch

1. Counsel reviews the privacy notice against the Saudi PDPL and its implementing regulations, and adds the controller's legal details and a retention period.
2. Owner names the email and hosting providers.
3. Set `SITE.legalReviewed = true` in `site/src/config/site.ts`; the draft label disappears.
4. If analytics or advertising tags are ever added: update the notice first, add a consent mechanism, and load non-essential tags only after consent.
