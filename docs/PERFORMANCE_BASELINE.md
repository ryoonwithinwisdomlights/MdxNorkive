# 📊 성능 측정 기준선 가이드

> 프로젝트의 현재 성능을 측정하고 기준선을 수립하는 가이드입니다.

---

## 🎯 측정 항목

### 1. 번들 크기
- 전체 빌드 크기
- JavaScript 파일 크기
- 주요 청크 크기
- 벤더 라이브러리 크기

### 2. Lighthouse 점수
- Performance (성능)
- Accessibility (접근성)
- Best Practices (모범 사례)
- SEO (검색 엔진 최적화)

### 3. Web Vitals
- **LCP** (Largest Contentful Paint): 최대 콘텐츠 렌더링 시간
- **FID** (First Input Delay): 최초 입력 지연 시간
- **CLS** (Cumulative Layout Shift): 누적 레이아웃 이동
- **FCP** (First Contentful Paint): 최초 콘텐츠 렌더링 시간
- **TTFB** (Time to First Byte): 최초 바이트까지의 시간

---

## 🚀 측정 방법

### 방법 1: 전체 측정 (권장)

한 번에 빌드와 번들 크기를 측정합니다:

```bash
npm run measure:all
```

**실행 과정:**
1. 프로젝트 빌드 (`npm run build`)
2. 번들 크기 분석
3. 결과를 `performance-reports/baseline.json`에 저장

**출력 예시:**
```
📊 번들 크기 분석 결과
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⏰ 측정 시간: 2025-01-15 14:30:00

📊 전체 빌드 크기:
   - 바이트: 12,345,678
   - KB: 12,056.33
   - MB: 11.77

📁 JavaScript 파일 개수: 45개

🔝 가장 큰 10개 파일:
   1. chunks/vendors.js
      크기: 850.5 KB (0.83 MB)
   ...
```

---

### 방법 2: 번들 분석만

이미 빌드가 완료된 경우:

```bash
npm run measure:bundle
```

---

### 방법 3: 번들 분석 (시각화)

브라우저에서 번들을 시각적으로 분석:

```bash
npm run analyze
```

**실행 후:**
- 빌드가 완료되면 브라우저가 자동으로 열립니다
- 번들 구성을 트리맵 형태로 확인할 수 있습니다
- 큰 라이브러리나 중복 코드를 시각적으로 파악할 수 있습니다

**분석 포인트:**
- 🔴 **빨간색 영역**: 큰 번들 (최적화 필요)
- 🟡 **노란색 영역**: 중간 크기 번들
- 🟢 **녹색 영역**: 작은 번들

---

### 방법 4: Lighthouse 측정

#### 4-1. 스크립트 사용 (권장)

```bash
# 1. 개발 서버 실행 (별도 터미널)
npm run dev

# 2. Lighthouse 측정 (새 터미널)
npm run measure:lighthouse
```

**실행 결과:**
- HTML 리포트: `performance-reports/lighthouse/report-[timestamp].report.html`
- JSON 데이터: `performance-reports/lighthouse/report-[timestamp].report.json`
- 자동으로 `baseline.json` 업데이트

**리포트 열기:**
```bash
# 최신 리포트 찾기
ls -lt performance-reports/lighthouse/*.html | head -1

# 리포트 열기 (macOS)
open performance-reports/lighthouse/report-[timestamp].report.html
```

#### 4-2. Chrome DevTools 사용

수동으로 측정하고 싶은 경우:

1. **개발 서버 실행**
   ```bash
   npm run dev
   ```

2. **Chrome에서 페이지 열기**
   ```
   http://localhost:3000
   ```

3. **DevTools 열기** (F12 또는 Cmd+Option+I)

4. **Lighthouse 탭 선택**

5. **측정 옵션 설정**
   - Device: Desktop 또는 Mobile
   - Categories: 
     - ✅ Performance
     - ✅ Accessibility
     - ✅ Best Practices
     - ✅ SEO

