'use client';

import React from 'react';
import { useI18n } from '@/lib/i18n';

interface NpsScaleProps {
  value: number | undefined;
  onChange: (score: number) => void;
  readonly?: boolean;
}

export function NpsScale({ value, onChange, readonly = false }: NpsScaleProps) {
  const { t } = useI18n();

  return (
    <div className="w-full">
      <div className="grid grid-cols-11 gap-1 sm:gap-2">
        {Array.from({ length: 11 }).map((_, score) => {
          const isSelected = value === score;
          const isPromoter = score >= 9;
          const isPassive = score >= 7 && score <= 8;
          const isDetractor = score <= 6;

          return (
            <button
              key={score}
              type="button"
              disabled={readonly}
              onClick={() => !readonly && onChange(score)}
              className={`h-10 sm:h-12 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 border flex items-center justify-center ${
                isSelected
                  ? isPromoter
                    ? 'bg-wellness-700 text-white border-wellness-800 shadow-md scale-105'
                    : isPassive
                    ? 'bg-gold-500 text-white border-gold-600 shadow-md scale-105'
                    : 'bg-neutral-800 text-white border-neutral-900 shadow-md scale-105'
                  : 'bg-white/80 border-wellness-200 text-wellness-900 hover:border-wellness-400 hover:bg-wellness-50'
              }`}
            >
              {score}
            </button>
          );
        })}
      </div>

      <div className="flex justify-between items-center mt-2.5 text-[11px] sm:text-xs text-wellness-600 font-medium px-1">
        <span>{t.survey.npsLow}</span>
        <span>{t.survey.npsHigh}</span>
      </div>
    </div>
  );
}
