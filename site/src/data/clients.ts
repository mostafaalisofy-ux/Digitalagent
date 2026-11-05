// "Brands we've worked with" — supplied by the owner (2026-11-04) as the team's PROFESSIONAL
// EXPERIENCE, not as SayTamm's direct clients. Names exactly as supplied. Never imply a contract,
// partnership or endorsement. Logos: only official files with permission to display (OQ-39);
// until a file is supplied, the brand name is set as text — no logo is redrawn or approximated.
import { SITE, type Lang } from '../config/site';
type T = Record<Lang, string>;
export interface Brand {
  name: string; sector: T; logo?: { src: string; w: number; h: number }; caseSlug?: string;
  /** 'pending' = display permission not yet confirmed: shown in staging (tagged), hidden in production. */
  permission?: 'pending';
}

const S = {
  fnb: { en: 'Food & beverage', ar: 'أغذية ومشروبات' },
  auto: { en: 'Automotive', ar: 'سيارات' },
  realEstate: { en: 'Real estate', ar: 'عقارات' },
  telecom: { en: 'Telecommunications', ar: 'اتصالات' },
  banking: { en: 'Banking', ar: 'بنوك' },
  aviation: { en: 'Aviation', ar: 'طيران' },
  hospitality: { en: 'Hospitality', ar: 'ضيافة' },
  government: { en: 'Government · Entertainment', ar: 'جهة حكومية · ترفيه' },
} satisfies Record<string, T>;

export const BRANDS: Brand[] = [
  { name: 'Buffalo Burger', sector: S.fnb },
  { name: 'Juhayna', sector: S.fnb },
  { name: 'Edita Foods', sector: S.fnb },
  { name: 'Costa Coffee', sector: S.fnb },
  { name: 'Toyota', sector: S.auto },
  { name: 'BYD', sector: S.auto },
  { name: 'DAMAC', sector: S.realEstate, caseSlug: 'damac-paramount' },
  { name: 'QNB', sector: S.banking, caseSlug: 'qnb-ramadan' },
  { name: 'Air Arabia', sector: S.aviation },
  { name: 'Radisson Blu', sector: S.hospitality },
  { name: 'Saudi GEA', sector: S.government, permission: 'pending' }, // government entity: display permission outstanding (OQ-39)
];

/** Brands that may be displayed in this build. */
export const visibleBrands = () => BRANDS.filter((b) => SITE.preview || b.permission !== 'pending');

