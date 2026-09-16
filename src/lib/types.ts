// J&J Solutions 웰니스 상품 및 설문 시스템 타입 정의

export type Language = 'en' | 'ja' | 'zh' | 'ko';

export interface LocalizedString {
  en: string;
  ja: string;
  zh: string;
  ko: string;
}

export interface WellnessProduct {
  id: string; // 예: "jnj-tea-01", "jnj-oil-02", "jnj-cream-03"
  slug: string;
  name: LocalizedString;
  category: LocalizedString;
  tagline: LocalizedString;
  description: LocalizedString;
  imageUrl: string;
  badge?: LocalizedString;
  keyBenefits: {
    en: string[];
    ja: string[];
    zh: string[];
    ko: string[];
  };
  ingredients?: LocalizedString;
}

export type QuestionType = 'rating' | 'nps' | 'single_choice' | 'multi_choice' | 'text';

export interface SurveyQuestion {
  id: string;
  productId: string | 'all'; // 특정 상품에만 해당하거나 'all' (공통 질문)
  category: 'satisfaction' | 'efficacy' | 'texture_scent' | 'packaging' | 'pricing' | 'custom';
  type: QuestionType;
  required: boolean;
  title: LocalizedString;
  description?: LocalizedString;
  options?: {
    value: string;
    label: LocalizedString;
  }[];
  placeholder?: LocalizedString;
}

export interface SurveyAnswer {
  questionId: string;
  type: QuestionType;
  value: string | number | string[];
}

export interface DetailedAnswerItem {
  questionId: string;
  questionTitle: string;
  answerText: string;
}

export interface FeedbackSubmission {
  id?: string;
  timestamp?: string;
  productId: string;
  productName: string;
  language: Language;
  userProfile?: {
    nationality?: string;
    ageGroup?: string;
    gender?: string;
    wellnessGoal?: string;
    email?: string;
  };
  overallRating: number; // 1 ~ 5
  npsScore?: number; // 0 ~ 10
  answers: Record<string, any>;
  detailedAnswers?: DetailedAnswerItem[];
  comment?: string;
  sentiment?: 'positive' | 'neutral' | 'negative';
}

// 상품 고도화 솔루션 제안 모델
export interface ProductEnhancementSolution {
  productId: string;
  productName: string;
  totalFeedbacks: number;
  averageRating: number;
  npsScore: number;
  strengths: string[];
  weaknesses: string[];
  enhancementRoadmap: {
    area: 'Formula & Texture' | 'Packaging & Design' | 'Pricing & Sizing' | 'Localization & Marketing' | 'Experience & Scent';
    issueIdentified: string;
    solutionProposal: string;
    priority: 'High' | 'Medium' | 'Low';
    expectedImpact: string;
  }[];
  aiSummary: string;
}

// 설문 완료 후 고객에게 제공되는 개인 맞춤 웰니스 솔루션
export interface UserPersonalSolution {
  title: string;
  subtitle: string;
  wellnessPersona: string;
  recommendedRoutine: {
    time: string;
    step: string;
    tip: string;
  }[];
  pairingRecommendations: {
    productName: string;
    benefit: string;
    reason: string;
  }[];
  specialCouponCode?: string;
}
