// Verified business facts only (docs/DECISION_LOG.md). Unknowns stay null — never invent.
export const SITE = {
  name: 'SayTamm',
  nameAr: 'قول تم', // canonical spelling: owner-approved 2026-11-05 (OQ-04)
  url: 'https://www.saytamm.com', // D-010
  email: 'info@saytamm.com', // D-010 — public contact
  emailPrimary: 'tamm@saytamm.com', // D-010
  phone: null as string | null, // OQ-08
  whatsapp: null as string | null, // OQ-08 — WhatsApp CTA renders only when set
  address: null as string | null, // OQ-09
  legal: { entity: null, cr: null, vat: null } as Record<string, string | null>, // OQ-09
  /** Legal review completion was confirmed by the project owner on 2026-11-07 (docs/LEGAL_AND_PRIVACY_REVIEW.md). */
  legalReviewed: true,
  social: [] as { label: string; href: string }[], // OQ-24 — verified handles only
  /** Staging is the default for every build: review bar + noindex + robots Disallow.
   *  Only `npm run build:production` (PUBLIC_STAGE=production) produces an indexable site —
   *  run it only for the authorised launch. */
  preview: import.meta.env.PUBLIC_STAGE !== 'production',
} as const;

export const LOCALES = ['en', 'ar'] as const;
export type Lang = (typeof LOCALES)[number];
export const DIR: Record<Lang, 'ltr' | 'rtl'> = { en: 'ltr', ar: 'rtl' };
