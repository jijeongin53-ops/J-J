'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { WellnessProduct, SurveyQuestion, FeedbackSubmission } from '@/lib/types';
import { useI18n } from '@/lib/i18n';
import { GoogleSheetsService } from '@/lib/sheets';
import { StarRating } from './StarRating';
import { NpsScale } from './NpsScale';
import { Sparkles, ArrowRight, ArrowLeft, Send, CheckCircle2, UserCheck, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SurveyFormProps {
  product: WellnessProduct;
  questions: SurveyQuestion[];
}

export function SurveyForm({ product, questions }: SurveyFormProps) {
  const router = useRouter();
  const { language, t, getLocalizedText } = useI18n();

  // 기본 상태 관리
  const [overallRating, setOverallRating] = useState<number>(5);
  const [npsScore, setNpsScore] = useState<number>(10);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  
  // 프로필 정보 (선택사항)
  const [nationality, setNationality] = useState('');
  const [ageGroup, setAgeGroup] = useState('25-34');
  const [gender, setGender] = useState('Female');
  const [wellnessGoal, setWellnessGoal] = useState('Deep Sleep & Skin Rejuvenation');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');

  // 스텝 & 제출 상태
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // 단계 구성:
  // Step 0: 만족도 & NPS 기본 평가
  // Step 1 ~ N: 구글 시트 동적 질문 (상품별 맞춤 질문들)
  // Step Last: 추가 서술형 의견 & 프로필 정보
  const dynamicQuestionCount = questions.length;
  const totalSteps = 2 + dynamicQuestionCount; // 0: 기본, 1..N: 동적 질문, 마지막: 프로필 & 코멘트

  const handleSingleSelect = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    setValidationError(null);
  };

  const handleMultiSelect = (questionId: string, value: string) => {
    setAnswers((prev) => {
      const currentList: string[] = Array.isArray(prev[questionId]) ? prev[questionId] : [];
      const updated = currentList.includes(value)
        ? currentList.filter((v) => v !== value)
        : [...currentList, value];
      return { ...prev, [questionId]: updated };
    });
    setValidationError(null);
  };

  const handleNext = () => {
    setValidationError(null);

    // 현재 스텝 유효성 검사
    if (currentStep === 0) {
      if (!overallRating) {
        setValidationError(t.survey.validationError);
        return;
      }
    } else if (currentStep > 0 && currentStep <= dynamicQuestionCount) {
      const currentQ = questions[currentStep - 1];
      if (currentQ.required) {
        const ans = answers[currentQ.id];
        if (!ans || (Array.isArray(ans) && ans.length === 0) || (typeof ans === 'string' && ans.trim() === '')) {
          setValidationError(t.survey.validationError);
          return;
        }
      }
    }

    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    setValidationError(null);
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const submission: FeedbackSubmission = {
      productId: product.id,
      productName: getLocalizedText(product.name),
      language,
      overallRating,
      npsScore,
      answers,
      comment,
      userProfile: {
        nationality,
        ageGroup,
        gender,
        wellnessGoal,
        email,
      },
      sentiment: overallRating >= 4 ? 'positive' : overallRating === 3 ? 'neutral' : 'negative',
    };

    try {
      // 1. 구글 시트로 피드백 제출
      await GoogleSheetsService.submitFeedback(submission);

      // 2. 축하 폭죽 효과
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#7A9578', '#B09540', '#D7C787', '#485E47'],
        });
      } catch (err) {}

      // 3. 임시 세션 스토리지에 결과 보관 후 결과 페이지로 이동
      sessionStorage.setItem('jnj_latest_submission', JSON.stringify(submission));
      sessionStorage.setItem('jnj_latest_product', JSON.stringify(product));
      
      router.push(`/result?productId=${product.id}`);
    } catch (error) {
      console.error('Submission failed:', error);
      setIsSubmitting(false);
    }
  };

  const progressPercentage = Math.round(((currentStep + 1) / totalSteps) * 100);

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-3xl border border-wellness-100 shadow-luxury overflow-hidden animate-fade-in">
      
      {/* Progress Bar Header */}
      <div className="px-6 sm:px-10 pt-8 pb-5 border-b border-wellness-100/80 bg-sand-50/50">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-wellness-600 mb-2.5">
          <span>{t.survey.productEvaluation}</span>
          <span>
            {t.survey.step} {currentStep + 1} {t.survey.of} {totalSteps}
          </span>
        </div>
        <div className="w-full h-2 bg-wellness-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-wellness-600 via-wellness-500 to-gold-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Form Content Body */}
      <div className="p-6 sm:p-10">
        
        {/* STEP 0: 전반적 만족도 & 순추천 지수(NPS) */}
        {currentStep === 0 && (
          <div className="space-y-10 animate-slide-up">
            <div className="text-center max-w-lg mx-auto">
              <span className="inline-block px-3 py-1 rounded-full bg-wellness-100 text-wellness-800 text-xs font-bold tracking-wider uppercase mb-2">
                Core Satisfaction
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-wellness-950">
                {t.survey.overallRatingTitle}
              </h3>
              <p className="text-xs sm:text-sm text-wellness-600 mt-2">
                {t.survey.overallRatingDesc}
              </p>
              
              <div className="mt-8">
                <StarRating value={overallRating} onChange={setOverallRating} size="lg" />
              </div>
            </div>

            <div className="pt-8 border-t border-wellness-100 space-y-4">
              <div className="text-center">
                <h4 className="font-serif text-lg sm:text-xl font-bold text-wellness-950">
                  {t.survey.npsTitle}
                </h4>
                <p className="text-xs text-wellness-600 mt-1">
                  0 (Not at all likely) to 10 (Extremely likely)
                </p>
              </div>
              <div className="pt-3">
                <NpsScale value={npsScore} onChange={setNpsScore} />
              </div>
            </div>
          </div>
        )}

        {/* STEP 1..N: 구글 시트 기반 상품별 동적 질문들 */}
        {currentStep > 0 && currentStep <= dynamicQuestionCount && (
          <div className="animate-slide-up space-y-6">
            {(() => {
              const q = questions[currentStep - 1];
              const qTitle = getLocalizedText(q.title);
              const qDesc = q.description ? getLocalizedText(q.description) : undefined;
              const currentAns = answers[q.id];

              return (
                <div>
                  <div className="mb-6">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gold-600 block mb-1">
                      {q.category.toUpperCase()} {q.required && <span className="text-rose-500">*</span>}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-wellness-950 leading-snug">
                      {qTitle}
                    </h3>
                    {qDesc && (
                      <p className="text-xs sm:text-sm text-wellness-600 mt-2">{qDesc}</p>
                    )}
                  </div>

                  {/* Single Choice Options */}
                  {q.type === 'single_choice' && q.options && (
                    <div className="space-y-3">
                      {q.options.map((opt) => {
                        const optLabel = getLocalizedText(opt.label);
                        const isSelected = currentAns === opt.value;
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => handleSingleSelect(q.id, opt.value)}
                            className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex items-center justify-between group ${
                              isSelected
                                ? 'bg-wellness-50/90 border-wellness-600 shadow-sm ring-1 ring-wellness-500/30'
                                : 'bg-white border-wellness-100 hover:border-wellness-300 hover:bg-wellness-50/40'
                            }`}
                          >
                            <span className={`text-xs sm:text-sm leading-relaxed ${isSelected ? 'font-semibold text-wellness-950' : 'text-wellness-800'}`}>
                              {optLabel}
                            </span>
                            <div
                              className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 ml-3 transition-colors ${
                                isSelected ? 'border-wellness-700 bg-wellness-700 text-white' : 'border-neutral-300'
                              }`}
                            >
                              {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Multi Choice Options */}
                  {q.type === 'multi_choice' && q.options && (
                    <div className="space-y-3">
                      {q.options.map((opt) => {
                        const optLabel = getLocalizedText(opt.label);
                        const selectedList: string[] = Array.isArray(currentAns) ? currentAns : [];
                        const isSelected = selectedList.includes(opt.value);
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => handleMultiSelect(q.id, opt.value)}
                            className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex items-center justify-between ${
                              isSelected
                                ? 'bg-wellness-50/90 border-wellness-600 shadow-sm ring-1 ring-wellness-500/30'
                                : 'bg-white border-wellness-100 hover:border-wellness-300 hover:bg-wellness-50/40'
                            }`}
                          >
                            <span className={`text-xs sm:text-sm leading-relaxed ${isSelected ? 'font-semibold text-wellness-950' : 'text-wellness-800'}`}>
                              {optLabel}
                            </span>
                            <div
                              className={`w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 ml-3 transition-colors ${
                                isSelected ? 'border-wellness-700 bg-wellness-700 text-white' : 'border-neutral-300'
                              }`}
                            >
                              {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Text Input */}
                  {q.type === 'text' && (
                    <div>
                      <textarea
                        rows={4}
                        value={currentAns || ''}
                        onChange={(e) => handleSingleSelect(q.id, e.target.value)}
                        placeholder="Please share your thoughts..."
                        className="w-full p-4 rounded-2xl border border-wellness-200 focus:border-wellness-600 focus:ring-2 focus:ring-wellness-500/20 text-xs sm:text-sm text-wellness-900 bg-sand-50/30 transition-all outline-none"
                      />
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        )}

        {/* STEP LAST: 추가 서술 피드백 & 고객 프로필 (선택) */}
        {currentStep === totalSteps - 1 && (
          <div className="animate-slide-up space-y-7">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-gold-600 block mb-1">
                Final Step &amp; Wellness Personalization
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-wellness-950">
                {t.survey.additionalComments}
              </h3>
              <div className="mt-3">
                <textarea
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder={t.survey.additionalPlaceholder}
                  className="w-full p-4 rounded-2xl border border-wellness-200 focus:border-wellness-600 focus:ring-2 focus:ring-wellness-500/20 text-xs sm:text-sm text-wellness-900 bg-sand-50/30 transition-all outline-none"
                />
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-sand-50/80 border border-wellness-100 space-y-4">
              <div className="flex items-center gap-2 text-wellness-900 font-serif font-bold text-base">
                <UserCheck className="w-4 h-4 text-wellness-700" />
                <span>{t.survey.profileTitle}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-semibold text-wellness-700 block mb-1">
                    {t.survey.nationalityLabel}
                  </label>
                  <input
                    type="text"
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                    placeholder={t.survey.nationalityPlaceholder}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-wellness-200 text-xs text-wellness-900 bg-white focus:outline-none focus:border-wellness-600"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-wellness-700 block mb-1">
                    {t.survey.ageGroupLabel}
                  </label>
                  <select
                    value={ageGroup}
                    onChange={(e) => setAgeGroup(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-wellness-200 text-xs text-wellness-900 bg-white focus:outline-none focus:border-wellness-600"
                  >
                    <option value="18-24">18 - 24</option>
                    <option value="25-34">25 - 34</option>
                    <option value="35-44">35 - 44</option>
                    <option value="45-54">45 - 54</option>
                    <option value="55+">55+</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-wellness-700 block mb-1">
                    {t.survey.wellnessGoalLabel}
                  </label>
                  <select
                    value={wellnessGoal}
                    onChange={(e) => setWellnessGoal(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-wellness-200 text-xs text-wellness-900 bg-white focus:outline-none focus:border-wellness-600"
                  >
                    <option value="Deep Sleep & Stress Relief">Deep Sleep &amp; Stress Relief</option>
                    <option value="Skin Glow & Anti-Aging">Skin Glow &amp; Anti-Aging</option>
                    <option value="Detox & Inner Circulation">Detox &amp; Inner Circulation</option>
                    <option value="Mindfulness & Relaxation">Mindfulness &amp; Relaxation</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-wellness-700 block mb-1">
                    {t.survey.emailLabel}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.survey.emailPlaceholder}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-wellness-200 text-xs text-wellness-900 bg-white focus:outline-none focus:border-wellness-600"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error Notice */}
        {validationError && (
          <div className="mt-4 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 font-medium animate-fade-in">
            ⚠️ {validationError}
          </div>
        )}

        {/* Navigation Buttons Footer */}
        <div className="mt-10 pt-6 border-t border-wellness-100 flex items-center justify-between gap-4">
          {currentStep > 0 ? (
            <button
              type="button"
              onClick={handlePrev}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl border border-wellness-200 hover:bg-wellness-50 text-wellness-800 text-xs sm:text-sm font-semibold transition-all active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t.survey.prevBtn}</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < totalSteps - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-2 px-6 sm:px-8 py-3.5 rounded-2xl bg-wellness-800 hover:bg-wellness-900 text-white text-xs sm:text-sm font-semibold shadow-md transition-all active:scale-95 ml-auto"
            >
              <span>{t.survey.nextBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleSubmit}
              className="flex items-center gap-2 px-6 sm:px-8 py-3.5 rounded-2xl bg-gradient-to-r from-wellness-800 via-wellness-700 to-gold-600 hover:brightness-105 text-white text-xs sm:text-sm font-bold shadow-lg transition-all active:scale-95 ml-auto disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>{t.survey.submitting}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-gold-300" />
                  <span>{t.survey.submitBtn}</span>
                  <Send className="w-3.5 h-3.5 ml-1" />
                </>
              )}
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
