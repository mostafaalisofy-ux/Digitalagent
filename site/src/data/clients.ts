// Brands the SayTamm team has worked with — ONLY names that appear in the case-study material
// received (Steps KSA cases, nsm+ deck; legal rights D-002 / D-009). Logos: not supplied yet, so the
// wall is typographic. Names from the brief without supporting material (Hyde Park, Orange,
// EgyptAir) are excluded until confirmed (OQ-39).
import type { Lang } from '../config/site';
type T = Record<Lang, string>;
export interface Client { name: T; sector: T; market: T; caseSlug?: string }

export const CLIENTS: Client[] = [
  { name: { en: 'K.S Furniture', ar: 'K.S للأثاث' }, sector: { en: 'E-commerce', ar: 'تجارة إلكترونية' }, market: { en: 'Saudi Arabia', ar: 'السعودية' }, caseSlug: 'ks-furniture' },
  { name: { en: 'DAMAC Properties', ar: 'داماك العقارية' }, sector: { en: 'Real estate', ar: 'عقارات' }, market: { en: 'UAE', ar: 'الإمارات' }, caseSlug: 'damac-paramount' },
  { name: { en: 'Muriya', ar: 'موريا' }, sector: { en: 'Real estate', ar: 'عقارات' }, market: { en: 'Oman', ar: 'عُمان' }, caseSlug: 'muriya' },
  { name: { en: 'Marseilia Group', ar: 'مجموعة مارسيليا' }, sector: { en: 'Real estate', ar: 'عقارات' }, market: { en: 'KSA · Kuwait · Egypt', ar: 'السعودية · الكويت · مصر' } },
  { name: { en: 'Banque Misr', ar: 'بنك مصر' }, sector: { en: 'Banking', ar: 'بنوك' }, market: { en: 'Egypt', ar: 'مصر' } },
  { name: { en: 'QNB Al Ahli', ar: 'QNB الأهلي' }, sector: { en: 'Banking', ar: 'بنوك' }, market: { en: 'Egypt', ar: 'مصر' } },
  { name: { en: '57357 Hospital', ar: 'مستشفى 57357' }, sector: { en: 'Non-profit', ar: 'قطاع غير ربحي' }, market: { en: 'Egypt & GCC', ar: 'مصر والخليج' } },
  { name: { en: 'Bio-Group', ar: 'بايو جروب' }, sector: { en: 'Retail', ar: 'تجزئة' }, market: { en: 'E-commerce', ar: 'تجارة إلكترونية' }, caseSlug: 'bio-group' },
  { name: { en: 'Electa', ar: 'إليكتا' }, sector: { en: 'Electronics retail', ar: 'تجزئة إلكترونيات' }, market: { en: 'Strategy', ar: 'استراتيجية' } },
  { name: { en: 'Clean Basket', ar: 'كلين باسكت' }, sector: { en: 'Mobile app', ar: 'تطبيق' }, market: { en: 'Go-to-market', ar: 'دخول السوق' } },
  { name: { en: 'DC Block Factory', ar: 'مصنع DC بلوك' }, sector: { en: 'Construction materials', ar: 'مواد بناء' }, market: { en: 'Market expansion', ar: 'توسع' } },
  { name: { en: 'Jora', ar: 'جورا' }, sector: { en: 'Restaurants & cafés', ar: 'مطاعم ومقاهٍ' }, market: { en: 'Growth strategy', ar: 'نمو' } },
  { name: { en: 'Altopiano', ar: 'ألتوبيانو' }, sector: { en: 'Restaurants', ar: 'مطاعم' }, market: { en: 'Riyadh', ar: 'الرياض' } },
];
