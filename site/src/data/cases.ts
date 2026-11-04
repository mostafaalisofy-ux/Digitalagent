// Team track record (Category C, docs/PORTFOLIO_AND_CASE_STUDIES.md). Legal rights: D-002, D-009.
// Every figure comes from a received source document and has been arithmetic-checked, but none is
// approved for publication yet: original platform exports are still needed (OQ-32). So every case
// carries `evidence.status: 'pending'`. Pending figures render in staging (with a visible
// "pending confirmation" tag) and are WITHHELD from the production build (see `showFigures`).
// Never add a figure, date or claim here that is not in a source document.
import { SITE, type Lang } from '../config/site';
type T = Record<Lang, string>;
export interface Kpi { value: string; label: T; accent?: boolean }
export interface Bar { spend: number; result: number; unit: T; spendLabel: T; resultLabel: T }
export interface Visual { src: string; w: number; h: number; alt: T }
export interface Evidence {
  source: T;        // where the figure comes from
  measured: T;      // what the headline figure measures, and how it was attributed
  status: 'pending' | 'approved';
  open: T;          // what still needs confirming before approval
}
export interface Case {
  slug: string; tier: 1 | 2;
  client: T; sector: T; market: T; period: T | null; channels: string[]; services: string[];
  headline: T;      // one-line story
  objective: T; challenge: T; strategy: T; execution: T; outcome: T;
  kpis: Kpi[]; bar?: Bar; note?: T;
  /** Real campaign assets from received decks (rights D-002). null = none supplied → no image is faked. */
  visual: { images: Visual[]; kind: 'photo' | 'screen'; caption: T } | null;
  evidence: Evidence;
}

const PUBLISHED_CASE: T = { en: 'Published case study from the team’s previous agency', ar: 'دراسة حالة منشورة من الوكالة السابقة للفريق' };
const META_REPORT: T = { en: 'Meta Ads Manager report in the campaign deck', ar: 'تقرير Meta Ads Manager في ملف الحملة' };

