import { cardBaseClass, CardBaseProps } from "@/types";
import React from "react";

const CardBase = React.forwardRef<HTMLDivElement, CardBaseProps>(
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
    const baseClasses = cardBaseClass(
      background,
      border,
      rounded,
      shadow,
      padding,
      hover,
      onClick ? true : false,
      className || ""
    );

    return (
      <div ref={ref} className={baseClasses} onClick={onClick} {...props}>
        {children}
      </div>
    );
  }
);

CardBase.displayName = "CardBase";

export default CardBase;
