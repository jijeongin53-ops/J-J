'use client';

import React, { useState } from 'react';
import { UserPersonalSolution } from '@/lib/types';
import { useI18n } from '@/lib/i18n';
import { Sparkles, Clock, Compass, Gift, Check, Copy, HeartHandshake, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface WellnessSolutionCardProps {
  solution: UserPersonalSolution;
}

export function WellnessSolutionCard({ solution }: WellnessSolutionCardProps) {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);

  const handleCopyVoucher = () => {
    if (solution.specialCouponCode) {
      navigator.clipboard.writeText(solution.specialCouponCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-wellness-900 via-wellness-800 to-wellness-950 p-8 sm:p-10 text-white shadow-luxury">
        <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-gold-400/10 blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-gold-300 text-xs font-semibold tracking-wider uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.result.personaLabel}</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
            {solution.title}
          </h2>

          <p className="mt-3 text-sm sm:text-base text-wellness-200 leading-relaxed">
            {solution.subtitle}
          </p>

          <div className="mt-6 inline-block px-4 py-2 rounded-2xl bg-gold-500/20 border border-gold-400/30 text-gold-200 text-xs sm:text-sm font-medium">
            ✨ {solution.wellnessPersona}
          </div>
        </div>
      </div>

      {/* Routine Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-wellness-100 shadow-card">
        <div className="flex items-center gap-3 pb-6 border-b border-wellness-100">
          <div className="w-9 h-9 rounded-2xl bg-wellness-100 flex items-center justify-center text-wellness-800">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-wellness-950">
              {t.result.routineTitle}
            </h3>
            <p className="text-xs text-wellness-600">
              {t.result.solutionIntro}
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
          {solution.recommendedRoutine.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-sand-50/80 border border-wellness-100 hover:border-wellness-300 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-bold tracking-wider uppercase text-gold-600 block">
                  {item.time}
                </span>
                <h4 className="font-semibold text-wellness-900 text-sm sm:text-base mt-1.5 leading-snug">
                  {item.step}
                </h4>
                <p className="text-xs text-wellness-700 mt-2.5 leading-relaxed">
                  {item.tip}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-wellness-100/60 text-[10px] uppercase tracking-wider text-wellness-400 font-semibold">
                Step 0{idx + 1}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pairing Recommendations */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-wellness-100 shadow-card">
        <div className="flex items-center gap-3 pb-6 border-b border-wellness-100">
          <div className="w-9 h-9 rounded-2xl bg-gold-100 flex items-center justify-center text-gold-700">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-wellness-950">
              {t.result.pairingTitle}
            </h3>
            <p className="text-xs text-wellness-600">
              Synergistic product combinations crafted to enhance your daily recovery
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {solution.pairingRecommendations.map((pair, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-wellness-50/60 border border-wellness-100/80 flex items-start gap-4 hover:bg-wellness-50 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-wellness-200 text-wellness-800 font-serif font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                {idx + 1}
              </div>
              <div>
                <h4 className="font-bold text-sm sm:text-base text-wellness-900 leading-snug">
                  {pair.productName}
                </h4>
                <div className="mt-1 text-xs font-semibold text-wellness-700">
                  ✨ {pair.benefit}
                </div>
                <p className="mt-2 text-xs text-wellness-600 leading-relaxed">
                  {pair.reason}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gratitude Voucher Card */}
      {solution.specialCouponCode && (
        <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-gold-50 via-sand-50 to-gold-100/80 border border-gold-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gold-400/20 border border-gold-300/40 flex items-center justify-center text-gold-700 flex-shrink-0">
              <Gift className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-bold text-wellness-950">
                {t.result.voucherTitle}
              </h4>
              <p className="text-xs text-wellness-700 mt-1">
                {t.result.voucherDesc}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="px-4 py-2.5 rounded-xl bg-white border border-gold-300 text-wellness-950 font-mono font-bold text-sm tracking-wider shadow-inner text-center flex-1 sm:flex-none">
              {solution.specialCouponCode}
            </div>
            <button
              type="button"
              onClick={handleCopyVoucher}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-wellness-800 hover:bg-wellness-900 text-gold-200 text-xs sm:text-sm font-semibold transition-all shadow-sm active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Bottom Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <Link
          href="/"
          className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-wellness-800 hover:bg-wellness-900 text-white text-sm font-semibold shadow-md transition-all text-center"
        >
          {t.result.backHome}
        </Link>
      </div>

    </div>
  );
}
