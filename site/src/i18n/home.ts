// Homepage + About copy (v0.2 structure: About → Services → Clients → Work → Process → Why → Contact).
// Facts only from received material. Unknowns are explicit placeholders (see docs/OPEN_QUESTIONS.md).
import type { Lang } from '../config/site';

export const HOME = {
  en: {
    about: {
      eyebrow: 'About SayTamm',
      title: 'A Saudi digital marketing and performance agency.',
      body: [
        'SayTamm helps brands in Saudi Arabia and the Gulf grow through digital marketing that is measured in sales, leads and revenue.',
        'One team plans the strategy, buys the media, produces the content and reads the data — so every riyal you spend is tied to a business result.',
      ],
      nameTitle: 'Why “SayTamm”?',
      name: 'In Saudi Arabia, “قول تم” means: tell me what you need — consider it done. You say the goal. We get it done.',
      facts: [
        { v: '2015', k: 'Our team has been running campaigns since' },
        { v: '5', k: 'Markets: Saudi Arabia, UAE, Kuwait, Oman, Egypt' },
        { v: '9', k: 'Services, from strategy to analytics' },
        { v: '2', k: 'Languages, Arabic and English, built together' },
      ],
      more: 'More about us',
    },
    services: {
      eyebrow: 'Our services', title: 'Everything your brand needs to grow online.',
      intro: 'Nine services, run by one team. Choose one, or let us build the full plan.',
      cta: 'All services',
    },
    clients: {
      eyebrow: 'Our clients', title: 'Brands our team has worked with.',
      note: 'Work delivered by the SayTamm team, including before SayTamm was founded. Client logos coming soon.',
      viewCase: 'Case study',
    },
    work: { eyebrow: 'Our work', title: 'Results we have delivered.', all: 'View all case studies' },
    process: {
      eyebrow: 'How we work', title: 'Four clear steps, from brief to results.',
      steps: [
        { t: 'Discover', d: 'We study your business, your market and your current marketing, and agree the number that matters.' },
        { t: 'Plan', d: 'A written plan: target, channels, budget, content and how we will measure success.' },
        { t: 'Launch & optimise', d: 'Campaigns, content and tracking go live. We test, cut what doesn’t work and scale what does.' },
        { t: 'Report & grow', d: 'Clear reports: what happened, why, and what we do next.' },
      ],
    },
    why: {
      eyebrow: 'Why SayTamm', title: 'What you get when you work with us.',
      points: [
        { t: 'One team, one plan', d: 'Strategy, media, content and data work together instead of in separate silos.' },
        { t: 'Results you can measure', d: 'We report on sales, leads and return on ad spend — not just likes and reach.' },
        { t: 'Built for Saudi Arabia', d: 'We understand the market, the platforms Saudis use and how they buy. Arabic content is written in Arabic, not translated.' },
        { t: 'Proven experience', d: 'A team track record across e-commerce, real estate, banking, retail and non-profit brands since 2015.' },
      ],
    },
    contact: {
      eyebrow: 'Contact us', title: 'Tell us what you need. We’ll take it from there.',
      body: 'Send us your goal and we’ll reply with how we would approach it.',
      email: 'Email', cta: 'Start a project',
    },
    aboutPage: {
      title: ['About', 'SayTamm.'],
      intro: 'A digital marketing and performance agency for brands in Saudi Arabia and the Gulf.',
      storyTitle: 'Our story',
      story: [
        'SayTamm was founded to close a gap many Saudi businesses know well: marketing that keeps everyone busy but does not move sales.',
        'Our team has spent more than a decade running campaigns for e-commerce, real estate, banking, retail and non-profit brands across Saudi Arabia, the Gulf and Egypt. SayTamm brings that experience into one agency, with one simple promise: you say the goal, we get it done.',
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
      founderBio: 'Founder bio and photo to be supplied.',
      marketsTitle: 'Where our team has delivered',
    },
  },
  ar: {
    about: {
      eyebrow: 'من نحن',
      title: 'وكالة سعودية للتسويق الرقمي والأداء.',
      body: [
        'نساعد العلامات التجارية في السعودية والخليج على النمو بتسويق رقمي يُقاس بالمبيعات والعملاء والإيرادات.',
        'فريق واحد يضع الاستراتيجية، ويدير الإعلانات، وينتج المحتوى، ويقرأ البيانات — ليكون كل ريال تنفقه مرتبطاً بنتيجة حقيقية لعملك.',
      ],
      nameTitle: 'لماذا «قول تم»؟',
      name: '«قول تم» عبارة سعودية تعني: اطلب ما تريد، واعتبره منجزاً. أنت تحدد الهدف، ونحن ننجزه.',
      facts: [
        { v: '2015', k: 'يدير فريقنا الحملات منذ عام' },
        { v: '5', k: 'أسواق: السعودية، الإمارات، الكويت، عُمان، مصر' },
        { v: '9', k: 'خدمات، من الاستراتيجية إلى التحليلات' },
        { v: '2', k: 'لغتان، العربية والإنجليزية، تُبنيان معاً' },
      ],
      more: 'المزيد عنّا',
    },
    services: {
      eyebrow: 'خدماتنا', title: 'كل ما تحتاجه علامتك لتنمو رقمياً.',
      intro: 'تسع خدمات يديرها فريق واحد. اختر خدمة، أو دعنا نبني لك الخطة كاملة.',
      cta: 'كل الخدمات',
    },
    clients: {
      eyebrow: 'عملاؤنا', title: 'علامات تجارية عمل معها فريقنا.',
      note: 'أعمال نفّذها فريق قول تم، ومنها ما سبق تأسيس الوكالة. شعارات العملاء قريباً.',
      viewCase: 'دراسة الحالة',
    },
    work: { eyebrow: 'أعمالنا', title: 'نتائج حققناها.', all: 'كل دراسات الحالة' },
    process: {
      eyebrow: 'كيف نعمل', title: 'أربع خطوات واضحة، من الطلب إلى النتيجة.',
      steps: [
        { t: 'نفهم', d: 'ندرس عملك وسوقك وتسويقك الحالي، ونتفق على الرقم الذي يهمك.' },
        { t: 'نخطط', d: 'خطة مكتوبة: الهدف، والقنوات، والميزانية، والمحتوى، وطريقة قياس النجاح.' },
        { t: 'ننفّذ ونحسّن', d: 'تنطلق الحملات والمحتوى والقياس. نختبر، ونوقف ما لا ينجح، ونوسّع ما ينجح.' },
        { t: 'نقيس وننمو', d: 'تقارير واضحة: ماذا حدث، ولماذا، وما خطوتنا التالية.' },
      ],
    },
    why: {
      eyebrow: 'لماذا قول تم', title: 'ما الذي تحصل عليه عندما تعمل معنا.',
      points: [
        { t: 'فريق واحد وخطة واحدة', d: 'الاستراتيجية والإعلانات والمحتوى والبيانات تعمل معاً، لا في أقسام منفصلة.' },
        { t: 'نتائج قابلة للقياس', d: 'نقيس المبيعات والعملاء والعائد على الإنفاق الإعلاني، لا الإعجابات والوصول فقط.' },
        { t: 'مصممون للسوق السعودي', d: 'نفهم السوق والمنصات التي يستخدمها السعوديون وطريقة شرائهم. والمحتوى العربي يُكتب بالعربية، لا يُترجم.' },
        { t: 'خبرة مثبتة', d: 'سجل إنجاز للفريق في التجارة الإلكترونية والعقارات والبنوك والتجزئة والقطاع غير الربحي منذ 2015.' },
      ],
    },
    contact: {
      eyebrow: 'تواصل معنا', title: 'قل لنا ما تحتاجه، والباقي علينا.',
      body: 'أرسل لنا هدفك، وسنرد عليك بكيف سنعمل عليه.',
      email: 'البريد الإلكتروني', cta: 'ابدأ مشروعك',
    },
    aboutPage: {
      title: ['من نحن.'],
      intro: 'وكالة تسويق رقمي وأداء للعلامات التجارية في السعودية والخليج.',
      storyTitle: 'قصتنا',
      story: [
        'تأسست قول تم لتسد فجوة تعرفها شركات سعودية كثيرة: تسويق يُبقي الجميع مشغولين، لكنه لا يحرّك المبيعات.',
        'أمضى فريقنا أكثر من عشر سنوات في إدارة حملات لعلامات التجارة الإلكترونية والعقارات والبنوك والتجزئة والقطاع غير الربحي في السعودية والخليج ومصر. وتجمع قول تم هذه الخبرة في وكالة واحدة بوعد بسيط: أنت تحدد الهدف، ونحن ننجزه.',
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
      founderName: 'Mostafa Sofy', // Arabic spelling to confirm (OQ-23)
      founderRole: 'المؤسس',
      founderBio: 'نبذة المؤسس وصورته بانتظار التزويد.',
      marketsTitle: 'حيث أنجز فريقنا',
    },
  },
} as const;

export const h = (lang: Lang) => HOME[lang] as unknown as (typeof HOME)['en'];
