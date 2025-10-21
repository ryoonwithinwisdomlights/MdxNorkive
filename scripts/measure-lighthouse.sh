#!/bin/bash

# Lighthouse 측정 스크립트
# 
# 사용법: npm run measure:lighthouse
# 또는: ./scripts/measure-lighthouse.sh

echo ""
echo "🔍 Lighthouse 성능 측정 시작..."
echo ""

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# lighthouse가 설치되어 있는지 확인
if ! command -v lighthouse &> /dev/null; then
    echo -e "${YELLOW}⚠️  lighthouse가 설치되어 있지 않습니다.${NC}"
    echo ""
    echo "다음 명령어로 설치하세요:"
    echo -e "${GREEN}npm install -g lighthouse${NC}"
    echo ""
    echo "또는 Chrome DevTools를 사용하세요:"
    echo "1. 개발 서버 실행: npm run dev"
    echo "2. Chrome에서 사이트 열기"
    echo "3. F12 → Lighthouse 탭 → 분석 실행"
    echo ""
    exit 1
fi

# 사용자에게 서버 실행 상태 확인
echo -e "${BLUE}📋 사전 준비 확인${NC}"
echo ""
echo "개발 서버가 실행 중인가요?"
echo -e "${GREEN}1) 예 - 계속 진행${NC}"
echo -e "${YELLOW}2) 아니오 - 가이드 보기${NC}"
echo ""
read -p "선택 (1 또는 2): " choice

if [ "$choice" != "1" ]; then
    echo ""
    echo -e "${YELLOW}📌 개발 서버 실행 방법:${NC}"
    echo ""
    echo "새 터미널을 열고 다음 명령어를 실행하세요:"
    echo -e "${GREEN}npm run dev${NC}"
    echo ""
    echo "서버가 실행되면 이 스크립트를 다시 실행하세요."
    echo ""
    exit 0
fi

# 측정할 URL
URL="http://localhost:3000"

echo ""
echo -e "${BLUE}🎯 측정 URL: ${URL}${NC}"
echo ""

# 결과를 저장할 디렉토리
REPORT_DIR="performance-reports/lighthouse"
mkdir -p "$REPORT_DIR"

# 타임스탬프
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")

# Lighthouse 실행
echo -e "${GREEN}⚡ Lighthouse 실행 중...${NC}"
echo ""

lighthouse "$URL" \
  --output html \
  --output json \
  --output-path "$REPORT_DIR/report-$TIMESTAMP" \
  --chrome-flags="--headless" \
  --only-categories=performance,accessibility,best-practices,seo \
  --quiet

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✅ Lighthouse 측정 완료!${NC}"
    echo ""
    echo -e "${BLUE}📊 결과 파일:${NC}"
    echo "   - HTML 리포트: $REPORT_DIR/report-$TIMESTAMP.report.html"
    echo "   - JSON 데이터: $REPORT_DIR/report-$TIMESTAMP.report.json"
    echo ""
    echo -e "${YELLOW}💡 HTML 리포트를 브라우저에서 열어보세요:${NC}"
    echo -e "${GREEN}open $REPORT_DIR/report-$TIMESTAMP.report.html${NC}"
    echo ""
    
    # JSON에서 점수 추출 및 표시
    JSON_FILE="$REPORT_DIR/report-$TIMESTAMP.report.json"
    
    if command -v jq &> /dev/null; then
        echo -e "${BLUE}📈 점수 요약:${NC}"
        echo ""
        
        PERF=$(jq -r '.categories.performance.score * 100' "$JSON_FILE" 2>/dev/null || echo "N/A")
        ACCESS=$(jq -r '.categories.accessibility.score * 100' "$JSON_FILE" 2>/dev/null || echo "N/A")
        BEST=$(jq -r '.categories["best-practices"].score * 100' "$JSON_FILE" 2>/dev/null || echo "N/A")
        SEO=$(jq -r '.categories.seo.score * 100' "$JSON_FILE" 2>/dev/null || echo "N/A")
        
        echo "   Performance:    $PERF / 100"
        echo "   Accessibility:  $ACCESS / 100"
        echo "   Best Practices: $BEST / 100"
        echo "   SEO:           $SEO / 100"
        echo ""
        
        # baseline.json 업데이트
        BASELINE_FILE="performance-reports/baseline.json"
        if [ -f "$BASELINE_FILE" ]; then
            TMP_FILE=$(mktemp)
            jq --arg perf "$PERF" \
               --arg access "$ACCESS" \
               --arg best "$BEST" \
               --arg seo "$SEO" \
               --arg updated "$(date -u +"%Y-%m-%dT%H:%M:%S.000Z")" \
               '.lighthouse.performance = ($perf | tonumber) | 
                .lighthouse.accessibility = ($access | tonumber) | 
                .lighthouse.bestPractices = ($best | tonumber) | 
                .lighthouse.seo = ($seo | tonumber) |
                .updated = $updated' \
               "$BASELINE_FILE" > "$TMP_FILE" && mv "$TMP_FILE" "$BASELINE_FILE"
            
            echo -e "${GREEN}✅ baseline.json 업데이트됨${NC}"
            echo ""
        fi
    else
        echo -e "${YELLOW}💡 jq를 설치하면 점수를 자동으로 확인할 수 있습니다:${NC}"
        echo -e "${GREEN}brew install jq${NC}"
        echo ""
    fi
    
    echo -e "${YELLOW}📌 다음 단계:${NC}"
    echo "   1. 번들 분석: npm run analyze"
    echo "   2. 전체 기준선 확인: cat performance-reports/baseline.json"
    echo ""
else
    echo ""
    echo -e "${RED}❌ Lighthouse 측정 실패${NC}"
    echo ""
    echo "문제 해결:"
    echo "   1. 개발 서버가 실행 중인지 확인"
    echo "   2. http://localhost:3000 접속 가능한지 확인"
    echo "   3. Chrome이 설치되어 있는지 확인"
    echo ""
    exit 1
fi

