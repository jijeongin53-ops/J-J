// J&J Solutions / ONDO 웰니스 프로그램 및 피드백 데이터 모델

import { WellnessProduct, SurveyQuestion, FeedbackSubmission, ProductEnhancementSolution } from './types';

// 기본 구글 시트 스프레드시트 ID
export const DEFAULT_SPREADSHEET_ID = '12-6xda9qQIzYGZFLAr7X3cjrFN_G_4sfBUYHWjBHAAo';
export const DEFAULT_SPREADSHEET_URL = `https://docs.google.com/spreadsheets/d/${DEFAULT_SPREADSHEET_ID}/edit`;

// 1. ONDO Wellness Experience 대표 상품 등록 (Program #1 & Program #2)
export const ONDO_ECO_RESONANCE_PRODUCT: WellnessProduct = {
  id: 'ondo-eco-resonance-01',
  slug: 'ondo-eco-resonance',
  name: {
    ko: 'Eulsukdo Island Wellness Private Tour (을숙도 에코 레조넌스)',
    en: 'Eulsukdo Island Wellness Private Tour',
    ja: 'Eulsukdo Island Wellness Private Tour（乙淑島）',
    zh: 'Eulsukdo Island Wellness Private Tour（乙淑岛）',
  },
  category: {
    ko: '사하구 을숙도 웰니스 리추얼',
    en: 'Eco & Sunset Soundbath Ritual',
    ja: 'エコ＆サンセット・サウンドバス',
    zh: '生态日落颂钵声浴疗愈',
  },
  tagline: {
    ko: '강과 바다가 만나는 하구의 생명력과 골든 아워 선셋 사운드배스 4시간 코스 (₩249,000 / $186 USD)',
    en: '4-Hour Sunset Soundbath & Eco-Sanctuary Healing Journey where river meets the sea ($186 USD).',
    ja: '川と海が交わる河口の生命力と、ゴールデンアワーの夕日サウンドバス4時間コース（$186 USD）。',
    zh: '江海交汇处的自然生命力，4小时黄金日落颂钵声浴与生态疗愈之旅（$186 USD）。',
  },
  description: {
    ko: '전용 차량 왕복 픽업, 영어 전문 웰니스 Expert, 을숙도 에코센터 카트 투어, 야생동물 치유센터, 갈대밭 선셋 사운드배스 & 싱잉볼 세션 포함.',
    en: 'Includes Private Roundtrip Pick-up, English Wellness Expert, Eulsukdo Eco-Center Cart Tour, Wildlife Sanctuary, and Sunset Singing Bowl Soundbath.',
    ja: '専用車送迎、英語対応ウェルネス専門ガイド、乙淑島エコセンター巡回、野生動物救護体験、夕日シンギングボウル響き体験を含む。',
    zh: '包含专属接送、英文专属健康专家、乙淑岛生态电动车巡游、野生动物救护中心体验、芦苇荡日落颂钵声浴。',
  },
  imageUrl: '/images/eulsukdo_main.jpg',
  badge: {
    ko: '4시간 선셋 리추얼',
    en: '4-Hour Sunset Ritual',
    ja: '4時間 サンセットリチュアル',
    zh: '4小时 日落疗愈',
  },
  keyBenefits: {
    ko: ['골든 아워 선셋 사운드배스 & 싱잉볼', '을숙도 카트 투어 & 야생동물 치유센터', '프라이빗 전용차량 픽업 & 영어가이드'],
    en: ['Golden Hour Sunset Soundbath & Singing Bowl', 'Eco-Sanctuary Cart Tour & Wildlife Center', 'Private Vehicle Pick-up & English Expert'],
    ja: ['夕暮れ時のサンセット・サウンドバス＆シンギングボウル', '乙淑島カートツアー＆野生動物センター', '専用車送迎＆英語ウェルネスエキスパート'],
    zh: ['黄金日落颂钵声浴疗愈', '乙淑岛生态观光车巡游与野生动物救护', '专属专车接送及英文健康专家全程陪伴'],
  },
  ingredients: {
    ko: '포함: 프라이빗 왕복 픽업, 영어 전문 웰니스 가이드, 사운드배스 세션, 에코센터 입장료, 로컬 웰니스 기프트',
    en: 'Includes: Private Pick-up/Drop-off, English Wellness Expert, Singing Bowl Session, Eco-Center Pass, Local Gift',
    ja: '含まれるもの：専用車送迎、英語ウェルネスガイド、サウンドバス、エコセンター入場、記念ギフト',
    zh: '包含项目：专属往返接送、英文健康专家、颂钵声浴、生态中心门票、特色礼品',
  },
};

export const ONDO_COASTAL_SERENITY_PRODUCT: WellnessProduct = {
  id: 'ondo-coastal-serenity-02',
  slug: 'ondo-coastal-serenity',
  name: {
    ko: 'Oryukdo Islets Wellness Private Tour (오륙도 코스탈 세레니티)',
    en: 'Oryukdo Islets Wellness Private Tour',
    ja: 'Oryukdo Islets Wellness Private Tour（五六島）',
    zh: 'Oryukdo Islets Wellness Private Tour（五六岛）',
  },
  category: {
    ko: '남구 오륙도 웰니스 리추얼',
    en: 'Coastal Wellness & Temple Ritual',
    ja: '五六島コースタル・ウェルネス＆テンプルリチュアル',
    zh: '五六岛海岸疗愈与寺院仪式',
  },
  tagline: {
    ko: '부산 오륙도 바다와 스카이워크, 해맞이 공원 사운드배스 & 백련사 비움과 소원 리추얼 4시간 코스 (₩270,000 / $170 USD)',
    en: '4-Hour Private Coastal Soundbath & Temple Reflection Ritual at Oryukdo Islets ($170 USD).',
    ja: '五六島の海、日の出公園サウンドバス＆白蓮寺でのリチュアル4時間コース（$170 USD）。',
    zh: '五六岛绝美海景、日出公园户外颂钵声浴与白莲寺祈愿静心4小时深度疗愈之旅（$170 USD）。',
  },
  description: {
    ko: '전용 차량 왕복 픽업, 영어 전문 웰니스 Expert, 오륙도 지질·해녀 스토리텔링 및 스카이워크, 해맞이 공원 야외 사운드배스, 백련사 비움과 소원 리추얼, 로컬 웰니스 기프트 포함.',
    en: 'Includes Private Pick-up/Drop-off, English Wellness Expert, Oryukdo Geology & Haenyeo Storytelling, Skywalk, Sunrise Park Outdoor Soundbath, Baekryeonsa Temple Ritual, and Local Wellness Gift.',
    ja: '専用車送迎、英語ウェルネスエキスパート、五六島地質・海女ストーリーテリング、スカイウォーク、日の出公園屋外サウンドバス、白蓮寺リチュアルを含む。',
    zh: '包含专车接送、英文健康专家、五六岛地质与海女文化讲解、天空步道体验、日出公园户外颂钵、白莲寺静心祈愿仪式及特色礼品。',
  },
  imageUrl: '/images/oryukdo_main.jpg?v=2',
  badge: {
    ko: '4시간 코스탈 리추얼',
    en: '4-Hour Coastal Ritual',
    ja: '4時間 コースタルリチュアル',
    zh: '4小时 海岸疗愈',
  },
  keyBenefits: {
    ko: ['해맞이 공원 프라이빗 사운드배스 & 싱잉볼', '오륙도 해안 스토리텔링 & 스카이워크', '백련사 비움과 소원 사찰 리추얼'],
    en: ['Sunrise Park Outdoor Soundbath & Singing Bowl', 'Oryukdo Coastal Storytelling & Skywalk', 'Baekryeonsa Temple Reflection Ritual'],
    ja: ['日の出公園 屋外サウンドバス＆シンギングボウル', '五六島ストーリーテリング＆スカイウォーク', '白蓮寺「手放しと願い」寺院リチュアル'],
    zh: ['日出公园专属户外颂钵声浴', '五六岛海岸文化讲解与天空步道', '白莲寺“放下与祈愿”禅意仪式'],
  },
  ingredients: {
    ko: '포함: 프라이빗 왕복 픽업, 영어 전문 웰니스 가이드, 해맞이 공원 사운드배스, 백련사 리추얼, 로컬 웰니스 기프트',
    en: 'Includes: Private Pick-up/Drop-off, English Wellness Expert, Soundbath Session, Temple Ritual, Local Gift',
    ja: '含まれるもの：専用車送迎、英語ウェルネスガイド、屋外サウンドバス、寺院リチュアル、記念ギフト',
    zh: '包含项目：专属接送、英文健康专家、户外声浴、寺庙仪式体验、特色纪念礼品',
  },
};

export const MOCK_PRODUCTS: WellnessProduct[] = [
  ONDO_ECO_RESONANCE_PRODUCT,
  ONDO_COASTAL_SERENITY_PRODUCT,
];

