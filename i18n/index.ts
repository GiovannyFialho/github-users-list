import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

// Buscando as nossas traduções da pasta locales (nome e local da pasta é você quem decide)
import translations from "./locales";

// Configuração i18next
const i18nConfig = {
  resources: translations, // resources são as nossas traduções
  defaultNS: "translations", // defaultNS é o namespace padrão, podemos usar 'translations'
  fallbackLng: "pt-BR", // fallbackLng é o idioma padrão caso o browser não consiga detectar sozinho
  interpolation: { escapeValue: false },
  detection: {
    order: ["cookie", "header", "navigator"],
    caches: ["cookie"]
  }
};

i18next
  .use(LanguageDetector) // Usa o detector de idioma do seu browser
  .use(initReactI18next) // Usa o pacote do i18n específico para React
  .init(i18nConfig); // Usa nossas configurações

export default i18next;
