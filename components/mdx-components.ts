// 색상 팔레트 시각화 (디자인 시스템 문서에서만 필요)
// import { ColorGrid } from "@/components/color-grid";
// 컴포넌트 예시 (컴포넌트 라이브러리 문서에서만 필요)
// import { ComponentExample } from "@/components/component-example";
// 컴포넌트 스펙 블록 (컴포넌트 문서에서만 필요)
// import { ComponentSpecBlock } from "@/components/component-spec-block";
// 수동 설치 안내 (특정 문서에서만 필요)
// import { ManualInstallation } from "@/components/manual-installation";
// 디자인 토큰 레퍼런스 (디자인 시스템에서만 필요)
// import { TokenReference } from "@/components/token-reference";
// React 타입 테이블 생성기 (ReactTypeTable을 쓸 때만 필요)
// import { createReactTypeTable } from "@/components/type-table/react-type-table";
// 아코디언 UI
import { Accordion, Accordions } from "fumadocs-ui/components/accordion";
// 코드 블록
import * as CodeBlockComponents from "fumadocs-ui/components/codeblock";
// 파일/폴더 UI
import * as FilesComponents from "fumadocs-ui/components/files";
import * as TabsComponents from "fumadocs-ui/components/tabs";
import * as CalloutComponents from "fumadocs-ui/components/callout";
import * as HeadingComponents from "fumadocs-ui/components/heading";
import * as DynamicCodeBlockComponents from "fumadocs-ui/components/dynamic-codeblock";
import * as ImageZoomComponents from "fumadocs-ui/components/image-zoom";
import * as InlineTOCComponents from "fumadocs-ui/components/inline-toc";

// // import { File, Files, Folder } from "fumadocs-ui/components/files";
// // 탭 UI
// import { Tab, Tabs } from "fumadocs-ui/components/tabs";
// 단계별 UI
import { Step, Steps } from "fumadocs-ui/components/steps";

// 타입 테이블 (타입스크립트 문서화)
import { TypeTable } from "fumadocs-ui/components/type-table";
// 기본 MDX 컴포넌트 (반드시 필요)
import defaultMdxComponents from "fumadocs-ui/mdx";

// Include 컴포넌트 - 외부 파일 포함
const Include = ({ cwd, meta, children }) => {
  // cwd와 meta 속성을 기반으로 파일을 포함하는 로직
  // 현재는 단순히 children을 렌더링하거나 경고 메시지를 표시
  console.warn("Include component is not fully implemented yet:", {
    cwd,
    meta,
  });

  return (
    <div className="include-block bg-gray-100 p-4 rounded border-l-4 border-blue-500 my-4">
      <div className="text-sm text-gray-600 mb-2">
        Include: {cwd} {meta}
      </div>
      <div className="text-sm text-gray-800">{children}</div>
    </div>
  );
};
// 아이콘 (특정 문서에서만 필요)
import { AtomIcon } from "lucide-react";
// MDX 타입
import { MDXComponents } from "mdx/types";
// import * as fumaui from "fumadocs-ui/components";
// 아이콘 라이브러리 (Seed Design 특화)
// import { IconLibrary } from "./iconography/icons";
// 색상 마이그레이션 인덱스 (Seed Design 특화)
// import { ColorMigrationIndex } from "./migration/color-migration-index";
// 아이콘 마이그레이션 (Seed Design 특화)
// import { V2Icon, V2IconColor, V3Icon } from "./migration/icon";
// 아이콘 마이그레이션 인덱스 (Seed Design 특화)
// import { IconographyMigrationIndex } from "./migration/iconography-migration-index";
// 타이포 마이그레이션 인덱스 (Seed Design 특화)
// import { TypographyMigrationIndex } from "./migration/typography-migration-index";
// 빌드 툴 아이콘 (특정 문서에서만 필요)
// import { ViteIcon, WebpackIcon } from "./tool-icon";
// 타입 테이블 생성기 (ReactTypeTable을 쓸 때만 필요)
// import { typeTableGenerator } from "./type-table/generator";

// const { ReactTypeTable } = createReactTypeTable(typeTableGenerator); // React 타입 테이블 (특정 문서에서만 필요)

export const mdxComponents: MDXComponents = {
  ...defaultMdxComponents,
  // ManualInstallation,
  // ComponentExample,
  // TokenReference,
  // ComponentSpecBlock,
  // Tab,
  // Tabs,
  // File,
  // Folder,
  // Files,
  Step,
  Steps,
  ...TabsComponents,
  ...FilesComponents,
  Accordion,
  Accordions,
  ...CalloutComponents,
  ...HeadingComponents,
  ...DynamicCodeBlockComponents,
  ...ImageZoomComponents,
  ...InlineTOCComponents,
  ...CodeBlockComponents,
  AtomIcon,
  // WebpackIcon,
  // ViteIcon,
  TypeTable,
  // ReactTypeTable,
  // ColorGrid,
  // V3Icon,
  // V2Icon,
  // V2IconColor,
  // IconLibrary,
  // ColorMigrationIndex,
  // TypographyMigrationIndex,
  // IconographyMigrationIndex,
};
