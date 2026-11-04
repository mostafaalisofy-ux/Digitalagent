// Verified business facts only (docs/DECISION_LOG.md). Unknowns stay null — never invent.
export const SITE = {
  name: 'SayTamm',
  nameAr: 'قول تم', // canonical spelling pending OQ-04
  url: 'https://www.saytamm.com', // D-010
  email: 'info@saytamm.com', // D-010 — public contact
  emailPrimary: 'tamm@saytamm.com', // D-010
  phone: null as string | null, // OQ-08
  whatsapp: null as string | null, // OQ-08 — WhatsApp CTA renders only when set
  address: null as string | null, // OQ-09
  legal: { entity: null, cr: null, vat: null } as Record<string, string | null>, // OQ-09
  social: [] as { label: string; href: string }[], // OQ-24 — verified handles only
  /** Preview mode: shows the review bar and sets noindex. Turn off only at authorised launch. */
  preview: true,
} as const;

export const LOCALES = ['en', 'ar'] as const;
export type Lang = (typeof LOCALES)[number];
export const DIR: Record<Lang, 'ltr' | 'rtl'> = { en: 'ltr', ar: 'rtl' };
