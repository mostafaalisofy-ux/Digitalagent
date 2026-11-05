// Work delivered BY SAYTAMM for its direct clients (Category A), owner-confirmed as published.
// Facts only: client, format, what the piece says. No objective, strategy or results are stated
// unless the owner supplies them. Separate from cases.ts (team track record).
import type { Lang } from '../config/site';
type T = Record<Lang, string>;
export type Media =
  | { kind: 'video'; src: string; poster: string; w: number; h: number }
  | { kind: 'images'; images: { src: string; w: number; h: number; alt: T }[] };
export interface StWork { slug: string; client: string; clientAr?: string; sector: T; title: T; summary: T; format: T; media: Media }

export const SAYTAMM_WORK: StWork[] = [
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
