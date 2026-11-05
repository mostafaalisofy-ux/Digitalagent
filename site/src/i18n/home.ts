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
      label: 'Team track record: projects led by members of the SayTamm team, including work delivered at other agencies.',
      all: 'Explore all work', read: 'Read the full case',
      f: { client: 'Client', industry: 'Industry', market: 'Market', period: 'Period', context: 'Context', objective: 'Objective', challenge: 'Challenge', strategy: 'Approach', execution: 'Execution', outcome: 'Outcome', channels: 'Channels', services: 'Services' },
      dataCaption: 'Media budget against reported sales revenue, drawn to scale.',
    },
    recent: {
      eyebrow: 'SayTamm work', title: 'Latest work for our clients.',
      intro: 'Recent work SayTamm has delivered for its clients.',
      client: 'Client', format: 'Format', play: 'Play video', pause: 'Pause video', all: 'See all client work',
      wallTitle: 'Made by SayTamm, for brands that move.', wallIntro: 'Posts, banners, identities and packaging SayTamm has delivered for its clients. Hover to pause; select any piece to see it in full.',
      filterLabel: 'Filter work by type', filters: { all: 'All', social: 'Social posts', banner: 'Banners', identity: 'Identity', packaging: 'Packaging', video: 'Video' },
      open: 'View project', close: 'Close', prev: 'Previous project', next: 'Next project', count: 'pieces', note: 'Note',
    },
    clients: {
      eyebrow: 'Our clients', title: 'Brands that work with SayTamm.',
      intro: 'Brands SayTamm works with directly.',
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
        { v: '2021', k: 'Founded' },
        { v: '30', k: 'People on the team' },
        { v: '15+', k: 'Years of digital marketing leadership behind the agency' },
        { v: '5', k: 'Markets in the team’s track record: Saudi Arabia, UAE, Kuwait, Oman, Egypt' },
      ],
      more: 'More about us',
    },
    contact: {
      eyebrow: 'Start a project', title: ['Name the number', 'you need to move.'],
      body: 'Sales, qualified leads, a launch or a market entry. Tell us the objective, the market and your timeline, and we will reply with how we would plan it and what we would need from you to start.',
      email: 'Or email', cta: 'Start a project',
    },
    aboutPage: {
      title: ['About', 'SayTamm.'],
      intro: 'A Saudi-focused digital marketing and performance agency that combines strategy, creativity, media and technology — and measures the result.',
      storyTitle: 'Why SayTamm exists',
      story: [
        'SayTamm was founded in 2021 to close a gap many businesses know well: the distance between what a client needs and what their agency delivers, made worse by slow communication and by marketing that is not tied to a clear goal.',
        'We work the other way round. Communication is fast and direct, and every plan is built around the numbers and goals that matter to the business, with strategy, creative, media and measurement planned together and judged by the same number.',
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
      // Owner-supplied biography (2026-11-04), edited for the site, first person. Owner decision: no
      // previous employers are named — markets only (Saudi Arabia, Egypt, the Gulf). Also omitted: the
      // current role at another agency (OQ-38) and the unverified "double-digit ROAS" claim (OQ-51).
      bio: [
        'I have spent more than 15 years building and leading digital marketing operations across Saudi Arabia, Egypt and the wider Gulf.',
        'Over that time I have led country operations, client portfolios and teams built from the ground up, and worked with more than 200 brands across 20+ industries, from retail, FMCG and F&B to automotive, hospitality, real estate, fashion and e-commerce.',
        'I founded SayTamm because I kept seeing the same gap: between what a client actually needs and what their agency delivers, and in how quickly the two talk to each other. SayTamm exists to close it, with fast, direct communication and work built around numbers and goals, not marketing for its own sake.',
      ],
      expertiseTitle: 'Expertise',
      expertise: ['Digital marketing strategy', 'Performance marketing', 'Media buying', 'Brand strategy', 'Agency leadership', 'Team building'],
      photoAlt: 'Mostafa Sofy, founder of SayTamm',
    },
    casePage: {
      back: 'All work', facts: 'At a glance', story: 'The work', results: 'Outcomes', prev: 'Previous case', evidence: 'How these figures were measured',
      source: 'Source', measured: 'What was measured', status: 'Status', open: 'Still to confirm',
      statusPending: 'Pending confirmation against original data', statusApproved: 'Confirmed',
      channels: 'Channels', services: 'Services involved',
      attribution: 'Led by members of the SayTamm team, including work delivered at other agencies. Shown as the team’s track record.',
      next: 'Next case', withheld: 'Results for this project will be published once confirmed against the original platform data.',
    },
  },
  ar: {
    selected: {
      eyebrow: 'أعمال مختارة', title: 'أعمال صنعت فرقاً.',
      intro: 'مشاريع تعكس كيف تتحول الاستراتيجية والتنفيذ الإبداعي إلى نتائج يمكن قياسها.',
      label: 'سجل إنجاز الفريق: مشاريع قادها أعضاء من فريق قول تم، ومنها أعمال نُفّذت في وكالات أخرى.',
      all: 'استكشف كل الأعمال', read: 'اقرأ دراسة الحالة كاملة',
      f: { client: 'العميل', industry: 'القطاع', market: 'السوق', period: 'الفترة', context: 'السياق', objective: 'الهدف', challenge: 'التحدي', strategy: 'المنهج', execution: 'التنفيذ', outcome: 'النتيجة', channels: 'القنوات', services: 'الخدمات' },
      dataCaption: 'الميزانية الإعلانية مقابل الإيرادات المُبلّغ عنها، بمقياسها الحقيقي.',
    },
    recent: {
      eyebrow: 'أعمال قول تم', title: 'أحدث أعمالنا لعملائنا.',
      intro: 'أعمال نفّذتها قول تم مؤخراً لعملائها.',
      client: 'العميل', format: 'الصيغة', play: 'تشغيل الفيديو', pause: 'إيقاف الفيديو', all: 'كل أعمالنا لعملائنا',
      wallTitle: 'من تنفيذ قول تم، لعلامات تتحرك.', wallIntro: 'بوستات وبانرات وهويات وتغليف نفّذتها قول تم لعملائها. مرّر المؤشر للإيقاف، واختر أي عمل لتشاهده كاملاً.',
      filterLabel: 'تصفية الأعمال حسب النوع', filters: { all: 'الكل', social: 'بوستات', banner: 'بانرات', identity: 'هوية بصرية', packaging: 'تغليف', video: 'فيديو' },
      open: 'عرض المشروع', close: 'إغلاق', prev: 'المشروع السابق', next: 'المشروع التالي', count: 'عمل', note: 'ملاحظة',
    },
    clients: {
      eyebrow: 'عملاؤنا', title: 'علامات تعمل مع قول تم.',
      intro: 'علامات تتعامل مع قول تم مباشرة.',
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
        { v: '2021', k: 'سنة التأسيس' },
        { v: '30', k: 'عضواً في الفريق' },
        { v: '+15', k: 'عاماً من قيادة التسويق الرقمي خلف الوكالة' },
        { v: '5', k: 'أسواق في سجل الفريق: السعودية، الإمارات، الكويت، عُمان، مصر' },
      ],
      more: 'المزيد عنّا',
    },
    contact: {
      eyebrow: 'ابدأ مشروعك', title: ['حدّد الرقم', 'الذي تريد تحريكه.'],
      body: 'مبيعات، أو عملاء مؤهلون، أو إطلاق، أو دخول سوق جديد. أخبرنا بالهدف والسوق والجدول الزمني، وسنرد عليك بالطريقة التي نخطط بها للعمل وبما نحتاجه منك لنبدأ.',
      email: 'أو راسلنا على', cta: 'ابدأ مشروعك',
    },
    aboutPage: {
      title: ['من نحن.'],
      intro: 'وكالة تسويق رقمي وأداء تركّز على السوق السعودي، تجمع الاستراتيجية والإبداع والإعلانات والتقنية، وتقيس النتيجة.',
      storyTitle: 'لماذا قول تم',
      story: [
        'تأسست قول تم عام 2021 لسد فجوة تعرفها شركات كثيرة: المسافة بين ما يحتاجه العميل وما تقدمه له الوكالة، ويزيدها بطء التواصل وتسويق لا يرتبط بهدف واضح.',
        'نعمل بطريقة معاكسة: تواصل سريع ومباشر، وكل خطة تُبنى حول الأرقام والأهداف التي تهم العمل، ونخطط للاستراتيجية والإبداع والإعلانات والقياس معاً، ونحكم عليها بالرقم نفسه.',
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
      founderName: 'مصطفى صوفي',
      founderRole: 'المؤسس',
      bio: [
        'أمضيت أكثر من 15 عاماً في بناء عمليات التسويق الرقمي وقيادتها في السوق السعودي والسوق المصري ودول الخليج.',
        'قدت خلالها عمليات على مستوى الدول ومحافظ عملاء، وبنيت فرقاً من الصفر، وعملت مع أكثر من 200 علامة تجارية في أكثر من 20 قطاعاً، من التجزئة والسلع الاستهلاكية والأغذية والمشروبات إلى السيارات والضيافة والعقارات والأزياء والتجارة الإلكترونية.',
        'أسست قول تم لأنني كنت أرى الفجوة نفسها مراراً: بين ما يحتاجه العميل فعلاً وما تقدمه له الوكالة، وفي سرعة التواصل بينهما. وُجدت قول تم لسد هذه الفجوة: تواصل سريع ومباشر، وعمل يُبنى على الأرقام والأهداف، لا تسويق بلا هدف.',
      ],
      expertiseTitle: 'مجالات الخبرة',
      expertise: ['استراتيجية التسويق الرقمي', 'التسويق بالأداء', 'شراء الوسائط الإعلانية', 'استراتيجية العلامة', 'قيادة الوكالات', 'بناء الفرق'],
      photoAlt: 'مصطفى صوفي، مؤسس قول تم',
    },
    casePage: {
      back: 'كل الأعمال', facts: 'نظرة سريعة', story: 'العمل', results: 'النتائج', prev: 'الحالة السابقة', evidence: 'كيف قيست هذه الأرقام',
      source: 'المصدر', measured: 'ما الذي قيس', status: 'الحالة', open: 'ما يلزم تأكيده',
      statusPending: 'بانتظار التأكيد من البيانات الأصلية', statusApproved: 'مؤكد',
      channels: 'القنوات', services: 'الخدمات',
      attribution: 'قادها أعضاء من فريق قول تم، ومنها أعمال نُفّذت في وكالات أخرى، وتُعرض بوصفها سجل إنجاز الفريق.',
      next: 'الحالة التالية', withheld: 'تُنشر نتائج هذا المشروع بعد تأكيدها من بيانات المنصات الأصلية.',
    },
  },
} as const;

export const h = (lang: Lang) => HOME[lang] as unknown as (typeof HOME)['en'];
