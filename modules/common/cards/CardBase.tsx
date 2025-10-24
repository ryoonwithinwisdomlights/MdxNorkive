import { cardBaseClass } from "@/lib/styles/card.styles";
import { CardBaseProps } from "@/types";
import React, { useMemo } from "react";

const CardBase = React.memo(
  React.forwardRef<HTMLDivElement, CardBaseProps>(
    (
      {
        children,
        className,
        onClick,
        hover = true,
        shadow = "md",
        border = true,
        rounded = "lg",
        padding = "md",
        background = "default",
        ...props
      },
      ref
    ) => {
      // baseClasses 계산을 useMemo로 최적화
      const baseClasses = useMemo(
        () =>
          cardBaseClass(
            background,
            border,
            rounded,
            shadow,
            padding,
            hover,
            onClick ? true : false,
            className || ""
          ),
        [
          background,
          border,
          rounded,
          shadow,
          padding,
          hover,
          onClick,
          className,
        ]
      );

      return (
        <div ref={ref} className={baseClasses} onClick={onClick} {...props}>
          {children}
        </div>
      );
    }
  )
);

CardBase.displayName = "CardBase";

export default CardBase;
