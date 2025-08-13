#!/usr/bin/env tsx

import { create, insert, search } from "@orama/orama";

async function debugSearch() {
  try {
    console.log("🔍 검색 디버깅 시작");
    
    // 1. 간단한 스키마로 테스트
    const schema = {
      title: "string",
      content: "string",
    };
    
    console.log("1️⃣ 간단한 스키마로 테스트");
    const db = create({ schema });
    console.log("DB 생성됨:", typeof db);
    
    // 2. 문서 삽입
    console.log("2️⃣ 문서 삽입");
    const doc1 = await insert(db, { title: "테스트 제목", content: "테스트 내용입니다" });
    const doc2 = await insert(db, { title: "성능 최적화", content: "웹 성능을 최적화하는 방법" });
    console.log("문서 삽입 완료:", doc1, doc2);
    
    // 3. 검색 테스트
    console.log("3️⃣ 검색 테스트");
    const results1 = await search(db, { term: "테스트" });
    console.log("'테스트' 검색 결과:", results1);
    
    const results2 = await search(db, { term: "성능" });
    console.log("'성능' 검색 결과:", results2);
    
    const results3 = await search(db, { term: "웹" });
    console.log("'웹' 검색 결과:", results3);
    
    // 4. DB 상태 확인
    console.log("4️⃣ DB 상태 확인");
    console.log("DB 데이터:", db.data);
    console.log("DB 스키마:", db.schema);
    
  } catch (error) {
    console.error("❌ 디버깅 중 오류:", error);
  }
}

if (require.main === module) {
  debugSearch().catch(console.error);
}
