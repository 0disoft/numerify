// src/stores/languageStore.ts
import { atom } from 'nanostores';

// 지원할 언어 목록을 타입으로 정의하여 자동완성 및 타입 안정성을 확보합니다.
export type SupportedLanguages = 'ko' | 'en';

// 'language'라는 이름의 atom(가장 작은 단위의 store)을 생성합니다.
// 기본값으로 'ko'(한국어)를 설정합니다.
export const language = atom<SupportedLanguages>('ko');