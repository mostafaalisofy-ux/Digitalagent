// All interface copy, EN + AR. Arabic is written for its own composition (not a line-by-line
// translation) and is pending native review before launch (OQ-25).
import type { Lang } from '../config/site';

export const UI = {
  en: {
    meta: {
      homeTitle: 'SayTamm | Digital Marketing & Performance Agency',
      homeDesc: 'SayTamm connects strategy, creative, media and technology to help brands move forward through purposeful digital marketing and performance.',
      servicesTitle: 'Services — Strategy, Creative, Media & Digital | SayTamm',
      servicesDesc: 'Nine digital marketing services in four disciplines — strategy, creative, media and digital — each planned around one business objective.',
      workTitle: 'Work — Case Studies and Results | SayTamm',
      workDesc: 'Case studies from the SayTamm team: e-commerce, real estate and banking campaigns in Saudi Arabia, the Gulf and Egypt, with how each result was measured.',
      contactTitle: 'Start a Project | SayTamm',
      contactDesc: 'Tell us your objective, market and timeline. We reply with how we would approach it.',
      aboutTitle: 'About SayTamm | Digital Marketing & Performance Agency',
      aboutDesc: 'Who SayTamm is, how we think and how we work: one team connecting strategy, creative, media and technology to each brand’s business objective.',
      caseSuffix: 'Case study | SayTamm',
    },
    nav: { about: 'About', work: 'Work', services: 'Services', contact: 'Contact', cta: 'Start a project', switch: 'العربية', switchLabel: 'Switch to Arabic', menu: 'Menu', close: 'Close', home: 'SayTamm — home' },
    preview: 'Preview build · content and figures pending final approval',
    hero: {
      eyebrow: 'Digital marketing & performance agency',
      l1: 'Say it.', l2: 'Tamm it.',
      sub: 'SayTamm brings strategy, creative, media and technology together under one connected approach to growth, with every channel answering to the sales, leads or revenue you set at the start.',
      cta: 'Start a project', cta2: 'Explore our work',
      scroll: 'Selected work below',
    },
    services: { eyebrow: 'Services', title: ['Nine services.', 'One objective.'], intro: 'Every engagement is planned around one business objective. Hire us for a single service, or for the connected plan.', includes: 'Includes', pending: 'Scope to be confirmed', cta: 'Discuss this service', index: 'Disciplines', count: (n: number) => (n === 1 ? '1 service' : `${n} services`) },
    workPage: { eyebrow: 'Work', title: ['Work that', 'moved the number.'], intro: 'Case studies from the SayTamm team across e-commerce, real estate and banking, in Saudi Arabia, the Gulf and Egypt. Each shows what was measured and where the figure comes from.', label: 'Team track record: projects led by members of the SayTamm team, including work delivered at other agencies.' },
    contact: {
      eyebrow: 'Start a project', title: ['Tell us about', 'the project.'],
      intro: 'Share your objective, your market and your timeline. We’ll reply with how we would approach it and what we would need from you to start.',
      direct: 'Prefer email?', fields: {
        name: 'Your name', email: 'Work email', company: 'Company', role: 'Your role (optional)', phone: 'Phone (optional)', website: 'Website (optional)',
        industry: 'Industry (optional)', market: 'Main market (optional)', timeline: 'When do you want to start? (optional)', choose: 'Choose…',
        services: 'What do you need?', budget: 'Monthly media budget, SAR (optional)', message: 'What are you trying to achieve?', consent: 'I agree that SayTamm may use these details to respond to my enquiry, as described in the',
        privacy: 'privacy notice',
      },
      unsure: 'Not sure yet',
      markets: ['Saudi Arabia', 'UAE', 'Other GCC market', 'Egypt', 'Other MENA market', 'Outside MENA', 'More than one market'],
      timelines: ['As soon as possible', 'Within a month', 'In 1–3 months', 'Later this year', 'Just exploring'],
      
      submit: 'Open in my email app', sending: 'Preparing…', copy: 'Copy message', copied: 'Copied',
      errors: { required: 'This field is required.', email: 'Enter a valid email address.', phone: 'Enter a valid phone number, including the country code.', website: 'Enter a full web address, for example https://example.com.', services: 'Choose at least one option.', consent: 'Please confirm to continue.', summary: 'Please fix the highlighted fields.' },
      done: 'Your email app should now be open with your enquiry addressed to info@saytamm.com. Press send there to reach us. If it didn’t open, copy the message and email it to us directly.',
      notice: 'This form doesn’t send anything by itself. It opens your email app with your enquiry ready to send to info@saytamm.com.',
    },
    footer: { line: 'Say it. Tamm it.', desc: 'Digital marketing & performance agency', contact: 'Contact', email: 'Email', nav: 'Explore', lang: 'Language', rights: 'All rights reserved.', privacy: 'Privacy notice' },
    notFound: { title: 'This page didn’t make it.', body: 'The link may be old. Let’s get you somewhere useful.', home: 'Back to home' },
  },
  ar: {
    meta: {
      homeTitle: 'قول تم | وكالة تسويق رقمي وأداء',
      homeDesc: 'قول تم وكالة تسويق رقمي وأداء تجمع الاستراتيجية والإبداع والإعلانات والتقنية في منظومة واحدة لدعم نمو العلامات التجارية.',
      servicesTitle: 'الخدمات — الاستراتيجية والإبداع والإعلانات والتقنية | قول تم',
      servicesDesc: 'تسع خدمات في أربعة تخصصات: الاستراتيجية والاستشارات، والإبداع والمحتوى، والإعلانات والأداء، والتقنية والقنوات الرقمية.',
      workTitle: 'أعمالنا — دراسات الحالة والنتائج | قول تم',
      workDesc: 'دراسات حالة من فريق قول تم لحملات في التجارة الإلكترونية والعقارات والبنوك في السعودية والخليج ومصر، مع طريقة قياس كل نتيجة.',
      contactTitle: 'ابدأ مشروعك | قول تم',
      contactDesc: 'أخبرنا بهدفك وسوقك وجدولك الزمني، ونرد عليك بالطريقة التي نقترحها للعمل.',
      aboutTitle: 'من نحن | قول تم — وكالة تسويق رقمي وأداء',
      aboutDesc: 'من نحن وكيف نفكر وكيف نعمل: فريق واحد يربط الاستراتيجية والإبداع والإعلانات والتقنية بهدف العمل لدى كل علامة.',
      caseSuffix: 'دراسة حالة | قول تم',
    },
    nav: { about: 'من نحن', work: 'أعمالنا', services: 'خدماتنا', contact: 'تواصل معنا', cta: 'ابدأ مشروعك', switch: 'English', switchLabel: 'التبديل إلى الإنجليزية', menu: 'القائمة', close: 'إغلاق', home: 'قول تم — الرئيسية' },
    preview: 'نسخة معاينة · المحتوى والأرقام بانتظار الاعتماد النهائي',
    hero: {
      eyebrow: 'وكالة تسويق رقمي وأداء',
      l1: 'قول.', l2: 'تم.',
      sub: 'في قول تم، نجمع الاستراتيجية والإبداع والإعلانات والتقنية في منظومة واحدة. نفهم أهداف الأعمال، ونبني خطط التسويق، ونحوّلها إلى تنفيذ واضح ونتائج قابلة للقياس.',
      cta: 'ابدأ مشروعك', cta2: 'استكشف أعمالنا',
      scroll: 'أعمال مختارة في الأسفل',
    },
    services: { eyebrow: 'خدماتنا', title: ['تسع خدمات.', 'هدف واحد.'], intro: 'نخطط كل تعاون حول هدف تجاري واحد. اطلب خدمة واحدة، أو الخطة المتكاملة.', includes: 'تشمل', pending: 'النطاق بانتظار التأكيد', cta: 'ناقش هذه الخدمة', index: 'التخصصات', count: (n: number) => (n === 1 ? 'خدمة واحدة' : n === 2 ? 'خدمتان' : `${n} خدمات`) },
    workPage: { eyebrow: 'أعمالنا', title: ['أعمال', 'صنعت فرقاً.'], intro: 'دراسات حالة من فريق قول تم في التجارة الإلكترونية والعقارات والبنوك، في السعودية والخليج ومصر. ولكل منها ما الذي قيس ومن أين جاء الرقم.', label: 'سجل إنجاز الفريق: مشاريع قادها أعضاء من فريق قول تم، ومنها أعمال نُفّذت في وكالات أخرى.' },
    contact: {
      eyebrow: 'ابدأ مشروعك', title: ['حدّثنا', 'عن مشروعك.'],
      intro: 'شاركنا هدفك وسوقك وجدولك الزمني، وسنرد عليك بالطريقة التي نقترحها للعمل، وبما نحتاجه منك لنبدأ.',
      direct: 'تفضّل البريد؟', fields: {
        name: 'الاسم', email: 'بريد العمل', company: 'الشركة', role: 'المنصب (اختياري)', phone: 'الجوال (اختياري)', website: 'الموقع الإلكتروني (اختياري)',
        industry: 'القطاع (اختياري)', market: 'السوق الرئيسي (اختياري)', timeline: 'متى تريد أن تبدأ؟ (اختياري)', choose: 'اختر…',
        services: 'ماذا تحتاج؟', budget: 'الميزانية الإعلانية الشهرية بالريال (اختياري)', message: 'ما الهدف الذي تريد تحقيقه؟', consent: 'أوافق على استخدام قول تم لهذه البيانات للرد على طلبي، كما هو موضّح في',
        privacy: 'إشعار الخصوصية',
      },
      unsure: 'لست متأكداً بعد',
      markets: ['السعودية', 'الإمارات', 'سوق خليجي آخر', 'مصر', 'سوق آخر في الشرق الأوسط وشمال أفريقيا', 'خارج المنطقة', 'أكثر من سوق'],
      timelines: ['في أقرب وقت', 'خلال شهر', 'خلال شهر إلى ثلاثة أشهر', 'لاحقاً هذا العام', 'أستكشف الخيارات فقط'],
      
      submit: 'افتح في تطبيق البريد', sending: 'جارٍ التجهيز…', copy: 'نسخ الرسالة', copied: 'تم النسخ',
      errors: { required: 'هذا الحقل مطلوب.', email: 'أدخل بريداً إلكترونياً صحيحاً.', phone: 'أدخل رقم هاتف صحيحاً مع رمز الدولة.', website: 'أدخل عنواناً كاملاً، مثل https://example.com.', services: 'اختر خياراً واحداً على الأقل.', consent: 'يرجى التأكيد للمتابعة.', summary: 'يرجى تصحيح الحقول المحددة.' },
      done: 'يُفترض أن تطبيق البريد فُتح الآن ورسالتك موجّهة إلى info@saytamm.com. اضغط «إرسال» هناك لتصلنا. وإن لم يُفتح، انسخ الرسالة وأرسلها إلينا مباشرة.',
      notice: 'لا يُرسل هذا النموذج شيئاً بنفسه، بل يفتح تطبيق البريد لديك ورسالتك جاهزة للإرسال إلى info@saytamm.com.',
    },
    footer: { line: 'قول. تم.', desc: 'وكالة تسويق رقمي وأداء', contact: 'تواصل', email: 'البريد', nav: 'استكشف', lang: 'اللغة', rights: 'جميع الحقوق محفوظة.', privacy: 'إشعار الخصوصية' },
    notFound: { title: 'هذه الصفحة لم تكتمل.', body: 'ربما الرابط قديم. لنأخذك إلى مكان مفيد.', home: 'العودة للرئيسية' },
  },
} as const;

export type Dict = (typeof UI)['en'];
export const t = (lang: Lang) => UI[lang] as unknown as Dict;
