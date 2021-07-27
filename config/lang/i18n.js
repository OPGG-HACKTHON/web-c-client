import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import ko from './ko.json';
import en from './en.json';

const resources = {
  ko: {
    translation: ko,
  },
  en: {
    translation: en,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ko',
    fallbackLng: 'ko',

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