// 2. ONDO 22개 상세 피드백 문항 정의 (Part 1 ~ Part 4)
export const ONDO_SURVEY_QUESTIONS: SurveyQuestion[] = [
  // ================= Part 1. 전체적인 감성 경험 =================
  {
    id: 'ondo_q1_feeling',
    productId: 'ondo-eco-resonance-01',
    category: 'satisfaction',
    type: 'single_choice',
    required: true,
    title: {
      ko: '1. 두 프로그램을 마친 지금 느낌에 가장 가까운 것은?',
      en: '1. Which feeling best describes your state after completing the program?',
      ja: '1. プログラムを終えた今、最も近い感覚はどれですか？',
      zh: '1. 结束体验后，您现在最贴近的心境与感受是？',
    },
    options: [
      { value: 'relaxed_calm', label: { ko: '완전히 이완됨 / 고요함', en: 'Completely relaxed / Deep serenity', ja: '完全にリラックス・深い静寂', zh: '彻底放松 / 内心沉静' } },
      { value: 'novel_impressive', label: { ko: '새롭고 낯설지만 깊은 인상', en: 'Novel, exotic yet deeply impactful', ja: '新鮮で心に深く残る印象', zh: '新颖独特且印象极其深刻' } },
      { value: 'joyful_energetic', label: { ko: '즐겁고 활기찬 느낌', en: 'Joyful, uplifting & energizing', ja: '楽しく活気に満ちたエネルギー', zh: '愉悦轻盈，充满活力' } },
      { value: 'mediocre', label: { ko: '기대보다 밋밋했음', en: 'Milder than expected', ja: '期待より少し物足りなかった', zh: '略显平淡，未达预期' } },
      { value: 'other', label: { ko: '기타', en: 'Other', ja: 'その他', zh: '其他' } },
    ],
  },
  {
    id: 'ondo_q2_release_moment',
    productId: 'ondo-eco-resonance-01',
    category: 'satisfaction',
    type: 'single_choice',
    required: true,
    title: {
      ko: '2. 몸과 마음의 긴장이 가장 크게 풀렸다고 느낀 순간은?',
      en: '2. When did you feel the deepest release of mental and physical tension?',
      ja: '2. 心身の緊張が最もほぐれたと感じた瞬間はいつですか？',
      zh: '2. 您感到身心紧绷感最大程度得到释放的时刻是？',
    },
    options: [
      { value: 'pickup_transit', label: { ko: 'Pick-up 및 이동 중', en: 'During Pick-up & Transit', ja: '送迎・移動中', zh: '专车接送与路途之中' } },
      { value: 'eco_center', label: { ko: '을숙도 에코센터 / 문화 체험', en: 'Eulsukdo Eco-Center / Cultural Experience', ja: '乙淑島エコセンター・文化体験', zh: '乙淑岛生态中心与文化探索' } },
      { value: 'wildlife_center', label: { ko: '야생동물 치유센터', en: 'Wildlife Rescue & Healing Center', ja: '野生動物救護・治癒センター', zh: '野生动物救护与疗愈中心' } },
      { value: 'sunset_soundbath', label: { ko: '골든 아워 선셋 사운드배스', en: 'Golden Hour Sunset Soundbath', ja: 'ゴールデンアワー 夕日サウンドバス', zh: '黄金日落时分的颂钵声浴' } },
      { value: 'coastal_moment', label: { ko: 'Coastal Serenity 프로그램 중 특정 순간', en: 'Specific moment during Coastal Serenity', ja: 'Coastal Serenityプログラム中の特定の瞬間', zh: 'Coastal Serenity疗愈过程中的某一刻' } },
      { value: 'none', label: { ko: '딱히 없었음', en: 'Not particularly', ja: '特になかった', zh: '未特别感受到' } },
    ],
  },
  {
    id: 'ondo_q3_disruption_moment',
    productId: 'ondo-eco-resonance-01',
    category: 'satisfaction',
    type: 'single_choice',
    required: false,
    title: {
      ko: '3. 몰입이 끊기거나 아쉬웠던 순간이 있었나요?',
      en: '3. Were there any moments where immersion felt interrupted or lacking?',
      ja: '3. 没入感が途切れたり、物足りなさを感じた瞬間はありましたか？',
      zh: '3. 在体验过程中，是否有让您感到出戏或略显遗憾的环节？',
    },
    options: [
      { value: 'none', label: { ko: '없었음 (완벽한 몰입)', en: 'None (Completely Immersive)', ja: '特になかった（完璧な没入）', zh: '完全没有（全程沉浸）' } },
      { value: 'transit_waiting', label: { ko: '이동/대기 시간', en: 'Transit / Waiting time', ja: '移動・待ち時間', zh: '路途接驳或等待时间' } },
      { value: 'briefing_style', label: { ko: '설명(브리핑) 방식', en: 'Briefing / Guide explanation style', ja: '案内・ブリーフィング方法', zh: '向导讲解或流程引导方式' } },
      { value: 'session_duration', label: { ko: '세션 길이', en: 'Session duration', ja: 'セッションの長さ', zh: '具体体验环节时长' } },
      { value: 'other', label: { ko: '기타', en: 'Other', ja: 'その他', zh: '其他' } },
    ],
  },
  {
    id: 'ondo_q4_luxury_comparison',
    productId: 'ondo-eco-resonance-01',
    category: 'custom',
    type: 'single_choice',
    required: true,
    title: {
      ko: '4. 다른 럭셔리 웰니스 투어(발리, 하와이, 태국 등)와 비교했을 때 ONDO는?',
      en: '4. Compared to other luxury wellness retreats (Bali, Hawaii, Thailand, etc.), how was ONDO?',
      ja: '4. 他のラグジュアリー・ウェルネス体験（バリ、ハワイ、タイ等）と比較していかがでしたか？',
      zh: '4. 与巴厘岛、夏威夷、泰国等全球高端奢华康养体验相比，ONDO的表现如何？',
    },
    options: [
      { value: 'much_more_special', label: { ko: '훨씬 더 특별했다', en: 'Far more special and distinctive', ja: 'はるかに特別でユニークだった', zh: '更加独特且令人惊艳' } },
      { value: 'similar_level', label: { ko: '비슷한 수준이었다', en: 'On a similar high level', ja: '同等の高い水準だった', zh: '处于同等高端水准' } },
      { value: 'below_expectation', label: { ko: '기대에 못 미쳤다', en: 'Fell below expectations', ja: '期待に届かなかった', zh: '略低于原本预期' } },
      { value: 'no_comparison', label: { ko: '비교 대상 경험 없음', en: 'No prior comparable experience', ja: '比較対象の経験なし', zh: '此前无类似高端体验' } },
    ],
  },
  {
    id: 'ondo_q5_expertise_emotion',
    productId: 'ondo-eco-resonance-01',
    category: 'satisfaction',
    type: 'single_choice',
    required: true,
    title: {
      ko: '5. "Where Expertise Meets Emotion" — 이 문구가 실제로 느껴졌나요?',
      en: '5. "Where Expertise Meets Emotion" — Did you genuinely feel this philosophy?',
      ja: '5. 「Where Expertise Meets Emotion（専門性と感性の融合）」を実感できましたか？',
      zh: '5. 您是否真正感受到了“专业与情感的极致融合（Where Expertise Meets Emotion）”？',
    },
    options: [
      { value: 'strongly_yes', label: { ko: '매우 그랬다', en: 'Strongly Agree', ja: '非常にそう感じた', zh: '非常赞同，深有共鸣' } },
      { value: 'somewhat_yes', label: { ko: '어느 정도 그랬다', en: 'Somewhat Agree', ja: 'ある程度感じた', zh: '部分环节有此感受' } },
      { value: 'not_really', label: { ko: '별로 느끼지 못했다', en: 'Not really', ja: 'あまり感じられなかった', zh: '未能充分感受到' } },
    ],
  },

  // ================= Part 2. 웰니스 요소 상세 평가 =================
  {
    id: 'ondo_q6_soundbath_length',
    productId: 'ondo-eco-resonance-01',
    category: 'texture_scent',
    type: 'single_choice',
    required: true,
    title: {
      ko: '6. 사운드배스 & 싱잉볼 세션 길이는 어땠나요?',
      en: '6. How was the duration of the Soundbath & Singing Bowl session?',
      ja: '6. サウンドバス＆シンギングボウル セションの長さはいかがでしたか？',
      zh: '6. 颂钵声浴与声音疗愈环节的时长体验如何？',
    },
    options: [
      { value: 'too_short', label: { ko: '너무 짧았다', en: 'Too short', ja: '短すぎた', zh: '过短，意犹未尽' } },
      { value: 'just_right', label: { ko: '적절했다', en: 'Just right & balanced', ja: 'ちょうど良かった', zh: '恰到好处' } },
      { value: 'prefer_longer', label: { ko: '더 길었으면 했다', en: 'Would prefer it longer', ja: 'もっと長い方が良かった', zh: '希望可以再延长' } },
    ],
  },
  {
    id: 'ondo_q7_physical_reaction',
    productId: 'ondo-eco-resonance-01',
    category: 'efficacy',
    type: 'multi_choice',
    required: false,
    title: {
      ko: '7. 사운드배스 세션 중 나타난 신체 반응은? (해당 항목 모두 선택)',
      en: '7. What bodily sensations did you experience during the session? (Select all that apply)',
      ja: '7. セッション中に実感した身体の変化は？（複数選択可）',
      zh: '7. 在声浴疗愈过程中，您有哪些身体层面的直观反应？（可多选）',
    },
    options: [
      { value: 'slow_breathing', label: { ko: '호흡이 느려짐', en: 'Slower, deeper breathing', ja: '呼吸が深まり穏やかになった', zh: '呼吸显著放缓且深沉' } },
      { value: 'drowsy_sleep', label: { ko: '졸림 / 잠들 뻔함', en: 'Drowsiness / Fell into theta sleep', ja: '心地よい眠気・うとうとした', zh: '产生舒适睡意 / 几乎入眠' } },
      { value: 'tears_emotional', label: { ko: '눈물 또는 울컥함', en: 'Emotional release / Tears', ja: '涙・感情の解放', zh: '涌出泪水或内心情绪释放' } },
      { value: 'deep_relaxation', label: { ko: '몸의 힘이 빠짐 (완전 이완)', en: 'Total bodily muscle decompression', ja: '体の力が抜け完全な脱力感', zh: '全身肌肉彻底卸下力道与防备' } },
      { value: 'no_reaction', label: { ko: '특별한 반응 없음', en: 'No specific reaction', ja: '特別な変化なし', zh: '无明显特殊反应' } },
    ],
  },
  {
    id: 'ondo_q8_environment_pref',
    productId: 'ondo-eco-resonance-01',
    category: 'custom',
    type: 'single_choice',
    required: true,
    title: {
      ko: '8. 선호하는 세션 환경은?',
      en: '8. Which session environment do you prefer?',
      ja: '8. 好みのセッション環境はどれですか？',
      zh: '8. 您更偏好在何种环境氛围下进行声音疗愈？',
    },
    options: [
      { value: 'outdoor_nature', label: { ko: '자연음이 있는 야외 (갈대밭/잔디밭 등)', en: 'Outdoor nature with ambient sounds (Reeds, breeze, birds)', ja: '自然の音が心地よい屋外（葦原・芝生など）', zh: '带有自然白噪音的户外（芦苇荡/草坪微风）' } },
      { value: 'quiet_indoor', label: { ko: '조용한 실내', en: 'Quiet, serene indoor space', ja: '静寂な室内空間', zh: '绝对安静典雅的室内私密空间' } },
      { value: 'both_good', label: { ko: '상관없음 / 둘 다 좋음', en: 'Both are wonderful / No preference', ja: 'どちらも素晴らしい・こだわりなし', zh: '皆很喜欢 / 无特殊限制' } },
    ],
  },
  {
    id: 'ondo_q9_stress_before',
    productId: 'ondo-eco-resonance-01',
    category: 'efficacy',
    type: 'single_choice',
    required: true,
    title: {
      ko: '9. 프로그램 시작 전 스트레스 수준은?',
      en: '9. What was your stress level BEFORE the program?',
      ja: '9. プログラム開始前のストレスレベルは？',
      zh: '9. 参与本疗愈项目之前，您的日常压力水平如何？',
    },
    options: [
      { value: 'low_1_3', label: { ko: '낮음 (1~3)', en: 'Low (1-3)', ja: '低い (1~3)', zh: '较低 (1~3分)' } },
      { value: 'medium_4_6', label: { ko: '보통 (4~6)', en: 'Moderate (4-6)', ja: '普通 (4~6)', zh: '中等 (4~6分)' } },
      { value: 'high_7_10', label: { ko: '높음 (7~10)', en: 'High (7-10)', ja: '高い (7~10)', zh: '较高/沉重 (7~10分)' } },
    ],
  },
  {
    id: 'ondo_q10_stress_after',
    productId: 'ondo-eco-resonance-01',
    category: 'efficacy',
    type: 'single_choice',
    required: true,
    title: {
      ko: '10. 프로그램 종료 후 스트레스 수준은?',
      en: '10. What is your stress level AFTER the program?',
      ja: '10. プログラム終了後のストレスレベルは？',
      zh: '10. 体验结束后，您当前的压力水平变为？',
    },
    options: [
      { value: 'low_1_3', label: { ko: '낮음 (1~3) - 스트레스 해소됨', en: 'Low (1-3) - Deeply Relieved', ja: '低い (1~3) - すっきり解消', zh: '非常低 (1~3分) - 压力显著消散' } },
      { value: 'medium_4_6', label: { ko: '보통 (4~6)', en: 'Moderate (4-6)', ja: '普通 (4~6)', zh: '中等 (4~6分)' } },
      { value: 'high_7_10', label: { ko: '높음 (7~10)', en: 'High (7-10)', ja: '高い (7~10)', zh: '仍较高 (7~10分)' } },
    ],
  },
  {
    id: 'ondo_q11_body_change',
    productId: 'ondo-eco-resonance-01',
    category: 'efficacy',
    type: 'multi_choice',
    required: false,
    title: {
      ko: '11. 신체적으로 느낀 변화는? (해당 항목 모두 선택)',
      en: '11. What physical improvements did you notice? (Select all that apply)',
      ja: '11. 身体的に実感した変化はどれですか？（複数選択可）',
      zh: '11. 体验后您切身感受到了哪些身体益处？（可多选）',
    },
    options: [
      { value: 'neck_shoulder_release', label: { ko: '어깨/목 긴장 완화', en: 'Relief in neck & shoulder stiffness', ja: '肩や首のこり・緊張の緩和', zh: '肩颈酸痛与紧绷感舒缓' } },
      { value: 'sleep_induction', label: { ko: '수면 유도 효과 (숙면 준비)', en: 'Sleep readiness / Deep restoration', ja: '安眠・快眠への導き効果', zh: '改善失眠，唤醒深度睡眠渴望' } },
      { value: 'digestive_comfort', label: { ko: '소화/속 편안함', en: 'Digestive ease & visceral calm', ja: '胃腸の落ち着き・お腹の安らぎ', zh: '肠胃舒适放松' } },
      { value: 'headache_relief', label: { ko: '두통·긴장 완화', en: 'Headache & mental tension relief', ja: '頭痛や頭の重さの解消', zh: '头部偏头痛或用脑过度紧绷感消退' } },
      { value: 'no_change', label: { ko: '특별한 변화 없음', en: 'No noticeable change', ja: '特に変化なし', zh: '无明显特殊变化' } },
    ],
  },
  {
    id: 'ondo_q12_guide_care',
    productId: 'ondo-eco-resonance-01',
    category: 'satisfaction',
    type: 'single_choice',
    required: true,
    title: {
      ko: '12. 전담 웰니스 가이드의 케어가 "치유 경험"에 기여한 정도는?',
      en: '12. How much did the dedicated Wellness Guide contribute to your healing experience?',
      ja: '12. 専任ウェルネスガイドのケアは「癒やしの体験」にどの程度貢献しましたか？',
      zh: '12. 专属健康向导的专业陪伴与悉心关怀对您的“疗愈体验”起到了多大助力？',
    },
    options: [
      { value: 'very_high', label: { ko: '매우 크게 기여함 (전문성과 배려 탁월)', en: 'Crucial contribution (Exemplary care)', ja: '非常に大きく貢献（プロフェッショナルな配慮）', zh: '极其关键且不可或缺（高度专业贴心）' } },
      { value: 'moderate', label: { ko: '어느 정도 기여함', en: 'Moderate contribution', ja: 'ある程度貢献した', zh: '起到了一定助力' } },
      { value: 'low_impact', label: { ko: '큰 영향 없었음', en: 'Minimal impact', ja: 'あまり影響はなかった', zh: '影响不大' } },
    ],
  },
  {
    id: 'ondo_q13_briefing_style',
    productId: 'ondo-eco-resonance-01',
    category: 'satisfaction',
    type: 'single_choice',
    required: true,
    title: {
      ko: '13. 설명/브리핑 방식은 어땠나요?',
      en: '13. How was the briefing and storytelling delivery?',
      ja: '13. 説明・ブリーフィングの進行はいかがでしたか？',
      zh: '13. 向导的背景故事讲解与流程引导体验如何？',
    },
    options: [
      { value: 'helped_immersion', label: { ko: '몰입에 큰 도움이 됨', en: 'Greatly enriched immersion', ja: '深い没入にとても役立った', zh: '极大提升了文化与身心沉浸感' } },
      { value: 'appropriate', label: { ko: '적당했음', en: 'Appropriate & balanced', ja: 'ちょうど良かった', zh: '恰如其分' } },
      { value: 'too_much', label: { ko: '너무 많았음 / 방해가 됨', en: 'Too much / Slightly distracting', ja: '多すぎて少し集中が途切れた', zh: '讲解过多，略有打扰' } },
      { value: 'needed_more', label: { ko: '좀 더 필요했음', en: 'Would love more background details', ja: 'もう少し詳しい説明が欲しかった', zh: '希望了解更多背景故事' } },
    ],
  },

  // ================= Part 3. 데이터 보강 질문 =================
  {
    id: 'ondo_q14_companion_group',
    productId: 'ondo-eco-resonance-01',
    category: 'custom',
    type: 'single_choice',
    required: true,
    title: {
      ko: '14. 오늘 함께한 인원 구성은?',
      en: '14. Who did you participate with today?',
      ja: '14. 本日ご一緒された同伴者の構成は？',
      zh: '14. 您今日一同参与体验的同行人员构成为？',
    },
    options: [
      { value: 'solo', label: { ko: '1인 (솔로)', en: 'Solo Traveler', ja: '1名（ソロ）', zh: '独自一人（自由行）' } },
      { value: 'couple', label: { ko: '커플 / 부부', en: 'Couple / Partner', ja: 'カップル・夫婦', zh: '情侣 / 伴侣' } },
      { value: 'family', label: { ko: '가족', en: 'Family', ja: '家族', zh: '家庭同行' } },
      { value: 'friends', label: { ko: '친구 그룹', en: 'Friends Group', ja: '友人グループ', zh: '朋友结伴' } },
      { value: 'business_mice', label: { ko: '비즈니스 / MICE 동반', en: 'Business / MICE Colleagues', ja: 'ビジネス・MICE同伴', zh: '商务出差 / MICE团组' } },
    ],
  },
  {
    id: 'ondo_q15_hesitation_reason',
    productId: 'ondo-eco-resonance-01',
    category: 'pricing',
    type: 'single_choice',
    required: false,
    title: {
      ko: '15. 예약 전 가장 망설여졌던 이유는?',
      en: '15. What was your biggest hesitation before booking?',
      ja: '15. 予約前に最もためらった理由は何ですか？',
      zh: '15. 在预订本项目之前，最让您产生疑虑或犹豫的原因是？',
    },
    options: [
      { value: 'price', label: { ko: '가격', en: 'Price Point', ja: '価格', zh: '价格门槛' } },
      { value: 'lack_of_info', label: { ko: 'ONDO에 대한 정보/신뢰 부족', en: 'Lack of brand awareness / info on ONDO', ja: 'ONDOについての情報・信頼性の不足', zh: '对ONDO品牌知名度与信息了解不足' } },
      { value: 'hard_to_imagine', label: { ko: '프로그램 내용이 상상이 안 감', en: 'Hard to visualize the actual experience', ja: '体験内容が具体的に想像できなかった', zh: '难以想象实际体验环节与成效' } },
      { value: 'no_hesitation', label: { ko: '망설임 없었음', en: 'No hesitation at all', ja: '迷いはなかった', zh: '毫无犹豫，果断预订' } },
      { value: 'other', label: { ko: '기타', en: 'Other', ja: 'その他', zh: '其他' } },
    ],
  },
  {
    id: 'ondo_q16_revisit_version',
    productId: 'ondo-eco-resonance-01',
    category: 'custom',
    type: 'single_choice',
    required: true,
    title: {
      ko: '16. 다시 참여한다면 어떤 버전이 가장 끌리시나요?',
      en: '16. If you rejoin, which edition appeals to you most?',
      ja: '16. 再び参加される場合、どのバージョンが最も魅力的ですか？',
      zh: '16. 若未来再次参与，您最期待体验哪种特别定制版本？',
    },
    options: [
      { value: 'sunset_same', label: { ko: '지금과 동일 (골든아워 선셋)', en: 'Same as current (Golden Hour Sunset)', ja: '現在と同じ（夕日サンセット）', zh: '保持同款（黄金日落篇）' } },
      { value: 'sunrise_edition', label: { ko: '일출 (Sunrise) 버전', en: 'Sunrise Dawn Awakening Edition', ja: '日の出（サンライズ）バージョン', zh: '日出破晓晨光篇（Sunrise）' } },
      { value: 'winter_rain_alt', label: { ko: '우기/겨울 테라피 대체 프로그램', en: 'Rainy / Winter Cozy Indoor Therapy', ja: '雨季・冬のインドア特別プログラム', zh: '雨季/冬季暖心沉浸式疗愈替代篇' } },
      { value: 'not_sure', label: { ko: '잘 모르겠음', en: 'Not sure yet', ja: 'まだわからない', zh: '暂不确定' } },
    ],
  },
  {
    id: 'ondo_q17_bundled_experience',
    productId: 'ondo-eco-resonance-01',
    category: 'custom',
    type: 'multi_choice',
    required: false,
    title: {
      ko: '17. 체류 중 함께 경험하고 싶은 것은? (해당 항목 모두 선택)',
      en: '17. Which paired experiences would you love during your stay? (Select all that apply)',
      ja: '17. 滞在中に合わせて体験したいものは何ですか？（複数選択可）',
      zh: '17. 在釜山/韩国停留期间，您还期待同时体验哪些高端定制项目？（可多选）',
    },
    options: [
      { value: 'yacht_wellness', label: { ko: '요트 웰니스 (Yacht Wellness)', en: 'Luxury Yacht Wellness & Cruise', ja: 'ヨット・ウェルネスクルーズ', zh: '奢华游艇海上颂钵与微风调理' } },
      { value: 'hanbang_spa', label: { ko: '한방 스파 & 헤리티지 케어', en: 'Korean Herbal (Hanbang) Spa Therapy', ja: '韓方スパ＆ヘリテージケア', zh: '传统韩方草本水疗与经络养护' } },
      { value: 'gourmet_dining', label: { ko: '미식 다이닝 (Gourmet Dining)', en: 'Bespoke Gourmet Farm-to-Table Dining', ja: '厳選グルメ・ファインダイニング', zh: '高端养生米其林/在地美馔私享晚宴' } },
      { value: 'none', label: { ko: '추가 희망 없음', en: 'No additional request', ja: '特に追加希望なし', zh: '暂无其他附加需求' } },
      { value: 'other', label: { ko: '기타', en: 'Other', ja: 'その他', zh: '其他' } },
    ],
  },
  {
    id: 'ondo_q18_nps_recommendation',
    productId: 'ondo-eco-resonance-01',
    category: 'satisfaction',
    type: 'single_choice',
    required: true,
    title: {
      ko: '18. 지인에게 ONDO 프로그램을 추천할 의향은?',
      en: '18. How likely are you to recommend ONDO to friends or colleagues?',
      ja: '18. ご友人や知人にONDOプログラムをおすすめしたいですか？',
      zh: '18. 您向身边的挚友或同行推荐ONDO疗愈项目的意愿如何？',
    },
    options: [
      { value: 'promoter_9_10', label: { ko: '매우 추천함 (9~10점)', en: 'Highly Recommend (9-10)', ja: 'ぜひおすすめしたい（9〜10点）', zh: '极力推荐 (9~10分)' } },
      { value: 'passive_7_8', label: { ko: '추천하는 편 (7~8점)', en: 'Likely Recommend (7-8)', ja: 'おすすめしたい（7〜8点）', zh: '愿意推荐 (7~8分)' } },
      { value: 'neutral_5_6', label: { ko: '보통 (5~6점)', en: 'Neutral (5-6)', ja: '普通（5〜6点）', zh: '一般 / 中立 (5~6分)' } },
      { value: 'detractor_0_4', label: { ko: '추천하지 않음 (0~4점)', en: 'Not Recommend (0-4)', ja: 'おすすめしない（0〜4点）', zh: '暂不推荐 (0~4分)' } },
    ],
  },
  {
    id: 'ondo_q19_sns_sharing',
    productId: 'ondo-eco-resonance-01',
    category: 'custom',
    type: 'single_choice',
    required: true,
    title: {
      ko: '19. 오늘 경험을 SNS(인스타, 틱톡, 샤오홍슈 등)에 공유하고 싶은 마음이 들었나요?',
      en: '19. Do you feel inspired to share this experience on Social Media (Instagram, TikTok, Xiaohongshu)?',
      ja: '19. 本日の体験をSNS（Instagram、小紅書等）にシェアしたいと思いましたか？',
      zh: '19. 您是否有意愿将今日的惊艳体验分享到社交媒体（小红书、Instagram等）？',
    },
    options: [
      { value: 'already_or_will_share', label: { ko: '이미 공유했거나 꼭 할 것', en: 'Already shared or definitely will post', ja: 'すでに投稿した、または必ずシェアする', zh: '已发布或一定会分享打卡' } },
      { value: 'considering', label: { ko: '고민 중', en: 'Considering / Might share photos', ja: '検討中', zh: '正在整理照片，考虑发布' } },
      { value: 'no_plan', label: { ko: '공유할 생각 없음 (프라이빗 소장)', en: 'Prefer keeping it private / No plan', ja: 'シェアの予定なし（個人的に大切にする）', zh: '偏好私藏珍存，暂无公开发布计划' } },
    ],
  },

  // ================= Part 4. 자유 의견 (총 3개) =================
  {
    id: 'ondo_q20_best_scene',
    productId: 'ondo-eco-resonance-01',
    category: 'custom',
    type: 'text',
    required: false,
    title: {
      ko: '20. 오늘 경험 중 가장 기억에 남는 한 장면을 자유롭게 적어주세요.',
      en: '20. Please describe the single most unforgettable scene or moment from today.',
      ja: '20. 本日の体験の中で最も心に残ったワンシーンを自由にご記入ください。',
      zh: '20. 请自由描述今天全程中让您最难以忘怀的一个震撼画面或瞬间。',
    },
    placeholder: {
      ko: '예: 갈대밭 위로 노을이 지며 싱잉볼의 묵직한 울림이 온몸을 감싸던 순간...',
      en: 'e.g., The golden sunset glowing over reed fields while deep singing bowl resonance embraced my senses...',
      ja: '例：夕日が葦原を黄金色に染め、シンギングボウルの深い響きに包まれた瞬間...',
      zh: '例如：夕阳将芦苇荡染成金黄色，沉浑清透的颂钵声波拂过全身的那一刻...',
    },
  },
  {
    id: 'ondo_q21_next_season_wishes',
    productId: 'ondo-eco-resonance-01',
    category: 'custom',
    type: 'text',
    required: false,
    title: {
      ko: '21. 다음 시즌 프로그램에 꼭 반영됐으면 하는 점이 있다면?',
      en: '21. What enhancements or new elements would you love to see in our next season?',
      ja: '21. 次期シーズンのプログラムにぜひ取り入れてほしい点があれば教えてください。',
      zh: '21. 您期望在ONDO下一季度的全新升级项目中见到哪些创新元素或改进？',
    },
    placeholder: {
      ko: '예: 세션 후 따뜻한 허브 블렌딩 티 타임이 추가되면 좋겠습니다...',
      en: 'e.g., Adding a warm artisanal herbal tea ceremony post-soundbath...',
      ja: '例：セッション後に温かいハーブティーを楽しむ時間がもっとあると嬉しいです...',
      zh: '例如：希望在颂钵声浴结束后增加一段温热定制草本茶叙时刻...',
    },
  },
  {
    id: 'ondo_q22_words_to_team',
    productId: 'ondo-eco-resonance-01',
    category: 'custom',
    type: 'text',
    required: false,
    title: {
      ko: '22. ONDO 팀에게 직접 전하고 싶은 말이 있다면 남겨주세요.',
      en: '22. Any personal message or warm feedback you would like to share with the ONDO team?',
      ja: '22. ONDOチームへ直接伝えたいメッセージがあればご自由にお書きください。',
      zh: '22. 您想对全程陪伴的ONDO团队说些什么？欢迎留下您的真实心声。',
    },
    placeholder: {
      ko: 'ONDO 팀의 정성과 따뜻한 케어에 대한 솔직한 응원과 피드백을 남겨주세요.',
      en: 'Share your authentic thoughts and encouragement for the ONDO team.',
      ja: 'ONDOチームへの温かいメッセージや率直なご感想をお聞かせください。',
      zh: '请留下您对ONDO团队用心款待与细致疗愈的真实寄语。',
    },
  },
];

