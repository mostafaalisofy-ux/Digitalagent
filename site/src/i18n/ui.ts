// All interface copy, EN + AR. Arabic is written for its own composition (not a line-by-line
// translation) and is pending native review before launch (OQ-25).
import type { Lang } from '../config/site';

export const UI = {
  en: {
    meta: {
      homeTitle: 'SayTamm — Digital Marketing & Performance Agency in Saudi Arabia',
      homeDesc: 'SayTamm is a Saudi-focused digital marketing and performance agency combining strategy, creative, media and technology to deliver measurable business growth.',
      servicesTitle: 'Services — Strategy, Creative, Media & Digital | SayTamm',
      servicesDesc: 'Nine services in four disciplines: strategy & consulting, creative & content, media & performance, and digital & technology — planned around one business objective.',
      workTitle: 'Work — Case Studies and Results | SayTamm',
      workDesc: 'Case studies from the SayTamm team: e-commerce, real estate and banking campaigns in Saudi Arabia, the Gulf and Egypt, with how each result was measured.',
      contactTitle: 'Start a Project | SayTamm',
      contactDesc: 'Tell us your objective, market and timeline. We reply with how we would approach it.',
      aboutTitle: 'About SayTamm — Digital Marketing & Performance Agency, Saudi Arabia',
      aboutDesc: 'Who we are, how we work and what we stand for: a Saudi-focused agency that plans, runs and measures digital marketing in one team.',
      caseSuffix: 'Case study | SayTamm',
    },
    nav: { about: 'About', work: 'Work', services: 'Services', contact: 'Contact', cta: 'Start a project', switch: 'العربية', switchLabel: 'Switch to Arabic', menu: 'Menu', close: 'Close', home: 'SayTamm — home' },
    preview: 'Preview build · content and figures pending final approval',
    hero: {
      eyebrow: 'Digital marketing & performance agency · Saudi Arabia',
      l1: 'Say it.', l2: 'Tamm it.',
      sub: 'Strategic thinking. Creative execution. Measurable performance. We help ambitious brands move forward through connected digital marketing.',
      cta: 'Start a project', cta2: 'Explore our work',
      scroll: 'Selected work below',
    },
    services: { eyebrow: 'Services', title: ['Nine services.', 'One objective.'], intro: 'Every engagement is planned around one business objective. Hire us for a single service, or for the connected plan.', includes: 'Includes', pending: 'Detailed scope being finalised', cta: 'Discuss this service' },
    workPage: { eyebrow: 'Work', title: ['Work that', 'moved the number.'], intro: 'Case studies from the SayTamm team across e-commerce, real estate and banking, in Saudi Arabia, the Gulf and Egypt. Each shows what was measured and where the figure comes from.', label: 'Team track record: delivered by members of the SayTamm team before the agency was founded.' },
    contact: {
      eyebrow: 'Start a project', title: ['Say it.', 'We’ll take it from here.'],
      intro: 'Tell us where you are and the number you want to move. We reply with how we would approach it.',
      direct: 'Prefer email?', fields: {
        name: 'Your name', email: 'Work email', company: 'Company', role: 'Your role', phone: 'Phone (optional)', website: 'Website (optional)',
        services: 'What do you need?', budget: 'Monthly media budget, SAR (optional)', message: 'What should move?', consent: 'I agree that SayTamm may use these details to respond to my enquiry.',
      },
      unsure: 'Not sure yet',
      
      submit: 'Send', sending: 'Preparing…',
      errors: { required: 'This field is required.', email: 'Enter a valid email address.', services: 'Choose at least one option.', consent: 'Please confirm to continue.', summary: 'Please fix the highlighted fields.' },
      done: 'Your email app should now open with your message to info@saytamm.com. Send it and we’ll reply.',
      notice: 'Preview: online submission is not connected yet — the form opens your email app instead.',
    },
    footer: { line: 'Say it. Tamm it.', email: 'Email', nav: 'Explore', lang: 'Language', rights: 'All rights reserved.' },
    notFound: { title: 'This page didn’t make it.', body: 'The link may be old. Let’s get you somewhere useful.', home: 'Back to home' },
  },
  ar: {
    meta: {
      homeTitle: 'قول تم | SayTamm — وكالة تسويق رقمي وأداء في السعودية',
      homeDesc: 'قول تم وكالة تسويق رقمي وأداء تركّز على السوق السعودي، تجمع الاستراتيجية والإبداع والإعلانات والتقنية لتحقيق نمو يمكن قياسه.',
      servicesTitle: 'الخدمات — الاستراتيجية والإبداع والإعلانات والتقنية | قول تم',
      servicesDesc: 'تسع خدمات في أربعة تخصصات: الاستراتيجية والاستشارات، والإبداع والمحتوى، والإعلانات والأداء، والتقنية والقنوات الرقمية.',
      workTitle: 'أعمالنا — دراسات الحالة والنتائج | قول تم',
      workDesc: 'دراسات حالة من فريق قول تم لحملات في التجارة الإلكترونية والعقارات والبنوك في السعودية والخليج ومصر، مع طريقة قياس كل نتيجة.',
      contactTitle: 'ابدأ مشروعك | قول تم',
      contactDesc: 'أخبرنا بهدفك وسوقك وجدولك الزمني، ونرد عليك بالطريقة التي نقترحها للعمل.',
      aboutTitle: 'من نحن | قول تم — وكالة تسويق رقمي وأداء في السعودية',
      aboutDesc: 'من نحن وكيف نعمل وما نؤمن به: وكالة تركّز على السوق السعودي تخطط التسويق الرقمي وتنفذه وتقيسه في فريق واحد.',
      caseSuffix: 'دراسة حالة | قول تم',
    },
    nav: { about: 'من نحن', work: 'أعمالنا', services: 'خدماتنا', contact: 'تواصل معنا', cta: 'ابدأ مشروعك', switch: 'English', switchLabel: 'التبديل إلى الإنجليزية', menu: 'القائمة', close: 'إغلاق', home: 'قول تم — الرئيسية' },
    preview: 'نسخة معاينة · المحتوى والأرقام بانتظار الاعتماد النهائي',
    hero: {
      eyebrow: 'وكالة تسويق رقمي وأداء · السعودية',
      l1: 'قول.', l2: 'تم.',
      sub: 'استراتيجية تفهم أهدافك، وإبداع يلفت الانتباه، وأداء يقيس أثر كل خطوة. تسويق رقمي متكامل للعلامات التي تريد نمواً يمكن قياسه.',
      cta: 'ابدأ مشروعك', cta2: 'استكشف أعمالنا',
      scroll: 'أعمال مختارة في الأسفل',
    },
    services: { eyebrow: 'خدماتنا', title: ['تسع خدمات.', 'هدف واحد.'], intro: 'نخطط كل تعاون حول هدف تجاري واحد. اطلب خدمة واحدة، أو الخطة المتكاملة.', includes: 'تشمل', pending: 'تفاصيل النطاق قيد الاعتماد', cta: 'ناقش هذه الخدمة' },
    workPage: { eyebrow: 'أعمالنا', title: ['أعمال', 'صنعت فرقاً.'], intro: 'دراسات حالة من فريق قول تم في التجارة الإلكترونية والعقارات والبنوك، في السعودية والخليج ومصر. ولكل منها ما الذي قيس ومن أين جاء الرقم.', label: 'سجل إنجاز الفريق: أعمال نفّذها أعضاء من فريق قول تم قبل تأسيس الوكالة.' },
    contact: {
      eyebrow: 'ابدأ مشروعك', title: ['قولها.', 'والباقي علينا.'],
      intro: 'أخبرنا أين أنت الآن، وما الرقم الذي تريد تحريكه. سنرد عليك بكيف سنتعامل معه.',
      direct: 'تفضّل البريد؟', fields: {
        name: 'الاسم', email: 'بريد العمل', company: 'الشركة', role: 'المنصب', phone: 'الجوال (اختياري)', website: 'الموقع الإلكتروني (اختياري)',
        services: 'ماذا تحتاج؟', budget: 'الميزانية الإعلانية الشهرية بالريال (اختياري)', message: 'ما الذي يجب أن يتحرك؟', consent: 'أوافق على استخدام قول تم لهذه البيانات للرد على طلبي.',
      },
      unsure: 'لست متأكداً بعد',
      
      submit: 'إرسال', sending: 'جارٍ التجهيز…',
      errors: { required: 'هذا الحقل مطلوب.', email: 'أدخل بريداً إلكترونياً صحيحاً.', services: 'اختر خياراً واحداً على الأقل.', consent: 'يرجى التأكيد للمتابعة.', summary: 'يرجى تصحيح الحقول المحددة.' },
      done: 'سيفتح تطبيق البريد الآن برسالتك إلى info@saytamm.com. أرسلها وسنرد عليك.',
      notice: 'معاينة: الإرسال المباشر غير مفعّل بعد — يفتح النموذج تطبيق البريد بدلاً من ذلك.',
    },
    footer: { line: 'قول. تم.', email: 'البريد', nav: 'استكشف', lang: 'اللغة', rights: 'جميع الحقوق محفوظة.' },
    notFound: { title: 'هذه الصفحة لم تكتمل.', body: 'ربما الرابط قديم. لنأخذك إلى مكان مفيد.', home: 'العودة للرئيسية' },
  },
} as const;

export type Dict = (typeof UI)['en'];
export const t = (lang: Lang) => UI[lang] as unknown as Dict;
