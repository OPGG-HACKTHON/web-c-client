import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import ko from './ko.json';
import en from './en.json';

const resources = {
  'ko-KR': {
    translation: ko,
  },
  'en-US': {
    translation: en,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // IE11 지원 문제로 es6 사용 X
    // eslint-disable-next-line object-shorthand
    resources: resources,
    fallbackLng: 'ko-KR',

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