// 3. Program #2 Coastal Serenity 26개 상세 피드백 문항 정의 (Part 1 ~ Part 4)
export const ONDO_COASTAL_SURVEY_QUESTIONS: SurveyQuestion[] = [
  // ================= Part 1. 전체적인 감성 경험 =================
  {
    id: 'ondo_cs_q1_feeling',
    productId: 'ondo-coastal-serenity-02',
    category: 'satisfaction',
    type: 'single_choice',
    required: true,
    title: {
      ko: '1. 오늘 Coastal Serenity를 마친 지금 느낌에 가장 가까운 것은?',
      en: '1. Which feeling best describes your state after completing Coastal Serenity today?',
      ja: '1. 本日のCoastal Serenityを終えた今、最も近い感覚はどれですか？',
      zh: '1. 结束今天的Coastal Serenity体验后，最贴近您此刻心境的感受是？',
    },
    options: [
      { value: 'relaxed_calm', label: { ko: '완전히 이완됨 / 고요함', en: 'Completely relaxed / Deep serenity', ja: '完全にリラックス・深い静寂', zh: '彻底放松 / 内心沉静' } },
      { value: 'novel_impressive', label: { ko: '새롭고 낯설지만 깊은 인상', en: 'Novel, exotic yet deeply impactful', ja: '新鮮で心に深く残る印象', zh: '新颖独特且印象极其深刻' } },
      { value: 'joyful_energetic', label: { ko: '즐겁고 활기찬 느낌', en: 'Joyful, uplifting & energizing', ja: '楽しく活気に満ちたエネルギー', zh: '愉悦轻盈，充满活力' } },
      { value: 'mediocre', label: { ko: '기대보다 밋밋했음', en: 'Milder than expected', ja: '期待より少し物足りなかった', zh: '略显平淡，未达预期' } },
      { value: 'other', label: { ko: '기타', en: 'Other', ja: 'その他', zh: '其他' } },
    ],
  },
  {
    id: 'ondo_cs_q2_tension_release',
    productId: 'ondo-coastal-serenity-02',
    category: 'satisfaction',
    type: 'single_choice',
    required: true,
    title: {
      ko: '2. 몸과 마음의 긴장이 가장 크게 풀렸다고 느낀 순간은?',
      en: '2. When did you feel the deepest release of mental and physical tension?',
      ja: '2. 心身の緊張が最もほぐれたと感じた瞬間はいつですか？',
      zh: '2. 您感到身心紧绷感最大程度得到释放的时刻是？',
    },
    options: [
      { value: 'pickup_transit', label: { ko: 'Pick-up 및 이동 중', en: 'During Pick-up & Transit', ja: '送迎・移動中', zh: '专车接送与路途之中' } },
      { value: 'oryukdo_skywalk', label: { ko: '오륙도 해안 / 스카이워크 (자연 경외)', en: 'Oryukdo Coast & Skywalk (Awe of Nature)', ja: '五六島海岸・スカイウォーク（大自然への畏敬）', zh: '五六岛海岸与天空步道（自然敬畏）' } },
      { value: 'haemaji_soundbath', label: { ko: '해맞이 공원 프라이빗 사운드배스', en: 'Sunrise Park Private Soundbath', ja: '日の出公園 プライベート・サウンドバス', zh: '日出公园专属户外颂钵声浴' } },
      { value: 'baekryeonsa_ritual', label: { ko: '백련사 리추얼 (비움과 소원)', en: 'Baekryeonsa Ritual (Letting Go & Wishing)', ja: '白蓮寺リチュアル（手放しと願い）', zh: '白莲寺仪式（断舍离与祈愿）' } },
      { value: 'none', label: { ko: '딱히 없었음', en: 'Not particularly', ja: '特になかった', zh: '未特别感受到' } },
    ],
  },
  {
    id: 'ondo_cs_q3_immersion_break',
    productId: 'ondo-coastal-serenity-02',
    category: 'satisfaction',
    type: 'single_choice',
    required: false,
    title: {
      ko: '3. 몰입이 끊기거나 아쉬웠던 순간이 있었나요?',
      en: '3. Were there any moments where immersion felt interrupted or lacking?',
      ja: '3. 没入感が途切れたり、物足りなさを感じた瞬間はありましたか？',
      zh: '3. 在体验过程中，是否有让您感到出戏或略显遗憾的环节？',
    },
    options: [
      { value: 'none', label: { ko: '없었음', en: 'None (Completely Immersive)', ja: '特になかった（完璧な没入）', zh: '完全没有（全程沉浸）' } },
      { value: 'transit_waiting', label: { ko: '이동/대기 시간 (하산 차량 포함)', en: 'Transit / Waiting time (including descent vehicle)', ja: '移動・待ち時間（下山車両含む）', zh: '接驳/等待时间（含下山乘车）' } },
      { value: 'briefing_style', label: { ko: '설명(브리핑) 방식', en: 'Briefing / Explanation style', ja: '案内・ブリーフィング方法', zh: '讲解说明方式' } },
      { value: 'session_duration', label: { ko: '세션 길이', en: 'Session duration', ja: 'セッションの長さ', zh: '体验时长' } },
      { value: 'other', label: { ko: '기타', en: 'Other', ja: 'その他', zh: '其他' } },
    ],
  },
  {
    id: 'ondo_cs_q4_luxury_comparison',
    productId: 'ondo-coastal-serenity-02',
    category: 'satisfaction',
    type: 'single_choice',
    required: true,
    title: {
      ko: '4. 다른 럭셔리 웰니스 투어(발리, 하와이, 태국 등)와 비교했을 때 ONDO는?',
      en: '4. Compared to other luxury wellness tours (Bali, Hawaii, Thailand, etc.), how was ONDO?',
      ja: '4. 他のラグジュアリー・ウェルネスツアー（バリ、ハワイ、タイなど）と比較してONDOはいかがでしたか？',
      zh: '4. 与其他高端奢华疗愈之旅（如巴厘岛、夏威夷、泰国等）相比，ONDO的体验如何？',
    },
    options: [
      { value: 'much_more_special', label: { ko: '훨씬 더 특별했다', en: 'Far more unique & bespoke', ja: 'はるかに特別だった', zh: '远比以往更加独特深刻' } },
      { value: 'similar_level', label: { ko: '비슷한 수준이었다', en: 'Comparable in luxury & service', ja: '同等の素晴らしい水準だった', zh: '水准相当，品质在线' } },
      { value: 'below_expectation', label: { ko: '기대에 못 미쳤다', en: 'Fell short of expectations', ja: '期待に届かなかった', zh: '略逊一筹，未达期待' } },
      { value: 'no_benchmark', label: { ko: '비교 대상 경험 없음', en: 'No prior comparable experience', ja: '比較する経験がない', zh: '暂无类似高端疗愈经历可比' } },
    ],
  },
  {
    id: 'ondo_cs_q5_redefining_you',
    productId: 'ondo-coastal-serenity-02',
    category: 'satisfaction',
    type: 'single_choice',
    required: true,
    title: {
      ko: '5. "Redefining Travel. Redefining YOU." — 이 문구가 실제로 느껴졌나요?',
      en: '5. "Redefining Travel. Redefining YOU." — Did you truly feel this philosophy in your experience?',
      ja: '5. 「Redefining Travel. Redefining YOU.」— このメッセージを実際に実感できましたか？',
      zh: '5. “Redefining Travel. Redefining YOU.” — 您在全程中是否真正感受到了这一重塑自我的理念？',
    },
    options: [
      { value: 'strongly_felt', label: { ko: '매우 그랬다', en: 'Strongly agreed / Deeply felt', ja: '強く実感できた', zh: '非常契合，感受极其深刻' } },
      { value: 'somewhat_felt', label: { ko: '어느 정도 그랬다', en: 'Somewhat felt', ja: 'ある程度実感できた', zh: '部分环节有所感悟' } },
      { value: 'hardly_felt', label: { ko: '별로 느끼지 못했다', en: 'Hardly felt', ja: 'あまり実感できなかった', zh: '感受不明显' } },
    ],
  },

  // ================= Part 2. 웰니스 요소 상세 평가 =================
  // [오륙도 해안 & 스카이워크 체험]
  {
    id: 'ondo_cs_q6_storytelling',
    productId: 'ondo-coastal-serenity-02',
    category: 'custom',
    type: 'single_choice',
    required: true,
    title: {
      ko: '6. 오륙도 지질·해녀 스토리텔링이 여정 몰입에 도움이 되었나요?',
      en: '6. Did the Oryukdo geology and Haenyeo storytelling help deepen your immersion?',
      ja: '6. 五六島の地質や海女のストーリーテリングは旅への没入に役立ちましたか？',
      zh: '6. 五六岛的地质历史与海女故事是否对您的沉浸体验有所帮助？',
    },
    options: [
      { value: 'very_helpful', label: { ko: '매우 도움됨', en: 'Very helpful & inspiring', ja: '大変役に立った', zh: '非常有帮助，引人入胜' } },
      { value: 'somewhat_helpful', label: { ko: '어느 정도 도움됨', en: 'Somewhat helpful', ja: 'ある程度役に立った', zh: '有所帮助' } },
      { value: 'little_impact', label: { ko: '큰 영향 없었음', en: 'Neutral / Little impact', ja: 'あまり影響はなかった', zh: '影响不大' } },
    ],
  },
  {
    id: 'ondo_cs_q7_skywalk',
    productId: 'ondo-coastal-serenity-02',
    category: 'custom',
    type: 'single_choice',
    required: true,
    title: {
      ko: '7. 스카이워크 체험은 어땠나요?',
      en: '7. How was your experience at the Oryukdo Skywalk?',
      ja: '7. スカイウォークの体験はいかがでしたか？',
      zh: '7. 天空步道（Skywalk）的体验感受如何？',
    },
    options: [
      { value: 'impressive', label: { ko: '인상 깊었다 (하이라이트)', en: 'Very impressive (Highlight)', ja: 'とても印象的だった（ハイライト）', zh: '令人难忘（高光时刻）' } },
      { value: 'good', label: { ko: '괜찮았다', en: 'It was good', ja: '良かった', zh: '挺不错的' } },
      { value: 'disappointing', label: { ko: '아쉬웠다 (고소공포 등)', en: 'Disappointing (Fear of heights, etc.)', ja: '少し残念・怖かった（高所恐怖症など）', zh: '略显遗憾（恐高或其他原因）' } },
      { value: 'not_experienced', label: { ko: '체험하지 못함', en: 'Did not experience', ja: '体験しなかった', zh: '未参与体验' } },
    ],
  },

  // [프라이빗 사운드배스 & 싱잉볼]
  {
    id: 'ondo_cs_q8_soundbath_length',
    productId: 'ondo-coastal-serenity-02',
    category: 'custom',
    type: 'single_choice',
    required: true,
    title: {
      ko: '8. 사운드배스 세션 길이는 어땠나요?',
      en: '8. How did you feel about the soundbath session duration?',
      ja: '8. サウンドバスセッションの長さはいかがでしたか？',
      zh: '8. 颂钵声浴的体验时长感觉如何？',
    },
    options: [
      { value: 'too_short', label: { ko: '너무 짧았다', en: 'Too short', ja: '短すぎた', zh: '太短了，意犹未尽' } },
      { value: 'just_right', label: { ko: '적절했다', en: 'Just right / Ideal', ja: 'ちょうど良かった', zh: '时间恰到好处' } },
      { value: 'wish_longer', label: { ko: '더 길었으면 했다', en: 'Wished it were longer', ja: 'もう少し長いと嬉しかった', zh: '希望时间能更长一些' } },
    ],
  },
  {
    id: 'ondo_cs_q9_physical_response',
    productId: 'ondo-coastal-serenity-02',
    category: 'custom',
    type: 'multi_choice',
    required: false,
    title: {
      ko: '9. 세션 중 나타난 신체 반응은? (해당 항목 모두 선택)',
      en: '9. What physical sensations or responses did you experience during the session? (Select all that apply)',
      ja: '9. セッション中に感じた身体の反応は？（当てはまるものすべて選択）',
      zh: '9. 在声浴过程中，您感受到了哪些身体反应？（可多选）',
    },
    options: [
      { value: 'slow_breathing', label: { ko: '호흡이 느려짐', en: 'Breathing slowed down deeply', ja: '呼吸が深くゆっくりになった', zh: '呼吸变得深长缓慢' } },
      { value: 'sleepiness', label: { ko: '졸림 / 잠들 뻔함', en: 'Fell asleep or deeply drowsy', ja: '眠気・うとうとと眠りかけた', zh: '困倦袭来 / 几乎入睡' } },
      { value: 'emotional_tears', label: { ko: '눈물 또는 울컥함', en: 'Emotional release / Tears', ja: '涙や胸が熱くなる感覚', zh: '情绪涌动 / 热泪盈眶' } },
      { value: 'body_release', label: { ko: '몸의 힘이 빠짐 (이완)', en: 'Profound muscle release & relaxation', ja: '体の力が抜け脱力・脱力感', zh: '全身肌肉彻底卸力放松' } },
      { value: 'no_reaction', label: { ko: '특별한 반응 없음', en: 'No noticeable change', ja: '特別な反応はなかった', zh: '无特别生理反应' } },
    ],
  },
  {
    id: 'ondo_cs_q10_outdoor_vs_indoor',
    productId: 'ondo-coastal-serenity-02',
    category: 'custom',
    type: 'single_choice',
    required: true,
    title: {
      ko: '10. 해맞이 공원(야외)에서의 사운드배스, 실내였다면 느낌이 달랐을까요?',
      en: '10. If the soundbath at Sunrise Park were held indoors instead of outdoors, would it feel different?',
      ja: '10. 日の出公園（屋外）でのサウンドバス、もし屋内だったなら印象は違っていたでしょうか？',
      zh: '10. 在日出公园（户外）进行的颂钵声浴，如果换作室内进行，感受会有何不同？',
    },
    options: [
      { value: 'outdoor_better', label: { ko: '야외라서 더 좋았다', en: 'Better because it was outdoors in nature', ja: '屋外だからこそ素晴らしかった', zh: '置身户外大自然中感觉更好' } },
      { value: 'similar', label: { ko: '실내였어도 비슷했을 것', en: 'Would be similar indoors', ja: '屋内でも同様に良かったと思う', zh: '在室内应该也差不多' } },
      { value: 'indoor_better', label: { ko: '실내가 더 좋았을 것 같다', en: 'Indoor might have been better', ja: '屋内のほうが良かったかもしれない', zh: '在室内也许会更舒适' } },
    ],
  },

  // [백련사 리추얼 (사찰 기반 성찰)]
  {
    id: 'ondo_cs_q11_temple_ritual',
    productId: 'ondo-coastal-serenity-02',
    category: 'custom',
    type: 'single_choice',
    required: true,
    title: {
      ko: '11. 백련사에서의 "비움과 소원" 리추얼이 의미 있게 느껴졌나요?',
      en: '11. Was the "Letting Go & Wishing" ritual at Baekryeonsa Temple meaningful to you?',
      ja: '11. 白蓮寺での「手放しと願い」リチュアルは有意義に感じられましたか？',
      zh: '11. 白莲寺的“放下与祈愿”仪式对您来说是否有深刻意义？',
    },
    options: [
      { value: 'very_meaningful', label: { ko: '매우 의미 있었다', en: 'Deeply meaningful & reflective', ja: '大変意義深く心に響いた', zh: '非常有意义，触动心灵' } },
      { value: 'somewhat_meaningful', label: { ko: '어느 정도 의미 있었다', en: 'Somewhat meaningful', ja: 'ある程度意義を感じた', zh: '有一定意义' } },
      { value: 'formal', label: { ko: '형식적으로 느껴졌다', en: 'Felt formal or routine', ja: '形式的に感じられた', zh: '略显形式化' } },
    ],
  },
  {
    id: 'ondo_cs_q12_temple_burden',
    productId: 'ondo-coastal-serenity-02',
    category: 'custom',
    type: 'single_choice',
    required: true,
    title: {
      ko: '12. 사찰이라는 공간(종교적 색채)이 부담스럽게 느껴지진 않았나요?',
      en: '12. Did the temple space or religious elements feel burdensome or uncomfortable?',
      ja: '12. 寺院という空間（宗教的な雰囲気）に負担や抵抗を感じることはありませんでしたか？',
      zh: '12. 寺庙这一场所（宗教色彩）是否会让您感到任何负担或不适？',
    },
    options: [
      { value: 'no_burden', label: { ko: '전혀 부담 없었다', en: 'Not at all, felt peaceful', ja: '全く負担や抵抗はなかった', zh: '完全没有负担，很宁静' } },
      { value: 'slightly_unfamiliar', label: { ko: '약간 낯설었다', en: 'A bit unfamiliar but okay', ja: '少し慣れない感じはあった', zh: '稍微有点陌生感，但能接受' } },
      { value: 'somewhat_burdensome', label: { ko: '다소 부담스러웠다', en: 'Somewhat burdensome', ja: 'やや負担に感じられた', zh: '感觉有些心理负担' } },
    ],
  },

  // [스트레스 변화]
  {
    id: 'ondo_cs_q13_stress_pre',
    productId: 'ondo-coastal-serenity-02',
    category: 'satisfaction',
    type: 'single_choice',
    required: true,
    title: {
      ko: '13. 프로그램 시작 전 스트레스 수준은?',
      en: '13. What was your stress level before starting the program?',
      ja: '13. プログラム開始前のストレスレベルは？',
      zh: '13. 参加体验前，您的压力水平大约是？',
    },
    options: [
      { value: 'low_1_3', label: { ko: '낮음 (1~3)', en: 'Low (1-3)', ja: '低い（1〜3）', zh: '低 (1~3)' } },
      { value: 'mid_4_6', label: { ko: '보통 (4~6)', en: 'Moderate (4-6)', ja: '普通（4〜6）', zh: '中等 (4~6)' } },
      { value: 'high_7_10', label: { ko: '높음 (7~10)', en: 'High (7-10)', ja: '高い（7〜10）', zh: '高 (7~10)' } },
    ],
  },
  {
    id: 'ondo_cs_q14_stress_post',
    productId: 'ondo-coastal-serenity-02',
    category: 'satisfaction',
    type: 'single_choice',
    required: true,
    title: {
      ko: '14. 프로그램 종료 후 스트레스 수준은?',
      en: '14. What was your stress level after completing the program?',
      ja: '14. プログラム終了後のストレスレベルは？',
      zh: '14. 体验结束后，您当前的压力水平大约是？',
    },
    options: [
      { value: 'low_1_3', label: { ko: '낮음 (1~3)', en: 'Low (1-3)', ja: '低い（1〜3）', zh: '低 (1~3)' } },
      { value: 'mid_4_6', label: { ko: '보통 (4~6)', en: 'Moderate (4-6)', ja: '普通（4〜6）', zh: '中等 (4~6)' } },
      { value: 'high_7_10', label: { ko: '높음 (7~10)', en: 'High (7-10)', ja: '高い（7〜10）', zh: '高 (7~10)' } },
    ],
  },
  {
    id: 'ondo_cs_q15_physical_change',
    productId: 'ondo-coastal-serenity-02',
    category: 'custom',
    type: 'multi_choice',
    required: false,
    title: {
      ko: '15. 신체적으로 느낀 변화는? (해당 항목 모두 선택)',
      en: '15. What physical changes did you notice? (Select all that apply)',
      ja: '15. 身体に感じられた変化は？（当てはまるものすべて選択）',
      zh: '15. 您身体有哪些切实的改变？（可多选）',
    },
    options: [
      { value: 'neck_shoulder_release', label: { ko: '어깨/목 긴장 완화', en: 'Shoulder & Neck tension relieved', ja: '首・肩の凝りや緊張の緩和', zh: '肩颈紧绷感缓解' } },
      { value: 'sleep_induction', label: { ko: '수면 유도 효과 (졸림)', en: 'Natural sleep induction (Pleasant drowsiness)', ja: '心地よい眠気・睡眠導入効果', zh: '自然安神催眠（舒适困意）' } },
      { value: 'digestion_comfort', label: { ko: '소화/속 편안함', en: 'Digestive comfort & inner lightness', ja: 'お腹の落ち着き・消化の快適さ', zh: '肠胃舒畅平稳' } },
      { value: 'headache_relief', label: { ko: '두통·긴장 완화', en: 'Headache & mental strain relieved', ja: '頭痛や精神的疲労の緩和', zh: '头痛与脑力疲劳消退' } },
      { value: 'no_change', label: { ko: '특별한 변화 없음', en: 'No noticeable change', ja: '特段の変化なし', zh: '无显著变化' } },
    ],
  },

  // [가이드 & 케어]
  {
    id: 'ondo_cs_q16_guide_care',
    productId: 'ondo-coastal-serenity-02',
    category: 'custom',
    type: 'single_choice',
    required: true,
    title: {
      ko: '16. 전담 웰니스 가이드의 케어가 "치유 경험"에 기여한 정도는?',
      en: '16. How much did the dedicated wellness guide care contribute to your healing experience?',
      ja: '16. 専任ウェルネスガイドのケアは「癒しの体験」にどの程度寄与しましたか？',
      zh: '16. 专属健康向导的全程呵护对您的“疗愈体验”起到了多大作用？',
    },
    options: [
      { value: 'great_contribution', label: { ko: '매우 크게 기여', en: 'Substantially contributed', ja: '非常に大きく貢献した', zh: '起到了至关重要的作用' } },
      { value: 'moderate_contribution', label: { ko: '어느 정도 기여', en: 'Moderately contributed', ja: 'ある程度貢献した', zh: '有一定帮助' } },
      { value: 'little_contribution', label: { ko: '큰 영향 없었음', en: 'Minor impact', ja: 'あまり影響はなかった', zh: '影响不大' } },
    ],
  },
  {
    id: 'ondo_cs_q17_briefing_style',
    productId: 'ondo-coastal-serenity-02',
    category: 'custom',
    type: 'single_choice',
    required: true,
    title: {
      ko: '17. 설명/브리핑 방식은 어땠나요?',
      en: '17. How was the briefing and explanation style?',
      ja: '17. ガイドの説明やブリーフィングの方法はいかがでしたか？',
      zh: '17. 向导的讲解与说明方式感觉如何？',
    },
    options: [
      { value: 'great_for_immersion', label: { ko: '몰입에 큰 도움이 됨', en: 'Greatly helped immersion', ja: '没入に大変役立った', zh: '极大地帮助沉浸体验' } },
      { value: 'appropriate', label: { ko: '적당했음', en: 'Well-balanced & appropriate', ja: 'ちょうど適切だった', zh: '适度且恰到好处' } },
      { value: 'too_much', label: { ko: '너무 많았음 / 방해가 됨', en: 'Too lengthy / Distracting', ja: '多すぎて集中を妨げた', zh: '话稍多 / 略有干扰' } },
      { value: 'need_more', label: { ko: '좀 더 필요했음', en: 'Needed more explanation', ja: 'もう少し詳しく聞きたかった', zh: '希望能有更详细的解说' } },
    ],
  },

  // ================= Part 3. 데이터 보강 질문 =================
  {
    id: 'ondo_cs_q18_group_size',
    productId: 'ondo-coastal-serenity-02',
    category: 'custom',
    type: 'single_choice',
    required: true,
    title: {
      ko: '18. 오늘 함께한 인원 구성은?',
      en: '18. Who did you participate with today?',
      ja: '18. 本日のご参加人数・構成は？',
      zh: '18. 您今天是以何种同行形式参与的？',
    },
    options: [
      { value: 'solo', label: { ko: '1인', en: 'Solo Traveler', ja: '一人旅（ソロ）', zh: '独自一人行' } },
      { value: 'couple', label: { ko: '커플', en: 'Couple / Partner', ja: 'カップル・夫婦', zh: '情侣 / 夫妻同行' } },
      { value: 'family', label: { ko: '가족', en: 'Family', ja: 'ご家族', zh: '家庭出游' } },
      { value: 'friends', label: { ko: '친구 그룹', en: 'Friend Group', ja: '友人グループ', zh: '好友结伴' } },
      { value: 'business', label: { ko: '비즈니스 / MICE 동반', en: 'Business / MICE Colleagues', ja: 'ビジネス・MICE同伴', zh: '商务 / MICE团队同行' } },
    ],
  },
  {
    id: 'ondo_cs_q19_booking_hesitation',
    productId: 'ondo-coastal-serenity-02',
    category: 'custom',
    type: 'single_choice',
    required: true,
    title: {
      ko: '19. 예약 전 가장 망설여졌던 이유는?',
      en: '19. What made you hesitate most before booking?',
      ja: '19. 予約前に最も迷ったり躊躇した理由は何ですか？',
      zh: '19. 预订之前，最让您犹豫的原因是？',
    },
    options: [
      { value: 'trust_info_lack', label: { ko: 'ONDO에 대한 정보/신뢰 부족', en: 'Lack of brand awareness / info on ONDO', ja: 'ONDOの情報不足・認知不足', zh: '对ONDO品牌的信息或信任不足' } },
      { value: 'hard_to_imagine', label: { ko: '프로그램 내용이 상상이 안 감', en: 'Difficult to visualize program itinerary', ja: 'プログラム内容が具体的にイメージしにくかった', zh: '难以想象具体的行程画面' } },
      { value: 'temple_reluctance', label: { ko: '사찰(종교적 색채)에 대한 거부감', en: 'Reluctance toward temple / religious elements', ja: '寺院（宗教的要素）への抵抗感', zh: '对寺院（宗教色彩）稍有顾虑' } },
      { value: 'no_hesitation', label: { ko: '망설임 없었음', en: 'No hesitation at all', ja: '迷いは全くなかった', zh: '毫不犹豫直接预订' } },
      { value: 'other', label: { ko: '기타', en: 'Other', ja: 'その他', zh: '其他' } },
    ],
  },
  {
    id: 'ondo_cs_q20_rechoice',
    productId: 'ondo-coastal-serenity-02',
    category: 'custom',
    type: 'single_choice',
    required: true,
    title: {
      ko: '20. Coastal Serenity와 Eco Resonance 중, 오늘 다시 고른다면?',
      en: '20. If you were to choose again today between Coastal Serenity and Eco Resonance, which would you pick?',
      ja: '20. Coastal SerenityとEco Resonanceのうち、今日再び選ぶとしたらどちらにしますか？',
      zh: '20. 如果让您在Coastal Serenity与Eco Resonance之间重新选择，您会选哪一个？',
    },
    options: [
      { value: 'choose_coastal', label: { ko: 'Coastal Serenity를 다시 선택', en: 'Coastal Serenity again', ja: 'Coastal Serenityを再度選ぶ', zh: '再次选择Coastal Serenity' } },
      { value: 'choose_eco', label: { ko: 'Eco Resonance가 더 끌린다', en: 'More curious about Eco Resonance', ja: 'Eco Resonanceに惹かれる', zh: '更想尝试Eco Resonance' } },
      { value: 'both_great', label: { ko: '둘 다 좋았다 / 우열 없음', en: 'Both sound equally wonderful', ja: '甲乙つけがたくどちらも素晴らしい', zh: '两者并驾齐驱，都非常好' } },
    ],
  },
  {
    id: 'ondo_cs_q21_paired_experience',
    productId: 'ondo-coastal-serenity-02',
    category: 'custom',
    type: 'multi_choice',
    required: false,
    title: {
      ko: '21. 체류 중 함께 경험하고 싶은 것은? (해당 항목 모두 선택)',
      en: '21. What other experiences would you like to have during your stay? (Select all that apply)',
      ja: '21. 滞在中に併せて体験したいものは？（当てはまるものすべて選択）',
      zh: '21. 在逗留期间，您还希望体验哪些特色项目？（可多选）',
    },
    options: [
      { value: 'yacht_wellness', label: { ko: '요트 웰니스', en: 'Yacht Wellness', ja: 'ヨット・ウェルネス', zh: '奢华游艇疗愈' } },
      { value: 'hanbang_spa', label: { ko: '한방 스파', en: 'Hanbang (Herbal) Spa', ja: '韓方スパ', zh: '传统韩方水疗' } },
      { value: 'gourmet_dining', label: { ko: '미식 다이닝', en: 'Gourmet Dining', ja: '美食ファインダイニング', zh: '高定美馔私享' } },
      { value: 'none', label: { ko: '추가 희망 없음', en: 'No additional request', ja: '特になし', zh: '暂无其他需求' } },
      { value: 'other', label: { ko: '기타', en: 'Other', ja: 'その他', zh: '其他' } },
    ],
  },
  {
    id: 'ondo_cs_q22_recommendation_nps',
    productId: 'ondo-coastal-serenity-02',
    category: 'satisfaction',
    type: 'single_choice',
    required: true,
    title: {
      ko: '22. 지인에게 추천할 의향은?',
      en: '22. How likely are you to recommend this experience to others?',
      ja: '22. 知人や友人にこの体験をおすすめしたいですか？',
      zh: '22. 您向亲友推荐这项体验的意愿有多大？',
    },
    options: [
      { value: 'promoter_9_10', label: { ko: '매우 추천함 (9~10점)', en: 'Highly Recommend (9-10)', ja: 'ぜひおすすめしたい（9〜10点）', zh: '极力推荐 (9~10分)' } },
      { value: 'passive_7_8', label: { ko: '추천하는 편 (7~8점)', en: 'Likely Recommend (7-8)', ja: 'おすすめしたい（7〜8点）', zh: '愿意推荐 (7~8分)' } },
      { value: 'neutral_5_6', label: { ko: '보통 (5~6점)', en: 'Neutral (5-6)', ja: '普通（5〜6点）', zh: '一般 / 中立 (5~6分)' } },
      { value: 'detractor_0_4', label: { ko: '추천하지 않음 (0~4점)', en: 'Not Recommend (0-4)', ja: 'おすすめしない（0〜4点）', zh: '暂不推荐 (0~4分)' } },
    ],
  },
  {
    id: 'ondo_cs_q23_sns_share',
    productId: 'ondo-coastal-serenity-02',
    category: 'custom',
    type: 'single_choice',
    required: true,
    title: {
      ko: '23. 오늘 경험을 SNS에 공유하고 싶은 마음이 들었나요?',
      en: '23. Did you feel motivated to share today\'s experience on social media?',
      ja: '23. 今日の体験をSNSでシェアしたいと思いましたか？',
      zh: '23. 您是否有意愿在社交平台（SNS）上分享今天的体验？',
    },
    options: [
      { value: 'already_or_will_share', label: { ko: '이미 공유했거나 꼭 할 것', en: 'Already shared or definitely will post', ja: 'すでに投稿した、または必ずシェアする', zh: '已发布或一定会分享打卡' } },
      { value: 'considering', label: { ko: '고민 중', en: 'Considering / Might share photos', ja: '検討中', zh: '正在整理照片，考虑发布' } },
      { value: 'no_plan', label: { ko: '공유할 생각 없음', en: 'Prefer keeping it private / No plan', ja: 'シェアの予定なし', zh: '暂无计划，偏好个人私藏' } },
    ],
  },

  // ================= Part 4. 자유 의견 (총 3개) =================
  {
    id: 'ondo_cs_q24_best_scene',
    productId: 'ondo-coastal-serenity-02',
    category: 'custom',
    type: 'text',
    required: false,
    title: {
      ko: '24. 오늘 경험 중 가장 기억에 남는 한 장면을 자유롭게 적어주세요.',
      en: '24. Please freely share the single most memorable scene from today\'s experience.',
      ja: '24. 本日の体験の中で最も心に残ったワンシーンをご自由にお書きください。',
      zh: '24. 请自由分享今天体验中最令您难忘的一个画面或瞬间。',
    },
    placeholder: {
      ko: '예: 해맞이 공원에서 바닷바람과 함께 울려 퍼지던 싱잉볼 진동 소리...',
      en: 'e.g., The vibration of singing bowls harmonizing with the ocean breeze at Sunrise Park...',
      ja: '例：日の出公園で海風と共に響き渡ったシンギングボウルの音色...',
      zh: '例如：日出公园海风中荡漾的颂钵深邃泛音...',
    },
  },
  {
    id: 'ondo_cs_q25_next_season',
    productId: 'ondo-coastal-serenity-02',
    category: 'custom',
    type: 'text',
    required: false,
    title: {
      ko: '25. 다음 시즌 프로그램에 꼭 반영됐으면 하는 점이 있다면?',
      en: '25. Is there anything you would like to see reflected in next season\'s program?',
      ja: '25. 次のシーズンのプログラムにぜひ取り入れてほしい点があれば教えてください。',
      zh: '25. 如果有希望在下一季项目中改进或增加的内容，请告诉我们。',
    },
    placeholder: {
      ko: '예: 백련사 사찰 명상 후 다도(차담) 시간이 더 길었으면 좋겠습니다...',
      en: 'e.g., Wished for an extended tea meditation session at Baekryeonsa...',
      ja: '例：白蓮寺での茶道瞑想の時間がもう少し長いと嬉しいです...',
      zh: '例如：希望白莲寺的禅茶冥想时间可以进一步延长...',
    },
  },
  {
    id: 'ondo_cs_q26_message_to_team',
    productId: 'ondo-coastal-serenity-02',
    category: 'custom',
    type: 'text',
    required: false,
    title: {
      ko: '26. ONDO 팀에게 직접 전하고 싶은 말이 있다면 남겨주세요.',
      en: '26. Please feel free to leave any message you would like to share directly with the ONDO team.',
      ja: '26. ONDOチームに直接伝えたいメッセージがあればご自由にお残しください。',
      zh: '26. 如果有想对ONDO团队说的真心话，请留言给我们。',
    },
    placeholder: {
      ko: 'ONDO 팀의 세심한 배려와 웰니스 가이드에 대한 따뜻한 응원을 남겨주세요.',
      en: 'Leave your warm encouragement and feedback for the ONDO guide and team.',
      ja: 'ONDOチームへの温かいメッセージや励ましをお寄せください。',
      zh: '请留下您对ONDO团队细致款待的温暖鼓励。',
    },
  },
];

