// Team track record (Category C — docs/PORTFOLIO_AND_CASE_STUDIES.md). Legal rights: D-002, D-009.
// Figures are taken from source documents and arithmetic-checked; final check against original
// exports is pending (OQ-32) — `verified: 'source-checked'` until then. Never add figures here
// that are not in a source document. `null` = not supplied yet → rendered as a visible placeholder.
import type { Lang } from '../config/site';
type T = Record<Lang, string>;
export interface Kpi { value: string; label: T; accent?: boolean }
export interface Bar { label: T; spend: number; result: number; unit: string; spendLabel: T; resultLabel: T }
export interface Case {
  slug: string; tier: 1 | 2;
  client: T; sector: T; market: T; period: T | null; platforms: string[];
  headline: T; challenge: T; approach: T; resultsNote?: T;
  kpis: Kpi[]; bar?: Bar;
  visual: null;                      // original campaign visuals not yet supplied (OQ-32)
  verified: 'source-checked';
}

export const CASES: Case[] = [
  {
    slug: 'ks-furniture', tier: 1,
    client: { en: 'K.S Furniture', ar: 'K.S للأثاث' },
    sector: { en: 'E-commerce · Furniture', ar: 'تجارة إلكترونية · أثاث' },
    market: { en: 'Saudi Arabia', ar: 'السعودية' },
    period: { en: 'Saudi National Day season', ar: 'موسم اليوم الوطني السعودي' },
    platforms: ['Google', 'Instagram', 'Snapchat'],
    headline: { en: 'A crowded national season, won without leaning on discounts.', ar: 'موسم وطني مزدحم، كسبناه دون الاعتماد على الخصومات.' },
    challenge: { en: 'Stand out in one of the most competitive retail weeks of the year — without heavy discounting or influencers.', ar: 'التميّز في واحد من أكثر أسابيع التجزئة تنافساً في العام، دون خصومات كبيرة أو مؤثرين.' },
    approach: { en: 'Hero-product focus, bundle offers, discounts held under 20%, abandoned-cart retargeting and a 90/10 split between conversion and awareness. Budget: Google 40K, Instagram 40K, Snapchat 20K SAR.', ar: 'تركيز على المنتجات الرئيسية، وعروض الباقات، وخصومات لا تتجاوز 20%، وإعادة استهداف السلال المتروكة، وتوزيع 90/10 بين التحويل والوعي. الميزانية: Google ‏40 ألف، إنستغرام 40 ألف، سناب شات 20 ألف ريال.' },
    kpis: [
      { value: '10.9×', label: { en: 'Return on ad spend', ar: 'العائد على الإنفاق الإعلاني' }, accent: true },
      { value: '1.09M', label: { en: 'SAR in sales revenue', ar: 'ريال إيرادات مبيعات' } },
      { value: '507', label: { en: 'Orders', ar: 'طلب' } },
      { value: '446', label: { en: 'First-time customers', ar: 'عميل جديد' } },
    ],
    bar: { label: { en: 'K.S Furniture · SAR', ar: 'K.S للأثاث · ريال' }, spend: 100000, result: 1086534, unit: 'SAR',
      spendLabel: { en: 'Media budget', ar: 'الميزانية الإعلانية' }, resultLabel: { en: 'Sales revenue', ar: 'إيرادات المبيعات' } },
    visual: null, verified: 'source-checked',
  },
  {
    slug: 'muriya', tier: 1,
    client: { en: 'Muriya', ar: 'موريا' },
    sector: { en: 'Real estate · Lead generation', ar: 'عقارات · توليد العملاء' },
    market: { en: 'Oman', ar: 'عُمان' },
    period: null,
    platforms: ['Meta'],
    headline: { en: 'High-value homes sold from a five-figure media budget.', ar: 'وحدات سكنية عالية القيمة بيعت بميزانية إعلانية محدودة.' },
    challenge: { en: 'Generate qualified buyers — not just leads — for high-value residential units.', ar: 'جذب مشترين مؤهلين، لا مجرد بيانات تواصل، لوحدات سكنية عالية القيمة.' },
    approach: { en: 'Qualified-lead campaigns on Meta, optimised against units sold rather than cost per lead.', ar: 'حملات Meta لجذب عملاء مؤهلين، مُحسّنة وفق الوحدات المباعة لا تكلفة العميل.' },
    kpis: [
      { value: '83×', label: { en: 'Return on ad spend', ar: 'العائد على الإنفاق الإعلاني' }, accent: true },
      { value: '13', label: { en: 'Units sold', ar: 'وحدة مباعة' } },
      { value: '$1.51M', label: { en: 'Revenue generated', ar: 'إيرادات محققة' } },
      { value: '$18.2K', label: { en: 'Ad spend', ar: 'إنفاق إعلاني' } },
    ],
    bar: { label: { en: 'Muriya · USD', ar: 'موريا · دولار' }, spend: 18216, result: 1510000, unit: 'USD',
      spendLabel: { en: 'Ad spend', ar: 'الإنفاق الإعلاني' }, resultLabel: { en: 'Revenue', ar: 'الإيرادات' } },
    visual: null, verified: 'source-checked',
  },
  {
    slug: 'fashion-beauty-scale', tier: 1,
    client: { en: 'Fashion & beauty e-commerce brands', ar: 'علامات أزياء وتجميل إلكترونية' },
    sector: { en: 'E-commerce · Fashion & beauty', ar: 'تجارة إلكترونية · أزياء وتجميل' },
    market: { en: 'Egypt', ar: 'مصر' },
    period: { en: '10 Mar – 30 May 2022', ar: '10 مارس – 30 مايو 2022' },
    platforms: ['Meta'],
    headline: { en: 'Two accounts scaled from launch to high-volume, profitable sales in one quarter.', ar: 'حسابان نمَوا من الإطلاق إلى مبيعات مربحة بأحجام كبيرة خلال ربع واحد.' },
    challenge: { en: 'Scale spend quickly while keeping every additional pound profitable.', ar: 'رفع الإنفاق بسرعة مع الحفاظ على ربحية كل جنيه إضافي.' },
    approach: { en: 'Creative built for testing, middle- and bottom-of-funnel focus, budgets moved daily to the ad sets that sold.', ar: 'محتوى مصمم للاختبار، وتركيز على منتصف ونهاية مسار الشراء، وتحريك يومي للميزانية نحو المجموعات الأعلى مبيعاً.' },
    kpis: [
      { value: '13.84×', label: { en: 'ROAS · account A', ar: 'العائد · الحساب A' }, accent: true },
      { value: '27,703', label: { en: 'Purchases · account A', ar: 'عملية شراء · الحساب A' } },
      { value: '8.91×', label: { en: 'ROAS · account B', ar: 'العائد · الحساب B' } },
      { value: '6,930', label: { en: 'Purchases · account B', ar: 'عملية شراء · الحساب B' } },
    ],
    bar: { label: { en: 'Account A · EGP', ar: 'الحساب A · جنيه' }, spend: 534833, result: 7403781, unit: 'EGP',
      spendLabel: { en: 'Ad spend', ar: 'الإنفاق الإعلاني' }, resultLabel: { en: 'Purchase value', ar: 'قيمة المشتريات' } },
    resultsNote: { en: 'Meta-attributed purchase value.', ar: 'قيمة مشتريات منسوبة من Meta.' },
    visual: null, verified: 'source-checked',
  },
  {
    slug: 'electronics-q4', tier: 1,
    client: { en: 'Electronics e-commerce brand', ar: 'علامة إلكترونيات للتجارة الإلكترونية' },
    sector: { en: 'E-commerce · Electronics', ar: 'تجارة إلكترونية · إلكترونيات' },
    market: { en: 'Egypt', ar: 'مصر' },
    period: { en: '1 Oct 2021 – 18 Jan 2022', ar: '1 أكتوبر 2021 – 18 يناير 2022' },
    platforms: ['Meta'],
    headline: { en: 'A high-ticket Q4 built on intent, not volume.', ar: 'ربع رابع عالي القيمة مبني على نية الشراء، لا على الكثرة.' },
    challenge: { en: 'Grow high-value orders through peak season on a minimal budget.', ar: 'تنمية الطلبات عالية القيمة في ذروة الموسم بميزانية محدودة.' },
    approach: { en: 'Budget concentrated on middle- and bottom-of-funnel audiences with demonstrated purchase intent.', ar: 'تركيز الميزانية على جماهير منتصف ونهاية المسار ذات نية الشراء الواضحة.' },
    kpis: [
      { value: '$897K', label: { en: 'Purchase value', ar: 'قيمة المشتريات' }, accent: true },
      { value: '747', label: { en: 'Orders', ar: 'طلب' } },
      { value: '$1,201', label: { en: 'Average order value', ar: 'متوسط قيمة الطلب' } },
    ],
    resultsNote: { en: 'Meta-attributed. Meta-reported ROAS: 119×.', ar: 'منسوبة من Meta. العائد المُبلّغ من Meta: ‎119×.' },
    visual: null, verified: 'source-checked',
  },
  {
    slug: 'bio-group', tier: 2,
    client: { en: 'Bio-Group', ar: 'بايو جروب' },
    sector: { en: 'Retail → E-commerce', ar: 'تجزئة ← تجارة إلكترونية' },
    market: { en: 'Market to confirm', ar: 'السوق قيد التأكيد' },
    period: null, platforms: ['Meta', 'Google'],
    headline: { en: 'From offline retail to a doubling online return in two weeks.', ar: 'من البيع التقليدي إلى مضاعفة العائد الرقمي خلال أسبوعين.' },
    challenge: { en: 'Move an offline retailer into profitable e-commerce.', ar: 'نقل متجر تقليدي إلى تجارة إلكترونية مربحة.' },
    approach: { en: 'Conversion-focused Meta and Google campaigns from day one.', ar: 'حملات Meta وGoogle تركّز على التحويل من اليوم الأول.' },
    kpis: [
      { value: '2× → 4×', label: { en: 'ROAS in 2 weeks', ar: 'العائد خلال أسبوعين' }, accent: true },
      { value: '2,970', label: { en: 'Purchases', ar: 'عملية شراء' } },
      { value: '2.78%', label: { en: 'Conversion rate', ar: 'معدل التحويل' } },
    ],
    visual: null, verified: 'source-checked',
  },
  {
    slug: 'damac-paramount', tier: 2,
    client: { en: 'DAMAC · Paramount Tower', ar: 'داماك · برج باراماونت' },
    sector: { en: 'Real estate · Lead generation', ar: 'عقارات · توليد العملاء' },
    market: { en: 'UAE', ar: 'الإمارات' },
    period: null, platforms: ['Meta'],
    headline: { en: 'Quality leads for a limited-time offer, at a low cost per lead.', ar: 'عملاء مؤهلون لعرض محدود المدة، بتكلفة منخفضة للعميل.' },
    challenge: { en: 'High-quality leads within a short offer window.', ar: 'عملاء عاليو الجودة خلال نافذة عرض قصيرة.' },
    approach: { en: 'Lead-generation campaigns tuned for qualification, not volume.', ar: 'حملات توليد عملاء مضبوطة على التأهيل لا على العدد.' },
    kpis: [
      { value: '$8', label: { en: 'Cost per lead', ar: 'تكلفة العميل المحتمل' }, accent: true },
      { value: '15%', label: { en: 'Qualified-lead rate', ar: 'نسبة العملاء المؤهلين' } },
    ],
    visual: null, verified: 'source-checked',
  },
];

export const featured = CASES.filter((c) => c.tier === 1);
