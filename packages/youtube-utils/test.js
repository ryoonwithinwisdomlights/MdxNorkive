// 간단한 테스트 스크립트
const { getYoutubeId, isValidYoutubeUrl, getYoutubeParams } = require('./dist/index.js');

console.log('🧪 @norkive/youtube-utils 테스트 시작\n');

const testCases = [
  'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  'https://youtu.be/dQw4w9WgXcQ',
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  'https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=10',
  'https://example.com',
];

console.log('📝 getYoutubeId 테스트:');
testCases.forEach(url => {
  const id = getYoutubeId(url);
  const status = id ? '✅' : '❌';
  console.log(`  ${status} ${url} → ${id || 'null'}`);
});

console.log('\n📝 isValidYoutubeUrl 테스트:');
testCases.forEach(url => {
  const isValid = isValidYoutubeUrl(url);
  const status = isValid ? '✅' : '❌';
  console.log(`  ${status} ${url} → ${isValid}`);
});

console.log('\n📝 getYoutubeParams 테스트:');
const paramUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=10&list=PLxxx';
const params = getYoutubeParams(paramUrl);
console.log(`  ✅ ${paramUrl}`);
console.log(`     → ${JSON.stringify(params)}`);

console.log('\n✅ 모든 테스트 완료!');

