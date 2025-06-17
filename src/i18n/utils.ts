// src/i18n/utils.ts
import { computed } from 'nanostores';
import { language } from '../stores/languageStore';
import en from './en.json';
import ko from './ko.json';

// 모든 번역 파일을 하나의 객체로 묶습니다.
export const translations = {
  ko,
  en,
};

// 키를 받아 번역된 문자열을 반환하는 computed store를 생성합니다.
export const t = computed(language, (lang) => {
  return (key: keyof typeof ko) => {
    return translations[lang][key] || translations['ko'][key];
  };
});