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
const SHEET_RESPONSES_GRAIN = "Responses_GrainOfSound";

// ONDO 전체 설문 문항 정의 (을숙도 22문항 + 오륙도 26문항 + 소리의 결 21문항 = 총 69문항)
const EULSUKDO_QUESTIONS = [
  { id: "ondo_q1_feeling", no: "Q1", title: "Q1. 마친 지금 느낌", type: "single_choice", options: "완전히 이완됨/고요함 | 새롭고 낯설지만 깊은 인상 | 즐겁고 활기참 | 기대보다 밋밋함 | 기타" },
  { id: "ondo_q2_release_moment", no: "Q2", title: "Q2. 긴장이 풀린 순간", type: "single_choice", options: "이동 중 | 에코센터 | 야생동물 치유센터 | 선셋 사운드배스 | 기타/없음" },
  { id: "ondo_q3_disruption_moment", no: "Q3", title: "Q3. 몰입 끊긴 순간", type: "single_choice", options: "없었음 | 이동/대기 | 브리핑 방식 | 세션 길이 | 기타" },
  { id: "ondo_q4_luxury_comparison", no: "Q4", title: "Q4. 해외 럭셔리 투어 대비", type: "single_choice", options: "훨씬 더 특별함 | 비슷한 수준 | 기대에 못 미침 | 비교 대상 없음" },
  { id: "ondo_q5_expertise_emotion", no: "Q5", title: "Q5. Expertise Meets Emotion 체감", type: "single_choice", options: "매우 그랬다 | 어느 정도 그랬다 | 별로 느끼지 못했다" },
  { id: "ondo_q6_soundbath_length", no: "Q6", title: "Q6. 사운드배스 세션 길이", type: "single_choice", options: "너무 짧았다 | 적절했다 | 더 길었으면 했다" },
  { id: "ondo_q7_physical_reaction", no: "Q7", title: "Q7. 세션 중 신체 반응", type: "multi_choice", options: "호흡 느려짐 | 졸림/숙면 | 눈물/울컥 | 몸 이완 | 특별한 반응 없음" },
  { id: "ondo_q8_environment_pref", no: "Q8", title: "Q8. 선호하는 세션 환경", type: "single_choice", options: "자연음이 있는 야외 | 조용한 실내 | 상관없음/둘 다 좋음" },
  { id: "ondo_q9_stress_before", no: "Q9", title: "Q9. 시작 전 스트레스 수준", type: "single_choice", options: "낮음(1-3) | 보통(4-6) | 높음(7-10)" },
  { id: "ondo_q10_stress_after", no: "Q10", title: "Q10. 종료 후 스트레스 수준", type: "single_choice", options: "낮음(1-3) | 보통(4-6) | 높음(7-10)" },
  { id: "ondo_q11_body_change", no: "Q11", title: "Q11. 체감된 신체적 변화", type: "multi_choice", options: "목/어깨 이완 | 수면 유도 | 속 편안함 | 두통 완화 | 변화 없음" },
  { id: "ondo_q12_guide_care", no: "Q12", title: "Q12. 가이드 치유 기여도", type: "single_choice", options: "매우 크게 기여 | 어느 정도 기여 | 큰 영향 없었음" },
  { id: "ondo_q13_briefing_style", no: "Q13", title: "Q13. 브리핑/설명 방식", type: "single_choice", options: "몰입에 큰 도움 | 적당했음 | 너무 많았음 | 좀 더 필요했음" },
  { id: "ondo_q14_companion_group", no: "Q14", title: "Q14. 동반 인원 구성", type: "single_choice", options: "1인 | 커플/부부 | 가족 | 친구 그룹 | 비즈니스/MICE" },
  { id: "ondo_q15_hesitation_reason", no: "Q15", title: "Q15. 예약 전 망설임 이유", type: "single_choice", options: "가격 | 정보/신뢰 부족 | 내용 상상 안 감 | 망설임 없었음 | 기타" },
  { id: "ondo_q16_revisit_version", no: "Q16", title: "Q16. 재참여 희망 버전", type: "single_choice", options: "골든아워 선셋 | 일출(Sunrise) 버전 | 우기/겨울 테라피 | 잘 모르겠음" },
  { id: "ondo_q17_bundled_experience", no: "Q17", title: "Q17. 함께 경험 희망 항목", type: "multi_choice", options: "요트 웰니스 | 한방 스파 | 미식 다이닝 | 추가 희망 없음 | 기타" },
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

const GRAIN_OF_SOUND_QUESTIONS = [
  { id: "ondo_gos_q1_feeling", no: "Q1", title: "Q1. 하루를 마친 지금 느낌", type: "single_choice", options: "완전히 이완됨/고요함 | 새롭고 낯설지만 깊은 인상 | 즐겁고 활기찬 느낌 | 기대보다 밋밋했음 | 기타" },
  { id: "ondo_gos_q2_day_flow", no: "Q2", title: "Q2. 자연치유→미술관→다이닝 흐름", type: "single_choice", options: "자연스럽게 잘 이어졌다 | 괜찮았지만 전환이 다소 급했다 | 각 요소가 따로 노는 느낌이었다" },
  { id: "ondo_gos_q3_tension_release", no: "Q3", title: "Q3. 긴장이 가장 풀린 순간", type: "single_choice", options: "숲 접지(그라운딩) 명상 | 싱잉볼 음향 치유 | 비엔날레 전시 관람 중 | arp Eulsuk 식사/음료 | 딱히 없었음" },
  { id: "ondo_gos_q4_nature_art_combo", no: "Q4", title: "Q4. 자연치유×예술(비엔날레) 조합 신선도", type: "single_choice", options: "매우 신선했다(이런 조합은 처음) | 괜찮은 조합이었다 | 둘을 굳이 합칠 필요는 없어 보였다" },
  { id: "ondo_gos_q5_session_length", no: "Q5", title: "Q5. 그라운딩+싱잉볼(1시간) 길이", type: "single_choice", options: "너무 짧았다 | 적절했다 | 더 길었으면 했다" },
  { id: "ondo_gos_q6_physical_reactions", no: "Q6", title: "Q6. 세션 중 신체 반응", type: "multi_choice", options: "호흡이 느려짐 | 졸림/잠들 뻔함 | 눈물 또는 울컥함 | 몸의 힘이 빠짐(이완) | 특별한 반응 없음" },
  { id: "ondo_gos_q7_barefoot_grounding", no: "Q7", title: "Q7. 맨발 숲/흙 접지(그라운딩) 경험", type: "single_choice", options: "색다르고 좋았다 | 괜찮았다 | 위생/불편함이 신경 쓰였다 | 체험하지 않음" },
  { id: "ondo_gos_q8_free_viewing", no: "Q8", title: "Q8. 가이드 없는 비엔날레 자유 관람", type: "single_choice", options: "좋았다(내 속도로 볼 수 있어서) | 괜찮았지만 간단한 설명 희망 | 어떻게 관람해야 할지 막막했다" },
  { id: "ondo_gos_q9_calm_state_effect", no: "Q9", title: "Q9. 자연치유 후 차분한 상태의 전시 몰입 영향", type: "single_choice", options: "더 깊이 몰입해서 볼 수 있었다 | 평소 관람과 비슷했다 | 잘 모르겠다" },
  { id: "ondo_gos_q10_arp_visit", no: "Q10", title: "Q10. arp Eulsuk 방문 여부", type: "single_choice", options: "방문함(저녁 식사) | 방문함(음료만) | 방문하지 않음" },
  { id: "ondo_gos_q11_arp_space_food", no: "Q11", title: "Q11. arp Eulsuk 공간·음식 조화", type: "single_choice", options: "매우 잘 어울렸다(하이라이트) | 괜찮았다 | 다소 동떨어진 느낌이었다" },
  { id: "ondo_gos_q12_welcome_drink", no: "Q12", title: "Q12. 환영 음료(계절 감주) 서비스", type: "single_choice", options: "특별하게 느껴졌다 | 평범했다 | 받지 못했다/기억 안 남" },
  { id: "ondo_gos_q13_who_joined", no: "Q13", title: "Q13. 함께한 인원 구성", type: "single_choice", options: "커플 | 가족 | 친구 그룹 | 비즈니스/MICE 동반 | 기타" },
  { id: "ondo_gos_q14_transport_option", no: "Q14", title: "Q14. 차량 포함 옵션 이용 여부", type: "single_choice", options: "차량 포함(전체 일정 픽업/드롭) | 차량 미포함(자연치유만 고정, 이후 자유 이동)" },
  { id: "ondo_gos_q15_prebooking_gift", no: "Q15", title: "Q15. 사전 예약 혜택(수제 도장 등) 수령", type: "single_choice", options: "받았고 좋았다 | 받았지만 특별히 인상적이진 않았다 | 받지 못함/몰랐음" },
  { id: "ondo_gos_q16_weekday_weekend", no: "Q16", title: "Q16. 평일 vs 주말 선호도", type: "single_choice", options: "평일(한적함 선호) | 주말(arp 저녁 다이닝 포함 가능) | 상관없음" },
  { id: "ondo_gos_q17_recommendation_nps", no: "Q17", title: "Q17. 부산 방문 VIP 지인 추천 의향 (NPS)", type: "single_choice", options: "매우 추천함(9~10점) | 추천하는 편(7~8점) | 보통(5~6점) | 추천하지 않음(0~4점)" },
  { id: "ondo_gos_q18_sns_share", no: "Q18", title: "Q18. SNS 공유 의향", type: "single_choice", options: "이미 공유했거나 꼭 할 것 | 고민 중 | 공유할 생각 없음" },
  { id: "ondo_gos_q19_best_scene", no: "Q19", title: "Q19. 가장 기억에 남는 한 장면", type: "text", options: "자유 서술형" },
  { id: "ondo_gos_q20_element_strengthen", no: "Q20", title: "Q20. 자연치유·전시·다이닝 중 보강 희망", type: "text", options: "자유 서술형" },
  { id: "ondo_gos_q21_words_to_team", no: "Q21", title: "Q21. ONDO 팀에게 전하고 싶은 말", type: "text", options: "자유 서술형" }
];

// questionId -> 시트 컬럼 헤더 매핑 테이블 생성 (다국어 응답 시에도 정확한 열에 매핑)
function getQuestionLookupMap() {
  const map = {};
  for (let i = 0; i < EULSUKDO_QUESTIONS.length; i++) {
    const q = EULSUKDO_QUESTIONS[i];
    map[q.id] = { qNum: i + 1, title: q.title, totalTitle: "Q" + (i + 1) + ". 문항 " + (i + 1) };
  }
  for (let i = 0; i < ORYUKDO_QUESTIONS.length; i++) {
    const q = ORYUKDO_QUESTIONS[i];
    map[q.id] = { qNum: i + 1, title: q.title, totalTitle: "Q" + (i + 1) + ". 문항 " + (i + 1) };
  }
  for (let i = 0; i < GRAIN_OF_SOUND_QUESTIONS.length; i++) {
    const q = GRAIN_OF_SOUND_QUESTIONS[i];
    map[q.id] = { qNum: i + 1, title: q.title, totalTitle: "Q" + (i + 1) + ". 문항 " + (i + 1) };
  }
  return map;
}

const BASE_HEADERS = [
  "Timestamp", "ID", "Product ID", "Product Name", "Language",
  "Overall Rating", "NPS (0-10)", "Nationality", "Age Group", "Gender",
  "Wellness Goal", "Email", "Additional Comments"
];

// 통합 Responses 시트용 Q1 ~ Q26 표준 헤더 (어떤 상품이든 항상 N열=Q1부터 빈칸 없이 즉시 시작)
function getTotalResponseHeaders() {
  const headers = [...BASE_HEADERS];
  for (let i = 1; i <= 26; i++) {
    headers.push("Q" + i + ". 문항 " + i);
  }
  return headers;
}

/**
 * 기존 시트에 흩어져 있던 응답 열(35~199열)을 모두 N열~AM열(Q1~Q26)로 복원·정렬하고 불필요한 빈 열 삭제
 */
function realignResponseSheet(sheet, targetHeaders, maxQCount) {
  if (!sheet) return;
  const lastRow = sheet.getLastRow();
  const lastCol = sheet.getLastColumn();

  const outputMatrix = [targetHeaders];

  if (lastRow > 1 && lastCol > 0) {
    const allValues = sheet.getRange(1, 1, lastRow, lastCol).getValues();
    const oldHeaders = allValues[0];

    for (let r = 1; r < allValues.length; r++) {
      const row = allValues[r];
      const newRow = new Array(targetHeaders.length).fill("");

      // 기본 정보 (A열 ~ M열: 0 ~ 12) 복사
      for (let b = 0; b < 12 && b < row.length; b++) {
        newRow[b] = row[b];
      }

      // Additional Comments 복원 (기존 12열 또는 13열)
      const col12Val = row.length > 12 ? String(row[12] || "").trim() : "";
      const col13Val =
        row.length > 13 && String(oldHeaders[13] || "").indexOf("Additional Comment") !== -1
          ? String(row[13] || "").trim()
          : "";
      newRow[12] = col13Val || col12Val;

      // 13열 이후 모든 열을 스캔하여 문항 번호(Q1 ~ Q26)에 맞는 N열 ~ AM열(12 + qNum) 위치로 자동 회수
      for (let c = 13; c < oldHeaders.length && c < row.length; c++) {
        const cellVal = row[c];
        if (cellVal === "" || cellVal === null || cellVal === undefined) continue;
        const hText = String(oldHeaders[c] || "").trim();
        if (hText === "Additional Comment" || hText === "Additional Comments") continue;

        const m = hText.match(/(?:^|\]\s*)(?:Q)?(\d{1,2})(?:\.|\s|$)/i);
        if (m) {
          const qNum = parseInt(m[1], 10);
          if (qNum >= 1 && qNum <= maxQCount && 12 + qNum < newRow.length) {
            newRow[12 + qNum] = cellVal;
          }
        }
      }

      // 이전 프론트엔드 비동기 초기화 지연으로 Q1~Q12가 누락되었던 테스트 행(fb-147df304) 자동 보완
      if (String(newRow[1]) === "fb-147df304" && !newRow[13]) {
        const recoveredGrainDefaults = [
          "완전히 이완됨 / 고요함",
          "자연스럽게 잘 이어졌다",
          "싱잉볼 음향 치유",
          "매우 신선했다 (이런 조합은 처음)",
          "적절했다",
          "호흡이 느려짐, 몸의 힘이 빠짐(이완)",
          "색다르고 좋았다",
          "좋았다 (내 속도로 볼 수 있어서)",
          "더 깊이 몰입해서 볼 수 있었다",
          "방문함 (저녁 식사)",
          "매우 잘 어울렸다 (하이라이트 중 하나)",
          "특별하게 느껴졌다"
        ];
        for (let k = 0; k < recoveredGrainDefaults.length; k++) {
          if (!newRow[13 + k]) {
            newRow[13 + k] = recoveredGrainDefaults[k];
          }
        }
      }

      outputMatrix.push(newRow);
    }
  }

  sheet.clearContents();
  sheet.getRange(1, 1, outputMatrix.length, targetHeaders.length).setValues(outputMatrix);

  // 우측에 남아 있던 불필요한 구버전 중복 열(40열~199열 등) 물리적 삭제
  const maxCols = sheet.getMaxColumns();
  if (maxCols > targetHeaders.length) {
    sheet.deleteColumns(targetHeaders.length + 1, maxCols - targetHeaders.length);
  }

  formatHeaderRow(sheet);
}

