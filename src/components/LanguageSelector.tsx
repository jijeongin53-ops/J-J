'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useI18n } from '@/lib/i18n';
import { Language } from '@/lib/types';
import { ChevronDown, Check } from 'lucide-react';

interface LangOption {
  code: Language;
  shortLabel: string;
  nativeLabel: string;
  flag: string;
}

const LANGUAGES: LangOption[] = [
  { code: 'en', shortLabel: 'EN', nativeLabel: 'English', flag: '🇺🇸' },
  { code: 'ja', shortLabel: 'JA', nativeLabel: '日本語', flag: '🇯🇵' },
  { code: 'zh', shortLabel: 'ZH', nativeLabel: '简体中文', flag: '🇨🇳' },
  { code: 'ko', shortLabel: 'KO', nativeLabel: '한국어', flag: '🇰🇷' },
];

export function LanguageSelector() {
  const { language, setLanguage } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full border border-wellness-200 bg-white text-wellness-900 text-xs font-semibold shadow-sm transition-all whitespace-nowrap ${
          isOpen ? 'ring-2 ring-wellness-500/20 border-wellness-400' : 'hover:bg-wellness-50'
        }`}
        aria-expanded={isOpen}
      >
        <span className="text-sm leading-none">{currentLang.flag}</span>
        <span className="hidden sm:inline text-xs">{currentLang.nativeLabel}</span>
        <span className="sm:hidden text-[11px] font-bold">{currentLang.shortLabel}</span>
        <ChevronDown className={`w-3 h-3 text-wellness-600 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 sm:w-48 rounded-2xl bg-white shadow-2xl border border-wellness-100 py-1.5 z-50 animate-slide-up">
          <div className="px-3 py-1.5 border-b border-wellness-100 text-[10px] uppercase tracking-wider font-semibold text-wellness-500">
            Language
          </div>
          {LANGUAGES.map((lang) => {
            const isSelected = language === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors ${
                  isSelected
                    ? 'bg-wellness-50 text-wellness-950 font-bold'
                    : 'text-neutral-700 hover:bg-wellness-50/50 hover:text-wellness-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-base leading-none">{lang.flag}</span>
                  <span>{lang.nativeLabel}</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-wellness-700" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
