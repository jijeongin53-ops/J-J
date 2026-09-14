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

  const productId = (params.productId as string) || 'jnj-serum-01';

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Back to Products Navigation */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-wellness-200 text-wellness-800 hover:bg-wellness-100 text-xs sm:text-sm font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.survey.backToProducts}</span>
        </Link>
      </div>

      {/* Selected Product Hero Summary Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-wellness-100 shadow-card flex flex-col md:flex-row items-center gap-6 sm:gap-8">
        <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden bg-sand-100 flex-shrink-0 shadow-inner">
          <Image
            src={product.imageUrl}
            alt={name}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-1 text-center md:text-left space-y-2">
          <div className="inline-block px-3 py-1 rounded-full bg-wellness-100 text-wellness-800 text-[11px] font-bold uppercase tracking-wider">
            {category}
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-wellness-950">
            {name}
          </h1>
          <p className="text-xs sm:text-sm text-wellness-700 max-w-2xl">
            {tagline}
          </p>
          
          <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-2">
            {benefits.slice(0, 3).map((benefit, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-sand-50 border border-wellness-200/60 text-wellness-900 text-xs font-medium"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-wellness-600" />
                {benefit}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Dynamic Survey Form Engine */}
      <div className="pt-4">
        <SurveyForm product={product} questions={questions} />
      </div>

    </div>
  );
}