6. **"Analyze page load" 클릭**

7. **결과 저장**
   - 우측 상단 다운로드 아이콘 클릭
   - `performance-reports/lighthouse/` 폴더에 저장

---

### 방법 5: Web Vitals 측정

Web Vitals는 자동으로 측정됩니다!

#### 개발 환경에서 확인

1. **개발 서버 실행**
   ```bash
   npm run dev
   ```

2. **페이지 접속**
   ```
   http://localhost:3000
   ```

3. **브라우저 콘솔 확인** (F12 → Console 탭)
   
   다음과 같은 로그가 자동으로 출력됩니다:
   ```
   ✅ FCP: { value: '1250ms', rating: 'good', id: 'v3-...' }
   ✅ LCP: { value: '2100ms', rating: 'good', id: 'v3-...' }
   ⚠️  CLS: { value: '0.15', rating: 'needs-improvement', id: 'v3-...' }
   ```

#### 콘솔에서 Web Vitals 확인

브라우저 콘솔에서 다음 명령어를 입력:

```javascript
// 현재 측정된 Web Vitals 보기
window.webVitals.summary()

// 저장된 기준선 보기
window.webVitals.baseline()

// 개별 메트릭 보기
window.webVitals.get()

// 기준선 초기화
window.webVitals.clear()
```

**출력 예시:**
```
📊 Web Vitals Summary
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ FCP: 1250ms (good)
✅ LCP: 2100ms (good)
⚠️  CLS: 0.15 (needs-improvement)
✅ FID: 80ms (good)
✅ TTFB: 600ms (good)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

#### LocalStorage에 저장된 기준선

Web Vitals는 자동으로 브라우저의 LocalStorage에 저장됩니다:

```javascript
// 기준선 데이터 구조
{
  "LCP": {
    "value": 2100,
    "rating": "good",
    "timestamp": "2025-01-15T05:30:00.000Z"
  },
  "FID": {
    "value": 80,
    "rating": "good",
    "timestamp": "2025-01-15T05:30:15.000Z"
  },
  "CLS": {
    "value": 0.15,
    "rating": "needs-improvement",
    "timestamp": "2025-01-15T05:30:20.000Z"
  }
}
```

---

## 📁 결과 파일

모든 측정 결과는 `performance-reports/` 폴더에 저장됩니다:

```
performance-reports/
├── baseline.json                    # 📌 성능 기준선 (중요!)
├── bundle-2025-01-15T05-30-00.json # 번들 측정 결과 (타임스탬프)
└── lighthouse/
    ├── report-2025-01-15_14-30-00.report.html  # Lighthouse HTML
    └── report-2025-01-15_14-30-00.report.json  # Lighthouse JSON
```

### baseline.json 구조

```json
{
  "created": "2025-01-15T05:30:00.000Z",
  "updated": "2025-01-15T14:30:00.000Z",
  "bundle": {
    "totalSizeMB": 11.77,
    "totalSizeKB": 12056.33,
    "filesCount": 45,
    "largestFiles": [
      {
        "name": "chunks/vendors.js",
        "size": 870912,
        "sizeKB": 850.5,
        "sizeMB": 0.83
      }
    ]
  },
  "lighthouse": {
    "performance": 85,
    "accessibility": 92,
    "bestPractices": 87,
    "seo": 100
  },
  "webVitals": {
    "lcp": "2.1s",
    "fid": "80ms",
    "cls": "0.15"
  }
}
```

---

## 📊 성능 기준

### 🎯 목표 지표

| 항목 | 현재 | 목표 | 우수 |
|------|------|------|------|
| **Lighthouse Performance** | TBD | 90+ | 95+ |
| **LCP** | TBD | < 2.5s | < 1.8s |
| **FID** | TBD | < 100ms | < 50ms |
| **CLS** | TBD | < 0.1 | < 0.05 |
| **번들 크기** | TBD | < 500KB | < 300KB |

### 📈 등급 기준

#### Lighthouse
- 🟢 **90-100**: Excellent
- 🟡 **50-89**: Needs Improvement
- 🔴 **0-49**: Poor

#### Web Vitals

**LCP (Largest Contentful Paint)**
- 🟢 **< 2.5s**: Good
- 🟡 **2.5s - 4.0s**: Needs Improvement
- 🔴 **> 4.0s**: Poor

**FID (First Input Delay)**
- 🟢 **< 100ms**: Good
- 🟡 **100ms - 300ms**: Needs Improvement
- 🔴 **> 300ms**: Poor

**CLS (Cumulative Layout Shift)**
- 🟢 **< 0.1**: Good
- 🟡 **0.1 - 0.25**: Needs Improvement
- 🔴 **> 0.25**: Poor

---

## 🔄 정기 측정 프로세스

### 1. 초기 기준선 수립 (지금!)

```bash
# 전체 측정
npm run measure:all

