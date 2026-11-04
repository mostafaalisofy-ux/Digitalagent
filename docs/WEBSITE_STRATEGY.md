# Website Strategy

## Role of the site [SOURCE: brief]

A business development and lead-generation platform, not a brochure. In priority order:
1. Establish credibility. 2. Communicate positioning. 3. Present capabilities. 4. Demonstrate thinking. 5. Show verified work. 6. **Generate qualified inquiries.** 7. Support sales conversations. 8. Build presence in Saudi Arabia.

## Success metrics [RECOMMENDATION — targets set after 60 days of baseline data]

| Metric | Definition |
|---|---|
| Qualified inquiries / month | Form submissions meeting the qualification rules below |
| Inquiry conversion rate | Qualified inquiries ÷ sessions on key pages |
| Sales-assist usage | Visits to Approach, Work and About from known prospects (UTM-tagged links in proposals) |
| Organic visibility | Impressions and clicks for priority clusters (EN + AR) in Search Console |
| Core Web Vitals | LCP < 2.5 s, INP < 200 ms, CLS < 0.1 at the 75th percentile, on mobile |

## User journeys [RECOMMENDATION]

1. **Referral / proposal visitor** (most common early on). Arrives at Home or Approach from a link → checks About (who's behind it) → Work → contacts. *Needs:* fast trust, senior people, clear method.
2. **Search visitor with a service need.** Lands on a service page from "performance marketing agency Saudi Arabia" or "شركة تسويق رقمي في السعودية" → scans the outcome and method → checks proof → starts the inquiry with the service pre-selected.
3. **Paid-social visitor** (if SayTamm advertises itself). Lands on the audit offer page → short form → thank-you.
4. **Sceptical evaluator** (CEO or procurement). About → legal details → Privacy → Contact.

Each journey reaches a CTA within one scroll on every key page.

## Conversion system [RECOMMENDATION]

### CTA hierarchy
- **Primary:** *Start a project / ابدأ مشروعك*, always in the header and closing every page. It is the only Electric Purple fill on the page.
- **Secondary:** *See the work · How we work*. Text links with a diagonal underline.
- **Contact alternatives:** WhatsApp (**only once the number is approved**, OQ-08), email (once verified, OQ-07).

### Inquiry form (two-step, to reduce friction while qualifying)
| Step | Fields | Required |
|---|---|---|
| 1 | Name · Work email · Company · What do you need? (multi-select: Strategy / Media / Performance / Data & Growth / Not sure yet) | ✅ |
| 2 | Role · Phone (with +966 default) · Website · **Monthly media budget range (SAR)** · Timeline · Message · Preferred contact (email / call / WhatsApp) · Consent checkbox | Role and consent required; the rest optional |

Budget bands are **[MISSING]**: they must reflect SayTamm's real minimum engagement (OQ-14).

**States:** inline validation (on blur, not on keystroke) · clear error messages in the active language · submit loading state · success page with next steps ("We reply within [X] business hours", **SLA to confirm**) · failure fallback that shows an alternative contact method and keeps the entered data.
**Anti-spam:** honeypot plus Cloudflare Turnstile (no puzzle CAPTCHAs).
**Routing:** email notification plus CRM entry (CRM to be decided, OQ-19), with UTM, landing page, language and referrer captured as hidden fields.

### Qualification rules [ASSUMPTION — owner to define]
Qualified = business email, plus a company, plus a budget band at or above the minimum, plus a service selected.

## Measurement plan [RECOMMENDATION]

Data layer events (identical names in EN and AR, with `language` as a parameter):

| Event | Trigger | Key params |
|---|---|---|
| `cta_click` | Any primary/secondary CTA | `cta_id`, `cta_location`, `page_type` |
| `form_start` | First field interaction | `form_id`, `service_preselect` |
| `form_step_complete` | Step 1 done | `form_id`, `services` |
| `form_submit` | Successful submit | `form_id`, `services`, `budget_band` (no PII) |
| `form_error` | Validation or server error | `form_id`, `error_type` |
| `whatsapp_click` / `email_click` / `phone_click` | Contact link | `location` |
| `case_study_view` | Case page view | `slug`, `industry` |
| `language_switch` | EN↔AR toggle | `from`, `to` |
| `scroll_depth` | 25/50/75/90% on key pages | `percent` |

Stack readiness: GA4 via Google Tag Manager, consent mode, and server-side conversion APIs (Meta CAPI, Snap CAPI, TikTok Events API, LinkedIn CAPI) **only for the platforms SayTamm will advertise on (OQ-15)**. No tags fire before consent where consent is required.

## Bilingual experience [RECOMMENDATION]

- EN and AR are **separate compositions** built from the same components: RTL is a layout mode, not a mirrored screenshot.
- Directional elements flip deliberately: the diagonal gesture points **toward reading direction** in each language. Brand-locked elements such as **the logo itself never flip**.
- The language switch keeps the user on the equivalent page. The `<html lang dir>` attributes are set correctly, and fonts switch per locale.
- Content parity: every page exists in both languages at launch. A missing translation blocks publishing rather than falling back silently.

## Content needed before build [MISSING]

Final copy for all pages (EN and AR) · leadership bios and photos · legal details · contact details · approved case studies · privacy notice text (legal review) · real photography (team and workspace) or an approved art-directed alternative.
