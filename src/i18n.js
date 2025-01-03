import i18next from 'i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as en from './i18n/en.json';
import * as ru from './i18n/ru.json';
import * as ua from './i18n/ua.json';

const resources = {
  ua: {
    tr: ua,
  },
  ru: {
    tr: ru,
  },
  en: {
    tr: en,
  },
};
const userLanguage = 'ua' || navigator.language || navigator.userLanguage;
i18next.init({
  lng: userLanguage.split('-')[0],
  fallbackLng: ['ru', 'en', 'ua'],
});

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: userLanguage.split('-')[0],
    fallbackLng: ['ru', 'en', 'ua'],
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
