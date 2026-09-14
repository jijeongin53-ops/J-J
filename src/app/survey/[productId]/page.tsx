'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useI18n } from '@/lib/i18n';
import { GoogleSheetsService, MOCK_PRODUCTS } from '@/lib/sheets';
import { WellnessProduct, SurveyQuestion } from '@/lib/types';
import { SurveyForm } from '@/components/SurveyForm';
import { ArrowLeft, Sparkles, Leaf, CheckCircle2 } from 'lucide-react';

export default function ProductSurveyPage() {
  const params = useParams();
  const router = useRouter();
  const { language, t, getLocalizedText } = useI18n();

  const productId = (params.productId as string) || 'ondo-eco-resonance-01';

  const [product, setProduct] = useState<WellnessProduct | null>(null);
  const [questions, setQuestions] = useState<SurveyQuestion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const allProducts = await GoogleSheetsService.fetchProducts();
      const targetProduct = allProducts.find((p) => p.id === productId) || allProducts[0] || MOCK_PRODUCTS[0];
      setProduct(targetProduct);

      const qList = await GoogleSheetsService.fetchQuestions(targetProduct.id);
      setQuestions(qList);
      setLoading(false);
    }
    loadData();
  }, [productId]);

  if (loading || !product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-3 border-wellness-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-medium text-wellness-700">{t.common.loading}</p>
      </div>
    );
  }

  const name = getLocalizedText(product.name);
  const category = getLocalizedText(product.category);
  const tagline = getLocalizedText(product.tagline);
  const benefits = product.keyBenefits[language] || product.keyBenefits.en || [];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-10 space-y-6">
      
      {/* Back to Products Navigation */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-wellness-200 text-wellness-900 hover:bg-wellness-100 text-xs font-semibold transition-colors shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{t.survey.backToProducts}</span>
        </Link>
      </div>

      {/* Selected Product Hero Summary Banner (모바일 반응형) */}
      <div className="bg-white rounded-3xl p-5 sm:p-8 border border-wellness-100 shadow-card flex flex-col sm:flex-row items-center gap-5 sm:gap-8">
        <div className="relative w-full h-44 sm:w-40 sm:h-40 rounded-2xl overflow-hidden bg-sand-100 flex-shrink-0 shadow-inner">
          <Image
            src={product.imageUrl}
            alt={name}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-1 text-center sm:text-left space-y-2">
          <div className="inline-block px-3 py-1 rounded-full bg-wellness-100 text-wellness-800 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
            {category}
          </div>
          <h1 className="font-serif text-lg sm:text-2xl lg:text-3xl font-bold text-wellness-950 leading-snug">
            {name}
          </h1>
          <p className="text-xs sm:text-sm text-wellness-700 max-w-2xl">
            {tagline}
          </p>
          
          <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-1.5 sm:gap-2">
            {benefits.slice(0, 3).map((benefit, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-sand-50 border border-wellness-200/60 text-wellness-900 text-[11px] sm:text-xs font-medium"
              >
                <CheckCircle2 className="w-3 h-3 text-wellness-600 flex-shrink-0" />
                <span>{benefit}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Dynamic Survey Form Engine */}
      <div>
        <SurveyForm product={product} questions={questions} />
      </div>

    </div>
  );
}
