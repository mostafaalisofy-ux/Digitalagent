// Team track record (Category C, docs/PORTFOLIO_AND_CASE_STUDIES.md). Legal rights: D-002, D-009.
// Every figure comes from a received source document and has been arithmetic-checked, but none is
// approved for publication yet: original platform exports are still needed (OQ-32). Owner, 2026-11-25
// (D-026): the three remaining cases are confirmed for publication (`status: 'approved'`); cases dated
// before 2021 or taken from another agency's published study were removed. A `pending` case still
// renders only in staging (see `showFigures`).
// Never add a figure, date or claim here that is not in a source document.
// Wording rule: ROAS is revenue ÷ ad spend. It is not profit — never describe a result as
// "profitable" without financial evidence (margins, costs) from the client.
import { SITE, type Lang } from '../config/site';
type T = Record<Lang, string>;
export interface Kpi { value: string; label: T; accent?: boolean }
export interface Bar { spend: number; result: number; unit: T; spendLabel: T; resultLabel: T }
export interface Visual { src: string; w: number; h: number; alt: T }
// visual.images: the first three are the portrait set used on the homepage; any further images
// (landscape) appear on the case page only.
export interface Evidence {
  source: T;        // where the figure comes from
  measured: T;      // what the headline figure measures, and how it was attributed
  status: 'pending' | 'approved';
  open: T;          // what still needs confirming before approval
}
export interface Case {
  slug: string; tier: 1 | 2;
  client: T; sector: T; market: T | null; period: T | null; channels: string[]; services: string[];
  headline: T;      // one-line story
  context: T;       // business context: who the client is and the situation
  objective: T; challenge: T; strategy: T; execution: T; outcome: T;
  kpis: Kpi[]; bar?: Bar; note?: T;
  /** Real campaign assets from received decks (rights D-002). null = none supplied → no image is faked. */
  visual: { images: Visual[]; kind: 'photo' | 'screen'; caption: T } | null;
  evidence: Evidence;
}

const PUBLISHED_CASE: T = { en: 'Published agency case study', ar: 'دراسة حالة منشورة لوكالة' };
const META_REPORT: T = { en: 'Meta Ads Manager report in the campaign deck', ar: 'تقرير Meta Ads Manager في ملف الحملة' };

