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
    title: { en: 'Product web banner', ar: 'بانر منتج للمتجر الإلكتروني' },
    summary: {
      en: 'A product banner for Tech Hive’s online store: one product, one clear benefit — zero ambient noise, pixel-perfect audio clarity — and the offer and payment options in plain view.',
      ar: 'بانر منتج لمتجر خلية التكنولوجيا الإلكتروني: منتج واحد، وميزة واحدة واضحة — صفر ضوضاء محيطة ووضوح صوت دقيق — والعرض وخيارات الدفع ظاهرة للعميل.',
    },
    format: { en: 'Web banner · 1600 × 759', ar: 'بانر للموقع · 1600 × 759' },
    media: { kind: 'images', images: [{ src: '/work/techhive-banner.webp', w: 1600, h: 759, alt: { en: 'Tech Hive web banner: a gaming microphone on a desk with the line “Zero ambient noise, pixel-perfect audio clarity” and a 20% exclusive offer', ar: 'بانر خلية التكنولوجيا: ميكروفون ألعاب على مكتب مع عبارة «صفر ضوضاء محيطة، ووضوح صوت دقيق» وعرض حصري 20%' } }] },
  },
];
