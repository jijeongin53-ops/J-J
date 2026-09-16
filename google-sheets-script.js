/**
 * ==============================================================================
 * J&J Solutions / ONDO Global Wellness Feedback System - Google Apps Script (GAS)
 * ==============================================================================
 * 스프레드시트 URL: https://docs.google.com/spreadsheets/d/12-6xda9qQIzYGZFLAr7X3cjrFN_G_4sfBUYHWjBHAAo/edit
 * 
 * [설치 및 업데이트 방법]
 * 1. 위 구글 스프레드시트 열기
 * 2. 상단 메뉴 [확장 프로그램] -> [Apps Script] 클릭
 * 3. 기존 코드를 모두 지우고 이 스크립트 전체를 복사하여 붙여넣기
 * 4. 상단 디스크 아이콘(Ctrl+S)으로 저장 후, 상단 실행 드롭다운에서 'initSheets' 함수를 선택하고 [▶ 실행] 클릭
 *    -> [Questions] 시트에 48개 전체 설문 문항 자동 세팅!
 *    -> [Responses_Eulsukdo] & [Responses_Oryukdo] 시트에 각 문항별 개별 열(Column) 자동 생성!
 *    -> [Responses] 통합 시트 자동 생성!
 * 5. 우측 상단 파란색 [배포] -> [새 배포] 클릭
 *    - 유형: [웹 앱] 선택
 *    - 설명: ONDO Wellness Feedback API (문항별 열 매핑 지원)
 *    - 다음 사용자 권한으로 실행: [나 (내 계정)]
 *    - 액세스 권한이 있는 사용자: [모든 사용자 (Anyone)] <- 필수!
 *    - [배포] 클릭 후 승인
 * ==============================================================================
 */

// 시트 이름 상수
const SHEET_PRODUCTS = "Products";
const SHEET_QUESTIONS = "Questions";
const SHEET_RESPONSES = "Responses";
const SHEET_RESPONSES_EULSUKDO = "Responses_Eulsukdo";
const SHEET_RESPONSES_ORYUKDO = "Responses_Oryukdo";

