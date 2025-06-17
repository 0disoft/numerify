// src/components/LanguageSelector.tsx
import { useStore } from "@nanostores/preact";
import { Check, Globe } from "lucide-react";
import { useState } from "preact/hooks";
import ReactCountryFlag from "react-country-flag";
import type { SupportedLanguages } from "../stores/languageStore";
import { language } from "../stores/languageStore";

// 드롭다운에 표시할 언어 목록
const languages: { code: SupportedLanguages; name: string; flag: string; }[] = [
  { code: "ko", name: "한국어", flag: "KR" },
  { code: "en", name: "English", flag: "US" },
  // 여기에 다른 언어들을 추가할 수 있습니다.
  // { code: 'jp', name: '日本語', flag: 'JP' },
  // { code: 'cn', name: '中文', flag: 'CN' },
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
        <Globe size={20} />
      </button>

      {isOpen && (
        <div
          class="absolute right-0 mt-2 w-48 bg-white
          rounded-md shadow-lg py-1 z-10"
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              class="w-full text-left px-4 py-2 text-sm text-gray-700
              hover:bg-gray-100 flex items-center justify-between"
            >
              <div class="flex items-center gap-2">
                <ReactCountryFlag countryCode={lang.flag} svg />
                <span>{lang.name}</span>
              </div>
              {currentLang === lang.code && <Check size={16} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}