export const CASES: Case[] = [
  {
    slug: 'fashion-beauty-scale', tier: 1,
    client: { en: 'Fashion & beauty e‑commerce brands', ar: 'علامات أزياء وتجميل للتجارة الإلكترونية' },
    sector: { en: 'E-commerce · Fashion & beauty', ar: 'تجارة إلكترونية · أزياء وتجميل' },
    market: { en: 'Egypt', ar: 'مصر' },
    period: { en: '10 Mar – 30 May 2022', ar: '10 مارس – 30 مايو 2022' },
    channels: ['Meta'], services: ['performance-marketing'],
    headline: { en: 'Two online stores scaled to high-volume, profitable sales in one quarter.', ar: 'متجران إلكترونيان وصلا إلى مبيعات كبيرة ومربحة خلال ربع واحد.' },
    objective: { en: 'Grow sales volume quickly on two fashion and beauty stores without giving up profitability.', ar: 'رفع حجم المبيعات بسرعة في متجرين للأزياء والتجميل دون التضحية بالربحية.' },
    challenge: { en: 'Spend had to rise fast, and every additional pound of spend still had to return more than it cost.', ar: 'كان لا بد من رفع الإنفاق بسرعة، مع أن يبقى كل جنيه إضافي مربحاً.' },
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
    ] },
    evidence: { source: META_REPORT, status: 'pending',
      measured: { en: 'Return on ad spend = Meta-attributed purchase value ÷ ad spend, per ad account.', ar: 'العائد على الإنفاق = قيمة المشتريات المنسوبة من Meta ÷ الإنفاق الإعلاني، لكل حساب.' },
      open: { en: 'Original Ads Manager exports (the deck screenshots are not clean evidence); client approval to publish.', ar: 'ملفات Ads Manager الأصلية (لقطات الشاشة في الملف ليست دليلاً كافياً)؛ وموافقة العميل على النشر.' } },
  },
  {
    slug: 'ks-furniture', tier: 1,
    client: { en: 'K.S Furniture', ar: 'K.S للأثاث' },
    sector: { en: 'E-commerce · Furniture', ar: 'تجارة إلكترونية · أثاث' },
    market: { en: 'Saudi Arabia', ar: 'السعودية' },
    period: { en: 'Saudi National Day season', ar: 'موسم اليوم الوطني السعودي' },
    channels: ['Google', 'Instagram', 'Snapchat'], services: ['performance-marketing', 'digital-marketing-strategy'],
    headline: { en: 'A crowded national season, won without leaning on discounts.', ar: 'موسم وطني مزدحم، كسبته العلامة دون الاعتماد على الخصومات.' },
    objective: { en: 'Turn the Saudi National Day season into profitable online furniture sales.', ar: 'تحويل موسم اليوم الوطني السعودي إلى مبيعات أثاث إلكترونية مربحة.' },
    challenge: { en: 'One of the most competitive retail weeks of the year, and a brief to stand out without heavy discounts or influencers.', ar: 'واحد من أكثر أسابيع التجزئة تنافساً في العام، مع مطلب التميّز دون خصومات كبيرة أو مؤثرين.' },
    strategy: { en: 'Lead with hero products and bundle offers instead of price cuts, keep every discount under 20%, and weight the budget 90/10 toward conversion over awareness.', ar: 'تقديم المنتجات الرئيسية وعروض الباقات بدلاً من خفض الأسعار، وإبقاء الخصومات تحت 20%، وتوزيع الميزانية 90/10 لصالح التحويل على حساب الوعي.' },
    execution: { en: 'SAR 100K across Google (40K), Instagram (40K) and Snapchat (20K), with abandoned-cart retargeting to bring back shoppers who left before checkout.', ar: '100 ألف ريال موزعة على Google (‏40 ألفاً) وإنستغرام (40 ألفاً) وسناب شات (20 ألفاً)، مع إعادة استهداف السلال المتروكة لاستعادة المتسوقين قبل إتمام الشراء.' },
    outcome: { en: 'SAR 1.09M in sales from a SAR 100K media budget: 507 orders, with 446 first-time customers.', ar: '1.09 مليون ريال مبيعات من ميزانية إعلانية قدرها 100 ألف ريال: 507 طلبات، و446 عميلاً يشترون لأول مرة.' },
    kpis: [
      { value: '10.9×', label: { en: 'Return on ad spend', ar: 'العائد على الإنفاق الإعلاني' }, accent: true },
      { value: '507', label: { en: 'Orders', ar: 'طلب' } },
      { value: '446', label: { en: 'First-time customers', ar: 'عميل جديد' } },
    ],
    bar: { spend: 100000, result: 1086534, unit: { en: 'SAR', ar: 'ريال' },
      spendLabel: { en: 'Media budget', ar: 'الميزانية الإعلانية' }, resultLabel: { en: 'Sales revenue', ar: 'إيرادات المبيعات' } },
    visual: null,
    evidence: { source: PUBLISHED_CASE, status: 'pending',
      measured: { en: 'Sales revenue reported for the campaign period against the total media budget.', ar: 'إيرادات المبيعات المُبلّغ عنها لفترة الحملة مقابل إجمالي الميزانية الإعلانية.' },
      open: { en: 'Campaign year; how revenue was attributed to the campaign; original store or platform export; client approval.', ar: 'سنة الحملة؛ وطريقة نسب الإيرادات إلى الحملة؛ وملف المتجر أو المنصة الأصلي؛ وموافقة العميل.' } },
  },
  {
    slug: 'qnb-ramadan', tier: 1,
    client: { en: 'QNB Al Ahli', ar: 'QNB الأهلي' },
    sector: { en: 'Banking · Media partnership', ar: 'بنوك · شراكة إعلامية' },
    market: { en: 'Egypt', ar: 'مصر' },
    period: { en: 'Ramadan 2015', ar: 'رمضان 2015' },
    channels: ['Filfan', 'FilGoal', 'Facebook', 'Google Display'], services: ['digital-marketing-strategy', 'performance-marketing'],
    headline: { en: 'Every Ramadan series in one place, sponsored by one bank.', ar: 'كل مسلسلات رمضان في مكان واحد، برعاية بنك واحد.' },
    objective: { en: 'Build awareness and traffic for the bank’s m.visa service during Ramadan.', ar: 'بناء الوعي وجذب الزيارات لخدمة m.visa من البنك خلال رمضان.' },
    challenge: { en: 'Sponsorship of individual Ramadan series was sold out, and priced far above the budget.', ar: 'رعاية المسلسلات الرمضانية الفردية كانت مباعة مسبقاً، وبأسعار تفوق الميزانية بكثير.' },
    strategy: { en: 'Instead of sponsoring one series, own the whole category: a single destination for every Ramadan series, carrying the bank’s name.', ar: 'بدلاً من رعاية مسلسل واحد، امتلاك الفئة كلها: وجهة واحدة لكل مسلسلات رمضان تحمل اسم البنك.' },
    execution: { en: 'A partnership with the entertainment portal Filfan to build “Ramadan Series Sponsored by QNB”, with traffic driven to it from FilGoal, Facebook and Google Display.', ar: 'شراكة مع بوابة فيلفان الترفيهية لبناء منصة «مسلسلات رمضان برعاية QNB»، وتوجيه الزيارات إليها من فيلجول وفيسبوك وشبكة Google الإعلانية.' },
    outcome: { en: '7M video views, 25M impressions and 50K clicks through to m.visa over Ramadan 2015.', ar: '7 ملايين مشاهدة، و25 مليون ظهور، و50 ألف نقرة إلى m.visa خلال رمضان 2015.' },
    kpis: [
      { value: '7M', label: { en: 'Video views', ar: 'مشاهدة فيديو' }, accent: true },
      { value: '25M', label: { en: 'Impressions', ar: 'ظهور' } },
      { value: '50K', label: { en: 'Clicks to m.visa', ar: 'نقرة إلى m.visa' } },
    ],
    note: { en: 'Awareness and traffic metrics. No sales figures are claimed for this campaign.', ar: 'مؤشرات وعي وزيارات، ولا تُنسب إلى هذه الحملة أي أرقام مبيعات.' },
    visual: { kind: 'screen', caption: { en: 'The campaign as it ran: the sponsored series hub on Filfan, and the FilGoal mobile placement.', ar: 'الحملة كما ظهرت: منصة المسلسلات على فيلفان، والإعلان على فيلجول للجوال.' }, images: [
      { src: '/work/qnb-ramadan-desktop.webp', w: 1536, h: 918, alt: { en: 'Filfan desktop page: Ramadan series hub sponsored by QNB', ar: 'صفحة فيلفان: منصة مسلسلات رمضان برعاية QNB' } },
      { src: '/work/qnb-ramadan-mobile.webp', w: 549, h: 1031, alt: { en: 'FilGoal mobile page with the QNB Ramadan placement', ar: 'صفحة فيلجول على الجوال مع إعلان QNB الرمضاني' } },
    ] },
    evidence: { source: { en: 'Campaign case-study deck prepared by the project lead (2019)', ar: 'ملف دراسة الحالة الذي أعده قائد المشروع (2019)' }, status: 'pending',
      measured: { en: 'Platform-reported views, impressions and clicks for the Ramadan 2015 flight.', ar: 'مشاهدات وظهور ونقرات مُبلّغ عنها من المنصات لفترة رمضان 2015.' },
      open: { en: 'Confirmation that the bank’s name may be published with these figures.', ar: 'تأكيد إمكانية نشر اسم البنك مع هذه الأرقام.' } },
  },
  {
    slug: 'muriya', tier: 1,
    client: { en: 'Muriya', ar: 'موريا' },
    sector: { en: 'Real estate · Lead generation', ar: 'عقارات · توليد العملاء' },
    market: { en: 'Oman', ar: 'عُمان' },
    period: null, channels: ['Meta'], services: ['performance-marketing'],
    headline: { en: 'High-value homes sold from a five-figure media budget.', ar: 'وحدات سكنية عالية القيمة بيعت بميزانية إعلانية محدودة.' },
    objective: { en: 'Sell high-value residential units through paid social.', ar: 'بيع وحدات سكنية عالية القيمة عبر الإعلانات على منصات التواصل.' },
    challenge: { en: 'Reach buyers ready to commit to a high-value purchase — not just people willing to leave a phone number.', ar: 'الوصول إلى مشترين جاهزين لقرار شراء كبير، لا مجرد أشخاص يتركون رقم هاتف.' },
    strategy: { en: 'Judge the campaign by units sold rather than by cost per lead.', ar: 'تقييم الحملة بعدد الوحدات المباعة، لا بتكلفة العميل المحتمل.' },
    execution: { en: 'Qualified-lead campaigns on Meta.', ar: 'حملات Meta لجذب عملاء مؤهلين.' },
    outcome: { en: '13 units sold and $1.51M in revenue from $18.2K of ad spend.', ar: 'بيع 13 وحدة وإيرادات بقيمة 1.51 مليون دولار من إنفاق إعلاني قدره 18.2 ألف دولار.' },
    kpis: [
      { value: '13', label: { en: 'Units sold', ar: 'وحدة مباعة' }, accent: true },
      { value: '$1.51M', label: { en: 'Revenue from units sold', ar: 'إيرادات الوحدات المباعة' } },
      { value: '$18.2K', label: { en: 'Ad spend', ar: 'الإنفاق الإعلاني' } },
    ],
    bar: { spend: 18216, result: 1510000, unit: { en: 'USD', ar: 'دولار' },
      spendLabel: { en: 'Ad spend', ar: 'الإنفاق الإعلاني' }, resultLabel: { en: 'Revenue', ar: 'الإيرادات' } },
    visual: null,
    evidence: { source: PUBLISHED_CASE, status: 'pending',
      measured: { en: 'Value of units sold to buyers who came through the campaign, against ad spend.', ar: 'قيمة الوحدات المباعة لمشترين جاؤوا عبر الحملة، مقابل الإنفاق الإعلاني.' },
      open: { en: 'Campaign period; how sales were matched to campaign leads; client approval.', ar: 'فترة الحملة؛ وطريقة ربط المبيعات بعملاء الحملة؛ وموافقة العميل.' } },
  },
  {
    slug: 'electronics-q4', tier: 1,
    client: { en: 'Electronics e‑commerce brand', ar: 'علامة إلكترونيات للتجارة الإلكترونية' },
    sector: { en: 'E-commerce · Electronics', ar: 'تجارة إلكترونية · إلكترونيات' },
    market: { en: 'Egypt', ar: 'مصر' },
    period: { en: '1 Oct 2021 – 18 Jan 2022', ar: '1 أكتوبر 2021 – 18 يناير 2022' },
    channels: ['Meta'], services: ['performance-marketing'],
    headline: { en: 'A high-ticket peak season built on purchase intent, not volume.', ar: 'موسم ذروة عالي القيمة مبني على نية الشراء، لا على الكثرة.' },
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
    evidence: { source: META_REPORT, status: 'pending',
      measured: { en: 'Meta-attributed purchase value and purchases; average order value = value ÷ purchases.', ar: 'قيمة المشتريات وعددها كما تنسبها Meta؛ متوسط الطلب = القيمة ÷ عدد المشتريات.' },
      open: { en: 'Original Ads Manager export; client approval.', ar: 'ملف Ads Manager الأصلي؛ وموافقة العميل.' } },
  },
  {
    slug: 'bio-group', tier: 2,
    client: { en: 'Bio-Group', ar: 'بايو جروب' },
    sector: { en: 'Retail → E-commerce', ar: 'تجزئة ← تجارة إلكترونية' },
    market: { en: 'Market to be confirmed', ar: 'السوق قيد التأكيد' },
    period: null, channels: ['Meta', 'Google'], services: ['performance-marketing'],
    headline: { en: 'An offline retailer’s online return doubled in two weeks.', ar: 'عائد متجر تقليدي على الإنترنت تضاعف خلال أسبوعين.' },
    objective: { en: 'Move an established offline retailer into profitable e-commerce.', ar: 'نقل متجر تقليدي راسخ إلى تجارة إلكترونية مربحة.' },
    challenge: { en: 'A brand known in stores, with no track record of selling online.', ar: 'علامة معروفة في المتاجر، بلا سجل سابق في البيع الإلكتروني.' },
    strategy: { en: 'Run for conversion from day one, and let early purchase data decide where the budget goes.', ar: 'العمل على التحويل من اليوم الأول، وترك بيانات الشراء الأولى تحدد وجهة الميزانية.' },
    execution: { en: 'Conversion campaigns on Meta and Google.', ar: 'حملات تحويل على Meta وGoogle.' },
    outcome: { en: 'ROAS rose from 2× to 4× within two weeks, across 2,970 purchases.', ar: 'ارتفع العائد من ‎2×‎ إلى ‎4×‎ خلال أسبوعين، عبر 2,970 عملية شراء.' },
    kpis: [
      { value: '2× → 4×', label: { en: 'ROAS, launch → week two', ar: 'العائد من الإطلاق حتى الأسبوع الثاني' }, accent: true },
      { value: '2,970', label: { en: 'Purchases', ar: 'عملية شراء' } },
      { value: '2.78%', label: { en: 'Conversion rate', ar: 'معدل التحويل' } },
    ],
    visual: null,
    evidence: { source: PUBLISHED_CASE, status: 'pending',
      measured: { en: 'Platform-reported ROAS at launch compared with ROAS after two weeks.', ar: 'العائد المُبلّغ من المنصات عند الإطلاق مقارنة بالعائد بعد أسبوعين.' },
      open: { en: 'Market, year and platform export; client approval.', ar: 'السوق والسنة وملف المنصة؛ وموافقة العميل.' } },
  },
  {
    slug: 'damac-paramount', tier: 2,
    client: { en: 'DAMAC · Paramount Tower', ar: 'داماك · برج باراماونت' },
    sector: { en: 'Real estate · Lead generation', ar: 'عقارات · توليد العملاء' },
    market: { en: 'UAE', ar: 'الإمارات' },
    period: null, channels: ['Meta'], services: ['performance-marketing'],
    headline: { en: 'Qualified leads for a limited-time offer, at a low cost per lead.', ar: 'عملاء مؤهلون لعرض محدود المدة، بتكلفة منخفضة للعميل.' },
    objective: { en: 'Generate qualified buyer leads for a limited-time Paramount Tower offer.', ar: 'جذب عملاء مؤهلين لعرض محدود المدة على برج باراماونت.' },
    challenge: { en: 'A short offer window, where lead quality mattered more than volume.', ar: 'نافذة عرض قصيرة، تهم فيها جودة العملاء أكثر من عددهم.' },
    strategy: { en: 'Tune lead-generation campaigns for qualification rather than raw lead count.', ar: 'ضبط حملات توليد العملاء على التأهيل لا على عدد العملاء.' },
    execution: { en: 'Lead-generation campaigns on Meta for the offer period.', ar: 'حملات توليد عملاء على Meta طوال فترة العرض.' },
    outcome: { en: 'Leads at $8 each, with 15% qualifying as genuine prospects.', ar: 'عملاء بتكلفة 8 دولارات للعميل، 15% منهم مؤهلون فعلياً.' },
    kpis: [
      { value: '$8', label: { en: 'Cost per lead', ar: 'تكلفة العميل المحتمل' }, accent: true },
      { value: '15%', label: { en: 'Qualified-lead rate', ar: 'نسبة العملاء المؤهلين' } },
    ],
    visual: null,
    evidence: { source: PUBLISHED_CASE, status: 'pending',
      measured: { en: 'Cost per lead and the share of leads that qualified, as stated in the case study.', ar: 'تكلفة العميل ونسبة العملاء المؤهلين، كما وردت في دراسة الحالة.' },
      open: { en: 'Period, lead volume and baseline; permission to name DAMAC.', ar: 'الفترة وعدد العملاء وخط الأساس؛ وإذن ذكر اسم داماك.' } },
  },
];

export const getCase = (slug: string) => CASES.find((c) => c.slug === slug)!;
/** Homepage Selected work, in order (strongest documented stories first). */
export const homeSelection = ['fashion-beauty-scale', 'ks-furniture', 'qnb-ramadan'].map(getCase);
/** Homepage "What the work delivered": different engagements, so no figure repeats on the page. */
export const homeResults = ['muriya', 'bio-group', 'electronics-q4'].map(getCase);
/** Figures appear in staging for review; in production only once approved. */
export const showFigures = (c: Case) => SITE.preview || c.evidence.status === 'approved';
export const isPending = (c: Case) => c.evidence.status !== 'approved';