// ONDO 전체 설문 문항 정의 (을숙도 22문항 + 오륙도 26문항)
const EULSUKDO_QUESTIONS = [
  { id: "ondo_q1_feeling", no: "Q1", title: "Q1. 마친 지금 느낌", type: "single_choice", options: "완전히 이완됨/고요함 | 새롭고 낯설지만 깊은 인상 | 즐겁고 활기참 | 기대보다 밋밋함 | 기타" },
  { id: "ondo_q2_release_moment", no: "Q2", title: "Q2. 긴장이 풀린 순간", type: "single_choice", options: "이동 중 | 에코센터 | 야생동물 치유센터 | 선셋 사운드배스 | 기타/없음" },
  { id: "ondo_q3_disruption_moment", no: "Q3", title: "Q3. 몰입 끊긴 순간", type: "single_choice", options: "없었음 | 이동/대기 | 브리핑 방식 | 세션 길이 | 기타" },
  { id: "ondo_q4_luxury_comparison", no: "Q4", title: "Q4. 해외 럭셔리 투어 대비", type: "single_choice", options: "훨씬 더 특별함 | 비슷한 수준 | 기대에 못 미침 | 비교 대상 없음" },
  { id: "ondo_q5_redefining_you", no: "Q5", title: "Q5. Redefining YOU 체감", type: "single_choice", options: "매우 그랬다 | 어느 정도 그랬다 | 별로 느끼지 못했다" },
  { id: "ondo_q6_soundbath_length", no: "Q6", title: "Q6. 사운드배스 세션 길이", type: "single_choice", options: "너무 짧았다 | 적절했다 | 더 길었으면 했다" },
  { id: "ondo_q7_physical_reaction", no: "Q7", title: "Q7. 세션 중 신체 반응", type: "multi_choice", options: "호흡 느려짐 | 졸림/숙면 | 눈물/울컥 | 몸 이완 | 특별한 반응 없음" },
  { id: "ondo_q8_wildlife_healing", no: "Q8", title: "Q8. 야생동물센터 치유 기여", type: "single_choice", options: "치유감 극대화 | 색다른 경험 | 무난했음 | 개선 필요" },
  { id: "ondo_q9_eco_center_cart", no: "Q9", title: "Q9. 에코센터 카트 투어 만족도", type: "single_choice", options: "매우 만족 | 만족 | 보통 | 개선 필요" },
  { id: "ondo_q10_golden_hour_sunset", no: "Q10", title: "Q10. 골든아워 선셋 타이밍", type: "single_choice", options: "완벽한 타이밍 | 괜찮았음 | 아쉬웠음" },
  { id: "ondo_q11_stress_level_before", no: "Q11", title: "Q11. 시작 전 스트레스 수준", type: "single_choice", options: "낮음(1-3) | 보통(4-6) | 높음(7-10)" },
  { id: "ondo_q12_stress_level_after", no: "Q12", title: "Q12. 종료 후 스트레스 수준", type: "single_choice", options: "낮음(1-3) | 보통(4-6) | 높음(7-10)" },
  { id: "ondo_q13_physical_benefits", no: "Q13", title: "Q13. 체감된 신체적 변화", type: "multi_choice", options: "목/어깨 이완 | 수면 유도 | 속 편안함 | 두통 완화 | 변화 없음" },
  { id: "ondo_q14_guide_contribution", no: "Q14", title: "Q14. 가이드 치유 기여도", type: "single_choice", options: "매우 크게 기여 | 어느 정도 기여 | 보통" },
  { id: "ondo_q15_briefing_style", no: "Q15", title: "Q15. 브리핑/설명 방식", type: "single_choice", options: "몰입에 도움 | 적당했음 | 너무 많았음 | 더 필요했음" },
  { id: "ondo_q16_group_composition", no: "Q16", title: "Q16. 동반 인원 구성", type: "single_choice", options: "1인 | 커플 | 가족 | 친구 | 비즈니스/MICE" },
  { id: "ondo_q17_paired_experience", no: "Q17", title: "Q17. 함께 경험 희망 항목", type: "multi_choice", options: "요트 웰니스 | 한방 스파 | 미식 다이닝 | 추가 희망 없음 | 기타" },
  { id: "ondo_q18_nps_recommendation", no: "Q18", title: "Q18. 지인 추천 의향 (NPS)", type: "single_choice", options: "매우 추천(9-10점) | 추천(7-8점) | 보통(5-6점) | 비추천(0-4점)" },
  { id: "ondo_q19_sns_sharing", no: "Q19", title: "Q19. SNS 공유 의향", type: "single_choice", options: "이미/꼭 공유 | 고민 중 | 개인 소장/공유 안함" },
  { id: "ondo_q20_best_scene", no: "Q20", title: "Q20. 가장 기억에 남는 장면", type: "text", options: "자유 서술형" },
  { id: "ondo_q21_next_season_wishes", no: "Q21", title: "Q21. 다음 시즌 희망사항", type: "text", options: "자유 서술형" },
  { id: "ondo_q22_words_to_team", no: "Q22", title: "Q22. ONDO 팀에게 한마디", type: "text", options: "자유 서술형" }
];

