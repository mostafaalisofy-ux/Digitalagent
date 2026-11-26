// Website v1.0 copy (D-026): the sections that follow the 2026 company profile. English is British;
// Arabic is written natively in professional MSA (not translated line by line), «» quotes, Western digits.
// Facts: only the approved set (2021 · 30 · 15+ · 200+ · 20+ · 5 markets as experience, not offices).
import type { Lang } from '../config/site';
type T = Record<Lang, string>;

export interface Industry {
  id: string; name: T; made: T; desc: T; brands: string;
  layout: 'tri' | 'mix' | 'ge' | 'gf'; images: string[];
}

export const INDUSTRIES: Industry[] = [
  { id: 'automotive', name: { en: 'Automotive', ar: 'السيارات' },
    made: { en: 'Model posts and launch teasers', ar: 'منشورات الطرازات وتشويق الإطلاق' },
    desc: { en: 'Posts for three SUV and sedan models, each built on one short Arabic line, plus a “coming soon” teaser set against the Riyadh skyline.',
            ar: 'منشورات لثلاثة طرازات بين الدفع الرباعي والسيدان، يقوم كلٌّ منها على سطر عربي واحد قصير، وإعلان تشويقي «قريبًا» على خلفية أفق الرياض.' },
    brands: 'Chery Saudi', layout: 'tri', images: ['sp_012', 'sp_013', 'sp_014'] },
  { id: 'electronics', name: { en: 'Consumer electronics', ar: 'الإلكترونيات الاستهلاكية' },
    made: { en: 'Product launches and social', ar: 'إطلاق المنتجات ومنصات التواصل' },
    desc: { en: 'Launch posts for tablets, phones and wearables, written for Arabic feeds and built around one benefit each.',
            ar: 'منشورات إطلاق للأجهزة اللوحية والهواتف والأجهزة القابلة للارتداء، كُتبت لجمهور عربي، وتدور كلٌّ منها حول ميزة واحدة.' },
    brands: 'Xiaomi · POCO', layout: 'ge',
    images: ['post_xiaomi1_1', 'post_xiaomi1_0', 'post_xiaomi2_0', 'post_poco_1', 'post_xiaomi2_1', 'post_xiaomi2_2', 'post_poco_0', 'post_xiaomi1_2', 'post_poco_2'] },
  { id: 'appliances', name: { en: 'Home appliances', ar: 'الأجهزة المنزلية' },
    made: { en: 'Locally made appliances, in real homes', ar: 'أجهزة صُنعت محليًا، في بيوت حقيقية' },
    desc: { en: 'Washing machines, refrigerators and freezers placed in real Saudi rooms, with “made in Saudi” at the centre of every line.',
            ar: 'غسالات وثلاجات ومجمّدات في غرف سعودية حقيقية، و«صُنع في السعودية» في قلب كل رسالة.' },
    brands: 'Zahid Electra', layout: 'tri', images: ['sp_015', 'sp_016', 'sp_017'] },
  { id: 'food', name: { en: 'Food & hospitality', ar: 'المطاعم والضيافة' },
    made: { en: 'Restaurant and hotel content', ar: 'محتوى المطاعم والفنادق' },
    desc: { en: 'Day and night moods for an Italian restaurant, street-food photography and branding for a burger concept, and a Chinese restaurant’s opening season.',
            ar: 'أجواء النهار والليل لمطعم إيطالي، وتصوير وهوية لمفهوم برجر، وموسم افتتاح لمطعم صيني.' },
    brands: 'Altopiano · JORA · Havenue', layout: 'gf',
    images: ['alto4k_d', 'alto4k_a', 'post_havenue_0', 'post_jora1_1', 'post_alto1_5', 'post_jora2_4', 'post_alto2_2', 'post_jora1_0', 'post_havenue_1', 'post_jora2_2', 'post_alto1_4', 'post_jora2_5', 'post_alto2_3', 'post_jora1_2'] },
  { id: 'fashion', name: { en: 'Fashion & beauty', ar: 'الأزياء والتجميل' },
    made: { en: 'Campaigns, labels and product photography', ar: 'حملات وعبوات وتصوير منتجات' },
    desc: { en: 'A one-promise campaign look — your size, your style — plus labels, product photography and a fashion identity.',
            ar: 'حملة بوعد واحد، «مقاسك، أسلوبك»، إلى جانب عبوات وتصوير منتجات وهوية لعلامة أزياء.' },
    brands: 'niimee · Beauty Lab · Somavie · Alia', layout: 'tri', images: ['sp_018', 'sp_019', 'sp_025'] },
  { id: 'technology', name: { en: 'Technology & software', ar: 'التقنية والبرمجيات' },
    made: { en: 'Platform-native social for business', ar: 'محتوى مصمَّم لكل منصة، للشركات' },
    desc: { en: 'Gaming-PC posts in Saudi dialect, and clear, product-led social for software, content and IT services brands.',
            ar: 'منشورات أجهزة الألعاب باللهجة السعودية، ومحتوى واضح يقوده المنتج لعلامات البرمجيات والمحتوى وخدمات تقنية المعلومات.' },
    brands: 'Tech Hive · Siyaq · Fatora Plus · TECSPRO', layout: 'mix', images: ['sp_027', 'cp_siyaq', 'cp_fatora'] },
  { id: 'industry', name: { en: 'Construction & industry', ar: 'البناء والصناعة' },
    made: { en: 'Building materials and equipment', ar: 'مواد البناء والمعدات' },
    desc: { en: 'Industrial products shown at the scale of the sites they are used on, with one technical benefit per post.',
            ar: 'منتجات صناعية تُعرض بحجم المواقع التي تُستخدم فيها، مع ميزة تقنية واحدة في كل منشور.' },
    brands: 'BITUMAT · DC BLOCK · SIEFCO · Alqimma', layout: 'mix', images: ['sp_003', 'cp_dcblock', 'cp_siefco'] },
];

