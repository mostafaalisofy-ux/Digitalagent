// Work delivered BY SAYTAMM for its direct clients (Category A), owner-confirmed as published.
// Facts only: client, format, what the piece says. No objective, strategy or results are stated
// unless the owner supplies them. Separate from cases.ts (team track record).
import type { Lang } from '../config/site';
type T = Record<Lang, string>;
export type Media =
  | { kind: 'video'; src: string; poster: string; w: number; h: number }
  | { kind: 'images'; images: { src: string; w: number; h: number; alt: T }[]; caption?: T };
export interface StWork { slug: string; client: string; clientAr?: string; sector: T; title: T; summary: T; format: T; media: Media; /** index of the image used on the wall (default 0) */ cover?: number }

export const SAYTAMM_WORK: StWork[] = [
  {
    slug: 'chery-saudi-models',
    client: 'Chery Saudi', clientAr: 'شيري السعودية',
    sector: { en: 'Automotive', ar: 'سيارات' },
    title: { en: 'Model posts and launch teasers', ar: 'منشورات الطرازات وتشويق الإطلاق' },
    summary: {
      en: 'Posts for Chery Saudi’s Tiggo 9, Tiggo 8 and Arrizo 6, each built on one short Arabic line, plus a “Coming soon” teaser set against the Riyadh skyline.',
      ar: 'منشورات لطرازات Tiggo 9 وTiggo 8 وArrizo 6 من شيري السعودية، كل منها مبني على جملة عربية قصيرة، مع منشور تشويقي «Coming Soon» أمام أفق الرياض.',
    },
    format: { en: 'Social media posts · 3:4', ar: 'منشورات لمنصات التواصل · 3:4' },
    media: { kind: 'images', images: [
      { src: '/work/chery-launch-1.webp', w: 750, h: 1000, alt: { en: 'Chery Saudi post: a Saudi family around a green Tiggo 9 seen from above, headline “A beginning we grow into with you”', ar: 'منشور شيري السعودية: عائلة سعودية حول Tiggo 9 خضراء من الأعلى، وعنوان «بداية نكبر فيها معكم»' } },
      { src: '/work/chery-launch-2.webp', w: 750, h: 1000, alt: { en: 'Chery Saudi post: a green SUV on an elevated road at sunrise, headline “Limitless progress”', ar: 'منشور شيري السعودية: سيارة SUV خضراء على طريق مرتفع وقت الشروق، وعنوان «تطور بلا حدود»' } },
      { src: '/work/chery-launch-3.webp', w: 750, h: 1000, alt: { en: 'Chery Saudi post: a black Arrizo 6 in a concrete courtyard with a diagonal shaft of light, headline “A presence completed by you”', ar: 'منشور شيري السعودية: Arrizo 6 سوداء في فناء خرساني مع شعاع ضوء مائل، وعنوان «حضور يكتمل بوجودكم»' } },
      { src: '/work/chery-launch-4.webp', w: 750, h: 1000, alt: { en: 'Chery Saudi teaser: a Tiggo 8 on a rooftop facing the Riyadh skyline at dusk, line “Coming soon”', ar: 'منشور تشويقي من شيري السعودية: Tiggo 8 على سطح مقابل أفق الرياض وقت الغروب، وعبارة «Coming Soon»' } },
    ] },
  },
  {
    slug: 'chery-saudi-trust',
    client: 'Chery Saudi', clientAr: 'شيري السعودية',
    sector: { en: 'Automotive', ar: 'سيارات' },
    title: { en: 'Trust starts before the road', ar: 'ثقة تبدأ قبل الطريق' },
    summary: {
      en: 'Social posts for Chery Saudi featuring the Tiggo 8 Pro, built around family, safety and comfort, under the line “Trust starts before the road”.',
      ar: 'منشورات لمنصات التواصل لشيري السعودية تقدّم Tiggo 8 Pro من زاوية العائلة والأمان والراحة، تحت شعار «ثقة تبدأ قبل الطريق».',
    },
    format: { en: 'Social media posts · 1:1', ar: 'منشورات لمنصات التواصل · 1:1' },
    media: { kind: 'images', images: [
      { src: '/work/chery-post-1.webp', w: 1000, h: 1000, alt: { en: 'Chery Saudi post: a family beside a Tiggo 8 Pro at sunset, headline “Because they deserve the best”', ar: 'منشور شيري السعودية: عائلة بجانب Tiggo 8 Pro وقت الغروب، وعنوان «لأنهم يستحقون الأفضل»' } },
      { src: '/work/chery-post-2.webp', w: 1000, h: 1000, alt: { en: 'Chery Saudi post: a father and daughter walking to a Tiggo 8 Pro, headline “Trust… the start of every journey”', ar: 'منشور شيري السعودية: أب وابنته متجهان إلى Tiggo 8 Pro، وعنوان «الثقة… بداية كل رحلة»' } },
    ] },
  },
  {
    slug: 'tech-hive-gaming',
    client: 'Tech Hive', clientAr: 'خلية التكنولوجيا',
    sector: { en: 'Electronics retail', ar: 'تجزئة إلكترونيات' },
    title: { en: 'Gaming posts in Saudi dialect', ar: 'منشورات القيمنق باللهجة السعودية' },
    summary: {
      en: 'Social posts for Tech Hive’s gaming range, written in everyday Saudi dialect: ready-built gaming PCs with their key specs in plain view, instalment payments with Tabby and Tamara, and delivery — under lines such as “Gaming, no complications” and “You choose, we deliver”.',
      ar: 'منشورات لمنصات التواصل لقسم القيمنق في خلية التكنولوجيا باللهجة السعودية اليومية: تجميعات كمبيوتر جاهزة بأهم مواصفاتها أمام العميل، والتقسيط عبر تابي وتمارا، والتوصيل، تحت عبارات مثل «القيمنق بدون تعقيد» و«إنت تختار وإحنا نوصّل».',
    },
    format: { en: 'Social media posts · 4:5', ar: 'منشورات لمنصات التواصل · 4:5' },
    media: { kind: 'images', images: [
      { src: '/work/techhive-post-3.webp', w: 800, h: 1000, alt: { en: 'Tech Hive post: a white gaming PC with a specs panel, headline “Gaming, no complications — Casual Core”', ar: 'منشور خلية التكنولوجيا: كمبيوتر ألعاب أبيض مع لوحة المواصفات، وعنوان «القيمنق بدون تعقيد — Casual Core»' } },
      { src: '/work/techhive-post-2.webp', w: 800, h: 1000, alt: { en: 'Tech Hive post: an excited young Saudi man holding a phone with Tabby and Tamara in a neon gaming room, headline “Split your payments and start playing”', ar: 'منشور خلية التكنولوجيا: شاب سعودي متحمس يحمل هاتفاً عليه تابي وتمارا في غرفة ألعاب بإضاءة نيون، وعنوان «ما يبغالها فلوس، قسّم دفعاتك وابدأ اللعب»' } },
      { src: '/work/techhive-post-4.webp', w: 800, h: 1000, alt: { en: 'Tech Hive post: a black gaming PC with RGB fans and a specs panel, headline “A build that works, no headache”', ar: 'منشور خلية التكنولوجيا: كمبيوتر ألعاب أسود بمراوح ملوّنة ولوحة مواصفات، وعنوان «تجميعة تمشّيك صح بدون وجع راس»' } },
      { src: '/work/techhive-post-1.webp', w: 800, h: 1000, alt: { en: 'Tech Hive post: a gamer in a VR headset with a controller, headline “You choose, we deliver”', ar: 'منشور خلية التكنولوجيا: لاعب بنظارة واقع افتراضي ويد تحكم، وعنوان «إنت تختار وإحنا نوصّل»' } },
    ] },
  },
  {
    slug: 'tech-hive-banner',
    client: 'Tech Hive', clientAr: 'خلية التكنولوجيا',
    sector: { en: 'Electronics retail', ar: 'تجزئة إلكترونيات' },
    title: { en: 'Web banners and seasonal offers', ar: 'بانرات المتجر والعروض الموسمية' },
    summary: {
      en: 'Banners for Tech Hive’s online store: a single-product banner built on one clear benefit, plus seasonal offer banners for Saudi National Day and White Friday, each with the offer and payment options in plain view.',
      ar: 'بانرات لمتجر خلية التكنولوجيا الإلكتروني: بانر لمنتج واحد مبني على ميزة واحدة واضحة، وبانرات عروض موسمية لليوم الوطني السعودي والجمعة البيضاء، والعرض وخيارات الدفع ظاهرة للعميل في كل منها.',
    },
    format: { en: 'Web banners', ar: 'بانرات للموقع' },
    media: { kind: 'images', images: [
      { src: '/work/techhive-banner-3.webp', w: 1600, h: 900, alt: { en: 'Tech Hive White Friday banner: a gaming monitor, graphics cards, a processor and a PC case under a purple ribbon offer', ar: 'بانر الجمعة البيضاء من خلية التكنولوجيا: شاشة ألعاب وكروت شاشة ومعالج وكيس كمبيوتر مع شريط العرض البنفسجي' } },
      { src: '/work/techhive-banner.webp', w: 1600, h: 759, alt: { en: 'Tech Hive web banner: a gaming microphone on a desk with the line “Zero ambient noise, pixel-perfect audio clarity”', ar: 'بانر خلية التكنولوجيا: ميكروفون ألعاب على مكتب مع عبارة «صفر ضوضاء محيطة، ووضوح صوت دقيق»' } },
      { src: '/work/techhive-banner-2.webp', w: 1600, h: 759, alt: { en: 'Tech Hive National Day banner: a white PC build and cooling kit in front of Riyadh landmarks, line “Lock the setup”', ar: 'بانر اليوم الوطني من خلية التكنولوجيا: تجميعة كمبيوتر بيضاء وأدوات تبريد أمام معالم الرياض، وعبارة «قفّل السيت أب»' } },
    ] },
  },
  {
    slug: 'niimee-your-size',
    client: 'niimee',
    sector: { en: 'Fashion', ar: 'أزياء' },
    title: { en: 'Your size. Your style.', ar: 'Your size. Your style.' },
    summary: {
      en: 'A campaign look for niimee built on one promise — Your size. Your style. — with quiet, editorial layouts in warm neutrals, the brand line “Simple. Real. Yours.” and four product cues: made for every body, premium fabrics, timeless designs, made for you.',
      ar: 'إطلالة حملة لعلامة niimee مبنية على وعد واحد — Your size. Your style. — بتصاميم هادئة بأسلوب المجلات وألوان دافئة محايدة، مع شعار العلامة «Simple. Real. Yours.» وأربع رسائل للمنتج: لكل الأجسام، وخامات مميزة، وتصاميم لا تبلى، ومصمم لك.',
    },
    format: { en: 'Campaign visuals · 1:1 and 2:3', ar: 'تصاميم حملة · 1:1 و2:3' },
    media: { kind: 'images', images: [
      { src: '/work/niimee-visual-1.webp', w: 666, h: 1000, alt: { en: 'niimee visual: a woman in a blue printed dress in a Diriyah courtyard, headline “Your size. Your style.”', ar: 'تصميم niimee: سيدة بفستان أزرق منقوش في فناء بالدرعية، وعنوان «Your size. Your style.»' } },
      { src: '/work/niimee-visual-2.webp', w: 1000, h: 1000, alt: { en: 'niimee visual: a woman in a cream tee and wide trousers on a curved sofa, with four product icons', ar: 'تصميم niimee: سيدة بتيشيرت كريمي وبنطلون واسع على أريكة منحنية، مع أربع أيقونات للمنتج' } },
      { src: '/work/niimee-visual-3.webp', w: 1000, h: 1000, alt: { en: 'niimee visual: a man in a cream tee leaning on a sunlit wall, line “Made for every day. Made for you.”', ar: 'تصميم niimee: رجل بتيشيرت كريمي يستند إلى جدار مشمس، وعبارة «Made for every day. Made for you.»' } },
    ] },
  },
  {
    slug: 'niimee-the-dot',
    client: 'niimee',
    sector: { en: 'Fashion', ar: 'أزياء' },
    title: { en: 'The Dot', ar: 'The Dot' },
    summary: {
      en: 'A short Instagram feed film for the fashion brand niimee, built around a single line: Every body. Every style. Every day.',
      ar: 'فيلم قصير لخلاصة إنستغرام لعلامة الأزياء niimee، مبني على رسالة واحدة: Every body. Every style. Every day.',
    },
    format: { en: 'Instagram feed video · 18 seconds · 4:5', ar: 'فيديو لخلاصة إنستغرام · 18 ثانية · 4:5' },
    media: { kind: 'video', src: '/work/niimee-the-dot.mp4', poster: '/work/niimee-the-dot-poster.webp', w: 720, h: 900 },
  },
  {
    slug: 'niimee-posts',
    client: 'niimee',
    sector: { en: 'Fashion', ar: 'أزياء' },
    title: { en: 'Fashion for every size', ar: 'أزياء لكل المقاسات' },
    summary: {
      en: 'Social posts for niimee’s online fashion store, set in Saudi courtyards and seafronts: the app and its product cards, the full range of sizes, and modest everyday looks.',
      ar: 'منشورات لمنصات التواصل لمتجر niimee للأزياء، في أفنية وواجهات بحرية سعودية: التطبيق وبطاقات منتجاته، ومجموعة المقاسات الكاملة، وإطلالات محتشمة للاستخدام اليومي.',
    },
    format: { en: 'Social media posts · 4:5', ar: 'منشورات لمنصات التواصل · 4:5' },
    media: { kind: 'images', images: [
      { src: '/work/niimee-post-1.webp', w: 800, h: 1000, alt: { en: 'niimee post: a woman in a teal pleated dress beside a large phone showing the niimee app, surrounded by floating product cards', ar: 'منشور niimee: سيدة بفستان أخضر مزرق بجانب هاتف كبير عليه تطبيق niimee، وحولها بطاقات منتجات' } },
      { src: '/work/niimee-post-2.webp', w: 800, h: 1000, alt: { en: 'niimee post: a woman in a heritage courtyard with a ring of size cards from M to 8XL around her', ar: 'منشور niimee: سيدة في فناء تراثي وحولها حلقة من بطاقات المقاسات من M إلى 8XL' } },
      { src: '/work/niimee-post-3.webp', w: 800, h: 1000, alt: { en: 'niimee post: a woman in a denim jacket and wide jeans beside three dress looks', ar: 'منشور niimee: سيدة بجاكيت وبنطلون جينز واسع بجانب ثلاث إطلالات بفساتين' } },
      { src: '/work/niimee-post-4.webp', w: 800, h: 1000, alt: { en: 'niimee post: three women in everyday outfits walking along a seafront promenade', ar: 'منشور niimee: ثلاث سيدات بإطلالات يومية على كورنيش بحري' } },
    ] },
  },
  {
    slug: 'zahid-electra-appliances',
    client: 'Zahid Electra', clientAr: 'الزاهد إلكترا',
    sector: { en: 'Home appliances', ar: 'أجهزة منزلية' },
    title: { en: 'Saudi-made appliances, in Saudi homes', ar: 'أجهزة صناعة سعودية في البيت السعودي' },
    summary: {
      en: 'Social posts for Zahid Electra’s washing machines, refrigerators and freezers, placing each appliance in a Saudi home and leading with local manufacturing: “Al Zahid in every home”, “Made by Saudi hands” and “We make pride”.',
      ar: 'منشورات لمنصات التواصل لغسالات وثلاجات وفريزرات الزاهد إلكترا، تضع كل جهاز داخل بيت سعودي وتقدّم التصنيع المحلي في الواجهة: «الزاهد في كل بيت» و«بسواعد سعودية» و«نصنع الفخر».',
    },
    format: { en: 'Social media posts', ar: 'منشورات لمنصات التواصل' },
    media: { kind: 'images', images: [
      { src: '/work/zahid-1.webp', w: 1600, h: 1200, alt: { en: 'Zahid Electra post: a washing machine, upright freezer and side-by-side refrigerator on a dark stage, line “We make pride”', ar: 'منشور الزاهد إلكترا: غسالة وفريزر وثلاجة بابين على خلفية داكنة، وعبارة «نصنع الفخر»' } },
      { src: '/work/zahid-2.webp', w: 1000, h: 750, alt: { en: 'Zahid Electra post: a family watching TV beside a washing machine set into wooden panelling, line “Al Zahid in every home”', ar: 'منشور الزاهد إلكترا: عائلة تشاهد التلفاز بجانب غسالة داخل جدار خشبي، وعبارة «الزاهد في كل بيت»' } },
      { src: '/work/zahid-3.webp', w: 1000, h: 750, alt: { en: 'Zahid Electra post: a woman holding groceries beside an upright refrigerator overlooking Riyadh, line “Made by Saudi hands”', ar: 'منشور الزاهد إلكترا: سيدة تحمل مشتريات بجانب ثلاجة بإطلالة على الرياض، وعبارة «بسواعد سعودية»' } },
    ] },
  },
  {
    slug: 'zahid-electra-features',
    client: 'Zahid Electra', clientAr: 'الزاهد إلكترا',
    sector: { en: 'Home appliances', ar: 'أجهزة منزلية' },
    title: { en: 'Product feature posts', ar: 'منشورات مزايا المنتجات' },
    summary: {
      en: 'Product posts for Zahid Electra’s refrigerators, freezers and washing machines, each built on one feature, with a series that places the appliances in Najdi doors and the desert under the line “From the spirit of the Kingdom”.',
      ar: 'منشورات منتجات لثلاجات وفريزرات وغسالات الزاهد إلكترا، كل منها مبني على ميزة واحدة، مع سلسلة تضع الأجهزة في أبواب نجدية والصحراء تحت عبارة «من روح السلكة».',
    },
    format: { en: 'Social media posts · 1:1', ar: 'منشورات لمنصات التواصل · 1:1' },
    media: { kind: 'images', images: [
      { src: '/work/sw-electra-a-1.webp', w: 384, h: 384, alt: { en: 'Zahid Electra post: a glowing refrigerator in a dark space, line “Superior storage capacity”', ar: 'منشور الزاهد إلكترا: ثلاجة مضيئة في مساحة داكنة، وعبارة «سعة تخزين فائقة»' } },
      { src: '/work/sw-electra-a-2.webp', w: 384, h: 384, alt: { en: 'Zahid Electra post: a washing-machine drum lit in pink, line “UV garment sterilisation”', ar: 'منشور الزاهد إلكترا: حوض غسالة مضاء بالوردي، وعبارة «خاصية تعقيم الملابس»' } },
      { src: '/work/sw-electra-a-3.webp', w: 384, h: 384, alt: { en: 'Zahid Electra post: a silver freezer in frosty light, line “The latest cooling technology”', ar: 'منشور الزاهد إلكترا: فريزر فضي في ضوء صقيعي، وعبارة «أعلى تقنيات التبريد»' } },
      { src: '/work/sw-electra-b-1.webp', w: 303, h: 303, alt: { en: 'Zahid Electra post: a washing machine in a wooden cabinet', ar: 'منشور الزاهد إلكترا: غسالة داخل خزانة خشبية' } },
      { src: '/work/sw-electra-b-2.webp', w: 303, h: 303, alt: { en: 'Zahid Electra post: a washing machine in a laundry room, line “The washing machine, innovation for you”', ar: 'منشور الزاهد إلكترا: غسالة في غرفة غسيل، وعبارة «الغسالة: بابتكار نقدمها لكم»' } },
      { src: '/work/sw-electra-b-3.webp', w: 303, h: 303, alt: { en: 'Zahid Electra post: a refrigerator display set into a Najdi door, line “From the spirit of the Kingdom”', ar: 'منشور الزاهد إلكترا: شاشة ثلاجة في باب نجدي، وعبارة «من روح السلكة»' } },
      { src: '/work/sw-electra-b-4.webp', w: 303, h: 303, alt: { en: 'Zahid Electra post: a deep freezer in a kitchen, line “Deep freeze, innovation in your hands”', ar: 'منشور الزاهد إلكترا: فريزر في مطبخ، وعبارة «الديب فريز بإبداع بين أيديكم»' } },
      { src: '/work/sw-electra-b-5.webp', w: 303, h: 303, alt: { en: 'Zahid Electra post: a side-by-side refrigerator on a desert plinth, line “From the spirit of the Kingdom”', ar: 'منشور الزاهد إلكترا: ثلاجة بابين على منصة في الصحراء، وعبارة «من روح السلكة»' } },
      { src: '/work/sw-electra-b-6.webp', w: 303, h: 303, alt: { en: 'Zahid Electra post: a freezer-shaped monolith in the desert, line “Inside, it feels like the North Pole”', ar: 'منشور الزاهد إلكترا: كتلة بشكل فريزر في الصحراء، وعبارة «داخلها إحساس بالقطب الشمالي»' } },
    ] },
  },
  {
    slug: 'gig-posts',
    client: 'GIG', clientAr: 'جي آي جي',
    sector: { en: 'Insurance', ar: 'تأمين' },
    title: { en: '“GIG has you covered”', ar: '«جي آي جي بتجيك»' },
    summary: {
      en: 'Social posts for GIG built on one line in Gulf dialect, “GIG has you covered”, set in Saudi scenes: travel, a desert night and a family at home.',
      ar: 'منشورات سوشيال لجي آي جي مبنية على جملة واحدة باللهجة الخليجية، «جي آي جي بتجيك»، في مشاهد سعودية: السفر، وليلة في الصحراء، وعائلة في البيت.',
    },
    format: { en: 'Social media posts · 1:1', ar: 'منشورات لمنصات التواصل · 1:1' },
    media: { kind: 'images', images: [
      { src: '/work/sw-gig-1.webp', w: 411, h: 412, alt: { en: 'GIG post: a man flying over desert dunes beside a plane, line “Wherever you are, GIG has you covered”', ar: 'منشور جي آي جي: رجل يطير فوق كثبان الصحراء بجانب طائرة، وعبارة «وين ما تكون، جي آي جي بتجيك»' } },
      { src: '/work/sw-gig-2.webp', w: 411, h: 412, alt: { en: 'GIG post: two men by a desert campfire, line “However it was, GIG has you covered”', ar: 'منشور جي آي جي: رجلان حول نار في الصحراء، وعبارة «كيف ما كان، جي آي جي بتجيك»' } },
      { src: '/work/sw-gig-3.webp', w: 411, h: 412, alt: { en: 'GIG post: a family on a sofa at home, line “A secure home, a peace of mind”', ar: 'منشور جي آي جي: عائلة على أريكة في المنزل، وعبارة «بيت متأمّن، بال مرتاح»' } },
    ] },
  },
  {
    slug: 'xiaomi-wearables',
    client: 'Xiaomi', clientAr: 'شاومي',
    sector: { en: 'Consumer electronics', ar: 'إلكترونيات استهلاكية' },
    title: { en: 'Wearables and audio posts', ar: 'منشورات الأجهزة القابلة للارتداء والصوت' },
    summary: {
      en: 'Product posts for Xiaomi’s Redmi Buds 5, Redmi Watch 5 Active and Smart Band 8 Pro, each showing the product in use with one Arabic line, including a Ramadan post.',
      ar: 'منشورات منتجات لـ Redmi Buds 5 وRedmi Watch 5 Active وSmart Band 8 Pro من شاومي، يظهر فيها كل منتج أثناء الاستخدام مع جملة عربية واحدة، ومنها منشور لرمضان.',
    },
    format: { en: 'Social media posts · 1:1', ar: 'منشورات لمنصات التواصل · 1:1' },
    media: { kind: 'images', images: [
      { src: '/work/sw-xiaomi-1.webp', w: 400, h: 400, alt: { en: 'Xiaomi post: a man driving with earbuds, “Redmi Buds 5: enjoy the road”', ar: 'منشور شاومي: رجل يقود بسماعات أذن، «Redmi Buds 5 مستأنس بالطريق»' } },
      { src: '/work/sw-xiaomi-2.webp', w: 400, h: 400, alt: { en: 'Xiaomi post: a runner’s wrist with a watch, “Redmi Watch 5 Active: keep fit safely”', ar: 'منشور شاومي: معصم عدّاء بساعة، «Redmi Watch 5 Active لياقتك بأمان»' } },
      { src: '/work/sw-xiaomi-3.webp', w: 400, h: 400, alt: { en: 'Xiaomi post: a wrist with a fitness band, “Xiaomi Smart Band 8 Pro: live your Ramadan smartly”', ar: 'منشور شاومي: معصم بسوار ذكي، «Xiaomi Smart Band 8 Pro عيش رمضانك بذكاء»' } },
    ] },
  },
  {
    slug: 'marriott-posts',
    client: 'Marriott', clientAr: 'ماريوت',
    sector: { en: 'Hospitality', ar: 'ضيافة' },
    title: { en: 'Hospitality and National Day posts', ar: 'منشورات الضيافة واليوم الوطني' },
    summary: {
      en: 'Social posts for Marriott: dining posts under the line “Our hospitality guarantees your happiness” and an illustrated Saudi National Day post.',
      ar: 'منشورات سوشيال لماريوت: منشورات المطاعم تحت عبارة «ضيافتنا تتكفل بإسعادك!» ومنشور مرسوم لليوم الوطني السعودي.',
    },
    format: { en: 'Social media posts · 1:1', ar: 'منشورات لمنصات التواصل · 1:1' },
    media: { kind: 'images', images: [
      { src: '/work/sw-marriott-1.webp', w: 403, h: 404, alt: { en: 'Marriott post: a lit dining table, headline “Our hospitality guarantees your happiness”', ar: 'منشور ماريوت: طاولة طعام مضاءة، وعنوان «ضيافتنا تتكفل بإسعادك!»' } },
      { src: '/work/sw-marriott-2.webp', w: 403, h: 404, alt: { en: 'Marriott Saudi National Day post: a couple in front of the hotel, illustrated', ar: 'منشور ماريوت لليوم الوطني السعودي: رسم لزوجين أمام الفندق' } },
    ] },
  },
  {
    slug: 'bitumat-posts',
    client: 'BITUMAT',
    sector: { en: 'Building materials', ar: 'مواد البناء' },
    title: { en: 'Posts for a building-materials brand', ar: 'منشورات لعلامة مواد بناء' },
    summary: {
      en: 'Social posts for BITUMAT in its blue and yellow: waterproofing crews at work under “Engineered for efficiency, built to last”, the brand’s Saudi roots and Italian know-how, its quality certification, and a breast-cancer awareness post for October.',
      ar: 'منشورات لمنصات التواصل لعلامة BITUMAT بلونيها الأزرق والأصفر: فرق عزل أثناء العمل تحت عبارة «Engineered for Efficiency, Built to Last»، وجذور العلامة السعودية مع الخبرة الإيطالية، وشهادة الجودة، ومنشور توعية بسرطان الثدي في أكتوبر.',
    },
    format: { en: 'Social media posts · 4:5', ar: 'منشورات لمنصات التواصل · 4:5' },
    media: { kind: 'images', images: [
      { src: '/work/bitumat-1.webp', w: 800, h: 1000, alt: { en: 'BITUMAT post: three workers laying a waterproofing membrane on a city rooftop, headline “Engineered for efficiency, built to last”', ar: 'منشور BITUMAT: ثلاثة عمال يفرشون طبقة عزل على سطح مبنى في مدينة، وعنوان «Engineered for Efficiency, Built to Last»' } },
      { src: '/work/bitumat-2.webp', w: 800, h: 1000, alt: { en: 'BITUMAT post: Riyadh and Makkah landmarks drawn beside the Colosseum and the Tower of Pisa, headline “Rooted in KSA, globally innovated by Italy”', ar: 'منشور BITUMAT: معالم الرياض ومكة مرسومة بجانب الكولوسيوم وبرج بيزا، وعنوان «Rooted in KSA, Globally Innovated by Italy»' } },
      { src: '/work/bitumat-3.webp', w: 800, h: 1000, alt: { en: 'BITUMAT post: three engineers with a clipboard in a factory, headline about ISO 9001:2015 certification', ar: 'منشور BITUMAT: ثلاثة مهندسين يراجعون لوحاً في مصنع، وعنوان عن شهادة ISO 9001:2015' } },
      { src: '/work/bitumat-4.webp', w: 800, h: 1000, alt: { en: 'BITUMAT post: three women with pink ribbons, headline “We care & think pink this October”', ar: 'منشور BITUMAT: ثلاث سيدات بشرائط وردية، وعنوان «We care & think pink This October»' } },
    ] },
  },
  {
    slug: 'mix-events',
    client: 'MIX', clientAr: 'مكس',
    sector: { en: 'Events', ar: 'تنظيم فعاليات' },
    title: { en: 'Posts for an events company', ar: 'منشورات لشركة فعاليات' },
    summary: {
      en: 'Social posts for MIX presenting events the company has delivered, among them the U20 Riyadh 2020 summit with the Royal Commission for Riyadh City and Saudi participation at The London Book Fair, each led by one short Arabic line.',
      ar: 'منشورات لمنصات التواصل لشركة مكس تعرض فعاليات نفّذتها الشركة، منها قمة U20 الرياض 2020 مع الهيئة الملكية لمدينة الرياض، والمشاركة السعودية في معرض لندن للكتاب، وكل منشور مبني على جملة عربية قصيرة.',
    },
    format: { en: 'Social media posts · carousel · 4:5', ar: 'منشورات لمنصات التواصل · كاروسيل · 4:5' },
    media: { kind: 'images', images: [
      { src: '/work/mix-1.webp', w: 800, h: 1000, alt: { en: 'MIX post: the U20 Riyadh 2020 conference hall with delegates at branded desks, headline “A complete plan for an innovative international event”', ar: 'منشور مكس: قاعة مؤتمر U20 الرياض 2020 والمشاركون على مكاتب تحمل الشعار، وعنوان «خطة شاملة لفعالية دولية مبتكرة»' } },
      { src: '/work/mix-2.webp', w: 800, h: 1000, alt: { en: 'MIX post: a London Book Fair banner beside Big Ben at dusk, headline “From the heart of the Kingdom to London”', ar: 'منشور مكس: لافتة معرض لندن للكتاب بجانب ساعة بيغ بن وقت الغروب، وعنوان «من قلب المملكة إلى لندن»' } },
    ] },
  },
  {
    slug: 'arhab-app', cover: 1,
    client: 'Arhab', clientAr: 'أرحب',
    sector: { en: 'Ride booking app', ar: 'تطبيق حجز رحلات' },
    title: { en: 'App posts and banners', ar: 'منشورات وبانرات التطبيق' },
    summary: {
      en: 'Posts and banners for the Arhab ride app, each built on one service: travel between Saudi cities, daily or monthly subscriptions, and booking ahead, with the app screen and store links in every piece.',
      ar: 'منشورات وبانرات لتطبيق أرحب للرحلات، كل منها مبني على خدمة واحدة: التنقل بين مدن المملكة، والاشتراك باليوم أو بالشهر، والحجز المسبق، مع شاشة التطبيق وروابط المتاجر في كل تصميم.',
    },
    format: { en: 'Web banner · social media posts · 4:5', ar: 'بانر للموقع · منشورات لمنصات التواصل · 4:5' },
    media: { kind: 'images', images: [
      { src: '/work/arhab-1.webp', w: 1200, h: 675, alt: { en: 'Arhab banner: a driver on a Riyadh highway under signs to Riyadh, Dammam and Makkah, headline “We connect the Kingdom’s cities in one tap”', ar: 'بانر أرحب: سائق على طريق في الرياض تحت لوحات الرياض والدمام ومكة المكرمة، وعنوان «نربط مدن المملكة بضغطة واحدة»' } },
      { src: '/work/arhab-2.webp', w: 800, h: 1000, alt: { en: 'Arhab post: a woman holding the app in front of the Riyadh skyline, headline “By the day or by the month? Arhab sorts it for you”', ar: 'منشور أرحب: سيدة تحمل التطبيق أمام أفق الرياض، وعنوان «باليوم أو بالشهر؟ أرحب يضبطها لك»' } },
      { src: '/work/arhab-3.webp', w: 800, h: 1000, alt: { en: 'Arhab post: a family with suitcases beside a car and the app screen, headline “Book ahead, arrive on time”', ar: 'منشور أرحب: عائلة بحقائب سفر بجانب سيارة وشاشة التطبيق، وعنوان «مع الحجز المسبق نوصلك في الوقت المحدد»' } },
    ] },
  },
  {
    slug: 'altopiano-posts',
    client: 'ALTOPIANO', clientAr: 'التبيانو',
    sector: { en: 'Restaurants · Italian', ar: 'مطاعم · إيطالي' },
    title: { en: 'Food and venue posts', ar: 'منشورات الأطباق والمكان' },
    summary: {
      en: 'Social posts for ALTOPIANO, an Italian restaurant: a new menu item, fresh pasta served at the table, the terrace at night and the restaurant’s façade, in a warm, low-light style with gold type.',
      ar: 'منشورات لمنصات التواصل لمطعم التبيانو الإيطالي: طبق جديد في القائمة، وباستا طازجة تُقدَّم على الطاولة، والجلسة الخارجية ليلاً، وواجهة المطعم، بأسلوب دافئ وإضاءة خافتة وخطوط ذهبية.',
    },
    format: { en: 'Social media posts · 4:5', ar: 'منشورات لمنصات التواصل · 4:5' },
    media: { kind: 'images', images: [
      { src: '/work/altopiano-3.webp', w: 800, h: 1000, alt: { en: 'ALTOPIANO post: the restaurant’s lit façade and terrace at night, line “Whispers of timeless moments”', ar: 'منشور التبيانو: واجهة المطعم وجلساته الخارجية ليلاً، وعبارة «Whispers Of Timeless Moments»' } },
      { src: '/work/altopiano-1.webp', w: 800, h: 1000, alt: { en: 'ALTOPIANO post: salmon tartare on avocado on a wooden table, line “Menu new item alert”', ar: 'منشور التبيانو: تارتار سلمون على أفوكادو فوق طاولة خشبية، وعبارة «Menu new item alert»' } },
      { src: '/work/altopiano-4.webp', w: 800, h: 1000, alt: { en: 'ALTOPIANO post: a glowing pyramid lamp with Arabic calligraphy beside a terrace table at night, headline “An atmosphere worth telling”', ar: 'منشور التبيانو: مصباح هرمي مضيء بخط عربي بجانب طاولة في الجلسة الخارجية ليلاً، وعنوان «أجواء تُروى»' } },
      { src: '/work/altopiano-2.webp', w: 800, h: 1000, alt: { en: 'ALTOPIANO post: a chef lifting tagliatelle from a bowl, headline “Unique moments with Italian magic”', ar: 'منشور التبيانو: شيف يرفع التالياتيلي من الطبق، وعنوان «لحظات فريدة بسحر إيطالي»' } },
      { src: '/work/sw-altopiano-1.webp', w: 264, h: 331, alt: { en: 'ALTOPIANO post: a gold teapot on a set table, line “Before Iftar”', ar: 'منشور التبيانو: إبريق ذهبي على طاولة معدّة، وعبارة «Before Iftar»' } },
      { src: '/work/sw-altopiano-2.webp', w: 264, h: 331, alt: { en: 'ALTOPIANO post: the restaurant terrace in Diriyah, line “Ramadan in Diriyah”', ar: 'منشور التبيانو: الجلسة الخارجية للمطعم في الدرعية، وعبارة «Ramadan in Diriyah»' } },
      { src: '/work/sw-altopiano-3.webp', w: 264, h: 331, alt: { en: 'ALTOPIANO post: dishes on a table, line “One table, many stories”', ar: 'منشور التبيانو: أطباق على طاولة، وعبارة «One table, many stories»' } },
      { src: '/work/sw-altopiano-5.webp', w: 264, h: 331, alt: { en: 'ALTOPIANO post: a couple dining, line “Atmosphere matters”', ar: 'منشور التبيانو: زوجان يتناولان العشاء، وعبارة «Atmosphere matters»' } },
    ] },
  },
  {
    slug: 'metro-food', cover: 1,
    client: 'METRO', clientAr: 'مترو',
    sector: { en: 'Food products', ar: 'منتجات غذائية' },
    title: { en: 'Product posts and packaging', ar: 'منشورات منتجات وتصميم تغليف' },
    summary: {
      en: 'Social posts for METRO’s toast bread and chicken nuggets, built on the brand’s red and blue tick, and a packaging design for its Normal Toast Bread.',
      ar: 'منشورات لمنصات التواصل لخبز التوست وناجتس الدجاج من مترو، مبنية على علامة الصح الحمراء والزرقاء في هوية العلامة، مع تصميم تغليف لخبز التوست العادي.',
    },
    format: { en: 'Social media posts · 1:1 · packaging design', ar: 'منشورات لمنصات التواصل · 1:1 · تصميم تغليف' },
    media: { kind: 'images', caption: { en: 'The packaging image is a presentation mockup; the two posts were published.', ar: 'صورة التغليف نموذج عرض (موك أب)، والمنشوران نُشرا فعلاً.' }, images: [
      { src: '/work/metro-post-1.webp', w: 1000, h: 1000, alt: { en: 'METRO post: toasted sandwiches and sliced turkey beside a pack of Normal Toast Bread, line “Enjoy freshness every day”', ar: 'منشور مترو: ساندويتشات توست وشرائح لحم بجانب كيس خبز التوست العادي، وعبارة «Enjoy Freshness Every Day»' } },
      { src: '/work/metro-post-2.webp', w: 1000, h: 1000, alt: { en: 'METRO post: a pack of chicken nuggets in front of a large red M, line “Good food shouldn’t wait”', ar: 'منشور مترو: كيس ناجتس دجاج أمام حرف M أحمر كبير، وعبارة «Good food Shouldn’t wait»' } },
      { src: '/work/metro-packaging.webp', w: 1000, h: 1000, alt: { en: 'METRO Normal Toast Bread bag in blue and red (mockup)', ar: 'كيس خبز التوست العادي من مترو بالأزرق والأحمر (موك أب)' } },
      { src: '/work/sw-metro-1.webp', w: 417, h: 417, alt: { en: 'METRO post: a mother and daughter with a shopping cart, line “We bring the world to your cart”', ar: 'منشور مترو: أم وابنتها مع عربة تسوق، وعبارة «We bring the world to your cart»' } },
      { src: '/work/sw-metro-2.webp', w: 417, h: 417, alt: { en: 'METRO post: a boy eating chicken nuggets, line “Happy kid, happy life”', ar: 'منشور مترو: طفل يأكل ناجتس دجاج، وعبارة «Happy kid, Happy life»' } },
    ] },
  },
  {
    slug: 'beauty-lab-packaging',
    client: 'Beauty Lab', clientAr: 'بيوتي لاب',
    sector: { en: 'Natural cosmetics', ar: 'مستحضرات تجميل طبيعية' },
    title: { en: 'Labels, product photography and visuals', ar: 'تصميم الليبلات وتصوير المنتجات' },
    summary: {
      en: 'Label design for Beauty Lab’s natural range, including Moroccan black soap and cold-pressed argan oil: deep blue and black labels with gold line illustrations, followed by product photography and presentation visuals.',
      ar: 'تصميم ليبلات مجموعة بيوتي لاب الطبيعية، ومنها الصابون المغربي الأسود وزيت الأرغان المعصور على البارد: ليبلات بالأزرق الداكن والأسود مع رسومات خطية ذهبية، ثم تصوير المنتجات وتصاميم عرض لها.',
    },
    format: { en: 'Label design · product photography · presentation visual', ar: 'تصميم ليبلات · تصوير منتجات · تصميم عرض' },
    media: { kind: 'images', caption: { en: 'The bathroom scene is a presentation mockup; the two product photos were shot by SayTamm.', ar: 'مشهد الحمّام نموذج عرض (موك أب)، وصورتا المنتج من تصوير قول تم.' }, images: [
      { src: '/work/beautylab-1.webp', w: 1600, h: 914, alt: { en: 'Beauty Lab Moroccan black soap jar on a bath ledge beside towels and a reed diffuser (mockup)', ar: 'علبة الصابون المغربي الأسود من بيوتي لاب على حافة حوض بجانب مناشف ومعطّر (موك أب)' } },
      { src: '/work/beautylab-2.webp', w: 800, h: 1200, alt: { en: 'Product photo: Beauty Lab soap jar with a blue and gold label', ar: 'صورة منتج: علبة صابون بيوتي لاب بليبل أزرق وذهبي' } },
      { src: '/work/beautylab-3.webp', w: 800, h: 1200, alt: { en: 'Product photo: Beauty Lab argan oil dropper bottle with a black and gold label', ar: 'صورة منتج: زجاجة زيت الأرغان من بيوتي لاب بليبل أسود وذهبي' } },
    ] },
  },
  {
    slug: 'cleanbasket-identity', cover: 1,
    client: 'Clean Basket', clientAr: 'كلين باسكت',
    sector: { en: 'Cleaning services', ar: 'خدمات تنظيف' },
    title: { en: 'Brand identity and manual', ar: 'الهوية البصرية ودليل العلامة' },
    summary: {
      en: 'A bilingual identity for Clean Basket: an Arabic and English logo with a smile mark, a teal palette, a curved pattern drawn from the mark, a set of service icons and a brand manual for applying it.',
      ar: 'هوية بصرية ثنائية اللغة لكلين باسكت: شعار عربي وإنجليزي بعلامة ابتسامة، ولوحة ألوان من درجات الأخضر المزرق، ونقشة منحنية مأخوذة من العلامة، ومجموعة أيقونات للخدمات، ودليل لاستخدام الهوية.',
    },
    format: { en: 'Logo, pattern, icons and brand manual', ar: 'الشعار والنقشة والأيقونات ودليل العلامة' },
    media: { kind: 'images', caption: { en: 'Pages from the brand manual.', ar: 'صفحات من دليل العلامة.' }, images: [
      { src: '/work/cleanbasket-1.webp', w: 1200, h: 900, alt: { en: 'Clean Basket brand manual cover in teal with the curved pattern', ar: 'غلاف دليل علامة كلين باسكت بالأخضر المزرق مع النقشة المنحنية' } },
      { src: '/work/cleanbasket-2.webp', w: 1200, h: 900, alt: { en: 'Clean Basket service icons: cleaning cloth, gloves, worker, spray bottles, iron, brush and toolbox', ar: 'أيقونات خدمات كلين باسكت: قطعة تنظيف، قفازات، عامل، بخاخات، مكواة، فرشاة وصندوق أدوات' } },
      { src: '/work/cleanbasket-3.webp', w: 1200, h: 900, alt: { en: 'Three variations of the Clean Basket curved pattern', ar: 'ثلاثة أشكال من نقشة كلين باسكت المنحنية' } },
    ] },
  },
  {
    slug: 'jora-identity',
    client: 'JORA',
    sector: { en: 'Restaurants · Street food', ar: 'مطاعم · أكل شارع' },
    title: { en: 'Brand identity', ar: 'الهوية البصرية' },
    summary: {
      en: 'Brand identity for JORA, a gourmet street food brand established in 2026: a stamp-style logo in round and rectangular versions, built to work on paper, packaging and everyday takeaway items.',
      ar: 'هوية بصرية لعلامة JORA، وهي علامة أكل شارع فاخر تأسست عام 2026: شعار بأسلوب الختم بصيغتين دائرية ومستطيلة، مصمم ليعمل على الورق والتغليف ومستلزمات الطلبات الخارجية.',
    },
    format: { en: 'Logo and identity system · shown on presentation mockups', ar: 'الشعار ونظام الهوية · معروض على نماذج عرض (موك أب)' },
    media: { kind: 'images', caption: { en: 'Identity presentation on mockups, not photographs of the brand in use.', ar: 'عرض للهوية على نماذج (موك أب)، وليست صوراً للعلامة أثناء الاستخدام الفعلي.' }, images: [
      { src: '/work/jora-identity-1.webp', w: 1200, h: 900, alt: { en: 'JORA logo in round and rectangular stamp versions on textured paper (mockup)', ar: 'شعار JORA بصيغتي الختم الدائرية والمستطيلة على ورق (موك أب)' } },
      { src: '/work/jora-identity-2.webp', w: 1200, h: 900, alt: { en: 'JORA stamp logo printed on kraft paper bags (mockup)', ar: 'شعار JORA مطبوع على أكياس ورق كرافت (موك أب)' } },
    ] },
  },
  {
    slug: 'tecspro-posts',
    client: 'TECSPRO', clientAr: 'التقنيات الاحترافية',
    sector: { en: 'Business technology', ar: 'حلول تقنية للأعمال' },
    title: { en: 'B2B technology posts', ar: 'منشورات تقنية للأعمال' },
    summary: {
      en: 'Social posts for TECSPRO, a business technology provider, explaining its integration services and ERP in plain lines such as “Transform chaos into clarity”.',
      ar: 'منشورات سوشيال لشركة التقنيات الاحترافية، مزوّد حلول تقنية للأعمال، تشرح خدمات التكامل وأنظمة ERP بعبارات واضحة مثل «Transform chaos into clarity».',
    },
    format: { en: 'Social media posts · 1:1', ar: 'منشورات لمنصات التواصل · 1:1' },
    media: { kind: 'images', images: [
      { src: '/work/sw-tecspro-1.webp', w: 302, h: 302, alt: { en: 'Tecspro integration solutions post: a smiling man in a shemagh', ar: 'منشور التقنيات الاحترافية لحلول التكامل: رجل مبتسم بالشماغ' } },
      { src: '/work/sw-tecspro-2.webp', w: 302, h: 302, alt: { en: 'Tecspro post: “Connect, automate, achieve harmony” over a large SERVICE headline', ar: 'منشور التقنيات الاحترافية: «Connect, Automate, Achieve Harmony» فوق عنوان SERVICE كبير' } },
      { src: '/work/sw-tecspro-3.webp', w: 302, h: 302, alt: { en: 'Tecspro post: a man with a laptop, line “Transform chaos into clarity”', ar: 'منشور التقنيات الاحترافية: رجل يحمل حاسوباً، وعبارة «Transform chaos into clarity»' } },
      { src: '/work/sw-tecspro-4.webp', w: 302, h: 302, alt: { en: 'Tecspro post: a hand on a digital interface, headline “ERP, a business savior”', ar: 'منشور التقنيات الاحترافية: يد على واجهة رقمية، وعنوان «ERP a business savior»' } },
      { src: '/work/sw-tecspro-5.webp', w: 302, h: 302, alt: { en: 'Tecspro post: hands on a laptop, headline “Our technology solutions, guaranteed results”', ar: 'منشور التقنيات الاحترافية: يدان على حاسوب، وعنوان «حلولنا التكنولوجية مضمونة النتائج»' } },
      { src: '/work/sw-tecspro-6.webp', w: 302, h: 302, alt: { en: 'Tecspro post: three businessmen facing a city skyline, headline “Why choose Tecspro?”', ar: 'منشور التقنيات الاحترافية: ثلاثة رجال أعمال أمام أفق مدينة، وعنوان «Why choose TECSPRO?»' } },
    ] },
  },
  {
    slug: 'siefco-posts',
    client: 'SIEFCO', clientAr: 'سفكو',
    sector: { en: 'Concrete products', ar: 'منتجات خرسانية' },
    title: { en: 'Industrial product posts', ar: 'منشورات منتجات صناعية' },
    summary: {
      en: 'Social posts for SIEFCO, a concrete products manufacturer: its products, its values and its paving, in a bold blue and red layout.',
      ar: 'منشورات سوشيال لسفكو، مصنع منتجات خرسانية: منتجاتها وقيمها وأرصفتها، بتصميم جريء بالأزرق والأحمر.',
    },
    format: { en: 'Social media posts · 4:5', ar: 'منشورات لمنصات التواصل · 4:5' },
    media: { kind: 'images', images: [
      { src: '/work/sw-siefco-1.webp', w: 382, h: 477, alt: { en: 'SIEFCO post: concrete pavers on a production line, headline “SIEFCO products”', ar: 'منشور سفكو: بلاط خرساني على خط إنتاج، وعنوان «منتجات سفكو»' } },
      { src: '/work/sw-siefco-2.webp', w: 382, h: 477, alt: { en: 'SIEFCO post: the Riyadh skyline, headline “SIEFCO’s core values: leadership, commitment, innovation”', ar: 'منشور سفكو: أفق الرياض، وعنوان «أهم قيم سفكو: الريادة والالتزام والابتكار»' } },
      { src: '/work/sw-siefco-3.webp', w: 382, h: 477, alt: { en: 'SIEFCO post: workers beside stacks of paving slabs, headline “Concrete products and paving”', ar: 'منشور سفكو: عمال بجانب رصّات بلاط، وعنوان «منتجات وأرصفة خرسانية»' } },
    ] },
  },
  {
    slug: 'dc-block-posts',
    client: 'DC BLOCK', clientAr: 'دي سي بلوك',
    sector: { en: 'Building materials', ar: 'مواد البناء' },
    title: { en: 'Product posts for a block manufacturer', ar: 'منشورات منتج لمصنع بلوك' },
    summary: {
      en: 'Social posts for DC BLOCK that put the block itself in the foreground of a building site: “A strong foundation starts with the right choice”, and a split frost-and-desert scene for “Strength and insulation together”.',
      ar: 'منشورات لمنصات التواصل لشركة DC BLOCK تضع البلوكة نفسها في مقدمة موقع البناء: «الأساس القوي يبدأ من الاختيار الصحيح»، ومشهد منقسم بين الصقيع والصحراء لعبارة «القوة والعزل معاً».',
    },
    format: { en: 'Social media posts · 4:5', ar: 'منشورات لمنصات التواصل · 4:5' },
    media: { kind: 'images', images: [
      { src: '/work/dcblock-2.webp', w: 800, h: 1000, alt: { en: 'DC BLOCK post: a concrete block half in frost and half in desert heat in front of a building site, headline “Strength and insulation together”', ar: 'منشور DC BLOCK: بلوكة خرسانية نصفها في الصقيع ونصفها في حرارة الصحراء أمام موقع بناء، وعنوان «القوة والعزل معاً»' } },
      { src: '/work/dcblock-1.webp', w: 800, h: 1000, alt: { en: 'DC BLOCK post: an insulated block in front of a construction site at dusk, headline “A strong foundation starts with the right choice”', ar: 'منشور DC BLOCK: بلوكة معزولة أمام موقع إنشاء وقت الغروب، وعنوان «الأساس القوي يبدأ من الاختيار الصحيح»' } },
      { src: '/work/sw-dcblock-2.webp', w: 266, h: 333, alt: { en: 'DC BLOCK post: a dark insulated block in front of a construction site, headline “High-quality insulating block”', ar: 'منشور DC BLOCK: بلوكة عازلة داكنة أمام موقع بناء، وعنوان «بلوك عازل عالي الجودة»' } },
      { src: '/work/sw-dcblock-3.webp', w: 266, h: 333, alt: { en: 'DC BLOCK post: a shield beside a block wall, headline “Quality is a promise, not a slogan”', ar: 'منشور DC BLOCK: درع بجانب جدار بلوك، وعنوان «الجودة ليست شعاراً بل وعد»' } },
      { src: '/work/sw-dcblock-4.webp', w: 266, h: 333, alt: { en: 'DC BLOCK post: a block beside pipes, headline “Block that protects building pipes”', ar: 'منشور DC BLOCK: بلوكة بجانب أنابيب، وعنوان «بلوك مباني حماية مواسير»' } },
      { src: '/work/sw-dcblock-5.webp', w: 266, h: 333, alt: { en: 'DC BLOCK post: a yellow hard hat in front of towers under construction', ar: 'منشور DC BLOCK: خوذة صفراء أمام أبراج قيد الإنشاء' } },
      { src: '/work/sw-dcblock-6.webp', w: 266, h: 333, alt: { en: 'DC BLOCK post: a man relaxing at home, headline “A quiet home starts from the foundation”', ar: 'منشور DC BLOCK: رجل يسترخي في منزله، وعنوان «بيئة هادئة من الأساس»' } },
    ] },
  },
  {
    slug: 'alqimma-founding-day',
    client: 'Alqimma Equipment', clientAr: 'معدات القمة',
    sector: { en: 'Equipment', ar: 'معدات' },
    title: { en: 'Product and occasion posts', ar: 'منشورات المنتج والمناسبات' },
    summary: {
      en: 'Posts for Alqimma Equipment Company: a product post for its Saudi-made concrete mixer, with the key specifications and contact details laid out for buyers, and a Saudi Founding Day post of Najdi mud architecture and camels under “A story of glory we are proud of, and values that lead us to tomorrow”.',
      ar: 'منشورات لشركة معدات القمة: منشور منتج لخلاطة الخرسانة المصنوعة في السعودية، مع أهم المواصفات وأرقام التواصل أمام المشتري، ومنشور يوم التأسيس بعمارة نجدية طينية وإبل تحت عبارة «قصة مجد نعتز بها، وقيم تقودنا نحو الغد».',
    },
    format: { en: 'Social media posts · 4:5', ar: 'منشورات لمنصات التواصل · 4:5' },
    media: { kind: 'images', images: [
      { src: '/work/alqimma-2.webp', w: 800, h: 1000, alt: { en: 'Alqimma Equipment post: a white planetary concrete mixer on a building site, headline “The high-quality mixer”, with specifications and phone numbers', ar: 'منشور معدات القمة: خلاطة خرسانة بيضاء في موقع بناء، وعنوان «الخلطة عالية الجودة»، مع المواصفات وأرقام التواصل' } },
      { src: '/work/alqimma-1.webp', w: 800, h: 1000, alt: { en: 'Alqimma Equipment Founding Day post: camels beside Najdi mud buildings, headline “Remembering the founding”', ar: 'منشور يوم التأسيس من معدات القمة: إبل بجانب مبانٍ نجدية طينية، وعنوان «ذكرى التأسيس»' } },
      { src: '/work/sw-alqimma-1.webp', w: 254, h: 318, alt: { en: 'Alqimma post: a worker’s blue hard hat, headline “Quality made in Saudi Arabia, working with confidence in the field”', ar: 'منشور معدات القمة: خوذة عامل زرقاء، وعنوان «جودة تُصنع في السعودية وتعمل بثقة في الميدان»' } },
      { src: '/work/sw-alqimma-2.webp', w: 254, h: 318, alt: { en: 'Alqimma post: engineers at a site at sunset, headline “Integrated engineering solutions, from planning to operation”', ar: 'منشور معدات القمة: مهندسون في موقع وقت الغروب، وعنوان «حلول هندسية متكاملة من التخطيط إلى التشغيل»' } },
      { src: '/work/sw-alqimma-3.webp', w: 254, h: 318, alt: { en: 'Alqimma post: an engineer with plans, headline “Saudi industrial expertise”', ar: 'منشور معدات القمة: مهندس يحمل مخططات، وعنوان «شركة معدات القمة: خبرة صناعية سعودية»' } },
      { src: '/work/sw-alqimma-4.webp', w: 254, h: 318, alt: { en: 'Alqimma post: the QMAX18 block machine, headline “Productivity beyond expectations”', ar: 'منشور معدات القمة: ماكينة QMAX18، وعنوان «إنتاجية تفوق التوقعات»' } },
      { src: '/work/sw-alqimma-5.webp', w: 254, h: 318, alt: { en: 'Alqimma post: precision block moulds, headline about consistent output in every batch', ar: 'منشور معدات القمة: قوالب بلوك دقيقة، وعنوان «قوالب دقيقة: نتائج ثابتة في كل دفعة إنتاج»' } },
      { src: '/work/sw-alqimma-6.webp', w: 254, h: 318, alt: { en: 'Alqimma post: a twin-shaft concrete mixer, headline about operation at production sites', ar: 'منشور معدات القمة: خلاطة خرسانة ذات محورين، وعنوان عن التشغيل في مواقع الإنتاج' } },
    ] },
  },
  {
    slug: 'fatora-plus-posts',
    client: 'Fatora Plus', clientAr: 'فاتورة بلس',
    sector: { en: 'Invoicing software', ar: 'برامج الفوترة' },
    title: { en: 'Social posts for an invoicing platform', ar: 'منشورات لمنصة فوترة' },
    summary: {
      en: 'Social posts for Fatora Plus: a Saudi National Day contest post, “Take part and win”, and a product post inviting business owners to take control of their company’s finances.',
      ar: 'منشورات لمنصات التواصل لفاتورة بلس: منشور مسابقة لليوم الوطني السعودي بعنوان «شارك واربح»، ومنشور للمنتج يدعو أصحاب الأعمال إلى التحكم في حركة شركاتهم المالية.',
    },
    format: { en: 'Social media posts · 1:1', ar: 'منشورات لمنصات التواصل · 1:1' },
    media: { kind: 'images', images: [
      { src: '/work/fatora-1.webp', w: 1000, h: 1000, alt: { en: 'Fatora Plus Saudi National Day post over the Riyadh skyline at night, headline “Take part and win”', ar: 'منشور فاتورة بلس لليوم الوطني السعودي على أفق الرياض ليلاً، وعنوان «شارك واربح»' } },
      { src: '/work/fatora-2.webp', w: 1000, h: 1000, alt: { en: 'Fatora Plus post: a laptop with financial charts, headline “Take control of your company’s finances”', ar: 'منشور فاتورة بلس: حاسوب محمول عليه رسوم مالية، وعنوان «تحكم في حركة شركتك المالية»' } },
      { src: '/work/sw-fatora-1.webp', w: 300, h: 300, alt: { en: 'Fatora Plus post: an invoice and laptop, headline about complete invoice management', ar: 'منشور فاتورة بلس: فاتورة وحاسوب، وعنوان «الراحة الكاملة لإدارة الفواتير»' } },
      { src: '/work/sw-fatora-2.webp', w: 300, h: 300, alt: { en: 'Fatora Plus post: a laptop on a desk, headline “Go green, cut your costs”', ar: 'منشور فاتورة بلس: حاسوب على مكتب، وعنوان «امتثل بيئياً، رشّد نفقاتك»' } },
      { src: '/work/sw-fatora-3.webp', w: 300, h: 300, alt: { en: 'Fatora Plus post: hands typing, headline “Your legal compliance supports your business”', ar: 'منشور فاتورة بلس: يدان تكتبان، وعنوان «التزامك القانوني يدعم تجارتك»' } },
      { src: '/work/sw-fatora-4.webp', w: 300, h: 300, alt: { en: 'Fatora Plus post: a man in a thobe with a laptop, headline “Easier, smarter invoicing”', ar: 'منشور فاتورة بلس: رجل بالثوب يحمل حاسوباً، وعنوان «فوترة أسهل أذكى»' } },
      { src: '/work/sw-fatora-5.webp', w: 300, h: 300, alt: { en: 'Fatora Plus post: an invoicing dashboard on a laptop, headline “Save time with automated invoices”', ar: 'منشور فاتورة بلس: لوحة فوترة على حاسوب، وعنوان «خلص من آلية إدارة فواتيرك»' } },
      { src: '/work/sw-fatora-6.webp', w: 300, h: 300, alt: { en: 'Fatora Plus post: a man holding a phone with an invoice, headline “Your smart partner for e-invoicing”', ar: 'منشور فاتورة بلس: رجل يحمل هاتفاً عليه فاتورة، وعنوان «شريكك الذكي للفوترة الإلكترونية»' } },
    ] },
  },
  {
    slug: 'ks-furniture-offer',
    client: 'K.S Furniture', clientAr: 'K.S للأثاث',
    sector: { en: 'Furniture · E-commerce', ar: 'أثاث · تجارة إلكترونية' },
    title: { en: 'National Day offer post', ar: 'منشور عرض اليوم الوطني' },
    summary: {
      en: 'A Saudi National Day offer post for K.S Furniture’s online store: a styled bedroom set, the discount in the brand’s deep red, an order button and the instalment options customers look for.',
      ar: 'منشور عرض اليوم الوطني السعودي لمتجر K.S للأثاث الإلكتروني: غرفة منسّقة، والخصم بلون العلامة الأحمر الداكن، وزر طلب، وخيارات التقسيط التي يبحث عنها العميل.',
    },
    format: { en: 'Social media post · 1:1', ar: 'منشور لمنصات التواصل · 1:1' },
    media: { kind: 'images', images: [
      { src: '/work/ks-offer.webp', w: 1000, h: 1000, alt: { en: 'K.S Furniture National Day offer post: a black dresser, vanity and clear acrylic chair, with an order button and instalment payment logos', ar: 'منشور عرض اليوم الوطني من K.S للأثاث: تسريحة سوداء وكرسي أكريليك شفاف، مع زر الطلب وشعارات الدفع بالتقسيط' } },
    ] },
  },
  {
    slug: 'siyaq-post',
    client: 'Siyaq', clientAr: 'سياق',
    sector: { en: 'Content platform', ar: 'منصة محتوى' },
    title: { en: 'App launch post', ar: 'منشور للتطبيق' },
    summary: {
      en: 'A post for Siyaq, an Arabic content platform: the website on a laptop between old print, a fountain pen and a lantern, inviting readers to share how they find information, with links to both app stores.',
      ar: 'منشور لسياق، منصة المحتوى العربية: الموقع على حاسوب محمول بين صفحات مطبوعة قديمة وقلم حبر وفانوس، يدعو القرّاء لمشاركة طريقتهم في الحصول على المعلومة، مع روابط متجري التطبيقات.',
    },
    format: { en: 'Social media post · 1:1', ar: 'منشور لمنصات التواصل · 1:1' },
    media: { kind: 'images', images: [
      { src: '/work/siyaq-1.webp', w: 1000, h: 1000, alt: { en: 'Siyaq post: the Siyaq website on a laptop with open books, a lantern and a fountain pen, headline “Share your way of getting information”', ar: 'منشور سياق: موقع سياق على حاسوب محمول مع كتب مفتوحة وفانوس وقلم حبر، وعنوان «شاركنا طريقتك في الحصول على المعلومة»' } },
      { src: '/work/sw-siyaq-1.webp', w: 314, h: 314, alt: { en: 'Siyaq post: a man with a laptop among app screens, headline “The fastest route into your field”', ar: 'منشور سياق: رجل يحمل حاسوباً بين شاشات التطبيق، وعنوان «الطريق الأسرع إلى مجالك»' } },
      { src: '/work/sw-siyaq-3.webp', w: 314, h: 314, alt: { en: 'Siyaq post: a phone on a road between bookshelves, headline “A new door to knowledge”', ar: 'منشور سياق: هاتف على طريق بين رفوف كتب، وعنوان «باب جديد للمعرفة»' } },
      { src: '/work/sw-siyaq-4.webp', w: 314, h: 314, alt: { en: 'Siyaq post: two people at a desk, headline “Coming soon: Siyaq in Egypt”', ar: 'منشور سياق: شخصان على مكتب، وعنوان «قريباً سياق في مصر»' } },
      { src: '/work/sw-siyaq-5.webp', w: 314, h: 314, alt: { en: 'Siyaq post for World Chess Day: chess pieces with a graduation cap, “Working smart wins”', ar: 'منشور سياق ليوم الشطرنج العالمي: قطع شطرنج وقبعة تخرج، وعبارة «Working smart wins»' } },
      { src: '/work/sw-siyaq-6.webp', w: 314, h: 314, alt: { en: 'Siyaq post: two smiling experts and a phone, headline “The link between you and the experts”', ar: 'منشور سياق: خبيران مبتسمان وهاتف، وعنوان «حلقة الوصل بينك وبين الخبراء»' } },
    ] },
  },
  {
    slug: 'exodus-travel-post',
    client: 'Exodus Travel',
    sector: { en: 'Travel', ar: 'سفر وسياحة' },
    title: { en: 'Flight updates post', ar: 'منشور مواعيد الرحلات' },
    summary: {
      en: 'A post for Exodus Travel built on a departures board, inviting followers to stay updated on Cairo flights.',
      ar: 'منشور لشركة Exodus Travel مبني على لوحة المغادرة في المطار، يدعو المتابعين لمتابعة مواعيد رحلات القاهرة.',
    },
    format: { en: 'Social media post · 1:1', ar: 'منشور لمنصات التواصل · 1:1' },
    media: { kind: 'images', images: [
      { src: '/work/exodus-1.webp', w: 1000, h: 1000, alt: { en: 'Exodus Travel post: an airport departures board with dashed flight paths, headline “Stay updated on Cairo flights”', ar: 'منشور Exodus Travel: لوحة مغادرة في المطار مع مسارات طيران منقّطة، وعنوان «Stay Updated On Cairo Flights»' } },
    ] },
  },
];

