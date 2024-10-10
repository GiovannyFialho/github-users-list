import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import translations from "@/app/i18n/locales";

export const i18nConfig = {
  resources: translations,
  defaultNS: "translations",
  fallbackLng: "pt-BR",
  interpolation: { escapeValue: false },
  detection: {
    order: ["cookie", "header", "navigator"],
    caches: ["cookie"]
  }
};

i18next.use(LanguageDetector).use(initReactI18next).init(i18nConfig);

export default i18next;