const ORYUKDO_QUESTIONS = [
  { id: "ondo_cs_q1_feeling", no: "Q1", title: "Q1. 마친 지금 느낌", type: "single_choice", options: "완전히 이완됨/고요함 | 새롭고 낯설지만 깊은 인상 | 즐겁고 활기참 | 기대보다 밋밋함 | 기타" },
  { id: "ondo_cs_q2_tension_release", no: "Q2", title: "Q2. 긴장이 풀린 순간", type: "single_choice", options: "이동 중 | 오륙도 해안/스카이워크 | 해맞이 공원 사운드배스 | 백련사 리추얼 | 딱히 없었음" },
  { id: "ondo_cs_q3_immersion_break", no: "Q3", title: "Q3. 몰입 끊긴 순간", type: "single_choice", options: "없었음 | 이동/대기 시간 | 설명 방식 | 세션 길이 | 기타" },
  { id: "ondo_cs_q4_luxury_comparison", no: "Q4", title: "Q4. 해외 럭셔리 투어 대비", type: "single_choice", options: "훨씬 더 특별함 | 비슷한 수준 | 기대에 못 미침 | 비교 대상 없음" },
  { id: "ondo_cs_q5_redefining_you", no: "Q5", title: "Q5. Redefining YOU 체감", type: "single_choice", options: "매우 그랬다 | 어느 정도 그랬다 | 별로 느끼지 못했다" },
  { id: "ondo_cs_q6_storytelling", no: "Q6", title: "Q6. 지질·해녀 스토리텔링", type: "single_choice", options: "매우 도움됨 | 어느 정도 도움됨 | 큰 영향 없었음" },
  { id: "ondo_cs_q7_skywalk", no: "Q7", title: "Q7. 스카이워크 체험", type: "single_choice", options: "인상 깊었다(하이라이트) | 괜찮았다 | 아쉬웠다 | 체험하지 못함" },
  { id: "ondo_cs_q8_soundbath_length", no: "Q8", title: "Q8. 사운드배스 세션 길이", type: "single_choice", options: "너무 짧았다 | 적절했다 | 더 길었으면 했다" },
  { id: "ondo_cs_q9_physical_response", no: "Q9", title: "Q9. 세션 중 신체 반응", type: "multi_choice", options: "호흡 느려짐 | 졸림/잠듦 | 눈물/울컥함 | 몸 이완 | 특별한 반응 없음" },
  { id: "ondo_cs_q10_outdoor_vs_indoor", no: "Q10", title: "Q10. 야외 vs 실내 사운드배스", type: "single_choice", options: "야외라서 더 좋았다 | 실내였어도 비슷했을 것 | 실내가 더 좋았을 것 같다" },
  { id: "ondo_cs_q11_temple_ritual", no: "Q11", title: "Q11. 백련사 비움과 소원 리추얼", type: "single_choice", options: "매우 의미 있었다 | 어느 정도 의미 있었다 | 형식적으로 느껴졌다" },
  { id: "ondo_cs_q12_temple_burden", no: "Q12", title: "Q12. 사찰 공간 부담감 여부", type: "single_choice", options: "전혀 부담 없었다 | 약간 낯설었다 | 다소 부담스러웠다" },
  { id: "ondo_cs_q13_stress_pre", no: "Q13", title: "Q13. 시작 전 스트레스 수준", type: "single_choice", options: "낮음(1-3) | 보통(4-6) | 높음(7-10)" },
  { id: "ondo_cs_q14_stress_post", no: "Q14", title: "Q14. 종료 후 스트레스 수준", type: "single_choice", options: "낮음(1-3) | 보통(4-6) | 높음(7-10)" },
  { id: "ondo_cs_q15_physical_change", no: "Q15", title: "Q15. 체감된 신체적 변화", type: "multi_choice", options: "목/어깨 이완 | 수면 유도 | 속 편안함 | 두통 완화 | 변화 없음" },
  { id: "ondo_cs_q16_guide_care", no: "Q16", title: "Q16. 가이드 치유 기여도", type: "single_choice", options: "매우 크게 기여 | 어느 정도 기여 | 큰 영향 없었음" },
  { id: "ondo_cs_q17_briefing_style", no: "Q17", title: "Q17. 브리핑/설명 방식", type: "single_choice", options: "몰입에 큰 도움 | 적당했음 | 너무 많았음 | 좀 더 필요했음" },
  { id: "ondo_cs_q18_group_size", no: "Q18", title: "Q18. 동반 인원 구성", type: "single_choice", options: "1인 | 커플 | 가족 | 친구 | 비즈니스/MICE" },
  { id: "ondo_cs_q19_booking_hesitation", no: "Q19", title: "Q19. 예약 전 망설임 이유", type: "single_choice", options: "정보/신뢰 부족 | 내용 상상 안됨 | 사찰 거부감 | 망설임 없었음 | 기타" },
  { id: "ondo_cs_q20_rechoice", no: "Q20", title: "Q20. 다시 고른다면", type: "single_choice", options: "Coastal Serenity 다시 선택 | Eco Resonance 선택 | 둘 다 좋았다" },
  { id: "ondo_cs_q21_paired_experience", no: "Q21", title: "Q21. 함께 경험 희망 항목", type: "multi_choice", options: "요트 웰니스 | 한방 스파 | 미식 다이닝 | 추가 희망 없음 | 기타" },
  { id: "ondo_cs_q22_recommendation_nps", no: "Q22", title: "Q22. 지인 추천 의향 (NPS)", type: "single_choice", options: "매우 추천(9-10점) | 추천(7-8점) | 보통(5-6점) | 비추천(0-4점)" },
  { id: "ondo_cs_q23_sns_share", no: "Q23", title: "Q23. SNS 공유 의향", type: "single_choice", options: "이미/꼭 공유 | 고민 중 | 공유할 생각 없음" },
  { id: "ondo_cs_q24_best_scene", no: "Q24", title: "Q24. 가장 기억에 남는 장면", type: "text", options: "자유 서술형" },
  { id: "ondo_cs_q25_next_season", no: "Q25", title: "Q25. 다음 시즌 희망사항", type: "text", options: "자유 서술형" },
  { id: "ondo_cs_q26_message_to_team", no: "Q26", title: "Q26. ONDO 팀에게 한마디", type: "text", options: "자유 서술형" }
];