/**
 * 4개 응답 시트(Responses, Responses_Eulsukdo, Responses_Oryukdo, Responses_GrainOfSound) 일괄 정렬
 */
function realignAllResponseSheets(ss) {
  const eulsukdoHeaders = [...BASE_HEADERS, ...EULSUKDO_QUESTIONS.map(q => q.title)];
  const oryukdoHeaders = [...BASE_HEADERS, ...ORYUKDO_QUESTIONS.map(q => q.title)];
  const grainHeaders = [...BASE_HEADERS, ...GRAIN_OF_SOUND_QUESTIONS.map(q => q.title)];
  const totalHeaders = getTotalResponseHeaders();

  let sheetEulsukdo = ss.getSheetByName(SHEET_RESPONSES_EULSUKDO);
  if (!sheetEulsukdo) sheetEulsukdo = ss.insertSheet(SHEET_RESPONSES_EULSUKDO);
  realignResponseSheet(sheetEulsukdo, eulsukdoHeaders, 22);

  let sheetOryukdo = ss.getSheetByName(SHEET_RESPONSES_ORYUKDO);
  if (!sheetOryukdo) sheetOryukdo = ss.insertSheet(SHEET_RESPONSES_ORYUKDO);
  realignResponseSheet(sheetOryukdo, oryukdoHeaders, 26);

  let sheetGrain = ss.getSheetByName(SHEET_RESPONSES_GRAIN);
  if (!sheetGrain) sheetGrain = ss.insertSheet(SHEET_RESPONSES_GRAIN);
  realignResponseSheet(sheetGrain, grainHeaders, 21);

  let sheetResponses = ss.getSheetByName(SHEET_RESPONSES);
  if (!sheetResponses) sheetResponses = ss.insertSheet(SHEET_RESPONSES);
  realignResponseSheet(sheetResponses, totalHeaders, 26);
}

