// The 9 services SayTamm offers (D-003), organised in 4 disciplines (owner brief, final redesign).
// Only these services are published. Capabilities listed under "includes" are limited to what the
// adopted service scope or the team's case material supports. Scope for five services is still
// being finalised (OQ-34) and is shown as such.
import type { Lang } from '../config/site';
type T = Record<Lang, string>;
export interface Service { id: string; name: T; summary: T; includes: Record<Lang, string[]>; scopePending?: boolean }
export interface Discipline { id: string; n: string; name: T; value: T; services: Service[] }

const pending = { en: [] as string[], ar: [] as string[] };

export const DISCIPLINES: Discipline[] = [
  {
    id: 'strategy', n: '01',
    name: { en: 'Strategy & Consulting', ar: 'الاستراتيجية والاستشارات' },
    value: { en: 'Decide where growth will come from before budget is spent: the audience, the offer, the channels and the number each one must deliver.', ar: 'نحدد مصدر النمو قبل إنفاق الميزانية: الجمهور، والعرض، والقنوات، والرقم المطلوب من كل قناة.' },
    services: [
      { id: 'digital-marketing-strategy',
        name: { en: 'Digital Marketing Strategy', ar: 'استراتيجية التسويق الرقمي' },
        summary: { en: 'A written plan that ties every channel and every riyal to a business objective.', ar: 'خطة مكتوبة تربط كل قناة وكل ريال بهدف واضح لعملك.' },
        includes: {
          en: ['Market and competitor research for Saudi Arabia and the Gulf', 'High-value customer profile', 'Positioning and value proposition', 'Channel priorities and budget allocation', 'Seasonal campaign planning, such as Ramadan and National Day', '90-day roadmap'],
          ar: ['دراسة السوق والمنافسين في السعودية والخليج', 'ملف العميل الأعلى قيمة', 'التموضع والقيمة المقدّمة', 'أولويات القنوات وتوزيع الميزانية', 'تخطيط الحملات الموسمية مثل رمضان واليوم الوطني', 'خارطة طريق لتسعين يوماً'],
        } },
    ],
  },
  {
    id: 'creative', n: '02',
    name: { en: 'Creative & Content', ar: 'الإبداع والمحتوى' },
    value: { en: 'Brand, content and production made for the platforms your customers use — and built to be tested against results, not just approved.', ar: 'علامة ومحتوى وإنتاج مصمم للمنصات التي يستخدمها عملاؤك، ويُختبر مقابل النتائج لا يُعتمد فقط.' },
    services: [
      { id: 'branding',
        name: { en: 'Branding & Identity', ar: 'الهوية والعلامة التجارية' },
        summary: { en: 'Positioning first, design second — Arabic and English developed together.', ar: 'التموضع أولاً ثم التصميم، بالعربية والإنجليزية معاً.' },
        includes: {
          en: ['Brand strategy and positioning', 'Naming, messaging and tone of voice', 'Logo and visual identity system', 'Brand guidelines and asset library'],
          ar: ['استراتيجية العلامة وتموضعها', 'التسمية والرسائل ونبرة الصوت', 'الشعار ونظام الهوية البصرية', 'دليل الهوية ومكتبة الأصول'],
        } },
      { id: 'social-media-marketing',
        name: { en: 'Social Media Marketing', ar: 'التسويق عبر منصات التواصل' },
        summary: { en: 'Platform-native content and community management, measured by what it moves.', ar: 'محتوى بلغة كل منصة وإدارة للمجتمع، يُقاس بما يحققه.' },
        includes: {
          en: ['Social strategy and content pillars', 'Bilingual design, copy and short-form video', 'Community management', 'Influencer and creator campaigns'],
          ar: ['استراتيجية المنصات وركائز المحتوى', 'تصميم وكتابة وفيديو قصير بلغتين', 'إدارة المجتمع والتفاعل', 'حملات المؤثرين وصنّاع المحتوى'],
        } },
      { id: 'content-marketing',
        name: { en: 'Content Marketing', ar: 'تسويق المحتوى' },
        summary: { en: 'Content that earns attention and moves buyers toward a decision.', ar: 'محتوى يكسب الانتباه ويقرّب المشتري من قراره.' },
        includes: pending, scopePending: true },
      { id: 'media-production',
        name: { en: 'Media Production', ar: 'الإنتاج الإعلامي' },
        summary: { en: 'Photography, video and motion produced for the feed it will run in.', ar: 'تصوير وفيديو وموشن يُنتج للمنصة التي سيُعرض عليها.' },
        includes: pending, scopePending: true },
    ],
  },
  {
    id: 'media', n: '03',
    name: { en: 'Media & Performance', ar: 'الإعلانات والأداء' },
    value: { en: 'Paid media planned, bought and optimised against sales, leads and revenue — with budget moved toward what is working.', ar: 'إعلانات مدفوعة تُخطط وتُشترى وتُحسَّن وفق المبيعات والعملاء والإيرادات، مع تحريك الميزانية نحو ما ينجح.' },
    services: [
      { id: 'performance-marketing',
        name: { en: 'Performance Marketing', ar: 'التسويق بالأداء والإعلانات الممولة' },
        summary: { en: 'Paid search and paid social, planned, tested and scaled against revenue — not reach.', ar: 'إعلانات البحث والتواصل، تُخطط وتُختبر وتتوسع وفق الإيراد لا الوصول.' },
        includes: {
          en: ['Google Ads: Search, Shopping and YouTube', 'Meta: Facebook and Instagram', 'Snapchat and TikTok', 'LinkedIn for B2B lead generation', 'Retargeting and A/B testing', 'Lead-generation campaigns for real estate'],
          ar: ['إعلانات Google: البحث والتسوق ويوتيوب', 'Meta: فيسبوك وإنستغرام', 'سناب شات وتيك توك', 'لينكدإن لتوليد العملاء في قطاع الأعمال', 'إعادة الاستهداف واختبارات A/B', 'حملات توليد العملاء للعقارات'],
        } },
    ],
  },
  {
    id: 'digital', n: '04',
    name: { en: 'Digital & Technology', ar: 'التقنية والقنوات الرقمية' },
    value: { en: 'The website, search presence and tracking that turn attention into enquiries — and show clearly what worked.', ar: 'الموقع والظهور في البحث والقياس الذي يحوّل الاهتمام إلى طلبات، ويبيّن بوضوح ما الذي نجح.' },
    services: [
      { id: 'seo',
        name: { en: 'SEO', ar: 'تحسين محركات البحث' },
        summary: { en: 'Be found by buyers who are already searching, in Arabic and English.', ar: 'كن حاضراً أمام من يبحث عنك بالفعل، بالعربية والإنجليزية.' },
        includes: pending, scopePending: true },
      { id: 'website-development-cro',
        name: { en: 'Website Development & CRO', ar: 'تطوير المواقع وتحسين التحويل' },
        summary: { en: 'Fast, bilingual websites built to turn visits into enquiries and sales.', ar: 'مواقع سريعة بلغتين، تُبنى لتحويل الزيارة إلى طلب وبيع.' },
        includes: pending, scopePending: true },
      { id: 'analytics-growth',
        name: { en: 'Analytics & Growth', ar: 'التحليلات والنمو' },
        summary: { en: 'Tracking you can trust, and reports that end with the next decision.', ar: 'قياس يمكن الوثوق به، وتقارير تنتهي بالقرار التالي.' },
        includes: pending, scopePending: true },
    ],
  },
];

export const SERVICES = DISCIPLINES.flatMap((d) => d.services.map((s) => ({ ...s, discipline: d })));
export const serviceName = (id: string, lang: Lang) => SERVICES.find((s) => s.id === id)?.name[lang] ?? id;