const BASE_HEADERS = [
  "Timestamp", "ID", "Product ID", "Product Name", "Language",
  "Overall Rating", "NPS (0-10)", "Nationality", "Age Group", "Gender",
  "Wellness Goal", "Email", "Additional Comments"
];

/**
 * 1. 스프레드시트 전체 초기화 (Products, Questions, Responses 시트 자동 구성)
 */
function initSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // 1) Products 시트 초기화
  let sheetProducts = ss.getSheetByName(SHEET_PRODUCTS);
  if (!sheetProducts) sheetProducts = ss.insertSheet(SHEET_PRODUCTS);
  sheetProducts.clear();
  sheetProducts.appendRow([
    "id", "slug", "name_en", "name_ja", "name_zh", "name_ko",
    "category_en", "tagline_en", "imageUrl", "badge_en",
    "benefits_en", "ingredients_en"
  ]);
  sheetProducts.appendRow([
    "ondo-eco-resonance-01",
    "ondo-eco-resonance",
    "Eulsukdo Island Wellness Private Tour",
    "Eulsukdo Island Wellness Private Tour（乙淑島）",
    "Eulsukdo Island Wellness Private Tour（乙淑岛）",
    "Eulsukdo Island Wellness Private Tour (을숙도 에코 레조넌스)",
    "Eco & Sunset Soundbath Ritual",
    "4-Hour Sunset Soundbath & Eco-Sanctuary Healing Journey where river meets the sea ($186 USD).",
    "/images/eulsukdo_main.jpg",
    "4-Hour Sunset Ritual",
    "Golden Hour Sunset Soundbath & Singing Bowl | Eco-Sanctuary Cart Tour & Wildlife Center | Private Vehicle Pick-up & English Expert",
    "Private Pick-up/Drop-off, English Wellness Expert, Singing Bowl Session, Eco-Center Pass, Local Gift"
  ]);
  sheetProducts.appendRow([
    "ondo-coastal-serenity-02",
    "ondo-coastal-serenity",
    "Oryukdo Islets Wellness Private Tour",
    "Oryukdo Islets Wellness Private Tour（五六島）",
    "Oryukdo Islets Wellness Private Tour（五六岛）",
    "Oryukdo Islets Wellness Private Tour (오륙도 코스탈 세레니티)",
    "Coastal Wellness & Temple Ritual",
    "4-Hour Private Coastal Soundbath & Temple Reflection Ritual at Oryukdo Islets ($170 USD).",
    "/images/oryukdo_main.jpg?v=2",
    "4-Hour Coastal Ritual",
    "Sunrise Park Outdoor Soundbath & Singing Bowl | Oryukdo Coastal Storytelling & Skywalk | Baekryeonsa Temple Reflection Ritual",
    "Private Pick-up/Drop-off, English Wellness Expert, Soundbath Session, Temple Ritual, Local Gift"
  ]);
  formatHeaderRow(sheetProducts);

  // 2) Questions 시트 초기화 (을숙도 22개 + 오륙도 26개 총 48개 문항 등록)
  let sheetQuestions = ss.getSheetByName(SHEET_QUESTIONS);
  if (!sheetQuestions) sheetQuestions = ss.insertSheet(SHEET_QUESTIONS);
  sheetQuestions.clear();
  sheetQuestions.appendRow([
    "ID", "Product ID", "Tour Name", "No", "Question Title", "Type", "Options / Guide"
  ]);

  for (let i = 0; i < EULSUKDO_QUESTIONS.length; i++) {
    const q = EULSUKDO_QUESTIONS[i];
    sheetQuestions.appendRow([
      q.id, "ondo-eco-resonance-01", "Eulsukdo Island Wellness", q.no, q.title, q.type, q.options
    ]);
  }
  for (let i = 0; i < ORYUKDO_QUESTIONS.length; i++) {
    const q = ORYUKDO_QUESTIONS[i];
    sheetQuestions.appendRow([
      q.id, "ondo-coastal-serenity-02", "Oryukdo Islets Wellness", q.no, q.title, q.type, q.options
    ]);
  }
  formatHeaderRow(sheetQuestions);

  // 3) Responses_Eulsukdo 전용 시트 초기화 (을숙도 Q1 ~ Q22 열 배치)
  let sheetEulsukdo = ss.getSheetByName(SHEET_RESPONSES_EULSUKDO);
  if (!sheetEulsukdo) sheetEulsukdo = ss.insertSheet(SHEET_RESPONSES_EULSUKDO);
  if (sheetEulsukdo.getLastRow() === 0) {
    const eulsukdoHeaders = [...BASE_HEADERS];
    for (let i = 0; i < EULSUKDO_QUESTIONS.length; i++) {
      eulsukdoHeaders.push(EULSUKDO_QUESTIONS[i].title);
    }
    sheetEulsukdo.appendRow(eulsukdoHeaders);
    formatHeaderRow(sheetEulsukdo);
  }

  // 4) Responses_Oryukdo 전용 시트 초기화 (오륙도 Q1 ~ Q26 열 배치)
  let sheetOryukdo = ss.getSheetByName(SHEET_RESPONSES_ORYUKDO);
  if (!sheetOryukdo) sheetOryukdo = ss.insertSheet(SHEET_RESPONSES_ORYUKDO);
  if (sheetOryukdo.getLastRow() === 0) {
    const oryukdoHeaders = [...BASE_HEADERS];
    for (let i = 0; i < ORYUKDO_QUESTIONS.length; i++) {
      oryukdoHeaders.push(ORYUKDO_QUESTIONS[i].title);
    }
    sheetOryukdo.appendRow(oryukdoHeaders);
    formatHeaderRow(sheetOryukdo);
  }

  // 5) Responses 통합 시트 초기화
  let sheetResponses = ss.getSheetByName(SHEET_RESPONSES);
  if (!sheetResponses) sheetResponses = ss.insertSheet(SHEET_RESPONSES);
  if (sheetResponses.getLastRow() === 0) {
    const allHeaders = [...BASE_HEADERS];
    for (let i = 0; i < EULSUKDO_QUESTIONS.length; i++) {
      allHeaders.push("[을숙도] " + EULSUKDO_QUESTIONS[i].title);
    }
    for (let i = 0; i < ORYUKDO_QUESTIONS.length; i++) {
      allHeaders.push("[오륙도] " + ORYUKDO_QUESTIONS[i].title);
    }
    sheetResponses.appendRow(allHeaders);
    formatHeaderRow(sheetResponses);
  }

  Logger.log("ONDO Sheets successfully initialized with all questions and dynamic response columns!");
}