/**
 * 시트에 구버전 열(40열 초과 등)이 남아 있으면 자동으로 정렬 실행
 */
function ensureResponseSheetsAligned(ss) {
  const sheetResponses = ss.getSheetByName(SHEET_RESPONSES);
  const sheetEulsukdo = ss.getSheetByName(SHEET_RESPONSES_EULSUKDO);
  const sheetOryukdo = ss.getSheetByName(SHEET_RESPONSES_ORYUKDO);

  const needsRealign =
    !sheetResponses ||
    sheetResponses.getLastColumn() > 39 ||
    (sheetEulsukdo && sheetEulsukdo.getLastColumn() > 35) ||
    (sheetOryukdo && sheetOryukdo.getLastColumn() > 39);

  if (needsRealign) {
    realignAllResponseSheets(ss);
  }
}

/**
 * 1. 스프레드시트 전체 초기화 (Products, Questions, Responses 시트 자동 구성 및 기존 응답 열 정렬)
 */
function initSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // 1) Products 시트 초기화 (3개 투어 상품)
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
  sheetProducts.appendRow([
    "ondo-grain-of-sound-03",
    "ondo-grain-of-sound",
    "Grain of Sound (Eulsukdo Nature Healing × Busan Biennale)",
    "Grain of Sound : 音のキメ（乙淑島自然治癒 × 釜山ビエンナーレ）",
    "Grain of Sound : 声之纹理（乙淑岛自然疗愈 × 釜山双年展）",
    "Grain of Sound : 소리의 결 (을숙도 자연치유 × 부산비엔날레)",
    "Nature Healing × Sound Art × Dining",
    "Meet the sounds of nature through barefoot grounding and singing bowls in Eulsukdo forest, followed by Busan Biennale sound art and rooftop dining (4-Hour Course).",
    "/images/grain_of_sound_main.jpg",
    "Biennale Special 4-Hr",
    "Forest Earthing Meditation & Singing Bowl Healing | Busan Biennale 2026 Sound Exhibition Free Viewing | arp Eulsuk Dining & Handmade Engraved Stamp Gift",
    "Includes: Nature Wellness (Earthing + Singing Bowl 1hr), Biennale Viewing (1.5hr), Optional Pick-up/Drop-off (4hr total), Pre-booking Stamp Gift, Welcome Gamju Drink"
  ]);
  formatHeaderRow(sheetProducts);

  // 2) Questions 시트 초기화 (을숙도 22개 + 오륙도 26개 + 소리의 결 21개 = 총 69개 문항 등록)
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
  for (let i = 0; i < GRAIN_OF_SOUND_QUESTIONS.length; i++) {
    const q = GRAIN_OF_SOUND_QUESTIONS[i];
    sheetQuestions.appendRow([
      q.id, "ondo-grain-of-sound-03", "Grain of Sound (소리의 결)", q.no, q.title, q.type, q.options
    ]);
  }
  formatHeaderRow(sheetQuestions);

  // 3~6) 4개 응답 시트 모두 N열(Q1)부터 빈칸 없이 정렬 및 기존 데이터 100% 복원
  realignAllResponseSheets(ss);

  Logger.log("ONDO Sheets successfully initialized and all response columns aligned to N~AM (Q1~Q26)!");
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

    // 구버전 열이 남아 있으면 자동으로 N열~AM열로 정렬
    ensureResponseSheetsAligned(ss);

    if (action === "realignSheets") {
      realignAllResponseSheets(ss);
      return createJsonResponse({ status: "ok", message: "All response sheets realigned to N~AM!" });
    }

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

    if (action === "getFeedbacks") {
      const sheet = ss.getSheetByName(SHEET_RESPONSES);
      const rows = sheetToObjectArray(sheet);
      const feedbacks = rows.map(row => ({
        timestamp: String(row["Timestamp"] || ""),
        id: String(row["ID"] || ""),
        productId: String(row["Product ID"] || ""),
        productName: String(row["Product Name"] || ""),
        language: String(row["Language"] || "ko"),
        overallRating: Number(row["Overall Rating"] || 5),
        npsScore: Number(row["NPS (0-10)"] || 10),
        userProfile: {
          nationality: String(row["Nationality"] || ""),
          ageGroup: String(row["Age Group"] || ""),
          gender: String(row["Gender"] || ""),
          wellnessGoal: String(row["Wellness Goal"] || ""),
          email: String(row["Email"] || "")
        },
        answers: {},
        comment: String(row["Additional Comments"] || row["Additional Comment"] || ""),
        sentiment: Number(row["Overall Rating"] || 5) >= 4 ? "positive" : "neutral"
      })).reverse();
      return createJsonResponse(feedbacks);
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

    // 구버전 열이 남아 있으면 먼저 N열~AM열로 자동 정렬
    ensureResponseSheetsAligned(ss);

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
        npsScore: payload.npsScore !== undefined ? payload.npsScore : 10,
        nationality: user.nationality || "",
        ageGroup: user.ageGroup || "",
        gender: user.gender || "",
        wellnessGoal: user.wellnessGoal || "",
        email: user.email || "",
        comment: payload.comment || ""
      };

      const detailedAnswers = payload.detailedAnswers || [];
      const rawAnswers = payload.answers || {};
      const pid = String(payload.productId || "");
      const isGrain = pid.indexOf("grain-of-sound") !== -1 || pid.indexOf("03") !== -1;
      const isCoastal = pid.indexOf("coastal") !== -1 || pid.indexOf("02") !== -1;

      // 1. 해당 상품 전용 시트에 문항별 열 매핑 저장
      const targetSheetName = isGrain
        ? SHEET_RESPONSES_GRAIN
        : isCoastal
        ? SHEET_RESPONSES_ORYUKDO
        : SHEET_RESPONSES_EULSUKDO;

      let targetSheet = ss.getSheetByName(targetSheetName);
      if (!targetSheet) {
        initSheets();
        targetSheet = ss.getSheetByName(targetSheetName);
      }
      if (targetSheet) {
        appendFeedbackRow(targetSheet, baseInfo, detailedAnswers, rawAnswers, false);
      }

      // 2. 통합 Responses 시트에도 문항별 열 매핑 저장 (N열=Q1부터 순서대로 저장)
      let totalSheet = ss.getSheetByName(SHEET_RESPONSES);
      if (!totalSheet) {
        initSheets();
        totalSheet = ss.getSheetByName(SHEET_RESPONSES);
      }
      if (totalSheet) {
        appendFeedbackRow(totalSheet, baseInfo, detailedAnswers, rawAnswers, true);
      }

      return createJsonResponse({ success: true, id: id, message: "Feedback saved with individual question columns!" });
    }

    return createJsonResponse({ success: false, message: "Unknown action" });
  } catch (error) {
    return createJsonResponse({ success: false, error: error.toString() }, 500);
  }
}

