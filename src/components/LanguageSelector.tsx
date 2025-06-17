// src/components/LanguageSelector.tsx
import { useStore } from "@nanostores/preact";
import { useState } from "preact/hooks";
import type { SupportedLanguages } from "../stores/languageStore";
import { language } from "../stores/languageStore";

// 아이콘을 파일 내에 상수로 정의 (lucide-react 의존성 없음)
const GlobeIcon = ({ size = 20 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="2" stroke-linecap="round"
    stroke-linejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </svg>
);

const CheckIcon = ({ size = 16 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="2" stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

// 국기 코드(flag) 속성이 제거된 언어 목록
const languages: { code: SupportedLanguages; name: string; }[] = [
  { code: "ko", name: "Korean" },
  { code: "en", name: "English" },
];

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const currentLang = useStore(language);

  const handleLanguageChange = (langCode: SupportedLanguages) => {
    language.set(langCode);
    setIsOpen(false);
  };

  return (
    <div class="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        class="flex items-center justify-center p-2 rounded-md
        hover:bg-gray-200"
        aria-label="언어 선택"
      >
        <GlobeIcon size={20} />
      </button>

      {isOpen && (
        <div
          class="absolute right-0 mt-2 w-36 bg-white
          rounded-md shadow-lg py-1 z-10"
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              class="w-full text-left px-4 py-2 text-sm text-gray-700
              hover:bg-gray-100 flex items-center justify-between"
            >
              {/* 국기 아이콘 없이 텍스트만 표시 */}
              <span>{lang.name}</span>
              {currentLang === lang.code && <CheckIcon size={16} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}