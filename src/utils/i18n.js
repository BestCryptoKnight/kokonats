import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from '../../assets/locales/en.json';
import ja from '../../assets/locales/ja.json';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: en,
    ja: ja,
  },
  interpolation: {
    escapeValue: false // react already safes from xss
  },
  react: {
    useSuspense:false,
  }
});

export default i18n;