// ---------------------------------------------------------------------------------------------
// SayTamm's DIRECT clients (owner confirmation 2026-11-05). Kept separate from BRANDS above, which
// is team experience. Logos are the official files supplied by the owner, shown in their own colours
// on a light tile — never recoloured or redrawn. Sector only where it is known (not guessed).
type Logo = { src: string; w: number; h: number };
/** `logoAr` = the client's official Arabic lockup, used on Arabic pages when supplied. */
// tile: background behind a logo that was supplied on its own brand colour (never recoloured); fill: logo artwork covers the whole tile
export interface Client { name: T; sector?: T; logo?: Logo; logoAr?: Logo; tile?: string; fill?: boolean; caseSlug?: string }
export const CLIENTS: Client[] = [
  { name: { en: 'Xiaomi', ar: 'شاومي' }, sector: { en: 'Consumer electronics', ar: 'إلكترونيات استهلاكية' }, logo: { src: '/clients/xiaomi.svg', w: 512, h: 512 } },
  { name: { en: 'GIG', ar: 'جي آي جي' }, sector: { en: 'Insurance', ar: 'تأمين' }, logo: { src: '/clients/gig.webp', w: 354, h: 176 } },
  { name: { en: 'Marriott', ar: 'ماريوت' }, sector: { en: 'Hospitality', ar: 'ضيافة' }, logo: { src: '/clients/marriott.webp', w: 314, h: 256 } },
  { name: { en: 'TECSPRO', ar: 'التقنيات الاحترافية' }, sector: { en: 'Business technology', ar: 'حلول تقنية للأعمال' }, logo: { src: '/clients/tecspro.webp', w: 282, h: 254 } },
  { name: { en: 'SIEFCO', ar: 'سفكو' }, sector: { en: 'Concrete products', ar: 'منتجات خرسانية' }, logo: { src: '/clients/siefco.webp', w: 280, h: 186 } },
  { name: { en: 'Chery Saudi', ar: 'شيري السعودية' }, sector: { en: 'Automotive', ar: 'سيارات' }, logo: { src: '/clients/chery.svg', w: 500, h: 192 } },
  { name: { en: 'JORA', ar: 'JORA' }, sector: { en: 'Restaurants · Street food', ar: 'مطاعم · أكل شارع' } }, // logo file pending
  { name: { en: 'Al Bustan', ar: 'البستان' }, sector: { en: 'Food · Nuts', ar: 'أغذية · مكسرات' } }, // logo file pending
  { name: { en: 'niimee', ar: 'niimee' }, sector: { en: 'Fashion', ar: 'أزياء' }, logo: { src: '/clients/niimee.webp', w: 581, h: 149 } },
  { name: { en: 'K.S Furniture', ar: 'K.S للأثاث' }, sector: { en: 'Furniture · E-commerce', ar: 'أثاث · تجارة إلكترونية' }, logo: { src: '/clients/ks.webp', w: 525, h: 513 } },
  { name: { en: 'Fatora Plus', ar: 'فاتورة بلس' }, sector: { en: 'Invoicing software', ar: 'برامج الفوترة' }, logo: { src: '/clients/fatora.webp', w: 900, h: 264 }, tile: '#052249' },
  { name: { en: 'Siyaq', ar: 'سياق' }, sector: { en: 'Content platform', ar: 'منصة محتوى' }, logo: { src: '/clients/siyaq.webp', w: 900, h: 397 } },
  { name: { en: 'Exodus Travel', ar: 'Exodus Travel' }, sector: { en: 'Travel', ar: 'سفر وسياحة' } }, // logo file pending
  { name: { en: 'Beauty Lab', ar: 'بيوتي لاب' }, sector: { en: 'Natural cosmetics', ar: 'مستحضرات تجميل طبيعية' } }, // logo file pending
  { name: { en: 'Kheir Zaman', ar: 'خير زمان' }, sector: { en: 'Supermarkets', ar: 'سوبر ماركت' }, logo: { src: '/clients/kheir-zaman.webp', w: 192, h: 192 } },
  { name: { en: 'METRO', ar: 'مترو' }, sector: { en: 'Food products', ar: 'منتجات غذائية' }, logo: { src: '/clients/metro.webp', w: 512, h: 108 }, tile: '#021126' },
  { name: { en: 'Clean Basket', ar: 'كلين باسكت' }, sector: { en: 'Cleaning services', ar: 'خدمات تنظيف' },
    logo: { src: '/clients/cleanbasket-en.webp', w: 900, h: 387 }, logoAr: { src: '/clients/cleanbasket-ar.webp', w: 900, h: 454 } },
  { name: { en: 'Zahid Electra', ar: 'الزاهد إلكترا' }, sector: { en: 'Home appliances', ar: 'أجهزة منزلية' }, logo: { src: '/clients/zahid-electra.webp', w: 900, h: 277 } },
  { name: { en: 'MIX', ar: 'مكس' }, sector: { en: 'Events', ar: 'تنظيم فعاليات' }, logo: { src: '/clients/mix.webp', w: 320, h: 320 }, fill: true },
  { name: { en: 'Alqimma Equipment', ar: 'معدات القمة' }, sector: { en: 'Equipment', ar: 'معدات' }, logo: { src: '/clients/alqimma.webp', w: 619, h: 166 } },
  { name: { en: 'DC BLOCK', ar: 'دي سي بلوك' }, sector: { en: 'Building materials', ar: 'مواد البناء' } }, // logo file pending
  { name: { en: 'BITUMAT', ar: 'BITUMAT' }, sector: { en: 'Building materials', ar: 'مواد البناء' }, logo: { src: '/clients/bitumat.webp', w: 900, h: 349 } },
  { name: { en: 'ALTOPIANO', ar: 'التبيانو' }, sector: { en: 'Restaurants · Italian', ar: 'مطاعم · إيطالي' }, logo: { src: '/clients/altopiano.webp', w: 502, h: 60 }, tile: '#050504' },
  { name: { en: 'Arhab', ar: 'أرحب' }, sector: { en: 'Ride booking app', ar: 'تطبيق حجز رحلات' }, logo: { src: '/clients/arhab.svg', w: 858, h: 629 } },
  { name: { en: 'Tech Hive', ar: 'خلية التكنولوجيا' }, sector: { en: 'Electronics retail', ar: 'تجزئة إلكترونيات' },
    logo: { src: '/clients/techhive-en.webp', w: 478, h: 294 }, logoAr: { src: '/clients/techhive-ar.webp', w: 478, h: 280 } },
  { name: { en: 'Tech Craft', ar: 'التقانة العربية للمقاولات' }, sector: { en: 'Contracting', ar: 'مقاولات' }, logo: { src: '/clients/techcraft.svg', w: 552, h: 418 } },
];

