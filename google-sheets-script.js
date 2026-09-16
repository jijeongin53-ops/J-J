/**
 * ==============================================================================
 * J&J Solutions / ONDO Global Wellness Feedback System - Google Apps Script (GAS)
 * ==============================================================================
 * 스프레드시트 URL: https://docs.google.com/spreadsheets/d/12-6xda9qQIzYGZFLAr7X3cjrFN_G_4sfBUYHWjBHAAo/edit
 * 
 * [설치 및 배포 방법]
 * 1. 위 구글 스프레드시트 열기
 * 2. 상단 메뉴 [확장 프로그램] -> [Apps Script] 클릭
 * 3. 기존 코드를 모두 지우고 이 스크립트 전체를 복사하여 붙여넣기
 * 4. 상단 디스크 아이콘(Ctrl+S)으로 저장 후 'initSheets' 함수를 선택하고 [▶ 실행] 클릭
 *    (ONDO Program #1 ECO RESONANCE 및 22개 설문 문항 자동 세팅)
 * 5. 우측 상단 파란색 [배포] -> [새 배포] 클릭
 *    - 유형: [웹 앱] 선택
 *    - 설명: ONDO Wellness Feedback API
 *    - 다음 사용자 권한으로 실행: [나 (내 계정)]
 *    - 액세스 권한이 있는 사용자: [모든 사용자 (Anyone)] <- 필수!
 * ==============================================================================
 */

// 시트 이름 상수
const SHEET_PRODUCTS = "Products";
const SHEET_QUESTIONS = "Questions";
const SHEET_RESPONSES = "Responses";
const SHEET_INSIGHTS = "Insights";

/**
 * 1. ONDO Program #1 ECO RESONANCE 및 22개 문항 자동 초기화 함수
 */
function initSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // 1. Products 시트 초기화 (ONDO ECO RESONANCE & COASTAL SERENITY 상품)
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
    "/images/oryukdo_main.jpg",
    "4-Hour Coastal Ritual",
    "Sunrise Park Outdoor Soundbath & Singing Bowl | Oryukdo Coastal Storytelling & Skywalk | Baekryeonsa Temple Reflection Ritual",
    "Private Pick-up/Drop-off, English Wellness Expert, Soundbath Session, Temple Ritual, Local Gift"
  ]);
  formatHeaderRow(sheetProducts);

  // 2. Questions 시트 초기화 (ONDO 22개 상세 설문 문항 정의)
  let sheetQuestions = ss.getSheetByName(SHEET_QUESTIONS);
  if (!sheetQuestions) sheetQuestions = ss.insertSheet(SHEET_QUESTIONS);
  sheetQuestions.clear();
  sheetQuestions.appendRow([
    "id", "productId", "category", "type", "required",
    "title_en", "title_ja", "title_zh", "title_ko", "options_json"
  ]);

  // Q1 ~ Q5 (Part 1)
  sheetQuestions.appendRow([
    "ondo_q1_feeling", "ondo-eco-resonance-01", "satisfaction", "single_choice", "TRUE",
    "1. Which feeling best describes your state after completing the program?",
    "1. プログラムを終えた今、最も近い感覚はどれですか？",
    "1. 结束体验后，您现在最贴近的心境与感受是？",
    "1. 두 프로그램을 마친 지금 느낌에 가장 가까운 것은?",
    JSON.stringify([
      { value: "relaxed_calm", label: { ko: "완전히 이완됨 / 고요함", en: "Completely relaxed / Deep serenity", ja: "完全にリラックス・深い静寂", zh: "彻底放松 / 内心沉静" } },
      { value: "novel_impressive", label: { ko: "새롭고 낯설지만 깊은 인상", en: "Novel, exotic yet deeply impactful", ja: "新鮮で心に深く残る印象", zh: "新颖独特且印象极其深刻" } },
      { value: "joyful_energetic", label: { ko: "즐겁고 활기찬 느낌", en: "Joyful, uplifting & energizing", ja: "楽しく活気に満ちたエネルギー", zh: "愉悦轻盈，充满活力" } },
      { value: "mediocre", label: { ko: "기대보다 밋밋했음", en: "Milder than expected", ja: "期待より少し物足りなかった", zh: "略显平淡，未达预期" } }
    ])
  ]);

  sheetQuestions.appendRow([
    "ondo_q2_release_moment", "ondo-eco-resonance-01", "satisfaction", "single_choice", "TRUE",
    "2. When did you feel the deepest release of mental and physical tension?",
    "2. 心身の緊張が最もほぐれたと感じた瞬間はいつですか？",
    "2. 您感到身心紧绷感最大程度得到释放的时刻是？",
    "2. 몸과 마음의 긴장이 가장 크게 풀렸다고 느낀 순간은?",
    JSON.stringify([
      { value: "pickup_transit", label: { ko: "Pick-up 및 이동 중", en: "During Pick-up & Transit", ja: "送迎・移動中", zh: "专车接送与路途之中" } },
      { value: "eco_center", label: { ko: "을숙도 에코센터 / 문화 체험", en: "Eulsukdo Eco-Center", ja: "乙淑島エコセンター", zh: "乙淑岛生态中心" } },
      { value: "wildlife_center", label: { ko: "야생동물 치유센터", en: "Wildlife Rescue & Healing Center", ja: "野生動物救護センター", zh: "野生动物救护中心" } },
      { value: "sunset_soundbath", label: { ko: "골든 아워 선셋 사운드배스", en: "Golden Hour Sunset Soundbath", ja: "夕日サウンドバス", zh: "黄金日落颂钵声浴" } }
    ])
  ]);

  sheetQuestions.appendRow([
    "ondo_q6_soundbath_length", "ondo-eco-resonance-01", "texture_scent", "single_choice", "TRUE",
    "6. How was the duration of the Soundbath & Singing Bowl session?",
    "6. サウンドバス＆シンギングボウル セションの長さはいかがでしたか？",
    "6. 颂钵声浴与声音疗愈环节的时长体验如何？",
    "6. 사운드배스 & 싱잉볼 세션 길이는 어땠나요?",
    JSON.stringify([
      { value: "too_short", label: { ko: "너무 짧았다", en: "Too short", ja: "短すぎた", zh: "过短，意犹未尽" } },
      { value: "just_right", label: { ko: "적절했다", en: "Just right & balanced", ja: "ちょうど良かった", zh: "恰到好处" } },
      { value: "prefer_longer", label: { ko: "더 길었으면 했다", en: "Would prefer it longer", ja: "もっと長い方が良かった", zh: "希望可以再延长" } }
    ])
  ]);

  sheetQuestions.appendRow([
    "ondo_q18_nps_recommendation", "ondo-eco-resonance-01", "satisfaction", "single_choice", "TRUE",
    "18. How likely are you to recommend ONDO to friends or colleagues?",
    "18. ご友人や知人にONDOプログラムをおすすめしたいですか？",
    "18. 您向身边的挚友或同行推荐ONDO疗愈项目的意愿如何？",
    "18. 지인에게 ONDO 프로그램을 추천할 의향은?",
    JSON.stringify([
      { value: "promoter_9_10", label: { ko: "매우 추천함 (9~10점)", en: "Highly Recommend (9-10)", ja: "ぜひおすすめしたい（9〜10点）", zh: "极力推荐 (9~10分)" } },
      { value: "passive_7_8", label: { ko: "추천하는 편 (7~8점)", en: "Likely Recommend (7-8)", ja: "おすすめしたい（7〜8点）", zh: "愿意推荐 (7~8分)" } },
      { value: "detractor_0_4", label: { ko: "추천하지 않음 (0~4점)", en: "Not Recommend (0-4)", ja: "おすすめしない（0〜4点）", zh: "暂不推荐 (0~4分)" } }
    ])
  ]);

  sheetQuestions.appendRow([
    "ondo_q20_best_scene", "ondo-eco-resonance-01", "custom", "text", "FALSE",
    "20. Please describe the single most unforgettable scene or moment from today.",
    "20. 本日の体験の中で最も心に残ったワンシーンを自由にご記入ください。",
    "20. 请自由描述今天全程中让您最难以忘怀的一个震撼画面或瞬间。",
    "20. 오늘 경험 중 가장 기억에 남는 한 장면을 자유롭게 적어주세요.",
    "[]"
  ]);

  sheetQuestions.appendRow([
    "ondo_q21_next_season_wishes", "ondo-eco-resonance-01", "custom", "text", "FALSE",
    "21. What enhancements or new elements would you love to see in our next season?",
    "21. 次期シーズンのプログラムにぜひ取り入れてほしい点があれば教えてください。",
    "21. 您期望在ONDO下一季度的全新升级项目中见到哪些创新元素或改进？",
    "21. 다음 시즌 프로그램에 꼭 반영됐으면 하는 점이 있다면?",
    "[]"
  ]);

  sheetQuestions.appendRow([
    "ondo_q22_words_to_team", "ondo-eco-resonance-01", "custom", "text", "FALSE",
    "22. Any personal message or warm feedback you would like to share with the ONDO team?",
    "22. ONDOチームへ直接伝えたいメッセージがあればご自由にお書きください。",
    "22. 您想对全程陪伴的ONDO团队说些什么？欢迎留下您的真实心声。",
    "22. ONDO 팀에게 직접 전하고 싶은 말이 있다면 남겨주세요.",
    "[]"
  ]);

  formatHeaderRow(sheetQuestions);

  // 3. Responses 시트 초기화
  let sheetResponses = ss.getSheetByName(SHEET_RESPONSES);
  if (!sheetResponses) sheetResponses = ss.insertSheet(SHEET_RESPONSES);
  if (sheetResponses.getLastRow() === 0) {
    sheetResponses.appendRow([
      "Timestamp", "ID", "Product ID", "Product Name", "Language",
      "Overall Rating", "NPS (0-10)", "Nationality", "Age Group", "Gender",
      "Wellness Goal", "Email", "Answers JSON", "Additional Comment"
    ]);
    formatHeaderRow(sheetResponses);
  }

  // 4. Insights 시트 초기화
  let sheetInsights = ss.getSheetByName(SHEET_INSIGHTS);
  if (!sheetInsights) sheetInsights = ss.insertSheet(SHEET_INSIGHTS);
  if (sheetInsights.getLastRow() === 0) {
    sheetInsights.appendRow([
      "Timestamp", "Product ID", "Product Name", "Total Feedbacks", "Avg Rating",
      "NPS", "Key Strengths", "Improvement Roadmap", "AI Summary"
    ]);
    formatHeaderRow(sheetInsights);
  }

  Logger.log("ONDO Eco Resonance Program and 22 questions initialized successfully!");
}