export const ALL_ONDO_QUESTIONS: SurveyQuestion[] = [
  ...ONDO_SURVEY_QUESTIONS,
  ...ONDO_COASTAL_SURVEY_QUESTIONS,
];

export const MOCK_QUESTIONS: SurveyQuestion[] = ALL_ONDO_QUESTIONS;
export const MOCK_FEEDBACKS: FeedbackSubmission[] = [];

// 구글 시트 연동 유틸리티 클래스/함수 (0초 즉시 렌더링 + 비동기 타임아웃 최적화)
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

  // 1. 상품 목록 조회 (로컬 캐시 즉시 반환 + 최대 1.5초 타임아웃)
  public static async fetchProducts(): Promise<WellnessProduct[]> {
    let localProducts: WellnessProduct[] = MOCK_PRODUCTS;
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(this.localProductsKey);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const mockMap = new Map(MOCK_PRODUCTS.map((p) => [p.id, p]));
            const merged = parsed.map((p: WellnessProduct) => mockMap.get(p.id) || p);
            for (const mockP of MOCK_PRODUCTS) {
              if (!merged.some((p: WellnessProduct) => p.id === mockP.id)) {
                merged.push(mockP);
              }
            }
            localProducts = merged;
          }
        } catch {}
      }
    }

    const url = this.getWebhookUrl();
    if (!url) return localProducts;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1500); // 1.5초 타임아웃

      const response = await fetch(`${url}?action=getProducts`, {
        method: 'GET',
        cache: 'no-store',
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          if (typeof window !== 'undefined') {
            localStorage.setItem(this.localProductsKey, JSON.stringify(data));
          }
          return data;
        }
      }
    } catch (e) {
      // 타임아웃 또는 실패 시 즉시 로컬 데이터 반환
    }
    return localProducts;
  }

  // 2. 신규 상품 등록
  public static async addProduct(product: WellnessProduct): Promise<{ success: boolean; message?: string }> {
    if (typeof window !== 'undefined') {
      const existing = await this.fetchProducts();
      const updated = [product, ...existing.filter((p) => p.id !== product.id)];
      localStorage.setItem(this.localProductsKey, JSON.stringify(updated));
    }

    const url = this.getWebhookUrl();
    if (url) {
      // 비동기 전송 (결과를 기다리지 않고 바로 성공 처리)
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          action: 'addProduct',
          payload: product,
        }),
      }).catch(() => {});
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
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          action: 'deleteProduct',
          payload: { id: productId },
        }),
      }).catch(() => {});
    }

    return { success: true };
  }

  // 4. 질문 목록 조회 (0초 즉시 반환 + 백그라운드 갱신)
  public static async fetchQuestions(productId?: string): Promise<SurveyQuestion[]> {
    let questions = ALL_ONDO_QUESTIONS;

    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(this.localQuestionsKey);
      if (stored) {
        try {
          const customQuestions: SurveyQuestion[] = JSON.parse(stored);
          const defaultIds = new Set(ALL_ONDO_QUESTIONS.map((q) => q.id));
          const additions = customQuestions.filter((q) => !defaultIds.has(q.id));
          questions = [...ALL_ONDO_QUESTIONS, ...additions];
        } catch {}
      }
    }

    const url = this.getWebhookUrl();
    if (url) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 1500);

        const response = await fetch(`${url}?action=getQuestions`, {
          method: 'GET',
          cache: 'no-store',
          signal: controller.signal,
        });
        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
            questions = data;
          }
        }
      } catch (e) {}
    }

    if (!productId) return questions;
    return questions.filter((q) => q.productId === productId || q.productId === 'all');
  }

  // 5. 설문 피드백 제출 (로컬 즉시 저장 + 비동기 구글 시트 전송으로 지연시간 0초)
  public static async submitFeedback(submission: FeedbackSubmission): Promise<{ success: boolean; message?: string }> {
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

    const url = this.getWebhookUrl();
    if (url) {
      // 비동기 백그라운드 전송 (Fire-and-Forget)
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          action: 'submitFeedback',
          payload: submission,
        }),
      }).catch((err) => console.warn('Background sync warning:', err));
    }

    return { success: true, message: 'Saved successfully.' };
  }

  // 6. 피드백 목록 전체 조회
  public static async fetchFeedbacks(): Promise<FeedbackSubmission[]> {
    const url = this.getWebhookUrl();
    let remoteFeedbacks: FeedbackSubmission[] = [];

    if (url) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);

        const response = await fetch(`${url}?action=getFeedbacks`, {
          method: 'GET',
          cache: 'no-store',
          signal: controller.signal,
        });
        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            remoteFeedbacks = data;
          }
        }
      } catch (e) {}
    }

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
