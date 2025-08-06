# Cloudinary 설정 가이드

## 1. Cloudinary 계정 생성

1. [Cloudinary 웹사이트](https://cloudinary.com/)에서 무료 계정 생성
2. 로그인 후 대시보드에서 다음 정보 확인:
   - **Cloud Name**
   - **API Key**
   - **API Secret**

## 2. 환경변수 설정

`.env.local` 파일에 다음 환경변수를 추가하세요:

```env
# Cloudinary 설정
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## 3. 업로드 프리셋 설정 (선택사항)

Cloudinary 대시보드에서 업로드 프리셋을 설정할 수 있습니다:

1. **Settings** → **Upload** → **Upload presets**
2. **Add upload preset** 클릭
3. 프리셋 이름 설정 (예: `norkive_upload`)
4. **Signing Mode**: `Unsigned` 선택
5. **Folder**: `norkive-images` 설정
6. **Transformations**: `f_auto,q_auto` 추가 (자동 포맷, 자동 품질)

## 4. 시스템 동작 방식

### 이미지 처리 플로우:
```
1. 노션 이미지 URL 감지
2. Cloudinary에 업로드
3. 최적화된 URL 반환
4. Redis에 캐시 저장
5. MDX 콘텐츠 업데이트
```

### 자동화 스케줄:
- **매일 자정**: 전체 노션 콘텐츠 동기화
- **변경사항 감지**: 새로운 이미지만 처리
- **캐시 관리**: 24시간 유효한 Redis 캐시

## 5. 이미지 최적화 기능

Cloudinary는 자동으로 다음 최적화를 수행합니다:

- **자동 포맷**: WebP, AVIF 등 최신 포맷으로 변환
- **자동 품질**: 파일 크기 최적화
- **리사이징**: 필요에 따라 크기 조정
- **CDN**: 전 세계 빠른 배포

## 6. 사용 예시

### 이미지 URL 변환:
```
원본: https://prod-files-secure.s3.us-west-2.amazonaws.com/.../image.jpg
변환: https://res.cloudinary.com/your-cloud-name/image/upload/v1234567890/norkive-notion-images/image.jpg
```

### 최적화된 URL:
```
기본: https://res.cloudinary.com/your-cloud-name/image/upload/v1234567890/norkive-notion-images/image.jpg
최적화: https://res.cloudinary.com/your-cloud-name/image/upload/f_auto,q_auto,w_800/v1234567890/norkive-notion-images/image.jpg
```

## 7. 모니터링

Cloudinary 대시보드에서 다음을 확인할 수 있습니다:

- **업로드된 이미지 수**
- **사용된 저장공간**
- **트래픽 사용량**
- **변환 작업 수**

## 8. 비용 관리

무료 플랜 제한:
- **저장공간**: 25GB
- **월간 대역폭**: 25GB
- **변환 작업**: 월 25,000회

이를 초과하면 유료 플랜으로 업그레이드가 필요합니다.

## 9. 문제 해결

### 일반적인 문제들:

1. **업로드 실패**: API 키와 시크릿 확인
2. **이미지 깨짐**: 원본 URL 접근 가능성 확인
3. **캐시 문제**: Redis 연결 상태 확인

### 로그 확인:
```bash
# 개발 서버 로그
npm run dev

# 빌드 로그
npm run build
``` 