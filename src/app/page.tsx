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
  const [selectedProductId, setSelectedProductId] = useState<string>('all');
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

  const filteredProducts = products.filter((p) => {
    if (selectedProductId === 'all') return true;
    return p.id === selectedProductId;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 space-y-10 animate-fade-in">
      
      {/* Main Section */}
      <section id="products" className="space-y-6">
        
        <div className="text-center max-w-2xl mx-auto space-y-1.5 px-2">
          <div className="inline-flex items-center gap-1.5 text-gold-600 text-[11px] sm:text-xs font-bold uppercase tracking-widest">
            <Leaf className="w-3.5 h-3.5" />
            <span>Botanical Collections</span>
          </div>
          <h1 className="font-serif text-xl sm:text-3xl lg:text-4xl font-bold text-wellness-950 leading-snug">
            {t.products.sectionTitle}
          </h1>
          <p className="text-xs sm:text-sm text-wellness-600">
            {t.products.sectionSubtitle}
          </p>

          {products.length > 0 && (
            <div className="pt-3 flex items-center justify-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 max-w-full">
              <button
                onClick={() => setSelectedProductId('all')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedProductId === 'all'
                    ? 'bg-wellness-800 text-gold-200 shadow-sm'
                    : 'bg-white border border-wellness-200 text-wellness-700 hover:bg-wellness-50'
                }`}
              >
                {t.products.filterAll}
              </button>
              {products.map((product) => (
                <button
                  key={product.id}
                  onClick={() => setSelectedProductId(product.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedProductId === product.id
                      ? 'bg-wellness-800 text-gold-200 shadow-sm'
                      : 'bg-white border border-wellness-200 text-wellness-700 hover:bg-wellness-50'
                  }`}
                >
                  {getLocalizedText(product.name)}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-80 rounded-3xl bg-wellness-100 animate-pulse" />
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="p-10 text-center bg-white rounded-3xl border border-wellness-100 max-w-lg mx-auto space-y-4 shadow-card">
            <div className="w-12 h-12 rounded-2xl bg-wellness-50 text-wellness-700 flex items-center justify-center mx-auto">
              <Leaf className="w-6 h-6 text-wellness-600" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-wellness-950">등록된 웰니스 상품이 없습니다</h3>
              <p className="text-xs text-wellness-600 mt-1">
                관리자 페이지 또는 연동된 구글 시트에서 신규 상품을 등록해 주세요.
              </p>
            </div>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-wellness-800 hover:bg-wellness-900 text-gold-200 text-xs font-semibold shadow-md transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>새 상품 등록</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </section>

      {/* Brand Assurance Section */}
      <section className="pt-4">
        <div className="rounded-3xl bg-sand-100/70 border border-wellness-200/60 p-6 sm:p-10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="space-y-1.5">
            <div className="w-9 h-9 rounded-full bg-wellness-800 text-gold-300 flex items-center justify-center mx-auto mb-2">
              <Leaf className="w-4 h-4" />
            </div>
            <h4 className="font-serif font-bold text-sm text-wellness-950">
              Clean &amp; Pure Formulas
            </h4>
            <p className="text-xs text-wellness-600 leading-relaxed">
              Ethically sourced botanicals, non-toxic, and holistic care.
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="w-9 h-9 rounded-full bg-wellness-800 text-gold-300 flex items-center justify-center mx-auto mb-2">
              <Globe2 className="w-4 h-4" />
            </div>
            <h4 className="font-serif font-bold text-sm text-wellness-950">
              Global Multi-Language Care
            </h4>
            <p className="text-xs text-wellness-600 leading-relaxed">
              Serving guests across English, Japanese, Chinese, and Korean.
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="w-9 h-9 rounded-full bg-wellness-800 text-gold-300 flex items-center justify-center mx-auto mb-2">
              <Award className="w-4 h-4" />
            </div>
            <h4 className="font-serif font-bold text-sm text-wellness-950">
              Customer-Driven Evolution
            </h4>
            <p className="text-xs text-wellness-600 leading-relaxed">
              Your valuable feedback fuels our continuous program upgrades.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