export const JOURNEY: { title: T; text: T; img: string }[] = [
  { img: 'stk_brief', title: { en: 'Brief', ar: 'البريف' }, text: { en: 'The goal in one sentence, and the questions behind it.', ar: 'الهدف في جملة واحدة، والأسئلة التي تقف خلفه.' } },
  { img: 'stk_prep', title: { en: 'Preparation', ar: 'التحضير' }, text: { en: 'Market and competitors, the audience, positioning, the plan.', ar: 'السوق والمنافسون، والجمهور، والتموضع، والخطة.' } },
  { img: 'stk_idea', title: { en: 'Idea', ar: 'الفكرة' }, text: { en: 'One idea strong enough to carry the whole campaign.', ar: 'فكرة واحدة قوية بما يكفي لتحمل الحملة كلها.' } },
  { img: 'stk_production', title: { en: 'Production', ar: 'الإنتاج' }, text: { en: 'Shot and built for the platform it will run on.', ar: 'تصوير وتنفيذ مصمَّمان للمنصة التي سيُعرضان عليها.' } },
  { img: 'stk_content', title: { en: 'Content', ar: 'المحتوى' }, text: { en: 'A language for every platform, in Arabic and English.', ar: 'لغة لكل منصة، بالعربية والإنجليزية.' } },
  { img: 'stk_media', title: { en: 'Media', ar: 'الإعلانات' }, text: { en: 'Hooks tested, budget moved toward what is working.', ar: 'نختبر المداخل، وننقل الميزانية إلى ما يحقق النتيجة.' } },
  { img: 'stk_seo', title: { en: 'SEO', ar: 'تحسين البحث' }, text: { en: 'Found by the people already searching.', ar: 'يجدك من يبحث عنك بالفعل.' } },
  { img: 'stk_reporting', title: { en: 'Reporting', ar: 'التقارير' }, text: { en: 'Reports that end with the next decision.', ar: 'تقارير تنتهي بالقرار التالي.' } },
];

export const QUOTES: { q: string; who: string }[] = [
  { q: 'SayTamm helped us build a real digital presence from scratch. Within a few months, our brand was visible across all platforms, and we started getting serious inquiries.', who: 'DC BLOCK' },
  { q: 'From branding to performance campaigns, SayTamm handled everything with precision. The results exceeded our expectations in both reach and sales.', who: 'Musalli Jewelry' },
  { q: 'SayTamm gave our marketing a clear direction and executed it with precision. We’ve seen stronger brand presence, better audience targeting, and a steady flow of high-quality leads.', who: 'Alqimma Equipment' },
  { q: 'Working with SayTamm helped us transform our digital presence and generate qualified leads consistently. The team is proactive, creative, and truly understands business needs.', who: 'BITUMAT' },
  { q: 'SayTamm elevated our brand positioning and delivered high-quality content that reflects our identity perfectly.', who: 'ALTOPIANO' },
  { q: 'Professional team with strong execution. Our campaigns became more structured, and we started seeing measurable ROI within a short time.', who: 'K.S Furniture' },
];

