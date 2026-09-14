'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useI18n } from '@/lib/i18n';
import { LanguageSelector } from './LanguageSelector';
import { BarChart3, Leaf, Home } from 'lucide-react';

export function Header() {
  const { t } = useI18n();
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  return (
    <header className="sticky top-0 z-40 w-full bg-sand-50/95 backdrop-blur-md border-b border-wellness-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2">
          
          {/* Brand Logo & Title */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group flex-shrink-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-wellness-800 flex items-center justify-center text-gold-300 shadow-sm flex-shrink-0">
              <Leaf className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:rotate-12" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-sm sm:text-lg font-bold tracking-wider text-wellness-950 leading-tight whitespace-nowrap">
                J&amp;J SOLUTIONS
              </span>
              <span className="text-[9px] sm:text-[11px] uppercase tracking-wider text-wellness-600 font-medium hidden md:block">
                {t.nav.tagline}
              </span>
            </div>
          </Link>

          {/* Right Navigation Controls (모바일 한 줄 최적화) */}
          <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
            {/* Products link (데스크톱 전용) */}
            <Link
              href="/"
              className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                pathname === '/'
                  ? 'bg-wellness-100 text-wellness-900 font-semibold'
                  : 'text-wellness-700 hover:text-wellness-950 hover:bg-wellness-50'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>{t.nav.home}</span>
            </Link>

            {/* Admin Hub button (모바일 텍스트 축약 & 줄바꿈 방지) */}
            <Link
              href="/admin"
              className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold transition-all border whitespace-nowrap flex-shrink-0 ${
                isAdmin
                  ? 'bg-wellness-800 text-gold-200 border-wellness-900 shadow-sm'
                  : 'bg-white text-wellness-900 border-wellness-200 hover:bg-wellness-50'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5 text-gold-600 flex-shrink-0" />
              <span className="hidden sm:inline">{t.nav.admin}</span>
              <span className="sm:hidden">관리자</span>
            </Link>

            {/* Language Switcher */}
            <div className="flex-shrink-0">
              <LanguageSelector />
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
