import { I18n } from "i18n-js";

import en from "./translations/en.json";
import hi from "./translations/hi.json";
import mr from "./translations/mr.json";
import pa from "./translations/pa.json";

const i18n = new I18n({
  en,
  hi,
  mr,
  pa
});

i18n.locale = 'hi'

export default i18n;