const COPY = {
  en: {
    tammAlt: 'Tamm, the SayTamm character, pointing at the work',
    name: { eyebrow: 'The name', title: ['The name', 'is the promise.'],
      body: 'In everyday Gulf Arabic, «qul tamm» is what you hear when a request is as good as done. You tell us the goal; we take responsibility for getting there.',
      card: 'Meet Tamm. He says it; the team Tamms it.' },
    facts: [['2021', 'Founded'], ['30', 'People on the team'], ['15+', 'Years of founder-led digital marketing'], ['200+', 'Brands in the founder’s track record'], ['20+', 'Industries'], ['5', 'Markets in the team’s track record']],
    work: { eyebrow: 'Show me the work', title: 'Work, by industry.', all: 'See all client work', tabs: 'Industries' },
    cases: { eyebrow: 'Case studies', title: 'The work, measured.', body: 'Each figure says what it measures and where it comes from. ROAS is revenue divided by ad spend, not profit.', read: 'Read the case', measured: 'How it was measured', photo: 'Photography: stock, for illustration.' },
    journey: { eyebrow: 'Working with us', title: 'From the brief to the next decision.' },
    quotes: { eyebrow: 'In their words', title: 'What clients say.' },
    end: { eyebrow: 'Where the team has worked', title: ['Tell us the goal.', 'We take it from there.'],
      body: 'Saudi Arabia, Egypt and the UAE, with work in Kuwait and Oman: markets the team knows first-hand. Experience, not offices.',
      sky: 'Line drawing of landmarks in Egypt, Saudi Arabia and the UAE', email: 'Or email' },
  },
  ar: {
    tammAlt: 'تم، شخصية قول تم، يشير إلى الأعمال',
    name: { eyebrow: 'الاسم', title: ['الاسم', 'هو الوعد.'],
      body: 'في اللهجة الخليجية، «قول تم» هي ما تسمعه حين يصبح طلبك في حكم المنجَز. أخبرنا بالهدف، ونحن نتحمّل مسؤولية الوصول إليه.',
      card: 'هذا تم. يقولها، والفريق يُتمّها.' },
    facts: [['2021', 'سنة التأسيس'], ['30', 'شخصًا في الفريق'], ['15+', 'عامًا من قيادة المؤسس للتسويق الرقمي'], ['200+', 'علامة في سجل المؤسس'], ['20+', 'قطاعًا'], ['5', 'أسواق في سجل الفريق']],
    work: { eyebrow: 'أرنا أعمالكم', title: 'أعمالنا حسب القطاع.', all: 'كل أعمال العملاء', tabs: 'القطاعات' },
    cases: { eyebrow: 'دراسات حالة', title: 'العمل، بالأرقام.', body: 'كل رقم يذكر ما يقيسه ومن أين جاء. العائد على الإنفاق الإعلاني (ROAS) هو الإيراد مقسومًا على الإنفاق، وليس ربحًا.', read: 'اقرأ دراسة الحالة', measured: 'كيف قيس الرقم', photo: 'الصور: صور أرشيفية للتوضيح.' },
    journey: { eyebrow: 'العمل معنا', title: 'من البريف إلى القرار التالي.' },
    quotes: { eyebrow: 'بكلمات عملائنا', title: 'ماذا يقول العملاء.' },
    end: { eyebrow: 'حيث عمل الفريق', title: ['أخبرنا بالهدف.', 'والباقي علينا.'],
      body: 'السعودية ومصر والإمارات، إلى جانب أعمال في الكويت وعُمان: أسواق يعرفها الفريق عن قرب. خبرة، لا مكاتب.',
      sky: 'رسم خطي لمعالم من مصر والسعودية والإمارات', email: 'أو راسلنا على' },
  },
} as const;
export const v1 = (lang: Lang) => COPY[lang];
