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
      eyebrow: 'Our clients', title: 'Clients who trusted the SayTamm team.',
      intro: 'Brands across industries and markets that have trusted the SayTamm team with their marketing.',
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
      eyebrow: 'About SayTamm', title: 'A digital marketing & performance agency.',
      body: [
        'SayTamm plans, runs and measures digital marketing as one connected system. Strategy, creative, media and analytics sit in one team, so the plan, the work and the reporting all answer to the same business number.',
        'The team’s experience covers e-commerce, real estate, banking, retail and non-profit brands — from seasonal retail campaigns to lead generation across several markets at once.',
      ],
      nameTitle: 'Why “SayTamm”?',
      name: 'In everyday Gulf Arabic, “قول تم” is what you hear when a request is as good as done. You tell us the goal; we take responsibility for getting there.',
      facts: [
        { v: '2021', k: 'SayTamm founded' },
        { v: '30', k: 'People on the SayTamm team' },
        { v: '15+', k: 'Years of digital marketing leadership, led by our founder' },
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
      // Sprint 3 positioning (D-020): a digital marketing & performance agency, not a Saudi-only agency.
      // Establishment (2021), the team's experience and the founder's experience are stated separately.
      eyebrow: 'About SayTamm',
      title: ['A digital marketing', '& performance agency', 'built to move brands forward.'],
      intro: [
        'SayTamm brings strategy, creative, media and technology together under one connected approach to growth.',
        'We work with brands to understand the business behind the brief, identify what will make a difference, and turn that thinking into marketing that moves with purpose.',
        'From the first strategic decision to the final performance report, every part of the work is connected to the same objective: meaningful business impact.',
      ],
      experience: {
        eyebrow: 'Our experience', title: ['Built on experience.', 'Driven by what’s next.'],
        body: [
          'Our foundation is shaped by years of working across the MENA region: understanding its markets, building brands, managing campaigns and dealing with the realities of growth.',
          'That experience informs how we work today: commercially minded, creatively ambitious and accountable to outcomes.',
          'We don’t believe in marketing for the sake of activity. We believe in clear thinking, purposeful execution and continuous improvement.',
        ],
        origin: 'SayTamm was founded in 2021 to close a gap many businesses know well: the distance between what a client needs and what their agency delivers, made worse by slow communication and by marketing that is not tied to a clear goal. The experience behind it is older: our founder has led digital marketing work for more than 15 years.',
        factsLabel: 'SayTamm in numbers',
      },
      regional: {
        eyebrow: 'Markets', title: ['Experience across markets.', 'Thinking beyond borders.'],
        body: [
          'Markets are different. Audiences are different. Business challenges are different.',
          'Our team’s experience across Saudi Arabia, the UAE, Kuwait, Oman and Egypt gives us a broader understanding of how brands communicate, compete and grow across the region.',
          'We adapt our thinking to the market, the audience and the commercial objective, rather than applying the same formula everywhere.',
        ],
        markets: ['Saudi Arabia', 'UAE', 'Kuwait', 'Oman', 'Egypt'],
        marketsNote: 'Markets in the team’s track record',
      },
      model: {
        eyebrow: 'How we work', title: ['One team.', 'Four connected disciplines.'],
        intro: [
          'Effective marketing doesn’t happen in disconnected departments.',
          'Strategy should inform creativity. Creativity should strengthen media. Media should generate useful data. And data should make the next decision smarter.',
          'At SayTamm, our disciplines work together as one connected system.',
        ],
        items: [
          'We start with the business challenge, not the channel. We define the opportunity, audience, positioning and direction that give every marketing decision a reason.',
          'We turn strategy into ideas, stories and experiences that make brands distinctive and relevant to the people they want to reach.',
          'We plan, activate and optimise campaigns around the right audiences, platforms and commercial objectives, so every investment works harder.',
          'We connect the platforms, digital experiences, tracking and analytics that help marketing perform as one measurable system.',
        ],
        servicesLink: 'See the nine services',
      },
      philosophy: {
        eyebrow: 'Our philosophy', title: ['Marketing should move', 'business forward.'],
        body: [
          'More campaigns do not automatically mean more growth.',
          'We believe the difference comes from asking better questions, making smarter decisions and connecting every activity to a clear objective.',
          'That means understanding the business first, creating with intent, investing with discipline and measuring what matters.',
        ],
      },
      closing: {
        title: ['Say it.', 'Tamm it.'],
        body: ['Good marketing starts with the right thinking.', 'Great marketing happens when that thinking is carried through: consistently, creatively and with purpose.', 'That’s how we work. That’s SayTamm.'],
        cta: 'Let’s make it happen',
      },
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
      wallTitle: 'من تنفيذ قول تم، لعلامات تتحرك.', wallIntro: 'منشورات وبانرات وهويات وتغليف نفّذتها قول تم لعملائها. مرّر المؤشر للإيقاف، واختر أي عمل لتشاهده كاملاً.',
      filterLabel: 'تصفية الأعمال حسب النوع', filters: { all: 'الكل', social: 'منشورات', banner: 'بانرات', identity: 'هوية بصرية', packaging: 'تغليف', video: 'فيديو' },
      open: 'عرض المشروع', close: 'إغلاق', prev: 'المشروع السابق', next: 'المشروع التالي', count: 'عمل', note: 'ملاحظة',
    },
    clients: {
      eyebrow: 'عملاؤنا', title: 'عملاء وثقوا بفريق قول تم.',
      intro: 'علامات تجارية من قطاعات وأسواق مختلفة وثقت بفريق قول تم في تسويقها.',
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
      eyebrow: 'من نحن', title: 'وكالة تسويق رقمي وأداء.',
      body: [
        'نخطط التسويق الرقمي وننفذه ونقيسه كمنظومة واحدة مترابطة. الاستراتيجية والإبداع والإعلانات والتحليلات في فريق واحد، فتخضع الخطة والتنفيذ والتقارير للرقم نفسه.',
        'تشمل خبرة الفريق التجارة الإلكترونية والعقارات والبنوك والتجزئة والقطاع غير الربحي؛ من حملات المواسم إلى توليد العملاء في أكثر من سوق في الوقت نفسه.',
      ],
      nameTitle: 'لماذا «قول تم»؟',
      name: '«قول تم» عبارة نقولها حين يكون الطلب في حكم المُنجَز. أنت تحدد الهدف، ونحن نتحمل مسؤولية الوصول إليه.',
      facts: [
        { v: '2021', k: 'سنة تأسيس قول تم' },
        { v: '30', k: 'عضواً في فريق قول تم' },
        { v: '+15', k: 'عاماً من قيادة التسويق الرقمي لدى مؤسس الوكالة' },
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
      eyebrow: 'عن قول تم',
      title: ['وكالة تسويق رقمي وأداء،', 'تحوّل الأفكار إلى تأثير.'],
      intro: [
        'في قول تم، نجمع الاستراتيجية والإبداع والإعلانات والتقنية في منظومة واحدة. نفهم أهداف الأعمال، ونبني خطط التسويق، ونحوّلها إلى تنفيذ واضح ونتائج قابلة للقياس.',
        'نبدأ بفهم العمل الذي يقف خلف الطلب، ونحدد ما الذي سيصنع الفرق فعلاً، ثم نحوّل هذا التفكير إلى تسويق يتحرك بهدف.',
        'من أول قرار استراتيجي إلى آخر تقرير أداء، يرتبط كل جزء من العمل بالهدف نفسه: أثر حقيقي في الأعمال.',
      ],
      experience: {
        eyebrow: 'خبرتنا', title: ['خبرة نبني عليها،', 'وطموح لما هو قادم.'],
        body: [
          'تشكّلت قاعدتنا عبر سنوات من العمل في أسواق المنطقة: فهمُ هذه الأسواق، وبناء العلامات التجارية، وإدارة الحملات، والتعامل مع واقع النمو كما هو.',
          'وهذه الخبرة هي ما يوجّه طريقة عملنا اليوم: تفكير تجاري، وطموح إبداعي، ومسؤولية عن النتائج.',
          'لا نؤمن بالتسويق لمجرد النشاط، بل بالتفكير الواضح والتنفيذ الهادف والتحسين المستمر.',
        ],
        origin: 'تأسست قول تم عام 2021 لسد فجوة تعرفها شركات كثيرة: المسافة بين ما يحتاجه العميل وما تقدمه له الوكالة، ويزيدها بطء التواصل وتسويق لا يرتبط بهدف واضح. أما الخبرة التي تقف خلفها فأقدم من ذلك: يقود مؤسسها أعمال التسويق الرقمي منذ أكثر من 15 عاماً.',
        factsLabel: 'قول تم بالأرقام',
      },
      regional: {
        eyebrow: 'الأسواق', title: ['خبرة في أسواق متعددة،', 'وتفكير لا تحدّه الحدود.'],
        body: [
          'الأسواق تختلف، والجماهير تختلف، وتحديات الأعمال تختلف.',
          'خبرة فريقنا في السعودية والإمارات والكويت وعُمان ومصر تمنحنا فهماً أوسع لطريقة تواصل العلامات التجارية وتنافسها ونموها في المنطقة.',
          'نكيّف تفكيرنا مع السوق والجمهور والهدف التجاري، بدلاً من تطبيق الوصفة نفسها في كل مكان.',
        ],
        markets: ['السعودية', 'الإمارات', 'الكويت', 'عُمان', 'مصر'],
        marketsNote: 'أسواق في سجل الفريق',
      },
      model: {
        eyebrow: 'كيف نعمل', title: ['فريق واحد.', 'أربعة تخصصات مترابطة.'],
        intro: [
          'التسويق الفعّال لا يحدث في أقسام منفصلة.',
          'الاستراتيجية توجّه الإبداع، والإبداع يقوّي الإعلانات، والإعلانات تنتج بيانات مفيدة، والبيانات تجعل القرار التالي أذكى.',
          'في قول تم، تعمل تخصصاتنا معاً كمنظومة واحدة مترابطة.',
        ],
        items: [
          'نبدأ من تحدي العمل لا من القناة. نحدد الفرصة والجمهور والتموضع والاتجاه الذي يمنح كل قرار تسويقي سبباً واضحاً.',
          'نحوّل الاستراتيجية إلى أفكار وقصص وتجارب تجعل العلامة مميزة وقريبة من الناس الذين تريد الوصول إليهم.',
          'نخطط الحملات ونطلقها ونحسّنها حول الجمهور والمنصات والأهداف التجارية المناسبة، لتعمل كل ميزانية بكفاءة أعلى.',
          'نربط المنصات والتجارب الرقمية والقياس والتحليلات، ليعمل التسويق كمنظومة واحدة يمكن قياسها.',
        ],
        servicesLink: 'تعرّف على الخدمات التسع',
      },
      philosophy: {
        eyebrow: 'فلسفتنا', title: ['التسويق يجب أن يدفع', 'العمل إلى الأمام.'],
        body: [
          'كثرة الحملات لا تعني بالضرورة نمواً أكبر.',
          'نؤمن بأن الفرق يأتي من طرح أسئلة أفضل، واتخاذ قرارات أذكى، وربط كل نشاط بهدف واضح.',
          'وهذا يعني أن نفهم العمل أولاً، ونبدع بقصد، ونستثمر بانضباط، ونقيس ما يهم فعلاً.',
        ],
      },
      closing: {
        title: ['قول.', 'تم.'],
        body: ['التسويق الجيد يبدأ بالتفكير الصحيح.', 'والتسويق المميز يحدث حين يُستكمل هذا التفكير حتى النهاية: باتساق وإبداع وهدف.', 'هكذا نعمل. وهذه قول تم.'],
        cta: 'لنحوّل الفكرة إلى واقع',
      },
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
