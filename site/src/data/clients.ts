// "Brands we've worked with" — supplied by the owner (2026-11-04) as the team's PROFESSIONAL
// EXPERIENCE, not as SayTamm's direct clients. Names exactly as supplied. Never imply a contract,
// partnership or endorsement. Logos: only official files with permission to display (OQ-39);
// until a file is supplied, the brand name is set as text — no logo is redrawn or approximated.
import { SITE, type Lang } from '../config/site';
type T = Record<Lang, string>;
export interface Brand {
  name: string; sector: T; logo?: { src: string; w: number; h: number }; caseSlug?: string;
  /** 'pending' = display permission not yet confirmed: shown in staging (tagged), hidden in production. */
  permission?: 'pending';
}

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
  { name: 'Saudi GEA', sector: S.government, permission: 'pending' }, // government entity: display permission outstanding (OQ-39)
];

/** Brands that may be displayed in this build. */
export const visibleBrands = () => BRANDS.filter((b) => SITE.preview || b.permission !== 'pending');

// ---------------------------------------------------------------------------------------------
// SayTamm's DIRECT clients (owner confirmation 2026-11-05). Kept separate from BRANDS above, which
// is team experience. Logos are the official files supplied by the owner, shown in their own colours
// on a light tile — never recoloured or redrawn. Sector only where it is known (not guessed).
type Logo = { src: string; w: number; h: number };
/** `logoAr` = the client's official Arabic lockup, used on Arabic pages when supplied. */
export interface Client { name: T; sector?: T; logo?: Logo; logoAr?: Logo; caseSlug?: string }
export const CLIENTS: Client[] = [
  { name: { en: 'Al Bustan', ar: 'البستان' }, sector: { en: 'Food · Nuts', ar: 'أغذية · مكسرات' } }, // logo file pending
  { name: { en: 'niimee', ar: 'niimee' }, sector: { en: 'Fashion', ar: 'أزياء' } }, // logo file pending
  { name: { en: 'Arhab', ar: 'أرحب' }, logo: { src: '/clients/arhab.svg', w: 858, h: 629 } },
  { name: { en: 'Tech Hive', ar: 'خلية التكنولوجيا' }, sector: { en: 'Electronics retail', ar: 'تجزئة إلكترونيات' },
    logo: { src: '/clients/techhive-en.webp', w: 478, h: 294 }, logoAr: { src: '/clients/techhive-ar.webp', w: 478, h: 280 } },
  { name: { en: 'Tech Craft', ar: 'التقانة العربية للمقاولات' }, sector: { en: 'Contracting', ar: 'مقاولات' }, logo: { src: '/clients/techcraft.svg', w: 552, h: 418 } },
];
