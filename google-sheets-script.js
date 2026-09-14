/**
 * ==============================================================================
 * J&J Solutions Global Wellness Feedback System - Google Apps Script (GAS)
 * ==============================================================================
 * 스프레드시트 URL: https://docs.google.com/spreadsheets/d/12-6xda9qQIzYGZFLAr7X3cjrFN_G_4sfBUYHWjBHAAo/edit
 * 
 * [설치 및 배포 방법]
 * 1. 위 구글 스프레드시트 열기
 * 2. 상단 메뉴 [확장 프로그램] -> [Apps Script] 클릭
 * 3. 기존 코드를 모두 지우고 이 스크립트 전체를 복사하여 붙여넣기
 * 4. 상단 디스크 아이콘(Ctrl+S)으로 저장 후 'initSheets' 함수를 선택하고 [실행] 클릭
 * 5. 우측 상단 파란색 [배포] -> [새 배포] 클릭
 *    - 유형: [웹 앱] 선택
 *    - 설명: J&J Wellness Feedback API v2
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
 * 1. 시트 탭 헤더 구성 함수 (가상 데이터 없이 깨끗한 상태로 초기화)
 */
function initSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // 1. Products 시트 초기화 (빈 헤더 상태)
  let sheetProducts = ss.getSheetByName(SHEET_PRODUCTS);
  if (!sheetProducts) sheetProducts = ss.insertSheet(SHEET_PRODUCTS);
  sheetProducts.clear();
  sheetProducts.appendRow([
    "id", "slug", "name_en", "name_ja", "name_zh", "name_ko",
    "category_en", "tagline_en", "imageUrl", "badge_en",
    "benefits_en", "ingredients_en"
  ]);
  formatHeaderRow(sheetProducts);

  // 2. Questions 시트 초기화 (공통 질문 헤더)
  let sheetQuestions = ss.getSheetByName(SHEET_QUESTIONS);
  if (!sheetQuestions) sheetQuestions = ss.insertSheet(SHEET_QUESTIONS);
  sheetQuestions.clear();
  sheetQuestions.appendRow([
    "id", "productId", "category", "type", "required",
    "title_en", "title_ja", "title_zh", "title_ko", "options_json"
  ]);
  sheetQuestions.appendRow([
    "q_channel", "all", "custom", "single_choice", "TRUE",
    "Where did you discover or experience this J&J Solutions product?",
    "どちらでこのJ&J Solutions商品を知りましたか？",
    "您是通过什么渠道了解或体验到该款J&J产品的？",
    "어떤 경로로 J&J Solutions의 제품을 접하셨나요?",
    JSON.stringify([
      { value: "luxury_hotel_spa", label: { en: "Luxury Hotel / Spa Amenity", ja: "高級ホテル・スパ アメニティ", zh: "高端酒店 / 水疗SPA护理", ko: "특급 호텔 / 스파 어메니티" } },
      { value: "social_media", label: { en: "Social Media (Instagram, Red, TikTok)", ja: "SNS（Instagram・小紅書など）", zh: "社交媒体（小红书、Instagram等）", ko: "소셜 미디어 (인스타, 샤오홍슈 등)" } },
      { value: "duty_free_offline", label: { en: "Airport Duty Free / Boutique", ja: "空港免税店・旗艦店", zh: "机场免税店 / 品牌精品店", ko: "면세점 / 백화점 팝업 매장" } }
    ])
  ]);
  formatHeaderRow(sheetQuestions);

  // 3. Responses 시트 초기화 (피드백 데이터 누적 저장)
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

  // 4. Insights 시트 초기화 (상품 고도화 솔루션 로그)
  let sheetInsights = ss.getSheetByName(SHEET_INSIGHTS);
  if (!sheetInsights) sheetInsights = ss.insertSheet(SHEET_INSIGHTS);
  if (sheetInsights.getLastRow() === 0) {
    sheetInsights.appendRow([
      "Timestamp", "Product ID", "Product Name", "Total Feedbacks", "Avg Rating",
      "NPS", "Key Strengths", "Improvement Roadmap", "AI Summary"
    ]);
    formatHeaderRow(sheetInsights);
  }

  Logger.log("J&J Solutions Clean Sheets setup completed!");
}

/**
 * 테이블 헤더 서식 적용
 */
function formatHeaderRow(sheet) {
  const headerRange = sheet.getRange(1, 1, 1, sheet.getLastColumn());
  headerRange.setBackground("#485E47"); // 세이지 그린
  headerRange.setFontColor("#FFFFFF");
  headerRange.setFontWeight("bold");
  headerRange.setHorizontalAlignment("center");
  sheet.setFrozenRows(1);
}

/**
 * GET 요청 핸들러 (상품/질문/응답 데이터 반환)
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

    return createJsonResponse({ status: "ok", message: "J&J Solutions Feedback API Running" });
  } catch (error) {
    return createJsonResponse({ error: error.toString() }, 500);
  }
}

/**
 * POST 요청 핸들러 (새 상품 추가, 설문 피드백 저장 등)
 */
function doPost(e) {
  try {
    const rawData = e.postData.contents;
    const body = JSON.parse(rawData);
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    // 1. 신규 상품 등록 (Products 탭에 행 추가)
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
        p.category.en || "Skincare Ritual",
        p.tagline.en || "",
        p.imageUrl || "",
        p.badge ? p.badge.en : "New Release",
        benefits,
        p.ingredients ? p.ingredients.en : ""
      ]);

      return createJsonResponse({ success: true, message: "Product added to Google Sheet" });
    }

    // 2. 피드백 응답 제출
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
