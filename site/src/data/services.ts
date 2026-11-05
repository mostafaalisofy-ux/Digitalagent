// The 9 services SayTamm offers (D-003), organised in 4 disciplines (owner brief, final redesign).
// Only these services are published. Capabilities listed under "includes" are limited to what the
// adopted service scope (D-003), SayTamm's own delivered work (D-016–D-018) or the team's case
// material supports — see docs/SERVICES_AND_CAPABILITIES.md §Evidence for the basis of each line.
// Scope approved by the project owner, 2026-11-05 (Sprint 3 global authorisation). Never add a
// capability here (a studio, a certification, a tool partnership) without evidence.
import type { Lang } from '../config/site';
type T = Record<Lang, string>;
export interface Service { id: string; name: T; summary: T; includes: Record<Lang, string[]>; scopePending?: boolean }
export interface Discipline { id: string; n: string; name: T; value: T; services: Service[] }

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
          en: ['Market and competitor research in each market you compete in, from Saudi Arabia and the Gulf to the wider region', 'High-value customer profile, in Arabic and English buying behaviour', 'Positioning statement and value proposition', 'Messaging framework', 'Channel priority plan and budget allocation model', 'Go-to-market sequencing and seasonal planning, such as Ramadan and National Day', 'A written marketing plan with a 90-day roadmap'],
          ar: ['دراسة السوق والمنافسين في كل سوق تنافس فيه، من السعودية والخليج إلى المنطقة الأوسع', 'ملف العميل الأعلى قيمة، وفق سلوك الشراء بالعربية والإنجليزية', 'بيان التموضع والقيمة المقدّمة', 'إطار الرسائل التسويقية', 'خطة أولويات القنوات ونموذج توزيع الميزانية', 'تسلسل دخول السوق والتخطيط الموسمي مثل رمضان واليوم الوطني', 'خطة تسويق مكتوبة مع خارطة طريق لتسعين يوماً'],
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
          en: ['Brand strategy: market and competitor analysis, positioning and differentiation', 'Naming and tagline, when needed', 'Messaging and tone-of-voice guidelines', 'Logo, variations and visual identity system', 'Brand guidelines and asset library'],
          ar: ['استراتيجية العلامة: تحليل السوق والمنافسين، والتموضع، والتمايز', 'التسمية والشعار اللفظي عند الحاجة', 'إرشادات الرسائل ونبرة الصوت', 'الشعار وصيغه ونظام الهوية البصرية', 'دليل الهوية ومكتبة الأصول'],
        } },
      { id: 'social-media-marketing',
        name: { en: 'Social Media Marketing', ar: 'التسويق عبر منصات التواصل' },
        summary: { en: 'Platform-native content and community management, measured by what it moves.', ar: 'محتوى بلغة كل منصة وإدارة للمجتمع، يُقاس بما يحققه.' },
        includes: {
          en: ['Channel audits, audience and competitor analysis', 'Social strategy and monthly content calendars built around each market’s cultural moments', 'Bilingual design, copy and short-form video', 'Community management in Arabic and English', 'Influencer and creator campaigns, with results reporting', 'Monthly performance report'],
          ar: ['تدقيق القنوات، وتحليل الجمهور والمنافسين', 'استراتيجية المنصات وتقويم محتوى شهري حول المناسبات الثقافية في كل سوق', 'تصميم وكتابة وفيديو قصير بلغتين', 'إدارة المجتمع بالعربية والإنجليزية', 'حملات المؤثرين وصنّاع المحتوى مع تقارير النتائج', 'تقرير أداء شهري'],
        } },
      { id: 'content-marketing',
        name: { en: 'Content Marketing', ar: 'تسويق المحتوى' },
        summary: { en: 'Content that earns attention and moves buyers toward a decision.', ar: 'محتوى يكسب الانتباه ويقرّب المشتري من قراره.' },
        includes: {
          en: ['Content plan built around the questions buyers ask before they decide', 'Bilingual campaign and product content, written natively in Arabic and English, including local dialects such as Saudi and Gulf Arabic where they suit the brand', 'One clear message per piece: a product benefit, a service or an offer', 'Seasonal and occasion content, such as Ramadan, Saudi National Day and Founding Day', 'A review of what each piece moved, feeding the next content plan'],
          ar: ['خطة محتوى مبنية على الأسئلة التي يطرحها المشتري قبل قراره', 'محتوى للحملات والمنتجات يُكتب أصلاً بالعربية والإنجليزية، وباللهجات المحلية مثل السعودية والخليجية حين تناسب العلامة', 'رسالة واحدة واضحة في كل قطعة: ميزة منتج أو خدمة أو عرض', 'محتوى المواسم والمناسبات مثل رمضان واليوم الوطني ويوم التأسيس', 'مراجعة ما حققته كل قطعة، لتبنى عليها خطة المحتوى التالية'],
        } },
      { id: 'media-production',
        name: { en: 'Media Production', ar: 'الإنتاج الإعلامي' },
        summary: { en: 'Photography, video and motion produced for the feed it will run in.', ar: 'تصوير وفيديو وموشن يُنتج للمنصة التي سيُعرض عليها.' },
        includes: {
          en: ['Product photography', 'Short-form video for feed and story formats', 'Motion and animated social formats', 'Campaign key visuals and packaging presentation visuals', 'Each piece produced for its platform and aspect ratio (1:1, 4:5, 9:16)'],
          ar: ['تصوير المنتجات', 'فيديو قصير لصيغ المنشورات والقصص', 'موشن وصيغ متحركة لمنصات التواصل', 'التصاميم الرئيسية للحملات وتصاميم عرض التغليف', 'كل قطعة تُنتج لمنصتها ومقاسها (1:1 و4:5 و9:16)'],
        } },
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
          en: ['Google Ads: Search, Display, Shopping and YouTube, in Arabic and English', 'Meta: Facebook and Instagram, with creative tested before budgets scale', 'Snapchat and TikTok', 'LinkedIn for B2B lead generation', 'Cross-platform retargeting and A/B testing of copy, creative and landing pages', 'Lead-generation campaigns, including real estate'],
          ar: ['إعلانات Google: البحث والشبكة الإعلانية والتسوق ويوتيوب، بالعربية والإنجليزية', 'Meta: فيسبوك وإنستغرام، مع اختبار المحتوى الإعلاني قبل رفع الميزانيات', 'سناب شات وتيك توك', 'لينكدإن لتوليد العملاء في قطاع الأعمال', 'إعادة الاستهداف عبر المنصات، واختبارات A/B للنصوص والتصاميم وصفحات الهبوط', 'حملات توليد العملاء، ومنها العقارات'],
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
        includes: {
          en: ['Technical review of site structure, speed and indexing', 'Arabic and English keyword research focused on buying intent', 'On-page optimisation of titles, content and internal links', 'Bilingual setup: separate Arabic and English pages, correctly linked for search engines', 'Monthly report on organic visibility and the enquiries it brings'],
          ar: ['مراجعة تقنية لبنية الموقع وسرعته وفهرسته', 'بحث الكلمات المفتاحية بالعربية والإنجليزية مع التركيز على نية الشراء', 'تحسين العناوين والمحتوى والروابط الداخلية في الصفحات', 'إعداد ثنائي اللغة: صفحات عربية وإنجليزية منفصلة ومرتبطة بشكل صحيح لمحركات البحث', 'تقرير شهري عن الظهور في نتائج البحث والطلبات التي يجلبها'],
        } },
      { id: 'website-development-cro',
        name: { en: 'Website Development & CRO', ar: 'تطوير المواقع وتحسين التحويل' },
        summary: { en: 'Fast, bilingual websites built to turn visits into enquiries and sales.', ar: 'مواقع سريعة بلغتين، تُبنى لتحويل الزيارة إلى طلب وبيع.' },
        includes: {
          en: ['Bilingual websites and landing pages, built right-to-left and left-to-right', 'Fast, lightweight builds with a clean structure for search', 'Pages built around one objective, a clear offer and a short path to contact', 'Enquiry forms and buttons ready for conversion tracking', 'A/B testing of landing pages and offers'],
          ar: ['مواقع وصفحات هبوط بلغتين، تُبنى من اليمين إلى اليسار ومن اليسار إلى اليمين', 'بناء سريع وخفيف ببنية واضحة لمحركات البحث', 'صفحات مبنية حول هدف واحد وعرض واضح وطريق قصير للتواصل', 'نماذج طلب وأزرار جاهزة لقياس التحويل', 'اختبارات A/B لصفحات الهبوط والعروض'],
        } },
      { id: 'analytics-growth',
        name: { en: 'Analytics & Growth', ar: 'التحليلات والنمو' },
        summary: { en: 'Tracking you can trust, and reports that end with the next decision.', ar: 'قياس يمكن الوثوق به، وتقارير تنتهي بالقرار التالي.' },
        includes: {
          en: ['A measurement plan: the number each channel is accountable for', 'Tracking set-up and checks for website and ad-platform conversions', 'Reports that separate platform-attributed results from total business results', 'Regular performance reviews that end with the next budget decision'],
          ar: ['خطة قياس تحدد الرقم المسؤولة عنه كل قناة', 'إعداد القياس والتحقق من التحويلات في الموقع والمنصات الإعلانية', 'تقارير تفصل بين النتائج المنسوبة من المنصات ونتائج العمل الإجمالية', 'مراجعات أداء دورية تنتهي بقرار الميزانية التالي'],
        } },
    ],
  },
];

export const SERVICES = DISCIPLINES.flatMap((d) => d.services.map((s) => ({ ...s, discipline: d })));
export const serviceName = (id: string, lang: Lang) => SERVICES.find((s) => s.id === id)?.name[lang] ?? id;