/**
 * 테이블 헤더 서식 적용 (고급스러운 웰니스 딥그린)
 */
function formatHeaderRow(sheet) {
  const lastCol = sheet.getLastColumn();
  if (lastCol < 1) return;
  const headerRange = sheet.getRange(1, 1, 1, lastCol);
  headerRange.setBackground("#485E47");
  headerRange.setFontColor("#FFFFFF");
  headerRange.setFontWeight("bold");
  headerRange.setHorizontalAlignment("center");
  sheet.setFrozenRows(1);
}

/**
 * GET 요청 핸들러
 */
function doGet(e) {
  try {
    const action = (e && e.parameter && e.parameter.action) || "getProducts";
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    if (action === "getProducts") {
      const sheet = ss.getSheetByName(SHEET_PRODUCTS);
      const data = sheetToObjectArray(sheet);
      const products = data.map(row => ({
        id: row.id,
        slug: row.slug,
        name: { en: row.name_en, ja: row.name_ja, zh: row.name_zh, ko: row.name_ko },
        category: { en: row.category_en, ja: row.category_en, zh: row.category_en, ko: row.category_en },
        tagline: { en: row.tagline_en, ja: row.tagline_en, zh: row.tagline_en, ko: row.tagline_en },
        description: { en: row.tagline_en, ja: row.tagline_en, zh: row.tagline_en, ko: row.tagline_en },
        imageUrl: row.imageUrl,
        badge: { en: row.badge_en, ja: row.badge_en, zh: row.badge_en, ko: row.badge_en },
        keyBenefits: {
          en: (row.benefits_en || "").split("|").map(s => s.trim()).filter(Boolean),
          ja: (row.benefits_en || "").split("|").map(s => s.trim()).filter(Boolean),
          zh: (row.benefits_en || "").split("|").map(s => s.trim()).filter(Boolean),
          ko: (row.benefits_en || "").split("|").map(s => s.trim()).filter(Boolean),
        },
        ingredients: { en: row.ingredients_en, ja: row.ingredients_en, zh: row.ingredients_en, ko: row.ingredients_en }
      }));
      return createJsonResponse(products);
    }

    if (action === "getQuestions") {
      const sheet = ss.getSheetByName(SHEET_QUESTIONS);
      const data = sheetToObjectArray(sheet);
      return createJsonResponse(data);
    }

    return createJsonResponse({ status: "ok", message: "ONDO Wellness API Running" });
  } catch (error) {
    return createJsonResponse({ error: error.toString() }, 500);
  }
}

