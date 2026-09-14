'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { WellnessProduct } from '@/lib/types';
import { useI18n } from '@/lib/i18n';
import { Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

interface ProductCardProps {
  product: WellnessProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const { language, t, getLocalizedText } = useI18n();

  const name = getLocalizedText(product.name);
  const category = getLocalizedText(product.category);
  const tagline = getLocalizedText(product.tagline);
  const badge = product.badge ? getLocalizedText(product.badge) : undefined;
  const benefits = product.keyBenefits[language] || product.keyBenefits.en || [];
  const ingredients = product.ingredients ? getLocalizedText(product.ingredients) : undefined;

  return (
    <div className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-wellness-100 shadow-luxury hover:shadow-luxury-hover transition-all duration-300 hover:-translate-y-1">
      {/* Product Image Container */}
      <div className="relative w-full h-64 sm:h-72 overflow-hidden bg-sand-100">
        <Image
          src={product.imageUrl}
          alt={name}
          fill
          className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

        {/* Badge */}
        {badge && (
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-wellness-800/90 backdrop-blur-md text-gold-200 text-xs font-semibold tracking-wide border border-gold-400/30 shadow-sm">
              <Sparkles className="w-3 h-3 text-gold-300" />
              {badge}
            </span>
          </div>
        )}

        {/* Category Tag */}
        <div className="absolute bottom-4 left-4">
          <span className="inline-block px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-wellness-900 text-xs font-medium tracking-wide">
            {category}
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-col flex-1 p-6 sm:p-7 justify-between">
        <div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-wellness-950 group-hover:text-wellness-800 transition-colors leading-snug">
            {name}
          </h3>
          <p className="mt-2.5 text-xs sm:text-sm text-wellness-700 leading-relaxed line-clamp-2">
            {tagline}
          </p>

          {/* Key Benefits */}
          {benefits.length > 0 && (
            <div className="mt-5 space-y-2 pt-4 border-t border-wellness-100">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-wellness-500 block">
                {t.products.viewDetails}
              </span>
              <ul className="space-y-1.5">
                {benefits.slice(0, 3).map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-wellness-900">
                    <CheckCircle2 className="w-4 h-4 text-wellness-600 flex-shrink-0 mt-0.5" />
                    <span className="leading-snug">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Key Ingredients */}
          {ingredients && (
            <div className="mt-4 pt-3 border-t border-wellness-100/60">
              <span className="text-[10px] uppercase tracking-wider font-medium text-wellness-400 block">
                {t.products.ingredients}
              </span>
              <p className="text-xs text-wellness-600 mt-0.5 line-clamp-1 italic">
                {ingredients}
              </p>
            </div>
          )}
        </div>

        {/* CTA Button */}
        <div className="mt-7 pt-4">
          <Link
            href={`/survey/${product.id}`}
            className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-wellness-800 hover:bg-wellness-900 text-gold-100 text-sm font-semibold tracking-wide shadow-md transition-all duration-200 group-hover:shadow-lg active:scale-[0.98]"
          >
            <span>{t.products.startSurvey}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
