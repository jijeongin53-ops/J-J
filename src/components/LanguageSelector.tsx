'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useI18n } from '@/lib/i18n';
import { Language } from '@/lib/types';
import { Globe, ChevronDown, Check } from 'lucide-react';

interface LangOption {
  code: Language;
  label: string;
  nativeLabel: string;
  flag: string;
}

const LANGUAGES: LangOption[] = [
  { code: 'en', label: 'English', nativeLabel: 'English', flag: '🇺🇸' },
  { code: 'ja', label: 'Japanese', nativeLabel: '日本語', flag: '🇯🇵' },
  { code: 'zh', label: 'Chinese', nativeLabel: '简体中文', flag: '🇨🇳' },
  { code: 'ko', label: 'Korean', nativeLabel: '한국어', flag: '🇰🇷' },
];

export function LanguageSelector({ variant = 'default' }: { variant?: 'default' | 'compact' }) {
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
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border border-wellness-200 bg-white/80 hover:bg-wellness-50 transition-all duration-200 text-wellness-900 text-xs md:text-sm font-medium shadow-sm backdrop-blur-sm ${
          isOpen ? 'ring-2 ring-wellness-500/20 border-wellness-400' : ''
        }`}
        aria-expanded={isOpen}
      >
        <span className="text-base leading-none">{currentLang.flag}</span>
        <span className="font-medium tracking-wide">{currentLang.nativeLabel}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-wellness-600 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-white shadow-luxury border border-wellness-100 py-1.5 z-50 animate-slide-up backdrop-blur-md">
          <div className="px-3 py-1.5 border-b border-wellness-100 text-[10px] uppercase tracking-wider font-semibold text-wellness-600">
            Select Language
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
                className={`w-full flex items-center justify-between px-3.5 py-2 text-xs md:text-sm text-left transition-colors duration-150 ${
                  isSelected
                    ? 'bg-wellness-50/80 text-wellness-900 font-semibold'
                    : 'text-neutral-700 hover:bg-wellness-50/50 hover:text-wellness-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base leading-none">{lang.flag}</span>
                  <span>{lang.nativeLabel}</span>
                  <span className="text-[11px] text-neutral-400">({lang.label})</span>
                </div>
                {isSelected && <Check className="w-4 h-4 text-wellness-700" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
