// "Brands we've worked with" — supplied by the owner (2026-11-04) as the team's PROFESSIONAL
// EXPERIENCE, not as SayTamm's direct clients. Names exactly as supplied. Never imply a contract,
// partnership or endorsement. Logos: only official files with permission to display (OQ-39);
// until a file is supplied, the brand name is set as text — no logo is redrawn or approximated.
import type { Lang } from '../config/site';
type T = Record<Lang, string>;
export interface Brand { name: string; sector: T; logo?: { src: string; w: number; h: number }; caseSlug?: string }

const S = {
  fnb: { en: 'Food & beverage', ar: 'أغذية ومشروبات' },
  auto: { en: 'Automotive', ar: 'سيارات' },
  realEstate: { en: 'Real estate', ar: 'عقارات' },
  telecom: { en: 'Telecommunications', ar: 'اتصالات' },
  banking: { en: 'Banking', ar: 'بنوك' },
  aviation: { en: 'Aviation', ar: 'طيران' },
  hospitality: { en: 'Hospitality', ar: 'ضيافة' },
  government: { en: 'Government · Entertainment', ar: 'جهة حكومية · ترفيه' },
} satisfies Record<string, T>;

export const BRANDS: Brand[] = [
  { name: 'Buffalo Burger', sector: S.fnb },
  { name: 'Juhayna', sector: S.fnb },
  { name: 'Edita Foods', sector: S.fnb },
  { name: 'Costa Coffee', sector: S.fnb },
  { name: 'Toyota', sector: S.auto },
  { name: 'BYD', sector: S.auto },
  { name: 'DAMAC', sector: S.realEstate, caseSlug: 'damac-paramount' },
  { name: 'STC', sector: S.telecom },
  { name: 'QNB', sector: S.banking, caseSlug: 'qnb-ramadan' },
  { name: 'Air Arabia', sector: S.aviation },
  { name: 'Radisson Blu', sector: S.hospitality },
  { name: 'Saudi GEA', sector: S.government },
];
