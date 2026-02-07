import { Locale } from '../commons/types/i18n';
import i18n from '../services/internationalization/i18n';

export const getTranslatedNumber = (number) => {
    const numberString = number.toString();

    if (i18n.locale !== Locale.english) {
        return numberString
            .split('')
            .map((digit) => (/\d/.test(digit) ? i18n.t(digit) : digit))
            .join('');
    } else {
        return numberString;
    }
};