# Lighthouse 측정 (개발 서버 실행 후)
npm run measure:lighthouse
```

### 2. 개발 중 모니터링

```bash
# 개발 서버 실행
npm run dev

# 브라우저 콘솔에서 Web Vitals 확인
```

### 3. PR/배포 전 측정

```bash
# 빌드 및 번들 분석
npm run measure:all

# Lighthouse 측정
npm run measure:lighthouse

# 이전 기준선과 비교
cat performance-reports/baseline.json
```

### 4. 주간 리뷰

- 매주 한 번 전체 측정 실행
- 이전 주와 비교
- 개선/악화 항목 파악
- 최적화 작업 계획

---

## 🛠️ 문제 해결

### lighthouse 명령어를 찾을 수 없음

```bash
# lighthouse 전역 설치
npm install -g lighthouse

# 또는 Chrome DevTools 사용
```

### jq 명령어를 찾을 수 없음

```bash
# macOS
brew install jq

# Ubuntu/Debian
sudo apt-get install jq
```

### 개발 서버 포트가 다른 경우

`scripts/measure-lighthouse.sh` 파일에서 URL 수정:

```bash
# 기본
URL="http://localhost:3000"

# 다른 포트 사용 시
URL="http://localhost:3001"
```

### performance-reports 폴더가 없음

자동으로 생성되지만, 수동으로 생성도 가능:

```bash
mkdir -p performance-reports/lighthouse
```

---

## 📝 다음 단계

1. ✅ **기준선 수립 완료**
   - `baseline.json` 파일이 생성되었나요?
   - 모든 측정 항목이 기록되었나요?

2. 📊 **결과 분석**
   - 어떤 부분이 느린가요?
   - 큰 번들은 어디에 있나요?
   - Web Vitals 중 개선이 필요한 항목은?

3. 🎯 **최적화 계획 수립**
   - EXECUTION_ROADMAP.md의 Phase 3 참고
   - 우선순위 정하기
   - 목표 지표 설정

4. 🔄 **지속적 모니터링**
   - 주간 측정 일정 잡기
   - 변경사항 추적
   - 성능 회귀 방지

---

## 💡 팁

1. **측정 시점 통일**
   - 같은 환경에서 측정 (네트워크, 디바이스 등)
   - 캐시 클리어 후 측정
   - 시크릿 모드에서 측정

2. **여러 번 측정**
   - 한 번의 측정은 정확하지 않을 수 있습니다
   - 3-5번 측정 후 평균값 사용

3. **실제 사용자 환경 고려**
   - 모바일에서도 측정
   - 느린 네트워크 환경 시뮬레이션
   - 다양한 브라우저에서 테스트

4. **자동화**
   - CI/CD에 성능 측정 추가
   - 성능 저하 시 알림 설정
   - 배포 전 자동 검증

---

**측정을 시작하세요!** 🚀

```bash
npm run measure:all
```

