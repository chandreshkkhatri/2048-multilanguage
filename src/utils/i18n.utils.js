import { Locale } from "../commons/types/i18n";
import i18n from "../services/internationalization/i18n";

export const getTranslatedNumber = (number) => {
  const numberString = number.toString();

  if (i18n.locale != Locale.english) {
    var translatedNumber = numberString
      .split("")
      .map((digit) => {
        if (digit === "1") return "१";
        if (digit === "2") return "२";
        if (digit === "3") return "३";
        if (digit === "4") return "४";
        if (digit === "5") return "५";
        if (digit === "6") return "६";
        if (digit === "7") return "७";
        if (digit === "8") return "८";
        if (digit === "9") return "९";
        if (digit === "0") return "०";

        return digit;
      })
      .join("");

    return translatedNumber;
  } else {
    return numberString;
  }
};
