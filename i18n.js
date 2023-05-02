import { getLocales } from "expo-localization";
import { I18n } from "i18n-js";

import en from "./translations/en.json";
import hi from "./translations/hi.json";

const i18n = new I18n({
  en,
  hi,
});
i18n.locale = 'hi'

export default i18n;
