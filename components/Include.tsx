import React from "react";

interface IncludeProps {
  cwd?: string;
  meta?: string;
  children?: React.ReactNode;
}

// Include 컴포넌트 - 외부 파일 포함
export const Include: React.FC<IncludeProps> = ({ cwd, meta, children }) => {
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
