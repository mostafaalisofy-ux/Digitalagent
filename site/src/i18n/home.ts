// Homepage, About and case-page copy (final redesign brief).
// Homepage order: Hero → Selected work → Brands → Services → How we work → Results → About → CTA.
// English and Arabic are written separately, not translated line by line. Arabic is pending native
// review (OQ-25). Facts only from approved material; unconfirmed facts are omitted or tagged.
import type { Lang } from '../config/site';

export const HOME = {
  en: {
    selected: {
      eyebrow: 'Selected work', title: 'Work that moved the number.',
      intro: 'Selected projects that bring strategy, creative execution and measurable results together.',
      label: 'Team track record: work delivered by SayTamm’s team before the agency was founded.',
      all: 'Explore all work', read: 'Read the full case',
      f: { client: 'Client', industry: 'Industry', market: 'Market', period: 'Period', context: 'Context', objective: 'Objective', challenge: 'Challenge', strategy: 'Approach', execution: 'Execution', outcome: 'Outcome', channels: 'Channels', services: 'Services' },
      dataCaption: 'Media budget against reported sales revenue, drawn to scale.',
    },
    brands: {
      eyebrow: 'Experience', title: 'Brands we’ve worked with.',
      intro: 'Our team’s professional experience spans brands across multiple industries and markets.',
      note: 'Brands members of our team have worked on in previous roles and agencies. Listed as professional experience, not as SayTamm clients or endorsements.',
      caseLink: 'See the case',
      count: (b: number, s: number) => `${b} brands · ${s} sectors`,
      permission: 'Display permission pending',
    },
    services: {
      eyebrow: 'Services', title: 'Nine services. One objective.',
      intro: 'Organised in four disciplines. Hire us for one service or for the full plan — either way, the work is planned around your business objective.',
      cta: 'Explore all services',
    },
    approach: {
      eyebrow: 'How we work', title: 'Four disciplines. One connected plan.',
      intro: 'Strategy, creative, media and measurement are planned together by one team. Nothing is lost between handovers, and every decision can be traced to a result.',
      steps: [
        { k: 'Strategy', d: 'Defines the objective, the audience and the budget — and the number that will show it worked.' },
        { k: 'Creative', d: 'Turns the strategy into ideas and assets built for each platform, with variations ready to test.' },
        { k: 'Media', d: 'Places the work where the audience is, and moves budget toward what is producing results.' },
        { k: 'Performance', d: 'Measures what each channel delivered, and feeds what we learn into the next round of planning.' },
      ],
      loop: 'Every campaign starts with a clear direction and ends with measurable learning.',
    },
    results: {
      eyebrow: 'Results', title: 'What the work delivered.',
      intro: 'More outcomes from the team’s track record. Each one shows what was measured, what it is compared with, the period and the source.',
      cols: { outcome: 'Outcome', measured: 'What was measured', period: 'Period', source: 'Source' },
      periodTbc: 'To be confirmed',
      pending: 'Pending confirmation',
      withheld: 'Figures published once confirmed against the original platform data.',
      note: 'Figures are as reported in the source documents and have been checked for internal consistency. Each is being confirmed against original platform exports before launch; unconfirmed figures are not published on the live site.',
    },
    about: {
      eyebrow: 'About SayTamm', title: 'A Saudi digital marketing & performance agency.',
      body: [
        'SayTamm plans, runs and measures digital marketing for brands in Saudi Arabia and the Gulf. Strategy, creative, media and analytics sit in one team, so the plan, the work and the reporting all answer to the same business number.',
        'The team’s experience covers e-commerce, real estate, banking, retail and non-profit brands — from seasonal retail campaigns to lead generation across several markets at once.',
      ],
      nameTitle: 'Why “SayTamm”?',
      name: 'In Saudi dialect, “قول تم” is what you hear when a request is as good as done. You tell us the goal; we take responsibility for getting there.',
      facts: [
        { v: '2015', k: 'Campaigns led by our founder since' },
        { v: '5', k: 'Markets in the team’s track record: Saudi Arabia, UAE, Kuwait, Oman, Egypt' },
        { v: '9', k: 'Services across four disciplines' },
        { v: 'AR · EN', k: 'Arabic and English, each written in its own language' },
      ],
      more: 'More about us',
    },
    contact: {
      eyebrow: 'Start a project', title: ['Tell us what you need.', 'We’ll take it from there.'],
      body: 'Share your objective, your market and where things stand today. We’ll reply with how we would approach it.',
      email: 'Or email', cta: 'Start a project',
    },
    aboutPage: {
      title: ['About', 'SayTamm.'],
      intro: 'A Saudi-focused digital marketing and performance agency that combines strategy, creativity, media and technology — and measures the result.',
      storyTitle: 'Why SayTamm exists',
      story: [
        'Many businesses have plenty of marketing activity and too little evidence of what it returns. SayTamm was founded to close that gap.',
        'Our founder has led campaign and performance work since 2015, for e-commerce, real estate, banking and non-profit brands in Saudi Arabia, the Gulf and Egypt. SayTamm brings that experience into one agency, where strategy, creative, media and measurement are planned together and judged by the same number.',
      ],
      valuesTitle: 'What we stand for',
      values: [
        { t: 'Clarity', d: 'Make the next move obvious.' },
        { t: 'Ownership', d: 'Take responsibility for the outcome.' },
        { t: 'Speed', d: 'Remove unnecessary friction.' },
        { t: 'Precision', d: 'Decide with evidence.' },
        { t: 'Impact', d: 'Prioritise what moves the business.' },
      ],
      founderTitle: 'Leadership',
      founderName: 'Mostafa Sofy',
      founderRole: 'Founder',
    },
    casePage: {
      back: 'All work', facts: 'At a glance', story: 'The work', results: 'Outcomes', prev: 'Previous case', evidence: 'How these figures were measured',
      source: 'Source', measured: 'What was measured', status: 'Status', open: 'Still to confirm',
      statusPending: 'Pending confirmation against original data', statusApproved: 'Confirmed',
      channels: 'Channels', services: 'Services involved',
      attribution: 'Delivered by members of the SayTamm team before SayTamm was founded. Shown as the team’s track record.',
      next: 'Next case', withheld: 'Results for this project will be published once confirmed against the original platform data.',
    },
  },
  ar: {
    selected: {
      eyebrow: 'أعمال مختارة', title: 'أعمال صنعت فرقاً.',
      intro: 'مشاريع تعكس كيف تتحول الاستراتيجية والتنفيذ الإبداعي إلى نتائج يمكن قياسها.',
      label: 'سجل إنجاز الفريق: أعمال نفّذها فريق قول تم قبل تأسيس الوكالة.',
      all: 'استكشف كل الأعمال', read: 'اقرأ دراسة الحالة كاملة',
      f: { client: 'العميل', industry: 'القطاع', market: 'السوق', period: 'الفترة', context: 'السياق', objective: 'الهدف', challenge: 'التحدي', strategy: 'المنهج', execution: 'التنفيذ', outcome: 'النتيجة', channels: 'القنوات', services: 'الخدمات' },
      dataCaption: 'الميزانية الإعلانية مقابل الإيرادات المُبلّغ عنها، بمقياسها الحقيقي.',
    },
    brands: {
      eyebrow: 'الخبرة', title: 'علامات تجارية عمل فريقنا معها.',
      intro: 'تمتد خبرات فريقنا عبر علامات تجارية وقطاعات وأسواق متنوعة.',
      note: 'علامات عمل عليها أعضاء فريقنا خلال أدوار ووكالات سابقة. تُذكر خبرةً مهنية، لا بوصفها عملاء لقول تم أو تزكية منها.',
      caseLink: 'دراسة الحالة',
      count: (b: number, s: number) => `${b} علامة · ${s} قطاعات`,
      permission: 'بانتظار إذن العرض',
    },
    services: {
      eyebrow: 'خدماتنا', title: 'تسع خدمات. هدف واحد.',
      intro: 'في أربعة تخصصات. اطلب خدمة واحدة أو الخطة كاملة، ففي الحالتين يُخطَّط العمل حول هدفك التجاري.',
      cta: 'استكشف كل الخدمات',
    },
    approach: {
      eyebrow: 'كيف نعمل', title: 'أربعة تخصصات. خطة واحدة.',
      intro: 'يخطط فريق واحد للاستراتيجية والإبداع والإعلانات والقياس معاً؛ فلا يضيع شيء بين مرحلة وأخرى، ويمكن تتبّع كل قرار إلى نتيجته.',
      steps: [
        { k: 'الاستراتيجية', d: 'تحدد الهدف والجمهور والميزانية، والرقم الذي سيبيّن أن العمل نجح.' },
        { k: 'الإبداع', d: 'يحوّل الاستراتيجية إلى أفكار ومواد مصممة لكل منصة، مع بدائل جاهزة للاختبار.' },
        { k: 'الإعلانات', d: 'تضع العمل حيث يوجد الجمهور، وتنقل الميزانية نحو ما يحقق النتائج.' },
        { k: 'الأداء', d: 'يقيس ما حققته كل قناة، ويعيد ما تعلّمناه إلى جولة التخطيط التالية.' },
      ],
      loop: 'كل حملة تبدأ باتجاه واضح، وتنتهي بتعلّم يمكن قياسه.',
    },
    results: {
      eyebrow: 'النتائج', title: 'ماذا حقق العمل؟',
      intro: 'نتائج أخرى من سجل الفريق، ولكل منها ما الذي قيس، ومقابل ماذا، وفي أي فترة، ومن أي مصدر.',
      cols: { outcome: 'النتيجة', measured: 'ما الذي قيس', period: 'الفترة', source: 'المصدر' },
      periodTbc: 'قيد التأكيد',
      pending: 'بانتظار التأكيد',
      withheld: 'تُنشر الأرقام بعد تأكيدها من بيانات المنصات الأصلية.',
      note: 'الأرقام كما وردت في المصادر، وجرى التحقق من اتساقها الداخلي. ويجري تأكيد كل رقم من ملفات المنصات الأصلية قبل الإطلاق، ولا يُنشر على الموقع الرسمي أي رقم غير مؤكد.',
    },
    about: {
      eyebrow: 'من نحن', title: 'وكالة تسويق رقمي وأداء في السعودية.',
      body: [
        'نخطط التسويق الرقمي وننفذه ونقيسه للعلامات التجارية في السعودية والخليج. الاستراتيجية والإبداع والإعلانات والتحليلات في فريق واحد، فتخضع الخطة والتنفيذ والتقارير للرقم نفسه.',
        'تشمل خبرة الفريق التجارة الإلكترونية والعقارات والبنوك والتجزئة والقطاع غير الربحي؛ من حملات المواسم إلى توليد العملاء في أكثر من سوق في الوقت نفسه.',
      ],
      nameTitle: 'لماذا «قول تم»؟',
      name: '«قول تم» عبارة نقولها حين يكون الطلب في حكم المُنجَز. أنت تحدد الهدف، ونحن نتحمل مسؤولية الوصول إليه.',
      facts: [
        { v: '2015', k: 'يقود مؤسسنا الحملات منذ عام' },
        { v: '5', k: 'أسواق في سجل الفريق: السعودية، الإمارات، الكويت، عُمان، مصر' },
        { v: '9', k: 'خدمات في أربعة تخصصات' },
        { v: 'AR · EN', k: 'العربية والإنجليزية، تُكتب كل منهما بلغتها' },
      ],
      more: 'المزيد عنّا',
    },
    contact: {
      eyebrow: 'ابدأ مشروعك', title: ['قل لنا ما تحتاجه،', 'والباقي علينا.'],
      body: 'شاركنا هدفك وسوقك ووضعك الحالي، وسنرد عليك بالطريقة التي نقترحها للعمل.',
      email: 'أو راسلنا على', cta: 'ابدأ مشروعك',
    },
    aboutPage: {
      title: ['من نحن.'],
      intro: 'وكالة تسويق رقمي وأداء تركّز على السوق السعودي، تجمع الاستراتيجية والإبداع والإعلانات والتقنية، وتقيس النتيجة.',
      storyTitle: 'لماذا قول تم',
      story: [
        'لدى كثير من الشركات نشاط تسويقي كبير، ودليل قليل على ما يعود به. تأسست قول تم لسد هذه الفجوة.',
        'يقود مؤسسنا أعمال الحملات والأداء منذ 2015، لعلامات في التجارة الإلكترونية والعقارات والبنوك والقطاع غير الربحي في السعودية والخليج ومصر. وتجمع قول تم هذه الخبرة في وكالة واحدة، يُخطَّط فيها للاستراتيجية والإبداع والإعلانات والقياس معاً، ويُحكم عليها بالرقم نفسه.',
      ],
      valuesTitle: 'قيمنا',
      values: [
        { t: 'الوضوح', d: 'نجعل الخطوة التالية واضحة.' },
        { t: 'المسؤولية', d: 'نتحمّل مسؤولية النتيجة.' },
        { t: 'السرعة', d: 'نزيل التعقيد غير الضروري.' },
        { t: 'الدقة', d: 'نقرر بالأدلة.' },
        { t: 'الأثر', d: 'نقدّم ما يحرّك العمل.' },
      ],
      founderTitle: 'القيادة',
      founderName: 'Mostafa Sofy', // Arabic spelling to confirm (OQ-40)
      founderRole: 'المؤسس',
    },
    casePage: {
      back: 'كل الأعمال', facts: 'نظرة سريعة', story: 'العمل', results: 'النتائج', prev: 'الحالة السابقة', evidence: 'كيف قيست هذه الأرقام',
      source: 'المصدر', measured: 'ما الذي قيس', status: 'الحالة', open: 'ما يلزم تأكيده',
      statusPending: 'بانتظار التأكيد من البيانات الأصلية', statusApproved: 'مؤكد',
      channels: 'القنوات', services: 'الخدمات',
      attribution: 'نفّذها أعضاء من فريق قول تم قبل تأسيس الوكالة، وتُعرض بوصفها سجل إنجاز الفريق.',
      next: 'الحالة التالية', withheld: 'تُنشر نتائج هذا المشروع بعد تأكيدها من بيانات المنصات الأصلية.',
    },
  },
} as const;

export const h = (lang: Lang) => HOME[lang] as unknown as (typeof HOME)['en'];