/**
 * POST 요청 핸들러 (설문 피드백 제출)
 */
function doPost(e) {
  try {
    const rawData = e.postData.contents;
    const body = JSON.parse(rawData);
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    if (body.action === "submitFeedback") {
      const payload = body.payload;
      const now = new Date();
      const formattedDate = Utilities.formatDate(now, "Asia/Seoul", "yyyy-MM-dd HH:mm:ss");
      const id = payload.id || "fb-" + Utilities.getUuid().substring(0, 8);
      const user = payload.userProfile || {};

      const baseInfo = {
        timestamp: formattedDate,
        id: id,
        productId: payload.productId || "",
        productName: payload.productName || "",
        language: payload.language || "ko",
        overallRating: payload.overallRating || 5,
        npsScore: payload.npsScore || 10,
        nationality: user.nationality || "",
        ageGroup: user.ageGroup || "",
        gender: user.gender || "",
        wellnessGoal: user.wellnessGoal || "",
        email: user.email || "",
        comment: payload.comment || ""
      };

      const detailedAnswers = payload.detailedAnswers || [];
      const isCoastal = (payload.productId || "").indexOf("coastal") !== -1;

      // 1. 해당 상품 전용 시트에 문항별 열 매핑 저장
      const targetSheetName = isCoastal ? SHEET_RESPONSES_ORYUKDO : SHEET_RESPONSES_EULSUKDO;
      let targetSheet = ss.getSheetByName(targetSheetName);
      if (!targetSheet) {
        initSheets();
        targetSheet = ss.getSheetByName(targetSheetName);
      }
      if (targetSheet) {
        appendFeedbackRow(targetSheet, baseInfo, detailedAnswers, false);
      }

      // 2. 통합 Responses 시트에도 문항별 열 매핑 저장
      let totalSheet = ss.getSheetByName(SHEET_RESPONSES);
      if (totalSheet) {
        appendFeedbackRow(totalSheet, baseInfo, detailedAnswers, true);
      }

      return createJsonResponse({ success: true, id: id, message: "Feedback saved with individual question columns!" });
    }

    return createJsonResponse({ success: false, message: "Unknown action" });
  } catch (error) {
    return createJsonResponse({ success: false, error: error.toString() }, 500);
  }
}

