
export default [
  {
    "notionId": "2301eb5c0337807eb71bde1fcaa084ec",
    "title": "MDX를 추천한 이유는 “표현의 자유도와 커스터마이징 범위가 압도적으로 넓기 때문”",
    "icon": "",
    "full": false,
    "summary": "",
    "pageCover": "https://images.unsplash.com/photo-1593062096033-9a26b09da705?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb",
    "password": "",
    "type": "ENGINEERINGS",
    "description": "",
    "date": "2025-07-14T00:00:00.000Z",
    "lastEditedDate": "2025-08-09T14:49:00.000Z",
    "sub_type": "TIL",
    "category": "TIL",
    "tags": [
      "mdx"
    ],
    "draft": false,
    "favorite": false,
    "readingTime": 42,
    "wordCount": 8284,
    "lastModified": "2025-08-09",
    "version": "1.0.0",
    "status": "published",
    "author": "ryoonwithinwisdomlights",
    "content": "정확하게 질문 잘했어. 그리고 <strong>“왜 MDX냐?”</strong>를 딱 짚은 거야.\n결론부터 말하자면:\n\n> ✅\n>\n> **맞아. MDX를 추천한 이유는 “표현의 자유도와 커스터마이징 범위가 압도적으로 넓기 때문”이야.**\n>\n>\n> 특히 Notion에서 가져온 다양한 콘텐츠 유형(유튜브, PDF, 링크 프리뷰 등)은\n>\n> **일반 Markdown만으로는 표현이 어렵고 한계가 있어.**\n>\n>\n\n\n<strong>🔍 왜 일반 Markdown만으론 부족할까?</strong>\n\n\n\n| <strong>콘텐츠 유형</strong>         | <strong>Markdown에서 표현 가능?</strong> | <strong>한계</strong>                 |\n| ------------------ | --------------------- | ---------------------- |\n| 텍스트, 제목            | ✅ 가능                  | 없음                     |\n| 코드 블록              | ✅ 가능                  | shiki 등 하이라이팅 추가는 어려움  |\n| 이미지                | ✅ 가능                  | alt, caption 제한적       |\n| 유튜브 링크             | ❌ 어려움                 | iframe 직접 넣기 어려움       |\n| PDF 파일             | ❌ 불가능                 | HTML로 삽입 불가            |\n| 북마크/링크 프리뷰         | ❌ 안 됨                 | og:image, meta 등 표현 불가 |\n| 커스텀 블록 (callout 등) | ❌ 안 됨                 | 디자인/기능 삽입 불가           |\n\n\n→ 결국 일반 Markdown은 <strong>기본적인 콘텐츠만</strong> 표현 가능해.\n\n\n→ 그런데 <strong>Notion은 멀티미디어 & 구조적 블록 기반 문서</strong>잖아?\n\n\n→ 그래서 Markdown으로만 변환하면 정보가 “잘리거나 날아가거나 표현력 손실”이 생겨.\n\n\n## <strong>✅ 그래서 MDX를 추천한 이유 3가지</strong>\n\n\n### <strong>1️⃣</strong>\n\n\n### <strong>멀티미디어 표현력 확장</strong>\n\n- &lt;YouTube id=\"abc123\" /&gt;\n- &lt;PDFViewer src=\"/files/my.pdf\" /&gt;\n- &lt;Bookmark href=\"https://example.com\" title=\"...\" image=\"...\" /&gt;\n\n➡ 이런 <strong>컴포넌트 형태로 표현 가능</strong>\n\n\n➡ Notion 블록 단위로 컴포넌트 매핑도 가능 (예: Callout → <Callout type=\"info\">...</Callout>)\n\n\n---\n\n\n### <strong>2️⃣</strong>\n\n\n### <strong>정적 렌더링 + SEO 최적화 가능</strong>\n\n- .mdx는 Next.js에서 <strong>정적 HTML로 빌드 가능</strong>\n- &lt;head&gt; 안에 title, description, og:image 다 박을 수 있음\n- 검색엔진, SNS 공유 최적화 가능\n\n➡ 실시간 렌더 (react-notion-x)보다 훨씬 빠르고 안정적\n\n\n➡ 로봇이 페이지 구조를 이해하기 쉬움 (SSR or SSG)\n\n\n---\n\n\n### <strong>3️⃣</strong>\n\n\n### <strong>디자인과 UX 커스터마이징 자유도</strong>\n\n- Notion callout → Tailwind 기반 &lt;Callout&gt; 컴포넌트\n- Bookmark → 이미지 프리뷰 포함된 &lt;BookmarkCard&gt;\n- 링크 → 자동 언패킹 &lt;Unfurl url=\"...\" /&gt;\n\n➡ Markdown은 무조건 텍스트\n\n\n➡ MDX는 <strong>React 기반 전체 디자인 구성 가능</strong>\n\n\n---\n\n\n\n<strong>🔄 Notion → MDX 실전 예시</strong>\n\n\n\n| <strong>Notion 블록</strong> | <strong>MDX 변환 예시</strong>                               |\n| ------------- | ------------------------------------------- |\n| 유튜브 링크        | &lt;YouTube id=\"abc123\" /&gt;                     |\n| PDF 첨부        | &lt;PDF src=\"/files/manual.pdf\" /&gt;             |\n| Callout 블록    | <Callout type=\"warning\">중요합니다!</Callout>    |\n| 링크 프리뷰        | &lt;Bookmark href=\"https://...\" title=\"...\" /&gt; |\n\n\n※ 이런 식으로 <strong>notion-to-mdx.ts 스크립트에서 변환 로직을 설정</strong>하면 돼.\n\n\n---\n\n\n## <strong>🧠 그래서 구조적으로 이렇게 생각하면 돼</strong>\n\n\n```plain text\n[Notion]\n → notion-to-md로 Markdown 변환\n   → 커스텀 변환 스크립트로 .mdx로 변형\n     → React Component로 변환할 수 있는 Hook Point 삽입\n       → @content-collections/mdx로 정적 빌드\n         → SEO + 성능 + 디자인 다 잡음\n```\n\n\n## <strong>✅ 결론</strong>\n\n> 🔥\n>\n> **“표현력 + 성능 + 커스터마이징”의 세 마리 토끼를 잡으려면, Notion → MDX → 정적 렌더링이 정답**\n>\n>\n- 유튜브, PDF, 북마크 같은 블록들 표현해야 한다면 <strong>Markdown은 한계 있음</strong>\n- 정적 빌드 + React 컴포넌트 표현이 가능해야 한다면 <strong>MDX는 사실상 유일한 솔루션</strong>\n\n---\n\n\n필요하다면 이제:\n\n- notion-to-md 결과 → .mdx로 저장하면서 &lt;YouTube /&gt;, &lt;Bookmark /&gt; 삽입하는 스크립트\n- MDX 컴포넌트 자동 등록 방법\n- rehype-pretty-code + Tailwind + prose 스타일 조합 예시\n\n| <strong>단계</strong>                                       | <strong>진행상태</strong>                     |\n| -------------------------------------------- | ---------------------------- |\n| <strong>1. Notion API로 데이터 가져오기</strong>                  | ✅ 완료                         |\n| <strong>2. notion-to-md로 Markdown 문자열 변환</strong>         | ✅ 완료                         |\n| <strong>3. gray-matter로 frontmatter 붙이기</strong>          | ✅ 완료                         |\n| <strong>4. .mdx 파일로 저장 (content/record)</strong>          | ✅ 완료                         |\n| <strong>5. @content-collections/core로 컬렉션 분석</strong>     | ✅ 완료 (content.config.ts 설정됨) |\n| <strong>6. @content-collections/mdx로 render() 생성</strong> | ✅ 완료 (.mdx → render 생성됨)     |\n| <strong>7. MDXContent로 렌더링</strong>                       | 🟡 지금 여기!                    |\n| <strong>8. 커스텀 블록(MDX 컴포넌트) 확장</strong>                   | ⏳ 추후 단계                      |\n\n\n> 고미워 너가 권유하는 결론처럼 하면 될 것 같아.  \n> 그런데 나 또 궁금한게.[https://ryoonwithwisdomtrees.notion.site/21a1eb5c03378057b4e5d3be1fd96dce?v=21a1eb5c033781ebb512000cc8e1b56a&source=copy_link](https://ryoonwithwisdomtrees.notion.site/21a1eb5c03378057b4e5d3be1fd96dce?v=21a1eb5c033781ebb512000cc8e1b56a)  \n> 내 노션디비보면 알겠지만 글의 type이 여러개란 말이지?  \n> 기존에는 타입별로 갖고왔는데,  \n> 이제 새롭게 바뀌는 notiondb=>md=>mdx=> 이 구조의 블로그는  \n> 그냥 Record라는 단일 디렉토리 하위로 다 값을 갖고오게 바꾸는게 맞는걸까? type은이제  \n> Notice, Page, Menu, SubMenu,SubMenuPage,Record만 있고  \n> ( 모든 게시글은 다 Record. SubMenuPage나 Page는 특정 타입으로 떨어지는 게시글들이 아닌 메인 메뉴 하위의 author, norkive등을 소개하는 페이지. notice는 그야말로 공지사항용) sub_type이나 카테고리에 engineering,general,project이렇게 나누는게 맞으려나?  \n> 그리고 성찬이는 보니까 [https://www.sxungchxn.dev/blog/47eb7d5f-0c8b-4e45-8c6e-4c8a103f9c10](https://www.sxungchxn.dev/blog/47eb7d5f-0c8b-4e45-8c6e-4c8a103f9c10)  \n> 이렇게 slug가 노션 id값이더라고. 퓨마독스는 [https://fumadocs.dev/docs/headless/content-collections](https://fumadocs.dev/docs/headless/content-collections) 이렇게 문자열이고.  \n> 문자열 방식이 더 좋은거 같지만, 이제 블로그문서를 id값으로 가져오는거는 불가능해진건가?  \n> 그러면 우리가 이제까지 upsache redis등을 통해서 구축한 캐슁( 글 하나 가져오기, 전체글 가져오기별로 다르게적용한)은 다 무용지물 되는거아닌가?  \n> 등등의 생각에 복잡하고 걱정이 많이돼.\n\n\n륭언니 고민 아주 현실적이고 깊이 있어서 너무 좋고, 지금 리팩토링 방향을 진짜 잘 잡아가고 있어요. 하나하나 정리해서 <strong>현재 구조에 맞는 가장 깔끔한 아키텍처</strong> 제안드릴게요:\n\n\n---\n\n\n## <strong>✅ 1.</strong>\n\n\n## <strong>디렉토리 구조: Record 하나로 통합 vs 타입별 분리?</strong>\n\n\n### <strong>🔹 추천:</strong>\n\n\n### <strong>content/record</strong>\n\n\n### <strong>단일 디렉토리 사용 + 타입은</strong>\n\n\n### <strong>FrontMatter</strong>\n\n\n### <strong>로 구분</strong>\n\n- Notion DB에서 type 속성은 Menu, Notice, Page, SubMenu, SubMenuPage, Record 이렇게 있지만,\n- 실제 보여주는 <strong>블로그 콘텐츠는 Record뿐</strong>이잖아요?\n\n👉 그래서 .mdx 파일은 모두 content/record/에 저장하고,\n\n\ntype은 FrontMatter에 보존해서 필요할 때만 필터링하는 게 깔끔해요.\n\n\n```plain text\n---\ntitle: \"나의 블로그 글\"\ndate: \"2025-07-14\"\ntype: \"Record\"\nsub_type: \"engineering\"\ntags: [\"Next.js\", \"Notion\"]\ndraft: false\n---\n```\n\n\n이렇게 하면 /record/[slug]에서 <strong>sub_type</strong>, tags, type 전부 필터링이나 분류에 사용할 수 있어요.\n\n\n\n**✅ 2. \n성찬이처럼 slug에 UUID 쓰는 구조는 왜 안 추천하냐면…**\n\n\n\n### <strong>📉 단점:</strong>\n\n- 사용자 입장에서 너무 불친절해요 (URL 기억도 안 남)\n- SEO 약해요. 검색엔진이 이게 무슨 글인지 알 수 없음.\n- 링크 공유도 구리죠… UX적으로 ✘\n\n\n<strong>✅ 대신:/record/nextjs-15-architecture-refactor-guide</strong>\n\n\n- 글 제목 기반 slug\n- 중복 있을 시 -1, -2 suffix\n- entry.slug → URL 경로로 사용\n- 그래도 Notion ID 필요하면 entry.notionId로 같이 보존하면 돼요.\n\n\n**✅ 3. \n그럼 캐싱 구조는 무용지물 되는 거야?**\n\n**👌 절대 아니에요! \n구조가 바뀌었을 뿐 역할은 그대로 유효해요.**\n\n\n\n| <strong>예전 방식 (notion-client 기반)</strong> | <strong>새로운 방식 (정적 MDX 기반)</strong>        |\n| ---------------------------- | ----------------------------- |\n| 서버에서 직접 요청 (getPage etc.)    | notion-to-mdx.ts 실행 시 변환 후 저장 |\n| 매 요청마다 캐시 필요                 | <strong>빌드 시점에 모두 캐시됨</strong> (SSG)       |\n| Redis 등으로 getPage 캐싱         | 더이상 필요 없음 (파일 시스템 기반 정적 캐시)   |\n\n\n### <strong>💡 단, 다음과 같은 캐싱은 여전히 쓸 수 있어요:</strong>\n\n- 🔁 <strong>글 목록 정렬 결과</strong>를 getAllRecords() 형태로 인메모리 캐싱\n- 📌 <strong>검색용 인덱스</strong> (예: fuse.js용 JSON) Redis에 올려도 됨\n- 🧠 <strong>조회수/좋아요 등 dynamic 데이터</strong>는 Redis or DB 써야 함\n\n\n**✅ 4. \n카테고리: sub_type vs tags 정리**\n\n\n\n| <strong>목적</strong> | <strong>필드</strong>   | <strong>예시</strong>                              |\n| ------ | -------- | ----------------------------------- |\n| 콘텐츠 분류 | sub_type | \"engineering\", \"project\", \"general\" |\n| 검색, 필터 | tags     | [\"notion\", \"mdx\", \"frontend\"]       |\n\n- sub_type은 <strong>1:1 필수 분류</strong> (폴더처럼 역할)\n- tags는 <strong>다대다 필수 아님</strong> (검색 필터용)\n\n\n<strong>🔚 결론 요약</strong>\n\n\n\n| <strong>항목</strong>        | <strong>추천 방향</strong>                                    |\n| ------------- | -------------------------------------------- |\n| 디렉토리 구조       | content/record/ 하나로 몰기                       |\n| slug          | 제목 기반 slugify (중복 제거 로직 포함)                  |\n| type/sub_type | frontmatter로 보존 & 필터                         |\n| Notion ID     | 필요 시 notionId로 저장 (slug엔 쓰지 않음)              |\n| 캐싱 전략         | 정적 파일 기반이라 Redis 불필요, but 검색/조회수 용도로는 여전히 유효 |\n| SEO/UX        | UUID 대신 readable slug가 훨씬 우수                 |",
    "_meta": {
      "filePath": "engineerings-MDX를-추천한-이유는-표현의-자유도와-커스터마이징-범.mdx",
      "fileName": "engineerings-MDX를-추천한-이유는-표현의-자유도와-커스터마이징-범.mdx",
      "directory": ".",
      "extension": "mdx",
      "path": "engineerings-MDX를-추천한-이유는-표현의-자유도와-커스터마이징-범"
    },
    "toc": [
      {
        "title": "✅ 그래서 MDX를 추천한 이유 3가지",
        "url": "#-그래서-mdx를-추천한-이유-3가지",
        "depth": 2
      },
      {
        "title": "1️⃣",
        "url": "#1️⃣",
        "depth": 3
      },
      {
        "title": "멀티미디어 표현력 확장",
        "url": "#멀티미디어-표현력-확장",
        "depth": 3
      },
      {
        "title": "2️⃣",
        "url": "#2️⃣",
        "depth": 3
      },
      {
        "title": "정적 렌더링 + SEO 최적화 가능",
        "url": "#정적-렌더링--seo-최적화-가능",
        "depth": 3
      },
      {
        "title": "3️⃣",
        "url": "#3️⃣",
        "depth": 3
      },
      {
        "title": "디자인과 UX 커스터마이징 자유도",
        "url": "#디자인과-ux-커스터마이징-자유도",
        "depth": 3
      },
      {
        "title": "🧠 그래서 구조적으로 이렇게 생각하면 돼",
        "url": "#-그래서-구조적으로-이렇게-생각하면-돼",
        "depth": 2
      },
      {
        "title": "✅ 결론",
        "url": "#-결론",
        "depth": 2
      },
      {
        "title": "✅ 1.",
        "url": "#-1",
        "depth": 2
      },
      {
        "title": "디렉토리 구조: Record 하나로 통합 vs 타입별 분리?",
        "url": "#디렉토리-구조-record-하나로-통합-vs-타입별-분리",
        "depth": 2
      },
      {
        "title": "🔹 추천:",
        "url": "#-추천",
        "depth": 3
      },
      {
        "title": "content/record",
        "url": "#contentrecord",
        "depth": 3
      },
      {
        "title": "단일 디렉토리 사용 + 타입은",
        "url": "#단일-디렉토리-사용--타입은",
        "depth": 3
      },
      {
        "title": "FrontMatter",
        "url": "#frontmatter",
        "depth": 3
      },
      {
        "title": "로 구분",
        "url": "#로-구분",
        "depth": 3
      },
      {
        "title": "📉 단점:",
        "url": "#-단점",
        "depth": 3
      },
      {
        "title": "💡 단, 다음과 같은 캐싱은 여전히 쓸 수 있어요:",
        "url": "#-단-다음과-같은-캐싱은-여전히-쓸-수-있어요",
        "depth": 3
      }
    ],
    "structuredData": {
      "contents": [
        {
          "heading": "",
          "content": "정확하게 질문 잘했어. 그리고 “왜 MDX냐?”를 딱 짚은 거야.\n결론부터 말하자면:"
        },
        {
          "heading": "",
          "content": "✅맞아. MDX를 추천한 이유는 “표현의 자유도와 커스터마이징 범위가 압도적으로 넓기 때문”이야.특히 Notion에서 가져온 다양한 콘텐츠 유형(유튜브, PDF, 링크 프리뷰 등)은일반 Markdown만으로는 표현이 어렵고 한계가 있어."
        },
        {
          "heading": "",
          "content": "콘텐츠 유형"
        },
        {
          "heading": "",
          "content": "Markdown에서 표현 가능?"
        },
        {
          "heading": "",
          "content": "한계"
        },
        {
          "heading": "",
          "content": "텍스트, 제목"
        },
        {
          "heading": "",
          "content": "✅ 가능"
        },
        {
          "heading": "",
          "content": "없음"
        },
        {
          "heading": "",
          "content": "코드 블록"
        },
        {
          "heading": "",
          "content": "✅ 가능"
        },
        {
          "heading": "",
          "content": "shiki 등 하이라이팅 추가는 어려움"
        },
        {
          "heading": "",
          "content": "이미지"
        },
        {
          "heading": "",
          "content": "✅ 가능"
        },
        {
          "heading": "",
          "content": "alt, caption 제한적"
        },
        {
          "heading": "",
          "content": "유튜브 링크"
        },
        {
          "heading": "",
          "content": "❌ 어려움"
        },
        {
          "heading": "",
          "content": "iframe 직접 넣기 어려움"
        },
        {
          "heading": "",
          "content": "PDF 파일"
        },
        {
          "heading": "",
          "content": "❌ 불가능"
        },
        {
          "heading": "",
          "content": "HTML로 삽입 불가"
        },
        {
          "heading": "",
          "content": "북마크/링크 프리뷰"
        },
        {
          "heading": "",
          "content": "❌ 안 됨"
        },
        {
          "heading": "",
          "content": "og:image, meta 등 표현 불가"
        },
        {
          "heading": "",
          "content": "커스텀 블록 (callout 등)"
        },
        {
          "heading": "",
          "content": "❌ 안 됨"
        },
        {
          "heading": "",
          "content": "디자인/기능 삽입 불가"
        },
        {
          "heading": "",
          "content": "→ 결국 일반 Markdown은 기본적인 콘텐츠만 표현 가능해."
        },
        {
          "heading": "",
          "content": "→ 그런데 Notion은 멀티미디어 & 구조적 블록 기반 문서잖아?"
        },
        {
          "heading": "",
          "content": "→ 그래서 Markdown으로만 변환하면 정보가 “잘리거나 날아가거나 표현력 손실”이 생겨."
        },
        {
          "heading": "멀티미디어-표현력-확장",
          "content": "<YouTube id=\"abc123\" />"
        },
        {
          "heading": "멀티미디어-표현력-확장",
          "content": "<PDFViewer src=\"/files/my.pdf\" />"
        },
        {
          "heading": "멀티미디어-표현력-확장",
          "content": "<Bookmark href=\"https://example.com\" title=\"...\" image=\"...\" />"
        },
        {
          "heading": "멀티미디어-표현력-확장",
          "content": "➡ 이런 컴포넌트 형태로 표현 가능"
        },
        {
          "heading": "멀티미디어-표현력-확장",
          "content": "➡ Notion 블록 단위로 컴포넌트 매핑도 가능 (예: Callout → ...)"
        },
        {
          "heading": "정적-렌더링--seo-최적화-가능",
          "content": ".mdx는 Next.js에서 정적 HTML로 빌드 가능"
        },
        {
          "heading": "정적-렌더링--seo-최적화-가능",
          "content": "<head> 안에 title, description, og:image 다 박을 수 있음"
        },
        {
          "heading": "정적-렌더링--seo-최적화-가능",
          "content": "검색엔진, SNS 공유 최적화 가능"
        },
        {
          "heading": "정적-렌더링--seo-최적화-가능",
          "content": "➡ 실시간 렌더 (react-notion-x)보다 훨씬 빠르고 안정적"
        },
        {
          "heading": "정적-렌더링--seo-최적화-가능",
          "content": "➡ 로봇이 페이지 구조를 이해하기 쉬움 (SSR or SSG)"
        },
        {
          "heading": "디자인과-ux-커스터마이징-자유도",
          "content": "Notion callout → Tailwind 기반 <Callout> 컴포넌트"
        },
        {
          "heading": "디자인과-ux-커스터마이징-자유도",
          "content": "Bookmark → 이미지 프리뷰 포함된 <BookmarkCard>"
        },
        {
          "heading": "디자인과-ux-커스터마이징-자유도",
          "content": "링크 → 자동 언패킹 <Unfurl url=\"...\" />"
        },
        {
          "heading": "디자인과-ux-커스터마이징-자유도",
          "content": "➡ Markdown은 무조건 텍스트"
        },
        {
          "heading": "디자인과-ux-커스터마이징-자유도",
          "content": "➡ MDX는 React 기반 전체 디자인 구성 가능"
        },
        {
          "heading": "디자인과-ux-커스터마이징-자유도",
          "content": "Notion 블록"
        },
        {
          "heading": "디자인과-ux-커스터마이징-자유도",
          "content": "MDX 변환 예시"
        },
        {
          "heading": "디자인과-ux-커스터마이징-자유도",
          "content": "유튜브 링크"
        },
        {
          "heading": "디자인과-ux-커스터마이징-자유도",
          "content": "<YouTube id=\"abc123\" />"
        },
        {
          "heading": "디자인과-ux-커스터마이징-자유도",
          "content": "PDF 첨부"
        },
        {
          "heading": "디자인과-ux-커스터마이징-자유도",
          "content": "<PDF src=\"/files/manual.pdf\" />"
        },
        {
          "heading": "디자인과-ux-커스터마이징-자유도",
          "content": "Callout 블록"
        },
        {
          "heading": "디자인과-ux-커스터마이징-자유도",
          "content": "중요합니다!"
        },
        {
          "heading": "디자인과-ux-커스터마이징-자유도",
          "content": "링크 프리뷰"
        },
        {
          "heading": "디자인과-ux-커스터마이징-자유도",
          "content": "<Bookmark href=\"https://...\" title=\"...\" />"
        },
        {
          "heading": "디자인과-ux-커스터마이징-자유도",
          "content": "※ 이런 식으로 notion-to-mdx.ts 스크립트에서 변환 로직을 설정하면 돼."
        },
        {
          "heading": "-결론",
          "content": "🔥“표현력 + 성능 + 커스터마이징”의 세 마리 토끼를 잡으려면, Notion → MDX → 정적 렌더링이 정답"
        },
        {
          "heading": "-결론",
          "content": "유튜브, PDF, 북마크 같은 블록들 표현해야 한다면 Markdown은 한계 있음"
        },
        {
          "heading": "-결론",
          "content": "정적 빌드 + React 컴포넌트 표현이 가능해야 한다면 MDX는 사실상 유일한 솔루션"
        },
        {
          "heading": "-결론",
          "content": "필요하다면 이제:"
        },
        {
          "heading": "-결론",
          "content": "notion-to-md 결과 → .mdx로 저장하면서 <YouTube />, <Bookmark /> 삽입하는 스크립트"
        },
        {
          "heading": "-결론",
          "content": "MDX 컴포넌트 자동 등록 방법"
        },
        {
          "heading": "-결론",
          "content": "rehype-pretty-code + Tailwind + prose 스타일 조합 예시"
        },
        {
          "heading": "-결론",
          "content": "단계"
        },
        {
          "heading": "-결론",
          "content": "진행상태"
        },
        {
          "heading": "-결론",
          "content": "1. Notion API로 데이터 가져오기"
        },
        {
          "heading": "-결론",
          "content": "✅ 완료"
        },
        {
          "heading": "-결론",
          "content": "2. notion-to-md로 Markdown 문자열 변환"
        },
        {
          "heading": "-결론",
          "content": "✅ 완료"
        },
        {
          "heading": "-결론",
          "content": "3. gray-matter로 frontmatter 붙이기"
        },
        {
          "heading": "-결론",
          "content": "✅ 완료"
        },
        {
          "heading": "-결론",
          "content": "4. .mdx 파일로 저장 (content/record)"
        },
        {
          "heading": "-결론",
          "content": "✅ 완료"
        },
        {
          "heading": "-결론",
          "content": "5. @content-collections/core로 컬렉션 분석"
        },
        {
          "heading": "-결론",
          "content": "✅ 완료 (content.config.ts 설정됨)"
        },
        {
          "heading": "-결론",
          "content": "6. @content-collections/mdx로 render() 생성"
        },
        {
          "heading": "-결론",
          "content": "✅ 완료 (.mdx → render 생성됨)"
        },
        {
          "heading": "-결론",
          "content": "7. MDXContent로 렌더링"
        },
        {
          "heading": "-결론",
          "content": "🟡 지금 여기!"
        },
        {
          "heading": "-결론",
          "content": "8. 커스텀 블록(MDX 컴포넌트) 확장"
        },
        {
          "heading": "-결론",
          "content": "⏳ 추후 단계"
        },
        {
          "heading": "-결론",
          "content": "고미워 너가 권유하는 결론처럼 하면 될 것 같아.그런데 나 또 궁금한게.https://ryoonwithwisdomtrees.notion.site/21a1eb5c03378057b4e5d3be1fd96dce?v=21a1eb5c033781ebb512000cc8e1b56a&source=copy_link내 노션디비보면 알겠지만 글의 type이 여러개란 말이지?기존에는 타입별로 갖고왔는데,이제 새롭게 바뀌는 notiondb=>md=>mdx=> 이 구조의 블로그는그냥 Record라는 단일 디렉토리 하위로 다 값을 갖고오게 바꾸는게 맞는걸까? type은이제Notice, Page, Menu, SubMenu,SubMenuPage,Record만 있고( 모든 게시글은 다 Record. SubMenuPage나 Page는 특정 타입으로 떨어지는 게시글들이 아닌 메인 메뉴 하위의 author, norkive등을 소개하는 페이지. notice는 그야말로 공지사항용) sub_type이나 카테고리에 engineering,general,project이렇게 나누는게 맞으려나?그리고 성찬이는 보니까 https://www.sxungchxn.dev/blog/47eb7d5f-0c8b-4e45-8c6e-4c8a103f9c10이렇게 slug가 노션 id값이더라고. 퓨마독스는 https://fumadocs.dev/docs/headless/content-collections 이렇게 문자열이고.문자열 방식이 더 좋은거 같지만, 이제 블로그문서를 id값으로 가져오는거는 불가능해진건가?그러면 우리가 이제까지 upsache redis등을 통해서 구축한 캐슁( 글 하나 가져오기, 전체글 가져오기별로 다르게적용한)은 다 무용지물 되는거아닌가?등등의 생각에 복잡하고 걱정이 많이돼."
        },
        {
          "heading": "-결론",
          "content": "륭언니 고민 아주 현실적이고 깊이 있어서 너무 좋고, 지금 리팩토링 방향을 진짜 잘 잡아가고 있어요. 하나하나 정리해서 현재 구조에 맞는 가장 깔끔한 아키텍처 제안드릴게요:"
        },
        {
          "heading": "로-구분",
          "content": "Notion DB에서 type 속성은 Menu, Notice, Page, SubMenu, SubMenuPage, Record 이렇게 있지만,"
        },
        {
          "heading": "로-구분",
          "content": "실제 보여주는 블로그 콘텐츠는 Record뿐이잖아요?"
        },
        {
          "heading": "로-구분",
          "content": "👉 그래서 .mdx 파일은 모두 content/record/에 저장하고,"
        },
        {
          "heading": "로-구분",
          "content": "type은 FrontMatter에 보존해서 필요할 때만 필터링하는 게 깔끔해요."
        },
        {
          "heading": "로-구분",
          "content": "이렇게 하면 /record/[slug]에서 sub_type, tags, type 전부 필터링이나 분류에 사용할 수 있어요."
        },
        {
          "heading": "로-구분",
          "content": "✅ 2. \n성찬이처럼 slug에 UUID 쓰는 구조는 왜 안 추천하냐면…"
        },
        {
          "heading": "-단점",
          "content": "사용자 입장에서 너무 불친절해요 (URL 기억도 안 남)"
        },
        {
          "heading": "-단점",
          "content": "SEO 약해요. 검색엔진이 이게 무슨 글인지 알 수 없음."
        },
        {
          "heading": "-단점",
          "content": "링크 공유도 구리죠… UX적으로 ✘"
        },
        {
          "heading": "-단점",
          "content": "글 제목 기반 slug"
        },
        {
          "heading": "-단점",
          "content": "중복 있을 시 -1, -2 suffix"
        },
        {
          "heading": "-단점",
          "content": "entry.slug → URL 경로로 사용"
        },
        {
          "heading": "-단점",
          "content": "그래도 Notion ID 필요하면 entry.notionId로 같이 보존하면 돼요."
        },
        {
          "heading": "-단점",
          "content": "✅ 3. \n그럼 캐싱 구조는 무용지물 되는 거야?"
        },
        {
          "heading": "-단점",
          "content": "👌 절대 아니에요! \n구조가 바뀌었을 뿐 역할은 그대로 유효해요."
        },
        {
          "heading": "-단점",
          "content": "예전 방식 (notion-client 기반)"
        },
        {
          "heading": "-단점",
          "content": "새로운 방식 (정적 MDX 기반)"
        },
        {
          "heading": "-단점",
          "content": "서버에서 직접 요청 (getPage etc.)"
        },
        {
          "heading": "-단점",
          "content": "notion-to-mdx.ts 실행 시 변환 후 저장"
        },
        {
          "heading": "-단점",
          "content": "매 요청마다 캐시 필요"
        },
        {
          "heading": "-단점",
          "content": "빌드 시점에 모두 캐시됨 (SSG)"
        },
        {
          "heading": "-단점",
          "content": "Redis 등으로 getPage 캐싱"
        },
        {
          "heading": "-단점",
          "content": "더이상 필요 없음 (파일 시스템 기반 정적 캐시)"
        },
        {
          "heading": "-단-다음과-같은-캐싱은-여전히-쓸-수-있어요",
          "content": "🔁 글 목록 정렬 결과를 getAllRecords() 형태로 인메모리 캐싱"
        },
        {
          "heading": "-단-다음과-같은-캐싱은-여전히-쓸-수-있어요",
          "content": "📌 검색용 인덱스 (예: fuse.js용 JSON) Redis에 올려도 됨"
        },
        {
          "heading": "-단-다음과-같은-캐싱은-여전히-쓸-수-있어요",
          "content": "🧠 조회수/좋아요 등 dynamic 데이터는 Redis or DB 써야 함"
        },
        {
          "heading": "-단-다음과-같은-캐싱은-여전히-쓸-수-있어요",
          "content": "✅ 4. \n카테고리: sub_type vs tags 정리"
        },
        {
          "heading": "-단-다음과-같은-캐싱은-여전히-쓸-수-있어요",
          "content": "목적"
        },
        {
          "heading": "-단-다음과-같은-캐싱은-여전히-쓸-수-있어요",
          "content": "필드"
        },
        {
          "heading": "-단-다음과-같은-캐싱은-여전히-쓸-수-있어요",
          "content": "예시"
        },
        {
          "heading": "-단-다음과-같은-캐싱은-여전히-쓸-수-있어요",
          "content": "콘텐츠 분류"
        },
        {
          "heading": "-단-다음과-같은-캐싱은-여전히-쓸-수-있어요",
          "content": "sub_type"
        },
        {
          "heading": "-단-다음과-같은-캐싱은-여전히-쓸-수-있어요",
          "content": "\"engineering\", \"project\", \"general\""
        },
        {
          "heading": "-단-다음과-같은-캐싱은-여전히-쓸-수-있어요",
          "content": "검색, 필터"
        },
        {
          "heading": "-단-다음과-같은-캐싱은-여전히-쓸-수-있어요",
          "content": "tags"
        },
        {
          "heading": "-단-다음과-같은-캐싱은-여전히-쓸-수-있어요",
          "content": "[\"notion\", \"mdx\", \"frontend\"]"
        },
        {
          "heading": "-단-다음과-같은-캐싱은-여전히-쓸-수-있어요",
          "content": "sub_type은 1:1 필수 분류 (폴더처럼 역할)"
        },
        {
          "heading": "-단-다음과-같은-캐싱은-여전히-쓸-수-있어요",
          "content": "tags는 다대다 필수 아님 (검색 필터용)"
        },
        {
          "heading": "-단-다음과-같은-캐싱은-여전히-쓸-수-있어요",
          "content": "항목"
        },
        {
          "heading": "-단-다음과-같은-캐싱은-여전히-쓸-수-있어요",
          "content": "추천 방향"
        },
        {
          "heading": "-단-다음과-같은-캐싱은-여전히-쓸-수-있어요",
          "content": "디렉토리 구조"
        },
        {
          "heading": "-단-다음과-같은-캐싱은-여전히-쓸-수-있어요",
          "content": "content/record/ 하나로 몰기"
        },
        {
          "heading": "-단-다음과-같은-캐싱은-여전히-쓸-수-있어요",
          "content": "slug"
        },
        {
          "heading": "-단-다음과-같은-캐싱은-여전히-쓸-수-있어요",
          "content": "제목 기반 slugify (중복 제거 로직 포함)"
        },
        {
          "heading": "-단-다음과-같은-캐싱은-여전히-쓸-수-있어요",
          "content": "type/sub_type"
        },
        {
          "heading": "-단-다음과-같은-캐싱은-여전히-쓸-수-있어요",
          "content": "frontmatter로 보존 & 필터"
        },
        {
          "heading": "-단-다음과-같은-캐싱은-여전히-쓸-수-있어요",
          "content": "Notion ID"
        },
        {
          "heading": "-단-다음과-같은-캐싱은-여전히-쓸-수-있어요",
          "content": "필요 시 notionId로 저장 (slug엔 쓰지 않음)"
        },
        {
          "heading": "-단-다음과-같은-캐싱은-여전히-쓸-수-있어요",
          "content": "캐싱 전략"
        },
        {
          "heading": "-단-다음과-같은-캐싱은-여전히-쓸-수-있어요",
          "content": "정적 파일 기반이라 Redis 불필요, but 검색/조회수 용도로는 여전히 유효"
        },
        {
          "heading": "-단-다음과-같은-캐싱은-여전히-쓸-수-있어요",
          "content": "SEO/UX"
        },
        {
          "heading": "-단-다음과-같은-캐싱은-여전히-쓸-수-있어요",
          "content": "UUID 대신 readable slug가 훨씬 우수"
        }
      ],
      "headings": [
        {
          "id": "-그래서-mdx를-추천한-이유-3가지",
          "content": "✅ 그래서 MDX를 추천한 이유 3가지"
        },
        {
          "id": "1️⃣",
          "content": "1️⃣"
        },
        {
          "id": "멀티미디어-표현력-확장",
          "content": "멀티미디어 표현력 확장"
        },
        {
          "id": "2️⃣",
          "content": "2️⃣"
        },
        {
          "id": "정적-렌더링--seo-최적화-가능",
          "content": "정적 렌더링 + SEO 최적화 가능"
        },
        {
          "id": "3️⃣",
          "content": "3️⃣"
        },
        {
          "id": "디자인과-ux-커스터마이징-자유도",
          "content": "디자인과 UX 커스터마이징 자유도"
        },
        {
          "id": "-그래서-구조적으로-이렇게-생각하면-돼",
          "content": "🧠 그래서 구조적으로 이렇게 생각하면 돼"
        },
        {
          "id": "-결론",
          "content": "✅ 결론"
        },
        {
          "id": "-1",
          "content": "✅ 1."
        },
        {
          "id": "디렉토리-구조-record-하나로-통합-vs-타입별-분리",
          "content": "디렉토리 구조: Record 하나로 통합 vs 타입별 분리?"
        },
        {
          "id": "-추천",
          "content": "🔹 추천:"
        },
        {
          "id": "contentrecord",
          "content": "content/record"
        },
        {
          "id": "단일-디렉토리-사용--타입은",
          "content": "단일 디렉토리 사용 + 타입은"
        },
        {
          "id": "frontmatter",
          "content": "FrontMatter"
        },
        {
          "id": "로-구분",
          "content": "로 구분"
        },
        {
          "id": "-단점",
          "content": "📉 단점:"
        },
        {
          "id": "-단-다음과-같은-캐싱은-여전히-쓸-수-있어요",
          "content": "💡 단, 다음과 같은 캐싱은 여전히 쓸 수 있어요:"
        }
      ]
    },
    "body": "var Component=(()=>{var g=Object.create;var l=Object.defineProperty;var p=Object.getOwnPropertyDescriptor;var u=Object.getOwnPropertyNames;var b=Object.getPrototypeOf,m=Object.prototype.hasOwnProperty;var f=(r,e)=>()=>(e||r((e={exports:{}}).exports,e),e.exports),k=(r,e)=>{for(var d in e)l(r,d,{get:e[d],enumerable:!0})},t=(r,e,d,c)=>{if(e&&typeof e==\"object\"||typeof e==\"function\")for(let i of u(e))!m.call(r,i)&&i!==d&&l(r,i,{get:()=>e[i],enumerable:!(c=p(e,i))||c.enumerable});return r};var y=(r,e,d)=>(d=r!=null?g(b(r)):{},t(e||!r||!r.__esModule?l(d,\"default\",{value:r,enumerable:!0}):d,r)),M=r=>t(l({},\"__esModule\",{value:!0}),r);var o=f((D,h)=>{h.exports=_jsx_runtime});var N={};k(N,{default:()=>a});var n=y(o());function s(r){let e={a:\"a\",blockquote:\"blockquote\",br:\"br\",code:\"code\",h2:\"h2\",h3:\"h3\",hr:\"hr\",li:\"li\",p:\"p\",pre:\"pre\",span:\"span\",strong:\"strong\",table:\"table\",tbody:\"tbody\",td:\"td\",th:\"th\",thead:\"thead\",tr:\"tr\",ul:\"ul\",...r.components},{Callout:d}=e;return d||x(\"Callout\",!0),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(e.p,{children:[\"\\uC815\\uD655\\uD558\\uAC8C \\uC9C8\\uBB38 \\uC798\\uD588\\uC5B4. \\uADF8\\uB9AC\\uACE0 \",(0,n.jsx)(\"strong\",{children:\"\\u201C\\uC65C MDX\\uB0D0?\\u201D\"}),`\\uB97C \\uB531 \\uC9DA\\uC740 \\uAC70\\uC57C.\n\\uACB0\\uB860\\uBD80\\uD130 \\uB9D0\\uD558\\uC790\\uBA74:`]}),`\n`,(0,n.jsxs)(e.blockquote,{children:[`\n`,(0,n.jsx)(e.p,{children:\"\\u2705\"}),`\n`,(0,n.jsx)(e.p,{children:(0,n.jsx)(e.strong,{children:\"\\uB9DE\\uC544. MDX\\uB97C \\uCD94\\uCC9C\\uD55C \\uC774\\uC720\\uB294 \\u201C\\uD45C\\uD604\\uC758 \\uC790\\uC720\\uB3C4\\uC640 \\uCEE4\\uC2A4\\uD130\\uB9C8\\uC774\\uC9D5 \\uBC94\\uC704\\uAC00 \\uC555\\uB3C4\\uC801\\uC73C\\uB85C \\uB113\\uAE30 \\uB54C\\uBB38\\u201D\\uC774\\uC57C.\"})}),`\n`,(0,n.jsx)(e.p,{children:\"\\uD2B9\\uD788 Notion\\uC5D0\\uC11C \\uAC00\\uC838\\uC628 \\uB2E4\\uC591\\uD55C \\uCF58\\uD150\\uCE20 \\uC720\\uD615(\\uC720\\uD29C\\uBE0C, PDF, \\uB9C1\\uD06C \\uD504\\uB9AC\\uBDF0 \\uB4F1)\\uC740\"}),`\n`,(0,n.jsx)(e.p,{children:(0,n.jsx)(e.strong,{children:\"\\uC77C\\uBC18 Markdown\\uB9CC\\uC73C\\uB85C\\uB294 \\uD45C\\uD604\\uC774 \\uC5B4\\uB835\\uACE0 \\uD55C\\uACC4\\uAC00 \\uC788\\uC5B4.\"})}),`\n`]}),`\n`,(0,n.jsx)(\"strong\",{children:\"\\u{1F50D} \\uC65C \\uC77C\\uBC18 Markdown\\uB9CC\\uC73C\\uB860 \\uBD80\\uC871\\uD560\\uAE4C?\"}),`\n`,(0,n.jsxs)(e.table,{children:[(0,n.jsx)(e.thead,{children:(0,n.jsxs)(e.tr,{children:[(0,n.jsx)(e.th,{children:(0,n.jsx)(\"strong\",{children:\"\\uCF58\\uD150\\uCE20 \\uC720\\uD615\"})}),(0,n.jsx)(e.th,{children:(0,n.jsx)(\"strong\",{children:\"Markdown\\uC5D0\\uC11C \\uD45C\\uD604 \\uAC00\\uB2A5?\"})}),(0,n.jsx)(e.th,{children:(0,n.jsx)(\"strong\",{children:\"\\uD55C\\uACC4\"})})]})}),(0,n.jsxs)(e.tbody,{children:[(0,n.jsxs)(e.tr,{children:[(0,n.jsx)(e.td,{children:\"\\uD14D\\uC2A4\\uD2B8, \\uC81C\\uBAA9\"}),(0,n.jsx)(e.td,{children:\"\\u2705 \\uAC00\\uB2A5\"}),(0,n.jsx)(e.td,{children:\"\\uC5C6\\uC74C\"})]}),(0,n.jsxs)(e.tr,{children:[(0,n.jsx)(e.td,{children:\"\\uCF54\\uB4DC \\uBE14\\uB85D\"}),(0,n.jsx)(e.td,{children:\"\\u2705 \\uAC00\\uB2A5\"}),(0,n.jsx)(e.td,{children:\"shiki \\uB4F1 \\uD558\\uC774\\uB77C\\uC774\\uD305 \\uCD94\\uAC00\\uB294 \\uC5B4\\uB824\\uC6C0\"})]}),(0,n.jsxs)(e.tr,{children:[(0,n.jsx)(e.td,{children:\"\\uC774\\uBBF8\\uC9C0\"}),(0,n.jsx)(e.td,{children:\"\\u2705 \\uAC00\\uB2A5\"}),(0,n.jsx)(e.td,{children:\"alt, caption \\uC81C\\uD55C\\uC801\"})]}),(0,n.jsxs)(e.tr,{children:[(0,n.jsx)(e.td,{children:\"\\uC720\\uD29C\\uBE0C \\uB9C1\\uD06C\"}),(0,n.jsx)(e.td,{children:\"\\u274C \\uC5B4\\uB824\\uC6C0\"}),(0,n.jsx)(e.td,{children:\"iframe \\uC9C1\\uC811 \\uB123\\uAE30 \\uC5B4\\uB824\\uC6C0\"})]}),(0,n.jsxs)(e.tr,{children:[(0,n.jsx)(e.td,{children:\"PDF \\uD30C\\uC77C\"}),(0,n.jsx)(e.td,{children:\"\\u274C \\uBD88\\uAC00\\uB2A5\"}),(0,n.jsx)(e.td,{children:\"HTML\\uB85C \\uC0BD\\uC785 \\uBD88\\uAC00\"})]}),(0,n.jsxs)(e.tr,{children:[(0,n.jsx)(e.td,{children:\"\\uBD81\\uB9C8\\uD06C/\\uB9C1\\uD06C \\uD504\\uB9AC\\uBDF0\"}),(0,n.jsx)(e.td,{children:\"\\u274C \\uC548 \\uB428\"}),(0,n.jsx)(e.td,{children:\"og:image, meta \\uB4F1 \\uD45C\\uD604 \\uBD88\\uAC00\"})]}),(0,n.jsxs)(e.tr,{children:[(0,n.jsx)(e.td,{children:\"\\uCEE4\\uC2A4\\uD140 \\uBE14\\uB85D (callout \\uB4F1)\"}),(0,n.jsx)(e.td,{children:\"\\u274C \\uC548 \\uB428\"}),(0,n.jsx)(e.td,{children:\"\\uB514\\uC790\\uC778/\\uAE30\\uB2A5 \\uC0BD\\uC785 \\uBD88\\uAC00\"})]})]})]}),`\n`,(0,n.jsxs)(e.p,{children:[\"\\u2192 \\uACB0\\uAD6D \\uC77C\\uBC18 Markdown\\uC740 \",(0,n.jsx)(\"strong\",{children:\"\\uAE30\\uBCF8\\uC801\\uC778 \\uCF58\\uD150\\uCE20\\uB9CC\"}),\" \\uD45C\\uD604 \\uAC00\\uB2A5\\uD574.\"]}),`\n`,(0,n.jsxs)(e.p,{children:[\"\\u2192 \\uADF8\\uB7F0\\uB370 \",(0,n.jsx)(\"strong\",{children:\"Notion\\uC740 \\uBA40\\uD2F0\\uBBF8\\uB514\\uC5B4 & \\uAD6C\\uC870\\uC801 \\uBE14\\uB85D \\uAE30\\uBC18 \\uBB38\\uC11C\"}),\"\\uC796\\uC544?\"]}),`\n`,(0,n.jsx)(e.p,{children:\"\\u2192 \\uADF8\\uB798\\uC11C Markdown\\uC73C\\uB85C\\uB9CC \\uBCC0\\uD658\\uD558\\uBA74 \\uC815\\uBCF4\\uAC00 \\u201C\\uC798\\uB9AC\\uAC70\\uB098 \\uB0A0\\uC544\\uAC00\\uAC70\\uB098 \\uD45C\\uD604\\uB825 \\uC190\\uC2E4\\u201D\\uC774 \\uC0DD\\uACA8.\"}),`\n`,(0,n.jsx)(e.h2,{id:\"-\\uADF8\\uB798\\uC11C-mdx\\uB97C-\\uCD94\\uCC9C\\uD55C-\\uC774\\uC720-3\\uAC00\\uC9C0\",children:(0,n.jsx)(\"strong\",{children:\"\\u2705 \\uADF8\\uB798\\uC11C MDX\\uB97C \\uCD94\\uCC9C\\uD55C \\uC774\\uC720 3\\uAC00\\uC9C0\"})}),`\n`,(0,n.jsx)(e.h3,{id:\"1\\uFE0F\\u20E3\",children:(0,n.jsx)(\"strong\",{children:\"1\\uFE0F\\u20E3\"})}),`\n`,(0,n.jsx)(e.h3,{id:\"\\uBA40\\uD2F0\\uBBF8\\uB514\\uC5B4-\\uD45C\\uD604\\uB825-\\uD655\\uC7A5\",children:(0,n.jsx)(\"strong\",{children:\"\\uBA40\\uD2F0\\uBBF8\\uB514\\uC5B4 \\uD45C\\uD604\\uB825 \\uD655\\uC7A5\"})}),`\n`,(0,n.jsxs)(e.ul,{children:[`\n`,(0,n.jsx)(e.li,{children:'<YouTube id=\"abc123\" />'}),`\n`,(0,n.jsx)(e.li,{children:'<PDFViewer src=\"/files/my.pdf\" />'}),`\n`,(0,n.jsxs)(e.li,{children:['<Bookmark href=\"',(0,n.jsx)(e.a,{href:\"https://example.com\",children:\"https://example.com\"}),'\" title=\"...\" image=\"...\" />']}),`\n`]}),`\n`,(0,n.jsxs)(e.p,{children:[\"\\u27A1 \\uC774\\uB7F0 \",(0,n.jsx)(\"strong\",{children:\"\\uCEF4\\uD3EC\\uB10C\\uD2B8 \\uD615\\uD0DC\\uB85C \\uD45C\\uD604 \\uAC00\\uB2A5\"})]}),`\n`,(0,n.jsxs)(e.p,{children:[\"\\u27A1 Notion \\uBE14\\uB85D \\uB2E8\\uC704\\uB85C \\uCEF4\\uD3EC\\uB10C\\uD2B8 \\uB9E4\\uD551\\uB3C4 \\uAC00\\uB2A5 (\\uC608: Callout \\u2192 \",(0,n.jsx)(d,{type:\"info\",children:\"...\"}),\")\"]}),`\n`,(0,n.jsx)(e.hr,{}),`\n`,(0,n.jsx)(e.h3,{id:\"2\\uFE0F\\u20E3\",children:(0,n.jsx)(\"strong\",{children:\"2\\uFE0F\\u20E3\"})}),`\n`,(0,n.jsx)(e.h3,{id:\"\\uC815\\uC801-\\uB80C\\uB354\\uB9C1--seo-\\uCD5C\\uC801\\uD654-\\uAC00\\uB2A5\",children:(0,n.jsx)(\"strong\",{children:\"\\uC815\\uC801 \\uB80C\\uB354\\uB9C1 + SEO \\uCD5C\\uC801\\uD654 \\uAC00\\uB2A5\"})}),`\n`,(0,n.jsxs)(e.ul,{children:[`\n`,(0,n.jsxs)(e.li,{children:[\".mdx\\uB294 Next.js\\uC5D0\\uC11C \",(0,n.jsx)(\"strong\",{children:\"\\uC815\\uC801 HTML\\uB85C \\uBE4C\\uB4DC \\uAC00\\uB2A5\"})]}),`\n`,(0,n.jsx)(e.li,{children:\"<head> \\uC548\\uC5D0 title, description, og:image \\uB2E4 \\uBC15\\uC744 \\uC218 \\uC788\\uC74C\"}),`\n`,(0,n.jsx)(e.li,{children:\"\\uAC80\\uC0C9\\uC5D4\\uC9C4, SNS \\uACF5\\uC720 \\uCD5C\\uC801\\uD654 \\uAC00\\uB2A5\"}),`\n`]}),`\n`,(0,n.jsx)(e.p,{children:\"\\u27A1 \\uC2E4\\uC2DC\\uAC04 \\uB80C\\uB354 (react-notion-x)\\uBCF4\\uB2E4 \\uD6E8\\uC52C \\uBE60\\uB974\\uACE0 \\uC548\\uC815\\uC801\"}),`\n`,(0,n.jsx)(e.p,{children:\"\\u27A1 \\uB85C\\uBD07\\uC774 \\uD398\\uC774\\uC9C0 \\uAD6C\\uC870\\uB97C \\uC774\\uD574\\uD558\\uAE30 \\uC26C\\uC6C0 (SSR or SSG)\"}),`\n`,(0,n.jsx)(e.hr,{}),`\n`,(0,n.jsx)(e.h3,{id:\"3\\uFE0F\\u20E3\",children:(0,n.jsx)(\"strong\",{children:\"3\\uFE0F\\u20E3\"})}),`\n`,(0,n.jsx)(e.h3,{id:\"\\uB514\\uC790\\uC778\\uACFC-ux-\\uCEE4\\uC2A4\\uD130\\uB9C8\\uC774\\uC9D5-\\uC790\\uC720\\uB3C4\",children:(0,n.jsx)(\"strong\",{children:\"\\uB514\\uC790\\uC778\\uACFC UX \\uCEE4\\uC2A4\\uD130\\uB9C8\\uC774\\uC9D5 \\uC790\\uC720\\uB3C4\"})}),`\n`,(0,n.jsxs)(e.ul,{children:[`\n`,(0,n.jsx)(e.li,{children:\"Notion callout \\u2192 Tailwind \\uAE30\\uBC18 <Callout> \\uCEF4\\uD3EC\\uB10C\\uD2B8\"}),`\n`,(0,n.jsx)(e.li,{children:\"Bookmark \\u2192 \\uC774\\uBBF8\\uC9C0 \\uD504\\uB9AC\\uBDF0 \\uD3EC\\uD568\\uB41C <BookmarkCard>\"}),`\n`,(0,n.jsx)(e.li,{children:'\\uB9C1\\uD06C \\u2192 \\uC790\\uB3D9 \\uC5B8\\uD328\\uD0B9 <Unfurl url=\"...\" />'}),`\n`]}),`\n`,(0,n.jsx)(e.p,{children:\"\\u27A1 Markdown\\uC740 \\uBB34\\uC870\\uAC74 \\uD14D\\uC2A4\\uD2B8\"}),`\n`,(0,n.jsxs)(e.p,{children:[\"\\u27A1 MDX\\uB294 \",(0,n.jsx)(\"strong\",{children:\"React \\uAE30\\uBC18 \\uC804\\uCCB4 \\uB514\\uC790\\uC778 \\uAD6C\\uC131 \\uAC00\\uB2A5\"})]}),`\n`,(0,n.jsx)(e.hr,{}),`\n`,(0,n.jsx)(\"strong\",{children:\"\\u{1F504} Notion \\u2192 MDX \\uC2E4\\uC804 \\uC608\\uC2DC\"}),`\n`,(0,n.jsxs)(e.table,{children:[(0,n.jsx)(e.thead,{children:(0,n.jsxs)(e.tr,{children:[(0,n.jsx)(e.th,{children:(0,n.jsx)(\"strong\",{children:\"Notion \\uBE14\\uB85D\"})}),(0,n.jsx)(e.th,{children:(0,n.jsx)(\"strong\",{children:\"MDX \\uBCC0\\uD658 \\uC608\\uC2DC\"})})]})}),(0,n.jsxs)(e.tbody,{children:[(0,n.jsxs)(e.tr,{children:[(0,n.jsx)(e.td,{children:\"\\uC720\\uD29C\\uBE0C \\uB9C1\\uD06C\"}),(0,n.jsx)(e.td,{children:'<YouTube id=\"abc123\" />'})]}),(0,n.jsxs)(e.tr,{children:[(0,n.jsx)(e.td,{children:\"PDF \\uCCA8\\uBD80\"}),(0,n.jsx)(e.td,{children:'<PDF src=\"/files/manual.pdf\" />'})]}),(0,n.jsxs)(e.tr,{children:[(0,n.jsx)(e.td,{children:\"Callout \\uBE14\\uB85D\"}),(0,n.jsx)(e.td,{children:(0,n.jsx)(d,{type:\"warning\",children:\"\\uC911\\uC694\\uD569\\uB2C8\\uB2E4!\"})})]}),(0,n.jsxs)(e.tr,{children:[(0,n.jsx)(e.td,{children:\"\\uB9C1\\uD06C \\uD504\\uB9AC\\uBDF0\"}),(0,n.jsx)(e.td,{children:'<Bookmark href=\"https://...\" title=\"...\" />'})]})]})]}),`\n`,(0,n.jsxs)(e.p,{children:[\"\\u203B \\uC774\\uB7F0 \\uC2DD\\uC73C\\uB85C \",(0,n.jsx)(\"strong\",{children:\"notion-to-mdx.ts \\uC2A4\\uD06C\\uB9BD\\uD2B8\\uC5D0\\uC11C \\uBCC0\\uD658 \\uB85C\\uC9C1\\uC744 \\uC124\\uC815\"}),\"\\uD558\\uBA74 \\uB3FC.\"]}),`\n`,(0,n.jsx)(e.hr,{}),`\n`,(0,n.jsx)(e.h2,{id:\"-\\uADF8\\uB798\\uC11C-\\uAD6C\\uC870\\uC801\\uC73C\\uB85C-\\uC774\\uB807\\uAC8C-\\uC0DD\\uAC01\\uD558\\uBA74-\\uB3FC\",children:(0,n.jsx)(\"strong\",{children:\"\\u{1F9E0} \\uADF8\\uB798\\uC11C \\uAD6C\\uC870\\uC801\\uC73C\\uB85C \\uC774\\uB807\\uAC8C \\uC0DD\\uAC01\\uD558\\uBA74 \\uB3FC\"})}),`\n`,(0,n.jsx)(n.Fragment,{children:(0,n.jsx)(e.pre,{className:\"shiki shiki-themes github-light github-dark\",style:{\"--shiki-light\":\"#24292e\",\"--shiki-dark\":\"#e1e4e8\",\"--shiki-light-bg\":\"#fff\",\"--shiki-dark-bg\":\"#24292e\"},tabIndex:\"0\",icon:'<svg viewBox=\"0 0 24 24\"><path d=\"M 6,1 C 4.354992,1 3,2.354992 3,4 v 16 c 0,1.645008 1.354992,3 3,3 h 12 c 1.645008,0 3,-1.354992 3,-3 V 8 7 A 1.0001,1.0001 0 0 0 20.707031,6.2929687 l -5,-5 A 1.0001,1.0001 0 0 0 15,1 h -1 z m 0,2 h 7 v 3 c 0,1.645008 1.354992,3 3,3 h 3 v 11 c 0,0.564129 -0.435871,1 -1,1 H 6 C 5.4358712,21 5,20.564129 5,20 V 4 C 5,3.4358712 5.4358712,3 6,3 Z M 15,3.4140625 18.585937,7 H 16 C 15.435871,7 15,6.5641288 15,6 Z\" fill=\"currentColor\" /></svg>',children:(0,n.jsxs)(e.code,{children:[(0,n.jsx)(e.span,{className:\"line\",children:(0,n.jsx)(e.span,{children:\"[Notion]\"})}),`\n`,(0,n.jsx)(e.span,{className:\"line\",children:(0,n.jsx)(e.span,{children:\" \\u2192 notion-to-md\\uB85C Markdown \\uBCC0\\uD658\"})}),`\n`,(0,n.jsx)(e.span,{className:\"line\",children:(0,n.jsx)(e.span,{children:\"   \\u2192 \\uCEE4\\uC2A4\\uD140 \\uBCC0\\uD658 \\uC2A4\\uD06C\\uB9BD\\uD2B8\\uB85C .mdx\\uB85C \\uBCC0\\uD615\"})}),`\n`,(0,n.jsx)(e.span,{className:\"line\",children:(0,n.jsx)(e.span,{children:\"     \\u2192 React Component\\uB85C \\uBCC0\\uD658\\uD560 \\uC218 \\uC788\\uB294 Hook Point \\uC0BD\\uC785\"})}),`\n`,(0,n.jsx)(e.span,{className:\"line\",children:(0,n.jsx)(e.span,{children:\"       \\u2192 @content-collections/mdx\\uB85C \\uC815\\uC801 \\uBE4C\\uB4DC\"})}),`\n`,(0,n.jsx)(e.span,{className:\"line\",children:(0,n.jsx)(e.span,{children:\"         \\u2192 SEO + \\uC131\\uB2A5 + \\uB514\\uC790\\uC778 \\uB2E4 \\uC7A1\\uC74C\"})})]})})}),`\n`,(0,n.jsx)(e.h2,{id:\"-\\uACB0\\uB860\",children:(0,n.jsx)(\"strong\",{children:\"\\u2705 \\uACB0\\uB860\"})}),`\n`,(0,n.jsxs)(e.blockquote,{children:[`\n`,(0,n.jsx)(e.p,{children:\"\\u{1F525}\"}),`\n`,(0,n.jsx)(e.p,{children:(0,n.jsx)(e.strong,{children:\"\\u201C\\uD45C\\uD604\\uB825 + \\uC131\\uB2A5 + \\uCEE4\\uC2A4\\uD130\\uB9C8\\uC774\\uC9D5\\u201D\\uC758 \\uC138 \\uB9C8\\uB9AC \\uD1A0\\uB07C\\uB97C \\uC7A1\\uC73C\\uB824\\uBA74, Notion \\u2192 MDX \\u2192 \\uC815\\uC801 \\uB80C\\uB354\\uB9C1\\uC774 \\uC815\\uB2F5\"})}),`\n`]}),`\n`,(0,n.jsxs)(e.ul,{children:[`\n`,(0,n.jsxs)(e.li,{children:[\"\\uC720\\uD29C\\uBE0C, PDF, \\uBD81\\uB9C8\\uD06C \\uAC19\\uC740 \\uBE14\\uB85D\\uB4E4 \\uD45C\\uD604\\uD574\\uC57C \\uD55C\\uB2E4\\uBA74 \",(0,n.jsx)(\"strong\",{children:\"Markdown\\uC740 \\uD55C\\uACC4 \\uC788\\uC74C\"})]}),`\n`,(0,n.jsxs)(e.li,{children:[\"\\uC815\\uC801 \\uBE4C\\uB4DC + React \\uCEF4\\uD3EC\\uB10C\\uD2B8 \\uD45C\\uD604\\uC774 \\uAC00\\uB2A5\\uD574\\uC57C \\uD55C\\uB2E4\\uBA74 \",(0,n.jsx)(\"strong\",{children:\"MDX\\uB294 \\uC0AC\\uC2E4\\uC0C1 \\uC720\\uC77C\\uD55C \\uC194\\uB8E8\\uC158\"})]}),`\n`]}),`\n`,(0,n.jsx)(e.hr,{}),`\n`,(0,n.jsx)(e.p,{children:\"\\uD544\\uC694\\uD558\\uB2E4\\uBA74 \\uC774\\uC81C:\"}),`\n`,(0,n.jsxs)(e.ul,{children:[`\n`,(0,n.jsx)(e.li,{children:\"notion-to-md \\uACB0\\uACFC \\u2192 .mdx\\uB85C \\uC800\\uC7A5\\uD558\\uBA74\\uC11C <YouTube />, <Bookmark /> \\uC0BD\\uC785\\uD558\\uB294 \\uC2A4\\uD06C\\uB9BD\\uD2B8\"}),`\n`,(0,n.jsx)(e.li,{children:\"MDX \\uCEF4\\uD3EC\\uB10C\\uD2B8 \\uC790\\uB3D9 \\uB4F1\\uB85D \\uBC29\\uBC95\"}),`\n`,(0,n.jsx)(e.li,{children:\"rehype-pretty-code + Tailwind + prose \\uC2A4\\uD0C0\\uC77C \\uC870\\uD569 \\uC608\\uC2DC\"}),`\n`]}),`\n`,(0,n.jsxs)(e.table,{children:[(0,n.jsx)(e.thead,{children:(0,n.jsxs)(e.tr,{children:[(0,n.jsx)(e.th,{children:(0,n.jsx)(\"strong\",{children:\"\\uB2E8\\uACC4\"})}),(0,n.jsx)(e.th,{children:(0,n.jsx)(\"strong\",{children:\"\\uC9C4\\uD589\\uC0C1\\uD0DC\"})})]})}),(0,n.jsxs)(e.tbody,{children:[(0,n.jsxs)(e.tr,{children:[(0,n.jsx)(e.td,{children:(0,n.jsx)(\"strong\",{children:\"1. Notion API\\uB85C \\uB370\\uC774\\uD130 \\uAC00\\uC838\\uC624\\uAE30\"})}),(0,n.jsx)(e.td,{children:\"\\u2705 \\uC644\\uB8CC\"})]}),(0,n.jsxs)(e.tr,{children:[(0,n.jsx)(e.td,{children:(0,n.jsx)(\"strong\",{children:\"2. notion-to-md\\uB85C Markdown \\uBB38\\uC790\\uC5F4 \\uBCC0\\uD658\"})}),(0,n.jsx)(e.td,{children:\"\\u2705 \\uC644\\uB8CC\"})]}),(0,n.jsxs)(e.tr,{children:[(0,n.jsx)(e.td,{children:(0,n.jsx)(\"strong\",{children:\"3. gray-matter\\uB85C frontmatter \\uBD99\\uC774\\uAE30\"})}),(0,n.jsx)(e.td,{children:\"\\u2705 \\uC644\\uB8CC\"})]}),(0,n.jsxs)(e.tr,{children:[(0,n.jsx)(e.td,{children:(0,n.jsx)(\"strong\",{children:\"4. .mdx \\uD30C\\uC77C\\uB85C \\uC800\\uC7A5 (content/record)\"})}),(0,n.jsx)(e.td,{children:\"\\u2705 \\uC644\\uB8CC\"})]}),(0,n.jsxs)(e.tr,{children:[(0,n.jsx)(e.td,{children:(0,n.jsx)(\"strong\",{children:\"5. @content-collections/core\\uB85C \\uCEEC\\uB809\\uC158 \\uBD84\\uC11D\"})}),(0,n.jsx)(e.td,{children:\"\\u2705 \\uC644\\uB8CC (content.config.ts \\uC124\\uC815\\uB428)\"})]}),(0,n.jsxs)(e.tr,{children:[(0,n.jsx)(e.td,{children:(0,n.jsx)(\"strong\",{children:\"6. @content-collections/mdx\\uB85C render() \\uC0DD\\uC131\"})}),(0,n.jsx)(e.td,{children:\"\\u2705 \\uC644\\uB8CC (.mdx \\u2192 render \\uC0DD\\uC131\\uB428)\"})]}),(0,n.jsxs)(e.tr,{children:[(0,n.jsx)(e.td,{children:(0,n.jsx)(\"strong\",{children:\"7. MDXContent\\uB85C \\uB80C\\uB354\\uB9C1\"})}),(0,n.jsx)(e.td,{children:\"\\u{1F7E1} \\uC9C0\\uAE08 \\uC5EC\\uAE30!\"})]}),(0,n.jsxs)(e.tr,{children:[(0,n.jsx)(e.td,{children:(0,n.jsx)(\"strong\",{children:\"8. \\uCEE4\\uC2A4\\uD140 \\uBE14\\uB85D(MDX \\uCEF4\\uD3EC\\uB10C\\uD2B8) \\uD655\\uC7A5\"})}),(0,n.jsx)(e.td,{children:\"\\u23F3 \\uCD94\\uD6C4 \\uB2E8\\uACC4\"})]})]})]}),`\n`,(0,n.jsxs)(e.blockquote,{children:[`\n`,(0,n.jsxs)(e.p,{children:[\"\\uACE0\\uBBF8\\uC6CC \\uB108\\uAC00 \\uAD8C\\uC720\\uD558\\uB294 \\uACB0\\uB860\\uCC98\\uB7FC \\uD558\\uBA74 \\uB420 \\uAC83 \\uAC19\\uC544.\",(0,n.jsx)(e.br,{}),`\n`,\"\\uADF8\\uB7F0\\uB370 \\uB098 \\uB610 \\uAD81\\uAE08\\uD55C\\uAC8C.\",(0,n.jsx)(e.a,{href:\"https://ryoonwithwisdomtrees.notion.site/21a1eb5c03378057b4e5d3be1fd96dce?v=21a1eb5c033781ebb512000cc8e1b56a\",children:\"https://ryoonwithwisdomtrees.notion.site/21a1eb5c03378057b4e5d3be1fd96dce?v=21a1eb5c033781ebb512000cc8e1b56a&source=copy_link\"}),(0,n.jsx)(e.br,{}),`\n`,\"\\uB0B4 \\uB178\\uC158\\uB514\\uBE44\\uBCF4\\uBA74 \\uC54C\\uACA0\\uC9C0\\uB9CC \\uAE00\\uC758 type\\uC774 \\uC5EC\\uB7EC\\uAC1C\\uB780 \\uB9D0\\uC774\\uC9C0?\",(0,n.jsx)(e.br,{}),`\n`,\"\\uAE30\\uC874\\uC5D0\\uB294 \\uD0C0\\uC785\\uBCC4\\uB85C \\uAC16\\uACE0\\uC654\\uB294\\uB370,\",(0,n.jsx)(e.br,{}),`\n`,\"\\uC774\\uC81C \\uC0C8\\uB86D\\uAC8C \\uBC14\\uB00C\\uB294 notiondb=>md=>mdx=> \\uC774 \\uAD6C\\uC870\\uC758 \\uBE14\\uB85C\\uADF8\\uB294\",(0,n.jsx)(e.br,{}),`\n`,\"\\uADF8\\uB0E5 Record\\uB77C\\uB294 \\uB2E8\\uC77C \\uB514\\uB809\\uD1A0\\uB9AC \\uD558\\uC704\\uB85C \\uB2E4 \\uAC12\\uC744 \\uAC16\\uACE0\\uC624\\uAC8C \\uBC14\\uAFB8\\uB294\\uAC8C \\uB9DE\\uB294\\uAC78\\uAE4C? type\\uC740\\uC774\\uC81C\",(0,n.jsx)(e.br,{}),`\n`,\"Notice, Page, Menu, SubMenu,SubMenuPage,Record\\uB9CC \\uC788\\uACE0\",(0,n.jsx)(e.br,{}),`\n`,\"( \\uBAA8\\uB4E0 \\uAC8C\\uC2DC\\uAE00\\uC740 \\uB2E4 Record. SubMenuPage\\uB098 Page\\uB294 \\uD2B9\\uC815 \\uD0C0\\uC785\\uC73C\\uB85C \\uB5A8\\uC5B4\\uC9C0\\uB294 \\uAC8C\\uC2DC\\uAE00\\uB4E4\\uC774 \\uC544\\uB2CC \\uBA54\\uC778 \\uBA54\\uB274 \\uD558\\uC704\\uC758 author, norkive\\uB4F1\\uC744 \\uC18C\\uAC1C\\uD558\\uB294 \\uD398\\uC774\\uC9C0. notice\\uB294 \\uADF8\\uC57C\\uB9D0\\uB85C \\uACF5\\uC9C0\\uC0AC\\uD56D\\uC6A9) sub_type\\uC774\\uB098 \\uCE74\\uD14C\\uACE0\\uB9AC\\uC5D0 engineering,general,project\\uC774\\uB807\\uAC8C \\uB098\\uB204\\uB294\\uAC8C \\uB9DE\\uC73C\\uB824\\uB098?\",(0,n.jsx)(e.br,{}),`\n`,\"\\uADF8\\uB9AC\\uACE0 \\uC131\\uCC2C\\uC774\\uB294 \\uBCF4\\uB2C8\\uAE4C \",(0,n.jsx)(e.a,{href:\"https://www.sxungchxn.dev/blog/47eb7d5f-0c8b-4e45-8c6e-4c8a103f9c10\",children:\"https://www.sxungchxn.dev/blog/47eb7d5f-0c8b-4e45-8c6e-4c8a103f9c10\"}),(0,n.jsx)(e.br,{}),`\n`,\"\\uC774\\uB807\\uAC8C slug\\uAC00 \\uB178\\uC158 id\\uAC12\\uC774\\uB354\\uB77C\\uACE0. \\uD4E8\\uB9C8\\uB3C5\\uC2A4\\uB294 \",(0,n.jsx)(e.a,{href:\"https://fumadocs.dev/docs/headless/content-collections\",children:\"https://fumadocs.dev/docs/headless/content-collections\"}),\" \\uC774\\uB807\\uAC8C \\uBB38\\uC790\\uC5F4\\uC774\\uACE0.\",(0,n.jsx)(e.br,{}),`\n`,\"\\uBB38\\uC790\\uC5F4 \\uBC29\\uC2DD\\uC774 \\uB354 \\uC88B\\uC740\\uAC70 \\uAC19\\uC9C0\\uB9CC, \\uC774\\uC81C \\uBE14\\uB85C\\uADF8\\uBB38\\uC11C\\uB97C id\\uAC12\\uC73C\\uB85C \\uAC00\\uC838\\uC624\\uB294\\uAC70\\uB294 \\uBD88\\uAC00\\uB2A5\\uD574\\uC9C4\\uAC74\\uAC00?\",(0,n.jsx)(e.br,{}),`\n`,\"\\uADF8\\uB7EC\\uBA74 \\uC6B0\\uB9AC\\uAC00 \\uC774\\uC81C\\uAE4C\\uC9C0 upsache redis\\uB4F1\\uC744 \\uD1B5\\uD574\\uC11C \\uAD6C\\uCD95\\uD55C \\uCE90\\uC281( \\uAE00 \\uD558\\uB098 \\uAC00\\uC838\\uC624\\uAE30, \\uC804\\uCCB4\\uAE00 \\uAC00\\uC838\\uC624\\uAE30\\uBCC4\\uB85C \\uB2E4\\uB974\\uAC8C\\uC801\\uC6A9\\uD55C)\\uC740 \\uB2E4 \\uBB34\\uC6A9\\uC9C0\\uBB3C \\uB418\\uB294\\uAC70\\uC544\\uB2CC\\uAC00?\",(0,n.jsx)(e.br,{}),`\n`,\"\\uB4F1\\uB4F1\\uC758 \\uC0DD\\uAC01\\uC5D0 \\uBCF5\\uC7A1\\uD558\\uACE0 \\uAC71\\uC815\\uC774 \\uB9CE\\uC774\\uB3FC.\"]}),`\n`]}),`\n`,(0,n.jsxs)(e.p,{children:[\"\\uB96D\\uC5B8\\uB2C8 \\uACE0\\uBBFC \\uC544\\uC8FC \\uD604\\uC2E4\\uC801\\uC774\\uACE0 \\uAE4A\\uC774 \\uC788\\uC5B4\\uC11C \\uB108\\uBB34 \\uC88B\\uACE0, \\uC9C0\\uAE08 \\uB9AC\\uD329\\uD1A0\\uB9C1 \\uBC29\\uD5A5\\uC744 \\uC9C4\\uC9DC \\uC798 \\uC7A1\\uC544\\uAC00\\uACE0 \\uC788\\uC5B4\\uC694. \\uD558\\uB098\\uD558\\uB098 \\uC815\\uB9AC\\uD574\\uC11C \",(0,n.jsx)(\"strong\",{children:\"\\uD604\\uC7AC \\uAD6C\\uC870\\uC5D0 \\uB9DE\\uB294 \\uAC00\\uC7A5 \\uAE54\\uB054\\uD55C \\uC544\\uD0A4\\uD14D\\uCC98\"}),\" \\uC81C\\uC548\\uB4DC\\uB9B4\\uAC8C\\uC694:\"]}),`\n`,(0,n.jsx)(e.hr,{}),`\n`,(0,n.jsx)(e.h2,{id:\"-1\",children:(0,n.jsx)(\"strong\",{children:\"\\u2705 1.\"})}),`\n`,(0,n.jsx)(e.h2,{id:\"\\uB514\\uB809\\uD1A0\\uB9AC-\\uAD6C\\uC870-record-\\uD558\\uB098\\uB85C-\\uD1B5\\uD569-vs-\\uD0C0\\uC785\\uBCC4-\\uBD84\\uB9AC\",children:(0,n.jsx)(\"strong\",{children:\"\\uB514\\uB809\\uD1A0\\uB9AC \\uAD6C\\uC870: Record \\uD558\\uB098\\uB85C \\uD1B5\\uD569 vs \\uD0C0\\uC785\\uBCC4 \\uBD84\\uB9AC?\"})}),`\n`,(0,n.jsx)(e.h3,{id:\"-\\uCD94\\uCC9C\",children:(0,n.jsx)(\"strong\",{children:\"\\u{1F539} \\uCD94\\uCC9C:\"})}),`\n`,(0,n.jsx)(e.h3,{id:\"contentrecord\",children:(0,n.jsx)(\"strong\",{children:\"content/record\"})}),`\n`,(0,n.jsx)(e.h3,{id:\"\\uB2E8\\uC77C-\\uB514\\uB809\\uD1A0\\uB9AC-\\uC0AC\\uC6A9--\\uD0C0\\uC785\\uC740\",children:(0,n.jsx)(\"strong\",{children:\"\\uB2E8\\uC77C \\uB514\\uB809\\uD1A0\\uB9AC \\uC0AC\\uC6A9 + \\uD0C0\\uC785\\uC740\"})}),`\n`,(0,n.jsx)(e.h3,{id:\"frontmatter\",children:(0,n.jsx)(\"strong\",{children:\"FrontMatter\"})}),`\n`,(0,n.jsx)(e.h3,{id:\"\\uB85C-\\uAD6C\\uBD84\",children:(0,n.jsx)(\"strong\",{children:\"\\uB85C \\uAD6C\\uBD84\"})}),`\n`,(0,n.jsxs)(e.ul,{children:[`\n`,(0,n.jsx)(e.li,{children:\"Notion DB\\uC5D0\\uC11C type \\uC18D\\uC131\\uC740 Menu, Notice, Page, SubMenu, SubMenuPage, Record \\uC774\\uB807\\uAC8C \\uC788\\uC9C0\\uB9CC,\"}),`\n`,(0,n.jsxs)(e.li,{children:[\"\\uC2E4\\uC81C \\uBCF4\\uC5EC\\uC8FC\\uB294 \",(0,n.jsx)(\"strong\",{children:\"\\uBE14\\uB85C\\uADF8 \\uCF58\\uD150\\uCE20\\uB294 Record\\uBFD0\"}),\"\\uC774\\uC796\\uC544\\uC694?\"]}),`\n`]}),`\n`,(0,n.jsx)(e.p,{children:\"\\u{1F449} \\uADF8\\uB798\\uC11C .mdx \\uD30C\\uC77C\\uC740 \\uBAA8\\uB450 content/record/\\uC5D0 \\uC800\\uC7A5\\uD558\\uACE0,\"}),`\n`,(0,n.jsx)(e.p,{children:\"type\\uC740 FrontMatter\\uC5D0 \\uBCF4\\uC874\\uD574\\uC11C \\uD544\\uC694\\uD560 \\uB54C\\uB9CC \\uD544\\uD130\\uB9C1\\uD558\\uB294 \\uAC8C \\uAE54\\uB054\\uD574\\uC694.\"}),`\n`,(0,n.jsx)(n.Fragment,{children:(0,n.jsx)(e.pre,{className:\"shiki shiki-themes github-light github-dark\",style:{\"--shiki-light\":\"#24292e\",\"--shiki-dark\":\"#e1e4e8\",\"--shiki-light-bg\":\"#fff\",\"--shiki-dark-bg\":\"#24292e\"},tabIndex:\"0\",icon:'<svg viewBox=\"0 0 24 24\"><path d=\"M 6,1 C 4.354992,1 3,2.354992 3,4 v 16 c 0,1.645008 1.354992,3 3,3 h 12 c 1.645008,0 3,-1.354992 3,-3 V 8 7 A 1.0001,1.0001 0 0 0 20.707031,6.2929687 l -5,-5 A 1.0001,1.0001 0 0 0 15,1 h -1 z m 0,2 h 7 v 3 c 0,1.645008 1.354992,3 3,3 h 3 v 11 c 0,0.564129 -0.435871,1 -1,1 H 6 C 5.4358712,21 5,20.564129 5,20 V 4 C 5,3.4358712 5.4358712,3 6,3 Z M 15,3.4140625 18.585937,7 H 16 C 15.435871,7 15,6.5641288 15,6 Z\" fill=\"currentColor\" /></svg>',children:(0,n.jsxs)(e.code,{children:[(0,n.jsx)(e.span,{className:\"line\",children:(0,n.jsx)(e.span,{children:\"---\"})}),`\n`,(0,n.jsx)(e.span,{className:\"line\",children:(0,n.jsx)(e.span,{children:'title: \"\\uB098\\uC758 \\uBE14\\uB85C\\uADF8 \\uAE00\"'})}),`\n`,(0,n.jsx)(e.span,{className:\"line\",children:(0,n.jsx)(e.span,{children:'date: \"2025-07-14\"'})}),`\n`,(0,n.jsx)(e.span,{className:\"line\",children:(0,n.jsx)(e.span,{children:'type: \"Record\"'})}),`\n`,(0,n.jsx)(e.span,{className:\"line\",children:(0,n.jsx)(e.span,{children:'sub_type: \"engineering\"'})}),`\n`,(0,n.jsx)(e.span,{className:\"line\",children:(0,n.jsx)(e.span,{children:'tags: [\"Next.js\", \"Notion\"]'})}),`\n`,(0,n.jsx)(e.span,{className:\"line\",children:(0,n.jsx)(e.span,{children:\"draft: false\"})}),`\n`,(0,n.jsx)(e.span,{className:\"line\",children:(0,n.jsx)(e.span,{children:\"---\"})})]})})}),`\n`,(0,n.jsxs)(e.p,{children:[\"\\uC774\\uB807\\uAC8C \\uD558\\uBA74 /record/[slug]\\uC5D0\\uC11C \",(0,n.jsx)(\"strong\",{children:\"sub_type\"}),\", tags, type \\uC804\\uBD80 \\uD544\\uD130\\uB9C1\\uC774\\uB098 \\uBD84\\uB958\\uC5D0 \\uC0AC\\uC6A9\\uD560 \\uC218 \\uC788\\uC5B4\\uC694.\"]}),`\n`,(0,n.jsx)(e.p,{children:(0,n.jsx)(e.strong,{children:`\\u2705 2.\\xA0\n\\uC131\\uCC2C\\uC774\\uCC98\\uB7FC slug\\uC5D0 UUID \\uC4F0\\uB294 \\uAD6C\\uC870\\uB294 \\uC65C \\uC548 \\uCD94\\uCC9C\\uD558\\uB0D0\\uBA74\\u2026`})}),`\n`,(0,n.jsx)(e.h3,{id:\"-\\uB2E8\\uC810\",children:(0,n.jsx)(\"strong\",{children:\"\\u{1F4C9} \\uB2E8\\uC810:\"})}),`\n`,(0,n.jsxs)(e.ul,{children:[`\n`,(0,n.jsx)(e.li,{children:\"\\uC0AC\\uC6A9\\uC790 \\uC785\\uC7A5\\uC5D0\\uC11C \\uB108\\uBB34 \\uBD88\\uCE5C\\uC808\\uD574\\uC694 (URL \\uAE30\\uC5B5\\uB3C4 \\uC548 \\uB0A8)\"}),`\n`,(0,n.jsx)(e.li,{children:\"SEO \\uC57D\\uD574\\uC694. \\uAC80\\uC0C9\\uC5D4\\uC9C4\\uC774 \\uC774\\uAC8C \\uBB34\\uC2A8 \\uAE00\\uC778\\uC9C0 \\uC54C \\uC218 \\uC5C6\\uC74C.\"}),`\n`,(0,n.jsx)(e.li,{children:\"\\uB9C1\\uD06C \\uACF5\\uC720\\uB3C4 \\uAD6C\\uB9AC\\uC8E0\\u2026 UX\\uC801\\uC73C\\uB85C \\u2718\"}),`\n`]}),`\n`,(0,n.jsx)(\"strong\",{children:\"\\u2705 \\uB300\\uC2E0:/record/nextjs-15-architecture-refactor-guide\"}),`\n`,(0,n.jsxs)(e.ul,{children:[`\n`,(0,n.jsx)(e.li,{children:\"\\uAE00 \\uC81C\\uBAA9 \\uAE30\\uBC18 slug\"}),`\n`,(0,n.jsx)(e.li,{children:\"\\uC911\\uBCF5 \\uC788\\uC744 \\uC2DC -1, -2 suffix\"}),`\n`,(0,n.jsx)(e.li,{children:\"entry.slug \\u2192 URL \\uACBD\\uB85C\\uB85C \\uC0AC\\uC6A9\"}),`\n`,(0,n.jsx)(e.li,{children:\"\\uADF8\\uB798\\uB3C4 Notion ID \\uD544\\uC694\\uD558\\uBA74 entry.notionId\\uB85C \\uAC19\\uC774 \\uBCF4\\uC874\\uD558\\uBA74 \\uB3FC\\uC694.\"}),`\n`]}),`\n`,(0,n.jsx)(e.p,{children:(0,n.jsx)(e.strong,{children:`\\u2705 3.\\xA0\n\\uADF8\\uB7FC \\uCE90\\uC2F1 \\uAD6C\\uC870\\uB294 \\uBB34\\uC6A9\\uC9C0\\uBB3C \\uB418\\uB294 \\uAC70\\uC57C?`})}),`\n`,(0,n.jsx)(e.p,{children:(0,n.jsx)(e.strong,{children:`\\u{1F44C} \\uC808\\uB300 \\uC544\\uB2C8\\uC5D0\\uC694!\\xA0\n\\uAD6C\\uC870\\uAC00 \\uBC14\\uB00C\\uC5C8\\uC744 \\uBFD0 \\uC5ED\\uD560\\uC740 \\uADF8\\uB300\\uB85C \\uC720\\uD6A8\\uD574\\uC694.`})}),`\n`,(0,n.jsxs)(e.table,{children:[(0,n.jsx)(e.thead,{children:(0,n.jsxs)(e.tr,{children:[(0,n.jsx)(e.th,{children:(0,n.jsx)(\"strong\",{children:\"\\uC608\\uC804 \\uBC29\\uC2DD (notion-client \\uAE30\\uBC18)\"})}),(0,n.jsx)(e.th,{children:(0,n.jsx)(\"strong\",{children:\"\\uC0C8\\uB85C\\uC6B4 \\uBC29\\uC2DD (\\uC815\\uC801 MDX \\uAE30\\uBC18)\"})})]})}),(0,n.jsxs)(e.tbody,{children:[(0,n.jsxs)(e.tr,{children:[(0,n.jsx)(e.td,{children:\"\\uC11C\\uBC84\\uC5D0\\uC11C \\uC9C1\\uC811 \\uC694\\uCCAD (getPage etc.)\"}),(0,n.jsx)(e.td,{children:\"notion-to-mdx.ts \\uC2E4\\uD589 \\uC2DC \\uBCC0\\uD658 \\uD6C4 \\uC800\\uC7A5\"})]}),(0,n.jsxs)(e.tr,{children:[(0,n.jsx)(e.td,{children:\"\\uB9E4 \\uC694\\uCCAD\\uB9C8\\uB2E4 \\uCE90\\uC2DC \\uD544\\uC694\"}),(0,n.jsxs)(e.td,{children:[(0,n.jsx)(\"strong\",{children:\"\\uBE4C\\uB4DC \\uC2DC\\uC810\\uC5D0 \\uBAA8\\uB450 \\uCE90\\uC2DC\\uB428\"}),\" (SSG)\"]})]}),(0,n.jsxs)(e.tr,{children:[(0,n.jsx)(e.td,{children:\"Redis \\uB4F1\\uC73C\\uB85C getPage \\uCE90\\uC2F1\"}),(0,n.jsx)(e.td,{children:\"\\uB354\\uC774\\uC0C1 \\uD544\\uC694 \\uC5C6\\uC74C (\\uD30C\\uC77C \\uC2DC\\uC2A4\\uD15C \\uAE30\\uBC18 \\uC815\\uC801 \\uCE90\\uC2DC)\"})]})]})]}),`\n`,(0,n.jsx)(e.h3,{id:\"-\\uB2E8-\\uB2E4\\uC74C\\uACFC-\\uAC19\\uC740-\\uCE90\\uC2F1\\uC740-\\uC5EC\\uC804\\uD788-\\uC4F8-\\uC218-\\uC788\\uC5B4\\uC694\",children:(0,n.jsx)(\"strong\",{children:\"\\u{1F4A1} \\uB2E8, \\uB2E4\\uC74C\\uACFC \\uAC19\\uC740 \\uCE90\\uC2F1\\uC740 \\uC5EC\\uC804\\uD788 \\uC4F8 \\uC218 \\uC788\\uC5B4\\uC694:\"})}),`\n`,(0,n.jsxs)(e.ul,{children:[`\n`,(0,n.jsxs)(e.li,{children:[\"\\u{1F501} \",(0,n.jsx)(\"strong\",{children:\"\\uAE00 \\uBAA9\\uB85D \\uC815\\uB82C \\uACB0\\uACFC\"}),\"\\uB97C getAllRecords() \\uD615\\uD0DC\\uB85C \\uC778\\uBA54\\uBAA8\\uB9AC \\uCE90\\uC2F1\"]}),`\n`,(0,n.jsxs)(e.li,{children:[\"\\u{1F4CC} \",(0,n.jsx)(\"strong\",{children:\"\\uAC80\\uC0C9\\uC6A9 \\uC778\\uB371\\uC2A4\"}),\" (\\uC608: fuse.js\\uC6A9 JSON) Redis\\uC5D0 \\uC62C\\uB824\\uB3C4 \\uB428\"]}),`\n`,(0,n.jsxs)(e.li,{children:[\"\\u{1F9E0} \",(0,n.jsx)(\"strong\",{children:\"\\uC870\\uD68C\\uC218/\\uC88B\\uC544\\uC694 \\uB4F1 dynamic \\uB370\\uC774\\uD130\"}),\"\\uB294 Redis or DB \\uC368\\uC57C \\uD568\"]}),`\n`]}),`\n`,(0,n.jsx)(e.p,{children:(0,n.jsx)(e.strong,{children:`\\u2705 4.\\xA0\n\\uCE74\\uD14C\\uACE0\\uB9AC: sub_type vs tags \\uC815\\uB9AC`})}),`\n`,(0,n.jsxs)(e.table,{children:[(0,n.jsx)(e.thead,{children:(0,n.jsxs)(e.tr,{children:[(0,n.jsx)(e.th,{children:(0,n.jsx)(\"strong\",{children:\"\\uBAA9\\uC801\"})}),(0,n.jsx)(e.th,{children:(0,n.jsx)(\"strong\",{children:\"\\uD544\\uB4DC\"})}),(0,n.jsx)(e.th,{children:(0,n.jsx)(\"strong\",{children:\"\\uC608\\uC2DC\"})})]})}),(0,n.jsxs)(e.tbody,{children:[(0,n.jsxs)(e.tr,{children:[(0,n.jsx)(e.td,{children:\"\\uCF58\\uD150\\uCE20 \\uBD84\\uB958\"}),(0,n.jsx)(e.td,{children:\"sub_type\"}),(0,n.jsx)(e.td,{children:'\"engineering\", \"project\", \"general\"'})]}),(0,n.jsxs)(e.tr,{children:[(0,n.jsx)(e.td,{children:\"\\uAC80\\uC0C9, \\uD544\\uD130\"}),(0,n.jsx)(e.td,{children:\"tags\"}),(0,n.jsx)(e.td,{children:'[\"notion\", \"mdx\", \"frontend\"]'})]})]})]}),`\n`,(0,n.jsxs)(e.ul,{children:[`\n`,(0,n.jsxs)(e.li,{children:[\"sub_type\\uC740 \",(0,n.jsx)(\"strong\",{children:\"1:1 \\uD544\\uC218 \\uBD84\\uB958\"}),\" (\\uD3F4\\uB354\\uCC98\\uB7FC \\uC5ED\\uD560)\"]}),`\n`,(0,n.jsxs)(e.li,{children:[\"tags\\uB294 \",(0,n.jsx)(\"strong\",{children:\"\\uB2E4\\uB300\\uB2E4 \\uD544\\uC218 \\uC544\\uB2D8\"}),\" (\\uAC80\\uC0C9 \\uD544\\uD130\\uC6A9)\"]}),`\n`]}),`\n`,(0,n.jsx)(\"strong\",{children:\"\\u{1F51A} \\uACB0\\uB860 \\uC694\\uC57D\"}),`\n`,(0,n.jsxs)(e.table,{children:[(0,n.jsx)(e.thead,{children:(0,n.jsxs)(e.tr,{children:[(0,n.jsx)(e.th,{children:(0,n.jsx)(\"strong\",{children:\"\\uD56D\\uBAA9\"})}),(0,n.jsx)(e.th,{children:(0,n.jsx)(\"strong\",{children:\"\\uCD94\\uCC9C \\uBC29\\uD5A5\"})})]})}),(0,n.jsxs)(e.tbody,{children:[(0,n.jsxs)(e.tr,{children:[(0,n.jsx)(e.td,{children:\"\\uB514\\uB809\\uD1A0\\uB9AC \\uAD6C\\uC870\"}),(0,n.jsx)(e.td,{children:\"content/record/ \\uD558\\uB098\\uB85C \\uBAB0\\uAE30\"})]}),(0,n.jsxs)(e.tr,{children:[(0,n.jsx)(e.td,{children:\"slug\"}),(0,n.jsx)(e.td,{children:\"\\uC81C\\uBAA9 \\uAE30\\uBC18 slugify (\\uC911\\uBCF5 \\uC81C\\uAC70 \\uB85C\\uC9C1 \\uD3EC\\uD568)\"})]}),(0,n.jsxs)(e.tr,{children:[(0,n.jsx)(e.td,{children:\"type/sub_type\"}),(0,n.jsx)(e.td,{children:\"frontmatter\\uB85C \\uBCF4\\uC874 & \\uD544\\uD130\"})]}),(0,n.jsxs)(e.tr,{children:[(0,n.jsx)(e.td,{children:\"Notion ID\"}),(0,n.jsx)(e.td,{children:\"\\uD544\\uC694 \\uC2DC notionId\\uB85C \\uC800\\uC7A5 (slug\\uC5D4 \\uC4F0\\uC9C0 \\uC54A\\uC74C)\"})]}),(0,n.jsxs)(e.tr,{children:[(0,n.jsx)(e.td,{children:\"\\uCE90\\uC2F1 \\uC804\\uB7B5\"}),(0,n.jsx)(e.td,{children:\"\\uC815\\uC801 \\uD30C\\uC77C \\uAE30\\uBC18\\uC774\\uB77C Redis \\uBD88\\uD544\\uC694, but \\uAC80\\uC0C9/\\uC870\\uD68C\\uC218 \\uC6A9\\uB3C4\\uB85C\\uB294 \\uC5EC\\uC804\\uD788 \\uC720\\uD6A8\"})]}),(0,n.jsxs)(e.tr,{children:[(0,n.jsx)(e.td,{children:\"SEO/UX\"}),(0,n.jsx)(e.td,{children:\"UUID \\uB300\\uC2E0 readable slug\\uAC00 \\uD6E8\\uC52C \\uC6B0\\uC218\"})]})]})]})]})}function a(r={}){let{wrapper:e}=r.components||{};return e?(0,n.jsx)(e,{...r,children:(0,n.jsx)(s,{...r})}):s(r)}function x(r,e){throw new Error(\"Expected \"+(e?\"component\":\"object\")+\" `\"+r+\"` to be defined: you likely forgot to import, pass, or provide it.\")}return M(N);})();\n;return Component;"
  },
  {
    "notionId": "2251eb5c03378095bcfbe19932b39768",
    "title": "Next.js 15 + Notion + 캐시 시스템을 실제로 구현하기 위한 단계별 가이드",
    "icon": "",
    "full": false,
    "summary": "",
    "pageCover": "https://images.unsplash.com/photo-1593062096033-9a26b09da705?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb",
    "password": "",
    "type": "ENGINEERINGS",
    "description": "",
    "date": "2025-07-04T00:00:00.000Z",
    "lastEditedDate": "2025-08-09T14:48:00.000Z",
    "sub_type": "TIL",
    "category": "TIL",
    "tags": [
      "caching"
    ],
    "draft": false,
    "favorite": true,
    "readingTime": 29,
    "wordCount": 5656,
    "lastModified": "2025-08-09",
    "version": "1.0.0",
    "status": "published",
    "author": "ryoonwithinwisdomlights",
    "content": "> 🥰 캐슁전략플로우\n\n\n\n<strong>✅ Next.js + Notion + 캐싱 전략 전체 플로우 (로컬 vs 운영 + Vercel Cron)</strong>\n\n\n```typescript\n[Client (/blog 접근)]\n        │\n        ▼\n[Next.js 15 App Router → Page Component]\n        │\n        ▼\n[getPosts() 호출]\n        │\n        ├── (로컬 개발 환경)\n        │       │\n        │       ▼\n        │   [p-memoize / memory-cache 등]\n        │       │\n        │       └── 캐시 miss 시\n        │               │\n        │               ▼\n        │          [Notion API fetch (notion-client)]\n        │\n        └── (운영 환경: Vercel)\n                │\n                ▼\n            [Upstash Redis 캐시 확인]\n                │\n                └── 캐시 miss 시\n                        │\n                        ▼\n                   [Notion API fetch (notion-client)]\n\n────────────────────────────────────────────────────────────\n\n[Vercel Cron Job (10분마다 실행)]\n        │\n        ▼\n[GET /api/cron/update-posts → 내부에서 변경사항 탐지]\n        │\n        ▼\n[변경된 post 블록만 다시 fetch]\n        │\n        ▼\n[Redis 캐시 갱신 (Upstash)]\n```\n\n\n\n<strong>✅ 요약 포인트</strong>\n\n\n\n| <strong>구분</strong>       | <strong>전략</strong>                                        |\n| ------------ | --------------------------------------------- |\n| <strong>로컬 개발</strong>    | p-memoize, memory-cache, Map 등 in-memory 방식   |\n| <strong>운영 서버</strong>    | Upstash Redis 사용하여 Vercel 환경에서도 지속되는 캐시       |\n| <strong>최신화</strong>      | Vercel Cron 으로 10분마다 Notion 데이터 변화 감지 후 캐시 갱신 |\n| <strong>Fallback</strong> | 캐시 miss 시에만 notion-client 직접 호출 (서버 전용)       |\n\n\n이 로직을 기준으로한 <strong>Next.js 15 + Notion + 캐시 시스템</strong>을 실제로 구현하기 위한 <strong>단계별 가이드는 아래와 같음.</strong>\n\n\n\n<strong>✅ 전체 작업 순서 요약</strong>\n\n\n\n| <strong>단계</strong> | <strong>목표</strong>                       | <strong>설명</strong>                               |\n| ------ | ---------------------------- | ------------------------------------ |\n| 1단계    | Upstash Redis 설정             | Vercel에서 쓸 수 있는 클라우드 Redis 인스턴스 준비   |\n| 2단계    | Redis 연결 및 캐시 유틸 구현          | 운영환경에서 Redis 캐시를 사용할 수 있게 함수 작성      |\n| 3단계    | getPostBlocks 리팩토링           | 캐싱을 포함한 Notion fetch 함수로 리팩토링        |\n| 4단계    | 로컬/운영 캐시 전략 분기               | 개발환경에서는 memory-cache, 운영환경은 Redis 사용 |\n| 5단계    | Vercel Cron API 만들기          | 주기적으로 Redis 캐시를 갱신할 route 생성         |\n| 6단계    | Vercel Cron 설정               | Vercel dashboard에서 10분 주기로 실행되도록 설정  |\n| 7단계    | ISR(revalidate) 병행(optional) | 인기 페이지는 자동 갱신되도록 revalidate 속성 활용    |\n\n\n## <strong>🧩 1단계: Upstash Redis 설정 (Vercel에서 쓸 외부 캐시)</strong>\n\n1. [https://upstash.com](https://upstash.com/) 가입\n2. Redis → Create Database\n3. REST URL, Token 확인\n4. .env.local에 아래 환경변수 추가\n\n```bash\nUPSTASH_REDIS_REST_URL=your_upstash_url\nUPSTASH_REDIS_REST_TOKEN=your_upstash_token\n```\n\n\n<strong>🧩 2단계: Redis 연결 유틸 생성</strong>\n\n\n```typescript\n// lib/redis.ts\nimport { Redis } from \"@upstash/redis\";\n\nexport const redis = new Redis({\n  url: process.env.UPSTASH_REDIS_REST_URL!,\n  token: process.env.UPSTASH_REDIS_REST_TOKEN!,\n});\n```\n\n\n\n<strong>🧩 3단계: getPostBlocks 리팩토링</strong>\n\n\n\n```typescript\n// lib/notion/getPostBlocks.ts\nimport { NotionAPI } from \"notion-client\";\nimport { redis } from \"@/lib/redis\";\n\nexport async function getPostBlocks(pageId: string) {\n  const cacheKey = `postBlock_${pageId}`;\n\n  const cached = await redis.get(cacheKey);\n  if (cached) return cached;\n\n  const notion = new NotionAPI({\n    userTimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,\n  });\n  const data = await notion.getPage(pageId);\n\n  await redis.set(cacheKey, data, { ex: 600 }); // 10분 TTL\n  return data;\n}\n```\n\n\n\n<strong>🧩 4단계: 로컬/운영 캐시 분기 처리</strong>\n\n\n\n```typescript\n// lib/cache.ts\nconst memory = new Map();\n\nexport async function getCached<T>(\n  key: string,\n  fetcher: () => Promise<T>,\n  ttl = 600\n): Promise<T> {\n  const isProd = process.env.NODE_ENV === \"production\";\n\n  if (!isProd) {\n    if (memory.has(key)) return memory.get(key);\n    const fresh = await fetcher();\n    memory.set(key, fresh);\n    setTimeout(() => memory.delete(key), ttl * 1000);\n    return fresh;\n  }\n\n  // 운영에서는 Redis\n  const cached = await redis.get<T>(key);\n  if (cached) return cached;\n\n  const fresh = await fetcher();\n  await redis.set(key, fresh, { ex: ttl });\n  return fresh;\n}\n```\n\n\n\n<strong>🧩 5단계: Vercel Cron용 API route 만들기</strong>\n\n\n\n```typescript\n// app/api/cron/update-posts/route.ts\nimport { getPostBlocks } from \"@/lib/notion/getPostBlocks\";\nimport { redis } from \"@/lib/redis\";\nimport { NextResponse } from \"next/server\";\n\nconst postPageIds = [\"postid1\", \"postid2\"]; // 변경 감지할 페이지 ID들\n\nexport async function GET() {\n  for (const id of postPageIds) {\n    const data = await getPostBlocks(id);\n    await redis.set(`postBlock_${id}`, data, { ex: 600 });\n  }\n\n  return NextResponse.json({ status: \"refreshed\" });\n}\n```\n\n\n\n<strong>🧩 6단계: Vercel Cron 설정</strong>\n\n\n```json\n{\n  \"path\": \"/api/cron/update-posts\",\n  \"schedule\": \"*/10 * * * *\"\n}\n//(10분마다 실행됨)\n```\n\n\n\n<strong>🧩 7단계: ISR (revalidate = 600) 병행 사용 (선택)</strong>\n\n\n```bash\n// app/blog/page.tsx\n\nexport const revalidate = 600; // 페이지 요청 시 10분 경과되면 백그라운드 regenerate\n\nexport default async function BlogPage() {\n  const posts = await getPosts(); // 내부에서 Redis → Notion 호출\n  return <BlogList posts={posts} />;\n}\n```\n\n\n\n<strong>✅ 마무리 체크리스트</strong>\n\n\n\n| <strong>항목</strong>                  | <strong>완료 여부</strong> |\n| ----------------------- | --------- |\n| ✅ Upstash Redis 연동 완료   | ☐         |\n| ✅ Redis 캐시 유틸 생성        | ☐         |\n| ✅ Notion fetch 캐싱 적용    | ☐         |\n| ✅ Vercel/Local 환경 분기 적용 | ☐         |\n| ✅ cron route 생성 및 배포    | ☐         |\n| ✅ Vercel Cron Job 설정    | ☐         |\n| ✅ ISR 적용 (optional)     | ☐         |",
    "_meta": {
      "filePath": "engineerings-Next-js-15-Notion-캐시-시스템을-실제로-.mdx",
      "fileName": "engineerings-Next-js-15-Notion-캐시-시스템을-실제로-.mdx",
      "directory": ".",
      "extension": "mdx",
      "path": "engineerings-Next-js-15-Notion-캐시-시스템을-실제로-"
    },
    "toc": [
      {
        "title": "🧩 1단계: Upstash Redis 설정 (Vercel에서 쓸 외부 캐시)",
        "url": "#-1단계-upstash-redis-설정-vercel에서-쓸-외부-캐시",
        "depth": 2
      }
    ],
    "structuredData": {
      "contents": [
        {
          "heading": "",
          "content": "🥰 캐슁전략플로우"
        },
        {
          "heading": "",
          "content": "구분"
        },
        {
          "heading": "",
          "content": "전략"
        },
        {
          "heading": "",
          "content": "로컬 개발"
        },
        {
          "heading": "",
          "content": "p-memoize, memory-cache, Map 등 in-memory 방식"
        },
        {
          "heading": "",
          "content": "운영 서버"
        },
        {
          "heading": "",
          "content": "Upstash Redis 사용하여 Vercel 환경에서도 지속되는 캐시"
        },
        {
          "heading": "",
          "content": "최신화"
        },
        {
          "heading": "",
          "content": "Vercel Cron 으로 10분마다 Notion 데이터 변화 감지 후 캐시 갱신"
        },
        {
          "heading": "",
          "content": "Fallback"
        },
        {
          "heading": "",
          "content": "캐시 miss 시에만 notion-client 직접 호출 (서버 전용)"
        },
        {
          "heading": "",
          "content": "이 로직을 기준으로한 Next.js 15 + Notion + 캐시 시스템을 실제로 구현하기 위한 단계별 가이드는 아래와 같음."
        },
        {
          "heading": "",
          "content": "단계"
        },
        {
          "heading": "",
          "content": "목표"
        },
        {
          "heading": "",
          "content": "설명"
        },
        {
          "heading": "",
          "content": "1단계"
        },
        {
          "heading": "",
          "content": "Upstash Redis 설정"
        },
        {
          "heading": "",
          "content": "Vercel에서 쓸 수 있는 클라우드 Redis 인스턴스 준비"
        },
        {
          "heading": "",
          "content": "2단계"
        },
        {
          "heading": "",
          "content": "Redis 연결 및 캐시 유틸 구현"
        },
        {
          "heading": "",
          "content": "운영환경에서 Redis 캐시를 사용할 수 있게 함수 작성"
        },
        {
          "heading": "",
          "content": "3단계"
        },
        {
          "heading": "",
          "content": "getPostBlocks 리팩토링"
        },
        {
          "heading": "",
          "content": "캐싱을 포함한 Notion fetch 함수로 리팩토링"
        },
        {
          "heading": "",
          "content": "4단계"
        },
        {
          "heading": "",
          "content": "로컬/운영 캐시 전략 분기"
        },
        {
          "heading": "",
          "content": "개발환경에서는 memory-cache, 운영환경은 Redis 사용"
        },
        {
          "heading": "",
          "content": "5단계"
        },
        {
          "heading": "",
          "content": "Vercel Cron API 만들기"
        },
        {
          "heading": "",
          "content": "주기적으로 Redis 캐시를 갱신할 route 생성"
        },
        {
          "heading": "",
          "content": "6단계"
        },
        {
          "heading": "",
          "content": "Vercel Cron 설정"
        },
        {
          "heading": "",
          "content": "Vercel dashboard에서 10분 주기로 실행되도록 설정"
        },
        {
          "heading": "",
          "content": "7단계"
        },
        {
          "heading": "",
          "content": "ISR(revalidate) 병행(optional)"
        },
        {
          "heading": "",
          "content": "인기 페이지는 자동 갱신되도록 revalidate 속성 활용"
        },
        {
          "heading": "-1단계-upstash-redis-설정-vercel에서-쓸-외부-캐시",
          "content": "https://upstash.com 가입"
        },
        {
          "heading": "-1단계-upstash-redis-설정-vercel에서-쓸-외부-캐시",
          "content": "Redis → Create Database"
        },
        {
          "heading": "-1단계-upstash-redis-설정-vercel에서-쓸-외부-캐시",
          "content": "REST URL, Token 확인"
        },
        {
          "heading": "-1단계-upstash-redis-설정-vercel에서-쓸-외부-캐시",
          "content": ".env.local에 아래 환경변수 추가"
        },
        {
          "heading": "-1단계-upstash-redis-설정-vercel에서-쓸-외부-캐시",
          "content": "항목"
        },
        {
          "heading": "-1단계-upstash-redis-설정-vercel에서-쓸-외부-캐시",
          "content": "완료 여부"
        },
        {
          "heading": "-1단계-upstash-redis-설정-vercel에서-쓸-외부-캐시",
          "content": "✅ Upstash Redis 연동 완료"
        },
        {
          "heading": "-1단계-upstash-redis-설정-vercel에서-쓸-외부-캐시",
          "content": "☐"
        },
        {
          "heading": "-1단계-upstash-redis-설정-vercel에서-쓸-외부-캐시",
          "content": "✅ Redis 캐시 유틸 생성"
        },
        {
          "heading": "-1단계-upstash-redis-설정-vercel에서-쓸-외부-캐시",
          "content": "☐"
        },
        {
          "heading": "-1단계-upstash-redis-설정-vercel에서-쓸-외부-캐시",
          "content": "✅ Notion fetch 캐싱 적용"
        },
        {
          "heading": "-1단계-upstash-redis-설정-vercel에서-쓸-외부-캐시",
          "content": "☐"
        },
        {
          "heading": "-1단계-upstash-redis-설정-vercel에서-쓸-외부-캐시",
          "content": "✅ Vercel/Local 환경 분기 적용"
        },
        {
          "heading": "-1단계-upstash-redis-설정-vercel에서-쓸-외부-캐시",
          "content": "☐"
        },
        {
          "heading": "-1단계-upstash-redis-설정-vercel에서-쓸-외부-캐시",
          "content": "✅ cron route 생성 및 배포"
        },
        {
          "heading": "-1단계-upstash-redis-설정-vercel에서-쓸-외부-캐시",
          "content": "☐"
        },
        {
          "heading": "-1단계-upstash-redis-설정-vercel에서-쓸-외부-캐시",
          "content": "✅ Vercel Cron Job 설정"
        },
        {
          "heading": "-1단계-upstash-redis-설정-vercel에서-쓸-외부-캐시",
          "content": "☐"
        },
        {
          "heading": "-1단계-upstash-redis-설정-vercel에서-쓸-외부-캐시",
          "content": "✅ ISR 적용 (optional)"
        },
        {
          "heading": "-1단계-upstash-redis-설정-vercel에서-쓸-외부-캐시",
          "content": "☐"
        }
      ],
      "headings": [
        {
          "id": "-1단계-upstash-redis-설정-vercel에서-쓸-외부-캐시",
          "content": "🧩 1단계: Upstash Redis 설정 (Vercel에서 쓸 외부 캐시)"
        }
      ]
    },
    "body": "var Component=(()=>{var E=Object.create;var n=Object.defineProperty;var p=Object.getOwnPropertyDescriptor;var g=Object.getOwnPropertyNames;var y=Object.getPrototypeOf,F=Object.prototype.hasOwnProperty;var o=(h,s)=>()=>(s||h((s={exports:{}}).exports,s),s.exports),m=(h,s)=>{for(var l in s)n(h,l,{get:s[l],enumerable:!0})},r=(h,s,l,a)=>{if(s&&typeof s==\"object\"||typeof s==\"function\")for(let e of g(s))!F.call(h,e)&&e!==l&&n(h,e,{get:()=>s[e],enumerable:!(a=p(s,e))||a.enumerable});return h};var C=(h,s,l)=>(l=h!=null?E(y(h)):{},r(s||!h||!h.__esModule?n(l,\"default\",{value:h,enumerable:!0}):l,h)),N=h=>r(n({},\"__esModule\",{value:!0}),h);var d=o((D,k)=>{k.exports=_jsx_runtime});var A={};m(A,{default:()=>c});var i=C(d());function t(h){let s={a:\"a\",blockquote:\"blockquote\",code:\"code\",h2:\"h2\",li:\"li\",ol:\"ol\",p:\"p\",pre:\"pre\",span:\"span\",table:\"table\",tbody:\"tbody\",td:\"td\",th:\"th\",thead:\"thead\",tr:\"tr\",...h.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(s.blockquote,{children:[`\n`,(0,i.jsx)(s.p,{children:\"\\u{1F970}\\xA0\\uCE90\\uC281\\uC804\\uB7B5\\uD50C\\uB85C\\uC6B0\"}),`\n`]}),`\n`,(0,i.jsx)(\"strong\",{children:\"\\u2705 Next.js + Notion + \\uCE90\\uC2F1 \\uC804\\uB7B5 \\uC804\\uCCB4 \\uD50C\\uB85C\\uC6B0 (\\uB85C\\uCEEC vs \\uC6B4\\uC601 + Vercel Cron)\"}),`\n`,(0,i.jsx)(i.Fragment,{children:(0,i.jsx)(s.pre,{className:\"shiki shiki-themes github-light github-dark\",style:{\"--shiki-light\":\"#24292e\",\"--shiki-dark\":\"#e1e4e8\",\"--shiki-light-bg\":\"#fff\",\"--shiki-dark-bg\":\"#24292e\"},tabIndex:\"0\",icon:'<svg viewBox=\"0 0 24 24\"><path d=\"M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z\" fill=\"currentColor\" /></svg>',children:(0,i.jsxs)(s.code,{children:[(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"[\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\"Client\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" (\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"/\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"blog \\uC811\\uADFC)]\"})]}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u2502\"})}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u25BC\"})}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"[Next.js \"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:\"15\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" App Router \\u2192 Page Component]\"})]}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u2502\"})}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u25BC\"})}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"[\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\"getPosts\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"() \\uD638\\uCD9C]\"})]}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u2502\"})}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u251C\\u2500\\u2500 (\\uB85C\\uCEEC \\uAC1C\\uBC1C \\uD658\\uACBD)\"})}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u2502       \\u2502\"})}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u2502       \\u25BC\"})}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u2502   [p\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"-\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"memoize \"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"/\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" memory\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"-\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"cache \\uB4F1]\"})]}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u2502       \\u2502\"})}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u2502       \\u2514\\u2500\\u2500 \\uCE90\\uC2DC miss \\uC2DC\"})}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u2502               \\u2502\"})}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u2502               \\u25BC\"})}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u2502          [Notion \"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:\"API\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\" fetch\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" (notion\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"-\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"client)]\"})]}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u2502\"})}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u2514\\u2500\\u2500 (\\uC6B4\\uC601 \\uD658\\uACBD: Vercel)\"})}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"                \\u2502\"})}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"                \\u25BC\"})}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"            [Upstash Redis \\uCE90\\uC2DC \\uD655\\uC778]\"})}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"                \\u2502\"})}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"                \\u2514\\u2500\\u2500 \\uCE90\\uC2DC miss \\uC2DC\"})}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"                        \\u2502\"})}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"                        \\u25BC\"})}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"                   [Notion \"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:\"API\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\" fetch\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" (notion\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"-\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"client)]\"})]}),`\n`,(0,i.jsx)(s.span,{className:\"line\"}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\"})}),`\n`,(0,i.jsx)(s.span,{className:\"line\"}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"[Vercel Cron \"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\"Job\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" (10\\uBD84\\uB9C8\\uB2E4 \\uC2E4\\uD589)]\"})]}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u2502\"})}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u25BC\"})}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"[\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:\"GET\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" /\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"api\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"/\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"cron\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"/\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"update\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"-\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"posts \\u2192 \\uB0B4\\uBD80\\uC5D0\\uC11C \\uBCC0\\uACBD\\uC0AC\\uD56D \\uD0D0\\uC9C0]\"})]}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u2502\"})}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u25BC\"})}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"[\\uBCC0\\uACBD\\uB41C post \\uBE14\\uB85D\\uB9CC \\uB2E4\\uC2DC fetch]\"})}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u2502\"})}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u25BC\"})}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"[Redis \\uCE90\\uC2DC \"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\"\\uAC31\\uC2E0\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" (Upstash)]\"})]})]})})}),`\n`,(0,i.jsx)(\"strong\",{children:\"\\u2705 \\uC694\\uC57D \\uD3EC\\uC778\\uD2B8\"}),`\n`,(0,i.jsxs)(s.table,{children:[(0,i.jsx)(s.thead,{children:(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.th,{children:(0,i.jsx)(\"strong\",{children:\"\\uAD6C\\uBD84\"})}),(0,i.jsx)(s.th,{children:(0,i.jsx)(\"strong\",{children:\"\\uC804\\uB7B5\"})})]})}),(0,i.jsxs)(s.tbody,{children:[(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{children:(0,i.jsx)(\"strong\",{children:\"\\uB85C\\uCEEC \\uAC1C\\uBC1C\"})}),(0,i.jsx)(s.td,{children:\"p-memoize, memory-cache, Map \\uB4F1 in-memory \\uBC29\\uC2DD\"})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{children:(0,i.jsx)(\"strong\",{children:\"\\uC6B4\\uC601 \\uC11C\\uBC84\"})}),(0,i.jsx)(s.td,{children:\"Upstash Redis \\uC0AC\\uC6A9\\uD558\\uC5EC Vercel \\uD658\\uACBD\\uC5D0\\uC11C\\uB3C4 \\uC9C0\\uC18D\\uB418\\uB294 \\uCE90\\uC2DC\"})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{children:(0,i.jsx)(\"strong\",{children:\"\\uCD5C\\uC2E0\\uD654\"})}),(0,i.jsx)(s.td,{children:\"Vercel Cron \\uC73C\\uB85C 10\\uBD84\\uB9C8\\uB2E4 Notion \\uB370\\uC774\\uD130 \\uBCC0\\uD654 \\uAC10\\uC9C0 \\uD6C4 \\uCE90\\uC2DC \\uAC31\\uC2E0\"})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{children:(0,i.jsx)(\"strong\",{children:\"Fallback\"})}),(0,i.jsx)(s.td,{children:\"\\uCE90\\uC2DC miss \\uC2DC\\uC5D0\\uB9CC notion-client \\uC9C1\\uC811 \\uD638\\uCD9C (\\uC11C\\uBC84 \\uC804\\uC6A9)\"})]})]})]}),`\n`,(0,i.jsxs)(s.p,{children:[\"\\uC774 \\uB85C\\uC9C1\\uC744 \\uAE30\\uC900\\uC73C\\uB85C\\uD55C \",(0,i.jsx)(\"strong\",{children:\"Next.js 15 + Notion + \\uCE90\\uC2DC \\uC2DC\\uC2A4\\uD15C\"}),\"\\uC744 \\uC2E4\\uC81C\\uB85C \\uAD6C\\uD604\\uD558\\uAE30 \\uC704\\uD55C \",(0,i.jsx)(\"strong\",{children:\"\\uB2E8\\uACC4\\uBCC4 \\uAC00\\uC774\\uB4DC\\uB294 \\uC544\\uB798\\uC640 \\uAC19\\uC74C.\"})]}),`\n`,(0,i.jsx)(\"strong\",{children:\"\\u2705 \\uC804\\uCCB4 \\uC791\\uC5C5 \\uC21C\\uC11C \\uC694\\uC57D\"}),`\n`,(0,i.jsxs)(s.table,{children:[(0,i.jsx)(s.thead,{children:(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.th,{children:(0,i.jsx)(\"strong\",{children:\"\\uB2E8\\uACC4\"})}),(0,i.jsx)(s.th,{children:(0,i.jsx)(\"strong\",{children:\"\\uBAA9\\uD45C\"})}),(0,i.jsx)(s.th,{children:(0,i.jsx)(\"strong\",{children:\"\\uC124\\uBA85\"})})]})}),(0,i.jsxs)(s.tbody,{children:[(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{children:\"1\\uB2E8\\uACC4\"}),(0,i.jsx)(s.td,{children:\"Upstash Redis \\uC124\\uC815\"}),(0,i.jsx)(s.td,{children:\"Vercel\\uC5D0\\uC11C \\uC4F8 \\uC218 \\uC788\\uB294 \\uD074\\uB77C\\uC6B0\\uB4DC Redis \\uC778\\uC2A4\\uD134\\uC2A4 \\uC900\\uBE44\"})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{children:\"2\\uB2E8\\uACC4\"}),(0,i.jsx)(s.td,{children:\"Redis \\uC5F0\\uACB0 \\uBC0F \\uCE90\\uC2DC \\uC720\\uD2F8 \\uAD6C\\uD604\"}),(0,i.jsx)(s.td,{children:\"\\uC6B4\\uC601\\uD658\\uACBD\\uC5D0\\uC11C Redis \\uCE90\\uC2DC\\uB97C \\uC0AC\\uC6A9\\uD560 \\uC218 \\uC788\\uAC8C \\uD568\\uC218 \\uC791\\uC131\"})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{children:\"3\\uB2E8\\uACC4\"}),(0,i.jsx)(s.td,{children:\"getPostBlocks \\uB9AC\\uD329\\uD1A0\\uB9C1\"}),(0,i.jsx)(s.td,{children:\"\\uCE90\\uC2F1\\uC744 \\uD3EC\\uD568\\uD55C Notion fetch \\uD568\\uC218\\uB85C \\uB9AC\\uD329\\uD1A0\\uB9C1\"})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{children:\"4\\uB2E8\\uACC4\"}),(0,i.jsx)(s.td,{children:\"\\uB85C\\uCEEC/\\uC6B4\\uC601 \\uCE90\\uC2DC \\uC804\\uB7B5 \\uBD84\\uAE30\"}),(0,i.jsx)(s.td,{children:\"\\uAC1C\\uBC1C\\uD658\\uACBD\\uC5D0\\uC11C\\uB294 memory-cache, \\uC6B4\\uC601\\uD658\\uACBD\\uC740 Redis \\uC0AC\\uC6A9\"})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{children:\"5\\uB2E8\\uACC4\"}),(0,i.jsx)(s.td,{children:\"Vercel Cron API \\uB9CC\\uB4E4\\uAE30\"}),(0,i.jsx)(s.td,{children:\"\\uC8FC\\uAE30\\uC801\\uC73C\\uB85C Redis \\uCE90\\uC2DC\\uB97C \\uAC31\\uC2E0\\uD560 route \\uC0DD\\uC131\"})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{children:\"6\\uB2E8\\uACC4\"}),(0,i.jsx)(s.td,{children:\"Vercel Cron \\uC124\\uC815\"}),(0,i.jsx)(s.td,{children:\"Vercel dashboard\\uC5D0\\uC11C 10\\uBD84 \\uC8FC\\uAE30\\uB85C \\uC2E4\\uD589\\uB418\\uB3C4\\uB85D \\uC124\\uC815\"})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{children:\"7\\uB2E8\\uACC4\"}),(0,i.jsx)(s.td,{children:\"ISR(revalidate) \\uBCD1\\uD589(optional)\"}),(0,i.jsx)(s.td,{children:\"\\uC778\\uAE30 \\uD398\\uC774\\uC9C0\\uB294 \\uC790\\uB3D9 \\uAC31\\uC2E0\\uB418\\uB3C4\\uB85D revalidate \\uC18D\\uC131 \\uD65C\\uC6A9\"})]})]})]}),`\n`,(0,i.jsx)(s.h2,{id:\"-1\\uB2E8\\uACC4-upstash-redis-\\uC124\\uC815-vercel\\uC5D0\\uC11C-\\uC4F8-\\uC678\\uBD80-\\uCE90\\uC2DC\",children:(0,i.jsx)(\"strong\",{children:\"\\u{1F9E9} 1\\uB2E8\\uACC4: Upstash Redis \\uC124\\uC815 (Vercel\\uC5D0\\uC11C \\uC4F8 \\uC678\\uBD80 \\uCE90\\uC2DC)\"})}),`\n`,(0,i.jsxs)(s.ol,{children:[`\n`,(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.a,{href:\"https://upstash.com/\",children:\"https://upstash.com\"}),\" \\uAC00\\uC785\"]}),`\n`,(0,i.jsx)(s.li,{children:\"Redis \\u2192 Create Database\"}),`\n`,(0,i.jsx)(s.li,{children:\"REST URL, Token \\uD655\\uC778\"}),`\n`,(0,i.jsx)(s.li,{children:\".env.local\\uC5D0 \\uC544\\uB798 \\uD658\\uACBD\\uBCC0\\uC218 \\uCD94\\uAC00\"}),`\n`]}),`\n`,(0,i.jsx)(i.Fragment,{children:(0,i.jsx)(s.pre,{className:\"shiki shiki-themes github-light github-dark\",style:{\"--shiki-light\":\"#24292e\",\"--shiki-dark\":\"#e1e4e8\",\"--shiki-light-bg\":\"#fff\",\"--shiki-dark-bg\":\"#24292e\"},tabIndex:\"0\",icon:'<svg viewBox=\"0 0 24 24\"><path d=\"m 4,4 a 1,1 0 0 0 -0.7070312,0.2929687 1,1 0 0 0 0,1.4140625 L 8.5859375,11 3.2929688,16.292969 a 1,1 0 0 0 0,1.414062 1,1 0 0 0 1.4140624,0 l 5.9999998,-6 a 1.0001,1.0001 0 0 0 0,-1.414062 L 4.7070312,4.2929687 A 1,1 0 0 0 4,4 Z m 8,14 a 1,1 0 0 0 -1,1 1,1 0 0 0 1,1 h 8 a 1,1 0 0 0 1,-1 1,1 0 0 0 -1,-1 z\" fill=\"currentColor\" /></svg>',children:(0,i.jsxs)(s.code,{children:[(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"UPSTASH_REDIS_REST_URL\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"=\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\"your_upstash_url\"})]}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"UPSTASH_REDIS_REST_TOKEN\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"=\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\"your_upstash_token\"})]})]})})}),`\n`,(0,i.jsx)(\"strong\",{children:\"\\u{1F9E9} 2\\uB2E8\\uACC4: Redis \\uC5F0\\uACB0 \\uC720\\uD2F8 \\uC0DD\\uC131\"}),`\n`,(0,i.jsx)(i.Fragment,{children:(0,i.jsx)(s.pre,{className:\"shiki shiki-themes github-light github-dark\",style:{\"--shiki-light\":\"#24292e\",\"--shiki-dark\":\"#e1e4e8\",\"--shiki-light-bg\":\"#fff\",\"--shiki-dark-bg\":\"#24292e\"},tabIndex:\"0\",icon:'<svg viewBox=\"0 0 24 24\"><path d=\"M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z\" fill=\"currentColor\" /></svg>',children:(0,i.jsxs)(s.code,{children:[(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6A737D\",\"--shiki-dark\":\"#6A737D\"},children:\"// lib/redis.ts\"})}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"import\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" { Redis } \"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"from\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:' \"@upstash/redis\"'}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\";\"})]}),`\n`,(0,i.jsx)(s.span,{className:\"line\"}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"export\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" const\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:\" redis\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" =\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" new\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\" Redis\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"({\"})]}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"  url: process.env.\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:\"UPSTASH_REDIS_REST_URL\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"!\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\",\"})]}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"  token: process.env.\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:\"UPSTASH_REDIS_REST_TOKEN\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"!\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\",\"})]}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"});\"})})]})})}),`\n`,(0,i.jsx)(\"strong\",{children:\"\\u{1F9E9} 3\\uB2E8\\uACC4: getPostBlocks \\uB9AC\\uD329\\uD1A0\\uB9C1\"}),`\n`,(0,i.jsx)(i.Fragment,{children:(0,i.jsx)(s.pre,{className:\"shiki shiki-themes github-light github-dark\",style:{\"--shiki-light\":\"#24292e\",\"--shiki-dark\":\"#e1e4e8\",\"--shiki-light-bg\":\"#fff\",\"--shiki-dark-bg\":\"#24292e\"},tabIndex:\"0\",icon:'<svg viewBox=\"0 0 24 24\"><path d=\"M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z\" fill=\"currentColor\" /></svg>',children:(0,i.jsxs)(s.code,{children:[(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6A737D\",\"--shiki-dark\":\"#6A737D\"},children:\"// lib/notion/getPostBlocks.ts\"})}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"import\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" { NotionAPI } \"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"from\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:' \"notion-client\"'}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\";\"})]}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"import\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" { redis } \"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"from\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:' \"@/lib/redis\"'}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\";\"})]}),`\n`,(0,i.jsx)(s.span,{className:\"line\"}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"export\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" async\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" function\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\" getPostBlocks\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"(\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#E36209\",\"--shiki-dark\":\"#FFAB70\"},children:\"pageId\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\":\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:\" string\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\") {\"})]}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"  const\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:\" cacheKey\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" =\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\" `postBlock_${\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"pageId\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\"}`\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\";\"})]}),`\n`,(0,i.jsx)(s.span,{className:\"line\"}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"  const\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:\" cached\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" =\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" await\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" redis.\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\"get\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"(cacheKey);\"})]}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"  if\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" (cached) \"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"return\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" cached;\"})]}),`\n`,(0,i.jsx)(s.span,{className:\"line\"}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"  const\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:\" notion\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" =\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" new\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\" NotionAPI\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"({\"})]}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"    userTimeZone: Intl.\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\"DateTimeFormat\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"().\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\"resolvedOptions\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"().timeZone,\"})]}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"  });\"})}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"  const\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:\" data\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" =\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" await\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" notion.\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\"getPage\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"(pageId);\"})]}),`\n`,(0,i.jsx)(s.span,{className:\"line\"}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"  await\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" redis.\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\"set\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"(cacheKey, data, { ex: \"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:\"600\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" }); \"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6A737D\",\"--shiki-dark\":\"#6A737D\"},children:\"// 10\\uBD84 TTL\"})]}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"  return\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" data;\"})]}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"}\"})})]})})}),`\n`,(0,i.jsx)(\"strong\",{children:\"\\u{1F9E9} 4\\uB2E8\\uACC4: \\uB85C\\uCEEC/\\uC6B4\\uC601 \\uCE90\\uC2DC \\uBD84\\uAE30 \\uCC98\\uB9AC\"}),`\n`,(0,i.jsx)(i.Fragment,{children:(0,i.jsx)(s.pre,{className:\"shiki shiki-themes github-light github-dark\",style:{\"--shiki-light\":\"#24292e\",\"--shiki-dark\":\"#e1e4e8\",\"--shiki-light-bg\":\"#fff\",\"--shiki-dark-bg\":\"#24292e\"},tabIndex:\"0\",icon:'<svg viewBox=\"0 0 24 24\"><path d=\"M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z\" fill=\"currentColor\" /></svg>',children:(0,i.jsxs)(s.code,{children:[(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6A737D\",\"--shiki-dark\":\"#6A737D\"},children:\"// lib/cache.ts\"})}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"const\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:\" memory\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" =\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" new\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\" Map\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"();\"})]}),`\n`,(0,i.jsx)(s.span,{className:\"line\"}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"export\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" async\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" function\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\" getCached\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"<\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\"T\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\">(\"})]}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#E36209\",\"--shiki-dark\":\"#FFAB70\"},children:\"  key\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\":\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:\" string\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\",\"})]}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\"  fetcher\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\":\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" () \"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"=>\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\" Promise\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"<\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\"T\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\">,\"})]}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#E36209\",\"--shiki-dark\":\"#FFAB70\"},children:\"  ttl\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" =\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:\" 600\"})]}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\")\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\":\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\" Promise\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"<\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\"T\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"> {\"})]}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"  const\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:\" isProd\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" =\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" process.env.\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:\"NODE_ENV\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" ===\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:' \"production\"'}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\";\"})]}),`\n`,(0,i.jsx)(s.span,{className:\"line\"}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"  if\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" (\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"!\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"isProd) {\"})]}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"    if\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" (memory.\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\"has\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"(key)) \"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"return\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" memory.\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\"get\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"(key);\"})]}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"    const\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:\" fresh\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" =\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" await\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\" fetcher\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"();\"})]}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"    memory.\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\"set\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"(key, fresh);\"})]}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\"    setTimeout\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"(() \"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"=>\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" memory.\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\"delete\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"(key), ttl \"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"*\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:\" 1000\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\");\"})]}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"    return\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" fresh;\"})]}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"  }\"})}),`\n`,(0,i.jsx)(s.span,{className:\"line\"}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6A737D\",\"--shiki-dark\":\"#6A737D\"},children:\"  // \\uC6B4\\uC601\\uC5D0\\uC11C\\uB294 Redis\"})}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"  const\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:\" cached\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" =\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" await\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" redis.\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\"get\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"<\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\"T\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\">(key);\"})]}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"  if\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" (cached) \"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"return\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" cached;\"})]}),`\n`,(0,i.jsx)(s.span,{className:\"line\"}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"  const\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:\" fresh\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" =\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" await\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\" fetcher\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"();\"})]}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"  await\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" redis.\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\"set\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"(key, fresh, { ex: ttl });\"})]}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"  return\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" fresh;\"})]}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"}\"})})]})})}),`\n`,(0,i.jsx)(\"strong\",{children:\"\\u{1F9E9} 5\\uB2E8\\uACC4: Vercel Cron\\uC6A9 API route \\uB9CC\\uB4E4\\uAE30\"}),`\n`,(0,i.jsx)(i.Fragment,{children:(0,i.jsx)(s.pre,{className:\"shiki shiki-themes github-light github-dark\",style:{\"--shiki-light\":\"#24292e\",\"--shiki-dark\":\"#e1e4e8\",\"--shiki-light-bg\":\"#fff\",\"--shiki-dark-bg\":\"#24292e\"},tabIndex:\"0\",icon:'<svg viewBox=\"0 0 24 24\"><path d=\"M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z\" fill=\"currentColor\" /></svg>',children:(0,i.jsxs)(s.code,{children:[(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6A737D\",\"--shiki-dark\":\"#6A737D\"},children:\"// app/api/cron/update-posts/route.ts\"})}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"import\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" { getPostBlocks } \"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"from\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:' \"@/lib/notion/getPostBlocks\"'}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\";\"})]}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"import\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" { redis } \"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"from\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:' \"@/lib/redis\"'}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\";\"})]}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"import\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" { NextResponse } \"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"from\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:' \"next/server\"'}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\";\"})]}),`\n`,(0,i.jsx)(s.span,{className:\"line\"}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"const\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:\" postPageIds\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" =\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" [\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:'\"postid1\"'}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\", \"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:'\"postid2\"'}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"]; \"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6A737D\",\"--shiki-dark\":\"#6A737D\"},children:\"// \\uBCC0\\uACBD \\uAC10\\uC9C0\\uD560 \\uD398\\uC774\\uC9C0 ID\\uB4E4\"})]}),`\n`,(0,i.jsx)(s.span,{className:\"line\"}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"export\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" async\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" function\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\" GET\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"() {\"})]}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"  for\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" (\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"const\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:\" id\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" of\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" postPageIds) {\"})]}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"    const\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:\" data\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" =\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" await\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\" getPostBlocks\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"(id);\"})]}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"    await\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" redis.\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\"set\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"(\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\"`postBlock_${\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"id\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\"}`\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\", data, { ex: \"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:\"600\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" });\"})]}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"  }\"})}),`\n`,(0,i.jsx)(s.span,{className:\"line\"}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"  return\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" NextResponse.\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\"json\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"({ status: \"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:'\"refreshed\"'}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" });\"})]}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"}\"})})]})})}),`\n`,(0,i.jsx)(\"strong\",{children:\"\\u{1F9E9} 6\\uB2E8\\uACC4: Vercel Cron \\uC124\\uC815\"}),`\n`,(0,i.jsx)(i.Fragment,{children:(0,i.jsx)(s.pre,{className:\"shiki shiki-themes github-light github-dark\",style:{\"--shiki-light\":\"#24292e\",\"--shiki-dark\":\"#e1e4e8\",\"--shiki-light-bg\":\"#fff\",\"--shiki-dark-bg\":\"#24292e\"},tabIndex:\"0\",icon:'<svg viewBox=\"0 0 24 24\"><path d=\"M 6,1 C 4.354992,1 3,2.354992 3,4 v 16 c 0,1.645008 1.354992,3 3,3 h 12 c 1.645008,0 3,-1.354992 3,-3 V 8 7 A 1.0001,1.0001 0 0 0 20.707031,6.2929687 l -5,-5 A 1.0001,1.0001 0 0 0 15,1 h -1 z m 0,2 h 7 v 3 c 0,1.645008 1.354992,3 3,3 h 3 v 11 c 0,0.564129 -0.435871,1 -1,1 H 6 C 5.4358712,21 5,20.564129 5,20 V 4 C 5,3.4358712 5.4358712,3 6,3 Z M 15,3.4140625 18.585937,7 H 16 C 15.435871,7 15,6.5641288 15,6 Z\" fill=\"currentColor\" /></svg>',children:(0,i.jsxs)(s.code,{children:[(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"{\"})}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:'  \"path\"'}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\": \"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:'\"/api/cron/update-posts\"'}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\",\"})]}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:'  \"schedule\"'}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\": \"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:'\"*/10 * * * *\"'})]}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"}\"})}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6A737D\",\"--shiki-dark\":\"#6A737D\"},children:\"//(10\\uBD84\\uB9C8\\uB2E4 \\uC2E4\\uD589\\uB428)\"})})]})})}),`\n`,(0,i.jsx)(\"strong\",{children:\"\\u{1F9E9} 7\\uB2E8\\uACC4: ISR (revalidate = 600) \\uBCD1\\uD589 \\uC0AC\\uC6A9 (\\uC120\\uD0DD)\"}),`\n`,(0,i.jsx)(i.Fragment,{children:(0,i.jsx)(s.pre,{className:\"shiki shiki-themes github-light github-dark\",style:{\"--shiki-light\":\"#24292e\",\"--shiki-dark\":\"#e1e4e8\",\"--shiki-light-bg\":\"#fff\",\"--shiki-dark-bg\":\"#24292e\"},tabIndex:\"0\",icon:'<svg viewBox=\"0 0 24 24\"><path d=\"m 4,4 a 1,1 0 0 0 -0.7070312,0.2929687 1,1 0 0 0 0,1.4140625 L 8.5859375,11 3.2929688,16.292969 a 1,1 0 0 0 0,1.414062 1,1 0 0 0 1.4140624,0 l 5.9999998,-6 a 1.0001,1.0001 0 0 0 0,-1.414062 L 4.7070312,4.2929687 A 1,1 0 0 0 4,4 Z m 8,14 a 1,1 0 0 0 -1,1 1,1 0 0 0 1,1 h 8 a 1,1 0 0 0 1,-1 1,1 0 0 0 -1,-1 z\" fill=\"currentColor\" /></svg>',children:(0,i.jsxs)(s.code,{children:[(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\"//\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\" app/blog/page.tsx\"})]}),`\n`,(0,i.jsx)(s.span,{className:\"line\"}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"export\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" const revalidate = 600; \"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\"//\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\" \\uD398\\uC774\\uC9C0\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\" \\uC694\\uCCAD\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\" \\uC2DC\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\" 10\\uBD84\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\" \\uACBD\\uACFC\\uB418\\uBA74\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\" \\uBC31\\uADF8\\uB77C\\uC6B4\\uB4DC\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\" regenerate\"})]}),`\n`,(0,i.jsx)(s.span,{className:\"line\"}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"export\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" default async function BlogPage() {\"})]}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\"  const\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\" posts\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\" =\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\" await\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\" getPosts\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"(); \"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\"//\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\" \\uB0B4\\uBD80\\uC5D0\\uC11C\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\" Redis\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\" \\u2192\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\" Notion\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\" \\uD638\\uCD9C\"})]}),`\n`,(0,i.jsxs)(s.span,{className:\"line\",children:[(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"  return\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" <\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\"BlogList\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\" posts={posts}\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" /\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\">\"}),(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\";\"})]}),`\n`,(0,i.jsx)(s.span,{className:\"line\",children:(0,i.jsx)(s.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"}\"})})]})})}),`\n`,(0,i.jsx)(\"strong\",{children:\"\\u2705 \\uB9C8\\uBB34\\uB9AC \\uCCB4\\uD06C\\uB9AC\\uC2A4\\uD2B8\"}),`\n`,(0,i.jsxs)(s.table,{children:[(0,i.jsx)(s.thead,{children:(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.th,{children:(0,i.jsx)(\"strong\",{children:\"\\uD56D\\uBAA9\"})}),(0,i.jsx)(s.th,{children:(0,i.jsx)(\"strong\",{children:\"\\uC644\\uB8CC \\uC5EC\\uBD80\"})})]})}),(0,i.jsxs)(s.tbody,{children:[(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{children:\"\\u2705 Upstash Redis \\uC5F0\\uB3D9 \\uC644\\uB8CC\"}),(0,i.jsx)(s.td,{children:\"\\u2610\"})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{children:\"\\u2705 Redis \\uCE90\\uC2DC \\uC720\\uD2F8 \\uC0DD\\uC131\"}),(0,i.jsx)(s.td,{children:\"\\u2610\"})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{children:\"\\u2705 Notion fetch \\uCE90\\uC2F1 \\uC801\\uC6A9\"}),(0,i.jsx)(s.td,{children:\"\\u2610\"})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{children:\"\\u2705 Vercel/Local \\uD658\\uACBD \\uBD84\\uAE30 \\uC801\\uC6A9\"}),(0,i.jsx)(s.td,{children:\"\\u2610\"})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{children:\"\\u2705 cron route \\uC0DD\\uC131 \\uBC0F \\uBC30\\uD3EC\"}),(0,i.jsx)(s.td,{children:\"\\u2610\"})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{children:\"\\u2705 Vercel Cron Job \\uC124\\uC815\"}),(0,i.jsx)(s.td,{children:\"\\u2610\"})]}),(0,i.jsxs)(s.tr,{children:[(0,i.jsx)(s.td,{children:\"\\u2705 ISR \\uC801\\uC6A9 (optional)\"}),(0,i.jsx)(s.td,{children:\"\\u2610\"})]})]})]})]})}function c(h={}){let{wrapper:s}=h.components||{};return s?(0,i.jsx)(s,{...h,children:(0,i.jsx)(t,{...h})}):t(h)}return N(A);})();\n;return Component;"
  },
  {
    "notionId": "2251eb5c0337802f8f44c164859f1b33",
    "title": "Next.js + Notion + 캐싱 전략 전체 플로우 (로컬 vs 운영 + Vercel Cron)",
    "icon": "",
    "full": false,
    "summary": "",
    "pageCover": "https://images.unsplash.com/photo-1593062096033-9a26b09da705?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb",
    "password": "",
    "type": "ENGINEERINGS",
    "description": "",
    "date": "2025-07-03T00:00:00.000Z",
    "lastEditedDate": "2025-08-05T03:05:00.000Z",
    "sub_type": "TIL",
    "category": "TIL",
    "tags": [
      "개발TIL",
      "기술로그"
    ],
    "draft": false,
    "favorite": true,
    "readingTime": 8,
    "wordCount": 1463,
    "lastModified": "2025-08-08",
    "version": "1.0.0",
    "status": "published",
    "author": "ryoonwithinwisdomlights",
    "content": "```typescript\n[Client (/blog 접근)]\n        │\n        ▼\n[Next.js 15 App Router → Page Component]\n        │\n        ▼\n[getPosts() 호출]\n        │\n        ├── (로컬 개발 환경)\n        │       │\n        │       ▼\n        │   [p-memoize / memory-cache 등]\n        │       │\n        │       └── 캐시 miss 시\n        │               │\n        │               ▼\n        │          [Notion API fetch (notion-client)]\n        │\n        └── (운영 환경: Vercel)\n                │\n                ▼\n            [Upstash Redis 캐시 확인]\n                │\n                └── 캐시 miss 시\n                        │\n                        ▼\n                   [Notion API fetch (notion-client)]\n\n────────────────────────────────────────────────────────────\n\n[Vercel Cron Job (10분마다 실행)]\n        │\n        ▼\n[GET /api/cron/update-posts → 내부에서 변경사항 탐지]\n        │\n        ▼\n[변경된 post 블록만 다시 fetch]\n        │\n        ▼\n[Redis 캐시 갱신 (Upstash)]\n```\n\n\n\n<strong>✅ 요약 포인트</strong>\n\n\n\n| <strong>구분</strong>       | <strong>전략</strong>                                        |\n| ------------ | --------------------------------------------- |\n| <strong>로컬 개발</strong>    | p-memoize, memory-cache, Map 등 in-memory 방식   |\n| <strong>운영 서버</strong>    | Upstash Redis 사용하여 Vercel 환경에서도 지속되는 캐시       |\n| <strong>최신화</strong>      | Vercel Cron 으로 10분마다 Notion 데이터 변화 감지 후 캐시 갱신 |\n| <strong>Fallback</strong> | 캐시 miss 시에만 notion-client 직접 호출 (서버 전용)       |",
    "_meta": {
      "filePath": "engineerings-Next-js-Notion-캐싱-전략-전체-플로우-로컬.mdx",
      "fileName": "engineerings-Next-js-Notion-캐싱-전략-전체-플로우-로컬.mdx",
      "directory": ".",
      "extension": "mdx",
      "path": "engineerings-Next-js-Notion-캐싱-전략-전체-플로우-로컬"
    },
    "toc": [],
    "structuredData": {
      "contents": [
        {
          "heading": "",
          "content": "구분"
        },
        {
          "heading": "",
          "content": "전략"
        },
        {
          "heading": "",
          "content": "로컬 개발"
        },
        {
          "heading": "",
          "content": "p-memoize, memory-cache, Map 등 in-memory 방식"
        },
        {
          "heading": "",
          "content": "운영 서버"
        },
        {
          "heading": "",
          "content": "Upstash Redis 사용하여 Vercel 환경에서도 지속되는 캐시"
        },
        {
          "heading": "",
          "content": "최신화"
        },
        {
          "heading": "",
          "content": "Vercel Cron 으로 10분마다 Notion 데이터 변화 감지 후 캐시 갱신"
        },
        {
          "heading": "",
          "content": "Fallback"
        },
        {
          "heading": "",
          "content": "캐시 miss 시에만 notion-client 직접 호출 (서버 전용)"
        }
      ],
      "headings": []
    },
    "body": "var Component=(()=>{var E=Object.create;var e=Object.defineProperty;var p=Object.getOwnPropertyDescriptor;var g=Object.getOwnPropertyNames;var y=Object.getPrototypeOf,m=Object.prototype.hasOwnProperty;var o=(h,i)=>()=>(i||h((i={exports:{}}).exports,i),i.exports),N=(h,i)=>{for(var l in i)e(h,l,{get:i[l],enumerable:!0})},r=(h,i,l,a)=>{if(i&&typeof i==\"object\"||typeof i==\"function\")for(let n of g(i))!m.call(h,n)&&n!==l&&e(h,n,{get:()=>i[n],enumerable:!(a=p(i,n))||a.enumerable});return h};var F=(h,i,l)=>(l=h!=null?E(y(h)):{},r(i||!h||!h.__esModule?e(l,\"default\",{value:h,enumerable:!0}):l,h)),C=h=>r(e({},\"__esModule\",{value:!0}),h);var t=o((u,d)=>{d.exports=_jsx_runtime});var b={};N(b,{default:()=>c});var s=F(t());function k(h){let i={code:\"code\",pre:\"pre\",span:\"span\",table:\"table\",tbody:\"tbody\",td:\"td\",th:\"th\",thead:\"thead\",tr:\"tr\",...h.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(s.Fragment,{children:(0,s.jsx)(i.pre,{className:\"shiki shiki-themes github-light github-dark\",style:{\"--shiki-light\":\"#24292e\",\"--shiki-dark\":\"#e1e4e8\",\"--shiki-light-bg\":\"#fff\",\"--shiki-dark-bg\":\"#24292e\"},tabIndex:\"0\",icon:'<svg viewBox=\"0 0 24 24\"><path d=\"M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z\" fill=\"currentColor\" /></svg>',children:(0,s.jsxs)(i.code,{children:[(0,s.jsxs)(i.span,{className:\"line\",children:[(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"[\"}),(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\"Client\"}),(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" (\"}),(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"/\"}),(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"blog \\uC811\\uADFC)]\"})]}),`\n`,(0,s.jsx)(i.span,{className:\"line\",children:(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u2502\"})}),`\n`,(0,s.jsx)(i.span,{className:\"line\",children:(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u25BC\"})}),`\n`,(0,s.jsxs)(i.span,{className:\"line\",children:[(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"[Next.js \"}),(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:\"15\"}),(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" App Router \\u2192 Page Component]\"})]}),`\n`,(0,s.jsx)(i.span,{className:\"line\",children:(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u2502\"})}),`\n`,(0,s.jsx)(i.span,{className:\"line\",children:(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u25BC\"})}),`\n`,(0,s.jsxs)(i.span,{className:\"line\",children:[(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"[\"}),(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\"getPosts\"}),(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"() \\uD638\\uCD9C]\"})]}),`\n`,(0,s.jsx)(i.span,{className:\"line\",children:(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u2502\"})}),`\n`,(0,s.jsx)(i.span,{className:\"line\",children:(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u251C\\u2500\\u2500 (\\uB85C\\uCEEC \\uAC1C\\uBC1C \\uD658\\uACBD)\"})}),`\n`,(0,s.jsx)(i.span,{className:\"line\",children:(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u2502       \\u2502\"})}),`\n`,(0,s.jsx)(i.span,{className:\"line\",children:(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u2502       \\u25BC\"})}),`\n`,(0,s.jsxs)(i.span,{className:\"line\",children:[(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u2502   [p\"}),(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"-\"}),(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"memoize \"}),(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"/\"}),(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" memory\"}),(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"-\"}),(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"cache \\uB4F1]\"})]}),`\n`,(0,s.jsx)(i.span,{className:\"line\",children:(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u2502       \\u2502\"})}),`\n`,(0,s.jsx)(i.span,{className:\"line\",children:(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u2502       \\u2514\\u2500\\u2500 \\uCE90\\uC2DC miss \\uC2DC\"})}),`\n`,(0,s.jsx)(i.span,{className:\"line\",children:(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u2502               \\u2502\"})}),`\n`,(0,s.jsx)(i.span,{className:\"line\",children:(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u2502               \\u25BC\"})}),`\n`,(0,s.jsxs)(i.span,{className:\"line\",children:[(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u2502          [Notion \"}),(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:\"API\"}),(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\" fetch\"}),(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" (notion\"}),(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"-\"}),(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"client)]\"})]}),`\n`,(0,s.jsx)(i.span,{className:\"line\",children:(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u2502\"})}),`\n`,(0,s.jsx)(i.span,{className:\"line\",children:(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u2514\\u2500\\u2500 (\\uC6B4\\uC601 \\uD658\\uACBD: Vercel)\"})}),`\n`,(0,s.jsx)(i.span,{className:\"line\",children:(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"                \\u2502\"})}),`\n`,(0,s.jsx)(i.span,{className:\"line\",children:(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"                \\u25BC\"})}),`\n`,(0,s.jsx)(i.span,{className:\"line\",children:(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"            [Upstash Redis \\uCE90\\uC2DC \\uD655\\uC778]\"})}),`\n`,(0,s.jsx)(i.span,{className:\"line\",children:(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"                \\u2502\"})}),`\n`,(0,s.jsx)(i.span,{className:\"line\",children:(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"                \\u2514\\u2500\\u2500 \\uCE90\\uC2DC miss \\uC2DC\"})}),`\n`,(0,s.jsx)(i.span,{className:\"line\",children:(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"                        \\u2502\"})}),`\n`,(0,s.jsx)(i.span,{className:\"line\",children:(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"                        \\u25BC\"})}),`\n`,(0,s.jsxs)(i.span,{className:\"line\",children:[(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"                   [Notion \"}),(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:\"API\"}),(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\" fetch\"}),(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" (notion\"}),(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"-\"}),(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"client)]\"})]}),`\n`,(0,s.jsx)(i.span,{className:\"line\"}),`\n`,(0,s.jsx)(i.span,{className:\"line\",children:(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\"})}),`\n`,(0,s.jsx)(i.span,{className:\"line\"}),`\n`,(0,s.jsxs)(i.span,{className:\"line\",children:[(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"[Vercel Cron \"}),(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\"Job\"}),(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" (10\\uBD84\\uB9C8\\uB2E4 \\uC2E4\\uD589)]\"})]}),`\n`,(0,s.jsx)(i.span,{className:\"line\",children:(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u2502\"})}),`\n`,(0,s.jsx)(i.span,{className:\"line\",children:(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u25BC\"})}),`\n`,(0,s.jsxs)(i.span,{className:\"line\",children:[(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"[\"}),(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:\"GET\"}),(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" /\"}),(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"api\"}),(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"/\"}),(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"cron\"}),(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"/\"}),(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"update\"}),(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"-\"}),(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"posts \\u2192 \\uB0B4\\uBD80\\uC5D0\\uC11C \\uBCC0\\uACBD\\uC0AC\\uD56D \\uD0D0\\uC9C0]\"})]}),`\n`,(0,s.jsx)(i.span,{className:\"line\",children:(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u2502\"})}),`\n`,(0,s.jsx)(i.span,{className:\"line\",children:(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u25BC\"})}),`\n`,(0,s.jsx)(i.span,{className:\"line\",children:(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"[\\uBCC0\\uACBD\\uB41C post \\uBE14\\uB85D\\uB9CC \\uB2E4\\uC2DC fetch]\"})}),`\n`,(0,s.jsx)(i.span,{className:\"line\",children:(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u2502\"})}),`\n`,(0,s.jsx)(i.span,{className:\"line\",children:(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        \\u25BC\"})}),`\n`,(0,s.jsxs)(i.span,{className:\"line\",children:[(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"[Redis \\uCE90\\uC2DC \"}),(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\"\\uAC31\\uC2E0\"}),(0,s.jsx)(i.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" (Upstash)]\"})]})]})})}),`\n`,(0,s.jsx)(\"strong\",{children:\"\\u2705 \\uC694\\uC57D \\uD3EC\\uC778\\uD2B8\"}),`\n`,(0,s.jsxs)(i.table,{children:[(0,s.jsx)(i.thead,{children:(0,s.jsxs)(i.tr,{children:[(0,s.jsx)(i.th,{children:(0,s.jsx)(\"strong\",{children:\"\\uAD6C\\uBD84\"})}),(0,s.jsx)(i.th,{children:(0,s.jsx)(\"strong\",{children:\"\\uC804\\uB7B5\"})})]})}),(0,s.jsxs)(i.tbody,{children:[(0,s.jsxs)(i.tr,{children:[(0,s.jsx)(i.td,{children:(0,s.jsx)(\"strong\",{children:\"\\uB85C\\uCEEC \\uAC1C\\uBC1C\"})}),(0,s.jsx)(i.td,{children:\"p-memoize, memory-cache, Map \\uB4F1 in-memory \\uBC29\\uC2DD\"})]}),(0,s.jsxs)(i.tr,{children:[(0,s.jsx)(i.td,{children:(0,s.jsx)(\"strong\",{children:\"\\uC6B4\\uC601 \\uC11C\\uBC84\"})}),(0,s.jsx)(i.td,{children:\"Upstash Redis \\uC0AC\\uC6A9\\uD558\\uC5EC Vercel \\uD658\\uACBD\\uC5D0\\uC11C\\uB3C4 \\uC9C0\\uC18D\\uB418\\uB294 \\uCE90\\uC2DC\"})]}),(0,s.jsxs)(i.tr,{children:[(0,s.jsx)(i.td,{children:(0,s.jsx)(\"strong\",{children:\"\\uCD5C\\uC2E0\\uD654\"})}),(0,s.jsx)(i.td,{children:\"Vercel Cron \\uC73C\\uB85C 10\\uBD84\\uB9C8\\uB2E4 Notion \\uB370\\uC774\\uD130 \\uBCC0\\uD654 \\uAC10\\uC9C0 \\uD6C4 \\uCE90\\uC2DC \\uAC31\\uC2E0\"})]}),(0,s.jsxs)(i.tr,{children:[(0,s.jsx)(i.td,{children:(0,s.jsx)(\"strong\",{children:\"Fallback\"})}),(0,s.jsx)(i.td,{children:\"\\uCE90\\uC2DC miss \\uC2DC\\uC5D0\\uB9CC notion-client \\uC9C1\\uC811 \\uD638\\uCD9C (\\uC11C\\uBC84 \\uC804\\uC6A9)\"})]})]})]})]})}function c(h={}){let{wrapper:i}=h.components||{};return i?(0,s.jsx)(i,{...h,children:(0,s.jsx)(k,{...h})}):k(h)}return C(b);})();\n;return Component;"
  },
  {
    "notionId": "2231eb5c0337804eadfce7368b604088",
    "title": "[TIL] Refactoring SearchInput.",
    "icon": "",
    "full": false,
    "summary": "",
    "pageCover": "https://images.unsplash.com/photo-1593062096033-9a26b09da705?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb",
    "password": "",
    "type": "ENGINEERINGS",
    "description": "",
    "date": "2025-07-01T00:00:00.000Z",
    "lastEditedDate": "2025-08-09T14:49:00.000Z",
    "sub_type": "TIL",
    "category": "TIL",
    "tags": [
      "usememo"
    ],
    "draft": false,
    "favorite": true,
    "readingTime": 17,
    "wordCount": 3255,
    "lastModified": "2025-08-09",
    "version": "1.0.0",
    "status": "published",
    "author": "ryoonwithinwisdomlights",
    "content": "## <strong>✅ 전체 코드 개념 잡기</strong>\n\n\n![스크린샷_2025-07-11_오후_2.12.58.png](https://res.cloudinary.com/dyrdul1dd/image/upload/v1754751395/norkive-notion-images/1754751393129-E1_84_89_E1_85_B3_E1_84_8F_E1_85_B3_E1_84_85_E1_85_B5_E1_86_AB_E1_84_89_E1_85_A3_E1_86_BA_2025-07-11_E1_84_8B_E1_85_A9_E1_84_92_E1_85_AE_2.12.58.png)\n\n\n### <strong>1.</strong>\n\n\n### <strong>Fuse.js</strong>\n\n- <strong>뭐야?</strong>\n\n    자바스크립트용 <strong>빠른 클라이언트 사이드 검색 라이브러리</strong>.\n\n\n    검색어가 “부정확하게” 일치해도 유사도를 기반으로 결과를 찾아줘. (부분 검색, 오타 관용적)\n\n- <strong>여기서 쓰는 이유?</strong>\n\n    백엔드 API 없이 그냥 <strong>더미 배열</strong>에서 실시간 검색 테스트하려고.\n\n- <strong>사용 방법:</strong>\n\n```typescript\nconst fuse = new Fuse(대상데이터, 옵션);\nfuse.search(검색어); // 결과 배열 반환\n```\n\n\n### <strong>2.</strong>\n\n\n### <strong>lodash.debounce</strong>\n\n- <strong>뭐야?</strong>\n\n    사용자가 입력할 때마다 <strong>계속 검색 호출 안 되게 딜레이 걸어주는 함수</strong>.\n\n- <strong>여기서 쓰는 이유?</strong>\n\n    한 글자 입력할 때마다 실시간 검색하면 너무 많은 연산 낭비 → <strong>0.3초 입력 멈추면 그때 검색</strong>\n\n- <strong>사용 방법:</strong>\n\n    ```typescript\n    const debouncedFn = debounce((text) => { ...검색로직... }, 300);\n    ```\n\n\n### <strong>3.</strong>\n\n\n### <strong>useMemo</strong>\n\n- <strong>뭐야?</strong>\n\n    React에서 특정 값이나 객체를 <strong>메모이제이션(캐시)</strong> 해서,\n\n\n    <strong>렌더링마다 새로 생성되는 걸 방지</strong>하는 훅.\n\n- <strong>여기서 왜 씀?</strong>\n\n    Fuse 인스턴스를 매번 새로 만들지 않기 위해.\n\n- <strong>사용 예시:</strong>\n\n    ```typescript\n    const fuse = useMemo(() => new Fuse(데이터), []);\n    ```\n\n\n\n <strong>전체 동작 흐름</strong>\n\n\n\n```plain text\n[1] 사용자가 input에 타이핑 → setQuery 변경됨\n↓\n[2] query 상태 변경 → useEffect 실행됨\n↓\n[3] useEffect 안에서 debounce된 handleSearch 실행됨 (300ms 딜레이)\n↓\n[4] handleSearch 내부:\n- query 길이 체크\n- fuse.search() 실행 → 결과 배열 만들기\n- setResults로 검색결과 상태 업데이트\n↓\n[5] 결과 표시 영역에서:\n- 로딩중일 때 Skeleton\n- 검색결과 있을 때 리스트로 출력\n- 없으면 \"No results found\"\n```\n\n\n\n<strong>✅ 주요 State 설명</strong>\n\n\n\n| <strong>tate</strong> | <strong>역할</strong>            |\n| -------- | ----------------- |\n| query    | 현재 input 값        |\n| results  | 검색 결과 배열          |\n| loading  | Skeleton 출력 여부 제어 |\n\n\n\n<strong>✅ 주요 Hook/로직 정리</strong>\n\n\n\n| <strong>항목</strong>        | <strong>설명</strong>                        |\n| ------------- | ----------------------------- |\n| useState      | query, results, loading 상태 관리 |\n| useEffect     | query가 바뀔 때마다 debounce로 검색 실행 |\n| useMemo       | fuse 인스턴스 재생성 방지              |\n| debounce      | 검색 호출 최적화                     |\n| fuse.search() | 입력어 기반 검색                     |\n\n\n\n<strong>✅ 확장 작업 시 적용 포인트</strong>\n\n\n\n| <strong>기능</strong>             | <strong>적용 위치</strong>                                        |\n| ------------------ | ------------------------------------------------ |\n| <strong>Algolia 연동</strong>     | → handleSearch 내부 fuse.search 대신 <strong>axios fetch</strong> |\n| <strong>Next.js &lt;Link&gt;</strong> | → 리스트 출력 부분 &lt;a href&gt; 대신 &lt;Link href&gt;              |\n| <strong>서버 API</strong>         | → handleSearch 내부를 <strong>API 호출 비동기 함수</strong>로 변경         |\n| <strong>Skeleton 커스텀</strong>   | → loading 상태일 때 보여주는 div 영역만 수정                  |\n\n\n## <strong>✅ 요약:</strong>\n\n\n지금 코드는 👉\n\n\n<strong>[로컬 배열 + Fuse 검색 + debounce 최적화 + 다크모드 + Skeleton]</strong>\n\n\n이 조합으로 구성된 <strong>Next.js 클라이언트 컴포넌트형 검색 Input UI</strong>",
    "_meta": {
      "filePath": "engineerings-TIL-Refactoring-SearchInput.mdx",
      "fileName": "engineerings-TIL-Refactoring-SearchInput.mdx",
      "directory": ".",
      "extension": "mdx",
      "path": "engineerings-TIL-Refactoring-SearchInput"
    },
    "toc": [
      {
        "title": "✅ 전체 코드 개념 잡기",
        "url": "#-전체-코드-개념-잡기",
        "depth": 2
      },
      {
        "title": "1.",
        "url": "#1",
        "depth": 3
      },
      {
        "title": "Fuse.js",
        "url": "#fusejs",
        "depth": 3
      },
      {
        "title": "2.",
        "url": "#2",
        "depth": 3
      },
      {
        "title": "lodash.debounce",
        "url": "#lodashdebounce",
        "depth": 3
      },
      {
        "title": "3.",
        "url": "#3",
        "depth": 3
      },
      {
        "title": "useMemo",
        "url": "#usememo",
        "depth": 3
      },
      {
        "title": "✅ 요약:",
        "url": "#-요약",
        "depth": 2
      }
    ],
    "structuredData": {
      "contents": [
        {
          "heading": "fusejs",
          "content": "자바스크립트용 빠른 클라이언트 사이드 검색 라이브러리."
        },
        {
          "heading": "fusejs",
          "content": "검색어가 “부정확하게” 일치해도 유사도를 기반으로 결과를 찾아줘. (부분 검색, 오타 관용적)"
        },
        {
          "heading": "fusejs",
          "content": "백엔드 API 없이 그냥 더미 배열에서 실시간 검색 테스트하려고."
        },
        {
          "heading": "lodashdebounce",
          "content": "사용자가 입력할 때마다 계속 검색 호출 안 되게 딜레이 걸어주는 함수."
        },
        {
          "heading": "lodashdebounce",
          "content": "한 글자 입력할 때마다 실시간 검색하면 너무 많은 연산 낭비 → 0.3초 입력 멈추면 그때 검색"
        },
        {
          "heading": "usememo",
          "content": "React에서 특정 값이나 객체를 메모이제이션(캐시) 해서,"
        },
        {
          "heading": "usememo",
          "content": "렌더링마다 새로 생성되는 걸 방지하는 훅."
        },
        {
          "heading": "usememo",
          "content": "Fuse 인스턴스를 매번 새로 만들지 않기 위해."
        },
        {
          "heading": "usememo",
          "content": "전체 동작 흐름"
        },
        {
          "heading": "usememo",
          "content": "tate"
        },
        {
          "heading": "usememo",
          "content": "역할"
        },
        {
          "heading": "usememo",
          "content": "query"
        },
        {
          "heading": "usememo",
          "content": "현재 input 값"
        },
        {
          "heading": "usememo",
          "content": "results"
        },
        {
          "heading": "usememo",
          "content": "검색 결과 배열"
        },
        {
          "heading": "usememo",
          "content": "loading"
        },
        {
          "heading": "usememo",
          "content": "Skeleton 출력 여부 제어"
        },
        {
          "heading": "usememo",
          "content": "항목"
        },
        {
          "heading": "usememo",
          "content": "설명"
        },
        {
          "heading": "usememo",
          "content": "useState"
        },
        {
          "heading": "usememo",
          "content": "query, results, loading 상태 관리"
        },
        {
          "heading": "usememo",
          "content": "useEffect"
        },
        {
          "heading": "usememo",
          "content": "query가 바뀔 때마다 debounce로 검색 실행"
        },
        {
          "heading": "usememo",
          "content": "useMemo"
        },
        {
          "heading": "usememo",
          "content": "fuse 인스턴스 재생성 방지"
        },
        {
          "heading": "usememo",
          "content": "debounce"
        },
        {
          "heading": "usememo",
          "content": "검색 호출 최적화"
        },
        {
          "heading": "usememo",
          "content": "fuse.search()"
        },
        {
          "heading": "usememo",
          "content": "입력어 기반 검색"
        },
        {
          "heading": "usememo",
          "content": "기능"
        },
        {
          "heading": "usememo",
          "content": "적용 위치"
        },
        {
          "heading": "usememo",
          "content": "Algolia 연동"
        },
        {
          "heading": "usememo",
          "content": "→ handleSearch 내부 fuse.search 대신 axios fetch"
        },
        {
          "heading": "usememo",
          "content": "Next.js <Link>"
        },
        {
          "heading": "usememo",
          "content": "→ 리스트 출력 부분 <a href> 대신 <Link href>"
        },
        {
          "heading": "usememo",
          "content": "서버 API"
        },
        {
          "heading": "usememo",
          "content": "→ handleSearch 내부를 API 호출 비동기 함수로 변경"
        },
        {
          "heading": "usememo",
          "content": "Skeleton 커스텀"
        },
        {
          "heading": "usememo",
          "content": "→ loading 상태일 때 보여주는 div 영역만 수정"
        },
        {
          "heading": "-요약",
          "content": "지금 코드는 👉"
        },
        {
          "heading": "-요약",
          "content": "이 조합으로 구성된 Next.js 클라이언트 컴포넌트형 검색 Input UI"
        }
      ],
      "headings": [
        {
          "id": "-전체-코드-개념-잡기",
          "content": "✅ 전체 코드 개념 잡기"
        },
        {
          "id": "1",
          "content": "1."
        },
        {
          "id": "fusejs",
          "content": "Fuse.js"
        },
        {
          "id": "2",
          "content": "2."
        },
        {
          "id": "lodashdebounce",
          "content": "lodash.debounce"
        },
        {
          "id": "3",
          "content": "3."
        },
        {
          "id": "usememo",
          "content": "useMemo"
        },
        {
          "id": "-요약",
          "content": "✅ 요약:"
        }
      ]
    },
    "body": "var Component=(()=>{var g=Object.create;var r=Object.defineProperty;var o=Object.getOwnPropertyDescriptor;var p=Object.getOwnPropertyNames;var u=Object.getPrototypeOf,E=Object.prototype.hasOwnProperty;var m=(e,n)=>()=>(n||e((n={exports:{}}).exports,n),n.exports),_=(e,n)=>{for(var h in n)r(e,h,{get:n[h],enumerable:!0})},d=(e,n,h,s)=>{if(n&&typeof n==\"object\"||typeof n==\"function\")for(let l of p(n))!E.call(e,l)&&l!==h&&r(e,l,{get:()=>n[l],enumerable:!(s=o(n,l))||s.enumerable});return e};var y=(e,n,h)=>(h=e!=null?g(u(e)):{},d(n||!e||!e.__esModule?r(h,\"default\",{value:e,enumerable:!0}):h,e)),F=e=>d(r({},\"__esModule\",{value:!0}),e);var t=m((v,c)=>{c.exports=_jsx_runtime});var b={};_(b,{default:()=>k});var i=y(t());function a(e){let n={code:\"code\",h2:\"h2\",h3:\"h3\",img:\"img\",li:\"li\",p:\"p\",pre:\"pre\",span:\"span\",table:\"table\",tbody:\"tbody\",td:\"td\",th:\"th\",thead:\"thead\",tr:\"tr\",ul:\"ul\",...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h2,{id:\"-\\uC804\\uCCB4-\\uCF54\\uB4DC-\\uAC1C\\uB150-\\uC7A1\\uAE30\",children:(0,i.jsx)(\"strong\",{children:\"\\u2705 \\uC804\\uCCB4 \\uCF54\\uB4DC \\uAC1C\\uB150 \\uC7A1\\uAE30\"})}),`\n`,(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:\"\\u1109\\u1173\\u110F\\u1173\\u1105\\u1175\\u11AB\\u1109\\u1163\\u11BA_2025-07-11_\\u110B\\u1169\\u1112\\u116E_2.12.58.png\",src:\"https://res.cloudinary.com/dyrdul1dd/image/upload/v1754751395/norkive-notion-images/1754751393129-E1_84_89_E1_85_B3_E1_84_8F_E1_85_B3_E1_84_85_E1_85_B5_E1_86_AB_E1_84_89_E1_85_A3_E1_86_BA_2025-07-11_E1_84_8B_E1_85_A9_E1_84_92_E1_85_AE_2.12.58.png\",width:\"1950\",height:\"1442\"})}),`\n`,(0,i.jsx)(n.h3,{id:\"1\",children:(0,i.jsx)(\"strong\",{children:\"1.\"})}),`\n`,(0,i.jsx)(n.h3,{id:\"fusejs\",children:(0,i.jsx)(\"strong\",{children:\"Fuse.js\"})}),`\n`,(0,i.jsxs)(n.ul,{children:[`\n`,(0,i.jsxs)(n.li,{children:[`\n`,(0,i.jsx)(\"strong\",{children:\"\\uBB50\\uC57C?\"}),`\n`,(0,i.jsxs)(n.p,{children:[\"\\uC790\\uBC14\\uC2A4\\uD06C\\uB9BD\\uD2B8\\uC6A9 \",(0,i.jsx)(\"strong\",{children:\"\\uBE60\\uB978 \\uD074\\uB77C\\uC774\\uC5B8\\uD2B8 \\uC0AC\\uC774\\uB4DC \\uAC80\\uC0C9 \\uB77C\\uC774\\uBE0C\\uB7EC\\uB9AC\"}),\".\"]}),`\n`,(0,i.jsx)(n.p,{children:\"\\uAC80\\uC0C9\\uC5B4\\uAC00 \\u201C\\uBD80\\uC815\\uD655\\uD558\\uAC8C\\u201D \\uC77C\\uCE58\\uD574\\uB3C4 \\uC720\\uC0AC\\uB3C4\\uB97C \\uAE30\\uBC18\\uC73C\\uB85C \\uACB0\\uACFC\\uB97C \\uCC3E\\uC544\\uC918. (\\uBD80\\uBD84 \\uAC80\\uC0C9, \\uC624\\uD0C0 \\uAD00\\uC6A9\\uC801)\"}),`\n`]}),`\n`,(0,i.jsxs)(n.li,{children:[`\n`,(0,i.jsx)(\"strong\",{children:\"\\uC5EC\\uAE30\\uC11C \\uC4F0\\uB294 \\uC774\\uC720?\"}),`\n`,(0,i.jsxs)(n.p,{children:[\"\\uBC31\\uC5D4\\uB4DC API \\uC5C6\\uC774 \\uADF8\\uB0E5 \",(0,i.jsx)(\"strong\",{children:\"\\uB354\\uBBF8 \\uBC30\\uC5F4\"}),\"\\uC5D0\\uC11C \\uC2E4\\uC2DC\\uAC04 \\uAC80\\uC0C9 \\uD14C\\uC2A4\\uD2B8\\uD558\\uB824\\uACE0.\"]}),`\n`]}),`\n`,(0,i.jsxs)(n.li,{children:[`\n`,(0,i.jsx)(\"strong\",{children:\"\\uC0AC\\uC6A9 \\uBC29\\uBC95:\"}),`\n`]}),`\n`]}),`\n`,(0,i.jsx)(i.Fragment,{children:(0,i.jsx)(n.pre,{className:\"shiki shiki-themes github-light github-dark\",style:{\"--shiki-light\":\"#24292e\",\"--shiki-dark\":\"#e1e4e8\",\"--shiki-light-bg\":\"#fff\",\"--shiki-dark-bg\":\"#24292e\"},tabIndex:\"0\",icon:'<svg viewBox=\"0 0 24 24\"><path d=\"M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z\" fill=\"currentColor\" /></svg>',children:(0,i.jsxs)(n.code,{children:[(0,i.jsxs)(n.span,{className:\"line\",children:[(0,i.jsx)(n.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"const\"}),(0,i.jsx)(n.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:\" fuse\"}),(0,i.jsx)(n.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" =\"}),(0,i.jsx)(n.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" new\"}),(0,i.jsx)(n.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\" Fuse\"}),(0,i.jsx)(n.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"(\\uB300\\uC0C1\\uB370\\uC774\\uD130, \\uC635\\uC158);\"})]}),`\n`,(0,i.jsxs)(n.span,{className:\"line\",children:[(0,i.jsx)(n.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"fuse.\"}),(0,i.jsx)(n.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\"search\"}),(0,i.jsx)(n.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"(\\uAC80\\uC0C9\\uC5B4); \"}),(0,i.jsx)(n.span,{style:{\"--shiki-light\":\"#6A737D\",\"--shiki-dark\":\"#6A737D\"},children:\"// \\uACB0\\uACFC \\uBC30\\uC5F4 \\uBC18\\uD658\"})]})]})})}),`\n`,(0,i.jsx)(n.h3,{id:\"2\",children:(0,i.jsx)(\"strong\",{children:\"2.\"})}),`\n`,(0,i.jsx)(n.h3,{id:\"lodashdebounce\",children:(0,i.jsx)(\"strong\",{children:\"lodash.debounce\"})}),`\n`,(0,i.jsxs)(n.ul,{children:[`\n`,(0,i.jsxs)(n.li,{children:[`\n`,(0,i.jsx)(\"strong\",{children:\"\\uBB50\\uC57C?\"}),`\n`,(0,i.jsxs)(n.p,{children:[\"\\uC0AC\\uC6A9\\uC790\\uAC00 \\uC785\\uB825\\uD560 \\uB54C\\uB9C8\\uB2E4 \",(0,i.jsx)(\"strong\",{children:\"\\uACC4\\uC18D \\uAC80\\uC0C9 \\uD638\\uCD9C \\uC548 \\uB418\\uAC8C \\uB51C\\uB808\\uC774 \\uAC78\\uC5B4\\uC8FC\\uB294 \\uD568\\uC218\"}),\".\"]}),`\n`]}),`\n`,(0,i.jsxs)(n.li,{children:[`\n`,(0,i.jsx)(\"strong\",{children:\"\\uC5EC\\uAE30\\uC11C \\uC4F0\\uB294 \\uC774\\uC720?\"}),`\n`,(0,i.jsxs)(n.p,{children:[\"\\uD55C \\uAE00\\uC790 \\uC785\\uB825\\uD560 \\uB54C\\uB9C8\\uB2E4 \\uC2E4\\uC2DC\\uAC04 \\uAC80\\uC0C9\\uD558\\uBA74 \\uB108\\uBB34 \\uB9CE\\uC740 \\uC5F0\\uC0B0 \\uB0AD\\uBE44 \\u2192 \",(0,i.jsx)(\"strong\",{children:\"0.3\\uCD08 \\uC785\\uB825 \\uBA48\\uCD94\\uBA74 \\uADF8\\uB54C \\uAC80\\uC0C9\"})]}),`\n`]}),`\n`,(0,i.jsxs)(n.li,{children:[`\n`,(0,i.jsx)(\"strong\",{children:\"\\uC0AC\\uC6A9 \\uBC29\\uBC95:\"}),`\n`,(0,i.jsx)(i.Fragment,{children:(0,i.jsx)(n.pre,{className:\"shiki shiki-themes github-light github-dark\",style:{\"--shiki-light\":\"#24292e\",\"--shiki-dark\":\"#e1e4e8\",\"--shiki-light-bg\":\"#fff\",\"--shiki-dark-bg\":\"#24292e\"},tabIndex:\"0\",icon:'<svg viewBox=\"0 0 24 24\"><path d=\"M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z\" fill=\"currentColor\" /></svg>',children:(0,i.jsx)(n.code,{children:(0,i.jsxs)(n.span,{className:\"line\",children:[(0,i.jsx)(n.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"const\"}),(0,i.jsx)(n.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:\" debouncedFn\"}),(0,i.jsx)(n.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" =\"}),(0,i.jsx)(n.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\" debounce\"}),(0,i.jsx)(n.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"((\"}),(0,i.jsx)(n.span,{style:{\"--shiki-light\":\"#E36209\",\"--shiki-dark\":\"#FFAB70\"},children:\"text\"}),(0,i.jsx)(n.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\") \"}),(0,i.jsx)(n.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"=>\"}),(0,i.jsx)(n.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" { \"}),(0,i.jsx)(n.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"...\"}),(0,i.jsx)(n.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"\\uAC80\\uC0C9\\uB85C\\uC9C1\"}),(0,i.jsx)(n.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"...\"}),(0,i.jsx)(n.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" }, \"}),(0,i.jsx)(n.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:\"300\"}),(0,i.jsx)(n.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\");\"})]})})})}),`\n`]}),`\n`]}),`\n`,(0,i.jsx)(n.h3,{id:\"3\",children:(0,i.jsx)(\"strong\",{children:\"3.\"})}),`\n`,(0,i.jsx)(n.h3,{id:\"usememo\",children:(0,i.jsx)(\"strong\",{children:\"useMemo\"})}),`\n`,(0,i.jsxs)(n.ul,{children:[`\n`,(0,i.jsxs)(n.li,{children:[`\n`,(0,i.jsx)(\"strong\",{children:\"\\uBB50\\uC57C?\"}),`\n`,(0,i.jsxs)(n.p,{children:[\"React\\uC5D0\\uC11C \\uD2B9\\uC815 \\uAC12\\uC774\\uB098 \\uAC1D\\uCCB4\\uB97C \",(0,i.jsx)(\"strong\",{children:\"\\uBA54\\uBAA8\\uC774\\uC81C\\uC774\\uC158(\\uCE90\\uC2DC)\"}),\" \\uD574\\uC11C,\"]}),`\n`,(0,i.jsxs)(n.p,{children:[(0,i.jsx)(\"strong\",{children:\"\\uB80C\\uB354\\uB9C1\\uB9C8\\uB2E4 \\uC0C8\\uB85C \\uC0DD\\uC131\\uB418\\uB294 \\uAC78 \\uBC29\\uC9C0\"}),\"\\uD558\\uB294 \\uD6C5.\"]}),`\n`]}),`\n`,(0,i.jsxs)(n.li,{children:[`\n`,(0,i.jsx)(\"strong\",{children:\"\\uC5EC\\uAE30\\uC11C \\uC65C \\uC500?\"}),`\n`,(0,i.jsx)(n.p,{children:\"Fuse \\uC778\\uC2A4\\uD134\\uC2A4\\uB97C \\uB9E4\\uBC88 \\uC0C8\\uB85C \\uB9CC\\uB4E4\\uC9C0 \\uC54A\\uAE30 \\uC704\\uD574.\"}),`\n`]}),`\n`,(0,i.jsxs)(n.li,{children:[`\n`,(0,i.jsx)(\"strong\",{children:\"\\uC0AC\\uC6A9 \\uC608\\uC2DC:\"}),`\n`,(0,i.jsx)(i.Fragment,{children:(0,i.jsx)(n.pre,{className:\"shiki shiki-themes github-light github-dark\",style:{\"--shiki-light\":\"#24292e\",\"--shiki-dark\":\"#e1e4e8\",\"--shiki-light-bg\":\"#fff\",\"--shiki-dark-bg\":\"#24292e\"},tabIndex:\"0\",icon:'<svg viewBox=\"0 0 24 24\"><path d=\"M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z\" fill=\"currentColor\" /></svg>',children:(0,i.jsx)(n.code,{children:(0,i.jsxs)(n.span,{className:\"line\",children:[(0,i.jsx)(n.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"const\"}),(0,i.jsx)(n.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:\" fuse\"}),(0,i.jsx)(n.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" =\"}),(0,i.jsx)(n.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\" useMemo\"}),(0,i.jsx)(n.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"(() \"}),(0,i.jsx)(n.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"=>\"}),(0,i.jsx)(n.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" new\"}),(0,i.jsx)(n.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\" Fuse\"}),(0,i.jsx)(n.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"(\\uB370\\uC774\\uD130), []);\"})]})})})}),`\n`]}),`\n`]}),`\n`,(0,i.jsxs)(n.p,{children:[\"\\xA0\",(0,i.jsx)(\"strong\",{children:\"\\uC804\\uCCB4 \\uB3D9\\uC791 \\uD750\\uB984\"})]}),`\n`,(0,i.jsx)(i.Fragment,{children:(0,i.jsx)(n.pre,{className:\"shiki shiki-themes github-light github-dark\",style:{\"--shiki-light\":\"#24292e\",\"--shiki-dark\":\"#e1e4e8\",\"--shiki-light-bg\":\"#fff\",\"--shiki-dark-bg\":\"#24292e\"},tabIndex:\"0\",icon:'<svg viewBox=\"0 0 24 24\"><path d=\"M 6,1 C 4.354992,1 3,2.354992 3,4 v 16 c 0,1.645008 1.354992,3 3,3 h 12 c 1.645008,0 3,-1.354992 3,-3 V 8 7 A 1.0001,1.0001 0 0 0 20.707031,6.2929687 l -5,-5 A 1.0001,1.0001 0 0 0 15,1 h -1 z m 0,2 h 7 v 3 c 0,1.645008 1.354992,3 3,3 h 3 v 11 c 0,0.564129 -0.435871,1 -1,1 H 6 C 5.4358712,21 5,20.564129 5,20 V 4 C 5,3.4358712 5.4358712,3 6,3 Z M 15,3.4140625 18.585937,7 H 16 C 15.435871,7 15,6.5641288 15,6 Z\" fill=\"currentColor\" /></svg>',children:(0,i.jsxs)(n.code,{children:[(0,i.jsx)(n.span,{className:\"line\",children:(0,i.jsx)(n.span,{children:\"[1] \\uC0AC\\uC6A9\\uC790\\uAC00 input\\uC5D0 \\uD0C0\\uC774\\uD551 \\u2192 setQuery \\uBCC0\\uACBD\\uB428\"})}),`\n`,(0,i.jsx)(n.span,{className:\"line\",children:(0,i.jsx)(n.span,{children:\"\\u2193\"})}),`\n`,(0,i.jsx)(n.span,{className:\"line\",children:(0,i.jsx)(n.span,{children:\"[2] query \\uC0C1\\uD0DC \\uBCC0\\uACBD \\u2192 useEffect \\uC2E4\\uD589\\uB428\"})}),`\n`,(0,i.jsx)(n.span,{className:\"line\",children:(0,i.jsx)(n.span,{children:\"\\u2193\"})}),`\n`,(0,i.jsx)(n.span,{className:\"line\",children:(0,i.jsx)(n.span,{children:\"[3] useEffect \\uC548\\uC5D0\\uC11C debounce\\uB41C handleSearch \\uC2E4\\uD589\\uB428 (300ms \\uB51C\\uB808\\uC774)\"})}),`\n`,(0,i.jsx)(n.span,{className:\"line\",children:(0,i.jsx)(n.span,{children:\"\\u2193\"})}),`\n`,(0,i.jsx)(n.span,{className:\"line\",children:(0,i.jsx)(n.span,{children:\"[4] handleSearch \\uB0B4\\uBD80:\"})}),`\n`,(0,i.jsx)(n.span,{className:\"line\",children:(0,i.jsx)(n.span,{children:\"- query \\uAE38\\uC774 \\uCCB4\\uD06C\"})}),`\n`,(0,i.jsx)(n.span,{className:\"line\",children:(0,i.jsx)(n.span,{children:\"- fuse.search() \\uC2E4\\uD589 \\u2192 \\uACB0\\uACFC \\uBC30\\uC5F4 \\uB9CC\\uB4E4\\uAE30\"})}),`\n`,(0,i.jsx)(n.span,{className:\"line\",children:(0,i.jsx)(n.span,{children:\"- setResults\\uB85C \\uAC80\\uC0C9\\uACB0\\uACFC \\uC0C1\\uD0DC \\uC5C5\\uB370\\uC774\\uD2B8\"})}),`\n`,(0,i.jsx)(n.span,{className:\"line\",children:(0,i.jsx)(n.span,{children:\"\\u2193\"})}),`\n`,(0,i.jsx)(n.span,{className:\"line\",children:(0,i.jsx)(n.span,{children:\"[5] \\uACB0\\uACFC \\uD45C\\uC2DC \\uC601\\uC5ED\\uC5D0\\uC11C:\"})}),`\n`,(0,i.jsx)(n.span,{className:\"line\",children:(0,i.jsx)(n.span,{children:\"- \\uB85C\\uB529\\uC911\\uC77C \\uB54C Skeleton\"})}),`\n`,(0,i.jsx)(n.span,{className:\"line\",children:(0,i.jsx)(n.span,{children:\"- \\uAC80\\uC0C9\\uACB0\\uACFC \\uC788\\uC744 \\uB54C \\uB9AC\\uC2A4\\uD2B8\\uB85C \\uCD9C\\uB825\"})}),`\n`,(0,i.jsx)(n.span,{className:\"line\",children:(0,i.jsx)(n.span,{children:'- \\uC5C6\\uC73C\\uBA74 \"No results found\"'})})]})})}),`\n`,(0,i.jsx)(\"strong\",{children:\"\\u2705 \\uC8FC\\uC694 State \\uC124\\uBA85\"}),`\n`,(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{children:(0,i.jsx)(\"strong\",{children:\"tate\"})}),(0,i.jsx)(n.th,{children:(0,i.jsx)(\"strong\",{children:\"\\uC5ED\\uD560\"})})]})}),(0,i.jsxs)(n.tbody,{children:[(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:\"query\"}),(0,i.jsx)(n.td,{children:\"\\uD604\\uC7AC input \\uAC12\"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:\"results\"}),(0,i.jsx)(n.td,{children:\"\\uAC80\\uC0C9 \\uACB0\\uACFC \\uBC30\\uC5F4\"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:\"loading\"}),(0,i.jsx)(n.td,{children:\"Skeleton \\uCD9C\\uB825 \\uC5EC\\uBD80 \\uC81C\\uC5B4\"})]})]})]}),`\n`,(0,i.jsx)(\"strong\",{children:\"\\u2705 \\uC8FC\\uC694 Hook/\\uB85C\\uC9C1 \\uC815\\uB9AC\"}),`\n`,(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{children:(0,i.jsx)(\"strong\",{children:\"\\uD56D\\uBAA9\"})}),(0,i.jsx)(n.th,{children:(0,i.jsx)(\"strong\",{children:\"\\uC124\\uBA85\"})})]})}),(0,i.jsxs)(n.tbody,{children:[(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:\"useState\"}),(0,i.jsx)(n.td,{children:\"query, results, loading \\uC0C1\\uD0DC \\uAD00\\uB9AC\"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:\"useEffect\"}),(0,i.jsx)(n.td,{children:\"query\\uAC00 \\uBC14\\uB014 \\uB54C\\uB9C8\\uB2E4 debounce\\uB85C \\uAC80\\uC0C9 \\uC2E4\\uD589\"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:\"useMemo\"}),(0,i.jsx)(n.td,{children:\"fuse \\uC778\\uC2A4\\uD134\\uC2A4 \\uC7AC\\uC0DD\\uC131 \\uBC29\\uC9C0\"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:\"debounce\"}),(0,i.jsx)(n.td,{children:\"\\uAC80\\uC0C9 \\uD638\\uCD9C \\uCD5C\\uC801\\uD654\"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:\"fuse.search()\"}),(0,i.jsx)(n.td,{children:\"\\uC785\\uB825\\uC5B4 \\uAE30\\uBC18 \\uAC80\\uC0C9\"})]})]})]}),`\n`,(0,i.jsx)(\"strong\",{children:\"\\u2705 \\uD655\\uC7A5 \\uC791\\uC5C5 \\uC2DC \\uC801\\uC6A9 \\uD3EC\\uC778\\uD2B8\"}),`\n`,(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{children:(0,i.jsx)(\"strong\",{children:\"\\uAE30\\uB2A5\"})}),(0,i.jsx)(n.th,{children:(0,i.jsx)(\"strong\",{children:\"\\uC801\\uC6A9 \\uC704\\uCE58\"})})]})}),(0,i.jsxs)(n.tbody,{children:[(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(\"strong\",{children:\"Algolia \\uC5F0\\uB3D9\"})}),(0,i.jsxs)(n.td,{children:[\"\\u2192 handleSearch \\uB0B4\\uBD80 fuse.search \\uB300\\uC2E0 \",(0,i.jsx)(\"strong\",{children:\"axios fetch\"})]})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(\"strong\",{children:\"Next.js <Link>\"})}),(0,i.jsx)(n.td,{children:\"\\u2192 \\uB9AC\\uC2A4\\uD2B8 \\uCD9C\\uB825 \\uBD80\\uBD84 <a href> \\uB300\\uC2E0 <Link href>\"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(\"strong\",{children:\"\\uC11C\\uBC84 API\"})}),(0,i.jsxs)(n.td,{children:[\"\\u2192 handleSearch \\uB0B4\\uBD80\\uB97C \",(0,i.jsx)(\"strong\",{children:\"API \\uD638\\uCD9C \\uBE44\\uB3D9\\uAE30 \\uD568\\uC218\"}),\"\\uB85C \\uBCC0\\uACBD\"]})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:(0,i.jsx)(\"strong\",{children:\"Skeleton \\uCEE4\\uC2A4\\uD140\"})}),(0,i.jsx)(n.td,{children:\"\\u2192 loading \\uC0C1\\uD0DC\\uC77C \\uB54C \\uBCF4\\uC5EC\\uC8FC\\uB294 div \\uC601\\uC5ED\\uB9CC \\uC218\\uC815\"})]})]})]}),`\n`,(0,i.jsx)(n.h2,{id:\"-\\uC694\\uC57D\",children:(0,i.jsx)(\"strong\",{children:\"\\u2705 \\uC694\\uC57D:\"})}),`\n`,(0,i.jsx)(n.p,{children:\"\\uC9C0\\uAE08 \\uCF54\\uB4DC\\uB294 \\u{1F449}\"}),`\n`,(0,i.jsx)(\"strong\",{children:\"[\\uB85C\\uCEEC \\uBC30\\uC5F4 + Fuse \\uAC80\\uC0C9 + debounce \\uCD5C\\uC801\\uD654 + \\uB2E4\\uD06C\\uBAA8\\uB4DC + Skeleton]\"}),`\n`,(0,i.jsxs)(n.p,{children:[\"\\uC774 \\uC870\\uD569\\uC73C\\uB85C \\uAD6C\\uC131\\uB41C \",(0,i.jsx)(\"strong\",{children:\"Next.js \\uD074\\uB77C\\uC774\\uC5B8\\uD2B8 \\uCEF4\\uD3EC\\uB10C\\uD2B8\\uD615 \\uAC80\\uC0C9 Input UI\"})]})]})}function k(e={}){let{wrapper:n}=e.components||{};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}return F(b);})();\n;return Component;"
  },
  {
    "notionId": "2491eb5c03378064aa50d2d9b4ff4344",
    "title": "[TIL] ㅇㅇ",
    "icon": "",
    "full": false,
    "summary": "",
    "pageCover": "https://images.unsplash.com/photo-1593062096033-9a26b09da705?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb",
    "password": "",
    "type": "ENGINEERINGS",
    "description": "",
    "date": "2025-08-08T00:00:00.000Z",
    "lastEditedDate": "2025-08-08T12:58:00.000Z",
    "sub_type": "RECORDS",
    "category": "TIL",
    "tags": [
      "개발TIL",
      "기술로그"
    ],
    "draft": false,
    "favorite": false,
    "readingTime": 1,
    "wordCount": 14,
    "lastModified": "2025-08-08",
    "version": "1.0.0",
    "status": "published",
    "author": "ryoonwithinwisdomlights",
    "content": "ㅇㅇㅇ",
    "_meta": {
      "filePath": "engineerings-TIL.mdx",
      "fileName": "engineerings-TIL.mdx",
      "directory": ".",
      "extension": "mdx",
      "path": "engineerings-TIL"
    },
    "toc": [],
    "structuredData": {
      "contents": [
        {
          "heading": "",
          "content": "ㅇㅇㅇ"
        }
      ],
      "headings": []
    },
    "body": "var Component=(()=>{var p=Object.create;var r=Object.defineProperty;var _=Object.getOwnPropertyDescriptor;var d=Object.getOwnPropertyNames;var f=Object.getPrototypeOf,j=Object.prototype.hasOwnProperty;var l=(n,t)=>()=>(t||n((t={exports:{}}).exports,t),t.exports),M=(n,t)=>{for(var e in t)r(n,e,{get:t[e],enumerable:!0})},u=(n,t,e,s)=>{if(t&&typeof t==\"object\"||typeof t==\"function\")for(let o of d(t))!j.call(n,o)&&o!==e&&r(n,o,{get:()=>t[o],enumerable:!(s=_(t,o))||s.enumerable});return n};var h=(n,t,e)=>(e=n!=null?p(f(n)):{},u(t||!n||!n.__esModule?r(e,\"default\",{value:n,enumerable:!0}):e,n)),C=n=>u(r({},\"__esModule\",{value:!0}),n);var m=l((w,i)=>{i.exports=_jsx_runtime});var D={};M(D,{default:()=>a});var c=h(m());function x(n){let t={p:\"p\",...n.components};return(0,c.jsx)(t.p,{children:\"\\u3147\\u3147\\u3147\"})}function a(n={}){let{wrapper:t}=n.components||{};return t?(0,c.jsx)(t,{...n,children:(0,c.jsx)(x,{...n})}):x(n)}return C(D);})();\n;return Component;"
  },
  {
    "notionId": "22f1eb5c033780dea089c5ea32034619",
    "title": "궁극의 아키텍처 로드맵: Notion → MDX → 정적 블로그",
    "icon": "",
    "full": false,
    "summary": "Hey-Taxi(헤이택시) is a Full Stack Next.Js 13 ver. Taxi Booking App w/ NextJs, React.js, Tailwindcss, Mapbox and Stripe",
    "pageCover": "https://images.unsplash.com/photo-1593062096033-9a26b09da705?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb",
    "password": "",
    "type": "ENGINEERINGS",
    "description": "",
    "date": "2025-07-13T00:00:00.000Z",
    "lastEditedDate": "2025-08-09T14:49:00.000Z",
    "sub_type": "TIL",
    "category": "TIL",
    "tags": [
      "content-collection"
    ],
    "draft": false,
    "favorite": true,
    "readingTime": 8,
    "wordCount": 1563,
    "lastModified": "2025-08-09",
    "version": "1.0.0",
    "status": "published",
    "author": "ryoonwithinwisdomlights",
    "content": "<strong>🗺️ 전체 흐름 요약</strong>\n\n\n\n```plain text\n[작성 단계]  \n Notion에서 콘텐츠 작성  \n       ↓\n[변환 단계]  \n notion-to-md로 MDX 변환 (.mdx 파일 자동 생성)  \n       ↓\n[정적 분석 단계]  \n @content-collections/core로 타입 검증 + 슬러그 매핑  \n       ↓\n[렌더링 단계]  \n Next.js App Router에서 @content-collections/next로 렌더링\n```\n\n\n## <strong>✅ 1단계: 디렉토리 및 환경 준비</strong>\n\n\n### <strong>📁 기본 디렉토리 구조</strong>\n\n\n```plain text\n/content\n  └── /blog          ← 변환된 MDX 파일 저장 위치\n      └── hello.mdx\n\n/scripts\n  └── notion-to-mdx.ts  ← 자동 변환 스크립트\n\n/pages (or /app)\n  └── /blog/[slug]/page.tsx\n\n/content.config.ts     ← 콘텐츠 구성 정의\n/next.config.ts        ← withContentCollections 적용\n/blog.config.ts        ← 기존 Notion API 설정\n```\n\n\n```bash\nnpx content-collections install\n```\n\n\nMigration tasks:\n↓ Install dependencies: dependencies\n@content-collections/core,@content-collections/next,zod,@content-collections/markdown already\ninstalled, skipping [SKIPPED]\n↓ Add alias to tsconfig: content-collections alias already exists [SKIPPED]\n↓ Modify next configuration: @content-collections/next already configured [SKIPPED]\n↓ Add .content-collections to .gitignore: No .gitignore found [SKIPPED]\n↓ Create configuration file: Configuration file already exists [SKIPPED]\n✔ Create demo content\n\n\n```plain text\n[작성]            → Notion 페이지\n\n[변환]            → notion-to-md → Markdown 문자열\n\n[저장]            → .mdx 파일 생성 (JSX 삽입 가능)\n\n[정적 처리]       → @content-collections/mdx가 render() 생성\n\n[렌더링]          → <entry.render /> 또는 <MDXContent code={entry.mdx} />\n\n[커스터마이징]    → rehype + shiki 플러그인 구성 가능\n```",
    "_meta": {
      "filePath": "engineerings-궁극의-아키텍처-로드맵-Notion-MDX-정적-블로그.mdx",
      "fileName": "engineerings-궁극의-아키텍처-로드맵-Notion-MDX-정적-블로그.mdx",
      "directory": ".",
      "extension": "mdx",
      "path": "engineerings-궁극의-아키텍처-로드맵-Notion-MDX-정적-블로그"
    },
    "toc": [
      {
        "title": "✅ 1단계: 디렉토리 및 환경 준비",
        "url": "#-1단계-디렉토리-및-환경-준비",
        "depth": 2
      },
      {
        "title": "📁 기본 디렉토리 구조",
        "url": "#-기본-디렉토리-구조",
        "depth": 3
      }
    ],
    "structuredData": {
      "contents": [
        {
          "heading": "-기본-디렉토리-구조",
          "content": "Migration tasks:\n↓ Install dependencies: dependencies\n@content-collections/core,@content-collections/next,zod,@content-collections/markdown already\ninstalled, skipping [SKIPPED]\n↓ Add alias to tsconfig: content-collections alias already exists [SKIPPED]\n↓ Modify next configuration: @content-collections/next already configured [SKIPPED]\n↓ Add .content-collections to .gitignore: No .gitignore found [SKIPPED]\n↓ Create configuration file: Configuration file already exists [SKIPPED]\n✔ Create demo content"
        }
      ],
      "headings": [
        {
          "id": "-1단계-디렉토리-및-환경-준비",
          "content": "✅ 1단계: 디렉토리 및 환경 준비"
        },
        {
          "id": "-기본-디렉토리-구조",
          "content": "📁 기본 디렉토리 구조"
        }
      ]
    },
    "body": "var Component=(()=>{var p=Object.create;var a=Object.defineProperty;var m=Object.getOwnPropertyDescriptor;var g=Object.getOwnPropertyNames;var k=Object.getPrototypeOf,N=Object.prototype.hasOwnProperty;var f=(i,n)=>()=>(n||i((n={exports:{}}).exports,n),n.exports),x=(i,n)=>{for(var s in n)a(i,s,{get:n[s],enumerable:!0})},h=(i,n,s,c)=>{if(n&&typeof n==\"object\"||typeof n==\"function\")for(let l of g(n))!N.call(i,l)&&l!==s&&a(i,l,{get:()=>n[l],enumerable:!(c=m(n,l))||c.enumerable});return i};var C=(i,n,s)=>(s=i!=null?p(k(i)):{},h(n||!i||!i.__esModule?a(s,\"default\",{value:i,enumerable:!0}):s,i)),u=i=>h(a({},\"__esModule\",{value:!0}),i);var t=f((y,r)=>{r.exports=_jsx_runtime});var b={};x(b,{default:()=>o});var e=C(t());function d(i){let n={code:\"code\",h2:\"h2\",h3:\"h3\",p:\"p\",pre:\"pre\",span:\"span\",...i.components};return(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(\"strong\",{children:\"\\u{1F5FA}\\uFE0F \\uC804\\uCCB4 \\uD750\\uB984 \\uC694\\uC57D\"}),`\n`,(0,e.jsx)(e.Fragment,{children:(0,e.jsx)(n.pre,{className:\"shiki shiki-themes github-light github-dark\",style:{\"--shiki-light\":\"#24292e\",\"--shiki-dark\":\"#e1e4e8\",\"--shiki-light-bg\":\"#fff\",\"--shiki-dark-bg\":\"#24292e\"},tabIndex:\"0\",icon:'<svg viewBox=\"0 0 24 24\"><path d=\"M 6,1 C 4.354992,1 3,2.354992 3,4 v 16 c 0,1.645008 1.354992,3 3,3 h 12 c 1.645008,0 3,-1.354992 3,-3 V 8 7 A 1.0001,1.0001 0 0 0 20.707031,6.2929687 l -5,-5 A 1.0001,1.0001 0 0 0 15,1 h -1 z m 0,2 h 7 v 3 c 0,1.645008 1.354992,3 3,3 h 3 v 11 c 0,0.564129 -0.435871,1 -1,1 H 6 C 5.4358712,21 5,20.564129 5,20 V 4 C 5,3.4358712 5.4358712,3 6,3 Z M 15,3.4140625 18.585937,7 H 16 C 15.435871,7 15,6.5641288 15,6 Z\" fill=\"currentColor\" /></svg>',children:(0,e.jsxs)(n.code,{children:[(0,e.jsx)(n.span,{className:\"line\",children:(0,e.jsx)(n.span,{children:\"[\\uC791\\uC131 \\uB2E8\\uACC4]  \"})}),`\n`,(0,e.jsx)(n.span,{className:\"line\",children:(0,e.jsx)(n.span,{children:\" Notion\\uC5D0\\uC11C \\uCF58\\uD150\\uCE20 \\uC791\\uC131  \"})}),`\n`,(0,e.jsx)(n.span,{className:\"line\",children:(0,e.jsx)(n.span,{children:\"       \\u2193\"})}),`\n`,(0,e.jsx)(n.span,{className:\"line\",children:(0,e.jsx)(n.span,{children:\"[\\uBCC0\\uD658 \\uB2E8\\uACC4]  \"})}),`\n`,(0,e.jsx)(n.span,{className:\"line\",children:(0,e.jsx)(n.span,{children:\" notion-to-md\\uB85C MDX \\uBCC0\\uD658 (.mdx \\uD30C\\uC77C \\uC790\\uB3D9 \\uC0DD\\uC131)  \"})}),`\n`,(0,e.jsx)(n.span,{className:\"line\",children:(0,e.jsx)(n.span,{children:\"       \\u2193\"})}),`\n`,(0,e.jsx)(n.span,{className:\"line\",children:(0,e.jsx)(n.span,{children:\"[\\uC815\\uC801 \\uBD84\\uC11D \\uB2E8\\uACC4]  \"})}),`\n`,(0,e.jsx)(n.span,{className:\"line\",children:(0,e.jsx)(n.span,{children:\" @content-collections/core\\uB85C \\uD0C0\\uC785 \\uAC80\\uC99D + \\uC2AC\\uB7EC\\uADF8 \\uB9E4\\uD551  \"})}),`\n`,(0,e.jsx)(n.span,{className:\"line\",children:(0,e.jsx)(n.span,{children:\"       \\u2193\"})}),`\n`,(0,e.jsx)(n.span,{className:\"line\",children:(0,e.jsx)(n.span,{children:\"[\\uB80C\\uB354\\uB9C1 \\uB2E8\\uACC4]  \"})}),`\n`,(0,e.jsx)(n.span,{className:\"line\",children:(0,e.jsx)(n.span,{children:\" Next.js App Router\\uC5D0\\uC11C @content-collections/next\\uB85C \\uB80C\\uB354\\uB9C1\"})})]})})}),`\n`,(0,e.jsx)(n.h2,{id:\"-1\\uB2E8\\uACC4-\\uB514\\uB809\\uD1A0\\uB9AC-\\uBC0F-\\uD658\\uACBD-\\uC900\\uBE44\",children:(0,e.jsx)(\"strong\",{children:\"\\u2705 1\\uB2E8\\uACC4: \\uB514\\uB809\\uD1A0\\uB9AC \\uBC0F \\uD658\\uACBD \\uC900\\uBE44\"})}),`\n`,(0,e.jsx)(n.h3,{id:\"-\\uAE30\\uBCF8-\\uB514\\uB809\\uD1A0\\uB9AC-\\uAD6C\\uC870\",children:(0,e.jsx)(\"strong\",{children:\"\\u{1F4C1} \\uAE30\\uBCF8 \\uB514\\uB809\\uD1A0\\uB9AC \\uAD6C\\uC870\"})}),`\n`,(0,e.jsx)(e.Fragment,{children:(0,e.jsx)(n.pre,{className:\"shiki shiki-themes github-light github-dark\",style:{\"--shiki-light\":\"#24292e\",\"--shiki-dark\":\"#e1e4e8\",\"--shiki-light-bg\":\"#fff\",\"--shiki-dark-bg\":\"#24292e\"},tabIndex:\"0\",icon:'<svg viewBox=\"0 0 24 24\"><path d=\"M 6,1 C 4.354992,1 3,2.354992 3,4 v 16 c 0,1.645008 1.354992,3 3,3 h 12 c 1.645008,0 3,-1.354992 3,-3 V 8 7 A 1.0001,1.0001 0 0 0 20.707031,6.2929687 l -5,-5 A 1.0001,1.0001 0 0 0 15,1 h -1 z m 0,2 h 7 v 3 c 0,1.645008 1.354992,3 3,3 h 3 v 11 c 0,0.564129 -0.435871,1 -1,1 H 6 C 5.4358712,21 5,20.564129 5,20 V 4 C 5,3.4358712 5.4358712,3 6,3 Z M 15,3.4140625 18.585937,7 H 16 C 15.435871,7 15,6.5641288 15,6 Z\" fill=\"currentColor\" /></svg>',children:(0,e.jsxs)(n.code,{children:[(0,e.jsx)(n.span,{className:\"line\",children:(0,e.jsx)(n.span,{children:\"/content\"})}),`\n`,(0,e.jsx)(n.span,{className:\"line\",children:(0,e.jsx)(n.span,{children:\"  \\u2514\\u2500\\u2500 /blog          \\u2190 \\uBCC0\\uD658\\uB41C MDX \\uD30C\\uC77C \\uC800\\uC7A5 \\uC704\\uCE58\"})}),`\n`,(0,e.jsx)(n.span,{className:\"line\",children:(0,e.jsx)(n.span,{children:\"      \\u2514\\u2500\\u2500 hello.mdx\"})}),`\n`,(0,e.jsx)(n.span,{className:\"line\",children:(0,e.jsx)(n.span,{})}),`\n`,(0,e.jsx)(n.span,{className:\"line\",children:(0,e.jsx)(n.span,{children:\"/scripts\"})}),`\n`,(0,e.jsx)(n.span,{className:\"line\",children:(0,e.jsx)(n.span,{children:\"  \\u2514\\u2500\\u2500 notion-to-mdx.ts  \\u2190 \\uC790\\uB3D9 \\uBCC0\\uD658 \\uC2A4\\uD06C\\uB9BD\\uD2B8\"})}),`\n`,(0,e.jsx)(n.span,{className:\"line\",children:(0,e.jsx)(n.span,{})}),`\n`,(0,e.jsx)(n.span,{className:\"line\",children:(0,e.jsx)(n.span,{children:\"/pages (or /app)\"})}),`\n`,(0,e.jsx)(n.span,{className:\"line\",children:(0,e.jsx)(n.span,{children:\"  \\u2514\\u2500\\u2500 /blog/[slug]/page.tsx\"})}),`\n`,(0,e.jsx)(n.span,{className:\"line\",children:(0,e.jsx)(n.span,{})}),`\n`,(0,e.jsx)(n.span,{className:\"line\",children:(0,e.jsx)(n.span,{children:\"/content.config.ts     \\u2190 \\uCF58\\uD150\\uCE20 \\uAD6C\\uC131 \\uC815\\uC758\"})}),`\n`,(0,e.jsx)(n.span,{className:\"line\",children:(0,e.jsx)(n.span,{children:\"/next.config.ts        \\u2190 withContentCollections \\uC801\\uC6A9\"})}),`\n`,(0,e.jsx)(n.span,{className:\"line\",children:(0,e.jsx)(n.span,{children:\"/blog.config.ts        \\u2190 \\uAE30\\uC874 Notion API \\uC124\\uC815\"})})]})})}),`\n`,(0,e.jsx)(e.Fragment,{children:(0,e.jsx)(n.pre,{className:\"shiki shiki-themes github-light github-dark\",style:{\"--shiki-light\":\"#24292e\",\"--shiki-dark\":\"#e1e4e8\",\"--shiki-light-bg\":\"#fff\",\"--shiki-dark-bg\":\"#24292e\"},tabIndex:\"0\",icon:'<svg viewBox=\"0 0 24 24\"><path d=\"m 4,4 a 1,1 0 0 0 -0.7070312,0.2929687 1,1 0 0 0 0,1.4140625 L 8.5859375,11 3.2929688,16.292969 a 1,1 0 0 0 0,1.414062 1,1 0 0 0 1.4140624,0 l 5.9999998,-6 a 1.0001,1.0001 0 0 0 0,-1.414062 L 4.7070312,4.2929687 A 1,1 0 0 0 4,4 Z m 8,14 a 1,1 0 0 0 -1,1 1,1 0 0 0 1,1 h 8 a 1,1 0 0 0 1,-1 1,1 0 0 0 -1,-1 z\" fill=\"currentColor\" /></svg>',children:(0,e.jsx)(n.code,{children:(0,e.jsxs)(n.span,{className:\"line\",children:[(0,e.jsx)(n.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\"npx\"}),(0,e.jsx)(n.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\" content-collections\"}),(0,e.jsx)(n.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\" install\"})]})})})}),`\n`,(0,e.jsx)(n.p,{children:`Migration tasks:\n\\u2193 Install dependencies: dependencies\n@content-collections/core,@content-collections/next,zod,@content-collections/markdown already\ninstalled, skipping [SKIPPED]\n\\u2193 Add alias to tsconfig: content-collections alias already exists [SKIPPED]\n\\u2193 Modify next configuration: @content-collections/next already configured [SKIPPED]\n\\u2193 Add .content-collections to .gitignore: No .gitignore found [SKIPPED]\n\\u2193 Create configuration file: Configuration file already exists [SKIPPED]\n\\u2714 Create demo content`}),`\n`,(0,e.jsx)(e.Fragment,{children:(0,e.jsx)(n.pre,{className:\"shiki shiki-themes github-light github-dark\",style:{\"--shiki-light\":\"#24292e\",\"--shiki-dark\":\"#e1e4e8\",\"--shiki-light-bg\":\"#fff\",\"--shiki-dark-bg\":\"#24292e\"},tabIndex:\"0\",icon:'<svg viewBox=\"0 0 24 24\"><path d=\"M 6,1 C 4.354992,1 3,2.354992 3,4 v 16 c 0,1.645008 1.354992,3 3,3 h 12 c 1.645008,0 3,-1.354992 3,-3 V 8 7 A 1.0001,1.0001 0 0 0 20.707031,6.2929687 l -5,-5 A 1.0001,1.0001 0 0 0 15,1 h -1 z m 0,2 h 7 v 3 c 0,1.645008 1.354992,3 3,3 h 3 v 11 c 0,0.564129 -0.435871,1 -1,1 H 6 C 5.4358712,21 5,20.564129 5,20 V 4 C 5,3.4358712 5.4358712,3 6,3 Z M 15,3.4140625 18.585937,7 H 16 C 15.435871,7 15,6.5641288 15,6 Z\" fill=\"currentColor\" /></svg>',children:(0,e.jsxs)(n.code,{children:[(0,e.jsx)(n.span,{className:\"line\",children:(0,e.jsx)(n.span,{children:\"[\\uC791\\uC131]            \\u2192 Notion \\uD398\\uC774\\uC9C0\"})}),`\n`,(0,e.jsx)(n.span,{className:\"line\",children:(0,e.jsx)(n.span,{})}),`\n`,(0,e.jsx)(n.span,{className:\"line\",children:(0,e.jsx)(n.span,{children:\"[\\uBCC0\\uD658]            \\u2192 notion-to-md \\u2192 Markdown \\uBB38\\uC790\\uC5F4\"})}),`\n`,(0,e.jsx)(n.span,{className:\"line\",children:(0,e.jsx)(n.span,{})}),`\n`,(0,e.jsx)(n.span,{className:\"line\",children:(0,e.jsx)(n.span,{children:\"[\\uC800\\uC7A5]            \\u2192 .mdx \\uD30C\\uC77C \\uC0DD\\uC131 (JSX \\uC0BD\\uC785 \\uAC00\\uB2A5)\"})}),`\n`,(0,e.jsx)(n.span,{className:\"line\",children:(0,e.jsx)(n.span,{})}),`\n`,(0,e.jsx)(n.span,{className:\"line\",children:(0,e.jsx)(n.span,{children:\"[\\uC815\\uC801 \\uCC98\\uB9AC]       \\u2192 @content-collections/mdx\\uAC00 render() \\uC0DD\\uC131\"})}),`\n`,(0,e.jsx)(n.span,{className:\"line\",children:(0,e.jsx)(n.span,{})}),`\n`,(0,e.jsx)(n.span,{className:\"line\",children:(0,e.jsx)(n.span,{children:\"[\\uB80C\\uB354\\uB9C1]          \\u2192 <entry.render /> \\uB610\\uB294 <MDXContent code={entry.mdx} />\"})}),`\n`,(0,e.jsx)(n.span,{className:\"line\",children:(0,e.jsx)(n.span,{})}),`\n`,(0,e.jsx)(n.span,{className:\"line\",children:(0,e.jsx)(n.span,{children:\"[\\uCEE4\\uC2A4\\uD130\\uB9C8\\uC774\\uC9D5]    \\u2192 rehype + shiki \\uD50C\\uB7EC\\uADF8\\uC778 \\uAD6C\\uC131 \\uAC00\\uB2A5\"})})]})})})]})}function o(i={}){let{wrapper:n}=i.components||{};return n?(0,e.jsx)(n,{...i,children:(0,e.jsx)(d,{...i})}):d(i)}return u(b);})();\n;return Component;"
  },
  {
    "notionId": "ccbcc665d1eb45c28ba6bfd711d722df",
    "title": "[아카이브] 이슬아 작가님",
    "icon": "",
    "full": false,
    "summary": "Hey-Taxi(헤이택시) is a Full Stack Next.Js 13 ver. Taxi Booking App w/ NextJs, React.js, Tailwindcss, Mapbox and Stripe",
    "pageCover": "https://res.cloudinary.com/dyrdul1dd/image/upload/v1754654033/norkive-notion-images/1754654032842-117919802.1.jpg",
    "password": "",
    "type": "ENGINEERINGS",
    "description": "",
    "date": "2023-12-06T00:00:00.000Z",
    "lastEditedDate": "2025-08-08T07:25:00.000Z",
    "sub_type": "Scrap",
    "category": "Inspiration",
    "tags": [],
    "draft": false,
    "favorite": false,
    "readingTime": 112,
    "wordCount": 22319,
    "lastModified": "2025-08-08",
    "version": "1.0.0",
    "status": "published",
    "author": "ryoonwithinwisdomlights",
    "content": "# 1. 리포지토리\n\n\n이 페이지는 이슬아 작가님을 덕질하는 페이지다.\n\n\n좋은 글과 기사와 인터뷰등을 기록해둔다.\n\n\n<YoutubeWrapper names={\"video\"} urls={\"https://youtu.be/aHim5RDYelc\"} />\n\n\n![1829050.png](https://res.cloudinary.com/dyrdul1dd/image/upload/v1754654031/norkive-notion-images/1754654030624-1829050.png)\n\n\n<FileWrapper names={\"재능_있는_척_하지_않기.pdf\"} urls={\"https://prod-files-secure.s3.us-west-2.amazonaws.com/056ff9f5-a9ef-486f-8acb-9eef51d06a2d/8af3ba94-b700-445f-971d-cce8a4b44dcd/%E1%84%8C%E1%85%A2%E1%84%82%E1%85%B3%E1%86%BC_%E1%84%8B%E1%85%B5%E1%86%BB%E1%84%82%E1%85%B3%E1%86%AB_%E1%84%8E%E1%85%A5%E1%86%A8_%E1%84%92%E1%85%A1%E1%84%8C%E1%85%B5_%E1%84%8B%E1%85%A1%E1%86%AD%E1%84%80%E1%85%B5.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QKXL3CBJ%2F20250808%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250808T115347Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJHMEUCIQDLkEJXtF47SCOYrc04fDNeBJoXa5yMG%2BQy4AT54xZH5QIgcnvxNBGDHsx8oAOOoX77hGXLrQLrYnGjSoCDVZa04P8qiAQIpf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLDAdI%2Fs2VzbVFuelSrcAxE7H4BpKZVJmvarcdWtyvQAMvE6fkWfG%2FyKL6GVK1zObwKyWnQBoUIlqqGFIAvBiZMRr90Qt45BiVPkcGXvPxkVZlqZIVsy%2BrBCR54Rx1m9eyjyTiMbZW%2B5yCqa4FK3%2BXMzRDpTRSBXOr617N86onqIY%2BsjecxelO4NcBHqi0ZiNtj8QXHnAhb949bFdJGCBaZKnHPBOBd5c7F5BC0%2BLyquJzuHPgCjxKtH%2FvETF2NVhmpkFQNSH8PJR3%2BOYG8fE8eUJO%2FzknO5h%2B6A%2BVzuLTMUd1EDhlaw1JLSSLdr0KUT21fOcJEjzTOHzYgG1Y5XEVXHRqcp7xR9hhhVKz%2BtVDdYgprAYcL80%2FouYTSQhysr1FKim9CpCLgcnWkiuYL0WpSyydqsCoWD3pVfvwGKzo%2BhUpNtIdiLdXsYhJ9oNiGvNyKYzWrZ38%2BX6TIfAmKoRxPW%2FVz7elni%2Fk4rwvoftfqDlcAM1ByK%2FqLrBnA4ZDWQoiKC7mMpBx40IJSlI6REuy1dF7onUaXpr7qDKUeC1OGLRAM%2FEfE1GLjY6QVmZGCjU9Xi3crX7tx4fy7tcm5X7U3fXt8LKgtzhiisyn6slJOKQyM%2FouaC3iKEoIZpTTivM1f%2BY%2FgYu8t11mNgMKzB18QGOqUBtBVh6jBibZpEBhSclc7uEj0wJw%2Fd33nvw0NQ%2BSP1Pr79DVgYDQaOouyVT2HFrVK3zIXSaBiWii5A%2Fg7GCfiMdTFIM%2FT9kWtU2gjK4oD5VZ0zMfyprNLDNSsVEohZ7cpEXNJghD%2BSKCY4a8i5XVvrPg6Y0bOfkA%2FrpqnJNLZ%2BRuMiAPV%2B%2BKBFwJQnY1iLZO2%2FzdutpUS0sP4voB1xQ95yeT9L3JDC&X-Amz-Signature=4cad3e1aee91ee965955d5cd467616a6e1df1e9477985cd4860af16b135679ab&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject\"} />\n\n\n<GoogleDriveWrapper names={\"https://drive.google.com/file/d/1fSWnZgDbUmFb86MgGNiiLX6G8TkqOhiI/view\"} urls={\"https://drive.google.com/file/d/1fSWnZgDbUmFb86MgGNiiLX6G8TkqOhiI/view\"} />\n\n\n<BookMarkWrapper names={\"bookmark\"} urls={\"https://www.hani.co.kr/arti/society/society_general/981552.html\"} />\n\n\n이 헤이택시(Full Stack Uber Clone Web App)는 [React NextJs 13 Taxi Booking App : NextJs 13, Tailwind Css, Typescript, Mapbox, Stripe | Full Course](https://youtu.be/1DXV4LCWkic?list=PLzRr9la40O_RQIXxWO_VNmA8y9qRUeuK9)유튜브강의를 참고하여 에러사항과 작업날짜 기준 deprecated된 부분 및 미흡한 부분, 그리고 한국에서 지원되지 않는 부분에 대한 이슈들을 보강하고 수정하고 커스터마이징하여 제작한 웹앱입니다.\n\n\n<FileWrapper names={\"English_Study_Material.docx\"} urls={\"https://prod-files-secure.s3.us-west-2.amazonaws.com/056ff9f5-a9ef-486f-8acb-9eef51d06a2d/712d8a65-d4a0-4226-941b-2d5981b55779/English_Study_Material.docx?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QKXL3CBJ%2F20250808%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250808T115347Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJHMEUCIQDLkEJXtF47SCOYrc04fDNeBJoXa5yMG%2BQy4AT54xZH5QIgcnvxNBGDHsx8oAOOoX77hGXLrQLrYnGjSoCDVZa04P8qiAQIpf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLDAdI%2Fs2VzbVFuelSrcAxE7H4BpKZVJmvarcdWtyvQAMvE6fkWfG%2FyKL6GVK1zObwKyWnQBoUIlqqGFIAvBiZMRr90Qt45BiVPkcGXvPxkVZlqZIVsy%2BrBCR54Rx1m9eyjyTiMbZW%2B5yCqa4FK3%2BXMzRDpTRSBXOr617N86onqIY%2BsjecxelO4NcBHqi0ZiNtj8QXHnAhb949bFdJGCBaZKnHPBOBd5c7F5BC0%2BLyquJzuHPgCjxKtH%2FvETF2NVhmpkFQNSH8PJR3%2BOYG8fE8eUJO%2FzknO5h%2B6A%2BVzuLTMUd1EDhlaw1JLSSLdr0KUT21fOcJEjzTOHzYgG1Y5XEVXHRqcp7xR9hhhVKz%2BtVDdYgprAYcL80%2FouYTSQhysr1FKim9CpCLgcnWkiuYL0WpSyydqsCoWD3pVfvwGKzo%2BhUpNtIdiLdXsYhJ9oNiGvNyKYzWrZ38%2BX6TIfAmKoRxPW%2FVz7elni%2Fk4rwvoftfqDlcAM1ByK%2FqLrBnA4ZDWQoiKC7mMpBx40IJSlI6REuy1dF7onUaXpr7qDKUeC1OGLRAM%2FEfE1GLjY6QVmZGCjU9Xi3crX7tx4fy7tcm5X7U3fXt8LKgtzhiisyn6slJOKQyM%2FouaC3iKEoIZpTTivM1f%2BY%2FgYu8t11mNgMKzB18QGOqUBtBVh6jBibZpEBhSclc7uEj0wJw%2Fd33nvw0NQ%2BSP1Pr79DVgYDQaOouyVT2HFrVK3zIXSaBiWii5A%2Fg7GCfiMdTFIM%2FT9kWtU2gjK4oD5VZ0zMfyprNLDNSsVEohZ7cpEXNJghD%2BSKCY4a8i5XVvrPg6Y0bOfkA%2FrpqnJNLZ%2BRuMiAPV%2B%2BKBFwJQnY1iLZO2%2FzdutpUS0sP4voB1xQ95yeT9L3JDC&X-Amz-Signature=1aa98c5ebd18b62d9f892f145fe62ad1929026956e517196d4b422633d11b6b5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject\"} />\n\n\n<FileWrapper names={\"0228.rtf\"} urls={\"https://prod-files-secure.s3.us-west-2.amazonaws.com/056ff9f5-a9ef-486f-8acb-9eef51d06a2d/e0dded5d-f791-4b9d-b96c-df6e939888f2/0228.rtf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QKXL3CBJ%2F20250808%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250808T115347Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJHMEUCIQDLkEJXtF47SCOYrc04fDNeBJoXa5yMG%2BQy4AT54xZH5QIgcnvxNBGDHsx8oAOOoX77hGXLrQLrYnGjSoCDVZa04P8qiAQIpf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLDAdI%2Fs2VzbVFuelSrcAxE7H4BpKZVJmvarcdWtyvQAMvE6fkWfG%2FyKL6GVK1zObwKyWnQBoUIlqqGFIAvBiZMRr90Qt45BiVPkcGXvPxkVZlqZIVsy%2BrBCR54Rx1m9eyjyTiMbZW%2B5yCqa4FK3%2BXMzRDpTRSBXOr617N86onqIY%2BsjecxelO4NcBHqi0ZiNtj8QXHnAhb949bFdJGCBaZKnHPBOBd5c7F5BC0%2BLyquJzuHPgCjxKtH%2FvETF2NVhmpkFQNSH8PJR3%2BOYG8fE8eUJO%2FzknO5h%2B6A%2BVzuLTMUd1EDhlaw1JLSSLdr0KUT21fOcJEjzTOHzYgG1Y5XEVXHRqcp7xR9hhhVKz%2BtVDdYgprAYcL80%2FouYTSQhysr1FKim9CpCLgcnWkiuYL0WpSyydqsCoWD3pVfvwGKzo%2BhUpNtIdiLdXsYhJ9oNiGvNyKYzWrZ38%2BX6TIfAmKoRxPW%2FVz7elni%2Fk4rwvoftfqDlcAM1ByK%2FqLrBnA4ZDWQoiKC7mMpBx40IJSlI6REuy1dF7onUaXpr7qDKUeC1OGLRAM%2FEfE1GLjY6QVmZGCjU9Xi3crX7tx4fy7tcm5X7U3fXt8LKgtzhiisyn6slJOKQyM%2FouaC3iKEoIZpTTivM1f%2BY%2FgYu8t11mNgMKzB18QGOqUBtBVh6jBibZpEBhSclc7uEj0wJw%2Fd33nvw0NQ%2BSP1Pr79DVgYDQaOouyVT2HFrVK3zIXSaBiWii5A%2Fg7GCfiMdTFIM%2FT9kWtU2gjK4oD5VZ0zMfyprNLDNSsVEohZ7cpEXNJghD%2BSKCY4a8i5XVvrPg6Y0bOfkA%2FrpqnJNLZ%2BRuMiAPV%2B%2BKBFwJQnY1iLZO2%2FzdutpUS0sP4voB1xQ95yeT9L3JDC&X-Amz-Signature=b7571b5fd4d817c008e72539f595d0e7fceea893c020a87cdeea58472be6e567&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject\"} />\n\n\n[https://cookie-monster-color.figma.site/](https://cookie-monster-color.figma.site/)\n\n\n<EmbededWrapper names={\"embed\"} urls={\"https://cookie-monster-color.figma.site/\"} />\n\n\n[궁극의 아키텍처 로드맵: Notion → MDX → 정적 블로그\n](https://www.notion.so/22f1eb5c033780dea089c5ea32034619) \n\n\n[https://ryoonwithwisdomtrees.notion.site/Notion-MDX-22f1eb5c033780dea089c5ea32034619?source=copy_link](https://ryoonwithwisdomtrees.notion.site/Notion-MDX-22f1eb5c033780dea089c5ea32034619)\n\n<details>\n<summary>한겨레,2021-02-03, <strong>이슬아 “부모에게 배운 생계의 책임감…명랑하고 회복력 있는 글 쓰고 싶다”</strong></summary>\n\n<BookMarkWrapper names={\"bookmark\"} urls={\"https://www.hani.co.kr/arti/society/society_general/981552.html\"} />\n\n>  92년생 작가 이슬아는 지금 같은 세대 독자들에게 많은 지지를 받는 작가 중 한명이다. 기존의 등단 방식 등 권위와 관행의 경로를 따라가는 대신 2018년 ‘일간 이슬아’라는 구독형 연재를 시작해 매일 0시 독자를 직접 찾아가는 산문으로 큰 호응을 얻었다. 이 작가의 말대로 권위에 대한 저항이라기보다 학자금 대출 상환이라는 주어진 과제를 풀기 위한 해결책이었고, 그를 지금까지 ‘연재노동자’로 자리매김하게 한 원동력이 되었다. ‘일간 이슬아’의 첫 시즌 연재를 끝낸 뒤 그는 ‘헤엄출판사’ 대표라는 명함을 하나 더 추가했고, 이곳에서 나온 책 5종이 지금까지 10만부 가까이 팔렸다. 그 밖에도 라디오 디제이, 뮤지션으로 활동 영역을 넓혀오며 올해에는 전방위 예술가로 좀 더 활동 영역을 넓히고자 발걸음을 바삐 움직이고 있다. 지난 1일부터 ‘일간 이슬아’ 2021년 겨울호 연재를 재개한 이슬아 작가를 지난달 29일 서울 서교동 카페에서 만나 ‘책임지는 삶’에 대한 이야기를 들었다.  \n>   \n> **―성인이 된 이후 늘 ‘투잡’이나 ‘쓰리잡’을 유지해왔다고 밝혔고, ‘일간 이슬아’ 시작과 함께 ‘연재노동자’로 활동하면서 라디오 디제이, 음악 활동까지 다양한 일을 해왔다. 현재 하는 일은 어떤 게 있나?**  \n> “메인은 연재를 하는 집필 작가이고 두번째는 ‘헤엄출판사’의 대표 일이다. 세번째는 일주일에 한번씩 하는 글쓰기 교사 일이다. 지금은 도시형 대안학교에서 중고등 청소년을 가르치고 직접 모집한 동네 초등학교 아이들도 가르친다. 집에서 가르치다가 코로나 확산 때문에 줌 수업을 하고 있다. &lt;교육방송&gt;(EBS) 라디오 ‘이스라디오’를 100회로 최근 마무리했다. 혼자, 그리고 동생 이찬희와 느슨한 팀으로 음악 작업도 비정기적으로 하고 있다. 새해의 변화 중 하나는 두루두루아티스트컴퍼니에 들어간 거다. 이 역시 ‘느슨한’ 소속사라고 말할 수 있다. 작가로서 하는 일은 모두 내가 꾸려나가고 영상, 화보, 음악 작업 등 다른 장르의 창작 활동을 할 때 든든하게 지원해주는 팀이 생겼다.”  \n>   \n> **―성인이 된 이후 늘 ‘투잡’이나 ‘쓰리잡’을 유지해왔다고 밝혔고, ‘일간 이슬아’ 시작과 함께 ‘연재노동자’로 활동하면서 라디오 디제이, 음악 활동까지 다양한 일을 해왔다. 현재 하는 일은 어떤 게 있나?**  \n> “메인은 연재를 하는 집필 작가이고 두번째는 ‘헤엄출판사’의 대표 일이다. 세번째는 일주일에 한번씩 하는 글쓰기 교사 일이다. 지금은 도시형 대안학교에서 중고등 청소년을 가르치고 직접 모집한 동네 초등학교 아이들도 가르친다. 집에서 가르치다가 코로나 확산 때문에 줌 수업을 하고 있다. &lt;교육방송&gt;(EBS) 라디오 ‘이스라디오’를 100회로 최근 마무리했다. 혼자, 그리고 동생 이찬희와 느슨한 팀으로 음악 작업도 비정기적으로 하고 있다. 새해의 변화 중 하나는 두루두루아티스트컴퍼니에 들어간 거다. 이 역시 ‘느슨한’ 소속사라고 말할 수 있다. 작가로서 하는 일은 모두 내가 꾸려나가고 영상, 화보, 음악 작업 등 다른 장르의 창작 활동을 할 때 든든하게 지원해주는 팀이 생겼다.”\n>\n>\n> **―2018년 ‘일간 이슬아’를 시작한 뒤 세번째 시즌을 진행 중이다. 시즌이 바뀌어갈수록 달라진 점은?**\n> “첫해에는 봄부터 가을까지 쉼 없이 연재를 하다 몸이 ‘아작’ 나는 걸 경험한 뒤 다음해 시즌부터는 연재 주기를 줄이고 많이 쉬는 것으로 페이스 조절을 했다. 내용에서는 첫 시즌이 이슬아라는 사람의 화려한 재롱잔치였다면 두번째 시즌에는 인터뷰 코너가 들어온 게 가장 큰 변화다. 나와 내 가족, 내 친구, 내 애인 등 반경 1㎞ 안에 있던 글의 주제가 좀 더 멀리 있는 사람들까지 확장된 셈이다. 이때의 연재 글 중 단행본 &lt;깨끗한 존경&gt;으로 묶은 정혜윤 피디, 김한민 작가(시셰퍼드 활동가), 유진목 시인, 김원영 변호사 등이 그들이다. 이들이 책으로 만난 스승들이라면 세번째 시즌에는 책에도 나오지 않고 에스엔에스(SNS)에도 없는 사람들을 찾아가기 시작했다. 27년간 이대목동병원 응급실에서 일해온 청소노동자 같은 분들이다.\n>\n> **―나와 주변에 대한 관심의 외연이 점차 확장된 것으로 보인다.**\n> “묵묵히 중요한 일을 하고 있지만 마이크를 가지고 있지 않아서 잘 드러나지 않는 중장년층 노동자를 만나고 싶었다. 특히 코로나 사태를 겪으면서 내가 직접 할 수 없는 일들을 대신 해주는 사람들의 도움으로 살고 있다는 생각을 많이 했다. 코로나 유행 초기 때 대형병원 응급실들이 난리통이었는데 이 와중에 그림자처럼 소리 없이 이곳을 계속 치우는 사람이 있을 거라는 궁금증이 들었다. 이후 버섯 재배 농부나 인쇄소 노동자, 아파트 계단을 청소하는 나의 외할머니 등 오랫동안 한가지 일을 꾸준히 해온 분들을 찾아가 이야기를 들었다.”\n>\n> **―1시즌 연재 때 세월호나 동물권, 공장식 축산 문제 등의 이야기를 하면 구독자가 많이 떨어져나간다고 했는데 지금은 어떤가?**\n> “조금 정치적인 이야기를 하면 떨어져나가는 독자들이 여전히 있긴 하다. 가볍고 재밌는 글을 읽고 싶은데 왜 사회적이고 정치적인 이야기를 하느냐는 반응이다. 하지만 모든 글은 사회적이고 정치적일 수밖에 없지 않나. **독자들의 반응에 일희일비하지 않는 게 ‘일간 이슬아’를 하면서 내가 해온 연습이기도 하다. 다만 내가 중요하다고 생각하는 이야기를 친절하게 전하기 위해 노력하는 중이다.**”\n>\n>\n>\n\n</details>\n\n<details>\n<summary>시사인, 2023-08-23[ ](https://www.sisain.co.kr/news/articleView.html?idxno=50788)[<strong>출판계의 강박적인 작업자 네 명이 모이면?</strong>](https://www.sisain.co.kr/news/articleView.html?idxno=50788)</summary>\n\n### <strong>직육면체의 세부 사항에 집착하는 사람들</strong>\n\n> 이슬아 작가와 이훤 작가의 첫 인연을 묘사한 글도 책에 나온다. 두 사람은 2020년 스승과 제자로 만났다. **‘스승 중독’이라고 표현할 정도로 배우는 걸 좋아하는 이슬아 작가**가 시카고에 있는 이훤 작가에게 영어 강습을 부탁했다. “그 시기에는 외국어를 너무 배우고 싶었나 보다. 수능을 안 봤기 때문에 영어를 잘해야 할 이유도 없고 작가가 토익·토플을 할 이유도 없었다. 모국어를 좀 새롭게 느끼고 싶어서 배웠다. (이훤 작가의) 라디오 인터뷰를 듣는데 **영어를 아름답게 구사하길래 이렇게 말하는 사람에게 외국어를 배우고 싶다고 생각했다**.” 이슬아 작가는 화상 영어 수업 시세를 조사한 뒤 적절한 가격도 제안했다. 평소 작가의 책을 좋아하고 그의 행보를 응원하고 있던 이훤 작가로서도 낯선 경험이었다. “동료들이 서로의 작업을 좋아해서 잘 지낼 수는 있는데 영어를 가르쳐달라고는 하지 않는다. 처음 받아본 부탁이었다(웃음).”  \n> 그렇게 이슬아 작가는 ‘만져보지 않은 사람’과 난생처음 절친이 되었다. 두세 시간 이어진 대화에서 영어로 말한 건 한 시간 정도다. 17년간 외국에서 생활하고 이민자 정체성이 짙었던 이훤 작가에게도 일상적인 한국어 대화가 절실했다. 사고하는 한국어와 발화하는 한국어 사이에 갭이 있었다. 둘 사이를 잇는 다리가 부서져 있는 느낌이었다. “영어가 늘어가는 과정도 재미있었지만 한국어가 퇴화한 사람의 언어를 보는 것도 재미있었다. 한국어로 전시를 설명하는 자리는 좀 있었기 때문에 아카데믹한 한국어만 남더라. 섭섭하기도 했다. 아무리 친해져도 딱딱하고 예의 바르게 말하는 느낌이었다. 친한 사이에 할 수 있는 농담을 했는데도 ‘그렇게 말해준다니 정말 기쁘다’ 이런 식으로 답했다(이슬아).”\n> 그 풍경이 ‘완벽한 은유’처럼 느껴졌다. “**인생을 살 때도 내 안에서 길어 올린 뭔가를 세상에 던지고 나면 이후의 일은 내 손을 떠난다. 나를 떠난 이야기가 내 앞에 펼쳐지기도 하고 그것이 돌아오기도 한다. 우리가 끝내준다고 말하는 순간들을 대변하는 은유 같았다.”** 일본어를 몰라 번역 앱에 의지해, 책에 들어갈 중요한 작업을 하고 싶은데 ‘들어와 줄 수 있느냐’고 세 소년에게 물어보았다. 그렇게 짧은 머리의 세 소년이 표지에 실렸다.  \n>   \n> 책 만드는 과정은 ‘너무 수월한 동시에 너무 치열’했다. 판형, 종이의 질감, 두께, 가격, 사진의 밝기, 간격, 위치, 조사 하나를 두고 대화를 주고받았다. 이슬아 작가가 김 주간에게 ‘하나하나 관여해 피곤하냐’고 묻자 **\"정성과 예의를 갖추는 선에서 우리는 최선을 다해 침범해야 한다\"**라는 답이 돌아왔다. 이훤 작가는 이렇게 표현했다. “네 명(이훤, 이슬아, 김진형, 박연미 디자이너) **모두 자기 세계가 있고 그 세계에 대한 확신이 있는 강박적인 작업자들이다. 서로를 존중하지만 자신이 쌓아온 미감의 세계를 배반하거나 타협하지 않았다.** **넷이 만나 가장 멀리까지 갈 수 있는 데가 어딘지 확인하는 시간이었다.”** 편집자 말도 들어봐야 한다며 이슬아 작가가 말했다. “애초 이 직육면체(책)의 세부 사항에 그렇게까지 집착하는 직업의 사람들이라는 게 솔직히 너무 우스꽝스러운데 정말 진지하게 했다.”\n> 친구들 역시 그의 산문에 자주 나온다. ‘친구들 연합’이 있다. 그 안에는 작가 친구들도 있다. “누군가를 글의 소재로 삼는 것이 예민한 시대지만 우리끼리는 우리 얘기를 마음대로 해도 된다는 합의가 있다. ‘네가 어지간히 알아서 썼겠지’ 하는 마음이다. 그래도 조심스러운 부분은 허락을 받고 게재한다. 이 글이 나를 해하지 않을 거라는 믿음이 드는 단계에서는 서로 마음껏 쓰라고 하는 것 같다.” 이슬아 작가는 ‘무해하다’는 표현에 대해서도 회의적이다. “**무해함이라는 말이 이렇게까지 널리 쓰이는 것이 시대의 징후이긴 하겠으나 ‘무해한 관계’가 어디 있나. 서로 이런저런 해를 입히지만 그럼에도 쌓아온 우정의 역사가 있고 기본적으로 애정한다는 전제가 있기 때문에 침범해도 괜찮은 것 같다.”** 글에 직접 등장하는 이훤 작가는 어떻게 생각할까? “이 장면을 이렇게 뽑아내네, 프로네... 생각했다(웃음). **글쓰기는 여러 소재를 이어가는 작업이라 창작자와 그 주변은 서로 침범할 수밖에 없는 것 같다.”  \n>   \n> ‘사랑도 우정도 가까운 애랑 하는 편’인 이슬아 작가도 팬데믹을 겪으며 변화가 있었다. 멀어도 친구가 되는 법을 배우는 시간이었다. “생각해보니 이번 책의 중요한 키워드 중 하나가 만남인 것 같다. 어떻게 만나지 않고도 만날 것인가. 몸을 부딪히면서 만난다는 게 무엇인지 요가원과 태권도장을 소재로 하는 글에서 그 감각을 탐구하고 있다(이슬아).” 이훤 작가는 결국 ‘가까운 애’가 되었다. 지난해 한국으로 이주했기 때문이다. “17년 동안 불가능했던 일상과 만남이 여기서는 쉬웠다. 기분이 이상하다. 지금도 인터뷰지만 언어가 다르다는 생각 없이 이야기하고 있다. ‘우리 중 하나가 되기 수월한 환경’인데 미국에 살 때는 커피숍이나 식당같이 일상적인 장소에 가도 이 중 한 명이 아니라는 걸 자주 느꼈다.**\n> 이슬아 작가가 보기에 이훤 작가가 가진 소수자 감수성은 창작자로서의 강점이다. “**그 사회에서 1등 시민은 아니었던 사람이 가질 수 있는, 어렵게 얻었지만 소중한 시선들이 있다고 생각한다. 한국으로 이주하면서는 이 나라에 있는 타국인들로 관점이 옮아가는 걸 느낀다.**” 이훤 작가가 보기에 이슬아는 어떤 창작자일까? “**다층적인 창작자다. 창작의 한 과정만 책임지려고 하지 않고 기획하는 눈으로 처음부터 끝까지 임하는 사람이다. 여러 장르의 예술을 하는데 그때마다 함께하는 사람들을 (작업 안에) 열심히 초대하고 같이 이루어가는 공기를 만든다. 이런 게 늘 멋있다**.” 협업자로서 이슬아 작가는 아름다움도 고집하지만 멈출 때를 결정하는 사람이다.\n>\n> 글에서도 느껴지는 것처럼 이슬아 작가는 낙천적인 편이다. 이런 기질이 오랫동안 콤플렉스이기도 했다. “삶에는 도움이 많이 된다고 생각하지만 단순한 건강함이나 명랑함이 창피할 때가 있다. 특히 친구들이 쓴, 나와 다른 훌륭한 글을 볼 때 그렇다. 첨예하고 도저히 따라갈 수 없는 사유가 있다.” 드라마를 쓰면서도 그렇다. 드라마는 세상과 어떻게 불화했는지가 중요한 장르인데 갈등을 매끈하게 봉합하려는 기질이 나올 때가 있다. **화합하려는 관성이 작가로서 장점이자 단점이다**.\n>\n>\n> 이슬아 작가는 최근 예스24가 실시한 ‘올해의 젊은 작가’ 온라인 독자 투표에서 1위에 선정되기도 했다. 5만594표(9.4%)를 받았다. 인생에서 받은 상 중 가장 크고 독자가 뽑아주어 더 특별하다. 첫 책을 낸 지 5년, 동시대 독자와 작가들 사이에서 꾸준히 영향력을 키워왔다. “가진 힘을 좋은 곳에 쓰고 싶은데 사실 되게 알량한 힘이라고 생각하기도 한다. 내가 가진 지면에서 중요하되 덜 얘기된 사람들, 이슈들을 다루려고 노력하지만 보통 생활할 때는 소재만큼의 반경만 생각한다.”\n>\n>\n\n</details>\n\n<details>\n<summary>경향, [2021.11.13 ](https://m.khan.co.kr/culture/culture-general/article/202111130949001)[<strong>이슬아 “금기 깬 자유? 외려 루틴하게 살아요”</strong>](https://m.khan.co.kr/culture/culture-general/article/202111130949001)</summary>\n- 이 작가는 사람에 대한 호기심이 많고 관찰력이 뛰어난 것 같아요. 실제로 응급의학과 전문의이기도 한 남궁인 작가(38)와 주고받으며 쓴 서간집 &lt;우리 사이엔 오해가 있다&gt;에서 스스로를 ‘호모 큐리어스(호기심이 많은 사람)’라고 표현하기도 했지요.\n\n“궁금한 게 많아서 사람들에게 질문을 잘해요. 대화 내용도 잘 기억하고요. 저는 저만 말하고 있는 상황을 좋아하지 않아요. 청소년기 때부터 그랬던 것 같아요. 어디서 몇명이 있든 수줍음이 많은 이도 말할 수 있도록 고루 질문을 던져요. 그 능력으로 작가생활을 하고 있다고 생각해요(웃음).”\n\n\n그를 대중이 주목한 것은 2018년 ‘일간 이슬아’라는 구독형 연재를 시작하면서다. 출판사나 홈페이지 등 중간 플랫폼을 거치지 않고 월요일부터 금요일까지 매일 자정에 e메일을 통해 작가가 구독자에게 직접 한편의 에세이를 배달한다. 이전까지 누구도 시도하지 않았던 파격이었다. 한달에 20편의 글, 구독료는 1편당 500원꼴인 1만원이다. 반응은 폭발적이었다. 무엇보다 내용이 흥미진진했다. 화자인 나(이슬아)와 웅이(아빠), 복희(엄마), 찬희(남동생), 하마(애인), 조부모 그리고 친구들이 주인공으로 등장하는데, 시트콤 같은 유머러스한 에피소드들이 이어진다. 아니, 진지한 이야기조차 그는 익살스럽게 쓸 줄 안다.\n\n- ‘일간 이슬아’를 시작하고 네 번째 시즌인 2021년 늦봄호까지 마무리했으니 4년간 연재를 이어왔어요. 글감을 찾는 게 쉽던가요.\n\n“어렵죠(웃음). 그래서 평소 아이폰 메모장에 사람들과 나눈 대사나 단어를 수시로 기록해두는 습관이 있어요. 그걸 기초로 한 글쓰기가 많아요.”\n\n- 꼭 마감시간인 자정에 맞춰 원고를 마무리해 보내지요. 마감 스트레스가 심할 텐데 왜 미리 안 써두나요.\n\n“낮에는 낮에 할 일이 따로 많이 있어서예요. 출판사 업무도 해야 하고, 독자들의 의견에 답글도 써야 해요. 그런데 어쩌다 한가한 날이 생겨도 마감이 코앞에 있지 않으면 긴장감이 떨어져서인지 잘 안 써져요(웃음).”\n\n- 독자들의 e메일에 일일이 답변을 해주나요.\n\n“제가 꼭 대답해야 할 내용일 경우 써요. 그런데 저는 강한 사람이 되고 싶다는 생각을 많이 했어요.”\n\n- 왜요.\n\n“작가가 육체적으로도 빡센 직업인데, 독자들로부터 피드백이 많잖아요. 선플이 많지만 악플도 적잖아 마음이 강해야 해요. 무뎌지는 게 강해지는 것이라고 생각했지만 &lt;새 마음으로&gt;에 등장하는 어른들을 인터뷰한 후 눈물이 많아도 강할 수 있음을 알게 됐어요. 제가 젊은 여성 작가이다 보니 저에 대한 얼평, 몸평도 많아요. 처음에는 그렇게 소비된다는 자체가 불편했는데, 지금은 그럴 바에야 최대한 다양하게 소비되는 게 좋겠다고 생각해요. 노래도 하고 싶은 만큼 하고 싶고, 글도 착한 글만 쓰지 않으려 해요.”\n\n\n</details>\n\n\nBefore continuing, make sure:\n\n- Next.js 15 and Tailwind CSS 4 are configured.\n\n## Getting Started\n\n\n```plain text\nfumadocs-ui fumadocs-core\n```\n\n\n### MDX Components\n\n\n&lt;include cwd meta='title=\"mdx-components.tsx\"'&gt;\n../../examples/next-mdx/mdx-components.tsx\n&lt;/include&gt;\n\n\n### Content Source\n\n\nFumadocs supports different content sources, including Fumadocs MDX and [Content Collections](https://www.notion.so/docs/headless/content-collections).\n\n\nFumadocs MDX is our official content source, you can configure it with:\n\n\n```plain text\nfumadocs-mdx @types/mdx\n```\n\n\n```javascript\nimport { createMDX } from 'fumadocs-mdx/next';\n\nconst withMDX = createMDX();\n\n/** @type {import('next').NextConfig} */\nconst config = {\n  reactStrictMode: true,\n};\n\nexport default withMDX(config);\n```\n\n\n```typescript\nimport { defineDocs } from 'fumadocs-mdx/config';\n\nexport const docs = defineDocs({\n  dir: 'content/docs',\n});\n```\n\n\n```json\n{\n  \"scripts\": {\n    \"postinstall\": \"fumadocs-mdx\" // [!code ++]\n  }\n}\n```\n\n\nFinally, to access your content:\n\n\n```typescript\n// .source folder will be generated when you run `next dev`\nimport { docs } from '@/.source';\nimport { loader } from 'fumadocs-core/source';\n\nexport const source = loader({\n  baseUrl: '/docs',\n  source: docs.toFumadocsSource(),\n});\n```\n\n\n### Root Layout\n\n\nWrap the entire application inside [Root Provider](https://www.notion.so/docs/ui/layouts/root-provider), and add required styles to <code>body</code>.\n\n\n```typescript\nimport { RootProvider } from 'fumadocs-ui/provider';\nimport type { ReactNode } from 'react';\n\nexport default function Layout({ children }: { children: ReactNode }) {\n  return (\n    <html lang=\"en\" suppressHydrationWarning>\n      <body\n        // you can use Tailwind CSS too\n        style={{\n          display: 'flex',\n          flexDirection: 'column',\n          minHeight: '100vh',\n        }}\n      >\n        <RootProvider>{children}</RootProvider>\n      </body>\n    </html>\n  );\n}\n```\n\n\n### Styles\n\n\nAdd the following Tailwind CSS styles to <code>global.css</code>.\n\n\n```css\n@import 'tailwindcss';\n@import 'fumadocs-ui/css/neutral.css';\n@import 'fumadocs-ui/css/preset.css';\n```\n\n> It doesn't come with a default font, you may choose one from next/font.\n\n### Layout\n\n\nCreate a <code>app/layout.config.tsx</code> file to put the shared options for our layouts.\n\n\n&lt;include cwd meta='title=\"app/layout.config.tsx\"'&gt;\n../../examples/next-mdx/app/layout.config.tsx\n&lt;/include&gt;\n\n\nCreate a folder <code>/app/docs</code> for our docs, and give it a proper layout.\n\n\n&lt;include cwd meta='title=\"app/docs/layout.tsx\"'&gt;\n../../examples/next-mdx/app/docs/layout.tsx\n&lt;/include&gt;\n\n> pageTree refers to Page Tree, it should be provided by your content source.\n\n### Page\n\n\nCreate a catch-all route <code>/app/docs/[[...slug]]</code> for docs pages.\n\n\nIn the page, wrap your content in the [Page](https://www.notion.so/docs/ui/layouts/page) component.\n\n\n&lt;CodeBlockTabs groupId='content-source'&gt;\n\n\n```plain text\n<include cwd meta='title=\"app/docs/[[...slug]]/page.tsx\" tab=\"Fumadocs MDX\"'>../../examples/next-mdx/app/docs/[[...slug]]/page.tsx</include>\n\n<include cwd meta='title=\"app/docs/[[...slug]]/page.tsx\" tab=\"Content Collections\"'>../../examples/content-collections/app/docs/[[...slug]]/page.tsx</include>\n```\n\n\n&lt;/CodeBlockTabs&gt;\n\n\n### Search\n\n\nUse the default document search based on Orama.\n\n\n&lt;include cwd meta='title=\"app/api/search/route.ts\"'&gt;\n../../examples/next-mdx/app/api/search/route.ts\n&lt;/include&gt;\n\n\nLearn more about [Document Search](https://www.notion.so/docs/headless/search).\n\n\n### Done\n\n\nYou can start the dev server and create MDX files.\n\n\n```plain text\n---\ntitle: Hello World\n---\n\n## Introduction\n\nI love Anime.\n```\n\n\n## Deploying\n\n\nIt should work out-of-the-box with Vercel & Netlify.\n\n\n### Cloudflare\n\n\nUse [https://opennext.js.org/cloudflare](https://opennext.js.org/cloudflare), Fumadocs doesn't work on Edge runtime.\n\n\n### Docker Deployment\n\n\nIf you want to deploy your Fumadocs app using Docker with <strong>Fumadocs MDX configured</strong>, make sure to add the <code>source.config.ts</code> file to the <code>WORKDIR</code> in the Dockerfile.\nThe following snippet is taken from the official [Next.js Dockerfile Example](https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile):\n\n\n```plain text\n# syntax=docker.io/docker/dockerfile:1\n\nFROM node:18-alpine AS base\n\n# Install dependencies only when needed\nFROM base AS deps\n# Check <https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine> to understand why libc6-compat might be needed.\nRUN apk add --no-cache libc6-compat\nWORKDIR /app\n\n# Install dependencies based on the preferred package manager [!code highlight]\nCOPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* source.config.ts ./\nRUN \\\\\n  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \\\\\n  elif [ -f package-lock.json ]; then npm ci; \\\\\n  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \\\\\n  else echo \"Lockfile not found.\" && exit 1; \\\\\n  fi\n\n\n# Rebuild the source code only when needed\nFROM base AS builder\nWORKDIR /app\nCOPY --from=deps /app/node_modules ./node_modules\nCOPY . .\n\n# Next.js collects completely anonymous telemetry data about general usage.\n# Learn more here: <https://nextjs.org/telemetry>\n# Uncomment the following line in case you want to disable telemetry during the build.\n# ENV NEXT_TELEMETRY_DISABLED=1\n\nRUN \\\\\n  if [ -f yarn.lock ]; then yarn run build; \\\\\n  elif [ -f package-lock.json ]; then npm run build; \\\\\n  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \\\\\n  else echo \"Lockfile not found.\" && exit 1; \\\\\n  fi\n\n# Production image, copy all the files and run next\nFROM base AS runner\nWORKDIR /app\n\nENV NODE_ENV=production\n# Uncomment the following line in case you want to disable telemetry during runtime.\n# ENV NEXT_TELEMETRY_DISABLED=1\n\nRUN addgroup --system --gid 1001 nodejs\nRUN adduser --system --uid 1001 nextjs\n\nCOPY --from=builder /app/public ./public\n\n# Automatically leverage output traces to reduce image size\n# <https://nextjs.org/docs/advanced-features/output-file-tracing>\nCOPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./\nCOPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static\n\nUSER nextjs\n\nEXPOSE 3000\n\nENV PORT=3000\n\n# server.js is created by next build from the standalone output\n# <https://nextjs.org/docs/pages/api-reference/config/next-config-js/output>\nENV HOSTNAME=\"0.0.0.0\"\nCMD [\"node\", \"server.js\"]\n```\n\n\nThis ensures Fumadocs MDX can access your configuration file during builds.\n\n\n좋은 책을 읽고는, 미루지 않고 바로 적도록연습하자.\n\n\n이슬아에게 그러하듯 그 문장들은 또 누군가에게 전신을 타고 흘러 또 다른 누군가에게 전달된다.\n\n> 언어란 질서이자 권위이기 때문이다. 권위를 잘 믿는 이들은 쉽게 속는 자들이기도 하다. 웬만해선 속지 않는 자들도 있다. *그러나 속지 않는 자들은 필연적으로 방황하게 된다. 세계를 송두리째로 이상하게 여기고 만다. 어린 슬아는 선택해야 했다. 속을까 말까.\n\n9p, *자크 라캉의 말\n\n> “이것부터 박읍시다.” 낮잠 출판사의 간판이다. 슬아는 맘 편히 못질할 수 있는 집에 한 번도 살아보지 못했다. 현관 앞에 서서 위치를 정하고는 말한다. “여기에 박아주세요.“   \n> 가녀장의 지령이다. 웅이가 망치를 들고 오더니 벽에 꽝꽝 못질을 한다. 슬아는 카타르시스를 느끼며 그것을 지켜본다.\n\n16p\n\n> 그들의 딸 이슬아는 성실한 작가로 널리 알려져 있다. 사실 그것은 루머 같은 소문에 가까웠지만, 소문은 사람을 꽤나 바꿔놓는 법이다. 이슬아는 과대평가받음으로써 강제로 조금씩 더 부지런해졌다. 어쨌거나 자정 무렵엔 뭔가를 완성하긴 한다. 시간이 흐르고 이슬아는 글을 쓴다. 자정이 다가올수록 놀라운 속도로 빠르게 쓴다. 그것은 이슬아가 쓰는 글이라기보다는 마감이 쓰는 글이다.  \n> …중략  \n> ”당신들도 성공하고 싶어? 그럼 아침 일찍 일어나서 요가를 해.“",
    "_meta": {
      "filePath": "engineerings-아카이브-이슬아-작가님.mdx",
      "fileName": "engineerings-아카이브-이슬아-작가님.mdx",
      "directory": ".",
      "extension": "mdx",
      "path": "engineerings-아카이브-이슬아-작가님"
    },
    "toc": [
      {
        "title": "1. 리포지토리",
        "url": "#1-리포지토리",
        "depth": 1
      },
      {
        "title": "직육면체의 세부 사항에 집착하는 사람들",
        "url": "#직육면체의-세부-사항에-집착하는-사람들",
        "depth": 3
      },
      {
        "title": "Getting Started",
        "url": "#getting-started",
        "depth": 2
      },
      {
        "title": "MDX Components",
        "url": "#mdx-components",
        "depth": 3
      },
      {
        "title": "Content Source",
        "url": "#content-source",
        "depth": 3
      },
      {
        "title": "Root Layout",
        "url": "#root-layout",
        "depth": 3
      },
      {
        "title": "Styles",
        "url": "#styles",
        "depth": 3
      },
      {
        "title": "Layout",
        "url": "#layout",
        "depth": 3
      },
      {
        "title": "Page",
        "url": "#page",
        "depth": 3
      },
      {
        "title": "Search",
        "url": "#search",
        "depth": 3
      },
      {
        "title": "Done",
        "url": "#done",
        "depth": 3
      },
      {
        "title": "Deploying",
        "url": "#deploying",
        "depth": 2
      },
      {
        "title": "Cloudflare",
        "url": "#cloudflare",
        "depth": 3
      },
      {
        "title": "Docker Deployment",
        "url": "#docker-deployment",
        "depth": 3
      }
    ],
    "structuredData": {
      "contents": [
        {
          "heading": "1-리포지토리",
          "content": "이 페이지는 이슬아 작가님을 덕질하는 페이지다."
        },
        {
          "heading": "1-리포지토리",
          "content": "좋은 글과 기사와 인터뷰등을 기록해둔다."
        },
        {
          "heading": "1-리포지토리",
          "content": "이 헤이택시(Full Stack Uber Clone Web App)는 React NextJs 13 Taxi Booking App : NextJs 13, Tailwind Css, Typescript, Mapbox, Stripe | Full Course유튜브강의를 참고하여 에러사항과 작업날짜 기준 deprecated된 부분 및 미흡한 부분, 그리고 한국에서 지원되지 않는 부분에 대한 이슈들을 보강하고 수정하고 커스터마이징하여 제작한 웹앱입니다."
        },
        {
          "heading": "1-리포지토리",
          "content": "https://cookie-monster-color.figma.site/"
        },
        {
          "heading": "1-리포지토리",
          "content": "궁극의 아키텍처 로드맵: Notion → MDX → 정적 블로그"
        },
        {
          "heading": "1-리포지토리",
          "content": "https://ryoonwithwisdomtrees.notion.site/Notion-MDX-22f1eb5c033780dea089c5ea32034619?source=copy_link"
        },
        {
          "heading": "1-리포지토리",
          "content": "92년생 작가 이슬아는 지금 같은 세대 독자들에게 많은 지지를 받는 작가 중 한명이다. 기존의 등단 방식 등 권위와 관행의 경로를 따라가는 대신 2018년 ‘일간 이슬아’라는 구독형 연재를 시작해 매일 0시 독자를 직접 찾아가는 산문으로 큰 호응을 얻었다. 이 작가의 말대로 권위에 대한 저항이라기보다 학자금 대출 상환이라는 주어진 과제를 풀기 위한 해결책이었고, 그를 지금까지 ‘연재노동자’로 자리매김하게 한 원동력이 되었다. ‘일간 이슬아’의 첫 시즌 연재를 끝낸 뒤 그는 ‘헤엄출판사’ 대표라는 명함을 하나 더 추가했고, 이곳에서 나온 책 5종이 지금까지 10만부 가까이 팔렸다. 그 밖에도 라디오 디제이, 뮤지션으로 활동 영역을 넓혀오며 올해에는 전방위 예술가로 좀 더 활동 영역을 넓히고자 발걸음을 바삐 움직이고 있다. 지난 1일부터 ‘일간 이슬아’ 2021년 겨울호 연재를 재개한 이슬아 작가를 지난달 29일 서울 서교동 카페에서 만나 ‘책임지는 삶’에 대한 이야기를 들었다.―성인이 된 이후 늘 ‘투잡’이나 ‘쓰리잡’을 유지해왔다고 밝혔고, ‘일간 이슬아’ 시작과 함께 ‘연재노동자’로 활동하면서 라디오 디제이, 음악 활동까지 다양한 일을 해왔다. 현재 하는 일은 어떤 게 있나?“메인은 연재를 하는 집필 작가이고 두번째는 ‘헤엄출판사’의 대표 일이다. 세번째는 일주일에 한번씩 하는 글쓰기 교사 일이다. 지금은 도시형 대안학교에서 중고등 청소년을 가르치고 직접 모집한 동네 초등학교 아이들도 가르친다. 집에서 가르치다가 코로나 확산 때문에 줌 수업을 하고 있다. <교육방송>(EBS) 라디오 ‘이스라디오’를 100회로 최근 마무리했다. 혼자, 그리고 동생 이찬희와 느슨한 팀으로 음악 작업도 비정기적으로 하고 있다. 새해의 변화 중 하나는 두루두루아티스트컴퍼니에 들어간 거다. 이 역시 ‘느슨한’ 소속사라고 말할 수 있다. 작가로서 하는 일은 모두 내가 꾸려나가고 영상, 화보, 음악 작업 등 다른 장르의 창작 활동을 할 때 든든하게 지원해주는 팀이 생겼다.”―성인이 된 이후 늘 ‘투잡’이나 ‘쓰리잡’을 유지해왔다고 밝혔고, ‘일간 이슬아’ 시작과 함께 ‘연재노동자’로 활동하면서 라디오 디제이, 음악 활동까지 다양한 일을 해왔다. 현재 하는 일은 어떤 게 있나?“메인은 연재를 하는 집필 작가이고 두번째는 ‘헤엄출판사’의 대표 일이다. 세번째는 일주일에 한번씩 하는 글쓰기 교사 일이다. 지금은 도시형 대안학교에서 중고등 청소년을 가르치고 직접 모집한 동네 초등학교 아이들도 가르친다. 집에서 가르치다가 코로나 확산 때문에 줌 수업을 하고 있다. <교육방송>(EBS) 라디오 ‘이스라디오’를 100회로 최근 마무리했다. 혼자, 그리고 동생 이찬희와 느슨한 팀으로 음악 작업도 비정기적으로 하고 있다. 새해의 변화 중 하나는 두루두루아티스트컴퍼니에 들어간 거다. 이 역시 ‘느슨한’ 소속사라고 말할 수 있다. 작가로서 하는 일은 모두 내가 꾸려나가고 영상, 화보, 음악 작업 등 다른 장르의 창작 활동을 할 때 든든하게 지원해주는 팀이 생겼다.”―2018년 ‘일간 이슬아’를 시작한 뒤 세번째 시즌을 진행 중이다. 시즌이 바뀌어갈수록 달라진 점은?\n“첫해에는 봄부터 가을까지 쉼 없이 연재를 하다 몸이 ‘아작’ 나는 걸 경험한 뒤 다음해 시즌부터는 연재 주기를 줄이고 많이 쉬는 것으로 페이스 조절을 했다. 내용에서는 첫 시즌이 이슬아라는 사람의 화려한 재롱잔치였다면 두번째 시즌에는 인터뷰 코너가 들어온 게 가장 큰 변화다. 나와 내 가족, 내 친구, 내 애인 등 반경 1㎞ 안에 있던 글의 주제가 좀 더 멀리 있는 사람들까지 확장된 셈이다. 이때의 연재 글 중 단행본 <깨끗한 존경>으로 묶은 정혜윤 피디, 김한민 작가(시셰퍼드 활동가), 유진목 시인, 김원영 변호사 등이 그들이다. 이들이 책으로 만난 스승들이라면 세번째 시즌에는 책에도 나오지 않고 에스엔에스(SNS)에도 없는 사람들을 찾아가기 시작했다. 27년간 이대목동병원 응급실에서 일해온 청소노동자 같은 분들이다.―나와 주변에 대한 관심의 외연이 점차 확장된 것으로 보인다.\n“묵묵히 중요한 일을 하고 있지만 마이크를 가지고 있지 않아서 잘 드러나지 않는 중장년층 노동자를 만나고 싶었다. 특히 코로나 사태를 겪으면서 내가 직접 할 수 없는 일들을 대신 해주는 사람들의 도움으로 살고 있다는 생각을 많이 했다. 코로나 유행 초기 때 대형병원 응급실들이 난리통이었는데 이 와중에 그림자처럼 소리 없이 이곳을 계속 치우는 사람이 있을 거라는 궁금증이 들었다. 이후 버섯 재배 농부나 인쇄소 노동자, 아파트 계단을 청소하는 나의 외할머니 등 오랫동안 한가지 일을 꾸준히 해온 분들을 찾아가 이야기를 들었다.”―1시즌 연재 때 세월호나 동물권, 공장식 축산 문제 등의 이야기를 하면 구독자가 많이 떨어져나간다고 했는데 지금은 어떤가?\n“조금 정치적인 이야기를 하면 떨어져나가는 독자들이 여전히 있긴 하다. 가볍고 재밌는 글을 읽고 싶은데 왜 사회적이고 정치적인 이야기를 하느냐는 반응이다. 하지만 모든 글은 사회적이고 정치적일 수밖에 없지 않나. 독자들의 반응에 일희일비하지 않는 게 ‘일간 이슬아’를 하면서 내가 해온 연습이기도 하다. 다만 내가 중요하다고 생각하는 이야기를 친절하게 전하기 위해 노력하는 중이다.”"
        },
        {
          "heading": "직육면체의-세부-사항에-집착하는-사람들",
          "content": "이슬아 작가와 이훤 작가의 첫 인연을 묘사한 글도 책에 나온다. 두 사람은 2020년 스승과 제자로 만났다. ‘스승 중독’이라고 표현할 정도로 배우는 걸 좋아하는 이슬아 작가가 시카고에 있는 이훤 작가에게 영어 강습을 부탁했다. “그 시기에는 외국어를 너무 배우고 싶었나 보다. 수능을 안 봤기 때문에 영어를 잘해야 할 이유도 없고 작가가 토익·토플을 할 이유도 없었다. 모국어를 좀 새롭게 느끼고 싶어서 배웠다. (이훤 작가의) 라디오 인터뷰를 듣는데 영어를 아름답게 구사하길래 이렇게 말하는 사람에게 외국어를 배우고 싶다고 생각했다.” 이슬아 작가는 화상 영어 수업 시세를 조사한 뒤 적절한 가격도 제안했다. 평소 작가의 책을 좋아하고 그의 행보를 응원하고 있던 이훤 작가로서도 낯선 경험이었다. “동료들이 서로의 작업을 좋아해서 잘 지낼 수는 있는데 영어를 가르쳐달라고는 하지 않는다. 처음 받아본 부탁이었다(웃음).”그렇게 이슬아 작가는 ‘만져보지 않은 사람’과 난생처음 절친이 되었다. 두세 시간 이어진 대화에서 영어로 말한 건 한 시간 정도다. 17년간 외국에서 생활하고 이민자 정체성이 짙었던 이훤 작가에게도 일상적인 한국어 대화가 절실했다. 사고하는 한국어와 발화하는 한국어 사이에 갭이 있었다. 둘 사이를 잇는 다리가 부서져 있는 느낌이었다. “영어가 늘어가는 과정도 재미있었지만 한국어가 퇴화한 사람의 언어를 보는 것도 재미있었다. 한국어로 전시를 설명하는 자리는 좀 있었기 때문에 아카데믹한 한국어만 남더라. 섭섭하기도 했다. 아무리 친해져도 딱딱하고 예의 바르게 말하는 느낌이었다. 친한 사이에 할 수 있는 농담을 했는데도 ‘그렇게 말해준다니 정말 기쁘다’ 이런 식으로 답했다(이슬아).”\n그 풍경이 ‘완벽한 은유’처럼 느껴졌다. “인생을 살 때도 내 안에서 길어 올린 뭔가를 세상에 던지고 나면 이후의 일은 내 손을 떠난다. 나를 떠난 이야기가 내 앞에 펼쳐지기도 하고 그것이 돌아오기도 한다. 우리가 끝내준다고 말하는 순간들을 대변하는 은유 같았다.” 일본어를 몰라 번역 앱에 의지해, 책에 들어갈 중요한 작업을 하고 싶은데 ‘들어와 줄 수 있느냐’고 세 소년에게 물어보았다. 그렇게 짧은 머리의 세 소년이 표지에 실렸다.책 만드는 과정은 ‘너무 수월한 동시에 너무 치열’했다. 판형, 종이의 질감, 두께, 가격, 사진의 밝기, 간격, 위치, 조사 하나를 두고 대화를 주고받았다. 이슬아 작가가 김 주간에게 ‘하나하나 관여해 피곤하냐’고 묻자 **\"정성과 예의를 갖추는 선에서 우리는 최선을 다해 침범해야 한다\"**라는 답이 돌아왔다. 이훤 작가는 이렇게 표현했다. “네 명(이훤, 이슬아, 김진형, 박연미 디자이너) 모두 자기 세계가 있고 그 세계에 대한 확신이 있는 강박적인 작업자들이다. 서로를 존중하지만 자신이 쌓아온 미감의 세계를 배반하거나 타협하지 않았다. 넷이 만나 가장 멀리까지 갈 수 있는 데가 어딘지 확인하는 시간이었다.” 편집자 말도 들어봐야 한다며 이슬아 작가가 말했다. “애초 이 직육면체(책)의 세부 사항에 그렇게까지 집착하는 직업의 사람들이라는 게 솔직히 너무 우스꽝스러운데 정말 진지하게 했다.”\n친구들 역시 그의 산문에 자주 나온다. ‘친구들 연합’이 있다. 그 안에는 작가 친구들도 있다. “누군가를 글의 소재로 삼는 것이 예민한 시대지만 우리끼리는 우리 얘기를 마음대로 해도 된다는 합의가 있다. ‘네가 어지간히 알아서 썼겠지’ 하는 마음이다. 그래도 조심스러운 부분은 허락을 받고 게재한다. 이 글이 나를 해하지 않을 거라는 믿음이 드는 단계에서는 서로 마음껏 쓰라고 하는 것 같다.” 이슬아 작가는 ‘무해하다’는 표현에 대해서도 회의적이다. “무해함이라는 말이 이렇게까지 널리 쓰이는 것이 시대의 징후이긴 하겠으나 ‘무해한 관계’가 어디 있나. 서로 이런저런 해를 입히지만 그럼에도 쌓아온 우정의 역사가 있고 기본적으로 애정한다는 전제가 있기 때문에 침범해도 괜찮은 것 같다.” 글에 직접 등장하는 이훤 작가는 어떻게 생각할까? “이 장면을 이렇게 뽑아내네, 프로네... 생각했다(웃음). **글쓰기는 여러 소재를 이어가는 작업이라 창작자와 그 주변은 서로 침범할 수밖에 없는 것 같다.”‘사랑도 우정도 가까운 애랑 하는 편’인 이슬아 작가도 팬데믹을 겪으며 변화가 있었다. 멀어도 친구가 되는 법을 배우는 시간이었다. “생각해보니 이번 책의 중요한 키워드 중 하나가 만남인 것 같다. 어떻게 만나지 않고도 만날 것인가. 몸을 부딪히면서 만난다는 게 무엇인지 요가원과 태권도장을 소재로 하는 글에서 그 감각을 탐구하고 있다(이슬아).” 이훤 작가는 결국 ‘가까운 애’가 되었다. 지난해 한국으로 이주했기 때문이다. “17년 동안 불가능했던 일상과 만남이 여기서는 쉬웠다. 기분이 이상하다. 지금도 인터뷰지만 언어가 다르다는 생각 없이 이야기하고 있다. ‘우리 중 하나가 되기 수월한 환경’인데 미국에 살 때는 커피숍이나 식당같이 일상적인 장소에 가도 이 중 한 명이 아니라는 걸 자주 느꼈다.**\n이슬아 작가가 보기에 이훤 작가가 가진 소수자 감수성은 창작자로서의 강점이다. “그 사회에서 1등 시민은 아니었던 사람이 가질 수 있는, 어렵게 얻었지만 소중한 시선들이 있다고 생각한다. 한국으로 이주하면서는 이 나라에 있는 타국인들로 관점이 옮아가는 걸 느낀다.” 이훤 작가가 보기에 이슬아는 어떤 창작자일까? “다층적인 창작자다. 창작의 한 과정만 책임지려고 하지 않고 기획하는 눈으로 처음부터 끝까지 임하는 사람이다. 여러 장르의 예술을 하는데 그때마다 함께하는 사람들을 (작업 안에) 열심히 초대하고 같이 이루어가는 공기를 만든다. 이런 게 늘 멋있다.” 협업자로서 이슬아 작가는 아름다움도 고집하지만 멈출 때를 결정하는 사람이다.글에서도 느껴지는 것처럼 이슬아 작가는 낙천적인 편이다. 이런 기질이 오랫동안 콤플렉스이기도 했다. “삶에는 도움이 많이 된다고 생각하지만 단순한 건강함이나 명랑함이 창피할 때가 있다. 특히 친구들이 쓴, 나와 다른 훌륭한 글을 볼 때 그렇다. 첨예하고 도저히 따라갈 수 없는 사유가 있다.” 드라마를 쓰면서도 그렇다. 드라마는 세상과 어떻게 불화했는지가 중요한 장르인데 갈등을 매끈하게 봉합하려는 기질이 나올 때가 있다. 화합하려는 관성이 작가로서 장점이자 단점이다.이슬아 작가는 최근 예스24가 실시한 ‘올해의 젊은 작가’ 온라인 독자 투표에서 1위에 선정되기도 했다. 5만594표(9.4%)를 받았다. 인생에서 받은 상 중 가장 크고 독자가 뽑아주어 더 특별하다. 첫 책을 낸 지 5년, 동시대 독자와 작가들 사이에서 꾸준히 영향력을 키워왔다. “가진 힘을 좋은 곳에 쓰고 싶은데 사실 되게 알량한 힘이라고 생각하기도 한다. 내가 가진 지면에서 중요하되 덜 얘기된 사람들, 이슈들을 다루려고 노력하지만 보통 생활할 때는 소재만큼의 반경만 생각한다.”"
        },
        {
          "heading": "직육면체의-세부-사항에-집착하는-사람들",
          "content": "이 작가는 사람에 대한 호기심이 많고 관찰력이 뛰어난 것 같아요. 실제로 응급의학과 전문의이기도 한 남궁인 작가(38)와 주고받으며 쓴 서간집 <우리 사이엔 오해가 있다>에서 스스로를 ‘호모 큐리어스(호기심이 많은 사람)’라고 표현하기도 했지요."
        },
        {
          "heading": "직육면체의-세부-사항에-집착하는-사람들",
          "content": "“궁금한 게 많아서 사람들에게 질문을 잘해요. 대화 내용도 잘 기억하고요. 저는 저만 말하고 있는 상황을 좋아하지 않아요. 청소년기 때부터 그랬던 것 같아요. 어디서 몇명이 있든 수줍음이 많은 이도 말할 수 있도록 고루 질문을 던져요. 그 능력으로 작가생활을 하고 있다고 생각해요(웃음).”"
        },
        {
          "heading": "직육면체의-세부-사항에-집착하는-사람들",
          "content": "그를 대중이 주목한 것은 2018년 ‘일간 이슬아’라는 구독형 연재를 시작하면서다. 출판사나 홈페이지 등 중간 플랫폼을 거치지 않고 월요일부터 금요일까지 매일 자정에 e메일을 통해 작가가 구독자에게 직접 한편의 에세이를 배달한다. 이전까지 누구도 시도하지 않았던 파격이었다. 한달에 20편의 글, 구독료는 1편당 500원꼴인 1만원이다. 반응은 폭발적이었다. 무엇보다 내용이 흥미진진했다. 화자인 나(이슬아)와 웅이(아빠), 복희(엄마), 찬희(남동생), 하마(애인), 조부모 그리고 친구들이 주인공으로 등장하는데, 시트콤 같은 유머러스한 에피소드들이 이어진다. 아니, 진지한 이야기조차 그는 익살스럽게 쓸 줄 안다."
        },
        {
          "heading": "직육면체의-세부-사항에-집착하는-사람들",
          "content": "‘일간 이슬아’를 시작하고 네 번째 시즌인 2021년 늦봄호까지 마무리했으니 4년간 연재를 이어왔어요. 글감을 찾는 게 쉽던가요."
        },
        {
          "heading": "직육면체의-세부-사항에-집착하는-사람들",
          "content": "“어렵죠(웃음). 그래서 평소 아이폰 메모장에 사람들과 나눈 대사나 단어를 수시로 기록해두는 습관이 있어요. 그걸 기초로 한 글쓰기가 많아요.”"
        },
        {
          "heading": "직육면체의-세부-사항에-집착하는-사람들",
          "content": "꼭 마감시간인 자정에 맞춰 원고를 마무리해 보내지요. 마감 스트레스가 심할 텐데 왜 미리 안 써두나요."
        },
        {
          "heading": "직육면체의-세부-사항에-집착하는-사람들",
          "content": "“낮에는 낮에 할 일이 따로 많이 있어서예요. 출판사 업무도 해야 하고, 독자들의 의견에 답글도 써야 해요. 그런데 어쩌다 한가한 날이 생겨도 마감이 코앞에 있지 않으면 긴장감이 떨어져서인지 잘 안 써져요(웃음).”"
        },
        {
          "heading": "직육면체의-세부-사항에-집착하는-사람들",
          "content": "독자들의 e메일에 일일이 답변을 해주나요."
        },
        {
          "heading": "직육면체의-세부-사항에-집착하는-사람들",
          "content": "“제가 꼭 대답해야 할 내용일 경우 써요. 그런데 저는 강한 사람이 되고 싶다는 생각을 많이 했어요.”"
        },
        {
          "heading": "직육면체의-세부-사항에-집착하는-사람들",
          "content": "왜요."
        },
        {
          "heading": "직육면체의-세부-사항에-집착하는-사람들",
          "content": "“작가가 육체적으로도 빡센 직업인데, 독자들로부터 피드백이 많잖아요. 선플이 많지만 악플도 적잖아 마음이 강해야 해요. 무뎌지는 게 강해지는 것이라고 생각했지만 <새 마음으로>에 등장하는 어른들을 인터뷰한 후 눈물이 많아도 강할 수 있음을 알게 됐어요. 제가 젊은 여성 작가이다 보니 저에 대한 얼평, 몸평도 많아요. 처음에는 그렇게 소비된다는 자체가 불편했는데, 지금은 그럴 바에야 최대한 다양하게 소비되는 게 좋겠다고 생각해요. 노래도 하고 싶은 만큼 하고 싶고, 글도 착한 글만 쓰지 않으려 해요.”"
        },
        {
          "heading": "직육면체의-세부-사항에-집착하는-사람들",
          "content": "Before continuing, make sure:"
        },
        {
          "heading": "직육면체의-세부-사항에-집착하는-사람들",
          "content": "Next.js 15 and Tailwind CSS 4 are configured."
        },
        {
          "heading": "mdx-components",
          "content": "<include cwd meta='title=\"mdx-components.tsx\"'>\n../../examples/next-mdx/mdx-components.tsx\n</include>"
        },
        {
          "heading": "content-source",
          "content": "Fumadocs supports different content sources, including Fumadocs MDX and Content Collections."
        },
        {
          "heading": "content-source",
          "content": "Fumadocs MDX is our official content source, you can configure it with:"
        },
        {
          "heading": "content-source",
          "content": "Finally, to access your content:"
        },
        {
          "heading": "root-layout",
          "content": "Wrap the entire application inside Root Provider, and add required styles to body."
        },
        {
          "heading": "styles",
          "content": "Add the following Tailwind CSS styles to global.css."
        },
        {
          "heading": "styles",
          "content": "It doesn't come with a default font, you may choose one from next/font."
        },
        {
          "heading": "layout",
          "content": "Create a app/layout.config.tsx file to put the shared options for our layouts."
        },
        {
          "heading": "layout",
          "content": "<include cwd meta='title=\"app/layout.config.tsx\"'>\n../../examples/next-mdx/app/layout.config.tsx\n</include>"
        },
        {
          "heading": "layout",
          "content": "Create a folder /app/docs for our docs, and give it a proper layout."
        },
        {
          "heading": "layout",
          "content": "<include cwd meta='title=\"app/docs/layout.tsx\"'>\n../../examples/next-mdx/app/docs/layout.tsx\n</include>"
        },
        {
          "heading": "layout",
          "content": "pageTree refers to Page Tree, it should be provided by your content source."
        },
        {
          "heading": "page",
          "content": "Create a catch-all route /app/docs/[[...slug]] for docs pages."
        },
        {
          "heading": "page",
          "content": "In the page, wrap your content in the Page component."
        },
        {
          "heading": "page",
          "content": "<CodeBlockTabs groupId='content-source'>"
        },
        {
          "heading": "page",
          "content": "</CodeBlockTabs>"
        },
        {
          "heading": "search",
          "content": "Use the default document search based on Orama."
        },
        {
          "heading": "search",
          "content": "<include cwd meta='title=\"app/api/search/route.ts\"'>\n../../examples/next-mdx/app/api/search/route.ts\n</include>"
        },
        {
          "heading": "search",
          "content": "Learn more about Document Search."
        },
        {
          "heading": "done",
          "content": "You can start the dev server and create MDX files."
        },
        {
          "heading": "deploying",
          "content": "It should work out-of-the-box with Vercel & Netlify."
        },
        {
          "heading": "cloudflare",
          "content": "Use https://opennext.js.org/cloudflare, Fumadocs doesn't work on Edge runtime."
        },
        {
          "heading": "docker-deployment",
          "content": "If you want to deploy your Fumadocs app using Docker with Fumadocs MDX configured, make sure to add the source.config.ts file to the WORKDIR in the Dockerfile.\nThe following snippet is taken from the official Next.js Dockerfile Example:"
        },
        {
          "heading": "docker-deployment",
          "content": "This ensures Fumadocs MDX can access your configuration file during builds."
        },
        {
          "heading": "docker-deployment",
          "content": "좋은 책을 읽고는, 미루지 않고 바로 적도록연습하자."
        },
        {
          "heading": "docker-deployment",
          "content": "이슬아에게 그러하듯 그 문장들은 또 누군가에게 전신을 타고 흘러 또 다른 누군가에게 전달된다."
        },
        {
          "heading": "docker-deployment",
          "content": "언어란 질서이자 권위이기 때문이다. 권위를 잘 믿는 이들은 쉽게 속는 자들이기도 하다. 웬만해선 속지 않는 자들도 있다. *그러나 속지 않는 자들은 필연적으로 방황하게 된다. 세계를 송두리째로 이상하게 여기고 만다. 어린 슬아는 선택해야 했다. 속을까 말까."
        },
        {
          "heading": "docker-deployment",
          "content": "9p, *자크 라캉의 말"
        },
        {
          "heading": "docker-deployment",
          "content": "“이것부터 박읍시다.” 낮잠 출판사의 간판이다. 슬아는 맘 편히 못질할 수 있는 집에 한 번도 살아보지 못했다. 현관 앞에 서서 위치를 정하고는 말한다. “여기에 박아주세요.“가녀장의 지령이다. 웅이가 망치를 들고 오더니 벽에 꽝꽝 못질을 한다. 슬아는 카타르시스를 느끼며 그것을 지켜본다."
        },
        {
          "heading": "docker-deployment",
          "content": "16p"
        },
        {
          "heading": "docker-deployment",
          "content": "그들의 딸 이슬아는 성실한 작가로 널리 알려져 있다. 사실 그것은 루머 같은 소문에 가까웠지만, 소문은 사람을 꽤나 바꿔놓는 법이다. 이슬아는 과대평가받음으로써 강제로 조금씩 더 부지런해졌다. 어쨌거나 자정 무렵엔 뭔가를 완성하긴 한다. 시간이 흐르고 이슬아는 글을 쓴다. 자정이 다가올수록 놀라운 속도로 빠르게 쓴다. 그것은 이슬아가 쓰는 글이라기보다는 마감이 쓰는 글이다.…중략”당신들도 성공하고 싶어? 그럼 아침 일찍 일어나서 요가를 해.“"
        }
      ],
      "headings": [
        {
          "id": "1-리포지토리",
          "content": "1. 리포지토리"
        },
        {
          "id": "직육면체의-세부-사항에-집착하는-사람들",
          "content": "직육면체의 세부 사항에 집착하는 사람들"
        },
        {
          "id": "getting-started",
          "content": "Getting Started"
        },
        {
          "id": "mdx-components",
          "content": "MDX Components"
        },
        {
          "id": "content-source",
          "content": "Content Source"
        },
        {
          "id": "root-layout",
          "content": "Root Layout"
        },
        {
          "id": "styles",
          "content": "Styles"
        },
        {
          "id": "layout",
          "content": "Layout"
        },
        {
          "id": "page",
          "content": "Page"
        },
        {
          "id": "search",
          "content": "Search"
        },
        {
          "id": "done",
          "content": "Done"
        },
        {
          "id": "deploying",
          "content": "Deploying"
        },
        {
          "id": "cloudflare",
          "content": "Cloudflare"
        },
        {
          "id": "docker-deployment",
          "content": "Docker Deployment"
        }
      ]
    },
    "body": "var Component=(()=>{var m=Object.create;var r=Object.defineProperty;var E=Object.getOwnPropertyDescriptor;var u=Object.getOwnPropertyNames;var y=Object.getPrototypeOf,F=Object.prototype.hasOwnProperty;var f=(n,e)=>()=>(e||n((e={exports:{}}).exports,e),e.exports),N=(n,e)=>{for(var s in e)r(n,s,{get:e[s],enumerable:!0})},t=(n,e,s,h)=>{if(e&&typeof e==\"object\"||typeof e==\"function\")for(let l of u(e))!F.call(n,l)&&l!==s&&r(n,l,{get:()=>e[l],enumerable:!(h=E(e,l))||h.enumerable});return n};var B=(n,e,s)=>(s=n!=null?m(y(n)):{},t(e||!n||!n.__esModule?r(s,\"default\",{value:n,enumerable:!0}):s,n)),A=n=>t(r({},\"__esModule\",{value:!0}),n);var o=f((D,p)=>{p.exports=_jsx_runtime});var C={};N(C,{default:()=>g});var i=B(o());function k(n){let e={a:\"a\",blockquote:\"blockquote\",br:\"br\",code:\"code\",h1:\"h1\",h2:\"h2\",h3:\"h3\",img:\"img\",li:\"li\",p:\"p\",pre:\"pre\",span:\"span\",strong:\"strong\",ul:\"ul\",...n.components},{BookMarkWrapper:s,EmbededWrapper:h,FileWrapper:l,GoogleDriveWrapper:c,YoutubeWrapper:d}=e;return s||a(\"BookMarkWrapper\",!0),h||a(\"EmbededWrapper\",!0),l||a(\"FileWrapper\",!0),c||a(\"GoogleDriveWrapper\",!0),d||a(\"YoutubeWrapper\",!0),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(e.h1,{id:\"1-\\uB9AC\\uD3EC\\uC9C0\\uD1A0\\uB9AC\",children:\"1. \\uB9AC\\uD3EC\\uC9C0\\uD1A0\\uB9AC\"}),`\n`,(0,i.jsx)(e.p,{children:\"\\uC774 \\uD398\\uC774\\uC9C0\\uB294 \\uC774\\uC2AC\\uC544 \\uC791\\uAC00\\uB2D8\\uC744 \\uB355\\uC9C8\\uD558\\uB294 \\uD398\\uC774\\uC9C0\\uB2E4.\"}),`\n`,(0,i.jsx)(e.p,{children:\"\\uC88B\\uC740 \\uAE00\\uACFC \\uAE30\\uC0AC\\uC640 \\uC778\\uD130\\uBDF0\\uB4F1\\uC744 \\uAE30\\uB85D\\uD574\\uB454\\uB2E4.\"}),`\n`,(0,i.jsx)(d,{names:\"video\",urls:\"https://youtu.be/aHim5RDYelc\"}),`\n`,(0,i.jsx)(e.p,{children:(0,i.jsx)(e.img,{alt:\"1829050.png\",src:\"https://res.cloudinary.com/dyrdul1dd/image/upload/v1754654031/norkive-notion-images/1754654030624-1829050.png\",width:\"512\",height:\"512\"})}),`\n`,(0,i.jsx)(l,{names:\"\\u110C\\u1162\\u1102\\u1173\\u11BC_\\u110B\\u1175\\u11BB\\u1102\\u1173\\u11AB_\\u110E\\u1165\\u11A8_\\u1112\\u1161\\u110C\\u1175_\\u110B\\u1161\\u11AD\\u1100\\u1175.pdf\",urls:\"https://prod-files-secure.s3.us-west-2.amazonaws.com/056ff9f5-a9ef-486f-8acb-9eef51d06a2d/8af3ba94-b700-445f-971d-cce8a4b44dcd/%E1%84%8C%E1%85%A2%E1%84%82%E1%85%B3%E1%86%BC_%E1%84%8B%E1%85%B5%E1%86%BB%E1%84%82%E1%85%B3%E1%86%AB_%E1%84%8E%E1%85%A5%E1%86%A8_%E1%84%92%E1%85%A1%E1%84%8C%E1%85%B5_%E1%84%8B%E1%85%A1%E1%86%AD%E1%84%80%E1%85%B5.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QKXL3CBJ%2F20250808%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250808T115347Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJHMEUCIQDLkEJXtF47SCOYrc04fDNeBJoXa5yMG%2BQy4AT54xZH5QIgcnvxNBGDHsx8oAOOoX77hGXLrQLrYnGjSoCDVZa04P8qiAQIpf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLDAdI%2Fs2VzbVFuelSrcAxE7H4BpKZVJmvarcdWtyvQAMvE6fkWfG%2FyKL6GVK1zObwKyWnQBoUIlqqGFIAvBiZMRr90Qt45BiVPkcGXvPxkVZlqZIVsy%2BrBCR54Rx1m9eyjyTiMbZW%2B5yCqa4FK3%2BXMzRDpTRSBXOr617N86onqIY%2BsjecxelO4NcBHqi0ZiNtj8QXHnAhb949bFdJGCBaZKnHPBOBd5c7F5BC0%2BLyquJzuHPgCjxKtH%2FvETF2NVhmpkFQNSH8PJR3%2BOYG8fE8eUJO%2FzknO5h%2B6A%2BVzuLTMUd1EDhlaw1JLSSLdr0KUT21fOcJEjzTOHzYgG1Y5XEVXHRqcp7xR9hhhVKz%2BtVDdYgprAYcL80%2FouYTSQhysr1FKim9CpCLgcnWkiuYL0WpSyydqsCoWD3pVfvwGKzo%2BhUpNtIdiLdXsYhJ9oNiGvNyKYzWrZ38%2BX6TIfAmKoRxPW%2FVz7elni%2Fk4rwvoftfqDlcAM1ByK%2FqLrBnA4ZDWQoiKC7mMpBx40IJSlI6REuy1dF7onUaXpr7qDKUeC1OGLRAM%2FEfE1GLjY6QVmZGCjU9Xi3crX7tx4fy7tcm5X7U3fXt8LKgtzhiisyn6slJOKQyM%2FouaC3iKEoIZpTTivM1f%2BY%2FgYu8t11mNgMKzB18QGOqUBtBVh6jBibZpEBhSclc7uEj0wJw%2Fd33nvw0NQ%2BSP1Pr79DVgYDQaOouyVT2HFrVK3zIXSaBiWii5A%2Fg7GCfiMdTFIM%2FT9kWtU2gjK4oD5VZ0zMfyprNLDNSsVEohZ7cpEXNJghD%2BSKCY4a8i5XVvrPg6Y0bOfkA%2FrpqnJNLZ%2BRuMiAPV%2B%2BKBFwJQnY1iLZO2%2FzdutpUS0sP4voB1xQ95yeT9L3JDC&X-Amz-Signature=4cad3e1aee91ee965955d5cd467616a6e1df1e9477985cd4860af16b135679ab&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject\"}),`\n`,(0,i.jsx)(c,{names:\"https://drive.google.com/file/d/1fSWnZgDbUmFb86MgGNiiLX6G8TkqOhiI/view\",urls:\"https://drive.google.com/file/d/1fSWnZgDbUmFb86MgGNiiLX6G8TkqOhiI/view\"}),`\n`,(0,i.jsx)(s,{names:\"bookmark\",urls:\"https://www.hani.co.kr/arti/society/society_general/981552.html\"}),`\n`,(0,i.jsxs)(e.p,{children:[\"\\uC774 \\uD5E4\\uC774\\uD0DD\\uC2DC(Full Stack Uber Clone Web App)\\uB294\\xA0\",(0,i.jsx)(e.a,{href:\"https://youtu.be/1DXV4LCWkic?list=PLzRr9la40O_RQIXxWO_VNmA8y9qRUeuK9\",children:\"React NextJs 13 Taxi Booking App : NextJs 13, Tailwind Css, Typescript, Mapbox, Stripe | Full Course\"}),\"\\uC720\\uD29C\\uBE0C\\uAC15\\uC758\\uB97C \\uCC38\\uACE0\\uD558\\uC5EC \\uC5D0\\uB7EC\\uC0AC\\uD56D\\uACFC \\uC791\\uC5C5\\uB0A0\\uC9DC \\uAE30\\uC900 deprecated\\uB41C \\uBD80\\uBD84 \\uBC0F \\uBBF8\\uD761\\uD55C \\uBD80\\uBD84, \\uADF8\\uB9AC\\uACE0 \\uD55C\\uAD6D\\uC5D0\\uC11C \\uC9C0\\uC6D0\\uB418\\uC9C0 \\uC54A\\uB294 \\uBD80\\uBD84\\uC5D0 \\uB300\\uD55C \\uC774\\uC288\\uB4E4\\uC744 \\uBCF4\\uAC15\\uD558\\uACE0 \\uC218\\uC815\\uD558\\uACE0 \\uCEE4\\uC2A4\\uD130\\uB9C8\\uC774\\uC9D5\\uD558\\uC5EC \\uC81C\\uC791\\uD55C \\uC6F9\\uC571\\uC785\\uB2C8\\uB2E4.\"]}),`\n`,(0,i.jsx)(l,{names:\"English_Study_Material.docx\",urls:\"https://prod-files-secure.s3.us-west-2.amazonaws.com/056ff9f5-a9ef-486f-8acb-9eef51d06a2d/712d8a65-d4a0-4226-941b-2d5981b55779/English_Study_Material.docx?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QKXL3CBJ%2F20250808%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250808T115347Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJHMEUCIQDLkEJXtF47SCOYrc04fDNeBJoXa5yMG%2BQy4AT54xZH5QIgcnvxNBGDHsx8oAOOoX77hGXLrQLrYnGjSoCDVZa04P8qiAQIpf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLDAdI%2Fs2VzbVFuelSrcAxE7H4BpKZVJmvarcdWtyvQAMvE6fkWfG%2FyKL6GVK1zObwKyWnQBoUIlqqGFIAvBiZMRr90Qt45BiVPkcGXvPxkVZlqZIVsy%2BrBCR54Rx1m9eyjyTiMbZW%2B5yCqa4FK3%2BXMzRDpTRSBXOr617N86onqIY%2BsjecxelO4NcBHqi0ZiNtj8QXHnAhb949bFdJGCBaZKnHPBOBd5c7F5BC0%2BLyquJzuHPgCjxKtH%2FvETF2NVhmpkFQNSH8PJR3%2BOYG8fE8eUJO%2FzknO5h%2B6A%2BVzuLTMUd1EDhlaw1JLSSLdr0KUT21fOcJEjzTOHzYgG1Y5XEVXHRqcp7xR9hhhVKz%2BtVDdYgprAYcL80%2FouYTSQhysr1FKim9CpCLgcnWkiuYL0WpSyydqsCoWD3pVfvwGKzo%2BhUpNtIdiLdXsYhJ9oNiGvNyKYzWrZ38%2BX6TIfAmKoRxPW%2FVz7elni%2Fk4rwvoftfqDlcAM1ByK%2FqLrBnA4ZDWQoiKC7mMpBx40IJSlI6REuy1dF7onUaXpr7qDKUeC1OGLRAM%2FEfE1GLjY6QVmZGCjU9Xi3crX7tx4fy7tcm5X7U3fXt8LKgtzhiisyn6slJOKQyM%2FouaC3iKEoIZpTTivM1f%2BY%2FgYu8t11mNgMKzB18QGOqUBtBVh6jBibZpEBhSclc7uEj0wJw%2Fd33nvw0NQ%2BSP1Pr79DVgYDQaOouyVT2HFrVK3zIXSaBiWii5A%2Fg7GCfiMdTFIM%2FT9kWtU2gjK4oD5VZ0zMfyprNLDNSsVEohZ7cpEXNJghD%2BSKCY4a8i5XVvrPg6Y0bOfkA%2FrpqnJNLZ%2BRuMiAPV%2B%2BKBFwJQnY1iLZO2%2FzdutpUS0sP4voB1xQ95yeT9L3JDC&X-Amz-Signature=1aa98c5ebd18b62d9f892f145fe62ad1929026956e517196d4b422633d11b6b5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject\"}),`\n`,(0,i.jsx)(l,{names:\"0228.rtf\",urls:\"https://prod-files-secure.s3.us-west-2.amazonaws.com/056ff9f5-a9ef-486f-8acb-9eef51d06a2d/e0dded5d-f791-4b9d-b96c-df6e939888f2/0228.rtf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QKXL3CBJ%2F20250808%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250808T115347Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJHMEUCIQDLkEJXtF47SCOYrc04fDNeBJoXa5yMG%2BQy4AT54xZH5QIgcnvxNBGDHsx8oAOOoX77hGXLrQLrYnGjSoCDVZa04P8qiAQIpf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLDAdI%2Fs2VzbVFuelSrcAxE7H4BpKZVJmvarcdWtyvQAMvE6fkWfG%2FyKL6GVK1zObwKyWnQBoUIlqqGFIAvBiZMRr90Qt45BiVPkcGXvPxkVZlqZIVsy%2BrBCR54Rx1m9eyjyTiMbZW%2B5yCqa4FK3%2BXMzRDpTRSBXOr617N86onqIY%2BsjecxelO4NcBHqi0ZiNtj8QXHnAhb949bFdJGCBaZKnHPBOBd5c7F5BC0%2BLyquJzuHPgCjxKtH%2FvETF2NVhmpkFQNSH8PJR3%2BOYG8fE8eUJO%2FzknO5h%2B6A%2BVzuLTMUd1EDhlaw1JLSSLdr0KUT21fOcJEjzTOHzYgG1Y5XEVXHRqcp7xR9hhhVKz%2BtVDdYgprAYcL80%2FouYTSQhysr1FKim9CpCLgcnWkiuYL0WpSyydqsCoWD3pVfvwGKzo%2BhUpNtIdiLdXsYhJ9oNiGvNyKYzWrZ38%2BX6TIfAmKoRxPW%2FVz7elni%2Fk4rwvoftfqDlcAM1ByK%2FqLrBnA4ZDWQoiKC7mMpBx40IJSlI6REuy1dF7onUaXpr7qDKUeC1OGLRAM%2FEfE1GLjY6QVmZGCjU9Xi3crX7tx4fy7tcm5X7U3fXt8LKgtzhiisyn6slJOKQyM%2FouaC3iKEoIZpTTivM1f%2BY%2FgYu8t11mNgMKzB18QGOqUBtBVh6jBibZpEBhSclc7uEj0wJw%2Fd33nvw0NQ%2BSP1Pr79DVgYDQaOouyVT2HFrVK3zIXSaBiWii5A%2Fg7GCfiMdTFIM%2FT9kWtU2gjK4oD5VZ0zMfyprNLDNSsVEohZ7cpEXNJghD%2BSKCY4a8i5XVvrPg6Y0bOfkA%2FrpqnJNLZ%2BRuMiAPV%2B%2BKBFwJQnY1iLZO2%2FzdutpUS0sP4voB1xQ95yeT9L3JDC&X-Amz-Signature=b7571b5fd4d817c008e72539f595d0e7fceea893c020a87cdeea58472be6e567&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject\"}),`\n`,(0,i.jsx)(e.p,{children:(0,i.jsx)(e.a,{href:\"https://cookie-monster-color.figma.site/\",children:\"https://cookie-monster-color.figma.site/\"})}),`\n`,(0,i.jsx)(h,{names:\"embed\",urls:\"https://cookie-monster-color.figma.site/\"}),`\n`,(0,i.jsx)(e.p,{children:(0,i.jsx)(e.a,{href:\"https://www.notion.so/22f1eb5c033780dea089c5ea32034619\",children:`\\uAD81\\uADF9\\uC758 \\uC544\\uD0A4\\uD14D\\uCC98 \\uB85C\\uB4DC\\uB9F5: Notion \\u2192 MDX \\u2192 \\uC815\\uC801 \\uBE14\\uB85C\\uADF8\n`})}),`\n`,(0,i.jsx)(e.p,{children:(0,i.jsx)(e.a,{href:\"https://ryoonwithwisdomtrees.notion.site/Notion-MDX-22f1eb5c033780dea089c5ea32034619\",children:\"https://ryoonwithwisdomtrees.notion.site/Notion-MDX-22f1eb5c033780dea089c5ea32034619?source=copy_link\"})}),`\n`,(0,i.jsxs)(\"details\",{children:[(0,i.jsxs)(\"summary\",{children:[\"\\uD55C\\uACA8\\uB808,2021-02-03, \",(0,i.jsx)(\"strong\",{children:\"\\uC774\\uC2AC\\uC544 \\u201C\\uBD80\\uBAA8\\uC5D0\\uAC8C \\uBC30\\uC6B4 \\uC0DD\\uACC4\\uC758 \\uCC45\\uC784\\uAC10\\u2026\\uBA85\\uB791\\uD558\\uACE0 \\uD68C\\uBCF5\\uB825 \\uC788\\uB294 \\uAE00 \\uC4F0\\uACE0 \\uC2F6\\uB2E4\\u201D\"})]}),(0,i.jsx)(s,{names:\"bookmark\",urls:\"https://www.hani.co.kr/arti/society/society_general/981552.html\"}),(0,i.jsxs)(e.blockquote,{children:[`\n`,(0,i.jsx)(e.p,{children:\"92\\uB144\\uC0DD \\uC791\\uAC00 \\uC774\\uC2AC\\uC544\\uB294 \\uC9C0\\uAE08 \\uAC19\\uC740 \\uC138\\uB300 \\uB3C5\\uC790\\uB4E4\\uC5D0\\uAC8C \\uB9CE\\uC740 \\uC9C0\\uC9C0\\uB97C \\uBC1B\\uB294 \\uC791\\uAC00 \\uC911 \\uD55C\\uBA85\\uC774\\uB2E4. \\uAE30\\uC874\\uC758 \\uB4F1\\uB2E8 \\uBC29\\uC2DD \\uB4F1 \\uAD8C\\uC704\\uC640 \\uAD00\\uD589\\uC758 \\uACBD\\uB85C\\uB97C \\uB530\\uB77C\\uAC00\\uB294 \\uB300\\uC2E0 2018\\uB144 \\u2018\\uC77C\\uAC04 \\uC774\\uC2AC\\uC544\\u2019\\uB77C\\uB294 \\uAD6C\\uB3C5\\uD615 \\uC5F0\\uC7AC\\uB97C \\uC2DC\\uC791\\uD574 \\uB9E4\\uC77C 0\\uC2DC \\uB3C5\\uC790\\uB97C \\uC9C1\\uC811 \\uCC3E\\uC544\\uAC00\\uB294 \\uC0B0\\uBB38\\uC73C\\uB85C \\uD070 \\uD638\\uC751\\uC744 \\uC5BB\\uC5C8\\uB2E4. \\uC774 \\uC791\\uAC00\\uC758 \\uB9D0\\uB300\\uB85C \\uAD8C\\uC704\\uC5D0 \\uB300\\uD55C \\uC800\\uD56D\\uC774\\uB77C\\uAE30\\uBCF4\\uB2E4 \\uD559\\uC790\\uAE08 \\uB300\\uCD9C \\uC0C1\\uD658\\uC774\\uB77C\\uB294 \\uC8FC\\uC5B4\\uC9C4 \\uACFC\\uC81C\\uB97C \\uD480\\uAE30 \\uC704\\uD55C \\uD574\\uACB0\\uCC45\\uC774\\uC5C8\\uACE0, \\uADF8\\uB97C \\uC9C0\\uAE08\\uAE4C\\uC9C0 \\u2018\\uC5F0\\uC7AC\\uB178\\uB3D9\\uC790\\u2019\\uB85C \\uC790\\uB9AC\\uB9E4\\uAE40\\uD558\\uAC8C \\uD55C \\uC6D0\\uB3D9\\uB825\\uC774 \\uB418\\uC5C8\\uB2E4. \\u2018\\uC77C\\uAC04 \\uC774\\uC2AC\\uC544\\u2019\\uC758 \\uCCAB \\uC2DC\\uC98C \\uC5F0\\uC7AC\\uB97C \\uB05D\\uB0B8 \\uB4A4 \\uADF8\\uB294 \\u2018\\uD5E4\\uC5C4\\uCD9C\\uD310\\uC0AC\\u2019 \\uB300\\uD45C\\uB77C\\uB294 \\uBA85\\uD568\\uC744 \\uD558\\uB098 \\uB354 \\uCD94\\uAC00\\uD588\\uACE0, \\uC774\\uACF3\\uC5D0\\uC11C \\uB098\\uC628 \\uCC45 5\\uC885\\uC774 \\uC9C0\\uAE08\\uAE4C\\uC9C0 10\\uB9CC\\uBD80 \\uAC00\\uAE4C\\uC774 \\uD314\\uB838\\uB2E4. \\uADF8 \\uBC16\\uC5D0\\uB3C4 \\uB77C\\uB514\\uC624 \\uB514\\uC81C\\uC774, \\uBBA4\\uC9C0\\uC158\\uC73C\\uB85C \\uD65C\\uB3D9 \\uC601\\uC5ED\\uC744 \\uB113\\uD600\\uC624\\uBA70 \\uC62C\\uD574\\uC5D0\\uB294 \\uC804\\uBC29\\uC704 \\uC608\\uC220\\uAC00\\uB85C \\uC880 \\uB354 \\uD65C\\uB3D9 \\uC601\\uC5ED\\uC744 \\uB113\\uD788\\uACE0\\uC790 \\uBC1C\\uAC78\\uC74C\\uC744 \\uBC14\\uC090 \\uC6C0\\uC9C1\\uC774\\uACE0 \\uC788\\uB2E4. \\uC9C0\\uB09C 1\\uC77C\\uBD80\\uD130 \\u2018\\uC77C\\uAC04 \\uC774\\uC2AC\\uC544\\u2019 2021\\uB144 \\uACA8\\uC6B8\\uD638 \\uC5F0\\uC7AC\\uB97C \\uC7AC\\uAC1C\\uD55C \\uC774\\uC2AC\\uC544 \\uC791\\uAC00\\uB97C \\uC9C0\\uB09C\\uB2EC 29\\uC77C \\uC11C\\uC6B8 \\uC11C\\uAD50\\uB3D9 \\uCE74\\uD398\\uC5D0\\uC11C \\uB9CC\\uB098 \\u2018\\uCC45\\uC784\\uC9C0\\uB294 \\uC0B6\\u2019\\uC5D0 \\uB300\\uD55C \\uC774\\uC57C\\uAE30\\uB97C \\uB4E4\\uC5C8\\uB2E4.\"}),`\n`,(0,i.jsxs)(e.p,{children:[(0,i.jsx)(e.strong,{children:\"\\u2015\\uC131\\uC778\\uC774 \\uB41C \\uC774\\uD6C4 \\uB298 \\u2018\\uD22C\\uC7A1\\u2019\\uC774\\uB098 \\u2018\\uC4F0\\uB9AC\\uC7A1\\u2019\\uC744 \\uC720\\uC9C0\\uD574\\uC654\\uB2E4\\uACE0 \\uBC1D\\uD614\\uACE0, \\u2018\\uC77C\\uAC04 \\uC774\\uC2AC\\uC544\\u2019 \\uC2DC\\uC791\\uACFC \\uD568\\uAED8 \\u2018\\uC5F0\\uC7AC\\uB178\\uB3D9\\uC790\\u2019\\uB85C \\uD65C\\uB3D9\\uD558\\uBA74\\uC11C \\uB77C\\uB514\\uC624 \\uB514\\uC81C\\uC774, \\uC74C\\uC545 \\uD65C\\uB3D9\\uAE4C\\uC9C0 \\uB2E4\\uC591\\uD55C \\uC77C\\uC744 \\uD574\\uC654\\uB2E4. \\uD604\\uC7AC \\uD558\\uB294 \\uC77C\\uC740 \\uC5B4\\uB5A4 \\uAC8C \\uC788\\uB098?\"}),(0,i.jsx)(e.br,{}),`\n`,\"\\u201C\\uBA54\\uC778\\uC740 \\uC5F0\\uC7AC\\uB97C \\uD558\\uB294 \\uC9D1\\uD544 \\uC791\\uAC00\\uC774\\uACE0 \\uB450\\uBC88\\uC9F8\\uB294 \\u2018\\uD5E4\\uC5C4\\uCD9C\\uD310\\uC0AC\\u2019\\uC758 \\uB300\\uD45C \\uC77C\\uC774\\uB2E4. \\uC138\\uBC88\\uC9F8\\uB294 \\uC77C\\uC8FC\\uC77C\\uC5D0 \\uD55C\\uBC88\\uC529 \\uD558\\uB294 \\uAE00\\uC4F0\\uAE30 \\uAD50\\uC0AC \\uC77C\\uC774\\uB2E4. \\uC9C0\\uAE08\\uC740 \\uB3C4\\uC2DC\\uD615 \\uB300\\uC548\\uD559\\uAD50\\uC5D0\\uC11C \\uC911\\uACE0\\uB4F1 \\uCCAD\\uC18C\\uB144\\uC744 \\uAC00\\uB974\\uCE58\\uACE0 \\uC9C1\\uC811 \\uBAA8\\uC9D1\\uD55C \\uB3D9\\uB124 \\uCD08\\uB4F1\\uD559\\uAD50 \\uC544\\uC774\\uB4E4\\uB3C4 \\uAC00\\uB974\\uCE5C\\uB2E4. \\uC9D1\\uC5D0\\uC11C \\uAC00\\uB974\\uCE58\\uB2E4\\uAC00 \\uCF54\\uB85C\\uB098 \\uD655\\uC0B0 \\uB54C\\uBB38\\uC5D0 \\uC90C \\uC218\\uC5C5\\uC744 \\uD558\\uACE0 \\uC788\\uB2E4. <\\uAD50\\uC721\\uBC29\\uC1A1>(EBS) \\uB77C\\uB514\\uC624 \\u2018\\uC774\\uC2A4\\uB77C\\uB514\\uC624\\u2019\\uB97C 100\\uD68C\\uB85C \\uCD5C\\uADFC \\uB9C8\\uBB34\\uB9AC\\uD588\\uB2E4. \\uD63C\\uC790, \\uADF8\\uB9AC\\uACE0 \\uB3D9\\uC0DD \\uC774\\uCC2C\\uD76C\\uC640 \\uB290\\uC2A8\\uD55C \\uD300\\uC73C\\uB85C \\uC74C\\uC545 \\uC791\\uC5C5\\uB3C4 \\uBE44\\uC815\\uAE30\\uC801\\uC73C\\uB85C \\uD558\\uACE0 \\uC788\\uB2E4. \\uC0C8\\uD574\\uC758 \\uBCC0\\uD654 \\uC911 \\uD558\\uB098\\uB294 \\uB450\\uB8E8\\uB450\\uB8E8\\uC544\\uD2F0\\uC2A4\\uD2B8\\uCEF4\\uD37C\\uB2C8\\uC5D0 \\uB4E4\\uC5B4\\uAC04 \\uAC70\\uB2E4. \\uC774 \\uC5ED\\uC2DC \\u2018\\uB290\\uC2A8\\uD55C\\u2019 \\uC18C\\uC18D\\uC0AC\\uB77C\\uACE0 \\uB9D0\\uD560 \\uC218 \\uC788\\uB2E4. \\uC791\\uAC00\\uB85C\\uC11C \\uD558\\uB294 \\uC77C\\uC740 \\uBAA8\\uB450 \\uB0B4\\uAC00 \\uAFB8\\uB824\\uB098\\uAC00\\uACE0 \\uC601\\uC0C1, \\uD654\\uBCF4, \\uC74C\\uC545 \\uC791\\uC5C5 \\uB4F1 \\uB2E4\\uB978 \\uC7A5\\uB974\\uC758 \\uCC3D\\uC791 \\uD65C\\uB3D9\\uC744 \\uD560 \\uB54C \\uB4E0\\uB4E0\\uD558\\uAC8C \\uC9C0\\uC6D0\\uD574\\uC8FC\\uB294 \\uD300\\uC774 \\uC0DD\\uACBC\\uB2E4.\\u201D\"]}),`\n`,(0,i.jsxs)(e.p,{children:[(0,i.jsx)(e.strong,{children:\"\\u2015\\uC131\\uC778\\uC774 \\uB41C \\uC774\\uD6C4 \\uB298 \\u2018\\uD22C\\uC7A1\\u2019\\uC774\\uB098 \\u2018\\uC4F0\\uB9AC\\uC7A1\\u2019\\uC744 \\uC720\\uC9C0\\uD574\\uC654\\uB2E4\\uACE0 \\uBC1D\\uD614\\uACE0, \\u2018\\uC77C\\uAC04 \\uC774\\uC2AC\\uC544\\u2019 \\uC2DC\\uC791\\uACFC \\uD568\\uAED8 \\u2018\\uC5F0\\uC7AC\\uB178\\uB3D9\\uC790\\u2019\\uB85C \\uD65C\\uB3D9\\uD558\\uBA74\\uC11C \\uB77C\\uB514\\uC624 \\uB514\\uC81C\\uC774, \\uC74C\\uC545 \\uD65C\\uB3D9\\uAE4C\\uC9C0 \\uB2E4\\uC591\\uD55C \\uC77C\\uC744 \\uD574\\uC654\\uB2E4. \\uD604\\uC7AC \\uD558\\uB294 \\uC77C\\uC740 \\uC5B4\\uB5A4 \\uAC8C \\uC788\\uB098?\"}),(0,i.jsx)(e.br,{}),`\n`,\"\\u201C\\uBA54\\uC778\\uC740 \\uC5F0\\uC7AC\\uB97C \\uD558\\uB294 \\uC9D1\\uD544 \\uC791\\uAC00\\uC774\\uACE0 \\uB450\\uBC88\\uC9F8\\uB294 \\u2018\\uD5E4\\uC5C4\\uCD9C\\uD310\\uC0AC\\u2019\\uC758 \\uB300\\uD45C \\uC77C\\uC774\\uB2E4. \\uC138\\uBC88\\uC9F8\\uB294 \\uC77C\\uC8FC\\uC77C\\uC5D0 \\uD55C\\uBC88\\uC529 \\uD558\\uB294 \\uAE00\\uC4F0\\uAE30 \\uAD50\\uC0AC \\uC77C\\uC774\\uB2E4. \\uC9C0\\uAE08\\uC740 \\uB3C4\\uC2DC\\uD615 \\uB300\\uC548\\uD559\\uAD50\\uC5D0\\uC11C \\uC911\\uACE0\\uB4F1 \\uCCAD\\uC18C\\uB144\\uC744 \\uAC00\\uB974\\uCE58\\uACE0 \\uC9C1\\uC811 \\uBAA8\\uC9D1\\uD55C \\uB3D9\\uB124 \\uCD08\\uB4F1\\uD559\\uAD50 \\uC544\\uC774\\uB4E4\\uB3C4 \\uAC00\\uB974\\uCE5C\\uB2E4. \\uC9D1\\uC5D0\\uC11C \\uAC00\\uB974\\uCE58\\uB2E4\\uAC00 \\uCF54\\uB85C\\uB098 \\uD655\\uC0B0 \\uB54C\\uBB38\\uC5D0 \\uC90C \\uC218\\uC5C5\\uC744 \\uD558\\uACE0 \\uC788\\uB2E4. <\\uAD50\\uC721\\uBC29\\uC1A1>(EBS) \\uB77C\\uB514\\uC624 \\u2018\\uC774\\uC2A4\\uB77C\\uB514\\uC624\\u2019\\uB97C 100\\uD68C\\uB85C \\uCD5C\\uADFC \\uB9C8\\uBB34\\uB9AC\\uD588\\uB2E4. \\uD63C\\uC790, \\uADF8\\uB9AC\\uACE0 \\uB3D9\\uC0DD \\uC774\\uCC2C\\uD76C\\uC640 \\uB290\\uC2A8\\uD55C \\uD300\\uC73C\\uB85C \\uC74C\\uC545 \\uC791\\uC5C5\\uB3C4 \\uBE44\\uC815\\uAE30\\uC801\\uC73C\\uB85C \\uD558\\uACE0 \\uC788\\uB2E4. \\uC0C8\\uD574\\uC758 \\uBCC0\\uD654 \\uC911 \\uD558\\uB098\\uB294 \\uB450\\uB8E8\\uB450\\uB8E8\\uC544\\uD2F0\\uC2A4\\uD2B8\\uCEF4\\uD37C\\uB2C8\\uC5D0 \\uB4E4\\uC5B4\\uAC04 \\uAC70\\uB2E4. \\uC774 \\uC5ED\\uC2DC \\u2018\\uB290\\uC2A8\\uD55C\\u2019 \\uC18C\\uC18D\\uC0AC\\uB77C\\uACE0 \\uB9D0\\uD560 \\uC218 \\uC788\\uB2E4. \\uC791\\uAC00\\uB85C\\uC11C \\uD558\\uB294 \\uC77C\\uC740 \\uBAA8\\uB450 \\uB0B4\\uAC00 \\uAFB8\\uB824\\uB098\\uAC00\\uACE0 \\uC601\\uC0C1, \\uD654\\uBCF4, \\uC74C\\uC545 \\uC791\\uC5C5 \\uB4F1 \\uB2E4\\uB978 \\uC7A5\\uB974\\uC758 \\uCC3D\\uC791 \\uD65C\\uB3D9\\uC744 \\uD560 \\uB54C \\uB4E0\\uB4E0\\uD558\\uAC8C \\uC9C0\\uC6D0\\uD574\\uC8FC\\uB294 \\uD300\\uC774 \\uC0DD\\uACBC\\uB2E4.\\u201D\"]}),`\n`,(0,i.jsxs)(e.p,{children:[(0,i.jsx)(e.strong,{children:\"\\u20152018\\uB144 \\u2018\\uC77C\\uAC04 \\uC774\\uC2AC\\uC544\\u2019\\uB97C \\uC2DC\\uC791\\uD55C \\uB4A4 \\uC138\\uBC88\\uC9F8 \\uC2DC\\uC98C\\uC744 \\uC9C4\\uD589 \\uC911\\uC774\\uB2E4. \\uC2DC\\uC98C\\uC774 \\uBC14\\uB00C\\uC5B4\\uAC08\\uC218\\uB85D \\uB2EC\\uB77C\\uC9C4 \\uC810\\uC740?\"}),`\n\\u201C\\uCCAB\\uD574\\uC5D0\\uB294 \\uBD04\\uBD80\\uD130 \\uAC00\\uC744\\uAE4C\\uC9C0 \\uC27C \\uC5C6\\uC774 \\uC5F0\\uC7AC\\uB97C \\uD558\\uB2E4 \\uBAB8\\uC774 \\u2018\\uC544\\uC791\\u2019 \\uB098\\uB294 \\uAC78 \\uACBD\\uD5D8\\uD55C \\uB4A4 \\uB2E4\\uC74C\\uD574 \\uC2DC\\uC98C\\uBD80\\uD130\\uB294 \\uC5F0\\uC7AC \\uC8FC\\uAE30\\uB97C \\uC904\\uC774\\uACE0 \\uB9CE\\uC774 \\uC26C\\uB294 \\uAC83\\uC73C\\uB85C \\uD398\\uC774\\uC2A4 \\uC870\\uC808\\uC744 \\uD588\\uB2E4. \\uB0B4\\uC6A9\\uC5D0\\uC11C\\uB294 \\uCCAB \\uC2DC\\uC98C\\uC774 \\uC774\\uC2AC\\uC544\\uB77C\\uB294 \\uC0AC\\uB78C\\uC758 \\uD654\\uB824\\uD55C \\uC7AC\\uB871\\uC794\\uCE58\\uC600\\uB2E4\\uBA74 \\uB450\\uBC88\\uC9F8 \\uC2DC\\uC98C\\uC5D0\\uB294 \\uC778\\uD130\\uBDF0 \\uCF54\\uB108\\uAC00 \\uB4E4\\uC5B4\\uC628 \\uAC8C \\uAC00\\uC7A5 \\uD070 \\uBCC0\\uD654\\uB2E4. \\uB098\\uC640 \\uB0B4 \\uAC00\\uC871, \\uB0B4 \\uCE5C\\uAD6C, \\uB0B4 \\uC560\\uC778 \\uB4F1 \\uBC18\\uACBD 1\\u339E \\uC548\\uC5D0 \\uC788\\uB358 \\uAE00\\uC758 \\uC8FC\\uC81C\\uAC00 \\uC880 \\uB354 \\uBA40\\uB9AC \\uC788\\uB294 \\uC0AC\\uB78C\\uB4E4\\uAE4C\\uC9C0 \\uD655\\uC7A5\\uB41C \\uC148\\uC774\\uB2E4. \\uC774\\uB54C\\uC758 \\uC5F0\\uC7AC \\uAE00 \\uC911 \\uB2E8\\uD589\\uBCF8 <\\uAE68\\uB057\\uD55C \\uC874\\uACBD>\\uC73C\\uB85C \\uBB36\\uC740 \\uC815\\uD61C\\uC724 \\uD53C\\uB514, \\uAE40\\uD55C\\uBBFC \\uC791\\uAC00(\\uC2DC\\uC170\\uD37C\\uB4DC \\uD65C\\uB3D9\\uAC00), \\uC720\\uC9C4\\uBAA9 \\uC2DC\\uC778, \\uAE40\\uC6D0\\uC601 \\uBCC0\\uD638\\uC0AC \\uB4F1\\uC774 \\uADF8\\uB4E4\\uC774\\uB2E4. \\uC774\\uB4E4\\uC774 \\uCC45\\uC73C\\uB85C \\uB9CC\\uB09C \\uC2A4\\uC2B9\\uB4E4\\uC774\\uB77C\\uBA74 \\uC138\\uBC88\\uC9F8 \\uC2DC\\uC98C\\uC5D0\\uB294 \\uCC45\\uC5D0\\uB3C4 \\uB098\\uC624\\uC9C0 \\uC54A\\uACE0 \\uC5D0\\uC2A4\\uC5D4\\uC5D0\\uC2A4(SNS)\\uC5D0\\uB3C4 \\uC5C6\\uB294 \\uC0AC\\uB78C\\uB4E4\\uC744 \\uCC3E\\uC544\\uAC00\\uAE30 \\uC2DC\\uC791\\uD588\\uB2E4. 27\\uB144\\uAC04 \\uC774\\uB300\\uBAA9\\uB3D9\\uBCD1\\uC6D0 \\uC751\\uAE09\\uC2E4\\uC5D0\\uC11C \\uC77C\\uD574\\uC628 \\uCCAD\\uC18C\\uB178\\uB3D9\\uC790 \\uAC19\\uC740 \\uBD84\\uB4E4\\uC774\\uB2E4.`]}),`\n`,(0,i.jsxs)(e.p,{children:[(0,i.jsx)(e.strong,{children:\"\\u2015\\uB098\\uC640 \\uC8FC\\uBCC0\\uC5D0 \\uB300\\uD55C \\uAD00\\uC2EC\\uC758 \\uC678\\uC5F0\\uC774 \\uC810\\uCC28 \\uD655\\uC7A5\\uB41C \\uAC83\\uC73C\\uB85C \\uBCF4\\uC778\\uB2E4.\"}),`\n\\u201C\\uBB35\\uBB35\\uD788 \\uC911\\uC694\\uD55C \\uC77C\\uC744 \\uD558\\uACE0 \\uC788\\uC9C0\\uB9CC \\uB9C8\\uC774\\uD06C\\uB97C \\uAC00\\uC9C0\\uACE0 \\uC788\\uC9C0 \\uC54A\\uC544\\uC11C \\uC798 \\uB4DC\\uB7EC\\uB098\\uC9C0 \\uC54A\\uB294 \\uC911\\uC7A5\\uB144\\uCE35 \\uB178\\uB3D9\\uC790\\uB97C \\uB9CC\\uB098\\uACE0 \\uC2F6\\uC5C8\\uB2E4. \\uD2B9\\uD788 \\uCF54\\uB85C\\uB098 \\uC0AC\\uD0DC\\uB97C \\uACAA\\uC73C\\uBA74\\uC11C \\uB0B4\\uAC00 \\uC9C1\\uC811 \\uD560 \\uC218 \\uC5C6\\uB294 \\uC77C\\uB4E4\\uC744 \\uB300\\uC2E0 \\uD574\\uC8FC\\uB294 \\uC0AC\\uB78C\\uB4E4\\uC758 \\uB3C4\\uC6C0\\uC73C\\uB85C \\uC0B4\\uACE0 \\uC788\\uB2E4\\uB294 \\uC0DD\\uAC01\\uC744 \\uB9CE\\uC774 \\uD588\\uB2E4. \\uCF54\\uB85C\\uB098 \\uC720\\uD589 \\uCD08\\uAE30 \\uB54C \\uB300\\uD615\\uBCD1\\uC6D0 \\uC751\\uAE09\\uC2E4\\uB4E4\\uC774 \\uB09C\\uB9AC\\uD1B5\\uC774\\uC5C8\\uB294\\uB370 \\uC774 \\uC640\\uC911\\uC5D0 \\uADF8\\uB9BC\\uC790\\uCC98\\uB7FC \\uC18C\\uB9AC \\uC5C6\\uC774 \\uC774\\uACF3\\uC744 \\uACC4\\uC18D \\uCE58\\uC6B0\\uB294 \\uC0AC\\uB78C\\uC774 \\uC788\\uC744 \\uAC70\\uB77C\\uB294 \\uAD81\\uAE08\\uC99D\\uC774 \\uB4E4\\uC5C8\\uB2E4. \\uC774\\uD6C4 \\uBC84\\uC12F \\uC7AC\\uBC30 \\uB18D\\uBD80\\uB098 \\uC778\\uC1C4\\uC18C \\uB178\\uB3D9\\uC790, \\uC544\\uD30C\\uD2B8 \\uACC4\\uB2E8\\uC744 \\uCCAD\\uC18C\\uD558\\uB294 \\uB098\\uC758 \\uC678\\uD560\\uBA38\\uB2C8 \\uB4F1 \\uC624\\uB7AB\\uB3D9\\uC548 \\uD55C\\uAC00\\uC9C0 \\uC77C\\uC744 \\uAFB8\\uC900\\uD788 \\uD574\\uC628 \\uBD84\\uB4E4\\uC744 \\uCC3E\\uC544\\uAC00 \\uC774\\uC57C\\uAE30\\uB97C \\uB4E4\\uC5C8\\uB2E4.\\u201D`]}),`\n`,(0,i.jsxs)(e.p,{children:[(0,i.jsx)(e.strong,{children:\"\\u20151\\uC2DC\\uC98C \\uC5F0\\uC7AC \\uB54C \\uC138\\uC6D4\\uD638\\uB098 \\uB3D9\\uBB3C\\uAD8C, \\uACF5\\uC7A5\\uC2DD \\uCD95\\uC0B0 \\uBB38\\uC81C \\uB4F1\\uC758 \\uC774\\uC57C\\uAE30\\uB97C \\uD558\\uBA74 \\uAD6C\\uB3C5\\uC790\\uAC00 \\uB9CE\\uC774 \\uB5A8\\uC5B4\\uC838\\uB098\\uAC04\\uB2E4\\uACE0 \\uD588\\uB294\\uB370 \\uC9C0\\uAE08\\uC740 \\uC5B4\\uB5A4\\uAC00?\"}),`\n\\u201C\\uC870\\uAE08 \\uC815\\uCE58\\uC801\\uC778 \\uC774\\uC57C\\uAE30\\uB97C \\uD558\\uBA74 \\uB5A8\\uC5B4\\uC838\\uB098\\uAC00\\uB294 \\uB3C5\\uC790\\uB4E4\\uC774 \\uC5EC\\uC804\\uD788 \\uC788\\uAE34 \\uD558\\uB2E4. \\uAC00\\uBCCD\\uACE0 \\uC7AC\\uBC0C\\uB294 \\uAE00\\uC744 \\uC77D\\uACE0 \\uC2F6\\uC740\\uB370 \\uC65C \\uC0AC\\uD68C\\uC801\\uC774\\uACE0 \\uC815\\uCE58\\uC801\\uC778 \\uC774\\uC57C\\uAE30\\uB97C \\uD558\\uB290\\uB0D0\\uB294 \\uBC18\\uC751\\uC774\\uB2E4. \\uD558\\uC9C0\\uB9CC \\uBAA8\\uB4E0 \\uAE00\\uC740 \\uC0AC\\uD68C\\uC801\\uC774\\uACE0 \\uC815\\uCE58\\uC801\\uC77C \\uC218\\uBC16\\uC5D0 \\uC5C6\\uC9C0 \\uC54A\\uB098. `,(0,i.jsx)(e.strong,{children:\"\\uB3C5\\uC790\\uB4E4\\uC758 \\uBC18\\uC751\\uC5D0 \\uC77C\\uD76C\\uC77C\\uBE44\\uD558\\uC9C0 \\uC54A\\uB294 \\uAC8C \\u2018\\uC77C\\uAC04 \\uC774\\uC2AC\\uC544\\u2019\\uB97C \\uD558\\uBA74\\uC11C \\uB0B4\\uAC00 \\uD574\\uC628 \\uC5F0\\uC2B5\\uC774\\uAE30\\uB3C4 \\uD558\\uB2E4. \\uB2E4\\uB9CC \\uB0B4\\uAC00 \\uC911\\uC694\\uD558\\uB2E4\\uACE0 \\uC0DD\\uAC01\\uD558\\uB294 \\uC774\\uC57C\\uAE30\\uB97C \\uCE5C\\uC808\\uD558\\uAC8C \\uC804\\uD558\\uAE30 \\uC704\\uD574 \\uB178\\uB825\\uD558\\uB294 \\uC911\\uC774\\uB2E4.\"}),\"\\u201D\"]}),`\n`]})]}),`\n`,(0,i.jsxs)(\"details\",{children:[(0,i.jsxs)(\"summary\",{children:[\"\\uC2DC\\uC0AC\\uC778, 2023-08-23\",(0,i.jsx)(e.a,{href:\"https://www.sisain.co.kr/news/articleView.html?idxno=50788\",children:\" \"}),(0,i.jsx)(e.a,{href:\"https://www.sisain.co.kr/news/articleView.html?idxno=50788\",children:(0,i.jsx)(\"strong\",{children:\"\\uCD9C\\uD310\\uACC4\\uC758 \\uAC15\\uBC15\\uC801\\uC778 \\uC791\\uC5C5\\uC790 \\uB124 \\uBA85\\uC774 \\uBAA8\\uC774\\uBA74?\"})})]}),(0,i.jsx)(e.h3,{id:\"\\uC9C1\\uC721\\uBA74\\uCCB4\\uC758-\\uC138\\uBD80-\\uC0AC\\uD56D\\uC5D0-\\uC9D1\\uCC29\\uD558\\uB294-\\uC0AC\\uB78C\\uB4E4\",children:(0,i.jsx)(\"strong\",{children:\"\\uC9C1\\uC721\\uBA74\\uCCB4\\uC758 \\uC138\\uBD80 \\uC0AC\\uD56D\\uC5D0 \\uC9D1\\uCC29\\uD558\\uB294 \\uC0AC\\uB78C\\uB4E4\"})}),(0,i.jsxs)(e.blockquote,{children:[`\n`,(0,i.jsxs)(e.p,{children:[\"\\uC774\\uC2AC\\uC544 \\uC791\\uAC00\\uC640 \\uC774\\uD6E4 \\uC791\\uAC00\\uC758 \\uCCAB \\uC778\\uC5F0\\uC744 \\uBB18\\uC0AC\\uD55C \\uAE00\\uB3C4 \\uCC45\\uC5D0 \\uB098\\uC628\\uB2E4. \\uB450 \\uC0AC\\uB78C\\uC740 2020\\uB144 \\uC2A4\\uC2B9\\uACFC \\uC81C\\uC790\\uB85C \\uB9CC\\uB0AC\\uB2E4. \",(0,i.jsx)(e.strong,{children:\"\\u2018\\uC2A4\\uC2B9 \\uC911\\uB3C5\\u2019\\uC774\\uB77C\\uACE0 \\uD45C\\uD604\\uD560 \\uC815\\uB3C4\\uB85C \\uBC30\\uC6B0\\uB294 \\uAC78 \\uC88B\\uC544\\uD558\\uB294 \\uC774\\uC2AC\\uC544 \\uC791\\uAC00\"}),\"\\uAC00 \\uC2DC\\uCE74\\uACE0\\uC5D0 \\uC788\\uB294 \\uC774\\uD6E4 \\uC791\\uAC00\\uC5D0\\uAC8C \\uC601\\uC5B4 \\uAC15\\uC2B5\\uC744 \\uBD80\\uD0C1\\uD588\\uB2E4. \\u201C\\uADF8 \\uC2DC\\uAE30\\uC5D0\\uB294 \\uC678\\uAD6D\\uC5B4\\uB97C \\uB108\\uBB34 \\uBC30\\uC6B0\\uACE0 \\uC2F6\\uC5C8\\uB098 \\uBCF4\\uB2E4. \\uC218\\uB2A5\\uC744 \\uC548 \\uBD24\\uAE30 \\uB54C\\uBB38\\uC5D0 \\uC601\\uC5B4\\uB97C \\uC798\\uD574\\uC57C \\uD560 \\uC774\\uC720\\uB3C4 \\uC5C6\\uACE0 \\uC791\\uAC00\\uAC00 \\uD1A0\\uC775\\xB7\\uD1A0\\uD50C\\uC744 \\uD560 \\uC774\\uC720\\uB3C4 \\uC5C6\\uC5C8\\uB2E4. \\uBAA8\\uAD6D\\uC5B4\\uB97C \\uC880 \\uC0C8\\uB86D\\uAC8C \\uB290\\uB07C\\uACE0 \\uC2F6\\uC5B4\\uC11C \\uBC30\\uC6E0\\uB2E4. (\\uC774\\uD6E4 \\uC791\\uAC00\\uC758) \\uB77C\\uB514\\uC624 \\uC778\\uD130\\uBDF0\\uB97C \\uB4E3\\uB294\\uB370 \",(0,i.jsx)(e.strong,{children:\"\\uC601\\uC5B4\\uB97C \\uC544\\uB984\\uB2F5\\uAC8C \\uAD6C\\uC0AC\\uD558\\uAE38\\uB798 \\uC774\\uB807\\uAC8C \\uB9D0\\uD558\\uB294 \\uC0AC\\uB78C\\uC5D0\\uAC8C \\uC678\\uAD6D\\uC5B4\\uB97C \\uBC30\\uC6B0\\uACE0 \\uC2F6\\uB2E4\\uACE0 \\uC0DD\\uAC01\\uD588\\uB2E4\"}),\".\\u201D \\uC774\\uC2AC\\uC544 \\uC791\\uAC00\\uB294 \\uD654\\uC0C1 \\uC601\\uC5B4 \\uC218\\uC5C5 \\uC2DC\\uC138\\uB97C \\uC870\\uC0AC\\uD55C \\uB4A4 \\uC801\\uC808\\uD55C \\uAC00\\uACA9\\uB3C4 \\uC81C\\uC548\\uD588\\uB2E4. \\uD3C9\\uC18C \\uC791\\uAC00\\uC758 \\uCC45\\uC744 \\uC88B\\uC544\\uD558\\uACE0 \\uADF8\\uC758 \\uD589\\uBCF4\\uB97C \\uC751\\uC6D0\\uD558\\uACE0 \\uC788\\uB358 \\uC774\\uD6E4 \\uC791\\uAC00\\uB85C\\uC11C\\uB3C4 \\uB0AF\\uC120 \\uACBD\\uD5D8\\uC774\\uC5C8\\uB2E4. \\u201C\\uB3D9\\uB8CC\\uB4E4\\uC774 \\uC11C\\uB85C\\uC758 \\uC791\\uC5C5\\uC744 \\uC88B\\uC544\\uD574\\uC11C \\uC798 \\uC9C0\\uB0BC \\uC218\\uB294 \\uC788\\uB294\\uB370 \\uC601\\uC5B4\\uB97C \\uAC00\\uB974\\uCCD0\\uB2EC\\uB77C\\uACE0\\uB294 \\uD558\\uC9C0 \\uC54A\\uB294\\uB2E4. \\uCC98\\uC74C \\uBC1B\\uC544\\uBCF8 \\uBD80\\uD0C1\\uC774\\uC5C8\\uB2E4(\\uC6C3\\uC74C).\\u201D\",(0,i.jsx)(e.br,{}),`\n`,`\\uADF8\\uB807\\uAC8C \\uC774\\uC2AC\\uC544 \\uC791\\uAC00\\uB294 \\u2018\\uB9CC\\uC838\\uBCF4\\uC9C0 \\uC54A\\uC740 \\uC0AC\\uB78C\\u2019\\uACFC \\uB09C\\uC0DD\\uCC98\\uC74C \\uC808\\uCE5C\\uC774 \\uB418\\uC5C8\\uB2E4. \\uB450\\uC138 \\uC2DC\\uAC04 \\uC774\\uC5B4\\uC9C4 \\uB300\\uD654\\uC5D0\\uC11C \\uC601\\uC5B4\\uB85C \\uB9D0\\uD55C \\uAC74 \\uD55C \\uC2DC\\uAC04 \\uC815\\uB3C4\\uB2E4. 17\\uB144\\uAC04 \\uC678\\uAD6D\\uC5D0\\uC11C \\uC0DD\\uD65C\\uD558\\uACE0 \\uC774\\uBBFC\\uC790 \\uC815\\uCCB4\\uC131\\uC774 \\uC9D9\\uC5C8\\uB358 \\uC774\\uD6E4 \\uC791\\uAC00\\uC5D0\\uAC8C\\uB3C4 \\uC77C\\uC0C1\\uC801\\uC778 \\uD55C\\uAD6D\\uC5B4 \\uB300\\uD654\\uAC00 \\uC808\\uC2E4\\uD588\\uB2E4. \\uC0AC\\uACE0\\uD558\\uB294 \\uD55C\\uAD6D\\uC5B4\\uC640 \\uBC1C\\uD654\\uD558\\uB294 \\uD55C\\uAD6D\\uC5B4 \\uC0AC\\uC774\\uC5D0 \\uAC2D\\uC774 \\uC788\\uC5C8\\uB2E4. \\uB458 \\uC0AC\\uC774\\uB97C \\uC787\\uB294 \\uB2E4\\uB9AC\\uAC00 \\uBD80\\uC11C\\uC838 \\uC788\\uB294 \\uB290\\uB08C\\uC774\\uC5C8\\uB2E4. \\u201C\\uC601\\uC5B4\\uAC00 \\uB298\\uC5B4\\uAC00\\uB294 \\uACFC\\uC815\\uB3C4 \\uC7AC\\uBBF8\\uC788\\uC5C8\\uC9C0\\uB9CC \\uD55C\\uAD6D\\uC5B4\\uAC00 \\uD1F4\\uD654\\uD55C \\uC0AC\\uB78C\\uC758 \\uC5B8\\uC5B4\\uB97C \\uBCF4\\uB294 \\uAC83\\uB3C4 \\uC7AC\\uBBF8\\uC788\\uC5C8\\uB2E4. \\uD55C\\uAD6D\\uC5B4\\uB85C \\uC804\\uC2DC\\uB97C \\uC124\\uBA85\\uD558\\uB294 \\uC790\\uB9AC\\uB294 \\uC880 \\uC788\\uC5C8\\uAE30 \\uB54C\\uBB38\\uC5D0 \\uC544\\uCE74\\uB370\\uBBF9\\uD55C \\uD55C\\uAD6D\\uC5B4\\uB9CC \\uB0A8\\uB354\\uB77C. \\uC12D\\uC12D\\uD558\\uAE30\\uB3C4 \\uD588\\uB2E4. \\uC544\\uBB34\\uB9AC \\uCE5C\\uD574\\uC838\\uB3C4 \\uB531\\uB531\\uD558\\uACE0 \\uC608\\uC758 \\uBC14\\uB974\\uAC8C \\uB9D0\\uD558\\uB294 \\uB290\\uB08C\\uC774\\uC5C8\\uB2E4. \\uCE5C\\uD55C \\uC0AC\\uC774\\uC5D0 \\uD560 \\uC218 \\uC788\\uB294 \\uB18D\\uB2F4\\uC744 \\uD588\\uB294\\uB370\\uB3C4 \\u2018\\uADF8\\uB807\\uAC8C \\uB9D0\\uD574\\uC900\\uB2E4\\uB2C8 \\uC815\\uB9D0 \\uAE30\\uC058\\uB2E4\\u2019 \\uC774\\uB7F0 \\uC2DD\\uC73C\\uB85C \\uB2F5\\uD588\\uB2E4(\\uC774\\uC2AC\\uC544).\\u201D\n\\uADF8 \\uD48D\\uACBD\\uC774 \\u2018\\uC644\\uBCBD\\uD55C \\uC740\\uC720\\u2019\\uCC98\\uB7FC \\uB290\\uAEF4\\uC84C\\uB2E4. \\u201C`,(0,i.jsx)(e.strong,{children:\"\\uC778\\uC0DD\\uC744 \\uC0B4 \\uB54C\\uB3C4 \\uB0B4 \\uC548\\uC5D0\\uC11C \\uAE38\\uC5B4 \\uC62C\\uB9B0 \\uBB54\\uAC00\\uB97C \\uC138\\uC0C1\\uC5D0 \\uB358\\uC9C0\\uACE0 \\uB098\\uBA74 \\uC774\\uD6C4\\uC758 \\uC77C\\uC740 \\uB0B4 \\uC190\\uC744 \\uB5A0\\uB09C\\uB2E4. \\uB098\\uB97C \\uB5A0\\uB09C \\uC774\\uC57C\\uAE30\\uAC00 \\uB0B4 \\uC55E\\uC5D0 \\uD3BC\\uCCD0\\uC9C0\\uAE30\\uB3C4 \\uD558\\uACE0 \\uADF8\\uAC83\\uC774 \\uB3CC\\uC544\\uC624\\uAE30\\uB3C4 \\uD55C\\uB2E4. \\uC6B0\\uB9AC\\uAC00 \\uB05D\\uB0B4\\uC900\\uB2E4\\uACE0 \\uB9D0\\uD558\\uB294 \\uC21C\\uAC04\\uB4E4\\uC744 \\uB300\\uBCC0\\uD558\\uB294 \\uC740\\uC720 \\uAC19\\uC558\\uB2E4.\\u201D\"}),\" \\uC77C\\uBCF8\\uC5B4\\uB97C \\uBAB0\\uB77C \\uBC88\\uC5ED \\uC571\\uC5D0 \\uC758\\uC9C0\\uD574, \\uCC45\\uC5D0 \\uB4E4\\uC5B4\\uAC08 \\uC911\\uC694\\uD55C \\uC791\\uC5C5\\uC744 \\uD558\\uACE0 \\uC2F6\\uC740\\uB370 \\u2018\\uB4E4\\uC5B4\\uC640 \\uC904 \\uC218 \\uC788\\uB290\\uB0D0\\u2019\\uACE0 \\uC138 \\uC18C\\uB144\\uC5D0\\uAC8C \\uBB3C\\uC5B4\\uBCF4\\uC558\\uB2E4. \\uADF8\\uB807\\uAC8C \\uC9E7\\uC740 \\uBA38\\uB9AC\\uC758 \\uC138 \\uC18C\\uB144\\uC774 \\uD45C\\uC9C0\\uC5D0 \\uC2E4\\uB838\\uB2E4.\"]}),`\n`,(0,i.jsxs)(e.p,{children:['\\uCC45 \\uB9CC\\uB4DC\\uB294 \\uACFC\\uC815\\uC740 \\u2018\\uB108\\uBB34 \\uC218\\uC6D4\\uD55C \\uB3D9\\uC2DC\\uC5D0 \\uB108\\uBB34 \\uCE58\\uC5F4\\u2019\\uD588\\uB2E4. \\uD310\\uD615, \\uC885\\uC774\\uC758 \\uC9C8\\uAC10, \\uB450\\uAED8, \\uAC00\\uACA9, \\uC0AC\\uC9C4\\uC758 \\uBC1D\\uAE30, \\uAC04\\uACA9, \\uC704\\uCE58, \\uC870\\uC0AC \\uD558\\uB098\\uB97C \\uB450\\uACE0 \\uB300\\uD654\\uB97C \\uC8FC\\uACE0\\uBC1B\\uC558\\uB2E4. \\uC774\\uC2AC\\uC544 \\uC791\\uAC00\\uAC00 \\uAE40 \\uC8FC\\uAC04\\uC5D0\\uAC8C \\u2018\\uD558\\uB098\\uD558\\uB098 \\uAD00\\uC5EC\\uD574 \\uD53C\\uACE4\\uD558\\uB0D0\\u2019\\uACE0 \\uBB3B\\uC790 **\"\\uC815\\uC131\\uACFC \\uC608\\uC758\\uB97C \\uAC16\\uCD94\\uB294 \\uC120\\uC5D0\\uC11C \\uC6B0\\uB9AC\\uB294 \\uCD5C\\uC120\\uC744 \\uB2E4\\uD574 \\uCE68\\uBC94\\uD574\\uC57C \\uD55C\\uB2E4\"**\\uB77C\\uB294 \\uB2F5\\uC774 \\uB3CC\\uC544\\uC654\\uB2E4. \\uC774\\uD6E4 \\uC791\\uAC00\\uB294 \\uC774\\uB807\\uAC8C \\uD45C\\uD604\\uD588\\uB2E4. \\u201C\\uB124 \\uBA85(\\uC774\\uD6E4, \\uC774\\uC2AC\\uC544, \\uAE40\\uC9C4\\uD615, \\uBC15\\uC5F0\\uBBF8 \\uB514\\uC790\\uC774\\uB108) ',(0,i.jsx)(e.strong,{children:\"\\uBAA8\\uB450 \\uC790\\uAE30 \\uC138\\uACC4\\uAC00 \\uC788\\uACE0 \\uADF8 \\uC138\\uACC4\\uC5D0 \\uB300\\uD55C \\uD655\\uC2E0\\uC774 \\uC788\\uB294 \\uAC15\\uBC15\\uC801\\uC778 \\uC791\\uC5C5\\uC790\\uB4E4\\uC774\\uB2E4. \\uC11C\\uB85C\\uB97C \\uC874\\uC911\\uD558\\uC9C0\\uB9CC \\uC790\\uC2E0\\uC774 \\uC313\\uC544\\uC628 \\uBBF8\\uAC10\\uC758 \\uC138\\uACC4\\uB97C \\uBC30\\uBC18\\uD558\\uAC70\\uB098 \\uD0C0\\uD611\\uD558\\uC9C0 \\uC54A\\uC558\\uB2E4.\"}),\" \",(0,i.jsx)(e.strong,{children:\"\\uB137\\uC774 \\uB9CC\\uB098 \\uAC00\\uC7A5 \\uBA40\\uB9AC\\uAE4C\\uC9C0 \\uAC08 \\uC218 \\uC788\\uB294 \\uB370\\uAC00 \\uC5B4\\uB518\\uC9C0 \\uD655\\uC778\\uD558\\uB294 \\uC2DC\\uAC04\\uC774\\uC5C8\\uB2E4.\\u201D\"}),` \\uD3B8\\uC9D1\\uC790 \\uB9D0\\uB3C4 \\uB4E4\\uC5B4\\uBD10\\uC57C \\uD55C\\uB2E4\\uBA70 \\uC774\\uC2AC\\uC544 \\uC791\\uAC00\\uAC00 \\uB9D0\\uD588\\uB2E4. \\u201C\\uC560\\uCD08 \\uC774 \\uC9C1\\uC721\\uBA74\\uCCB4(\\uCC45)\\uC758 \\uC138\\uBD80 \\uC0AC\\uD56D\\uC5D0 \\uADF8\\uB807\\uAC8C\\uAE4C\\uC9C0 \\uC9D1\\uCC29\\uD558\\uB294 \\uC9C1\\uC5C5\\uC758 \\uC0AC\\uB78C\\uB4E4\\uC774\\uB77C\\uB294 \\uAC8C \\uC194\\uC9C1\\uD788 \\uB108\\uBB34 \\uC6B0\\uC2A4\\uAF5D\\uC2A4\\uB7EC\\uC6B4\\uB370 \\uC815\\uB9D0 \\uC9C4\\uC9C0\\uD558\\uAC8C \\uD588\\uB2E4.\\u201D\n\\uCE5C\\uAD6C\\uB4E4 \\uC5ED\\uC2DC \\uADF8\\uC758 \\uC0B0\\uBB38\\uC5D0 \\uC790\\uC8FC \\uB098\\uC628\\uB2E4. \\u2018\\uCE5C\\uAD6C\\uB4E4 \\uC5F0\\uD569\\u2019\\uC774 \\uC788\\uB2E4. \\uADF8 \\uC548\\uC5D0\\uB294 \\uC791\\uAC00 \\uCE5C\\uAD6C\\uB4E4\\uB3C4 \\uC788\\uB2E4. \\u201C\\uB204\\uAD70\\uAC00\\uB97C \\uAE00\\uC758 \\uC18C\\uC7AC\\uB85C \\uC0BC\\uB294 \\uAC83\\uC774 \\uC608\\uBBFC\\uD55C \\uC2DC\\uB300\\uC9C0\\uB9CC \\uC6B0\\uB9AC\\uB07C\\uB9AC\\uB294 \\uC6B0\\uB9AC \\uC598\\uAE30\\uB97C \\uB9C8\\uC74C\\uB300\\uB85C \\uD574\\uB3C4 \\uB41C\\uB2E4\\uB294 \\uD569\\uC758\\uAC00 \\uC788\\uB2E4. \\u2018\\uB124\\uAC00 \\uC5B4\\uC9C0\\uAC04\\uD788 \\uC54C\\uC544\\uC11C \\uC37C\\uACA0\\uC9C0\\u2019 \\uD558\\uB294 \\uB9C8\\uC74C\\uC774\\uB2E4. \\uADF8\\uB798\\uB3C4 \\uC870\\uC2EC\\uC2A4\\uB7EC\\uC6B4 \\uBD80\\uBD84\\uC740 \\uD5C8\\uB77D\\uC744 \\uBC1B\\uACE0 \\uAC8C\\uC7AC\\uD55C\\uB2E4. \\uC774 \\uAE00\\uC774 \\uB098\\uB97C \\uD574\\uD558\\uC9C0 \\uC54A\\uC744 \\uAC70\\uB77C\\uB294 \\uBBFF\\uC74C\\uC774 \\uB4DC\\uB294 \\uB2E8\\uACC4\\uC5D0\\uC11C\\uB294 \\uC11C\\uB85C \\uB9C8\\uC74C\\uAECF \\uC4F0\\uB77C\\uACE0 \\uD558\\uB294 \\uAC83 \\uAC19\\uB2E4.\\u201D \\uC774\\uC2AC\\uC544 \\uC791\\uAC00\\uB294 \\u2018\\uBB34\\uD574\\uD558\\uB2E4\\u2019\\uB294 \\uD45C\\uD604\\uC5D0 \\uB300\\uD574\\uC11C\\uB3C4 \\uD68C\\uC758\\uC801\\uC774\\uB2E4. \\u201C`,(0,i.jsx)(e.strong,{children:\"\\uBB34\\uD574\\uD568\\uC774\\uB77C\\uB294 \\uB9D0\\uC774 \\uC774\\uB807\\uAC8C\\uAE4C\\uC9C0 \\uB110\\uB9AC \\uC4F0\\uC774\\uB294 \\uAC83\\uC774 \\uC2DC\\uB300\\uC758 \\uC9D5\\uD6C4\\uC774\\uAE34 \\uD558\\uACA0\\uC73C\\uB098 \\u2018\\uBB34\\uD574\\uD55C \\uAD00\\uACC4\\u2019\\uAC00 \\uC5B4\\uB514 \\uC788\\uB098. \\uC11C\\uB85C \\uC774\\uB7F0\\uC800\\uB7F0 \\uD574\\uB97C \\uC785\\uD788\\uC9C0\\uB9CC \\uADF8\\uB7FC\\uC5D0\\uB3C4 \\uC313\\uC544\\uC628 \\uC6B0\\uC815\\uC758 \\uC5ED\\uC0AC\\uAC00 \\uC788\\uACE0 \\uAE30\\uBCF8\\uC801\\uC73C\\uB85C \\uC560\\uC815\\uD55C\\uB2E4\\uB294 \\uC804\\uC81C\\uAC00 \\uC788\\uAE30 \\uB54C\\uBB38\\uC5D0 \\uCE68\\uBC94\\uD574\\uB3C4 \\uAD1C\\uCC2E\\uC740 \\uAC83 \\uAC19\\uB2E4.\\u201D\"}),\" \\uAE00\\uC5D0 \\uC9C1\\uC811 \\uB4F1\\uC7A5\\uD558\\uB294 \\uC774\\uD6E4 \\uC791\\uAC00\\uB294 \\uC5B4\\uB5BB\\uAC8C \\uC0DD\\uAC01\\uD560\\uAE4C? \\u201C\\uC774 \\uC7A5\\uBA74\\uC744 \\uC774\\uB807\\uAC8C \\uBF51\\uC544\\uB0B4\\uB124, \\uD504\\uB85C\\uB124... \\uC0DD\\uAC01\\uD588\\uB2E4(\\uC6C3\\uC74C). **\\uAE00\\uC4F0\\uAE30\\uB294 \\uC5EC\\uB7EC \\uC18C\\uC7AC\\uB97C \\uC774\\uC5B4\\uAC00\\uB294 \\uC791\\uC5C5\\uC774\\uB77C \\uCC3D\\uC791\\uC790\\uC640 \\uADF8 \\uC8FC\\uBCC0\\uC740 \\uC11C\\uB85C \\uCE68\\uBC94\\uD560 \\uC218\\uBC16\\uC5D0 \\uC5C6\\uB294 \\uAC83 \\uAC19\\uB2E4.\\u201D\"]}),`\n`,(0,i.jsxs)(e.p,{children:[`\\u2018\\uC0AC\\uB791\\uB3C4 \\uC6B0\\uC815\\uB3C4 \\uAC00\\uAE4C\\uC6B4 \\uC560\\uB791 \\uD558\\uB294 \\uD3B8\\u2019\\uC778 \\uC774\\uC2AC\\uC544 \\uC791\\uAC00\\uB3C4 \\uD32C\\uB370\\uBBF9\\uC744 \\uACAA\\uC73C\\uBA70 \\uBCC0\\uD654\\uAC00 \\uC788\\uC5C8\\uB2E4. \\uBA40\\uC5B4\\uB3C4 \\uCE5C\\uAD6C\\uAC00 \\uB418\\uB294 \\uBC95\\uC744 \\uBC30\\uC6B0\\uB294 \\uC2DC\\uAC04\\uC774\\uC5C8\\uB2E4. \\u201C\\uC0DD\\uAC01\\uD574\\uBCF4\\uB2C8 \\uC774\\uBC88 \\uCC45\\uC758 \\uC911\\uC694\\uD55C \\uD0A4\\uC6CC\\uB4DC \\uC911 \\uD558\\uB098\\uAC00 \\uB9CC\\uB0A8\\uC778 \\uAC83 \\uAC19\\uB2E4. \\uC5B4\\uB5BB\\uAC8C \\uB9CC\\uB098\\uC9C0 \\uC54A\\uACE0\\uB3C4 \\uB9CC\\uB0A0 \\uAC83\\uC778\\uAC00. \\uBAB8\\uC744 \\uBD80\\uB52A\\uD788\\uBA74\\uC11C \\uB9CC\\uB09C\\uB2E4\\uB294 \\uAC8C \\uBB34\\uC5C7\\uC778\\uC9C0 \\uC694\\uAC00\\uC6D0\\uACFC \\uD0DC\\uAD8C\\uB3C4\\uC7A5\\uC744 \\uC18C\\uC7AC\\uB85C \\uD558\\uB294 \\uAE00\\uC5D0\\uC11C \\uADF8 \\uAC10\\uAC01\\uC744 \\uD0D0\\uAD6C\\uD558\\uACE0 \\uC788\\uB2E4(\\uC774\\uC2AC\\uC544).\\u201D \\uC774\\uD6E4 \\uC791\\uAC00\\uB294 \\uACB0\\uAD6D \\u2018\\uAC00\\uAE4C\\uC6B4 \\uC560\\u2019\\uAC00 \\uB418\\uC5C8\\uB2E4. \\uC9C0\\uB09C\\uD574 \\uD55C\\uAD6D\\uC73C\\uB85C \\uC774\\uC8FC\\uD588\\uAE30 \\uB54C\\uBB38\\uC774\\uB2E4. \\u201C17\\uB144 \\uB3D9\\uC548 \\uBD88\\uAC00\\uB2A5\\uD588\\uB358 \\uC77C\\uC0C1\\uACFC \\uB9CC\\uB0A8\\uC774 \\uC5EC\\uAE30\\uC11C\\uB294 \\uC26C\\uC6E0\\uB2E4. \\uAE30\\uBD84\\uC774 \\uC774\\uC0C1\\uD558\\uB2E4. \\uC9C0\\uAE08\\uB3C4 \\uC778\\uD130\\uBDF0\\uC9C0\\uB9CC \\uC5B8\\uC5B4\\uAC00 \\uB2E4\\uB974\\uB2E4\\uB294 \\uC0DD\\uAC01 \\uC5C6\\uC774 \\uC774\\uC57C\\uAE30\\uD558\\uACE0 \\uC788\\uB2E4. \\u2018\\uC6B0\\uB9AC \\uC911 \\uD558\\uB098\\uAC00 \\uB418\\uAE30 \\uC218\\uC6D4\\uD55C \\uD658\\uACBD\\u2019\\uC778\\uB370 \\uBBF8\\uAD6D\\uC5D0 \\uC0B4 \\uB54C\\uB294 \\uCEE4\\uD53C\\uC20D\\uC774\\uB098 \\uC2DD\\uB2F9\\uAC19\\uC774 \\uC77C\\uC0C1\\uC801\\uC778 \\uC7A5\\uC18C\\uC5D0 \\uAC00\\uB3C4 \\uC774 \\uC911 \\uD55C \\uBA85\\uC774 \\uC544\\uB2C8\\uB77C\\uB294 \\uAC78 \\uC790\\uC8FC \\uB290\\uAF08\\uB2E4.**\n\\uC774\\uC2AC\\uC544 \\uC791\\uAC00\\uAC00 \\uBCF4\\uAE30\\uC5D0 \\uC774\\uD6E4 \\uC791\\uAC00\\uAC00 \\uAC00\\uC9C4 \\uC18C\\uC218\\uC790 \\uAC10\\uC218\\uC131\\uC740 \\uCC3D\\uC791\\uC790\\uB85C\\uC11C\\uC758 \\uAC15\\uC810\\uC774\\uB2E4. \\u201C`,(0,i.jsx)(e.strong,{children:\"\\uADF8 \\uC0AC\\uD68C\\uC5D0\\uC11C 1\\uB4F1 \\uC2DC\\uBBFC\\uC740 \\uC544\\uB2C8\\uC5C8\\uB358 \\uC0AC\\uB78C\\uC774 \\uAC00\\uC9C8 \\uC218 \\uC788\\uB294, \\uC5B4\\uB835\\uAC8C \\uC5BB\\uC5C8\\uC9C0\\uB9CC \\uC18C\\uC911\\uD55C \\uC2DC\\uC120\\uB4E4\\uC774 \\uC788\\uB2E4\\uACE0 \\uC0DD\\uAC01\\uD55C\\uB2E4. \\uD55C\\uAD6D\\uC73C\\uB85C \\uC774\\uC8FC\\uD558\\uBA74\\uC11C\\uB294 \\uC774 \\uB098\\uB77C\\uC5D0 \\uC788\\uB294 \\uD0C0\\uAD6D\\uC778\\uB4E4\\uB85C \\uAD00\\uC810\\uC774 \\uC62E\\uC544\\uAC00\\uB294 \\uAC78 \\uB290\\uB080\\uB2E4.\"}),\"\\u201D \\uC774\\uD6E4 \\uC791\\uAC00\\uAC00 \\uBCF4\\uAE30\\uC5D0 \\uC774\\uC2AC\\uC544\\uB294 \\uC5B4\\uB5A4 \\uCC3D\\uC791\\uC790\\uC77C\\uAE4C? \\u201C\",(0,i.jsx)(e.strong,{children:\"\\uB2E4\\uCE35\\uC801\\uC778 \\uCC3D\\uC791\\uC790\\uB2E4. \\uCC3D\\uC791\\uC758 \\uD55C \\uACFC\\uC815\\uB9CC \\uCC45\\uC784\\uC9C0\\uB824\\uACE0 \\uD558\\uC9C0 \\uC54A\\uACE0 \\uAE30\\uD68D\\uD558\\uB294 \\uB208\\uC73C\\uB85C \\uCC98\\uC74C\\uBD80\\uD130 \\uB05D\\uAE4C\\uC9C0 \\uC784\\uD558\\uB294 \\uC0AC\\uB78C\\uC774\\uB2E4. \\uC5EC\\uB7EC \\uC7A5\\uB974\\uC758 \\uC608\\uC220\\uC744 \\uD558\\uB294\\uB370 \\uADF8\\uB54C\\uB9C8\\uB2E4 \\uD568\\uAED8\\uD558\\uB294 \\uC0AC\\uB78C\\uB4E4\\uC744 (\\uC791\\uC5C5 \\uC548\\uC5D0) \\uC5F4\\uC2EC\\uD788 \\uCD08\\uB300\\uD558\\uACE0 \\uAC19\\uC774 \\uC774\\uB8E8\\uC5B4\\uAC00\\uB294 \\uACF5\\uAE30\\uB97C \\uB9CC\\uB4E0\\uB2E4. \\uC774\\uB7F0 \\uAC8C \\uB298 \\uBA4B\\uC788\\uB2E4\"}),\".\\u201D \\uD611\\uC5C5\\uC790\\uB85C\\uC11C \\uC774\\uC2AC\\uC544 \\uC791\\uAC00\\uB294 \\uC544\\uB984\\uB2E4\\uC6C0\\uB3C4 \\uACE0\\uC9D1\\uD558\\uC9C0\\uB9CC \\uBA48\\uCD9C \\uB54C\\uB97C \\uACB0\\uC815\\uD558\\uB294 \\uC0AC\\uB78C\\uC774\\uB2E4.\"]}),`\n`,(0,i.jsxs)(e.p,{children:[\"\\uAE00\\uC5D0\\uC11C\\uB3C4 \\uB290\\uAEF4\\uC9C0\\uB294 \\uAC83\\uCC98\\uB7FC \\uC774\\uC2AC\\uC544 \\uC791\\uAC00\\uB294 \\uB099\\uCC9C\\uC801\\uC778 \\uD3B8\\uC774\\uB2E4. \\uC774\\uB7F0 \\uAE30\\uC9C8\\uC774 \\uC624\\uB7AB\\uB3D9\\uC548 \\uCF64\\uD50C\\uB809\\uC2A4\\uC774\\uAE30\\uB3C4 \\uD588\\uB2E4. \\u201C\\uC0B6\\uC5D0\\uB294 \\uB3C4\\uC6C0\\uC774 \\uB9CE\\uC774 \\uB41C\\uB2E4\\uACE0 \\uC0DD\\uAC01\\uD558\\uC9C0\\uB9CC \\uB2E8\\uC21C\\uD55C \\uAC74\\uAC15\\uD568\\uC774\\uB098 \\uBA85\\uB791\\uD568\\uC774 \\uCC3D\\uD53C\\uD560 \\uB54C\\uAC00 \\uC788\\uB2E4. \\uD2B9\\uD788 \\uCE5C\\uAD6C\\uB4E4\\uC774 \\uC4F4, \\uB098\\uC640 \\uB2E4\\uB978 \\uD6CC\\uB96D\\uD55C \\uAE00\\uC744 \\uBCFC \\uB54C \\uADF8\\uB807\\uB2E4. \\uCCA8\\uC608\\uD558\\uACE0 \\uB3C4\\uC800\\uD788 \\uB530\\uB77C\\uAC08 \\uC218 \\uC5C6\\uB294 \\uC0AC\\uC720\\uAC00 \\uC788\\uB2E4.\\u201D \\uB4DC\\uB77C\\uB9C8\\uB97C \\uC4F0\\uBA74\\uC11C\\uB3C4 \\uADF8\\uB807\\uB2E4. \\uB4DC\\uB77C\\uB9C8\\uB294 \\uC138\\uC0C1\\uACFC \\uC5B4\\uB5BB\\uAC8C \\uBD88\\uD654\\uD588\\uB294\\uC9C0\\uAC00 \\uC911\\uC694\\uD55C \\uC7A5\\uB974\\uC778\\uB370 \\uAC08\\uB4F1\\uC744 \\uB9E4\\uB048\\uD558\\uAC8C \\uBD09\\uD569\\uD558\\uB824\\uB294 \\uAE30\\uC9C8\\uC774 \\uB098\\uC62C \\uB54C\\uAC00 \\uC788\\uB2E4. \",(0,i.jsx)(e.strong,{children:\"\\uD654\\uD569\\uD558\\uB824\\uB294 \\uAD00\\uC131\\uC774 \\uC791\\uAC00\\uB85C\\uC11C \\uC7A5\\uC810\\uC774\\uC790 \\uB2E8\\uC810\\uC774\\uB2E4\"}),\".\"]}),`\n`,(0,i.jsx)(e.p,{children:\"\\uC774\\uC2AC\\uC544 \\uC791\\uAC00\\uB294 \\uCD5C\\uADFC \\uC608\\uC2A424\\uAC00 \\uC2E4\\uC2DC\\uD55C \\u2018\\uC62C\\uD574\\uC758 \\uC80A\\uC740 \\uC791\\uAC00\\u2019 \\uC628\\uB77C\\uC778 \\uB3C5\\uC790 \\uD22C\\uD45C\\uC5D0\\uC11C 1\\uC704\\uC5D0 \\uC120\\uC815\\uB418\\uAE30\\uB3C4 \\uD588\\uB2E4. 5\\uB9CC594\\uD45C(9.4%)\\uB97C \\uBC1B\\uC558\\uB2E4. \\uC778\\uC0DD\\uC5D0\\uC11C \\uBC1B\\uC740 \\uC0C1 \\uC911 \\uAC00\\uC7A5 \\uD06C\\uACE0 \\uB3C5\\uC790\\uAC00 \\uBF51\\uC544\\uC8FC\\uC5B4 \\uB354 \\uD2B9\\uBCC4\\uD558\\uB2E4. \\uCCAB \\uCC45\\uC744 \\uB0B8 \\uC9C0 5\\uB144, \\uB3D9\\uC2DC\\uB300 \\uB3C5\\uC790\\uC640 \\uC791\\uAC00\\uB4E4 \\uC0AC\\uC774\\uC5D0\\uC11C \\uAFB8\\uC900\\uD788 \\uC601\\uD5A5\\uB825\\uC744 \\uD0A4\\uC6CC\\uC654\\uB2E4. \\u201C\\uAC00\\uC9C4 \\uD798\\uC744 \\uC88B\\uC740 \\uACF3\\uC5D0 \\uC4F0\\uACE0 \\uC2F6\\uC740\\uB370 \\uC0AC\\uC2E4 \\uB418\\uAC8C \\uC54C\\uB7C9\\uD55C \\uD798\\uC774\\uB77C\\uACE0 \\uC0DD\\uAC01\\uD558\\uAE30\\uB3C4 \\uD55C\\uB2E4. \\uB0B4\\uAC00 \\uAC00\\uC9C4 \\uC9C0\\uBA74\\uC5D0\\uC11C \\uC911\\uC694\\uD558\\uB418 \\uB35C \\uC598\\uAE30\\uB41C \\uC0AC\\uB78C\\uB4E4, \\uC774\\uC288\\uB4E4\\uC744 \\uB2E4\\uB8E8\\uB824\\uACE0 \\uB178\\uB825\\uD558\\uC9C0\\uB9CC \\uBCF4\\uD1B5 \\uC0DD\\uD65C\\uD560 \\uB54C\\uB294 \\uC18C\\uC7AC\\uB9CC\\uD07C\\uC758 \\uBC18\\uACBD\\uB9CC \\uC0DD\\uAC01\\uD55C\\uB2E4.\\u201D\"}),`\n`]})]}),`\n`,(0,i.jsxs)(\"details\",{children:[(0,i.jsxs)(\"summary\",{children:[\"\\uACBD\\uD5A5, \",(0,i.jsx)(e.a,{href:\"https://m.khan.co.kr/culture/culture-general/article/202111130949001\",children:\"2021.11.13 \"}),(0,i.jsx)(e.a,{href:\"https://m.khan.co.kr/culture/culture-general/article/202111130949001\",children:(0,i.jsx)(\"strong\",{children:\"\\uC774\\uC2AC\\uC544 \\u201C\\uAE08\\uAE30 \\uAE6C \\uC790\\uC720? \\uC678\\uB824 \\uB8E8\\uD2F4\\uD558\\uAC8C \\uC0B4\\uC544\\uC694\\u201D\"})})]}),(0,i.jsxs)(e.ul,{children:[`\n`,(0,i.jsx)(e.li,{children:\"\\uC774 \\uC791\\uAC00\\uB294 \\uC0AC\\uB78C\\uC5D0 \\uB300\\uD55C \\uD638\\uAE30\\uC2EC\\uC774 \\uB9CE\\uACE0 \\uAD00\\uCC30\\uB825\\uC774 \\uB6F0\\uC5B4\\uB09C \\uAC83 \\uAC19\\uC544\\uC694. \\uC2E4\\uC81C\\uB85C \\uC751\\uAE09\\uC758\\uD559\\uACFC \\uC804\\uBB38\\uC758\\uC774\\uAE30\\uB3C4 \\uD55C \\uB0A8\\uAD81\\uC778 \\uC791\\uAC00(38)\\uC640 \\uC8FC\\uACE0\\uBC1B\\uC73C\\uBA70 \\uC4F4 \\uC11C\\uAC04\\uC9D1 <\\uC6B0\\uB9AC \\uC0AC\\uC774\\uC5D4 \\uC624\\uD574\\uAC00 \\uC788\\uB2E4>\\uC5D0\\uC11C \\uC2A4\\uC2A4\\uB85C\\uB97C \\u2018\\uD638\\uBAA8 \\uD050\\uB9AC\\uC5B4\\uC2A4(\\uD638\\uAE30\\uC2EC\\uC774 \\uB9CE\\uC740 \\uC0AC\\uB78C)\\u2019\\uB77C\\uACE0 \\uD45C\\uD604\\uD558\\uAE30\\uB3C4 \\uD588\\uC9C0\\uC694.\"}),`\n`]}),(0,i.jsx)(e.p,{children:\"\\u201C\\uAD81\\uAE08\\uD55C \\uAC8C \\uB9CE\\uC544\\uC11C \\uC0AC\\uB78C\\uB4E4\\uC5D0\\uAC8C \\uC9C8\\uBB38\\uC744 \\uC798\\uD574\\uC694. \\uB300\\uD654 \\uB0B4\\uC6A9\\uB3C4 \\uC798 \\uAE30\\uC5B5\\uD558\\uACE0\\uC694. \\uC800\\uB294 \\uC800\\uB9CC \\uB9D0\\uD558\\uACE0 \\uC788\\uB294 \\uC0C1\\uD669\\uC744 \\uC88B\\uC544\\uD558\\uC9C0 \\uC54A\\uC544\\uC694. \\uCCAD\\uC18C\\uB144\\uAE30 \\uB54C\\uBD80\\uD130 \\uADF8\\uB7AC\\uB358 \\uAC83 \\uAC19\\uC544\\uC694. \\uC5B4\\uB514\\uC11C \\uBA87\\uBA85\\uC774 \\uC788\\uB4E0 \\uC218\\uC90D\\uC74C\\uC774 \\uB9CE\\uC740 \\uC774\\uB3C4 \\uB9D0\\uD560 \\uC218 \\uC788\\uB3C4\\uB85D \\uACE0\\uB8E8 \\uC9C8\\uBB38\\uC744 \\uB358\\uC838\\uC694. \\uADF8 \\uB2A5\\uB825\\uC73C\\uB85C \\uC791\\uAC00\\uC0DD\\uD65C\\uC744 \\uD558\\uACE0 \\uC788\\uB2E4\\uACE0 \\uC0DD\\uAC01\\uD574\\uC694(\\uC6C3\\uC74C).\\u201D\"}),(0,i.jsx)(e.p,{children:\"\\uADF8\\uB97C \\uB300\\uC911\\uC774 \\uC8FC\\uBAA9\\uD55C \\uAC83\\uC740 2018\\uB144 \\u2018\\uC77C\\uAC04 \\uC774\\uC2AC\\uC544\\u2019\\uB77C\\uB294 \\uAD6C\\uB3C5\\uD615 \\uC5F0\\uC7AC\\uB97C \\uC2DC\\uC791\\uD558\\uBA74\\uC11C\\uB2E4. \\uCD9C\\uD310\\uC0AC\\uB098 \\uD648\\uD398\\uC774\\uC9C0 \\uB4F1 \\uC911\\uAC04 \\uD50C\\uB7AB\\uD3FC\\uC744 \\uAC70\\uCE58\\uC9C0 \\uC54A\\uACE0 \\uC6D4\\uC694\\uC77C\\uBD80\\uD130 \\uAE08\\uC694\\uC77C\\uAE4C\\uC9C0 \\uB9E4\\uC77C \\uC790\\uC815\\uC5D0 e\\uBA54\\uC77C\\uC744 \\uD1B5\\uD574 \\uC791\\uAC00\\uAC00 \\uAD6C\\uB3C5\\uC790\\uC5D0\\uAC8C \\uC9C1\\uC811 \\uD55C\\uD3B8\\uC758 \\uC5D0\\uC138\\uC774\\uB97C \\uBC30\\uB2EC\\uD55C\\uB2E4. \\uC774\\uC804\\uAE4C\\uC9C0 \\uB204\\uAD6C\\uB3C4 \\uC2DC\\uB3C4\\uD558\\uC9C0 \\uC54A\\uC558\\uB358 \\uD30C\\uACA9\\uC774\\uC5C8\\uB2E4. \\uD55C\\uB2EC\\uC5D0 20\\uD3B8\\uC758 \\uAE00, \\uAD6C\\uB3C5\\uB8CC\\uB294 1\\uD3B8\\uB2F9 500\\uC6D0\\uAF34\\uC778 1\\uB9CC\\uC6D0\\uC774\\uB2E4. \\uBC18\\uC751\\uC740 \\uD3ED\\uBC1C\\uC801\\uC774\\uC5C8\\uB2E4. \\uBB34\\uC5C7\\uBCF4\\uB2E4 \\uB0B4\\uC6A9\\uC774 \\uD765\\uBBF8\\uC9C4\\uC9C4\\uD588\\uB2E4. \\uD654\\uC790\\uC778 \\uB098(\\uC774\\uC2AC\\uC544)\\uC640 \\uC6C5\\uC774(\\uC544\\uBE60), \\uBCF5\\uD76C(\\uC5C4\\uB9C8), \\uCC2C\\uD76C(\\uB0A8\\uB3D9\\uC0DD), \\uD558\\uB9C8(\\uC560\\uC778), \\uC870\\uBD80\\uBAA8 \\uADF8\\uB9AC\\uACE0 \\uCE5C\\uAD6C\\uB4E4\\uC774 \\uC8FC\\uC778\\uACF5\\uC73C\\uB85C \\uB4F1\\uC7A5\\uD558\\uB294\\uB370, \\uC2DC\\uD2B8\\uCF64 \\uAC19\\uC740 \\uC720\\uBA38\\uB7EC\\uC2A4\\uD55C \\uC5D0\\uD53C\\uC18C\\uB4DC\\uB4E4\\uC774 \\uC774\\uC5B4\\uC9C4\\uB2E4. \\uC544\\uB2C8, \\uC9C4\\uC9C0\\uD55C \\uC774\\uC57C\\uAE30\\uC870\\uCC28 \\uADF8\\uB294 \\uC775\\uC0B4\\uC2A4\\uB7FD\\uAC8C \\uC4F8 \\uC904 \\uC548\\uB2E4.\"}),(0,i.jsxs)(e.ul,{children:[`\n`,(0,i.jsx)(e.li,{children:\"\\u2018\\uC77C\\uAC04 \\uC774\\uC2AC\\uC544\\u2019\\uB97C \\uC2DC\\uC791\\uD558\\uACE0 \\uB124 \\uBC88\\uC9F8 \\uC2DC\\uC98C\\uC778 2021\\uB144 \\uB2A6\\uBD04\\uD638\\uAE4C\\uC9C0 \\uB9C8\\uBB34\\uB9AC\\uD588\\uC73C\\uB2C8 4\\uB144\\uAC04 \\uC5F0\\uC7AC\\uB97C \\uC774\\uC5B4\\uC654\\uC5B4\\uC694. \\uAE00\\uAC10\\uC744 \\uCC3E\\uB294 \\uAC8C \\uC27D\\uB358\\uAC00\\uC694.\"}),`\n`]}),(0,i.jsx)(e.p,{children:\"\\u201C\\uC5B4\\uB835\\uC8E0(\\uC6C3\\uC74C). \\uADF8\\uB798\\uC11C \\uD3C9\\uC18C \\uC544\\uC774\\uD3F0 \\uBA54\\uBAA8\\uC7A5\\uC5D0 \\uC0AC\\uB78C\\uB4E4\\uACFC \\uB098\\uB208 \\uB300\\uC0AC\\uB098 \\uB2E8\\uC5B4\\uB97C \\uC218\\uC2DC\\uB85C \\uAE30\\uB85D\\uD574\\uB450\\uB294 \\uC2B5\\uAD00\\uC774 \\uC788\\uC5B4\\uC694. \\uADF8\\uAC78 \\uAE30\\uCD08\\uB85C \\uD55C \\uAE00\\uC4F0\\uAE30\\uAC00 \\uB9CE\\uC544\\uC694.\\u201D\"}),(0,i.jsxs)(e.ul,{children:[`\n`,(0,i.jsx)(e.li,{children:\"\\uAF2D \\uB9C8\\uAC10\\uC2DC\\uAC04\\uC778 \\uC790\\uC815\\uC5D0 \\uB9DE\\uCDB0 \\uC6D0\\uACE0\\uB97C \\uB9C8\\uBB34\\uB9AC\\uD574 \\uBCF4\\uB0B4\\uC9C0\\uC694. \\uB9C8\\uAC10 \\uC2A4\\uD2B8\\uB808\\uC2A4\\uAC00 \\uC2EC\\uD560 \\uD150\\uB370 \\uC65C \\uBBF8\\uB9AC \\uC548 \\uC368\\uB450\\uB098\\uC694.\"}),`\n`]}),(0,i.jsx)(e.p,{children:\"\\u201C\\uB0AE\\uC5D0\\uB294 \\uB0AE\\uC5D0 \\uD560 \\uC77C\\uC774 \\uB530\\uB85C \\uB9CE\\uC774 \\uC788\\uC5B4\\uC11C\\uC608\\uC694. \\uCD9C\\uD310\\uC0AC \\uC5C5\\uBB34\\uB3C4 \\uD574\\uC57C \\uD558\\uACE0, \\uB3C5\\uC790\\uB4E4\\uC758 \\uC758\\uACAC\\uC5D0 \\uB2F5\\uAE00\\uB3C4 \\uC368\\uC57C \\uD574\\uC694. \\uADF8\\uB7F0\\uB370 \\uC5B4\\uCA4C\\uB2E4 \\uD55C\\uAC00\\uD55C \\uB0A0\\uC774 \\uC0DD\\uACA8\\uB3C4 \\uB9C8\\uAC10\\uC774 \\uCF54\\uC55E\\uC5D0 \\uC788\\uC9C0 \\uC54A\\uC73C\\uBA74 \\uAE34\\uC7A5\\uAC10\\uC774 \\uB5A8\\uC5B4\\uC838\\uC11C\\uC778\\uC9C0 \\uC798 \\uC548 \\uC368\\uC838\\uC694(\\uC6C3\\uC74C).\\u201D\"}),(0,i.jsxs)(e.ul,{children:[`\n`,(0,i.jsx)(e.li,{children:\"\\uB3C5\\uC790\\uB4E4\\uC758 e\\uBA54\\uC77C\\uC5D0 \\uC77C\\uC77C\\uC774 \\uB2F5\\uBCC0\\uC744 \\uD574\\uC8FC\\uB098\\uC694.\"}),`\n`]}),(0,i.jsx)(e.p,{children:\"\\u201C\\uC81C\\uAC00 \\uAF2D \\uB300\\uB2F5\\uD574\\uC57C \\uD560 \\uB0B4\\uC6A9\\uC77C \\uACBD\\uC6B0 \\uC368\\uC694. \\uADF8\\uB7F0\\uB370 \\uC800\\uB294 \\uAC15\\uD55C \\uC0AC\\uB78C\\uC774 \\uB418\\uACE0 \\uC2F6\\uB2E4\\uB294 \\uC0DD\\uAC01\\uC744 \\uB9CE\\uC774 \\uD588\\uC5B4\\uC694.\\u201D\"}),(0,i.jsxs)(e.ul,{children:[`\n`,(0,i.jsx)(e.li,{children:\"\\uC65C\\uC694.\"}),`\n`]}),(0,i.jsx)(e.p,{children:\"\\u201C\\uC791\\uAC00\\uAC00 \\uC721\\uCCB4\\uC801\\uC73C\\uB85C\\uB3C4 \\uBE61\\uC13C \\uC9C1\\uC5C5\\uC778\\uB370, \\uB3C5\\uC790\\uB4E4\\uB85C\\uBD80\\uD130 \\uD53C\\uB4DC\\uBC31\\uC774 \\uB9CE\\uC796\\uC544\\uC694. \\uC120\\uD50C\\uC774 \\uB9CE\\uC9C0\\uB9CC \\uC545\\uD50C\\uB3C4 \\uC801\\uC796\\uC544 \\uB9C8\\uC74C\\uC774 \\uAC15\\uD574\\uC57C \\uD574\\uC694. \\uBB34\\uB38C\\uC9C0\\uB294 \\uAC8C \\uAC15\\uD574\\uC9C0\\uB294 \\uAC83\\uC774\\uB77C\\uACE0 \\uC0DD\\uAC01\\uD588\\uC9C0\\uB9CC <\\uC0C8 \\uB9C8\\uC74C\\uC73C\\uB85C>\\uC5D0 \\uB4F1\\uC7A5\\uD558\\uB294 \\uC5B4\\uB978\\uB4E4\\uC744 \\uC778\\uD130\\uBDF0\\uD55C \\uD6C4 \\uB208\\uBB3C\\uC774 \\uB9CE\\uC544\\uB3C4 \\uAC15\\uD560 \\uC218 \\uC788\\uC74C\\uC744 \\uC54C\\uAC8C \\uB410\\uC5B4\\uC694. \\uC81C\\uAC00 \\uC80A\\uC740 \\uC5EC\\uC131 \\uC791\\uAC00\\uC774\\uB2E4 \\uBCF4\\uB2C8 \\uC800\\uC5D0 \\uB300\\uD55C \\uC5BC\\uD3C9, \\uBAB8\\uD3C9\\uB3C4 \\uB9CE\\uC544\\uC694. \\uCC98\\uC74C\\uC5D0\\uB294 \\uADF8\\uB807\\uAC8C \\uC18C\\uBE44\\uB41C\\uB2E4\\uB294 \\uC790\\uCCB4\\uAC00 \\uBD88\\uD3B8\\uD588\\uB294\\uB370, \\uC9C0\\uAE08\\uC740 \\uADF8\\uB7F4 \\uBC14\\uC5D0\\uC57C \\uCD5C\\uB300\\uD55C \\uB2E4\\uC591\\uD558\\uAC8C \\uC18C\\uBE44\\uB418\\uB294 \\uAC8C \\uC88B\\uACA0\\uB2E4\\uACE0 \\uC0DD\\uAC01\\uD574\\uC694. \\uB178\\uB798\\uB3C4 \\uD558\\uACE0 \\uC2F6\\uC740 \\uB9CC\\uD07C \\uD558\\uACE0 \\uC2F6\\uACE0, \\uAE00\\uB3C4 \\uCC29\\uD55C \\uAE00\\uB9CC \\uC4F0\\uC9C0 \\uC54A\\uC73C\\uB824 \\uD574\\uC694.\\u201D\"})]}),`\n`,(0,i.jsx)(e.p,{children:\"Before continuing, make sure:\"}),`\n`,(0,i.jsxs)(e.ul,{children:[`\n`,(0,i.jsx)(e.li,{children:\"Next.js 15 and Tailwind CSS 4 are configured.\"}),`\n`]}),`\n`,(0,i.jsx)(e.h2,{id:\"getting-started\",children:\"Getting Started\"}),`\n`,(0,i.jsx)(i.Fragment,{children:(0,i.jsx)(e.pre,{className:\"shiki shiki-themes github-light github-dark\",style:{\"--shiki-light\":\"#24292e\",\"--shiki-dark\":\"#e1e4e8\",\"--shiki-light-bg\":\"#fff\",\"--shiki-dark-bg\":\"#24292e\"},tabIndex:\"0\",icon:'<svg viewBox=\"0 0 24 24\"><path d=\"M 6,1 C 4.354992,1 3,2.354992 3,4 v 16 c 0,1.645008 1.354992,3 3,3 h 12 c 1.645008,0 3,-1.354992 3,-3 V 8 7 A 1.0001,1.0001 0 0 0 20.707031,6.2929687 l -5,-5 A 1.0001,1.0001 0 0 0 15,1 h -1 z m 0,2 h 7 v 3 c 0,1.645008 1.354992,3 3,3 h 3 v 11 c 0,0.564129 -0.435871,1 -1,1 H 6 C 5.4358712,21 5,20.564129 5,20 V 4 C 5,3.4358712 5.4358712,3 6,3 Z M 15,3.4140625 18.585937,7 H 16 C 15.435871,7 15,6.5641288 15,6 Z\" fill=\"currentColor\" /></svg>',children:(0,i.jsx)(e.code,{children:(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{children:\"fumadocs-ui fumadocs-core\"})})})})}),`\n`,(0,i.jsx)(e.h3,{id:\"mdx-components\",children:\"MDX Components\"}),`\n`,(0,i.jsx)(e.p,{children:`<include cwd meta='title=\"mdx-components.tsx\"'>\n../../examples/next-mdx/mdx-components.tsx\n</include>`}),`\n`,(0,i.jsx)(e.h3,{id:\"content-source\",children:\"Content Source\"}),`\n`,(0,i.jsxs)(e.p,{children:[\"Fumadocs supports different content sources, including Fumadocs MDX and \",(0,i.jsx)(e.a,{href:\"https://www.notion.so/docs/headless/content-collections\",children:\"Content Collections\"}),\".\"]}),`\n`,(0,i.jsx)(e.p,{children:\"Fumadocs MDX is our official content source, you can configure it with:\"}),`\n`,(0,i.jsx)(i.Fragment,{children:(0,i.jsx)(e.pre,{className:\"shiki shiki-themes github-light github-dark\",style:{\"--shiki-light\":\"#24292e\",\"--shiki-dark\":\"#e1e4e8\",\"--shiki-light-bg\":\"#fff\",\"--shiki-dark-bg\":\"#24292e\"},tabIndex:\"0\",icon:'<svg viewBox=\"0 0 24 24\"><path d=\"M 6,1 C 4.354992,1 3,2.354992 3,4 v 16 c 0,1.645008 1.354992,3 3,3 h 12 c 1.645008,0 3,-1.354992 3,-3 V 8 7 A 1.0001,1.0001 0 0 0 20.707031,6.2929687 l -5,-5 A 1.0001,1.0001 0 0 0 15,1 h -1 z m 0,2 h 7 v 3 c 0,1.645008 1.354992,3 3,3 h 3 v 11 c 0,0.564129 -0.435871,1 -1,1 H 6 C 5.4358712,21 5,20.564129 5,20 V 4 C 5,3.4358712 5.4358712,3 6,3 Z M 15,3.4140625 18.585937,7 H 16 C 15.435871,7 15,6.5641288 15,6 Z\" fill=\"currentColor\" /></svg>',children:(0,i.jsx)(e.code,{children:(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{children:\"fumadocs-mdx @types/mdx\"})})})})}),`\n`,(0,i.jsx)(i.Fragment,{children:(0,i.jsx)(e.pre,{className:\"shiki shiki-themes github-light github-dark\",style:{\"--shiki-light\":\"#24292e\",\"--shiki-dark\":\"#e1e4e8\",\"--shiki-light-bg\":\"#fff\",\"--shiki-dark-bg\":\"#24292e\"},tabIndex:\"0\",icon:'<svg viewBox=\"0 0 24 24\"><path d=\"M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z\" fill=\"currentColor\" /></svg>',children:(0,i.jsxs)(e.code,{children:[(0,i.jsxs)(e.span,{className:\"line\",children:[(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"import\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" { createMDX } \"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"from\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\" 'fumadocs-mdx/next'\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\";\"})]}),`\n`,(0,i.jsx)(e.span,{className:\"line\"}),`\n`,(0,i.jsxs)(e.span,{className:\"line\",children:[(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"const\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:\" withMDX\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" =\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\" createMDX\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"();\"})]}),`\n`,(0,i.jsx)(e.span,{className:\"line\"}),`\n`,(0,i.jsxs)(e.span,{className:\"line\",children:[(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#6A737D\",\"--shiki-dark\":\"#6A737D\"},children:\"/** \"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"@type\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\" {import('next').NextConfig}\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#6A737D\",\"--shiki-dark\":\"#6A737D\"},children:\" */\"})]}),`\n`,(0,i.jsxs)(e.span,{className:\"line\",children:[(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"const\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:\" config\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" =\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" {\"})]}),`\n`,(0,i.jsxs)(e.span,{className:\"line\",children:[(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"  reactStrictMode: \"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:\"true\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\",\"})]}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"};\"})}),`\n`,(0,i.jsx)(e.span,{className:\"line\"}),`\n`,(0,i.jsxs)(e.span,{className:\"line\",children:[(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"export\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" default\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\" withMDX\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"(config);\"})]})]})})}),`\n`,(0,i.jsx)(i.Fragment,{children:(0,i.jsx)(e.pre,{className:\"shiki shiki-themes github-light github-dark\",style:{\"--shiki-light\":\"#24292e\",\"--shiki-dark\":\"#e1e4e8\",\"--shiki-light-bg\":\"#fff\",\"--shiki-dark-bg\":\"#24292e\"},tabIndex:\"0\",icon:'<svg viewBox=\"0 0 24 24\"><path d=\"M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z\" fill=\"currentColor\" /></svg>',children:(0,i.jsxs)(e.code,{children:[(0,i.jsxs)(e.span,{className:\"line\",children:[(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"import\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" { defineDocs } \"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"from\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\" 'fumadocs-mdx/config'\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\";\"})]}),`\n`,(0,i.jsx)(e.span,{className:\"line\"}),`\n`,(0,i.jsxs)(e.span,{className:\"line\",children:[(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"export\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" const\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:\" docs\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" =\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\" defineDocs\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"({\"})]}),`\n`,(0,i.jsxs)(e.span,{className:\"line\",children:[(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"  dir: \"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\"'content/docs'\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\",\"})]}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"});\"})})]})})}),`\n`,(0,i.jsx)(i.Fragment,{children:(0,i.jsx)(e.pre,{className:\"shiki shiki-themes github-light github-dark has-diff\",style:{\"--shiki-light\":\"#24292e\",\"--shiki-dark\":\"#e1e4e8\",\"--shiki-light-bg\":\"#fff\",\"--shiki-dark-bg\":\"#24292e\"},tabIndex:\"0\",icon:'<svg viewBox=\"0 0 24 24\"><path d=\"M 6,1 C 4.354992,1 3,2.354992 3,4 v 16 c 0,1.645008 1.354992,3 3,3 h 12 c 1.645008,0 3,-1.354992 3,-3 V 8 7 A 1.0001,1.0001 0 0 0 20.707031,6.2929687 l -5,-5 A 1.0001,1.0001 0 0 0 15,1 h -1 z m 0,2 h 7 v 3 c 0,1.645008 1.354992,3 3,3 h 3 v 11 c 0,0.564129 -0.435871,1 -1,1 H 6 C 5.4358712,21 5,20.564129 5,20 V 4 C 5,3.4358712 5.4358712,3 6,3 Z M 15,3.4140625 18.585937,7 H 16 C 15.435871,7 15,6.5641288 15,6 Z\" fill=\"currentColor\" /></svg>',children:(0,i.jsxs)(e.code,{children:[(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"{\"})}),`\n`,(0,i.jsxs)(e.span,{className:\"line\",children:[(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:'  \"scripts\"'}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\": {\"})]}),`\n`,(0,i.jsxs)(e.span,{className:\"line diff add\",children:[(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:'    \"postinstall\"'}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\": \"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:'\"fumadocs-mdx\"'})]}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"  }\"})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"}\"})})]})})}),`\n`,(0,i.jsx)(e.p,{children:\"Finally, to access your content:\"}),`\n`,(0,i.jsx)(i.Fragment,{children:(0,i.jsx)(e.pre,{className:\"shiki shiki-themes github-light github-dark\",style:{\"--shiki-light\":\"#24292e\",\"--shiki-dark\":\"#e1e4e8\",\"--shiki-light-bg\":\"#fff\",\"--shiki-dark-bg\":\"#24292e\"},tabIndex:\"0\",icon:'<svg viewBox=\"0 0 24 24\"><path d=\"M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z\" fill=\"currentColor\" /></svg>',children:(0,i.jsxs)(e.code,{children:[(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#6A737D\",\"--shiki-dark\":\"#6A737D\"},children:\"// .source folder will be generated when you run `next dev`\"})}),`\n`,(0,i.jsxs)(e.span,{className:\"line\",children:[(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"import\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" { docs } \"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"from\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\" '@/.source'\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\";\"})]}),`\n`,(0,i.jsxs)(e.span,{className:\"line\",children:[(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"import\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" { loader } \"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"from\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\" 'fumadocs-core/source'\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\";\"})]}),`\n`,(0,i.jsx)(e.span,{className:\"line\"}),`\n`,(0,i.jsxs)(e.span,{className:\"line\",children:[(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"export\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" const\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#005CC5\",\"--shiki-dark\":\"#79B8FF\"},children:\" source\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" =\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\" loader\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"({\"})]}),`\n`,(0,i.jsxs)(e.span,{className:\"line\",children:[(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"  baseUrl: \"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\"'/docs'\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\",\"})]}),`\n`,(0,i.jsxs)(e.span,{className:\"line\",children:[(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"  source: docs.\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\"toFumadocsSource\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"(),\"})]}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"});\"})})]})})}),`\n`,(0,i.jsx)(e.h3,{id:\"root-layout\",children:\"Root Layout\"}),`\n`,(0,i.jsxs)(e.p,{children:[\"Wrap the entire application inside \",(0,i.jsx)(e.a,{href:\"https://www.notion.so/docs/ui/layouts/root-provider\",children:\"Root Provider\"}),\", and add required styles to \",(0,i.jsx)(\"code\",{children:\"body\"}),\".\"]}),`\n`,(0,i.jsx)(i.Fragment,{children:(0,i.jsx)(e.pre,{className:\"shiki shiki-themes github-light github-dark\",style:{\"--shiki-light\":\"#24292e\",\"--shiki-dark\":\"#e1e4e8\",\"--shiki-light-bg\":\"#fff\",\"--shiki-dark-bg\":\"#24292e\"},tabIndex:\"0\",icon:'<svg viewBox=\"0 0 24 24\"><path d=\"M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z\" fill=\"currentColor\" /></svg>',children:(0,i.jsxs)(e.code,{children:[(0,i.jsxs)(e.span,{className:\"line\",children:[(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"import\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" { RootProvider } \"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"from\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\" 'fumadocs-ui/provider'\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\";\"})]}),`\n`,(0,i.jsxs)(e.span,{className:\"line\",children:[(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"import\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" type\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" { ReactNode } \"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"from\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\" 'react'\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\";\"})]}),`\n`,(0,i.jsx)(e.span,{className:\"line\"}),`\n`,(0,i.jsxs)(e.span,{className:\"line\",children:[(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"export\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" default\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\" function\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\" Layout\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"({ \"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#E36209\",\"--shiki-dark\":\"#FFAB70\"},children:\"children\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" }\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\":\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" { \"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#E36209\",\"--shiki-dark\":\"#FFAB70\"},children:\"children\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\":\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\" ReactNode\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" }) {\"})]}),`\n`,(0,i.jsxs)(e.span,{className:\"line\",children:[(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"  return\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" (\"})]}),`\n`,(0,i.jsxs)(e.span,{className:\"line\",children:[(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"    <\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"html lang\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"=\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:'\"en\"'}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\" suppressHydrationWarning\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\">\"})]}),`\n`,(0,i.jsxs)(e.span,{className:\"line\",children:[(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"      <\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#E36209\",\"--shiki-dark\":\"#FFAB70\"},children:\"body\"})]}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#6A737D\",\"--shiki-dark\":\"#6A737D\"},children:\"        // you can use Tailwind CSS too\"})}),`\n`,(0,i.jsxs)(e.span,{className:\"line\",children:[(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        style\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"=\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"{{\"})]}),`\n`,(0,i.jsxs)(e.span,{className:\"line\",children:[(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\"          display\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\": \"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\"'flex'\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\",\"})]}),`\n`,(0,i.jsxs)(e.span,{className:\"line\",children:[(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\"          flexDirection\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\": \"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\"'column'\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\",\"})]}),`\n`,(0,i.jsxs)(e.span,{className:\"line\",children:[(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\"          minHeight\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\": \"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\"'100vh'\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\",\"})]}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        }}\"})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"      >\"})}),`\n`,(0,i.jsxs)(e.span,{className:\"line\",children:[(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"        <\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#6F42C1\",\"--shiki-dark\":\"#B392F0\"},children:\"RootProvider\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\">{children}\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"</\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"RootProvider\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\">\"})]}),`\n`,(0,i.jsxs)(e.span,{className:\"line\",children:[(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"      </\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"body\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\">\"})]}),`\n`,(0,i.jsxs)(e.span,{className:\"line\",children:[(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"    </\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"html\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\">\"})]}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"  );\"})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\"}\"})})]})})}),`\n`,(0,i.jsx)(e.h3,{id:\"styles\",children:\"Styles\"}),`\n`,(0,i.jsxs)(e.p,{children:[\"Add the following Tailwind CSS styles to \",(0,i.jsx)(\"code\",{children:\"global.css\"}),\".\"]}),`\n`,(0,i.jsx)(i.Fragment,{children:(0,i.jsx)(e.pre,{className:\"shiki shiki-themes github-light github-dark\",style:{\"--shiki-light\":\"#24292e\",\"--shiki-dark\":\"#e1e4e8\",\"--shiki-light-bg\":\"#fff\",\"--shiki-dark-bg\":\"#24292e\"},tabIndex:\"0\",icon:'<svg viewBox=\"0 0 24 24\"><path d=\"M 6,1 C 4.354992,1 3,2.354992 3,4 v 16 c 0,1.645008 1.354992,3 3,3 h 12 c 1.645008,0 3,-1.354992 3,-3 V 8 7 A 1.0001,1.0001 0 0 0 20.707031,6.2929687 l -5,-5 A 1.0001,1.0001 0 0 0 15,1 h -1 z m 0,2 h 7 v 3 c 0,1.645008 1.354992,3 3,3 h 3 v 11 c 0,0.564129 -0.435871,1 -1,1 H 6 C 5.4358712,21 5,20.564129 5,20 V 4 C 5,3.4358712 5.4358712,3 6,3 Z M 15,3.4140625 18.585937,7 H 16 C 15.435871,7 15,6.5641288 15,6 Z\" fill=\"currentColor\" /></svg>',children:(0,i.jsxs)(e.code,{children:[(0,i.jsxs)(e.span,{className:\"line\",children:[(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"@import\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\" 'tailwindcss'\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\";\"})]}),`\n`,(0,i.jsxs)(e.span,{className:\"line\",children:[(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"@import\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\" 'fumadocs-ui/css/neutral.css'\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\";\"})]}),`\n`,(0,i.jsxs)(e.span,{className:\"line\",children:[(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#D73A49\",\"--shiki-dark\":\"#F97583\"},children:\"@import\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#032F62\",\"--shiki-dark\":\"#9ECBFF\"},children:\" 'fumadocs-ui/css/preset.css'\"}),(0,i.jsx)(e.span,{style:{\"--shiki-light\":\"#24292E\",\"--shiki-dark\":\"#E1E4E8\"},children:\";\"})]})]})})}),`\n`,(0,i.jsxs)(e.blockquote,{children:[`\n`,(0,i.jsx)(e.p,{children:\"It doesn't come with a default font, you may choose one from next/font.\"}),`\n`]}),`\n`,(0,i.jsx)(e.h3,{id:\"layout\",children:\"Layout\"}),`\n`,(0,i.jsxs)(e.p,{children:[\"Create a \",(0,i.jsx)(\"code\",{children:\"app/layout.config.tsx\"}),\" file to put the shared options for our layouts.\"]}),`\n`,(0,i.jsx)(e.p,{children:`<include cwd meta='title=\"app/layout.config.tsx\"'>\n../../examples/next-mdx/app/layout.config.tsx\n</include>`}),`\n`,(0,i.jsxs)(e.p,{children:[\"Create a folder \",(0,i.jsx)(\"code\",{children:\"/app/docs\"}),\" for our docs, and give it a proper layout.\"]}),`\n`,(0,i.jsx)(e.p,{children:`<include cwd meta='title=\"app/docs/layout.tsx\"'>\n../../examples/next-mdx/app/docs/layout.tsx\n</include>`}),`\n`,(0,i.jsxs)(e.blockquote,{children:[`\n`,(0,i.jsx)(e.p,{children:\"pageTree refers to Page Tree, it should be provided by your content source.\"}),`\n`]}),`\n`,(0,i.jsx)(e.h3,{id:\"page\",children:\"Page\"}),`\n`,(0,i.jsxs)(e.p,{children:[\"Create a catch-all route \",(0,i.jsx)(\"code\",{children:\"/app/docs/[[...slug]]\"}),\" for docs pages.\"]}),`\n`,(0,i.jsxs)(e.p,{children:[\"In the page, wrap your content in the \",(0,i.jsx)(e.a,{href:\"https://www.notion.so/docs/ui/layouts/page\",children:\"Page\"}),\" component.\"]}),`\n`,(0,i.jsx)(e.p,{children:\"<CodeBlockTabs groupId='content-source'>\"}),`\n`,(0,i.jsx)(i.Fragment,{children:(0,i.jsx)(e.pre,{className:\"shiki shiki-themes github-light github-dark\",style:{\"--shiki-light\":\"#24292e\",\"--shiki-dark\":\"#e1e4e8\",\"--shiki-light-bg\":\"#fff\",\"--shiki-dark-bg\":\"#24292e\"},tabIndex:\"0\",icon:'<svg viewBox=\"0 0 24 24\"><path d=\"M 6,1 C 4.354992,1 3,2.354992 3,4 v 16 c 0,1.645008 1.354992,3 3,3 h 12 c 1.645008,0 3,-1.354992 3,-3 V 8 7 A 1.0001,1.0001 0 0 0 20.707031,6.2929687 l -5,-5 A 1.0001,1.0001 0 0 0 15,1 h -1 z m 0,2 h 7 v 3 c 0,1.645008 1.354992,3 3,3 h 3 v 11 c 0,0.564129 -0.435871,1 -1,1 H 6 C 5.4358712,21 5,20.564129 5,20 V 4 C 5,3.4358712 5.4358712,3 6,3 Z M 15,3.4140625 18.585937,7 H 16 C 15.435871,7 15,6.5641288 15,6 Z\" fill=\"currentColor\" /></svg>',children:(0,i.jsxs)(e.code,{children:[(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{children:`<include cwd meta='title=\"app/docs/[[...slug]]/page.tsx\" tab=\"Fumadocs MDX\"'>../../examples/next-mdx/app/docs/[[...slug]]/page.tsx</include>`})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{children:`<include cwd meta='title=\"app/docs/[[...slug]]/page.tsx\" tab=\"Content Collections\"'>../../examples/content-collections/app/docs/[[...slug]]/page.tsx</include>`})})]})})}),`\n`,(0,i.jsx)(e.p,{children:\"</CodeBlockTabs>\"}),`\n`,(0,i.jsx)(e.h3,{id:\"search\",children:\"Search\"}),`\n`,(0,i.jsx)(e.p,{children:\"Use the default document search based on Orama.\"}),`\n`,(0,i.jsx)(e.p,{children:`<include cwd meta='title=\"app/api/search/route.ts\"'>\n../../examples/next-mdx/app/api/search/route.ts\n</include>`}),`\n`,(0,i.jsxs)(e.p,{children:[\"Learn more about \",(0,i.jsx)(e.a,{href:\"https://www.notion.so/docs/headless/search\",children:\"Document Search\"}),\".\"]}),`\n`,(0,i.jsx)(e.h3,{id:\"done\",children:\"Done\"}),`\n`,(0,i.jsx)(e.p,{children:\"You can start the dev server and create MDX files.\"}),`\n`,(0,i.jsx)(i.Fragment,{children:(0,i.jsx)(e.pre,{className:\"shiki shiki-themes github-light github-dark\",style:{\"--shiki-light\":\"#24292e\",\"--shiki-dark\":\"#e1e4e8\",\"--shiki-light-bg\":\"#fff\",\"--shiki-dark-bg\":\"#24292e\"},tabIndex:\"0\",icon:'<svg viewBox=\"0 0 24 24\"><path d=\"M 6,1 C 4.354992,1 3,2.354992 3,4 v 16 c 0,1.645008 1.354992,3 3,3 h 12 c 1.645008,0 3,-1.354992 3,-3 V 8 7 A 1.0001,1.0001 0 0 0 20.707031,6.2929687 l -5,-5 A 1.0001,1.0001 0 0 0 15,1 h -1 z m 0,2 h 7 v 3 c 0,1.645008 1.354992,3 3,3 h 3 v 11 c 0,0.564129 -0.435871,1 -1,1 H 6 C 5.4358712,21 5,20.564129 5,20 V 4 C 5,3.4358712 5.4358712,3 6,3 Z M 15,3.4140625 18.585937,7 H 16 C 15.435871,7 15,6.5641288 15,6 Z\" fill=\"currentColor\" /></svg>',children:(0,i.jsxs)(e.code,{children:[(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{children:\"---\"})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{children:\"title: Hello World\"})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{children:\"---\"})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{children:\"## Introduction\"})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{children:\"I love Anime.\"})})]})})}),`\n`,(0,i.jsx)(e.h2,{id:\"deploying\",children:\"Deploying\"}),`\n`,(0,i.jsx)(e.p,{children:\"It should work out-of-the-box with Vercel & Netlify.\"}),`\n`,(0,i.jsx)(e.h3,{id:\"cloudflare\",children:\"Cloudflare\"}),`\n`,(0,i.jsxs)(e.p,{children:[\"Use \",(0,i.jsx)(e.a,{href:\"https://opennext.js.org/cloudflare\",children:\"https://opennext.js.org/cloudflare\"}),\", Fumadocs doesn't work on Edge runtime.\"]}),`\n`,(0,i.jsx)(e.h3,{id:\"docker-deployment\",children:\"Docker Deployment\"}),`\n`,(0,i.jsxs)(e.p,{children:[\"If you want to deploy your Fumadocs app using Docker with \",(0,i.jsx)(\"strong\",{children:\"Fumadocs MDX configured\"}),\", make sure to add the \",(0,i.jsx)(\"code\",{children:\"source.config.ts\"}),\" file to the \",(0,i.jsx)(\"code\",{children:\"WORKDIR\"}),` in the Dockerfile.\nThe following snippet is taken from the official `,(0,i.jsx)(e.a,{href:\"https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile\",children:\"Next.js Dockerfile Example\"}),\":\"]}),`\n`,(0,i.jsx)(i.Fragment,{children:(0,i.jsx)(e.pre,{className:\"shiki shiki-themes github-light github-dark has-highlighted\",style:{\"--shiki-light\":\"#24292e\",\"--shiki-dark\":\"#e1e4e8\",\"--shiki-light-bg\":\"#fff\",\"--shiki-dark-bg\":\"#24292e\"},tabIndex:\"0\",icon:'<svg viewBox=\"0 0 24 24\"><path d=\"M 6,1 C 4.354992,1 3,2.354992 3,4 v 16 c 0,1.645008 1.354992,3 3,3 h 12 c 1.645008,0 3,-1.354992 3,-3 V 8 7 A 1.0001,1.0001 0 0 0 20.707031,6.2929687 l -5,-5 A 1.0001,1.0001 0 0 0 15,1 h -1 z m 0,2 h 7 v 3 c 0,1.645008 1.354992,3 3,3 h 3 v 11 c 0,0.564129 -0.435871,1 -1,1 H 6 C 5.4358712,21 5,20.564129 5,20 V 4 C 5,3.4358712 5.4358712,3 6,3 Z M 15,3.4140625 18.585937,7 H 16 C 15.435871,7 15,6.5641288 15,6 Z\" fill=\"currentColor\" /></svg>',children:(0,i.jsxs)(e.code,{children:[(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{children:\"# syntax=docker.io/docker/dockerfile:1\"})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{children:\"FROM node:18-alpine AS base\"})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{children:\"# Install dependencies only when needed\"})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{children:\"FROM base AS deps\"})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{children:\"# Check <https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine> to understand why libc6-compat might be needed.\"})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{children:\"RUN apk add --no-cache libc6-compat\"})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{children:\"WORKDIR /app\"})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{children:\"# Install dependencies based on the preferred package manager\"})}),`\n`,(0,i.jsx)(e.span,{className:\"line highlighted\",children:(0,i.jsx)(e.span,{children:\"COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* source.config.ts ./\"})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{children:\"RUN \\\\\\\\\"})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{children:\"  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \\\\\\\\\"})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{children:\"  elif [ -f package-lock.json ]; then npm ci; \\\\\\\\\"})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{children:\"  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \\\\\\\\\"})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{children:'  else echo \"Lockfile not found.\" && exit 1; \\\\\\\\'})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{children:\"  fi\"})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{children:\"# Rebuild the source code only when needed\"})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{children:\"FROM base AS builder\"})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{children:\"WORKDIR /app\"})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{children:\"COPY --from=deps /app/node_modules ./node_modules\"})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{children:\"COPY . .\"})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{children:\"# Next.js collects completely anonymous telemetry data about general usage.\"})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{children:\"# Learn more here: <https://nextjs.org/telemetry>\"})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{children:\"# Uncomment the following line in case you want to disable telemetry during the build.\"})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{children:\"# ENV NEXT_TELEMETRY_DISABLED=1\"})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{children:\"RUN \\\\\\\\\"})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{children:\"  if [ -f yarn.lock ]; then yarn run build; \\\\\\\\\"})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{children:\"  elif [ -f package-lock.json ]; then npm run build; \\\\\\\\\"})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{children:\"  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \\\\\\\\\"})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{children:'  else echo \"Lockfile not found.\" && exit 1; \\\\\\\\'})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{children:\"  fi\"})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{children:\"# Production image, copy all the files and run next\"})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{children:\"FROM base AS runner\"})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{children:\"WORKDIR /app\"})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{children:\"ENV NODE_ENV=production\"})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{children:\"# Uncomment the following line in case you want to disable telemetry during runtime.\"})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{children:\"# ENV NEXT_TELEMETRY_DISABLED=1\"})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{children:\"RUN addgroup --system --gid 1001 nodejs\"})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{children:\"RUN adduser --system --uid 1001 nextjs\"})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{children:\"COPY --from=builder /app/public ./public\"})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{children:\"# Automatically leverage output traces to reduce image size\"})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{children:\"# <https://nextjs.org/docs/advanced-features/output-file-tracing>\"})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{children:\"COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./\"})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{children:\"COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static\"})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{children:\"USER nextjs\"})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{children:\"EXPOSE 3000\"})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{children:\"ENV PORT=3000\"})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{children:\"# server.js is created by next build from the standalone output\"})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{children:\"# <https://nextjs.org/docs/pages/api-reference/config/next-config-js/output>\"})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{children:'ENV HOSTNAME=\"0.0.0.0\"'})}),`\n`,(0,i.jsx)(e.span,{className:\"line\",children:(0,i.jsx)(e.span,{children:'CMD [\"node\", \"server.js\"]'})})]})})}),`\n`,(0,i.jsx)(e.p,{children:\"This ensures Fumadocs MDX can access your configuration file during builds.\"}),`\n`,(0,i.jsx)(e.p,{children:\"\\uC88B\\uC740 \\uCC45\\uC744 \\uC77D\\uACE0\\uB294, \\uBBF8\\uB8E8\\uC9C0 \\uC54A\\uACE0 \\uBC14\\uB85C \\uC801\\uB3C4\\uB85D\\uC5F0\\uC2B5\\uD558\\uC790.\"}),`\n`,(0,i.jsx)(e.p,{children:\"\\uC774\\uC2AC\\uC544\\uC5D0\\uAC8C \\uADF8\\uB7EC\\uD558\\uB4EF \\uADF8 \\uBB38\\uC7A5\\uB4E4\\uC740 \\uB610 \\uB204\\uAD70\\uAC00\\uC5D0\\uAC8C \\uC804\\uC2E0\\uC744 \\uD0C0\\uACE0 \\uD758\\uB7EC \\uB610 \\uB2E4\\uB978 \\uB204\\uAD70\\uAC00\\uC5D0\\uAC8C \\uC804\\uB2EC\\uB41C\\uB2E4.\"}),`\n`,(0,i.jsxs)(e.blockquote,{children:[`\n`,(0,i.jsx)(e.p,{children:\"\\uC5B8\\uC5B4\\uB780 \\uC9C8\\uC11C\\uC774\\uC790 \\uAD8C\\uC704\\uC774\\uAE30 \\uB54C\\uBB38\\uC774\\uB2E4. \\uAD8C\\uC704\\uB97C \\uC798 \\uBBFF\\uB294 \\uC774\\uB4E4\\uC740 \\uC27D\\uAC8C \\uC18D\\uB294 \\uC790\\uB4E4\\uC774\\uAE30\\uB3C4 \\uD558\\uB2E4. \\uC6EC\\uB9CC\\uD574\\uC120 \\uC18D\\uC9C0 \\uC54A\\uB294 \\uC790\\uB4E4\\uB3C4 \\uC788\\uB2E4. *\\uADF8\\uB7EC\\uB098 \\uC18D\\uC9C0 \\uC54A\\uB294 \\uC790\\uB4E4\\uC740 \\uD544\\uC5F0\\uC801\\uC73C\\uB85C \\uBC29\\uD669\\uD558\\uAC8C \\uB41C\\uB2E4. \\uC138\\uACC4\\uB97C \\uC1A1\\uB450\\uB9AC\\uC9F8\\uB85C \\uC774\\uC0C1\\uD558\\uAC8C \\uC5EC\\uAE30\\uACE0 \\uB9CC\\uB2E4. \\uC5B4\\uB9B0 \\uC2AC\\uC544\\uB294 \\uC120\\uD0DD\\uD574\\uC57C \\uD588\\uB2E4. \\uC18D\\uC744\\uAE4C \\uB9D0\\uAE4C.\"}),`\n`]}),`\n`,(0,i.jsx)(e.p,{children:\"9p, *\\uC790\\uD06C \\uB77C\\uCE89\\uC758 \\uB9D0\"}),`\n`,(0,i.jsxs)(e.blockquote,{children:[`\n`,(0,i.jsxs)(e.p,{children:[\"\\u201C\\uC774\\uAC83\\uBD80\\uD130 \\uBC15\\uC74D\\uC2DC\\uB2E4.\\u201D \\uB0AE\\uC7A0 \\uCD9C\\uD310\\uC0AC\\uC758 \\uAC04\\uD310\\uC774\\uB2E4. \\uC2AC\\uC544\\uB294 \\uB9D8 \\uD3B8\\uD788 \\uBABB\\uC9C8\\uD560 \\uC218 \\uC788\\uB294 \\uC9D1\\uC5D0 \\uD55C \\uBC88\\uB3C4 \\uC0B4\\uC544\\uBCF4\\uC9C0 \\uBABB\\uD588\\uB2E4. \\uD604\\uAD00 \\uC55E\\uC5D0 \\uC11C\\uC11C \\uC704\\uCE58\\uB97C \\uC815\\uD558\\uACE0\\uB294 \\uB9D0\\uD55C\\uB2E4. \\u201C\\uC5EC\\uAE30\\uC5D0 \\uBC15\\uC544\\uC8FC\\uC138\\uC694.\\u201C\",(0,i.jsx)(e.br,{}),`\n`,\"\\uAC00\\uB140\\uC7A5\\uC758 \\uC9C0\\uB839\\uC774\\uB2E4. \\uC6C5\\uC774\\uAC00 \\uB9DD\\uCE58\\uB97C \\uB4E4\\uACE0 \\uC624\\uB354\\uB2C8 \\uBCBD\\uC5D0 \\uAF5D\\uAF5D \\uBABB\\uC9C8\\uC744 \\uD55C\\uB2E4. \\uC2AC\\uC544\\uB294 \\uCE74\\uD0C0\\uB974\\uC2DC\\uC2A4\\uB97C \\uB290\\uB07C\\uBA70 \\uADF8\\uAC83\\uC744 \\uC9C0\\uCF1C\\uBCF8\\uB2E4.\"]}),`\n`]}),`\n`,(0,i.jsx)(e.p,{children:\"16p\"}),`\n`,(0,i.jsxs)(e.blockquote,{children:[`\n`,(0,i.jsxs)(e.p,{children:[\"\\uADF8\\uB4E4\\uC758 \\uB538 \\uC774\\uC2AC\\uC544\\uB294 \\uC131\\uC2E4\\uD55C \\uC791\\uAC00\\uB85C \\uB110\\uB9AC \\uC54C\\uB824\\uC838 \\uC788\\uB2E4. \\uC0AC\\uC2E4 \\uADF8\\uAC83\\uC740 \\uB8E8\\uBA38 \\uAC19\\uC740 \\uC18C\\uBB38\\uC5D0 \\uAC00\\uAE4C\\uC6E0\\uC9C0\\uB9CC, \\uC18C\\uBB38\\uC740 \\uC0AC\\uB78C\\uC744 \\uAF64\\uB098 \\uBC14\\uAFD4\\uB193\\uB294 \\uBC95\\uC774\\uB2E4. \\uC774\\uC2AC\\uC544\\uB294 \\uACFC\\uB300\\uD3C9\\uAC00\\uBC1B\\uC74C\\uC73C\\uB85C\\uC368 \\uAC15\\uC81C\\uB85C \\uC870\\uAE08\\uC529 \\uB354 \\uBD80\\uC9C0\\uB7F0\\uD574\\uC84C\\uB2E4. \\uC5B4\\uCA0C\\uAC70\\uB098 \\uC790\\uC815 \\uBB34\\uB835\\uC5D4 \\uBB54\\uAC00\\uB97C \\uC644\\uC131\\uD558\\uAE34 \\uD55C\\uB2E4. \\uC2DC\\uAC04\\uC774 \\uD750\\uB974\\uACE0 \\uC774\\uC2AC\\uC544\\uB294 \\uAE00\\uC744 \\uC4F4\\uB2E4. \\uC790\\uC815\\uC774 \\uB2E4\\uAC00\\uC62C\\uC218\\uB85D \\uB180\\uB77C\\uC6B4 \\uC18D\\uB3C4\\uB85C \\uBE60\\uB974\\uAC8C \\uC4F4\\uB2E4. \\uADF8\\uAC83\\uC740 \\uC774\\uC2AC\\uC544\\uAC00 \\uC4F0\\uB294 \\uAE00\\uC774\\uB77C\\uAE30\\uBCF4\\uB2E4\\uB294 \\uB9C8\\uAC10\\uC774 \\uC4F0\\uB294 \\uAE00\\uC774\\uB2E4.\",(0,i.jsx)(e.br,{}),`\n`,\"\\u2026\\uC911\\uB7B5\",(0,i.jsx)(e.br,{}),`\n`,\"\\u201D\\uB2F9\\uC2E0\\uB4E4\\uB3C4 \\uC131\\uACF5\\uD558\\uACE0 \\uC2F6\\uC5B4? \\uADF8\\uB7FC \\uC544\\uCE68 \\uC77C\\uCC0D \\uC77C\\uC5B4\\uB098\\uC11C \\uC694\\uAC00\\uB97C \\uD574.\\u201C\"]}),`\n`]})]})}function g(n={}){let{wrapper:e}=n.components||{};return e?(0,i.jsx)(e,{...n,children:(0,i.jsx)(k,{...n})}):k(n)}function a(n,e){throw new Error(\"Expected \"+(e?\"component\":\"object\")+\" `\"+n+\"` to be defined: you likely forgot to import, pass, or provide it.\")}return A(C);})();\n;return Component;"
  }
]