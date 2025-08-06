import React from "react";

interface StyledLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  isExternal?: boolean;
}

export const StyledLink: React.FC<StyledLinkProps> = ({
  href,
  children,
  className = "",
  isExternal = false,
}) => {
  const baseClasses =
    "text-blue-600 hover:text-blue-800 underline font-semibold";
  const combinedClasses = `${baseClasses} ${className}`.trim();

  if (isExternal || href.startsWith("http")) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={combinedClasses}
      >
        {children}
      </a>
    );
  }

  return (
    <a href={href} className={combinedClasses}>
      {children}
    </a>
  );
};
