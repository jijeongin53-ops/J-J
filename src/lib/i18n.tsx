'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { en } from '@/locales/en';
import { ja } from '@/locales/ja';
import { zh } from '@/locales/zh';
import { ko } from '@/locales/ko';
import { Language, LocalizedString } from './types';

const dictionaries = {
  en,
  ja,
  zh,
  ko,
};

export type Dictionary = typeof en;

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Dictionary;
  getLocalizedText: (localizedObj: LocalizedString | undefined, fallback?: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // 1. 브라우저 저장소 확인
    const saved = localStorage.getItem('jnj_wellness_lang') as Language;
    if (saved && (saved === 'en' || saved === 'ja' || saved === 'zh' || saved === 'ko')) {
      setLanguageState(saved);
    } else {
      // 2. 브라우저 기본 언어 감지
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('ja')) {
        setLanguageState('ja');
      } else if (browserLang.startsWith('zh')) {
        setLanguageState('zh');
      } else if (browserLang.startsWith('ko')) {
        setLanguageState('ko');
      } else {
        setLanguageState('en');
      }
    }
    setIsInitialized(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('jnj_wellness_lang', lang);
    }
  };

  const getLocalizedText = (localizedObj: LocalizedString | undefined, fallback: string = ''): string => {
    if (!localizedObj) return fallback;
    return localizedObj[language] || localizedObj.en || localizedObj.ko || fallback;
  };

  const t = dictionaries[language] || dictionaries.en;

  return (
    <I18nContext.Provider value={{ language, setLanguage, t, getLocalizedText }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within a LanguageProvider');
  }
  return context;
}
