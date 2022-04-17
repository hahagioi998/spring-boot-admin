import {merge} from 'lodash-es';
import {createI18n} from 'vue-i18n';

const context = import.meta.globEager("../**/i18n.*.json");
const messages = Object.keys(context)
  .map(key => {
    const localeFromFile = /\.*i18n\.?([^/]*)\.json$/.exec(key);
    const messages = context[key].default;
    if (localeFromFile[1]) {
      return {
        [localeFromFile[1]]: messages
      }
    } else {
      return messages;
    }
  })
  .reduce((prev, cur) => merge(prev, cur), {});

export const AVAILABLE_LANGUAGES = Object.keys(messages);

let browserLanguage = navigator.language;
if (!browserLanguage.includes('zh')) {
  browserLanguage = browserLanguage.split('-')[0];
}

const i18n = createI18n({
  locale: AVAILABLE_LANGUAGES.includes(browserLanguage) ? browserLanguage : 'en',
  fallbackLocale: 'en',
  silentFallbackWarn: process.env.NODE_ENV === 'production',
  silentTranslationWarn: process.env.NODE_ENV === 'production',
  messages
});

export default i18n;
