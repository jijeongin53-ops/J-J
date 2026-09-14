'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { WellnessProduct, SurveyQuestion, FeedbackSubmission } from '@/lib/types';
import { useI18n } from '@/lib/i18n';
import { GoogleSheetsService } from '@/lib/sheets';
import { StarRating } from './StarRating';
import { Sparkles, ArrowRight, ArrowLeft, Send, CheckCircle2, UserCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SurveyFormProps {
  product: WellnessProduct;
  questions: SurveyQuestion[];
}

export function SurveyForm({ product, questions }: SurveyFormProps) {
  const router = useRouter();
  const { language, t, getLocalizedText } = useI18n();

  // 기본 만족도 상태
  const [overallRating, setOverallRating] = useState<number>(5);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  
  // 프로필 정보
  const [nationality, setNationality] = useState('');
  const [ageGroup, setAgeGroup] = useState('25-34');
  const [gender, setGender] = useState('Female');
  const [wellnessGoal, setWellnessGoal] = useState('Deep Relaxation & Sound Healing');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');

  // 스텝 관리 (4개 파트)
  const [currentStep, setCurrentStep] = useState<number>(0);
  const totalSteps = 4;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // 질문들을 파트별로 분할
  const part1Questions = questions.slice(0, 5);
  const part2Questions = questions.slice(5, 13);
  const part3Questions = questions.slice(13, 19);
  const part4Questions = questions.slice(19);

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
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = () => {
    setValidationError(null);
    setCurrentStep((prev) => Math.max(prev - 1, 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const submission: FeedbackSubmission = {
      productId: product.id,
      productName: getLocalizedText(product.name),
      language,
      overallRating,
      npsScore: answers['ondo_q18_nps_recommendation'] === 'promoter_9_10' ? 10 : answers['ondo_q18_nps_recommendation'] === 'passive_7_8' ? 8 : 6,
      answers,
      comment: answers['ondo_q20_best_scene'] || comment,
      userProfile: {
        nationality,
        ageGroup,
        gender,
        wellnessGoal,
        email,
      },
      sentiment: overallRating >= 4 ? 'positive' : overallRating === 3 ? 'neutral' : 'negative',
    };

    // 1. 세션 스토리지 즉시 저장 및 화면 전환 (0.1초 즉시 이동)
    sessionStorage.setItem('jnj_latest_submission', JSON.stringify(submission));
    sessionStorage.setItem('jnj_latest_product', JSON.stringify(product));

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#7A9578', '#B09540', '#D7C787', '#485E47'],
      });
    } catch (err) {}

    // 2. 구글 시트 백그라운드 비동기 저장 (사용자 대기시간 0초)
    GoogleSheetsService.submitFeedback(submission).catch(() => {});

    // 3. 결과 페이지로 즉시 이동
    router.push(`/result?productId=${product.id}`);
  };

  const stepTitles = [
    'Part 1. 전체적인 감성 경험',
    'Part 2. 웰니스 요소 상세 평가',
    'Part 3. 데이터 보강 질문',
    'Part 4. 자유 의견 & 게스트 프로필',
  ];

  const currentQuestions =
    currentStep === 0
      ? part1Questions
      : currentStep === 1
      ? part2Questions
      : currentStep === 2
      ? part3Questions
      : part4Questions;

  const progressPercentage = Math.round(((currentStep + 1) / totalSteps) * 100);

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl border border-wellness-100 shadow-luxury overflow-hidden animate-fade-in">
      
      {/* Progress Bar Header */}
      <div className="px-4 sm:px-10 pt-6 sm:pt-8 pb-4 sm:pb-5 border-b border-wellness-100/80 bg-sand-50/50">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-wellness-600 mb-2">
          <span className="font-bold text-wellness-900 text-[11px] sm:text-xs">{stepTitles[currentStep]}</span>
          <span className="text-[11px] sm:text-xs">
            {t.survey.step} {currentStep + 1} / {totalSteps}
          </span>
        </div>
        <div className="w-full h-1.5 sm:h-2 bg-wellness-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-wellness-600 via-wellness-500 to-gold-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Form Content Body */}
      <div className="p-4 sm:p-10 space-y-6 sm:space-y-8">
        
        {/* Step 0일 때 상단 전반적 만족도 별점 평가 */}
        {currentStep === 0 && (
          <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-sand-50/70 border border-wellness-100 text-center space-y-2.5">
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-wellness-100 text-wellness-800 text-[10px] sm:text-[11px] font-bold tracking-wider uppercase">
              Overall Experience
            </span>
            <h3 className="font-serif text-lg sm:text-2xl font-bold text-wellness-950">
              {t.survey.overallRatingTitle}
            </h3>
            <div className="pt-1">
              <StarRating value={overallRating} onChange={setOverallRating} size="lg" />
            </div>
          </div>
        )}

        {/* 파트별 문항 렌더링 리스트 */}
        <div className="space-y-5 sm:space-y-6">
          {currentQuestions.map((q) => {
            const qTitle = getLocalizedText(q.title);
            const currentAns = answers[q.id];
            const placeholder = q.placeholder ? getLocalizedText(q.placeholder) : '';

            return (
              <div key={q.id} className="p-4 sm:p-6 rounded-2xl bg-sand-50/40 border border-wellness-100 space-y-3.5">
                <div>
                  <h4 className="font-serif text-sm sm:text-base font-bold text-wellness-950 leading-snug">
                    {qTitle}
                  </h4>
                </div>

                {/* Single Choice Options */}
                {q.type === 'single_choice' && q.options && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options.map((opt) => {
                      const optLabel = getLocalizedText(opt.label);
                      const isSelected = currentAns === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => handleSingleSelect(q.id, opt.value)}
                          className={`w-full text-left p-3 sm:p-4 rounded-xl border transition-all duration-200 flex items-center justify-between group active:scale-[0.99] ${
                            isSelected
                              ? 'bg-wellness-800 text-gold-100 border-wellness-900 shadow-sm ring-1 ring-wellness-600'
                              : 'bg-white border-wellness-100 text-wellness-900 hover:border-wellness-300 hover:bg-wellness-50/50'
                          }`}
                        >
                          <span className={`text-xs sm:text-sm leading-snug ${isSelected ? 'font-semibold' : ''}`}>
                            {optLabel}
                          </span>
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 ml-2 transition-colors ${
                              isSelected ? 'border-gold-300 bg-gold-400 text-wellness-950' : 'border-neutral-300'
                            }`}
                          >
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-wellness-950" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Multi Choice Options */}
                {q.type === 'multi_choice' && q.options && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options.map((opt) => {
                      const optLabel = getLocalizedText(opt.label);
                      const selectedList: string[] = Array.isArray(currentAns) ? currentAns : [];
                      const isSelected = selectedList.includes(opt.value);
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => handleMultiSelect(q.id, opt.value)}
                          className={`w-full text-left p-3 sm:p-4 rounded-xl border transition-all duration-200 flex items-center justify-between active:scale-[0.99] ${
                            isSelected
                              ? 'bg-wellness-800 text-gold-100 border-wellness-900 shadow-sm ring-1 ring-wellness-600'
                              : 'bg-white border-wellness-100 text-wellness-900 hover:border-wellness-300 hover:bg-wellness-50/50'
                          }`}
                        >
                          <span className={`text-xs sm:text-sm leading-snug ${isSelected ? 'font-semibold' : ''}`}>
                            {optLabel}
                          </span>
                          <div
                            className={`w-4 h-4 rounded-md border flex items-center justify-center flex-shrink-0 ml-2 transition-colors ${
                              isSelected ? 'border-gold-300 bg-gold-400 text-wellness-950' : 'border-neutral-300'
                            }`}
                          >
                            {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-wellness-950" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Text Area */}
                {q.type === 'text' && (
                  <div>
                    <textarea
                      rows={3}
                      value={currentAns || ''}
                      onChange={(e) => handleSingleSelect(q.id, e.target.value)}
                      placeholder={placeholder || '소중한 의견을 자유롭게 남겨주세요...'}
                      className="w-full p-3 sm:p-4 rounded-xl border border-wellness-200 focus:border-wellness-700 focus:ring-2 focus:ring-wellness-500/20 text-xs sm:text-sm text-wellness-900 bg-white transition-all outline-none"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Step 3 (Part 4)일 때 하단 게스트 프로필 입력란 */}
        {currentStep === 3 && (
          <div className="p-4 sm:p-6 rounded-2xl bg-sand-50/80 border border-wellness-100 space-y-3.5 animate-slide-up">
            <div className="flex items-center gap-2 text-wellness-900 font-serif font-bold text-sm sm:text-base">
              <UserCheck className="w-4 h-4 text-wellness-700" />
              <span>게스트 정보 (맞춤 웰니스 리포트 및 감사 바우처 수신용)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="text-[11px] font-semibold text-wellness-700 block mb-1">
                  국적 / 거주 국가
                </label>
                <input
                  type="text"
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                  placeholder="예: 미국, 싱가포르, 일본, 영국, 한국..."
                  className="w-full px-3 py-2.5 rounded-xl border border-wellness-200 text-xs text-wellness-900 bg-white focus:outline-none focus:border-wellness-600"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-wellness-700 block mb-1">
                  이메일 (맞춤 웰니스 처방전 발송)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="yourname@example.com"
                  className="w-full px-3 py-2.5 rounded-xl border border-wellness-200 text-xs text-wellness-900 bg-white focus:outline-none focus:border-wellness-600"
                />
              </div>
            </div>
          </div>
        )}

        {/* Error Notice */}
        {validationError && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 font-medium">
            ⚠️ {validationError}
          </div>
        )}

        {/* Navigation Buttons Footer */}
        <div className="pt-4 border-t border-wellness-100 flex items-center justify-between gap-3">
          {currentStep > 0 ? (
            <button
              type="button"
              onClick={handlePrev}
              className="flex items-center gap-1.5 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl sm:rounded-2xl border border-wellness-200 hover:bg-wellness-50 text-wellness-800 text-xs sm:text-sm font-semibold transition-all active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>이전</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < totalSteps - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-1.5 px-5 py-2.5 sm:px-7 sm:py-3 rounded-xl sm:rounded-2xl bg-wellness-800 hover:bg-wellness-900 text-white text-xs sm:text-sm font-semibold shadow-md transition-all active:scale-95 ml-auto"
            >
              <span>다음 파트 ({currentStep + 2}/{totalSteps})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleSubmit}
              className="flex items-center gap-1.5 px-5 py-2.5 sm:px-7 sm:py-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-wellness-800 via-wellness-700 to-gold-600 hover:brightness-105 text-white text-xs sm:text-sm font-bold shadow-lg transition-all active:scale-95 ml-auto disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>제출 중...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-gold-300" />
                  <span>설문 완료 &amp; 맞춤 처방 받기</span>
                  <Send className="w-3.5 h-3.5 ml-0.5" />
                </>
              )}
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
