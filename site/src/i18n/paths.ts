import { LOCALES, type Lang } from '../config/site';

export type PageKey = 'home' | 'about' | 'services' | 'work' | 'contact';
const SLUG: Record<PageKey, string> = { home: '', about: 'about/', services: 'services/', work: 'work/', contact: 'contact/' };

/** Locale-prefixed path, e.g. href('ar','work') → "/ar/work/" ; hash optional. */
export const href = (lang: Lang, page: PageKey = 'home', hash = '') => `/${lang}/${SLUG[page]}${hash ? `#${hash}` : ''}`;
export const other = (lang: Lang): Lang => (lang === 'en' ? 'ar' : 'en');
export const staticLangPaths = () => LOCALES.map((lang) => ({ params: { lang } }));
export const isLang = (v: string | undefined): v is Lang => !!v && (LOCALES as readonly string[]).includes(v);
