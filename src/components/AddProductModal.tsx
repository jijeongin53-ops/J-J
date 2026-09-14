'use client';

import React, { useState } from 'react';
import { WellnessProduct } from '@/lib/types';
import { GoogleSheetsService } from '@/lib/sheets';
import { X, Sparkles, Plus, Image as ImageIcon, CheckCircle2 } from 'lucide-react';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProductAdded: () => void;
}

const PRESET_IMAGES = [
  { label: 'Serum & Skincare', url: 'https://images.unsplash.com/photo-1608248597359-00994f27f055?auto=format&fit=crop&w=800&q=80' },
  { label: 'Aroma & Mist', url: 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=800&q=80' },
  { label: 'Wellness Herbal Tea', url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80' },
  { label: 'Body Oil & Bath', url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80' },
];

export function AddProductModal({ isOpen, onClose, onProductAdded }: AddProductModalProps) {
  if (!isOpen) return null;

  const [nameEn, setNameEn] = useState('');
  const [nameJa, setNameJa] = useState('');
  const [nameZh, setNameZh] = useState('');
  const [nameKo, setNameKo] = useState('');

  const [categoryEn, setCategoryEn] = useState('Skincare Ritual');
  const [taglineEn, setTaglineEn] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');
  const [imageUrl, setImageUrl] = useState(PRESET_IMAGES[0].url);
  const [badgeEn, setBadgeEn] = useState('New Release');
  const [benefitsInput, setBenefitsInput] = useState('');
  const [ingredientsEn, setIngredientsEn] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameEn.trim()) {
      setError('Product Name (English) is required.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const slug = nameEn.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const id = `jnj-prod-${Date.now().toString().slice(-6)}`;

    const benefitsArray = benefitsInput
      ? benefitsInput.split(',').map((b) => b.trim()).filter(Boolean)
      : ['Clean Botanical Efficacy', 'Eco-Luxury Holistic Care'];

    const newProduct: WellnessProduct = {
      id,
      slug: slug || `prod-${Date.now()}`,
      name: {
        en: nameEn,
        ja: nameJa || nameEn,
        zh: nameZh || nameEn,
        ko: nameKo || nameEn,
      },
      category: {
        en: categoryEn,
        ja: categoryEn,
        zh: categoryEn,
        ko: categoryEn,
      },
      tagline: {
        en: taglineEn || nameEn,
        ja: taglineEn || nameEn,
        zh: taglineEn || nameEn,
        ko: taglineEn || nameEn,
      },
      description: {
        en: descriptionEn || taglineEn || nameEn,
        ja: descriptionEn || taglineEn || nameEn,
        zh: descriptionEn || taglineEn || nameEn,
        ko: descriptionEn || taglineEn || nameEn,
      },
      imageUrl: imageUrl || PRESET_IMAGES[0].url,
      badge: badgeEn ? { en: badgeEn, ja: badgeEn, zh: badgeEn, ko: badgeEn } : undefined,
      keyBenefits: {
        en: benefitsArray,
        ja: benefitsArray,
        zh: benefitsArray,
        ko: benefitsArray,
      },
      ingredients: ingredientsEn ? { en: ingredientsEn, ja: ingredientsEn, zh: ingredientsEn, ko: ingredientsEn } : undefined,
    };

    try {
      await GoogleSheetsService.addProduct(newProduct);
      onProductAdded();
      onClose();
    } catch (err: any) {
      setError('Failed to save product: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-wellness-100 overflow-hidden flex flex-col animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-wellness-100 bg-sand-50/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-wellness-800 text-gold-300 flex items-center justify-center shadow-sm">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold tracking-widest text-gold-600">
                Product Management
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-wellness-950">
                Register New Wellness Product
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white border border-wellness-200 hover:bg-wellness-100 text-wellness-700 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 font-medium">
              ⚠️ {error}
            </div>
          )}

          {/* Product Names (Multilingual) */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-wellness-800 border-b border-wellness-100 pb-1">
              1. Product Name (Multilingual)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-wellness-900 block mb-1">
                  Product Name (English) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={nameEn}
                  onChange={(e) => setNameEn(e.target.value)}
                  placeholder="e.g. Celestial Glow Rose Serum"
                  className="w-full p-3 rounded-xl border border-wellness-200 text-xs text-wellness-900 focus:outline-none focus:border-wellness-700"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-wellness-900 block mb-1">
                  Product Name (Japanese - 日本語)
                </label>
                <input
                  type="text"
                  value={nameJa}
                  onChange={(e) => setNameJa(e.target.value)}
                  placeholder="e.g. セレスティアル ローズセラム"
                  className="w-full p-3 rounded-xl border border-wellness-200 text-xs text-wellness-900 focus:outline-none focus:border-wellness-700"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-wellness-900 block mb-1">
                  Product Name (Simplified Chinese - 简体中文)
                </label>
                <input
                  type="text"
                  value={nameZh}
                  onChange={(e) => setNameZh(e.target.value)}
                  placeholder="e.g. 极光玫瑰赋活精华露"
                  className="w-full p-3 rounded-xl border border-wellness-200 text-xs text-wellness-900 focus:outline-none focus:border-wellness-700"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-wellness-900 block mb-1">
                  Product Name (Korean - 한국어)
                </label>
                <input
                  type="text"
                  value={nameKo}
                  onChange={(e) => setNameKo(e.target.value)}
                  placeholder="e.g. 셀레스티얼 로즈 글로우 세럼"
                  className="w-full p-3 rounded-xl border border-wellness-200 text-xs text-wellness-900 focus:outline-none focus:border-wellness-700"
                />
              </div>
            </div>
          </div>

          {/* Category & Badge */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-wellness-900 block mb-1">
                Category
              </label>
              <select
                value={categoryEn}
                onChange={(e) => setCategoryEn(e.target.value)}
                className="w-full p-3 rounded-xl border border-wellness-200 text-xs text-wellness-900 bg-white focus:outline-none focus:border-wellness-700"
              >
                <option value="Skincare Ritual">Skincare Ritual</option>
                <option value="Aromatherapy">Aromatherapy</option>
                <option value="Inner Wellness">Inner Wellness</option>
                <option value="Body & Bath Care">Body &amp; Bath Care</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-wellness-900 block mb-1">
                Badge / Tag
              </label>
              <input
                type="text"
                value={badgeEn}
                onChange={(e) => setBadgeEn(e.target.value)}
                placeholder="e.g. Best Seller, New Release, VIP Pick"
                className="w-full p-3 rounded-xl border border-wellness-200 text-xs text-wellness-900 focus:outline-none focus:border-wellness-700"
              />
            </div>
          </div>

          {/* Tagline & Description */}
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-wellness-900 block mb-1">
                Tagline (Short Summary)
              </label>
              <input
                type="text"
                value={taglineEn}
                onChange={(e) => setTaglineEn(e.target.value)}
                placeholder="e.g. Pure botanical rejuvenation for stress-fatigued skin."
                className="w-full p-3 rounded-xl border border-wellness-200 text-xs text-wellness-900 focus:outline-none focus:border-wellness-700"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-wellness-900 block mb-1">
                Key Benefits (Comma separated)
              </label>
              <input
                type="text"
                value={benefitsInput}
                onChange={(e) => setBenefitsInput(e.target.value)}
                placeholder="e.g. 72-Hour Moisture Barrier, Calms Redness, Antioxidant Glow"
                className="w-full p-3 rounded-xl border border-wellness-200 text-xs text-wellness-900 focus:outline-none focus:border-wellness-700"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-wellness-900 block mb-1">
                Key Ingredients
              </label>
              <input
                type="text"
                value={ingredientsEn}
                onChange={(e) => setIngredientsEn(e.target.value)}
                placeholder="e.g. Damask Rose Extract, Niacinamide 5%, Vegan Squalane"
                className="w-full p-3 rounded-xl border border-wellness-200 text-xs text-wellness-900 focus:outline-none focus:border-wellness-700"
              />
            </div>
          </div>

          {/* Image Selection */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-wellness-900 block">
              Product Image URL
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full p-3 rounded-xl border border-wellness-200 text-xs font-mono text-wellness-900 focus:outline-none focus:border-wellness-700"
            />
            <div className="flex items-center gap-2 pt-1 flex-wrap">
              <span className="text-[10px] text-wellness-500 font-semibold uppercase">Presets:</span>
              {PRESET_IMAGES.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setImageUrl(preset.url)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all ${
                    imageUrl === preset.url
                      ? 'bg-wellness-800 text-gold-200 border-wellness-900 font-bold'
                      : 'bg-sand-50 border-wellness-200 text-wellness-700 hover:bg-wellness-100'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="pt-4 border-t border-wellness-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-wellness-200 text-xs font-semibold text-wellness-700 hover:bg-wellness-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-wellness-800 hover:bg-wellness-900 text-gold-200 text-xs font-semibold shadow-sm transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {isSubmitting ? (
                <span>Registering...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Register &amp; Save Product</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
