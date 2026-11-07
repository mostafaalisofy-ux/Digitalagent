# Contact and CRM integration

Date: 2026-11-05.

## Current behaviour (implemented, tested)

- **Method: mailto.** On a valid submit, the form opens the visitor's email app with a pre-written message to **info@saytamm.com** (D-010). It is not a CRM integration and the site never claims a message was sent.
- The notice above the form says so; after submit the page says the email app "should now be open" and offers **Copy message** and the address as a fallback.
- **Fields:** name*, work email*, company*, role, industry, main market (select), timeline (select), services* (at least one discipline or "not sure yet"), phone, website, monthly media budget (SAR), message*, consent* (links to the privacy notice). *Required.
- **Validation:** required fields, email format, phone format (optional), full URL (optional); errors are announced (`role="alert"`), the first invalid field receives focus, error lines reserve space so the layout never shifts.
- **Spam:** honeypot field `company_url`.
- **Duplicates:** not applicable to mailto (nothing is sent by the site).
- **Prefill:** `?service=<discipline-id>` preselects a discipline (used by "Discuss this service").
- **Events (local dataLayer only):** `form_start`, `form_error`, `form_submit` (service IDs only, no personal data).
- **Tests:** `tools/qa/func.js` fills and submits the form in both languages and checks the generated `mailto:` subject and body.

The prefilled email body, for reference:

```
Name / Email / Company / Role / Industry / Market / Timeline / Phone / Website / Needs / Monthly media budget
<blank line>
<message>
```

## Why there is no backend yet

No CRM, form service or credentials exist in the project (OQ-19). None were invented.

## Integration specification (for when the owner chooses a backend)

| Option | What it needs from the owner | Notes |
|---|---|---|
| HubSpot (free CRM) forms API | Portal ID, form GUID | Data held by HubSpot (US/EU); add to the privacy notice |
| Zoho CRM web-to-lead | Org ID, form token | Zoho has a Saudi data centre option — check |
| Serverless function (e.g. Cloudflare Pages Function) sending email to info@saytamm.com | Hosting account, an email-sending API key stored as a secret | No third-party CRM; keeps data minimal |

Implementation steps (any option):
1. Keep the same fields and validation; POST JSON to the endpoint with `fetch`.
2. Server-side: validate again, rate-limit, keep the honeypot, add Cloudflare Turnstile or similar if spam appears.
3. Success state only on a 2xx response; failure state offers the mailto fallback.
4. Disable the button while sending to prevent double submits.
5. Store secrets in the host's secret store, never in the repository.
6. Update the privacy notice to name the processor, then fire `form_submit` only on confirmed success.
