// Work delivered BY SAYTAMM for its direct clients (Category A), owner-confirmed as published.
// Facts only: client, format, what the piece says. No objective, strategy or results are stated
// unless the owner supplies them. Separate from cases.ts (team track record).
import type { Lang } from '../config/site';
type T = Record<Lang, string>;
export type Media =
  | { kind: 'video'; src: string; poster: string; w: number; h: number }
  | { kind: 'images'; images: { src: string; w: number; h: number; alt: T }[]; caption?: T };
export interface StWork { slug: string; client: string; clientAr?: string; sector: T; title: T; summary: T; format: T; media: Media }

export const SAYTAMM_WORK: StWork[] = [
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
    slug: 'chery-saudi-trust',
    client: 'Chery Saudi', clientAr: 'شيري السعودية',
    sector: { en: 'Automotive', ar: 'سيارات' },
    title: { en: 'Trust starts before the road', ar: 'ثقة تبدأ قبل الطريق' },
    summary: {
      en: 'Social posts for Chery Saudi featuring the Tiggo 8 Pro, built around family, safety and comfort, under the line “Trust starts before the road”.',
      ar: 'بوستات سوشيال لشيري السعودية تقدّم Tiggo 8 Pro من زاوية العائلة والأمان والراحة، تحت شعار «ثقة تبدأ قبل الطريق».',
    },
    format: { en: 'Social media posts · 1:1', ar: 'بوستات لمنصات التواصل · 1:1' },
    media: { kind: 'images', images: [
      { src: '/work/chery-post-1.webp', w: 1000, h: 1000, alt: { en: 'Chery Saudi post: a family beside a Tiggo 8 Pro at sunset, headline “Because they deserve the best”', ar: 'بوست شيري السعودية: عائلة بجانب Tiggo 8 Pro وقت الغروب، وعنوان «لأنهم يستحقون الأفضل»' } },
      { src: '/work/chery-post-2.webp', w: 1000, h: 1000, alt: { en: 'Chery Saudi post: a father and daughter walking to a Tiggo 8 Pro, headline “Trust… the start of every journey”', ar: 'بوست شيري السعودية: أب وابنته متجهان إلى Tiggo 8 Pro، وعنوان «الثقة… بداية كل رحلة»' } },
    ] },
  },
  {
    slug: 'zahid-electra-appliances',
    client: 'Zahid Electra', clientAr: 'الزاهد إلكترا',
    sector: { en: 'Home appliances', ar: 'أجهزة منزلية' },
    title: { en: 'Saudi-made appliances, in Saudi homes', ar: 'أجهزة صناعة سعودية في البيت السعودي' },
    summary: {
      en: 'Social posts for Zahid Electra’s washing machines, refrigerators and freezers, placing each appliance in a Saudi home and leading with local manufacturing: “Al Zahid in every home”, “Made by Saudi hands” and “We make pride”.',
      ar: 'بوستات سوشيال لغسالات وثلاجات وفريزرات الزاهد إلكترا، تضع كل جهاز داخل بيت سعودي وتقدّم التصنيع المحلي في الواجهة: «الزاهد في كل بيت» و«بسواعد سعودية» و«نصنع الفخر».',
    },
    format: { en: 'Social media posts', ar: 'بوستات لمنصات التواصل' },
    media: { kind: 'images', images: [
      { src: '/work/zahid-1.webp', w: 1600, h: 1200, alt: { en: 'Zahid Electra post: a washing machine, upright freezer and side-by-side refrigerator on a dark stage, line “We make pride”', ar: 'بوست الزاهد إلكترا: غسالة وفريزر وثلاجة بابين على خلفية داكنة، وعبارة «نصنع الفخر»' } },
      { src: '/work/zahid-2.webp', w: 1000, h: 750, alt: { en: 'Zahid Electra post: a family watching TV beside a washing machine set into wooden panelling, line “Al Zahid in every home”', ar: 'بوست الزاهد إلكترا: عائلة تشاهد التلفاز بجانب غسالة داخل جدار خشبي، وعبارة «الزاهد في كل بيت»' } },
      { src: '/work/zahid-3.webp', w: 1000, h: 750, alt: { en: 'Zahid Electra post: a woman holding groceries beside an upright refrigerator overlooking Riyadh, line “Made by Saudi hands”', ar: 'بوست الزاهد إلكترا: سيدة تحمل مشتريات بجانب ثلاجة بإطلالة على الرياض، وعبارة «بسواعد سعودية»' } },
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
    slug: 'metro-food',
    client: 'METRO', clientAr: 'مترو',
    sector: { en: 'Food products', ar: 'منتجات غذائية' },
    title: { en: 'Product posts and packaging', ar: 'بوستات منتجات وتصميم تغليف' },
    summary: {
      en: 'Social posts for METRO’s toast bread and chicken nuggets, built on the brand’s red and blue tick, and a packaging design for its Normal Toast Bread.',
      ar: 'بوستات سوشيال لخبز التوست وناجتس الدجاج من مترو، مبنية على علامة الصح الحمراء والزرقاء في هوية العلامة، مع تصميم تغليف لخبز التوست العادي.',
    },
    format: { en: 'Social media posts · 1:1 · packaging design', ar: 'بوستات لمنصات التواصل · 1:1 · تصميم تغليف' },
    media: { kind: 'images', caption: { en: 'The packaging image is a presentation mockup; the two posts were published.', ar: 'صورة التغليف نموذج عرض (موك أب)، والبوستان منشوران.' }, images: [
      { src: '/work/metro-post-1.webp', w: 1000, h: 1000, alt: { en: 'METRO post: toasted sandwiches and sliced turkey beside a pack of Normal Toast Bread, line “Enjoy freshness every day”', ar: 'بوست مترو: ساندويتشات توست وشرائح لحم بجانب كيس خبز التوست العادي، وعبارة «Enjoy Freshness Every Day»' } },
      { src: '/work/metro-post-2.webp', w: 1000, h: 1000, alt: { en: 'METRO post: a pack of chicken nuggets in front of a large red M, line “Good food shouldn’t wait”', ar: 'بوست مترو: كيس ناجتس دجاج أمام حرف M أحمر كبير، وعبارة «Good food Shouldn’t wait»' } },
      { src: '/work/metro-packaging.webp', w: 1000, h: 1000, alt: { en: 'METRO Normal Toast Bread bag in blue and red (mockup)', ar: 'كيس خبز التوست العادي من مترو بالأزرق والأحمر (موك أب)' } },
    ] },
  },
  {
    slug: 'cleanbasket-identity',
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
    slug: 'altopiano-posts',
    client: 'ALTOPIANO', clientAr: 'التبيانو',
    sector: { en: 'Restaurants · Italian', ar: 'مطاعم · إيطالي' },
    title: { en: 'Food and venue posts', ar: 'بوستات الأطباق والمكان' },
    summary: {
      en: 'Social posts for ALTOPIANO, an Italian restaurant: a new menu item, fresh pasta served at the table, and the restaurant’s façade at night, in a warm, low-light style with gold type.',
      ar: 'بوستات سوشيال لمطعم التبيانو الإيطالي: طبق جديد في القائمة، وباستا طازجة تُقدَّم على الطاولة، وواجهة المطعم ليلاً، بأسلوب دافئ وإضاءة خافتة وخطوط ذهبية.',
    },
    format: { en: 'Social media posts · 4:5', ar: 'بوستات لمنصات التواصل · 4:5' },
    media: { kind: 'images', images: [
      { src: '/work/altopiano-3.webp', w: 800, h: 1000, alt: { en: 'ALTOPIANO post: the restaurant’s lit façade and terrace at night, line “Whispers of timeless moments”', ar: 'بوست التبيانو: واجهة المطعم وجلساته الخارجية ليلاً، وعبارة «Whispers Of Timeless Moments»' } },
      { src: '/work/altopiano-1.webp', w: 800, h: 1000, alt: { en: 'ALTOPIANO post: salmon tartare on avocado on a wooden table, line “Menu new item alert”', ar: 'بوست التبيانو: تارتار سلمون على أفوكادو فوق طاولة خشبية، وعبارة «Menu new item alert»' } },
      { src: '/work/altopiano-2.webp', w: 800, h: 1000, alt: { en: 'ALTOPIANO post: a chef lifting tagliatelle from a bowl, headline “Unique moments with Italian magic”', ar: 'بوست التبيانو: شيف يرفع التالياتيلي من الطبق، وعنوان «لحظات فريدة بسحر إيطالي»' } },
    ] },
  },
  {
    slug: 'fatora-plus-posts',
    client: 'Fatora Plus', clientAr: 'فاتورة بلس',
    sector: { en: 'Invoicing software', ar: 'برامج الفوترة' },
    title: { en: 'Social posts for an invoicing platform', ar: 'بوستات لمنصة فوترة' },
    summary: {
      en: 'Social posts for Fatora Plus: a Saudi National Day contest post, “Take part and win”, and a product post inviting business owners to take control of their company’s finances.',
      ar: 'بوستات سوشيال لفاتورة بلس: بوست مسابقة لليوم الوطني السعودي بعنوان «شارك واربح»، وبوست للمنتج يدعو أصحاب الأعمال إلى التحكم في حركة شركاتهم المالية.',
    },
    format: { en: 'Social media posts · 1:1', ar: 'بوستات لمنصات التواصل · 1:1' },
    media: { kind: 'images', images: [
      { src: '/work/fatora-1.webp', w: 1000, h: 1000, alt: { en: 'Fatora Plus Saudi National Day post over the Riyadh skyline at night, headline “Take part and win”', ar: 'بوست فاتورة بلس لليوم الوطني السعودي على أفق الرياض ليلاً، وعنوان «شارك واربح»' } },
      { src: '/work/fatora-2.webp', w: 1000, h: 1000, alt: { en: 'Fatora Plus post: a laptop with financial charts, headline “Take control of your company’s finances”', ar: 'بوست فاتورة بلس: حاسوب محمول عليه رسوم مالية، وعنوان «تحكم في حركة شركتك المالية»' } },
    ] },
  },
  {
    slug: 'ks-furniture-offer',
    client: 'K.S Furniture', clientAr: 'K.S للأثاث',
    sector: { en: 'Furniture · E-commerce', ar: 'أثاث · تجارة إلكترونية' },
    title: { en: 'National Day offer post', ar: 'بوست عرض اليوم الوطني' },
    summary: {
      en: 'A Saudi National Day offer post for K.S Furniture’s online store: a styled bedroom set, the discount in the brand’s deep red, an order button and the instalment options customers look for.',
      ar: 'بوست عرض اليوم الوطني السعودي لمتجر K.S للأثاث الإلكتروني: غرفة منسّقة، والخصم بلون العلامة الأحمر الداكن، وزر طلب، وخيارات التقسيط التي يبحث عنها العميل.',
    },
    format: { en: 'Social media post · 1:1', ar: 'بوست لمنصات التواصل · 1:1' },
    media: { kind: 'images', images: [
      { src: '/work/ks-offer.webp', w: 1000, h: 1000, alt: { en: 'K.S Furniture National Day offer post: a black dresser, vanity and clear acrylic chair, with an order button and instalment payment logos', ar: 'بوست عرض اليوم الوطني من K.S للأثاث: تسريحة سوداء وكرسي أكريليك شفاف، مع زر الطلب وشعارات الدفع بالتقسيط' } },
    ] },
  },
  {
    slug: 'siyaq-post',
    client: 'Siyaq', clientAr: 'سياق',
    sector: { en: 'Content platform', ar: 'منصة محتوى' },
    title: { en: 'App launch post', ar: 'بوست للتطبيق' },
    summary: {
      en: 'A post for Siyaq, an Arabic content platform: the website on a laptop between old print, a fountain pen and a lantern, inviting readers to share how they find information, with links to both app stores.',
      ar: 'بوست لسياق، منصة المحتوى العربية: الموقع على حاسوب محمول بين صفحات مطبوعة قديمة وقلم حبر وفانوس، يدعو القرّاء لمشاركة طريقتهم في الحصول على المعلومة، مع روابط متجري التطبيقات.',
    },
    format: { en: 'Social media post · 1:1', ar: 'بوست لمنصات التواصل · 1:1' },
    media: { kind: 'images', images: [
      { src: '/work/siyaq-1.webp', w: 1000, h: 1000, alt: { en: 'Siyaq post: the Siyaq website on a laptop with open books, a lantern and a fountain pen, headline “Share your way of getting information”', ar: 'بوست سياق: موقع سياق على حاسوب محمول مع كتب مفتوحة وفانوس وقلم حبر، وعنوان «شاركنا طريقتك في الحصول على المعلومة»' } },
    ] },
  },
  {
    slug: 'exodus-travel-post',
    client: 'Exodus Travel',
    sector: { en: 'Travel', ar: 'سفر وسياحة' },
    title: { en: 'Flight updates post', ar: 'بوست مواعيد الرحلات' },
    summary: {
      en: 'A post for Exodus Travel built on a departures board, inviting followers to stay updated on Cairo flights.',
      ar: 'بوست لشركة Exodus Travel مبني على لوحة المغادرة في المطار، يدعو المتابعين لمتابعة مواعيد رحلات القاهرة.',
    },
    format: { en: 'Social media post · 1:1', ar: 'بوست لمنصات التواصل · 1:1' },
    media: { kind: 'images', images: [
      { src: '/work/exodus-1.webp', w: 1000, h: 1000, alt: { en: 'Exodus Travel post: an airport departures board with dashed flight paths, headline “Stay updated on Cairo flights”', ar: 'بوست Exodus Travel: لوحة مغادرة في المطار مع مسارات طيران منقّطة، وعنوان «Stay Updated On Cairo Flights»' } },
    ] },
  },
  {
    slug: 'niimee-posts',
    client: 'niimee',
    sector: { en: 'Fashion', ar: 'أزياء' },
    title: { en: 'Fashion for every size', ar: 'أزياء لكل المقاسات' },
    summary: {
      en: 'Social posts for niimee’s online fashion store, set in Saudi courtyards and seafronts: the app and its product cards, the full range of sizes, and modest everyday looks.',
      ar: 'بوستات سوشيال لمتجر niimee للأزياء، في أفنية وواجهات بحرية سعودية: التطبيق وبطاقات منتجاته، ومجموعة المقاسات الكاملة، وإطلالات محتشمة للاستخدام اليومي.',
    },
    format: { en: 'Social media posts · 4:5', ar: 'بوستات لمنصات التواصل · 4:5' },
    media: { kind: 'images', images: [
      { src: '/work/niimee-post-1.webp', w: 800, h: 1000, alt: { en: 'niimee post: a woman in a teal pleated dress beside a large phone showing the niimee app, surrounded by floating product cards', ar: 'بوست niimee: سيدة بفستان أخضر مزرق بجانب هاتف كبير عليه تطبيق niimee، وحولها بطاقات منتجات' } },
      { src: '/work/niimee-post-2.webp', w: 800, h: 1000, alt: { en: 'niimee post: a woman in a heritage courtyard with a ring of size cards from M to 8XL around her', ar: 'بوست niimee: سيدة في فناء تراثي وحولها حلقة من بطاقات المقاسات من M إلى 8XL' } },
      { src: '/work/niimee-post-3.webp', w: 800, h: 1000, alt: { en: 'niimee post: a woman in a denim jacket and wide jeans beside three dress looks', ar: 'بوست niimee: سيدة بجاكيت وبنطلون جينز واسع بجانب ثلاث إطلالات بفساتين' } },
      { src: '/work/niimee-post-4.webp', w: 800, h: 1000, alt: { en: 'niimee post: three women in everyday outfits walking along a seafront promenade', ar: 'بوست niimee: ثلاث سيدات بإطلالات يومية على كورنيش بحري' } },
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
];
