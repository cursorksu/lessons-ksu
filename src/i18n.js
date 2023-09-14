import i18next from "i18next";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as en from "./i18n/en.json";
import * as ru from "./i18n/ru.json";
import * as ua from "./i18n/ua.json";

const resources = {
  ua: {
    translation: ua,
  },
  ru: {
    translation: ru,
  },
  en: {
    translation: en,
  },
};

i18next.init({
  lng: "ua",
  fallbackLng: ["ru", "en", "ua"],
});

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "ua",
    fallbackLng: ["ru", "en", "ua"],
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
