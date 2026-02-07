import { I18n } from 'i18n-js';
import { getLocales } from 'expo-localization';

import sa from './translations/sa.json';
import en from './translations/en.json';
import hi from './translations/hi.json';
import mr from './translations/mr.json';
import pa from './translations/pa.json';

const SUPPORTED_LOCALES = ['en', 'hi', 'mr', 'pa', 'sa'];

const deviceLanguage = getLocales()[0]?.languageCode ?? 'en';
export const detectedLocale = SUPPORTED_LOCALES.includes(deviceLanguage)
    ? deviceLanguage
    : 'en';

const i18n = new I18n({
    sa,
    en,
    hi,
    mr,
    pa,
});

i18n.locale = detectedLocale;

export default i18n;
