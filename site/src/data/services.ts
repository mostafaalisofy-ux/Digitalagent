// 9 services (D-003) grouped in 4 pillars (P-010). Scope from docs/SERVICES_AND_CAPABILITIES.md.
// Copy is original SayTamm writing — never copied from any other agency's site.
import type { Lang } from '../config/site';
type T = Record<Lang, string>;
export interface Service { id: string; name: T; summary: T; includes: Record<Lang, string[]>; scopePending?: boolean }
export interface Pillar { id: string; n: string; name: T; question: T; line: T; services: Service[] }

export const PILLARS: Pillar[] = [
  {
    id: 'strategy', n: '01',
    name: { en: 'Strategy & Brand', ar: 'الاستراتيجية والعلامة' },
    question: { en: 'What should happen — and why.', ar: 'ما الذي يجب أن يحدث، ولماذا.' },
    line: { en: 'Say the objective. Tamm the plan.', ar: 'قل الهدف. ونحن نُتمّ الخطة.' },
    services: [
      { id: 'digital-marketing-strategy',
        name: { en: 'Digital Marketing Strategy', ar: 'استراتيجية التسويق الرقمي' },
        summary: { en: 'A written plan that ties every channel to a business number.', ar: 'خطة مكتوبة تربط كل قناة برقم يهم عملك.' },
        includes: {
          en: ['Market & competitor research (KSA / GCC)', 'High-value customer profile', 'Positioning & value proposition', 'Channel priority & budget allocation model', '90-day roadmap'],
          ar: ['دراسة السوق والمنافسين في السعودية والخليج', 'ملف العميل الأعلى قيمة', 'التموضع والقيمة المقدمة', 'أولويات القنوات ونموذج توزيع الميزانية', 'خارطة طريق لتسعين يوماً'],
        } },
      { id: 'branding',
        name: { en: 'Branding & Identity', ar: 'الهوية والعلامة التجارية' },
        summary: { en: 'Positioning first, design second — Arabic and English built together.', ar: 'التموضع أولاً ثم التصميم — بالعربية والإنجليزية معاً من اليوم الأول.' },
        includes: {
          en: ['Brand strategy & positioning', 'Naming, messaging & tone of voice', 'Logo & visual identity system', 'Brand guidelines & asset library'],
          ar: ['استراتيجية العلامة وتموضعها', 'التسمية والرسائل ونبرة الصوت', 'الشعار ونظام الهوية البصرية', 'دليل الهوية ومكتبة الأصول'],
        } },
    ],
  },
  {
    id: 'media', n: '02',
    name: { en: 'Media & Performance', ar: 'الوسائط والأداء' },
    question: { en: 'Where investment should work hardest.', ar: 'أين يجب أن تعمل الميزانية بأقصى قوة.' },
    line: { en: 'Say the target. Tamm the result.', ar: 'قل المستهدف. ونحن نُتمّ النتيجة.' },
    services: [
      { id: 'performance-marketing',
        name: { en: 'Performance Marketing', ar: 'التسويق بالأداء والإعلانات الممولة' },
        summary: { en: 'Paid media planned, tested and scaled against revenue — not reach.', ar: 'إعلانات ممولة تُخطَّط وتُختبر وتتوسع وفق الإيراد، لا الوصول.' },
        includes: {
          en: ['Google Ads — Search, Shopping, YouTube', 'Meta — Facebook & Instagram', 'Snapchat & TikTok', 'LinkedIn for B2B lead generation', 'Retargeting & A/B testing'],
          ar: ['إعلانات Google — البحث والتسوق ويوتيوب', 'Meta — فيسبوك وإنستغرام', 'سناب شات وتيك توك', 'لينكدإن لتوليد العملاء في قطاع الأعمال', 'إعادة الاستهداف واختبارات A/B'],
        } },
      { id: 'seo',
        name: { en: 'SEO', ar: 'تحسين محركات البحث' },
        summary: { en: 'Be found by buyers who are already searching — in Arabic and English.', ar: 'كن حاضراً أمام من يبحث عنك بالفعل — بالعربية والإنجليزية.' },
        includes: { en: ['Scope being finalised'], ar: ['النطاق قيد الاعتماد'] }, scopePending: true },
    ],
  },
  {
    id: 'content', n: '03',
    name: { en: 'Content & Social', ar: 'المحتوى والتواصل الاجتماعي' },
    question: { en: 'What your audience sees — and does next.', ar: 'ما يراه جمهورك، وما يفعله بعد ذلك.' },
    line: { en: 'Say the audience. Tamm the reach.', ar: 'قل الجمهور. ونحن نُتمّ الوصول.' },
    services: [
      { id: 'social-media-marketing',
        name: { en: 'Social Media Marketing', ar: 'التسويق عبر وسائل التواصل' },
        summary: { en: 'Platform-native content and community, measured by what it moves.', ar: 'محتوى ومجتمع بلغة كل منصة، يُقاس بما يحرّكه.' },
        includes: {
          en: ['Social strategy & content pillars', 'Bilingual design, copy & short-form video', 'Community management', 'Influencer & creator campaigns'],
          ar: ['استراتيجية المنصات وركائز المحتوى', 'تصميم وكتابة وفيديو قصير بلغتين', 'إدارة المجتمع والتفاعل', 'حملات المؤثرين وصنّاع المحتوى'],
        } },
      { id: 'content-marketing',
        name: { en: 'Content Marketing', ar: 'تسويق المحتوى' },
        summary: { en: 'Content that earns attention and moves buyers toward a decision.', ar: 'محتوى يكسب الانتباه ويقرّب المشتري من القرار.' },
        includes: { en: ['Scope being finalised'], ar: ['النطاق قيد الاعتماد'] }, scopePending: true },
      { id: 'media-production',
        name: { en: 'Media Production', ar: 'الإنتاج الإعلامي' },
        summary: { en: 'Photography, video and motion made for the feed it will run in.', ar: 'تصوير وفيديو وموشن مصمم للمنصة التي سيُعرض عليها.' },
        includes: { en: ['Scope being finalised'], ar: ['النطاق قيد الاعتماد'] }, scopePending: true },
    ],
  },
  {
    id: 'data', n: '04',
    name: { en: 'Data & Conversion', ar: 'البيانات والتحويل' },
    question: { en: 'What the numbers are saying — and what happens next.', ar: 'ماذا تقول الأرقام، وما الخطوة التالية.' },
    line: { en: 'Say the question. Tamm the answer.', ar: 'قل السؤال. ونحن نُتمّ الإجابة.' },
    services: [
      { id: 'website-development-cro',
        name: { en: 'Website Development & CRO', ar: 'تطوير المواقع وتحسين التحويل' },
        summary: { en: 'Fast, bilingual sites built to turn visits into enquiries and sales.', ar: 'مواقع سريعة بلغتين، مبنية لتحويل الزيارة إلى طلب وبيع.' },
        includes: { en: ['Scope being finalised'], ar: ['النطاق قيد الاعتماد'] }, scopePending: true },
      { id: 'analytics-growth',
        name: { en: 'Analytics & Growth', ar: 'التحليلات والنمو' },
        summary: { en: 'Tracking you can trust, reports that end with the next move.', ar: 'قياس يمكن الوثوق به، وتقارير تنتهي بالخطوة التالية.' },
        includes: { en: ['Scope being finalised'], ar: ['النطاق قيد الاعتماد'] }, scopePending: true },
    ],
  },
];