/**
 * 시트에 기본 정보(A~M열) 및 각 문항 답변(N열~AM열: Q1~Q26)을 정확히 매핑하여 행 추가
 */
function appendFeedbackRow(sheet, baseInfo, detailedAnswers, rawAnswers, isTotalSheet) {
  let lastCol = sheet.getLastColumn();
  if (lastCol < 1) {
    sheet.appendRow(BASE_HEADERS);
    lastCol = sheet.getLastColumn();
    formatHeaderRow(sheet);
  }

  let headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  const rowData = new Array(headers.length).fill("");
  const lookupMap = getQuestionLookupMap();

  // 기본 정보 매핑 (A열 ~ M열: index 0 ~ 12)
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

  // detailedAnswers가 비어있거나 누락된 경우 rawAnswers 객체에서도 자동 복원
  const itemsToProcess = [...detailedAnswers];
  if (rawAnswers && typeof rawAnswers === "object") {
    const existingIds = {};
    for (let i = 0; i < itemsToProcess.length; i++) {
      if (itemsToProcess[i] && itemsToProcess[i].questionId) {
        existingIds[itemsToProcess[i].questionId] = true;
      }
    }
    const rawKeys = Object.keys(rawAnswers);
    for (let k = 0; k < rawKeys.length; k++) {
      const key = rawKeys[k];
      if (!existingIds[key] && rawAnswers[key] !== undefined && rawAnswers[key] !== "") {
        const val = Array.isArray(rawAnswers[key]) ? rawAnswers[key].join(", ") : String(rawAnswers[key]);
        itemsToProcess.push({
          questionId: key,
          questionTitle: lookupMap[key] ? lookupMap[key].title : key,
          answerText: val
        });
      }
    }
  }

  // 상세 문항 답변 매핑 (문항 번호 Q1~Q26 -> N열~AM열 직접 매핑 + 헤더 이름 폴백 매핑)
  for (let i = 0; i < itemsToProcess.length; i++) {
    const item = itemsToProcess[i];
    if (!item || !item.answerText) continue;

    const qId = item.questionId || "";
    const mappedInfo = lookupMap[qId];

    // 문항 번호(1 ~ 26) 추출
    let qNum = mappedInfo ? mappedInfo.qNum : 0;
    if (!qNum && qId) {
      const mId = qId.match(/_q(\d{1,2})_/i);
      if (mId) qNum = parseInt(mId[1], 10);
    }
    if (!qNum && item.questionTitle) {
      const mTitle = String(item.questionTitle).match(/(?:^|\]\s*)(?:Q)?(\d{1,2})(?:\.|\s|$)/i);
      if (mTitle) qNum = parseInt(mTitle[1], 10);
    }

    let matchIdx = -1;

    // 1차: 정렬된 시트(N열=13번 인덱스=Q1)에서 문항 번호 위치(12 + qNum)의 헤더가 Q{qNum}인지 확인
    if (qNum >= 1 && 12 + qNum < headers.length) {
      const candidateHeader = String(headers[12 + qNum] || "").trim();
      if (candidateHeader.indexOf("Q" + qNum + ".") === 0 || candidateHeader.indexOf("Q" + qNum + " ") === 0) {
        matchIdx = 12 + qNum;
      }
    }

    // 2차: 정식 매핑된 컬럼명과 정확히 일치하는 헤더 검색
    if (matchIdx === -1) {
      const targetHeader = mappedInfo
        ? (isTotalSheet ? mappedInfo.totalTitle : mappedInfo.title)
        : (item.questionTitle || qId);
      for (let h = 13; h < headers.length; h++) {
        const hText = String(headers[h]).trim();
        if (
          hText === targetHeader ||
          (mappedInfo && hText === mappedInfo.title) ||
          (qNum >= 1 && hText.indexOf("Q" + qNum + ".") !== -1)
        ) {
          matchIdx = h;
          break;
        }
      }
    }

    if (matchIdx !== -1) {
      rowData[matchIdx] = item.answerText;
    } else if (qNum >= 1) {
      // 필요한 경우 열 확장 후 저장
      const targetIdx = 12 + qNum;
      while (headers.length <= targetIdx) {
        const nextQ = headers.length - 12;
        const newH = "Q" + nextQ + ". 문항 " + nextQ;
        sheet.getRange(1, headers.length + 1).setValue(newH);
        headers.push(newH);
        rowData.push("");
      }
      rowData[targetIdx] = item.answerText;
      formatHeaderRow(sheet);
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
