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
// tile: background behind a logo that was supplied on its own brand colour (never recoloured); fill: logo artwork covers the whole tile
export interface Client { name: T; sector?: T; logo?: Logo; logoAr?: Logo; tile?: string; fill?: boolean; caseSlug?: string }
export const CLIENTS: Client[] = [
  { name: { en: 'Xiaomi', ar: 'شاومي' }, sector: { en: 'Consumer electronics', ar: 'إلكترونيات استهلاكية' }, logo: { src: '/clients/xiaomi.svg', w: 512, h: 512 } },
  { name: { en: 'GIG', ar: 'جي آي جي' }, sector: { en: 'Insurance', ar: 'تأمين' } }, // logo file pending
  { name: { en: 'Chery Saudi', ar: 'شيري السعودية' }, sector: { en: 'Automotive', ar: 'سيارات' }, logo: { src: '/clients/chery.svg', w: 500, h: 192 } },
  { name: { en: 'JORA', ar: 'JORA' }, sector: { en: 'Restaurants · Street food', ar: 'مطاعم · أكل شارع' } }, // logo file pending
  { name: { en: 'Al Bustan', ar: 'البستان' }, sector: { en: 'Food · Nuts', ar: 'أغذية · مكسرات' } }, // logo file pending
  { name: { en: 'niimee', ar: 'niimee' }, sector: { en: 'Fashion', ar: 'أزياء' }, logo: { src: '/clients/niimee.webp', w: 581, h: 149 } },
  { name: { en: 'K.S Furniture', ar: 'K.S للأثاث' }, sector: { en: 'Furniture · E-commerce', ar: 'أثاث · تجارة إلكترونية' }, logo: { src: '/clients/ks.webp', w: 525, h: 513 } },
  { name: { en: 'Fatora Plus', ar: 'فاتورة بلس' }, sector: { en: 'Invoicing software', ar: 'برامج الفوترة' }, logo: { src: '/clients/fatora.webp', w: 900, h: 264 }, tile: '#052249' },
  { name: { en: 'Siyaq', ar: 'سياق' }, sector: { en: 'Content platform', ar: 'منصة محتوى' }, logo: { src: '/clients/siyaq.webp', w: 900, h: 397 } },
  { name: { en: 'Exodus Travel', ar: 'Exodus Travel' }, sector: { en: 'Travel', ar: 'سفر وسياحة' } }, // logo file pending
  { name: { en: 'Beauty Lab', ar: 'بيوتي لاب' }, sector: { en: 'Natural cosmetics', ar: 'مستحضرات تجميل طبيعية' } }, // logo file pending
  { name: { en: 'Kheir Zaman', ar: 'خير زمان' }, sector: { en: 'Supermarkets', ar: 'سوبر ماركت' }, logo: { src: '/clients/kheir-zaman.webp', w: 192, h: 192 } },
  { name: { en: 'METRO', ar: 'مترو' }, sector: { en: 'Food products', ar: 'منتجات غذائية' }, logo: { src: '/clients/metro.webp', w: 512, h: 108 }, tile: '#021126' },
  { name: { en: 'Clean Basket', ar: 'كلين باسكت' }, sector: { en: 'Cleaning services', ar: 'خدمات تنظيف' },
    logo: { src: '/clients/cleanbasket-en.webp', w: 900, h: 387 }, logoAr: { src: '/clients/cleanbasket-ar.webp', w: 900, h: 454 } },
  { name: { en: 'Zahid Electra', ar: 'الزاهد إلكترا' }, sector: { en: 'Home appliances', ar: 'أجهزة منزلية' }, logo: { src: '/clients/zahid-electra.webp', w: 900, h: 277 } },
  { name: { en: 'MIX', ar: 'مكس' }, sector: { en: 'Events', ar: 'تنظيم فعاليات' }, logo: { src: '/clients/mix.webp', w: 320, h: 320 }, fill: true },
  { name: { en: 'Alqimma Equipment', ar: 'معدات القمة' }, sector: { en: 'Equipment', ar: 'معدات' }, logo: { src: '/clients/alqimma.webp', w: 619, h: 166 } },
  { name: { en: 'BITUMAT', ar: 'BITUMAT' }, sector: { en: 'Building materials', ar: 'مواد البناء' }, logo: { src: '/clients/bitumat.webp', w: 900, h: 349 } },
  { name: { en: 'ALTOPIANO', ar: 'التبيانو' }, sector: { en: 'Restaurants · Italian', ar: 'مطاعم · إيطالي' }, logo: { src: '/clients/altopiano.webp', w: 502, h: 60 }, tile: '#050504' },
  { name: { en: 'Arhab', ar: 'أرحب' }, sector: { en: 'Ride booking app', ar: 'تطبيق حجز رحلات' }, logo: { src: '/clients/arhab.svg', w: 858, h: 629 } },
  { name: { en: 'Tech Hive', ar: 'خلية التكنولوجيا' }, sector: { en: 'Electronics retail', ar: 'تجزئة إلكترونيات' },
    logo: { src: '/clients/techhive-en.webp', w: 478, h: 294 }, logoAr: { src: '/clients/techhive-ar.webp', w: 478, h: 280 } },
  { name: { en: 'Tech Craft', ar: 'التقانة العربية للمقاولات' }, sector: { en: 'Contracting', ar: 'مقاولات' }, logo: { src: '/clients/techcraft.svg', w: 552, h: 418 } },
];
