import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import translations from "@/app/i18n/locales";

const getLanguageFromCookie = () => {
  return "pt-BR";
};

const i18nConfig = {
  resources: translations,
  defaultNS: "translations",
  fallbackLng: getLanguageFromCookie(),
  interpolation: { escapeValue: false },
  lng: getLanguageFromCookie(),
  detection: {
    order: ["cookie", "header", "navigator"],
    caches: ["cookie"]
  }
};

i18next.use(LanguageDetector).use(initReactI18next).init(i18nConfig);

export default i18next;
