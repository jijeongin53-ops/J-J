'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useI18n } from '@/lib/i18n';
import { LanguageSelector } from './LanguageSelector';
import { Sparkles, BarChart3, Leaf, Home } from 'lucide-react';

export function Header() {
  const { t } = useI18n();
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  return (
    <header className="sticky top-0 z-40 w-full bg-sand-50/90 backdrop-blur-md border-b border-wellness-100/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Tagline */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-wellness-700 flex items-center justify-center text-gold-300 shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:bg-wellness-800">
              <Leaf className="w-5 h-5 transition-transform group-hover:rotate-12" />
            </div>
            <div>
              <span className="font-serif text-lg sm:text-xl font-bold tracking-widest text-wellness-900 block leading-tight">
                J&amp;J SOLUTIONS
              </span>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-wellness-600 font-medium hidden sm:block">
                {t.nav.tagline}
              </span>
            </div>
          </Link>

          {/* Right Navigation Controls */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Products / Home link */}
            <Link
              href="/"
              className={`hidden md:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                pathname === '/'
                  ? 'bg-wellness-100 text-wellness-900 font-semibold'
                  : 'text-wellness-700 hover:text-wellness-950 hover:bg-wellness-50'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>{t.nav.home}</span>
            </Link>

            {/* Admin Intelligence Hub button */}
            <Link
              href="/admin"
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 border ${
                isAdmin
                  ? 'bg-wellness-800 text-gold-300 border-wellness-900 shadow-sm'
                  : 'bg-white/90 text-wellness-800 border-wellness-200 hover:border-gold-400 hover:bg-gold-50/50 hover:text-wellness-950'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5 text-gold-500" />
              <span>{t.nav.admin}</span>
            </Link>

            {/* Language Switcher */}
            <LanguageSelector />
          </div>

        </div>
      </div>
    </header>
  );
}
