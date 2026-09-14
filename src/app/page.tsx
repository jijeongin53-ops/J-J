'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n';
import { GoogleSheetsService } from '@/lib/sheets';
import { WellnessProduct } from '@/lib/types';
import { ProductCard } from '@/components/ProductCard';
import { Leaf, Award, Globe2, Plus, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const { t, getLocalizedText } = useI18n();
  const [products, setProducts] = useState<WellnessProduct[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      const data = await GoogleSheetsService.fetchProducts();
      setProducts(data);
      setLoading(false);
    }
    loadProducts();
  }, []);

  // 카테고리 필터링
  const filteredProducts = products.filter((p) => {
    if (selectedCategory === 'all') return true;
    const cat = (p.category.en || '').toLowerCase();
    if (selectedCategory === 'skincare') return cat.includes('skin');
    if (selectedCategory === 'aroma') return cat.includes('aroma');
    if (selectedCategory === 'supplements') return cat.includes('inner') || cat.includes('tea');
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 animate-fade-in">
      
      {/* 1. Main Product Catalog & Evaluation Section (Hero 삭제 후 상단으로 배치) */}
      <section id="products" className="space-y-8">
        
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 text-gold-600 text-xs font-bold uppercase tracking-widest">
            <Leaf className="w-3.5 h-3.5" />
            <span>Botanical Collections</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-4xl font-bold text-wellness-950">
            {t.products.sectionTitle}
          </h1>
          <p className="text-xs sm:text-sm text-wellness-600">
            {t.products.sectionSubtitle}
          </p>

          {products.length > 0 && (
            <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-wellness-800 text-gold-200 shadow-sm'
                    : 'bg-white border border-wellness-200 text-wellness-700 hover:bg-wellness-50'
                }`}
              >
                {t.products.filterAll}
              </button>
              <button
                onClick={() => setSelectedCategory('skincare')}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === 'skincare'
                    ? 'bg-wellness-800 text-gold-200 shadow-sm'
                    : 'bg-white border border-wellness-200 text-wellness-700 hover:bg-wellness-50'
                }`}
              >
                {t.products.filterSkincare}
              </button>
              <button
                onClick={() => setSelectedCategory('aroma')}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === 'aroma'
                    ? 'bg-wellness-800 text-gold-200 shadow-sm'
                    : 'bg-white border border-wellness-200 text-wellness-700 hover:bg-wellness-50'
                }`}
              >
                {t.products.filterAroma}
              </button>
              <button
                onClick={() => setSelectedCategory('supplements')}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === 'supplements'
                    ? 'bg-wellness-800 text-gold-200 shadow-sm'
                    : 'bg-white border border-wellness-200 text-wellness-700 hover:bg-wellness-50'
                }`}
              >
                {t.products.filterSupplements}
              </button>
            </div>
          )}
        </div>

        {/* Product Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-96 rounded-3xl bg-wellness-100 animate-pulse" />
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="p-12 sm:p-16 text-center bg-white rounded-3xl border border-wellness-100 max-w-lg mx-auto space-y-5 shadow-card">
            <div className="w-16 h-16 rounded-3xl bg-wellness-50 text-wellness-700 flex items-center justify-center mx-auto">
              <Leaf className="w-8 h-8 text-wellness-600" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-wellness-950">등록된 웰니스 상품이 없습니다</h3>
              <p className="text-xs sm:text-sm text-wellness-600 mt-1">
                관리자 페이지 또는 연동된 구글 시트에서 신규 상품을 등록하시면 실시간으로 표시됩니다.
              </p>
            </div>
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-wellness-800 hover:bg-wellness-900 text-gold-200 text-xs sm:text-sm font-semibold shadow-md transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>새 상품 등록하러 가기</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </section>

      {/* 2. Brand Assurance Section */}
      <section className="pt-6">
        <div className="rounded-3xl bg-sand-100/70 border border-wellness-200/60 p-8 sm:p-12 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-full bg-wellness-800 text-gold-300 flex items-center justify-center mx-auto mb-3">
              <Leaf className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-base text-wellness-950">
              Clean &amp; Pure Formulas
            </h4>
            <p className="text-xs text-wellness-600 leading-relaxed">
              Ethically sourced wild botanicals, non-toxic, vegan, and cruelty-free.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-full bg-wellness-800 text-gold-300 flex items-center justify-center mx-auto mb-3">
              <Globe2 className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-base text-wellness-950">
              Global Multi-Language Care
            </h4>
            <p className="text-xs text-wellness-600 leading-relaxed">
              Serving wellness enthusiasts across English, Japanese, and Chinese worldwide.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-full bg-wellness-800 text-gold-300 flex items-center justify-center mx-auto mb-3">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-base text-wellness-950">
              Customer-Driven Evolution
            </h4>
            <p className="text-xs text-wellness-600 leading-relaxed">
              Every piece of feedback directly fuels our R&amp;D and bespoke care solutions.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
