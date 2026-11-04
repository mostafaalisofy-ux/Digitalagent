// All interface copy, EN + AR. Arabic is written for its own composition (not a line-by-line
// translation) and is pending native review before launch (OQ-25).
import type { Lang } from '../config/site';

export const UI = {
  en: {
    meta: {
      homeTitle: 'SayTamm — Digital Marketing & Performance Agency, Saudi Arabia',
      homeDesc: 'Strategy, media and performance — connected. SayTamm turns a brief into measurable business movement for brands in Saudi Arabia and the GCC.',
      servicesTitle: 'Services — Strategy, Media, Content & Data | SayTamm',
      servicesDesc: 'Nine services in four pillars: strategy & brand, media & performance, content & social, data & conversion.',
      workTitle: 'Selected Work — Team Track Record | SayTamm',
      workDesc: 'Performance results our team delivered across Saudi Arabia, the GCC and Egypt — e-commerce, real estate and more.',
      contactTitle: 'Start a Project | SayTamm',
      aboutTitle: 'About SayTamm — Digital Marketing Agency in Saudi Arabia',
      aboutDesc: 'Who we are: a Saudi digital marketing and performance agency with a team track record since 2015.',
      contactDesc: 'Tell us the number that matters. We reply with how we would move it.',
    },
    nav: { about: 'About', clients: 'Clients', work: 'Work', services: 'Services', method: 'How we work', contact: 'Contact', cta: 'Start a project', switch: 'العربية', switchLabel: 'Switch to Arabic', menu: 'Menu', close: 'Close', home: 'SayTamm — home' },
    preview: 'Preview build · content and figures pending final approval',
    hero: {
      eyebrow: 'Digital marketing & performance agency · Saudi Arabia',
      l1: 'Say it.', l2: 'Tamm it.',
      ar: 'قول تم.',
      sub: 'Performance-led digital marketing for brands that move fast and measure everything.',
      cta: 'Start a project', cta2: 'Explore our work',
      scroll: 'Scroll',
    },
    cred: {
      title: 'Where our team has delivered',
      markets: { k: 'Markets', v: ['Saudi Arabia', 'UAE', 'Kuwait', 'Oman', 'Egypt'] },
      sectors: { k: 'Sectors', v: ['E-commerce', 'Real estate', 'Retail', 'Banking', 'Non-profit'] },
      platforms: { k: 'Platforms', v: ['Google', 'Meta', 'Snapchat', 'TikTok', 'LinkedIn', 'YouTube'] },
    },
    philosophy: {
      eyebrow: 'Our philosophy',
      title: ['Marketing without', 'direction is just', 'activity.'],
      body: 'We start with the number that matters to your business, then build the plan, run the media and prove the result. One system, one owner, one direction.',
      points: [
        { k: 'Less noise.', v: 'Fewer channels, done properly, beat everything done a little.' },
        { k: 'More movement.', v: 'Every report ends with the next move — not a summary of the last one.' },
        { k: 'Own the number.', v: 'We are accountable for outcomes, not for tasks completed.' },
      ],
    },
    what: { eyebrow: 'What we do', title: 'Four pillars. Nine services. One system.', all: 'All services' },
    work: {
      eyebrow: 'Selected work', title: 'Movement, measured.',
      label: 'Team track record — delivered by the SayTamm team before SayTamm.',
      visual: 'Campaign visual — original asset to be supplied',
      all: 'Explore all work', challenge: 'Challenge', approach: 'Approach', results: 'Results', period: 'Period', periodTbc: 'Date to confirm',
      verified: 'Figures taken from campaign reports; final verification against original exports in progress.',
    },
    results: {
      eyebrow: 'Performance', title: 'What the budget became.',
      body: 'Media in, business out. The purple bar is the only number that matters.',
      note: 'Platform-reported and client-reported figures. Bars to scale within each case.',
    },
    method: {
      eyebrow: 'The SayTamm method', title: 'Say. Tamm. Prove.',
      steps: [
        { k: 'Say', ar: 'قول', t: 'Align on the objective.', d: 'We agree the one number that matters, the baseline and the budget — in writing, before anything launches.', g: 'You get: a plan with a target.' },
        { k: 'Tamm', ar: 'تم', t: 'Execute and optimise.', d: 'Campaigns, content and tracking go live. We test, cut what doesn’t move the number and scale what does.', g: 'You get: weekly movement.' },
        { k: 'Prove', ar: 'أثبت', t: 'Report what moved.', d: 'What happened, why, and what happens next. Every report ends with a decision.', g: 'You get: a clear next move.' },
      ],
    },
    final: { eyebrow: 'Start', title: 'Say it.', body: 'Tell us the number that matters. We’ll show you the plan to move it.', cta: 'Start a project', or: 'or write to' },
    services: { eyebrow: 'Services', title: ['Everything it takes', 'to move the number.'], intro: 'Nine services, organised in four pillars, run as one system — so strategy, media, content and data pull in the same direction.', includes: 'Includes', pending: 'Detailed scope coming soon' },
    workPage: { title: ['Movement,', 'measured.'], intro: 'Results our team delivered for e-commerce, real estate and retail brands across Saudi Arabia, the GCC and Egypt — before founding SayTamm.' },
    contact: {
      eyebrow: 'Start a project', title: ['Say it.', 'We’ll take it from here.'],
      intro: 'Tell us where you are and the number you want to move. We reply with how we would approach it.',
      direct: 'Prefer email?', fields: {
        name: 'Your name', email: 'Work email', company: 'Company', role: 'Your role', phone: 'Phone (optional)', website: 'Website (optional)',
        services: 'What do you need?', budget: 'Monthly media budget, SAR (optional)', message: 'What should move?', consent: 'I agree that SayTamm may use these details to respond to my enquiry.',
      },
      serviceOpts: ['Strategy & Brand', 'Media & Performance', 'Content & Social', 'Data & Conversion', 'Not sure yet'],
      
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
      homeDesc: 'الاستراتيجية والوسائط والأداء في منظومة واحدة. نحوّل الموجز إلى حركة قابلة للقياس لعلامات السعودية والخليج.',
      servicesTitle: 'الخدمات — الاستراتيجية والوسائط والمحتوى والبيانات | قول تم',
      servicesDesc: 'تسع خدمات في أربع ركائز: الاستراتيجية والعلامة، الوسائط والأداء، المحتوى والتواصل، البيانات والتحويل.',
      workTitle: 'أعمال مختارة — سجل إنجاز الفريق | قول تم',
      workDesc: 'نتائج أداء حققها فريقنا في السعودية والخليج ومصر — تجارة إلكترونية وعقارات وغيرها.',
      contactTitle: 'ابدأ مشروعك | قول تم',
      aboutTitle: 'من نحن | قول تم — وكالة تسويق رقمي في السعودية',
      aboutDesc: 'من نحن: وكالة سعودية للتسويق الرقمي والأداء، بسجل إنجاز للفريق منذ 2015.',
      contactDesc: 'أخبرنا بالرقم الذي يهمك، ونرد عليك بكيف سنحرّكه.',
    },
    nav: { about: 'من نحن', clients: 'عملاؤنا', work: 'أعمالنا', services: 'خدماتنا', method: 'كيف نعمل', contact: 'تواصل', cta: 'ابدأ مشروعك', switch: 'English', switchLabel: 'التبديل إلى الإنجليزية', menu: 'القائمة', close: 'إغلاق', home: 'قول تم — الرئيسية' },
    preview: 'نسخة معاينة · المحتوى والأرقام بانتظار الاعتماد النهائي',
    hero: {
      eyebrow: 'وكالة تسويق رقمي وأداء · السعودية',
      l1: 'قول.', l2: 'تم.',
      ar: 'Say it. Tamm it.',
      sub: 'تسويق رقمي يقوده الأداء، لعلامات تتحرك بسرعة وتقيس كل شيء.',
      cta: 'ابدأ مشروعك', cta2: 'استكشف أعمالنا',
      scroll: 'تابع',
    },
    cred: {
      title: 'حيث أنجز فريقنا',
      markets: { k: 'الأسواق', v: ['السعودية', 'الإمارات', 'الكويت', 'عُمان', 'مصر'] },
      sectors: { k: 'القطاعات', v: ['التجارة الإلكترونية', 'العقارات', 'التجزئة', 'البنوك', 'القطاع غير الربحي'] },
      platforms: { k: 'المنصات', v: ['Google', 'Meta', 'Snapchat', 'TikTok', 'LinkedIn', 'YouTube'] },
    },
    philosophy: {
      eyebrow: 'فلسفتنا',
      title: ['التسويق بلا اتجاه', 'مجرد نشاط.'],
      body: 'نبدأ بالرقم الذي يهم عملك، ثم نبني الخطة، وندير الوسائط، ونُثبت النتيجة. منظومة واحدة، مسؤول واحد، اتجاه واحد.',
      points: [
        { k: 'ضجيج أقل.', v: 'قنوات أقل تُدار بإتقان، أفضل من كل شيء بنصف جهد.' },
        { k: 'حركة أكثر.', v: 'كل تقرير ينتهي بالخطوة التالية، لا بملخص لما مضى.' },
        { k: 'نتحمّل الرقم.', v: 'مسؤوليتنا هي النتيجة، لا عدد المهام المنجزة.' },
      ],
    },
    what: { eyebrow: 'ماذا نفعل', title: 'أربع ركائز. تسع خدمات. منظومة واحدة.', all: 'كل الخدمات' },
    work: {
      eyebrow: 'أعمال مختارة', title: 'حركة… تُقاس.',
      label: 'سجل إنجاز الفريق — نتائج حققها فريق قول تم قبل تأسيس الوكالة.',
      visual: 'صورة الحملة — بانتظار المادة الأصلية',
      all: 'استكشف كل الأعمال', challenge: 'التحدي', approach: 'المنهج', results: 'النتائج', period: 'الفترة', periodTbc: 'التاريخ قيد التأكيد',
      verified: 'الأرقام مأخوذة من تقارير الحملات؛ التحقق النهائي من الملفات الأصلية جارٍ.',
    },
    results: {
      eyebrow: 'الأداء', title: 'ماذا أصبحت الميزانية.',
      body: 'وسائط تدخل، ونتائج أعمال تخرج. الشريط البنفسجي هو الرقم الوحيد المهم.',
      note: 'أرقام مُبلّغة من المنصات أو العملاء. الأشرطة بمقياس موحّد داخل كل حالة.',
    },
    method: {
      eyebrow: 'منهجية قول تم', title: 'قول. تم. أثبت.',
      steps: [
        { k: 'قول', ar: 'Say', t: 'نتفق على الهدف.', d: 'نحدد الرقم الوحيد المهم، ونقطة البداية، والميزانية — كتابةً، قبل أي إطلاق.', g: 'تحصل على: خطة لها مستهدف.' },
        { k: 'تم', ar: 'Tamm', t: 'ننفّذ ونحسّن.', d: 'تنطلق الحملات والمحتوى والقياس. نختبر، ونوقف ما لا يحرّك الرقم، ونوسّع ما يحرّكه.', g: 'تحصل على: حركة كل أسبوع.' },
        { k: 'أثبت', ar: 'Prove', t: 'نُثبت ما تحرّك.', d: 'ماذا حدث، ولماذا، وما الخطوة التالية. كل تقرير ينتهي بقرار.', g: 'تحصل على: خطوة تالية واضحة.' },
      ],
    },
    final: { eyebrow: 'ابدأ', title: 'قولها.', body: 'أخبرنا بالرقم الذي يهمك، ونريك الخطة لتحريكه.', cta: 'ابدأ مشروعك', or: 'أو راسلنا على' },
    services: { eyebrow: 'الخدمات', title: ['كل ما يلزم', 'لتحريك الرقم.'], intro: 'تسع خدمات في أربع ركائز، تُدار كمنظومة واحدة — لتعمل الاستراتيجية والوسائط والمحتوى والبيانات في الاتجاه نفسه.', includes: 'تشمل', pending: 'تفاصيل النطاق قريباً' },
    workPage: { title: ['حركة…', 'تُقاس.'], intro: 'نتائج حققها فريقنا لعلامات التجارة الإلكترونية والعقارات والتجزئة في السعودية والخليج ومصر — قبل تأسيس قول تم.' },
    contact: {
      eyebrow: 'ابدأ مشروعك', title: ['قولها.', 'والباقي علينا.'],
      intro: 'أخبرنا أين أنت الآن، وما الرقم الذي تريد تحريكه. سنرد عليك بكيف سنتعامل معه.',
      direct: 'تفضّل البريد؟', fields: {
        name: 'الاسم', email: 'بريد العمل', company: 'الشركة', role: 'المنصب', phone: 'الجوال (اختياري)', website: 'الموقع الإلكتروني (اختياري)',
        services: 'ماذا تحتاج؟', budget: 'الميزانية الإعلانية الشهرية بالريال (اختياري)', message: 'ما الذي يجب أن يتحرك؟', consent: 'أوافق على استخدام قول تم لهذه البيانات للرد على طلبي.',
      },
      serviceOpts: ['الاستراتيجية والعلامة', 'الوسائط والأداء', 'المحتوى والتواصل', 'البيانات والتحويل', 'لست متأكداً بعد'],
      
      submit: 'إرسال', sending: 'جارٍ التجهيز…',
      errors: { required: 'هذا الحقل مطلوب.', email: 'أدخل بريداً إلكترونياً صحيحاً.', services: 'اختر خياراً واحداً على الأقل.', consent: 'يرجى التأكيد للمتابعة.', summary: 'يرجى تصحيح الحقول المحددة.' },
      done: 'سيفتح تطبيق البريد الآن برسالتك إلى info@saytamm.com. أرسلها وسنرد عليك.',
      notice: 'معاينة: الإرسال المباشر غير مفعّل بعد — يفتح النموذج تطبيق البريد بدلاً من ذلك.',
    },
    footer: { line: 'قول تم.', email: 'البريد', nav: 'استكشف', lang: 'اللغة', rights: 'جميع الحقوق محفوظة.' },
    notFound: { title: 'هذه الصفحة لم تكتمل.', body: 'ربما الرابط قديم. لنأخذك إلى مكان مفيد.', home: 'العودة للرئيسية' },
  },
} as const;

export type Dict = (typeof UI)['en'];
export const t = (lang: Lang) => UI[lang] as unknown as Dict;