// Deliverable types, used by the filterable wall on /work/
export type WorkTag = 'social' | 'banner' | 'identity' | 'packaging' | 'video';
export const WORK_TAGS: Record<string, WorkTag[]> = {
  'jora-identity': ['identity'], 'chery-saudi-models': ['social'], 'chery-saudi-trust': ['social'],
  'zahid-electra-appliances': ['social'], 'beauty-lab-packaging': ['packaging'], 'metro-food': ['social', 'packaging'],
  'cleanbasket-identity': ['identity'], 'arhab-app': ['social', 'banner'], 'altopiano-posts': ['social'],
  'mix-events': ['social'], 'alqimma-founding-day': ['social'], 'fatora-plus-posts': ['social'],
  'ks-furniture-offer': ['social'], 'siyaq-post': ['social'], 'exodus-travel-post': ['social'],
  'niimee-posts': ['social'], 'niimee-your-size': ['social'], 'bitumat-posts': ['social'], 'dc-block-posts': ['social'], 'niimee-the-dot': ['video'], 'tech-hive-banner': ['banner'], 'tech-hive-gaming': ['social'], 'gig-posts': ['social'], 'xiaomi-wearables': ['social'], 'marriott-posts': ['social'], 'tecspro-posts': ['social'], 'siefco-posts': ['social'], 'zahid-electra-features': ['social'],
};
/** Cover image of a project: first image, or the video poster */
export const coverOf = (w: StWork) => w.media.kind === 'video' ? { src: w.media.poster, w: w.media.w, h: w.media.h } : w.media.images[w.cover ?? 0];