/**
 * 테이블 헤더 서식 적용
 */
function formatHeaderRow(sheet) {
  const headerRange = sheet.getRange(1, 1, 1, sheet.getLastColumn());
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
      const questions = data.map(row => {
        let parsedOptions = [];
        try {
          if (row.options_json) parsedOptions = JSON.parse(row.options_json);
        } catch (err) {}
        return {
          id: row.id,
          productId: row.productId || "all",
          category: row.category || "custom",
          type: row.type || "single_choice",
          required: String(row.required).toUpperCase() === "TRUE",
          title: { en: row.title_en, ja: row.title_ja, zh: row.title_zh, ko: row.title_ko },
          options: parsedOptions
        };
      });
      return createJsonResponse(questions);
    }

    if (action === "getFeedbacks") {
      const sheet = ss.getSheetByName(SHEET_RESPONSES);
      const data = sheetToObjectArray(sheet);
      const feedbacks = data.map(row => {
        let answers = {};
        try {
          if (row["Answers JSON"]) answers = JSON.parse(row["Answers JSON"]);
        } catch (e) {}
        return {
          id: row["ID"],
          timestamp: row["Timestamp"],
          productId: row["Product ID"],
          productName: row["Product Name"],
          language: row["Language"],
          overallRating: Number(row["Overall Rating"]) || 5,
          npsScore: Number(row["NPS (0-10)"]) || 10,
          userProfile: {
            nationality: row["Nationality"],
            ageGroup: row["Age Group"],
            gender: row["Gender"],
            wellnessGoal: row["Wellness Goal"],
            email: row["Email"]
          },
          answers: answers,
          comment: row["Additional Comment"]
        };
      });
      return createJsonResponse(feedbacks);
    }

    if (action === "initTemplate") {
      initSheets();
      return createJsonResponse({ success: true, message: "Template initialized successfully" });
    }

    return createJsonResponse({ status: "ok", message: "ONDO Wellness API Running" });
  } catch (error) {
    return createJsonResponse({ error: error.toString() }, 500);
  }
}

/**
 * POST 요청 핸들러
 */
function doPost(e) {
  try {
    const rawData = e.postData.contents;
    const body = JSON.parse(rawData);
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    if (body.action === "addProduct") {
      const p = body.payload;
      const sheet = ss.getSheetByName(SHEET_PRODUCTS);
      const benefits = (p.keyBenefits && p.keyBenefits.en) ? p.keyBenefits.en.join(" | ") : "";

      sheet.appendRow([
        p.id,
        p.slug,
        p.name.en || "",
        p.name.ja || p.name.en || "",
        p.name.zh || p.name.en || "",
        p.name.ko || p.name.en || "",
        p.category.en || "Eco & Sunset Soundbath Ritual",
        p.tagline.en || "",
        p.imageUrl || "",
        p.badge ? p.badge.en : "4-Hour Sunset Ritual",
        benefits,
        p.ingredients ? p.ingredients.en : ""
      ]);

      return createJsonResponse({ success: true, message: "Product added to Google Sheet" });
    }

    if (body.action === "submitFeedback") {
      const payload = body.payload;
      const sheet = ss.getSheetByName(SHEET_RESPONSES);
      
      const now = new Date();
      const formattedDate = Utilities.formatDate(now, "Asia/Seoul", "yyyy-MM-dd HH:mm:ss");
      const id = payload.id || "fb-" + Utilities.getUuid().substring(0, 8);
      const user = payload.userProfile || {};

      sheet.appendRow([
        formattedDate,
        id,
        payload.productId || "",
        payload.productName || "",
        payload.language || "en",
        payload.overallRating || 5,
        payload.npsScore || 10,
        user.nationality || "",
        user.ageGroup || "",
        user.gender || "",
        user.wellnessGoal || "",
        user.email || "",
        JSON.stringify(payload.answers || {}),
        payload.comment || ""
      ]);

      return createJsonResponse({ success: true, id: id, message: "Feedback saved to Google Sheet" });
    }

    return createJsonResponse({ success: false, message: "Unknown action" });
  } catch (error) {
    return createJsonResponse({ success: false, error: error.toString() }, 500);
  }
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
 * JSON Response 반환
 */
function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