export const CASES: Case[] = [
  {
    slug: 'fashion-beauty-scale', tier: 1,
    client: { en: 'Fashion & beauty e‑commerce brands', ar: 'علامات أزياء وتجميل للتجارة الإلكترونية' },
    sector: { en: 'E-commerce · Fashion & beauty', ar: 'تجارة إلكترونية · أزياء وتجميل' },
    market: { en: 'Egypt', ar: 'مصر' },
    period: { en: '10 Mar – 30 May 2022', ar: '10 مارس – 30 مايو 2022' },
    channels: ['Meta'], services: ['performance-marketing'],
    headline: { en: 'Two online stores grew purchase volume in a single quarter while keeping return on ad spend high.', ar: 'متجران إلكترونيان وسّعا حجم المشتريات خلال ربع واحد، مع الحفاظ على عائد إعلاني مرتفع.' },
    context: { en: 'Two fashion and beauty brands selling through their own online stores in Egypt, with Meta as the paid channel for the campaign period.', ar: 'علامتان للأزياء والتجميل تبيعان عبر متجريهما الإلكترونيين في مصر، وكانت Meta القناة الإعلانية المدفوعة خلال فترة الحملة.' },
    objective: { en: 'Grow online purchase volume quickly for both stores without letting return on ad spend fall as budgets rose.', ar: 'رفع حجم المشتريات بسرعة في المتجرين دون أن يتراجع العائد على الإنفاق الإعلاني مع زيادة الميزانيات.' },
    challenge: { en: 'Scaling spend quickly usually lowers the return on each additional pound. The plan had to grow volume without that drop.', ar: 'رفع الإنفاق بسرعة يُضعف عادةً العائد على كل جنيه إضافي، وكان على الخطة أن تزيد الحجم دون هذا التراجع.' },
    strategy: { en: 'Concentrate budget on middle- and bottom-of-funnel audiences with purchase intent, and build creative to be tested rather than simply published.', ar: 'تركيز الميزانية على جماهير منتصف ونهاية مسار الشراء ممن لديهم نية شراء، وبناء محتوى إعلاني للاختبار لا للنشر فقط.' },
    execution: { en: 'Twelve Meta campaigns on the larger account. Budget was moved daily toward the ad sets producing purchases and away from those that were not.', ar: 'اثنتا عشرة حملة على Meta للحساب الأكبر، مع تحريك الميزانية يومياً نحو المجموعات الإعلانية التي تحقق مشتريات وبعيداً عن غيرها.' },
    outcome: { en: 'Account A returned 13.84× on EGP 535K of spend across 82 days; account B returned 8.91×.', ar: 'حقق الحساب A عائداً بلغ ‎13.84×‎ على إنفاق 535 ألف جنيه خلال 82 يوماً، وحقق الحساب B عائداً بلغ ‎8.91×‎.' },
    kpis: [
      { value: '13.84×', label: { en: 'ROAS · account A', ar: 'العائد على الإنفاق · الحساب A' }, accent: true },
      { value: '27,703', label: { en: 'Purchases · account A', ar: 'عملية شراء · الحساب A' } },
      { value: '8.91×', label: { en: 'ROAS · account B', ar: 'العائد على الإنفاق · الحساب B' } },
      { value: '6,930', label: { en: 'Purchases · account B', ar: 'عملية شراء · الحساب B' } },
    ],
    bar: { spend: 534833, result: 7403781, unit: { en: 'EGP', ar: 'جنيه' },
      spendLabel: { en: 'Ad spend · A', ar: 'الإنفاق · A' }, resultLabel: { en: 'Purchase value · A', ar: 'قيمة المشتريات · A' } },
    note: { en: 'ROAS and purchase value are Meta-attributed.', ar: 'العائد وقيمة المشتريات منسوبة من Meta.' },
    visual: { kind: 'photo', caption: { en: 'Product and lifestyle photography from the team’s fashion e-commerce work.', ar: 'تصوير منتجات وأسلوب حياة من أعمال الفريق في تجارة الأزياء الإلكترونية.' }, images: [
      { src: '/work/fashion-01.webp', w: 641, h: 963, alt: { en: 'Fashion campaign photography: model in a sports jacket outdoors', ar: 'تصوير حملة أزياء: عارضة بسترة رياضية في الخارج' } },
      { src: '/work/fashion-02.webp', w: 549, h: 824, alt: { en: 'Product photography: lacing white sneakers at sunset', ar: 'تصوير منتج: ربط حذاء رياضي أبيض وقت الغروب' } },
      { src: '/work/fashion-03.webp', w: 548, h: 824, alt: { en: 'Lifestyle photography: sportswear towel on a wooden chair', ar: 'تصوير أسلوب حياة: منشفة رياضية على كرسي خشبي' } },
      { src: '/work/fashion-04.webp', w: 549, h: 400, alt: { en: 'Studio photography: model in a light-blue shirt and headscarf', ar: 'تصوير استوديو: عارضة بقميص أزرق فاتح وحجاب' } },
      { src: '/work/fashion-05.webp', w: 549, h: 381, alt: { en: 'Product photography: running shoe mid-stride outdoors', ar: 'تصوير منتج: حذاء جري أثناء الحركة في الخارج' } },
    ] },
    evidence: { source: META_REPORT, status: 'approved',
      measured: { en: 'Return on ad spend = Meta-attributed purchase value ÷ ad spend, per ad account.', ar: 'العائد على الإنفاق = قيمة المشتريات المنسوبة من Meta ÷ الإنفاق الإعلاني، لكل حساب.' },
      open: { en: 'Original Ads Manager exports (the deck screenshots are not clean evidence); client approval to publish.', ar: 'ملفات Ads Manager الأصلية (لقطات الشاشة في الملف ليست دليلاً كافياً)؛ وموافقة العميل على النشر.' } },
  },
  {
    slug: 'ks-furniture', tier: 1,
    // Sources: published agency case study + agency case-study deck received 2026-11-05 (includes the
    // store platform's sales dashboard). Year 2024 from the deck's National Day 94 artwork and footer.
    client: { en: 'K.S Furniture', ar: 'K.S للأثاث' },
    sector: { en: 'E-commerce · Furniture & décor', ar: 'تجارة إلكترونية · أثاث وديكور' },
    market: { en: 'Saudi Arabia', ar: 'السعودية' },
    period: { en: 'Aug – early Oct 2024 · Saudi National Day', ar: 'أغسطس – أوائل أكتوبر 2024 · اليوم الوطني السعودي' },
    channels: ['Google', 'Instagram', 'Snapchat'], services: ['performance-marketing', 'digital-marketing-strategy'],
    headline: { en: 'A crowded national season, driven by product offers rather than deep discounts.', ar: 'موسم وطني مزدحم، قادته عروض المنتجات لا الخصومات الكبيرة.' },
    context: { en: 'A Saudi furniture and décor retailer selling online, going into Saudi National Day, one of the busiest and most discount-heavy retail periods of the year.', ar: 'متجر سعودي للأثاث والديكور يبيع عبر الإنترنت، مقبل على اليوم الوطني السعودي، أحد أكثر مواسم التجزئة ازدحاماً وخصومات في العام.' },
    objective: { en: 'Raise return on ad spend from 4 to 7 over the National Day season, without relying on deep discounts.', ar: 'رفع العائد على الإنفاق الإعلاني من 4 إلى 7 خلال موسم اليوم الوطني، دون الاعتماد على خصومات كبيرة.' },
    challenge: { en: 'Competitors were running much larger discounts, and the plan ruled out both heavy discounting and influencers, keeping the budget for the ad platforms themselves.', ar: 'المنافسون كانوا يقدمون خصومات أكبر بكثير، والخطة استبعدت الخصومات الكبيرة والمؤثرين معاً، لتبقى الميزانية للمنصات الإعلانية نفسها.' },
    strategy: { en: 'Win on product, not price: introduce new hero products, rearrange the online store around high-demand items, and pair high-value pieces with complementary lower-priced ones to raise basket value. Discounts stayed under 20%, and the budget was weighted 90/10 toward conversion over awareness.', ar: 'المنافسة بالمنتج لا بالسعر: منتجات رئيسية جديدة، وإعادة ترتيب المتجر حول المنتجات الأكثر طلباً، وباقات تجمع قطعاً عالية القيمة مع منتجات مكمّلة أقل سعراً لرفع قيمة السلة. وبقيت الخصومات تحت 20%، ووُزّعت الميزانية 90/10 لصالح التحويل على حساب الوعي.' },
    execution: { en: 'Campaigns started in August, ahead of the season, across Google, Instagram and Snapchat, with targeted abandoned-cart retargeting. Daily monitoring and adjustments kept campaigns out of the learning phase through National Day and into early October.', ar: 'انطلقت الحملات في أغسطس قبل الموسم على Google وإنستغرام وسناب شات، مع إعادة استهداف دقيقة للسلال المتروكة. وأبقت المتابعة والتعديلات اليومية الحملات خارج مرحلة التعلّم طوال اليوم الوطني وحتى أوائل أكتوبر.' },
    outcome: { en: 'Return on ad spend rose from 4 to 10, against a target of 7. The store recorded SAR 1.09M in sales over the period from a SAR 100K media budget (Google 40K, Instagram 40K, Snapchat 20K): 507 orders, 15–20 a day, with 446 first-time customers.', ar: 'ارتفع العائد على الإنفاق الإعلاني من 4 إلى 10 مقابل مستهدف 7. وسجّل المتجر مبيعات بقيمة 1.09 مليون ريال خلال الفترة من ميزانية إعلانية قدرها 100 ألف ريال (Google ‏40 ألفاً، إنستغرام 40 ألفاً، سناب شات 20 ألفاً): 507 طلبات، بمعدل 15–20 طلباً يومياً، و446 عميلاً يشترون لأول مرة.' },
    kpis: [
      { value: '4× → 10×', label: { en: 'ROAS, start → result (target 7×)', ar: 'العائد: البداية ← النتيجة (المستهدف ‎7×‎)' }, accent: true },
      { value: '507', label: { en: 'Orders', ar: 'طلب' } },
      { value: '15–20', label: { en: 'Orders a day', ar: 'طلباً يومياً' } },
      { value: '446', label: { en: 'First-time customers', ar: 'عميل جديد' } },
    ],
    bar: { spend: 100000, result: 1086534, unit: { en: 'SAR', ar: 'ريال' },
      spendLabel: { en: 'Media budget', ar: 'الميزانية الإعلانية' }, resultLabel: { en: 'Total store sales', ar: 'إجمالي مبيعات المتجر' } },
    note: { en: 'Store sales are total sales for the period from the store platform, not only sales attributed to ads.', ar: 'مبيعات المتجر هي إجمالي المبيعات للفترة من منصة المتجر، وليست المبيعات المنسوبة للإعلانات فقط.' },
    visual: null,
    evidence: { source: { en: 'Agency case study, with the store platform’s sales dashboard for the period', ar: 'دراسة حالة من الوكالة، مع لوحة مبيعات منصة المتجر للفترة' }, status: 'approved',
      measured: { en: 'ROAS as reported in the case study (4 at the start, 10 at the end, against a target of 7). Total store sales, orders and new customers from the store platform’s dashboard, set against the total media budget.', ar: 'العائد كما ورد في دراسة الحالة (4 في البداية و10 في النهاية مقابل مستهدف 7). وإجمالي مبيعات المتجر والطلبات والعملاء الجدد من لوحة منصة المتجر، مقابل إجمالي الميزانية الإعلانية.' },
      open: { en: 'Client approval to publish; the ad-platform export confirming ROAS; confirmation of the 2024 campaign year.', ar: 'موافقة العميل على النشر؛ وملف المنصات الإعلانية الذي يؤكد العائد؛ وتأكيد أن الحملة كانت في 2024.' } },
  },
  {
    slug: 'electronics-q4', tier: 1,
    client: { en: 'Electronics e‑commerce brand', ar: 'علامة إلكترونيات للتجارة الإلكترونية' },
    sector: { en: 'E-commerce · Electronics', ar: 'تجارة إلكترونية · إلكترونيات' },
    market: { en: 'Egypt', ar: 'مصر' },
    period: { en: '1 Oct 2021 – 18 Jan 2022', ar: '1 أكتوبر 2021 – 18 يناير 2022' },
    channels: ['Meta'], services: ['performance-marketing'],
    headline: { en: 'A high-ticket peak season built on purchase intent, not volume.', ar: 'موسم ذروة عالي القيمة مبني على نية الشراء، لا على الكثرة.' },
    context: { en: 'An Egyptian online retailer of high-ticket electronics, going into the fourth-quarter peak season.', ar: 'متجر إلكتروني مصري لبيع الأجهزة الإلكترونية مرتفعة الثمن، مقبل على موسم ذروة الربع الرابع.' },
    objective: { en: 'Grow high-value orders through the Q4 peak season.', ar: 'تنمية الطلبات عالية القيمة خلال موسم ذروة الربع الرابع.' },
    challenge: { en: 'High-ticket products, a minimal budget and the busiest season of the year.', ar: 'منتجات مرتفعة الثمن، وميزانية محدودة، وأكثر مواسم السنة ازدحاماً.' },
    strategy: { en: 'Spend only where purchase intent was already visible: middle- and bottom-of-funnel audiences.', ar: 'الإنفاق فقط حيث تظهر نية الشراء: جماهير منتصف ونهاية مسار الشراء.' },
    execution: { en: 'Meta campaigns focused on middle- and bottom-of-funnel audiences throughout the season.', ar: 'حملات Meta مركّزة على جماهير منتصف ونهاية مسار الشراء طوال الموسم.' },
    outcome: { en: '$897K in Meta-attributed purchase value from 747 orders, at $1,201 per order.', ar: '897 ألف دولار قيمة مشتريات منسوبة من Meta عبر 747 طلباً، بمتوسط 1,201 دولار للطلب.' },
    kpis: [
      { value: '$897K', label: { en: 'Purchase value', ar: 'قيمة المشتريات' }, accent: true },
      { value: '747', label: { en: 'Orders', ar: 'طلب' } },
      { value: '$1,201', label: { en: 'Average order value', ar: 'متوسط قيمة الطلب' } },
    ],
    note: { en: 'Meta-attributed. The platform-reported ROAS for this period is not shown until it is confirmed from the original export.', ar: 'منسوبة من Meta. لا يُعرض العائد المُبلّغ من المنصة لهذه الفترة حتى يُؤكَّد من الملف الأصلي.' },
    visual: null,
    evidence: { source: META_REPORT, status: 'approved',
      measured: { en: 'Meta-attributed purchase value and purchases; average order value = value ÷ purchases.', ar: 'قيمة المشتريات وعددها كما تنسبها Meta؛ متوسط الطلب = القيمة ÷ عدد المشتريات.' },
      open: { en: 'Original Ads Manager export; client approval.', ar: 'ملف Ads Manager الأصلي؛ وموافقة العميل.' } },
  },
];

export const getCase = (slug: string) => CASES.find((c) => c.slug === slug)!;
/** Homepage Selected work, in order (strongest documented stories first). */
export const homeSelection = ['ks-furniture', 'fashion-beauty-scale', 'electronics-q4'].map(getCase);
/** Homepage "What the work delivered": different engagements, so no figure repeats on the page. */
export const homeResults: Case[] = [];
/** Figures appear in staging for review; in production only once approved. */
export const showFigures = (c: Case) => SITE.preview || c.evidence.status === 'approved';
export const isPending = (c: Case) => c.evidence.status !== 'approved';
