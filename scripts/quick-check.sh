#!/bin/bash

# 빠른 성능 체크 스크립트
# 사용법: bash scripts/quick-check.sh

echo ""
echo "🔍 빠른 성능 체크 실행..."
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# 색상
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

# 1. public 폴더 크기
echo -e "${BLUE}📁 Public 폴더 크기:${NC}"
if command -v du &> /dev/null; then
    echo ""
    du -sh public/ 2>/dev/null || echo "크기 확인 불가"
    echo ""
    echo "세부 내역:"
    du -sh public/images/ 2>/dev/null && echo "  - 이미지 폴더" || true
    du -sh public/webfonts/ 2>/dev/null && echo "  - 폰트 폴더" || true
    du -sh public/css/ 2>/dev/null && echo "  - CSS 폴더" || true
    echo ""
else
    echo "  du 명령어 사용 불가"
    echo ""
fi

# 2. node_modules 크기
echo -e "${BLUE}📦 node_modules 크기:${NC}"
echo ""
if [ -d "node_modules" ]; then
    du -sh node_modules/ 2>/dev/null || echo "크기 확인 불가"
else
    echo "  node_modules 없음"
fi
echo ""

# 3. .next 빌드 크기
echo -e "${BLUE}🏗️  빌드 크기 (.next):${NC}"
echo ""
if [ -d ".next" ]; then
    du -sh .next/ 2>/dev/null || echo "크기 확인 불가"
    echo ""
    if [ -d ".next/static" ]; then
        echo "정적 파일:"
        du -sh .next/static/ 2>/dev/null || true
    fi
else
    echo "  아직 빌드되지 않음"
    echo "  → 빌드하려면: npm run build"
fi
echo ""

# 4. 큰 파일 찾기
echo -e "${BLUE}📊 큰 파일 TOP 10 (public 폴더):${NC}"
echo ""
if command -v find &> /dev/null; then
    find public -type f -exec ls -lh {} \; 2>/dev/null | \
        awk '{print $5 "\t" $9}' | \
        sort -rh | \
        head -10 | \
        nl
else
    echo "  find 명령어 사용 불가"
fi
echo ""

# 5. FontAwesome 파일 확인
echo -e "${BLUE}🎨 아이콘 라이브러리 확인:${NC}"
echo ""
echo "FontAwesome 폰트:"
ls -lh public/webfonts/*.ttf 2>/dev/null | awk '{print "  " $5 "\t" $9}' || echo "  없음"
echo ""

# 6. package.json 분석
echo -e "${BLUE}📋 의존성 통계:${NC}"
echo ""
if command -v jq &> /dev/null && [ -f "package.json" ]; then
    DEPS=$(jq '.dependencies | length' package.json)
    DEV_DEPS=$(jq '.devDependencies | length' package.json)
    echo "  설치된 패키지: ${DEPS}개 (dependencies)"
    echo "  개발 패키지: ${DEV_DEPS}개 (devDependencies)"
    echo "  총: $((DEPS + DEV_DEPS))개"
else
    echo "  jq 없음 또는 package.json 없음"
fi
echo ""

# 7. 중복 아이콘 라이브러리 체크
echo -e "${BLUE}⚠️  중복 라이브러리 확인:${NC}"
echo ""
if [ -f "package.json" ]; then
    echo "아이콘 라이브러리:"
    grep -E "@fortawesome|lucide|@radix-ui/react-icons" package.json | sed 's/^/  /'
    echo ""
fi

# 8. 개선 제안
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "${YELLOW}💡 즉시 개선 가능한 항목:${NC}"
echo ""

# FontAwesome 체크
if [ -d "public/webfonts" ]; then
    FA_SIZE=$(du -sh public/webfonts/ 2>/dev/null | awk '{print $1}')
    echo -e "${RED}1. FontAwesome 폰트 제거 (${FA_SIZE})${NC}"
    echo "   → Lucide로 통일하면 번들 크기 감소"
    echo "   → 명령어: rm -rf public/webfonts"
    echo ""
fi

# 중복 favicon 체크
if [ -d "public/images/facivon_white" ] && [ -d "public/images/favicon_black" ]; then
    echo -e "${RED}2. 중복 favicon 정리${NC}"
    echo "   → 두 가지 버전 유지 필요한지 확인"
    echo "   → 하나로 통일하면 용량 절약"
    echo ""
fi

# 큰 이미지 체크
LARGE_IMAGES=$(find public/images -type f -size +500k 2>/dev/null | wc -l)
if [ "$LARGE_IMAGES" -gt 0 ]; then
    echo -e "${YELLOW}3. 큰 이미지 최적화 (${LARGE_IMAGES}개)${NC}"
    echo "   → 500KB 이상 이미지 압축 필요"
    echo "   → WebP 변환 권장"
    echo ""
fi

# 9. 다음 단계
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "${GREEN}🚀 다음 단계:${NC}"
echo ""
echo "1. 번들 분석 (시각화):"
echo "   npm run analyze"
echo ""
echo "2. 불필요한 패키지 찾기:"
echo "   npx depcheck"
echo ""
echo "3. 상세 리포트 보기:"
echo "   cat performance-reports/README.md"
echo ""
echo "4. 개선 계획 보기:"
echo "   cat performance-reports/ANALYSIS.md"
echo ""

