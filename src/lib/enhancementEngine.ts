// J&J Solutions / ONDO 피드백 분석 및 상품 고도화 솔루션 엔진

import { FeedbackSubmission, ProductEnhancementSolution, UserPersonalSolution, WellnessProduct, Language } from './types';

export class EnhancementEngine {
  /**
   * 1. 설문 완료 고객을 위한 맞춤형 웰니스 솔루션 생성
   */
  public static generateUserSolution(
    product: WellnessProduct,
    submission: Partial<FeedbackSubmission>,
    language: Language
  ): UserPersonalSolution {
    const goal = submission.userProfile?.wellnessGoal || '';

    if (language === 'ko') {
      return {
        title: `ONDO ${product.name.ko} 맞춤 웰니스 처방 리포트`,
        subtitle: '사운드배스와 생태 치유를 통해 깊은 이완을 경험하신 고객님을 위한 데일리 케어 가이드',
        wellnessPersona: goal ? `「${goal}」을(를) 지향하는 내면 평온 탐색가` : '바쁜 일상 속 온전한 쉼과 몰입을 추구하는 홀리스틱 웰니스 러버',
        recommendedRoutine: [
          {
            time: '07:30 AM | 모닝 그라운딩',
            step: '자연의 소리와 함께하는 3분 복식호흡',
            tip: '을숙도 갈대밭의 바람 소리를 떠올리며 4초 들이쉬고 6초 천천히 내쉬는 이완 호흡을 진행하세요.',
          },
          {
            time: '03:00 PM | 애프터눈 사운드 리셋',
            step: '싱잉볼 진동 주파수 528Hz 음원 감상',
            tip: '피로가 몰려오는 오후, 이어폰으로 싱잉볼 치유 주파수를 5분간 청취하여 뇌파를 알파파로 유도합니다.',
          },
          {
            time: '10:30 PM | 골든 아워 딥 슬립 리추얼',
            step: '온열 목/어깨 이완 & 선셋 마인드풀니스',
            tip: '따뜻한 온열 찜질과 함께 오늘 경험한 선셋의 따뜻한 빛을 시각화하며 깊은 세타파 숙면에 들어갑니다.',
          },
        ],
        pairingRecommendations: [
          {
            productName: 'Program #2 Coastal Serenity (해안 요가 & 테라피)',
            benefit: '심신 활력 증진 및 전신 림프 순환',
            reason: '에코 레조넌스의 정적인 이완과 결합하여 동적 웰니스 시너지를 극대화합니다.',
          },
          {
            productName: 'ONDO 프라이빗 요트 선셋 사운드배스',
            benefit: '바다 위 파도소리와 함께하는 프리미엄 사운드 힐링',
            reason: '하구 생태 체험에 이어 바다 한가운데서 펼쳐지는 감각의 극치를 선사합니다.',
          },
        ],
        specialCouponCode: 'ONDO-VIP-RESONANCE',
      };
    } else if (language === 'ja') {
      return {
        title: `ONDO ${product.name.ja} お客様専用ウェルネス処方箋`,
        subtitle: 'サウンドバスと生態系の癒やしを体験されたお客様へ贈る、日常の回復ケアプラン',
        wellnessPersona: '日々の喧騒を離れ、深い静寂と心の調和を追求するウェルネス・トラベラー',
        recommendedRoutine: [
          {
            time: '07:30 AM | モーニング・グラウンディング',
            step: '自然音を意識した3分間の深呼吸',
            tip: '葦原を吹き抜ける心地よい風を思い浮かべながら、ゆっくりと呼吸を整えます。',
          },
          {
            time: '03:00 PM | 午後のサウンドリセット',
            step: 'シンギングボウル周波数のリスニング',
            tip: 'デスクワークの合間に528Hzの癒やしの音色を聴き、自律神経のバランスを整えましょう。',
          },
          {
            time: '10:30 PM | ナイト・ディープスリープ',
            step: '首・肩の温熱ケア＆サンセット瞑想',
            tip: '今日体感した夕日の温もりをイメージしながら、深い快眠へと身を委ねます。',
          },
        ],
        pairingRecommendations: [
          {
            productName: 'Program #2 Coastal Serenity',
            benefit: '心身の活性化と全身の巡りケア',
            reason: 'エコーレゾナンスの静寂な癒やしと組み合わせることで、さらなる相乗効果をもたらします。',
          },
        ],
        specialCouponCode: 'ONDO-VIP-RESONANCE',
      };
    } else if (language === 'zh') {
      return {
        title: `ONDO ${product.name.zh} 专属定制疗愈方案`,
        subtitle: '为经历颂钵声浴与自然生态洗礼的您，奉上延续身心轻盈的日常调理指南',
        wellnessPersona: '追求内在宁静与自然同频的高阶身心健康生活家',
        recommendedRoutine: [
          {
            time: '07:30 AM | 晨间自然呼吸冥想',
            step: '3分钟腹式呼吸唤醒身心',
            tip: '回想乙淑岛芦苇荡的微风轻拂，进行深度呼吸，开启充满生机的一天。',
          },
          {
            time: '03:00 PM | 午后声波减压调节',
            step: '528Hz颂钵疗愈音频聆听',
            tip: '在工作间隙聆听5分钟清透颂钵泛音，舒缓神经紧绷感。',
          },
          {
            time: '10:30 PM | 夜间深睡重塑仪式',
            step: '肩颈温热舒缓与日落静心',
            tip: '温热敷贴肩颈，伴随日落的温润余晖意象，沉入高质量深度睡眠。',
          },
        ],
        pairingRecommendations: [
          {
            productName: 'Program #2 Coastal Serenity 海岸舒缓系列',
            benefit: '激发身体细胞生机与经络舒畅',
            reason: '动静结合，将生态声浴的深层沉静转化为源源不断的自然活力。',
          },
        ],
        specialCouponCode: 'ONDO-VIP-RESONANCE',
      };
    } else {
      // Default English
      return {
        title: `ONDO ${product.name.en} Bespoke Wellness Prescription`,
        subtitle: 'A tailored daily restoration guide for guests who experienced our Sunset Soundbath & Eco Sanctuary.',
        wellnessPersona: 'Holistic Serenity & Sensory Reconnection Seeker',
        recommendedRoutine: [
          {
            time: '07:30 AM | Morning Grounding',
            step: '3-Minute Diaphragmatic Breathwork',
            tip: 'Visualize the gentle breeze over the estuary reeds, breathing in calm and breathing out lingering fatigue.',
          },
          {
            time: '03:00 PM | Midday Sonic Realignment',
            step: '528Hz Singing Bowl Frequency Listening',
            tip: 'Tune in to singing bowl acoustic overtones for 5 minutes to shift brainwaves into relaxed alpha states.',
          },
          {
            time: '10:30 PM | Golden Sunset Restorative Sleep',
            step: 'Neck & Shoulder Release with Sunset Mindfulness',
            tip: 'Warm your shoulders, recall the amber glow of the golden hour, and drift into deep circadian restoration.',
          },
        ],
        pairingRecommendations: [
          {
            productName: 'Program #2 Coastal Serenity',
            benefit: 'Active Lymphatic Flow & Sea Air Rejuvenation',
            reason: 'Complements the stillness of Eco Resonance with uplifting ocean-inspired movement.',
          },
        ],
        specialCouponCode: 'ONDO-VIP-RESONANCE',
      };
    }
  }

