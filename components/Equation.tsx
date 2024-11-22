import * as React from "react";

import Katex from "@/components/KatexReact";
import { getBlockTitle } from "notion-utils";

// 타입 정의
interface EquationProps {
  block?: any; // notion-utils에서 사용하는 block의 타입에 따라 세부화 가능
  math?: string;
  inline?: boolean;
  className?: string;
  [key: string]: any; // 추가적인 prop 허용
}

const katexSettings = {
  throwOnError: false,
  strict: false,
};

export const Equation: React.FC<EquationProps> = ({
  block,
  math,
  inline = false,
  className,
  ...rest
}) => {
  //   const { recordMap } = useNotionContext()
  math = math || getBlockTitle(block, null);
  if (!math) return null;

  return (
    <span
      role="button"
      tabIndex={0}
      className={`notion-equation ${
        inline ? "notion-equation-inline" : "notion-equation-block"
      } ${className || ""}`}
    >
      <Katex math={math} settings={katexSettings} {...rest} />
    </span>
  );
};
