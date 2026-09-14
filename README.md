# J&J Solutions Global Wellness Feedback & Product Enhancement Platform

외국인 고객 대상 프리미엄 웰니스 상품 피드백 수집 및 구글 시트 연동 데이터베이스 & 상품 고도화 솔루션 웹 애플리케이션입니다.

---

## 🌿 주요 특징

1. **글로벌 다국어 지원 (i18n)**:
   - 영어 (English), 일본어 (日本語), 중국어 간체 (简体中文), 한국어 (한국어) 지원
   - 언어 감지 및 원클릭 언어 스위처 제공
2. **구글 시트 백엔드 & CMS 실시간 연동**:
   - Google Spreadsheet를 데이터베이스 및 관리자 CMS로 활용
   - 구글 시트에 새 상품을 추가하거나 설문 문항을 수정하면 웹앱에 실시간 자동 반영
   - 제출된 설문 응답은 구글 시트의 `Responses` 탭에 즉시 누적 저장
3. **2-Way 상품 고도화 솔루션**:
   - **고객용 (User-facing)**: 피드백 제출 완료 시 고객의 응답(피부 고민, 수면, 스트레스, 라이프스타일)을 분석하여 시간대별 웰니스 루틴 & 페어링 추천 솔루션 제공
   - **관리자용 (`/admin`)**: 수집된 피드백을 실시간 종합 분석하여 제형(Formula), 패키징(Packaging), 가격/사이즈(Pricing), 현지화 마케팅(Localization)의 구체적인 고도화 제안서 및 로드맵 자동 도출
4. **고급스러운 웰니스 럭셔리 UI/UX**:
   - 세이지 그린, 샌드, 샴페인 골드 컬러 테마 및 부드러운 스텝별 모션 효과
5. **GitHub & Vercel 배포 최적화**:
   - Next.js 14 App Router 기반으로 Vercel에 단 1분 만에 원클릭 배포 가능

---

## 📊 Google Sheets 연동 가이드 (5분 완성)

### 1단계: 스프레드시트 접속
연동 대상 스프레드시트: [J&J Solutions Spreadsheet](https://docs.google.com/spreadsheets/d/12-6xda9qQIzYGZFLAr7X3cjrFN_G_4sfBUYHWjBHAAo/edit)

### 2단계: Apps Script 코드 등록
1. 스프레드시트 상단 메뉴에서 **[확장 프로그램] → [Apps Script]**를 클릭합니다.
2. 프로젝트 루트에 있는 [`google-sheets-script.js`](./google-sheets-script.js) 파일의 전체 내용을 복사하여 Apps Script 에디터에 붙여넣습니다.
3. 상단 툴바의 함수 선택 창에서 `initSheets`를 선택하고 **[실행]** 버튼을 클릭합니다.
   *(권한 허용 창이 뜨면 허용해 주세요. Products, Questions, Responses, Insights 시트 탭과 초기 데이터가 자동 세팅됩니다.)*

### 3단계: 웹 앱으로 배포
1. Apps Script 우측 상단 파란색 **[배포] → [새 배포]**를 클릭합니다.
2. 톱니바퀴 아이콘에서 **[웹 앱]**을 선택합니다.
   - **설명**: `J&J Wellness Feedback API`
   - **다음 사용자 권한으로 실행**: `나 (내 Google 계정)`
   - **액세스 권한이 있는 사용자**: **`모든 사용자 (Anyone)`** *(반드시 '모든 사용자'로 설정해야 합니다)*
3. **[배포]**를 누르고 생성된 **웹 앱 URL** (예: `https://script.google.com/macros/s/.../exec`)을 복사합니다.

### 4단계: 웹앱에 연결
- **방법 1 (환경변수)**: `.env.local` 파일 또는 Vercel 환경 변수에 `NEXT_PUBLIC_GOOGLE_SHEETS_URL=복사한_URL` 등록
- **방법 2 (관리자 화면)**: 웹앱 실행 후 상단 **[Admin & Intelligence] → [Sheets & Config]** 탭에서 웹 앱 URL을 붙여넣고 저장!

---

## 🚀 로컬 실행 방법

```bash
# 1. 의존성 설치
npm install

# 2. 개발 서버 실행
npm run dev

# 3. 브라우저에서 열기
# http://localhost:3000
```

---

## ☁️ GitHub & Vercel 배포 가이드

### 1. GitHub 저장소 푸시
```bash
git init
git add .
git commit -m "feat: J&J Solutions global wellness feedback & enhancement platform"
git branch -M main
git remote add origin <사용자_깃허브_저장소_URL>
git push -u origin main
```

### 2. Vercel 배포
1. [Vercel](https://vercel.com)에 로그인 후 **[Add New...] → [Project]**를 클릭합니다.
2. GitHub 저장소를 임포트합니다.
3. **Environment Variables**에 다음을 추가합니다:
   - `NEXT_PUBLIC_GOOGLE_SHEETS_URL`: (Google Apps Script 배포 URL)
   - `NEXT_PUBLIC_SPREADSHEET_ID`: `12-6xda9qQIzYGZFLAr7X3cjrFN_G_4sfBUYHWjBHAAo`
4. **[Deploy]** 버튼을 누르면 배포가 완료됩니다!

---

## 📁 프로젝트 구조

```
├── google-sheets-script.js     # Google Apps Script 배포용 전체 코드
├── src/
│   ├── app/
│   │   ├── layout.tsx          # 글로벌 레이아웃, 폰트, 언어 프로바이더
│   │   ├── page.tsx            # 메인 상품 선택 & 피드백 시작 랜딩
│   │   ├── survey/[productId]/ # 상품별 동적 맞춤 설문 페이지
│   │   ├── result/             # 고객 맞춤 웰니스 솔루션 결과 페이지
│   │   ├── admin/              # 관리자 상품 고도화 & 구글 시트 분석 대시보드
│   │   └── api/sheets/         # 구글 시트 프록시 API
│   ├── components/
│   │   ├── Header.tsx          # 럭셔리 네비게이션 & 언어 스위처
│   │   ├── LanguageSelector.tsx# EN, JA, ZH, KO 다국어 전환 드롭다운
│   │   ├── ProductCard.tsx     # 웰니스 상품 카드
│   │   ├── SurveyForm.tsx      # 동적 질문 렌더러 & 스텝별 설문 폼
│   │   ├── StarRating.tsx      # 인터랙티브 별점 컴포넌트
│   │   ├── NpsScale.tsx        # 0~10 순추천 지수 컴포넌트
│   │   ├── WellnessSolutionCard.tsx # 고객 맞춤 데일리 리추얼 솔루션
│   │   └── ProductEnhancementModal.tsx # 관리자용 상품 고도화 제안서
│   ├── lib/
│   │   ├── types.ts            # 타입 정의
│   │   ├── sheets.ts           # 구글 시트 연동 & 스마트 Fallback DB
│   │   ├── enhancementEngine.ts# 피드백 분석 & 상품 고도화 AI 엔진
│   │   └── i18n.tsx            # 다국어 컨텍스트 & 훅
│   └── locales/
│       ├── en.ts               # 영어 사전
│       ├── ja.ts               # 일본어 사전
│       ├── zh.ts               # 중국어 간체 사전
│       └── ko.ts               # 한국어 사전
```

---

&copy; 2026 J&J Solutions. All rights reserved.