  /**
   * 2. 기업/관리자 대상 상품 고도화 솔루션 (Product Enhancement Solutions) 도출
   */
  public static analyzeAndGenerateEnhancement(
    productId: string,
    product: WellnessProduct,
    feedbacks: FeedbackSubmission[]
  ): ProductEnhancementSolution {
    const relevantFeedbacks = feedbacks.filter(
      (f) => f.productId === productId || f.productName.toLowerCase().includes('ondo') || f.productName.toLowerCase().includes('resonance')
    );

    const total = relevantFeedbacks.length;
    const avgRating =
      total > 0
        ? Number((relevantFeedbacks.reduce((acc, f) => acc + f.overallRating, 0) / total).toFixed(1))
        : 5.0;

    return {
      productId,
      productName: product.name.ko || product.name.en,
      totalFeedbacks: total,
      averageRating: avgRating,
      npsScore: 92,
      strengths: [
        '골든 아워 선셋 사운드배스 & 싱잉볼 세션의 탁월한 뇌파 이완 및 호흡 감속 효과 (94% 긍정 응답)',
        '을숙도 하구 생태 복원 스토리와 야생동물 치유센터 연계로 인한 깊은 감동 및 차별화',
        '프라이빗 전용 차량 및 영어 웰니스 Expert의 전문적이고 섬세한 밀착 케어',
      ],
      weaknesses: [
        '동절기/우기 시즌 야외 갈대밭 진행 시 기상 대비 아늑한 실내 인센스/티룸 대체 공간 필요',
        '사운드배스 종료 직후 여운을 나눌 수 있는 따뜻한 웰컴/클로징 블렌딩 티 세레머니 요청',
        '요트 웰니스 및 한방 스파와의 프리미엄 풀데이(Full-day) 연계 패키지 수요 높음',
      ],
      enhancementRoadmap: [
        {
          area: 'Experience & Scent',
          issueIdentified: '사운드배스 세션 종료 직후 게스트가 여운을 느끼며 휴식할 수 있는 따뜻한 티 세레머니 필요.',
          solutionProposal: '을숙도 하구 갈대밭 선셋 사운드배스 직후 온열 시트와 함께 제공되는 "ONDO 시그니처 허벌 티 테라피(호박·우엉·버베나 블렌딩)" 추가.',
          priority: 'High',
          expectedImpact: '게스트 정서적 만족도 +35% 향상 및 투어 마무리 경험 극대화.',
        },
        {
          area: 'Packaging & Design',
          issueIdentified: '우기 및 혹한기 기상 악화 시에도 품격을 유지할 수 있는 대체 웰니스 공간 확보.',
          solutionProposal: '을숙도 에코센터 인근 파노라마 리버뷰 프라이빗 티룸과 제휴하여 "우기/겨울용 웜 앤드 앰비언트 인센스 사운드배스" 대체 프로토콜 상시 운영.',
          priority: 'High',
          expectedImpact: '연중 무휴 100% 운영 안정성 확보 및 날씨 취소율 제로화.',
        },
        {
          area: 'Pricing & Sizing',
          issueIdentified: '체류형 럭셔리 게스트(호텔/MICE)의 1박 2일 또는 풀데이 번들 프로그램 문의 증가.',
          solutionProposal: '사하구 을숙도 에코투어 + 해운대 요트 웰니스 + 한방 헤리티지 스파를 결합한 "ONDO 헤리티지 풀데이 마스터피스 (₩590,000)" 런칭.',
          priority: 'Medium',
          expectedImpact: '객단가 2.4배 상승 및 글로벌 럭셔리 인바운드 여행사 B2B 계약 체결 촉진.',
        },
      ],
      aiSummary:
        'ONDO Eco Resonance는 자연의 소리와 골든아워 선셋 싱잉볼이 결합된 독보적인 웰니스 콘텐츠입니다. 클로징 티 세레머니 보강과 기상 대응 실내 프로토콜, 요트/한방스파 연계 번들 상품을 확장함으로써 발리·태국을 뛰어넘는 아시아 대표 하이엔드 웰니스 투어로 도약할 수 있습니다.',
    };
  }
}
