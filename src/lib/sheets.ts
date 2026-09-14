// J&J Solutions 구글 시트 연동 엔진 및 웰니스 데이터 모델

import { WellnessProduct, SurveyQuestion, FeedbackSubmission, ProductEnhancementSolution } from './types';

// 기본 구글 시트 스프레드시트 ID (사용자 제공)
export const DEFAULT_SPREADSHEET_ID = '12-6xda9qQIzYGZFLAr7X3cjrFN_G_4sfBUYHWjBHAAo';
export const DEFAULT_SPREADSHEET_URL = `https://docs.google.com/spreadsheets/d/${DEFAULT_SPREADSHEET_ID}/edit`;

// 기본 가상 데이터 초기화 (사용자 요청에 따라 가상 데이터를 비우고 신규 등록 가능한 상태로 설정)
export const MOCK_PRODUCTS: WellnessProduct[] = [];

// 기본 공통 설문 질문 (상품 등록 시 자동으로 공통 질문이 연결되고 상품별 질문 추가 가능)
export const DEFAULT_COMMON_QUESTIONS: SurveyQuestion[] = [
  {
    id: 'q_channel',
    productId: 'all',
    category: 'custom',
    type: 'single_choice',
    required: true,
    title: {
      en: 'Where did you discover or experience this J&J Solutions product?',
      ja: 'どちらでこのJ&J Solutions商品を知りましたか？または体験されましたか？',
      zh: '您是通过什么渠道了解或体验到该款J&J产品的？',
      ko: '어떤 경로로 J&J Solutions의 제품을 접하거나 경험하셨나요?',
    },
    options: [
      {
        value: 'luxury_hotel_spa',
        label: {
          en: 'Luxury Hotel / Spa Amenity',
          ja: '高級ホテル・スパ アメニティ',
          zh: '高端酒店 / 水疗SPA护理',
          ko: '특급 호텔 / 스파 어메니티',
        },
      },
      {
        value: 'social_media',
        label: {
          en: 'Social Media (Instagram, Red, TikTok)',
          ja: 'SNS（Instagram、小紅書など）',
          zh: '社交媒体（小红书、Instagram、TikTok等）',
          ko: '소셜 미디어 (인스타그램, 샤오홍슈 등)',
        },
      },
      {
        value: 'duty_free_offline',
        label: {
          en: 'Airport Duty Free / Premium Boutique',
          ja: '空港免税店・旗艦店',
          zh: '机场免税店 / 高端品牌精品店',
          ko: '면세점 / 백화점 팝업 매장',
        },
      },
      {
        value: 'friend_referral',
        label: {
          en: 'Gifted by a Friend or Recommendation',
          ja: '友人・知人からのプレゼント・紹介',
          zh: '亲友推荐或礼品赠送',
          ko: '지인 추천 또는 선물',
        },
      },
    ],
  },
  {
    id: 'q_packaging_impression',
    productId: 'all',
    category: 'packaging',
    type: 'single_choice',
    required: false,
    title: {
      en: 'How did the aesthetic packaging & unboxing experience feel?',
      ja: 'パッケージのデザインや開封時の高級感はいかがでしたか？',
      zh: '您对产品的包装美学与开箱仪式感有何评价？',
      ko: '제품의 패키징 디자인과 언박싱 시의 고급스러운 느낌은 어떠셨나요?',
    },
    options: [
      {
        value: 'luxury_sustainable',
        label: {
          en: 'Luxurious & eco-conscious, feels like an exquisite gift',
          ja: '高級感と環境への配慮が両立しており、ギフトにも最適',
          zh: '极具奢华质感与环保理念，非常适合作为高端礼品',
          ko: '럭셔리하고 친환경적이며 선물용으로 손색없음',
        },
      },
      {
        value: 'minimal_chic',
        label: {
          en: 'Clean and minimalistic, looks aesthetic on vanity/shelf',
          ja: 'ミニマルで洗練されており、インテリアにも馴染む',
          zh: '简约高级，摆放在梳妆台或浴室十分赏心悦目',
          ko: '미니멀하고 세련되어 화장대/침실 인테리어와 잘 어울림',
        },
      },
      {
        value: 'multilingual_manual',
        label: {
          en: 'Would appreciate more detailed multilingual wellness ritual manuals',
          ja: '多言語の説明書や使い方の詳しいガイドが同封されるとより嬉しい',
          zh: '希望包装内附带更详尽的多语言养生使用仪式指南',
          ko: '다국어 안내서와 웰니스 리추얼 가이드가 더 상세하면 좋겠음',
        },
      },
    ],
  },
];

export const MOCK_QUESTIONS: SurveyQuestion[] = DEFAULT_COMMON_QUESTIONS;
export const MOCK_FEEDBACKS: FeedbackSubmission[] = [];

// 구글 시트 연동 유틸리티 클래스/함수
export class GoogleSheetsService {
  private static gasUrlKey = 'jnj_gas_webhook_url';
  private static localProductsKey = 'jnj_local_products';
  private static localQuestionsKey = 'jnj_local_questions';

