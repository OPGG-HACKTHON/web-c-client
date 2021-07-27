import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import ko from './ko.json';
import en from './en.json';
import ja from './ja.json';

const resources = {
  ko: {
    translation: ko,
  },
  en: {
    translation: en,
  },
  ja: {
    translation: ja,
  },
};

i18n
  .use(initReactI18next)
  .init({
    // IE11 지원 문제로 es6 사용 X
    // eslint-disable-next-line object-shorthand
    resources: resources,
    lng: 'ko',
    fallbackLng: ['ko', 'en', 'ja'],

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