/** More direct clients (owner, 2026-11-05: "add them all as SayTamm clients"), logos taken from the
 *  client pages of the Steps Selected Work deck — reverse (light) versions, shown on graphite tiles.
 *  Government bodies carry permission: 'pending' — staging only, hidden in production until each body's
 *  display permission is documented (same rule as Saudi GEA). */
export interface WallClient { name: T; logo: Logo; permission?: 'pending' }
export const CLIENT_WALL: WallClient[] = [
  { name: { en: 'Shawarmer', ar: 'شاورمر' }, logo: { src: '/clients/wall/shawarmer.webp', w: 192, h: 95 } },
  { name: { en: 'Jahez', ar: 'جاهز' }, logo: { src: '/clients/wall/jahez.webp', w: 147, h: 54 } },
  { name: { en: 'Sharar', ar: 'شرار' }, logo: { src: '/clients/wall/sharar.webp', w: 96, h: 123 } },
  { name: { en: 'Aljazirah Vehicles', ar: 'الجزيرة للسيارات' }, logo: { src: '/clients/wall/aljazirah-vehicles.webp', w: 101, h: 101 } },
  { name: { en: 'Ford', ar: 'فورد' }, logo: { src: '/clients/wall/ford.webp', w: 199, h: 101 } },
  { name: { en: 'National Geographic', ar: 'ناشيونال جيوغرافيك' }, logo: { src: '/clients/wall/national-geographic.webp', w: 239, h: 85 } },
  { name: { en: 'Quick Lane', ar: 'كويك لين' }, logo: { src: '/clients/wall/quick-lane.webp', w: 267, h: 62 } },
  { name: { en: 'VOV', ar: 'VOV' }, logo: { src: '/clients/wall/vov.webp', w: 163, h: 36 } },
  { name: { en: 'Azimut', ar: 'أزيموت' }, logo: { src: '/clients/wall/azimut.webp', w: 211, h: 110 } },
  { name: { en: 'Eucerin', ar: 'يوسرين' }, logo: { src: '/clients/wall/eucerin.webp', w: 143, h: 66 } },
  { name: { en: 'Indian Motorcycle', ar: 'إنديان موتورسايكل' }, logo: { src: '/clients/wall/indian-motorcycle.webp', w: 178, h: 71 } },
  { name: { en: 'Naqel Express', ar: 'ناقل إكسبرس' }, logo: { src: '/clients/wall/naqel.webp', w: 206, h: 80 } },
  { name: { en: 'Polaris', ar: 'بولاريس' }, logo: { src: '/clients/wall/polaris.webp', w: 213, h: 36 } },
  { name: { en: '57357 Hospital', ar: 'مستشفى 57357' }, logo: { src: '/clients/wall/57357.webp', w: 122, h: 161 } },
  { name: { en: 'Fiat', ar: 'فيات' }, logo: { src: '/clients/wall/fiat.webp', w: 131, h: 128 } },
  { name: { en: 'Lacalut', ar: 'لاكالوت' }, logo: { src: '/clients/wall/lacalut.webp', w: 227, h: 76 } },
  { name: { en: 'Shell', ar: 'شل' }, logo: { src: '/clients/wall/shell.webp', w: 130, h: 122 } },
  { name: { en: 'Fawry Financing', ar: 'فوري للتمويل' }, logo: { src: '/clients/wall/fawry.webp', w: 174, h: 84 } },
  { name: { en: 'Filorga', ar: 'فيلورجا' }, logo: { src: '/clients/wall/filorga.webp', w: 164, h: 63 } },
  { name: { en: 'Dar Al Arkan', ar: 'دار الأركان' }, logo: { src: '/clients/wall/dar-al-arkan.webp', w: 181, h: 119 } },
  { name: { en: 'Lincoln', ar: 'لينكولن' }, logo: { src: '/clients/wall/lincoln.webp', w: 239, h: 90 } },
  { name: { en: 'Saudi Falcons Club', ar: 'نادي الصقور السعودي' }, logo: { src: '/clients/wall/saudi-falcons-club.webp', w: 97, h: 86 }, permission: 'pending' },
  { name: { en: 'Five Little Monkeys', ar: 'فايف ليتل منكيز' }, logo: { src: '/clients/wall/five-little-monkeys.webp', w: 160, h: 54 } },
  { name: { en: 'LEAP', ar: 'ليب' }, logo: { src: '/clients/wall/leap.webp', w: 159, h: 55 } },
  { name: { en: 'Point6', ar: 'بوينت 6' }, logo: { src: '/clients/wall/point6.webp', w: 117, h: 103 } },
  { name: { en: 'Sahara', ar: 'صحارى' }, logo: { src: '/clients/wall/sahara.webp', w: 131, h: 46 } },
  { name: { en: 'Amreyah Cement', ar: 'أسمنت العامرية' }, logo: { src: '/clients/wall/amreyah-cement.webp', w: 120, h: 78 } },
  { name: { en: 'LuLu', ar: 'لولو' }, logo: { src: '/clients/wall/lulu.webp', w: 183, h: 61 } },
  { name: { en: 'Kuwait Police', ar: 'الشرطة الكويتية' }, logo: { src: '/clients/wall/kuwait-police.webp', w: 102, h: 119 }, permission: 'pending' },
  { name: { en: 'Ministry of Public Works', ar: 'وزارة الأشغال العامة' }, logo: { src: '/clients/wall/ministry-public-works.webp', w: 122, h: 90 }, permission: 'pending' },
  { name: { en: 'Mamnon', ar: 'ممنون' }, logo: { src: '/clients/wall/mamnon.webp', w: 65, h: 94 } },
  { name: { en: 'IPS', ar: 'IPS' }, logo: { src: '/clients/wall/ips.webp', w: 118, h: 47 } },
  { name: { en: 'Huawei', ar: 'هواوي' }, logo: { src: '/clients/wall/huawei.webp', w: 189, h: 55 } },
  { name: { en: 'The Kuwait Motor Show', ar: 'معرض الكويت للسيارات' }, logo: { src: '/clients/wall/kuwait-motor-show.webp', w: 77, h: 93 } },
  { name: { en: 'KNPC', ar: 'البترول الوطنية' }, logo: { src: '/clients/wall/knpc.webp', w: 67, h: 111 }, permission: 'pending' },
  { name: { en: 'Kuwait Oil Company', ar: 'شركة نفط الكويت' }, logo: { src: '/clients/wall/kuwait-oil-company.webp', w: 94, h: 111 }, permission: 'pending' },
  { name: { en: 'Ministry of Health', ar: 'وزارة الصحة' }, logo: { src: '/clients/wall/ministry-of-health.webp', w: 82, h: 106 }, permission: 'pending' },
  { name: { en: 'Kuwait Municipality', ar: 'بلدية الكويت' }, logo: { src: '/clients/wall/kuwait-municipality.webp', w: 102, h: 126 }, permission: 'pending' },
  { name: { en: 'Smart Touch Solutions', ar: 'Smart Touch Solutions' }, logo: { src: '/clients/wall/smart-touch-solutions.webp', w: 91, h: 99 } },
  { name: { en: 'AmiViz', ar: 'AmiViz' }, logo: { src: '/clients/wall/amiviz.webp', w: 128, h: 40 } },
  { name: { en: 'SAPTCO', ar: 'سابتكو' }, logo: { src: '/clients/wall/saptco.webp', w: 129, h: 45 } },
  { name: { en: 'Darb Al Omda', ar: 'درب العمدة' }, logo: { src: '/clients/wall/darb-al-omda.webp', w: 70, h: 93 } },
  { name: { en: 'Limak', ar: 'ليماك' }, logo: { src: '/clients/wall/limak.webp', w: 157, h: 58 } },
  { name: { en: 'Chicken Spot', ar: 'تشيكن سبوت' }, logo: { src: '/clients/wall/chicken-spot.webp', w: 79, h: 80 } },
  { name: { en: 'Talent Care Pharma', ar: 'تالنت كير فارما' }, logo: { src: '/clients/wall/talent-care.webp', w: 131, h: 39 } },
  { name: { en: 'OHI — Osim Higher Institute', ar: 'المعهد العالي للعلوم الإدارية بأوسيم' }, logo: { src: '/clients/wall/ohi.webp', w: 152, h: 77 }, permission: 'pending' },
  { name: { en: 'Al Majed Oud', ar: 'الماجد للعود' }, logo: { src: '/clients/wall/al-majed-oud.webp', w: 117, h: 38 } },
  { name: { en: 'AMEX Automotive', ar: 'أميكس' }, logo: { src: '/clients/wall/amex-auto.webp', w: 157, h: 128 } },
  { name: { en: 'Bin Al Basha', ar: 'بن الباشا' }, logo: { src: '/clients/wall/bin-al-basha.webp', w: 91, h: 124 } },
  { name: { en: 'Java Joy', ar: 'جافا جوي' }, logo: { src: '/clients/wall/java-joy.webp', w: 94, h: 106 } },
  { name: { en: 'HARKA', ar: 'هاركا' }, logo: { src: '/clients/wall/harka.webp', w: 99, h: 102 } },
  { name: { en: 'Cleopatra', ar: 'كليوباترا' }, logo: { src: '/clients/wall/cleopatra.webp', w: 82, h: 99 } },
  { name: { en: 'Brands Home', ar: 'براندز هوم' }, logo: { src: '/clients/wall/brands-home.webp', w: 91, h: 99 } },
  { name: { en: 'Abo El Kheir', ar: 'أبو الخير' }, logo: { src: '/clients/wall/abo-el-kheir.webp', w: 74, h: 101 } },
  { name: { en: 'Nintendo', ar: 'نينتندو' }, logo: { src: '/clients/wall/nintendo.webp', w: 130, h: 40 } },
  { name: { en: 'Alia', ar: 'عالية' }, logo: { src: '/clients/wall/alia.webp', w: 117, h: 55 } },
  { name: { en: 'Ministry of Education', ar: 'وزارة التعليم' }, logo: { src: '/clients/wall/ministry-of-education.webp', w: 121, h: 118 }, permission: 'pending' },
  { name: { en: 'Saffron Threads', ar: 'خيوط الزعفران' }, logo: { src: '/clients/wall/saffron-threads.webp', w: 99, h: 94 } },
  { name: { en: 'Riyadh Season', ar: 'موسم الرياض' }, logo: { src: '/clients/wall/riyadh-season.webp', w: 82, h: 93 }, permission: 'pending' },
  { name: { en: 'General Entertainment Authority', ar: 'الهيئة العامة للترفيه' }, logo: { src: '/clients/wall/gea.webp', w: 86, h: 94 }, permission: 'pending' },
  { name: { en: 'Sama Cuisine', ar: 'سما كوزين' }, logo: { src: '/clients/wall/sama-cuisine.webp', w: 176, h: 89 } },
  { name: { en: 'KSA Care', ar: 'السعودية للعناية' }, logo: { src: '/clients/wall/ksa-care.webp', w: 163, h: 60 } },
  { name: { en: 'OSUS', ar: 'أسس' }, logo: { src: '/clients/wall/osus.webp', w: 95, h: 77 } },
  { name: { en: 'stc', ar: 'stc' }, logo: { src: '/clients/wall/stc.webp', w: 94, h: 53 } },
  { name: { en: 'Cisco', ar: 'سيسكو' }, logo: { src: '/clients/wall/cisco.webp', w: 96, h: 56 } }
];
export const visibleWall = () => CLIENT_WALL.filter((c) => SITE.preview || c.permission !== 'pending');