/**
 * 시트에 기본 정보 및 각 문항 답변을 해당 열(Column)에 매핑하여 행 추가
 */
function appendFeedbackRow(sheet, baseInfo, detailedAnswers, isTotalSheet) {
  let lastCol = sheet.getLastColumn();
  if (lastCol < 1) {
    sheet.appendRow(BASE_HEADERS);
    lastCol = sheet.getLastColumn();
    formatHeaderRow(sheet);
  }

  let headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  const rowData = new Array(headers.length).fill("");

  // 기본 정보 매핑
  rowData[0] = baseInfo.timestamp;
  rowData[1] = baseInfo.id;
  rowData[2] = baseInfo.productId;
  rowData[3] = baseInfo.productName;
  rowData[4] = baseInfo.language;
  rowData[5] = baseInfo.overallRating;
  rowData[6] = baseInfo.npsScore;
  rowData[7] = baseInfo.nationality;
  rowData[8] = baseInfo.ageGroup;
  rowData[9] = baseInfo.gender;
  rowData[10] = baseInfo.wellnessGoal;
  rowData[11] = baseInfo.email;
  rowData[12] = baseInfo.comment;

  // 상세 문항 답변 매핑
  for (let i = 0; i < detailedAnswers.length; i++) {
    const item = detailedAnswers[i];
    if (!item || !item.answerText) continue;

    const qTitle = item.questionTitle || item.questionId;
    let matchIdx = -1;

    // 헤더 목록에서 일치하는 컬럼 검색
    for (let h = 0; h < headers.length; h++) {
      const hText = String(headers[h]).trim();
      if (
        hText === qTitle ||
        hText.indexOf(qTitle) !== -1 ||
        qTitle.indexOf(hText) !== -1 ||
        (item.questionId && hText.toLowerCase().indexOf(item.questionId.toLowerCase()) !== -1)
      ) {
        matchIdx = h;
        break;
      }
    }

    // 헤더에 해당 질문 열이 없으면 새 컬럼 추가
    if (matchIdx === -1) {
      const newHeaderName = isTotalSheet ? ("[" + (baseInfo.productName.indexOf("Oryukdo") !== -1 ? "오륙도" : "을숙도") + "] " + qTitle) : qTitle;
      sheet.getRange(1, headers.length + 1).setValue(newHeaderName);
      headers.push(newHeaderName);
      rowData.push(item.answerText);
      formatHeaderRow(sheet);
    } else {
      rowData[matchIdx] = item.answerText;
    }
  }

  sheet.appendRow(rowData);
}

/**
 * 시트 데이터를 객체 배열로 변환
 */
function sheetToObjectArray(sheet) {
  if (!sheet) return [];
  const rows = sheet.getDataRange().getValues();
  if (rows.length <= 1) return [];
  const headers = rows[0];
  const results = [];
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const obj = {};
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = row[j];
    }
    results.push(obj);
  }
  return results;
}

/**
 * JSON 응답 헬퍼
 */
function createJsonResponse(data, statusCode = 200) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