  public static getWebhookUrl(): string {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(this.gasUrlKey);
      if (stored && stored.trim() !== '') return stored;
    }
    return process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL || '';
  }

  public static setWebhookUrl(url: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.gasUrlKey, url);
    }
  }

  // 1. 상품 목록 조회 (구글 시트 연동 또는 로컬 스토리지)
  public static async fetchProducts(): Promise<WellnessProduct[]> {
    const url = this.getWebhookUrl();
    
    // 로컬 스토리지 확인
    let localProducts: WellnessProduct[] = [];
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(this.localProductsKey);
      if (stored) {
        try {
          localProducts = JSON.parse(stored);
        } catch {}
      }
    }

    if (!url) {
      return localProducts;
    }

    try {
      const response = await fetch(`${url}?action=getProducts`, {
        method: 'GET',
        cache: 'no-store',
      });
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          return data;
        }
      }
    } catch (e) {
      console.warn('Failed to fetch products from Google Sheets, using local storage:', e);
    }
    return localProducts;
  }

  // 2. 신규 상품 등록 (구글 시트 및 로컬 스토리지 저장)
  public static async addProduct(product: WellnessProduct): Promise<{ success: boolean; message?: string }> {
    // 1) 로컬 스토리지에 저장
    if (typeof window !== 'undefined') {
      const existing = await this.fetchProducts();
      const updated = [product, ...existing.filter((p) => p.id !== product.id)];
      localStorage.setItem(this.localProductsKey, JSON.stringify(updated));
    }

    // 2) 구글 시트로 POST
    const url = this.getWebhookUrl();
    if (url) {
      try {
        await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({
            action: 'addProduct',
            payload: product,
          }),
        });
      } catch (e) {
        console.warn('Failed to sync new product to Google Sheets:', e);
      }
    }

    return { success: true, message: 'Product added successfully' };
  }

  // 3. 상품 삭제
  public static async deleteProduct(productId: string): Promise<{ success: boolean }> {
    if (typeof window !== 'undefined') {
      const existing = await this.fetchProducts();
      const updated = existing.filter((p) => p.id !== productId);
      localStorage.setItem(this.localProductsKey, JSON.stringify(updated));
    }

    const url = this.getWebhookUrl();
    if (url) {
      try {
        await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({
            action: 'deleteProduct',
            payload: { id: productId },
          }),
        });
      } catch (e) {}
    }

    return { success: true };
  }

  // 4. 질문 목록 조회 (구글 시트 연동 또는 로컬/기본 질문)
  public static async fetchQuestions(productId?: string): Promise<SurveyQuestion[]> {
    const url = this.getWebhookUrl();
    let questions = DEFAULT_COMMON_QUESTIONS;

    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(this.localQuestionsKey);
      if (stored) {
        try {
          const customQuestions: SurveyQuestion[] = JSON.parse(stored);
          questions = [...DEFAULT_COMMON_QUESTIONS, ...customQuestions];
        } catch {}
      }
    }

    if (url) {
      try {
        const response = await fetch(`${url}?action=getQuestions`, {
          method: 'GET',
          cache: 'no-store',
        });
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
            questions = data;
          }
        }
      } catch (e) {
        console.warn('Failed to fetch questions from Google Sheets:', e);
      }
    }

    if (!productId) return questions;

    // 해당 상품에 해당하는 질문 + 'all' 공통 질문 필터링
    return questions.filter((q) => q.productId === productId || q.productId === 'all');
  }

  // 5. 설문 피드백 제출 (구글 시트로 POST 전송)
  public static async submitFeedback(submission: FeedbackSubmission): Promise<{ success: boolean; message?: string }> {
    const url = this.getWebhookUrl();
    
    // 로컬 스토리지에 응답 기록 보관
    if (typeof window !== 'undefined') {
      const existingStr = localStorage.getItem('jnj_local_feedbacks');
      const existingList: FeedbackSubmission[] = existingStr ? JSON.parse(existingStr) : [];
      const newSubmission = {
        ...submission,
        id: submission.id || `fb-${Date.now()}`,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      };
      localStorage.setItem('jnj_local_feedbacks', JSON.stringify([newSubmission, ...existingList]));
    }

    if (!url) {
      return { success: true, message: 'Saved to local database.' };
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify({
          action: 'submitFeedback',
          payload: submission,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        return { success: true, message: result.message || 'Successfully recorded to Google Sheets.' };
      }
    } catch (e: any) {
      console.error('Error submitting feedback to Google Sheets:', e);
      return { success: true, message: 'Saved locally.' };
    }

    return { success: true };
  }

  // 6. 피드백 목록 전체 조회 (관리자 대시보드용)
  public static async fetchFeedbacks(): Promise<FeedbackSubmission[]> {
    const url = this.getWebhookUrl();
    let remoteFeedbacks: FeedbackSubmission[] = [];

    if (url) {
      try {
        const response = await fetch(`${url}?action=getFeedbacks`, {
          method: 'GET',
          cache: 'no-store',
        });
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            remoteFeedbacks = data;
          }
        }
      } catch (e) {
        console.warn('Failed to fetch feedbacks from Google Sheets:', e);
      }
    }

    // 로컬 피드백과 병합
    let localFeedbacks: FeedbackSubmission[] = [];
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('jnj_local_feedbacks');
      if (stored) {
        try {
          localFeedbacks = JSON.parse(stored);
        } catch {}
      }
    }

    const combined = [...remoteFeedbacks, ...localFeedbacks];
    const uniqueMap = new Map<string, FeedbackSubmission>();
    for (const item of combined) {
      const key = item.id || `${item.timestamp}-${item.productName}`;
      if (!uniqueMap.has(key)) {
        uniqueMap.set(key, item);
      }
    }

    return Array.from(uniqueMap.values());
  }
}
