import i18n, { TFunction } from 'i18next';
import { initReactI18next } from 'react-i18next';

import * as localeFiles from './locales';

export const setupi18n = (languages: string[], langSelected: string | undefined): Promise<TFunction> => {
  const resources = languages.reduce(
    (acc, lang) => ({
      ...acc,
      [lang]: {
        translation: localeFiles[lang],
      },
    }),
    {}
  );
  return i18n.use(initReactI18next).init({
    resources,
    lng: langSelected ?? languages[0],
    fallbackLng: langSelected ?? languages[0],
    interpolation: {
      escapeValue: false,
    },
    /**
     * Compatibility v3 for use plurals (https://www.i18next.com/misc/json-format#i18next-json-v3)
     * react-i18next is for browser, plugin need to be polyfill for use plural OR use compatibilityJSON: 'v3',
     * see https://www.i18next.com/translation-function/plurals
     */
    compatibilityJSON: 'v4',
  });
};

export default i18n;
