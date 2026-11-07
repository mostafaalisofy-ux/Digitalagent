// Team track record (Category C, docs/PORTFOLIO_AND_CASE_STUDIES.md). Legal rights: D-002, D-009.
// Every figure comes from a received source document and has been arithmetic-checked, but none is
// approved for publication yet: original platform exports are still needed (OQ-32). So every case
// carries `evidence.status: 'pending'`. Pending figures render in staging (with a visible
// "pending confirmation" tag) and are WITHHELD from the production build (see `showFigures`).
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
    evidence: { source: META_REPORT, status: 'pending',
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
    evidence: { source: { en: 'Agency case study, with the store platform’s sales dashboard for the period', ar: 'دراسة حالة من الوكالة، مع لوحة مبيعات منصة المتجر للفترة' }, status: 'pending',
      measured: { en: 'ROAS as reported in the case study (4 at the start, 10 at the end, against a target of 7). Total store sales, orders and new customers from the store platform’s dashboard, set against the total media budget.', ar: 'العائد كما ورد في دراسة الحالة (4 في البداية و10 في النهاية مقابل مستهدف 7). وإجمالي مبيعات المتجر والطلبات والعملاء الجدد من لوحة منصة المتجر، مقابل إجمالي الميزانية الإعلانية.' },
      open: { en: 'Client approval to publish; the ad-platform export confirming ROAS; confirmation of the 2024 campaign year.', ar: 'موافقة العميل على النشر؛ وملف المنصات الإعلانية الذي يؤكد العائد؛ وتأكيد أن الحملة كانت في 2024.' } },
  },
  {
    slug: 'qnb-ramadan', tier: 1,
    client: { en: 'QNB Al Ahli', ar: 'QNB الأهلي' },
    sector: { en: 'Banking · Media partnership', ar: 'بنوك · شراكة إعلامية' },
    market: { en: 'Egypt', ar: 'مصر' },
    period: { en: 'Ramadan 2015', ar: 'رمضان 2015' },
    channels: ['Filfan', 'FilGoal', 'Facebook', 'Google Display'], services: ['digital-marketing-strategy', 'performance-marketing'],
    headline: { en: 'Every Ramadan series in one place, sponsored by one bank.', ar: 'كل مسلسلات رمضان في مكان واحد، برعاية بنك واحد.' },
    context: { en: 'QNB Al Ahli wanted to promote m.visa, its mobile payment service, during Ramadan, when audiences in Egypt gather around the season’s TV series.', ar: 'أراد بنك QNB الأهلي الترويج لخدمة الدفع عبر الجوال m.visa خلال رمضان، حين يجتمع الجمهور في مصر حول مسلسلات الموسم.' },
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
    headline: { en: 'High-value homes sold through paid social, optimised for buyers rather than leads.', ar: 'وحدات سكنية عالية القيمة بيعت عبر إعلانات التواصل، بالتركيز على المشترين لا على العملاء المحتملين.' },
    context: { en: 'An Omani real estate developer selling high-value residential units.', ar: 'مطوّر عقاري عُماني يبيع وحدات سكنية عالية القيمة.' },
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
    evidence: { source: META_REPORT, status: 'pending',
      measured: { en: 'Meta-attributed purchase value and purchases; average order value = value ÷ purchases.', ar: 'قيمة المشتريات وعددها كما تنسبها Meta؛ متوسط الطلب = القيمة ÷ عدد المشتريات.' },
      open: { en: 'Original Ads Manager export; client approval.', ar: 'ملف Ads Manager الأصلي؛ وموافقة العميل.' } },
  },
  {
    slug: 'bio-group', tier: 2,
    client: { en: 'Bio-Group', ar: 'بايو جروب' },
    sector: { en: 'Retail → E-commerce', ar: 'تجزئة ← تجارة إلكترونية' },
    market: null,
    period: null, channels: ['Meta', 'Google'], services: ['performance-marketing'],
    headline: { en: 'An offline retailer’s return on ad spend doubled within two weeks of launching online.', ar: 'تضاعف العائد على الإنفاق الإعلاني لمتجر تقليدي خلال أسبوعين من إطلاقه على الإنترنت.' },
    context: { en: 'An established offline retailer moving into online sales for the first time.', ar: 'متجر تقليدي راسخ يتجه إلى البيع عبر الإنترنت لأول مرة.' },
    objective: { en: 'Launch online sales for an established offline retailer and improve return on ad spend quickly.', ar: 'إطلاق البيع الإلكتروني لمتجر تقليدي راسخ، وتحسين العائد على الإنفاق الإعلاني بسرعة.' },
    challenge: { en: 'No online sales history to learn from, so early decisions had to be made on very little data.', ar: 'لا يوجد سجل مبيعات إلكترونية يُبنى عليه، فكان لا بد من اتخاذ القرارات الأولى ببيانات قليلة جداً.' },
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
    context: { en: 'DAMAC was marketing a limited-time offer on residences at Paramount Tower in the UAE.', ar: 'كانت داماك تسوّق عرضاً محدود المدة على وحدات سكنية في برج باراماونت بالإمارات.' },
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
