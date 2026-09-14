'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useI18n } from '@/lib/i18n';
import { EnhancementEngine } from '@/lib/enhancementEngine';
import { MOCK_PRODUCTS } from '@/lib/sheets';
import { FeedbackSubmission, UserPersonalSolution, WellnessProduct } from '@/lib/types';
import { WellnessSolutionCard } from '@/components/WellnessSolutionCard';
import { Sparkles, HeartHandshake } from 'lucide-react';

function ResultContent() {
  const searchParams = useSearchParams();
  const { language, t } = useI18n();

  const [solution, setSolution] = useState<UserPersonalSolution | null>(null);
  const [product, setProduct] = useState<WellnessProduct | null>(null);

  useEffect(() => {
    // 세션 스토리지 또는 URL 파라미터에서 데이터 복원
    let targetProduct: WellnessProduct | null = null;
    let submission: Partial<FeedbackSubmission> = {};

    try {
      const savedProd = sessionStorage.getItem('jnj_latest_product');
      if (savedProd) targetProduct = JSON.parse(savedProd);
      const savedSub = sessionStorage.getItem('jnj_latest_submission');
      if (savedSub) submission = JSON.parse(savedSub);
    } catch (e) {}

    if (!targetProduct) {
      const prodId = searchParams.get('productId');
      targetProduct = MOCK_PRODUCTS.find((p) => p.id === prodId) || MOCK_PRODUCTS[0];
    }

    setProduct(targetProduct);
    const generated = EnhancementEngine.generateUserSolution(targetProduct, submission, language);
    setSolution(generated);
  }, [searchParams, language]);

  if (!solution || !product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-3 border-wellness-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-medium text-wellness-700">{t.common.loading}</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Thank You Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3 animate-fade-in">
        <div className="w-16 h-16 rounded-3xl bg-wellness-100 text-wellness-800 flex items-center justify-center mx-auto shadow-inner">
          <HeartHandshake className="w-8 h-8 text-wellness-700" />
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-wellness-950">
          {t.result.thankYouTitle}
        </h1>
        <p className="text-xs sm:text-sm text-wellness-600">
          {t.result.thankYouSubtitle}
        </p>
      </div>

      {/* Personalized Solution Card */}
      <WellnessSolutionCard solution={solution} />

    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
          <div className="w-10 h-10 border-3 border-wellness-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-medium text-wellness-700">Loading your wellness solution...</p>
        </div>
      }
    >
      <ResultContent />
    </Suspense>
  );
}
