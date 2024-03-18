import store from '@/store'
import { computed } from 'vue'
import { createI18n } from 'vue-i18n'

// name should be same as lang filename, and it is case sensitive.
// const langs: Array<string> = [
//   'en',
//   'zh_CN',
//   'zh_TW',
//   'cn_MY',
//   'id_ID',
//   'ja_JP',
//   'km_KH',
//   'ko_KR',
//   'th_TH',
//   'vi_VN',
//   'es_ES',
// ];

const defaultLang = computed(() => store.state.token)

const i18n = createI18n({
  fallbackLocale: defaultLang.value
})

// async function importLanguage(language: string) {
//   const json = await import(/* webpackChunkName: "i18n/[request]" */ `@/lang/${language}.json`);
//   i18n.global.setLocaleMessage(language, json);
// }

// async function setI18nLanguage(newLang = defaultLang.value) {
//   if (i18n.global.locale === newLang) {
//     return;
//   }

//   const hasThisLang = langs.find((lang) => lang === newLang);
//   if (!hasThisLang) {
//     i18n.global.locale = defaultLang.value;
//     return;
//   }

//   const hasImported = Object.prototype.hasOwnProperty.call(i18n.global.messages, newLang);
//   if (!hasImported) {
//     await importLanguage(newLang);
//   }
//   i18n.global.locale = newLang;
// }

// importLanguage(defaultLang.value).then(() => {
//   // const lang = cookieHelper.getCookie('klanguage');
//   setTimeout(() => {
//     // if (lang) {
//     //   setI18nLanguage(lang);
//     // } else {
//     setI18nLanguage();
//     // }
//   }, process.env.NODE_ENV === 'production' ? 0 : 3000);
// });

export default i18n
export const { t, te } = i18n.global
