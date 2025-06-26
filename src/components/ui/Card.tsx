// src/components/ui/Card.tsx

import React, { useState } from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: boolean | "sm" | "md" | "lg" | "xl";
  variant?:
    | "default"
    | "elevated"
    | "bordered"
    | "glass"
    | "gradient"
    | "modern";
  interactive?: boolean;
  onClick?: () => void;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  padding = "md",
  variant = "modern",
  interactive = false,
  onClick,
  hover = true,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const paddingClasses = {
    sm: "p-3 md:p-3",
    md: "p-4 md:p-6",
    lg: "p-6 md:p-8",
    xl: "p-8 md:p-12",
  };

  const getPaddingClass = () => {
    if (padding === true) return paddingClasses.md;
    if (padding === false) return "";
    return paddingClasses[padding];
  };

  const variants = {
    default: {
      base: `
        bg-white dark:bg-gray-800 
        border border-gray-200 dark:border-gray-700
        rounded-xl transition-all duration-300
      `,
      hover: hover
        ? "hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600"
        : "",
      interactive:
        interactive || onClick
          ? "cursor-pointer hover:shadow-lg active:shadow-md"
          : "",
    },
    elevated: {
      base: `
        bg-white dark:bg-gray-800
        rounded-xl transition-all duration-300
        shadow-lg border-0
      `,
      hover: hover ? "hover:shadow-2xl" : "",
      interactive:
        interactive || onClick
          ? "cursor-pointer hover:shadow-2xl active:shadow-lg"
          : "",
    },
    bordered: {
      base: `
        bg-white dark:bg-gray-800 
        border-2 border-blue-200 dark:border-blue-800
        rounded-xl transition-all duration-300
        shadow-md
      `,
      hover: hover
        ? "hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700"
        : "",
      interactive:
        interactive || onClick
          ? "cursor-pointer hover:shadow-lg active:shadow-md"
          : "",
    },
    glass: {
      base: `
        bg-white/10 dark:bg-gray-800/10 backdrop-blur-xl
        border border-white/20 dark:border-gray-700/20
        rounded-xl transition-all duration-300
        shadow-xl
      `,
      hover: hover
        ? "hover:bg-white/20 dark:hover:bg-gray-800/20 hover:shadow-2xl"
        : "",
      interactive:
        interactive || onClick
          ? "cursor-pointer hover:bg-white/20 dark:hover:bg-gray-800/20 active:bg-white/15 dark:active:bg-gray-800/15"
          : "",
    },
    gradient: {
      base: `
        bg-gradient-to-br from-white via-gray-50 to-white
        dark:from-gray-800 dark:via-gray-900 dark:to-gray-800
        border border-transparent rounded-xl transition-all duration-300
        shadow-xl relative overflow-hidden
      `,
      hover: hover ? "hover:shadow-2xl" : "",
      interactive:
        interactive || onClick ? "cursor-pointer active:shadow-lg" : "",
    },
    modern: {
      base: `
        bg-gradient-to-br from-white to-gray-50/50 
        dark:from-gray-800 dark:to-gray-900/50
        border border-gray-200/50 dark:border-gray-700/50
        rounded-2xl transition-all duration-300 backdrop-blur-sm
        shadow-lg shadow-gray-900/5 dark:shadow-black/20
        relative overflow-hidden
      `,
      hover: hover
        ? `hover:shadow-2xl hover:shadow-gray-900/10 dark:hover:shadow-black/40 
           hover:border-blue-300/50 dark:hover:border-blue-700/50`
        : "",
      interactive:
        interactive || onClick ? "cursor-pointer active:shadow-lg" : "",
    },
  };

  const currentVariant = variants[variant];

  const cardClasses = `
    ${currentVariant.base}
    ${currentVariant.hover}
    ${currentVariant.interactive}
    ${getPaddingClass()}
    ${className}
  `;

  const Component = onClick ? "button" : "div";

  return (
    <Component
      className={cardClasses}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...(onClick && { type: "button" })}
      style={{
        ...(variant === "gradient" && {
          backgroundImage: `
            linear-gradient(135deg, 
              rgba(99, 102, 241, 0.1) 0%, 
              rgba(139, 92, 246, 0.05) 50%, 
              rgba(59, 130, 246, 0.1) 100%
            )
          `,
        }),
      }}
    >
      {/* Gradient Overlay for gradient variant */}
      {variant === "gradient" && (
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400/5 via-blue-500/5 to-indigo-600/5 rounded-xl pointer-events-none"></div>
      )}

      {/* Modern variant glow effect */}
      {variant === "modern" && isHovered && hover && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-purple-500/5 to-indigo-600/10 rounded-2xl pointer-events-none animate-pulse"></div>
      )}

      {/* Shine effect on hover for interactive cards */}
      {(interactive || onClick) && isHovered && variant !== "glass" && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
            animation: "shimmer 1s ease-out",
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Bottom highlight for modern variant */}
      {variant === "modern" && (
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
      )}

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </Component>
  );
};
